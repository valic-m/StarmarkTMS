# Path: C:/Users/valic/OneDrive/Documents/TMS/backend/samsara/tests.py

from backend.samsara.utils import set_external_id, update_route_status  # Updated import path

def test_samsara_integration():
    # Example test function to check the integration
    try:
        external_ids = {'payrollSys1': 'tyler.freckmann@fleet.com'}
        response = set_external_id('123456789', external_ids)
        print(response)

        route_update = update_route_status('route_external_id', 'completed')
        print(route_update)
    except Exception as e:
        print(f"Test failed: {e}")
