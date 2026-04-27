import { useState } from "react";
import { ForgotPasswordContract } from "./ForgotPasswordContract";

const isBlank = (value) => !value || !value.trim();

export const ForgotPasswordPresenter = (navigate) => {
  const initial = ForgotPasswordContract.createInitialViewModel();
  const [username, setUsername] = useState(initial.username);
  const [error, setError] = useState(initial.error);

  const submitForgotPassword = (e) => {
    e.preventDefault();
    setError("");

    if (isBlank(username)) {
      setError("Username is required");
      return;
    }

    navigate(ForgotPasswordContract.NEXT_ROUTE);
  };

  return {
    viewModel: {
      username,
      error,
      prompt: ForgotPasswordContract.PROMPT,
    },
    actions: {
      setUsername,
      submitForgotPassword,
    },
  };
};
