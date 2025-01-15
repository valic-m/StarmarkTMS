from django.contrib.auth.apps import AuthConfig

class TenantAuthConfig(AuthConfig):
    name = "backend.tenant_auth"
    label = "tenant_auth"  # MUST differ from 'auth'
    verbose_name = "Tenant Auth"
