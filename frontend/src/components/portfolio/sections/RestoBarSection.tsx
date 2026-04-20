import { TESTIMONIALS } from '@/__mock__/testimonials';
import { useEffect, useRef, useState } from 'react';

// ─── Bar Stool ────────────────────────────────────────────────────────────────
const BarStool = ({ x }: { x: number }) => (
  <g transform={`translate(${x}, 0)`}>
    {/* Padded seat */}
    <ellipse cx="0" cy="0" rx="18" ry="7" fill="#3a2a1a" stroke="#5a3a20" strokeWidth="1.5" />
    <ellipse cx="0" cy="-2" rx="16" ry="5" fill="#4a3020" />
    {/* Center pole */}
    <line x1="0" y1="7" x2="0" y2="55" stroke="#6a5a4a" strokeWidth="4" strokeLinecap="round" />
    {/* Foot ring */}
    <ellipse cx="0" cy="38" rx="13" ry="4" fill="none" stroke="#7a6a5a" strokeWidth="3" />
    {/* Angled legs */}
    <line x1="-4" y1="50" x2="-18" y2="72" stroke="#5a4a3a" strokeWidth="3" strokeLinecap="round" />
    <line x1="4"  y1="50" x2="18"  y2="72" stroke="#5a4a3a" strokeWidth="3" strokeLinecap="round" />
    <line x1="-2" y1="52" x2="-14" y2="72" stroke="#5a4a3a" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="2"  y1="52" x2="14"  y2="72" stroke="#5a4a3a" strokeWidth="2.5" strokeLinecap="round" />
    {/* Foot pads */}
    <ellipse cx="-18" cy="73" rx="4" ry="2" fill="#3a2a1a" />
    <ellipse cx="18"  cy="73" rx="4" ry="2" fill="#3a2a1a" />
  </g>
);

// ─── Seated NPC — same 40×64 canvas as Naruto ────────────────────────────────
const SeatedNPC = ({ color, active, flipped }: { color: string; active: boolean; flipped?: boolean }) => (
  <svg
    width="40" height="64" viewBox="0 0 40 64" fill="none"
    style={{
      opacity: active ? 0.9 : 0.5,
      transition: 'opacity 0.4s',
      transform: flipped ? 'scaleX(-1)' : undefined,
      overflow: 'visible',
    }}
  >
    {/* Head */}
    <circle cx="20" cy="10" r="7" fill={color} />
    {/* Torso leaning forward over counter */}
    <path d="M13 17 Q20 15 27 17 L25 36 Q20 34 15 36 Z" fill={color} />
    {/* Arm on counter holding drink */}
    <path d="M25 22 Q32 25 33 30" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none" />
    {/* Drink */}
    <rect x="31" y="27" width="5" height="8" rx="1.5" fill="rgba(255,200,80,0.8)" />
    <rect x="31" y="27" width="5" height="3" rx="1" fill="rgba(255,230,130,0.9)" />
    {/* Other arm resting */}
    <path d="M15 22 Q9 27 10 33" stroke={color} strokeWidth="3.5" strokeLinecap="round" fill="none" />
    {/* Bent legs dangling from stool */}
    <path d="M16 36 Q14 46 13 55" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M24 36 Q26 46 27 55" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none" />
    {/* Lower legs bent back */}
    <path d="M13 55 Q10 60 11 64" stroke={color} strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <path d="M27 55 Q30 60 29 64" stroke={color} strokeWidth="3.5" strokeLinecap="round" fill="none" />
    {active && <circle cx="20" cy="32" r="18" fill="rgba(232,125,43,0.05)" />}
  </svg>
);

// ─── Bottle ───────────────────────────────────────────────────────────────────
const Bottle = ({
  x, y, h = 28, w = 7, color, labelColor, cap,
}: {
  x: number; y: number; h?: number; w?: number; color: string; labelColor?: string; cap?: string;
}) => {
  const neck = Math.round(h * 0.28);
  const body = h - neck;
  return (
    <g>
      {/* Body */}
      <rect x={x - w / 2} y={y - body} width={w} height={body} rx="2" fill={color} />
      {/* Neck */}
      <rect x={x - w / 2 + 1.5} y={y - body - neck} width={w - 3} height={neck} rx="1.5" fill={color} />
      {/* Cap */}
      <rect x={x - w / 2 + 1} y={y - body - neck - 4} width={w - 2} height={5} rx="1" fill={cap ?? '#888'} />
      {/* Label */}
      {labelColor && (
        <rect x={x - w / 2 + 1} y={y - body + 4} width={w - 2} height={Math.round(body * 0.45)} rx="1" fill={labelColor} opacity="0.85" />
      )}
      {/* Shine */}
      <rect x={x - w / 2 + 1.5} y={y - body + 2} width={1.5} height={body - 6} rx="1" fill="rgba(255,255,255,0.12)" />
    </g>
  );
};

// ─── Counter Glass ────────────────────────────────────────────────────────────
const CounterGlass = ({ x, y, type }: { x: number; y: number; type: 'pint' | 'wine' | 'rocks' }) => {
  if (type === 'pint') return (
    <g>
      <path d={`M${x - 6},${y} L${x - 8},${y - 22} L${x + 8},${y - 22} L${x + 6},${y} Z`}
        fill="rgba(180,220,255,0.15)" stroke="rgba(180,220,255,0.4)" strokeWidth="0.8" />
      <rect x={x - 8} y={y - 24} width="16" height="3" rx="1" fill="rgba(180,220,255,0.25)" />
      {/* Beer fill */}
      <path d={`M${x - 5.5},${y - 2} L${x - 7},${y - 14} L${x + 7},${y - 14} L${x + 5.5},${y - 2} Z`}
        fill="rgba(200,160,40,0.5)" />
      {/* Foam */}
      <ellipse cx={x} cy={y - 14} rx="7" ry="3" fill="rgba(255,255,255,0.6)" />
    </g>
  );
  if (type === 'wine') return (
    <g>
      <path d={`M${x - 7},${y - 20} Q${x - 7},${y - 8} ${x},${y - 6} Q${x + 7},${y - 8} ${x + 7},${y - 20} Z`}
        fill="rgba(180,220,255,0.15)" stroke="rgba(180,220,255,0.4)" strokeWidth="0.8" />
      <line x1={x} y1={y - 6} x2={x} y2={y - 2} stroke="rgba(180,220,255,0.4)" strokeWidth="1.5" />
      <ellipse cx={x} cy={y - 1} rx="6" ry="2" fill="rgba(180,220,255,0.2)" stroke="rgba(180,220,255,0.4)" strokeWidth="0.8" />
      {/* Wine fill */}
      <path d={`M${x - 5},${y - 10} Q${x - 5},${y - 7} ${x},${y - 6} Q${x + 5},${y - 7} ${x + 5},${y - 10} Z`}
        fill="rgba(160,30,60,0.6)" />
    </g>
  );
  // rocks
  return (
    <g>
      <path d={`M${x - 8},${y} L${x - 7},${y - 16} L${x + 7},${y - 16} L${x + 8},${y} Z`}
        fill="rgba(180,220,255,0.12)" stroke="rgba(180,220,255,0.35)" strokeWidth="0.8" />
      <rect x={x - 7} y={y - 18} width="14" height="3" rx="1" fill="rgba(180,220,255,0.2)" />
      {/* Liquid */}
      <path d={`M${x - 6.5},${y - 2} L${x - 6},${y - 8} L${x + 6},${y - 8} L${x + 6.5},${y - 2} Z`}
        fill="rgba(200,140,40,0.45)" />
      {/* Ice */}
      <rect x={x - 4} y={y - 10} width="4" height="4" rx="1" fill="rgba(200,230,255,0.5)" transform={`rotate(-15,${x - 2},${y - 8})`} />
    </g>
  );
};

// ─── Hanging Glass (upside-down) ──────────────────────────────────────────────
const HangingGlass = ({ x, y }: { x: number; y: number }) => (
  <g>
    {/* Stem up */}
    <line x1={x} y1={y} x2={x} y2={y + 8} stroke="rgba(180,220,255,0.5)" strokeWidth="1.2" />
    {/* Bowl upside-down */}
    <path d={`M${x - 6},${y + 8} Q${x - 6},${y + 20} ${x},${y + 22} Q${x + 6},${y + 20} ${x + 6},${y + 8} Z`}
      fill="rgba(180,220,255,0.1)" stroke="rgba(180,220,255,0.45)" strokeWidth="0.8" />
    {/* Rim at bottom */}
    <ellipse cx={x} cy={y + 22} rx="6" ry="2" fill="none" stroke="rgba(180,220,255,0.4)" strokeWidth="0.8" />
  </g>
);

// ─── BackBar ──────────────────────────────────────────────────────────────────
const BackBar = () => {
  const upperBottles: Array<{ h: number; w: number; color: string; label: string; cap: string }> = [
    { h: 38, w: 8,  color: '#1a3a1a', label: '#2a6a2a', cap: '#c8a020' },
    { h: 44, w: 7,  color: '#3a1a0a', label: '#c84020', cap: '#888'    },
    { h: 32, w: 9,  color: '#0a1a3a', label: '#2040a0', cap: '#c0c0c0' },
    { h: 40, w: 7,  color: '#2a0a0a', label: '#a02020', cap: '#c8a020' },
    { h: 36, w: 8,  color: '#1a1a0a', label: '#a0a020', cap: '#888'    },
    { h: 42, w: 7,  color: '#0a2a1a', label: '#20a060', cap: '#c0c0c0' },
    { h: 34, w: 9,  color: '#2a1a2a', label: '#8020a0', cap: '#c8a020' },
    { h: 46, w: 7,  color: '#3a2a0a', label: '#c08020', cap: '#888'    },
    { h: 38, w: 8,  color: '#0a2a2a', label: '#20a0a0', cap: '#c0c0c0' },
    { h: 40, w: 7,  color: '#1a0a2a', label: '#6020c0', cap: '#c8a020' },
    { h: 44, w: 8,  color: '#2a1a0a', label: '#c06020', cap: '#888'    },
    { h: 36, w: 7,  color: '#0a1a1a', label: '#208080', cap: '#c0c0c0' },
    { h: 42, w: 9,  color: '#1a2a0a', label: '#60a020', cap: '#c8a020' },
    { h: 34, w: 7,  color: '#2a0a1a', label: '#c02060', cap: '#888'    },
    { h: 38, w: 8,  color: '#0a0a2a', label: '#2020c0', cap: '#c0c0c0' },
    { h: 44, w: 7,  color: '#1a2a1a', label: '#20a040', cap: '#c8a020' },
    { h: 32, w: 9,  color: '#2a1a1a', label: '#a04040', cap: '#888'    },
    { h: 40, w: 7,  color: '#0a2a0a', label: '#40a020', cap: '#c0c0c0' },
  ];

  const lowerBottles: Array<{ h: number; w: number; color: string; label: string; cap: string }> = [
    { h: 30, w: 9,  color: '#2a1a0a', label: '#c84020', cap: '#c8a020' },
    { h: 34, w: 8,  color: '#0a2a1a', label: '#20a060', cap: '#888'    },
    { h: 28, w: 10, color: '#1a0a2a', label: '#8020c0', cap: '#c0c0c0' },
    { h: 36, w: 8,  color: '#2a2a0a', label: '#c0a020', cap: '#c8a020' },
    { h: 30, w: 9,  color: '#0a1a2a', label: '#2060c0', cap: '#888'    },
    { h: 32, w: 8,  color: '#1a2a0a', label: '#60c020', cap: '#c0c0c0' },
    { h: 28, w: 10, color: '#2a0a0a', label: '#c02020', cap: '#c8a020' },
    { h: 34, w: 8,  color: '#0a2a2a', label: '#20c0a0', cap: '#888'    },
    { h: 30, w: 9,  color: '#1a1a2a', label: '#6060c0', cap: '#c0c0c0' },
    { h: 36, w: 8,  color: '#2a0a1a', label: '#c02080', cap: '#c8a020' },
    { h: 28, w: 10, color: '#0a0a1a', label: '#2020a0', cap: '#888'    },
    { h: 32, w: 8,  color: '#1a2a2a', label: '#20a0a0', cap: '#c0c0c0' },
    { h: 30, w: 9,  color: '#2a1a2a', label: '#a020a0', cap: '#c8a020' },
    { h: 34, w: 8,  color: '#0a1a0a', label: '#208020', cap: '#888'    },
    { h: 28, w: 10, color: '#1a0a0a', label: '#a02020', cap: '#c0c0c0' },
    { h: 32, w: 8,  color: '#2a2a1a', label: '#a0a020', cap: '#c8a020' },
  ];

  const W = 900;
  const upperShelfY = 220;
  const lowerShelfY = 310;
  const cabinetTop  = 318;
  const cabinetBot  = 420;
  const counterY    = 420;

  // Spread bottles evenly
  const upperSpacing = (W - 80) / (upperBottles.length - 1);
  const lowerSpacing = (W - 100) / (lowerBottles.length - 1);

  // Hanging glasses on rod
  const glassRodY = 100;
  const glassCount = 14;
  const glassSpacing = (W - 120) / (glassCount - 1);

  return (
    <svg viewBox={`0 0 ${W} ${counterY + 10}`} width="100%" height="100%" preserveAspectRatio="xMidYMax meet">
      {/* ── Back wall / mirror panel ── */}
      <defs>
        <linearGradient id="mirrorGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#0a0c14" />
          <stop offset="30%"  stopColor="#12151f" />
          <stop offset="50%"  stopColor="#1a1e2a" />
          <stop offset="70%"  stopColor="#12151f" />
          <stop offset="100%" stopColor="#0a0c14" />
        </linearGradient>
        <linearGradient id="mirrorShine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="rgba(255,255,255,0)"   />
          <stop offset="40%"  stopColor="rgba(255,255,255,0.04)" />
          <stop offset="55%"  stopColor="rgba(255,255,255,0.08)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)"   />
        </linearGradient>
        <linearGradient id="woodGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#2a1f0e" />
          <stop offset="50%"  stopColor="#1e1508" />
          <stop offset="100%" stopColor="#150f05" />
        </linearGradient>
        <linearGradient id="counterGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#3a2a12" />
          <stop offset="100%" stopColor="#1e1508" />
        </linearGradient>
      </defs>

      {/* Wall */}
      <rect x="0" y="0" width={W} height={counterY} fill="url(#mirrorGrad)" />
      {/* Mirror frame */}
      <rect x="20" y="10" width={W - 40} height={cabinetTop - 20} fill="url(#mirrorShine)" stroke="rgba(200,160,60,0.3)" strokeWidth="2" rx="2" />
      {/* Mirror inner bevel */}
      <rect x="26" y="16" width={W - 52} height={cabinetTop - 32} fill="none" stroke="rgba(200,160,60,0.15)" strokeWidth="1" rx="1" />
      {/* Subtle reflection lines */}
      {[0.2, 0.45, 0.72].map((t, i) => (
        <line key={i} x1={W * t} y1="10" x2={W * t + 30} y2={cabinetTop - 20}
          stroke="rgba(255,255,255,0.04)" strokeWidth="18" />
      ))}

      {/* ── Hanging glass rack rod ── */}
      <rect x="40" y={glassRodY - 4} width={W - 80} height="6" rx="3" fill="#4a3a2a" stroke="#6a5a3a" strokeWidth="1" />
      {/* Rod brackets */}
      {[80, W / 2, W - 80].map((bx, i) => (
        <g key={i}>
          <rect x={bx - 4} y={glassRodY - 14} width="8" height="14" rx="2" fill="#3a2a1a" stroke="#5a4a2a" strokeWidth="1" />
          <circle cx={bx} cy={glassRodY - 16} r="3" fill="#6a5a3a" />
        </g>
      ))}
      {/* Hanging glasses */}
      {Array.from({ length: glassCount }, (_, i) => (
        <HangingGlass key={i} x={60 + i * glassSpacing} y={glassRodY + 2} />
      ))}

      {/* ── Upper shelf ── */}
      <rect x="30" y={upperShelfY} width={W - 60} height="10" rx="2" fill="url(#woodGrad)" stroke="rgba(200,160,60,0.25)" strokeWidth="1" />
      {/* Shelf lip */}
      <rect x="28" y={upperShelfY + 8} width={W - 56} height="4" rx="1" fill="#1a1208" />
      {/* Upper bottles */}
      {upperBottles.map((b, i) => (
        <Bottle key={i}
          x={40 + i * upperSpacing}
          y={upperShelfY}
          h={b.h} w={b.w} color={b.color} labelColor={b.label} cap={b.cap}
        />
      ))}

      {/* ── Lower shelf ── */}
      <rect x="30" y={lowerShelfY} width={W - 60} height="10" rx="2" fill="url(#woodGrad)" stroke="rgba(200,160,60,0.25)" strokeWidth="1" />
      <rect x="28" y={lowerShelfY + 8} width={W - 56} height="4" rx="1" fill="#1a1208" />
      {/* Lower bottles */}
      {lowerBottles.map((b, i) => (
        <Bottle key={i}
          x={50 + i * lowerSpacing}
          y={lowerShelfY}
          h={b.h} w={b.w} color={b.color} labelColor={b.label} cap={b.cap}
        />
      ))}

      {/* ── Cabinet body ── */}
      <rect x="20" y={cabinetTop} width={W - 40} height={cabinetBot - cabinetTop} rx="2" fill="url(#woodGrad)" stroke="rgba(200,160,60,0.2)" strokeWidth="1.5" />
      {/* Cabinet doors — 3 panels */}
      {[0, 1, 2].map(d => {
        const dw = (W - 80) / 3;
        const dx = 30 + d * (dw + 5);
        return (
          <g key={d}>
            <rect x={dx} y={cabinetTop + 6} width={dw} height={cabinetBot - cabinetTop - 12} rx="2"
              fill="#1a1208" stroke="rgba(200,160,60,0.2)" strokeWidth="1" />
            {/* Inset panel */}
            <rect x={dx + 8} y={cabinetTop + 14} width={dw - 16} height={cabinetBot - cabinetTop - 28} rx="1"
              fill="none" stroke="rgba(200,160,60,0.15)" strokeWidth="1" />
            {/* Knob */}
            <circle cx={dx + dw - 14} cy={(cabinetTop + cabinetBot) / 2} r="4" fill="#6a5a3a" stroke="rgba(200,160,60,0.5)" strokeWidth="1" />
            <circle cx={dx + dw - 14} cy={(cabinetTop + cabinetBot) / 2} r="2" fill="#8a7a5a" />
          </g>
        );
      })}

      {/* ── Counter top ── */}
      <rect x="0" y={counterY - 12} width={W} height="22" rx="2" fill="url(#counterGrad)" stroke="rgba(200,160,60,0.3)" strokeWidth="1.5" />
      {/* Counter edge highlight */}
      <rect x="0" y={counterY - 12} width={W} height="3" rx="1" fill="rgba(200,160,60,0.15)" />
      {/* Counter glasses */}
      <CounterGlass x={120} y={counterY - 12} type="pint"  />
      <CounterGlass x={240} y={counterY - 12} type="rocks" />
      <CounterGlass x={380} y={counterY - 12} type="wine"  />
      <CounterGlass x={520} y={counterY - 12} type="pint"  />
      <CounterGlass x={650} y={counterY - 12} type="rocks" />
      <CounterGlass x={780} y={counterY - 12} type="wine"  />

      {/* ── Pendant lights ── */}
      {[150, 450, 750].map((lx, i) => (
        <g key={i}>
          {/* Cord */}
          <line x1={lx} y1="0" x2={lx} y2="55" stroke="rgba(80,70,50,0.6)" strokeWidth="1.5" />
          {/* Cone shade */}
          <path d={`M${lx - 18},55 L${lx - 30},85 L${lx + 30},85 L${lx + 18},55 Z`}
            fill="#1a1208" stroke="rgba(200,160,60,0.3)" strokeWidth="1" />
          {/* Inner cone glow */}
          <path d={`M${lx - 16},57 L${lx - 28},83 L${lx + 28},83 L${lx + 16},57 Z`}
            fill="rgba(255,200,80,0.08)" />
          {/* Bulb */}
          <circle cx={lx} cy="57" r="5" fill="rgba(255,220,100,0.6)" />
          {/* Light cone hitting counter */}
          <path d={`M${lx - 30},85 L${lx - 90},${counterY - 12} L${lx + 90},${counterY - 12} L${lx + 30},85 Z`}
            fill="rgba(255,200,80,0.025)" />
        </g>
      ))}
    </svg>
  );
};

// ─── RestoBarSection ──────────────────────────────────────────────────────────
const RestoBarSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  // ── Speaking state ──
  // activeIdx  = which NPC is currently speaking (-1 = none)
  // phase      = 'in' | 'hold' | 'out'
  const [activeIdx, setActiveIdx] = useState(-1);
  const [phase, setPhase]         = useState<'in' | 'hold' | 'out'>('in');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const npcCount = TESTIMONIALS.length;

  // ms each NPC speaks — proportional to comment length, clamped 4–8s
  const speakDuration = (idx: number) =>
    Math.min(8000, Math.max(4000, TESTIMONIALS[idx].comment.length * 28));

  useEffect(() => {
    let current = 0;

    const speak = (idx: number) => {
      setActiveIdx(idx);
      setPhase('in');

      // after fade-in (400ms) → hold
      timerRef.current = setTimeout(() => {
        setPhase('hold');

        // hold for speak duration → fade out
        timerRef.current = setTimeout(() => {
          setPhase('out');

          // after fade-out (400ms) → next NPC
          timerRef.current = setTimeout(() => {
            current = (idx + 1) % npcCount;
            speak(current);
          }, 400);
        }, speakDuration(idx));
      }, 400);
    };

    // small initial delay so the scene renders first
    timerRef.current = setTimeout(() => speak(0), 800);

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="restobar"
      className="section-room"
      ref={sectionRef}
      style={{
        background: 'linear-gradient(160deg, #08090d 0%, #100e18 40%, #0a0d0a 100%)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
      }}
    >
      {/* ── Parallax sky ── */}
      <div className="parallax-layer layer-sky" data-parallax="0.12"
        style={{ background: 'radial-gradient(ellipse at 50% 80%, #0e1215, #08090d 60%)' }} />

      {/* ── Far background — brick wall ── */}
      <div className="parallax-layer layer-far" data-parallax="0.22"
        style={{ bottom: 0, top: 0, opacity: 0.45 }}>
        <svg viewBox="0 0 1200 700" width="100%" height="100%" preserveAspectRatio="xMidYMax slice">
          <rect width="1200" height="700" fill="#0e0c12" />
          {Array.from({ length: 15 }, (_, row) =>
            Array.from({ length: 20 }, (_, col) => (
              <rect key={`${row}-${col}`} x={col * 62 + (row % 2) * 31} y={row * 28}
                width="58" height="24" fill="none"
                stroke="rgba(40,35,55,0.6)" strokeWidth="1" />
            ))
          )}
          <rect x="0" y="500" width="1200" height="200" fill="#120f1a" />
          <rect x="0" y="498" width="1200" height="6" fill="#24203a" />
        </svg>
      </div>

      {/* ── Ambient glows ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 6, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '15%', left: '8%', width: 320, height: 320,
          background: 'radial-gradient(circle, rgba(180,30,30,0.05), transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '20%', right: '10%', width: 280, height: 280,
          background: 'radial-gradient(circle, rgba(50,30,120,0.07), transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '10%', left: '40%', width: 400, height: 300,
          background: 'radial-gradient(circle, rgba(200,160,40,0.04), transparent 70%)', borderRadius: '50%' }} />
      </div>

      <div className="fog-vignette" style={{ zIndex: 8 }} />

      {/* ── Section label ── */}
      <div style={{ position: 'absolute', top: '6%', left: '50%', transform: 'translateX(-50%)',
        zIndex: 15, textAlign: 'center', pointerEvents: 'none' }}>
        <span className="section-eyebrow" style={{ fontSize: '0.45rem', letterSpacing: '0.3rem' }}>THE RESTO-BAR</span>
        <h2 className="section-title" style={{ marginBottom: 0, fontSize: 'clamp(1.2rem, 4vw, 3rem)' }}>
          WHAT THEY <span style={{ color: 'var(--naruto-orange)' }}>SAY</span>
        </h2>
      </div>

      {/* ── UNIFIED BAR SCENE ── */}
      <div style={{
        position: 'absolute',
        left: 0, right: 0,
        bottom: 0,
        height: '78%',
        zIndex: 10,
        pointerEvents: 'none',
      }}>
        <svg viewBox="0 0 1200 600" width="100%" height="100%" preserveAspectRatio="xMidYMax meet">
          <defs>
            <linearGradient id="bbMirror" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#0a0c14" />
              <stop offset="50%"  stopColor="#1a1e2a" />
              <stop offset="100%" stopColor="#0a0c14" />
            </linearGradient>
            <linearGradient id="bbWood" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stopColor="#2a1f0e" />
              <stop offset="100%" stopColor="#150f05" />
            </linearGradient>
            <linearGradient id="bbCounter" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stopColor="#4a3418" />
              <stop offset="100%" stopColor="#1e1508" />
            </linearGradient>
          </defs>

          {/* BACK WALL */}
          <rect x="0" y="0" width="1200" height="340" fill="url(#bbMirror)" />
          <rect x="15" y="8" width="1170" height="310" fill="none" stroke="rgba(200,160,60,0.2)" strokeWidth="1.5" rx="2" />

          {/* HANGING GLASS ROD */}
          <rect x="50" y="28" width="1100" height="5" rx="2.5" fill="#4a3a2a" stroke="#6a5a3a" strokeWidth="1" />
          {[120, 600, 1080].map((bx, i) => (
            <g key={i}>
              <rect x={bx - 4} y="16" width="8" height="14" rx="2" fill="#3a2a1a" />
              <circle cx={bx} cy="14" r="3" fill="#6a5a3a" />
            </g>
          ))}
          {Array.from({ length: 14 }, (_, i) => {
            const gx = 80 + i * 80;
            return (
              <g key={i}>
                <line x1={gx} y1="33" x2={gx} y2="42" stroke="rgba(180,220,255,0.5)" strokeWidth="1.2" />
                <path d={`M${gx-6},42 Q${gx-6},54 ${gx},56 Q${gx+6},54 ${gx+6},42 Z`}
                  fill="rgba(180,220,255,0.1)" stroke="rgba(180,220,255,0.4)" strokeWidth="0.8" />
                <ellipse cx={gx} cy="56" rx="6" ry="2" fill="none" stroke="rgba(180,220,255,0.35)" strokeWidth="0.8" />
              </g>
            );
          })}

          {/* UPPER SHELF */}
          <rect x="30" y="90" width="1140" height="9" rx="2" fill="url(#bbWood)" stroke="rgba(200,160,60,0.25)" strokeWidth="1" />
          {[
            {h:38,w:8,c:'#1a3a1a',l:'#2a6a2a',k:'#c8a020'},{h:44,w:7,c:'#3a1a0a',l:'#c84020',k:'#888'},
            {h:32,w:9,c:'#0a1a3a',l:'#2040a0',k:'#c0c0c0'},{h:40,w:7,c:'#2a0a0a',l:'#a02020',k:'#c8a020'},
            {h:36,w:8,c:'#1a1a0a',l:'#a0a020',k:'#888'},{h:42,w:7,c:'#0a2a1a',l:'#20a060',k:'#c0c0c0'},
            {h:34,w:9,c:'#2a1a2a',l:'#8020a0',k:'#c8a020'},{h:46,w:7,c:'#3a2a0a',l:'#c08020',k:'#888'},
            {h:38,w:8,c:'#0a2a2a',l:'#20a0a0',k:'#c0c0c0'},{h:40,w:7,c:'#1a0a2a',l:'#6020c0',k:'#c8a020'},
            {h:44,w:8,c:'#2a1a0a',l:'#c06020',k:'#888'},{h:36,w:7,c:'#0a1a1a',l:'#208080',k:'#c0c0c0'},
            {h:42,w:9,c:'#1a2a0a',l:'#60a020',k:'#c8a020'},{h:34,w:7,c:'#2a0a1a',l:'#c02060',k:'#888'},
            {h:38,w:8,c:'#0a0a2a',l:'#2020c0',k:'#c0c0c0'},{h:44,w:7,c:'#1a2a1a',l:'#20a040',k:'#c8a020'},
            {h:32,w:9,c:'#2a1a1a',l:'#a04040',k:'#888'},{h:40,w:7,c:'#0a2a0a',l:'#40a020',k:'#c0c0c0'},
          ].map((b, i, arr) => {
            const bx = 60 + i * ((1080) / (arr.length - 1));
            const neck = Math.round(b.h * 0.28); const body = b.h - neck;
            return (
              <g key={i}>
                <rect x={bx-b.w/2} y={90-body} width={b.w} height={body} rx="2" fill={b.c} />
                <rect x={bx-b.w/2+1.5} y={90-body-neck} width={b.w-3} height={neck} rx="1.5" fill={b.c} />
                <rect x={bx-b.w/2+1} y={90-body-neck-4} width={b.w-2} height={5} rx="1" fill={b.k} />
                <rect x={bx-b.w/2+1} y={90-body+4} width={b.w-2} height={Math.round(body*0.45)} rx="1" fill={b.l} opacity="0.85" />
                <rect x={bx-b.w/2+1.5} y={90-body+2} width={1.5} height={body-6} rx="1" fill="rgba(255,255,255,0.12)" />
              </g>
            );
          })}

          {/* LOWER SHELF */}
          <rect x="30" y="175" width="1140" height="9" rx="2" fill="url(#bbWood)" stroke="rgba(200,160,60,0.25)" strokeWidth="1" />
          {[
            {h:30,w:9,c:'#2a1a0a',l:'#c84020',k:'#c8a020'},{h:34,w:8,c:'#0a2a1a',l:'#20a060',k:'#888'},
            {h:28,w:10,c:'#1a0a2a',l:'#8020c0',k:'#c0c0c0'},{h:36,w:8,c:'#2a2a0a',l:'#c0a020',k:'#c8a020'},
            {h:30,w:9,c:'#0a1a2a',l:'#2060c0',k:'#888'},{h:32,w:8,c:'#1a2a0a',l:'#60c020',k:'#c0c0c0'},
            {h:28,w:10,c:'#2a0a0a',l:'#c02020',k:'#c8a020'},{h:34,w:8,c:'#0a2a2a',l:'#20c0a0',k:'#888'},
            {h:30,w:9,c:'#1a1a2a',l:'#6060c0',k:'#c0c0c0'},{h:36,w:8,c:'#2a0a1a',l:'#c02080',k:'#c8a020'},
            {h:28,w:10,c:'#0a0a1a',l:'#2020a0',k:'#888'},{h:32,w:8,c:'#1a2a2a',l:'#20a0a0',k:'#c0c0c0'},
            {h:30,w:9,c:'#2a1a2a',l:'#a020a0',k:'#c8a020'},{h:34,w:8,c:'#0a1a0a',l:'#208020',k:'#888'},
            {h:28,w:10,c:'#1a0a0a',l:'#a02020',k:'#c0c0c0'},{h:32,w:8,c:'#2a2a1a',l:'#a0a020',k:'#c8a020'},
          ].map((b, i, arr) => {
            const bx = 60 + i * ((1080) / (arr.length - 1));
            const neck = Math.round(b.h * 0.28); const body = b.h - neck;
            return (
              <g key={i}>
                <rect x={bx-b.w/2} y={175-body} width={b.w} height={body} rx="2" fill={b.c} />
                <rect x={bx-b.w/2+1.5} y={175-body-neck} width={b.w-3} height={neck} rx="1.5" fill={b.c} />
                <rect x={bx-b.w/2+1} y={175-body-neck-4} width={b.w-2} height={5} rx="1" fill={b.k} />
                <rect x={bx-b.w/2+1} y={175-body+4} width={b.w-2} height={Math.round(body*0.45)} rx="1" fill={b.l} opacity="0.85" />
              </g>
            );
          })}

          {/* CABINET */}
          <rect x="20" y="184" width="1160" height="100" rx="2" fill="url(#bbWood)" stroke="rgba(200,160,60,0.2)" strokeWidth="1.5" />
          {[0,1,2].map(d => {
            const dw = (1160 - 30) / 3; const dx = 25 + d * (dw + 10);
            return (
              <g key={d}>
                <rect x={dx} y="190" width={dw} height="88" rx="2" fill="#1a1208" stroke="rgba(200,160,60,0.18)" strokeWidth="1" />
                <rect x={dx+8} y="198" width={dw-16} height="72" rx="1" fill="none" stroke="rgba(200,160,60,0.12)" strokeWidth="1" />
                <circle cx={dx+dw-16} cy="234" r="4" fill="#6a5a3a" stroke="rgba(200,160,60,0.5)" strokeWidth="1" />
              </g>
            );
          })}

          {/* PENDANT LIGHTS */}
          {[200, 600, 1000].map((lx, i) => (
            <g key={i}>
              <line x1={lx} y1="0" x2={lx} y2="50" stroke="rgba(80,70,50,0.6)" strokeWidth="1.5" />
              <path d={`M${lx-18},50 L${lx-30},80 L${lx+30},80 L${lx+18},50 Z`} fill="#1a1208" stroke="rgba(200,160,60,0.3)" strokeWidth="1" />
              <circle cx={lx} cy="52" r="5" fill="rgba(255,220,100,0.6)" />
              <path d={`M${lx-30},80 L${lx-80},284 L${lx+80},284 L${lx+30},80 Z`} fill="rgba(255,200,80,0.018)" />
            </g>
          ))}

          {/* COUNTER TOP — y=284 */}
          <rect x="0" y="284" width="1200" height="56" fill="url(#bbCounter)" />
          <rect x="0" y="282" width="1200" height="6" rx="1" fill="#5a4020" stroke="rgba(200,160,60,0.35)" strokeWidth="1" />
          <rect x="0" y="282" width="1200" height="2" fill="rgba(200,160,60,0.2)" />
          {/* Glasses on counter */}
          {[150,300,500,700,900,1050].map((gx, gi) => {
            const types = ['pint','rocks','wine','pint','rocks','wine'] as const;
            const gt = types[gi];
            if (gt === 'pint') return (
              <g key={gi}>
                <path d={`M${gx-6},282 L${gx-8},260 L${gx+8},260 L${gx+6},282 Z`} fill="rgba(180,220,255,0.13)" stroke="rgba(180,220,255,0.38)" strokeWidth="0.8" />
                <ellipse cx={gx} cy="260" rx="8" ry="2.5" fill="rgba(255,255,255,0.55)" />
                <path d={`M${gx-5},280 L${gx-7},268 L${gx+7},268 L${gx+5},280 Z`} fill="rgba(200,160,40,0.45)" />
              </g>
            );
            if (gt === 'wine') return (
              <g key={gi}>
                <path d={`M${gx-7},272 Q${gx-7},282 ${gx},284 Q${gx+7},282 ${gx+7},272 Z`} fill="rgba(180,220,255,0.13)" stroke="rgba(180,220,255,0.38)" strokeWidth="0.8" />
                <line x1={gx} y1="284" x2={gx} y2="288" stroke="rgba(180,220,255,0.4)" strokeWidth="1.5" />
                <ellipse cx={gx} cy="289" rx="6" ry="2" fill="rgba(180,220,255,0.18)" stroke="rgba(180,220,255,0.35)" strokeWidth="0.8" />
              </g>
            );
            return (
              <g key={gi}>
                <path d={`M${gx-8},282 L${gx-7},266 L${gx+7},266 L${gx+8},282 Z`} fill="rgba(180,220,255,0.11)" stroke="rgba(180,220,255,0.35)" strokeWidth="0.8" />
                <rect x={gx-7} y="264" width="14" height="3" rx="1" fill="rgba(180,220,255,0.2)" />
              </g>
            );
          })}

          {/* STOOLS + SEATED NPCs — stool seat at y=340, NPC sits on it */}
          {TESTIMONIALS.map((t, i) => {
            const cx = 100 + i * ((1000) / (npcCount - 1));
            const seatY = 340;
            return (
              <g key={i} data-npc-index={i}>
                {/* Stool */}
                <ellipse cx={cx} cy={seatY} rx="18" ry="6" fill="#3a2a1a" stroke="#5a3a20" strokeWidth="1.5" />
                <ellipse cx={cx} cy={seatY-2} rx="16" ry="5" fill="#4a3020" />
                <line x1={cx} y1={seatY+6} x2={cx} y2={seatY+54} stroke="#6a5a4a" strokeWidth="4" strokeLinecap="round" />
                <ellipse cx={cx} cy={seatY+38} rx="13" ry="4" fill="none" stroke="#7a6a5a" strokeWidth="2.5" />
                <line x1={cx-4} y1={seatY+50} x2={cx-18} y2={seatY+72} stroke="#5a4a3a" strokeWidth="3" strokeLinecap="round" />
                <line x1={cx+4} y1={seatY+50} x2={cx+18} y2={seatY+72} stroke="#5a4a3a" strokeWidth="3" strokeLinecap="round" />
                <ellipse cx={cx-18} cy={seatY+74} rx="4" ry="2" fill="#3a2a1a" />
                <ellipse cx={cx+18} cy={seatY+74} rx="4" ry="2" fill="#3a2a1a" />
                {/* NPC — seated, torso above seatY, legs dangle below */}
                <g style={{ opacity: activeIdx === i ? 1 : 0.4, transition: 'opacity 0.4s' }}>
                  {/* Head */}
                  <circle cx={cx} cy={seatY-62} r="10" fill={t.silhouetteColor} />
                  {/* Torso leaning forward onto counter */}
                  <path d={`M${cx-10},${seatY-50} Q${cx},${seatY-53} ${cx+10},${seatY-50} L${cx+8},${seatY-22} Q${cx},${seatY-19} ${cx-8},${seatY-22} Z`} fill={t.silhouetteColor} />
                  {/* Arm on counter with drink */}
                  <path d={`M${cx+8},${seatY-38} Q${cx+22},${seatY-32} ${cx+26},${seatY-24}`} stroke={t.silhouetteColor} strokeWidth="6" strokeLinecap="round" fill="none" />
                  <rect x={cx+23} y={seatY-30} width="7" height="11" rx="2" fill="rgba(255,200,80,0.85)" />
                  {/* Other arm */}
                  <path d={`M${cx-8},${seatY-38} Q${cx-18},${seatY-30} ${cx-16},${seatY-20}`} stroke={t.silhouetteColor} strokeWidth="5" strokeLinecap="round" fill="none" />
                  {/* Legs dangling from stool seat */}
                  <path d={`M${cx-5},${seatY-22} Q${cx-8},${seatY-4} ${cx-10},${seatY+14}`} stroke={t.silhouetteColor} strokeWidth="6" strokeLinecap="round" fill="none" />
                  <path d={`M${cx+5},${seatY-22} Q${cx+8},${seatY-4} ${cx+10},${seatY+14}`} stroke={t.silhouetteColor} strokeWidth="6" strokeLinecap="round" fill="none" />
                  {/* Lower legs bent */}
                  <path d={`M${cx-10},${seatY+14} Q${cx-14},${seatY+26} ${cx-12},${seatY+36}`} stroke={t.silhouetteColor} strokeWidth="5" strokeLinecap="round" fill="none" />
                  <path d={`M${cx+10},${seatY+14} Q${cx+14},${seatY+26} ${cx+12},${seatY+36}`} stroke={t.silhouetteColor} strokeWidth="5" strokeLinecap="round" fill="none" />
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* ── Speaking tooltip — one at a time, above the active NPC ── */}
      {activeIdx >= 0 && (() => {
        const t = TESTIMONIALS[activeIdx];
        // NPC x positions mirror the SVG: cx = 100 + i * (1000 / (npcCount-1))
        // Map SVG x (0–1200) → screen % (0–100)
        const svgX = 100 + activeIdx * (1000 / (npcCount - 1));
        const pct  = (svgX / 1200) * 100;
        const isVisible = phase === 'in' || phase === 'hold';
        return (
          <div
            key={activeIdx}
            style={{
              position: 'absolute',
              bottom: '44%',
              left: `${pct}%`,
              transform: 'translateX(-50%)',
              zIndex: 20,
              width: 'clamp(160px, 18vw, 220px)',
              pointerEvents: 'none',
              opacity: isVisible ? 1 : 0,
              translate: isVisible ? '0 0' : '0 12px',
              transition: 'opacity 0.4s ease, translate 0.4s ease',
            }}
          >
            {/* Speech bubble tail */}
            <div style={{
              position: 'absolute',
              bottom: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0, height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '9px solid rgba(26,30,42,0.97)',
            }} />
            <div style={{
              background: 'rgba(26,30,42,0.97)',
              border: `1px solid ${t.silhouetteColor}55`,
              borderRadius: 4,
              padding: '10px 12px',
              boxShadow: `0 0 18px ${t.silhouetteColor}22, 0 4px 20px rgba(0,0,0,0.6)`,
            }}>
              <span style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.1rem',
                color: t.silhouetteColor,
                lineHeight: 0.5,
                display: 'block',
                marginBottom: 5,
                opacity: 0.7,
              }}>"</span>
              <p style={{
                color: 'var(--text-primary)',
                fontSize: '0.58rem',
                lineHeight: 1.55,
                fontStyle: 'italic',
                margin: 0,
              }}>
                {t.comment}
              </p>
              <div style={{
                marginTop: 8,
                paddingTop: 6,
                borderTop: `1px solid ${t.silhouetteColor}33`,
              }}>
                <span style={{
                  display: 'block',
                  color: t.silhouetteColor,
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.06em',
                }}>{t.name}</span>
                <span style={{
                  fontSize: '0.52rem',
                  color: 'var(--text-dim)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>{t.role} · {t.company}</span>
              </div>
            </div>
          </div>
        );
      })()}


    </section>
  );
};

export default RestoBarSection;
