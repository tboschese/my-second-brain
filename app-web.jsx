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
  back:     ({s=16,c=C.ink1})         => <svg width={s} height={s} viewBox="0 0 18 18"><path d="M11 3L5 9l6 6" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>,
  bookmark: ({s=14,c=C.accent})       => <svg width={s} height={s} viewBox="0 0 16 16"><path d="M3.5 2.5h9v11l-4.5-3-4.5 3v-11z" stroke={c} strokeWidth="1.4" strokeLinejoin="round" fill="none"/></svg>,
  upload:   ({s=16,c=C.ink2})         => <svg width={s} height={s} viewBox="0 0 18 18"><path d="M9 12V4m0 0L6 7m3-3l3 3M3 14v1a1 1 0 001 1h10a1 1 0 001-1v-1" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  youtube:  ({s=16})                  => <svg width={s} height={s} viewBox="0 0 24 24"><path d="M22.5 6.5S22.3 5 21.6 4.3c-.7-.8-1.5-.8-1.9-.8C16.8 3.3 12 3.3 12 3.3s-4.8 0-7.7.2c-.4 0-1.2.1-1.9.8C1.7 5 1.5 6.5 1.5 6.5S1.3 8.3 1.3 10v1.6c0 1.7.2 3.5.2 3.5s.2 1.5.9 2.2c.7.8 1.7.7 2.1.8 1.5.1 6.5.2 6.5.2s4.8 0 7.7-.2c.4 0 1.2-.1 1.9-.8.7-.7.9-2.2.9-2.2s.2-1.7.2-3.5V10c0-1.7-.2-3.5-.2-3.5zM9.7 14.3V8.7l5.8 2.8-5.8 2.8z" fill="#FF0000"/></svg>,
  kindle:   ({s=16,c=C.ink2})         => <svg width={s} height={s} viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2" stroke={c} strokeWidth="1.5" fill="none"/><path d="M8 7h8M8 11h8M8 15h5" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  article:  ({s=16,c=C.ink2})         => <svg width={s} height={s} viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke={c} strokeWidth="1.5" fill="none"/><path d="M7 8h10M7 12h10M7 16h6" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  chat:     (a)                        => <svg width="18" height="18" viewBox="0 0 24 24"><path d="M4 7a3 3 0 013-3h10a3 3 0 013 3v8a3 3 0 01-3 3h-5l-4 3v-3H7a3 3 0 01-3-3V7z" stroke={a?C.accent:'rgba(250,247,239,0.45)'} strokeWidth="1.6" fill={a?C.accentFaint:'none'} strokeLinejoin="round"/></svg>,
  lib:      (a)                        => <svg width="18" height="18" viewBox="0 0 24 24"><path d="M5 4h3v16H5zM9 4h3v16H9zM14 5l3-1 4 15-3 1z" stroke={a?C.accent:'rgba(250,247,239,0.45)'} strokeWidth="1.6" fill="none" strokeLinejoin="round"/></svg>,
  study:    (a)                        => <svg width="18" height="18" viewBox="0 0 24 24"><rect x="4" y="6" width="12" height="14" rx="2" stroke={a?C.accent:'rgba(250,247,239,0.45)'} strokeWidth="1.6" fill="none"/><path d="M8 4h12a2 2 0 012 2v12" stroke={a?C.accent:'rgba(250,247,239,0.45)'} strokeWidth="1.6" strokeLinecap="round" fill="none"/></svg>,
  hist:     (a)                        => <svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" stroke={a?C.accent:'rgba(250,247,239,0.45)'} strokeWidth="1.6" fill="none"/><path d="M12 7v5l3 2" stroke={a?C.accent:'rgba(250,247,239,0.45)'} strokeWidth="1.6" strokeLinecap="round"/></svg>,
  inbox:    (a)                        => <svg width="18" height="18" viewBox="0 0 24 24"><path d="M3 9l2-6h14l2 6v8a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke={a?C.accent:'rgba(250,247,239,0.45)'} strokeWidth="1.6" fill={a?C.accentFaint:'none'} strokeLinejoin="round"/><path d="M3 9h4l2 3h6l2-3h4" stroke={a?C.accent:'rgba(250,247,239,0.45)'} strokeWidth="1.6" strokeLinejoin="round"/></svg>,
};

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
      <div style={{fontSize: fontSize - 3, opacity: .65, letterSpacing: '.05em', textTransform: 'uppercase', fontWeight: 500}}>{book.author.split(' ').slice(-1)[0]}</div>
    </div>
  );
}

// ── Sidebar ─────────────────────────────────────────────────────
function Sidebar({ active, onChange, captureCount }) {
  const nav = [
    { id: 'chat',    label: 'Conversar',  icon: I.chat  },
    { id: 'library', label: 'Biblioteca', icon: I.lib   },
    { id: 'study',   label: 'Estudo',     icon: I.study },
    { id: 'history', label: 'Histórico',  icon: I.hist  },
    { id: 'inbox',   label: 'Capturado',  icon: I.inbox },
  ];
  const totalHighlights = BOOKS.reduce((s, b) => s + b.highlights, 0);

  return (
    <div style={{
      width: 220, height: '100%', background: C.sidebar,
      display: 'flex', flexDirection: 'column',
      borderRight: '1px solid ' + C.sidebarBorder, flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{padding: '28px 20px 24px', borderBottom: '1px solid ' + C.sidebarBorder}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
          <I.sparkle s={14} c={C.accent}/>
          <span style={{fontFamily: F.serif, fontSize: 16, fontWeight: 500, color: C.sidebarText, letterSpacing: '-0.02em'}}>
            Segundo Cérebro
          </span>
        </div>
      </div>

      {/* Nav */}
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
              marginBottom: 2, textAlign: 'left', position: 'relative',
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

      {/* Stats & extension status */}
      <div style={{padding: '16px 20px', borderTop: '1px solid ' + C.sidebarBorder}}>
        <div style={{fontFamily: F.mono, fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: C.sidebarMuted, marginBottom: 6}}>
          Acervo
        </div>
        <div style={{fontSize: 12, color: C.sidebarMuted, lineHeight: 1.6}}>
          {BOOKS.length} livros · {totalHighlights} destaques
        </div>
        <div style={{
          marginTop: 12, padding: '8px 10px', borderRadius: 7,
          background: C.sidebarSurf, border: '1px solid ' + C.sidebarBorder,
        }}>
          <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
            <div style={{width: 6, height: 6, borderRadius: '50%', background: captureCount >= 0 ? '#4ade80' : C.ink3}}/>
            <span style={{fontFamily: F.mono, fontSize: 9, letterSpacing: '.1em', textTransform: 'uppercase', color: C.sidebarMuted}}>
              Extensão Chrome
            </span>
          </div>
          <div style={{fontSize: 11, color: 'rgba(250,247,239,0.35)', marginTop: 3, lineHeight: 1.4}}>
            {captureCount >= 0 ? 'Conectada e pronta' : 'Instale a extensão'}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Chat ────────────────────────────────────────────────────────
function ChatScreen({ state, dispatch }) {
  const scrollRef = React.useRef(null);
  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [state.messages.length, state.streaming]);

  const isEmpty = state.messages.length === 0;

  return (
    <div style={{display: 'flex', height: '100%', overflow: 'hidden'}}>
      {/* Messages area */}
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden'}}>
        {/* Top bar */}
        <div style={{
          padding: '18px 32px', borderBottom: '1px solid ' + C.border1,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
          background: C.surface1,
        }}>
          <div style={{fontFamily: F.serif, fontSize: 18, color: C.ink1, letterSpacing: '-0.015em'}}>Conversar</div>
          {!isEmpty && (
            <button onClick={() => dispatch({type:'reset'})} className="tap" style={{
              padding: '5px 12px', borderRadius: 7,
              background: 'transparent', border: '0.5px solid ' + C.border2,
              fontFamily: F.mono, fontSize: 11, color: C.ink3,
            }}>Nova conversa</button>
          )}
        </div>

        {/* Scroll area */}
        <div ref={scrollRef} style={{flex: 1, overflowY: 'auto', padding: '32px 0 24px'}}>
          {isEmpty ? <ChatEmpty dispatch={dispatch}/> : <ChatThread state={state} dispatch={dispatch}/>}
        </div>

        {/* Composer */}
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
              value={state.input}
              onChange={e => dispatch({type:'input', v:e.target.value})}
              onKeyDown={e => { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); dispatch({type:'send'}); }}}
              placeholder="Pergunte ao seu segundo cérebro…"
              style={{
                flex: 1, border: 'none', outline: 'none', background: 'transparent',
                fontFamily: F.serif, fontSize: 15, color: C.ink1,
              }}
            />
            <button onClick={() => dispatch({type:'send'})} className="tap" style={{
              width: 34, height: 34, borderRadius: 9, background: C.ink1, border: 'none',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              opacity: state.input.trim() ? 1 : .45,
            }}><I.send s={14}/></button>
          </div>
        </div>
      </div>

      {/* Citation panel */}
      {state.openCite && (
        <CitationPanel
          n={state.openCite}
          onClose={() => dispatch({type:'closeCite'})}
          onOpenBook={() => {}}
        />
      )}
    </div>
  );
}

function ChatEmpty({ dispatch }) {
  return (
    <div style={{maxWidth: 600, margin: '0 auto', padding: '0 32px', animation: 'fadeIn .3s'}}>
      <div style={{fontFamily: F.mono, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: C.ink3}}>Boa noite</div>
      <h1 style={{fontFamily: F.serif, fontSize: 44, fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.06, margin: '12px 0 0', color: C.ink1}}>
        O que você quer<br/><em style={{color: C.accent}}>lembrar</em> hoje?
      </h1>
      <p style={{fontFamily: F.serif, fontSize: 15, fontStyle: 'italic', color: C.ink2, margin: '16px 0 0', lineHeight: 1.5}}>
        Pergunte qualquer coisa. Vou cruzar o que você já leu e mostrar de onde veio cada ideia.
      </p>
      <div style={{marginTop: 36}}>
        <div style={{fontFamily: F.mono, fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: C.ink3, marginBottom: 12}}>Sugestões do seu acervo</div>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8}}>
          {SUGGESTED_QUESTIONS.map((q, i) => (
            <button key={i} className="tap" onClick={() => dispatch({type:'ask', q})} style={{
              padding: '14px 16px', borderRadius: 10,
              background: C.surface2, border: '1px solid ' + C.border1,
              fontFamily: F.serif, fontSize: 14, color: C.ink1, textAlign: 'left',
              lineHeight: 1.35, letterSpacing: '-0.005em',
              display: 'flex', alignItems: 'flex-start', gap: 10,
              animation: `fadeSlide .4s ${i*40}ms both`,
            }}>
              <span style={{flex: 1}}>{q}</span>
              <I.chev c={C.accent} s={11}/>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatThread({ state, dispatch }) {
  return (
    <div style={{maxWidth: 680, margin: '0 auto', padding: '0 32px'}}>
      {state.messages.map(m =>
        m.role === 'user' ? (
          <div key={m.id} style={{
            margin: '0 0 24px', fontFamily: F.serif, fontSize: 19, fontStyle: 'italic',
            color: C.ink1, lineHeight: 1.4, letterSpacing: '-0.01em',
            borderLeft: '2px solid ' + C.accent, paddingLeft: 16,
            animation: 'fadeSlide .3s both',
          }}>{m.content}</div>
        ) : (
          <Answer key={m.id} dispatch={dispatch}/>
        )
      )}
      {state.streaming && (
        <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '4px 0'}}>
          <span style={{display: 'inline-flex', gap: 4}}>
            {[0,.14,.28].map((d,i) => <span key={i} style={{width: 5, height: 5, borderRadius: '50%', background: C.ink3, animation:`dotPulse 1.2s ${d}s infinite`}}/>)}
          </span>
          <span style={{fontSize: 13, color: C.ink3}}>lendo seus livros…</span>
        </div>
      )}
    </div>
  );
}

function Answer({ dispatch }) {
  const cite = (n) => (
    <sup>
      <button onClick={() => dispatch({type:'cite', n})} style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 17, height: 17, borderRadius: 4,
        background: C.accentFaint, color: C.accent, border: 'none',
        fontFamily: F.mono, fontSize: 9, fontWeight: 600, cursor: 'pointer',
        margin: '0 1px', verticalAlign: 'super',
        transition: 'background .1s',
      }}>{n}</button>
    </sup>
  );
  return (
    <div style={{fontFamily: F.serif, fontSize: 17, lineHeight: 1.6, color: C.ink1, letterSpacing: '-0.005em', animation: 'fadeSlide .4s both', marginBottom: 32}}>
      <p style={{margin: '0 0 1.1em'}}>
        Csikszentmihalyi argumenta que satisfação profunda surge quando você é
        empurrado até o limite das suas capacidades em algo que importa{cite(1)}.
      </p>
      <p style={{margin: '0 0 1.1em'}}>
        Cal Newport leva isso ao trabalho moderno — chama de <em>foco profundo</em>{cite(2)} —
        e James Clear oferece a régua: motivação no auge quando o desafio fica
        logo acima da habilidade{cite(3)}.
      </p>
      <div style={{
        margin: '20px 0', padding: '14px 16px',
        background: C.surface2, border: '1px solid ' + C.border1, borderRadius: 10,
      }}>
        <div style={{fontFamily: F.mono, fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: C.accent, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5}}>
          <I.sparkle s={10}/> Conexão inesperada
        </div>
        <div style={{fontSize: 15, lineHeight: 1.55, color: C.ink1}}>
          Talvez não sejam três conceitos — talvez seja o mesmo, observado de três janelas diferentes.
        </div>
      </div>
      <p style={{margin: '0 0 1.1em'}}>
        Curioso: Kahneman lembra que esse estado tem um custo — "cegueira por desatenção"{cite(4)}.
        Marco Aurélio chegou a conclusão semelhante dois milênios antes{cite(5)}.
      </p>
      <div style={{marginTop: 20, paddingTop: 16, borderTop: '1px solid ' + C.border1}}>
        <div style={{fontFamily: F.mono, fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: C.ink3, marginBottom: 10}}>4 fontes consultadas</div>
        <div style={{display: 'flex', gap: 10}}>
          {['flow','deepwork','atomic','thinking'].map(id => (
            <Cover key={id} book={bookById(id)} w={52} h={78} fontSize={9}/>
          ))}
        </div>
      </div>
      <div style={{marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 7}}>
        {['Aplicar à minha semana?', 'Gerar flashcards sobre este tema', 'O que Taleb diria?', 'Exportar com citações'].map((f, i) => (
          <button key={i} onClick={() => dispatch({type:'ask', q:f})} className="tap" style={{
            padding: '6px 13px', borderRadius: 999,
            background: C.surface2, border: '1px solid ' + C.border1,
            fontFamily: F.sans, fontSize: 12, color: C.ink2,
          }}>{f}</button>
        ))}
      </div>
    </div>
  );
}

// ── Citation panel (desktop right rail) ─────────────────────────
function CitationPanel({ n, onClose }) {
  const c = CITATIONS_FLOW.find(x => x.n === n);
  if (!c) return null;
  const book = bookById(c.bookId);
  return (
    <div style={{
      width: 340, height: '100%', background: C.surface1,
      borderLeft: '1px solid ' + C.border1, display: 'flex', flexDirection: 'column',
      animation: 'slideIn .25s cubic-bezier(.2,.8,.3,1)',
      flexShrink: 0, overflow: 'hidden',
    }}>
      <div style={{padding: '18px 20px', borderBottom: '1px solid ' + C.border1, display: 'flex', alignItems: 'center', gap: 8}}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 22, height: 22, borderRadius: 5, background: C.accent, color: '#fff',
          fontFamily: F.mono, fontSize: 11, fontWeight: 600,
        }}>{c.n}</span>
        <span style={{fontFamily: F.mono, fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: C.accent}}>Trecho original</span>
        <button onClick={onClose} className="tap" style={{
          marginLeft: 'auto', width: 28, height: 28, borderRadius: 7,
          background: C.surface2, border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><I.close s={12}/></button>
      </div>

      <div style={{flex: 1, overflowY: 'auto', padding: '20px'}}>
        <div style={{display: 'flex', gap: 14, marginBottom: 18}}>
          <Cover book={book} w={60} h={88} fontSize={9}/>
          <div style={{paddingTop: 2}}>
            <div style={{fontFamily: F.serif, fontSize: 17, color: C.ink1, letterSpacing: '-0.01em', lineHeight: 1.2}}>{book.title}</div>
            <div style={{fontSize: 12, color: C.ink2, marginTop: 3}}>{book.author}</div>
            <div style={{marginTop: 6, fontSize: 10, fontFamily: F.mono, color: C.ink3, letterSpacing: '.04em'}}>{c.chapter} · p. {c.page}</div>
          </div>
        </div>
        <blockquote style={{
          margin: 0, padding: '0 0 0 14px', borderLeft: '2px solid ' + C.accent,
          fontFamily: F.serif, fontSize: 15, lineHeight: 1.6, color: C.ink1,
          fontStyle: 'italic', letterSpacing: '-0.005em',
        }}>"{c.quote}"</blockquote>
        <div style={{display: 'flex', gap: 8, marginTop: 20}}>
          <button className="tap" style={{
            flex: 1, padding: '10px', borderRadius: 8,
            background: C.ink1, color: C.paper, border: 'none',
            fontFamily: F.sans, fontSize: 12, fontWeight: 500,
          }}>Abrir livro</button>
          <button className="tap" style={{
            flex: 1, padding: '10px', borderRadius: 8,
            background: 'transparent', color: C.ink2,
            border: '1px solid ' + C.border2, fontFamily: F.sans, fontSize: 12,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5,
          }}><I.bookmark s={12}/> Salvar</button>
        </div>
      </div>
    </div>
  );
}

// ── Library ─────────────────────────────────────────────────────
function LibraryScreen({ onOpenBook, onAdd }) {
  const [tag, setTag] = React.useState('todos');
  const [q, setQ] = React.useState('');
  const [view, setView] = React.useState('grid'); // 'grid' | 'list'
  const tags = ['todos','psicologia','filosofia','produtividade','criatividade','história','economia'];

  const filtered = BOOKS.filter(b => {
    const okTag = tag==='todos' || b.tags.includes(tag);
    const okQ = !q.trim() || b.title.toLowerCase().includes(q.toLowerCase()) || b.author.toLowerCase().includes(q.toLowerCase());
    return okTag && okQ;
  });

  return (
    <div style={{height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
      {/* Header */}
      <div style={{
        padding: '18px 32px', borderBottom: '1px solid ' + C.border1,
        background: C.surface1, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{fontFamily: F.mono, fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: C.ink3}}>
            {BOOKS.length} livros · {BOOKS.reduce((s,b)=>s+b.highlights,0)} destaques
          </div>
          <div style={{fontFamily: F.serif, fontSize: 24, fontWeight: 400, letterSpacing: '-0.02em', color: C.ink1, marginTop: 2}}>Biblioteca</div>
        </div>
        <button onClick={onAdd} className="tap" style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          padding: '9px 14px', borderRadius: 9, background: C.ink1, border: 'none',
          fontFamily: F.sans, fontSize: 13, fontWeight: 500, color: C.paper,
        }}><I.plus s={14}/> Adicionar livro</button>
      </div>

      {/* Search + filters */}
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
          <div style={{display: 'flex', gap: 6, overflowX: 'auto'}}>
            {tags.map(t => (
              <button key={t} onClick={() => setTag(t)} className="tap" style={{
                padding: '4px 11px', borderRadius: 999, whiteSpace: 'nowrap',
                fontFamily: F.mono, fontSize: 11,
                border: '1px solid ' + (tag===t ? C.ink1 : C.border1),
                background: tag===t ? C.ink1 : 'transparent',
                color: tag===t ? C.paper : C.ink2, flexShrink: 0,
              }}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{flex: 1, overflowY: 'auto', padding: '28px 32px'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '28px 20px'}}>
          {filtered.map(b => (
            <button key={b.id} onClick={() => onOpenBook(b)} className="tap" style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              border: 'none', background: 'transparent', padding: 0,
            }}>
              <Cover book={b} w={100} h={150} fontSize={11}/>
              <div style={{marginTop: 8, fontFamily: F.serif, fontSize: 12, color: C.ink1, textAlign: 'center', lineHeight: 1.25, letterSpacing: '-0.005em', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{b.title}</div>
              <div style={{fontSize: 10, color: C.ink3, textAlign: 'center', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{b.author.split(' ').slice(-1)[0]}</div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div style={{gridColumn: '1/-1', textAlign: 'center', padding: '60px 0', color: C.ink3, fontFamily: F.serif, fontStyle: 'italic', fontSize: 16}}>Nenhum livro encontrado.</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Book modal ──────────────────────────────────────────────────
function BookModal({ book, onClose, onAsk }) {
  return (
    <>
      <div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(31,28,20,0.5)',zIndex:200,animation:'fadeIn .2s'}}/>
      <div style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 520, maxHeight: '80vh', background: C.paper,
        borderRadius: 16, zIndex: 210, animation: 'fadeSlide .25s',
        boxShadow: '0 32px 80px rgba(0,0,0,0.28)', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Cover banner */}
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
          <div style={{color: '#fff', paddingBottom: 4}}>
            <h2 style={{fontFamily: F.serif, fontSize: 24, fontWeight: 400, margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em'}}>{book.title}</h2>
            {book.subtitle && <div style={{fontSize: 13, opacity: .7, marginTop: 5, fontStyle: 'italic'}}>{book.subtitle}</div>}
            <div style={{marginTop: 8, fontSize: 13, opacity: .75}}>{book.author} · {book.year}</div>
            <div style={{marginTop: 6, fontFamily: F.mono, fontSize: 10, opacity: .6, letterSpacing: '.04em', display: 'flex', gap: 8}}>
              <span>{book.pages}p</span><span>·</span>
              <span>{book.chapters} cap.</span><span>·</span>
              <span>{book.highlights} destaques</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{padding: '20px 24px', overflowY: 'auto'}}>
          <button onClick={() => onAsk(book)} className="tap" style={{
            width: '100%', padding: '12px', borderRadius: 10,
            background: C.ink1, color: C.paper, border: 'none',
            fontFamily: F.sans, fontSize: 13, fontWeight: 500,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 20,
          }}><I.sparkle s={12} c="#fff"/> Perguntar sobre este livro</button>

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

          <div style={{fontFamily: F.mono, fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: C.ink3, marginBottom: 10}}>Destaques</div>
          {[
            'Os melhores momentos ocorrem quando o corpo ou a mente está sendo levado aos seus limites.',
            'A atenção é a moeda mais escassa do nosso tempo.',
            'Não é o que sentimos — é o que fazemos com o que sentimos.',
          ].map((q, i) => (
            <div key={i} style={{
              padding: '12px 14px', marginBottom: 7, borderRadius: 8,
              background: C.surface2, border: '1px solid ' + C.border1,
              fontFamily: F.serif, fontSize: 13, fontStyle: 'italic',
              color: C.ink1, lineHeight: 1.5,
            }}>"{q}"</div>
          ))}
        </div>
      </div>
    </>
  );
}

// ── Upload modal ─────────────────────────────────────────────────
function UploadModal({ onClose }) {
  const [files, setFiles] = React.useState([
    {id:1,name:'Os Inocentes - McEwan.pdf',pages:312,status:'extracting',progress:38},
    {id:2,name:'A Estrutura das Revoluções - Kuhn.pdf',pages:264,status:'chunking',progress:72},
    {id:3,name:'Cartas a um Jovem Poeta.pdf',pages:96,status:'done',progress:100},
  ]);
  React.useEffect(() => {
    const t = setInterval(() => {
      setFiles(fs => fs.map(f => {
        if (f.status==='done') return f;
        let p = f.progress + Math.random()*5, s=f.status;
        if (p>=100){p=100;s='done';} else if(p>80)s='embedding'; else if(p>55&&s==='extracting')s='chunking';
        return {...f,progress:p,status:s};
      }));
    }, 500);
    return ()=>clearInterval(t);
  }, []);
  const stageLabel = {extracting:'Extraindo texto',chunking:'Segmentando',embedding:'Indexando significados',done:'Pronto'};

  return (
    <>
      <div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(31,28,20,0.5)',zIndex:200,animation:'fadeIn .2s'}}/>
      <div style={{
        position:'fixed',top:'50%',left:'50%',transform:'translate(-50%,-50%)',
        width:540,background:C.paper,borderRadius:16,zIndex:210,
        animation:'fadeSlide .25s',boxShadow:'0 32px 80px rgba(0,0,0,0.28)',
        overflow:'hidden',
      }}>
        <div style={{padding:'24px 28px',borderBottom:'1px solid '+C.border1,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{fontFamily:F.serif,fontSize:20,color:C.ink1,letterSpacing:'-0.015em'}}>Upload de PDFs</div>
          <button onClick={onClose} className="tap" style={{width:28,height:28,borderRadius:7,background:C.surface2,border:'none',display:'flex',alignItems:'center',justifyContent:'center'}}><I.close s={12}/></button>
        </div>
        <div style={{padding:'20px 28px 28px'}}>
          <div style={{
            padding:'28px',textAlign:'center',borderRadius:12,
            border:'1.5px dashed '+C.border2,background:C.surface2,marginBottom:20,
          }}>
            <I.upload s={22} c={C.ink3}/>
            <div style={{fontFamily:F.serif,fontSize:17,color:C.ink1,marginTop:10}}>Solte os PDFs aqui</div>
            <div style={{marginTop:4,fontSize:12,color:C.ink3}}>ou <span style={{color:C.accent,textDecoration:'underline',cursor:'pointer'}}>escolha do dispositivo</span></div>
          </div>
          <div style={{fontFamily:F.mono,fontSize:9,letterSpacing:'.14em',textTransform:'uppercase',color:C.ink3,marginBottom:10}}>Fila · {files.length}</div>
          {files.map(f=>(
            <div key={f.id} style={{padding:'12px 0',borderBottom:'1px solid '+C.border1}}>
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:7}}>
                <div style={{
                  width:26,height:32,borderRadius:3,
                  background:f.status==='done'?C.accentFaint:C.surface2,
                  border:'1px solid '+C.border1,display:'flex',alignItems:'center',justifyContent:'center',
                  color:f.status==='done'?C.accent:C.ink3,fontFamily:F.mono,fontSize:8,
                }}>{f.status==='done'?'✓':'PDF'}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontFamily:F.serif,fontSize:13,color:C.ink1,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{f.name}</div>
                  <div style={{fontSize:10,fontFamily:F.mono,color:f.status==='done'?C.accent:C.ink3,marginTop:2}}>{f.pages}p · {stageLabel[f.status]}</div>
                </div>
                <div style={{fontFamily:F.mono,fontSize:10,color:C.ink3}}>{Math.round(f.progress)}%</div>
              </div>
              <div style={{height:2,background:C.border1,borderRadius:999,overflow:'hidden'}}>
                <div style={{width:`${f.progress}%`,height:'100%',background:f.status==='done'?C.accent:C.ink2,transition:'width .4s'}}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ── Study ───────────────────────────────────────────────────────
function StudyScreen() {
  const [idx,setIdx] = React.useState(0);
  const [flipped,setFlipped] = React.useState(false);
  const card = FLASHCARDS[idx];
  const book = bookById(card.bookId);
  const next = () => {setFlipped(false);setIdx(i=>(i+1)%FLASHCARDS.length);};
  const prev = () => {setFlipped(false);setIdx(i=>(i-1+FLASHCARDS.length)%FLASHCARDS.length);};

  return (
    <div style={{height:'100%',display:'flex',flexDirection:'column',overflow:'hidden'}}>
      <div style={{padding:'18px 32px',borderBottom:'1px solid '+C.border1,background:C.surface1,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div>
          <div style={{fontFamily:F.mono,fontSize:9,letterSpacing:'.14em',textTransform:'uppercase',color:C.ink3}}>{idx+1} de {FLASHCARDS.length}</div>
          <div style={{fontFamily:F.serif,fontSize:24,color:C.ink1,letterSpacing:'-0.02em',marginTop:2}}>Flashcards</div>
        </div>
        <div style={{display:'flex',gap:6}}>
          {FLASHCARDS.map((_,i)=>(
            <div key={i} style={{width:6,height:6,borderRadius:'50%',background:i===idx?C.accent:C.border2}}/>
          ))}
        </div>
      </div>

      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:'0 32px',overflow:'hidden'}}>
        <div style={{width:'100%',maxWidth:640,position:'relative'}}>
          <div style={{position:'absolute',left:12,right:12,top:8,height:320,background:C.surface2,borderRadius:16,transform:'rotate(-1.5deg)',border:'1px solid '+C.border1}}/>
          <div style={{position:'absolute',left:8,right:8,top:4,height:320,background:'#f8f3e6',borderRadius:16,transform:'rotate(1deg)',border:'1px solid '+C.border1}}/>

          <div onClick={()=>setFlipped(f=>!f)} className="tap" style={{position:'relative',perspective:1200,height:330}}>
            <div style={{
              width:'100%',height:'100%',position:'relative',
              transformStyle:'preserve-3d',
              transition:'transform .55s cubic-bezier(.3,.7,.4,1)',
              transform:flipped?'rotateY(180deg)':'rotateY(0deg)',
            }}>
              <StudyFace front>
                <div style={{fontFamily:F.mono,fontSize:9,letterSpacing:'.16em',textTransform:'uppercase',color:C.ink3,marginBottom:20}}>Pergunta</div>
                <div style={{fontFamily:F.serif,fontSize:22,lineHeight:1.3,letterSpacing:'-0.015em',color:C.ink1,flex:1}}>{card.front}</div>
                <div style={{paddingTop:14,borderTop:'1px solid '+C.border1,display:'flex',justifyContent:'space-between',fontFamily:F.mono,fontSize:10,color:C.ink3}}>
                  <span>Clique para virar</span>
                  <span>{book.author.split(' ').slice(-1)[0]} · p.{card.page}</span>
                </div>
              </StudyFace>
              <StudyFace>
                <div style={{fontFamily:F.mono,fontSize:9,letterSpacing:'.16em',textTransform:'uppercase',color:C.accent,marginBottom:20}}>Resposta</div>
                <div style={{fontFamily:F.serif,fontSize:17,lineHeight:1.55,color:C.ink1,flex:1}}>{card.back}</div>
                <div style={{paddingTop:14,borderTop:'1px solid '+C.border1,display:'flex',alignItems:'center',gap:10}}>
                  <div style={{width:3,height:24,background:book.color,borderRadius:1}}/>
                  <div style={{fontSize:12,color:C.ink1,fontFamily:F.serif}}>{book.title}<span style={{color:C.ink3,fontFamily:F.mono,fontSize:10,marginLeft:6}}>p.{card.page}</span></div>
                </div>
              </StudyFace>
            </div>
          </div>
        </div>
      </div>

      <div style={{padding:'16px 32px 24px',borderTop:'1px solid '+C.border1,flexShrink:0,display:'flex',justifyContent:'center',alignItems:'center',gap:12}}>
        <button onClick={prev} className="tap" style={{width:36,height:36,borderRadius:9,background:C.surface2,border:'1px solid '+C.border1,display:'inline-flex',alignItems:'center',justifyContent:'center'}}><I.chev s={12} dir="left" c={C.ink2}/></button>
        <button onClick={next} className="tap" style={{padding:'10px 28px',borderRadius:9,background:'transparent',color:C.accent,border:'1px solid '+C.accent,fontFamily:F.sans,fontSize:13,fontWeight:500}}>Errei</button>
        <button onClick={next} className="tap" style={{padding:'10px 28px',borderRadius:9,background:C.ink1,color:C.paper,border:'none',fontFamily:F.sans,fontSize:13,fontWeight:500}}>Acertei</button>
        <button onClick={next} className="tap" style={{width:36,height:36,borderRadius:9,background:C.surface2,border:'1px solid '+C.border1,display:'inline-flex',alignItems:'center',justifyContent:'center'}}><I.chev s={12} c={C.ink2}/></button>
      </div>
    </div>
  );
}
function StudyFace({front,children}){
  return (
    <div style={{
      position:'absolute',inset:0,backfaceVisibility:'hidden',
      transform:front?'rotateY(0deg)':'rotateY(180deg)',
      background:front?C.surface1:C.paper,
      border:'1px solid '+C.border2,borderRadius:16,
      padding:'28px 26px',boxShadow:'0 12px 40px -18px rgba(80,40,10,0.2)',
      display:'flex',flexDirection:'column',
    }}>{children}</div>
  );
}

// ── History ─────────────────────────────────────────────────────
function HistoryScreen({ onOpenChat }) {
  const groups = {hoje:[],ontem:[],'esta semana':[],antes:[]};
  HISTORY.forEach(h=>{
    if(h.daysAgo===0)groups.hoje.push(h);
    else if(h.daysAgo===1)groups.ontem.push(h);
    else if(h.daysAgo<=7)groups['esta semana'].push(h);
    else groups.antes.push(h);
  });
  return (
    <div style={{height:'100%',display:'flex',flexDirection:'column',overflow:'hidden'}}>
      <div style={{padding:'18px 32px',borderBottom:'1px solid '+C.border1,background:C.surface1,flexShrink:0}}>
        <div style={{fontFamily:F.mono,fontSize:9,letterSpacing:'.14em',textTransform:'uppercase',color:C.ink3}}>{HISTORY.length} conversas</div>
        <div style={{fontFamily:F.serif,fontSize:24,color:C.ink1,letterSpacing:'-0.02em',marginTop:2}}>Histórico</div>
      </div>
      <div style={{flex:1,overflowY:'auto',padding:'24px 32px'}}>
        <div style={{maxWidth:680}}>
          {Object.entries(groups).map(([label,items])=>items.length===0?null:(
            <div key={label} style={{marginBottom:28}}>
              <div style={{fontFamily:F.mono,fontSize:9,letterSpacing:'.14em',textTransform:'uppercase',color:C.ink3,paddingBottom:8,borderBottom:'1px solid '+C.border1,marginBottom:4}}>{label}</div>
              {items.map(h=>(
                <button key={h.id} onClick={()=>onOpenChat(h)} className="tap" style={{
                  display:'flex',alignItems:'center',gap:14,
                  padding:'12px 0',borderBottom:'1px solid '+C.border1,
                  width:'100%',border:'none',background:'transparent',textAlign:'left',
                }}>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontFamily:F.serif,fontSize:15,color:C.ink1,letterSpacing:'-0.005em',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{h.title}</div>
                    <div style={{marginTop:5,display:'flex',gap:5,flexWrap:'wrap'}}>
                      {h.books.slice(0,3).map(id=>{const b=bookById(id);return <span key={id} style={{padding:'1px 7px',borderRadius:3,background:b.color,color:'#fff',fontSize:9,fontFamily:F.sans}}>{b.title.slice(0,14)}</span>;})}
                    </div>
                  </div>
                  <I.chev c={C.border2}/>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Inbox (Extension captures) ──────────────────────────────────
const MOCK_CAPTURES = [
  {id:'c1',type:'youtube',title:'Como construir um segundo cérebro — Tiago Forte',source:'YouTube',channel:'Forte Labs',duration:'38:14',capturedAt:Date.now()-1000*60*15,status:'pending',thumbnail:'',content:'Neste vídeo, Tiago Forte explica o método PARA para organizar informações digitais em projetos, áreas, recursos e arquivos...'},
  {id:'c2',type:'kindle',title:'O Poder do Hábito — Cap. 3: O Loop do Hábito',source:'Kindle',capturedAt:Date.now()-1000*60*60*2,status:'pending',content:'Todo hábito se inicia com um loop neurológico de três partes: o sinal, a rotina e a recompensa. Compreender esses componentes...'},
  {id:'c3',type:'article',title:'Why Spaced Repetition is the Most Powerful Learning Technique',source:'Ness Labs',author:'Anne-Laure Le Cunff',wordCount:2400,capturedAt:Date.now()-1000*60*60*24,status:'done',content:'Spaced repetition is a learning technique that incorporates increasing intervals of time between subsequent review of previously learned material...'},
  {id:'c4',type:'kindle',title:'Antifrágil — Cap. 11: Nunca Case com o Navio-Mãe',source:'Kindle',capturedAt:Date.now()-1000*60*60*26,status:'pending',content:'A ideia central da antifragilidade pode ser resumida numa fórmula: prefira sempre ter opções. Quem tem opções se beneficia da incerteza...'},
];

function InboxScreen({ captures, onProcess }) {
  const allCaptures = captures.length > 0 ? captures : MOCK_CAPTURES;
  const pending = allCaptures.filter(c=>c.status==='pending').length;

  const typeIcon = (type) => {
    if(type==='youtube') return <I.youtube s={16}/>;
    if(type==='kindle') return <I.kindle s={16} c={C.accent}/>;
    return <I.article s={16} c={C.ink2}/>;
  };
  const typeLabel = {youtube:'YouTube',kindle:'Kindle',article:'Artigo',webpage:'Página web'};

  const timeAgo = (ts) => {
    const m = Math.floor((Date.now()-ts)/60000);
    if(m<60) return `${m}min atrás`;
    const h = Math.floor(m/60);
    if(h<24) return `${h}h atrás`;
    return `${Math.floor(h/24)}d atrás`;
  };

  return (
    <div style={{height:'100%',display:'flex',flexDirection:'column',overflow:'hidden'}}>
      <div style={{padding:'18px 32px',borderBottom:'1px solid '+C.border1,background:C.surface1,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div>
          <div style={{fontFamily:F.mono,fontSize:9,letterSpacing:'.14em',textTransform:'uppercase',color:C.ink3}}>{pending} pendentes · {allCaptures.length} total</div>
          <div style={{fontFamily:F.serif,fontSize:24,color:C.ink1,letterSpacing:'-0.02em',marginTop:2}}>Capturado</div>
        </div>
        {pending > 0 && (
          <button className="tap" style={{padding:'8px 16px',borderRadius:9,background:C.accent,color:'#fff',border:'none',fontFamily:F.sans,fontSize:13,fontWeight:500}}>
            Processar tudo ({pending})
          </button>
        )}
      </div>

      <div style={{flex:1,overflowY:'auto',padding:'24px 32px'}}>
        {allCaptures.length === 0 && (
          <div style={{textAlign:'center',padding:'80px 0',color:C.ink3}}>
            <I.inbox s={32} a={false}/>
            <div style={{fontFamily:F.serif,fontSize:18,marginTop:16,fontStyle:'italic'}}>Nenhum item capturado ainda.</div>
            <div style={{fontSize:13,marginTop:8,color:C.ink3,lineHeight:1.5}}>Instale a extensão Chrome e comece a capturar<br/>vídeos, páginas do Kindle e artigos.</div>
          </div>
        )}
        <div style={{display:'flex',flexDirection:'column',gap:12,maxWidth:780}}>
          {allCaptures.map(c=>(
            <div key={c.id} style={{
              background:c.status==='done'?C.surface1:C.paper,
              border:'1px solid '+(c.status==='done'?C.border1:C.border2),
              borderRadius:12,padding:'16px 18px',
              display:'flex',gap:14,alignItems:'flex-start',
              opacity:c.status==='done'?0.7:1,
            }}>
              <div style={{width:36,height:36,borderRadius:9,background:C.surface2,border:'1px solid '+C.border1,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                {typeIcon(c.type)}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:'flex',alignItems:'flex-start',gap:10,marginBottom:4}}>
                  <div style={{flex:1}}>
                    <span style={{fontFamily:F.mono,fontSize:9,letterSpacing:'.1em',textTransform:'uppercase',color:c.type==='youtube'?'#FF0000':C.accent,marginRight:8}}>{typeLabel[c.type]}</span>
                    {c.source && c.source!==typeLabel[c.type] && <span style={{fontFamily:F.mono,fontSize:9,color:C.ink3}}>{c.source}</span>}
                  </div>
                  <span style={{fontFamily:F.mono,fontSize:9,color:C.ink3,flexShrink:0}}>{timeAgo(c.capturedAt)}</span>
                </div>
                <div style={{fontFamily:F.serif,fontSize:15,color:C.ink1,letterSpacing:'-0.005em',lineHeight:1.3,marginBottom:6}}>{c.title}</div>
                <p style={{fontFamily:F.sans,fontSize:12,color:C.ink2,margin:0,lineHeight:1.5,display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{c.content}</p>
                {c.wordCount && <div style={{marginTop:4,fontFamily:F.mono,fontSize:9,color:C.ink3}}>{c.wordCount.toLocaleString()} palavras</div>}
                {c.duration && <div style={{marginTop:4,fontFamily:F.mono,fontSize:9,color:C.ink3}}>Duração: {c.duration}</div>}
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:6,flexShrink:0}}>
                {c.status==='pending'
                  ? <button className="tap" style={{padding:'7px 14px',borderRadius:7,background:C.ink1,color:C.paper,border:'none',fontFamily:F.sans,fontSize:12,fontWeight:500}}>Adicionar</button>
                  : <span style={{fontFamily:F.mono,fontSize:10,color:C.accent,letterSpacing:'.04em'}}>✓ Adicionado</span>
                }
                <button className="tap" style={{padding:'7px 14px',borderRadius:7,background:'transparent',color:C.ink3,border:'1px solid '+C.border1,fontFamily:F.sans,fontSize:12}}>Ignorar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Chat state ──────────────────────────────────────────────────
function useChat() {
  const [state, setState] = React.useState({messages:[],input:'',streaming:false,openCite:null});
  const dispatch = React.useCallback((a) => {
    if(a.type==='input') setState(s=>({...s,input:a.v}));
    else if(a.type==='reset') setState({messages:[],input:'',streaming:false,openCite:null});
    else if(a.type==='send'||a.type==='ask'){
      const q=a.q??state.input; if(!q.trim())return;
      setState(s=>({...s,input:'',streaming:true,messages:[...s.messages,{role:'user',content:q,id:Date.now()}]}));
      setTimeout(()=>setState(s=>({...s,streaming:false,messages:[...s.messages,{role:'assistant',id:Date.now()+1}]})),1100);
    }
    else if(a.type==='cite') setState(s=>({...s,openCite:a.n}));
    else if(a.type==='closeCite') setState(s=>({...s,openCite:null}));
    else if(a.type==='seedAndAsk'){
      setState({messages:[{role:'user',content:a.q,id:Date.now()}],input:'',streaming:true,openCite:null});
      setTimeout(()=>setState(s=>({...s,streaming:false,messages:[...s.messages,{role:'assistant',id:Date.now()+1}]})),1100);
    }
  }, [state.input]);
  return [state, dispatch];
}

// ── App ─────────────────────────────────────────────────────────
function App() {
  const [section, setSection] = React.useState('chat');
  const [overlay, setOverlay]  = React.useState(null);
  const [captures, setCaptures] = React.useState([]);
  const [chat, dispatch] = useChat();

  // Listen for captures bridged from the extension
  React.useEffect(() => {
    const onCaptures = (e) => setCaptures(e.detail || []);
    window.addEventListener('sc-captures', onCaptures);
    window.dispatchEvent(new Event('sc-request-captures'));
    return () => window.removeEventListener('sc-captures', onCaptures);
  }, []);

  const openBook = (book) => setOverlay({type:'book',book});
  const askAbout = (book) => {
    setOverlay(null); setSection('chat');
    dispatch({type:'seedAndAsk', q:`Resuma as ideias centrais de "${book.title}" de ${book.author}`});
  };
  const openHistory = (h) => {
    setSection('chat');
    dispatch({type:'seedAndAsk', q:h.title});
  };

  return (
    <div style={{display:'flex',height:'100vh',overflow:'hidden',background:C.paper}}>
      <Sidebar active={section} onChange={(s)=>{setSection(s);setOverlay(null);}} captureCount={captures.length}/>
      <main style={{flex:1,overflow:'hidden',display:'flex',flexDirection:'column'}}>
        {section==='chat'    && <ChatScreen    state={chat} dispatch={dispatch}/>}
        {section==='library' && <LibraryScreen onOpenBook={openBook} onAdd={()=>setOverlay({type:'upload'})}/>}
        {section==='study'   && <StudyScreen/>}
        {section==='history' && <HistoryScreen onOpenChat={openHistory}/>}
        {section==='inbox'   && <InboxScreen   captures={captures}/>}
      </main>

      {/* Modals */}
      {overlay?.type==='book'   && <BookModal   book={overlay.book} onClose={()=>setOverlay(null)} onAsk={askAbout}/>}
      {overlay?.type==='upload' && <UploadModal onClose={()=>setOverlay(null)}/>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
