# models.py

from django.db import models

class ShipperReceiverCompany(models.Model):
    # Basic Information
    company_name = models.CharField(max_length=255)
    contact_person = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()
    address = models.TextField()

    # Shipping/Receiving Manager Information
    shipping_hours = models.CharField(max_length=100, help_text="Example: 9 AM - 6 PM")
    shipping_manager_name = models.CharField(max_length=100)
    shipping_manager_phone = models.CharField(max_length=15, blank=True, null=True)
    shipping_manager_email = models.EmailField(blank=True, null=True)

    # Additional Information
    rating = models.IntegerField(default=3, choices=[(i, i) for i in range(1, 6)], help_text="Rating from 1 to 5")
    load_time = models.DurationField(help_text="Time taken to load a truck (e.g., 2 hours)")
    comments = models.TextField(blank=True, null=True)
    directions = models.TextField(blank=True, null=True, help_text="Directions to the shipping/receiving location")

    # Do Not Load blacklist flag
    do_not_load = models.BooleanField(default=False, help_text="Mark this company as 'Do Not Load'")

    

    def __str__(self):
        return self.company_name


class Shipper(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    contact_number = models.CharField(max_length=20)

    def __str__(self):
        return self.name


class Receiver(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    contact_number = models.CharField(max_length=20)

    def __str__(self):
        return self.name
