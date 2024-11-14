// File: src/api/loads.ts

import axios from 'axios';
import { LoadFormData } from 'types/LoadFormData';

// Set up the base API URL, defaulting to localhost if not specified
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

// Function to create a new load
export const createLoad = async (loadData: LoadFormData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/loads/`, loadData);
    return response.data;
  } catch (error) {
    console.error('Error creating load:', error);
    throw error;
  }
};

// Function to fetch all loads
export const getLoads = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/loads/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching loads:', error);
    throw error;
  }
};

// Function to fetch a specific load by ID
export const getLoadById = async (id: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/loads/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching load:', error);
    throw error;
  }
};

// Function to update a specific load by ID
export const updateLoad = async (id: number, loadData: LoadFormData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/loads/${id}/`, loadData);
    return response.data;
  } catch (error) {
    console.error('Error updating load:', error);
    throw error;
  }
};

// Function to delete a specific load by ID
export const deleteLoad = async (id: number) => {
  try {
    await axios.delete(`${API_BASE_URL}/loads/${id}/`);
  } catch (error) {
    console.error('Error deleting load:', error);
    throw error;
  }
};
