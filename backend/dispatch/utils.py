# Path: C:/Users/valic/OneDrive/Documents/TMS/backend/dispatch/utils.py

import requests
import logging
from django.conf import settings

def update_route_status(route_external_id, status):
    """
    Updates the status of a route via the Samsara API.
    
    Args:
        route_external_id (str): The external ID of the Samsara route.
        status (str): The status to update the route with (e.g., 'completed', 'in_progress').
        
    Returns:
        dict: The response from the Samsara API, if successful.
    """
    url = f'https://api.samsara.com/fleet/dispatch/routes/{route_external_id}'
    headers = {'Authorization': f'Bearer {settings.SAMSARA_API_TOKEN}'}
    payload = {'status': status}

    try:
        # Make the PATCH request to update the route status
        response = requests.patch(url, headers=headers, json=payload)
        response.raise_for_status()  # Raises an error for bad responses
        
        # Log the successful response
        logging.info(f"Successfully updated route {route_external_id} with status: {status}")
        return response.json()

    except requests.HTTPError as http_err:
        logging.error(f"HTTP error occurred while updating route {route_external_id}: {http_err}")
        return None
    except Exception as e:
        logging.error(f"Error updating route {route_external_id}: {e}")
        return None
