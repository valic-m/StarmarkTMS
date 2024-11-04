# Path: C:\Users\valic\OneDrive\Documents\TMS\backend\accounting\admin.py

from django.contrib import admin
from .models import Invoice  # Importing the Invoice model

# Register the Invoice model in the admin interface
@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ('load', 'invoice_date', 'total_amount', 'is_paid')  # Display key fields in the admin panel
    search_fields = ('load__id', 'invoice_date')  # Enable search by load ID and invoice date
    list_filter = ('is_paid', 'invoice_date')  # Add filters for payment status and invoice date
    ordering = ('-invoice_date',)  # Order by invoice date, newest first
