# Path: C:/Users/valic/OneDrive/Documents/TMS/backend/samsara/urls.py

from django.urls import path
from backend.samsara.views import driver_list, driver_detail, get_samsara_data  # Updated import paths

urlpatterns = [
    # Driver-related routes
    path('drivers/', driver_list, name='driver_list'),  # Lists all drivers
    path('drivers/<int:driver_id>/', driver_detail, name='driver_detail'),  # Driver details

    # API route for Samsara vehicle data
    path('api/samsara/<str:vehicle_id>/', get_samsara_data, name='get_samsara_data'),  # Get Samsara data by vehicle ID
]
