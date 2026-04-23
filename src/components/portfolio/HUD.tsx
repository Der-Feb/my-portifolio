import { useEffect, useState } from 'react';

const TOC_ITEMS = [
  { id: 'hero',      label: 'Home',        num: 'I'   },
  { id: 'library',  label: 'Projects',     num: 'II'  },
  { id: 'restobar', label: 'Testimonials', num: 'III' },
  { id: 'booth',    label: 'Contact',      num: 'IV'  },
];

export const triggerPageFlip = (mode: 'rapid' | 'section' = 'rapid') => {
  const panel = document.getElementById('page-flip-panel');
  if (!panel) return;
  panel.className = 'page-flip-panel';
  void (panel as HTMLElement).offsetWidth; 
  panel.className = mode === 'rapid'
    ? 'page-flip-panel rapid-flick'
    : 'page-flip-panel flipping-out';
};

const HUD = () => {
  const [active, setActive] = useState('hero');
  
  // Mock availability status
  const availability = { availableForWork: true };
  const availabilityLoading = false;

  useEffect(() => {
    const handleSectionChange = (e: any) => {
      setActive(e.detail.activeId);
    };
    window.addEventListener('sectionChange', handleSectionChange as EventListener);
    return () => window.removeEventListener('sectionChange', handleSectionChange as EventListener);
  }, []);

  const fastTravel = (id: string) => {
    const idx = TOC_ITEMS.findIndex(t => t.id === id);
    const targetProgress = idx / (TOC_ITEMS.length - 1);
    
    triggerPageFlip('rapid');
    setActive(id);
    
    // Dispatch custom event for ParallaxWorld to handle jump
    window.dispatchEvent(new CustomEvent('hudJump', { 
      detail: { progress: targetProgress } 
    }));
  };

  const currentIdx = TOC_ITEMS.findIndex(t => t.id === active);
  const pageNum = currentIdx + 1;

  return (
    <>
      {/* Visual Layers */}
      <div className="page-flip-overlay" aria-hidden="true">
        <div id="page-flip-panel" className="page-flip-panel" />
      </div>

      <div className="paper-grain" aria-hidden="true" />
      <div className="book-margin-frame" aria-hidden="true" />

      {(['tl','tr','bl','br'] as const).map(pos => (
        <svg key={pos} className={`book-corner book-corner--${pos}`}
          viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <path d="M2 2 L2 12 M2 2 L12 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <circle cx="2" cy="2" r="1.2" fill="currentColor" />
        </svg>
      ))}

      <div className="page-number page-number--left" aria-hidden="true">
        BUGINGO ERIC DERICK
      </div>
      <div className="page-number page-number--right" aria-hidden="true">
        {String(pageNum).padStart(2,'0')} / {String(TOC_ITEMS.length).padStart(2,'0')}
      </div>

      {/* Navigation */}
      <nav className="toc-navbar" role="navigation">
        <div className="toc-title no-select">
          <span className="toc-title__sigil">B · E · D</span>
          <span className="toc-title__sub">The Portfolio — Vol. I</span>
        </div>

        {/* Availability Status - CENTER */}
        {!availabilityLoading && availability && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.65rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            padding: '8px 16px',
            border: availability.availableForWork 
              ? '1.5px solid var(--naruto-orange)' 
              : '1.5px solid #6b7280',
            borderRadius: '4px',
            background: availability.availableForWork
              ? 'rgba(232, 125, 43, 0.05)'
              : 'rgba(107, 114, 128, 0.05)',
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: availability.availableForWork ? 'var(--naruto-orange)' : '#6b7280',
              boxShadow: availability.availableForWork 
                ? '0 0 10px var(--naruto-orange)' 
                : '0 0 8px rgba(107, 114, 128, 0.6)',
              animation: availability.availableForWork ? 'pulse 2s ease-in-out infinite' : 'none',
            }} />
            <span style={{ 
              color: availability.availableForWork ? 'var(--naruto-orange)' : '#9ca3af',
            }}>
              {availability.availableForWork ? 'Available for Work' : 'Not Available'}
            </span>
          </div>
        )}

        {/* Section Links - RIGHT */}
        <ul className="toc-links">
          {TOC_ITEMS.map(({ id, label, num }) => (
            <li key={id} 
              className={`toc-item${active === id ? ' active' : ''}`}
              onClick={() => fastTravel(id)} 
              role="button"
            >
              <span className="toc-item__num">{num}</span>
              <span className="toc-item__label">{label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default HUD;
