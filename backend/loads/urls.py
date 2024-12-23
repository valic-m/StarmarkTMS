from django.urls import path
from backend.loads.views import (
    LoadListCreateAPIView,
    LoadDetailAPIView,
)
from backend.shippers_receivers.views import LocationListCreateView, CustomerListCreateView
from backend.users.views import CustomUserListAPIView

urlpatterns = [
    # Load-related API endpoints
    path('api/loads/', LoadListCreateAPIView.as_view(), name='load_list_create'),  # List & create loads
    path('api/loads/<int:load_number>/', LoadDetailAPIView.as_view(), name='load_detail'),  # Retrieve, update, or delete a load by load_number

    # Shipper and receiver-related endpoints (now Locations)
    path('api/locations/', LocationListCreateView.as_view(), name='location_list_create'),  # List & create locations
    path('api/customers/', CustomerListCreateView.as_view(), name='customer_list_create'),  # List & create customers

    # User-related API endpoints
    path('api/users/', CustomUserListAPIView.as_view(), name='user_list'),  # List all custom users for "Booked With"
]
