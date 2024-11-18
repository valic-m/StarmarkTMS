import requests
import logging
from django.conf import settings

# Configure logging to help with debugging
logging.basicConfig(level=logging.INFO)


def fetch_fmcsa_data(mc_number):
    """
    Fetch FMCSA data for a given MC number using the FMCSA API.

    :param mc_number: The MC number to search for.
    :return: A dictionary with the fetched data (name, address, phone) or None in case of error.
    """
    FMCSA_API_URL = "https://mobile.fmcsa.dot.gov/qc/services/carriers/mc"
    WEB_KEY = settings.FMCSA_WEB_KEY  # Load your web key from Django settings

    try:
        # Construct the API request URL
        url = f"{FMCSA_API_URL}/{mc_number}?webKey={WEB_KEY}"

        # Send the GET request
        response = requests.get(url)
        response.raise_for_status()  # Check for request errors

        # Parse the JSON response
        data = response.json()

        # Extract relevant fields (modify based on API response structure)
        return {
            'name': data.get('name', 'N/A'),
            'address': data.get('address', 'N/A'),
            'phone': data.get('phone', 'N/A'),
        }

    except requests.RequestException as e:
        logging.error(f"Error fetching FMCSA data for MC number {mc_number}: {e}")
        return None
