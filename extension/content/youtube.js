// ── Segundo Cérebro · YouTube content script ────────────────────
// Captures video metadata + transcript from youtube.com/watch.
//
// Strategy for transcripts:
//   1. Read window.ytInitialPlayerResponse (always present on watch
//      pages — it's the SPA's bootstrap data).
//   2. Find captionTracks. Prefer manual captions over auto-generated,
//      and prefer the original video language.
//   3. Fetch baseUrl with &fmt=json3 and parse the segments.
//   4. Fallback to the in-page transcript panel if the API path fails.
//
// This avoids the fragile "click the more menu, click show transcript,
// wait for the panel, scrape the DOM" dance that breaks every time
// YouTube tweaks its UI.

(function () {
  'use strict';

  if (window.__scYouTubeLoaded) return;
  window.__scYouTubeLoaded = true;

  // ── Read YouTube's bootstrap data ───────────────────────────────
  // Content scripts run in an isolated world and don't see the page's
  // window globals. We inject a small script into the page context and
  // bridge the data back via a custom event.
  function readPagePlayerResponse() {
    return new Promise((resolve) => {
      const id = 'sc-yt-' + Date.now();
      window.addEventListener(id, (e) => resolve(e.detail), { once: true });

      const code = `
        (function () {
          let r = window.ytInitialPlayerResponse || null;
          // Sometimes only ytplayer.config.args.player_response is set
          if (!r && window.ytplayer && window.ytplayer.config) {
            try { r = JSON.parse(window.ytplayer.config.args.player_response); } catch(_) {}
          }
          window.dispatchEvent(new CustomEvent(${JSON.stringify(id)}, { detail: r }));
        })();
      `;
      const s = document.createElement('script');
      s.textContent = code;
      (document.head || document.documentElement).appendChild(s);
      s.remove();

      // Safety timeout
      setTimeout(() => resolve(null), 1500);
    });
  }

  // ── Metadata ─────────────────────────────────────────────────────
  function getVideoInfo(playerResponse) {
    const url     = window.location.href;
    const videoId = new URLSearchParams(window.location.search).get('v') || '';
    const vd      = playerResponse?.videoDetails || {};

    const title =
      vd.title ||
      document.querySelector('h1.ytd-watch-metadata yt-formatted-string')?.textContent?.trim() ||
      document.querySelector('h1.ytd-video-primary-info-renderer yt-formatted-string')?.textContent?.trim() ||
      document.title.replace(/\s*[-–—]\s*YouTube\s*$/i, '').trim();

    const channel =
      vd.author ||
      document.querySelector('#channel-name a')?.textContent?.trim() ||
      document.querySelector('ytd-channel-name a')?.textContent?.trim() ||
      '';

    const durationSec = +(vd.lengthSeconds || 0);
    const duration = durationSec
      ? formatDuration(durationSec)
      : (document.querySelector('.ytp-time-duration')?.textContent?.trim() || '');

    const description =
      vd.shortDescription ||
      document.querySelector('#description-inline-expander')?.innerText?.trim() ||
      '';

    const thumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : '';

    return { videoId, title, channel, duration, description, thumbnail, url };
  }

  function formatDuration(sec) {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    if (h) return `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    return `${m}:${String(s).padStart(2,'0')}`;
  }

  // ── Transcript: API path ────────────────────────────────────────
  async function fetchTranscriptViaApi(playerResponse) {
    const tracks = playerResponse
      ?.captions
      ?.playerCaptionsTracklistRenderer
      ?.captionTracks;
    if (!tracks || !tracks.length) return null;

    // Pick the best track: prefer manual, then original language, then
    // anything else.
    const ordered = [...tracks].sort((a, b) => {
      const aManual = a.kind !== 'asr';     // 'asr' = auto-generated
      const bManual = b.kind !== 'asr';
      if (aManual !== bManual) return aManual ? -1 : 1;
      return 0;
    });

    for (const track of ordered) {
      const url = track.baseUrl + '&fmt=json3';
      try {
        const res = await fetch(url, { credentials: 'include' });
        if (!res.ok) continue;
        const data = await res.json();
        const events = data.events || [];
        const text = events
          .filter(e => e.segs)
          .map(e => e.segs.map(s => s.utf8).join('').trim())
          .filter(Boolean)
          .join(' ')
          .replace(/\n+/g, ' ')
          .replace(/\s{2,}/g, ' ')
          .trim();
        if (text.length > 50) return { text, language: track.languageCode, auto: track.kind === 'asr' };
      } catch (_) { /* try next track */ }
    }
    return null;
  }

  // ── Transcript: DOM fallback ────────────────────────────────────
  async function fetchTranscriptViaDom() {
    let btn = findTranscriptButton();
    if (!btn) {
      const moreBtn = document.querySelector('#above-the-fold #menu button[aria-label="More actions"]')
                   || document.querySelector('.ytd-menu-renderer button.yt-icon-button[aria-label]');
      if (moreBtn) {
        moreBtn.click();
        await sleep(600);
        btn = findTranscriptButton();
      }
    }
    if (!btn) return null;

    btn.click();
    await sleep(1000);

    const segs = document.querySelectorAll('ytd-transcript-segment-renderer [class*="cue"]');
    if (!segs.length) return null;
    const text = [...segs].map(s => s.textContent.trim()).filter(Boolean).join(' ');
    return text.length > 50 ? { text, auto: true } : null;
  }

  function findTranscriptButton() {
    const aria = document.querySelector('[aria-label="Open transcript"], [aria-label="Show transcript"]');
    if (aria) return aria;
    const items = document.querySelectorAll('ytd-menu-service-item-renderer, tp-yt-paper-item');
    for (const it of items) if (it.textContent.toLowerCase().includes('transcript')) return it;
    return null;
  }

  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  // ── Message listener ─────────────────────────────────────────────
  chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg.action === 'get-info') {
      readPagePlayerResponse().then(pr => sendResponse(getVideoInfo(pr)));
      return true;
    }

    if (msg.action === 'capture') {
      (async () => {
        const playerResponse = await readPagePlayerResponse();
        const info = getVideoInfo(playerResponse);

        let transcript = null;
        if (msg.withTranscript !== false) {
          transcript = await fetchTranscriptViaApi(playerResponse);
          if (!transcript) transcript = await fetchTranscriptViaDom();
        }

        const content = transcript?.text
          ? transcript.text
          : (info.description || '(este vídeo não tem legendas disponíveis)');

        sendResponse({
          type:          'youtube',
          title:         info.title,
          content,
          url:           info.url,
          source:        'YouTube',
          channel:       info.channel,
          duration:      info.duration,
          thumbnail:     info.thumbnail,
          videoId:       info.videoId,
          hasTranscript: !!transcript,
          transcriptLang: transcript?.language || null,
          transcriptAuto: transcript?.auto ?? null,
          wordCount:     content.split(/\s+/).filter(Boolean).length,
        });
      })();
      return true; // async
    }
  });

})();
