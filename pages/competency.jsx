// pages/competency.jsx — gabarit réutilisable pour les 5 pages compétence.
// Affiche : hero, onglets S1&S2 / S3 / S4 (selon disponibilité).
// - S3 : structure historique (contexte / réalisation / réflexif / traces).
// - S4 : nouvelle structure « CPT critiques » (Contexte → Procédé → Résultat
//   → Analyse réflexive) si active.cpts est défini, + bloc Stage Vioux-Dubois.

function CompetencyPage({ id }) {
  const c = PA.competencies.find((x) => x.id === id);
  const d = PA.details[id] || {};
  const tabs = c.semesters;
  const tabKeyOf = (label) => {
    if (label === 'S1&S2') return 's12';
    return label.toLowerCase().replace(/&/g, '');
  };
  const [tab, setTab] = React.useState(tabs[tabs.length - 1]); // ouvre par défaut sur le semestre le plus avancé
  const accent = {
    marketing: 'var(--a1)', vente: 'var(--a2)', communication: 'var(--a3)',
    'business-dev': 'var(--a4)', 'relation-client': 'var(--a5)',
  }[id] || 'var(--a1)';
  const active = d[tabKeyOf(tab)] || {};
  const status = c.status[tabKeyOf(tab)];

  // Numéro CPT pour le tableau de répartition stage (mapping id → n° CPT)
  const cptIndex = {
    marketing: 1, vente: 2, communication: 3,
    'business-dev': 4, 'relation-client': 5,
  }[id];

  return (
    <PageShell current={c.slug}>
      {/* Hero */}
      <section style={{ padding: '48px 48px 32px', maxWidth: 1300, fontFamily: '"Sora", sans-serif' }}>
        <div className="pa-mono" style={{ fontSize: 12, color: 'var(--muted)', letterSpacing:'.18em', textTransform:'uppercase', marginBottom: 16 }}>
          Compétence {c.n} · {c.code} {c.sub ? `· ${c.sub}` : ''}
        </div>
        <h1 className="pa-reveal" style={{
          fontSize: 96, lineHeight: 1.02, fontWeight: 600, letterSpacing:'-.04em', margin: 0
        }}>
          {c.title}
          {c.sub && <span className="pa-serif" style={{ display:'block', fontSize: 56, color: accent, fontWeight: 400, marginTop: 8 }}>{c.sub}</span>}
        </h1>
        <div style={{ fontSize: 20, lineHeight: 1.55, color:'var(--ink)', marginTop: 32, maxWidth: 760, opacity:.85 }}>
          {c.tagline}
        </div>

        {/* Tab switcher */}
        <div role="tablist" style={{
          display:'inline-flex', gap: 6, padding: 6, marginTop: 40,
          background: 'rgba(255,255,255,.7)', backdropFilter:'blur(20px)',
          border: '1px solid var(--line)', borderRadius: 999
        }}>
          {tabs.map((t) => {
            const isActive = t === tab;
            return (
              <button key={t} role="tab" aria-selected={isActive} onClick={() => setTab(t)} style={{
                padding: '10px 22px', borderRadius: 999, border:'none', cursor:'pointer',
                background: isActive ? 'var(--ink)' : 'transparent',
                color: isActive ? 'white' : 'var(--muted)',
                fontFamily:'inherit', fontSize: 14, fontWeight: 500,
                transition: 'background .2s, color .2s'
              }}>
                {t}
                <span className="pa-mono" style={{ fontSize: 10, marginLeft: 8, opacity:.7, letterSpacing:'.06em' }}>
                  {c.status[tabKeyOf(t)]}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Active panel content */}
      <section key={tab} className="pa-reveal" style={{ padding: '32px 48px', maxWidth: 1400, fontFamily: '"Sora", sans-serif' }}>
        <div style={{ display:'grid', gridTemplateColumns:'320px 1fr', gap: 48, alignItems:'start' }}>
          {/* Left rail: status + AC */}
          <aside style={{ position:'sticky', top: 100 }}>
            <div className="pa-card" style={{ padding: 24 }}>
              <div className="pa-mono" style={{ fontSize: 10, color:'var(--muted)', letterSpacing:'.14em', marginBottom: 12, textTransform:'uppercase' }}>
                Statut · {tab}
              </div>
              <div style={{ display:'inline-flex', alignItems:'center', gap: 8, padding:'8px 14px', borderRadius: 999, background: status === 'Acquis' ? accent + '22' : 'rgba(28,26,46,.08)', color: status === 'Acquis' ? accent : 'var(--ink)' }}>
                <span className="pa-dot" style={{ background: status === 'Acquis' ? accent : 'var(--muted)' }}></span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{status}</span>
              </div>
            </div>

            {active.ac && active.ac.length > 0 && (
              <div className="pa-card" style={{ padding: 24, marginTop: 16, background: accent + '14', borderColor: accent + '33' }}>
                <div className="pa-mono" style={{ fontSize: 10, color: accent, letterSpacing:'.14em', marginBottom: 12, textTransform:'uppercase', fontWeight: 600 }}>
                  Apprentissages critiques mobilisés
                </div>
                <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: 13, lineHeight: 1.6, color:'var(--ink)' }}>
                  {active.ac.map((a, i) => <li key={i} style={{ marginBottom: 8 }}>{a}</li>)}
                </ul>
              </div>
            )}

            {/* Mini-récap stage uniquement quand S4 + cpts présents */}
            {active.cpts && PA.stage && (
              <StageRail accent={accent} />
            )}
          </aside>

          {/* Right column */}
          <div style={{ display:'flex', flexDirection:'column', gap: 24 }}>
            {/* Intro de la compétence (uniquement S4 nouvelle structure) */}
            {active.intro && (
              <div className="pa-card" style={{ padding: 32, background: accent + '08' }}>
                <div style={{ fontSize: 17, lineHeight: 1.65, color:'var(--ink)' }}>
                  {active.intro}
                </div>
              </div>
            )}

            {/* Bloc contexte de stage Vioux-Dubois (uniquement quand cpts présent) */}
            {active.cpts && active.stageContext && (
              <StageContextBlock accent={accent} text={active.stageContext} />
            )}

            {/* CPT critiques (format S4 — structure académique) */}
            {active.cpts && active.cpts.length > 0 && (
              <>
                {/* En-tête section CPT */}
                <div style={{ display:'flex', alignItems:'flex-start', gap: 16, marginTop: 8, padding: '20px 28px', borderRadius: 16, background: accent + '08', border: `1px solid ${accent}22` }}>
                  <div style={{ width: 4, minHeight: 48, background: accent, borderRadius: 2, flexShrink: 0, marginTop: 4 }}></div>
                  <div>
                    <h2 style={{ fontSize: 28, fontWeight: 600, letterSpacing:'-.02em', margin: '0 0 6px 0' }}>
                      Évaluation des compétences critiques
                    </h2>
                    <div style={{ fontSize: 13, color:'var(--muted)', lineHeight: 1.55 }}>
                      Chaque compétence critique (CPT) est évaluée séparément. Statut, exercice emblématique, méthodologie et justification de validation sont explicités pour chaque CPT.
                    </div>
                  </div>
                </div>

                {/* Tableau de synthèse en tête — lecture rapide */}
                <SynthesisTable cpts={active.cpts} accent={accent} />

                {/* Blocs CPT détaillés */}
                {active.cpts.map((cpt, i) => (
                  <CptBlock key={i} cpt={cpt} accent={accent} />
                ))}
              </>
            )}

            {/* Format SAE (S1/S2/S3) — structure contexte / méthodologie / évaluation / réflexion */}
            {!active.cpts && active.contexte && (
              <Block label="Contexte et objectifs" accent={accent}>
                {active.contexte.map((c, i) => (
                  <div key={i} style={{ marginBottom: i < active.contexte.length - 1 ? 24 : 0 }}>
                    <div style={{ fontSize: 17, fontWeight: 600, letterSpacing:'-.005em', marginBottom: 6 }}>{c.titre}</div>
                    <div style={{ fontSize: 15, color:'var(--ink)', opacity:.8, lineHeight: 1.65 }}>{c.txt}</div>
                  </div>
                ))}
              </Block>
            )}

            {!active.cpts && active.realisation && (
              <Block label="Travail réalisé et méthodologie" accent={accent}>
                <div style={{ fontSize: 15, lineHeight: 1.75, color:'var(--ink)' }}>{active.realisation}</div>
              </Block>
            )}

            {/* Évaluation explicite de la compétence pour les semestres SAE */}
            {!active.cpts && (active.contexte || active.realisation) && (
              <div style={{
                padding: '20px 28px', borderRadius: 16,
                background: status === 'Acquis' ? accent + '10' : 'rgba(28,26,46,.05)',
                border: `1px solid ${status === 'Acquis' ? accent + '30' : 'var(--line)'}`,
                display: 'flex', alignItems: 'center', gap: 18
              }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '10px 18px', borderRadius: 999, flexShrink: 0,
                  background: status === 'Acquis' ? accent + '22' : status === 'En cours' ? 'rgba(217,168,0,.18)' : 'rgba(217,72,46,.18)',
                  color: status === 'Acquis' ? accent : status === 'En cours' ? '#9a7c00' : '#d9482e',
                  fontSize: 13, fontWeight: 700
                }}>
                  <span style={{ fontSize: 16 }}>{status === 'Acquis' ? '✅' : status === 'En cours' ? '⏳' : '❌'}</span>
                  {status}
                </div>
                <div>
                  <div className="pa-mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing:'.14em', marginBottom: 4 }}>
                    ÉVALUATION DE LA COMPÉTENCE · {tab}
                  </div>
                  <div style={{ fontSize: 14, color:'var(--ink)', lineHeight: 1.5 }}>
                    {status === 'Acquis'
                      ? `La compétence est validée sur le semestre ${tab}. Les apprentissages critiques mobilisés sont démontré(e)s dans les exercices présentés ci-dessus.`
                      : `La compétence est en cours de développement sur le semestre ${tab}. Des axes d'amélioration sont identifiés dans l'analyse réflexive.`}
                  </div>
                </div>
              </div>
            )}

            {!active.cpts && active.reflexif && (
              <Block label="Analyse réflexive" accent={accent}>
                <div style={{ fontSize: 15, lineHeight: 1.75, color:'var(--ink)' }}>
                  {active.reflexif}
                </div>
              </Block>
            )}

            {/* Contextes complémentaires (S4 uniquement) */}
            {active.cpts && active.contexte && (
              <Block label="Contextes complémentaires — SAE et cours" accent={accent}>
                {active.contexte.map((c, i) => (
                  <div key={i} style={{ marginBottom: i < active.contexte.length - 1 ? 20 : 0 }}>
                    <div style={{ fontSize: 16, fontWeight: 600, letterSpacing:'-.005em', marginBottom: 6 }}>{c.titre}</div>
                    <div style={{ fontSize: 14, color:'var(--ink)', opacity:.8, lineHeight: 1.65 }}>{c.txt}</div>
                  </div>
                ))}
              </Block>
            )}

            {/* Metrics et traces (partagés) */}
            {active.metrics && active.metrics.length > 0 && (
              <Block label="Résultats chiffrés" accent={accent}>
                <div style={{ display:'grid', gridTemplateColumns:`repeat(${Math.min(active.metrics.length, 4)}, 1fr)`, gap: 16 }}>
                  {active.metrics.map((m, i) => (
                    <div key={i} style={{ padding: 18, borderRadius: 16, background: accent + '12', border: `1px solid ${accent}33` }}>
                      <div style={{ fontSize: 28, fontWeight: 600, letterSpacing:'-.02em', color: accent, lineHeight: 1 }}>{m.v}</div>
                      <div className="pa-mono" style={{ fontSize: 10, color:'var(--muted)', marginTop: 6, letterSpacing:'.08em' }}>{m.l}</div>
                    </div>
                  ))}
                </div>
              </Block>
            )}

            {active.traces && active.traces.filter(t => t.img || (t.imgs && t.imgs.length > 0)).length > 0 && (() => {
              const withImg = active.traces.filter(t => t.img || (t.imgs && t.imgs.length > 0));
              return (
                <Block label="Traces & preuves" accent={accent}>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
                    {withImg.map((t, i) => <TraceCard key={i} t={t} accent={accent} />)}
                  </div>
                </Block>
              );
            })()}

            {/* Tableau missions stage → CPT (uniquement sur S4 + cpts) */}
            {active.cpts && cptIndex && PA.stage && (
              <StageMissionsTable cptIndex={cptIndex} accent={accent} />
            )}

            {!active.contexte && !active.realisation && !active.cpts && (
              <Block label="Contenu en cours" accent={accent}>
                <div style={{ fontSize: 15, color:'var(--muted)', lineHeight: 1.6 }}>
                  Détails à venir. Voir l'onglet suivant pour les semestres déjà documentés.
                </div>
              </Block>
            )}
          </div>
        </div>
      </section>

      <NextCompetencies currentId={id} />
    </PageShell>
  );
}

// ── Bloc CPT critique ───────────────────────────────────────────────────────
function CptBlock({ cpt, accent }) {
  const statusIcon = cpt.status === 'Atteinte' ? '✅'
                   : cpt.status === 'Partiellement atteinte' ? '⚠️'
                   : '❌';
  const statusBg = cpt.status === 'Atteinte' ? accent + '18'
                 : cpt.status === 'Partiellement atteinte' ? 'rgba(217,168,184,.22)'
                 : 'rgba(217,72,46,.18)';
  const statusColor = cpt.status === 'Atteinte' ? accent
                    : cpt.status === 'Partiellement atteinte' ? '#c47d6e'
                    : '#d9482e';
  return (
    <div className="pa-card" style={{ padding: 0, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        padding: '24px 32px',
        borderBottom: '1px solid var(--line)',
        background: accent + '08',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24
      }}>
        <div>
          <div className="pa-mono" style={{ fontSize: 10, color: accent, letterSpacing:'.16em', marginBottom: 8, fontWeight: 600 }}>
            CPT CRITIQUE · {String(cpt.n).padStart(2, '0')}
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing:'-.015em', lineHeight: 1.25 }}>
            {cpt.title}
          </div>
        </div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '8px 14px', borderRadius: 999,
          background: statusBg, color: statusColor,
          fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap'
        }}>
          <span style={{ fontSize: 14 }}>{statusIcon}</span>
          {cpt.status}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '24px 32px 32px' }}>
        {cpt.exercice && (
          <div style={{
            display: 'flex', gap: 12, alignItems: 'flex-start',
            padding: '14px 18px', borderRadius: 12,
            background: 'rgba(28,26,46,.04)',
            marginBottom: 24
          }}>
            <div className="pa-mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing:'.12em', whiteSpace: 'nowrap', paddingTop: 2 }}>
              EXERCICE EMBLÉMATIQUE · BASE DE DÉMONSTRATION
            </div>
            <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.45 }}>
              {cpt.exercice}
            </div>
          </div>
        )}

        <CptField label="Contexte et mission" icon="📍" text={cpt.contexte} accent={accent} />
        <CptField label="Méthodologie utilisée" icon="🔧" text={cpt.procede} accent={accent} />
        <CptField label="Évaluation du résultat" icon="📊" text={cpt.resultat} accent={accent} />

        {/* Analyse réflexive — deux colonnes maîtrise / amélioration */}
        <div style={{ marginTop: 22 }}>
          <div className="pa-mono" style={{
            fontSize: 11, color: accent, letterSpacing:'.16em',
            textTransform:'uppercase', fontWeight: 600, marginBottom: 14,
            display:'flex', alignItems:'center', gap: 8
          }}>
            <span style={{ fontSize: 14 }}>🔍</span>
            Analyse réflexive
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {cpt.maitrise && (
              <div style={{ padding: 18, borderRadius: 14, background: accent + '10', border: `1px solid ${accent}25` }}>
                <div className="pa-mono" style={{ fontSize: 10, color: accent, letterSpacing:'.12em', fontWeight: 600, marginBottom: 8 }}>
                  CE QUI VALIDE LA COMPÉTENCE
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.6, color:'var(--ink)' }}>{cpt.maitrise}</div>
              </div>
            )}
            {cpt.amelioration && (
              <div style={{ padding: 18, borderRadius: 14, background: 'rgba(28,26,46,.04)', border: '1px dashed var(--line)' }}>
                <div className="pa-mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing:'.12em', fontWeight: 600, marginBottom: 8 }}>
                  AXES D'AMÉLIORATION
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.6, color:'var(--ink)', opacity: .85 }}>{cpt.amelioration}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CptField({ label, icon, text, accent }) {
  if (!text) return null;
  return (
    <div style={{ marginBottom: 18 }}>
      <div className="pa-mono" style={{
        fontSize: 11, color: accent, letterSpacing:'.16em',
        textTransform:'uppercase', fontWeight: 600, marginBottom: 8,
        display:'flex', alignItems:'center', gap: 8
      }}>
        <span style={{ fontSize: 14 }}>{icon}</span>
        {label}
      </div>
      <div style={{ fontSize: 15, lineHeight: 1.65, color:'var(--ink)', opacity: .9 }}>
        {text}
      </div>
    </div>
  );
}

// ── Bloc contexte stage Vioux-Dubois ───────────────────────────────────────
function StageContextBlock({ accent, text }) {
  const s = PA.stage;
  return (
    <div className="pa-card" style={{
      padding: 28, borderColor: accent + '40',
      background: `linear-gradient(135deg, ${accent}10, rgba(255,255,255,.65))`
    }}>
      <div className="pa-mono" style={{ fontSize: 11, color: accent, letterSpacing:'.18em', textTransform:'uppercase', fontWeight: 600, marginBottom: 14 }}>
        ▶ Cadre du stage S4
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 18 }}>
        <StageField label="Entreprise" value={s.entreprise} />
        <StageField label="Activité" value={s.activite} />
        <StageField label="Période" value={s.periode} />
        <StageField label="Tuteur" value={s.tuteur} />
      </div>
      <div style={{ fontSize: 15, lineHeight: 1.65, color:'var(--ink)', opacity: .9 }}>
        {text}
      </div>
    </div>
  );
}

function StageField({ label, value }) {
  return (
    <div>
      <div className="pa-mono" style={{ fontSize: 9, color: 'var(--muted)', letterSpacing:'.14em', marginBottom: 4 }}>
        {label.toUpperCase()}
      </div>
      <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.4 }}>{value}</div>
    </div>
  );
}

// ── Rail latéral : mini-récap stage ────────────────────────────────────────
function StageRail({ accent }) {
  const s = PA.stage;
  return (
    <div className="pa-card" style={{ padding: 20, marginTop: 16 }}>
      <div className="pa-mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing:'.14em', marginBottom: 10, textTransform:'uppercase' }}>
        Stage S4
      </div>
      <div style={{ fontSize: 15, fontWeight: 600, letterSpacing:'-.005em', marginBottom: 4 }}>
        {s.entreprise}
      </div>
      <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 12 }}>
        {s.activite}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11, color: 'var(--ink)', opacity: .8 }}>
        <div>📍 {s.lieu}</div>
        <div>📅 {s.periode}</div>
        <div>👤 {s.tuteur}</div>
      </div>
    </div>
  );
}

// ── Tableau missions stage → CPT (filtré pour la compétence en cours) ──────
function StageMissionsTable({ cptIndex, accent }) {
  const missions = PA.stage.missions.filter((m) => m.cpts.includes(cptIndex));
  if (missions.length === 0) return null;
  return (
    <div className="pa-card" style={{ padding: 32 }}>
      <div className="pa-mono" style={{
        fontSize: 11, color: accent, letterSpacing:'.18em',
        textTransform:'uppercase', fontWeight: 600, marginBottom: 8,
        display:'flex', alignItems:'center', gap: 10
      }}>
        <span style={{ width: 24, height: 1, background: accent }}></span>
        Missions de stage mobilisées dans cette compétence
      </div>
      <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20, lineHeight: 1.55 }}>
        Sur les 20 missions du stage Vioux-Dubois, <strong style={{ color: accent }}>{missions.length}</strong> ont
        directement nourri cette compétence.
        Une même mission peut compter dans plusieurs compétences.
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 8 }}>
        {missions.map((m, i) => (
          <div key={i} style={{
            display: 'flex', gap: 12, alignItems: 'flex-start',
            padding: '12px 16px', borderRadius: 12,
            background: 'rgba(255,255,255,.6)', border: '1px solid var(--line)'
          }}>
            <span style={{
              color: accent, fontSize: 14, lineHeight: 1, paddingTop: 2, flexShrink: 0
            }}>✓</span>
            <span style={{ fontSize: 13, lineHeight: 1.45 }}>{m.m}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Tableau de synthèse CPT ─────────────────────────────────────────────────
function SynthesisTable({ cpts, accent }) {
  return (
    <div className="pa-card" style={{ padding: 32 }}>
      <div className="pa-mono" style={{
        fontSize: 11, color: accent, letterSpacing:'.18em',
        textTransform:'uppercase', fontWeight: 600, marginBottom: 18,
        display:'flex', alignItems:'center', gap: 10
      }}>
        <span style={{ width: 24, height: 1, background: accent }}></span>
        Tableau de synthèse — statut des compétences critiques
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--line)' }}>
            <th style={{ textAlign: 'left', padding: '10px 14px', fontWeight: 600, color: 'var(--muted)', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase' }}>CPT Critique</th>
            <th style={{ textAlign: 'center', padding: '10px 14px', fontWeight: 600, color: 'var(--muted)', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Statut</th>
            <th style={{ textAlign: 'left', padding: '10px 14px', fontWeight: 600, color: 'var(--muted)', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase' }}>Exercice emblématique</th>
          </tr>
        </thead>
        <tbody>
          {cpts.map((cpt, i) => {
            const icon = cpt.status === 'Atteinte' ? '✅'
                       : cpt.status === 'Partiellement atteinte' ? '⚠️' : '❌';
            return (
              <tr key={i} style={{ borderBottom: i < cpts.length - 1 ? '1px solid var(--line)' : 'none' }}>
                <td style={{ padding: '14px', fontWeight: 500, lineHeight: 1.4 }}>{cpt.title}</td>
                <td style={{ padding: '14px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                  <span style={{ fontSize: 16, marginRight: 6 }}>{icon}</span>
                  <span style={{ fontSize: 12, color: 'var(--muted)' }}>{cpt.status}</span>
                </td>
                <td style={{ padding: '14px', fontSize: 12, color:'var(--muted)', lineHeight: 1.4 }}>{cpt.exercice}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Block({ label, children, accent }) {
  return (
    <div className="pa-card" style={{ padding: 32 }}>
      <div className="pa-mono" style={{
        fontSize: 11, color: accent, letterSpacing:'.18em',
        textTransform:'uppercase', fontWeight: 600, marginBottom: 16,
        display:'flex', alignItems:'center', gap: 10
      }}>
        <span style={{ width: 24, height: 1, background: accent }}></span>
        {label}
      </div>
      {children}
    </div>
  );
}

function TraceCard({ t, accent }) {
  const [hover, setHover] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);

  // Support multi-pages (imgs[]) ou image unique (img)
  const imgs = t.imgs || (t.img ? [t.img] : []);
  const hasImg = imgs.length > 0;
  const isMulti = imgs.length > 1;
  const thumbSrc = imgs[0];
  const curSrc = imgs[page] || imgs[0];

  // Esc / flèches clavier
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') { setOpen(false); setPage(0); }
      if (e.key === 'ArrowRight' && isMulti) setPage((p) => Math.min(p + 1, imgs.length - 1));
      if (e.key === 'ArrowLeft'  && isMulti) setPage((p) => Math.max(p - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, [open, isMulti, imgs.length]);

  const handleClick = (e) => {
    e.preventDefault();
    if (hasImg) { setPage(0); setOpen(true); }
  };

  return (
    <React.Fragment>
      <a href={hasImg ? thumbSrc : '#'} onClick={handleClick}
         onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
         title={hasImg ? 'Cliquer pour agrandir' : undefined}
         style={{
        display:'block', borderRadius: 14, overflow:'hidden',
        background: 'rgba(255,255,255,.6)', border: '1px solid var(--line)',
        transition: 'transform .25s, box-shadow .25s, background .25s',
        transform: hover ? 'translateY(-3px)' : 'none',
        boxShadow: hover ? '0 16px 32px -10px rgba(28,26,46,.18)' : 'none',
        cursor: hasImg ? 'zoom-in' : 'pointer',
        textDecoration:'none', color:'inherit'
      }}>
        {hasImg && (
          <div style={{
            position:'relative', width:'100%', aspectRatio:'4 / 3',
            background: '#efeaff',
            backgroundImage: 'linear-gradient(135deg, rgba(0,0,0,.04), rgba(0,0,0,.0))',
            borderBottom:'1px solid var(--line)',
            overflow:'hidden'
          }}>
            <img src={thumbSrc} alt={t.t} loading="lazy" style={{
              position:'absolute', inset:0, width:'100%', height:'100%',
              objectFit:'cover', objectPosition:'top center',
              transition:'transform .35s ease',
              transform: hover ? 'scale(1.04)' : 'scale(1)'
            }} />
            <span style={{
              position:'absolute', top:10, right:10,
              display:'inline-flex', alignItems:'center', gap:4,
              padding:'4px 8px', borderRadius:999,
              background:'rgba(28,26,46,.78)', color:'#fff',
              fontFamily:'"IBM Plex Mono", monospace', fontSize:9, letterSpacing:'.1em',
              backdropFilter:'blur(6px)'
            }}>⤢ {isMulti ? `${imgs.length} PAGES` : 'AGRANDIR'}</span>
          </div>
        )}
        <div style={{ padding: 16 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 10 }}>
            <span style={{
              display:'inline-flex', alignItems:'center', justifyContent:'center',
              minWidth: 36, height: 24, padding:'0 8px', borderRadius: 6,
              background: accent + '22', color: accent,
              fontFamily:'"IBM Plex Mono", monospace', fontSize: 10, fontWeight: 600, letterSpacing:'.04em'
            }}>{t.f.replace('.', '').toUpperCase()}</span>
            <span style={{ fontSize: 14, color: hasImg ? accent : 'var(--muted)' }}>{hasImg ? '⤢' : '↗'}</span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.35 }}>{t.t}</div>
          <div className="pa-mono" style={{ fontSize: 10, color:'var(--muted)', letterSpacing:'.08em', marginTop: 6, textTransform:'uppercase' }}>{t.tag}</div>
        </div>
      </a>

      {open && hasImg && (
        <div onClick={() => { setOpen(false); setPage(0); }} role="dialog" aria-modal="true" style={{
          position:'fixed', inset:0, zIndex:9999,
          background:'rgba(15,12,30,.9)', backdropFilter:'blur(10px)',
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-start',
          overflowY:'auto', padding:'80px 32px 60px', animation:'paFadeIn .18s ease-out'
        }}>
          {/* Bouton fermer — toujours en haut à droite */}
          <button onClick={(e) => { e.stopPropagation(); setOpen(false); setPage(0); }}
            style={{
              position:'fixed', top: 20, right: 24, zIndex: 10001,
              width: 44, height: 44, borderRadius: 999,
              border:'1px solid rgba(255,255,255,.25)',
              background:'rgba(28,26,46,.85)', backdropFilter:'blur(8px)',
              color:'#fff', fontSize: 20, lineHeight: 1, cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center',
              transition:'background .15s, transform .15s',
              boxShadow:'0 4px 20px rgba(0,0,0,.4)'
            }}
            onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,.15)'; e.currentTarget.style.transform='scale(1.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.background='rgba(28,26,46,.85)'; e.currentTarget.style.transform='scale(1)'; }}
            title="Fermer (Échap)"
          >✕</button>

          {/* Info en haut à gauche */}
          <div style={{
            position:'fixed', top: 26, left: 28,
            display:'flex', alignItems:'center', gap: 10,
            color:'#fff', fontFamily:'"IBM Plex Mono", monospace',
            fontSize: 11, letterSpacing:'.16em', textTransform:'uppercase',
            pointerEvents: 'none'
          }}>
            <span style={{ opacity:.4 }}>Preuve</span>
            <span style={{ opacity:.8 }}>{t.tag}</span>
            {isMulti && (
              <span style={{ opacity:.5 }}>{page + 1} / {imgs.length}</span>
            )}
          </div>

          {/* Zone principale : flèche gauche + image + flèche droite */}
          <div onClick={(e) => e.stopPropagation()} style={{
            display:'flex', alignItems:'center', gap: 20, width:'100%', justifyContent:'center'
          }}>
            {isMulti && (
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 0))}
                disabled={page === 0}
                style={{
                  flexShrink: 0, width: 48, height: 48, borderRadius: 999,
                  border: '1px solid rgba(255,255,255,.2)',
                  background: page === 0 ? 'rgba(255,255,255,.03)' : 'rgba(255,255,255,.12)',
                  color: page === 0 ? 'rgba(255,255,255,.25)' : '#fff',
                  fontSize: 22, cursor: page === 0 ? 'default' : 'pointer',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  transition: 'background .15s'
                }}>‹</button>
            )}

            <img src={curSrc} alt={`${t.t} - page ${page + 1}`} style={{
              maxWidth: isMulti ? 'min(1100px, 80vw)' : 'min(1200px, 92vw)',
              width: '100%',
              height: 'auto',
              objectFit:'contain', borderRadius: 8,
              boxShadow: '0 30px 80px -20px rgba(0,0,0,.7)',
              background:'#fff',
              display: 'block'
            }} />

            {isMulti && (
              <button
                onClick={() => setPage((p) => Math.min(p + 1, imgs.length - 1))}
                disabled={page === imgs.length - 1}
                style={{
                  flexShrink: 0, width: 48, height: 48, borderRadius: 999,
                  border: '1px solid rgba(255,255,255,.2)',
                  background: page === imgs.length - 1 ? 'rgba(255,255,255,.03)' : 'rgba(255,255,255,.12)',
                  color: page === imgs.length - 1 ? 'rgba(255,255,255,.25)' : '#fff',
                  fontSize: 22, cursor: page === imgs.length - 1 ? 'default' : 'pointer',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  transition: 'background .15s'
                }}>›</button>
            )}
          </div>

          {/* Titre + miniatures */}
          <div style={{ marginTop: 16, textAlign:'center', maxWidth: 760 }}>
            <div style={{ color:'#fff', fontFamily:'"Sora", sans-serif', fontSize: 14, lineHeight: 1.5 }}>{t.t}</div>
            {isMulti && (
              <div style={{ display:'flex', gap: 6, flexWrap:'wrap', justifyContent:'center', marginTop: 12 }}>
                {imgs.map((src, i) => (
                  <button key={i} onClick={(e) => { e.stopPropagation(); setPage(i); }} style={{
                    width: 36, height: 26, padding: 2, borderRadius: 4, cursor:'pointer',
                    border: i === page ? '2px solid #fff' : '2px solid rgba(255,255,255,.2)',
                    background: 'rgba(255,255,255,.06)',
                    overflow:'hidden', flexShrink: 0, transition: 'border .15s'
                  }}>
                    <img src={src} alt={`p${i+1}`} style={{ width:'100%', height:'100%', objectFit:'cover', borderRadius: 2 }} />
                  </button>
                ))}
              </div>
            )}
            <div style={{ marginTop: 10, color:'rgba(255,255,255,.4)', fontSize: 11, fontFamily:'"IBM Plex Mono", monospace', letterSpacing:'.14em' }}>
              {isMulti ? 'FLÈCHES ← → POUR NAVIGUER · ESC POUR FERMER' : 'CLIQUER À CÔTÉ OU ESC POUR FERMER'}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

function NextCompetencies({ currentId }) {
  const others = PA.competencies.filter((c) => c.id !== currentId).slice(0, 3);
  return (
    <section style={{ padding: '48px 48px 16px' }}>
      <div className="pa-mono" style={{ fontSize: 11, color:'var(--muted)', letterSpacing:'.18em', marginBottom: 20, textTransform:'uppercase' }}>
        Explorer aussi
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 16 }}>
        {others.map((c, i) => {
          const accent = ['var(--a1)', 'var(--a2)', 'var(--a3)', 'var(--a4)', 'var(--a5)', 'var(--a1)'][PA.competencies.indexOf(c)];
          return (
            <a key={c.id} href={c.slug} className="pa-card" style={{ padding: 24, transition:'transform .25s' }}
               onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
               onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>
              <div className="pa-mono" style={{ fontSize: 10, color: accent, letterSpacing:'.14em', fontWeight: 600 }}>
                {c.n} · {c.code}
              </div>
              <div style={{ fontSize: 22, fontWeight: 600, marginTop: 8, letterSpacing:'-.015em' }}>
                {c.title}
                {c.sub && <span style={{ display:'block', fontSize: 12, color:'var(--muted)', fontWeight: 400 }}>{c.sub}</span>}
              </div>
              <div style={{ fontSize: 13, color:'var(--muted)', marginTop: 8, lineHeight: 1.5 }}>{c.tagline}</div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

window.CompetencyPage = CompetencyPage;
window.TraceCard = TraceCard;

// Lightbox fade-in keyframes (injected once)
if (typeof document !== 'undefined' && !document.getElementById('pa-lightbox-anim')) {
  const s = document.createElement('style');
  s.id = 'pa-lightbox-anim';
  s.textContent = '@keyframes paFadeIn{from{opacity:0}to{opacity:1}}';
  document.head.appendChild(s);
}
