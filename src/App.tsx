import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AmbientBackground from './components/layout/AmbientBackground';
import { LenisProvider } from './components/layout/LenisProvider';
import { ThemeProvider, useTheme } from './components/layout/theme';
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';
import Hero from './components/hero/Hero';
import Experience from './components/experience/Experience';
import Projects from './components/projects/Projects';
import Photos from './components/photos/Photos';
import './styles/App.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const Home: React.FC = () => {
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
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LenisProvider>
                <Home />
              </LenisProvider>
            }
          />
          <Route path="/photos" element={<Photos />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
