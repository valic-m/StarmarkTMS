# backend/tenant_admin/apps.py

from django.contrib.admin.apps import AdminConfig

class TenantAdminConfig(AdminConfig):
    name = "backend.tenant_admin"
    label = "tenant_admin"

    def ready(self):
        # Skips autodiscover
        pass
