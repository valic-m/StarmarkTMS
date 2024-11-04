from django.contrib import admin
from .models import Customer

class CustomerAdmin(admin.ModelAdmin):
    list_display = [
        'name', 'mc_number', 'scac', 'city', 'state', 'phone_number', 'email',
        'is_active', 'factoring', 'do_not_use', 'credit_limit'  # Removed 'approved_by' and 'approved_date'
    ]

    search_fields = [
        'name', 'mc_number', 'scac', 'city', 'state', 'phone_number', 'email'
    ]

    list_filter = [
        'state', 'city', 'is_active', 'factoring', 'do_not_use'  # Removed 'approved_by'
    ]

    ordering = ['name']

    # Customizing the form layout in the admin panel
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'mc_number', 'scac', 'address_street', 'address_number', 'city', 'state', 'zip_code')
        }),
        ('Contact Information', {
            'fields': ('contact_name', 'phone_number', 'cell_number', 'email', 'website')  # Adjusted for actual fields
        }),
        ('Payment & Tax Information', {
            'fields': ('term_pay', 'tax_id', 'credit_limit')  # Adjusted for actual fields
        }),
        ('Flags', {
            'fields': ('is_active', 'factoring', 'do_not_use')  # Removed 'whitelist'
        }),
        ('Accounts Payable', {
            'fields': ('accounts_payable_contact', 'accounts_payable_phone', 'accounts_payable_email', 'accounts_payable_address', 'accounts_payable_city', 'accounts_payable_state', 'accounts_payable_zip')
        }),
        ('Agents Information', {
            'fields': ('agent_name', 'agent_phone', 'agent_email')
        }),
        ('Additional Information', {
            'fields': ('notes',)
        }),
    )

# Register the Customer model with the customized admin view
admin.site.register(Customer, CustomerAdmin)
