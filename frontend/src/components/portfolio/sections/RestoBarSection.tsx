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

// ─── Seated NPC ───────────────────────────────────────────────────────────────
const SeatedNPC = ({ color, active, flipped }: { color: string; active: boolean; flipped?: boolean }) => (
  <svg
    width="70" height="110" viewBox="0 0 70 110" fill="none"
    style={{
      opacity: active ? 0.9 : 0.5,
      transition: 'opacity 0.4s',
      transform: flipped ? 'scaleX(-1)' : undefined,
    }}
  >
    {/* Head */}
    <circle cx="35" cy="14" r="11" fill={color} />
    {/* Torso leaning forward */}
    <path d="M22 25 Q35 22 48 25 L44 62 Q35 58 26 62 Z" fill={color} />
    {/* Arm on counter (holding drink) */}
    <path d="M44 32 Q56 36 58 44" stroke={color} strokeWidth="7" strokeLinecap="round" fill="none" />
    {/* Drink in hand */}
    <rect x="55" y="38" width="8" height="14" rx="2" fill="rgba(255,200,80,0.7)" stroke={color} strokeWidth="1" />
    <rect x="55" y="38" width="8" height="5" rx="1" fill="rgba(255,220,120,0.9)" />
    {/* Other arm resting */}
    <path d="M26 32 Q18 40 20 50" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none" />
    {/* Bent legs dangling */}
    <path d="M28 62 Q24 78 22 92" stroke={color} strokeWidth="7" strokeLinecap="round" fill="none" />
    <path d="M42 62 Q46 78 48 92" stroke={color} strokeWidth="7" strokeLinecap="round" fill="none" />
    {/* Lower legs bent */}
    <path d="M22 92 Q18 100 20 108" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none" />
    <path d="M48 92 Q52 100 50 108" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none" />
    {/* Active glow */}
    {active && <circle cx="35" cy="50" r="32" fill="rgba(232,125,43,0.05)" />}
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

// ─── Bar Door ─────────────────────────────────────────────────────────────────
const BarDoor = ({ side, open }: { side: 'left' | 'right'; open: boolean }) => {
  const isLeft = side === 'left';
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        [isLeft ? 'left' : 'right']: 0,
        width: 'clamp(60px, 8vw, 110px)',
        zIndex: 20,
        perspective: '800px',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          transformOrigin: isLeft ? 'left center' : 'right center',
          transform: open
            ? `rotateY(${isLeft ? '-85deg' : '85deg'})`
            : 'rotateY(0deg)',
          transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
          transformStyle: 'preserve-3d',
          position: 'relative',
        }}
      >
        <svg
          width="100%" height="100%"
          viewBox="0 0 100 600"
          preserveAspectRatio="none"
          style={{ display: 'block' }}
        >
          <defs>
            <linearGradient id={`doorWood${side}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor={isLeft ? '#2a1f0e' : '#1a1208'} />
              <stop offset="20%"  stopColor={isLeft ? '#3a2a12' : '#2a1f0e'} />
              <stop offset="45%"  stopColor={isLeft ? '#2e2210' : '#241a0c'} />
              <stop offset="70%"  stopColor={isLeft ? '#3a2a12' : '#2a1f0e'} />
              <stop offset="100%" stopColor={isLeft ? '#1a1208' : '#2a1f0e'} />
            </linearGradient>
          </defs>

          {/* Door body */}
          <rect x="0" y="0" width="100" height="600" fill={`url(#doorWood${side})`} />

          {/* Wood grain lines */}
          {[8, 18, 28, 40, 52, 62, 74, 84].map((gx, i) => (
            <line key={i} x1={gx} y1="0" x2={gx + (i % 2 === 0 ? 3 : -2)} y2="600"
              stroke="rgba(0,0,0,0.18)" strokeWidth={i % 3 === 0 ? 1.5 : 0.8} />
          ))}

          {/* Outer border */}
          <rect x="4" y="4" width="92" height="592" fill="none" stroke="rgba(200,160,60,0.25)" strokeWidth="2" rx="1" />

          {/* Upper inset panel */}
          <rect x="12" y="20" width="76" height="220" rx="3"
            fill="rgba(0,0,0,0.2)" stroke="rgba(200,160,60,0.2)" strokeWidth="1.5" />
          <rect x="18" y="26" width="64" height="208" rx="2"
            fill="none" stroke="rgba(200,160,60,0.1)" strokeWidth="1" />

          {/* Lower inset panel */}
          <rect x="12" y="260" width="76" height="300" rx="3"
            fill="rgba(0,0,0,0.2)" stroke="rgba(200,160,60,0.2)" strokeWidth="1.5" />
          <rect x="18" y="266" width="64" height="288" rx="2"
            fill="none" stroke="rgba(200,160,60,0.1)" strokeWidth="1" />

          {/* Handle */}
          <rect
            x={isLeft ? 72 : 14} y="275" width="14" height="50" rx="7"
            fill="#4a3a1a" stroke="rgba(200,160,60,0.6)" strokeWidth="1.5"
          />
          <rect
            x={isLeft ? 75 : 17} y="278" width="8" height="44" rx="4"
            fill="#6a5a2a"
          />

          {/* Hinge bolts — top */}
          {[40, 60].map((hy, i) => (
            <g key={i}>
              <rect x={isLeft ? 0 : 82} y={hy} width="18" height="28" rx="2"
                fill="#3a2a0a" stroke="rgba(200,160,60,0.4)" strokeWidth="1" />
              <circle cx={isLeft ? 9 : 91} cy={hy + 7}  r="3" fill="#5a4a1a" stroke="rgba(200,160,60,0.5)" strokeWidth="0.8" />
              <circle cx={isLeft ? 9 : 91} cy={hy + 21} r="3" fill="#5a4a1a" stroke="rgba(200,160,60,0.5)" strokeWidth="0.8" />
            </g>
          ))}
          {/* Hinge bolts — bottom */}
          {[480, 500].map((hy, i) => (
            <g key={i}>
              <rect x={isLeft ? 0 : 82} y={hy} width="18" height="28" rx="2"
                fill="#3a2a0a" stroke="rgba(200,160,60,0.4)" strokeWidth="1" />
              <circle cx={isLeft ? 9 : 91} cy={hy + 7}  r="3" fill="#5a4a1a" stroke="rgba(200,160,60,0.5)" strokeWidth="0.8" />
              <circle cx={isLeft ? 9 : 91} cy={hy + 21} r="3" fill="#5a4a1a" stroke="rgba(200,160,60,0.5)" strokeWidth="0.8" />
            </g>
          ))}

          {/* Edge shadow for depth */}
          <rect x={isLeft ? 90 : 0} y="0" width="10" height="600"
            fill={`rgba(0,0,0,${isLeft ? 0.35 : 0.2})`} />
        </svg>
      </div>
    </div>
  );
};

// ─── RestoBarSection ──────────────────────────────────────────────────────────
const RestoBarSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleNPCs, setVisibleNPCs] = useState<Set<number>>(new Set());

  // ── NPC intersection observer ──
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const npcEls = section.querySelectorAll<HTMLElement>('[data-npc-index]');
    const observers: IntersectionObserver[] = [];
    npcEls.forEach((el) => {
      const idx = parseInt(el.dataset.npcIndex || '0', 10);
      const obs = new IntersectionObserver(
        ([entry]) => {
          setVisibleNPCs(prev => {
            const next = new Set(prev);
            entry.isIntersecting ? next.add(idx) : next.delete(idx);
            return next;
          });
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  // NPC positions spread across the counter
  const npcCount = TESTIMONIALS.length;
  const npcPositions = TESTIMONIALS.map((_, i) =>
    10 + (i / (npcCount - 1)) * 80
  );

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

      {/* ── Back-bar scene ── */}
      <div style={{
        position: 'absolute',
        left: 0, right: 0,
        bottom: '28%',
        height: '52%',
        zIndex: 9,
        pointerEvents: 'none',
      }}>
        <BackBar />
      </div>

      {/* ── Counter + NPCs + Stools ── */}
      <div style={{
        position: 'absolute',
        left: 0, right: 0,
        bottom: 0,
        height: '38%',
        zIndex: 12,
        pointerEvents: 'none',
      }}>
        <svg viewBox="0 0 1200 160" width="100%" height="100%" preserveAspectRatio="xMidYMax meet">
          <defs>
            <linearGradient id="counterTopGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#3a2a12" />
              <stop offset="40%"  stopColor="#2a1e0a" />
              <stop offset="100%" stopColor="#150f05" />
            </linearGradient>
          </defs>

          {/* Bar stools — sitting on the counter top */}
          {TESTIMONIALS.map((_, i) => {
            const sx = 60 + (i / (npcCount - 1)) * 1080;
            return <BarStool key={i} x={sx} />;
          })}

          {/* Seated NPCs */}
          {TESTIMONIALS.map((t, i) => {
            const nx = 60 + (i / (npcCount - 1)) * 1080;
            return (
              <foreignObject key={i} x={nx - 35} y={0} width="70" height="110"
                data-npc-index={i}>
                <SeatedNPC
                  color={t.silhouetteColor}
                  active={visibleNPCs.has(i)}
                  flipped={i % 2 === 1}
                />
              </foreignObject>
            );
          })}

          {/* Counter top edge — thin strip at the very bottom */}
          <rect x="0" y="140" width="1200" height="20" fill="url(#counterTopGrad)" />
          <rect x="0" y="138" width="1200" height="6" rx="1" fill="#4a3418" stroke="rgba(200,160,60,0.3)" strokeWidth="1" />
          <rect x="0" y="138" width="1200" height="2" fill="rgba(200,160,60,0.15)" />
        </svg>
      </div>

      {/* ── Dialogue bubbles ── */}
      <div style={{
        position: 'absolute',
        left: 0, right: 0,
        bottom: '36%',
        zIndex: 14,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        padding: '0 4vw',
        gap: '1vw',
        pointerEvents: 'none',
      }}>
        {TESTIMONIALS.map((t, i) => (
          <div key={i} data-npc-index={i}
            style={{ flex: '1 1 0', minWidth: 0, maxWidth: 200 }}>
            <div
              className={`dialogue-bubble${visibleNPCs.has(i) ? ' visible' : ''}`}
              style={{ transitionDelay: `${i * 0.12}s`, padding: '12px 14px' }}
            >
              <span style={{
                fontFamily: 'Georgia, serif', fontSize: '1.4rem',
                color: 'var(--naruto-orange)', lineHeight: 0.5,
                display: 'block', marginBottom: 4, opacity: 0.6,
              }}>"</span>
              <p style={{
                color: 'var(--text-primary)', fontSize: '0.6rem',
                lineHeight: 1.55, fontStyle: 'italic',
                display: '-webkit-box', WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}>
                {t.comment}
              </p>
              <div style={{ marginTop: 8, borderTop: '1px solid rgba(232,125,43,0.15)', paddingTop: 6 }}>
                <span style={{
                  display: 'block', color: 'var(--naruto-orange)',
                  fontFamily: 'var(--font-display)', fontSize: '0.7rem', letterSpacing: '0.06em',
                }}>{t.name}</span>
                <span style={{
                  fontSize: '0.55rem', color: 'var(--text-dim)',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>


    </section>
  );
};

export default RestoBarSection;
