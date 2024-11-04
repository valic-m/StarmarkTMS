from django.db import models
from backend.companies.models import OperationalCompany  # Import from companies app
from backend.carriers.models import Carrier  # Updated import path for Carrier model

# Truck Model
class Truck(models.Model):
    # Basic truck information
    name = models.CharField(max_length=100)  # Name of the truck
    license_plate = models.CharField(max_length=20, unique=True)  # License plate of the truck
    manufacturer = models.CharField(max_length=100)  # Manufacturer
    year = models.PositiveIntegerField()  # Year of manufacture
    vin = models.CharField(max_length=17, unique=True)  # VIN number (unique)

    # Truck number and Samsara integration
    truck_number = models.CharField(max_length=20, blank=True, null=True)  # Truck number or Samsara vehicle ID
    samsara_device_id = models.CharField(max_length=50, blank=True, null=True, unique=True)  # Samsara GPS tracking integration

    # Foreign keys for ownership and carrier details
    owner = models.ForeignKey(OperationalCompany, on_delete=models.CASCADE)  # Link to the OperationalCompany model (truck owner)
    carrier = models.ForeignKey(Carrier, on_delete=models.CASCADE, null=True, blank=True)  # Link to the Carrier model (optional)

    # Additional fields for tracking and maintenance
    inspection_due = models.DateField()  # Next inspection due date
    registration_exp = models.DateField()  # Registration expiry date
    insurance_exp = models.DateField()  # Insurance expiry date

    # Additional truck attributes
    fuel_type = models.CharField(max_length=50, blank=True)  # Type of fuel
    tire_size = models.CharField(max_length=50, blank=True)  # Tire size
    length_ft = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)  # Length in feet
    axles = models.PositiveIntegerField(blank=True, null=True)  # Number of axles
    color = models.CharField(max_length=30, blank=True)  # Color of the truck
    gross_weight = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)  # Gross weight of the truck
    unladen_weight = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)  # Unladen weight
    acquired_date = models.DateField(blank=True, null=True)  # Date acquired
    value = models.DecimalField(max_digits=15, decimal_places=2, blank=True, null=True)  # Value of the truck
    downpayment = models.DecimalField(max_digits=15, decimal_places=2, blank=True, null=True)  # Downpayment made for the truck
    sold_date = models.DateField(blank=True, null=True)  # Date the truck was sold
    sold_value = models.DecimalField(max_digits=15, decimal_places=2, blank=True, null=True)  # Value for which the truck was sold

    def __str__(self):
        return f"{self.name} ({self.license_plate})"


# Trailer Model
class Trailer(models.Model):
    # Trailer information
    name = models.CharField(max_length=100)  # Name of the trailer
    license_plate = models.CharField(max_length=20, unique=True)  # License plate of the trailer
    manufacturer = models.CharField(max_length=100)  # Manufacturer
    year = models.PositiveIntegerField()  # Year of manufacture
    samsara_device_id = models.CharField(max_length=50, blank=True, null=True)  # Samsara GPS tracking integration

    def __str__(self):
        return self.name


# Samsara Model for GPS/Telematics Data
class Samsara(models.Model):
    # Telematics data from Samsara
    vehicle_id = models.CharField(max_length=50, unique=True)  # Unique vehicle ID from Samsara
    location = models.CharField(max_length=100)  # Location name or address
    latitude = models.FloatField()  # Latitude coordinate
    longitude = models.FloatField()  # Longitude coordinate
    speed = models.FloatField(null=True, blank=True)  # Speed in miles per hour
    engine_hours = models.FloatField(null=True, blank=True)  # Engine hours
    odometer = models.FloatField(null=True, blank=True)  # Odometer in miles

    def __str__(self):
        return f"Vehicle ID: {self.vehicle_id}, Location: {self.location}"
