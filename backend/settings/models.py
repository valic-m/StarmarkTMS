# File: C:\Users\valic\Documents\Github\StarmarkTMS\backend\settings\models.py

from django.db import models
from django.contrib.auth.models import Group

class SettingsCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)  # e.g., "Customer Settings"
    description = models.TextField(blank=True, null=True)  # Optional description
    route = models.CharField(max_length=255)  # e.g., "/settings/customers"
    roles = models.ManyToManyField(Group, blank=True)  # Restrict access to specific roles

    def __str__(self):
        return self.name
