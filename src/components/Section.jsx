import React from 'react';

const Section = ({ 
  children, 
  className = '',
  background = 'default',
  padding = 'default',
  ...props 
}) => {
  const backgrounds = {
    default: 'bg-white',
    gray: 'bg-gray-50',
    navy: 'bg-navy-deep text-white',
    gradient: 'gradient-navy-gold text-white',
    ocean: 'gradient-ocean text-white'
  };

  const paddings = {
    none: '',
    sm: 'py-8 lg:py-12',
    default: 'py-12 lg:py-20',
    lg: 'py-16 lg:py-24',
    xl: 'py-20 lg:py-32'
  };

  const classes = `${backgrounds[background]} ${paddings[padding]} ${className}`;

  return (
    <section className={classes} {...props}>
      {children}
    </section>
  );
};

export default Section;

