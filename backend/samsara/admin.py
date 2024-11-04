# File Path: C:/Users/valic/OneDrive/Documents/TMS/backend/samsara/admin.py

from django.contrib import admin
from .models import SamsaraDriver, SamsaraTelematics  # Import only the required models

# Admin settings for SamsaraDriver
@admin.register(SamsaraDriver)
class SamsaraDriverAdmin(admin.ModelAdmin):
    list_display = ('driver_name', 'vehicle_name', 'external_id', 'created_at')  # Fields to display in the admin list view
    search_fields = ('driver_name', 'vehicle_name', 'external_id')  # Fields to search in the admin search bar

# Admin settings for SamsaraTelematics
@admin.register(SamsaraTelematics)
class SamsaraTelematicsAdmin(admin.ModelAdmin):
    list_display = ('vehicle', 'location', 'latitude', 'longitude', 'last_updated')  # Fields to display for telematics data
    search_fields = ('vehicle__vehicle_name', 'location')  # Search by vehicle name and location
