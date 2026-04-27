export const LoginContract = {
  REQUIRED_FIELDS_MESSAGE: "Username and password are required",
  LOGIN_FAILED_MESSAGE: "Login failed",
  SIGN_IN_ROUTE: "/dashboard",

  createInitialViewModel() {
    return {
      username: "",
      password: "",
      error: "",
      loading: false,
    };
  },
};
