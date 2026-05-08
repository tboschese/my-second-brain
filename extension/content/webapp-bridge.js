// ── Segundo Cérebro · Web App Bridge ────────────────────────────
// Injected into http://localhost:3000 by the extension.
// Bridges chrome.storage ↔ the web app via CustomEvents on window.

(function () {
  'use strict';

  if (window.__scBridgeLoaded) return;
  window.__scBridgeLoaded = true;

  // Push current captures to the web app
  function pushCaptures() {
    chrome.storage.local.get('captures').then(({ captures = [] }) => {
      window.dispatchEvent(new CustomEvent('sc-captures', { detail: captures }));
    });
  }

  // Initial load
  pushCaptures();

  // Live updates when storage changes (e.g. new capture via popup)
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.captures) {
      window.dispatchEvent(new CustomEvent('sc-captures', {
        detail: changes.captures.newValue || [],
      }));
    }
  });

  // Handle requests from the web app
  window.addEventListener('sc-request-captures', pushCaptures);

  window.addEventListener('sc-mark-done', (e) => {
    const { id } = e.detail || {};
    if (!id) return;
    chrome.storage.local.get('captures').then(({ captures = [] }) => {
      const updated = captures.map(c => c.id === id ? { ...c, status: 'done' } : c);
      chrome.storage.local.set({ captures: updated });
    });
  });

  window.addEventListener('sc-delete-capture', (e) => {
    const { id } = e.detail || {};
    if (!id) return;
    chrome.storage.local.get('captures').then(({ captures = [] }) => {
      chrome.storage.local.set({ captures: captures.filter(c => c.id !== id) });
    });
  });

  // Let the web app know the bridge is active
  window.dispatchEvent(new CustomEvent('sc-bridge-ready'));

})();
