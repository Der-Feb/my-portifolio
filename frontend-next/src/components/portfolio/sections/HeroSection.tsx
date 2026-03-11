import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const fogRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title cinematic reveal
      gsap.from('.hero-title-char', {
        opacity: 0,
        y: 80,
        skewY: 6,
        stagger: 0.06,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.3,
      });
      gsap.from('.hero-sub', {
        opacity: 0,
        y: 30,
        duration: 0.9,
        delay: 1.0,
        ease: 'power3.out',
      });
      gsap.from('.hero-cta, .hero-scroll-hint', {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.7,
        delay: 1.4,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleChars = 'BUGINGO ERIC DERICK'.split('').map((c, i) => (
    <span key={i} className="hero-title-char" style={{ display: 'inline-block', whiteSpace: 'pre' }}>
      {c}
    </span>
  ));

  return (
    <section
      id="hero"
      className="section-room"
      ref={sectionRef}
      style={{
        background: `linear-gradient(135deg, #08090d 0%, #0d1020 50%, #0a0e1a 100%)`,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* ── Parallax Sky Layer ── */}
      <div
        className="parallax-layer layer-sky"
        data-parallax="0.1"
        style={{ background: 'radial-gradient(ellipse at 30% 60%, #1a2040 0%, #08090d 70%)' }}
      />

      {/* ── Distant City Silhouette (far layer) ── */}
      <div className="parallax-layer layer-far" data-parallax="0.25" style={{ bottom: 0, top: 'auto', height: '55%' }}>
        <svg viewBox="0 0 1200 400" width="100%" height="100%" preserveAspectRatio="xMinYMax slice" fill="none">
          {/* Background buildings */}
          {[50,120,200,280,350,430,500,580,650,720,800,870,950,1020,1100].map((x, i) => (
            <rect
              key={i}
              x={x}
              y={80 + (i % 3) * 30}
              width={30 + (i % 4) * 15}
              height={280 - (i % 3) * 30}
              fill={`rgba(18,22,35,${0.7 + (i % 3) * 0.1})`}
            />
          ))}
          {/* Windows */}
          {[60,130,210,290,360,510,660,810,960,1110].map((x, i) => (
            Array.from({ length: 6 }, (_, row) =>
              Array.from({ length: 2 }, (_, col) => (
                <rect
                  key={`${i}-${row}-${col}`}
                  x={x + col * 8}
                  y={120 + row * 20}
                  width={4}
                  height={8}
                  fill={Math.random() > 0.6 ? 'rgba(255,200,100,0.4)' : 'rgba(255,200,100,0.08)'}
                />
              ))
            )
          ))}
        </svg>
      </div>

      {/* ── Mid buildings ── */}
      <div className="parallax-layer layer-mid" data-parallax="0.45" style={{ bottom: 0, top: 'auto', height: '45%' }}>
        <svg viewBox="0 0 1200 300" width="100%" height="100%" preserveAspectRatio="xMinYMax slice" fill="none">
          {[0,80,160,240,360,440,520,700,780,900,1000,1080].map((x, i) => (
            <rect
              key={i}
              x={x}
              y={40 + (i % 2) * 20}
              width={60 + (i % 3) * 10}
              height={220}
              fill={`rgba(14,17,28,${0.85 + (i % 2) * 0.1})`}
            />
          ))}
          {/* Industrial pipes */}
          <rect x="200" y="100" width="6" height="150" fill="rgba(30,35,55,0.9)" />
          <rect x="600" y="80" width="6" height="170" fill="rgba(30,35,55,0.9)" />
          <rect x="1000" y="90" width="6" height="160" fill="rgba(30,35,55,0.9)" />
        </svg>
      </div>

      {/* ── Foreground concrete ground ── */}
      <div
        className="parallax-layer layer-near"
        data-parallax="0.7"
        style={{ bottom: 0, top: 'auto', height: '25%', background: 'linear-gradient(to top, #0d0f17 0%, transparent 100%)' }}
      />

      {/* ── Volumetric Fog SVG overlay ── */}
      <svg
        ref={fogRef}
        className="parallax-layer"
        data-parallax="0.05"
        style={{ zIndex: 6, opacity: 0.55 }}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="blur1">
            <feGaussianBlur stdDeviation="20" />
          </filter>
        </defs>
        <ellipse cx="200" cy="700" rx="500" ry="180" fill="#1a2a4a" filter="url(#blur1)" opacity="0.4" style={{ animation: 'shaftFlicker 5s ease-in-out infinite' }} />
        <ellipse cx="900" cy="750" rx="600" ry="200" fill="#0e1830" filter="url(#blur1)" opacity="0.5" style={{ animation: 'shaftFlicker 7s ease-in-out infinite reverse' }} />
        <ellipse cx="1300" cy="680" rx="400" ry="150" fill="#1a2a4a" filter="url(#blur1)" opacity="0.35" style={{ animation: 'shaftFlicker 6s ease-in-out infinite' }} />
      </svg>

      {/* ── Light Shafts ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 7, pointerEvents: 'none' }}>
        <div className="light-shaft" style={{ left: '25%', top: 0, height: '70%', transform: 'skewX(-8deg)' }} />
        <div className="light-shaft" style={{ left: '65%', top: 0, height: '60%', width: 80, transform: 'skewX(-4deg)', animationDelay: '2s' }} />
      </div>

      {/* ── Vignette ── */}
      <div className="fog-vignette" style={{ zIndex: 8 }} />

      {/* ── MAIN CONTENT ── */}
      <div
        ref={titleRef}
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'left',
          padding: '0 8vw',
          maxWidth: 1000,
          width: '100%',
        }}
      >
        <span className="section-eyebrow hero-sub">CREATIVE SOFTWARE & GAME DEVELOPER</span>

        <h1
          className="section-title"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 9rem)',
            lineHeight: 0.88,
            marginBottom: '2rem',
            textShadow: '0 0 60px rgba(232,125,43,0.15)',
            overflow: 'hidden',
          }}
        >
          {titleChars}
          <br />
          <span style={{ color: 'var(--naruto-orange)' }}>.</span>
        </h1>

        <p
          className="hero-sub"
          style={{
            color: 'var(--text-secondary)',
            fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
            maxWidth: 520,
            marginBottom: '2.5rem',
            lineHeight: 1.7,
          }}
        >
          I craft atmospheric digital experiences that blend creativity with 
          cutting-edge technology. Full-stack, game dev, and everything in between.
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <button
            className="hero-cta rim-glow"
            onClick={() => window.scrollBy({ top: window.innerHeight * 1.5, behavior: 'smooth' })}
            style={{
              background: 'var(--naruto-orange)',
              color: '#08090d',
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              letterSpacing: '0.1em',
              padding: '14px 32px',
              border: 'none',
              borderRadius: 2,
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseOver={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseOut={e => (e.currentTarget.style.transform = '')}
          >
            VIEW PROJECTS
          </button>
          <button
            className="hero-cta"
            onClick={() => window.scrollBy({ top: window.innerHeight * 4, behavior: 'smooth' })}
            style={{
              background: 'transparent',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              letterSpacing: '0.1em',
              padding: '14px 32px',
              border: '1px solid rgba(232,125,43,0.35)',
              borderRadius: 2,
              cursor: 'pointer',
              transition: 'border-color 0.2s, transform 0.2s',
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--naruto-orange)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(232,125,43,0.35)'; e.currentTarget.style.transform = ''; }}
          >
            CONTACT ME
          </button>
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll-hint"
          style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 30, height: 1, background: 'rgba(232,125,43,0.4)' }} />
          <span style={{ fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--naruto-orange)' }}>
            SCROLL DOWN TO TRAVERSE THE WORLD
          </span>
          <div style={{ width: 30, height: 1, background: 'rgba(232,125,43,0.4)' }} />
        </div>

        {/* Animated scroll mouse — fixed bottom center */}
        <div style={{
          position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)',
          zIndex: 50, display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 8, pointerEvents: 'none',
        }}>
          <div style={{
            width: 26, height: 40, border: '2px solid rgba(232,125,43,0.7)', borderRadius: 13,
            position: 'relative', boxShadow: '0 0 12px rgba(232,125,43,0.25)',
          }}>
            <div style={{
              width: 4, height: 8, background: 'var(--naruto-orange)', borderRadius: 2,
              position: 'absolute', top: 6, left: '50%',
              transform: 'translateX(-50%)',
              animation: 'scrollWheel 1.4s ease-in-out infinite',
            }} />
          </div>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.18em', color: 'rgba(232,125,43,0.7)',
            textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>SCROLL</span>
        </div>
        <style>{`
          @keyframes scrollWheel {
            0%   { opacity: 1;   transform: translateX(-50%) translateY(0); }
            60%  { opacity: 0.2; transform: translateX(-50%) translateY(14px); }
            100% { opacity: 0;   transform: translateX(-50%) translateY(14px); }
          }
        `}</style>
      </div>
    </section>
  );
};

export default HeroSection;
