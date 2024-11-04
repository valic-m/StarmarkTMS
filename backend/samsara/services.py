# Path: C:/Users/valic/OneDrive/Documents/TMS/backend/samsara/services.py

import requests
import logging
from django.conf import settings  # Import settings to access SAMSARA_API_TOKEN
from django.utils.timezone import now
from datetime import timedelta
from backend.samsara.models import Samsara  # Updated path for the Samsara model

# Function to fetch and save GPS data for all vehicles (Bulk Fetch)
def fetch_and_save_gps_data():
    """
    Bulk fetch GPS data for all vehicles from Samsara and save it to the database.
    """
    api_url = "https://api.samsara.com/fleet/vehicles/locations"
    headers = {
        'Authorization': f'Bearer {settings.SAMSARA_API_TOKEN}',  # Access SAMSARA_API_TOKEN from settings
        'Accept': 'application/json'
    }

    try:
        # Make the API request to Samsara
        response = requests.get(api_url, headers=headers)
        response.raise_for_status()
        data = response.json()

        # Iterate over each vehicle in the response and update or create records in the database
        for vehicle in data.get('data', []):
            vehicle_id = vehicle.get('id')
            location_data = vehicle.get('location', {})

            if location_data:
                Samsara.objects.update_or_create(
                    vehicle_id=vehicle_id,
                    defaults={
                        'location': location_data.get('reverseGeo', {}).get('formattedLocation', 'Unknown Location'),
                        'latitude': location_data.get('latitude'),
                        'longitude': location_data.get('longitude'),
                        'speed': location_data.get('speed', None),
                        'engine_hours': location_data.get('engineHours', None),
                        'odometer': location_data.get('odometer', None),
                        'last_updated': now(),
                    }
                )
        logging.info(f"Successfully fetched and saved data for {len(data.get('data', []))} vehicles.")

    except requests.RequestException as e:
        logging.error(f"Error fetching GPS data from Samsara: {e}")

# Function to fetch and save GPS data for a specific vehicle (Single Vehicle Fetch)
def fetch_and_save_gps_data_for_vehicle(vehicle_id):
    """
    Fetch GPS data for a specific vehicle from Samsara and save it to the database.
    """
    api_url = "https://api.samsara.com/fleet/vehicles/locations"
    headers = {
        'Authorization': f'Bearer {settings.SAMSARA_API_TOKEN}',
        'Accept': 'application/json'
    }

    try:
        # Make the API request to Samsara
        response = requests.get(api_url, headers=headers)
        response.raise_for_status()  # Raise an error if the request was unsuccessful
        data = response.json()

        # Log the full response data for debugging
        print(f"API Response Data: {data}")

        # Iterate over each vehicle and check if it matches the given vehicle_id
        for vehicle in data.get('data', []):
            if vehicle.get('id') == vehicle_id:
                location_data = vehicle.get('location', {})

                # Handle engine hours and odometer safely
                engine_hours = vehicle.get('engineHours') if vehicle.get('engineHours') is not None else None
                odometer = vehicle.get('odometer') if vehicle.get('odometer') is not None else None

                # Log the location, engine hours, and odometer data
                print(f"Vehicle {vehicle_id} Location: {location_data}")
                print(f"Vehicle {vehicle_id} Engine Hours: {engine_hours}")
                print(f"Vehicle {vehicle_id} Odometer: {odometer}")

                # Try to save the data into the database
                try:
                    samsara_record, created = Samsara.objects.update_or_create(
                        vehicle_id=vehicle_id,
                        defaults={
                            'location': location_data.get('reverseGeo', {}).get('formattedLocation', 'Unknown Location'),
                            'latitude': location_data.get('latitude'),
                            'longitude': location_data.get('longitude'),
                            'speed': location_data.get('speed', None),
                            'engine_hours': engine_hours,  # Save None if engine_hours not available
                            'odometer': odometer,  # Save None if odometer not available
                            'last_updated': now(),
                        }
                    )

                    # Log confirmation of data saving
                    print(f"GPS data saved for vehicle {vehicle_id}: {samsara_record}")

                except Exception as e:
                    # Print the error if something goes wrong
                    print(f"Error saving GPS data for vehicle {vehicle_id}: {e}")

                return samsara_record

    except requests.RequestException as e:
        logging.error(f"Error fetching GPS data from Samsara: {e}")
        return None

# Function to get recent GPS data or fetch it if outdated
def get_recent_gps_data(samsara_device_id):
    """
    Fetch recent GPS data for a vehicle using its samsara_device_id.
    """
    logging.info(f"Fetching GPS data for Samsara device ID: {samsara_device_id}")
    
    ten_minutes_ago = now() - timedelta(minutes=10)
    
    try:
        # Retrieve the GPS data from the Samsara model, filtering by vehicle_id
        gps_data = Samsara.objects.filter(vehicle_id=samsara_device_id, last_updated__gte=ten_minutes_ago).first()

        # If there is no recent data, fetch fresh data from Samsara
        if not gps_data:
            gps_data = fetch_and_save_gps_data_for_vehicle(samsara_device_id)

    except Exception as e:
        logging.error(f"Error fetching GPS data for vehicle {samsara_device_id}: {e}")
        gps_data = None  # Fallback if an error occurs
    
    # Return default data if no GPS data is found
    if not gps_data:
        return {
            'location': 'Location unknown',
            'latitude': None,
            'longitude': None,
            'speed': None,
            'engine_hours': None,
            'odometer': None
        }

    return gps_data
