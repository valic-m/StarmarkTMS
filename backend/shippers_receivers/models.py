from django.db import models
from django.conf import settings  # For dynamically pointing to the user model


class Category(models.Model):
    """
    Represents a category for location types or products shipped.
    """
    name = models.CharField(
        max_length=100,
        unique=True,
        help_text="Name of the category (e.g., Electronics, Furniture)."
    )
    description = models.TextField(
        blank=True,
        null=True,
        help_text="Detailed description of the category."
    )

    def __str__(self):
        return self.name


class Company(models.Model):
    """
    Abstract model for shared fields between Location and other company-related models.
    """
    name = models.CharField(
        max_length=255,
        help_text="Name of the company or location."
    )
    address_line1 = models.CharField(
        max_length=255,
        help_text="Primary address line."
    )
    address_line2 = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        help_text="Secondary address line (optional)."
    )
    city = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text="City where the company is located."
    )
    state = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text="State where the company is located."
    )
    zip_code = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        help_text="ZIP/Postal code of the location."
    )
    phone_number = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        help_text="Contact phone number for the company."
    )
    email = models.EmailField(
        blank=True,
        null=True,
        help_text="Email address for the company (optional)."
    )

    class Meta:
        abstract = True


class Location(Company):
    """
    Represents a physical location where pickups/deliveries occur.
    """
    load_time = models.DurationField(
        blank=True,
        null=True,
        help_text="Time taken to load/unload shipments."
    )
    do_not_load = models.BooleanField(
        default=False,
        help_text="Mark this location as 'Do Not Load'."
    )
    no_reefers = models.BooleanField(
        default=False,
        help_text="Check if this location does NOT load reefers."
    )
    plus_code = models.CharField(
        max_length=50,
        blank=True,
        null=True,
        help_text="Google Plus Code for the location."
    )
    website = models.URLField(
        max_length=255,
        blank=True,
        null=True,
        help_text="Website URL of the location, if available."
    )
    categories = models.ManyToManyField(
        Category,
        blank=True,
        related_name='locations',
        help_text="Categories for products or location types."
    )
    charges_lumper = models.BooleanField(
        default=False,
        help_text="Does this location charge for unloading?"
    )
    lumper_fee = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        blank=True,
        null=True,
        help_text="Fee charged for unloading, if applicable."
    )
    directions = models.TextField(
        blank=True,
        null=True,
        help_text="Specific directions to find or navigate to the location."
    )
    lat = models.FloatField(
        blank=True,
        null=True,
        help_text="Latitude of the location."
    )
    lng = models.FloatField(
        blank=True,
        null=True,
        help_text="Longitude of the location."
    )
    appointment_required = models.BooleanField(
        default=False,
        help_text="Indicates if an appointment is required for pickups/deliveries."
    )
    fcfs = models.BooleanField(
        default=False,
        help_text="Indicates if the location operates on a 'First Come, First Served' basis."
    )

    class Meta:
        unique_together = ('address_line1', 'city', 'state', 'zip_code')  # Prevent duplicate addresses
        verbose_name = "Location"
        verbose_name_plural = "Locations"

    def __str__(self):
        return self.name


class OperatingHours(models.Model):
    """
    Represents the operating hours for a location.
    """
    DAYS_OF_WEEK = [
        ('MON', 'Monday'),
        ('TUE', 'Tuesday'),
        ('WED', 'Wednesday'),
        ('THU', 'Thursday'),
        ('FRI', 'Friday'),
        ('SAT', 'Saturday'),
        ('SUN', 'Sunday'),
    ]

    location = models.ForeignKey(
        Location,
        on_delete=models.CASCADE,
        related_name='operating_hours',
        help_text="Location to which these operating hours belong."
    )
    day = models.CharField(
        max_length=3,
        choices=DAYS_OF_WEEK,
        help_text="Day of the week."
    )
    open_time = models.TimeField(
        blank=True,
        null=True,
        help_text="Opening time for the location on the selected day."
    )
    close_time = models.TimeField(
        blank=True,
        null=True,
        help_text="Closing time for the location on the selected day."
    )

    class Meta:
        unique_together = ('location', 'day')  # Ensure unique days for each location
        verbose_name = "Operating Hour"
        verbose_name_plural = "Operating Hours"

    def __str__(self):
        return f"{self.get_day_display()} - {self.location.name}"


class LocationPhoto(models.Model):
    """
    Represents photos related to products shipped from/to a location.
    """
    location = models.ForeignKey(
        Location,
        on_delete=models.CASCADE,
        related_name='photos',
        help_text="Location associated with this photo."
    )
    image = models.ImageField(
        upload_to='location_photos/',
        help_text="Upload a photo of the location."
    )
    description = models.TextField(
        blank=True,
        null=True,
        help_text="Description or notes about the photo."
    )

    def __str__(self):
        return f"Photo for {self.location.name}"


class LocationComment(models.Model):
    """
    Represents comments or notes added to a location.
    """
    location = models.ForeignKey(
        Location,
        on_delete=models.CASCADE,
        related_name='location_comments',
        help_text="Location associated with this comment."
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='user_location_comments',
        help_text="User who added the comment."
    )
    content = models.TextField(
        help_text="Content of the comment."
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        help_text="Timestamp when the comment was created."
    )

    def __str__(self):
        return f"Comment by {self.user.username} on {self.location.name}"
