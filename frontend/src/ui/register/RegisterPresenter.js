import { useState } from "react";
import { registerUser } from "../../data/repositories/AuthRepository";
import { RegisterContract } from "./RegisterContract";

const isBlank = (value) => !value || !value.trim();

export const RegisterPresenter = (navigate) => {
  const initial = RegisterContract.createInitialViewModel();
  const [username, setUsername] = useState(initial.username);
  const [email, setEmail] = useState(initial.email);
  const [password, setPassword] = useState(initial.password);
  const [error, setError] = useState(initial.error);
  const [loading, setLoading] = useState(initial.loading);

  const submitRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (isBlank(username) || isBlank(email) || isBlank(password)) {
      setError(RegisterContract.REQUIRED_FIELDS_MESSAGE);
      return;
    }

    setLoading(true);
    const result = await registerUser(username.trim(), email.trim(), password);
    setLoading(false);

    if (result.success) {
      navigate(RegisterContract.SUCCESS_ROUTE);
      return;
    }

    setError(result.message || result.error || RegisterContract.FAILED_MESSAGE);
  };

  return {
    viewModel: {
      username,
      email,
      password,
      error,
      loading,
    },
    actions: {
      setUsername,
      setEmail,
      setPassword,
      submitRegister,
    },
  };
};
