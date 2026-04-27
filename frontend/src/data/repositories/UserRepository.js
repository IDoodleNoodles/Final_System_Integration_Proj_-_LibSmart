import { API_URL, authHeaders, request } from "../config/ApiConfig";

export const getProfile = async () => {
  try {
    return await request("/profile", { method: "GET" });
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const updateProfile = async (payload) => {
  try {
    return await request("/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const changePassword = async (currentPassword, newPassword) => {
  try {
    return await request("/profile/password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const uploadPhoto = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    return await request("/profile/photo", {
      method: "POST",
      body: formData,
    });
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const getProfilePhoto = async () => {
  try {
    const response = await fetch(`${API_URL}/profile/photo`, {
      method: "GET",
      headers: {
        ...authHeaders(),
      },
      cache: "force-cache",
    });

    if (!response.ok) {
      const message = await response.text();
      return {
        success: false,
        status: response.status,
        message,
      };
    }

    return {
      success: true,
      status: response.status,
      blob: await response.blob(),
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};
