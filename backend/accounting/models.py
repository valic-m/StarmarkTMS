from django.db import models
from backend.loads.models import Load  # Adjusting import path for backend structure
from backend.shippers_receivers.models import Location, Customer  # Updated to use new models
from backend.companies.models import OperationalCompany  # Corrected import for OperationalCompany
from backend.users.models import CustomUser  # Updated import path for CustomUser model


class Invoice(models.Model):
    """
    Represents an invoice associated with a load.
    """
    load = models.OneToOneField(Load, on_delete=models.CASCADE, related_name='invoice')
    invoice_date = models.DateTimeField(auto_now_add=True)
    is_paid = models.BooleanField(default=False, help_text="Track if the invoice has been paid")
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, help_text="Total invoice amount")
    associated_location = models.ForeignKey(
        Location,
        on_delete=models.CASCADE,
        related_name='invoices',
        blank=True,
        null=True,
        help_text="Location associated with this invoice"
    )
    associated_customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE,
        related_name='invoices',
        blank=True,
        null=True,
        help_text="Customer responsible for this invoice"
    )
    issued_by = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        related_name='issued_invoices',
        blank=True,
        null=True,
        help_text="User who issued this invoice"
    )

    def __str__(self):
        return f"Invoice for Load {self.load.id} - Total: {self.total_amount}"


class Payment(models.Model):
    """
    Represents a payment made against an invoice.
    """
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name='payments')
    payment_date = models.DateTimeField(auto_now_add=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, help_text="Amount paid")
    payment_method = models.CharField(
        max_length=50,
        choices=[
            ('credit_card', 'Credit Card'),
            ('bank_transfer', 'Bank Transfer'),
            ('cash', 'Cash'),
        ],
        help_text="Payment method used"
    )
    recorded_by = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        help_text="User who recorded this payment"
    )

    def __str__(self):
        return f"Payment of {self.amount} for Invoice {self.invoice.id}"
