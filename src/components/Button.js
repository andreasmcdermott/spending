import React from 'react';

const stylesByVariant = {
  primary: 'bg-blue hover:bg-blue-dark text-white',
  secondary: 'bg-grey-darker hover:bg-grey-darkest text-white',
  danger: 'bg-red hover:bg-red-dark text-white'
};

const Button = ({ children, onClick, isSubmit, variant = 'secondary' }) =>
  <button
    className={`py-2 px-4 ${stylesByVariant[variant] || ''}`}
    onClick={onClick}
    type={isSubmit ? 'submit' : undefined}
  >
    {children}
  </button>;

export default Button;
