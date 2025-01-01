from django.db import models
from backend.companies.models import OperationalCompany  # Import OperationalCompany from companies app
from backend.carriers.models import Carrier  # Import Carrier from carriers app
#from backend.vendors.models import Vendor  # For the "Payable To" feature


class Truck(models.Model):
    """
    Represents a truck used in the transportation management system.
    """

    # Basic truck details
    name = models.CharField(max_length=100, help_text="The name or identifier for the truck.")
    license_plate = models.CharField(max_length=20, unique=True, help_text="The license plate of the truck.")
    manufacturer = models.CharField(max_length=100, help_text="The manufacturer of the truck.")
    year = models.PositiveIntegerField(help_text="The year the truck was manufactured.")
    vin = models.CharField(max_length=17, unique=True, help_text="The Vehicle Identification Number (VIN).")
    starting_mileage = models.PositiveIntegerField(help_text="Starting mileage when the truck was purchased.")
    color = models.CharField(max_length=30, blank=True, help_text="The color of the truck.")

    # Ownership and leasing details
    owner = models.ForeignKey(
        OperationalCompany, on_delete=models.CASCADE, related_name="trucks", help_text="The operational company that owns the truck."
    )
    carrier = models.ForeignKey(
        Carrier, on_delete=models.CASCADE, null=True, blank=True, related_name="trucks", help_text="The carrier associated with the truck (optional)."
    )
    #payable_to = models.ForeignKey(
     #   Vendor, on_delete=models.SET_NULL, null=True, blank=True, related_name="trucks", help_text="The entity (vendor) paid from truck profits."
    #)
    is_leased = models.BooleanField(default=False, help_text="Indicates if the truck is leased.")
    leased_to = models.CharField(max_length=255, blank=True, help_text="Name of the company the truck is leased to.")
    sub_leased = models.BooleanField(default=False, help_text="Indicates if the truck is sub-leased.")
    owner_operated = models.BooleanField(default=True, help_text="Indicates if the truck is owner-operated.")

    # Insurance and licensing
    annual_insurance_cost = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, help_text="Annual insurance cost.")
    insurance_renewal_date = models.DateField(blank=True, null=True, help_text="Insurance renewal date.")
    annual_plate_cost = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, help_text="Annual plate cost.")

    # Equipment and features
    dashcam_installed = models.BooleanField(default=False, help_text="Indicates if a dashcam is installed.")
    apu_installed = models.BooleanField(default=False, help_text="Indicates if an APU is installed.")
    fuel_card = models.CharField(max_length=50, blank=True, help_text="Assigned fuel card.")

    # Integration details
    integration_id = models.CharField(
        max_length=50,
        blank=True,
        null=True,
        unique=True,
        help_text="Unique integration ID to link the truck to Samsara or other telematics systems."
    )

    # Status
    is_out_of_service = models.BooleanField(default=False, help_text="Indicates if the truck is out of service.")
    out_of_service_reason = models.TextField(blank=True, help_text="Reason for being out of service.")

    def __str__(self):
        return f"{self.name} ({self.license_plate})"


class InspectionType(models.Model):
    """
    Represents types of inspections (e.g., Annual, DOT, Emissions).
    """
    name = models.CharField(max_length=100, unique=True, help_text="Type of inspection.")
    description = models.TextField(blank=True, help_text="Details about the inspection type.")

    def __str__(self):
        return self.name


class Inspection(models.Model):
    """
    Represents an inspection record for a truck.
    """
    truck = models.ForeignKey(Truck, on_delete=models.CASCADE, related_name="inspections", help_text="The truck being inspected.")
    inspection_type = models.ForeignKey(InspectionType, on_delete=models.CASCADE, related_name="inspections", help_text="Type of inspection.")
    date_performed = models.DateField(help_text="Date when the inspection was performed.")
    expiration_date = models.DateField(help_text="Expiration date of the inspection.")
    document = models.FileField(upload_to="truck_inspections/", blank=True, help_text="Attached inspection document.")

    def __str__(self):
        return f"{self.inspection_type.name} - {self.truck.name} ({self.date_performed})"


class MaintenanceLog(models.Model):
    """
    Represents a maintenance log for a truck.
    """
    truck = models.ForeignKey(Truck, on_delete=models.CASCADE, related_name="maintenance_logs", help_text="The truck being maintained.")
    description = models.TextField(help_text="Description of the maintenance activity.")
    date = models.DateField(help_text="Date of maintenance.")
    cost = models.DecimalField(max_digits=10, decimal_places=2, help_text="Cost of the maintenance.")
    document = models.FileField(upload_to="truck_maintenance/", blank=True, help_text="Attached maintenance receipt or document.")

    def __str__(self):
        return f"Maintenance on {self.truck.name} ({self.date})"


class Expense(models.Model):
    """
    Represents an expense related to a truck.
    """
    truck = models.ForeignKey(Truck, on_delete=models.CASCADE, related_name="expenses", help_text="The truck associated with the expense.")
    description = models.TextField(help_text="Description of the expense.")
    date = models.DateField(help_text="Date of the expense.")
    amount = models.DecimalField(max_digits=10, decimal_places=2, help_text="Amount of the expense.")
    document = models.FileField(upload_to="truck_expenses/", blank=True, help_text="Attached receipt or document.")

    def __str__(self):
        return f"Expense for {self.truck.name} - {self.amount} ({self.date})"


class OutOfServiceHistory(models.Model):
    """
    Represents the history of out-of-service events for a truck.
    """
    truck = models.ForeignKey(Truck, on_delete=models.CASCADE, related_name="out_of_service_history", help_text="The truck taken out of service.")
    reason = models.TextField(help_text="Reason for taking the truck out of service.")
    date_start = models.DateField(help_text="Date when the truck was taken out of service.")
    date_end = models.DateField(blank=True, null=True, help_text="Date when the truck was put back in service.")

    def __str__(self):
        return f"Out of Service: {self.truck.name} ({self.date_start} - {self.date_end or 'Current'})"
