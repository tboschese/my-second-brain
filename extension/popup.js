// ── Segundo Cérebro · Extension Popup ──────────────────────────

const WEBAPP_URL = 'http://localhost:3000';

// ── SVG helpers ─────────────────────────────────────────────────
const svgYoutube = `<svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.5 6.5S22.3 5 21.6 4.3c-.7-.8-1.5-.8-1.9-.8C16.8 3.3 12 3.3 12 3.3s-4.8 0-7.7.2c-.4 0-1.2.1-1.9.8C1.7 5 1.5 6.5 1.5 6.5S1.3 8.3 1.3 10v1.6c0 1.7.2 3.5.2 3.5s.2 1.5.9 2.2c.7.8 1.7.7 2.1.8 1.5.1 6.5.2 6.5.2s4.8 0 7.7-.2c.4 0 1.2-.1 1.9-.8.7-.7.9-2.2.9-2.2s.2-1.7.2-3.5V10c0-1.7-.2-3.5-.2-3.5zM9.7 14.3V8.7l5.8 2.8-5.8 2.8z" fill="#FF0000"/></svg>`;
const svgKindle  = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="4" y="2" width="16" height="20" rx="2" stroke="#a45c2c" stroke-width="1.5"/><path d="M8 7h8M8 11h8M8 15h5" stroke="#a45c2c" stroke-width="1.5" stroke-linecap="round"/></svg>`;
const svgArticle = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#544f42" stroke-width="1.5"/><path d="M7 8h10M7 12h10M7 16h6" stroke="#544f42" stroke-width="1.5" stroke-linecap="round"/></svg>`;
const svgSparkle = `<svg width="11" height="11" viewBox="0 0 14 14"><path d="M7 1.2l1.5 4.3L12.8 7l-4.3 1.5L7 12.8l-1.5-4.3L1.2 7l4.3-1.5z" fill="#fff"/></svg>`;

// ── Time helper ─────────────────────────────────────────────────
function timeAgo(ts) {
  const m = Math.floor((Date.now() - ts) / 60000);
  if (m < 1)  return 'agora';
  if (m < 60) return `${m}min atrás`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h atrás`;
  return `${Math.floor(h / 24)}d atrás`;
}

// ── Main init ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  // Open webapp
  document.getElementById('btnOpenApp').addEventListener('click', () => {
    chrome.tabs.create({ url: WEBAPP_URL });
  });
  document.getElementById('btnViewAll').addEventListener('click', () => {
    chrome.tabs.create({ url: WEBAPP_URL + '#inbox' });
  });

  // Get active tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = tab?.url || '';

  // Match Kindle Cloud Reader on any Amazon TLD (read.amazon.com,
  // read.amazon.com.br, read.amazon.co.uk, read.amazon.de, etc.)
  const isKindle  = /^https?:\/\/read\.amazon\./i.test(url);
  const isYouTube = url.includes('youtube.com/watch');
  const type      = isKindle ? 'kindle' : isYouTube ? 'youtube' : 'article';

  renderPageCard(tab, type, url);
  await renderCaptureArea(tab, type);
  await renderRecentList();
});

// ── Page card ───────────────────────────────────────────────────
function renderPageCard(tab, type, url) {
  const iconMap  = { youtube: svgYoutube, kindle: svgKindle, article: svgArticle };
  const typeMap  = { youtube: 'YouTube', kindle: 'Kindle', article: 'Artigo / Página' };
  const hostname = (() => { try { return new URL(url).hostname.replace('www.', ''); } catch { return ''; } })();

  document.getElementById('pageIconWrap').innerHTML      = iconMap[type];
  document.getElementById('pageTypeLabel').textContent   = typeMap[type];
  document.getElementById('pageTitle').textContent       = tab?.title?.replace(' - YouTube','').replace(' - Kindle Cloud Reader','') || hostname || 'Página atual';
}

// ── Capture area ─────────────────────────────────────────────────
async function renderCaptureArea(tab, type) {
  const area = document.getElementById('captureArea');

  if (type === 'youtube') {
    await renderYouTubeCapture(area, tab);
  } else if (type === 'kindle') {
    await renderKindleCapture(area, tab);
  } else {
    renderArticleCapture(area, tab);
  }
}

// YouTube ─────────────────────────────────────────────────────────
async function renderYouTubeCapture(area, tab) {
  // Try to get video info from content script
  let info = null;
  try {
    info = await chrome.tabs.sendMessage(tab.id, { action: 'get-info' });
  } catch (_) {}

  const thumbUrl = info?.videoId
    ? `https://img.youtube.com/vi/${info.videoId}/mqdefault.jpg`
    : '';

  area.innerHTML = `
    ${thumbUrl ? `<img class="yt-thumb" src="${thumbUrl}" alt="">` : ''}
    <div class="yt-meta-row">
      ${info?.channel ? `<span class="yt-meta-label">${escHtml(info.channel)}</span>` : '<span></span>'}
      ${info?.duration ? `<span class="yt-meta-label">${escHtml(info.duration)}</span>` : ''}
    </div>
    <button class="btn-capture" id="btnCaptureYt">
      ${svgSparkle} Capturar vídeo + transcrição
    </button>
    <button class="btn-capture secondary" id="btnCaptureYtDesc">
      Capturar só descrição
    </button>
  `;

  area.querySelector('#btnCaptureYt').addEventListener('click', () => captureTab(tab, 'youtube', true));
  area.querySelector('#btnCaptureYtDesc').addEventListener('click', () => captureTab(tab, 'youtube', false));
}

// Kindle ──────────────────────────────────────────────────────────
async function renderKindleCapture(area, tab) {
  const { kindleSessions = {} } = await chrome.storage.local.get('kindleSessions');
  // Title varies by locale: "- Kindle Cloud Reader" (en),
  // "- Leitor Kindle na Nuvem" (pt-BR), "- Kindle in der Cloud" (de), etc.
  // Strip everything after the last " - " separator.
  const bookTitle = (tab?.title || '').replace(/\s*[-–—]\s*[^-–—]+$/, '').trim() || 'Livro atual';
  const session   = kindleSessions[bookTitle];
  const pageCount = session?.pages?.length || 0;
  const { kindleAutoCapture = false } = await chrome.storage.local.get('kindleAutoCapture');

  area.innerHTML = `
    <div class="kindle-meta">
      <div>
        <div class="kindle-meta-label">Capturando</div>
        <div style="font-size:11px;color:var(--ink2);margin-top:1px;font-style:italic;">${escHtml(bookTitle)}</div>
      </div>
      <span class="kindle-page-count">${pageCount} ${pageCount === 1 ? 'página' : 'páginas'}</span>
    </div>
    <button class="btn-capture" id="btnCaptureKindlePage">
      ${svgKindle.replace('a45c2c','fff').replace('a45c2c','fff')}
      Capturar página atual
    </button>
    <div class="toggle-row" style="margin-top:8px;">
      <div>
        <div class="toggle-label">Captura automática</div>
        <div class="toggle-sub">Captura cada página ao virar</div>
      </div>
      <button class="toggle ${kindleAutoCapture ? 'on' : ''}" id="toggleAutoCapture"></button>
    </div>
    ${pageCount > 0 ? `
      <div style="margin-top:10px;">
        <div class="progress-row">
          <span>Páginas capturadas</span>
          <span>${pageCount}</span>
        </div>
        <button class="btn-capture secondary" id="btnFinalizeKindle">Finalizar e adicionar à biblioteca</button>
      </div>
    ` : ''}
  `;

  area.querySelector('#btnCaptureKindlePage').addEventListener('click', () => captureTab(tab, 'kindle'));

  const toggle = area.querySelector('#toggleAutoCapture');
  toggle.addEventListener('click', async () => {
    const newVal = !toggle.classList.contains('on');
    toggle.classList.toggle('on', newVal);
    await chrome.storage.local.set({ kindleAutoCapture: newVal });
    try {
      await chrome.tabs.sendMessage(tab.id, { action: newVal ? 'start-auto-capture' : 'stop-auto-capture' });
    } catch (_) {}
  });

  if (area.querySelector('#btnFinalizeKindle')) {
    area.querySelector('#btnFinalizeKindle').addEventListener('click', () => finalizeKindleBook(bookTitle));
  }
}

// Article / generic ───────────────────────────────────────────────
function renderArticleCapture(area, tab) {
  area.innerHTML = `
    <button class="btn-capture" id="btnCaptureArticle">
      ${svgSparkle} Capturar artigo completo
    </button>
    <button class="btn-capture secondary" id="btnCaptureSelection">
      Capturar seleção
    </button>
  `;
  area.querySelector('#btnCaptureArticle').addEventListener('click',   () => captureTab(tab, 'article'));
  area.querySelector('#btnCaptureSelection').addEventListener('click', () => captureSelection(tab));
}

// ── Capture actions ──────────────────────────────────────────────
async function captureTab(tab, type, withTranscript = true) {
  const btn = document.querySelector('.btn-capture');
  if (btn) { btn.innerHTML = '<div class="spinner"></div>'; btn.disabled = true; }

  try {
    // Inject content script if needed
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: [`content/${type}.js`],
      });
    } catch (_) { /* already injected */ }

    const result = await chrome.tabs.sendMessage(tab.id, { action: 'capture', withTranscript });

    if (result) {
      await saveCapture(result);
      await renderRecentList();
      showToast('Capturado! ✓');
    }
  } catch (err) {
    showToast('Erro ao capturar. Recarregue a página.', true);
    console.error(err);
  }
}

async function captureSelection(tab) {
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content/article.js'],
    });
    const result = await chrome.tabs.sendMessage(tab.id, { action: 'capture-selection' });
    if (result) {
      await saveCapture(result);
      await renderRecentList();
      showToast('Seleção capturada! ✓');
    }
  } catch (err) {
    showToast('Selecione algum texto primeiro.', true);
  }
}

async function finalizeKindleBook(bookTitle) {
  const { kindleSessions = {} } = await chrome.storage.local.get('kindleSessions');
  const session = kindleSessions[bookTitle];
  if (!session) return;

  const fullText = session.pages.map(p => p.text).join('\n\n---\n\n');
  await saveCapture({
    type:       'kindle',
    title:      bookTitle,
    content:    fullText,
    url:        `kindle://${bookTitle}`,
    source:     'Kindle',
    pages:      session.pages.map(p => p.page),
    pageCount:  session.pages.length,
  });

  // Clear session
  delete kindleSessions[bookTitle];
  await chrome.storage.local.set({ kindleSessions });
  await renderRecentList();
  showToast(`"${bookTitle}" adicionado! ✓`);
}

// ── Storage helpers ──────────────────────────────────────────────
async function saveCapture(data) {
  const { captures = [] } = await chrome.storage.local.get('captures');
  const item = {
    id:          Date.now().toString(36) + Math.random().toString(36).slice(2),
    capturedAt:  Date.now(),
    status:      'pending',
    ...data,
  };
  captures.unshift(item);
  // Keep last 50
  if (captures.length > 50) captures.splice(50);
  await chrome.storage.local.set({ captures });
  // Update badge
  const pending = captures.filter(c => c.status === 'pending').length;
  chrome.action.setBadgeText({ text: pending > 0 ? String(pending) : '' });
  chrome.action.setBadgeBackgroundColor({ color: '#a45c2c' });
}

// ── Recent list ──────────────────────────────────────────────────
async function renderRecentList() {
  const { captures = [] } = await chrome.storage.local.get('captures');
  const list = document.getElementById('recentList');
  if (!list) return;

  if (captures.length === 0) {
    list.innerHTML = '<div class="empty-state">Nenhum item ainda.</div>';
    return;
  }

  const iconMap = { youtube: svgYoutube, kindle: svgKindle, article: svgArticle };

  list.innerHTML = captures.slice(0, 6).map(c => `
    <div class="recent-item">
      <div class="recent-icon">${iconMap[c.type] || svgArticle}</div>
      <div class="recent-info">
        <div class="recent-source">${escHtml(c.source || c.type)}</div>
        <div class="recent-title">${escHtml(c.title || 'Sem título')}</div>
        <div class="recent-time">${timeAgo(c.capturedAt)}</div>
      </div>
      <span class="recent-badge ${c.status}">${c.status === 'done' ? 'adicionado' : 'pendente'}</span>
    </div>
  `).join('');
}

// ── Toast notification ───────────────────────────────────────────
function showToast(msg, isError = false) {
  const existing = document.getElementById('sc-toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.id = 'sc-toast';
  toast.style.cssText = `
    position: fixed; bottom: 12px; left: 50%; transform: translateX(-50%);
    padding: 8px 16px; border-radius: 999px;
    background: ${isError ? '#c0392b' : '#1f1c14'};
    color: #faf7ef; font-family: 'Inter', sans-serif; font-size: 12px;
    font-weight: 500; white-space: nowrap; z-index: 999;
    animation: slideUp .2s ease;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

// ── Utility ──────────────────────────────────────────────────────
function escHtml(str) {
  return String(str || '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
