// pages/positionnement.jsx, Tableau de bilan S3/S4 + projet pro

function PositionnementPage() {
  const p = PA.positionnement;
  return (
    <PageShell current="positionnement.html">
      <section style={{ padding: '48px 48px 32px', maxWidth: 1400 }}>
        <div className="pa-mono" style={{ fontSize: 12, color:'var(--muted)', letterSpacing:'.18em', textTransform:'uppercase', marginBottom: 16 }}>
          Tableau de positionnement
        </div>
        <h1 className="pa-reveal" style={{ fontSize: 96, lineHeight: 1.02, fontWeight: 600, letterSpacing:'-.04em', margin: 0 }}>
          Bilan <span className="pa-serif" style={{ color:'var(--a1)' }}>S3</span> &amp; <span className="pa-serif" style={{ color:'var(--a2)' }}>S4</span>.
        </h1>
        <div style={{ fontSize: 19, lineHeight: 1.55, color:'var(--ink)', marginTop: 24, maxWidth: 720, opacity:.85 }}>
          État d’acquisition des 5 compétences principales + la compétence interculturelle -
          avec les modèles et méthodes mobilisés à chaque semestre.
        </div>
      </section>

      {/* Table */}
      <section style={{ padding: '32px 48px' }}>
        <div className="pa-card" style={{ padding: 0, overflow:'hidden' }}>
          {/* Head */}
          <div className="pa-mono" style={{
            display:'grid', gridTemplateColumns:'60px 220px 100px 100px 1fr',
            padding: '16px 24px', background:'rgba(28,26,46,.04)',
            fontSize: 10, color:'var(--muted)', letterSpacing:'.14em', textTransform:'uppercase',
            borderBottom: '1px solid var(--line)'
          }}>
            <span>Code</span><span>Compétence</span><span>S3</span><span>S4</span><span>Modèles &amp; méthodes</span>
          </div>
          {p.lignes.map((row, i) => (
            <div key={i} style={{
              display:'grid', gridTemplateColumns:'60px 220px 100px 100px 1fr', padding: '18px 24px',
              borderBottom: i < p.lignes.length - 1 ? '1px solid var(--line)' : 'none',
              alignItems:'center', fontSize: 14, transition: 'background .2s'
            }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,.5)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <span className="pa-mono" style={{ fontSize: 11, color:'var(--muted)', letterSpacing:'.06em' }}>{row.code}</span>
              <span style={{ fontWeight: 600, letterSpacing:'-.005em' }}>{row.t}</span>
              <StatusPill v={row.s3} />
              <StatusPill v={row.s4} />
              <span style={{ fontSize: 13, color:'var(--ink)', opacity:.8, lineHeight: 1.5 }}>{row.items}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Odisee summary card */}
      <section style={{ padding: '32px 48px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr', gap: 20 }}>
          <div className="pa-card" style={{ padding: 32 }}>
            <div className="pa-mono" style={{ fontSize: 11, color:'var(--a1)', letterSpacing:'.18em', textTransform:'uppercase', fontWeight: 600, marginBottom: 16 }}>
              Résultats Odisee, synthèse
            </div>
            <div style={{ fontSize: 20, lineHeight: 1.5, color:'var(--ink)' }}>
              <strong>31 ECTS</strong> validés en un semestre, 9 cours en anglais,
              progression <strong>B1 → C1</strong> en 4 mois (TOEIC <strong>935/990</strong>).
              Objectif initial B2 dépassé.
            </div>
            <div style={{ display:'flex', gap: 8, marginTop: 20, flexWrap:'wrap' }}>
              {['17/20 Intercultural', '14/20 Logistics', '14/20 Entrepreneuriat', '13/20 Sales Mgmt', '13/20 Macro', '13/20 Ethics', '12/20 Marketing', '12/20 Strategy', '11/20 Budgeting'].map(t => (
                <span key={t} className="pa-pill" style={{ background:'var(--a1)22', color:'var(--a1)', fontWeight: 600 }}>{t}</span>
              ))}
            </div>
          </div>
          <div className="pa-card" style={{ padding: 32, background:'var(--ink)', color:'white', position:'relative', overflow:'hidden' }}>
            <div className="pa-blob" style={{ width: 280, height: 280, background:'var(--a2)', opacity:.45, top:-60, right:-60 }}></div>
            <div className="pa-mono" style={{ fontSize: 11, color:'rgba(255,255,255,.7)', letterSpacing:'.18em', textTransform:'uppercase', fontWeight: 600, marginBottom: 16, position:'relative' }}>
              Projet professionnel
            </div>
            <div className="pa-serif" style={{ fontSize: 30, lineHeight: 1.3, position:'relative' }}>
              {p.pro.split('Prochaines étapes')[0]}
            </div>
            <div className="pa-mono" style={{ fontSize: 11, marginTop: 24, letterSpacing:'.08em', color:'rgba(255,255,255,.75)', lineHeight: 1.8, position:'relative' }}>
              <div>↳ TOEIC 950+</div>
              <div>↳ Cambridge Business English</div>
              <div>↳ Stage S4 commercial international</div>
              <div>↳ Master Commerce International / école de commerce alternance</div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function StatusPill({ v }) {
  const acquired = v === 'Acquis';
  const col = acquired ? 'var(--a3)' : 'var(--a4)';
  return (
    <span className="pa-pill" style={{
      width:'fit-content', background: col + '22', color: col, fontWeight: 600,
      fontSize: 11
    }}>
      <span className="pa-dot" style={{ background: col }}></span>
      {v}
    </span>
  );
}

window.PositionnementPage = PositionnementPage;
