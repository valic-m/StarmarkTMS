import axios from 'axios';

// Define the expected structure of the FMCSA response
interface FmcsaResponse {
  name?: string;
  address?: string;
  phone?: string;
}

export const fetchFmcsaData = async (
  mcNumber: string
): Promise<FmcsaResponse> => {
  try {
    const response = await axios.get<FmcsaResponse>('/api/fmcsa/', {
      params: { mcNumber }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching FMCSA data:', error);
    throw new Error('Failed to fetch FMCSA data');
  }
};
