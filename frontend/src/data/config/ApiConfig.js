export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8081/api";

const TOKEN_KEY = "authToken";

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

export const authHeaders = () => {
  const token = getToken();
  return token ? { "X-Auth-Token": token } : {};
};

export const request = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...authHeaders(),
    },
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  const resolvedMessage = typeof data === "string"
    ? data
    : data?.message || data?.error || data?.details;

  return {
    success: response.ok,
    status: response.status,
    data,
    message: resolvedMessage,
  };
};
