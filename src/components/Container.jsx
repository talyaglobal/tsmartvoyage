import React from 'react';

const Container = ({ 
  children, 
  size = 'default',
  className = '',
  ...props 
}) => {
  const sizes = {
    sm: 'max-w-4xl',
    default: 'max-w-7xl',
    lg: 'max-w-8xl',
    full: 'max-w-full'
  };

  const classes = `${sizes[size]} mx-auto mobile-padding ${className}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Container;

