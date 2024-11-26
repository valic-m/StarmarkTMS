from django.db import models
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
from django.utils.text import slugify


class Customer(models.Model):
    TERM_PAY_CHOICES = [('Quickpay', 'Quickpay')] + [(f'Net {i}', f'Net {i}') for i in range(5, 31)]

    # General Information
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=50, unique=True, blank=True)  # Add slug field
    mc_number = models.CharField(
        max_length=7,
        blank=True,
        null=True,
        validators=[
            RegexValidator(
                regex=r'^\d{1,7}$',
                message="MC Number must be up to 7 digits long.",
                code='invalid_mc_number'
            )
        ]
    )
    scac = models.CharField(max_length=10, blank=True, null=True)
    address_street = models.CharField(max_length=255, blank=True, null=True)
    address_number = models.CharField(max_length=50, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    zip_code = models.CharField(
        max_length=10,
        blank=True,
        null=True,
        validators=[
            RegexValidator(
                regex=r'^\d{5}(-\d{4})?$',
                message="ZIP Code must be in the format '12345' or '12345-6789'.",
                code='invalid_zip_code'
            )
        ]
    )

    # Contact Information
    contact_name = models.CharField(max_length=255, blank=True, null=True)
    phone_number = models.CharField(
        max_length=14,  # (000)000-0000 format has 14 characters including parentheses and hyphen
        validators=[
            RegexValidator(
                regex=r'^\(\d{3}\)\d{3}-\d{4}$',
                message="Phone number must be in the format (000)000-0000.",
                code='invalid_phone_number'
            )
        ]
    )
    cell_number = models.CharField(
        max_length=14,
        blank=True,
        null=True,
        validators=[
            RegexValidator(
                regex=r'^\(\d{3}\)\d{3}-\d{4}$',
                message="Cell number must be in the format (000)000-0000.",
                code='invalid_cell_number'
            )
        ]
    )
    email = models.EmailField()
    website = models.URLField(blank=True, null=True)
    accounting_email = models.EmailField(blank=True, null=True)
    broker_email = models.EmailField(blank=True, null=True)

    # Financial Details
    term_pay = models.CharField(
        max_length=20,
        choices=TERM_PAY_CHOICES,
        default='Net 30'
    )
    tax_id = models.CharField(max_length=50, blank=True, null=True)
    credit_limit = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    # Flags and Statuses
    is_active = models.BooleanField(default=True)
    factoring = models.BooleanField(default=False)
    do_not_use = models.BooleanField(default=False)
    whitelist = models.BooleanField(default=False)
    priority = models.BooleanField(default=False)

    # Accounts Payable Information
    accounts_payable_contact = models.CharField(max_length=255, blank=True, null=True)
    accounts_payable_phone = models.CharField(max_length=20, blank=True, null=True)
    accounts_payable_email = models.EmailField(blank=True, null=True)
    accounts_payable_address = models.CharField(max_length=255, blank=True, null=True)
    accounts_payable_city = models.CharField(max_length=100, blank=True, null=True)
    accounts_payable_state = models.CharField(max_length=100, blank=True, null=True)
    accounts_payable_zip = models.CharField(max_length=10, blank=True, null=True)

    # Agents Information
    agent_name = models.CharField(max_length=255, blank=True, null=True)
    agent_phone = models.CharField(max_length=20, blank=True, null=True)
    agent_email = models.EmailField(blank=True, null=True)

    # Additional Information
    notes = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ['name', 'id']
        verbose_name = 'Customer'
        verbose_name_plural = 'Customers'

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        """
        Automatically generate a unique slug based on the name field
        and format the phone numbers.
        """
        # Format phone_number
        if self.phone_number and len(self.phone_number) == 10 and self.phone_number.isdigit():
            self.phone_number = f"({self.phone_number[:3]}){self.phone_number[3:6]}-{self.phone_number[6:]}"

        # Format cell_number
        if self.cell_number and len(self.cell_number) == 10 and self.cell_number.isdigit():
            self.cell_number = f"({self.cell_number[:3]}){self.cell_number[3:6]}-{self.cell_number[6:]}"

        # Automatically generate slug
        if not self.slug:
            base_slug = slugify(self.name[:5])  # Create a slug from the first 5 characters of the name
            slug = base_slug
            counter = 1
            while Customer.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"  # Append a counter if the slug is not unique
                counter += 1
            self.slug = slug

        super().save(*args, **kwargs)

    def clean(self):
        """
        Additional validation for the model.
        """
        super().clean()
        if self.do_not_use and self.is_active:
            raise ValidationError("A customer cannot be both 'Do Not Use' and 'Active'.")
