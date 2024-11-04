from django.contrib import admin
from backend.companies.models import OperationalCompany

# Using the decorator approach to register the model
@admin.register(OperationalCompany)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone_number', 'email', 'mc_number', 'logo', 'favicon')  # Added 'logo' and 'favicon'
    search_fields = ('name', 'email')  # Searchable fields in the admin
    fields = (
        'name', 'address', 'city', 'state', 'zip_code',
        'phone_number', 'fax_number', 'email', 'email_password',
        'federal_id', 'mc_number', 'bank_name', 'bank_address',
        'bank_city', 'bank_phone', 'bank_fraction_number',
        'bank_account_number', 'bank_routing_number',
        'driver_instructions', 'brokerage_notes', 'logo', 'favicon',  # Added 'favicon' and 'logo'
    )  # Fields displayed in the admin detail form
