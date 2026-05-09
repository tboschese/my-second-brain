// ── Segundo Cérebro · Kindle Cloud Reader content script ─────────
// Captures text from read.amazon.com page by page.
// Works best when the user has the Kindle reader in "flow" mode (not
// fixed-layout / comics). Page content is extracted from the DOM and
// sent to the background service worker.

(function () {
  'use strict';

  if (window.__scKindleLoaded) return;
  window.__scKindleLoaded = true;

  let autoCapture  = false;
  let pageIndex    = 0;
  // Title varies by locale: "Book Title - Kindle Cloud Reader" (en),
  // "Livro - Leitor Kindle na Nuvem" (pt-BR), etc.
  // Strip the trailing " - <something>" suffix.
  const bookTitle = (document.title || '').replace(/\s*[-–—]\s*[^-–—]+$/, '').trim();

  // ── Text extraction ─────────────────────────────────────────────
  function extractPageText() {
    // Kindle Cloud Reader renders text in several possible structures
    // depending on version. Try each in order of reliability.
    const selectors = [
      // Post-2022 reader
      '[class*="kg-reading-position"] ~ *',
      '[data-automation-id="kindleReader"] [role="paragraph"]',
      '[data-automation-id="kindleReader"] p',
      // Older reader
      '#kindleReader .kg-reading-content',
      '#kindleReader .bookReaderContainer',
      '#kindleReader',
      // Generic fallback
      '[class*="readingPosition"]',
      '[class*="pageContent"]',
      'div[role="main"]',
    ];

    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el) {
        const text = el.innerText?.trim() || '';
        if (text.length > 30) return text;
      }
    }

    // Last resort: all visible text nodes in a meaningful region
    const body = document.body;
    const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT);
    const chunks = [];
    let node;
    while ((node = walker.nextNode())) {
      const t = node.nodeValue.trim();
      if (t.length > 20) chunks.push(t);
    }
    return chunks.join(' ');
  }

  // ── Send a captured page to the background ───────────────────────
  function sendPage(text) {
    if (!text || text.length < 20) return;
    chrome.runtime.sendMessage({
      action:    'kindle-page-captured',
      data:      { text, bookTitle, page: ++pageIndex },
    });
  }

  // ── Auto-capture on page navigation ─────────────────────────────
  // Kindle flips pages via keyboard, clicks on edges, or swipe.
  // We observe DOM mutations to detect when new content loads,
  // throttled to avoid double-captures.
  let lastCapture = 0;
  let captureTimeout = null;

  function scheduleCaptureIfAuto() {
    if (!autoCapture) return;
    clearTimeout(captureTimeout);
    captureTimeout = setTimeout(() => {
      const now = Date.now();
      if (now - lastCapture < 800) return; // debounce
      lastCapture = now;
      sendPage(extractPageText());
    }, 600); // wait 600ms for page render to settle
  }

  // MutationObserver: watches for content DOM changes (new page rendered)
  const observer = new MutationObserver(() => scheduleCaptureIfAuto());
  observer.observe(document.body, {
    childList: true,
    subtree:   true,
    characterData: false,
  });

  // Keyboard navigation (arrow keys / space)
  document.addEventListener('keyup', (e) => {
    if (['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', ' '].includes(e.key)) {
      scheduleCaptureIfAuto();
    }
  }, true);

  // Click on left / right navigation areas
  document.addEventListener('click', (e) => {
    const x = e.clientX / window.innerWidth;
    if (x < 0.15 || x > 0.85) scheduleCaptureIfAuto();
  }, true);

  // ── Message listener (popup + background) ───────────────────────
  chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {

    if (msg.action === 'capture') {
      const text = extractPageText();
      sendPage(text);
      sendResponse({
        type:    'kindle',
        title:   bookTitle,
        content: text,
        url:     window.location.href,
        source:  'Kindle',
      });
      return false;
    }

    if (msg.action === 'start-auto-capture') {
      autoCapture = true;
      sendResponse({ ok: true, active: true });
      return false;
    }

    if (msg.action === 'stop-auto-capture') {
      autoCapture = false;
      sendResponse({ ok: true, active: false });
      return false;
    }

    if (msg.action === 'get-status') {
      sendResponse({ autoCapture, pageIndex, bookTitle });
      return false;
    }
  });

})();
