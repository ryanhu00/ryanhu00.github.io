import React, { useEffect, useMemo, useState } from 'react';
import { Layouts, WidthProvider, Responsive } from 'react-grid-layout';
import Section from '../layout/Section';
import GlowBox from '../ui/BorderGlow/GlowBox';
import { projects } from '../../data/content';

const ResponsiveGrid = WidthProvider(Responsive);

const COLS = { lg: 12, md: 10, sm: 6, xs: 4 };
const BREAKPOINTS = { lg: 1200, md: 996, sm: 768, xs: 480 };
const CARD_ROWS = 4;

function layoutsFor(ids: string[]): Layouts {
  const pack = (totalCols: number, columns: number) => {
    const width = totalCols / columns;
    return ids.map((id, index) => ({
      i: id,
      x: (index % columns) * width,
      y: Math.floor(index / columns) * CARD_ROWS,
      w: width,
      h: CARD_ROWS,
    }));
  };

  return {
    lg: pack(COLS.lg, 2),
    md: pack(COLS.md, 2),
    sm: pack(COLS.sm, 2),
    xs: pack(COLS.xs, 1),
  };
}

const ExternalIcon: React.FC = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7zM19 19H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7z" />
  </svg>
);

const useProjectGrid = () => {
  const [width, setWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const lerp = (min: number, max: number, minW: number, maxW: number) =>
    Math.round(Math.min(max, Math.max(min, min + ((max - min) * (width - minW)) / (maxW - minW))));

  return {
    rowHeight: lerp(90, 96, 480, 1400),
    margin: [lerp(12, 20, 480, 1400), lerp(12, 20, 480, 1400)] as [number, number],
  };
};

const Projects: React.FC = () => {
  const grid = useProjectGrid();
  const [breakpoint, setBreakpoint] = useState('lg');
  const canDrag = breakpoint === 'lg' || breakpoint === 'md' || breakpoint === 'sm';
  const layouts = useMemo(() => layoutsFor(projects.map((project) => project.id)), []);

  return (
    <Section id="projects" title="Projects" className="projects-section">
      <ResponsiveGrid
        className="projects-grid"
        layouts={layouts}
        breakpoints={BREAKPOINTS}
        cols={COLS}
        rowHeight={grid.rowHeight}
        margin={grid.margin}
        containerPadding={[0, 0]}
        isDraggable={canDrag}
        isResizable={false}
        draggableCancel=".project-button, .project-buttons"
        onBreakpointChange={setBreakpoint}
      >
        {projects.map((project) => (
          <div key={project.id}>
            <GlowBox className="project-card" borderRadius={20}>
              <div className="project-card-content">
                <div className="project-image-container">
                  {project.media.type === 'video' ? (
                    <video
                      className="project-image"
                      autoPlay
                      loop
                      muted
                      playsInline
                      onLoadedMetadata={(e) => {
                        if (project.media.playbackRate) {
                          e.currentTarget.playbackRate = project.media.playbackRate;
                        }
                      }}
                    >
                      <source src={project.media.src} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      className="project-image"
                      src={project.media.src}
                      alt={project.media.alt || project.title}
                      style={
                        project.media.objectPosition
                          ? { objectPosition: project.media.objectPosition }
                          : undefined
                      }
                    />
                  )}
                </div>
                <div className="project-text-content">
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                  {project.links.length > 0 ? (
                    <div className="project-buttons">
                      {project.links.map((link) => (
                        <a
                          key={`${project.id}-${link.label}`}
                          className="project-button"
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {link.label}
                          <ExternalIcon />
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </GlowBox>
          </div>
        ))}
      </ResponsiveGrid>
    </Section>
  );
};

export default Projects;
