# Path: C:/Users/valic/OneDrive/Documents/TMS/backend/samsara/views.py

import requests
import logging
from django.conf import settings
from django.shortcuts import render, get_object_or_404
from django.utils.timezone import now
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import timedelta
from backend.samsara.models import SamsaraDriver, SamsaraTelematics, Samsara  # Updated import paths
from backend.drivers_operators.models import Driver  # Updated import path for Driver model
from backend.samsara.serializers import SamsaraSerializer  # Updated import path for SamsaraSerializer
from http.client import HTTPConnection
from backend.samsara.services import fetch_and_save_gps_data  # Updated import path for services

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Driver-related views

def driver_list(request):
    """View to list all drivers."""
    drivers = Driver.objects.all()  # Fetch all drivers from the database
    return render(request, 'backend/drivers_operators/drivers_list.html', {'drivers': drivers})  # Updated template path

def driver_detail(request, driver_id):
    """View to show details of a specific driver."""
    driver = get_object_or_404(Driver, pk=driver_id)
    return render(request, 'backend/drivers_operators/driver_detail.html', {'driver': driver})  # Updated template path

# Samsara-related views

# Function to fetch and save GPS data for a specific vehicle
def fetch_and_save_gps_data(vehicle_id):
    """Fetch and save GPS data from Samsara API for a given vehicle."""
    logging.info(f"Fetching data for vehicle ID: {vehicle_id}")
    current_time = int(now().timestamp() * 1000)
    one_minute_ago = current_time - (1 * 60 * 1000)

    api_url = f'https://api.samsara.com/v1/fleet/vehicles/{vehicle_id}/location?startMs={one_minute_ago}&endMs={current_time}'
    logging.info(f"API URL being called: {api_url}")

    headers = {
        'Authorization': f'Bearer {settings.SAMSARA_API_TOKEN}',
        'Accept': 'application/json'
    }

    try:
        response = requests.get(api_url, headers=headers)
        response.raise_for_status()
        data = response.json()

        logging.info(f"API Response: {data}")

        if 'locations' in data and data['locations']:
            most_recent_location = data['locations'][-1]

            samsara_record, created = SamsaraTelematics.objects.update_or_create(
                vehicle__vehicle_id=vehicle_id,
                defaults={
                    'location': most_recent_location.get('location', 'Location not available'),
                    'latitude': most_recent_location.get('latitude', None),
                    'longitude': most_recent_location.get('longitude', None),
                    'speed': most_recent_location.get('speedMilesPerHour', None),
                    'engine_hours': most_recent_location.get('engineHours', None),
                    'odometer': most_recent_location.get('odometerMiles', None),
                }
            )
            return samsara_record
        else:
            logging.error("No locations found in API response.")
            return None
    except requests.HTTPError as http_err:
        logging.error(f"HTTP error occurred: {http_err}")
        return None
    except requests.RequestException as e:
        logging.error(f"Error fetching data from Samsara API: {e}")
        return None

# API View to return Samsara data for a specific vehicle
@api_view(['GET'])
def get_samsara_data(request, vehicle_id):
    """Fetch Samsara data for a specific vehicle and return in JSON format."""
    try:
        samsara_data = get_object_or_404(Samsara, vehicle_id=vehicle_id)
        serializer = SamsaraSerializer(samsara_data)
        return Response(serializer.data)
    except Samsara.DoesNotExist:
        return Response({'error': 'Vehicle not found'}, status=404)
