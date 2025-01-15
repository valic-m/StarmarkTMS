# backend/tenant_admin/apps.py
from django.contrib.admin.apps import AdminConfig

class TenantAdminConfig(AdminConfig):
    name = "backend.tenant_admin"
    label = "tenant_admin"

    def ready(self):
        """
        Override `ready()` so it does NOT call self.module.autodiscover().
        This way, Django won't look for backend.tenant_admin.autodiscover().
        """
        # Do any other admin-site initialization you want, but skip super():
        # super().ready()  # <-- do NOT call this
        pass
