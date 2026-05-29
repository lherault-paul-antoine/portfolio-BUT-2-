// pages/erasmus.jsx, Page Erasmus+ Odisee Bruxelles + Projet transverse

function ErasmusPage() {
  const e = PA.erasmus;
  return (
    <PageShell current="erasmus.html">
      {/* Hero */}
      <section style={{ padding: '48px 48px 32px', maxWidth: 1300 }}>
        <div className="pa-mono" style={{ fontSize: 12, color:'var(--muted)', letterSpacing:'.18em', textTransform:'uppercase', marginBottom: 16 }}>
          6ᵉ compétence · Interculturel
        </div>
        <h1 className="pa-reveal" style={{ fontSize: 96, lineHeight: 1.02, fontWeight: 600, letterSpacing:'-.04em', margin: 0 }}>
          Erasmus+ <span className="pa-serif" style={{ color:'var(--a2)' }}>Odisee</span><br/>
          Bruxelles.
        </h1>
        <div style={{ fontSize: 20, lineHeight: 1.55, color:'var(--ink)', marginTop: 24, maxWidth: 780, opacity:.85 }}>
          {e.contexte}
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 16, marginTop: 40 }}>
          <KV k="Période" v={e.period} />
          <KV k="ECTS validés" v={e.ects} accent="var(--a1)" />
          <KV k="TOEIC" v={e.toeic.v} accent="var(--a2)" sub={e.toeic.l} />
          <KV k="Objectif suivant" v={e.toeic.target} />
        </div>
      </section>

      {/* Results matrix */}
      <section style={{ padding: '32px 48px' }}>
        <div className="pa-card" style={{ padding: 32 }}>
          <div className="pa-mono" style={{ fontSize: 11, color:'var(--a1)', letterSpacing:'.18em', textTransform:'uppercase', fontWeight: 600, marginBottom: 20, display:'flex', alignItems:'center', gap: 10 }}>
            <span style={{ width: 24, height: 1, background:'var(--a1)' }}></span>
            Résultats académiques Odisee
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 12 }}>
            {e.results.map((r, i) => {
              const num = parseInt(r.n, 10);
              const col = num >= 15 ? 'var(--a3)' : num >= 13 ? 'var(--a1)' : num >= 11 ? 'var(--a4)' : 'var(--muted)';
              return (
                <div key={i} style={{
                  display:'flex', justifyContent:'space-between', alignItems:'center',
                  padding:'14px 18px', borderRadius: 12,
                  background: col + '14', border: `1px solid ${col}33`
                }}>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{r.c}</span>
                  <span style={{ fontSize: 18, fontWeight: 600, color: col, letterSpacing:'-.01em' }}>{r.n}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Essai + Ethics two-up */}
      <section style={{ padding: '32px 48px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 20 }}>
          <div className="pa-card" style={{ padding: 32 }}>
            <div className="pa-mono" style={{ fontSize: 11, color:'var(--a2)', letterSpacing:'.18em', textTransform:'uppercase', fontWeight: 600, marginBottom: 14 }}>
              Essai · 17/20
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 600, letterSpacing:'-.015em', margin: '0 0 12px' }}>
              Intercultural Agility for Business
            </h3>
            <div style={{ fontSize: 14, lineHeight: 1.65, color:'var(--ink)', opacity:.85 }}>
              {e.essai}
            </div>
          </div>
          <div className="pa-card" style={{ padding: 32 }}>
            <div className="pa-mono" style={{ fontSize: 11, color:'var(--a1)', letterSpacing:'.18em', textTransform:'uppercase', fontWeight: 600, marginBottom: 14 }}>
              Business Ethics · 13/20
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 600, letterSpacing:'-.015em', margin: '0 0 12px' }}>
              Nike Sweatshops, Responsabilité morale
            </h3>
            <div style={{ fontSize: 14, lineHeight: 1.65, color:'var(--ink)', opacity:.85 }}>
              {e.ethics}
            </div>
          </div>
        </div>
      </section>

      {/* Projet transverse */}
      <section style={{ padding: '32px 48px' }}>
        <div className="pa-card" style={{
          padding: '40px 48px',
          background: 'linear-gradient(135deg, color-mix(in srgb, var(--a3) 14%, transparent), color-mix(in srgb, var(--a1) 10%, transparent))'
        }}>
          <div className="pa-mono" style={{ fontSize: 11, color:'var(--a3)', letterSpacing:'.18em', textTransform:'uppercase', fontWeight: 600, marginBottom: 12 }}>
            Projet transverse
          </div>
          <h3 style={{ fontSize: 36, fontWeight: 600, letterSpacing:'-.025em', margin: '0 0 24px' }}>
            {e.transverse.title}
          </h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap: 12 }}>
            {e.transverse.points.map((p, i) => (
              <div key={i} style={{
                display:'flex', alignItems:'flex-start', gap: 14,
                padding: 16, background:'rgba(255,255,255,.6)', borderRadius: 12, border:'1px solid var(--line)'
              }}>
                <span style={{
                  flexShrink: 0, width: 28, height: 28, borderRadius:'50%',
                  background:'var(--a3)', color:'white', display:'flex',
                  alignItems:'center', justifyContent:'center', fontSize: 12, fontWeight: 600
                }}>{i + 1}</span>
                <span style={{ fontSize: 14, lineHeight: 1.5 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Réflexif quote */}
      <section style={{ padding: '32px 48px' }}>
        <div className="pa-card" style={{ padding: '48px 56px' }}>
          <div className="pa-mono" style={{ fontSize: 11, color:'var(--muted)', letterSpacing:'.18em', textTransform:'uppercase', marginBottom: 16 }}>
            Réflexif
          </div>
          <div className="pa-serif" style={{ fontSize: 32, lineHeight: 1.35, maxWidth: 940 }}>
            {e.reflexif}
          </div>
        </div>
      </section>

      {/* Traces */}
      <section style={{ padding: '32px 48px 32px' }}>
        <div className="pa-card" style={{ padding: 32 }}>
          <div className="pa-mono" style={{ fontSize: 11, color:'var(--a2)', letterSpacing:'.18em', textTransform:'uppercase', fontWeight: 600, marginBottom: 16, display:'flex', alignItems:'center', gap: 10 }}>
            <span style={{ width: 24, height: 1, background:'var(--a2)' }}></span>
            Traces & preuves
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
            {e.traces.map((t, i) => <TraceCard key={i} t={t} accent="var(--a2)" />)}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function KV({ k, v, sub, accent }) {
  return (
    <div className="pa-card" style={{ padding: 20 }}>
      <div className="pa-mono" style={{ fontSize: 10, color:'var(--muted)', letterSpacing:'.14em', textTransform:'uppercase', marginBottom: 8 }}>{k}</div>
      <div style={{ fontSize: 28, fontWeight: 600, letterSpacing:'-.02em', lineHeight: 1.05, color: accent || 'var(--ink)' }}>{v}</div>
      {sub && <div style={{ fontSize: 11, color:'var(--muted)', marginTop: 6, lineHeight: 1.4 }}>{sub}</div>}
    </div>
  );
}

window.ErasmusPage = ErasmusPage;
window.KV = KV;
