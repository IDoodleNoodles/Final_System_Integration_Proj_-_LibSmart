import { useState } from "react";
import { loginUser } from "../../data/repositories/AuthRepository";
import { LoginContract } from "./LoginContract";

const isBlank = (value) => !value || !value.trim();

export const LoginPresenter = (navigate) => {
  const initial = LoginContract.createInitialViewModel();
  const [username, setUsername] = useState(initial.username);
  const [password, setPassword] = useState(initial.password);
  const [error, setError] = useState(initial.error);
  const [loading, setLoading] = useState(initial.loading);

  const submitLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (isBlank(username) || isBlank(password)) {
      setError(LoginContract.REQUIRED_FIELDS_MESSAGE);
      return;
    }

    setLoading(true);
    const result = await loginUser(username.trim(), password);
    setLoading(false);

    if (result.success) {
      localStorage.setItem("user", username.trim());
      navigate(LoginContract.SIGN_IN_ROUTE);
      return;
    }

    setError(result.message || result.error || LoginContract.LOGIN_FAILED_MESSAGE);
  };

  return {
    viewModel: {
      username,
      password,
      error,
      loading,
    },
    actions: {
      setUsername,
      setPassword,
      submitLogin,
    },
  };
};
