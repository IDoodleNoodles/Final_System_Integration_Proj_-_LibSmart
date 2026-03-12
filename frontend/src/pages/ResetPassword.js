import React from "react";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";

const ResetPassword = () => {
  return (
    <AuthLayout
      leftContent={
        <>
          <h1 className="logo">BookWorm</h1>
        </>
      }
      rightContent={
        <>
          <h2>Reset Password</h2>
          <Input placeholder="New Password" type="password" />
          <Input placeholder="Confirm Password" type="password" />
          <Button text="RESET PASSWORD" />
        </>
      }
    />
  );
};

export default ResetPassword;