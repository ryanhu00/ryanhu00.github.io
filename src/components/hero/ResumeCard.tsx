import React from 'react';
import GlowBox from '../ui/BorderGlow/GlowBox';
import { about } from '../../data/content';

const ResumeCard: React.FC = () => {
  return (
    <GlowBox className="resume-card" borderRadius={16} glowRadius={22} fillOpacity={0.28}>
      <div className="resume-card-text">
        <span className="resume-card-meta">Last updated {about.resume.updated}</span>
        <span className="resume-card-title">Resume</span>
      </div>
      <div className="resume-card-icons">
        <a
          href={about.resume.href}
          target="_blank"
          rel="noopener noreferrer"
          title="View Resume"
          aria-label="View Resume"
        >
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="7" />
            <line x1="22" y1="21" x2="17.65" y2="16.65" />
          </svg>
        </a>
        <a
          href={about.resume.href}
          download
          title="Download Resume"
          aria-label="Download Resume"
        >
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 5v16M19 14l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </GlowBox>
  );
};

export default ResumeCard;
