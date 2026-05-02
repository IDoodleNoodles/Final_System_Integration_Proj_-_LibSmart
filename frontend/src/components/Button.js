import React from 'react';

export default function Button({ children, text, onClick, disabled = false, type = 'button', variant = 'primary', className = '', ...rest }) {
  const variantClass = variant === 'secondary'
    ? 'button-secondary'
    : variant === 'ghost'
      ? 'button-ghost'
      : variant === 'danger'
        ? 'button-danger'
        : 'button-primary';

  return (
    <button className={`button ${variantClass} ${className}`.trim()} onClick={onClick} disabled={disabled} type={type} {...rest}>
      {children || text}
    </button>
  );
}