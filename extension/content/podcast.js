// ── Segundo Cérebro · Podcast content script ────────────────────
// Extracts episode metadata + show notes from podcast platforms.
// Most podcast pages are SPAs (Spotify especially) — we wait for
// hydration before reading the DOM. Falls back to OpenGraph + JSON-LD.

(function () {
  'use strict';

  if (window.__scPodcastLoaded) return;
  window.__scPodcastLoaded = true;

  // ── Helpers ─────────────────────────────────────────────────────
  function meta(name) {
    const el = document.querySelector(
      `meta[property="${name}"], meta[name="${name}"]`
    );
    return el?.content?.trim() || null;
  }

  function jsonLd() {
    const blocks = [...document.querySelectorAll('script[type="application/ld+json"]')];
    for (const b of blocks) {
      try {
        const data = JSON.parse(b.textContent);
        const items = Array.isArray(data) ? data : [data];
        for (const item of items) {
          if (item['@type'] === 'PodcastEpisode' || item['@type'] === 'Episode') return item;
          if (item['@graph']) {
            for (const g of item['@graph']) {
              if (g['@type'] === 'PodcastEpisode' || g['@type'] === 'Episode') return g;
            }
          }
        }
      } catch (_) {}
    }
    return null;
  }

  function isoDurationToText(iso) {
    if (!iso) return null;
    const m = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso);
    if (!m) return null;
    const h = +m[1] || 0, mn = +m[2] || 0, s = +m[3] || 0;
    if (h) return `${h}h${mn ? ` ${mn}min` : ''}`;
    if (mn) return `${mn}min${s ? ` ${s}s` : ''}`;
    return `${s}s`;
  }

  function detectPlatform() {
    const h = location.hostname;
    if (h.includes('open.spotify.com'))    return 'spotify';
    if (h.includes('podcasts.apple.com'))  return 'apple';
    if (h.includes('overcast.fm'))         return 'overcast';
    if (h.includes('pca.st'))              return 'pocketcasts';
    if (h.includes('castro.fm'))           return 'castro';
    return 'generic';
  }

  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  // Wait until selector resolves to a non-empty element, polling up to
  // `timeoutMs`. Used because podcast SPAs hydrate asynchronously.
  async function waitFor(selector, timeoutMs = 4000) {
    const t0 = Date.now();
    while (Date.now() - t0 < timeoutMs) {
      const el = document.querySelector(selector);
      if (el && el.textContent.trim().length > 20) return el;
      await sleep(120);
    }
    return null;
  }

  function cleanText(t) {
    return (t || '')
      .replace(/ /g, ' ')
      .replace(/\s+\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/[ \t]+/g, ' ')
      .trim();
  }

  // ── Spotify ─────────────────────────────────────────────────────
  // Spotify's web player is a React SPA. The episode page has show
  // notes inside [data-testid="description"] (current as of 2026)
  // or older [data-testid="episode-page-show-notes"]. We try several
  // selectors and wait for hydration.
  async function fromSpotify() {
    // Best-effort wait for the SPA to render the page.
    await waitFor('[data-testid="entityTitle"], h1', 4000);

    const title =
      document.querySelector('[data-testid="entityTitle"] h1')?.textContent?.trim() ||
      document.querySelector('h1[data-encore-id="text"]')?.textContent?.trim() ||
      document.querySelector('h1')?.textContent?.trim() ||
      meta('og:title') || document.title;

    // The show name appears as a link near the episode title.
    const show =
      document.querySelector('a[href*="/show/"]')?.textContent?.trim() ||
      meta('og:site_name') ||
      null;

    // Show notes / description — try every known testid.
    const notesEl =
      document.querySelector('[data-testid="description"]') ||
      document.querySelector('[data-testid="episode-page-show-notes"]') ||
      document.querySelector('[data-testid="episode-description"]') ||
      document.querySelector('[data-encore-id="text"][data-testid*="description"]') ||
      document.querySelector('[data-testid="entitySubtitle"] + *');
    const notes = notesEl ? cleanText(notesEl.innerText) : null;

    // Duration appears next to play button.
    const durEl =
      document.querySelector('[data-testid="episode-duration"]') ||
      document.querySelector('[data-testid="duration"]');
    const duration = durEl?.textContent?.trim() || (meta('music:duration')
      ? `${Math.round(meta('music:duration') / 60)}min` : null);

    return {
      title,
      show,
      description: notes || meta('og:description'),
      duration,
    };
  }

  // ── Apple Podcasts ──────────────────────────────────────────────
  async function fromApple() {
    await waitFor('h1, [data-testid*="episode-page"]', 4000);
    const ld = jsonLd();
    if (ld) {
      return {
        title:       ld.name || meta('og:title') || document.title,
        show:        ld.partOfSeries?.name || ld.partOfPodcast?.name || null,
        description: ld.description || meta('og:description'),
        duration:    isoDurationToText(ld.duration),
      };
    }
    // DOM fallback
    const title =
      document.querySelector('h1')?.textContent?.trim() ||
      meta('og:title') || document.title;
    const show =
      document.querySelector('a[href*="/podcast/"]')?.textContent?.trim() || null;
    const notes =
      document.querySelector('[data-testid="episode-description"], section .product-hero-desc')?.innerText?.trim() ||
      meta('og:description');
    return { title, show, description: cleanText(notes), duration: null };
  }

  // ── Overcast / Pocket Casts / Castro / generic ──────────────────
  async function fromGeneric() {
    await waitFor('h1, article', 3000);
    const ld = jsonLd();
    if (ld) {
      return {
        title:       ld.name || meta('og:title') || document.title,
        show:        ld.partOfSeries?.name || ld.partOfPodcast?.name || null,
        description: cleanText(ld.description) || meta('og:description'),
        duration:    isoDurationToText(ld.duration),
      };
    }
    const title = document.querySelector('h1')?.textContent?.trim() || meta('og:title') || document.title;
    const show  = meta('og:site_name') || null;
    // Try to find a paragraph-rich description block
    const candidates = [...document.querySelectorAll('article, section, .description, #description, [class*="description"], [class*="show-notes"]')];
    let notes = null;
    for (const el of candidates) {
      const t = cleanText(el.innerText);
      if (t.length > 200) { notes = t; break; }
    }
    return {
      title,
      show,
      description: notes || meta('og:description'),
      duration:    null,
    };
  }

  async function getInfo() {
    const platform = detectPlatform();
    const fn = platform === 'spotify' ? fromSpotify
             : platform === 'apple'   ? fromApple
             :                          fromGeneric;
    const info = await fn();
    return {
      platform,
      title:       info.title       || 'Episódio sem título',
      show:        info.show        || null,
      description: info.description || null,
      duration:    info.duration    || null,
      url:         location.href,
    };
  }

  // ── Message handler ─────────────────────────────────────────────
  chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg.action === 'get-info') {
      getInfo().then(sendResponse);
      return true;
    }

    if (msg.action === 'capture') {
      getInfo().then(info => {
        const sourceLabel = {
          spotify:     'Spotify',
          apple:       'Apple Podcasts',
          overcast:    'Overcast',
          pocketcasts: 'Pocket Casts',
          castro:      'Castro',
          generic:     info.show || 'Podcast',
        }[info.platform];

        const content = info.description || '';

        sendResponse({
          type:      'podcast',
          title:     info.title,
          show:      info.show,
          content,
          duration:  info.duration,
          url:       info.url,
          source:    sourceLabel,
          wordCount: content.split(/\s+/).filter(Boolean).length,
        });
      });
      return true; // async
    }
  });

})();
