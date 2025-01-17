from django.contrib.auth.apps import AuthConfig

class TenantAuthConfig(AuthConfig):
    name = "backend.tenant_auth"
    label = "tenant_auth"
    verbose_name = "Tenant Auth"
