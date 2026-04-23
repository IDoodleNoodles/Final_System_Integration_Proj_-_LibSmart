import React, { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { changePassword } from "../services/apiService";
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    setLoading(true);
    const result = await changePassword(currentPassword, newPassword);
    setLoading(false);

    if (result.success) {
      setMessage(result.message || "Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
          setTimeout(() => {
            navigate("/dashboard");
          }, 1500);
    } else {
      setError(result.message || result.error || "Password update failed");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

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
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <Input
            placeholder="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <div style={{ color: "red", fontSize: "12px", marginTop: "8px" }}>{error}</div>}
          {message && <div style={{ color: "green", fontSize: "12px", marginTop: "8px" }}>{message}</div>}
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <Button text={loading ? "UPDATING..." : "RESET PASSWORD"} onClick={handleReset} disabled={loading} />
            <Button text="CANCEL" onClick={handleCancel} disabled={loading} className="outline-btn" />
          </div>
        </>
      }
    />
  );
};

export default ResetPassword;