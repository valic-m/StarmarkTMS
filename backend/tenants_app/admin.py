# C:\Users\valic\Documents\Github\StarmarkTMS\backend\tenants_app\admin.py

from django.contrib import admin
from .models import Tenant, Domain

@admin.register(Tenant)
class TenantAdmin(admin.ModelAdmin):
    """
    Admin interface for the Tenant model.
    Displays essential fields and allows creating/editing
    tenant entries, which correspond to individual schemas.
    """
    list_display = (
        'name',
        'schema_name',
        'auto_create_schema',
        'seats',
    )


@admin.register(Domain)
class DomainAdmin(admin.ModelAdmin):
    """
    Admin interface for the Domain model.
    Each Domain entry links a domain/subdomain to a Tenant.
    """
    list_display = (
        'domain',
        'tenant',
        'is_primary',
    )
