from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

class TenantUser(AbstractUser):
    """
    A separate user model for each tenant's schema.
    This is NOT the global user. It's used only by tenants.
    """

    # Override the default M2M fields with unique related_name to avoid collisions:
    groups = models.ManyToManyField(
        Group,
        related_name="tenantuser_set",   # or any unique string
        blank=True,
        help_text="The groups this user belongs to."
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="tenantuser_set",   # again, must be unique
        blank=True,
        help_text="Specific permissions for this user."
    )
