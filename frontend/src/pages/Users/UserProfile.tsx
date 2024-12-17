import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import api from 'api';
import PageBreadcrumb from 'components/common/PageBreadcrumb';

type User = {
  id: number;
  name: string;
  email: string;
  city: string;
  mobile: string;
  lastActive: string;
  joined: string;
};

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>(); // Get ID from route
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api(`/api/users/${userId}/`); // API call
        setUser({
          id: response.id,
          name: `${response.first_name} ${response.last_name}`,
          email: response.email,
          city: response.city || 'N/A',
          mobile: response.mobile || 'N/A',
          lastActive: response.last_login
            ? format(new Date(response.last_login), 'MMM dd, yyyy HH:mm')
            : 'N/A',
          joined: response.date_joined
            ? format(new Date(response.date_joined), 'MMM dd, yyyy HH:mm')
            : 'N/A'
        });
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (isLoading) return <p>Loading user data...</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>City: {user.city}</p>
      <p>Mobile: {user.mobile}</p>
      <p>Last Active: {user.lastActive}</p>
      <p>Joined: {user.joined}</p>
    </div>
  );
};

export default UserProfile;
