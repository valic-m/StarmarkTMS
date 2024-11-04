# Path: C:/Users/valic/OneDrive/Documents/TMS/backend/equipment/samsara_services.py

import requests
import logging
from django.conf import settings

# Function to fetch all equipment locations from Samsara
def get_all_equipment_locations():
    url = "https://api.samsara.com/fleet/vehicles/locations"
    headers = {
        "Authorization": f"Bearer {settings.SAMSARA_API_TOKEN}",
        "Accept": "application/json"
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Check for errors
        data = response.json()
        logging.debug(f"Equipment locations data: {data}")
        return data
    except requests.RequestException as e:
        logging.error(f"Error fetching equipment locations: {str(e)}")
        return None
