import React, { useState } from 'react';
import ResumeCard from './ResumeCard';
import SocialDock from './SocialDock';
import GlowBox from '../ui/BorderGlow/GlowBox';
import DecryptedText from '../ui/DecryptedText/DecryptedText';
import ShinyText from '../ui/ShinyText/ShinyText';
import { useTheme } from '../layout/theme';
import { about } from '../../data/content';

/** Survives Strict Mode remounts — decrypt only once per page load */
let headlineUnlocked = false;

const HeroHeadline: React.FC<{ text: string }> = ({ text }) => {
  const { isDarkMode } = useTheme();
  const [shiny, setShiny] = useState(headlineUnlocked);

  if (shiny) {
    return isDarkMode ? (
      <ShinyText
        text={text}
        className="hero-headline-line"
        shineOnHover
        followCursor
        cursorShineWidth={34}
        color="#d8d0c6"
        shineColor="#d4a0ff"
        shineCoreColor="#ffffff"
      />
    ) : (
      <ShinyText
        text={text}
        className="hero-headline-line"
        shineOnHover
        followCursor
        cursorShineWidth={28}
        color="#1c1712"
        shineColor="#bb80e0"
      />
    );
  }

  return (
    <DecryptedText
      text={text}
      animateOn="view"
      sequential
      speed={42}
      revealDirection="start"
      parentClassName="hero-headline-line"
      className="hero-decrypted"
      encryptedClassName="hero-encrypted"
      onComplete={() => {
        headlineUnlocked = true;
        setShiny(true);
      }}
    />
  );
};

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
                <HeroHeadline key={line} text={line} />
              ))}
            </h1>
            <p className="hero-supporting">{renderSupporting()}</p>

            <ResumeCard />
            <div className="hero-socials-mobile">
              <SocialDock orientation="horizontal" baseItemSize={58} magnification={78} />
            </div>
          </div>

          <div className="hero-portrait-wrap">
            <GlowBox className="hero-portrait" borderRadius={32} glowRadius={36} fillOpacity={0.4}>
              <div className="hero-portrait-inner">
                <img src={about.pfp} alt="Ryan Hu" />
              </div>
            </GlowBox>
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
