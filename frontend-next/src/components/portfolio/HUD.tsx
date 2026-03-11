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
  void (panel as HTMLElement).offsetWidth; // force reflow
  panel.className = mode === 'rapid'
    ? 'page-flip-panel rapid-flick'
    : 'page-flip-panel flipping-out';
};

const HUD = () => {
  const [active, setActive]   = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    TOC_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const fastTravel = (id: string) => {
    setMenuOpen(false);
    const target = document.getElementById(id);
    if (!target) return;
    const idx = TOC_ITEMS.findIndex(t => t.id === id);
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const targetScroll = (idx / (TOC_ITEMS.length - 1)) * totalHeight;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const currentIdx = TOC_ITEMS.findIndex(t => t.id === active);
  const pageNum = currentIdx + 1;

  return (
    <>
      {/* 3D Page Flip Panel */}
      <div className="page-flip-overlay" aria-hidden="true">
        <div id="page-flip-panel" className="page-flip-panel" />
      </div>

      {/* Paper grain overlay */}
      <div className="paper-grain" aria-hidden="true" />

      {/* Book margin frame */}
      <div className="book-margin-frame" aria-hidden="true" />

      {/* Corner bracket ornaments */}
      {(['tl','tr','bl','br'] as const).map(pos => (
        <svg key={pos} className={`book-corner book-corner--${pos}`}
          viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <path d="M2 2 L2 16 M2 2 L16 2" stroke="rgba(232,125,43,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="2" cy="2" r="1.5" fill="rgba(232,125,43,0.4)" />
        </svg>
      ))}

      {/* Page numbers */}
      <div className="page-number page-number--left" aria-hidden="true">
        BUGINGO ERIC DERICK
      </div>
      <div className="page-number page-number--right" aria-hidden="true">
        {String(pageNum).padStart(2,'0')} / {String(TOC_ITEMS.length).padStart(2,'0')}
      </div>

      {/* ToC Navbar */}
      <nav className="toc-navbar" role="navigation" aria-label="Table of Contents">
        <div className="toc-title no-select">
          <span className="toc-title__sigil">B · E · D</span>
          <span className="toc-title__sub">The Portfolio — Vol. I</span>
        </div>

        <ul className="toc-links">
          {TOC_ITEMS.map(({ id, label, num }) => (
            <li key={id}
              className={`toc-item${active === id ? ' active' : ''}`}
              onClick={() => fastTravel(id)}
              role="button" tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && fastTravel(id)}>
              <span className="toc-item__num">{num}</span>
              <span className="toc-item__label">{label}</span>
            </li>
          ))}
        </ul>

        <button onClick={() => setMenuOpen(v => !v)} className="mobile-menu-btn"
          aria-label="Toggle menu"
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
            stroke="rgba(232,125,43,0.8)" strokeWidth="1.5">
            {menuOpen
