# File Path: C:/Users/valic/OneDrive/Documents/TMS/backend/carriers/tests.py

from django.test import TestCase
from .models import Carrier

class CarrierModelTest(TestCase):
    """
    Test case for the Carrier model.
    """

    def setUp(self):
        """
        Set up test data before each test.
        """
        Carrier.objects.create(
            name="Test Carrier",
            mc_number="123456",
            phone_number="1234567890",
            email="test@carrier.com"
        )

    def test_carrier_creation(self):
        """
        Test that a carrier can be created and retrieved correctly.
        """
        carrier = Carrier.objects.get(name="Test Carrier")
        self.assertEqual(carrier.mc_number, "123456")
        self.assertEqual(carrier.phone_number, "1234567890")
        self.assertEqual(carrier.email, "test@carrier.com")

    def test_carrier_str_method(self):
        """
        Test the __str__ method of the Carrier model.
        """
        carrier = Carrier.objects.get(name="Test Carrier")
        self.assertEqual(str(carrier), "Test Carrier")
