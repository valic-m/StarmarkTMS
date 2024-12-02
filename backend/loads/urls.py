# File: C:/Users/valic/OneDrive/Documents/TMS/backend/loads/urls.py

from django.urls import path
from backend.loads.views import (
    LoadListCreateAPIView,
    LoadDetailAPIView,
)
from backend.shippers_receivers.views import ShipperReceiverListAPIView
from backend.users.views import CustomUserListAPIView

urlpatterns = [
    # Load-related API endpoints
    path('api/loads/', LoadListCreateAPIView.as_view(), name='load_list_create'),  # List & create loads
    path('api/loads/<int:load_number>/', LoadDetailAPIView.as_view(), name='load_detail'),  # Retrieve, update, or delete a load by load_number

    # Shipper and receiver-related endpoints
    path('api/shippers-receivers/', ShipperReceiverListAPIView.as_view(), name='shipper_receiver_list'),  # List all shippers and receivers

    # User-related API endpoints
    path('api/users/', CustomUserListAPIView.as_view(), name='user_list'),  # List all custom users for "Booked With"
]
