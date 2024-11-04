# Path: C:/Users/valic/OneDrive/Documents/TMS/backend/customers/fmcsa_utils.py

import requests
from bs4 import BeautifulSoup
import logging

# Configure logging to help with debugging
logging.basicConfig(level=logging.INFO)

def fetch_fmcsa_data(mc_number):
    """
    Fetch FMCSA data for a given MC number from the SAFER website.
    
    :param mc_number: The MC number to search for.
    :return: A dictionary with the fetched data (name, address, phone) or None in case of error.
    """
    url = f"https://safer.fmcsa.dot.gov/query.asp?searchtype=MC&query={mc_number}"
    
    try:
        response = requests.get(url)
        response.raise_for_status()  # Check for request errors
        
        # Parse the page content with BeautifulSoup
        soup = BeautifulSoup(response.text, 'html.parser')

        # Extracting FMCSA data (name, address, phone) based on the structure of the page
        try:
            name = soup.find('td', text='Legal Name').find_next('td').text.strip()
            address = soup.find('td', text='Physical Address').find_next('td').text.strip()
            phone = soup.find('td', text='Phone').find_next('td').text.strip()

            # Log the successful fetch
            logging.info(f"Fetched data for MC number {mc_number}: {name}, {address}, {phone}")
            
            # Return the fetched data in a structured format
            return {
                'name': name,
                'address': address,
                'phone': phone
            }
        
        except AttributeError:
            logging.error(f"Failed to extract data for MC number {mc_number}.")
            return None
    
    except requests.RequestException as e:
        logging.error(f"Error fetching FMCSA data for MC number {mc_number}: {e}")
        return None
