import axios from 'axios';

// Define the expected structure of the FMCSA response
interface FmcsaResponse {
  legalName?: string;
  phyStreet?: string;
  phyCity?: string;
  phyState?: string;
  phyZipcode?: string;
  phone?: string;
  dotNumber?: number;
}

const BASE_URL = 'http://localhost:8000'; // Backend URL

export const fetchFmcsaData = async (
  mcNumber: string
): Promise<FmcsaResponse> => {
  try {
    // Make the API request to the backend
    const response = await axios.get(`${BASE_URL}/api/fmcsa/`, {
      params: { mcNumber }
    });

    // Extract the relevant carrier data from the response
    const carrier = response.data.content?.[0]?.carrier || {};

    // Map the API response to the expected structure
    return {
      legalName: carrier.legalName,
      phyStreet: carrier.phyStreet,
      phyCity: carrier.phyCity,
      phyState: carrier.phyState,
      phyZipcode: carrier.phyZipcode,
      phone: carrier.phone || '',
      dotNumber: carrier.dotNumber
    };
  } catch (error) {
    // Log and throw an error if the request fails
    console.error('Error fetching FMCSA data:', error);
    throw new Error('Failed to fetch FMCSA data');
  }
};
