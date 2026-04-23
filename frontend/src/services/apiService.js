const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const TOKEN_KEY = 'authToken';

const getToken = () => localStorage.getItem(TOKEN_KEY);

const setToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

const authHeaders = () => {
  const token = getToken();
  return token ? { 'X-Auth-Token': token } : {};
};

const request = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...authHeaders(),
    },
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  const resolvedMessage = typeof data === 'string'
    ? data
    : data?.message || data?.error || data?.details;

  return {
    success: response.ok,
    status: response.status,
    data,
    message: resolvedMessage,
  };
};

export const register = async (username, email, password) => {
  try {
    return await request('/register', {
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
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const login = async (username, password) => {
  try {
    const result = await request('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
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

export const getProfile = async () => {
  try {
    return await request('/profile', { method: 'GET' });
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const updateProfile = async (payload) => {
  try {
    return await request('/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
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
    return await request('/profile/password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
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
    formData.append('file', file);

    return await request('/profile/photo', {
      method: 'POST',
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
      method: 'GET',
      headers: {
        ...authHeaders(),
      },
      cache: 'force-cache',
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
