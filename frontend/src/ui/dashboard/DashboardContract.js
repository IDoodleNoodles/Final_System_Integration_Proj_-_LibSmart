export const DashboardContract = {
  LOGIN_REQUIRED_MESSAGE: "Please login again",
  LOGIN_ROUTE: "/",

  createInitialViewModel() {
    return {
      profile: null,
      loading: true,
      error: "",
    };
  },
};
