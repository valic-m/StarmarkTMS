# File Path: C:/Users/valic/OneDrive/Documents/TMS/backend/dispatch/admin.py

from django.contrib import admin
from backend.dispatch.models import Dispatch  # Import only Dispatch model

# Admin configuration for Dispatch model
@admin.register(Dispatch)
class DispatchAdmin(admin.ModelAdmin):
    list_display = ('driver', 'load', 'status')  # Fields to display in admin
    search_fields = ('driver__full_name', 'load__reference_number')  # Fields to search
    list_filter = ('status',)  # Add filters for status
    ordering = ('driver',)  # Order by driver (replace with a valid field from your model)

# Do NOT register Load here, it’s already registered in loads/admin.py
