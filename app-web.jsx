// ── Segundo Cérebro · Web App ────────────────────────────────────
// All screens read from the localStorage-backed store (data.jsx)
// and from the Chrome extension bridge (sc-captures events).
// No mock data — empty states everywhere.

// ── Design tokens ──────────────────────────────────────────────
const C = {
  paper:        '#faf7ef',
  surface1:     '#fdfaf2',
  surface2:     '#f3eee2',
  surface3:     '#e8e0cc',
  ink1:         '#1f1c14',
  ink2:         '#544f42',
  ink3:         '#928a78',
  border1:      '#e4ddc9',
  border2:      '#d4cab2',
  accent:       '#a45c2c',
  accentFaint:  'rgba(164,92,44,0.12)',
  accentMid:    'rgba(164,92,44,0.22)',
  sidebar:      '#1a1712',
  sidebarSurf:  '#242018',
  sidebarBorder:'rgba(255,255,255,0.07)',
  sidebarText:  'rgba(250,247,239,0.92)',
  sidebarMuted: 'rgba(250,247,239,0.42)',
  sidebarActive:'rgba(164,92,44,0.22)',
};
const F = {
  serif: '"Newsreader", Georgia, serif',
  sans:  '"Inter", system-ui, sans-serif',
  mono:  '"JetBrains Mono", monospace',
};

// ── Icons ──────────────────────────────────────────────────────
const I = {
  send:     ({s=16,c='#fff'})         => <svg width={s} height={s} viewBox="0 0 18 18"><path d="M2 9l13-6-4 14-3-6-6-2z" stroke={c} strokeWidth="1.6" strokeLinejoin="round" fill="none"/></svg>,
  search:   ({s=15,c='rgba(60,60,67,0.45)'}) => <svg width={s} height={s} viewBox="0 0 18 18"><circle cx="8" cy="8" r="5.5" stroke={c} strokeWidth="1.5" fill="none"/><path d="M12 12l4 4" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  sparkle:  ({s=13,c=C.accent})       => <svg width={s} height={s} viewBox="0 0 14 14"><path d="M7 1.2l1.5 4.3L12.8 7l-4.3 1.5L7 12.8l-1.5-4.3L1.2 7l4.3-1.5z" fill={c}/></svg>,
  plus:     ({s=16,c='#fff'})         => <svg width={s} height={s} viewBox="0 0 18 18"><path d="M9 3v12M3 9h12" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>,
  chev:     ({s=12,c='rgba(60,60,67,0.4)',dir='right'}) => <svg width={s/2} height={s} viewBox="0 0 7 14" style={{transform:dir==='left'?'rotate(180deg)':''}}><path d="M1 1l5 6-5 6" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>,
  close:    ({s=14,c='rgba(60,60,67,0.5)'}) => <svg width={s} height={s} viewBox="0 0 14 14"><path d="M3 3l8 8M11 3l-8 8" stroke={c} strokeWidth="1.6" strokeLinecap="round"/></svg>,
  bookmark: ({s=14,c=C.accent})       => <svg width={s} height={s} viewBox="0 0 16 16"><path d="M3.5 2.5h9v11l-4.5-3-4.5 3v-11z" stroke={c} strokeWidth="1.4" strokeLinejoin="round" fill="none"/></svg>,
  upload:   ({s=16,c=C.ink2})         => <svg width={s} height={s} viewBox="0 0 18 18"><path d="M9 12V4m0 0L6 7m3-3l3 3M3 14v1a1 1 0 001 1h10a1 1 0 001-1v-1" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>,
  trash:    ({s=14,c=C.ink3})         => <svg width={s} height={s} viewBox="0 0 16 16"><path d="M3 5h10M6 5V3h4v2M5 5l1 9h4l1-9" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>,
  youtube:  ({s=16})                  => <svg width={s} height={s} viewBox="0 0 24 24"><path d="M22.5 6.5S22.3 5 21.6 4.3c-.7-.8-1.5-.8-1.9-.8C16.8 3.3 12 3.3 12 3.3s-4.8 0-7.7.2c-.4 0-1.2.1-1.9.8C1.7 5 1.5 6.5 1.5 6.5S1.3 8.3 1.3 10v1.6c0 1.7.2 3.5.2 3.5s.2 1.5.9 2.2c.7.8 1.7.7 2.1.8 1.5.1 6.5.2 6.5.2s4.8 0 7.7-.2c.4 0 1.2-.1 1.9-.8.7-.7.9-2.2.9-2.2s.2-1.7.2-3.5V10c0-1.7-.2-3.5-.2-3.5zM9.7 14.3V8.7l5.8 2.8-5.8 2.8z" fill="#FF0000"/></svg>,
  kindle:   ({s=16,c=C.accent})       => <svg width={s} height={s} viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2" stroke={c} strokeWidth="1.5" fill="none"/><path d="M8 7h8M8 11h8M8 15h5" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  article:  ({s=16,c=C.ink2})         => <svg width={s} height={s} viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke={c} strokeWidth="1.5" fill="none"/><path d="M7 8h10M7 12h10M7 16h6" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  chat:     (a)                        => <svg width="18" height="18" viewBox="0 0 24 24"><path d="M4 7a3 3 0 013-3h10a3 3 0 013 3v8a3 3 0 01-3 3h-5l-4 3v-3H7a3 3 0 01-3-3V7z" stroke={a?C.accent:'rgba(250,247,239,0.45)'} strokeWidth="1.6" fill={a?C.accentFaint:'none'} strokeLinejoin="round"/></svg>,
  lib:      (a)                        => <svg width="18" height="18" viewBox="0 0 24 24"><path d="M5 4h3v16H5zM9 4h3v16H9zM14 5l3-1 4 15-3 1z" stroke={a?C.accent:'rgba(250,247,239,0.45)'} strokeWidth="1.6" fill="none" strokeLinejoin="round"/></svg>,
  study:    (a)                        => <svg width="18" height="18" viewBox="0 0 24 24"><rect x="4" y="6" width="12" height="14" rx="2" stroke={a?C.accent:'rgba(250,247,239,0.45)'} strokeWidth="1.6" fill="none"/><path d="M8 4h12a2 2 0 012 2v12" stroke={a?C.accent:'rgba(250,247,239,0.45)'} strokeWidth="1.6" strokeLinecap="round" fill="none"/></svg>,
  hist:     (a)                        => <svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" stroke={a?C.accent:'rgba(250,247,239,0.45)'} strokeWidth="1.6" fill="none"/><path d="M12 7v5l3 2" stroke={a?C.accent:'rgba(250,247,239,0.45)'} strokeWidth="1.6" strokeLinecap="round"/></svg>,
  inbox:    (a)                        => <svg width="18" height="18" viewBox="0 0 24 24"><path d="M3 9l2-6h14l2 6v8a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke={a?C.accent:'rgba(250,247,239,0.45)'} strokeWidth="1.6" fill={a?C.accentFaint:'none'} strokeLinejoin="round"/><path d="M3 9h4l2 3h6l2-3h4" stroke={a?C.accent:'rgba(250,247,239,0.45)'} strokeWidth="1.6" strokeLinejoin="round"/></svg>,
};

// ── Helpers ─────────────────────────────────────────────────────
function lastName(author) {
  if (!author) return '';
  return author.split(' ').filter(Boolean).slice(-1)[0] || '';
}
function timeAgo(ts) {
  const m = Math.floor((Date.now() - ts) / 60000);
  if (m < 1)  return 'agora';
  if (m < 60) return `${m}min atrás`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h atrás`;
  const d = Math.floor(h / 24);
  if (d === 1) return 'ontem';
  if (d < 30) return `${d}d atrás`;
  return new Date(ts).toLocaleDateString('pt-BR');
}
function dayBucket(ts) {
  const ms = Date.now() - ts;
  const d = ms / 86400000;
  if (d < 1) return 'hoje';
  if (d < 2) return 'ontem';
  if (d < 7) return 'esta semana';
  return 'antes';
}

// ── Book cover ──────────────────────────────────────────────────
function Cover({ book, w=76, h=112, fontSize=11 }) {
  return (
    <div style={{
      width: w, height: h, background: book.color,
      backgroundImage: 'linear-gradient(180deg,rgba(255,255,255,.07),transparent 55%,rgba(0,0,0,.2)),repeating-linear-gradient(180deg,rgba(255,255,255,.02) 0 1px,transparent 1px 3px)',
      borderRadius: '2px 4px 4px 2px',
      boxShadow: 'inset 3px 0 0 rgba(0,0,0,.18),inset 4px 0 0 rgba(255,255,255,.06),0 2px 4px rgba(0,0,0,.12),0 8px 20px -8px rgba(0,0,0,.35)',
      flexShrink: 0, color: '#fff',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      padding: '8px 7px 7px 11px',
    }}>
      <div style={{width: 9, height: 1, background: book.accent, opacity: .9}}/>
      <div style={{fontFamily: F.serif, fontSize, lineHeight: 1.05, letterSpacing: '-0.01em', fontWeight: 500}}>{book.title}</div>
      <div style={{fontSize: Math.max(7, fontSize - 3), opacity: .65, letterSpacing: '.05em', textTransform: 'uppercase', fontWeight: 500}}>{lastName(book.author)}</div>
    </div>
  );
}

// ── Sidebar ─────────────────────────────────────────────────────
function Sidebar({ active, onChange, books, highlights, captureCount, bridgeReady }) {
  const nav = [
    { id: 'chat',    label: 'Conversar',  icon: I.chat  },
    { id: 'library', label: 'Biblioteca', icon: I.lib   },
    { id: 'study',   label: 'Estudo',     icon: I.study },
    { id: 'history', label: 'Histórico',  icon: I.hist  },
    { id: 'inbox',   label: 'Capturado',  icon: I.inbox },
  ];

  return (
    <div style={{
      width: 220, height: '100%', background: C.sidebar,
      display: 'flex', flexDirection: 'column',
      borderRight: '1px solid ' + C.sidebarBorder, flexShrink: 0,
    }}>
      <div style={{padding: '28px 20px 24px', borderBottom: '1px solid ' + C.sidebarBorder}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
          <I.sparkle s={14} c={C.accent}/>
          <span style={{fontFamily: F.serif, fontSize: 16, fontWeight: 500, color: C.sidebarText, letterSpacing: '-0.02em'}}>
            Segundo Cérebro
          </span>
        </div>
      </div>

      <nav style={{padding: '12px 10px', flex: 1}}>
        {nav.map(n => {
          const a = active === n.id;
          return (
            <button key={n.id} onClick={() => onChange(n.id)} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              width: '100%', padding: '8px 10px', borderRadius: 8,
              border: 'none', background: a ? C.sidebarActive : 'transparent',
              color: a ? C.accent : C.sidebarMuted,
              fontFamily: F.sans, fontSize: 13, fontWeight: 500,
              marginBottom: 2, textAlign: 'left',
              transition: 'background .15s, color .15s',
            }}>
              {n.icon(a)}
              <span>{n.label}</span>
              {n.id === 'inbox' && captureCount > 0 && (
                <span style={{
                  marginLeft: 'auto', background: C.accent, color: '#fff',
                  borderRadius: 999, fontFamily: F.mono, fontSize: 10,
                  padding: '1px 6px', fontWeight: 600,
                }}>{captureCount}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div style={{padding: '16px 20px', borderTop: '1px solid ' + C.sidebarBorder}}>
        <div style={{fontFamily: F.mono, fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: C.sidebarMuted, marginBottom: 6}}>
          Acervo
        </div>
        <div style={{fontSize: 12, color: C.sidebarMuted, lineHeight: 1.6}}>
          {books.length} {books.length === 1 ? 'livro' : 'livros'} · {highlights.length} {highlights.length === 1 ? 'destaque' : 'destaques'}
        </div>
        <div style={{
          marginTop: 12, padding: '8px 10px', borderRadius: 7,
          background: C.sidebarSurf, border: '1px solid ' + C.sidebarBorder,
        }}>
          <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
            <div style={{width: 6, height: 6, borderRadius: '50%', background: bridgeReady ? '#4ade80' : '#a8a29e'}}/>
            <span style={{fontFamily: F.mono, fontSize: 9, letterSpacing: '.1em', textTransform: 'uppercase', color: C.sidebarMuted}}>
              Extensão Chrome
            </span>
          </div>
          <div style={{fontSize: 11, color: 'rgba(250,247,239,0.35)', marginTop: 3, lineHeight: 1.4}}>
            {bridgeReady ? 'Conectada' : 'Não detectada'}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Chat ────────────────────────────────────────────────────────
function ChatScreen({ conv, onSend, onReset, books }) {
  const scrollRef = React.useRef(null);
  const [input, setInput] = React.useState('');
  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [conv?.messages?.length]);

  const messages = conv?.messages || [];
  const isEmpty  = messages.length === 0;

  const submit = () => {
    const q = input.trim();
    if (!q) return;
    setInput('');
    onSend(q);
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden'}}>
      <div style={{
        padding: '18px 32px', borderBottom: '1px solid ' + C.border1,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
        background: C.surface1,
      }}>
        <div style={{fontFamily: F.serif, fontSize: 18, color: C.ink1, letterSpacing: '-0.015em'}}>
          {conv?.title || 'Conversar'}
        </div>
        {!isEmpty && (
          <button onClick={onReset} className="tap" style={{
            padding: '5px 12px', borderRadius: 7,
            background: 'transparent', border: '1px solid ' + C.border2,
            fontFamily: F.mono, fontSize: 11, color: C.ink3,
          }}>Nova conversa</button>
        )}
      </div>

      <div ref={scrollRef} style={{flex: 1, overflowY: 'auto', padding: '32px 0 24px'}}>
        {isEmpty ? <ChatEmpty books={books} onAsk={onSend}/> : <ChatThread messages={messages}/>}
      </div>

      <div style={{
        padding: '14px 32px 20px',
        background: 'linear-gradient(180deg,transparent,'+C.paper+' 20%)',
        flexShrink: 0,
      }}>
        <div style={{
          background: C.surface1, border: '1px solid ' + C.border2,
          borderRadius: 14, padding: '10px 8px 10px 16px',
          display: 'flex', alignItems: 'center', gap: 8,
          boxShadow: '0 4px 20px -10px rgba(80,40,10,.14)',
          maxWidth: 740,
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); submit(); }}}
            placeholder={books.length === 0 ? 'Adicione livros antes de perguntar…' : 'Pergunte ao seu segundo cérebro…'}
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontFamily: F.serif, fontSize: 15, color: C.ink1,
            }}
          />
          <button onClick={submit} className="tap" style={{
            width: 34, height: 34, borderRadius: 9, background: C.ink1, border: 'none',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            opacity: input.trim() ? 1 : .45,
          }}><I.send s={14}/></button>
        </div>
      </div>
    </div>
  );
}

function ChatEmpty({ books, onAsk }) {
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Bom dia';
    if (h < 18) return 'Boa tarde';
    return 'Boa noite';
  })();

  const recent = [...books].sort((a, b) => b.addedAt - a.addedAt).slice(0, 4);

  return (
    <div style={{maxWidth: 600, margin: '0 auto', padding: '0 32px', animation: 'fadeIn .3s'}}>
      <div style={{fontFamily: F.mono, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: C.ink3}}>{greeting}</div>
      <h1 style={{fontFamily: F.serif, fontSize: 44, fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.06, margin: '12px 0 0', color: C.ink1}}>
        {books.length === 0
          ? <>Comece a construir<br/>seu <em style={{color: C.accent}}>segundo cérebro</em>.</>
          : <>O que você quer<br/><em style={{color: C.accent}}>lembrar</em> hoje?</>
        }
      </h1>
      <p style={{fontFamily: F.serif, fontSize: 15, fontStyle: 'italic', color: C.ink2, margin: '16px 0 0', lineHeight: 1.5}}>
        {books.length === 0
          ? 'Adicione PDFs na Biblioteca ou capture páginas do Kindle, vídeos do YouTube e artigos com a extensão Chrome.'
          : `${books.length} ${books.length === 1 ? 'livro está' : 'livros estão'} prontos para consulta.`
        }
      </p>

      {recent.length > 0 && (
        <div style={{marginTop: 36}}>
          <div style={{fontFamily: F.mono, fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: C.ink3, marginBottom: 12}}>Adicionados recentemente</div>
          <div style={{display: 'flex', gap: 12}}>
            {recent.map(b => (
              <button key={b.id} className="tap" onClick={() => onAsk(`Resuma as ideias centrais de "${b.title}"`)}
                style={{border: 'none', background: 'transparent', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6}}>
                <Cover book={b} w={64} h={94} fontSize={9}/>
                <div style={{fontSize: 10, color: C.ink3, maxWidth: 64, textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{b.title}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ChatThread({ messages }) {
  return (
    <div style={{maxWidth: 680, margin: '0 auto', padding: '0 32px'}}>
      {messages.map(m =>
        m.role === 'user' ? (
          <div key={m.id} style={{
            margin: '0 0 24px', fontFamily: F.serif, fontSize: 19, fontStyle: 'italic',
            color: C.ink1, lineHeight: 1.4, letterSpacing: '-0.01em',
            borderLeft: '2px solid ' + C.accent, paddingLeft: 16,
            animation: 'fadeSlide .3s both',
          }}>{m.content}</div>
        ) : m.role === 'system' ? (
          <SystemNotice key={m.id} message={m}/>
        ) : (
          <div key={m.id} style={{
            margin: '0 0 32px', fontFamily: F.serif, fontSize: 17, lineHeight: 1.6,
            color: C.ink1, letterSpacing: '-0.005em', animation: 'fadeSlide .4s both',
            whiteSpace: 'pre-wrap',
          }}>{m.content}</div>
        )
      )}
    </div>
  );
}

function SystemNotice({ message }) {
  return (
    <div style={{
      margin: '0 0 32px', padding: '16px 18px', borderRadius: 10,
      background: C.surface2, border: '1px solid ' + C.border1,
      fontFamily: F.serif, fontSize: 14, lineHeight: 1.55, color: C.ink2,
      animation: 'fadeSlide .4s both',
    }}>
      <div style={{fontFamily: F.mono, fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: C.ink3, marginBottom: 8}}>
        Aviso do sistema
      </div>
      <div style={{whiteSpace: 'pre-wrap'}}>{message.content}</div>
    </div>
  );
}

// ── Library ─────────────────────────────────────────────────────
function LibraryScreen({ books, highlights, onOpenBook, onAdd }) {
  const [q, setQ] = React.useState('');
  const [tag, setTag] = React.useState('todos');

  const allTags = React.useMemo(() => {
    const set = new Set();
    books.forEach(b => (b.tags || []).forEach(t => set.add(t)));
    return ['todos', ...[...set].sort()];
  }, [books]);

  const filtered = books.filter(b => {
    const okTag = tag === 'todos' || (b.tags || []).includes(tag);
    const text  = (b.title + ' ' + b.author).toLowerCase();
    const okQ   = !q.trim() || text.includes(q.toLowerCase());
    return okTag && okQ;
  });

  return (
    <div style={{height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
      <div style={{
        padding: '18px 32px', borderBottom: '1px solid ' + C.border1,
        background: C.surface1, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{fontFamily: F.mono, fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: C.ink3}}>
            {books.length} {books.length === 1 ? 'livro' : 'livros'} · {highlights.length} {highlights.length === 1 ? 'destaque' : 'destaques'}
          </div>
          <div style={{fontFamily: F.serif, fontSize: 24, fontWeight: 400, letterSpacing: '-0.02em', color: C.ink1, marginTop: 2}}>Biblioteca</div>
        </div>
        <button onClick={onAdd} className="tap" style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          padding: '9px 14px', borderRadius: 9, background: C.ink1, border: 'none',
          fontFamily: F.sans, fontSize: 13, fontWeight: 500, color: C.paper,
        }}><I.plus s={14}/> Adicionar livro</button>
      </div>

      {books.length > 0 && (
        <div style={{padding: '14px 32px', borderBottom: '1px solid ' + C.border1, flexShrink: 0, background: C.surface1}}>
          <div style={{display: 'flex', gap: 10, alignItems: 'center'}}>
            <div style={{
              flex: 1, maxWidth: 340, display: 'flex', alignItems: 'center', gap: 8,
              padding: '0 12px', height: 34, borderRadius: 8, background: 'rgba(60,60,67,0.07)',
            }}>
              <I.search s={14}/>
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar título ou autor…" style={{
                flex: 1, border: 'none', outline: 'none', background: 'transparent',
                fontFamily: F.sans, fontSize: 13, color: C.ink1,
              }}/>
            </div>
            {allTags.length > 1 && (
              <div style={{display: 'flex', gap: 6, overflowX: 'auto'}}>
                {allTags.map(t => (
                  <button key={t} onClick={() => setTag(t)} className="tap" style={{
                    padding: '4px 11px', borderRadius: 999, whiteSpace: 'nowrap',
                    fontFamily: F.mono, fontSize: 11,
                    border: '1px solid ' + (tag===t ? C.ink1 : C.border1),
                    background: tag===t ? C.ink1 : 'transparent',
                    color: tag===t ? C.paper : C.ink2,
                  }}>{t}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div style={{flex: 1, overflowY: 'auto', padding: '28px 32px'}}>
        {books.length === 0 ? (
          <EmptyState
            icon={<I.lib a={false}/>}
            title="Sua biblioteca está vazia"
            description="Adicione PDFs aqui ou capture conteúdo (Kindle, YouTube, artigos) com a extensão Chrome."
            action={{label: 'Adicionar primeiro livro', onClick: onAdd}}
          />
        ) : filtered.length === 0 ? (
          <div style={{textAlign: 'center', padding: '60px 0', color: C.ink3, fontFamily: F.serif, fontStyle: 'italic', fontSize: 16}}>
            Nada encontrado para esse filtro.
          </div>
        ) : (
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '28px 20px'}}>
            {filtered.map(b => (
              <button key={b.id} onClick={() => onOpenBook(b)} className="tap" style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                border: 'none', background: 'transparent', padding: 0,
              }}>
                <Cover book={b} w={100} h={150} fontSize={11}/>
                <div style={{marginTop: 8, fontFamily: F.serif, fontSize: 12, color: C.ink1, textAlign: 'center', lineHeight: 1.25, letterSpacing: '-0.005em', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{b.title}</div>
                <div style={{fontSize: 10, color: C.ink3, textAlign: 'center', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{lastName(b.author)}</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Generic empty state ─────────────────────────────────────────
function EmptyState({ icon, title, description, action }) {
  return (
    <div style={{textAlign: 'center', padding: '80px 24px', color: C.ink3, maxWidth: 460, margin: '0 auto'}}>
      <div style={{
        width: 56, height: 56, borderRadius: 14, margin: '0 auto 18px',
        background: C.surface2, border: '1px solid ' + C.border1,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>{icon}</div>
      <div style={{fontFamily: F.serif, fontSize: 22, color: C.ink1, fontStyle: 'italic', letterSpacing: '-0.015em'}}>{title}</div>
      <div style={{fontSize: 13, marginTop: 10, lineHeight: 1.55, color: C.ink2}}>{description}</div>
      {action && (
        <button onClick={action.onClick} className="tap" style={{
          marginTop: 22, padding: '10px 18px', borderRadius: 9,
          background: C.ink1, color: C.paper, border: 'none',
          fontFamily: F.sans, fontSize: 13, fontWeight: 500,
        }}>{action.label}</button>
      )}
    </div>
  );
}

// ── Book modal ──────────────────────────────────────────────────
function BookModal({ book, highlights, onClose, onAsk, onRemove }) {
  return (
    <>
      <div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(31,28,20,0.5)',zIndex:200,animation:'fadeIn .2s'}}/>
      <div style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 540, maxHeight: '80vh', background: C.paper,
        borderRadius: 16, zIndex: 210, animation: 'fadeSlide .25s',
        boxShadow: '0 32px 80px rgba(0,0,0,0.28)', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          background: book.color, padding: '40px 32px 32px',
          display: 'flex', gap: 24, alignItems: 'flex-end', position: 'relative',
        }}>
          <button onClick={onClose} className="tap" style={{
            position: 'absolute', top: 14, right: 14,
            width: 30, height: 30, borderRadius: 15,
            background: 'rgba(0,0,0,0.25)', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><I.close s={12} c="rgba(255,255,255,0.8)"/></button>
          <Cover book={book} w={100} h={148} fontSize={12}/>
          <div style={{color: '#fff', paddingBottom: 4, minWidth: 0}}>
            <h2 style={{fontFamily: F.serif, fontSize: 24, fontWeight: 400, margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em'}}>{book.title}</h2>
            {book.subtitle && <div style={{fontSize: 13, opacity: .7, marginTop: 5, fontStyle: 'italic'}}>{book.subtitle}</div>}
            <div style={{marginTop: 8, fontSize: 13, opacity: .75}}>
              {book.author}{book.year != null ? ' · ' + book.year : ''}
            </div>
            <div style={{marginTop: 6, fontFamily: F.mono, fontSize: 10, opacity: .6, letterSpacing: '.04em', display: 'flex', gap: 8, flexWrap: 'wrap'}}>
              {book.pages != null && <><span>{book.pages}p</span><span>·</span></>}
              {book.chapters != null && <><span>{book.chapters} cap.</span><span>·</span></>}
              <span>{highlights.length} destaque{highlights.length === 1 ? '' : 's'}</span>
            </div>
          </div>
        </div>

        <div style={{padding: '20px 24px', overflowY: 'auto'}}>
          <button onClick={() => onAsk(book)} className="tap" style={{
            width: '100%', padding: '12px', borderRadius: 10,
            background: C.ink1, color: C.paper, border: 'none',
            fontFamily: F.sans, fontSize: 13, fontWeight: 500,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 20,
          }}><I.sparkle s={12} c="#fff"/> Perguntar sobre este livro</button>

          {(book.tags || []).length > 0 && (
            <>
              <div style={{fontFamily: F.mono, fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: C.ink3, marginBottom: 8}}>Tópicos</div>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20}}>
                {book.tags.map(t => (
                  <span key={t} style={{
                    padding: '4px 10px', borderRadius: 999,
                    background: C.surface2, border: '1px solid ' + C.border1,
                    fontFamily: F.mono, fontSize: 11, color: C.ink2,
                  }}>{t}</span>
                ))}
              </div>
            </>
          )}

          <div style={{fontFamily: F.mono, fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: C.ink3, marginBottom: 10}}>
            Destaques ({highlights.length})
          </div>
          {highlights.length === 0 ? (
            <div style={{padding: '20px', borderRadius: 10, background: C.surface2, border: '1px dashed ' + C.border2, fontFamily: F.serif, fontStyle: 'italic', fontSize: 13, color: C.ink3, textAlign: 'center'}}>
              Nenhum destaque salvo ainda.
            </div>
          ) : highlights.map(h => (
            <div key={h.id} style={{
              padding: '12px 14px', marginBottom: 7, borderRadius: 8,
              background: C.surface2, border: '1px solid ' + C.border1,
              fontFamily: F.serif, fontSize: 13, fontStyle: 'italic',
              color: C.ink1, lineHeight: 1.5,
            }}>
              "{h.text}"
              {(h.chapter || h.page != null) && (
                <div style={{marginTop: 6, fontFamily: F.mono, fontSize: 10, fontStyle: 'normal', color: C.ink3, letterSpacing: '.04em'}}>
                  {[h.chapter, h.page != null ? `p. ${h.page}` : null].filter(Boolean).join(' · ')}
                </div>
              )}
            </div>
          ))}

          <button onClick={() => { if (confirm('Remover este livro da biblioteca?')) onRemove(book); }} className="tap" style={{
            marginTop: 18, padding: '8px 14px', borderRadius: 8,
            background: 'transparent', border: '1px solid ' + C.border2,
            fontFamily: F.sans, fontSize: 12, color: C.ink3,
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}><I.trash s={12}/> Remover livro</button>
        </div>
      </div>
    </>
  );
}

// ── Upload modal ────────────────────────────────────────────────
function UploadModal({ onClose }) {
  const [draft, setDraft] = React.useState(null); // { file, title, author, pages }
  const fileInputRef = React.useRef(null);

  async function handleFile(file) {
    if (!file) return;
    const guessTitle = file.name
      .replace(/\.pdf$/i, '')
      .replace(/[_\-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    let pages = null;
    try {
      const buf = await file.arrayBuffer();
      const text = new TextDecoder('latin1').decode(new Uint8Array(buf));
      const matches = text.match(/\/Type\s*\/Page[^s]/g);
      if (matches) pages = matches.length;
    } catch {}

    setDraft({
      file,
      title: guessTitle,
      author: '',
      tags: '',
      pages,
    });
  }

  function onDrop(e) {
    e.preventDefault();
    const f = [...(e.dataTransfer?.files || [])].find(f => /\.pdf$/i.test(f.name));
    if (f) handleFile(f);
  }

  function commit() {
    if (!draft || !draft.title.trim()) return;
    store.addBook({
      title:    draft.title.trim(),
      author:   draft.author.trim() || '—',
      pages:    draft.pages,
      fileName: draft.file?.name || null,
      fileSize: draft.file?.size ?? null,
      tags:     draft.tags.split(',').map(s => s.trim().toLowerCase()).filter(Boolean),
      source:   'upload',
    });
    onClose();
  }

  return (
    <>
      <div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(31,28,20,0.5)',zIndex:200,animation:'fadeIn .2s'}}/>
      <div style={{
        position:'fixed',top:'50%',left:'50%',transform:'translate(-50%,-50%)',
        width:540,background:C.paper,borderRadius:16,zIndex:210,
        animation:'fadeSlide .25s',boxShadow:'0 32px 80px rgba(0,0,0,0.28)',
        overflow:'hidden', maxHeight: '80vh', display: 'flex', flexDirection: 'column',
      }}>
        <div style={{padding:'24px 28px',borderBottom:'1px solid '+C.border1,display:'flex',alignItems:'center',justifyContent:'space-between',flexShrink:0}}>
          <div style={{fontFamily:F.serif,fontSize:20,color:C.ink1,letterSpacing:'-0.015em'}}>Adicionar livro</div>
          <button onClick={onClose} className="tap" style={{width:28,height:28,borderRadius:7,background:C.surface2,border:'none',display:'flex',alignItems:'center',justifyContent:'center'}}><I.close s={12}/></button>
        </div>

        <div style={{padding:'20px 28px 28px', overflowY: 'auto'}}>
          {!draft ? (
            <>
              <div
                onDragOver={e => e.preventDefault()}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                className="tap"
                style={{
                  padding: '36px 24px', textAlign: 'center', borderRadius: 12,
                  border: '1.5px dashed ' + C.border2, background: C.surface2,
                  cursor: 'pointer',
                }}
              >
                <I.upload s={26} c={C.ink2}/>
                <div style={{fontFamily: F.serif, fontSize: 17, color: C.ink1, marginTop: 12}}>Solte o PDF aqui</div>
                <div style={{marginTop: 4, fontSize: 12, color: C.ink3}}>
                  ou <span style={{color: C.accent, textDecoration: 'underline'}}>escolha do dispositivo</span>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                style={{display: 'none'}}
                onChange={e => handleFile(e.target.files?.[0])}
              />

              <div style={{
                marginTop: 18, padding: '12px 14px', borderRadius: 8,
                background: 'rgba(164,92,44,0.06)', border: '1px solid ' + C.accentFaint,
                fontFamily: F.serif, fontSize: 13, color: C.ink2, lineHeight: 1.5,
              }}>
                Hoje só salvamos os metadados (título, autor, número de páginas). A
                extração de texto e a busca semântica do conteúdo precisam de um
                backend, ainda não conectado.
              </div>
            </>
          ) : (
            <>
              <div style={{
                display: 'flex', gap: 12, alignItems: 'center', marginBottom: 18,
                padding: '10px 14px', borderRadius: 9, background: C.surface2, border: '1px solid ' + C.border1,
              }}>
                <div style={{
                  width: 28, height: 36, borderRadius: 3,
                  background: C.accentFaint, color: C.accent,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: F.mono, fontSize: 8, fontWeight: 600,
                }}>PDF</div>
                <div style={{flex: 1, minWidth: 0}}>
                  <div style={{fontFamily: F.sans, fontSize: 13, color: C.ink1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{draft.file.name}</div>
                  <div style={{fontFamily: F.mono, fontSize: 10, color: C.ink3, marginTop: 2}}>
                    {(draft.file.size / 1024 / 1024).toFixed(1)} MB{draft.pages ? ` · ${draft.pages} páginas` : ''}
                  </div>
                </div>
                <button onClick={() => setDraft(null)} className="tap" style={{
                  fontFamily: F.mono, fontSize: 11, color: C.ink3,
                  background: 'transparent', border: 'none', padding: 0,
                }}>trocar</button>
              </div>

              <Field label="Título" value={draft.title} onChange={v => setDraft({...draft, title: v})}/>
              <Field label="Autor"  value={draft.author} onChange={v => setDraft({...draft, author: v})} placeholder="ex: Marco Aurélio"/>
              <Field label="Tags"   value={draft.tags}   onChange={v => setDraft({...draft, tags: v})}   placeholder="filosofia, estoicismo (separadas por vírgula)"/>

              <div style={{display: 'flex', gap: 8, marginTop: 18}}>
                <button onClick={onClose} className="tap" style={{
                  flex: 1, padding: '11px', borderRadius: 9,
                  background: 'transparent', color: C.ink2,
                  border: '1px solid ' + C.border2, fontFamily: F.sans, fontSize: 13,
                }}>Cancelar</button>
                <button onClick={commit} disabled={!draft.title.trim()} className="tap" style={{
                  flex: 1, padding: '11px', borderRadius: 9,
                  background: C.ink1, color: C.paper, border: 'none',
                  fontFamily: F.sans, fontSize: 13, fontWeight: 500,
                  opacity: draft.title.trim() ? 1 : 0.5,
                }}>Adicionar à biblioteca</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <label style={{display: 'block', marginBottom: 12}}>
      <div style={{fontFamily: F.mono, fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: C.ink3, marginBottom: 5}}>{label}</div>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%', padding: '9px 12px', borderRadius: 8,
          background: C.surface1, border: '1px solid ' + C.border2,
          fontFamily: F.serif, fontSize: 14, color: C.ink1, outline: 'none',
        }}
      />
    </label>
  );
}

// ── Study ───────────────────────────────────────────────────────
function StudyScreen({ flashcards, books, onRemoveCard }) {
  const [idx, setIdx] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);

  React.useEffect(() => { if (idx >= flashcards.length) setIdx(0); }, [flashcards.length]);

  if (flashcards.length === 0) {
    return (
      <div style={{height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
        <ScreenHeader counter="0 cartões" title="Flashcards"/>
        <div style={{flex: 1, overflowY: 'auto', padding: '24px 32px'}}>
          <EmptyState
            icon={<I.study a={false}/>}
            title="Nenhum flashcard ainda"
            description="Quando o backend estiver conectado, você poderá gerar flashcards a partir de qualquer resposta no chat ou de destaques de livros."
          />
        </div>
      </div>
    );
  }

  const card = flashcards[idx];
  const book = card.bookId ? books.find(b => b.id === card.bookId) : null;
  const next = () => { setFlipped(false); setIdx(i => (i + 1) % flashcards.length); };
  const prev = () => { setFlipped(false); setIdx(i => (i - 1 + flashcards.length) % flashcards.length); };

  return (
    <div style={{height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
      <div style={{padding: '18px 32px', borderBottom: '1px solid ' + C.border1, background: C.surface1, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div>
          <div style={{fontFamily: F.mono, fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: C.ink3}}>{idx + 1} de {flashcards.length}</div>
          <div style={{fontFamily: F.serif, fontSize: 24, color: C.ink1, letterSpacing: '-0.02em', marginTop: 2}}>Flashcards</div>
        </div>
        <div style={{display: 'flex', gap: 6}}>
          {flashcards.map((_, i) => (
            <div key={i} style={{width: 6, height: 6, borderRadius: '50%', background: i === idx ? C.accent : C.border2}}/>
          ))}
        </div>
      </div>

      <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 32px', overflow: 'hidden'}}>
        <div style={{width: '100%', maxWidth: 640, position: 'relative'}}>
          {flashcards.length > 1 && (
            <>
              <div style={{position:'absolute',left:12,right:12,top:8,height:320,background:C.surface2,borderRadius:16,transform:'rotate(-1.5deg)',border:'1px solid '+C.border1}}/>
              <div style={{position:'absolute',left:8,right:8,top:4,height:320,background:'#f8f3e6',borderRadius:16,transform:'rotate(1deg)',border:'1px solid '+C.border1}}/>
            </>
          )}
          <div onClick={() => setFlipped(f => !f)} className="tap" style={{position: 'relative', perspective: 1200, height: 330}}>
            <div style={{
              width: '100%', height: '100%', position: 'relative',
              transformStyle: 'preserve-3d',
              transition: 'transform .55s cubic-bezier(.3,.7,.4,1)',
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}>
              <StudyFace front>
                <div style={{fontFamily: F.mono, fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', color: C.ink3, marginBottom: 20}}>Pergunta</div>
                <div style={{fontFamily: F.serif, fontSize: 22, lineHeight: 1.3, letterSpacing: '-0.015em', color: C.ink1, flex: 1}}>{card.front}</div>
                <div style={{paddingTop: 14, borderTop: '1px solid ' + C.border1, display: 'flex', justifyContent: 'space-between', fontFamily: F.mono, fontSize: 10, color: C.ink3}}>
                  <span>Clique para virar</span>
                  {book && <span>{lastName(book.author)}{card.page != null ? ' · p.' + card.page : ''}</span>}
                </div>
              </StudyFace>
              <StudyFace>
                <div style={{fontFamily: F.mono, fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', color: C.accent, marginBottom: 20}}>Resposta</div>
                <div style={{fontFamily: F.serif, fontSize: 17, lineHeight: 1.55, color: C.ink1, flex: 1}}>{card.back}</div>
                {book && (
                  <div style={{paddingTop: 14, borderTop: '1px solid ' + C.border1, display: 'flex', alignItems: 'center', gap: 10}}>
                    <div style={{width: 3, height: 24, background: book.color, borderRadius: 1}}/>
                    <div style={{fontSize: 12, color: C.ink1, fontFamily: F.serif}}>{book.title}{card.page != null && <span style={{color: C.ink3, fontFamily: F.mono, fontSize: 10, marginLeft: 6}}>p.{card.page}</span>}</div>
                  </div>
                )}
              </StudyFace>
            </div>
          </div>
        </div>
      </div>

      <div style={{padding: '16px 32px 24px', borderTop: '1px solid ' + C.border1, flexShrink: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12}}>
        <button onClick={prev} className="tap" style={{width: 36, height: 36, borderRadius: 9, background: C.surface2, border: '1px solid ' + C.border1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}><I.chev s={12} dir="left" c={C.ink2}/></button>
        <button onClick={next} className="tap" style={{padding: '10px 28px', borderRadius: 9, background: 'transparent', color: C.accent, border: '1px solid ' + C.accent, fontFamily: F.sans, fontSize: 13, fontWeight: 500}}>Errei</button>
        <button onClick={next} className="tap" style={{padding: '10px 28px', borderRadius: 9, background: C.ink1, color: C.paper, border: 'none', fontFamily: F.sans, fontSize: 13, fontWeight: 500}}>Acertei</button>
        <button onClick={next} className="tap" style={{width: 36, height: 36, borderRadius: 9, background: C.surface2, border: '1px solid ' + C.border1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}><I.chev s={12} c={C.ink2}/></button>
      </div>
    </div>
  );
}
function StudyFace({ front, children }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
      transform: front ? 'rotateY(0deg)' : 'rotateY(180deg)',
      background: front ? C.surface1 : C.paper,
      border: '1px solid ' + C.border2, borderRadius: 16,
      padding: '28px 26px', boxShadow: '0 12px 40px -18px rgba(80,40,10,0.2)',
      display: 'flex', flexDirection: 'column',
    }}>{children}</div>
  );
}

// ── History ─────────────────────────────────────────────────────
function HistoryScreen({ conversations, books, onOpen, onDelete }) {
  if (conversations.length === 0) {
    return (
      <div style={{height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
        <ScreenHeader counter="0 conversas" title="Histórico"/>
        <div style={{flex: 1, overflowY: 'auto'}}>
          <EmptyState
            icon={<I.hist a={false}/>}
            title="Sem conversas ainda"
            description="Cada conversa que você inicia aparece aqui, agrupada por data."
          />
        </div>
      </div>
    );
  }

  const groups = { hoje: [], ontem: [], 'esta semana': [], antes: [] };
  [...conversations].sort((a, b) => b.updatedAt - a.updatedAt).forEach(c => {
    groups[dayBucket(c.updatedAt)].push(c);
  });

  return (
    <div style={{height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
      <ScreenHeader counter={`${conversations.length} conversa${conversations.length === 1 ? '' : 's'}`} title="Histórico"/>
      <div style={{flex: 1, overflowY: 'auto', padding: '24px 32px'}}>
        <div style={{maxWidth: 680}}>
          {Object.entries(groups).map(([label, items]) => items.length === 0 ? null : (
            <div key={label} style={{marginBottom: 28}}>
              <div style={{fontFamily: F.mono, fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: C.ink3, paddingBottom: 8, borderBottom: '1px solid ' + C.border1, marginBottom: 4}}>{label}</div>
              {items.map(c => {
                const refs = (c.bookIds || []).map(id => books.find(b => b.id === id)).filter(Boolean);
                return (
                  <div key={c.id} style={{display: 'flex', alignItems: 'center', gap: 8, padding: '12px 0', borderBottom: '1px solid ' + C.border1}}>
                    <button onClick={() => onOpen(c)} className="tap" style={{
                      flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 14,
                      border: 'none', background: 'transparent', textAlign: 'left', padding: 0,
                    }}>
                      <div style={{flex: 1, minWidth: 0}}>
                        <div style={{fontFamily: F.serif, fontSize: 15, color: C.ink1, letterSpacing: '-0.005em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{c.title || 'Sem título'}</div>
                        <div style={{marginTop: 5, display: 'flex', gap: 5, flexWrap: 'wrap', alignItems: 'center'}}>
                          <span style={{fontFamily: F.mono, fontSize: 9, color: C.ink3}}>{timeAgo(c.updatedAt)}</span>
                          {refs.slice(0, 3).map(b => (
                            <span key={b.id} style={{padding: '1px 7px', borderRadius: 3, background: b.color, color: '#fff', fontSize: 9, fontFamily: F.sans}}>{b.title.slice(0, 14)}</span>
                          ))}
                        </div>
                      </div>
                      <I.chev c={C.border2}/>
                    </button>
                    <button onClick={() => onDelete(c)} className="tap" style={{
                      width: 28, height: 28, borderRadius: 7, background: 'transparent',
                      border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}><I.trash s={12}/></button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScreenHeader({ counter, title, action }) {
  return (
    <div style={{padding: '18px 32px', borderBottom: '1px solid ' + C.border1, background: C.surface1, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <div>
        <div style={{fontFamily: F.mono, fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: C.ink3}}>{counter}</div>
        <div style={{fontFamily: F.serif, fontSize: 24, color: C.ink1, letterSpacing: '-0.02em', marginTop: 2}}>{title}</div>
      </div>
      {action}
    </div>
  );
}

// ── Inbox (extension captures) ──────────────────────────────────
function InboxScreen({ captures, onAdd, onIgnore, onMarkDone }) {
  const pending = captures.filter(c => c.status !== 'done');

  const typeIcon = (type) => {
    if (type === 'youtube') return <I.youtube s={16}/>;
    if (type === 'kindle')  return <I.kindle  s={16}/>;
    return <I.article s={16}/>;
  };
  const typeLabel = { youtube: 'YouTube', kindle: 'Kindle', article: 'Artigo', webpage: 'Página web' };

  return (
    <div style={{height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
      <div style={{padding: '18px 32px', borderBottom: '1px solid ' + C.border1, background: C.surface1, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div>
          <div style={{fontFamily: F.mono, fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: C.ink3}}>
            {pending.length} pendente{pending.length === 1 ? '' : 's'} · {captures.length} total
          </div>
          <div style={{fontFamily: F.serif, fontSize: 24, color: C.ink1, letterSpacing: '-0.02em', marginTop: 2}}>Capturado</div>
        </div>
      </div>

      <div style={{flex: 1, overflowY: 'auto', padding: '24px 32px'}}>
        {captures.length === 0 ? (
          <EmptyState
            icon={<I.inbox a={false}/>}
            title="Nenhum item capturado ainda"
            description="Instale a extensão Chrome (pasta extension/) e comece a capturar vídeos do YouTube, páginas do Kindle e artigos. Eles aparecem aqui em tempo real."
          />
        ) : (
          <div style={{display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 780}}>
            {captures.map(c => (
              <div key={c.id} style={{
                background: c.status === 'done' ? C.surface1 : C.paper,
                border: '1px solid ' + (c.status === 'done' ? C.border1 : C.border2),
                borderRadius: 12, padding: '16px 18px',
                display: 'flex', gap: 14, alignItems: 'flex-start',
                opacity: c.status === 'done' ? 0.7 : 1,
              }}>
                <div style={{width: 36, height: 36, borderRadius: 9, background: C.surface2, border: '1px solid ' + C.border1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                  {typeIcon(c.type)}
                </div>
                <div style={{flex: 1, minWidth: 0}}>
                  <div style={{display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 4}}>
                    <div style={{flex: 1}}>
                      <span style={{fontFamily: F.mono, fontSize: 9, letterSpacing: '.1em', textTransform: 'uppercase', color: c.type === 'youtube' ? '#FF0000' : C.accent, marginRight: 8}}>{typeLabel[c.type] || c.type}</span>
                      {c.source && <span style={{fontFamily: F.mono, fontSize: 9, color: C.ink3}}>{c.source}</span>}
                    </div>
                    <span style={{fontFamily: F.mono, fontSize: 9, color: C.ink3, flexShrink: 0}}>{timeAgo(c.capturedAt)}</span>
                  </div>
                  <div style={{fontFamily: F.serif, fontSize: 15, color: C.ink1, letterSpacing: '-0.005em', lineHeight: 1.3, marginBottom: 6}}>{c.title || 'Sem título'}</div>
                  {c.content && (
                    <p style={{fontFamily: F.sans, fontSize: 12, color: C.ink2, margin: 0, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{c.content}</p>
                  )}
                  <div style={{marginTop: 4, fontFamily: F.mono, fontSize: 9, color: C.ink3, display: 'flex', gap: 10}}>
                    {c.wordCount != null && <span>{c.wordCount.toLocaleString()} palavras</span>}
                    {c.duration && <span>Duração: {c.duration}</span>}
                  </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0}}>
                  {c.status === 'done' ? (
                    <span style={{fontFamily: F.mono, fontSize: 10, color: C.accent, letterSpacing: '.04em'}}>✓ Adicionado</span>
                  ) : (
                    <button onClick={() => onAdd(c)} className="tap" style={{padding: '7px 14px', borderRadius: 7, background: C.ink1, color: C.paper, border: 'none', fontFamily: F.sans, fontSize: 12, fontWeight: 500}}>Adicionar</button>
                  )}
                  <button onClick={() => onIgnore(c)} className="tap" style={{padding: '7px 14px', borderRadius: 7, background: 'transparent', color: C.ink3, border: '1px solid ' + C.border1, fontFamily: F.sans, fontSize: 12}}>Ignorar</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Captures bridge hook ────────────────────────────────────────
function useCaptures() {
  const [captures, setCaptures] = React.useState([]);
  const [bridgeReady, setBridgeReady] = React.useState(false);

  React.useEffect(() => {
    const onCaptures = (e) => setCaptures(Array.isArray(e.detail) ? e.detail : []);
    const onReady = () => setBridgeReady(true);
    window.addEventListener('sc-captures', onCaptures);
    window.addEventListener('sc-bridge-ready', onReady);
    window.dispatchEvent(new Event('sc-request-captures'));
    return () => {
      window.removeEventListener('sc-captures', onCaptures);
      window.removeEventListener('sc-bridge-ready', onReady);
    };
  }, []);

  return { captures, bridgeReady };
}

// ── Chat manager hook ───────────────────────────────────────────
function useConversation() {
  const [convId, setConvId] = React.useState(null);
  const conversations = store.getConversations();
  const conv = convId ? conversations.find(c => c.id === convId) : null;

  const send = React.useCallback((q) => {
    const text = (q || '').trim();
    if (!text) return;
    const now = Date.now();
    const id = convId || ('c_' + now.toString(36) + Math.random().toString(36).slice(2, 5));
    const existing = store.getConversations().find(c => c.id === id);
    const messages = existing?.messages ? [...existing.messages] : [];
    messages.push({ id: 'm_' + now.toString(36), role: 'user', content: text, at: now });
    messages.push({
      id: 'm_' + (now + 1).toString(36),
      role: 'system',
      content: 'Para responder a perguntas com citações dos seus livros, é preciso conectar um backend (extração de PDFs, embeddings e LLM). Por enquanto, suas perguntas são salvas no histórico e estarão prontas para reprocessar quando o backend estiver online.',
      at: now + 1,
    });
    store.saveConversation({
      id,
      title: existing?.title || text.slice(0, 80),
      messages,
      bookIds: existing?.bookIds || [],
      createdAt: existing?.createdAt || now,
      updatedAt: now,
    });
    setConvId(id);
  }, [convId]);

  const reset = React.useCallback(() => setConvId(null), []);
  const open  = React.useCallback((c) => setConvId(c.id), []);

  return { conv, send, reset, open };
}

// ── App ─────────────────────────────────────────────────────────
function App() {
  const [section, setSection] = React.useState('chat');
  const [overlay, setOverlay] = React.useState(null);
  const state = useStore();
  const { captures, bridgeReady } = useCaptures();
  const { conv, send, reset, open: openConv } = useConversation();

  const openBook = (book) => setOverlay({type:'book', book});
  const askAbout = (book) => {
    setOverlay(null); setSection('chat');
    send(`Resuma as ideias centrais de "${book.title}" de ${book.author}`);
  };

  const removeBook = (book) => {
    store.removeBook(book.id);
    setOverlay(null);
  };

  const addCaptureAsBook = (cap) => {
    store.addBook({
      title:     cap.title || cap.source || 'Captura',
      author:    cap.author || cap.channel || (cap.type === 'youtube' ? 'YouTube' : cap.type === 'kindle' ? 'Kindle' : 'Web'),
      source:    cap.type,
      sourceUrl: cap.url || null,
      tags:      cap.type === 'youtube' ? ['vídeo'] : cap.type === 'article' ? ['artigo'] : [],
    });
    if (cap.content) {
      const books = store.getBooks();
      const last = books[books.length - 1];
      store.addHighlight({ bookId: last.id, text: cap.content.slice(0, 600) });
    }
    window.dispatchEvent(new CustomEvent('sc-mark-done', { detail: { id: cap.id } }));
  };

  const ignoreCapture = (cap) => {
    window.dispatchEvent(new CustomEvent('sc-delete-capture', { detail: { id: cap.id } }));
  };

  const openHistory = (c) => {
    setSection('chat');
    openConv(c);
  };

  const deleteHistory = (c) => {
    if (confirm('Apagar essa conversa?')) store.deleteConversation(c.id);
  };

  const bookHighlights = overlay?.type === 'book'
    ? state.highlights.filter(h => h.bookId === overlay.book.id)
    : [];

  return (
    <div style={{display: 'flex', height: '100vh', overflow: 'hidden', background: C.paper}}>
      <Sidebar
        active={section}
        onChange={(s) => { setSection(s); setOverlay(null); }}
        books={state.books}
        highlights={state.highlights}
        captureCount={captures.filter(c => c.status !== 'done').length}
        bridgeReady={bridgeReady}
      />
      <main style={{flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
        {section === 'chat'    && <ChatScreen    conv={conv} onSend={send} onReset={reset} books={state.books}/>}
        {section === 'library' && <LibraryScreen books={state.books} highlights={state.highlights} onOpenBook={openBook} onAdd={() => setOverlay({type:'upload'})}/>}
        {section === 'study'   && <StudyScreen   flashcards={state.flashcards} books={state.books}/>}
        {section === 'history' && <HistoryScreen conversations={state.conversations} books={state.books} onOpen={openHistory} onDelete={deleteHistory}/>}
        {section === 'inbox'   && <InboxScreen   captures={captures} onAdd={addCaptureAsBook} onIgnore={ignoreCapture}/>}
      </main>

      {overlay?.type === 'book'   && <BookModal   book={overlay.book} highlights={bookHighlights} onClose={() => setOverlay(null)} onAsk={askAbout} onRemove={removeBook}/>}
      {overlay?.type === 'upload' && <UploadModal onClose={() => setOverlay(null)}/>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
