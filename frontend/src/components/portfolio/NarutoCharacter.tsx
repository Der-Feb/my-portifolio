import { useRef } from 'react';

type CharState = 'idle' | 'running' | 'jumping';

interface Props {
  state?: CharState;
  flipped?: boolean;
  style?: React.CSSProperties;
}

const NarutoCharacter = ({ state = 'idle', flipped = false, style }: Props) => {
  return (
    <div
      className={`naruto-character-container ${state} ${flipped ? 'flipped' : ''}`}
      style={{
        width: 48,
        height: 68,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))',
        ...style,
      }}
    >
      <svg
        width="48"
        height="68"
        viewBox="0 0 48 68"
        className="naruto-svg"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>
          <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fde68a" />
          </linearGradient>
          <linearGradient id="jacketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Dynamic Shadow */}
        <ellipse className="char-shadow" cx="24" cy="65" rx="14" ry="3.5" fill="rgba(0,0,0,0.45)" />

        {/* --- LEGS --- */}
        <g className="shinobi-legs">
          <g className="leg-back" opacity="0.65">
            <path d="M22,44 L28,54 L24,64 L16,64 L20,54 Z" fill="#ea580c" stroke="#1c1917" strokeWidth="1" />
            <path d="M16,64 L24,64 L26,66 L16,66 Z" fill="#1c1917" />
          </g>
          <g className="leg-front">
            <path d="M22,44 L16,54 L20,64 L28,64 L24,54 Z" fill="#f97316" stroke="#1c1917" strokeWidth="1.2" />
            <path d="M20,64 L28,64 L30,66 L20,66 Z" fill="#1c1917" />
          </g>
        </g>

        {/* --- TORSO --- */}
        <g className="shinobi-torso">
          {/* Arm Back */}
          <path className="arm-back" d="M24,32 L40,42 L38,46 L22,36 Z" fill="#ea580c" stroke="#1c1917" strokeWidth="1" opacity="0.7" />
          
          {/* Main Jacket */}
          <path d="M12,28 L34,28 Q36,28 36,32 L32,46 Q32,48 28,48 L14,48 Q10,48 10,46 Z" fill="url(#jacketGrad)" stroke="#1c1917" strokeWidth="1.2" />
          <path d="M11,42 L33,42 L32,47 L12,47 Z" fill="#262626" /> {/* Black trim */}
          <line x1="23" y1="28" x2="23" y2="42" stroke="#1c1917" strokeWidth="0.8" /> {/* Zipper */}
          
          {/* Arm Front */}
          <path className="arm-front" d="M24,32 L42,42 L40,46 L22,36 Z" fill="#f97316" stroke="#1c1917" strokeWidth="1.2" />
          
          {/* Collar */}
          <path d="M16,28 L16,20 Q23,18 30,20 L30,28 Z" fill="#262626" stroke="#1c1917" strokeWidth="1" />
        </g>

        {/* --- HEAD --- */}
        <g className="shinobi-head">
          {/* Spiky Hair (Back) */}
          <path d="M18,12 L6,4 L14,10 L8,-4 L20,6Z" fill="url(#hairGrad)" stroke="#854d0e" strokeWidth="0.6" />
          
          {/* Face (Side Profile) */}
          <path d="M18,8 Q38,8 38,22 Q38,32 28,32 Q18,32 18,22 Z" fill="url(#skinGrad)" stroke="#92400e" strokeWidth="1.2" />
          
          {/* Headband */}
          <path d="M18,11 L38,11 L38,18 L18,18 Z" fill="#1e3a8a" stroke="#1c1917" strokeWidth="1" />
          <g>
            <rect x="28" y="12" width="9" height="5" fill="#cbd5e1" rx="0.5" stroke="#1c1917" strokeWidth="0.6" />
            <path d="M30,14 Q32.5,12 35,14 Q34,14.5 35,15 Q32.5,17 30,15" fill="none" stroke="#64748b" strokeWidth="0.5" /> {/* Leaf Sigil */}
          </g>
          {/* Knot at back */}
          <path d="M18,14 L12,10 M18,14 L12,18" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" />
          
          {/* Facial Features */}
          <circle cx="32" cy="22" r="2" fill="#1c1917" /> {/* Eye */}
          <path d="M31,25 Q33,26 35,25" fill="none" stroke="#92400e" strokeWidth="0.8" strokeLinecap="round" /> {/* Smirk */}
          
          {/* Whiskers */}
          <g stroke="#92400e" strokeWidth="0.5" strokeLinecap="round">
            <line x1="33" y1="24" x2="36" y2="24" />
            <line x1="33" y1="26" x2="36" y2="25.5" />
            <line x1="33" y1="28" x2="36" y2="27" />
          </g>
          
          {/* Spiky Hair (Top) */}
          <path d="M18,8 L24,-8 L30,4 L40,-2 L38,11" fill="url(#hairGrad)" stroke="#854d0e" strokeWidth="0.6" />
        </g>
      </svg>

      <style>{`
        .naruto-character-container.flipped { transform: scaleX(-1); }
        .naruto-svg { transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        
        /* IDLE STATE */
        .idle .naruto-svg { animation: idleBreath 3s ease-in-out infinite; }
        @keyframes idleBreath {
          0%, 100% { transform: scaleY(1) translateY(0); }
          50% { transform: scaleY(1.03) translateY(-2px); }
        }
        .idle .shinobi-head { animation: headSway 4s ease-in-out infinite; }
        @keyframes headSway {
          0%, 100% { transform: rotate(-1deg); }
          50% { transform: rotate(1deg); }
        }

        /* RUNNING STATE (Shinobi Run) */
        .running .shinobi-torso, .running .shinobi-head {
          animation: shinobiLean 0.3s linear infinite;
          transform-origin: 24px 44px;
        }
        @keyframes shinobiLean {
          0%, 100% { transform: rotate(26deg) translate(8px, -2px); }
          50% { transform: rotate(28deg) translate(8px, -3px); }
        }
        
        .running .leg-front { transform-origin: 24px 44px; animation: cycleLegF 0.3s linear infinite; }
        .running .leg-back { transform-origin: 24px 44px; animation: cycleLegB 0.3s linear infinite; }
        @keyframes cycleLegF {
          0%, 100% { transform: rotate(-35deg) scaleY(0.85); }
          50% { transform: rotate(45deg) scaleY(1.1); }
        }
        @keyframes cycleLegB {
          0%, 100% { transform: rotate(45deg) scaleY(1.1); }
          50% { transform: rotate(-35deg) scaleY(0.85); }
        }

        .running .arm-front, .running .arm-back {
          animation: armWind 0.3s ease-in-out infinite;
          transform-origin: 24px 32px;
        }
        @keyframes armWind {
          0%, 100% { transform: rotate(2deg); }
          50% { transform: rotate(-2deg); }
        }

        /* JUMPING STATE */
        .jumping .leg-front { transform: rotate(70deg) translate(-6px, -4px); transition: transform 0.2s; }
        .jumping .leg-back { transform: rotate(-40deg) translate(4px, 2px); transition: transform 0.2s; }
        .jumping .shinobi-torso { transform: rotate(15deg) translateY(-4px); transition: transform 0.2s; }
        .jumping .char-shadow { transform: scale(0.6); opacity: 0.2; transition: all 0.3s; }
      `}</style>
    </div>
  );
};

export default NarutoCharacter;
