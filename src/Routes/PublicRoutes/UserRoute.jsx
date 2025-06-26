export const UserApi = async () => {
  try {
    const token = localStorage.getItem('accesstoken');
    const response = await fetch('http://localhost:5153/api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('User fetch error:', err);
      return false;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch user failed:', error);
    return false;
  }
};

export const UpdateUserApi = async ({ fullName, phoneNumber, profileImage, address, birth }) => {
  try {
    const token = localStorage.getItem('accesstoken');
    const response = await fetch('http://localhost:5153/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fullName: fullName,
        phoneNumber: phoneNumber,
        profileImage: profileImage,
        Address: address,
        Birth: birth
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Update User error:', err);
      return false;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch user failed:', error);
    return false;
  }
}
