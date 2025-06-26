export const RegisterApi = async ({ email, password, fullName }) => {
  try {
    const response = await fetch('http://localhost:5153/api/jwt/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName,
        email,
        password,
        role: 1
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Registration error:', data?.message || data);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Registration failed:', error);
    return false;
  }
};


