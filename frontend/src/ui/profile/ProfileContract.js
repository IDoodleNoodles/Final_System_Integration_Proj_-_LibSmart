export const ProfileContract = {
  DEFAULT_PHOTO_CACHE_KEY: "profilePhoto:current",
  LOGIN_REQUIRED_MESSAGE: "Please login again",
  UPDATE_FAILED_MESSAGE: "Failed to update profile",
  UPLOAD_FAILED_MESSAGE: "Photo upload failed",
  LOGIN_ROUTE: "/",

  createInitialViewModel() {
    return {
      profile: null,
      form: {
        username: "",
        email: "",
        fullName: "",
        phone: "",
        address: "",
      },
      loading: true,
      saving: false,
      uploading: false,
      message: "",
      error: "",
      photoPreview: "",
    };
  },
};
