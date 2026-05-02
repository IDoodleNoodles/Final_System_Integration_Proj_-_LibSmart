import React from 'react';

export default function Input({ type = 'text', placeholder, value, onChange, name, id, icon: Icon, className = '', ...rest }) {
  return (
    <div className="field-row">
      {Icon ? <Icon size={18} className="field-icon" /> : null}
      <input
        type={type}
        placeholder={placeholder}
        className={`field-input ${Icon ? 'with-icon' : ''} ${className}`.trim()}
        value={value}
        onChange={onChange}
        name={name}
        id={id}
        {...rest}
      />
    </div>
  );
}