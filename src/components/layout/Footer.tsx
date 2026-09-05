import React from 'react';
import { footer } from '../../data/content';

type FooterProps = {
  description?: React.ReactNode;
};

const defaultDescription = (
  <>
    Website built with React.js and TypeScript. Project section layout based on
    React-Grid-Layout. Smooth scrolling powered by Lenis. UI components from
    React Bits. All text set in Satoshi.
  </>
);

const Footer: React.FC<FooterProps> = ({ description = defaultDescription }) => {
  return (
    <footer className="site-footer">
      <div className="footer-line" />
      <p className="footer-description">{description}</p>
      <p className="footer-copyright">
        <strong>{footer.copyright}</strong>
      </p>
    </footer>
  );
};

export default Footer;
