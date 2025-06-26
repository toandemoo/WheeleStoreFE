export const LoginApi = async ({ email, password }) => {
  try {
    const response = await fetch('http://localhost:5153/api/jwt/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Login error:', error);
      return false;
    }

    const data = await response.json();
    localStorage.setItem('accesstoken', data.accesstoken);
    return data;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
};

export const ValidateToken = async (token) => {
  try {
    const response = await fetch('http://localhost:5153/api/jwt/validate-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('validate token error:', error);
      return false;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('validate token:', error);
    return false;
  }
}
