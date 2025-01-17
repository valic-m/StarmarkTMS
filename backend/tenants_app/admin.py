# backend/tenants_app/admin.py

from django.contrib import admin
from .models import Tenant, Domain

@admin.register(Tenant)
class TenantAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'schema_name',
        'auto_create_schema',
        'seats',
    )

@admin.register(Domain)
class DomainAdmin(admin.ModelAdmin):
    list_display = (
        'domain',
        'tenant',
        'is_primary',
    )
