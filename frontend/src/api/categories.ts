// src/api/categories.ts

import axios from 'axios';
import { Category } from 'types/Location';

// Replace with your actual API base URL
const API_BASE_URL = 'http://localhost:8000/api';

/**
 * Fetches all categories from the backend.
 * @returns A promise that resolves to an array of Category objects.
 */
export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories/`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
