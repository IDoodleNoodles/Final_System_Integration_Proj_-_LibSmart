import { useState } from "react";
import { changePassword } from "../../data/repositories/UserRepository";
import { ResetPasswordContract } from "./ResetPasswordContract";

const isBlank = (value) => !value || !value.trim();

export const ResetPasswordPresenter = (navigate) => {
  const initial = ResetPasswordContract.createInitialViewModel();
  const [currentPassword, setCurrentPassword] = useState(initial.currentPassword);
  const [newPassword, setNewPassword] = useState(initial.newPassword);
  const [confirmPassword, setConfirmPassword] = useState(initial.confirmPassword);
  const [message, setMessage] = useState(initial.message);
  const [error, setError] = useState(initial.error);
  const [loading, setLoading] = useState(initial.loading);

  const submitResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (isBlank(currentPassword) || isBlank(newPassword) || isBlank(confirmPassword)) {
      setError(ResetPasswordContract.REQUIRED_FIELDS_MESSAGE);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(ResetPasswordContract.PASSWORD_MISMATCH_MESSAGE);
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
        navigate(ResetPasswordContract.SUCCESS_REDIRECT_ROUTE);
      }, 1500);
      return;
    }

    setError(result.message || result.error || ResetPasswordContract.FAILED_MESSAGE);
  };

  const cancel = () => {
    navigate(-1);
  };

  return {
    viewModel: {
      currentPassword,
      newPassword,
      confirmPassword,
      message,
      error,
      loading,
    },
    actions: {
      setCurrentPassword,
      setNewPassword,
      setConfirmPassword,
      submitResetPassword,
      cancel,
    },
  };
};
