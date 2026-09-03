import React from 'react';
import AmbientBackground from './components/layout/AmbientBackground';
import { LenisProvider } from './components/layout/LenisProvider';
import { ThemeProvider, useTheme } from './components/layout/theme';
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';
import Hero from './components/hero/Hero';
import Experience from './components/experience/Experience';
import Projects from './components/projects/Projects';
import './styles/App.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const Website: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      <AmbientBackground />
      <Nav />
      <main id="main-content" className="site-main">
        <Hero />
        <Experience />
        <Projects />
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LenisProvider>
      <Website />
      </LenisProvider>
    </ThemeProvider>
  );
};

export default App;
