# File Path: C:/Users/valic/OneDrive/Documents/TMS/backend/loads/admin.py

from django.contrib import admin
from backend.loads.models import Load, Pickup, Delivery  # Updated import path

# Load Admin configuration
class LoadAdmin(admin.ModelAdmin):
    list_display = ['customer', 'reference_number', 'trailer_type', 'load_type', 'status', 'booked_by']  # Display key fields
    search_fields = ['customer__name', 'reference_number', 'trailer_type', 'commodity']  # Enable search by related fields
    list_filter = ['trailer_type', 'load_type', 'status', 'booked_by']  # Add filters for relevant fields
    ordering = ['-creation_date']  # Order by creation date, newest first

# Pickup Admin configuration
class PickupAdmin(admin.ModelAdmin):
    list_display = ['load', 'pickup_location', 'pickup_date']  # Show load and pickup info
    search_fields = ['load__reference_number', 'pickup_location__company_name']  # Enable search by reference number and company name
    list_filter = ['pickup_date']  # Add filter for pickup date

# Delivery Admin configuration
class DeliveryAdmin(admin.ModelAdmin):
    list_display = ['load', 'delivery_location', 'delivery_date']  # Show load and delivery info
    search_fields = ['load__reference_number', 'delivery_location__company_name']  # Enable search by reference number and company name
    list_filter = ['delivery_date']  # Add filter for delivery date

# Register models with their admin configurations
admin.site.register(Load, LoadAdmin)
admin.site.register(Pickup, PickupAdmin)
admin.site.register(Delivery, DeliveryAdmin)
