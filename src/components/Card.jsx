import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true,
  ...props 
}) => {
  const baseClasses = 'rounded-xl overflow-hidden transition-all duration-300';
  
  const variants = {
    default: 'bg-white border border-gray-200 shadow-sm',
    luxury: 'luxury-card',
    featured: 'bg-gradient-to-br from-white to-gold-luxury/5 border-2 border-gold-luxury shadow-lg',
    glass: 'bg-white/80 backdrop-blur-md border border-white/20 shadow-lg',
    dark: 'bg-navy-deep text-white border border-navy-deep/20 shadow-lg'
  };

  const hoverEffect = hover ? 'hover:shadow-lg hover:-translate-y-1' : '';
  
  const classes = `${baseClasses} ${variants[variant]} ${hoverEffect} ${className}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-6 pb-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-6 pt-4 border-t border-gray-100 ${className}`} {...props}>
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;

