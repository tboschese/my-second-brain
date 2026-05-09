// ── Segundo Cérebro · Podcast content script ────────────────────
// Extracts episode metadata from podcast platforms.
// Targets Spotify (open.spotify.com/episode), Apple Podcasts
// (podcasts.apple.com), and falls back to OpenGraph / JSON-LD on
// any podcast hoster.

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

  // ── Spotify-specific extraction ─────────────────────────────────
  // Spotify is a SPA; metadata may take a beat to populate. We probe
  // a few times before settling on whatever is present.
  function fromSpotify() {
    const og = {
      title:       meta('og:title'),
      description: meta('og:description'),
      duration:    meta('music:duration'),
    };

    // og:title is "Episode — Show Name" on Spotify
    let episode = og.title || document.title;
    let show    = null;
    if (og.title && og.title.includes(' — ')) {
      const parts = og.title.split(' — ');
      episode = parts[0].trim();
      show    = parts[1]?.trim();
    } else if (og.title && og.title.includes(' · ')) {
      const parts = og.title.split(' · ');
      episode = parts[0].trim();
      show    = parts[1]?.trim();
    }

    return {
      title:       episode,
      show:        show,
      description: og.description,
      duration:    og.duration ? `${Math.round(og.duration / 1000 / 60)}min` : null,
    };
  }

  // ── Apple Podcasts ──────────────────────────────────────────────
  function fromApple() {
    const ld = jsonLd();
    if (ld) {
      return {
        title:       ld.name || meta('og:title') || document.title,
        show:        ld.partOfSeries?.name || ld.partOfPodcast?.name || null,
        description: ld.description || meta('og:description'),
        duration:    isoDurationToText(ld.duration),
      };
    }
    return {
      title:       meta('og:title') || document.title,
      show:        meta('apple:podcast:show') || null,
      description: meta('og:description'),
      duration:    null,
    };
  }

  // ── Generic OG / JSON-LD ────────────────────────────────────────
  function fromGeneric() {
    const ld = jsonLd();
    if (ld) {
      return {
        title:       ld.name || meta('og:title') || document.title,
        show:        ld.partOfSeries?.name || ld.partOfPodcast?.name || null,
        description: ld.description || meta('og:description'),
        duration:    isoDurationToText(ld.duration),
      };
    }
    return {
      title:       meta('og:title') || document.title,
      show:        meta('og:site_name') || null,
      description: meta('og:description'),
      duration:    null,
    };
  }

  function getInfo() {
    const platform = detectPlatform();
    const fn = platform === 'spotify' ? fromSpotify
             : platform === 'apple'   ? fromApple
             :                          fromGeneric;
    const info = fn();
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
      sendResponse(getInfo());
      return false;
    }

    if (msg.action === 'capture') {
      const info = getInfo();
      const sourceLabel = {
        spotify:     'Spotify',
        apple:       'Apple Podcasts',
        overcast:    'Overcast',
        pocketcasts: 'Pocket Casts',
        castro:      'Castro',
        generic:     info.show || 'Podcast',
      }[info.platform];

      sendResponse({
        type:        'podcast',
        title:       info.title,
        show:        info.show,
        content:     info.description || '',
        duration:    info.duration,
        url:         info.url,
        source:      sourceLabel,
      });
      return false;
    }
  });

})();
