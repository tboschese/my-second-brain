// ── Segundo Cérebro · Store ─────────────────────────────────────
// Real data only — backed by localStorage. Empty by default.
// Books, highlights, conversations and flashcards live here.
// Captures (extension inbox) live in chrome.storage and are
// bridged in via webapp-bridge.js.

const STORAGE = {
  books:         'sc.books',
  highlights:    'sc.highlights',
  conversations: 'sc.conversations',
  flashcards:    'sc.flashcards',
  settings:      'sc.settings',
};

// Cover palette assigned in round-robin order to new books, so
// every spine looks distinct without needing user input.
const COVER_PALETTE = [
  { color: '#8b5a3c', accent: '#d97757' },
  { color: '#1e3a5f', accent: '#5b8fb9' },
  { color: '#0a4d3e', accent: '#7ca982' },
  { color: '#5c2a1e', accent: '#d4a574' },
  { color: '#3a3a3a', accent: '#a8a29e' },
  { color: '#1a1a2e', accent: '#9bb5d6' },
  { color: '#7d2e2e', accent: '#e8c39e' },
  { color: '#2b2b2b', accent: '#e8b923' },
  { color: '#3d2817', accent: '#bfa181' },
  { color: '#0d1b2a', accent: '#778da9' },
];

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent('sc-store-change', { detail: { key } }));
}

function newId(prefix) {
  return prefix + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

const store = {
  getBooks:         () => load(STORAGE.books,         []),
  getHighlights:    () => load(STORAGE.highlights,    []),
  getConversations: () => load(STORAGE.conversations, []),
  getFlashcards:    () => load(STORAGE.flashcards,    []),
  getSettings:      () => load(STORAGE.settings,      {}),

  // Books ─────────────────────────────────────────────────────
  addBook(input) {
    const books = store.getBooks();
    const palette = COVER_PALETTE[books.length % COVER_PALETTE.length];
    const book = {
      id:        newId('b'),
      title:     input.title || 'Sem título',
      author:    input.author || '—',
      subtitle:  input.subtitle || null,
      year:      input.year ?? null,
      pages:     input.pages ?? null,
      chapters:  input.chapters ?? null,
      tags:      input.tags || [],
      source:    input.source || 'upload',  // 'upload' | 'youtube' | 'podcast' | 'article'
      sourceUrl: input.sourceUrl || null,
      fileName:  input.fileName || null,
      fileSize:  input.fileSize ?? null,
      addedAt:   Date.now(),
      color:     input.color  || palette.color,
      accent:    input.accent || palette.accent,
    };
    books.push(book);
    save(STORAGE.books, books);
    return book;
  },

  updateBook(id, patch) {
    const books = store.getBooks();
    const i = books.findIndex(b => b.id === id);
    if (i < 0) return null;
    books[i] = { ...books[i], ...patch };
    save(STORAGE.books, books);
    return books[i];
  },

  removeBook(id) {
    save(STORAGE.books,      store.getBooks().filter(b => b.id !== id));
    save(STORAGE.highlights, store.getHighlights().filter(h => h.bookId !== id));
    save(STORAGE.flashcards, store.getFlashcards().filter(f => f.bookId !== id));
  },

  bookById(id) {
    return store.getBooks().find(b => b.id === id) || null;
  },

  // Highlights ────────────────────────────────────────────────
  addHighlight(input) {
    if (!input.bookId || !input.text) return null;
    const highlights = store.getHighlights();
    const h = {
      id:       newId('h'),
      bookId:   input.bookId,
      text:     input.text,
      page:     input.page ?? null,
      chapter:  input.chapter || null,
      note:     input.note || null,
      savedAt:  Date.now(),
    };
    highlights.push(h);
    save(STORAGE.highlights, highlights);
    return h;
  },

  removeHighlight(id) {
    save(STORAGE.highlights, store.getHighlights().filter(h => h.id !== id));
  },

  highlightsByBook(bookId) {
    return store.getHighlights().filter(h => h.bookId === bookId);
  },

  // Conversations ─────────────────────────────────────────────
  saveConversation(conv) {
    if (!conv?.id) return null;
    const list = store.getConversations();
    const i = list.findIndex(c => c.id === conv.id);
    const updated = { ...conv, updatedAt: Date.now() };
    if (i >= 0) list[i] = updated; else list.push(updated);
    save(STORAGE.conversations, list);
    return updated;
  },

  deleteConversation(id) {
    save(STORAGE.conversations, store.getConversations().filter(c => c.id !== id));
  },

  // Flashcards ────────────────────────────────────────────────
  addFlashcard(input) {
    if (!input.front || !input.back) return null;
    const cards = store.getFlashcards();
    const card = {
      id:      newId('f'),
      front:   input.front,
      back:    input.back,
      bookId:  input.bookId || null,
      page:    input.page ?? null,
      savedAt: Date.now(),
    };
    cards.push(card);
    save(STORAGE.flashcards, cards);
    return card;
  },

  removeFlashcard(id) {
    save(STORAGE.flashcards, store.getFlashcards().filter(f => f.id !== id));
  },

  // Settings ──────────────────────────────────────────────────
  saveSettings(patch) {
    save(STORAGE.settings, { ...store.getSettings(), ...patch });
  },

  // Reset (debug) ─────────────────────────────────────────────
  reset() {
    Object.values(STORAGE).forEach(k => localStorage.removeItem(k));
    window.dispatchEvent(new CustomEvent('sc-store-change', { detail: { key: '*' } }));
  },
};

// React hook — re-renders whenever the store changes.
function useStore() {
  const [, setTick] = React.useState(0);
  React.useEffect(() => {
    const bump = () => setTick(t => t + 1);
    window.addEventListener('sc-store-change', bump);
    window.addEventListener('storage', bump); // sync across tabs
    return () => {
      window.removeEventListener('sc-store-change', bump);
      window.removeEventListener('storage', bump);
    };
  }, []);
  return {
    books:         store.getBooks(),
    highlights:    store.getHighlights(),
    conversations: store.getConversations(),
    flashcards:    store.getFlashcards(),
    settings:      store.getSettings(),
  };
}

window.store    = store;
window.useStore = useStore;
