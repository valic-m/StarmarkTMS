from django.urls import path
from .views import (
    LocationListCreateView,
    LocationRetrieveUpdateDestroyView,
    LocationPhotoListCreateView,
    LocationPhotoRetrieveUpdateDestroyView,
    CategoryListCreateView,
    CategoryRetrieveUpdateDestroyView,
)

urlpatterns = [
    # Corrected code
    path('locations/', LocationListCreateView.as_view(), name='location_list_create'),
    path('locations/<int:pk>/', LocationRetrieveUpdateDestroyView.as_view(), name='location_detail'),

    # Removed customer-related URLs
    path('location-photos/', LocationPhotoListCreateView.as_view(), name='location_photo_list_create'),
    path('location-photos/<int:pk>/', LocationPhotoRetrieveUpdateDestroyView.as_view(), name='location_photo_detail'),
    path('categories/', CategoryListCreateView.as_view(), name='category_list_create'),
    path('categories/<int:pk>/', CategoryRetrieveUpdateDestroyView.as_view(), name='category_detail'),
]
