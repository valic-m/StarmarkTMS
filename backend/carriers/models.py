# backend/carriers/models.py

from django.db import models

class Carrier(models.Model):
    """
    Model representing a transportation carrier.
    """
    name = models.CharField(max_length=100, verbose_name="Carrier Name")  # Name of the carrier
    phone = models.CharField(max_length=15, verbose_name="Phone Number")  # Phone number of the carrier
    email = models.EmailField(verbose_name="Email Address")  # Email address of the carrier
    address = models.TextField(verbose_name="Carrier Address")  # Physical address of the carrier
    services_offered = models.TextField(verbose_name="Services Offered")  # Description of the services offered by the carrier
    active = models.BooleanField(default=True, verbose_name="Is Active?")  # Whether the carrier is currently active

    class Meta:
        verbose_name = "Carrier"
        verbose_name_plural = "Carriers"
        ordering = ['name']  # Orders the carrier list by name in ascending order by default
        # Optional app_label (shouldn't be needed if INSTALLED_APPS is correct)
        # app_label = 'backend.carriers'
        app_label = 'carriers'

    def __str__(self):
        return self.name  # String representation of the carrier (returns the carrier's name)
