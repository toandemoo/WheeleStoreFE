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

export const getUserByRole = async (role) => {
  try {
    const token = localStorage.getItem('accesstoken');
    const response = await fetch(`http://localhost:5153/api/user/admin?role=${role}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('get manager fetch error:', err);
      return [];
    }

    const result = await response.json(); 
    return result.data || []; 
  } catch (error) {
    console.error('Fetch manager failed:', error);
    return [];
  }
};

export const CreateUser = async (userData) => {
  try {
    const token = localStorage.getItem('accesstoken');
    const response = await fetch('http://localhost:5153/api/user/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fullName: userData.fullName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        password: userData.password,
        role: userData.role,
        birth: userData.birth,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Create user error:', err);
      return false;
    }
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Create user failed:', error);
    return false;
  }
}

export const DeleteUser = async (id) => {
  try {
    const token = localStorage.getItem('accesstoken');
    const response = await fetch(`http://localhost:5153/api/user/admin/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Delete user error:', err);
      return false;
    }
    return true;

  } catch (error) {
    console.error('Delete user failed:', error);
    return false;
  }
};

export const getUserById = async (id) => {
  try {
    const token = localStorage.getItem('accesstoken');
    const response = await fetch(`http://localhost:5153/api/user/admin/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Get user by ID error:', err);
      return false;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch user by ID failed:', error);
    return false;
  }
}

export const getAllUsers = async (page, pageSize) => {
  try {
    const token = localStorage.getItem('accesstoken');
    var query = new URLSearchParams({
      page: page,
      pageSize: pageSize,
    }).toString();

    const response = await fetch(`http://localhost:5153/api/user/admin/all?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Get all users error:', err);
      return false;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch all users failed:', error);
    return false;
  }
}