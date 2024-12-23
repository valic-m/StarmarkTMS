from django.db import models


class Category(models.Model):
    """
    Represents a category for location types or products shipped.
    """
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class Company(models.Model):
    """
    Abstract model for shared fields between Location and Customer.
    """
    name = models.CharField(max_length=255)
    address_line1 = models.CharField(max_length=255)
    address_line2 = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    zip_code = models.CharField(max_length=20, blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)

    class Meta:
        abstract = True


class Location(Company):
    """
    Represents a physical location where pickups/deliveries occur.
    """
    shipping_hours_from = models.TimeField(blank=True, null=True, help_text="Start of shipping hours")
    shipping_hours_to = models.TimeField(blank=True, null=True, help_text="End of shipping hours")
    load_time = models.DurationField(blank=True, null=True, help_text="Time taken to load/unload")
    do_not_load = models.BooleanField(default=False, help_text="Mark this location as 'Do Not Load'")
    no_reefers = models.BooleanField(default=False, help_text="Check if this location does NOT load reefers")

    # Additional Attributes
    categories = models.ManyToManyField(Category, blank=True, related_name='locations', help_text="Categories for products or location types")
    charges_lumper = models.BooleanField(default=False, help_text="Does this location charge for unloading?")
    lumper_fee = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, help_text="Fee charged for unloading, if applicable")
    comments = models.TextField(blank=True, null=True)
    directions = models.TextField(blank=True, null=True, help_text="Directions to the location")

    def __str__(self):
        return self.name


class Customer(Company):
    """
    Represents an entity responsible for freight charges.
    """
    is_lead = models.BooleanField(default=True, help_text="Mark as a potential customer")
    rating = models.IntegerField(
        default=3,
        choices=[(i, i) for i in range(1, 6)],
        help_text="Customer rating from 1 to 5"
    )
    comments = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class LocationPhoto(models.Model):
    """
    Represents photos related to products shipped from/to a location.
    """
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='photos')
    image = models.ImageField(upload_to='location_photos/')
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Photo for {self.location.name}"
