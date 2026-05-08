// ── Segundo Cérebro · Article content script ────────────────────
// Extracts the main content of any web page using a Readability-like
// scoring heuristic. Falls back to body text if no candidate wins.

(function () {
  'use strict';

  if (window.__scArticleLoaded) return;
  window.__scArticleLoaded = true;

  // ── Metadata ─────────────────────────────────────────────────────
  function getMeta(name) {
    return (
      document.querySelector(`meta[property="${name}"]`)?.content ||
      document.querySelector(`meta[name="${name}"]`)?.content ||
      ''
    );
  }

  function getPageInfo() {
    const title =
      getMeta('og:title') ||
      document.querySelector('h1')?.textContent?.trim() ||
      document.title;

    const author =
      document.querySelector('[rel="author"]')?.textContent?.trim() ||
      document.querySelector('[class*="author"] [itemprop="name"]')?.textContent?.trim() ||
      document.querySelector('[class*="byline"]')?.textContent?.trim() ||
      document.querySelector('[class*="author"]')?.textContent?.trim() ||
      getMeta('author') ||
      '';

    const siteName =
      getMeta('og:site_name') ||
      (() => { try { return new URL(window.location.href).hostname.replace('www.',''); } catch { return ''; } })();

    const description = getMeta('og:description') || getMeta('description') || '';

    return { title, author, siteName, description };
  }

  // ── Content extraction ───────────────────────────────────────────
  // Score each candidate element by text density and semantic clues.
  function extractMainContent() {
    // Preferred semantic elements (ordered by priority)
    const semantic = [
      document.querySelector('article'),
      document.querySelector('[role="main"]'),
      document.querySelector('main'),
    ].filter(Boolean);

    for (const el of semantic) {
      const text = cleanText(el.innerText);
      if (text.length > 200) return text;
    }

    // Heuristic scoring: find the div with the most text
    const candidates = Array.from(document.querySelectorAll(
      'div, section, p[class], article, main'
    ));

    let best = null, bestScore = 0;

    for (const el of candidates) {
      // Skip navigation, headers, footers, sidebars
      const tag = el.tagName.toLowerCase();
      const cls = (el.className || '').toLowerCase();
      const id  = (el.id || '').toLowerCase();
      const skipTerms = ['nav','menu','header','footer','sidebar','comment','widget','ad','promo','share','social','related','recommend','popup','modal','cookie','banner'];
      if (skipTerms.some(t => cls.includes(t) || id.includes(t))) continue;

      const text  = el.innerText?.trim() || '';
      const words = text.split(/\s+/).length;
      const links = el.querySelectorAll('a').length;
      // Text-to-link ratio favours article bodies
      const linkDensity = links / Math.max(words, 1);
      const score = words * (1 - linkDensity);

      if (score > bestScore) { bestScore = score; best = el; }
    }

    if (best && bestScore > 100) return cleanText(best.innerText);

    // Ultimate fallback
    return cleanText(document.body.innerText);
  }

  function cleanText(raw) {
    return (raw || '')
      .replace(/\n{3,}/g, '\n\n')   // collapse blank lines
      .replace(/[ \t]+/g, ' ')       // collapse horizontal whitespace
      .trim();
  }

  // ── Get selected text ────────────────────────────────────────────
  function getSelectedText() {
    const sel = window.getSelection();
    return sel && sel.toString().trim().length > 20 ? sel.toString().trim() : null;
  }

  // ── Message listener ─────────────────────────────────────────────
  chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {

    if (msg.action === 'capture') {
      const info    = getPageInfo();
      const content = extractMainContent();
      const words   = content.split(/\s+/).length;

      sendResponse({
        type:      'article',
        title:     info.title,
        content,
        url:       window.location.href,
        source:    info.siteName,
        author:    info.author,
        wordCount: words,
        description: info.description,
      });
      return false;
    }

    if (msg.action === 'capture-selection') {
      const selected = getSelectedText();
      if (!selected) { sendResponse(null); return false; }

      const info = getPageInfo();
      sendResponse({
        type:      'article',
        title:     info.title + ' (seleção)',
        content:   selected,
        url:       window.location.href,
        source:    info.siteName,
        author:    info.author,
        wordCount: selected.split(/\s+/).length,
      });
      return false;
    }

    if (msg.action === 'get-info') {
      const info = getPageInfo();
      sendResponse(info);
      return false;
    }
  });

})();
