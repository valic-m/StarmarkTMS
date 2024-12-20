# File: C:/Users/valic/OneDrive/Documents/TMS/backend/dispatch/tests/test_utils.py

from django.test import TestCase
from dispatch.utils import update_route_status

class UpdateRouteStatusTest(TestCase):
    def test_update_route_status(self):
        result = update_route_status("12345", "completed")
        self.assertIsNotNone(result, "The API should return a valid response")
