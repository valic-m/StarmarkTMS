# Path: C:/Users/valic/OneDrive/Documents/TMS/backend/dispatch/models.py

from django.db import models
from django.core.exceptions import ValidationError  # Import ValidationError
from backend.loads.models import Load  # Updated import path for Load model
from backend.drivers_operators.models import Driver  # Updated import path for Driver model
from backend.equipment.models import Truck  # Updated import path for Truck model

class Dispatch(models.Model):
    load = models.ForeignKey(Load, on_delete=models.CASCADE)
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE)
    truck = models.ForeignKey(Truck, on_delete=models.CASCADE)

    # Time and status tracking fields
    dispatch_time = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20, 
        choices=[
            ('Pending', 'Pending'),
            ('Dispatched', 'Dispatched'),
            ('Loaded', 'Loaded'),
            ('Unloaded', 'Unloaded'),
        ], 
        default='Pending'
    )
    pickup_time = models.DateTimeField(null=True, blank=True)  # Optional pickup time
    delivery_time = models.DateTimeField(null=True, blank=True)  # Optional delivery time
    shipper_in_time = models.DateTimeField(null=True, blank=True)  # Arrival time at shipper
    shipper_out_time = models.DateTimeField(null=True, blank=True)  # Departure time from shipper
    receiver_in_time = models.DateTimeField(null=True, blank=True)  # Arrival time at receiver
    receiver_out_time = models.DateTimeField(null=True, blank=True)  # Departure time from receiver

    # Clean method for validation
    def clean(self):
        # Validate pickup_time when status is 'Loaded'
        if self.status == 'Loaded' and not self.pickup_time:
            raise ValidationError("Pickup time must be set when the status is 'Loaded'")
        
        # Validate delivery_time when status is 'Unloaded'
        if self.status == 'Unloaded' and not self.delivery_time:
            raise ValidationError("Delivery time must be set when the status is 'Unloaded'")

    def __str__(self):
        return f"Dispatch for Load {self.load.id} with Truck {self.truck.name} and Driver {self.driver.full_name}"

    class Meta:
        verbose_name = "Dispatch"
        verbose_name_plural = "Dispatches"
