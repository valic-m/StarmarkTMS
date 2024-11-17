import api from './index';

// Fetch all shippers
export const fetchShippers = async () => {
  return api('/api/shippers_receivers/shippers/');
};

// Fetch all receivers
export const fetchReceivers = async () => {
  return api('/api/shippers_receivers/receivers/');
};

// Fetch both shippers and receivers
export const fetchShippersReceivers = async () => {
  const [shippers, receivers] = await Promise.all([
    api('/api/shippers_receivers/shippers/'),
    api('/api/shippers_receivers/receivers/')
  ]);
  return [...shippers, ...receivers];
};

// Fetch shipper/receiver details by ID
export const fetchShipperReceiverDetails = async (id: number) => {
  return api(`/api/shippers_receivers/shippers/${id}/`);
};

// Create a new shipper or receiver
export const createShipperReceiver = async (data: {
  company_name: string;
  contact_person: string;
  phone_number: string;
  email: string;
  address: string;
  shipping_hours?: string;
  shipping_manager_name?: string;
  shipping_manager_phone?: string;
  shipping_manager_email?: string;
  rating?: number;
  load_time?: string;
  comments?: string;
  directions?: string;
  do_not_load?: boolean;
}) => {
  return api('/api/shippers_receivers/add/', {
    method: 'POST',
    body: data
  });
};

// Update an existing shipper or receiver
export const updateShipperReceiver = async (
  id: number,
  data: Partial<{
    company_name: string;
    contact_person: string;
    phone_number: string;
    email: string;
    address: string;
    shipping_hours?: string;
    shipping_manager_name?: string;
    shipping_manager_phone?: string;
    shipping_manager_email?: string;
    rating?: number;
    load_time?: string;
    comments?: string;
    directions?: string;
    do_not_load?: boolean;
  }>
) => {
  return api(`/api/shippers_receivers/shippers/${id}/`, {
    method: 'PUT',
    body: data
  });
};

// Delete a shipper or receiver
export const deleteShipperReceiver = async (id: number) => {
  return api(`/api/shippers_receivers/shippers/${id}/`, {
    method: 'DELETE'
  });
};
