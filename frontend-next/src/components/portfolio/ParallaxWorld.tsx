import { useEffect, useRef, useState, ReactNode } from 'react';
import gsap from 'gsap';
import { triggerPageFlip } from './HUD';
import NarutoCharacter from './NarutoCharacter';

interface Props {
  children: ReactNode;
}

const ParallaxWorld = ({ children }: Props) => {
  const worldRef = useRef<HTMLDivElement>(null);
  
  // Progress from 0 to 1 (World position)
  const [progress, setProgress] = useState(0);
  // Viewport position for Naruto
  const [charX, setCharX] = useState(0.2); 
  const [charY, setCharY] = useState(0); // Vertical offset for jumping
  
  const [flipped, setFlipped] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  
  const keysPressed = useRef<Set<string>>(new Set());
  const rafRef = useRef<number | null>(null);
  const scrollTimer = useRef<number | null>(null);
  const lastSection = useRef<number>(0);
  const isTransitioning = useRef(false);

  // Constants
  const NUM_SECTIONS = 4;
  const SEC_SIZE = 1 / (NUM_SECTIONS - 1); // Exact size of one room transition
  const WALK_SPEED = 0.012; 
  const SCROLL_SENSITIVITY = 0.0007;

  const performJump = () => {
    if (isJumping || isTransitioning.current) return;
    setIsJumping(true);
    
    // Jump Arc
    gsap.to({ val: 0 }, {
      val: 1,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: function() {
        // Simple parabolic arc: y = 4 * height * t * (1 - t)
        const t = this.progress();
        const height = 80;
        setCharY(4 * height * t * (1 - t));
      },
      onComplete: () => {
        setCharY(0);
        setIsJumping(false);
      }
    });
  };

  // --- STABLE INPUT LISTENERS (No dependency flickering) ---
  useEffect(() => {
    const onKeyDown = (onKeyPress: KeyboardEvent) => {
      const walkKeys = ['.', '>', ',', '<', 'ArrowRight', 'ArrowLeft'];
      if (walkKeys.includes(onKeyPress.key)) {
        keysPressed.current.add(onKeyPress.key);
        if (!rafRef.current) moveLoop();
      }
      if (onKeyPress.key === 'ArrowUp' || onKeyPress.key === 'w' || onKeyPress.key === '^') {
        performJump();
      }
    };
    const onKeyUp = (onKeyPress: KeyboardEvent) => {
      keysPressed.current.delete(onKeyPress.key);
    };

    const moveLoop = () => {
      if (isTransitioning.current) {
        rafRef.current = requestAnimationFrame(moveLoop);
        return;
      }

      setCharX(prev => {
        let next = prev;
        const rightLabel = keysPressed.current.has('.') || keysPressed.current.has('>') || keysPressed.current.has('ArrowRight');
        const leftLabel  = keysPressed.current.has(',') || keysPressed.current.has('<') || keysPressed.current.has('ArrowLeft');

        if (rightLabel) {
          next = prev + WALK_SPEED;
          setFlipped(false);
          setIsRunning(true);
        } else if (leftLabel) {
          next = prev - WALK_SPEED;
          setFlipped(true);
          setIsRunning(true);
        } else {
          setIsRunning(false);
        }

        // Edge detection for walking
        if (next > 0.985) {
          triggerWalkTransition(1);
          return 0.985;
        }
        if (next < 0.015) {
          triggerWalkTransition(-1);
          return 0.015;
        }

        return Math.max(0, Math.min(1, next));
      });

      if (keysPressed.current.size > 0) {
        rafRef.current = requestAnimationFrame(moveLoop);
      } else {
        rafRef.current = null;
        setIsRunning(false);
      }
    };

    const onWheel = (wheelEvent: WheelEvent) => {
      if (wheelEvent.cancelable) wheelEvent.preventDefault();
      if (isTransitioning.current) return;
      
      const delta = wheelEvent.deltaY * SCROLL_SENSITIVITY;
      
      setProgress(prev => {
        const next = Math.max(0, Math.min(1, prev + delta));
        if (delta > 0) setFlipped(false);
        else if (delta < 0) setFlipped(true);
        
        if (Math.abs(delta) > 0.001) {
          setIsRunning(true);
          if (scrollTimer.current) window.clearTimeout(scrollTimer.current);
          scrollTimer.current = window.setTimeout(() => setIsRunning(false), 150);
        }
        return next;
      });
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('wheel', onWheel as any, { passive: false });
    
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('wheel', onWheel as any);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (scrollTimer.current) window.clearTimeout(scrollTimer.current);
    };
  }, [isJumping]); // Need to rebinding only to access latest isJumping if we use closure, but better use a ref or functional update

  // --- UNIFIED LAYER SYNC ---
  const syncWorld = (p: number) => {
    const worldDOM = worldRef.current;
    if (!worldDOM) return;

    const totalWorldWidth = worldDOM.scrollWidth - window.innerWidth;
    const worldPositionX = -p * totalWorldWidth;

    // Main World
    gsap.set(worldDOM, { x: worldPositionX });

    // Parallax sub-layers
    const parallaxLayers = worldDOM.querySelectorAll<HTMLElement>('[data-parallax]');
    parallaxLayers.forEach(layer => {
      const parallaxSpeed = parseFloat(layer.dataset.parallax || '0');
      gsap.set(layer, { x: worldPositionX * parallaxSpeed });
    });

    // Update section state (UI/Navbar)
    const sectionIndex = Math.round(p * (NUM_SECTIONS - 1));
    if (sectionIndex !== lastSection.current) {
      lastSection.current = sectionIndex;
      const sectionIdList = ['hero', 'library', 'restobar', 'booth'];
      window.dispatchEvent(new CustomEvent('sectionChange', { 
        detail: { activeId: sectionIdList[sectionIndex] } 
      }));
    }
  };

  const progressRef = useRef(0);
  useEffect(() => { progressRef.current = progress; }, [progress]);

  // --- TRANSITION LOGIC ---
  const triggerWalkTransition = (direction: number) => {
    if (isTransitioning.current) return;
    
    const currentIndex = lastSection.current;
    const nextIndex = currentIndex + direction;
    
    if (nextIndex < 0 || nextIndex >= NUM_SECTIONS) return;

    isTransitioning.current = true;
    triggerPageFlip('section');

    const startP = currentIndex * SEC_SIZE;
    const targetPValue = nextIndex * SEC_SIZE;
    
    // SNAP: Force sync to start position to kill any 1-frame flashes
    syncWorld(startP);
    setCharX(direction > 0 ? 0.05 : 0.95);

    // SNAPPY WORLD TRANSITION
    const transitionObj = { p: startP }; 
    gsap.to(transitionObj, {
      p: targetPValue,
      duration: 0.45,
      ease: 'power2.inOut',
      onUpdate: () => {
        syncWorld(transitionObj.p);
        setProgress(transitionObj.p);
      },
      onComplete: () => {
        isTransitioning.current = false;
      }
    });
  };

  // Sync state to DOM (Only for smooth manual scrolling)
  useEffect(() => {
    if (isTransitioning.current) return;
    syncWorld(progress);
  }, [progress]);

  // Fast Travel (HUD)
  useEffect(() => {
    const handleJump = (e: any) => {
      const targetP = e.detail.progress;
      if (isTransitioning.current) return;
      
      isTransitioning.current = true;
      triggerPageFlip('section');

      const transitionObj = { p: progressRef.current };
      gsap.to(transitionObj, {
        p: targetP,
        duration: 0.8,
        ease: 'power2.inOut',
        onUpdate: () => {
          syncWorld(transitionObj.p);
          setProgress(transitionObj.p);
        },
        onComplete: () => {
          setCharX(0.2); 
          isTransitioning.current = false;
        }
      });
    };
    window.addEventListener('hudJump', handleJump as EventListener);
    return () => window.removeEventListener('hudJump', handleJump as EventListener);
  }, []); // Stable listener

  return (
    <div className="world-container">
      {/* Naruto viewport position */}
      <div style={{
        position: 'fixed',
        bottom: 60 + charY, // Added charY for jumping
        left: `${charX * 100}%`, 
        transform: 'translateX(-50%)',
        zIndex: 50,
        pointerEvents: 'none',
        // CRITICAL: Remove CSS transition to fix input lag and sliding glitches
        transition: 'none',
      }}>
        <NarutoCharacter state={isJumping ? 'jumping' : isRunning ? 'running' : 'idle'} flipped={flipped} />
      </div>

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
