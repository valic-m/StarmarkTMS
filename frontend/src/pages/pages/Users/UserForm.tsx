import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from 'api';
import { Form, Button } from 'react-bootstrap';

const UserForm = () => {
  const { userId } = useParams<{ userId: string }>(); // Get userId from route
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    mobile: ''
  });

  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        try {
          const response = await api(`/api/users/${userId}/`);
          setFormData({
            name: `${response.first_name} ${response.last_name}`,
            email: response.email,
            city: response.city,
            mobile: response.mobile
          });
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      };

      fetchUser();
    }
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (userId) {
        await api(`/api/users/${userId}/`, { method: 'PUT', body: formData });
      } else {
        await api(`/api/users/`, { method: 'POST', body: formData });
      }
      navigate('/users');
    } catch (error) {
      console.error('Failed to save user:', error);
    }
  };

  return (
    <div>
      <h2>{userId ? 'Edit User' : 'Add User'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Mobile</Form.Label>
          <Form.Control
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {userId ? 'Update User' : 'Create User'}
        </Button>
      </Form>
    </div>
  );
};

export default UserForm;
