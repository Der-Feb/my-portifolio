import { TESTIMONIALS } from '@/__mock__/testimonials';
import { useEffect, useRef, useState } from 'react';

// ─── Coordinate plan ──────────────────────────────────────────────────────────
// SVG viewBox: 0 0 1200 400  — scene div: bottom:60px, height:58%
// Ground line y=397 → aligns with Naruto's feet (bottom:60px)
// Counter top surface: y=236
// Stool seat (patron side): y=270
// NPC head cy=218 (r=9), torso y=227–248, legs y=248–298
// Stool base: y=376
// ─────────────────────────────────────────────────────────────────────────────

// NPC x positions in SVG space (6 NPCs spread across 1200)
const NPC_COUNT = TESTIMONIALS.length;
const npcSvgX = (i: number) => 100 + i * (1000 / (NPC_COUNT - 1));

// ─── RestoBarSection ──────────────────────────────────────────────────────────
const RestoBarSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef     = useRef<SVGSVGElement>(null);

  // ── Speaking cycle ──
  const [activeIdx, setActiveIdx] = useState(-1);
  const [phase, setPhase]         = useState<'in' | 'hold' | 'out'>('in');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Tooltip screen position (measured from SVG) ──
  const [tooltipX, setTooltipX] = useState(0);
  const [tooltipY, setTooltipY] = useState(0);

  const speakDuration = (idx: number) =>
    Math.min(8000, Math.max(4000, TESTIMONIALS[idx].comment.length * 28));

  // Measure where the active NPC head is in screen space
  const measureNPC = (idx: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const vb = svg.viewBox.baseVal;          // 0 0 1200 520
    const rect = svg.getBoundingClientRect();
    const scaleX = rect.width  / vb.width;
    const scaleY = rect.height / vb.height;
    // NPC head top in SVG: x = npcSvgX(idx), y = 218  (seatY=270, head cy=270-52=218, r=9 → top=209)
    const screenX = rect.left + npcSvgX(idx) * scaleX;
    const screenY = rect.top  + 209          * scaleY;
    // Convert to position relative to the section
    const sec = sectionRef.current!.getBoundingClientRect();
    setTooltipX(screenX - sec.left);
    setTooltipY(screenY - sec.top);
  };

  useEffect(() => {
    const speak = (idx: number) => {
      setActiveIdx(idx);
      setPhase('in');
      measureNPC(idx);

      timerRef.current = setTimeout(() => {
        setPhase('hold');
        timerRef.current = setTimeout(() => {
          setPhase('out');
          timerRef.current = setTimeout(() => {
            speak((idx + 1) % NPC_COUNT);
          }, 400);
        }, speakDuration(idx));
      }, 400);
    };

    timerRef.current = setTimeout(() => speak(0), 800);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-measure on resize
  useEffect(() => {
    const onResize = () => { if (activeIdx >= 0) measureNPC(activeIdx); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx]);

  const isVisible = phase === 'in' || phase === 'hold';

  // Bottle data
  const upperBottles = [
    {h:38,w:8,c:'#1a3a1a',l:'#2a6a2a',k:'#c8a020'},{h:44,w:7,c:'#3a1a0a',l:'#c84020',k:'#888'},
    {h:32,w:9,c:'#0a1a3a',l:'#2040a0',k:'#c0c0c0'},{h:40,w:7,c:'#2a0a0a',l:'#a02020',k:'#c8a020'},
    {h:36,w:8,c:'#1a1a0a',l:'#a0a020',k:'#888'},{h:42,w:7,c:'#0a2a1a',l:'#20a060',k:'#c0c0c0'},
    {h:34,w:9,c:'#2a1a2a',l:'#8020a0',k:'#c8a020'},{h:46,w:7,c:'#3a2a0a',l:'#c08020',k:'#888'},
    {h:38,w:8,c:'#0a2a2a',l:'#20a0a0',k:'#c0c0c0'},{h:40,w:7,c:'#1a0a2a',l:'#6020c0',k:'#c8a020'},
    {h:44,w:8,c:'#2a1a0a',l:'#c06020',k:'#888'},{h:36,w:7,c:'#0a1a1a',l:'#208080',k:'#c0c0c0'},
    {h:42,w:9,c:'#1a2a0a',l:'#60a020',k:'#c8a020'},{h:34,w:7,c:'#2a0a1a',l:'#c02060',k:'#888'},
    {h:38,w:8,c:'#0a0a2a',l:'#2020c0',k:'#c0c0c0'},{h:44,w:7,c:'#1a2a1a',l:'#20a040',k:'#c8a020'},
    {h:32,w:9,c:'#2a1a1a',l:'#a04040',k:'#888'},{h:40,w:7,c:'#0a2a0a',l:'#40a020',k:'#c0c0c0'},
  ];
  const lowerBottles = [
    {h:30,w:9,c:'#2a1a0a',l:'#c84020',k:'#c8a020'},{h:34,w:8,c:'#0a2a1a',l:'#20a060',k:'#888'},
    {h:28,w:10,c:'#1a0a2a',l:'#8020c0',k:'#c0c0c0'},{h:36,w:8,c:'#2a2a0a',l:'#c0a020',k:'#c8a020'},
    {h:30,w:9,c:'#0a1a2a',l:'#2060c0',k:'#888'},{h:32,w:8,c:'#1a2a0a',l:'#60c020',k:'#c0c0c0'},
    {h:28,w:10,c:'#2a0a0a',l:'#c02020',k:'#c8a020'},{h:34,w:8,c:'#0a2a2a',l:'#20c0a0',k:'#888'},
    {h:30,w:9,c:'#1a1a2a',l:'#6060c0',k:'#c0c0c0'},{h:36,w:8,c:'#2a0a1a',l:'#c02080',k:'#c8a020'},
    {h:28,w:10,c:'#0a0a1a',l:'#2020a0',k:'#888'},{h:32,w:8,c:'#1a2a2a',l:'#20a0a0',k:'#c0c0c0'},
    {h:30,w:9,c:'#2a1a2a',l:'#a020a0',k:'#c8a020'},{h:34,w:8,c:'#0a1a0a',l:'#208020',k:'#888'},
    {h:28,w:10,c:'#1a0a0a',l:'#a02020',k:'#c0c0c0'},{h:32,w:8,c:'#2a2a1a',l:'#a0a020',k:'#c8a020'},
  ];

  return (
    <section
      id="restobar"
      className="section-room"
      ref={sectionRef}
      style={{
        background: 'linear-gradient(160deg, #08090d 0%, #100e18 40%, #0a0d0a 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Parallax sky */}
      <div className="parallax-layer layer-sky" data-parallax="0.12"
        style={{ background: 'radial-gradient(ellipse at 50% 80%, #0e1215, #08090d 60%)' }} />

      {/* Far background */}
      <div className="parallax-layer layer-far" data-parallax="0.22"
        style={{ bottom: 0, top: 0, opacity: 0.4 }}>
        <svg viewBox="0 0 1200 700" width="100%" height="100%" preserveAspectRatio="xMidYMax slice">
          <rect width="1200" height="700" fill="#0e0c12" />
          {Array.from({ length: 15 }, (_, row) =>
            Array.from({ length: 20 }, (_, col) => (
              <rect key={`${row}-${col}`} x={col * 62 + (row % 2) * 31} y={row * 28}
                width="58" height="24" fill="none" stroke="rgba(40,35,55,0.6)" strokeWidth="1" />
            ))
          )}
        </svg>
      </div>

      {/* Ambient glows */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 6, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '15%', left: '8%', width: 320, height: 320,
          background: 'radial-gradient(circle, rgba(180,30,30,0.05), transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '20%', right: '10%', width: 280, height: 280,
          background: 'radial-gradient(circle, rgba(50,30,120,0.07), transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '8%', left: '40%', width: 400, height: 300,
          background: 'radial-gradient(circle, rgba(200,160,40,0.04), transparent 70%)', borderRadius: '50%' }} />
      </div>

      <div className="fog-vignette" style={{ zIndex: 8 }} />

      {/* Section label */}
      <div style={{ position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)',
        zIndex: 15, textAlign: 'center', pointerEvents: 'none' }}>
        <span className="section-eyebrow" style={{ fontSize: '0.45rem', letterSpacing: '0.3rem' }}>THE RESTO-BAR</span>
        <h2 className="section-title" style={{ marginBottom: 0, fontSize: 'clamp(1.2rem, 4vw, 3rem)' }}>
          WHAT THEY <span style={{ color: 'var(--naruto-orange)' }}>SAY</span>
        </h2>
      </div>

      {/*
        ── UNIFIED BAR SCENE ──────────────────────────────────────────────────
        bottom: 60px  → aligns SVG ground (y=520) with Naruto's feet
        height: calc(100% - 60px) → fills from ground to top of viewport
        SVG viewBox 0 0 1200 520:
          y=0   ceiling / pendant cords
          y=60  hanging glass rod
          y=100 upper shelf
          y=185 lower shelf
          y=280 cabinet top / counter back-wall ends
          y=310 COUNTER TOP SURFACE  ← patrons lean here
          y=360 STOOL SEAT           ← NPC butt
          y=500 STOOL BASE / GROUND
          y=520 bottom edge (= Naruto floor)
      */}
      <div style={{
        position: 'absolute',
        left: 0, right: 0,
        bottom: 60,
        height: '58%',
        zIndex: 10,
        pointerEvents: 'none',
      }}>
        <svg
          ref={svgRef}
          viewBox="0 0 1200 400"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMax meet"
        >
          <defs>
            <linearGradient id="bbMirror" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#0a0c14" />
              <stop offset="50%"  stopColor="#1a1e2a" />
              <stop offset="100%" stopColor="#0a0c14" />
            </linearGradient>
            <linearGradient id="bbWood" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#2a1f0e" />
              <stop offset="100%" stopColor="#150f05" />
            </linearGradient>
            <linearGradient id="bbCounter" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#4a3418" />
              <stop offset="100%" stopColor="#1e1508" />
            </linearGradient>
          </defs>

          {/* ── BACK WALL ── */}
          <rect x="0" y="0" width="1200" height="242" fill="url(#bbMirror)" />
          <rect x="12" y="6" width="1176" height="224" fill="none"
            stroke="rgba(200,160,60,0.18)" strokeWidth="1.5" rx="2" />

          {/* ── HANGING GLASS ROD ── */}
          <rect x="50" y="28" width="1100" height="4" rx="2" fill="#4a3a2a" stroke="#6a5a3a" strokeWidth="1" />
          {[120, 600, 1080].map((bx, i) => (
            <g key={i}>
              <rect x={bx-4} y="18" width="8" height="12" rx="2" fill="#3a2a1a" />
              <circle cx={bx} cy="16" r="3" fill="#6a5a3a" />
            </g>
          ))}
          {Array.from({ length: 14 }, (_, i) => {
            const gx = 80 + i * 80;
            return (
              <g key={i}>
                <line x1={gx} y1="32" x2={gx} y2="40" stroke="rgba(180,220,255,0.5)" strokeWidth="1.2" />
                <path d={`M${gx-5},40 Q${gx-5},50 ${gx},52 Q${gx+5},50 ${gx+5},40 Z`}
                  fill="rgba(180,220,255,0.1)" stroke="rgba(180,220,255,0.4)" strokeWidth="0.8" />
                <ellipse cx={gx} cy="52" rx="5" ry="2" fill="none" stroke="rgba(180,220,255,0.35)" strokeWidth="0.8" />
              </g>
            );
          })}

          {/* ── UPPER SHELF y=72 ── */}
          <rect x="30" y="72" width="1140" height="7" rx="2" fill="url(#bbWood)" stroke="rgba(200,160,60,0.25)" strokeWidth="1" />
          {upperBottles.map((b, i) => {
            const bx = 60 + i * (1080 / (upperBottles.length - 1));
            const sh = Math.round(b.h * 0.6); const sw = b.w - 1;
            const neck = Math.round(sh * 0.28); const body = sh - neck;
            return (
              <g key={i}>
                <rect x={bx-sw/2} y={72-body} width={sw} height={body} rx="1.5" fill={b.c} />
                <rect x={bx-sw/2+1} y={72-body-neck} width={sw-2} height={neck} rx="1" fill={b.c} />
                <rect x={bx-sw/2+0.5} y={72-body-neck-3} width={sw-1} height={4} rx="1" fill={b.k} />
                <rect x={bx-sw/2+0.5} y={72-body+3} width={sw-1} height={Math.round(body*0.4)} rx="1" fill={b.l} opacity="0.85" />
              </g>
            );
          })}

          {/* ── LOWER SHELF y=138 ── */}
          <rect x="30" y="138" width="1140" height="7" rx="2" fill="url(#bbWood)" stroke="rgba(200,160,60,0.25)" strokeWidth="1" />
          {lowerBottles.map((b, i) => {
            const bx = 60 + i * (1080 / (lowerBottles.length - 1));
            const sh = Math.round(b.h * 0.6); const sw = b.w - 1;
            const neck = Math.round(sh * 0.28); const body = sh - neck;
            return (
              <g key={i}>
                <rect x={bx-sw/2} y={138-body} width={sw} height={body} rx="1.5" fill={b.c} />
                <rect x={bx-sw/2+1} y={138-body-neck} width={sw-2} height={neck} rx="1" fill={b.c} />
                <rect x={bx-sw/2+0.5} y={138-body-neck-3} width={sw-1} height={4} rx="1" fill={b.k} />
                <rect x={bx-sw/2+0.5} y={138-body+3} width={sw-1} height={Math.round(body*0.4)} rx="1" fill={b.l} opacity="0.85" />
              </g>
            );
          })}

          {/* ── CABINET y=145–215 ── */}
          <rect x="20" y="145" width="1160" height="70" rx="2" fill="url(#bbWood)" stroke="rgba(200,160,60,0.2)" strokeWidth="1.5" />
          {[0,1,2].map(d => {
            const dw = (1160-30)/3; const dx = 25 + d*(dw+10);
            return (
              <g key={d}>
                <rect x={dx} y="151" width={dw} height="58" rx="2" fill="#1a1208" stroke="rgba(200,160,60,0.18)" strokeWidth="1" />
                <rect x={dx+6} y="158" width={dw-12} height="44" rx="1" fill="none" stroke="rgba(200,160,60,0.12)" strokeWidth="1" />
                <circle cx={dx+dw-14} cy="180" r="4" fill="#6a5a3a" stroke="rgba(200,160,60,0.5)" strokeWidth="1" />
              </g>
            );
          })}

          {/* ── PENDANT LIGHTS ── */}
          {[200, 600, 1000].map((lx, i) => (
            <g key={i}>
              <line x1={lx} y1="0" x2={lx} y2="32" stroke="rgba(80,70,50,0.6)" strokeWidth="1.5" />
              <path d={`M${lx-14},32 L${lx-22},56 L${lx+22},56 L${lx+14},32 Z`} fill="#1a1208" stroke="rgba(200,160,60,0.3)" strokeWidth="1" />
              <circle cx={lx} cy="34" r="4" fill="rgba(255,220,100,0.6)" />
              <path d={`M${lx-22},56 L${lx-65},240 L${lx+65},240 L${lx+22},56 Z`} fill="rgba(255,200,80,0.016)" />
            </g>
          ))}

          {/* ── COUNTER TOP y=240 ── */}
          <rect x="0" y="238" width="1200" height="14" fill="url(#bbCounter)" />
          <rect x="0" y="236" width="1200" height="4" rx="1" fill="#5a4020" stroke="rgba(200,160,60,0.4)" strokeWidth="1" />
          <rect x="0" y="236" width="1200" height="2" fill="rgba(200,160,60,0.22)" />
          <rect x="0" y="252" width="1200" height="10" fill="#2a1a08" />

          {/* Glasses on counter */}
          {[150,300,500,700,900,1050].map((gx, gi) => {
            const types = ['pint','rocks','wine','pint','rocks','wine'] as const;
            const gt = types[gi];
            if (gt === 'pint') return (
              <g key={gi}>
                <path d={`M${gx-4},236 L${gx-5},222 L${gx+5},222 L${gx+4},236 Z`} fill="rgba(180,220,255,0.13)" stroke="rgba(180,220,255,0.38)" strokeWidth="0.8" />
                <ellipse cx={gx} cy="222" rx="5" ry="2" fill="rgba(255,255,255,0.5)" />
                <path d={`M${gx-3},234 L${gx-4.5},226 L${gx+4.5},226 L${gx+3},234 Z`} fill="rgba(200,160,40,0.45)" />
              </g>
            );
            if (gt === 'wine') return (
              <g key={gi}>
                <path d={`M${gx-5},230 Q${gx-5},236 ${gx},238 Q${gx+5},236 ${gx+5},230 Z`} fill="rgba(180,220,255,0.13)" stroke="rgba(180,220,255,0.38)" strokeWidth="0.8" />
                <line x1={gx} y1="238" x2={gx} y2="241" stroke="rgba(180,220,255,0.4)" strokeWidth="1.2" />
                <ellipse cx={gx} cy="242" rx="4" ry="1.5" fill="rgba(180,220,255,0.18)" stroke="rgba(180,220,255,0.35)" strokeWidth="0.8" />
              </g>
            );
            return (
              <g key={gi}>
                <path d={`M${gx-5},236 L${gx-4.5},224 L${gx+4.5},224 L${gx+5},236 Z`} fill="rgba(180,220,255,0.11)" stroke="rgba(180,220,255,0.35)" strokeWidth="0.8" />
                <rect x={gx-4.5} y="222" width="9" height="3" rx="1" fill="rgba(180,220,255,0.2)" />
              </g>
            );
          })}

          {/* ── STOOLS + SEATED NPCs ──────────────────────────────────────────
              viewBox 0 0 1200 400. Counter y=240. Stool seat y=270.
              NPC head y=218, total height ~55 units (matches Naruto scale).
          ── */}
          {TESTIMONIALS.map((t, i) => {
            const cx   = npcSvgX(i);
            const seatY = 270;
            const isActive = activeIdx === i;
            return (
              <g key={i}>
                {/* Stool seat */}
                <ellipse cx={cx} cy={seatY}   rx="14" ry="5"  fill="#3a2a1a" stroke="#5a3a20" strokeWidth="1.2" />
                <ellipse cx={cx} cy={seatY-1} rx="12" ry="3.5" fill="#4a3020" />
                {/* Pole */}
                <line x1={cx} y1={seatY+5} x2={cx} y2={seatY+90}
                  stroke="#6a5a4a" strokeWidth="3.5" strokeLinecap="round" />
                {/* Foot ring */}
                <ellipse cx={cx} cy={seatY+60} rx="10" ry="3.5"
                  fill="none" stroke="#7a6a5a" strokeWidth="2" />
                {/* Legs */}
                <line x1={cx-3}  y1={seatY+86} x2={cx-16} y2={seatY+104} stroke="#5a4a3a" strokeWidth="2.5" strokeLinecap="round" />
                <line x1={cx+3}  y1={seatY+86} x2={cx+16} y2={seatY+104} stroke="#5a4a3a" strokeWidth="2.5" strokeLinecap="round" />
                <ellipse cx={cx-16} cy={seatY+106} rx="4" ry="2" fill="#3a2a1a" />
                <ellipse cx={cx+16} cy={seatY+106} rx="4" ry="2" fill="#3a2a1a" />

                {/* Seated NPC — ~55 units tall, matches Naruto scale */}
                <g style={{ opacity: isActive ? 1 : 0.38, transition: 'opacity 0.5s' }}>
                  {isActive && (
                    <circle cx={cx} cy={seatY-20} r="28"
                      fill="none" stroke={t.silhouetteColor} strokeWidth="1" opacity="0.2" />
                  )}
                  {/* Head */}
                  <circle cx={cx} cy={seatY-52} r="9" fill={t.silhouetteColor} />
                  {/* Torso */}
                  <path d={`M${cx-9},${seatY-43} Q${cx},${seatY-46} ${cx+9},${seatY-43} L${cx+7},${seatY-22} Q${cx},${seatY-19} ${cx-7},${seatY-22} Z`}
                    fill={t.silhouetteColor} />
                  {/* Right arm + drink */}
                  <path d={`M${cx+7},${seatY-34} Q${cx+17},${seatY-28} ${cx+20},${seatY-20}`}
                    stroke={t.silhouetteColor} strokeWidth="5" strokeLinecap="round" fill="none" />
                  <rect x={cx+17} y={seatY-25} width="6" height="9" rx="1.5" fill="rgba(255,200,80,0.9)" />
                  <rect x={cx+17} y={seatY-25} width="6" height="3.5" rx="1" fill="rgba(255,230,130,1)" />
                  {/* Left arm */}
                  <path d={`M${cx-7},${seatY-34} Q${cx-17},${seatY-28} ${cx-19},${seatY-20}`}
                    stroke={t.silhouetteColor} strokeWidth="4.5" strokeLinecap="round" fill="none" />
                  {/* Upper legs */}
                  <path d={`M${cx-5},${seatY-22} Q${cx-7},${seatY-8} ${cx-8},${seatY+2}`}
                    stroke={t.silhouetteColor} strokeWidth="5" strokeLinecap="round" fill="none" />
                  <path d={`M${cx+5},${seatY-22} Q${cx+7},${seatY-8} ${cx+8},${seatY+2}`}
                    stroke={t.silhouetteColor} strokeWidth="5" strokeLinecap="round" fill="none" />
                  {/* Lower legs dangling */}
                  <path d={`M${cx-8},${seatY+2} Q${cx-11},${seatY+16} ${cx-10},${seatY+28}`}
                    stroke={t.silhouetteColor} strokeWidth="4.5" strokeLinecap="round" fill="none" />
                  <path d={`M${cx+8},${seatY+2} Q${cx+11},${seatY+16} ${cx+10},${seatY+28}`}
                    stroke={t.silhouetteColor} strokeWidth="4.5" strokeLinecap="round" fill="none" />
                </g>
              </g>
            );
          })}

          {/* Ground line */}
          <rect x="0" y="397" width="1200" height="3" fill="rgba(200,160,60,0.06)" />
        </svg>
      </div>

      {/* ── SPEECH TOOLTIP — positioned via measured SVG coords ── */}
      {activeIdx >= 0 && (() => {
        const t = TESTIMONIALS[activeIdx];
        return (
          <div
            key={activeIdx}
            style={{
              position: 'absolute',
              left: tooltipX,
              top:  tooltipY - 8,   // 8px gap above NPC head
              transform: 'translate(-50%, -100%)',
              zIndex: 20,
              width: 'clamp(170px, 19vw, 230px)',
              pointerEvents: 'none',
              opacity: isVisible ? 1 : 0,
              translate: isVisible ? '0 0' : '0 10px',
              transition: 'opacity 0.4s ease, translate 0.4s ease',
            }}
          >
            <div style={{
              background: 'rgba(18,20,32,0.97)',
              border: `1px solid ${t.silhouetteColor}66`,
              borderRadius: 5,
              padding: '10px 13px',
              boxShadow: `0 0 20px ${t.silhouetteColor}1a, 0 6px 24px rgba(0,0,0,0.7)`,
            }}>
              <span style={{
                fontFamily: 'Georgia, serif', fontSize: '1.1rem',
                color: t.silhouetteColor, lineHeight: 0.5,
                display: 'block', marginBottom: 5, opacity: 0.75,
              }}>"</span>
              <p style={{
                color: 'var(--text-primary)', fontSize: '0.58rem',
                lineHeight: 1.55, fontStyle: 'italic', margin: 0,
              }}>
                {t.comment}
              </p>
              <div style={{ marginTop: 8, paddingTop: 6, borderTop: `1px solid ${t.silhouetteColor}33` }}>
                <span style={{
                  display: 'block', color: t.silhouetteColor,
                  fontFamily: 'var(--font-display)', fontSize: '0.68rem', letterSpacing: '0.06em',
                }}>{t.name}</span>
                <span style={{
                  fontSize: '0.52rem', color: 'var(--text-dim)',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>{t.role} · {t.company}</span>
              </div>
            </div>
            {/* Tail pointing down to NPC */}
            <div style={{
              position: 'absolute', bottom: -8, left: '50%',
              transform: 'translateX(-50%)',
              width: 0, height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: `9px solid ${t.silhouetteColor}66`,
            }} />
          </div>
        );
      })()}

    </section>
  );
};

export default RestoBarSection;
