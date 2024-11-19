import requests
from decouple import config
import logging

logger = logging.getLogger(__name__)

def fetch_fmcsa_data(mc_number):
    """
    Fetch FMCSA data for a given MC number using the FMCSA API.
    """
    # Updated FMCSA API endpoint for docket-number
    FMCSA_API_URL = "https://mobile.fmcsa.dot.gov/qc/services/carriers/docket-number"
    WEB_KEY = config("FMCSA_WEB_KEY")  # Load your web key from the .env file

    try:
        # Construct the API request URL
        url = f"{FMCSA_API_URL}/{mc_number}?webKey={WEB_KEY}"
        logger.info(f"Fetching FMCSA data from URL: {url}")

        # Send the GET request
        response = requests.get(url)
        response.raise_for_status()  # Raise HTTP errors

        # Parse and return JSON data
        return response.json()
    except requests.RequestException as e:
        logger.error(f"Error fetching FMCSA data for MC number {mc_number}: {e}")
        return {"error": f"Failed to fetch data for MC number {mc_number}"}
