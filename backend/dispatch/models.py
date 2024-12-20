from django.db import models
from django.core.exceptions import ValidationError
from backend.loads.models import Load
from backend.drivers_operators.models import Driver
from backend.equipment.models import Truck


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
            ('In Transit', 'In Transit'),
            ('Completed', 'Completed'),
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
        if self.status == 'In Transit' and not self.pickup_time:
            raise ValidationError("Pickup time must be set when the status is 'In Transit'")

        # Validate delivery_time when status is 'Completed'
        if self.status == 'Completed' and not self.delivery_time:
            raise ValidationError("Delivery time must be set when the status is 'Completed'")

    def __str__(self):
        return f"Dispatch for Load {self.load.load_number} with Truck {self.truck.name} and Driver {self.driver.full_name}"

    class Meta:
        verbose_name = "Dispatch"
        verbose_name_plural = "Dispatches"


class DispatchStop(models.Model):
    dispatch = models.ForeignKey(Dispatch, related_name='stops', on_delete=models.CASCADE)
    location = models.CharField(max_length=255)  # Stop location
    stop_order = models.PositiveIntegerField()  # Sequence order for the stop
    pallets_handled = models.PositiveIntegerField(null=True, blank=True)  # Number of pallets handled
    weight_handled = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)  # Weight handled
    is_crossdock = models.BooleanField(default=False)  # Mark if this is a crossdock stop
    is_internal = models.BooleanField(default=True)  # Hidden from customer
    arrival_time = models.DateTimeField(null=True, blank=True)
    departure_time = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Stop {self.stop_order} at {self.location} for Dispatch {self.dispatch.id}"