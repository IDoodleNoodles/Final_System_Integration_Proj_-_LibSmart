import React from "react";
import AuthLayout from "../../components/AuthLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { ResetPasswordPresenter } from "./ResetPasswordPresenter";

const ResetPasswordActivity = () => {
  const navigate = useNavigate();
  const { viewModel, actions } = ResetPasswordPresenter(navigate);

  return (
    <AuthLayout
      leftContent={
        <>
          <h1 className="logo">BookWorm</h1>
          <p>Change your account password securely.</p>
          <Link to="/dashboard">
            <button className="outline-btn">BACK TO DASHBOARD</button>
          </Link>
        </>
      }
      rightContent={
        <>
          <h2>Reset Password</h2>
          <Input
            placeholder="Current Password"
            type="password"
            value={viewModel.currentPassword}
            onChange={(e) => actions.setCurrentPassword(e.target.value)}
          />
          <Input
            placeholder="New Password"
            type="password"
            value={viewModel.newPassword}
            onChange={(e) => actions.setNewPassword(e.target.value)}
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            value={viewModel.confirmPassword}
            onChange={(e) => actions.setConfirmPassword(e.target.value)}
          />
          {viewModel.error && <div style={{ color: "red", fontSize: "12px", marginTop: "8px" }}>{viewModel.error}</div>}
          {viewModel.message && <div style={{ color: "green", fontSize: "12px", marginTop: "8px" }}>{viewModel.message}</div>}
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <Button text={viewModel.loading ? "UPDATING..." : "RESET PASSWORD"} onClick={actions.submitResetPassword} disabled={viewModel.loading} />
            <Button text="CANCEL" onClick={actions.cancel} disabled={viewModel.loading} className="outline-btn" />
          </div>
        </>
      }
    />
  );
};

export default ResetPasswordActivity;
