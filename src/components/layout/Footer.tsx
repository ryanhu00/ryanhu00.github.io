import React from 'react';
import { footer } from '../../data/content';

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-line" />
      <p className="footer-description">
        Website built with React.js and TypeScript. Project section
        layout based on React-Grid-Layout. Smooth scrolling powered by Lenis.{' '}
         UI components from React Bits. All text set in Satoshi.
      </p>
      <p className="footer-copyright">
        <strong>{footer.copyright}</strong>
      </p>
    </footer>
  );
};

export default Footer;
