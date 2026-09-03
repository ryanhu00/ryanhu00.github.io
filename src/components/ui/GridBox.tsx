import React from 'react';

type GridBoxProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

const GridBox: React.FC<GridBoxProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`grid-box ${className}`.trim()}>
      {title ? <h3 className="grid-box-title">{title}</h3> : null}
      <div className="grid-box-body">{children}</div>
    </div>
  );
};

export default GridBox;
