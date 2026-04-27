import { useState } from "react";
import { OTPContract } from "./OTPContract";

const isBlank = (value) => !value || !value.trim();

export const OTPPresenter = (navigate) => {
  const initial = OTPContract.createInitialViewModel();
  const [otp, setOtp] = useState(initial.otp);
  const [error, setError] = useState(initial.error);

  const submitOtp = (e) => {
    e.preventDefault();
    setError("");

    if (isBlank(otp)) {
      setError("OTP is required");
      return;
    }

    navigate(OTPContract.NEXT_ROUTE);
  };

  return {
    viewModel: {
      otp,
      error,
    },
    actions: {
      setOtp,
      submitOtp,
    },
  };
};
