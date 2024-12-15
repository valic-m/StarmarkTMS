import api from './index'; // Import your generic API function

// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await api('/api/users/');
    return response;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
};

// Fetch a single user by ID
export const fetchUserById = async (id: number) => {
  try {
    const response = await api(`/api/users/${id}/`);
    return response;
  } catch (error) {
    console.error(`Failed to fetch user with ID ${id}:`, error);
    throw error;
  }
};

// Create a new user
export const createUser = async (userData: Record<string, unknown>) => {
  try {
    const response = await api('/api/users/', {
      method: 'POST',
      body: userData
    });
    return response;
  } catch (error) {
    console.error('Failed to create user:', error);
    throw error;
  }
};

// Update an existing user
export const updateUser = async (
  id: number,
  userData: Record<string, unknown>
) => {
  try {
    const response = await api(`/api/users/${id}/`, {
      method: 'PUT',
      body: userData
    });
    return response;
  } catch (error) {
    console.error(`Failed to update user with ID ${id}:`, error);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (id: number) => {
  try {
    const response = await api(`/api/users/${id}/`, {
      method: 'DELETE'
    });
    return response;
  } catch (error) {
    console.error(`Failed to delete user with ID ${id}:`, error);
    throw error;
  }
};
