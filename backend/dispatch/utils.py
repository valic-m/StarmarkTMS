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
    # Construct the URL for the Samsara API
    url = f'https://api.samsara.com/fleet/dispatch/routes/{route_external_id}'

    # Authorization header using the API token from settings
    headers = {'Authorization': f'Bearer {settings.SAMSARA_API_TOKEN}'}

    # Payload containing the new status
    payload = {'status': status}

    try:
        # Make the PATCH request to update the route status
        response = requests.patch(url, headers=headers, json=payload)
        response.raise_for_status()  # Raises an HTTPError for bad responses

        # Log the successful response
        logging.info(f"Successfully updated route {route_external_id} with status: {status}")
        return response.json()

    except requests.HTTPError as http_err:
        logging.error(f"HTTP error occurred while updating route {route_external_id}: {http_err}")
        return None
    except Exception as e:
        logging.error(f"Error updating route {route_external_id}: {e}")
        return None


def fetch_route_details(route_external_id):
    """
    Fetches details of a route via the Samsara API.

    Args:
        route_external_id (str): The external ID of the Samsara route.

    Returns:
        dict: The response from the Samsara API with route details, if successful.
    """
    # Construct the URL for the Samsara API
    url = f'https://api.samsara.com/fleet/dispatch/routes/{route_external_id}'

    # Authorization header
    headers = {'Authorization': f'Bearer {settings.SAMSARA_API_TOKEN}'}

    try:
        # Make the GET request to fetch route details
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raises an HTTPError for bad responses

        # Log the successful response
        logging.info(f"Successfully fetched details for route {route_external_id}")
        return response.json()

    except requests.HTTPError as http_err:
        logging.error(f"HTTP error occurred while fetching route {route_external_id}: {http_err}")
        return None
    except Exception as e:
        logging.error(f"Error fetching route {route_external_id}: {e}")
        return None


def delete_route(route_external_id):
    """
    Deletes a route via the Samsara API.

    Args:
        route_external_id (str): The external ID of the Samsara route.

    Returns:
        bool: True if the route was successfully deleted, False otherwise.
    """
    # Construct the URL for the Samsara API
    url = f'https://api.samsara.com/fleet/dispatch/routes/{route_external_id}'

    # Authorization header
    headers = {'Authorization': f'Bearer {settings.SAMSARA_API_TOKEN}'}

    try:
        # Make the DELETE request to delete the route
        response = requests.delete(url, headers=headers)
        response.raise_for_status()  # Raises an HTTPError for bad responses

        # Log the successful deletion
        logging.info(f"Successfully deleted route {route_external_id}")
        return True

    except requests.HTTPError as http_err:
        logging.error(f"HTTP error occurred while deleting route {route_external_id}: {http_err}")
        return False
    except Exception as e:
        logging.error(f"Error deleting route {route_external_id}: {e}")
        return False
