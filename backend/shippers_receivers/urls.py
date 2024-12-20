from django.urls import path
from .views import (
    shipper_list,
    shipper_detail,
    receiver_list,
    receiver_detail,
    LocationListCreateView,
    LocationRetrieveUpdateDestroyView,
    ShipperReceiverListAPIView,
)

app_name = 'shippers_receivers'

urlpatterns = [
    # Shipper-related endpoints
    path('shippers/', shipper_list, name='shipper_list'),
    path('shippers/<int:id>/', shipper_detail, name='shipper_detail'),

    # Receiver-related endpoints
    path('receivers/', receiver_list, name='receiver_list'),
    path('receivers/<int:id>/', receiver_detail, name='receiver_detail'),

    # Combined endpoint for companies
    path('companies/', ShipperReceiverListAPIView.as_view(), name='company_list'),

    # Location-related endpoints
    path('locations/', LocationListCreateView.as_view(), name='location-list-create'),
    path('locations/<int:pk>/', LocationRetrieveUpdateDestroyView.as_view(), name='location-detail'),
]
