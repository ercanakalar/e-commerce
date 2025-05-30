import './container.css';
import React from 'react';

const Container = ({ children, className }: { children: React.ReactNode; className: string }) => {
  return <div className={`${className}`}>{children}</div>;
};

export default Container;
