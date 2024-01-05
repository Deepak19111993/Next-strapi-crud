import React from 'react';

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className='main-content'>{children}</div>;
};

export default LayoutWrapper;
