import React from "react";
import "../styles/auth.css";

const AuthLayout = ({ leftContent, rightContent }) => {
  return (
    <div className="auth-container">
      <div className="auth-left">
        {leftContent}
      </div>
      <div className="auth-right">
        {rightContent}
      </div>
    </div>
  );
};

export default AuthLayout;