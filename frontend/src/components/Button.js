import React from "react";

const Button = ({ text, onClick, disabled = false, type = "button", className = "primary-btn" }) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled} type={type}>
      {text}
    </button>
  );
};

export default Button;