# admin.py

from django.contrib import admin
from .models import ShipperReceiverCompany, Shipper, Receiver

@admin.register(ShipperReceiverCompany)
class ShipperReceiverCompanyAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'contact_person', 'phone_number', 'email',)
    search_fields = ('company_name', 'contact_person', 'email')
    list_filter = ('do_not_load',)  # Make sure this is a tuple

@admin.register(Shipper)
class ShipperAdmin(admin.ModelAdmin):
    list_display = ('name', 'address', 'contact_number')
    search_fields = ('name', 'address')

@admin.register(Receiver)
class ReceiverAdmin(admin.ModelAdmin):
    list_display = ('name', 'address', 'contact_number')
    search_fields = ('name', 'address')
