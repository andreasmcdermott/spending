import React from 'react';

const stylesByVariant = {
  primary: 'bg-blue hover:bg-blue-dark text-white border-blue hover:border-blue-dark',
  secondary:
    'bg-grey-darker hover:bg-grey-darkest text-white border-grey-darker hover:border-grey-darkest',
  danger: 'bg-red hover:bg-red-dark text-white border-red hover:border-red-dark'
};

const Button = ({ children, onClick, isSubmit, small, variant = 'secondary' }) =>
  <button
    className={`${small ? 'py-1 px-2 text-xs' : 'py-2 px-4'} border ${stylesByVariant[variant] ||
      ''}`}
    onClick={onClick}
    type={isSubmit ? 'submit' : undefined}
  >
    {children}
  </button>;

export default Button;
