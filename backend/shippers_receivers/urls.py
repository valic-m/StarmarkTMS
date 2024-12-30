from django.urls import path
from .views import (
    LocationListCreateView,
    LocationRetrieveUpdateDestroyView,
    LocationPhotoListCreateView,
    LocationPhotoRetrieveUpdateDestroyView,
    CategoryListCreateView,
    CategoryRetrieveUpdateDestroyView,
    OperatingHoursListCreateView,
    OperatingHoursRetrieveUpdateDestroyView,
    LocationCommentListCreateView,
    LocationCommentRetrieveUpdateDestroyView,
)

urlpatterns = [
    path('locations/', LocationListCreateView.as_view(), name='location_list_create'),
    path('locations/<int:pk>/', LocationRetrieveUpdateDestroyView.as_view(), name='location_detail'),

    path('locations/<int:location_id>/operating-hours/', OperatingHoursListCreateView.as_view(), name='operating_hours_list_create'),
    path('operating-hours/<int:pk>/', OperatingHoursRetrieveUpdateDestroyView.as_view(), name='operating_hours_detail'),

    path('locations/<int:location_id>/photos/', LocationPhotoListCreateView.as_view(), name='location_photos_list_create'),
    path('photos/<int:pk>/', LocationPhotoRetrieveUpdateDestroyView.as_view(), name='photo_detail'),

    path('locations/<int:location_id>/comments/', LocationCommentListCreateView.as_view(), name='location_comments_list_create'),
    path('comments/<int:pk>/', LocationCommentRetrieveUpdateDestroyView.as_view(), name='comment_detail'),

    path('categories/', CategoryListCreateView.as_view(), name='category_list_create'),
    path('categories/<int:pk>/', CategoryRetrieveUpdateDestroyView.as_view(), name='category_detail'),
]
