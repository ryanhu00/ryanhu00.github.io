import React from 'react';
import ResumeCard from './ResumeCard';
import SocialDock from './SocialDock';
import { about } from '../../data/content';

const Hero: React.FC = () => {
  const renderSupporting = () => {
    const { supporting, caltechHighlight } = about;
    if (!supporting.includes(caltechHighlight)) {
      return supporting;
    }

    return supporting.split(caltechHighlight).map((part, index, arr) =>
      index < arr.length - 1 ? (
        <React.Fragment key={index}>
          {part}
          <span className="accent-orange">{caltechHighlight}</span>
        </React.Fragment>
      ) : (
        <React.Fragment key={index}>{part}</React.Fragment>
      )
    );
  };

  return (
    <section id="about" className="hero-section site-section">
      <div className="hero-shell">
        <div className="hero-grid">
          <div className="hero-copy">
            <h1 className="hero-headline">
              {about.headline.map((line) => (
                <span key={line} className="hero-headline-line">
                  {line}
                </span>
              ))}
            </h1>
            <p className="hero-supporting">{renderSupporting()}</p>

            <ResumeCard />
            <div className="hero-socials-mobile">
              <SocialDock orientation="horizontal" baseItemSize={58} magnification={78} />
            </div>
          </div>

          <div className="hero-portrait-wrap">
            <div className="hero-portrait">
              <div className="hero-portrait-inner">
                <img src={about.pfp} alt="Ryan Hu" />
              </div>
            </div>
            <div className="hero-socials-desktop">
              <SocialDock orientation="vertical" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
