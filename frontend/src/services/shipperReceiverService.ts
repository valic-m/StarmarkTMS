import axios from 'axios';

const BASE_URL = '/api/shippers_receivers';

export const getShippers = async (query: string = '') => {
  const response = await axios.get(`${BASE_URL}/shippers/`, {
    params: { q: query }
  });
  return response.data;
};

export const getReceivers = async (query: string = '') => {
  const response = await axios.get(`${BASE_URL}/receivers/`, {
    params: { q: query }
  });
  return response.data;
};
