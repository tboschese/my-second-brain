// ── Segundo Cérebro · Background Service Worker ─────────────────

// ── Message router ────────────────────────────────────────────────
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {

  // Kindle: single page captured during auto-capture
  if (msg.action === 'kindle-page-captured') {
    handleKindlePage(msg.data).then(() => sendResponse({ ok: true }));
    return true;
  }

  // Popup: open the web app
  if (msg.action === 'open-webapp') {
    chrome.tabs.create({ url: 'http://localhost:3000' });
    sendResponse({ ok: true });
    return false;
  }

  // Popup / webapp: get all captures
  if (msg.action === 'get-captures') {
    chrome.storage.local.get('captures').then(({ captures = [] }) => {
      sendResponse(captures);
    });
    return true;
  }

  // Webapp: mark a capture as processed
  if (msg.action === 'mark-done') {
    markDone(msg.id).then(() => sendResponse({ ok: true }));
    return true;
  }

  // Webapp: delete a capture
  if (msg.action === 'delete-capture') {
    deleteCapture(msg.id).then(() => sendResponse({ ok: true }));
    return true;
  }
});

// ── Kindle page accumulator ───────────────────────────────────────
async function handleKindlePage({ text, bookTitle, page }) {
  if (!text || text.trim().length < 20) return;

  const { kindleSessions = {} } = await chrome.storage.local.get('kindleSessions');

  if (!kindleSessions[bookTitle]) {
    kindleSessions[bookTitle] = {
      title:     bookTitle,
      pages:     [],
      startedAt: Date.now(),
    };
  }

  // Avoid duplicates (same text already captured)
  const alreadyCaptured = kindleSessions[bookTitle].pages.some(
    p => p.text.slice(0, 80) === text.slice(0, 80)
  );
  if (alreadyCaptured) return;

  kindleSessions[bookTitle].pages.push({
    page,
    text:        text.trim(),
    capturedAt:  Date.now(),
  });

  await chrome.storage.local.set({ kindleSessions });
  updateBadge();
}

// ── Storage helpers ───────────────────────────────────────────────
async function markDone(id) {
  const { captures = [] } = await chrome.storage.local.get('captures');
  const updated = captures.map(c => c.id === id ? { ...c, status: 'done' } : c);
  await chrome.storage.local.set({ captures: updated });
  updateBadge();
}

async function deleteCapture(id) {
  const { captures = [] } = await chrome.storage.local.get('captures');
  await chrome.storage.local.set({ captures: captures.filter(c => c.id !== id) });
  updateBadge();
}

async function updateBadge() {
  const { captures = [] } = await chrome.storage.local.get('captures');
  const pending = captures.filter(c => c.status === 'pending').length;
  chrome.action.setBadgeText({ text: pending > 0 ? String(pending) : '' });
  chrome.action.setBadgeBackgroundColor({ color: '#a45c2c' });
}

// ── Install / update ──────────────────────────────────────────────
chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') {
    // Seed empty storage
    chrome.storage.local.set({ captures: [], kindleSessions: {} });
    chrome.tabs.create({ url: 'http://localhost:3000' });
  }
});
