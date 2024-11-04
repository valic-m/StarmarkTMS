# Path: C:/Users/valic/OneDrive/Documents/TMS/backend/equipment/tests.py

from django.test import TestCase
from unittest.mock import patch
from backend.equipment.samsara_services import get_all_equipment_locations

class SamsaraServiceTest(TestCase):
    
    @patch('backend.equipment.samsara_services.requests.get')
    def test_get_all_equipment_locations_success(self, mock_get):
        """Test if the function successfully fetches data from Samsara."""
        # Create mock response data
        mock_response_data = {
            "data": [
                {
                    "id": "1234567890",
                    "location": {
                        "latitude": 37.7749,
                        "longitude": -122.4194,
                        "reverseGeo": {"formattedLocation": "San Francisco, CA"}
                    }
                }
            ]
        }

        # Configure the mock to return a successful response
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = mock_response_data

        # Call the function
        data = get_all_equipment_locations()

        # Assert the data is as expected
        self.assertEqual(data, mock_response_data)
        self.assertEqual(data['data'][0]['location']['latitude'], 37.7749)

    @patch('backend.equipment.samsara_services.requests.get')
    def test_get_all_equipment_locations_failure(self, mock_get):
        """Test if the function handles errors when fetching data from Samsara."""
        # Configure the mock to return a failed response
        mock_get.return_value.status_code = 500
        mock_get.side_effect = Exception("API Error")

        # Call the function
        data = get_all_equipment_locations()

        # Assert that None is returned due to the error
        self.assertIsNone(data)
