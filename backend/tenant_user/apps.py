# tenant_user/apps.py
from django.apps import AppConfig

class TenantUserConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "backend.tenant_user"
    label = "tenant_user"  # a unique label so it doesn't conflict with anything else
