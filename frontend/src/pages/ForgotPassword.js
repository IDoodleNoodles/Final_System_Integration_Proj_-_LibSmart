import React from "react";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";

const ForgotPassword = () => {
  return (
    <AuthLayout
      leftContent={
        <>
          <h1 className="logo">BookWorm</h1>
          <p>Your premier digital library for borrowing and reading books.</p>
        </>
      }
      rightContent={
        <>
          <h2>Forgot Password</h2>
          <Input placeholder="Username" />
          <Button text="RESET PASSWORD" />
        </>
      }
    />
  );
};

export default ForgotPassword;