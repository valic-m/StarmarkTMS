from django.contrib import admin
from backend.equipment.models import Truck, Trailer  # Updated import paths

# Register the Truck model in the admin interface
@admin.register(Truck)
class TruckAdmin(admin.ModelAdmin):
    list_display = ('name', 'license_plate', 'manufacturer', 'year')  # Ensure these fields exist in the Truck model
    search_fields = ('name', 'license_plate')  # Enable searching by name or license plate
    list_filter = ('year', 'manufacturer')  # Add filters for year and manufacturer

# Register the Trailer model in the admin interface
@admin.register(Trailer)
class TrailerAdmin(admin.ModelAdmin):
    list_display = ('name', 'license_plate', 'manufacturer', 'year')  # Ensure these fields exist in the Trailer model
    search_fields = ('name', 'license_plate')  # Enable searching by name or license plate
    list_filter = ('year', 'manufacturer')  # Add filters for year and manufacturer
