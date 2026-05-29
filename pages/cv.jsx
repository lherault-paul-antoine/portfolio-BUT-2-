// pages/cv.jsx — Page CV / Synthèse compétences pro.
// Contenu réel à venir : le composant lit `PA.cv` quand cette clé sera
// renseignée dans portfolio-data.jsx. Aujourd'hui il affiche un placeholder
// proprement intégré à la charte du site.

function CVPage() {
  const cv = PA.cv;
  return (
    <PageShell current="cv.html">
      {/* Hero */}
      <section style={{ padding: '48px 48px 32px', maxWidth: 1300 }}>
        <div className="pa-mono" style={{ fontSize: 12, color: 'var(--muted)', letterSpacing:'.18em', textTransform:'uppercase', marginBottom: 16 }}>
          Curriculum Vitae · Synthèse pro
        </div>
        <h1 className="pa-reveal" style={{
          fontSize: 96, lineHeight: 1.02, fontWeight: 600, letterSpacing:'-.04em', margin: 0
        }}>
          CV
          <span className="pa-serif" style={{ display:'block', fontSize: 56, color: 'var(--a1)', fontWeight: 400, marginTop: 8 }}>
            + compétences professionnelles
          </span>
        </h1>
        <div style={{ fontSize: 20, lineHeight: 1.55, color:'var(--ink)', marginTop: 32, maxWidth: 760, opacity:.85 }}>
          Profil, formation, expériences professionnelles, compétences techniques, langues, centres d'intérêt — la photo d'ensemble de mon parcours, au-delà des compétences BUT.
        </div>
      </section>

      {/* Si PA.cv est rempli → on affiche le vrai contenu, sinon placeholder */}
      {cv ? <CvContent cv={cv} /> : <CvPlaceholder />}
    </PageShell>
  );
}

// ── Placeholder (en attendant le contenu) ──────────────────────────────────
function CvPlaceholder() {
  const sections = [
    { code: '01', t: 'Profil', d: 'Une phrase courte qui résume ton positionnement professionnel et ton ambition.' },
    { code: '02', t: 'Formation', d: 'BUT TC BDMRC · IUT Châtellerault · Erasmus+ Odisee · Baccalauréat · TOEIC 935 (C1).' },
    { code: '03', t: 'Expériences pro', d: 'Stage Vioux-Dubois (Manitou) · jobs étudiants · projets associatifs ou bénévoles.' },
    { code: '04', t: 'Compétences techniques', d: 'Outils marketing & commerciaux, méthodes (SWOT, PESTEL, CAP SONCAS…), outils digitaux (Canva, Excel, CRM).' },
    { code: '05', t: 'Langues', d: 'Français natif · Anglais C1 (TOEIC 935) · Espagnol notions.' },
    { code: '06', t: 'Centres d\'intérêt', d: 'Sports, voyages, lectures, projets perso — ce qui te définit hors cursus.' },
  ];

  return (
    <>
      <section style={{ padding: '32px 48px', maxWidth: 1400 }}>
        <div className="pa-card" style={{
          padding: 32,
          background: 'linear-gradient(135deg, color-mix(in srgb, var(--a4) 14%, transparent), rgba(255,255,255,.65))',
          borderColor: 'rgba(232,184,150,.4)'
        }}>
          <div className="pa-mono" style={{ fontSize: 11, color: 'var(--a4)', letterSpacing:'.18em', textTransform:'uppercase', fontWeight: 600, marginBottom: 14 }}>
            ▶ Contenu en attente
          </div>
          <div style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--ink)', maxWidth: 780 }}>
            Cette page accueillera mon CV complet et la synthèse de mes compétences pro.
            Les sections sont prêtes — il ne reste plus qu'à les remplir avec le contenu réel.
          </div>
        </div>
      </section>

      <section style={{ padding: '24px 48px 64px', maxWidth: 1400 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {sections.map((s, i) => (
            <div key={i} className="pa-card" style={{
              padding: 28,
              opacity: .85,
              borderStyle: 'dashed'
            }}>
              <div className="pa-mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing:'.16em', marginBottom: 10, fontWeight: 600 }}>
                {s.code} · À COMPLÉTER
              </div>
              <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-.015em', marginBottom: 10 }}>
                {s.t}
              </div>
              <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.55 }}>
                {s.d}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// ── Contenu réel (quand PA.cv est défini) ──────────────────────────────────
function CvContent({ cv }) {
  return (
    <section style={{ padding: '32px 48px 64px', maxWidth: 1400 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 40, alignItems: 'start' }}>

        {/* Colonne principale */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Profil */}
          {cv.profil && (
            <CvBlock label="Profil" accent="var(--a1)">
              <div className="pa-serif" style={{ fontSize: 20, lineHeight: 1.55, color: 'var(--ink)' }}>{cv.profil}</div>
            </CvBlock>
          )}

          {/* Expériences */}
          {cv.experiences && cv.experiences.length > 0 && (
            <CvBlock label="Expériences professionnelles" accent="var(--a2)">
              {cv.experiences.map((e, i) => (
                <div key={i} style={{
                  paddingBottom: i < cv.experiences.length - 1 ? 22 : 0,
                  marginBottom: i < cv.experiences.length - 1 ? 22 : 0,
                  borderBottom: i < cv.experiences.length - 1 ? '1px dashed var(--line)' : 'none'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 4 }}>
                    <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-.01em' }}>{e.poste}</div>
                    <div className="pa-mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.07em', whiteSpace: 'nowrap', paddingTop: 3 }}>{e.periode}</div>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--a2)', fontWeight: 500, marginBottom: 8 }}>
                    {e.entreprise}{e.lieu ? ` · ${e.lieu}` : ''}
                  </div>
                  {e.description && (
                    <div style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink)', opacity: .85 }}>{e.description}</div>
                  )}
                </div>
              ))}
            </CvBlock>
          )}

          {/* Formation */}
          {cv.formations && cv.formations.length > 0 && (
            <CvBlock label="Formation" accent="var(--a3)">
              {cv.formations.map((f, i) => (
                <div key={i} style={{
                  paddingBottom: i < cv.formations.length - 1 ? 18 : 0,
                  marginBottom: i < cv.formations.length - 1 ? 18 : 0,
                  borderBottom: i < cv.formations.length - 1 ? '1px dashed var(--line)' : 'none'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 4 }}>
                    <div style={{ fontSize: 16, fontWeight: 600 }}>{f.diplome}</div>
                    <div className="pa-mono" style={{ fontSize: 10, color: 'var(--muted)', whiteSpace: 'nowrap', paddingTop: 3 }}>{f.periode}</div>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--a3)', fontWeight: 500 }}>{f.etablissement}</div>
                  {f.detail && <div style={{ fontSize: 13, lineHeight: 1.55, marginTop: 6, color: 'var(--ink)', opacity: .8 }}>{f.detail}</div>}
                </div>
              ))}
            </CvBlock>
          )}

          {/* Vie associative */}
          {cv.vieAsso && cv.vieAsso.length > 0 && (
            <CvBlock label="Vie associative · Judo" accent="var(--a4)">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {cv.vieAsso.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--a4)', fontSize: 14, flexShrink: 0, paddingTop: 2 }}>▸</span>
                    <span style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink)', opacity: .88 }}>{item}</span>
                  </div>
                ))}
              </div>
            </CvBlock>
          )}
        </div>

        {/* Colonne latérale */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 100 }}>

          {/* Contact */}
          {cv.contact && (
            <CvBlock label="Contact" accent="var(--a1)" compact>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a href={`tel:${cv.contact.tel.replace(/\s/g,'')}`} style={{ display: 'flex', gap: 10, alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                  <span style={{ fontSize: 14 }}>📞</span>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{cv.contact.tel}</span>
                </a>
                <a href={`mailto:${cv.contact.email}`} style={{ display: 'flex', gap: 10, alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                  <span style={{ fontSize: 14 }}>✉️</span>
                  <span style={{ fontSize: 12, color: 'var(--a1)', wordBreak: 'break-all' }}>{cv.contact.email}</span>
                </a>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 14, flexShrink: 0 }}>📍</span>
                  <span style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.45 }}>{cv.contact.adresse}</span>
                </div>
              </div>
            </CvBlock>
          )}

          {/* Langues */}
          {cv.langues && cv.langues.length > 0 && (
            <CvBlock label="Langues" accent="var(--a3)" compact>
              {cv.langues.map((l, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '8px 0', borderBottom: i < cv.langues.length - 1 ? '1px dashed var(--line)' : 'none' }}>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{l.langue}</span>
                  <span className="pa-mono" style={{ fontSize: 10, color: 'var(--muted)' }}>{l.niveau}</span>
                </div>
              ))}
            </CvBlock>
          )}

          {/* Compétences outils */}
          {cv.competences && cv.competences.length > 0 && (
            <CvBlock label="Outils & méthodes" accent="var(--a5)" compact>
              <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                {cv.competences.map((c, i) => (
                  <span key={i} style={{
                    display: 'inline-block', padding: '4px 10px', borderRadius: 999,
                    background: 'rgba(255,255,255,.7)', border: '1px solid var(--line)',
                    fontSize: 11, fontWeight: 500, lineHeight: 1.4
                  }}>{c}</span>
                ))}
              </div>
            </CvBlock>
          )}

          {/* Centres d'intérêt */}
          {cv.interets && cv.interets.length > 0 && (
            <CvBlock label="Centres d'intérêt" accent="var(--a1)" compact>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {cv.interets.map((item, i) => (
                  <span key={i} style={{
                    fontSize: 12, color: 'var(--ink)', opacity: .75,
                    padding: '3px 10px', borderRadius: 999,
                    background: 'rgba(28,26,46,.06)', border: '1px solid var(--line)'
                  }}>{item}</span>
                ))}
              </div>
            </CvBlock>
          )}
        </aside>
      </div>
    </section>
  );
}

function CvBlock({ label, accent, children, compact }) {
  return (
    <div className="pa-card" style={{ padding: compact ? 22 : 32 }}>
      <div className="pa-mono" style={{
        fontSize: 11, color: accent, letterSpacing: '.18em',
        textTransform: 'uppercase', fontWeight: 600,
        marginBottom: compact ? 14 : 20,
        display: 'flex', alignItems: 'center', gap: 10
      }}>
        <span style={{ width: 24, height: 1, background: accent }}></span>
        {label}
      </div>
      {children}
    </div>
  );
}

window.CVPage = CVPage;
