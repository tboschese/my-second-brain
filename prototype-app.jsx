// Navigable prototype — single phone, state-based screen routing.

// ── Tokens ──
const C = {
  paper: '#faf7ef',
  surface1: '#fdfaf2',
  surface2: '#f3eee2',
  surface3: '#e8e0cc',
  ink1: '#1f1c14',
  ink2: '#544f42',
  ink3: '#928a78',
  border1: '#e4ddc9',
  border2: '#d4cab2',
  accent: '#a45c2c',
  accentFaint: 'rgba(164,92,44,0.13)',
};
const F = {
  serif: '"Newsreader", Georgia, serif',
  sans: '-apple-system, "Inter", system-ui, sans-serif',
  mono: '"JetBrains Mono", monospace',
};

// ── Icons ──
const I = {
  send: ({ s = 16, c = '#fff' }) => <svg width={s} height={s} viewBox="0 0 18 18"><path d="M2 9l13-6-4 14-3-6-6-2z" stroke={c} strokeWidth="1.6" strokeLinejoin="round" fill="none"/></svg>,
  search: ({ s = 16, c = 'rgba(60,60,67,0.5)' }) => <svg width={s} height={s} viewBox="0 0 18 18"><circle cx="8" cy="8" r="5.5" stroke={c} strokeWidth="1.6" fill="none"/><path d="M12 12l4 4" stroke={c} strokeWidth="1.6" strokeLinecap="round"/></svg>,
  sparkle: ({ s = 13, c = C.accent }) => <svg width={s} height={s} viewBox="0 0 14 14"><path d="M7 1.2l1.5 4.3L12.8 7l-4.3 1.5L7 12.8l-1.5-4.3L1.2 7l4.3-1.5z" fill={c}/></svg>,
  plus: ({ s = 18, c = '#fff' }) => <svg width={s} height={s} viewBox="0 0 18 18"><path d="M9 3v12M3 9h12" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>,
  chev: ({ s = 12, c = 'rgba(60,60,67,0.4)', dir = 'right' }) => <svg width={s/2} height={s} viewBox="0 0 7 14" style={{transform: dir === 'left' ? 'rotate(180deg)' : ''}}><path d="M1 1l5 6-5 6" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>,
  close: ({ s = 14, c = 'rgba(60,60,67,0.5)' }) => <svg width={s} height={s} viewBox="0 0 14 14"><path d="M3 3l8 8M11 3l-8 8" stroke={c} strokeWidth="1.6" strokeLinecap="round"/></svg>,
  back: ({ s = 18, c = C.ink1 }) => <svg width={s} height={s} viewBox="0 0 18 18"><path d="M11 3L5 9l6 6" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>,
  bookmark: ({ s = 14, c = C.accent }) => <svg width={s} height={s} viewBox="0 0 16 16"><path d="M3.5 2.5h9v11l-4.5-3-4.5 3v-11z" stroke={c} strokeWidth="1.4" strokeLinejoin="round" fill="none"/></svg>,
  chat: (a) => <svg width="22" height="22" viewBox="0 0 24 24"><path d="M4 7a3 3 0 013-3h10a3 3 0 013 3v8a3 3 0 01-3 3h-5l-4 3v-3H7a3 3 0 01-3-3V7z" stroke={a ? C.accent : 'rgba(60,60,67,0.55)'} strokeWidth={1.7} fill={a ? C.accentFaint : 'none'} strokeLinejoin="round"/></svg>,
  lib: (a) => <svg width="22" height="22" viewBox="0 0 24 24"><path d="M5 4h3v16H5zM9 4h3v16H9zM14 5l3-1 4 15-3 1z" stroke={a ? C.accent : 'rgba(60,60,67,0.55)'} strokeWidth={1.7} fill={a ? C.accentFaint : 'none'} strokeLinejoin="round"/></svg>,
  study: (a) => <svg width="22" height="22" viewBox="0 0 24 24"><rect x="4" y="6" width="12" height="14" rx="2" stroke={a ? C.accent : 'rgba(60,60,67,0.55)'} strokeWidth={1.7} fill={a ? C.accentFaint : 'none'}/><path d="M8 4h12a2 2 0 012 2v12" stroke={a ? C.accent : 'rgba(60,60,67,0.55)'} strokeWidth={1.7} strokeLinecap="round" fill="none"/></svg>,
  hist: (a) => <svg width="22" height="22" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" stroke={a ? C.accent : 'rgba(60,60,67,0.55)'} strokeWidth={1.7} fill={a ? C.accentFaint : 'none'}/><path d="M12 7v5l3 2" stroke={a ? C.accent : 'rgba(60,60,67,0.55)'} strokeWidth={1.7} strokeLinecap="round"/></svg>,
};

// ── Book cover ──
function Cover({ book, w = 76, h = 112, fontSize = 11 }) {
  return (
    <div style={{
      width: w, height: h, background: book.color,
      backgroundImage: 'linear-gradient(180deg,rgba(255,255,255,.06),transparent 60%,rgba(0,0,0,.22)),repeating-linear-gradient(180deg,rgba(255,255,255,.02) 0 1px,transparent 1px 3px)',
      borderRadius: '2px 4px 4px 2px',
      boxShadow: 'inset 3px 0 0 rgba(0,0,0,.18),inset 4px 0 0 rgba(255,255,255,.06),0 1px 2px rgba(0,0,0,.15),0 8px 16px -6px rgba(0,0,0,.32)',
      flexShrink: 0, color: '#fff',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      padding: '8px 7px 7px 11px',
    }}>
      <div style={{width: 9, height: 1, background: book.accent, opacity: .9}}/>
      <div style={{fontFamily: F.serif, fontSize, lineHeight: 1.05, letterSpacing: '-0.01em', textWrap: 'balance', fontWeight: 500}}>{book.title}</div>
      <div style={{fontSize: fontSize - 3, opacity: .7, letterSpacing: '.04em', textTransform: 'uppercase', fontWeight: 500}}>{book.author.split(' ').slice(-1)[0]}</div>
    </div>
  );
}

// ── Phone shell ──
function Phone({ children }) {
  return (
    <div style={{
      width: 380, height: 800, borderRadius: 48, overflow: 'hidden',
      position: 'relative', background: C.paper,
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
      fontFamily: F.sans,
    }}>
      <div style={{
        position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
        width: 118, height: 34, borderRadius: 22, background: '#000', zIndex: 100,
      }}/>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 90,
        display: 'flex', justifyContent: 'space-between',
        padding: '20px 30px 0', pointerEvents: 'none',
      }}>
        <span style={{fontFamily: F.sans, fontWeight: 600, fontSize: 15, color: '#000'}}>9:41</span>
        <div style={{display: 'flex', gap: 6, alignItems: 'center'}}>
          <svg width="16" height="11" viewBox="0 0 16 11"><rect x="0" y="7" width="2.6" height="4" rx="0.6" fill="#000"/><rect x="4" y="4.5" width="2.6" height="6.5" rx="0.6" fill="#000"/><rect x="8" y="2" width="2.6" height="9" rx="0.6" fill="#000"/><rect x="12" y="0" width="2.6" height="11" rx="0.6" fill="#000"/></svg>
          <svg width="22" height="11" viewBox="0 0 22 11"><rect x="0.5" y="0.5" width="19" height="10" rx="3" stroke="#000" strokeOpacity=".35" fill="none"/><rect x="2" y="2" width="16" height="7" rx="1.5" fill="#000"/></svg>
        </div>
      </div>
      <div className="phone-screen" style={{height: '100%', position: 'relative', overflow: 'hidden'}}>
        {children}
      </div>
      <div style={{
        position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
        width: 130, height: 4, borderRadius: 100,
        background: 'rgba(0,0,0,0.28)', zIndex: 100, pointerEvents: 'none',
      }}/>
    </div>
  );
}

// ── Tab bar ──
function TabBar({ active, onChange }) {
  const tabs = [
    {id: 'chat', label: 'Conversar', icon: I.chat},
    {id: 'library', label: 'Biblioteca', icon: I.lib},
    {id: 'study', label: 'Estudo', icon: I.study},
    {id: 'history', label: 'Histórico', icon: I.hist},
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      paddingBottom: 28, paddingTop: 8,
      background: 'rgba(250,247,239,0.86)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderTop: '0.5px solid rgba(60,60,67,0.18)',
      display: 'flex', justifyContent: 'space-around', zIndex: 30,
    }}>
      {tabs.map(t => {
        const a = active === t.id;
        return (
          <button key={t.id} onClick={() => onChange(t.id)} className="tap" style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            padding: '4px 10px', border: 'none', background: 'transparent',
          }}>
            {t.icon(a)}
            <span style={{fontSize: 10, color: a ? C.accent : 'rgba(60,60,67,0.55)', fontWeight: 500}}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── Chat ──
function ChatScreen({ state, dispatch }) {
  const scrollRef = React.useRef(null);
  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [state.messages.length, state.streaming]);

  const isEmpty = state.messages.length === 0;

  return (
    <>
      <div ref={scrollRef} style={{
        height: '100%', overflowY: 'auto', paddingTop: 56, paddingBottom: 200,
      }}>
        {isEmpty ? <ChatEmpty dispatch={dispatch} /> : <ChatThread state={state} dispatch={dispatch} />}
      </div>
      <Composer
        value={state.input}
        onChange={(v) => dispatch({type: 'input', v})}
        onSend={() => dispatch({type: 'send'})}
        onClear={isEmpty ? null : () => dispatch({type: 'reset'})}
      />
    </>
  );
}

function ChatEmpty({ dispatch }) {
  return (
    <div style={{padding: '12px 22px 0', animation: 'fadeIn .3s'}}>
      <div style={{fontFamily: F.mono, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(60,60,67,0.5)', marginBottom: 6}}>Boa noite, M</div>
      <h1 style={{fontFamily: F.serif, fontSize: 36, fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.05, margin: '14px 0 0', color: C.ink1}}>
        O que você quer<br/><em style={{color: C.accent}}>lembrar</em> hoje?
      </h1>
      <p style={{fontFamily: F.serif, fontSize: 14, fontStyle: 'italic', color: C.ink2, margin: '14px 0 0', lineHeight: 1.45}}>
        Pergunte qualquer coisa. Vou cruzar o que você já leu e mostrar de onde veio cada ideia.
      </p>

      <div style={{marginTop: 28}}>
        <div style={{fontFamily: F.mono, fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(60,60,67,0.55)', marginBottom: 10}}>Sugestões do seu acervo</div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
          {SUGGESTED_QUESTIONS.slice(0, 4).map((q, i) => (
            <button key={i} className="tap" onClick={() => dispatch({type: 'ask', q})} style={{
              padding: '12px 14px', borderRadius: 12,
              background: C.surface2, border: '0.5px solid ' + C.border1,
              fontFamily: F.serif, fontSize: 14, color: C.ink1,
              letterSpacing: '-0.005em', lineHeight: 1.35, textAlign: 'left',
              display: 'flex', alignItems: 'center', gap: 10,
              animation: `fadeSlide .4s ${i * 50}ms both`,
            }}>
              <span style={{flex: 1}}>{q}</span>
              <I.chev c="rgba(164,92,44,0.7)" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatThread({ state, dispatch }) {
  return (
    <div style={{padding: '0 0 0'}}>
      {state.messages.map((m, idx) => (
        m.role === 'user' ? (
          <div key={m.id} style={{
            margin: '12px 22px 20px',
            fontFamily: F.serif, fontSize: 17, fontStyle: 'italic',
            color: C.ink1, letterSpacing: '-0.01em', lineHeight: 1.4,
            borderLeft: `2px solid ${C.accent}`, paddingLeft: 12,
            animation: 'fadeSlide .3s both',
          }}>{m.content}</div>
        ) : (
          <Answer key={m.id} dispatch={dispatch} />
        )
      ))}
      {state.streaming && (
        <div style={{padding: '4px 22px', display: 'flex', alignItems: 'center', gap: 10}}>
          <span style={{display: 'inline-flex', gap: 3}}>
            {[0, .15, .3].map((d, i) => <span key={i} style={{width: 5, height: 5, borderRadius: '50%', background: C.ink3, animation: `dotPulse 1.2s ${d}s infinite`}}/>)}
          </span>
          <span style={{fontSize: 13, color: C.ink3, fontFamily: F.sans}}>lendo seus livros…</span>
        </div>
      )}
    </div>
  );
}

function Answer({ dispatch }) {
  const cite = (n) => (
    <sup>
      <button onClick={() => dispatch({type: 'cite', n})} style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 16, height: 16, borderRadius: 3,
        background: C.accentFaint, color: C.accent, border: 'none',
        fontFamily: F.mono, fontSize: 9, fontWeight: 600, cursor: 'pointer',
        margin: '0 1px', verticalAlign: 'super',
      }}>{n}</button>
    </sup>
  );
  return (
    <div style={{padding: '0 22px', fontFamily: F.serif, fontSize: 16, lineHeight: 1.55, color: C.ink1, letterSpacing: '-0.005em', animation: 'fadeSlide .4s both'}}>
      <p style={{margin: '0 0 1em'}}>
        Csikszentmihalyi argumenta que satisfação profunda surge quando você é
        empurrado até o limite das suas capacidades em algo que importa{cite(1)}.
      </p>
      <p style={{margin: '0 0 1em'}}>
        Cal Newport leva isso para o trabalho moderno — chama de <em>foco profundo</em>{cite(2)} —
        e James Clear oferece a régua: motivação no auge quando o desafio fica logo acima da habilidade{cite(3)}.
      </p>
      <div style={{
        margin: '18px 0', padding: 14,
        background: C.surface2, border: '0.5px solid ' + C.border1, borderRadius: 10,
      }}>
        <div style={{fontFamily: F.mono, fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: C.accent, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5}}>
          <I.sparkle s={10}/> Conexão inesperada
        </div>
        <div style={{fontSize: 14, lineHeight: 1.5}}>
          Talvez não sejam três conceitos — talvez seja o mesmo, observado de três janelas.
        </div>
      </div>
      <p style={{margin: '0 0 1em'}}>
        Curioso: Kahneman lembra que esse estado tem um custo — "cegueira por desatenção"{cite(4)}.
      </p>

      <div style={{marginTop: 18, paddingTop: 16, borderTop: '0.5px solid ' + C.border1}}>
        <div style={{fontFamily: F.mono, fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(60,60,67,0.55)', marginBottom: 10}}>4 fontes</div>
        <div style={{display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4}}>
          {['flow','deepwork','atomic','thinking'].map(id => (
            <Cover key={id} book={bookById(id)} w={56} h={82} fontSize={9}/>
          ))}
        </div>
      </div>

      <div style={{marginTop: 18, display: 'flex', flexWrap: 'wrap', gap: 6}}>
        {['Aplicar à minha semana?', 'Gerar flashcards', 'O que Taleb diria?'].map((f, i) => (
          <button key={i} onClick={() => dispatch({type: 'ask', q: f})} className="tap" style={{
            padding: '6px 12px', borderRadius: 999,
            background: C.surface2, border: '0.5px solid ' + C.border1,
            fontFamily: F.sans, fontSize: 11.5, color: C.ink2,
          }}>{f}</button>
        ))}
      </div>
    </div>
  );
}

function Composer({ value, onChange, onSend, onClear }) {
  return (
    <div style={{
      position: 'absolute', bottom: 78, left: 0, right: 0, padding: '12px 16px',
      background: 'linear-gradient(180deg, transparent, ' + C.paper + ' 30%)',
    }}>
      <div style={{
        background: C.surface1, border: '0.5px solid ' + C.border2,
        borderRadius: 22, padding: '10px 6px 10px 14px',
        display: 'flex', alignItems: 'center', gap: 8,
        boxShadow: '0 8px 24px -12px rgba(80,40,10,.18)',
      }}>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') onSend(); }}
          placeholder="Pergunte ao seu segundo cérebro…"
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontFamily: F.serif, fontSize: 15, color: C.ink1, minWidth: 0,
          }}
        />
        {onClear && (
          <button onClick={onClear} className="tap" style={{
            width: 28, height: 28, borderRadius: 999, background: 'transparent', border: 'none',
            color: C.ink3, fontSize: 11, fontFamily: F.mono,
          }}>nova</button>
        )}
        <button onClick={onSend} className="tap" style={{
          width: 32, height: 32, borderRadius: 999, background: C.ink1, border: 'none',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          opacity: value.trim() ? 1 : .5,
        }}><I.send s={14}/></button>
      </div>
    </div>
  );
}

// ── Citation sheet ──
function CitationSheet({ n, onClose, onOpenBook }) {
  const c = CITATIONS_FLOW.find(x => x.n === n);
  if (!c) return null;
  const book = bookById(c.bookId);
  return (
    <>
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0, background: 'rgba(31,28,20,0.42)',
        zIndex: 80, animation: 'fadeIn .2s',
      }}/>
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 90,
        background: C.surface1, borderRadius: '20px 20px 0 0',
        padding: '10px 22px 32px',
        boxShadow: '0 -10px 40px rgba(0,0,0,0.18)',
        animation: 'slideUp .3s cubic-bezier(.2,.7,.3,1)',
      }}>
        <div style={{width: 36, height: 4, borderRadius: 2, background: 'rgba(60,60,67,0.25)', margin: '0 auto 14px'}}/>
        <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16}}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 22, height: 22, borderRadius: 5,
            background: C.accent, color: '#fff',
            fontFamily: F.mono, fontSize: 11, fontWeight: 600,
          }}>{c.n}</span>
          <span style={{fontFamily: F.mono, fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: C.accent}}>Trecho original</span>
          <button onClick={onClose} className="tap" style={{
            marginLeft: 'auto', width: 28, height: 28, borderRadius: 14,
            background: 'rgba(60,60,67,0.08)', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><I.close/></button>
        </div>
        <div style={{display: 'flex', gap: 14, marginBottom: 16}}>
          <Cover book={book} w={56} h={82} fontSize={9}/>
          <div style={{paddingTop: 4, minWidth: 0}}>
            <div style={{fontFamily: F.serif, fontSize: 17, color: C.ink1, letterSpacing: '-0.01em', lineHeight: 1.2}}>{book.title}</div>
            <div style={{fontSize: 12, color: C.ink2, marginTop: 3}}>{book.author}</div>
            <div style={{marginTop: 6, fontSize: 10, fontFamily: F.mono, color: 'rgba(60,60,67,0.55)', letterSpacing: '.04em'}}>{c.chapter} · p. {c.page}</div>
          </div>
        </div>
        <blockquote style={{
          margin: 0, padding: '0 0 0 14px', borderLeft: '2px solid ' + C.accent,
          fontFamily: F.serif, fontSize: 15, lineHeight: 1.55, color: C.ink1,
          fontStyle: 'italic', letterSpacing: '-0.005em',
          maxHeight: 140, overflowY: 'auto',
        }}>"{c.quote}"</blockquote>
        <div style={{display: 'flex', gap: 8, marginTop: 18}}>
          <button onClick={() => onOpenBook(book)} className="tap" style={{
            flex: 1, padding: '11px 16px', borderRadius: 10,
            background: C.ink1, color: C.paper, border: 'none',
            fontFamily: F.sans, fontSize: 13, fontWeight: 500,
          }}>Abrir livro</button>
          <button className="tap" style={{
            flex: 1, padding: '11px 16px', borderRadius: 10,
            background: 'transparent', color: C.ink2,
            border: '0.5px solid ' + C.border2, fontFamily: F.sans, fontSize: 13, fontWeight: 500,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}><I.bookmark s={13}/> Salvar destaque</button>
        </div>
      </div>
    </>
  );
}

// ── Library ──
function LibraryScreen({ onOpenBook, onAdd }) {
  const [tag, setTag] = React.useState('todos');
  const [q, setQ] = React.useState('');
  const tags = ['todos', 'psicologia', 'filosofia', 'produtividade', 'criatividade', 'história'];

  const filtered = BOOKS.filter(b => {
    const okTag = tag === 'todos' || b.tags.includes(tag);
    const okQ = !q.trim() || b.title.toLowerCase().includes(q.toLowerCase()) || b.author.toLowerCase().includes(q.toLowerCase());
    return okTag && okQ;
  });

  return (
    <>
      <div style={{height: '100%', overflowY: 'auto', paddingTop: 56, paddingBottom: 100}}>
        <div style={{padding: '12px 22px 0'}}>
          <div style={{fontFamily: F.mono, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(60,60,67,0.55)', marginBottom: 6}}>{BOOKS.length} livros · {BOOKS.reduce((s,b)=>s+b.highlights,0)} destaques</div>
          <h1 style={{fontFamily: F.serif, fontSize: 34, fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1, margin: 0, color: C.ink1}}>Biblioteca</h1>
        </div>
        <div style={{padding: '16px 22px 0'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', height: 36, borderRadius: 10, background: 'rgba(60,60,67,0.08)'}}>
            <I.search s={15}/>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar título ou autor…" style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontFamily: F.sans, fontSize: 14, color: C.ink1,
            }}/>
          </div>
        </div>
        <div style={{display: 'flex', gap: 6, padding: '14px 22px 0', overflowX: 'auto'}}>
          {tags.map(t => (
            <button key={t} onClick={() => setTag(t)} className="tap" style={{
              padding: '5px 12px', borderRadius: 999,
              fontFamily: F.mono, fontSize: 11,
              border: '0.5px solid ' + (tag === t ? C.ink1 : C.border1),
              background: tag === t ? C.ink1 : 'transparent',
              color: tag === t ? C.paper : C.ink2, flexShrink: 0,
            }}>{t}</button>
          ))}
        </div>
        <div style={{padding: '24px 22px 0', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px 14px'}}>
          {filtered.map(b => (
            <button key={b.id} onClick={() => onOpenBook(b)} className="tap" style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              border: 'none', background: 'transparent', padding: 0,
            }}>
              <Cover book={b} w={92} h={138} fontSize={10}/>
              <div style={{marginTop: 8, fontFamily: F.serif, fontSize: 11.5, color: C.ink1, textAlign: 'center', lineHeight: 1.2, letterSpacing: '-0.005em', width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{b.title}</div>
              <div style={{fontSize: 9.5, color: 'rgba(60,60,67,0.5)', fontFamily: F.sans, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'center'}}>{b.author.split(' ').slice(-1)[0]}</div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: 40, color: C.ink3, fontFamily: F.serif, fontStyle: 'italic'}}>Nada encontrado.</div>
          )}
        </div>
      </div>
      <button onClick={onAdd} className="tap" style={{
        position: 'absolute', bottom: 96, right: 18,
        width: 52, height: 52, borderRadius: 26, background: C.accent, border: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(164,92,44,0.4), 0 8px 24px rgba(0,0,0,0.12)',
        zIndex: 25,
      }}><I.plus s={20}/></button>
    </>
  );
}

// ── Book detail (push-modal) ──
function BookDetail({ book, onClose, onAsk }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, background: C.paper, zIndex: 95,
      animation: 'fadeIn .2s',
      overflowY: 'auto',
    }}>
      <div style={{paddingTop: 56, position: 'relative'}}>
        <button onClick={onClose} className="tap" style={{
          position: 'absolute', top: 56, left: 16, zIndex: 5,
          width: 36, height: 36, borderRadius: 18,
          background: 'rgba(255,255,255,0.7)', border: '0.5px solid ' + C.border1,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(10px)',
        }}><I.back/></button>

        <div style={{display: 'flex', justifyContent: 'center', padding: '50px 22px 24px'}}>
          <Cover book={book} w={140} h={210} fontSize={15}/>
        </div>
        <div style={{padding: '0 22px', textAlign: 'center'}}>
          <h2 style={{fontFamily: F.serif, fontSize: 26, fontWeight: 400, letterSpacing: '-0.02em', margin: 0, color: C.ink1, lineHeight: 1.1}}>{book.title}</h2>
          {book.subtitle && <div style={{fontFamily: F.serif, fontStyle: 'italic', color: C.ink2, marginTop: 6, fontSize: 14}}>{book.subtitle}</div>}
          <div style={{marginTop: 10, fontSize: 13, color: C.ink2}}>{book.author} · {book.year}</div>
          <div style={{marginTop: 10, fontFamily: F.mono, fontSize: 10, letterSpacing: '.06em', color: C.ink3, display: 'flex', justifyContent: 'center', gap: 10}}>
            <span>{book.pages}p</span><span>·</span>
            <span>{book.chapters} capítulos</span><span>·</span>
            <span>{book.highlights} destaques</span>
          </div>
        </div>

        <div style={{padding: '24px 22px 0'}}>
          <button onClick={() => onAsk(book)} className="tap" style={{
            width: '100%', padding: '14px', borderRadius: 12,
            background: C.ink1, color: C.paper, border: 'none',
            fontFamily: F.sans, fontSize: 14, fontWeight: 500,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}><I.sparkle s={13} c="#fff"/> Perguntar sobre este livro</button>
        </div>

        <div style={{padding: '28px 22px 60px'}}>
          <div style={{fontFamily: F.mono, fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: C.ink3, marginBottom: 12}}>Tópicos cobertos</div>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: 6}}>
            {book.tags.map(t => (
              <span key={t} style={{
                padding: '5px 11px', borderRadius: 999,
                background: C.surface2, border: '0.5px solid ' + C.border1,
                fontFamily: F.mono, fontSize: 11, color: C.ink2,
              }}>{t}</span>
            ))}
          </div>

          <div style={{marginTop: 28, fontFamily: F.mono, fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: C.ink3, marginBottom: 12}}>Destaques recentes</div>
          {[
            'Os melhores momentos ocorrem quando o corpo ou a mente está sendo levado aos seus limites.',
            'A atenção é a moeda mais escassa do nosso tempo.',
            'Não é o que sentimos — é o que fazemos com o que sentimos.',
          ].map((q, i) => (
            <div key={i} style={{
              padding: '14px 16px', marginBottom: 8, borderRadius: 10,
              background: C.surface2, border: '0.5px solid ' + C.border1,
              fontFamily: F.serif, fontSize: 14, fontStyle: 'italic',
              color: C.ink1, lineHeight: 1.45, letterSpacing: '-0.005em',
            }}>"{q}"</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Upload ──
function UploadScreen({ onClose, onDone }) {
  const [files, setFiles] = React.useState([
    {id: 1, name: 'Os Inocentes - McEwan.pdf', pages: 312, status: 'extracting', progress: 38},
    {id: 2, name: 'A Estrutura das Revoluções - Kuhn.pdf', pages: 264, status: 'chunking', progress: 72},
    {id: 3, name: 'Cartas a um Jovem Poeta.pdf', pages: 96, status: 'done', progress: 100},
  ]);
  React.useEffect(() => {
    const t = setInterval(() => {
      setFiles(fs => fs.map(f => {
        if (f.status === 'done') return f;
        let p = f.progress + Math.random() * 5;
        let s = f.status;
        if (p >= 100) {p = 100; s = 'done';}
        else if (p > 80) s = 'embedding';
        else if (p > 55 && s === 'extracting') s = 'chunking';
        return {...f, progress: p, status: s};
      }));
    }, 600);
    return () => clearInterval(t);
  }, []);

  const stageLabel = {extracting: 'Extraindo texto', chunking: 'Segmentando', embedding: 'Indexando significados', done: 'Pronto'};

  return (
    <div style={{
      position: 'absolute', inset: 0, background: C.paper, zIndex: 95,
      animation: 'fadeIn .2s', overflowY: 'auto',
    }}>
      <div style={{paddingTop: 56, position: 'relative'}}>
        <button onClick={onClose} className="tap" style={{
          position: 'absolute', top: 56, left: 16, zIndex: 5,
          width: 36, height: 36, borderRadius: 18,
          background: 'rgba(255,255,255,0.7)', border: '0.5px solid ' + C.border1,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><I.back/></button>

        <div style={{padding: '20px 22px 0'}}>
          <div style={{fontFamily: F.mono, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(60,60,67,0.55)', marginBottom: 6, marginTop: 10}}>Adicionar à biblioteca</div>
          <h1 style={{fontFamily: F.serif, fontSize: 32, fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1, margin: 0, color: C.ink1}}>Upload de PDFs</h1>
        </div>

        <div style={{margin: '24px 22px 0', padding: '32px 20px', textAlign: 'center', borderRadius: 14, border: '1.5px dashed ' + C.border2, background: C.surface2}}>
          <div style={{
            width: 44, height: 44, borderRadius: 22, background: C.surface1,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            border: '0.5px solid ' + C.border1, marginBottom: 12,
          }}>
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
              <path d="M8 10.5V2.5m0 0L5 5.5m3-3l3 3M3 11.5v1a1 1 0 001 1h8a1 1 0 001-1v-1" stroke={C.ink2} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{fontFamily: F.serif, fontSize: 18, color: C.ink1}}>Solte os PDFs aqui</div>
          <div style={{marginTop: 4, fontSize: 12, color: C.ink3}}>ou <span style={{color: C.accent, textDecoration: 'underline'}}>escolha do dispositivo</span></div>
        </div>

        <div style={{padding: '24px 22px 0'}}>
          <div style={{fontFamily: F.mono, fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: C.ink3, marginBottom: 10, display: 'flex', justifyContent: 'space-between'}}>
            <span>Fila · {files.length}</span>
            {files.every(f => f.status === 'done') && <button onClick={onDone} style={{background: 'none', border: 'none', color: C.accent, fontFamily: F.mono, fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase'}}>Concluir</button>}
          </div>
          {files.map(f => (
            <div key={f.id} style={{padding: '14px 0', borderBottom: '0.5px solid ' + C.border1}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8}}>
                <div style={{
                  width: 28, height: 36, borderRadius: 3,
                  background: f.status === 'done' ? C.accentFaint : C.surface2,
                  border: '0.5px solid ' + C.border1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: f.status === 'done' ? C.accent : C.ink3,
                  fontFamily: F.mono, fontSize: 8,
                }}>{f.status === 'done' ? '✓' : 'PDF'}</div>
                <div style={{flex: 1, minWidth: 0}}>
                  <div style={{fontFamily: F.serif, fontSize: 14, color: C.ink1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{f.name}</div>
                  <div style={{marginTop: 3, fontSize: 10, fontFamily: F.mono, color: f.status === 'done' ? C.accent : C.ink3, letterSpacing: '.04em'}}>{f.pages}p · {stageLabel[f.status]}</div>
                </div>
                <div style={{fontFamily: F.mono, fontSize: 10, color: C.ink3}}>{Math.round(f.progress)}%</div>
              </div>
              <div style={{height: 2, background: C.border1, borderRadius: 999, overflow: 'hidden'}}>
                <div style={{width: `${f.progress}%`, height: '100%', background: f.status === 'done' ? C.accent : C.ink2, transition: 'width .4s'}}/>
              </div>
            </div>
          ))}
        </div>

        <div style={{margin: '24px 22px 60px', padding: 16, background: C.surface2, border: '0.5px solid ' + C.border1, borderRadius: 10, fontFamily: F.serif, fontSize: 13, lineHeight: 1.5, color: C.ink2, fontStyle: 'italic'}}>
          <strong style={{fontStyle: 'normal', color: C.ink1, fontWeight: 500}}>Como funciona:</strong> cada livro é dividido em trechos, e cada trecho recebe um endereço de significado. Quando você pergunta algo, o sistema busca os endereços mais próximos.
        </div>
      </div>
    </div>
  );
}

// ── Study ──
function StudyScreen() {
  const [idx, setIdx] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);
  const card = FLASHCARDS[idx];
  const book = bookById(card.bookId);
  const next = () => { setFlipped(false); setIdx(i => (i + 1) % FLASHCARDS.length); };
  const prev = () => { setFlipped(false); setIdx(i => (i - 1 + FLASHCARDS.length) % FLASHCARDS.length); };

  return (
    <div style={{height: '100%', paddingTop: 56, paddingBottom: 80, position: 'relative', overflowY: 'auto'}}>
      <div style={{padding: '12px 22px 0'}}>
        <div style={{fontFamily: F.mono, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(60,60,67,0.55)', marginBottom: 6}}>Modo estudo · {idx + 1} de {FLASHCARDS.length}</div>
        <h1 style={{fontFamily: F.serif, fontSize: 30, fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1, margin: 0, color: C.ink1}}>Flashcards</h1>
      </div>

      <div style={{padding: '24px 22px 0', position: 'relative'}}>
        <div style={{position: 'absolute', left: 34, right: 34, top: 36, height: 280, background: C.surface2, borderRadius: 14, transform: 'rotate(-2deg)', border: '0.5px solid ' + C.border1}}/>
        <div style={{position: 'absolute', left: 30, right: 30, top: 30, height: 280, background: '#f8f3e6', borderRadius: 14, transform: 'rotate(1.5deg)', border: '0.5px solid ' + C.border1}}/>

        <div onClick={() => setFlipped(f => !f)} className="tap" style={{
          position: 'relative', perspective: 1200, height: 290,
        }}>
          <div style={{
            width: '100%', height: '100%', position: 'relative',
            transformStyle: 'preserve-3d',
            transition: 'transform .6s cubic-bezier(.3,.7,.4,1)',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}>
            <Face front>
              <div style={{fontFamily: F.mono, fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(60,60,67,0.55)', marginBottom: 16}}>Pergunta</div>
              <div style={{fontFamily: F.serif, fontSize: 20, lineHeight: 1.32, letterSpacing: '-0.015em', color: C.ink1, textWrap: 'balance', flex: 1}}>{card.front}</div>
              <div style={{marginTop: 14, paddingTop: 14, borderTop: '0.5px solid ' + C.border1, display: 'flex', justifyContent: 'space-between', fontFamily: F.mono, fontSize: 9, color: 'rgba(60,60,67,0.55)', letterSpacing: '.04em'}}>
                <span>Toque para virar</span>
                <span>{book.author.split(' ').slice(-1)[0]} · p. {card.page}</span>
              </div>
            </Face>
            <Face>
              <div style={{fontFamily: F.mono, fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', color: C.accent, marginBottom: 16}}>Resposta</div>
              <div style={{fontFamily: F.serif, fontSize: 16, lineHeight: 1.5, color: C.ink1, textWrap: 'pretty', flex: 1}}>{card.back}</div>
              <div style={{marginTop: 14, paddingTop: 14, borderTop: '0.5px solid ' + C.border1, display: 'flex', alignItems: 'center', gap: 10}}>
                <div style={{width: 3, height: 24, background: book.color, borderRadius: 1}}/>
                <div style={{fontSize: 11, color: C.ink1, fontFamily: F.serif}}>{book.title} <span style={{color: C.ink3, fontFamily: F.mono, fontSize: 9, marginLeft: 4}}>p. {card.page}</span></div>
              </div>
            </Face>
          </div>
        </div>
      </div>

      <div style={{padding: '20px 22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <button onClick={prev} className="tap" style={{width: 38, height: 38, borderRadius: 19, background: C.surface2, border: '0.5px solid ' + C.border1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}>
          <I.chev s={14} dir="left" c={C.ink2}/>
        </button>
        <div style={{display: 'flex', gap: 8, flex: 1, padding: '0 12px'}}>
          <button onClick={next} className="tap" style={{flex: 1, padding: '11px', borderRadius: 12, background: 'transparent', color: C.accent, border: '0.5px solid ' + C.accent, fontFamily: F.sans, fontSize: 13, fontWeight: 500}}>Errei</button>
          <button onClick={next} className="tap" style={{flex: 1, padding: '11px', borderRadius: 12, background: C.ink1, color: C.paper, border: 'none', fontFamily: F.sans, fontSize: 13, fontWeight: 500}}>Acertei</button>
        </div>
        <button onClick={next} className="tap" style={{width: 38, height: 38, borderRadius: 19, background: C.surface2, border: '0.5px solid ' + C.border1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}>
          <I.chev s={14} c={C.ink2}/>
        </button>
      </div>
    </div>
  );
}

function Face({ front, children }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      backfaceVisibility: 'hidden',
      transform: front ? 'rotateY(0deg)' : 'rotateY(180deg)',
      background: front ? C.surface1 : C.paper,
      border: '0.5px solid ' + C.border2, borderRadius: 14,
      padding: '20px 18px',
      boxShadow: '0 14px 36px -16px rgba(80,40,10,0.22)',
      display: 'flex', flexDirection: 'column',
    }}>{children}</div>
  );
}

// ── History ──
function HistoryScreen({ onOpenChat }) {
  const groups = {hoje: [], ontem: [], 'esta semana': [], antes: []};
  HISTORY.forEach(h => {
    if (h.daysAgo === 0) groups.hoje.push(h);
    else if (h.daysAgo === 1) groups.ontem.push(h);
    else if (h.daysAgo <= 7) groups['esta semana'].push(h);
    else groups.antes.push(h);
  });
  return (
    <div style={{height: '100%', overflowY: 'auto', paddingTop: 56, paddingBottom: 100}}>
      <div style={{padding: '12px 22px 0'}}>
        <div style={{fontFamily: F.mono, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(60,60,67,0.55)', marginBottom: 6}}>{HISTORY.length} conversas</div>
        <h1 style={{fontFamily: F.serif, fontSize: 34, fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1, margin: 0, color: C.ink1}}>Histórico</h1>
      </div>
      <div style={{padding: '24px 22px 0'}}>
        {Object.entries(groups).map(([label, items]) => items.length === 0 ? null : (
          <div key={label} style={{marginBottom: 22}}>
            <div style={{fontFamily: F.mono, fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: C.ink3, marginBottom: 8, paddingBottom: 8, borderBottom: '0.5px solid ' + C.border1}}>{label}</div>
            {items.map(h => (
              <button key={h.id} onClick={() => onOpenChat(h)} className="tap" style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 0', borderBottom: '0.5px solid ' + C.border1,
                width: '100%', border: 'none', background: 'transparent', textAlign: 'left',
              }}>
                <div style={{flex: 1, minWidth: 0}}>
                  <div style={{fontFamily: F.serif, fontSize: 15, color: C.ink1, letterSpacing: '-0.005em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{h.title}</div>
                  <div style={{marginTop: 5, display: 'flex', gap: 4, alignItems: 'center'}}>
                    {h.books.slice(0, 3).map(id => {
                      const b = bookById(id);
                      return <span key={id} style={{padding: '1px 6px', borderRadius: 3, background: b.color, color: '#fff', fontSize: 8, letterSpacing: 0, fontFamily: F.sans}}>{b.title.slice(0, 12)}</span>;
                    })}
                  </div>
                </div>
                <I.chev/>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Reducer-driven chat state ──
function useChat() {
  const [state, setState] = React.useState({
    messages: [], input: '', streaming: false, openCite: null,
  });
  const dispatch = React.useCallback((a) => {
    if (a.type === 'input') setState(s => ({...s, input: a.v}));
    else if (a.type === 'reset') setState(s => ({...s, messages: [], input: '', streaming: false, openCite: null}));
    else if (a.type === 'send' || a.type === 'ask') {
      const q = a.q ?? state.input;
      if (!q.trim()) return;
      setState(s => ({...s, input: '', streaming: true, messages: [...s.messages, {role: 'user', content: q, id: Date.now()}]}));
      setTimeout(() => {
        setState(s => ({...s, streaming: false, messages: [...s.messages, {role: 'assistant', id: Date.now() + 1}]}));
      }, 1100);
    }
    else if (a.type === 'cite') setState(s => ({...s, openCite: a.n}));
    else if (a.type === 'closeCite') setState(s => ({...s, openCite: null}));
    else if (a.type === 'seedAndAsk') {
      setState(s => ({...s, messages: [], streaming: true, openCite: null,
        messages: [{role: 'user', content: a.q, id: Date.now()}]}));
      setTimeout(() => {
        setState(s => ({...s, streaming: false, messages: [...s.messages, {role: 'assistant', id: Date.now() + 1}]}));
      }, 1100);
    }
  }, [state.input]);
  return [state, dispatch, setState];
}

// ── App router ──
function App() {
  const [tab, setTab] = React.useState('chat');
  const [overlay, setOverlay] = React.useState(null); // {type: 'book'|'upload', book?}
  const [chat, dispatch] = useChat();

  const openBook = (book) => setOverlay({type: 'book', book});
  const askAbout = (book) => {
    setOverlay(null);
    setTab('chat');
    dispatch({type: 'seedAndAsk', q: `Resuma as ideias centrais de "${book.title}" de ${book.author}`});
  };
  const openHistoryConv = (h) => {
    setTab('chat');
    dispatch({type: 'seedAndAsk', q: h.title});
  };

  return (
    <Phone>
      <div style={{position: 'absolute', inset: 0}}>
        {tab === 'chat' && <ChatScreen state={chat} dispatch={dispatch}/>}
        {tab === 'library' && <LibraryScreen onOpenBook={openBook} onAdd={() => setOverlay({type: 'upload'})}/>}
        {tab === 'study' && <StudyScreen/>}
        {tab === 'history' && <HistoryScreen onOpenChat={openHistoryConv}/>}
      </div>

      {chat.openCite && (
        <CitationSheet
          n={chat.openCite}
          onClose={() => dispatch({type: 'closeCite'})}
          onOpenBook={(b) => { dispatch({type: 'closeCite'}); openBook(b); }}
        />
      )}

      {overlay && overlay.type === 'book' && (
        <BookDetail book={overlay.book} onClose={() => setOverlay(null)} onAsk={askAbout}/>
      )}
      {overlay && overlay.type === 'upload' && (
        <UploadScreen onClose={() => setOverlay(null)} onDone={() => setOverlay(null)}/>
      )}

      <TabBar active={tab} onChange={(t) => { setTab(t); setOverlay(null); }}/>
    </Phone>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
