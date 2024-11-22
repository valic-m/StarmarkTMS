from django.db import models
from django.core.exceptions import ValidationError

class Customer(models.Model):
    TERM_PAY_CHOICES = [('Quickpay', 'Quickpay')] + [(f'Net {i}', f'Net {i}') for i in range(5, 31)]

    # General Information
    name = models.CharField(max_length=255)
    mc_number = models.CharField(max_length=7, blank=True, null=True)
    scac = models.CharField(max_length=10, blank=True, null=True)
    address_street = models.CharField(max_length=255, default='Default Address')
    address_number = models.CharField(max_length=50, blank=True, null=True)
    city = models.CharField(max_length=100, default='Default City')
    state = models.CharField(max_length=100, default='Default State')
    zip_code = models.CharField(max_length=10, default='00000')

    # Contact Information
    contact_name = models.CharField(max_length=255, blank=True, null=True)
    phone_number = models.CharField(max_length=20)
    cell_number = models.CharField(max_length=20, blank=True, null=True)
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
        ordering = ['name']
        verbose_name = 'Customer'
        verbose_name_plural = 'Customers'

    def __str__(self):
        return self.name

    def clean(self):
        if self.do_not_use and self.is_active:
            raise ValidationError("A customer cannot be both 'Do Not Use' and 'Active'.")
