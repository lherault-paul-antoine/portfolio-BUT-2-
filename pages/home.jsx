// pages/home.jsx, page d'accueil épurée.
// 4 sections : Hero · Stats · Compétences · Timeline.
// Polices harmonisées : titres en Sora 600, italiques d'emphase en
// Instrument Serif, monospace pour les codes/labels.

function useCounter(end, duration = 1400) {
  const [v, setV] = React.useState(0);
  React.useEffect(() => {
    const target = parseFloat(String(end).replace(/[^0-9.]/g, '')) || 0;
    let raf, start;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(target * eased * 100) / 100);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end]);
  return v;
}

function StatNumber({ value }) {
  const match = String(value).match(/^([^\d-]*)([\d\s.,]*)(.*)$/);
  const prefix = match ? match[1] : '';
  const num = match ? match[2].replace(/\s/g, '').replace(',', '.') : value;
  const suffix = match ? match[3] : '';
  const n = useCounter(num);
  const display = isNaN(n) ? value : Math.round(n).toLocaleString('fr-FR');
  return <span>{prefix}{display}{suffix}</span>;
}

function HomePage() {
  return (
    <PageShell current="index.html">
      <Hero />
      <Frieze />
      <CompetenciesGrid />
    </PageShell>
  );
}

function Hero() {
  return (
    <section style={{ padding: '64px 48px 56px', maxWidth: 1400 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 460px', gap: 48, alignItems: 'center' }}>
        <div>
          <div className="pa-pill pa-reveal" style={{
            background:'var(--surface)', backdropFilter:'blur(20px)',
            border:'1px solid var(--line)', color:'var(--ink)', marginBottom: 32
          }}>
            <span className="pa-dot" style={{ background: 'var(--a3)', animation:'pa-pulse 1.6s ease-in-out infinite' }}></span>
            {PA.identity.status}
          </div>
          <h1 className="pa-reveal" style={{
            fontSize: 78, lineHeight: 1.02, fontWeight: 600, letterSpacing:'-.04em', margin: 0
          }}>
            Commerce <span className="pa-serif" style={{ color: 'var(--a1)' }}>&</span> développement <span className="pa-serif" style={{ color: 'var(--a2)' }}>international</span>.
          </h1>
          <div style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--ink)', maxWidth: 560, opacity: .85, marginTop: 32 }}>
            BUT TC BDMRC à l'IUT de Châtellerault. Semestre Erasmus+ à Odisee (Bruxelles), 31 ECTS validés en anglais, TOEIC 935 (C1).
          </div>
        </div>
        <SkillWheel />
      </div>
    </section>
  );
}

function SkillWheel() {
  const ring1 = 'var(--a1)';
  const ring2 = 'var(--a2)';
  const ring3 = 'var(--a3)';
  const SIZE = 420;
  const C = SIZE / 2;
  const nodes = [
    { l: 'STP · SWOT',     a:   0, r: 165, c: ring1 },
    { l: 'CAP SONCAS',     a:  45, r: 165, c: ring2 },
    { l: 'CROC',           a:  90, r: 165, c: ring3 },
    { l: 'SAVE · CLV',     a: 135, r: 165, c: ring1 },
    { l: '7S · Porter',    a: 180, r: 165, c: ring2 },
    { l: 'Forecasting',    a: 225, r: 165, c: ring3 },
    { l: 'Canva · Excel',  a: 270, r: 165, c: ring1 },
    { l: 'EN · C1 · 935',  a: 315, r: 165, c: ring2 },
  ];
  const inner = [
    { l: 'Master Budget',  a:  30, r: 92, c: ring3 },
    { l: 'Persona',        a: 150, r: 92, c: ring1 },
    { l: 'Copy stratégie', a: 270, r: 92, c: ring2 },
  ];
  return (
    <div style={{ position:'relative', width: SIZE, height: SIZE, margin:'0 auto', flexShrink: 0 }}>
      <div style={{ position:'absolute', inset: 32, borderRadius:'50%', border:`1.5px solid ${ring1}`, opacity:.32, animation:'pa-rotate 40s linear infinite' }}></div>
      <div style={{ position:'absolute', inset: 72, borderRadius:'50%', border:`1.5px solid ${ring2}`, opacity:.32, animation:'pa-rotate 60s linear infinite reverse' }}></div>
      <div style={{ position:'absolute', inset: 122, borderRadius:'50%', border:`1.5px solid ${ring3}`, opacity:.32, animation:'pa-rotate 50s linear infinite' }}></div>
      {nodes.map((n, i) => {
        const x = C + Math.cos((n.a * Math.PI) / 180) * n.r;
        const y = C + Math.sin((n.a * Math.PI) / 180) * n.r;
        return (
          <div key={i} style={{
            position:'absolute', left: x, top: y, transform:'translate(-50%,-50%)',
            background:'rgba(255,255,255,.94)', padding:'6px 11px', borderRadius: 999,
            fontSize: 11, fontWeight: 500, border:'1px solid var(--line)',
            boxShadow:'0 4px 14px rgba(28,26,46,.08)', whiteSpace:'nowrap'
          }}>
            <span style={{ display:'inline-block', width: 6, height: 6, background: n.c, borderRadius:'50%', marginRight: 7, verticalAlign:'middle' }}></span>
            {n.l}
          </div>
        );
      })}
      {inner.map((n, i) => {
        const x = C + Math.cos((n.a * Math.PI) / 180) * n.r;
        const y = C + Math.sin((n.a * Math.PI) / 180) * n.r;
        return (
          <div key={i} style={{
            position:'absolute', left: x, top: y, transform:'translate(-50%,-50%)',
            background:'rgba(255,255,255,.88)', padding:'3px 8px', borderRadius: 999,
            fontSize: 9, fontWeight: 500, color:'var(--muted)',
            border:'1px solid var(--line)', whiteSpace:'nowrap'
          }}>
            {n.l}
          </div>
        );
      })}
      <div style={{
        position:'absolute', inset: 162, borderRadius:'50%',
        background:'radial-gradient(circle at 30% 30%, var(--a2), var(--a1) 75%)',
        display:'flex', alignItems:'center', justifyContent:'center', color:'white',
        boxShadow:'0 10px 32px rgba(28,26,46,.18)',
        textAlign:'center', flexDirection:'column', padding: 12
      }}>
        <span className="pa-serif" style={{ fontSize: 26, lineHeight: 1, color:'white' }}>Paul-Antoine</span>
        <span className="pa-mono" style={{ fontSize: 8, letterSpacing:'.16em', marginTop: 5, color:'rgba(255,255,255,.85)' }}>BUT TC · BDMRC</span>
      </div>
      <style>{`@keyframes pa-rotate { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── SkillRadial : cercles rotatifs avec outils/modèles maîtrisés ──────────
function SkillRadial() {
  const ring1 = 'var(--a1)';
  const ring2 = 'var(--a2)';
  const ring3 = 'var(--a3)';
  const nodes = [
    { l: 'STP · SWOT',     a:   0, r: 200, c: ring1 },
    { l: 'CAP SONCAS',     a:  45, r: 200, c: ring2 },
    { l: 'CROC · BANT',    a:  90, r: 200, c: ring3 },
    { l: 'SAVE · CLV',     a: 135, r: 200, c: ring1 },
    { l: '7S · Porter',    a: 180, r: 200, c: ring2 },
    { l: 'Forecasting',    a: 225, r: 200, c: ring3 },
    { l: 'Excel · Canva',  a: 270, r: 200, c: ring1 },
    { l: 'EN · C1 · 935',  a: 315, r: 200, c: ring2 },
  ];
  const inner = [
    { l: 'Master Budget',  a:  30, r: 115, c: ring3 },
    { l: 'Persona',        a: 150, r: 115, c: ring1 },
    { l: 'Copy stratégie', a: 270, r: 115, c: ring2 },
  ];
  return (
    <section style={{ padding: '32px 48px 64px', position:'relative' }}>
      <div style={{ display:'grid', gridTemplateColumns:'520px 1fr', gap: 64, alignItems:'center' }}>
        <div style={{ position:'relative', width: 520, height: 520, margin:'0 auto' }}>
          <div style={{ position:'absolute', inset: 40, borderRadius:'50%', border:`1.5px solid ${ring1}`, opacity:.35, animation:'pa-rotate 40s linear infinite' }}></div>
          <div style={{ position:'absolute', inset: 90, borderRadius:'50%', border:`1.5px solid ${ring2}`, opacity:.35, animation:'pa-rotate 60s linear infinite reverse' }}></div>
          <div style={{ position:'absolute', inset: 150, borderRadius:'50%', border:`1.5px solid ${ring3}`, opacity:.35, animation:'pa-rotate 50s linear infinite' }}></div>

          {nodes.map((n, i) => {
            const x = 260 + Math.cos((n.a * Math.PI) / 180) * n.r;
            const y = 260 + Math.sin((n.a * Math.PI) / 180) * n.r;
            return (
              <div key={i} style={{
                position:'absolute', left: x, top: y, transform:'translate(-50%,-50%)',
                background:'rgba(255,255,255,.92)', padding:'7px 13px', borderRadius: 999,
                fontSize: 12, fontWeight: 500, border:'1px solid var(--line)',
                boxShadow:'0 6px 18px rgba(28,26,46,.08)', whiteSpace:'nowrap'
              }}>
                <span style={{ display:'inline-block', width: 7, height: 7, background: n.c, borderRadius:'50%', marginRight: 8, verticalAlign:'middle' }}></span>
                {n.l}
              </div>
            );
          })}

          {inner.map((n, i) => {
            const x = 260 + Math.cos((n.a * Math.PI) / 180) * n.r;
            const y = 260 + Math.sin((n.a * Math.PI) / 180) * n.r;
            return (
              <div key={i} style={{
                position:'absolute', left: x, top: y, transform:'translate(-50%,-50%)',
                background:'rgba(255,255,255,.85)', padding:'4px 9px', borderRadius: 999,
                fontSize: 10, fontWeight: 500, color:'var(--muted)',
                border:'1px solid var(--line)', whiteSpace:'nowrap'
              }}>
                {n.l}
              </div>
            );
          })}

          <div style={{
            position:'absolute', inset: 200, borderRadius:'50%',
            background:'radial-gradient(circle at 30% 30%, var(--a2), var(--a1) 75%)',
            display:'flex', alignItems:'center', justifyContent:'center', color:'white',
            boxShadow:'0 10px 40px rgba(28,26,46,.18)',
            textAlign:'center', flexDirection:'column', padding: 16
          }}>
            <span className="pa-serif" style={{ fontSize: 36, lineHeight: 1, color:'white' }}>Paul-Antoine</span>
            <span className="pa-mono" style={{ fontSize: 9, letterSpacing:'.16em', marginTop: 6, color:'rgba(255,255,255,.85)' }}>BUT TC · BDMRC</span>
          </div>
        </div>

        <div>
          <div className="pa-mono" style={{ fontSize: 11, color:'var(--muted)', letterSpacing:'.18em', textTransform:'uppercase', marginBottom: 14 }}>
            Outils & modèles maîtrisés
          </div>
          <h2 style={{ fontSize: 42, fontWeight: 600, letterSpacing:'-.025em', margin: 0, lineHeight: 1.15, maxWidth: 540 }}>
            Une <span className="pa-serif" style={{ color:'var(--a1)' }}>boîte à outils</span> commerciale entre la marque, la donnée et la <span className="pa-serif" style={{ color:'var(--a2)' }}>relation client</span>.
          </h2>
          <div style={{ display:'flex', gap: 10, marginTop: 24, flexWrap:'wrap', maxWidth: 600 }}>
            {PA.outils.map((o) => (
              <span key={o} className="pa-pill" style={{
                background: 'rgba(255,255,255,.7)', border:'1px solid var(--line)', color:'var(--ink)'
              }}>{o}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`@keyframes pa-rotate { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}

function InfoLine({ k, v, accent }) {
  return null;
}

// ── Frise chronologique horizontale ────────────────────────────────────────
function Frieze() {
  const steps = [
    { p: '2023-2024', l: 'BUT 1', sub: 'S1 & S2 · Compétences communes', d: 'Marketing (Lune de Miel), Vente (prospection), Communication (JPO + AFM).', col: 'var(--a1)' },
    { p: 'Sept. 2025', l: 'Départ Erasmus+', sub: 'Odisee · Bruxelles', d: 'Cursus 100% anglais, 9 cours, environnement multiculturel.', col: 'var(--a2)' },
    { p: 'Janv. 2026', l: 'Retour S3 validé', sub: '31 ECTS · TOEIC 935 (C1)', d: 'Projet HotBox pitché à Zurich.', col: 'var(--a3)' },
    { p: 'Mars 2026', l: 'SAE S4', sub: 'Hamleys, Manpower, Oki, SkyFrance', d: 'Pop-up Hamleys (CA 526k€), Manpower OAV, Oki Sushi, jeu d\'entreprise SkyFrance.', col: 'var(--a5)' },
    { p: 'Avr.–Juin 2026', l: 'Stage S4', sub: 'Vioux-Dubois · Biard', d: 'Diagnostic stratégique complet (PESTEL, Porter, SWOT, VRIN, 4P), segment industriel Manitou.', col: 'var(--a4)' },
  ];

  return (
    <section style={{ padding: '24px 48px 64px', position: 'relative' }}>
      <div style={{ marginBottom: 36, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="pa-mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '.18em', marginBottom: 12, textTransform: 'uppercase' }}>
            Parcours · Chronologie
          </div>
          <h2 style={{ fontSize: 44, fontWeight: 600, letterSpacing: '-.025em', margin: 0, lineHeight: 1.1 }}>
            De <span className="pa-serif" style={{ color: 'var(--a1)' }}>Châtellerault</span> à <span className="pa-serif" style={{ color: 'var(--a2)' }}>Bruxelles</span>, du cursus au terrain.
          </h2>
        </div>
        <div className="pa-mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '.12em', alignSelf: 'flex-end' }}>
          5 étapes · 2023 → 2026
        </div>
      </div>

      <div style={{ position: 'relative', paddingTop: 16, paddingBottom: 8 }}>
        {/* Ligne de fond avec dégradé subtil */}
        <svg
          width="100%" height="100" viewBox="0 0 1200 100" preserveAspectRatio="none"
          style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="friezeLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--a1)" stopOpacity=".5" />
              <stop offset="25%" stopColor="var(--a2)" stopOpacity=".7" />
              <stop offset="50%" stopColor="var(--a3)" stopOpacity=".7" />
              <stop offset="75%" stopColor="var(--a5)" stopOpacity=".7" />
              <stop offset="100%" stopColor="var(--a4)" stopOpacity=".7" />
            </linearGradient>
            <linearGradient id="friezeLine2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--a1)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--a1)" stopOpacity=".15" />
              <stop offset="100%" stopColor="var(--a4)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Halo */}
          <path d="M 40 50 Q 300 20, 600 50 T 1160 50" fill="none" stroke="url(#friezeLine2)" strokeWidth="22" strokeLinecap="round" />
          {/* Ligne principale ondulée */}
          <path d="M 40 50 Q 300 20, 600 50 T 1160 50" fill="none" stroke="url(#friezeLine)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="0" />
        </svg>

        {/* Stations */}
        <div style={{
          display: 'grid', gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
          gap: 8, position: 'relative', zIndex: 2
        }}>
          {steps.map((s, i) => (
            <FriezeStation key={i} s={s} i={i} total={steps.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FriezeStation({ s, i, total }) {
  const [hover, setHover] = React.useState(false);
  // Les stations alternent au-dessus / au-dessous de la ligne pour l'aération
  const above = i % 2 === 0;
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative', display: 'flex', flexDirection: 'column',
        alignItems: 'center', minHeight: 280, justifyContent: 'center',
        gap: 12
      }}
    >
      {/* Bloc carte au-dessus */}
      {above && (
        <div style={{
          width: '100%', maxWidth: 220,
          padding: 16, borderRadius: 14,
          background: 'rgba(255,255,255,.78)', backdropFilter: 'blur(20px)',
          border: `1px solid ${s.col}33`,
          boxShadow: hover ? `0 16px 32px -12px ${s.col}55` : '0 4px 12px -4px rgba(28,26,46,.06)',
          transform: hover ? 'translateY(-3px)' : 'none',
          transition: 'transform .3s cubic-bezier(.2,.7,.2,1), box-shadow .3s',
          textAlign: 'center'
        }}>
          <div className="pa-mono" style={{ fontSize: 10, color: s.col, letterSpacing: '.14em', fontWeight: 600, marginBottom: 8 }}>
            {s.p}
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-.01em', lineHeight: 1.25, marginBottom: 4 }}>
            {s.l}
          </div>
          <div className="pa-serif" style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.4, marginBottom: 8 }}>
            {s.sub}
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink)', opacity: .75, lineHeight: 1.5 }}>
            {s.d}
          </div>
        </div>
      )}

      {/* Connecteur vertical de la carte vers la ligne */}
      {above && (
        <div style={{
          width: 1, height: 24,
          background: `linear-gradient(to bottom, ${s.col}00, ${s.col}80)`,
          flexShrink: 0
        }}></div>
      )}

      {/* Marqueur (sur la ligne) */}
      <div style={{
        width: hover ? 22 : 16, height: hover ? 22 : 16,
        borderRadius: '50%',
        background: s.col,
        border: '3px solid var(--bg)',
        boxShadow: `0 0 0 2px ${s.col}`,
        transition: 'width .25s, height .25s',
        flexShrink: 0,
        position: 'relative'
      }}>
        {/* Pulse ring on hover */}
        {hover && (
          <span style={{
            position: 'absolute', inset: -8, borderRadius: '50%',
            border: `2px solid ${s.col}`, opacity: .5,
            animation: 'pa-pulse 1.5s ease-in-out infinite'
          }}></span>
        )}
      </div>

      {/* Connecteur descendant pour les cartes du dessous */}
      {!above && (
        <div style={{
          width: 1, height: 24,
          background: `linear-gradient(to bottom, ${s.col}80, ${s.col}00)`,
          flexShrink: 0
        }}></div>
      )}

      {/* Bloc carte au-dessous */}
      {!above && (
        <div style={{
          width: '100%', maxWidth: 220,
          padding: 16, borderRadius: 14,
          background: 'rgba(255,255,255,.78)', backdropFilter: 'blur(20px)',
          border: `1px solid ${s.col}33`,
          boxShadow: hover ? `0 16px 32px -12px ${s.col}55` : '0 4px 12px -4px rgba(28,26,46,.06)',
          transform: hover ? 'translateY(3px)' : 'none',
          transition: 'transform .3s cubic-bezier(.2,.7,.2,1), box-shadow .3s',
          textAlign: 'center'
        }}>
          <div className="pa-mono" style={{ fontSize: 10, color: s.col, letterSpacing: '.14em', fontWeight: 600, marginBottom: 8 }}>
            {s.p}
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-.01em', lineHeight: 1.25, marginBottom: 4 }}>
            {s.l}
          </div>
          <div className="pa-serif" style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.4, marginBottom: 8 }}>
            {s.sub}
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink)', opacity: .75, lineHeight: 1.5 }}>
            {s.d}
          </div>
        </div>
      )}
    </div>
  );
}

function CompetenciesGrid() {
  return (
    <section style={{ padding: '48px 48px 32px' }}>
      <div style={{ marginBottom: 32 }}>
        <div className="pa-mono" style={{ fontSize: 11, color:'var(--muted)', letterSpacing:'.18em', marginBottom: 12, textTransform:'uppercase' }}>
          5 compétences + interculturalité
        </div>
        <h2 style={{ fontSize: 44, fontWeight: 600, letterSpacing:'-.025em', margin: 0, lineHeight: 1.1 }}>
          Cinq <span className="pa-serif" style={{ color: 'var(--a2)' }}>compétences</span> + un parcours <span className="pa-serif" style={{ color: 'var(--a1)' }}>interculturel</span>.
        </h2>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 16 }}>
        {PA.competencies.map((c, i) => <CompCard key={c.id} c={c} i={i} />)}
      </div>
    </section>
  );
}

function CompCard({ c, i }) {
  const [hover, setHover] = React.useState(false);
  const accent = ['var(--a1)', 'var(--a2)', 'var(--a3)', 'var(--a4)', 'var(--a5)', 'var(--a1)'][i % 6];
  return (
    <a href={c.slug} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
       className="pa-card pa-reveal"
       style={{
         padding: 26, position:'relative', overflow:'hidden',
         transform: hover ? 'translateY(-4px)' : 'none',
         boxShadow: hover ? '0 20px 40px -16px rgba(28,26,46,.14)' : 'none',
         transition: 'transform .35s cubic-bezier(.2,.7,.2,1), box-shadow .35s',
         display:'flex', flexDirection:'column', minHeight: 260
       }}>
      <div style={{
        position:'absolute', top:-50, right:-50, width: 150, height: 150, borderRadius:'50%',
        background: accent, opacity: .18, filter:'blur(36px)'
      }}></div>
      <div style={{ position:'relative', display:'flex', flexDirection:'column', height:'100%' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom: 20 }}>
          <span className="pa-mono" style={{ fontSize: 11, color:'var(--muted)', letterSpacing:'.14em' }}>
            {c.n} · {c.code}
          </span>
          <div style={{ display:'flex', gap: 4 }}>
            {c.semesters.slice(0, 3).map(s => (
              <span key={s} className="pa-pill" style={{
                background: accent + '20', color: accent, fontWeight: 600, fontSize: 10, padding: '3px 8px'
              }}>{s}</span>
            ))}
            {c.semesters.length > 3 && (
              <span className="pa-pill" style={{
                background: accent + '20', color: accent, fontWeight: 600, fontSize: 10, padding: '3px 8px'
              }}>+{c.semesters.length - 3}</span>
            )}
          </div>
        </div>
        <h3 style={{ fontSize: 26, fontWeight: 600, letterSpacing:'-.018em', margin: 0, lineHeight: 1.15, fontFamily: '"Sora", sans-serif' }}>
          {c.title}
          {c.sub && <span style={{ display:'block', fontSize: 13, color:'var(--muted)', fontWeight: 400, marginTop: 4, letterSpacing: 0 }}>{c.sub}</span>}
        </h3>
        <div style={{ fontSize: 14, color:'var(--muted)', marginTop: 12, lineHeight: 1.55, flex: 1 }}>
          {c.tagline}
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginTop: 18, paddingTop: 16, borderTop:'1px dashed var(--line)' }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 600, letterSpacing:'-.015em', color: accent, lineHeight: 1, fontFamily: '"Sora", sans-serif' }}>
              {c.highlight.v}
            </div>
            <div className="pa-mono" style={{ fontSize: 10, color:'var(--muted)', marginTop: 4, letterSpacing:'.08em' }}>{c.highlight.l}</div>
          </div>
          <span style={{
            display:'inline-flex', alignItems:'center', justifyContent:'center',
            width: 32, height: 32, borderRadius:'50%',
            background:'var(--ink)', color:'white', fontSize: 14,
            transform: hover ? 'translateX(2px)' : 'none', transition: 'transform .25s'
          }}>→</span>
        </div>
      </div>
    </a>
  );
}

window.HomePage = HomePage;
