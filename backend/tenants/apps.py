# C:\Users\valic\Documents\Github\StarmarkTMS\backend\tenants\apps.py

from django.apps import AppConfig

class TenantsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'backend.tenants'
    # ^ Adjust to match your actual python path (if your app is "tenants", then "tenants" here)
