import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import AmbientBackground from './AmbientBackground';
import './App.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import rhuLogoBlack from './assets/rhu_logo_b.png';
import rhuLogoWhite from './assets/rhu_logo_w.png';
import pfp from './assets/pfp.png';
import python from './assets/logos/Python_logo.png';
import java from './assets/logos/Java_logo.png';
import c from './assets/logos/C_logo.png';
import javascript from './assets/logos/Javascript_logo.png';
import cpp from './assets/logos/C++_logo.png';
import typescript from './assets/logos/Typescript_logo.png';
import css from './assets/logos/CSS3_logo.png';
import html from './assets/logos/HTML5_logo.png';
import latex from './assets/logos/latex_logo.png';
import git from './assets/logos/git_logo.png';
import vscode from './assets/logos/VScode_logo.png';
import linux from './assets/logos/linux_logo.png';
import aws from './assets/logos/aws_logo.png';
import docker from './assets/logos/docker_logo.png';
import kubernetes from './assets/logos/kubernetes_logo.png';
import figma from './assets/logos/figma_logo.png';
import pytorch from './assets/logos/pytorch_logo.png';
import opencv from './assets/logos/opencv_logo.png';
import numpy from './assets/logos/numpy_logo.png';
import scikit from './assets/logos/scikit-learn_logo.png';
import plotly from './assets/logos/plotly_logo.png';
import react from './assets/logos/react_logo.png';
import node from './assets/logos/nodejs_logo.png';
import keras from './assets/logos/keras_logo.png';
import tensorflow from './assets/logos/tensorflow_logo.png';
import tailwind from './assets/logos/tailwind_logo.png';
import runningdogvideo from './assets/project_images/running_dog_demo.mp4';
import visualanemometry from './assets/project_images/visual_anemometry.png';
import stocktrading from './assets/project_images/stock_trading.jpg';
import aginghiv from './assets/project_images/aging_hiv.jpg';


// Create the responsive grid layout component
const ResponsiveReactGridLayout = WidthProvider(Responsive);

// Grid layout configuration
const layouts = {
  lg: [
    { i: 'project-1', x: 0, y: 0, w: 6, h: 4 },
    { i: 'project-2', x: 6, y: 0, w: 6, h: 4 },
    { i: 'project-3', x: 0, y: 4, w: 6, h: 4 },
    { i: 'project-4', x: 6, y: 4, w: 6, h: 4 },
  ],
  md: [
    { i: 'project-1', x: 0, y: 0, w: 5, h: 4 },
    { i: 'project-2', x: 5, y: 0, w: 5, h: 4 },
    { i: 'project-3', x: 0, y: 4, w: 5, h: 4 },
    { i: 'project-4', x: 5, y: 4, w: 5, h: 4 },
    { i: 'project-5', x: 0, y: 8, w: 5, h: 4 }
  ],
  sm: [
    { i: 'project-1', x: 0, y: 0, w: 3, h: 4 },
    { i: 'project-2', x: 3, y: 0, w: 3, h: 4 },
    { i: 'project-3', x: 0, y: 4, w: 3, h: 4 },
    { i: 'project-4', x: 3, y: 4, w: 3, h: 4 },
  ],
  xs: [
    { i: 'project-1', x: 0, y: 0, w: 4, h: 4 },
    { i: 'project-2', x: 0, y: 4, w: 4, h: 4 },
    { i: 'project-3', x: 0, y: 8, w: 4, h: 4 },
    { i: 'project-4', x: 0, y: 12, w: 4, h: 4 },
  ]
};

// Experience section grid layout configuration
const experienceLayouts = {
  lg: [
    { i: 'education', x: 0, y: 0, w: 6, h: 6 },
    { i: 'tech-stack', x: 0, y: 6, w: 6, h: 5 },
    { i: 'work-experience', x: 6, y: 0, w: 6, h: 11 },
  ],
  md: [
    { i: 'education', x: 0, y: 0, w: 5, h: 6 },
    { i: 'tech-stack', x: 0, y: 6, w: 5, h: 5 },
    { i: 'work-experience', x: 5, y: 0, w: 5, h: 11 },
  ],
  sm: [
    { i: 'education', x: 0, y: 8, w: 6, h: 6 },
    { i: 'tech-stack', x: 0, y: 14, w: 6, h: 5 },
    { i: 'work-experience', x: 0, y: 0, w: 6, h: 8 },
  ],
  xs: [
    { i: 'work-experience', x: 0, y: 0, w: 4, h: 8 },
    { i: 'education', x: 0, y: 8, w: 4, h: 6 },
    { i: 'tech-stack', x: 0, y: 14, w: 4, h: 5 },
  ]
};

// Tech stack data
const techData = {
  languages: [
    { name: 'Python', icon: <img src={python} alt="Python" style={{ height: '55px', width: 'auto' }} /> },
    { name: 'Java', icon: <img src={java} alt="Java" style={{ height: '55px', width: 'auto' }} /> },
    { name: 'C', icon: <img src={c} alt="C" style={{ height: '55px', width: 'auto' }} /> },
    { name: 'JavaScript', icon: <img src={javascript} alt="JavaScript" style={{ height: '55px', width: 'auto' }} /> },
    { name: 'C++', icon: <img src={cpp} alt="C++" style={{ height: '55px', width: 'auto' }} /> },
    { name: 'TypeScript', icon: <img src={typescript} alt="TypeScript" style={{ height: '55px', width: 'auto' }} /> },
    { name: 'CSS3', icon: <img src={css} alt="CSS3" style={{ height: '55px', width: 'auto' }} /> },
    { name: 'HTML5', icon: <img src={html} alt="HTML5" style={{ height: '55px', width: 'auto' }} /> },
    { name: 'LaTeX', icon: <img src={latex} alt="LaTeX" style={{ height: '55px', width: 'auto' }} /> },
  ],
  tools: [
    { name: 'Git', icon: <img src={git} alt="Git" style={{ height: '55px', width: 'auto' }} /> },
    { name: 'VS Code', icon: <img src={vscode} alt="VS Code" style={{ height: '55px', width: 'auto' }} /> },
    { name: 'Linux', icon: <img src={linux} alt="Linux" style={{ height: '55px', width: 'auto' }} /> },
    { name: 'AWS', icon: <img src={aws} alt="AWS" style={{ height: '55px', width: 'auto' }} /> },
    { name: 'Docker', icon: <img src={docker} alt="Docker" style={{ height: '55px', width: 'auto' }} /> },
    { name: 'Kubernetes', icon: <img src={kubernetes} alt="Kubernetes" style={{ height: '55px', width: 'auto' }} /> },
    { name: 'Figma', icon: <img src={figma} alt="Figma" style={{ height: '55px', width: 'auto' }} /> },
  ],
  frameworks: [
    { name: 'Pytorch', icon: <img src={pytorch} alt="PyTorch" style={{ height: '55px', width: 'auto' }} /> },
    { name: 'OpenCV', icon: <img src={opencv} alt="OpenCV" style={{ height: '55px', width: 'auto' }} /> },
    { name: 'NumPy', icon: <img src={numpy} alt="NumPy" style={{ height: '55px', width: 'auto' }} /> },
    { name: 'Scikit-learn', icon: <img src={scikit} alt="Scikit-learn" style={{ height: '55px', width: 'auto' }} /> },
    { name: 'Plotly', icon: <img src={plotly} alt="Plotly" style={{ height: '55px', width: 'auto' }} /> },
    { name: 'React.js', icon: <img src={react} alt="React.js" style={{ height: '55px', width: 'auto' }} /> },
    { name: 'Node.js', icon: <img src={node} alt="Node.js" style={{ height: '55px', width: 'auto' }} /> },
    { name: 'Keras', icon: <img src={keras} alt="Keras" style={{ height: '55px', width: 'auto' }} /> },
    { name: 'TensorFlow', icon: <img src={tensorflow} alt="TensorFlow" style={{ height: '55px', width: 'auto' }} /> },
    { name: 'Tailwind', icon: <img src={tailwind} alt="Tailwind" style={{ height: '55px', width: 'auto' }} /> },
  ]
};

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
];

// Tech Stack Component with tooltip management
const TechStack: React.FC = () => {
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: '' });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTooltipShow = (e: React.MouseEvent, name: string) => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    setTooltip({
      visible: true,
      x: e.clientX - containerRect.left + 15,
      y: e.clientY - containerRect.top - 35,
      text: name
    });
  };

  const handleTooltipMove = (e: React.MouseEvent) => {
    if (tooltip.visible && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      setTooltip(prev => ({
        ...prev,
        x: e.clientX - containerRect.left + 15,
        y: e.clientY - containerRect.top - 35
      }));
    }
  };

  const handleTooltipHide = () => {
    setTooltip({ visible: false, x: 0, y: 0, text: '' });
  };

  return (
    <div ref={containerRef} className="tech-stack">
        <div className="tech-stack-header">
          <div className="tech-stack-icon">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#bb80e0" opacity="0.9"/>
              <path d="M2 7L12 12L22 7L12 12L2 17L12 22L22 17" fill="none" stroke="#bb80e0" strokeWidth="0.5"/>
              <path d="M2 12l10 5 10-5-10-3-10 3z" fill="#bb80e0" />
              <path d="M2 17l10 5 10-5-10-3-10 3z" fill="#bb80e0" />
            </svg>
          </div>
          <h3>Tech Stack</h3>
        </div>
        
        <div className="tech-stack-content">
          <div className="tech-stack-column">
            <h4>Languages</h4>
            <TechCarousel 
              items={techData.languages} 
              onTooltipShow={handleTooltipShow}
              onTooltipMove={handleTooltipMove}
              onTooltipHide={handleTooltipHide}
            />
          </div>
          
          <div className="tech-stack-divider"></div>
          
          <div className="tech-stack-column">
            <h4>Tools</h4>
            <TechCarousel 
              items={techData.tools} 
              onTooltipShow={handleTooltipShow}
              onTooltipMove={handleTooltipMove}
              onTooltipHide={handleTooltipHide}
            />
          </div>
          
          <div className="tech-stack-divider"></div>
          
          <div className="tech-stack-column">
            <h4>Frameworks</h4>
            <TechCarousel 
              items={techData.frameworks} 
              onTooltipShow={handleTooltipShow}
              onTooltipMove={handleTooltipMove}
              onTooltipHide={handleTooltipHide}
            />
        </div>
      </div>
      
      {/* Tooltip moved inside tech-stack container */}
      {tooltip.visible && (
        <div 
          className="tech-tooltip visible"
          style={{ 
            left: tooltip.x, 
            top: tooltip.y
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
};

// Tech Carousel Component
const TechCarousel: React.FC<{ 
  items: Array<{name: string, icon: React.ReactNode}>;
  onTooltipShow: (e: React.MouseEvent, name: string) => void;
  onTooltipMove: (e: React.MouseEvent) => void;
  onTooltipHide: () => void;
}> = ({ items, onTooltipShow, onTooltipMove, onTooltipHide }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [items.length]);

  const getIconClass = (index: number) => {
    const diff = (index - currentIndex + items.length) % items.length;
    if (diff === 0) return 'lead';
    if (diff === items.length - 1) return 'prev';
    if (diff === 1) return 'next';
    return 'hidden';
  };

  return (
    <div className="tech-carousel">
      <div className="tech-carousel-track">
        {items.map((item, index) => (
          <div
            key={index}
            className={`tech-icon ${getIconClass(index)}`}
            onMouseEnter={(e) => onTooltipShow(e, item.name)}
            onMouseMove={onTooltipMove}
            onMouseLeave={onTooltipHide}
          >
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      className="dark-mode-toggle"
      onClick={toggleTheme}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
        </svg>
      ) : (
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"/>
        </svg>
      )}
    </button>
  );
};

const Website: React.FC = () => {
  const [active, setActive] = useState('about');
  const [currentBreakpoint, setCurrentBreakpoint] = useState('lg');
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const sections = ['about', 'experience', 'projects'];
    const observers: IntersectionObserver[] = [];

    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                setActive(sectionId);
              }
            });
          },
          { 
            threshold: 0.5,
            rootMargin: '-64px 0px -64px 0px' 
          }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const handleNavClick = (id: string) => {
    setActive(id);
    if (id === 'about') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      <AmbientBackground />
      
      {/* Navbar */}
      <nav className="pill-navbar">
        <div className="pill-navbar-inner">
          <div className="pill-navbar-left">
            <img src={isDarkMode ? rhuLogoWhite : rhuLogoBlack} alt="Rhu Logo" className="pill-navbar-logo" />
            <ul className="pill-navbar-links">
              {NAV_LINKS.map(link => (
                <li key={link.id}>
                  <button
                    className={`pill-navbar-link${active === link.id ? ' active' : ''}`}
                    onClick={() => handleNavClick(link.id)}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <DarkModeToggle />
        </div>
      </nav>

      {/* About Section */}
      <section id="about" className="about-section">
        {/* Name Text */}
        <div className="name-text-container">
          <div className="name-text">
            <h1>Hi! I'm<span className="name-break"><br /></span> Ryan Hu!</h1>
          </div>
        </div>

        {/* Home Arrow */}
        <div className="home-arrow-container">
          <svg className="home-arrow" width="400" height="400" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 500 130 C 300 0, 100 400, 0 90" stroke="black" strokeWidth="3" fill="none" strokeDasharray="8,8" markerEnd="url(#arrowhead)" />
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="black" />
              </marker>
            </defs>
          </svg>
        </div>

        <div className="profile-circle-container">
          {/* Profile Circle */}
          <div className="profile-circle">
            <img src={pfp} alt="Profile" className="profile-img" />
          </div>

          {/* Social Media Circles */}
          <div className="social-circles">
            {/* GitHub */}
            <a href="https://github.com/ryanhu00" target="_blank" rel="noopener noreferrer" className="social-circle"> 
              <svg width="50" height="50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/ryanhu2" target="_blank" rel="noopener noreferrer" className="social-circle">
              <svg width="50" height="50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            {/* Email */}
            <a href="mailto:ryanrhu00@gmail.com" className="social-circle">
              <svg width="50" height="50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-10 5L2 7"/>
              </svg>
            </a>
            {/* X */}
            <a href="https://x.com/ryanrhu00" target="_blank" rel="noopener noreferrer" className="social-circle">
              <svg width="50" height="50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Intro Text */}
        <div className="intro-text-container">
          <div className="intro-text">
            <p>Currently Studying @ <span className="caltech-orange">Caltech</span> <br /> Pursuing a BS in Computer Science <br /> with a minor in Mathematics. Passionate <br /> about AI/Machine Learning and <br />  Software Engineering. Looking <br /> for 2026 Internships.</p>
          </div>
        </div>

        {/* Resume Card */}
        <div className="resume-card-container">
          <div className="resume-card">
            <div className="resume-card-header">
              <span className="resume-card-meta">Last Updated: June 2025</span>
            </div>
            <div className="resume-card-title-row">
              <div className="resume-card-title">Resume</div>
              <div className="resume-card-icons">
                <a href="/Ryan_Hu_Resume.pdf" target="_blank" rel="noopener noreferrer" title="View Resume">
                  <svg width="32" height="32" fill="none" stroke="#bb80e0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </a>
                <a href="/Ryan_Hu_Resume.pdf" download title="Download Resume">
                  <svg width="32" height="32" fill="none" stroke="#bb80e0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience-section">
        <div className="section-title-block">
              <h2>Experience</h2>
        </div>

        <div className="experience-grid-container">
          <ResponsiveReactGridLayout
            className="experience-grid"
            layouts={experienceLayouts}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4 }}
            rowHeight={80}
            margin={[16, 16]}
            containerPadding={[20, 20]}
            isDraggable={false}
            isResizable={false}
          >
            
            {/* Education Timeline */}
            <div key="education" className="education-timeline">
              <div className="education-header">
                <div className="education-icon">
                  <svg width="24" height="24" fill="#bb80e0" viewBox="0 0 24 24">
                    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6L23 9l-11-6zM18.82 9L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                  </svg>
                </div>
                <h3>Education</h3>
              </div>
              
              <div className="education-timeline-content">
                <div className="education-timeline-wrapper">
                  <div className="education-timeline-line">
                    <div className="education-timeline-pin education-timeline-pin-left">
                      <svg width="40" height="40" fill="#bb80e0" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <div className="education-timeline-connector education-timeline-connector-top"></div>
                      <div className="education-timeline-text-box education-timeline-text-box-top">
                        <h4>California Institute of Technology (Caltech)</h4>
                        <p className="education-timeline-date">2023 - 2027</p>
                        <p className="education-timeline-degree"><i>Bachelor of Science in Computer Science, Minor in Mathematics - 4.2/4.0 GPA</i></p>
                        <p className="education-timeline-details"> <u>Relevant Coursework:</u> Computer Programming, Programming Methods, Software Design, Deep Learning, Learning Systems, Machine Learning & Data Mining, Decidability and Tractability, Algorithms, Computing Systems, Differential Equations, Probability and Statistics, Calculus of One and Several Variables and Linear Algebra</p>
                        <p className="education-timeline-details"> <u>Activities:</u> NCAA D3 Men's Basketball, Peer Academic Coach </p>
        
                      </div>
                    </div>
                    <div className="education-timeline-pin education-timeline-pin-right">
                      <svg width="40" height="40" fill="#bb80e0" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <div className="education-timeline-connector education-timeline-connector-bottom"></div>
                      <div className="education-timeline-text-box education-timeline-text-box-bottom">
                        <h4>Newport High School</h4>
                        <p className="education-timeline-date">2019 - 2023</p>
                        <p className="education-timeline-degree"><i>High School Diploma - 4.0/4.0 GPA</i></p>
                        <p className="education-timeline-details"> SAT: 1560/1600, ACT: 36/36, PSAT/NMSQT: 1480/1520 </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tech Stack */}
            <div key="tech-stack">
              <TechStack />
            </div>

            {/* Work Experience Timeline */}
            <div key="work-experience" className="experience-timeline">
              <div className="experience-timeline-header">
                <div className="experience-timeline-icon">
                  <svg width="24" height="24" fill="#bb80e0" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3>Work Experience</h3>
              </div>
              
              <div className="experience-timeline-content">
                <div className="experience-timeline-item">
                  <div className="experience-timeline-dot"></div>
                  <div className="experience-timeline-details">
                    <h4>Tracevision - Software Engineer Intern</h4>
                    <p className="experience-timeline-date">April 2025 - Present</p>
                    <p className="experience-timeline-description">Working in the Math Team on geospatial API development and production tool infrastructure.
                      Developing scripts and pipelines to process and integrate location data for proofs-of-concept and real-world deployment in security and retail sectors.</p>
                  </div>
                </div>
                
                <div className="experience-timeline-item">
                  <div className="experience-timeline-dot"></div>
                  <div className="experience-timeline-details">
                    <h4>Caltech Alvarez Lab - Machine Learning Researcher</h4>
                    <p className="experience-timeline-date">February 2025 - Present</p>
                    <p className="experience-timeline-description">Collaborating with Activision to develop methods for toxic, anomalous, and outlier player behavior detection in competitive action games. 
                      Utilizing auto-encoders, feature subspaces, and clustering techniques to build a robust machine learning framework for detecting and addressing unusual player behavior.</p>
                  </div>
                </div>
                
                <div className="experience-timeline-item">
                  <div className="experience-timeline-dot"></div>
                  <div className="experience-timeline-details">
                    <h4>Caltech - Teaching Assistant </h4>
                    <p className="experience-timeline-date">January 2025 - Present</p>
                    <p className="experience-timeline-description">CS21: Decidability and Tractability: Covering automata, Turing machines, decidability, time complexity reductions between computational problems, and NP-completeness. 
                      Office hours tailored towards teaching computer science proof-writing for algorithms, focusing on problem-solving techniques, formal logic, and complexity analysis.</p>
                  </div>
                </div>
                
                <div className="experience-timeline-item">
                  <div className="experience-timeline-dot"></div>
                  <div className="experience-timeline-details">
                    <h4>Caltech Alvarez Lab - Machine Learning Researcher</h4>
                    <p className="experience-timeline-date">Sep 2024 - Dec 2024</p>
                    <p className="experience-timeline-description">Investigated the role of climate change, air pollution, and epigenetics in the aging of people with HIV in collaboration with UCLA. 
                      Employed multiple causal machine learning models to analyze relationships between various sociodemographic, climate, and air quality factors with different measures of aging. </p>
                  </div>
                </div>

                <div className="experience-timeline-item">
                  <div className="experience-timeline-dot"></div>
                  <div className="experience-timeline-details">
                    <h4>Caltech GALCIT Lab - Undergraduate Researcher </h4>
                    <p className="experience-timeline-date">Dec 2024 - Feb 2025</p>
                    <p className="experience-timeline-description">Investigated a novel method called visual anemometry that diverts from traditional approaches by taking advantage of visual cues of our environment to analyze and predict wind speed patterns.</p>
                  </div>
                </div>
              </div>

            </div>

          </ResponsiveReactGridLayout>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="section-title-block">
          <h2>Projects</h2>
        </div>
        
        <div className="projects-grid-container">
          <ResponsiveReactGridLayout
            className="projects-grid"
            layouts={layouts}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4 }}
            rowHeight={100}
            margin={[48, 20]}
            containerPadding={[20, 20]}
            isDraggable={currentBreakpoint === 'lg' || currentBreakpoint === 'md' || currentBreakpoint === 'sm'}
            isResizable={false}
            draggableCancel=".project-button, .project-buttons"
            onBreakpointChange={(breakpoint) => setCurrentBreakpoint(breakpoint)}
          >
            
            <div key="project-1" className="project-card">
              <div className="project-card-content">
                <div className="project-image-container">
                  <img 
                    src={stocktrading} 
                    alt="Agentic Stock Trader"
                    className="project-image"
                  />
                </div>
                <div className="project-text-content">
                  <div className="project-info">
                    <h3>Agentic Stock Trader</h3>
                    <p>Multi-agent financial reasoning framework that uses Large Language Models (LLMs) to make short-term stock trading decisions.  
                       Agents dynamically ingest, debate, and reason over financial data to output explainable decisions.</p>
                  </div>
                  <div className="project-buttons">
                    <a className="project-button" href="https://github.com/Z4KH/brainrot" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                      Code
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7zM19 19H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div key="project-2" className="project-card">
              <div className="project-card-content">
                <div className="project-image-container">
                  <img 
                    src={aginghiv} 
                    alt="Aging in people with HIV"
                    className="project-image"
                  />
                </div>
                <div className="project-text-content">
                  <div className="project-info">
                    <h3>Impact of Socioeconomic Factors on HIV Aging (In Progress)</h3>
                    <p> Applying machine learning techniques to analyze the impact of traditional epigenetic factors in addition to socioeconomic factors, 
                        such as air quality and temperature, on the aging of people with HIV. Primarily employed gradient boosting trees (XGBoost) for causal inference. Currently authoring a paper on the results of our analysis. </p>
                  </div>
                  <div className="project-buttons">
                  </div>
                </div>
              </div>
            </div>

            <div key="project-3" className="project-card">
              <div className="project-card-content">
                <div className="project-image-container">
                  <video 
                    className="project-image"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'fill'
                    }}
                  >
                    <source src={runningdogvideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="project-text-content">
                  <div className="project-info">
                    <h3>Running Dog </h3>
                    <p>Google Dino Run-inspired endless runner game featuring obstacles, power-ups, and progressive difficulty scaling. Written from scratch entirely in C.</p>
                  </div>
                  <div className="project-buttons">
                    <a className="project-button" 
                      href="https://ryanhu00.github.io/RD/"
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}>
                      Demo
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7zM19 19H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7z"/>
                      </svg>
                    </a>
                    <a className="project-button" 
                        href="https://github.com/ryanhu00/Running-Dog"
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}>
                        Code
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7zM19 19H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7z"/>
                        </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div key="project-4" className="project-card">
              <div className="project-card-content">
                <div className="project-image-container">
                    <img 
                     src={visualanemometry} 
                     alt="Visual Anemometry"
                      className="project-image"
                    />
                </div>
                <div className="project-text-content">
                  <div className="project-info">
                    <h3>Visual Anemometry</h3>
                    <p>Full-stack chat application with WebSocket support, user authentication, and message encryption. Built with Node.js and React.</p>
                  </div>
                  <div className="project-buttons">
                    <a className="project-button" href="/Estimating_Wind_Speeds_with_Visual_Anemometry.pdf" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                      Project
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7zM19 19H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7z"/>
                      </svg>
                    </a>
                    <a className="project-button" href="https://github.com/ryanhu00/Visual-Anemometry" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                      Code
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7zM19 19H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </ResponsiveReactGridLayout>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        {/* Social Media Circles */}
        <div className="footer-social-circles">
          {/* GitHub */}
          <a href="https://github.com/ryanhu00" target="_blank" rel="noopener noreferrer" className="footer-social-circle">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          {/* LinkedIn */}
          <a href="https://www.linkedin.com/in/ryanhu2" target="_blank" rel="noopener noreferrer" className="footer-social-circle">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          {/* Email */}
          <a href="mailto:ryanrhu00@gmail.com" className="footer-social-circle">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-10 5L2 7"/>
            </svg>
          </a>
          {/* X */}
          <a href="https://x.com/ryanrhu00" target="_blank" rel="noopener noreferrer" className="footer-social-circle">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
            </svg>
          </a>
        </div>
        
        {/* Footer Line */}
        <div className="footer-line"></div>
        
        {/* Footer Text */}
        <div className="footer-content">
          <p className="footer-description">
            Website built with <strong>React.js</strong> and <strong>TypeScript</strong>. Experience and project section layouts based on <strong>React-Grid-Layout</strong>. 
            <br></br>Background inspired by <strong>crnacura's <a href="https://github.com/crnacura/AmbientCanvasBackgrounds" style={{ color: isDarkMode ? 'white' : 'black' }}> AmbientCanvasBackgrounds </a></strong>. </p>
          <p className="footer-copyright">
            <strong>© 2025 Ryan R. Hu.</strong>
          </p>
        </div>
      </footer>
    </div>
  );
};

const WebsiteWithTheme: React.FC = () => {
  return (
    <ThemeProvider>
      <Website />
    </ThemeProvider>
  );
};

export default WebsiteWithTheme; 