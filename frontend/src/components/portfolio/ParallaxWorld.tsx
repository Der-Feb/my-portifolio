import { useEffect, useRef, useState, ReactNode } from 'react';
import gsap from 'gsap';
import NarutoCharacter from './NarutoCharacter';

interface Props {
  children: ReactNode;
}

const NUM_SECTIONS = 4;
const SEC_SIZE     = 1 / (NUM_SECTIONS - 1); // 0.333…
const CHAR_SPEED   = 0.007;
const EDGE_RIGHT   = 0.97;
const EDGE_LEFT    = 0.03;

const ParallaxWorld = ({ children }: Props) => {
  const worldRef = useRef<HTMLDivElement>(null);

  // ── All loop-readable state in refs (zero stale-closure risk) ──
  const progressRef    = useRef(0);
  const charXRef       = useRef(0.4);
  const charYRef       = useRef(0);
  const flippedRef     = useRef(false);
  const isRunningRef   = useRef(false);
  const isJumpingRef   = useRef(false);
  const isTransRef     = useRef(false);
  const lastSectionRef = useRef(0);
  const keysRef        = useRef<Set<string>>(new Set());
  const rafRef         = useRef<number | null>(null);

  // ── React state — only for re-rendering the character + overlay ──
  const [charX,     setCharX]     = useState(0.4);
  const [charY,     setCharY]     = useState(0);
  const [flipped,   setFlipped]   = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [overlay,   setOverlay]   = useState<'hidden' | 'in' | 'out'>('hidden');

  // ── Stable function refs — updated every render, called by RAF ──
  const syncWorldRef       = useRef<(p: number) => void>(() => {});
  const doRoomTransRef     = useRef<(dir: number) => void>(() => {});
  const walkLoopRef        = useRef<() => void>(() => {});
  const performJumpRef     = useRef<() => void>(() => {});

  // ── syncWorld ────────────────────────────────────────────────────
  const syncWorld = (p: number) => {
    const worldDOM = worldRef.current;
    if (!worldDOM) return;

    const totalWidth     = worldDOM.scrollWidth - window.innerWidth;
    const worldPositionX = -p * totalWidth;

    gsap.set(worldDOM, { x: worldPositionX });

    worldDOM.querySelectorAll<HTMLElement>('.section-room').forEach((section, i) => {
      const sectionOffsetX = i * window.innerWidth;
      section.querySelectorAll<HTMLElement>('[data-parallax]').forEach(layer => {
        const speed = parseFloat(layer.dataset.parallax || '0');
        gsap.set(layer, { x: (worldPositionX + sectionOffsetX) * speed });
      });
    });

    const sectionIndex = Math.round(p * (NUM_SECTIONS - 1));
    if (sectionIndex !== lastSectionRef.current) {
      lastSectionRef.current = sectionIndex;
      const ids = ['hero', 'library', 'restobar', 'booth'];
      window.dispatchEvent(new CustomEvent('sectionChange', {
        detail: { activeId: ids[sectionIndex] },
      }));
    }
  };
  syncWorldRef.current = syncWorld;

  // ── doRoomTransition ─────────────────────────────────────────────
  const doRoomTransition = (direction: number) => {
    if (isTransRef.current) return;

    const nextIndex = lastSectionRef.current + direction;
    if (nextIndex < 0 || nextIndex >= NUM_SECTIONS) {
      // No more rooms — clamp at edge
      const clampX = direction > 0 ? EDGE_RIGHT : EDGE_LEFT;
      charXRef.current = clampX;
      setCharX(clampX);
      return;
    }

    isTransRef.current = true;
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }

    const targetP = nextIndex * SEC_SIZE;
    const exitX   = direction > 0 ?  1.15 : -0.15;
    const entryX  = direction > 0 ? -0.08 :  1.08;
    const landX   = direction > 0 ?  0.25 :  0.75;

    // Fire door event when entering the restobar (section index 2)
    const enteringRestobar = nextIndex === 2;
    const doorSide = direction > 0 ? 'left' : 'right';

    const charPos = { x: charXRef.current };

    // Phase 1 — character walks off screen (no overlay yet)
    gsap.to(charPos, {
      x: exitX,
      duration: 0.35,
      ease: 'power1.in',
      onUpdate: () => { charXRef.current = charPos.x; setCharX(charPos.x); },
      onComplete: () => {

        // Phase 2 — fade to dark
        setOverlay('in');
        const ov = { opacity: 0 };
        gsap.to(ov, {
          opacity: 1,
          duration: 0.2,
          ease: 'power1.in',
          onComplete: () => {
            // Phase 3 — while fully dark: snap world + place character at entry
            progressRef.current = targetP;
            syncWorldRef.current(targetP);
            charPos.x = entryX;
            charXRef.current = entryX;
            setCharX(entryX);

            // Fire restobar door event while screen is dark
            if (enteringRestobar) {
              window.dispatchEvent(new CustomEvent('restobarEnter', { detail: { direction: doorSide } }));
            }

            // Phase 4 — fade back in
            setOverlay('out');
            gsap.to(ov, {
              opacity: 0,
              duration: 0.3,
              ease: 'power1.out',
              onComplete: () => {
                setOverlay('hidden');

                // Phase 5 — character walks in from edge
                gsap.to(charPos, {
                  x: landX,
                  duration: 0.45,
                  ease: 'power2.out',
                  onUpdate: () => { charXRef.current = charPos.x; setCharX(charPos.x); },
                  onComplete: () => {
                    charXRef.current = landX;
                    isTransRef.current = false;

                    // Resume walk if key still held
                    const walkKeys = ['ArrowRight', 'ArrowLeft', '.', '>', ',', '<'];
                    if (walkKeys.some(k => keysRef.current.has(k)) && !rafRef.current) {
                      rafRef.current = requestAnimationFrame(walkLoopRef.current);
                    }
                  },
                });
              },
            });
          },
        });
      },
    });
  };
  doRoomTransRef.current = doRoomTransition;

  // ── walkLoop ─────────────────────────────────────────────────────
  const walkLoop = () => {
    if (isTransRef.current) {
      rafRef.current = requestAnimationFrame(walkLoopRef.current);
      return;
    }

    const right = keysRef.current.has('ArrowRight') ||
                  keysRef.current.has('.') ||
                  keysRef.current.has('>');
    const left  = keysRef.current.has('ArrowLeft') ||
                  keysRef.current.has(',') ||
                  keysRef.current.has('<');

    if (right || left) {
      const dir  = right ? 1 : -1;
      const next = charXRef.current + dir * CHAR_SPEED;

      if (right && next >= EDGE_RIGHT) {
        charXRef.current = EDGE_RIGHT;
        setCharX(EDGE_RIGHT);
        doRoomTransRef.current(1);
        return;
      } else if (left && next <= EDGE_LEFT) {
        charXRef.current = EDGE_LEFT;
        setCharX(EDGE_LEFT);
        doRoomTransRef.current(-1);
        return;
      } else {
        charXRef.current = next;
        setCharX(next);
      }

      if (flippedRef.current !== (dir < 0)) {
        flippedRef.current = dir < 0;
        setFlipped(dir < 0);
      }
      if (!isRunningRef.current) {
        isRunningRef.current = true;
        setIsRunning(true);
      }
    } else {
      if (isRunningRef.current) {
        isRunningRef.current = false;
        setIsRunning(false);
      }
    }

    if (keysRef.current.size > 0) {
      rafRef.current = requestAnimationFrame(walkLoopRef.current);
    } else {
      rafRef.current = null;
    }
  };
  walkLoopRef.current = walkLoop;

  // ── performJump ──────────────────────────────────────────────────
  const performJump = () => {
    if (isJumpingRef.current || isTransRef.current) return;
    isJumpingRef.current = true;
    setIsJumping(true);

    const pos = { y: 0 };
    gsap.to(pos, {
      y: 1,
      duration: 0.6,
      ease: 'power2.out',
      onUpdate: () => {
        const t = pos.y;
        const h = 4 * 80 * t * (1 - t);
        charYRef.current = h;
        setCharY(h);
      },
      onComplete: () => {
        charYRef.current = 0;
        setCharY(0);
        isJumpingRef.current = false;
        setIsJumping(false);
      },
    });
  };
  performJumpRef.current = performJump;

  // ── Input listeners — registered once ────────────────────────────
  useEffect(() => {
    const walkKeys = ['ArrowRight', 'ArrowLeft', '.', '>', ',', '<'];

    const onKeyDown = (e: KeyboardEvent) => {
      if (walkKeys.includes(e.key)) {
        e.preventDefault();
        keysRef.current.add(e.key);
        if (!rafRef.current) {
          rafRef.current = requestAnimationFrame(walkLoopRef.current);
        }
      }
      if (e.key === 'ArrowUp' || e.key === 'w') {
        e.preventDefault();
        performJumpRef.current();
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key);
      if (!walkKeys.some(k => keysRef.current.has(k))) {
        if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
        isRunningRef.current = false;
        setIsRunning(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup',   onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup',   onKeyUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []); // stable — everything accessed via refs

  // ── HUD fast-travel ───────────────────────────────────────────────
  useEffect(() => {
    const handleJump = (e: Event) => {
      const targetP = (e as CustomEvent).detail.progress;
      if (isTransRef.current) return;

      isTransRef.current = true;

      // Fade to dark first
      setOverlay('in');
      const ov = { opacity: 0 };
      gsap.to(ov, {
        opacity: 1,
        duration: 0.25,
        ease: 'power1.in',
        onComplete: () => {
          // Snap world while dark
          progressRef.current = targetP;
          syncWorldRef.current(targetP);
          charXRef.current = 0.4;
          setCharX(0.4);

          // Fade back in
          setOverlay('out');
          gsap.to(ov, {
            opacity: 0,
            duration: 0.35,
            ease: 'power1.out',
            onComplete: () => {
              setOverlay('hidden');
              isTransRef.current = false;
            },
          });
        },
      });
    };

    window.addEventListener('hudJump', handleJump);
    return () => window.removeEventListener('hudJump', handleJump);
  }, []);

  return (
    <div className="world-container">
      {/* Dark transition overlay */}
      {overlay !== 'hidden' && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: '#08090d',
            zIndex: 200,
            pointerEvents: 'none',
            animation: overlay === 'in'
              ? 'overlayFadeIn 0.2s ease-in forwards'
              : 'overlayFadeOut 0.3s ease-out forwards',
          }}
        />
      )}

      {/* Character */}
      <div
        style={{
          position: 'fixed',
          bottom: 60 + charY,
          left: `${charX * 100}%`,
          transform: 'translateX(-50%)',
          zIndex: 50,
          pointerEvents: 'none',
          transition: 'none',
        }}
      >
        <NarutoCharacter
          state={isJumping ? 'jumping' : isRunning ? 'running' : 'idle'}
          flipped={flipped}
        />
      </div>

      {/* World */}
      <div
        ref={worldRef}
        style={{
          display: 'flex',
          width: 'max-content',
          height: '100vh',
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ParallaxWorld;
