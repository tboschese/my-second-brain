// ── Segundo Cérebro · Background Service Worker ─────────────────

// ── Message router ────────────────────────────────────────────────
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {

  if (msg.action === 'open-webapp') {
    chrome.tabs.create({ url: 'http://localhost:3000' });
    sendResponse({ ok: true });
    return false;
  }

  if (msg.action === 'get-captures') {
    chrome.storage.local.get('captures').then(({ captures = [] }) => {
      sendResponse(captures);
    });
    return true;
  }

  if (msg.action === 'mark-done') {
    markDone(msg.id).then(() => sendResponse({ ok: true }));
    return true;
  }

  if (msg.action === 'delete-capture') {
    deleteCapture(msg.id).then(() => sendResponse({ ok: true }));
    return true;
  }
});

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
    chrome.storage.local.set({ captures: [] });
    chrome.tabs.create({ url: 'http://localhost:3000' });
  }
});
