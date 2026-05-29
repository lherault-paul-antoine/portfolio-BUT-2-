// pages/home-story.jsx — variante B : timeline horizontale comme épine dorsale.
// Garde la même chrome (PageShell : nav + footer Carnet d'idées) mais
// réorganise complètement le contenu central autour de la chronologie.

function HomeStoryPage() {
  const stops = [
    { y: '2023', t: 'Bac → BUT 1', s: 'S1 & S2', col: 'var(--a4)',
      items: ['Lune de Miel · études', 'Prospection CROC', 'JPO + AFM Téléthon'] },
    { y: 'Sept 25', t: 'Départ Bruxelles', s: 'Erasmus+ Odisee', col: 'var(--a1)',
      items: ['9 cours en anglais', '7+ nationalités', 'Projet HotBox'] },
    { y: 'Jan 26', t: 'Retour S3', s: '31 ECTS · TOEIC 935', col: 'var(--a2)',
      items: ['Caterpillar B2B', 'SAVE / CLV', 'Business Ethics 17/20'] },
    { y: 'Mars 26', t: 'SAE S4', s: 'Hamleys + SkyFrance', col: 'var(--a3)',
      items: ['CA Hamleys 526k€', 'Oki Sushi · audit digital', 'Manpower OAV'] },
    { y: 'Été 26', t: 'Stage', s: 'Commercial international', col: 'var(--a5)',
      items: ['Cible : entreprise européenne', 'À venir'] },
  ];

  return (
    <PageShell current="index.html">
      {/* Hero — compact */}
      <section style={{ padding: '64px 48px 32px' }}>
        <div className="pa-mono" style={{ fontSize: 11, color:'var(--muted)', letterSpacing:'.18em', textTransform:'uppercase', marginBottom: 14 }}>
          Paul-Antoine Lherault · BUT TC BDMRC · 2025—2026
        </div>
        <h1 className="pa-reveal" style={{ fontSize: 92, lineHeight: 1.02, fontWeight: 600, letterSpacing:'-.04em', margin: 0 }}>
          De <span className="pa-serif" style={{ color: 'var(--a1)' }}>Châtellerault</span> à <span className="pa-serif" style={{ color: 'var(--a2)' }}>Bruxelles</span>,<br/>
          en quatre semestres.
        </h1>
        <div style={{ fontSize: 19, lineHeight: 1.55, color:'var(--ink)', marginTop: 28, maxWidth: 760, opacity:.85 }}>
          BUT Techniques de Commercialisation · parcours <strong>BDMRC</strong> à l’IUT de Châtellerault,
          semestre Erasmus+ à <strong>Odisee (Bruxelles)</strong>. Cette page raconte le parcours
          dans l’ordre où il s’est passé — chaque étape ouvre sur les compétences qu’elle a permis d’acquérir.
        </div>
      </section>

      {/* Horizontal timeline */}
      <section style={{ padding: '24px 48px 64px' }}>
        <div className="pa-mono" style={{ fontSize: 11, color:'var(--muted)', letterSpacing:'.18em', textTransform:'uppercase', marginBottom: 32 }}>
          Chronologie — cinq étapes
        </div>
        <div style={{ position:'relative', paddingTop: 56 }}>
          <div style={{ position:'absolute', left: 0, right: 0, top: 32, height: 2, background:'var(--line)' }}></div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap: 16 }}>
            {stops.map((s, i) => (
              <div key={i} style={{ position:'relative' }} className="pa-reveal">
                <div style={{
                  position:'absolute', top: -44, left: 0,
                  width: 24, height: 24, borderRadius:'50%',
                  background: s.col, border:'4px solid var(--bg)',
                  boxShadow: `0 0 0 1px ${s.col}`
                }}></div>
                <div className="pa-mono" style={{ fontSize: 10, color:'var(--muted)', letterSpacing:'.14em', textTransform:'uppercase' }}>{s.y}</div>
                <div style={{ fontSize: 22, fontWeight: 600, letterSpacing:'-.01em', marginTop: 6, lineHeight: 1.15 }}>{s.t}</div>
                <div style={{ fontSize: 13, color: s.col, marginTop: 4, fontWeight: 500 }}>{s.s}</div>
                <div className="pa-mono" style={{ fontSize: 10, color:'var(--muted)', marginTop: 14, lineHeight: 1.8 }}>
                  {s.items.map((it) => <div key={it}>↳ {it}</div>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compétences inline strip 6-up */}
      <section style={{ padding: '32px 48px 48px' }}>
        <div className="pa-mono" style={{ fontSize: 11, color:'var(--muted)', letterSpacing:'.18em', textTransform:'uppercase', marginBottom: 20 }}>
          Six blocs de compétences acquis le long du chemin ↓
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(6, 1fr)', gap: 12 }}>
          {PA.competencies.map((c, i) => {
            const accent = ['var(--a1)','var(--a2)','var(--a3)','var(--a4)','var(--a5)','var(--a1)'][i];
            return <CompStrip key={c.id} c={c} accent={accent} />;
          })}
        </div>
      </section>

      {/* Key stats — sparse */}
      <section style={{ padding: '32px 48px 32px' }}>
        <div className="pa-card" style={{ padding: '32px 40px' }}>
          <div style={{ display:'flex', gap: 48, alignItems:'baseline', flexWrap:'wrap' }}>
            {PA.stats.map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 40, fontWeight: 600, letterSpacing:'-.025em', lineHeight: 1, color: i % 2 ? 'var(--a1)' : 'var(--ink)' }}>{s.v}</div>
                <div className="pa-mono" style={{ fontSize: 10, color:'var(--muted)', letterSpacing:'.12em', textTransform:'uppercase', marginTop: 8 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy quote (same as v1 — keeps the through-line) */}
      <section style={{ padding: '32px 48px 32px' }}>
        <div className="pa-card" style={{
          padding: '56px 56px',
          background: 'linear-gradient(135deg, color-mix(in srgb, var(--a1) 12%, transparent), color-mix(in srgb, var(--a2) 12%, transparent))',
          position:'relative', overflow:'hidden'
        }}>
          <div style={{
            position:'absolute', top: 24, left: 32, fontSize: 120, color:'var(--a1)',
            opacity:.2, lineHeight: 1, fontFamily:'"Instrument Serif", serif'
          }}>«</div>
          <div className="pa-serif" style={{
            fontSize: 42, lineHeight: 1.3, fontWeight: 400, letterSpacing:'-.005em',
            maxWidth: 900, position:'relative'
          }}>
            Le commerce, c’est <span style={{ color:'var(--a1)' }}>rendre lisible</span> ce qui est confus —
            un marché, une marque, un chiffre — pour que la <span style={{ color:'var(--a2)' }}>décision suivante</span> soit défendable.
          </div>
          <div className="pa-mono" style={{ fontSize: 11, color:'var(--muted)', marginTop: 28, letterSpacing:'.16em' }}>
            — PAUL-ANTOINE, CARNET D’ERASMUS · NOV. 2025
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function CompStrip({ c, accent }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href={c.slug} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
       className="pa-card"
       style={{
         padding: 18, minHeight: 220, display:'flex', flexDirection:'column', justifyContent:'space-between',
         transform: hover ? 'translateY(-4px)' : 'none',
         boxShadow: hover ? '0 18px 36px -16px rgba(28,26,46,.16)' : 'none',
         transition: 'transform .3s, box-shadow .3s',
         position:'relative', overflow:'hidden'
       }}>
      <div style={{
        position:'absolute', top:-50, right:-50, width: 120, height: 120, borderRadius:'50%',
        background: accent, opacity:.18, filter:'blur(30px)'
      }}></div>
      <div style={{ position:'relative' }}>
        <div className="pa-mono" style={{ fontSize: 10, color: accent, letterSpacing:'.14em', fontWeight: 600 }}>
          {c.n} · {c.code}
        </div>
        <div style={{ fontSize: 19, fontWeight: 600, letterSpacing:'-.01em', marginTop: 8, lineHeight: 1.15 }}>
          {c.title}
          {c.sub && <span style={{ display:'block', fontSize: 11, color:'var(--muted)', fontWeight: 400, marginTop: 2 }}>{c.sub}</span>}
        </div>
      </div>
      <div style={{ position:'relative' }}>
        <div style={{ fontSize: 20, fontWeight: 600, color: accent, lineHeight: 1, letterSpacing:'-.01em' }}>{c.highlight.v}</div>
        <div className="pa-mono" style={{ fontSize: 9, color:'var(--muted)', letterSpacing:'.08em', marginTop: 4, lineHeight: 1.4 }}>{c.highlight.l}</div>
        <div style={{
          display:'inline-flex', alignItems:'center', justifyContent:'center',
          width: 28, height: 28, borderRadius:'50%', background:'var(--ink)', color:'white',
          fontSize: 13, marginTop: 12,
          transform: hover ? 'translateX(2px)' : 'none', transition: 'transform .25s'
        }}>→</div>
      </div>
    </a>
  );
}

window.HomeStoryPage = HomeStoryPage;
