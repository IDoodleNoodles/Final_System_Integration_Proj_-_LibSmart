import React from "react";
import AuthLayout from "../../components/AuthLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { ForgotPasswordPresenter } from "./ForgotPasswordPresenter";

const ForgotPasswordActivity = () => {
  const navigate = useNavigate();
  const { viewModel, actions } = ForgotPasswordPresenter(navigate);

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
          <p style={{ fontSize: "12px" }}>{viewModel.prompt}</p>
          <Input
            placeholder="Username"
            value={viewModel.username}
            onChange={(e) => actions.setUsername(e.target.value)}
          />
          {viewModel.error && <div style={{ color: "red", fontSize: "12px", marginTop: "8px" }}>{viewModel.error}</div>}
          <Button text="RESET PASSWORD" onClick={actions.submitForgotPassword} />
        </>
      }
    />
  );
};

export default ForgotPasswordActivity;
