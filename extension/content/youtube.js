// ── Segundo Cérebro · YouTube content script ────────────────────
// Captures video metadata and transcript from youtube.com/watch pages.

(function () {
  'use strict';

  if (window.__scYouTubeLoaded) return;
  window.__scYouTubeLoaded = true;

  // ── Metadata ─────────────────────────────────────────────────────
  function getVideoInfo() {
    const url      = window.location.href;
    const videoId  = new URLSearchParams(window.location.search).get('v') || '';

    // Title — try multiple selectors (YouTube changes them often)
    const title =
      document.querySelector('h1.ytd-video-primary-info-renderer yt-formatted-string')?.textContent?.trim() ||
      document.querySelector('h1.ytd-watch-metadata yt-formatted-string')?.textContent?.trim() ||
      document.querySelector('#title h1 yt-formatted-string')?.textContent?.trim() ||
      document.querySelector('h1.style-scope.ytd-video-primary-info-renderer')?.textContent?.trim() ||
      document.title.replace(' - YouTube', '').trim();

    // Channel
    const channel =
      document.querySelector('#channel-name a')?.textContent?.trim() ||
      document.querySelector('ytd-channel-name a')?.textContent?.trim() ||
      document.querySelector('#owner #channel-name')?.textContent?.trim() ||
      '';

    // Duration
    const duration =
      document.querySelector('.ytp-time-duration')?.textContent?.trim() || '';

    // Description
    const description =
      document.querySelector('#description-inline-expander ytd-text-inline-expander')?.innerText?.trim() ||
      document.querySelector('#description #text')?.innerText?.trim() ||
      document.querySelector('#description ytd-text-inline-expander')?.innerText?.trim() ||
      '';

    // Thumbnail
    const thumbnail = videoId
      ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
      : '';

    return { videoId, title, channel, duration, description, thumbnail, url };
  }

  // ── Transcript extraction ────────────────────────────────────────
  async function openAndReadTranscript() {
    // Try to find and click the "Show transcript" button inside the
    // "..." (more actions) menu or the description panel.

    // First: look for transcript button already visible
    let transcriptBtn = findTranscriptButton();

    if (!transcriptBtn) {
      // Click "more actions" ("...") button to reveal it
      const moreBtn =
        document.querySelector('#above-the-fold #menu button[aria-label="More actions"]') ||
        document.querySelector('.ytd-menu-renderer button.yt-icon-button[aria-label]');
      if (moreBtn) {
        moreBtn.click();
        await sleep(600);
        transcriptBtn = findTranscriptButton();
      }
    }

    if (!transcriptBtn) return null;

    transcriptBtn.click();
    await sleep(1000); // wait for transcript panel to render

    // Read segments
    const segments = document.querySelectorAll('ytd-transcript-segment-renderer [class*="cue"]');
    if (segments.length > 0) {
      return Array.from(segments)
        .map(s => s.textContent.trim())
        .filter(Boolean)
        .join(' ');
    }

    return null;
  }

  function findTranscriptButton() {
    // "Open transcript" aria-label
    const byAria = document.querySelector('[aria-label="Open transcript"], [aria-label="Show transcript"]');
    if (byAria) return byAria;

    // Text-based fallback
    const allItems = document.querySelectorAll('ytd-menu-service-item-renderer, tp-yt-paper-item');
    for (const item of allItems) {
      if (item.textContent.toLowerCase().includes('transcript')) return item;
    }
    return null;
  }

  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  // ── Message listener ─────────────────────────────────────────────
  chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {

    if (msg.action === 'get-info') {
      sendResponse(getVideoInfo());
      return false;
    }

    if (msg.action === 'capture') {
      const info = getVideoInfo();

      const doCapture = async () => {
        let transcript = null;
        if (msg.withTranscript !== false) {
          try { transcript = await openAndReadTranscript(); } catch (_) {}
        }

        sendResponse({
          type:        'youtube',
          title:       info.title,
          content:     transcript || info.description || '(sem conteúdo extraído)',
          hasTranscript: !!transcript,
          url:         info.url,
          source:      'YouTube',
          channel:     info.channel,
          duration:    info.duration,
          thumbnail:   info.thumbnail,
          videoId:     info.videoId,
        });
      };

      doCapture();
      return true; // async response
    }
  });

})();
