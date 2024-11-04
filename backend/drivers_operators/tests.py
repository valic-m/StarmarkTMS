# Path: C:/Users/valic/OneDrive/Documents/TMS/backend/drivers_operators/tests.py

from django.test import TestCase
from django.contrib.auth.models import User
from backend.drivers_operators.models import Driver

class DriverModelTest(TestCase):
    def setUp(self):
        # Create a user to associate with the driver
        self.user = User.objects.create_user(username='testuser', email='testuser@example.com', password='testpass123')

        # Create a driver linked to the user
        self.driver = Driver.objects.create(
            user=self.user,
            full_name='John Doe',
            print_check_as='John D.',
            is_employee=True,
            ssn='123-45-6789',
            ein='12-3456789',
            pay_type='Percentage',
            pay_rate=25.5,
            assigned_truck='Truck 123',
            assigned_trailer='Trailer 456',
            dob='1990-01-01',
            hire_date='2020-01-01',
            phone_number='555-1234',
            drivers_license_number='DL1234567',
            license_state='CA',
            license_expiration_date='2025-01-01',
            email='johndoe@example.com',
            password='hashedpassword123'  # In practice, you should use the User's password field
        )

    def test_driver_creation(self):
        """Test that a driver is correctly created and linked to the user."""
        driver = Driver.objects.get(id=self.driver.id)
        self.assertEqual(driver.full_name, 'John Doe')
        self.assertEqual(driver.user.username, 'testuser')
        self.assertTrue(driver.is_employee)

    def test_driver_assigned_truck_and_trailer(self):
        """Test that the assigned truck and trailer are correctly set."""
        driver = Driver.objects.get(id=self.driver.id)
        self.assertEqual(driver.assigned_truck, 'Truck 123')
        self.assertEqual(driver.assigned_trailer, 'Trailer 456')

    def test_driver_license_info(self):
        """Test the driver's license information."""
        driver = Driver.objects.get(id=self.driver.id)
        self.assertEqual(driver.drivers_license_number, 'DL1234567')
        self.assertEqual(driver.license_state, 'CA')
        self.assertEqual(str(driver.license_expiration_date), '2025-01-01')
