# In backend/tenants_app/apps.py
from django.apps import AppConfig

class TenantsAppConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "backend.tenants_app"
    label = "tenants_app"
