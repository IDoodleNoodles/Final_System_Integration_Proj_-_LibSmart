const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const register = async (username, email, password) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const message = await response.text();
    return {
      success: response.ok,
      status: response.status,
      message,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const message = await response.text();
    return {
      success: response.ok,
      status: response.status,
      message,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};
