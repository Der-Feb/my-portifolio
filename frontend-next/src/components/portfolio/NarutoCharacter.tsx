import { useEffect, useRef, useState } from 'react';

type CharState = 'idle' | 'running' | 'jumping';

interface Props {
  state?: CharState;
  flipped?: boolean; // facing left?
  style?: React.CSSProperties;
}

const NarutoCharacter = ({ state = 'idle', flipped = false, style }: Props) => {
  const [frame, setFrame] = useState(0);
  const frameRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Run cycle: 4 frames
  const runFrames = [0, 1, 2, 3];

  useEffect(() => {
    if (frameRef.current) clearInterval(frameRef.current);
    if (state === 'running') {
      frameRef.current = setInterval(() => {
        setFrame(f => (f + 1) % runFrames.length);
      }, 100);
    } else {
      setFrame(0);
    }
    return () => { if (frameRef.current) clearInterval(frameRef.current); };
  }, [state]);

  // Leg positions for run cycle
  const legs = [
    // frame 0 – neutral
    { lLeg: 'M0,40 Q-6,60 -4,80', rLeg: 'M0,40 Q6,60 4,80', lFoot: '-4,78', rFoot: '4,78' },
    // frame 1 – stride (L forward R back)
    { lLeg: 'M0,40 Q-12,58 -14,76', rLeg: 'M0,40 Q8,62 10,80', lFoot: '-14,74', rFoot: '10,78' },
    // frame 2 – neutral 2
    { lLeg: 'M0,40 Q-4,60 -2,82', rLeg: 'M0,40 Q4,60 2,82', lFoot: '-2,80', rFoot: '2,80' },
    // frame 3 – stride (R forward L back)
    { lLeg: 'M0,40 Q-8,62 -10,80', rLeg: 'M0,40 Q12,58 14,76', lFoot: '-10,78', rFoot: '14,74' },
  ];

  const currentLegs = legs[frame] ?? legs[0];

  const armSwing = state === 'running' ? (frame % 2 === 0 ? 15 : -15) : 0;
  const bodyBob = state === 'running' ? (frame % 2 === 0 ? 0 : -3) : 0;
  const jumpOffset = state === 'jumping' ? -40 : 0;

  return (
    <div
      className={`naruto-char ${state}`}
      style={{
        transform: `${flipped ? 'scaleX(-1)' : ''} translateY(${jumpOffset}px)`,
        width: 60,
        height: 120,
        ...style,
      }}
    >
      <svg
        width="60"
        height="120"
        viewBox="-30 -10 60 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="naruto-body"
      >
        {/* === SHADOW === */}
        <ellipse cx="0" cy={98 - bodyBob} rx="14" ry="3" fill="rgba(0,0,0,0.35)" />

        {/* === HAIR (spiky, dark with blonde sheen) === */}
        <g transform={`translate(0, ${-8 + bodyBob})`}>
          {/* Hair base */}
          <ellipse cx="0" cy="0" rx="10" ry="11" fill="#d4a820" />
          {/* Dark roots */}
          <ellipse cx="0" cy="2" rx="8" ry="7" fill="#b8900c" />
          {/* Spikes */}
          <polygon points="0,-11 -5,-5 5,-5" fill="#d4a820" />
          <polygon points="-7,-9 -12,-4 -3,-4" fill="#c49818" />
          <polygon points="7,-9 12,-4 3,-4" fill="#c49818" />
          <polygon points="-3,-12 -7,-6 1,-6" fill="#d4a820" />
          <polygon points="3,-12 7,-6 -1,-6" fill="#d4a820" />
          {/* Back spikes */}
          <polygon points="-9,-6 -14,-1 -5,-1" fill="#b8900c" />
          <polygon points="9,-6 14,-1 5,-1" fill="#b8900c" />
        </g>

        {/* === HEAD === */}
        <g transform={`translate(0, ${-2 + bodyBob})`}>
          <ellipse cx="0" cy="0" rx="9" ry="10" fill="#f0c090" />
          {/* Whisker marks */}
          <line x1="-7" y1="-1" x2="-3" y2="0" stroke="#c8885a" strokeWidth="0.8" />
          <line x1="-7" y1="1.5" x2="-3" y2="1" stroke="#c8885a" strokeWidth="0.8" />
          <line x1="-7" y1="4" x2="-3" y2="2" stroke="#c8885a" strokeWidth="0.8" />
          <line x1="7" y1="-1" x2="3" y2="0" stroke="#c8885a" strokeWidth="0.8" />
          <line x1="7" y1="1.5" x2="3" y2="1" stroke="#c8885a" strokeWidth="0.8" />
          <line x1="7" y1="4" x2="3" y2="2" stroke="#c8885a" strokeWidth="0.8" />
          {/* Eyes */}
          <ellipse cx="-3.5" cy="-1" rx="2" ry="2.5" fill="#1a1a2e" />
          <ellipse cx="3.5" cy="-1" rx="2" ry="2.5" fill="#1a1a2e" />
          {/* Eye shine */}
          <circle cx="-2.8" cy="-1.8" r="0.7" fill="white" opacity="0.9" />
          <circle cx="4.2" cy="-1.8" r="0.7" fill="white" opacity="0.9" />
          {/* Headband metal */}
          <rect x="-9" y="-7" width="18" height="4" rx="1" fill="#c0c8d8" />
          {/* Konoha leaf symbol */}
          <circle cx="0" cy="-5" r="2" fill="none" stroke="#606878" strokeWidth="0.8" />
          <line x1="0" y1="-7" x2="0" y2="-3" stroke="#606878" strokeWidth="0.5" />
          {/* Headband knot at back */}
          <rect x="-10" y="-6" width="2" height="3" rx="1" fill="#1a4a8a" />
          <rect x="8" y="-6" width="2" height="3" rx="1" fill="#1a4a8a" />
        </g>

        {/* === BODY (orange jacket) === */}
        <g transform={`translate(0, ${14 + bodyBob})`}>
          {/* Main torso */}
          <rect x="-10" y="0" width="20" height="26" rx="3" fill="#e87d2b" />
          {/* Black zipper/collar line */}
          <line x1="0" y1="0" x2="0" y2="26" stroke="#1a1a2e" strokeWidth="2" />
          {/* Konoha spiral on back/left */}
          <circle cx="-5" cy="10" r="3" fill="none" stroke="#1a1a2e" strokeWidth="0.8" opacity="0.6" />
          {/* Collar */}
          <path d="M-4,0 L0,5 L4,0" fill="#f5c08a" stroke="none" />
          {/* Sleeve left */}
          <rect
            x="-16"
            y="2"
            width="8"
            height="18"
            rx="3"
            fill="#e87d2b"
            transform={`rotate(${armSwing}, -10, 2)`}
          />
          {/* Sleeve right */}
          <rect
            x="8"
            y="2"
            width="8"
            height="18"
            rx="3"
            fill="#e87d2b"
            transform={`rotate(${-armSwing}, 10, 2)`}
          />
          {/* Hand left */}
          <circle
            cx="-14"
            cy="22"
            r="3"
            fill="#f0c090"
            transform={`rotate(${armSwing}, -10, 2)`}
          />
          {/* Hand right */}
          <circle
            cx="14"
            cy="22"
            r="3"
            fill="#f0c090"
            transform={`rotate(${-armSwing}, 10, 2)`}
          />
          {/* Black trim at bottom of jacket */}
          <rect x="-10" y="22" width="20" height="4" rx="1" fill="#1a1a2e" />
        </g>

        {/* === LEGS === */}
        <g transform={`translate(0, ${40 + bodyBob})`} stroke="none">
          {/* Left leg */}
          <path d={currentLegs.lLeg} stroke="#1a1a2e" strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d={currentLegs.lLeg} stroke="#e87d2b" strokeWidth="6" strokeLinecap="round" fill="none" />
          {/* Left foot (ninja sandal) */}
          <ellipse
            cx={parseFloat(currentLegs.lFoot.split(',')[0])}
            cy={parseFloat(currentLegs.lFoot.split(',')[1])}
            rx="5" ry="3"
            fill="#2a2a3a"
          />
          {/* Right leg */}
          <path d={currentLegs.rLeg} stroke="#1a1a2e" strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d={currentLegs.rLeg} stroke="#e87d2b" strokeWidth="6" strokeLinecap="round" fill="none" />
          {/* Right foot */}
          <ellipse
            cx={parseFloat(currentLegs.rFoot.split(',')[0])}
            cy={parseFloat(currentLegs.rFoot.split(',')[1])}
            rx="5" ry="3"
            fill="#2a2a3a"
          />
        </g>

        {/* === CHAKRA AURA (idle) === */}
        {state === 'idle' && (
          <ellipse
            cx="0"
            cy="50"
            rx="18"
            ry="55"
            fill="rgba(232,125,43,0.04)"
            style={{ animation: 'narutoIdle 2s ease-in-out infinite' }}
          />
        )}
      </svg>
    </div>
  );
};

export default NarutoCharacter;
