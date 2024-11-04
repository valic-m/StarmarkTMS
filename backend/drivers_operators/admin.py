# Path: C:/Users/valic/OneDrive/Documents/TMS/backend/drivers_operators/admin.py

from django.contrib import admin
from backend.drivers_operators.models import Driver  # Updated import path

@admin.register(Driver)
class DriverAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'is_employee', 'assigned_truck', 'user')  # Display user as well
    search_fields = ('full_name', 'email', 'phone_number')  # Add search fields for better filtering
    list_filter = ('is_employee', 'is_active')  # Add filters for employee status and activity status
    ordering = ('full_name',)  # Order by full name
