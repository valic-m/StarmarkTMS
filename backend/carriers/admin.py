# File Path: C:/Users/valic/OneDrive/Documents/TMS/backend/carriers/admin.py

from django.contrib import admin
from .models import Carrier

# Define the admin configuration for the Carrier model
@admin.register(Carrier)
class CarrierAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'email', 'active')  # Fields to display in the list view
    search_fields = ('name', 'phone', 'email')  # Fields to include in the search bar
    list_filter = ('active',)  # Add a filter by active status
    ordering = ('name',)  # Order the list of carriers by name
