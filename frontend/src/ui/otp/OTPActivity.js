import React from "react";
import AuthLayout from "../../components/AuthLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { OTPPresenter } from "./OTPPresenter";

const OTPActivity = () => {
  const navigate = useNavigate();
  const { viewModel, actions } = OTPPresenter(navigate);

  return (
    <AuthLayout
      leftContent={
        <>
          <h2>Check your Mailbox</h2>
          <p>Please enter your OTP below</p>
          <Input placeholder="OTP" value={viewModel.otp} onChange={(e) => actions.setOtp(e.target.value)} />
          {viewModel.error && <div style={{ color: "red", fontSize: "12px", marginTop: "8px" }}>{viewModel.error}</div>}
          <Button text="VERIFY" onClick={actions.submitOtp} />
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

export default OTPActivity;
