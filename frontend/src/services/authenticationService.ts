import api from '../api';

interface User {
  id: number;
  username: string;
  email: string;
  // Add other fields as needed
}

export const getUsers = async (): Promise<User[]> => {
  return api('/api/authentication/');
};

export const addUser = async (userData: Omit<User, 'id'>) => {
  return api('/api/authentication/', {
    method: 'POST',
    body: userData,
  });
};
