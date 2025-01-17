# backend/users/admin.py

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model
from django.contrib.admin.sites import AlreadyRegistered

CustomUser = get_user_model()

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ("email", "first_name", "last_name", "role", "is_staff")
    list_filter = ("role", "is_staff", "is_active")

    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal Info", {"fields": ("first_name", "last_name")}),
        ("Permissions", {
            "fields": ("role", "is_active", "is_staff", "is_superuser", "groups", "user_permissions")
        }),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "email", "password1", "password2",
                "first_name", "last_name", "role",
                "is_active", "is_staff", "is_superuser"
            )
        }),
    )
    search_fields = ("email", "first_name", "last_name")
    ordering = ("email",)

try:
    admin.site.register(CustomUser, CustomUserAdmin)
except AlreadyRegistered:
    pass
