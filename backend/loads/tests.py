# Path: C:/Users/valic/OneDrive/Documents/TMS/backend/loads/tests.py

from django.test import TestCase
from backend.loads.models import Load, Pickup, Delivery
from backend.customers.models import Customer
from backend.shippers_receivers.models import Company
from backend.users.models import CustomUser
from django.utils import timezone

class LoadModelTest(TestCase):
    def setUp(self):
        # Create a customer
        self.customer = Customer.objects.create(
            name="Test Customer",
            contact_person="John Doe",
            phone_number="1234567890",
            email="customer@example.com",
            address="123 Test St"
        )
        # Create a user (the one who booked the load)
        self.user = CustomUser.objects.create_user(
            username="testuser",
            password="testpassword"
        )
        # Create a load
        self.load = Load.objects.create(
            customer=self.customer,
            reference_number="REF123",
            rate=1200.00,
            trailer_type="Dry Van",
            load_type="Full Load",
            feet_required=53.00,
            pallet_count=20,
            pallet_dimensions="48x40",
            weight=20000,
            commodity="Furniture",
            pickup_location="Pickup Location",
            dropoff_location="Dropoff Location",
            pickup_time=timezone.now(),
            delivery_time=timezone.now(),
            booked_by=self.user,
            attachment=None  # Testing without an attachment
        )

    def test_load_creation(self):
        """Test if the load is created successfully."""
        self.assertEqual(self.load.customer.name, "Test Customer")
        self.assertEqual(self.load.reference_number, "REF123")
        self.assertEqual(self.load.rate, 1200.00)
        self.assertEqual(self.load.status, "Booked")
        self.assertEqual(self.load.booked_by.username, "testuser")

    def test_load_str_method(self):
        """Test the __str__ method of the Load model."""
        self.assertEqual(str(self.load), f"Load {self.load.id} for Test Customer")

    def test_load_attachment_validation(self):
        """Test if the load raises a validation error when no attachment is provided."""
        with self.assertRaises(Exception) as raised:
            self.load.clean()
        self.assertIn("An attachment (e.g., rate confirmation) is required", str(raised.exception))


class PickupModelTest(TestCase):
    def setUp(self):
        # Create a company (shipper)
        self.company = Company.objects.create(
            company_name="Test Shipper",
            contact_person="Jane Doe",
            phone_number="1234567890",
            email="shipper@example.com",
            address="456 Shipper St",
            is_shipper=True
        )
        # Create a load
        self.load = Load.objects.create(
            customer=Customer.objects.create(name="Test Customer"),
            reference_number="REF123"
        )
        # Create a pickup
        self.pickup = Pickup.objects.create(
            load=self.load,
            pickup_location=self.company,
            pickup_number=1,
            pickup_date=timezone.now()
        )

    def test_pickup_creation(self):
        """Test if the pickup is created successfully."""
        self.assertEqual(self.pickup.load.reference_number, "REF123")
        self.assertEqual(self.pickup.pickup_location.company_name, "Test Shipper")
        self.assertEqual(self.pickup.pickup_number, 1)

    def test_pickup_str_method(self):
        """Test the __str__ method of the Pickup model."""
        self.assertEqual(str(self.pickup), f"Pickup 1 for Load {self.load.id}")


class DeliveryModelTest(TestCase):
    def setUp(self):
        # Create a company (receiver)
        self.company = Company.objects.create(
            company_name="Test Receiver",
            contact_person="Jake Doe",
            phone_number="0987654321",
            email="receiver@example.com",
            address="789 Receiver St",
            is_receiver=True
        )
        # Create a load
        self.load = Load.objects.create(
            customer=Customer.objects.create(name="Test Customer"),
            reference_number="REF456"
        )
        # Create a delivery
        self.delivery = Delivery.objects.create(
            load=self.load,
            delivery_location=self.company,
            delivery_number=1,
            delivery_date=timezone.now()
        )

    def test_delivery_creation(self):
        """Test if the delivery is created successfully."""
        self.assertEqual(self.delivery.load.reference_number, "REF456")
        self.assertEqual(self.delivery.delivery_location.company_name, "Test Receiver")
        self.assertEqual(self.delivery.delivery_number, 1)

    def test_delivery_str_method(self):
        """Test the __str__ method of the Delivery model."""
        self.assertEqual(str(self.delivery), f"Delivery 1 for Load {self.load.id}")
