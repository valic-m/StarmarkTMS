from django.contrib import admin
from django.urls import path, reverse
from django.shortcuts import get_object_or_404
from django.http import Http404
from .models import Customer
import logging

logger = logging.getLogger(__name__)

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    """
    Custom admin view for the Customer model, supporting slugs and IDs.
    """
    list_display = [
        'name', 'slug', 'mc_number', 'scac', 'city', 'state', 'phone_number', 'email',
        'is_active', 'factoring', 'do_not_use', 'credit_limit'
    ]
    search_fields = [
        'name', 'slug', 'mc_number', 'scac', 'city', 'state', 'phone_number', 'email'
    ]
    list_filter = [
        'state', 'city', 'is_active', 'factoring', 'do_not_use'
    ]
    ordering = ['name']
    prepopulated_fields = {"slug": ("name",)}  # Automatically generate slug from name

    fieldsets = (
        ('Basic Information', {
            'fields': (
            'name', 'slug', 'mc_number', 'scac', 'address_street', 'address_number', 'city', 'state', 'zip_code')
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
            'fields': ('accounts_payable_contact', 'accounts_payable_phone', 'accounts_payable_email',
                       'accounts_payable_address', 'accounts_payable_city', 'accounts_payable_state',
                       'accounts_payable_zip')
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
        Make 'do_not_use' readonly for non-superusers.
        """
        if not request.user.is_superuser:
            return ['do_not_use']
        return []

    def has_change_permission(self, request, obj=None):
        """
        Allow change permissions only for superusers.
        """
        if not request.user.is_superuser:
            return False
        return super().has_change_permission(request, obj)

    def get_urls(self):
        """
        Override the default admin URLs to use the identifier (pk or slug).
        """
        urls = super().get_urls()
        custom_urls = [
            path('<str:identifier>/change/', self.admin_site.admin_view(self.change_view_with_identifier),
                 name='customer_change'),
        ]
        return custom_urls + urls

    def change_view_with_identifier(self, request, identifier, form_url='', extra_context=None):
        """
        Custom change view that fetches the customer by pk or slug.
        Prioritize pk lookup to avoid conflicts with numeric slugs.
        """
        try:
            # Attempt to interpret identifier as pk
            customer = get_object_or_404(Customer, pk=int(identifier))
            logger.debug(f"Found Customer by pk={identifier}: {customer}")
        except (ValueError, Customer.DoesNotExist):
            try:
                # Fallback to slug lookup
                customer = get_object_or_404(Customer, slug=identifier)
                logger.debug(f"Found Customer by slug='{identifier}': {customer}")
            except Customer.DoesNotExist:
                logger.error(f"No Customer matches the identifier '{identifier}'")
                raise Http404(f"No Customer matches the given identifier '{identifier}'.")
        return self.changeform_view(request, object_id=str(customer.pk), form_url=form_url, extra_context=extra_context)

    def url_for_result(self, result):
        """
        Override this method to generate the correct change URL using the pk.
        """
        return reverse('admin:customer_change', args=[str(result.pk)])

    def get_queryset(self, request):
        """
        Customize queryset to prevent filtering issues.
        """
        return super().get_queryset(request)

    def get_changeform_initial_data(self, request):
        """
        Prepopulate initial form data (optional).
        """
        return super().get_changeform_initial_data(request)
