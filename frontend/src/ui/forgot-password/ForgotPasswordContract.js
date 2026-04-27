export const ForgotPasswordContract = {
  PROMPT: "Please enter your username to continue",
  NEXT_ROUTE: "/otp",

  createInitialViewModel() {
    return {
      username: "",
      error: "",
    };
  },
};
