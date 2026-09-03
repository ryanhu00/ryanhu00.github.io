import React from 'react';

type SectionProps = {
  id: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
};

const Section: React.FC<SectionProps> = ({ id, title, children, className = '' }) => {
  return (
    <section id={id} className={`site-section ${className}`.trim()}>
      <div className="page-shell">
        {title ? (
          <div className="section-heading">
            <h2>{title}</h2>
          </div>
        ) : null}
        <div className="section-body">{children}</div>
      </div>
    </section>
  );
};

export default Section;
