# Path: C:/Users/valic/OneDrive/Documents/TMS/backend/shippers_receivers/tests.py

from django.test import TestCase
from backend.shippers_receivers.models import Company, Shipper

class CompanyModelTest(TestCase):
    def setUp(self):
        """Set up a test company"""
        self.company = Company.objects.create(
            company_name="Test Company",
            contact_person="John Doe",
            phone_number="123456789",
            email="johndoe@test.com",
            address="123 Main St",
            shipping_hours="9 AM - 5 PM",
            shipping_manager_name="Jane Doe",
            shipping_manager_phone="987654321",
            shipping_manager_email="janedoe@test.com",
            rating=4,
            load_time="2:00:00",
            comments="Great company to work with.",
            directions="Take the first left after the bridge.",
            do_not_load=False,
            is_shipper=True,
            is_receiver=False,
        )

    def test_company_creation(self):
        """Test that the company was created successfully"""
        self.assertEqual(self.company.company_name, "Test Company")
        self.assertEqual(self.company.contact_person, "John Doe")
        self.assertEqual(self.company.phone_number, "123456789")
        self.assertEqual(self.company.shipping_hours, "9 AM - 5 PM")
        self.assertFalse(self.company.do_not_load)
        self.assertTrue(self.company.is_shipper)
        self.assertFalse(self.company.is_receiver)

    def test_company_str_method(self):
        """Test the __str__ method of the Company model"""
        self.assertEqual(str(self.company), "Test Company")


class ShipperModelTest(TestCase):
    def setUp(self):
        """Set up a test shipper"""
        self.company = Company.objects.create(
            company_name="Test Shipper Company",
            contact_person="John Smith",
            phone_number="123456789",
            email="johnsmith@test.com",
            address="456 Shipper St",
            shipping_hours="8 AM - 4 PM",
            shipping_manager_name="Jane Smith",
            shipping_manager_phone="987654321",
            shipping_manager_email="janesmith@test.com",
            rating=5,
            load_time="1:30:00",
            comments="Good experience.",
            directions="Second right after the roundabout.",
            do_not_load=False,
            is_shipper=True,
            is_receiver=False,
        )
        self.shipper = Shipper.objects.create(
            name="Test Shipper",
            address="123 Test Address",
            contact_number="123456789",
            associated_company=self.company,
        )

    def test_shipper_creation(self):
        """Test that the shipper was created successfully"""
        self.assertEqual(self.shipper.name, "Test Shipper")
        self.assertEqual(self.shipper.associated_company.company_name, "Test Shipper Company")

    def test_shipper_str_method(self):
        """Test the __str__ method of the Shipper model"""
        self.assertEqual(str(self.shipper), "Test Shipper")
