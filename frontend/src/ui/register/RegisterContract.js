export const RegisterContract = {
  REQUIRED_FIELDS_MESSAGE: "All fields are required",
  FAILED_MESSAGE: "Registration failed",
  SUCCESS_ROUTE: "/",

  createInitialViewModel() {
    return {
      username: "",
      email: "",
      password: "",
      error: "",
      loading: false,
    };
  },
};
