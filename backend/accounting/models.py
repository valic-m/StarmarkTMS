from django.db import models
from backend.loads.models import Load  # Adjusting import path for backend structure
from backend.shippers_receivers.models import ShipperReceiverCompany  # Updated import, remove OperationalCompany
from backend.companies.models import OperationalCompany  # Corrected import for OperationalCompany
from backend.customers.models import Customer  # Updated import path for Customer model
from backend.users.models import CustomUser  # Updated import path for CustomUser model

class Invoice(models.Model):
    load = models.OneToOneField(Load, on_delete=models.CASCADE)
    invoice_date = models.DateTimeField(auto_now_add=True)
    is_paid = models.BooleanField(default=False)  # Track if the invoice has been paid
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)  # Field for the total invoice amount
    associated_company = models.ForeignKey(ShipperReceiverCompany, on_delete=models.CASCADE)  # Add this line if necessary

    def __str__(self):
        return f"Invoice for Load {self.load.id}"

# Add any additional models you need here
