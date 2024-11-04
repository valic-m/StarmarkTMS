# Path: C:/Users/valic/OneDrive/Documents/TMS/backend/samsara/models.py

from django.db import models

# Simplified model to store Samsara vehicle information for now
class Samsara(models.Model):
    vehicle_id = models.CharField(max_length=50, unique=True)  # Unique vehicle ID from Samsara API
    location = models.CharField(max_length=100)  # Location name or address
    latitude = models.FloatField()  # Latitude coordinate
    longitude = models.FloatField()  # Longitude coordinate
    speed = models.FloatField(null=True, blank=True)  # Speed in miles per hour
    engine_hours = models.FloatField(null=True, blank=True)  # Engine hours
    odometer = models.FloatField(null=True, blank=True)  # Odometer in miles
    last_updated = models.DateTimeField(auto_now=True)  # Track when the data was last updated

    def __str__(self):
        return f"Vehicle ID: {self.vehicle_id}, Location: {self.location}"

# Model to represent a Samsara driver
class SamsaraDriver(models.Model):
    driver_id = models.CharField(max_length=50, unique=True, null=True, blank=True)
    driver_name = models.CharField(max_length=100)
    vehicle_id = models.CharField(max_length=50, unique=True, null=True, blank=True)
    vehicle_name = models.CharField(max_length=100)
    external_id = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Driver: {self.driver_name}, Vehicle: {self.vehicle_name}"

# Model to store telematics data for a vehicle
class SamsaraTelematics(models.Model):
    vehicle = models.ForeignKey('Samsara', on_delete=models.CASCADE, related_name='telematics')  # Link to the Samsara model
    location = models.CharField(max_length=100)  # Location or address
    latitude = models.FloatField()  # Latitude coordinate
    longitude = models.FloatField()  # Longitude coordinate
    speed = models.FloatField(null=True, blank=True)  # Speed in miles per hour
    engine_hours = models.FloatField(null=True, blank=True)  # Engine hours
    odometer = models.FloatField(null=True, blank=True)  # Odometer in miles
    last_updated = models.DateTimeField(auto_now=True)  # Track when the data was last updated

    def __str__(self):
        return f"Vehicle: {self.vehicle}, Location: {self.location}"
