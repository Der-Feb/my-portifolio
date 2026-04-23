import { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useProjects } from '@/hooks/useProjects';
import type { Project } from '@/types/api';
import { PROJECTS as MOCK_PROJECTS } from '@/__mock__/projects';

// Generate varied heights and widths for all books
const generateHeights = (count: number) =>
  Array.from({ length: count }, (_, i) => 138 + ((i % 5) * 12));
const generateWidths = (count: number) =>
  Array.from({ length: count }, (_, i) => 40 + ((i % 4) * 6));

// ─── Modal ────────────────────────────────────────────────────────────────────

const ProjectModal = ({ project, onClose }: { project: Project | any; onClose: () => void }) => (
  createPortal(
    <div
      className="modal-overlay"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="modal-content"
        style={{ maxWidth: 640, width: '100%', padding: 0, overflow: 'hidden', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
      >
        {/* ── Header ── */}
        <div style={{ background: project.color, padding: '20px 24px 16px', position: 'relative', flexShrink: 0 }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 12, right: 12,
              background: 'rgba(0,0,0,0.35)', border: 'none', color: '#fff',
              width: 28, height: 28, borderRadius: '50%', cursor: 'pointer',
              fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >×</button>
          <span style={{ fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)', display: 'block', marginBottom: 4 }}>
            {project.subtitle}
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', color: '#fff', margin: 0, letterSpacing: '0.04em' }}>
            {project.title}
          </h2>
        </div>

        {/* ── Scrollable body ── */}
        <div style={{ overflowY: 'auto', background: 'var(--bg-surface)', flex: 1 }}>

          {/* Preview image */}
          <div style={{ width: '100%', height: 180, overflow: 'hidden', position: 'relative' }}>
            <img
              src={project.previewImage}
              alt={`${project.title} preview`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              loading="lazy"
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, var(--bg-surface) 100%)' }} />
          </div>

          <div style={{ padding: '0 24px 24px' }}>

            {/* Description */}
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.8rem', margin: '16px 0' }}>
              {project.description}
            </p>

            {/* Tech stack */}
            <div style={{ marginBottom: 20 }}>
              <span style={{ fontSize: '0.5rem', letterSpacing: '0.25em', color: project.color, textTransform: 'uppercase', display: 'block', marginBottom: 8, fontFamily: 'var(--font-body)' }}>
                TECH STACK
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {project.techStack.map((t: string) => (
                  <span key={t} style={{
                    padding: '4px 10px',
                    background: 'var(--bg-elevated)',
                    border: `1px solid ${project.color}44`,
                    borderRadius: 3,
                    fontSize: '0.65rem',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    letterSpacing: '0.05em',
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '8px 20px',
                  background: project.color,
                  color: '#08090d',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.1em',
                  borderRadius: 3,
                  display: 'flex', alignItems: 'center', gap: 6,
                }}
              >
                ⌥ VIEW CODE
              </a>
              {project.liveUrl && project.liveUrl !== '#' && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '8px 20px',
                    border: `1px solid ${project.color}66`,
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.85rem',
                    letterSpacing: '0.1em',
                    borderRadius: 3,
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}
                >
                  ↗ LIVE DEMO
                </a>
              )}
            </div>

            {/* Teammates - handle both API (partners) and mock (teammates) */}
            {((project.partners && project.partners.length > 0) || (project.teammates && project.teammates.length > 0)) && (
              <div>
                <span style={{ fontSize: '0.5rem', letterSpacing: '0.25em', color: project.color, textTransform: 'uppercase', display: 'block', marginBottom: 10, fontFamily: 'var(--font-body)' }}>
                  TEAMMATES
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {(project.partners || project.teammates)?.map((tm: any) => (
                    <div key={tm.id || tm.name} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '10px 14px',
                      background: 'var(--bg-elevated)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 4,
                    }}>
                      <div>
                        <span style={{ display: 'block', color: 'var(--text-primary)', fontSize: '0.75rem', fontWeight: 600 }}>{tm.name}</span>
                        <span style={{ fontSize: '0.6rem', color: 'var(--text-dim)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{tm.role}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {tm.links.map((lk: any) => (
                          <a
                            key={lk.label}
                            href={lk.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: '4px 10px',
                              border: `1px solid ${project.color}55`,
                              color: project.color,
                              textDecoration: 'none',
                              fontSize: '0.6rem',
                              borderRadius: 2,
                              fontFamily: 'var(--font-body)',
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                            }}
                          >
                            {lk.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
);

// ─── Book component ───────────────────────────────────────────────────────────

const Book = ({
  project, height, width, onClick,
}: {
  project: Project | any; height: number; width: number; onClick: () => void;
}) => (
  <div
    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', position: 'relative' }}
    onClick={onClick}
    title={project.title}
  >
    <div
      className="book-spine"
      style={{
        width,
        height,
        background: `linear-gradient(to right, ${project.spineColor} 0%, ${project.spineColor}dd 40%, ${project.spineColor}99 100%)`,
        borderRadius: '2px 5px 5px 2px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '10px 6px',
        writingMode: 'vertical-rl',
        boxShadow: `2px 0 8px rgba(0,0,0,0.5), inset -2px 0 6px rgba(0,0,0,0.3)`,
      }}
    >
      {/* Pages edge */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 7,
        background: 'linear-gradient(to right, rgba(255,255,255,0.18), rgba(255,255,255,0.06))',
        borderRight: '1px solid rgba(255,255,255,0.12)',
      }} />
      {/* Color accent strip */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: 4,
        background: project.color,
        opacity: 0.7,
      }} />
      {/* Title only */}
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: '0.72rem',
        letterSpacing: '0.12em',
        color: 'rgba(255,255,255,0.92)',
        transform: 'rotate(180deg)',
        textTransform: 'uppercase',
        lineHeight: 1.1,
      }}>
        {project.title}
      </span>
    </div>
    {/* Shelf plank under each book */}
    <div style={{
      width: '115%', height: 7,
      background: 'linear-gradient(to bottom, #4a3020, #2a1808)',
      borderRadius: 1,
      boxShadow: '0 4px 14px rgba(0,0,0,0.6)',
    }} />
  </div>
);

// ─── Shelf row ────────────────────────────────────────────────────────────────

const Shelf = ({
  projects, startIndex, onSelect, heights, widths,
}: {
  projects: (Project | any)[]; 
  startIndex: number; 
  onSelect: (p: Project | any) => void;
  heights: number[];
  widths: number[];
}) => (
  <div style={{ marginBottom: 28, position: 'relative' }}>
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, overflow: 'visible' }}>
      {projects.map((p, i) => {
        const globalIndex = startIndex + i;
        return (
          <Book
            key={`${globalIndex}-${p.title}`}
            project={p}
            height={heights[globalIndex]}
            width={widths[globalIndex]}
            onClick={() => onSelect(p)}
          />
        );
      })}
    </div>
  </div>
);

// ─── Section ──────────────────────────────────────────────────────────────────

const LibrarySection = () => {
  const [selected, setSelected] = useState<Project | any | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const shelvesContainerRef = useRef<HTMLDivElement>(null);

  // Fetch projects from API
  const { data: apiProjects, isLoading, error } = useProjects();

  // Use API data if available, otherwise fallback to mock data
  const projects = useMemo(() => {
    if (apiProjects && apiProjects.length > 0) {
      return apiProjects;
    }
    // Fallback to mock data if API fails or returns empty
    if (error || !apiProjects) {
      console.warn('Using mock data - API unavailable or returned no data');
      return MOCK_PROJECTS;
    }
    return [];
  }, [apiProjects, error]);

  // Split into shelves alternating between 6 and 7 books
  const { shelves, ALL_HEIGHTS, ALL_WIDTHS } = useMemo(() => {
    if (!projects || projects.length === 0) {
      return { shelves: [], ALL_HEIGHTS: [], ALL_WIDTHS: [] };
    }

    const shelves: (Project | any)[][] = [];
    let bookIndex = 0;
    let shelfSize = 6; // Start with 6
    while (bookIndex < projects.length) {
      const shelf = projects.slice(bookIndex, bookIndex + shelfSize);
      if (shelf.length > 0) {
        shelves.push(shelf);
      }
      bookIndex += shelfSize;
      shelfSize = shelfSize === 6 ? 7 : 6; // Alternate between 6 and 7
    }

    return {
      shelves,
      ALL_HEIGHTS: generateHeights(projects.length),
      ALL_WIDTHS: generateWidths(projects.length),
    };
  }, [projects]);

  // Auto-scroll effect
  useEffect(() => {
    const container = shelvesContainerRef.current;
    if (!container) return;

    // Only auto-scroll if not hovering and no modal is open
    if (isHovering || selected) return;

    const interval = setInterval(() => {
      if (container.scrollTop + container.clientHeight >= container.scrollHeight - 20) {
        // Reached bottom, scroll back to top for infinite loop
        container.scrollTop = 0;
      } else {
        // Scroll down by one full shelf height (more noticeable)
        container.scrollBy({ top: 200, behavior: 'smooth' });
      }
    }, 2500); // Scroll every 2.5 seconds

    return () => clearInterval(interval);
  }, [isHovering, selected]);

  // Show loading state only briefly
  if (isLoading && !projects.length) {
    return (
      <section
        id="library"
        className="section-room"
        style={{
          background: 'linear-gradient(180deg, #0a0b14 0%, #0d0f1e 60%, #08090d 100%)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          padding: '72px 5vw 32px',
        }}
      >
        <div style={{ color: 'var(--naruto-orange)', fontSize: '1.2rem', fontFamily: 'var(--font-display)' }}>
          LOADING ARCHIVES...
        </div>
      </section>
    );
  }

  // If we have no projects at all (shouldn't happen with fallback)
  if (!projects || projects.length === 0) {
    return (
      <section
        id="library"
        className="section-room"
        style={{
          background: 'linear-gradient(180deg, #0a0b14 0%, #0d0f1e 60%, #08090d 100%)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          padding: '72px 5vw 32px',
        }}
      >
        <div style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontFamily: 'var(--font-body)' }}>
          No projects archived yet
        </div>
      </section>
    );
  }

  return (
    <section
      id="library"
      className="section-room"
      style={{
        background: 'linear-gradient(180deg, #0a0b14 0%, #0d0f1e 60%, #08090d 100%)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '72px 5vw 32px',
      }}
    >
      {/* ── Background layers ── */}
      <div className="parallax-layer" data-parallax="0.12"
        style={{ background: 'radial-gradient(ellipse at 60% 30%, #1a1830 0%, #08090d 70%)' }} />

      {/* Bookcase wall columns */}
      <div className="parallax-layer" data-parallax="0.2"
        style={{ opacity: 0.35, display: 'flex', alignItems: 'stretch', gap: 3, padding: '0 1vw' }}>
        {Array.from({ length: 24 }, (_, i) => (
          <div key={i} style={{
            flex: 1,
            background: `rgba(${18 + i % 4 * 3},${15 + i % 3 * 2},${28 + i % 5 * 2},0.9)`,
            borderRight: '1px solid rgba(50,40,70,0.25)',
          }} />
        ))}
      </div>

      {/* Horizontal shelf lines in background */}
      <div className="parallax-layer" data-parallax="0.35" style={{ pointerEvents: 'none', opacity: 0.5 }}>
        {[22, 44, 66, 88].map((pct, i) => (
          <div key={i} style={{
            position: 'absolute', top: `${pct}%`, left: 0, right: 0, height: 3,
            background: 'linear-gradient(to right, transparent, rgba(80,55,30,0.7) 10%, rgba(80,55,30,0.7) 90%, transparent)',
          }} />
        ))}
      </div>

      <div className="fog-vignette" style={{ zIndex: 8 }} />

      {/* ── Main content ── */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%', display: 'flex', padding: '0 5vw', overflow: 'visible' }}>

        {/* Left: Description */}
        <div style={{ flex: '0 0 340px', paddingTop: '10vh' }}>
          <span style={{
            fontSize: '0.5rem', letterSpacing: '0.35em', textTransform: 'uppercase',
            color: 'var(--naruto-orange)', fontFamily: 'var(--font-body)', display: 'block', marginBottom: 6,
          }}>
            THE LIBRARY
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3.8rem)',
            lineHeight: 0.9,
            color: 'var(--text-primary)',
            textTransform: 'uppercase',
            margin: 0,
          }}>
            ARCHIVED<br />
            <span style={{ color: 'var(--naruto-orange)' }}>PROJECTS</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.72rem', marginTop: 14, lineHeight: 1.6 }}>
            Each book on the shelves represents a project. Click on any book to open its case study and explore the details.
          </p>
          <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-dim)' }}>
            <div style={{ width: 32, height: 1, background: 'currentColor', opacity: 0.4 }} />
            <span style={{ fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              CLICK TO OPEN
            </span>
          </div>
        </div>

        {/* Spacer — pushes shelves to the right */}
        <div style={{ flex: 1 }} />

        {/* Right: Shelves — aligned to right edge */}
        <div
          ref={shelvesContainerRef}
          style={{
            flex: '0 0 auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            paddingRight: '2vw',
            maxHeight: '85vh',
            overflowY: 'auto',
            overflowX: 'visible',
            scrollBehavior: 'smooth',
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {shelves.map((shelf, shelfIndex) => (
            <Shelf
              key={`shelf-${shelfIndex}`}
              projects={shelf}
              startIndex={shelves.slice(0, shelfIndex).reduce((sum, s) => sum + s.length, 0)}
              onSelect={setSelected}
              heights={ALL_HEIGHTS}
              widths={ALL_WIDTHS}
            />
          ))}
        </div>
      </div>

      {/* Floor fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 70,
        background: 'linear-gradient(to top, #08090d, transparent)',
        zIndex: 9, pointerEvents: 'none',
      }} />

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
};

export default LibrarySection;
