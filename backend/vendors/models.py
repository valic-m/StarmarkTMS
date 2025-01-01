from django.db import models

class Vendor(models.Model):
    """
    Represents a vendor or payee for trucks.
    """
    name = models.CharField(max_length=255, help_text="Name of the vendor.")
    address = models.TextField(blank=True, help_text="Address of the vendor.")
    phone_number = models.CharField(max_length=15, blank=True, help_text="Contact phone number.")
    email = models.EmailField(blank=True, help_text="Email address of the vendor.")
    notes = models.TextField(blank=True, help_text="Additional notes about the vendor.")

    def __str__(self):
        return self.name
