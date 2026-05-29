// portfolio-shell.jsx — éléments partagés sur toutes les pages :
// palette pastel CSS vars, blobs animés, nav dropdown, footer.

const { useState, useEffect, useLayoutEffect, useRef } = React;

// ── Palette pastel (PDF spec : bleu doux, rose poudré, sauge, pêche, lavande, crème) ──
const PALETTES_PA = [
  { name: 'Pastels',  bg: '#faf6ef', ink: '#1d1830', a1: '#8aa4c7', a2: '#d9a8b8', a3: '#a3b89a', a4: '#e8b896', a5: '#b6a4d4' },
  { name: 'Crème',    bg: '#f7f3ec', ink: '#1f1a14', a1: '#3a5fbf', a2: '#d9482e', a3: '#a08851', a4: '#e8b896', a5: '#b6a4d4' },
  { name: 'Brume',    bg: '#eef3f3', ink: '#142224', a1: '#2f7d7d', a2: '#e08458', a3: '#c79635', a4: '#a3b89a', a5: '#b6a4d4' },
  { name: 'Lavande',  bg: '#f5f3ff', ink: '#1c1a2e', a1: '#5b5bd6', a2: '#f59e6b', a3: '#7ac9a8', a4: '#d9a8b8', a5: '#b6a4d4' },
  { name: 'Sauge',    bg: '#f3f5ee', ink: '#172218', a1: '#7a9b6e', a2: '#c47d6e', a3: '#8aa4c7', a4: '#d9b56b', a5: '#b6a4d4' },
  { name: 'Aurore',   bg: '#fdf4ef', ink: '#2a1820', a1: '#c47fa8', a2: '#e8a373', a3: '#a8c4d4', a4: '#b6a4d4', a5: '#a3b89a' },
];

// Persisted defaults — host rewrites the JSON between the markers when the user
// changes a tweak.
const PORTFOLIO_DEFAULTS = /*EDITMODE-BEGIN*/{
  "paletteIndex": 3,
  "blobIntensity": 1.0,
  "showBlobs": true
}/*EDITMODE-END*/;

// localStorage mirror so palette choice survives page-to-page navigation in the
// preview even when the host hasn't yet rewritten the source file.
const LS_KEY = 'pa-portfolio-tweaks-v2-lavande';
function loadPersisted() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? { ...PORTFOLIO_DEFAULTS, ...JSON.parse(raw) } : PORTFOLIO_DEFAULTS;
  } catch (e) { return PORTFOLIO_DEFAULTS; }
}
function savePersisted(values) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(values)); } catch (e) {}
}

function injectGlobalCss(palette) {
  const id = 'pa-globals';
  let el = document.getElementById(id);
  if (!el) { el = document.createElement('style'); el.id = id; document.head.appendChild(el); }
  el.textContent = `
    :root {
      --bg: ${palette.bg}; --ink: ${palette.ink};
      --a1: ${palette.a1}; --a2: ${palette.a2}; --a3: ${palette.a3};
      --a4: ${palette.a4}; --a5: ${palette.a5};
      --surface: rgba(255,255,255,.65);
      --line: rgba(28,26,46,.08);
      --muted: rgba(28,26,46,.55);
    }
    html, body { margin:0; padding:0; background: var(--bg); color: var(--ink); font-family: "Sora", sans-serif; }
    * { box-sizing: border-box; }
    a { color: inherit; text-decoration: none; }
    .pa-serif { font-family: "Instrument Serif", serif; font-style: italic; font-weight: 400; }
    .pa-mono { font-family: "IBM Plex Mono", monospace; }
    .pa-pill { display:inline-flex; align-items:center; gap:6px; padding:5px 12px; border-radius:999px; font-size:11px; font-weight:500; }
    .pa-dot { width:6px; height:6px; border-radius:50%; }
    .pa-card { background: var(--surface); backdrop-filter: blur(20px); border:1px solid var(--line); border-radius:24px; }
    .pa-link-underline { position:relative; }
    .pa-link-underline::after { content:""; position:absolute; left:0; right:0; bottom:-3px; height:1px; background: currentColor; transform: scaleX(0); transform-origin: left; transition: transform .35s cubic-bezier(.2,.7,.2,1); }
    .pa-link-underline:hover::after { transform: scaleX(1); }
    @keyframes pa-blob1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(80px,-60px) scale(1.15); } }
    @keyframes pa-blob2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-100px,80px) scale(1.1); } }
    @keyframes pa-blob3 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(60px,100px) scale(.95); } }
    @keyframes pa-pulse { 0%,100% { opacity:.6 } 50% { opacity:1 } }
    @keyframes pa-reveal { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
    .pa-reveal { animation: pa-reveal .8s cubic-bezier(.2,.7,.2,1) both; }
    .pa-blob { position:absolute; border-radius:50%; filter: blur(80px); pointer-events:none; }
    .pa-progress { position: fixed; top: 0; left: 0; right: 0; height: 3px; background: var(--a1); transform-origin: left; transform: scaleX(0); z-index: 200; transition: transform .1s linear; }
  `;
}

// ── Reading progress bar (fixed at top) ────────────────────────────────────
function ProgressBar() {
  useEffect(() => {
    const el = document.querySelector('.pa-progress');
    if (!el) return;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? window.scrollY / max : 0;
      el.style.transform = `scaleX(${pct})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="pa-progress"></div>;
}

// ── Animated blobs background (3 floating pastel orbs) ─────────────────────
function BlobsBg({ intensity = 1 }) {
  return (
    <div style={{ position:'fixed', inset: 0, overflow:'hidden', pointerEvents:'none', zIndex: 0 }}>
      <div className="pa-blob" style={{ width: 560, height: 560, background: 'var(--a2)', opacity: .28 * intensity, top: -120, right: -100, animation: 'pa-blob1 18s ease-in-out infinite' }}></div>
      <div className="pa-blob" style={{ width: 500, height: 500, background: 'var(--a1)', opacity: .22 * intensity, top: 400, left: -120, animation: 'pa-blob2 22s ease-in-out infinite' }}></div>
      <div className="pa-blob" style={{ width: 420, height: 420, background: 'var(--a3)', opacity: .26 * intensity, top: 1100, right: 60, animation: 'pa-blob3 20s ease-in-out infinite' }}></div>
      <div className="pa-blob" style={{ width: 380, height: 380, background: 'var(--a5)', opacity: .20 * intensity, top: 1800, left: 200, animation: 'pa-blob1 26s ease-in-out infinite' }}></div>
    </div>
  );
}

// ── Top navigation with dropdown menus ─────────────────────────────────────
function TopNav({ current = '' }) {
  const [openMenu, setOpenMenu] = useState(null);
  const closeAll = () => setOpenMenu(null);
  useEffect(() => {
    const h = (e) => { if (!e.target.closest('[data-nav-menu]')) closeAll(); };
    document.addEventListener('click', h);
    return () => document.removeEventListener('click', h);
  }, []);

  const isCurrent = (slug) => current === slug;

  return (
    <nav style={{
      position:'sticky', top: 0, zIndex: 100, padding: '20px 48px',
      display:'flex', justifyContent:'space-between', alignItems:'center',
      background: 'rgba(250,246,239,.7)', backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--line)'
    }}>
      <a href="index.html" style={{ display:'flex', alignItems:'center', gap: 12 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 12,
          background: 'linear-gradient(135deg, var(--a1), var(--a2))',
          display:'flex', alignItems:'center', justifyContent:'center',
          color:'white', fontWeight: 700, fontSize: 15, letterSpacing:'-.02em'
        }}>PA</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, letterSpacing:'-.005em' }}>Paul-Antoine Lherault</div>
          <div className="pa-mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing:'.06em' }}>BUT TC BDMRC · IUT Châtellerault</div>
        </div>
      </a>

      <div style={{
        display:'flex', alignItems:'center', gap: 4, padding: 6,
        background: 'rgba(255,255,255,.75)', border: '1px solid var(--line)',
        borderRadius: 999, fontSize: 13, fontWeight: 500
      }}>
        <NavLink href="index.html" label="Accueil" current={isCurrent('index.html')} />
        <NavDropdown
          label="Compétences communes"
          open={openMenu === 'cc'}
          onToggle={() => setOpenMenu(openMenu === 'cc' ? null : 'cc')}
          items={[
            { href: 'marketing.html',     label: 'Marketing',     sub: 'CE1' },
            { href: 'vente.html',         label: 'Vente',         sub: 'CE2' },
            { href: 'communication.html', label: 'Communication', sub: 'CE3' },
          ]}
        />
        <NavDropdown
          label="Parcours BDMRC"
          open={openMenu === 'bd'}
          onToggle={() => setOpenMenu(openMenu === 'bd' ? null : 'bd')}
          items={[
            { href: 'business-dev.html',    label: 'Business Développement', sub: 'CE4' },
            { href: 'relation-client.html', label: 'Relation Client',        sub: 'CE5' },
          ]}
        />
        <NavLink href="erasmus.html" label="Interculturalité" tag="Erasmus+" current={isCurrent('erasmus.html')} />
        <NavLink href="cv.html" label="CV" current={isCurrent('cv.html')} />
        <NavLink href="positionnement.html" label="Bilan" current={isCurrent('positionnement.html')} />
      </div>

      <a href={`mailto:${PA.identity.email}`} style={{
        display:'inline-flex', alignItems:'center', gap: 8, padding: '10px 18px',
        borderRadius: 999, background: 'var(--ink)', color: 'white',
        fontSize: 13, fontWeight: 500
      }}>
        Me contacter <span style={{ fontSize: 16 }}>↗</span>
      </a>
    </nav>
  );
}

function NavLink({ href, label, current, tag }) {
  return (
    <a href={href} style={{
      padding: '8px 14px', borderRadius: 999,
      background: current ? '#fff' : 'transparent',
      color: current ? 'var(--ink)' : 'var(--muted)',
      boxShadow: current ? '0 1px 3px rgba(28,26,46,.08)' : 'none',
      transition: 'background .15s, color .15s',
      display: 'inline-flex', alignItems: 'center', gap: 8
    }}>
      {label}
      {tag ? <span className="pa-mono" style={{
        fontSize: 9, fontWeight: 600, letterSpacing: '.08em',
        padding: '2px 7px', borderRadius: 999,
        background: 'var(--a5)', color: '#fff'
      }}>{tag}</span> : null}
    </a>
  );
}

function NavDropdown({ label, items, open, onToggle }) {
  return (
    <div data-nav-menu style={{ position: 'relative' }}>
      <button onClick={(e) => { e.stopPropagation(); onToggle(); }} style={{
        padding: '8px 14px', borderRadius: 999, border: 'none',
        background: open ? '#fff' : 'transparent',
        color: open ? 'var(--ink)' : 'var(--muted)',
        boxShadow: open ? '0 1px 3px rgba(28,26,46,.08)' : 'none',
        fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit', cursor:'pointer',
        display:'inline-flex', alignItems:'center', gap: 6
      }}>
        {label}
        <span style={{ fontSize: 10, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>▾</span>
      </button>
      {open && (
        <div style={{
          position:'absolute', top:'calc(100% + 8px)', left: 0,
          background:'#fff', border:'1px solid var(--line)',
          borderRadius: 16, padding: 8, minWidth: 240,
          boxShadow:'0 12px 40px rgba(28,26,46,.12), 0 2px 8px rgba(28,26,46,.04)',
          zIndex: 50
        }}>
          {items.map((it) => (
            <a key={it.href} href={it.href} style={{
              display:'flex', alignItems:'center', justifyContent:'space-between',
              padding: '10px 14px', borderRadius: 10, fontSize: 13,
              color: 'var(--ink)', transition:'background .15s'
            }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(28,26,46,.04)'}
               onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
              <span style={{ fontWeight: 500 }}>{it.label}</span>
              <span className="pa-mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing:'.08em' }}>{it.sub}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Footer (sur toutes les pages) ──────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ padding: '32px 48px 48px', borderTop:'1px solid var(--line)' }}>
      <div className="pa-mono" style={{ fontSize: 10, color: 'var(--muted)', display:'flex', justifyContent:'space-between', letterSpacing:'.08em', flexWrap:'wrap', gap: 12 }}>
        <span>© 2025 — PAUL-ANTOINE LHERAULT · BUT TC BDMRC · IUT CHÂTELLERAULT</span>
        <span>TUTRICE : HÉLÈNE AUBRIET · TOEIC 935 · ERASMUS+ ODISEE</span>
      </div>
    </footer>
  );
}

// ── PageShell: tout-en-un (palette, blobs, nav, content, footer) ───────────
function PageShell({ current, children, withBlobs = true }) {
  const [values, setValues] = useState(loadPersisted);
  const palette = PALETTES_PA[values.paletteIndex] || PALETTES_PA[0];
  useLayoutEffect(() => { injectGlobalCss(palette); }, [palette]);
  // Mirror localStorage so the choice carries across page navigations.
  useEffect(() => { savePersisted(values); }, [values]);
  // Pick up cross-page changes from localStorage in real time.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === LS_KEY && e.newValue) {
        try { setValues(JSON.parse(e.newValue)); } catch (_) {}
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);
  // Wire to host edit-mode protocol (persists to disk via the EDITMODE block).
  const setTweak = (k, v) => {
    setValues((cur) => {
      const next = typeof k === 'object' ? { ...cur, ...k } : { ...cur, [k]: v };
      try {
        window.parent.postMessage({ type: '__edit_mode_set_keys', edits: typeof k === 'object' ? k : { [k]: v } }, '*');
      } catch (_) {}
      return next;
    });
  };
  const intensity = values.showBlobs ? values.blobIntensity : 0;
  return (
    <>
      <ProgressBar />
      {withBlobs && <BlobsBg intensity={intensity} />}
      <div style={{ position:'relative', zIndex: 1 }}>
        <TopNav current={current} />
        {children}
        <Footer />
      </div>
      <TweaksPanel title="Tweaks · Palette">
        <TweakSection label="Palette" />
        <TweakColor
          label="Choix"
          value={[palette.bg, palette.a1, palette.a2, palette.a3, palette.a4]}
          options={PALETTES_PA.map((p) => [p.bg, p.a1, p.a2, p.a3, p.a4])}
          onChange={(v) => {
            const idx = PALETTES_PA.findIndex((p) => p.bg === v[0] && p.a1 === v[1]);
            if (idx >= 0) setTweak('paletteIndex', idx);
          }}
        />
        <TweakSelect
          label="Nom"
          value={String(values.paletteIndex)}
          options={PALETTES_PA.map((p, i) => ({ value: String(i), label: p.name }))}
          onChange={(v) => setTweak('paletteIndex', parseInt(v, 10))}
        />
        <TweakSection label="Ambiance" />
        <TweakToggle
          label="Blobs animés"
          value={values.showBlobs}
          onChange={(v) => setTweak('showBlobs', v)}
        />
        <TweakSlider
          label="Intensité"
          value={values.blobIntensity}
          min={0.2} max={1.6} step={0.1}
          onChange={(v) => setTweak('blobIntensity', v)}
        />
      </TweaksPanel>
    </>
  );
}

Object.assign(window, { PALETTES_PA, injectGlobalCss, BlobsBg, TopNav, Footer, PageShell, ProgressBar });
