from django.conf import settings
from django.db import models

class Driver(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=1)  # Link to custom User model
    full_name = models.CharField(max_length=100)
    print_check_as = models.CharField(max_length=100, blank=True)  # Optional check name
    is_employee = models.BooleanField(default=False)  # Employee status
    ssn = models.CharField(max_length=11, blank=True, null=True)  # Social Security Number
    ein = models.CharField(max_length=15, blank=True, null=True)  # EIN if 1099 contractor

    # Payment information
    pay_type = models.CharField(
        max_length=50,
        choices=[('Percentage', 'Percentage'), ('Per Mile', 'Per Mile'), ('Flat Rate', 'Flat Rate')],
        default='Percentage'
    )
    pay_rate = models.DecimalField(max_digits=10, decimal_places=2)  # Pay rate

    # Assigned truck and trailer
    assigned_truck = models.CharField(max_length=50, blank=True, null=True)
    assigned_trailer = models.CharField(max_length=50, blank=True, null=True)

    # Additional information
    dob = models.DateField(null=True, blank=True)
    hire_date = models.DateField(null=True, blank=True)
    termination_date = models.DateField(null=True, blank=True)
    annual_review_date = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    # Contact details
    address = models.TextField(blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True)
    emergency_contact_name = models.CharField(max_length=100, blank=True)
    emergency_contact_phone = models.CharField(max_length=15, blank=True)

    # License details
    drivers_license_number = models.CharField(max_length=50)
    license_state = models.CharField(max_length=2)
    license_expiration_date = models.DateField()

    # Portal login details
    email = models.EmailField()  # Should ideally be linked to the user field
    password = models.CharField(max_length=128)  # Note: Django will store hashed passwords in the User model

    # Notes
    notes = models.TextField(blank=True)

    def __str__(self):
        return self.full_name
