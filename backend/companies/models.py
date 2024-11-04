from django.db import models

class OperationalCompany(models.Model):
    # Basic Information
    name = models.CharField(max_length=100, unique=True, verbose_name="Company Name")  # Company Name
    address = models.CharField(max_length=255, verbose_name="Address")  # Address
    city = models.CharField(max_length=100, verbose_name="City")  # City
    state = models.CharField(max_length=50, verbose_name="State", blank=True, null=True)  # State (optional)
    zip_code = models.CharField(max_length=10, verbose_name="Zip Code")  # Zip Code
    phone_number = models.CharField(max_length=15, verbose_name="Phone Number")  # Phone Number
    fax_number = models.CharField(max_length=15, null=True, blank=True, verbose_name="Fax Number")  # Fax Number
    email = models.EmailField(verbose_name="Email Address")  # Email
    email_password = models.CharField(max_length=50, verbose_name="Email Password")  # Email Password
    client_number = models.CharField(max_length=50, null=True, blank=True, verbose_name="Client Number")  # Client Number
    federal_id = models.CharField(max_length=20, null=True, blank=True, verbose_name="Federal Tax ID")  # Federal Tax ID
    mc_number = models.CharField(max_length=20, null=True, blank=True, verbose_name="Motor Carrier Number")  # Motor Carrier Number

    # Bank Information
    bank_name = models.CharField(max_length=100, null=True, blank=True, verbose_name="Bank Name")  # Bank Name
    bank_address = models.CharField(max_length=255, null=True, blank=True, verbose_name="Bank Address")  # Bank Address
    bank_city = models.CharField(max_length=100, null=True, blank=True, verbose_name="Bank City")  # Bank City
    bank_phone = models.CharField(max_length=15, null=True, blank=True, verbose_name="Bank Phone")  # Bank Phone
    bank_fax = models.CharField(max_length=15, null=True, blank=True, verbose_name="Bank Fax")  # Bank Fax
    bank_fraction_number = models.CharField(max_length=20, null=True, blank=True, verbose_name="Bank Fraction Number")  # Fraction Number
    bank_account_number = models.CharField(max_length=20, null=True, blank=True, verbose_name="Bank Account Number")  # Account Number
    bank_routing_number = models.CharField(max_length=20, null=True, blank=True, verbose_name="Bank Routing Number")  # Routing Number

    # Driver Instructions
    driver_instructions = models.TextField(null=True, blank=True, verbose_name="Driver Instructions")  # Instructions for drivers

    # Brokerage Notes
    brokerage_notes = models.TextField(null=True, blank=True, verbose_name="Brokerage Notes")  # Special billing notes for brokers

    # Logo and Favicon
    logo = models.ImageField(upload_to='company_logos/', null=True, blank=True, verbose_name="Company Logo")  # Company logo
    favicon = models.ImageField(upload_to='company_favicons/', null=True, blank=True, verbose_name="Company Favicon")  # Company favicon

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Date Created")  # Date created
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Date Updated")  # Date updated

    def __str__(self):
        return self.name

    class Meta:
        app_label = 'companies'
        verbose_name = "Operational Company"
        verbose_name_plural = "Operational Companies"
        ordering = ['name']
