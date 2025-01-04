# tenants/models.py

from django_tenants.models import TenantMixin, DomainMixin
from django.db import models

class Tenant(TenantMixin):
    """
    Each row in this model corresponds to one tenant (company).
    The schema_name is crucial (e.g., 'tenant1', 'tenant2', etc.)
    """
    name = models.CharField(max_length=100, unique=True)
    # You can add seats or plan info if needed
    seats = models.PositiveIntegerField(default=1)

    # TenantMixin requires you define at least "auto_create_schema = True" or handle it manually
    auto_create_schema = True

    def __str__(self):
        return self.name

class Domain(DomainMixin):
    """
    Each tenant can have multiple domains/subdomains pointing to it.
    e.g. acme.example.com -> tenant 'acme'
    """
    pass
