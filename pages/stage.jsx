// pages/stage.jsx, placeholder élégant (contenu à venir après le stage S4)

function StagePage() {
  return (
    <PageShell current="stage.html">
      <section style={{ padding: '72px 48px 48px', maxWidth: 1100 }}>
        <div className="pa-mono" style={{ fontSize: 12, color:'var(--muted)', letterSpacing:'.18em', textTransform:'uppercase', marginBottom: 16 }}>
          Stage · S4 · 2026
        </div>
        <h1 className="pa-reveal" style={{ fontSize: 96, lineHeight: 1.02, fontWeight: 600, letterSpacing:'-.04em', margin: 0 }}>
          Bientôt <span className="pa-serif" style={{ color:'var(--a2)' }}>en stage.</span>
        </h1>
        <div style={{ fontSize: 20, lineHeight: 1.55, color:'var(--ink)', marginTop: 32, maxWidth: 740, opacity:.85 }}>
          Le contenu de cette page sera complété à la fin du stage S4, orientation
          <em> commercial international</em>, entreprise à rayonnement européen.
          Tu retrouveras ici les missions confiées, les livrables, les indicateurs de performance
          et le bilan réflexif.
        </div>
      </section>

      {/* Roadmap placeholder */}
      <section style={{ padding: '32px 48px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 16 }}>
          {[
            { p: 'Avant', t: 'Recherche', d: 'Cibles + lettre de motivation + entretiens.' },
            { p: 'Onboarding', t: 'Cadrage', d: 'Mission, objectifs SMART, périmètre.' },
            { p: 'Pendant', t: 'Livrables', d: 'Reportings hebdo, KPI, comptes-rendus.' },
            { p: 'Après', t: 'Bilan', d: 'Mémoire de stage + soutenance + retour.' },
          ].map((s, i) => (
            <div key={i} className="pa-card" style={{ padding: 24, position:'relative', overflow:'hidden' }}>
              <div className="pa-mono" style={{ fontSize: 10, color:'var(--muted)', letterSpacing:'.14em', textTransform:'uppercase' }}>
                Étape {i + 1} · {s.p}
              </div>
              <div style={{ fontSize: 22, fontWeight: 600, letterSpacing:'-.015em', marginTop: 8 }}>{s.t}</div>
              <div style={{ fontSize: 13, color:'var(--muted)', marginTop: 8, lineHeight: 1.5 }}>{s.d}</div>
              <div style={{
                marginTop: 18, height: 4, borderRadius: 2,
                background: 'linear-gradient(90deg, var(--line) 0%, var(--line) 100%)'
              }}>
                <div style={{ height:'100%', width: i === 0 ? '60%' : '0%', background: 'var(--a1)', borderRadius: 2, transition:'width .8s' }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Big "in progress" frame */}
      <section style={{ padding: '32px 48px' }}>
        <div className="pa-card" style={{
          padding: '64px 56px', minHeight: 320,
          background: 'linear-gradient(135deg, color-mix(in srgb, var(--a2) 14%, transparent), color-mix(in srgb, var(--a1) 10%, transparent))',
          display:'flex', flexDirection:'column', justifyContent:'center', position:'relative', overflow:'hidden'
        }}>
          <div className="pa-mono" style={{ fontSize: 11, color:'var(--a2)', letterSpacing:'.18em', textTransform:'uppercase', fontWeight: 600, marginBottom: 16 }}>
            En cours · à compléter
          </div>
          <div className="pa-serif" style={{ fontSize: 56, lineHeight: 1.15, maxWidth: 900 }}>
            En attendant, <span style={{ color:'var(--a2)' }}>les autres pages</span> documentent les
            5 compétences déjà acquises ou en cours d’acquisition.
          </div>
          <div style={{ display:'flex', gap: 12, marginTop: 32, flexWrap:'wrap' }}>
            <a href="positionnement.html" className="pa-pill" style={{ background: 'var(--ink)', color:'white', padding:'12px 22px', fontSize: 14, fontWeight: 500 }}>
              Voir le bilan S3 / S4 →
            </a>
            <a href="erasmus.html" className="pa-pill" style={{ background:'var(--surface)', border:'1px solid var(--line)', padding:'12px 22px', fontSize: 14, fontWeight: 500, color:'var(--ink)' }}>
              Détour par Bruxelles →
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

window.StagePage = StagePage;
