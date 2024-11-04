from django.test import TestCase
from .models import Customer

class CustomerModelTest(TestCase):

    def setUp(self):
        # Set up an initial customer for use in test cases
        self.customer = Customer.objects.create(
            name="Test Customer",
            mc_number="1234567",
            scac="SCAC1",
            address_street="123 Test Street",
            address_number="Apt 4B",
            city="Test City",
            state="TS",
            zip_code="12345",
            contact_name="John Doe",
            phone_number="1234567890",
            email="test@example.com",
            is_active=True,
            factoring=False,
            do_not_use=False,
            white_list=True,
            credit_limit=5000.00
        )

    def test_customer_creation(self):
        # Check if the customer is created successfully
        customer = Customer.objects.get(name="Test Customer")
        self.assertEqual(customer.name, "Test Customer")
        self.assertEqual(customer.mc_number, "1234567")
        self.assertEqual(customer.email, "test@example.com")
        self.assertTrue(customer.is_active)

    def test_customer_string_representation(self):
        # Test the string representation of the customer
        customer = Customer.objects.get(name="Test Customer")
        self.assertEqual(str(customer), customer.name)

    def test_customer_phone_number_format(self):
        # Check if phone number is stored correctly
        customer = Customer.objects.get(name="Test Customer")
        self.assertEqual(customer.phone_number, "1234567890")

    def test_update_customer(self):
        # Test if updating a customer works
        customer = Customer.objects.get(name="Test Customer")
        customer.city = "New City"
        customer.save()
        updated_customer = Customer.objects.get(name="Test Customer")
        self.assertEqual(updated_customer.city, "New City")

    def test_delete_customer(self):
        # Test if deleting a customer works
        customer = Customer.objects.get(name="Test Customer")
        customer.delete()
        with self.assertRaises(Customer.DoesNotExist):
            Customer.objects.get(name="Test Customer")
