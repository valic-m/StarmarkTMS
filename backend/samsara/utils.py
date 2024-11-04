# Path: C:/Users/valic/OneDrive/Documents/TMS/backend/samsara/utils.py

import requests
from django.conf import settings  # Import Django settings to access SAMSARA_API_TOKEN

def set_external_id(vehicle_id, external_ids):
    """
    Set external IDs for a specific vehicle in the Samsara API.
    """
    url = f'https://api.samsara.com/fleet/vehicles/{vehicle_id}'
    headers = {'Authorization': f'Bearer {settings.SAMSARA_API_TOKEN}'}
    payload = {'externalIds': external_ids}
    
    # Make the API request to set external IDs
    response = requests.post(url, headers=headers, json=payload)
    response.raise_for_status()  # Raises an error for bad responses
    
    return response.json()  # Return the JSON response from the API
