// src/api/customers.ts
import api from './index';

export const fetchCustomers = async () => {
  return api('/api/customers/');
};

export const createCustomer = async (customerData: {
  name: string;
  email?: string;
}) => {
  return api('/api/customers/', {
    method: 'POST',
    body: customerData
  });
};

export const updateCustomer = async (
  id: number,
  customerData: { name?: string; email?: string }
) => {
  return api(`/api/customers/${id}/`, {
    method: 'PUT',
    body: customerData
  });
};

export const deleteCustomer = async (id: number) => {
  return api(`/api/customers/${id}/`, {
    method: 'DELETE'
  });
};
