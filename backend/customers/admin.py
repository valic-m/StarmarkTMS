from django.contrib import admin
from .models import Customer


class CustomerAdmin(admin.ModelAdmin):
    """
    Custom admin view for the Customer model.
    """
    list_display = [
        'name', 'mc_number', 'scac', 'city', 'state', 'phone_number', 'email',
        'is_active', 'factoring', 'do_not_use', 'credit_limit'
    ]

    search_fields = [
        'name', 'mc_number', 'scac', 'city', 'state', 'phone_number', 'email'
    ]

    list_filter = [
        'state', 'city', 'is_active', 'factoring', 'do_not_use'
    ]

    ordering = ['name']

    # Customizing the form layout in the admin panel
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'mc_number', 'scac', 'address_street', 'address_number', 'city', 'state', 'zip_code')
        }),
        ('Contact Information', {
            'fields': ('contact_name', 'phone_number', 'cell_number', 'email', 'website')
        }),
        ('Payment & Tax Information', {
            'fields': ('term_pay', 'tax_id', 'credit_limit')
        }),
        ('Flags', {
            'fields': ('is_active', 'factoring', 'do_not_use')
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

    def get_readonly_fields(self, request, obj=None):
        """
        Restrict the 'do_not_use' field to superusers only.
        """
        if not request.user.is_superuser:  # Check if the user is not a superuser
            return ['do_not_use']
        return []

    def has_change_permission(self, request, obj=None):
        """
        Allow editing only for superusers.
        """
        if not request.user.is_superuser:  # Check if the user is not a superuser
            return False  # Prevent edits for non-superusers
        return super().has_change_permission(request, obj)


# Register the Customer model with the customized admin view
admin.site.register(Customer, CustomerAdmin)
