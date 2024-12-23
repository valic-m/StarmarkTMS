from django.urls import path
from .views import (
    LocationListCreateView,
    LocationRetrieveUpdateDestroyView,
    CustomerListCreateView,
    CustomerRetrieveUpdateDestroyView,
    LocationPhotoListCreateView,
    LocationPhotoRetrieveUpdateDestroyView,
    CategoryListCreateView,
    CategoryRetrieveUpdateDestroyView
)

app_name = 'logistics'

urlpatterns = [
    # Locations
    path('locations/', LocationListCreateView.as_view(), name='location-list-create'),
    path('locations/<int:pk>/', LocationRetrieveUpdateDestroyView.as_view(), name='location-detail'),

    # Customers
    path('customers/', CustomerListCreateView.as_view(), name='customer-list-create'),
    path('customers/<int:pk>/', CustomerRetrieveUpdateDestroyView.as_view(), name='customer-detail'),


    # Photos
    path('photos/', LocationPhotoListCreateView.as_view(), name='photo-list-create'),
    path('photos/<int:pk>/', LocationPhotoRetrieveUpdateDestroyView.as_view(), name='photo-detail'),

    # Categories
    path('categories/', CategoryListCreateView.as_view(), name='category-list-create'),
    path('categories/<int:pk>/', CategoryRetrieveUpdateDestroyView.as_view(), name='category-detail'),
]
