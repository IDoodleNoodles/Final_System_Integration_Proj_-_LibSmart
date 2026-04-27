export const ResetPasswordContract = {
  REQUIRED_FIELDS_MESSAGE: "All fields are required",
  PASSWORD_MISMATCH_MESSAGE: "New password and confirm password do not match",
  FAILED_MESSAGE: "Password update failed",
  SUCCESS_REDIRECT_ROUTE: "/dashboard",

  createInitialViewModel() {
    return {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      message: "",
      error: "",
      loading: false,
    };
  },
};
