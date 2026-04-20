type CharState = 'idle' | 'running' | 'jumping';

interface Props {
  state?: CharState;
  flipped?: boolean;
  style?: React.CSSProperties;
}

/*
  COORDINATE PLAN (viewBox="0 0 40 64", facing right)
  ─────────────────────────────────────────────────────
  Feet ground line : y = 62
  Hip center       : x=18, y=42
  Shoulder center  : x=20, y=26
  Head center      : x=24, y=14   r=10

  LIMB SHAPES (all rectangles, rounded):
    Back leg  : 7×14  pivot top-center (18,42)  → drawn downward
    Front leg : 7×14  pivot top-center (22,42)  → drawn downward
    Torso     : 14×18 pivot top-center (20,24)  → drawn downward
    Back arm  : 6×12  pivot top-center (14,27)  → drawn downward/back
    Front arm : 6×12  pivot top-center (26,27)  → drawn downward/forward
    Head      : circle r=10, center (24,14)
*/

const NarutoCharacter = ({ state = 'idle', flipped = false, style }: Props) => (
  <div
    className={`nrt nrt--${state} ${flipped ? 'nrt--flip' : ''}`}
    style={{ width: 40, height: 64, position: 'relative', filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.5))', ...style }}
  >
    <svg width="40" height="64" viewBox="0 0 40 64" style={{ overflow: 'visible', display: 'block' }} className="nrt-svg">
      <defs>
        <linearGradient id="g-hair" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffe033" /><stop offset="100%" stopColor="#e09800" />
        </linearGradient>
        <linearGradient id="g-skin" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffd890" /><stop offset="100%" stopColor="#ffb850" />
        </linearGradient>
        <linearGradient id="g-orange" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff8c00" /><stop offset="100%" stopColor="#c85000" />
        </linearGradient>
        <linearGradient id="g-orange-dark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#d06000" /><stop offset="100%" stopColor="#a03800" />
        </linearGradient>
      </defs>

      {/* ── Shadow ── */}
      <ellipse className="nrt-shadow" cx="20" cy="63" rx="11" ry="2" fill="rgba(0,0,0,0.3)" />

      {/* ── BACK LEG  pivot (18,42) ── */}
      <g className="nrt-leg-b" style={{ transformOrigin: '18px 42px' }}>
        <rect x="14.5" y="42" width="7" height="13" rx="3" fill="url(#g-orange-dark)" stroke="#7c2d00" strokeWidth="0.7" />
        {/* sandal */}
        <rect x="12" y="53" width="12" height="4" rx="2" fill="#111" />
      </g>

      {/* ── BACK ARM  pivot (14,27) — hangs behind torso ── */}
      <g className="nrt-arm-b" style={{ transformOrigin: '14px 27px' }}>
        <rect x="10.5" y="27" width="7" height="12" rx="3" fill="url(#g-orange-dark)" stroke="#7c2d00" strokeWidth="0.7" />
        {/* fist */}
        <rect x="9" y="37" width="9" height="7" rx="3" fill="url(#g-skin)" stroke="#b07000" strokeWidth="0.6" />
      </g>

      {/* ── TORSO  pivot (20,24) ── */}
      <g className="nrt-torso" style={{ transformOrigin: '20px 24px' }}>
        <rect x="13" y="24" width="14" height="18" rx="3" fill="url(#g-orange)" stroke="#7c2d00" strokeWidth="0.9" />
        {/* black bottom band */}
        <rect x="13" y="37" width="14" height="5" rx="2" fill="#1a1a1a" />
        {/* zip line */}
        <line x1="20" y1="24" x2="20" y2="37" stroke="#7c2d00" strokeWidth="0.9" />
        {/* spiral */}
        <circle cx="20" cy="31" r="2.5" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="0.7" />
      </g>

      {/* ── FRONT LEG  pivot (22,42) ── */}
      <g className="nrt-leg-f" style={{ transformOrigin: '22px 42px' }}>
        <rect x="18.5" y="42" width="7" height="13" rx="3" fill="url(#g-orange)" stroke="#7c2d00" strokeWidth="0.8" />
        {/* sandal */}
        <rect x="16" y="53" width="13" height="4" rx="2" fill="#111" />
        {/* sandal toe */}
        <rect x="26" y="53" width="3" height="4" rx="1.5" fill="#333" />
      </g>

      {/* ── FRONT ARM  pivot (26,27) ── */}
      <g className="nrt-arm-f" style={{ transformOrigin: '26px 27px' }}>
        <rect x="22.5" y="27" width="7" height="12" rx="3" fill="url(#g-orange)" stroke="#7c2d00" strokeWidth="0.8" />
        {/* fist */}
        <rect x="21" y="37" width="9" height="7" rx="3" fill="url(#g-skin)" stroke="#b07000" strokeWidth="0.7" />
      </g>

      {/* ── HEAD  pivot (24,14) ── */}
      <g className="nrt-head" style={{ transformOrigin: '24px 14px' }}>

        {/* hair back — spikes going left/up */}
        <path d="M16,18 L9,8 L15,14 L11,3 L18,11 L16,4 L21,12"
          fill="url(#g-hair)" stroke="#a07000" strokeWidth="0.5" />

        {/* face circle — side profile so slightly offset right */}
        <circle cx="24" cy="14" r="10" fill="url(#g-skin)" stroke="#c07000" strokeWidth="0.9" />

        {/* hair top — spikes over the head */}
        <path d="M15,9 Q18,1 24,3 Q28,-1 32,5 Q35,1 36,8 L34,11 Q31,5 28,9 Q24,3 20,9 Q17,5 15,9 Z"
          fill="url(#g-hair)" stroke="#a07000" strokeWidth="0.5" />

        {/* headband */}
        <rect x="14" y="9" width="22" height="6" rx="1.5" fill="#1e3a8a" stroke="#0f1f5c" strokeWidth="0.6" />
        {/* metal plate */}
        <rect x="17" y="9.5" width="15" height="5" rx="0.8" fill="#c8d8e8" stroke="#8899aa" strokeWidth="0.5" />
        {/* leaf symbol */}
        <circle cx="24.5" cy="12" r="1.8" fill="none" stroke="#607080" strokeWidth="0.55" />
        <line x1="24.5" y1="10.2" x2="24.5" y2="13.8" stroke="#607080" strokeWidth="0.5" />
        {/* headband ties going left (back of head) */}
        <path d="M14,11 L8,9 M14,14 L8,16" stroke="#1e3a8a" strokeWidth="1.6" strokeLinecap="round" />

        {/* ear — left side of profile */}
        <ellipse cx="15" cy="16" rx="2.2" ry="2.8"
          fill="url(#g-skin)" stroke="#c07000" strokeWidth="0.6" />

        {/* eye — right side, one eye visible in profile */}
        <ellipse cx="30" cy="16" rx="2.2" ry="2"
          fill="#1a1a1a" />
        <circle cx="30.8" cy="15.3" r="0.65" fill="white" />

        {/* nose bump */}
        <path d="M34,19 Q36,20 34,22"
          fill="none" stroke="#c07000" strokeWidth="0.75" strokeLinecap="round" />

        {/* mouth */}
        <path d="M32,24 Q34,26 33,27"
          fill="none" stroke="#c07000" strokeWidth="0.8" strokeLinecap="round" />

        {/* whiskers — 3 lines on visible cheek */}
        <g stroke="#c07000" strokeWidth="0.6" strokeLinecap="round" opacity="0.7">
          <line x1="26" y1="19" x2="33" y2="18" />
          <line x1="26" y1="21" x2="33" y2="21" />
          <line x1="26" y1="23" x2="33" y2="23.5" />
        </g>
      </g>
    </svg>

    <style>{`
      .nrt { display: block; }
      .nrt--flip { transform: scaleX(-1); }

      /* SVG-level forward lean when running — applied to container */
      .nrt--running {
        animation: nrt-lean 0.26s ease-in-out infinite alternate;
      }
      @keyframes nrt-lean {
        from { transform: scaleX(-1) translateX(-4px) skewY(-10deg); }
        to   { transform: scaleX(-1) translateX(-8px) skewY(-16deg); }
      }
      .nrt--running.nrt--flip {
        animation: nrt-lean-flip 0.26s ease-in-out infinite alternate;
      }
      @keyframes nrt-lean-flip {
        from { transform: scaleX(1) translateX(4px) skewY(-10deg); }
        to   { transform: scaleX(1) translateX(8px) skewY(-16deg); }
      }

      /* ═══ IDLE — gentle float ═══ */
      .nrt--idle .nrt-torso,
      .nrt--idle .nrt-arm-f,
      .nrt--idle .nrt-arm-b,
      .nrt--idle .nrt-leg-f,
      .nrt--idle .nrt-leg-b { animation: nrt-bob 2.8s ease-in-out infinite; }
      .nrt--idle .nrt-head   { animation: nrt-head-bob 2.8s ease-in-out infinite; }
      .nrt--idle .nrt-shadow { animation: nrt-shadow-idle 2.8s ease-in-out infinite; }

      @keyframes nrt-bob {
        0%,100% { transform: translateY(0);    }
        50%      { transform: translateY(-3px); }
      }
      @keyframes nrt-head-bob {
        0%,100% { transform: translateY(0) rotate(0deg);     }
        50%      { transform: translateY(-3px) rotate(-2deg); }
      }
      @keyframes nrt-shadow-idle {
        0%,100% { transform: scaleX(1);    opacity: 0.3;  }
        50%      { transform: scaleX(0.8); opacity: 0.18; }
      }

      /* ═══ RUNNING — shinobi run ═══
         Body + head lean forward with slight upward bob.
         BOTH arms swept straight back (lateral shinobi style).
         Legs alternate.
      ═══ */
      .nrt--running .nrt-torso {
        animation: nrt-run-body 0.26s ease-in-out infinite alternate;
        transform-origin: 20px 24px;
      }
      .nrt--running .nrt-head {
        animation: nrt-run-body 0.26s ease-in-out infinite alternate;
        transform-origin: 24px 14px;
      }
      @keyframes nrt-run-body {
        from { transform: rotate(-16deg) translateY(-1px); }
        to   { transform: rotate(-22deg) translateY(0px); }
      }

      /* Front arm — swept back behind body */
      .nrt--running .nrt-arm-f {
        animation: nrt-run-arm-f 0.26s ease-in-out infinite alternate;
        transform-origin: 26px 27px;
      }
      @keyframes nrt-run-arm-f {
        from { transform: rotate(60deg);  }
        to   { transform: rotate(70deg);  }
      }

      /* Back arm — also swept back, slightly less */
      .nrt--running .nrt-arm-b {
        animation: nrt-run-arm-b 0.26s ease-in-out infinite alternate;
        transform-origin: 14px 27px;
      }
      @keyframes nrt-run-arm-b {
        from { transform: rotate(50deg); }
        to   { transform: rotate(60deg); }
      }

      /* Front leg strides forward/back */
      .nrt--running .nrt-leg-f {
        animation: nrt-run-leg-f 0.26s ease-in-out infinite alternate;
        transform-origin: 22px 42px;
      }
      @keyframes nrt-run-leg-f {
        from { transform: rotate(-28deg); }
        to   { transform: rotate(22deg);  }
      }

      /* Back leg opposite phase */
      .nrt--running .nrt-leg-b {
        animation: nrt-run-leg-b 0.26s ease-in-out infinite alternate;
        transform-origin: 18px 42px;
      }
      @keyframes nrt-run-leg-b {
        from { transform: rotate(22deg);  }
        to   { transform: rotate(-28deg); }
      }

      .nrt--running .nrt-shadow {
        animation: nrt-run-shadow 0.26s ease-in-out infinite alternate;
      }
      @keyframes nrt-run-shadow {
        from { transform: scaleX(0.85); }
        to   { transform: scaleX(1.1);  }
      }

      /* ═══ JUMPING — tuck ═══ */
      .nrt--jumping .nrt-leg-f {
        transform: rotate(-50deg);
        transform-origin: 22px 42px;
        transition: transform 0.12s ease-out;
      }
      .nrt--jumping .nrt-leg-b {
        transform: rotate(-30deg);
        transform-origin: 18px 42px;
        transition: transform 0.12s ease-out;
      }
      .nrt--jumping .nrt-arm-f {
        transform: rotate(-35deg);
        transform-origin: 26px 27px;
        transition: transform 0.12s ease-out;
      }
      .nrt--jumping .nrt-arm-b {
        transform: rotate(-20deg);
        transform-origin: 14px 27px;
        transition: transform 0.12s ease-out;
      }
      .nrt--jumping .nrt-head {
        transform: translateY(-2px) rotate(-4deg);
        transform-origin: 24px 14px;
        transition: transform 0.12s ease-out;
      }
      .nrt--jumping .nrt-shadow {
        transform: scaleX(0.4);
        opacity: 0.1;
        transition: all 0.18s;
      }
    `}</style>
  </div>
);

export default NarutoCharacter;
