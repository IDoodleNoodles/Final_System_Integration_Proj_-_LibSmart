export const OTPContract = {
  NEXT_ROUTE: "/reset",

  createInitialViewModel() {
    return {
      otp: "",
      error: "",
    };
  },
};
