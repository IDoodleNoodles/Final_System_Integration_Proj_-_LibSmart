import React from "react";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";

const OTP = () => {
  return (
    <AuthLayout
      leftContent={
        <>
          <h2>Check your Mailbox</h2>
          <p>Please enter your OTP below</p>
          <Input placeholder="OTP" />
          <Button text="VERIFY" />
        </>
      }
      rightContent={
        <>
          <h1 className="logo">BookWorm</h1>
          <p>Your premier digital library for borrowing and reading books.</p>
        </>
      }
    />
  );
};

export default OTP;