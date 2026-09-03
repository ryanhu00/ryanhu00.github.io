import React, { useCallback, useState } from 'react';
import Section from '../layout/Section';
import MagicBento from '../ui/MagicBento/MagicBento';
import LogoLoop, { LogoItem } from '../ui/LogoLoop/LogoLoop';
import { leadership, techData, workExperience, type TechItem } from '../../data/content';
import { useTheme } from '../layout/theme';

const toLogoItems = (items: TechItem[]): LogoItem[] =>
  items.map((item) => ({
    src: item.icon,
    alt: item.name,
    title: item.name,
  }));

const TechLogo: React.FC<{ item: LogoItem }> = ({ item }) => {
  if (!('src' in item)) return null;
  const name = item.title || item.alt || '';

  return (
    <span className="tech-logo" data-tech-name={name}>
      <img src={item.src} alt={name} draggable={false} />
    </span>
  );
};

const TechColumn: React.FC<{
  label: string;
  items: TechItem[];
  direction: 'up' | 'down';
  speed: number;
}> = ({ label, items, direction, speed }) => (
  <div className="tech-loop-col">
    <h4>{label}</h4>
    <div className="tech-loop-frame">
      <LogoLoop
        logos={toLogoItems(items)}
        direction={direction}
        speed={speed}
        logoHeight={32}
        gap={22}
        fadeOut
        scaleOnHover
        pauseOnHover
        ariaLabel={label}
        renderItem={(item) => <TechLogo item={item} />}
      />
    </div>
  </div>
);

const Experience: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [tip, setTip] = useState<{ name: string; x: number; y: number } | null>(null);

  const handleTechMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const target = (event.target as HTMLElement).closest('[data-tech-name]') as HTMLElement | null;
    if (!target) {
      setTip(null);
      return;
    }
    setTip({
      name: target.dataset.techName || '',
      x: event.clientX,
      y: event.clientY,
    });
  }, []);

  const handleTechLeave = useCallback(() => {
    setTip(null);
  }, []);

  return (
    <Section id="experience" title="Experience">
      <MagicBento
        className="experience-bento"
        enableSpotlight={false}
        enableTilt={false}
        enableStars={false}
        enableMagnetism
        spotlightRadius={290}
        clickEffect={false}
        glowColor={isDarkMode ? '187, 128, 224' : '139, 79, 184'}
      >
        <article className="magic-bento-card experience-card--tech">
          <div className="magic-bento-card__header">
            <h3 className="magic-bento-card__label">Tech Stack</h3>
          </div>
          <div className="magic-bento-card__body">
            <div
              className="tech-loop-grid"
              onMouseMove={handleTechMove}
              onMouseLeave={handleTechLeave}
            >
              <TechColumn label="Languages" items={techData.languages} direction="up" speed={42} />
              <TechColumn label="Tools" items={techData.tools} direction="down" speed={36} />
              <TechColumn label="Frameworks" items={techData.frameworks} direction="up" speed={48} />
            </div>
          </div>
        </article>

        <article className="magic-bento-card experience-card--leadership">
          <div className="magic-bento-card__header">
            <h3 className="magic-bento-card__label">Leadership, Activities, & Awards</h3>
          </div>
          <div className="magic-bento-card__body">
            <ul className="plain-list">
              {leadership.map((item) => (
                <li key={item.title}>
                  <span className="list-title">{item.title}</span>
                  <span className="list-meta">{item.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article className="magic-bento-card experience-card--work" data-lenis-prevent>
          <div className="magic-bento-card__header">
            <h3 className="magic-bento-card__label">Work Experience</h3>
          </div>
          <div className="magic-bento-card__body">
            <ul className="plain-list work-list">
              {workExperience.map((item) => (
                <li key={`${item.title}-${item.date}`}>
                  <span className="list-title">{item.title}</span>
                  <span className="list-meta">{item.date}</span>
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </MagicBento>

      {tip ? (
        <div
          className="tech-cursor-label dock-label"
          role="tooltip"
          style={{ left: tip.x + 14, top: tip.y - 12 }}
        >
          {tip.name}
        </div>
      ) : null}
    </Section>
  );
};

export default Experience;
