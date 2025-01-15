from django.apps import AppConfig

class PublicUsersConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    # This label ensures migrations, etc., are namespaced to "public_users"
    name = "backend.public_users"
    label = "public_users"
