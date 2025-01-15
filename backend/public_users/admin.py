from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import PublicUser

@admin.register(PublicUser)
class PublicUserAdmin(UserAdmin):
    """
    Custom admin config for the PublicUser.
    Inherits from Django's built-in UserAdmin for convenience.
    """
    # You can override list_display, search_fields, etc.
    list_display = ("username", "email", "phone_number", "is_staff", "is_superuser")
    search_fields = ("username", "email", "phone_number")
