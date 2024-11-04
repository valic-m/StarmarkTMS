# File Path: C:/Users/valic/OneDrive/Documents/TMS/backend/companies/tests.py

from django.test import TestCase
from .models import Company

class CompanyModelTest(TestCase):
    def setUp(self):
        # Set up a company instance for testing
        self.company = Company.objects.create(
            name="Test Company",
            address="123 Test St",
            city="Test City",
            state="Test State",
            zip_code="12345",
            phone_number="123-456-7890",
            email="test@example.com"
        )

    def test_company_creation(self):
        # Test if the company was created successfully
        self.assertEqual(self.company.name, "Test Company")
        self.assertEqual(self.company.city, "Test City")
        self.assertEqual(self.company.phone_number, "123-456-7890")

    def test_company_string_representation(self):
        # Test the string representation of the company model
        self.assertEqual(str(self.company), "Test Company")
