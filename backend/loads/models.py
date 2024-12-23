from django.db import models
from backend.customers.models import Customer  # Ensure correct import for Customer model
from backend.shippers_receivers.models import Location
from django.conf import settings
CustomUser = settings.AUTH_USER_MODEL

# Load model
class Load(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)  # Link to a Customer
    reference_number = models.CharField(max_length=50)  # Required field for customer reference number
    load_number = models.PositiveIntegerField(unique=True, null=True, blank=True)  # Automatically incremented load number
    rate = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)  # Default value for rate

    # Load details
    trailer_type = models.CharField(
        max_length=50,
        choices=[('Dry Van', 'Dry Van'), ('Van or Reefer', 'Van or Reefer'), ('Reefer', 'Reefer')],
        default='Dry Van'
    )
    load_type = models.CharField(max_length=10, choices=[('Full Load', 'Full Load'), ('LTL', 'LTL')], default='Full Load')
    feet_required = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True, default=0.00)  # Optional field for space needed
    pallet_count = models.PositiveIntegerField(null=True, blank=True, default=0)  # Optional field for pallet count
    pallet_dimensions = models.CharField(max_length=100, null=True, blank=True)  # Optional field for pallet dimensions
    weight = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)  # Optional field for weight
    commodity = models.CharField(max_length=255, default='Unknown commodity')  # Default value for the commodity type

    # Pickup and dropoff details
    pickup_location = models.CharField(max_length=255, default="Unknown")  # Default value added
    dropoff_location = models.CharField(max_length=255)  # Mandatory dropoff location
    pickup_time = models.DateTimeField(null=True, blank=True)  # Optional pickup time
    delivery_time = models.DateTimeField(null=True, blank=True)  # Optional delivery time

    # Status automatically set to 'Booked' and not visible in the form
    status = models.CharField(max_length=20, default='Booked', editable=False)

    # Time of creation
    creation_date = models.DateTimeField(auto_now_add=True)

    # User who booked the load
    booked_by = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True, related_name='booked_loads')

    # Optional file attachment
    attachment = models.FileField(upload_to='attachments/', null=True, blank=True)

    # Override save method to start the load_number from 3000
    def save(self, *args, **kwargs):
        if not self.load_number:
            last_load = Load.objects.all().order_by('id').last()
            if last_load and last_load.load_number:
                self.load_number = last_load.load_number + 1
            else:
                self.load_number = 3000

        super().save(*args, **kwargs)

    def __str__(self):
        return f"Load {self.load_number} for {self.customer.name}"


# Pickup model
class Pickup(models.Model):
    load = models.ForeignKey(Load, related_name='pickups', on_delete=models.CASCADE)  # Link to a Load
    pickup_location = models.ForeignKey(Location, on_delete=models.CASCADE, limit_choices_to={'is_shipper': True})  # Limit choices to companies marked as shippers
    pickup_number = models.PositiveIntegerField()  # Manual or auto-incremented pickup number
    pickup_date = models.DateTimeField()  # Date and time of pickup

    def __str__(self):
        return f"Pickup {self.pickup_number} for Load {self.load.load_number}"


# Delivery model
class Delivery(models.Model):
    load = models.ForeignKey(Load, related_name='deliveries', on_delete=models.CASCADE)  # Link to a Load
    delivery_location = models.ForeignKey(Location, on_delete=models.CASCADE, limit_choices_to={'is_receiver': True})  # Limit choices to companies marked as receivers
    delivery_number = models.PositiveIntegerField()  # Manual or auto-incremented delivery number
    delivery_date = models.DateTimeField()  # Date and time of delivery

    def __str__(self):
        return f"Delivery {self.delivery_number} for Load {self.load.load_number}"
