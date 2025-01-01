# backend/vendors/admin.py

from django.contrib import admin
from django.utils.html import format_html
from .models import Vendor

@admin.register(Vendor)
class VendorAdmin(admin.ModelAdmin):
    """
    Admin interface for the Vendor model.
    """
    list_display = ('name', 'phone_number', 'email', 'short_address')
    list_filter = ('name',)
    search_fields = ('name', 'phone_number', 'email', 'address')
    ordering = ('name',)
    list_per_page = 25
    fields = ('name', 'address', 'phone_number', 'email', 'notes')
    readonly_fields = ()

    def short_address(self, obj):
        """
        Returns a truncated version of the address for display purposes.
        """
        if len(obj.address) > 50:
            return f"{obj.address[:47]}..."
        return obj.address
    short_address.short_description = "Address"

    # Optionally, add a method to display a link to the vendor's email
    def email_link(self, obj):
        if obj.email:
            return format_html('<a href="mailto:{}">{}</a>', obj.email, obj.email)
        return "No Email"
    email_link.short_description = "Email"

    # To use email_link instead of email in list_display, uncomment the following line:
    # list_display = ('name', 'phone_number', 'email_link', 'short_address')
