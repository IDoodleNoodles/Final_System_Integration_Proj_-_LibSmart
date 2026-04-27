import { request, setToken } from "../config/ApiConfig";

export const registerUser = async (username, email, password) => {
  try {
    return await request("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const loginUser = async (username, password) => {
  try {
    const result = await request("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (result.success && result.data?.token) {
      setToken(result.data.token);
    }

    return result;
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};
