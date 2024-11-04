# Path: C:/Users/valic/OneDrive/Documents/TMS/backend/equipment/urls.py

from django.urls import path
from backend.equipment import views  # Updated import path for views from backend

urlpatterns = [
    path('', views.equipment_list, name='equipment_list'),  # Equipment list page
    path('add_truck/', views.add_truck, name='add_truck'),  # Add truck route
    path('add_trailer/', views.add_trailer, name='add_trailer'),  # Add trailer route
    path('edit_truck/<int:truck_id>/', views.edit_truck, name='edit_truck'),  # Edit truck route
    path('edit_trailer/<int:trailer_id>/', views.edit_trailer, name='edit_trailer'),  # Edit trailer route
    path('trucks/', views.trucks_list, name='trucks_list'),  # Trucks list route
    path('trailers/', views.trailers_list, name='trailers_list'),  # Trailers list route
    path('trucks/<int:truck_id>/', views.truck_detail, name='truck_detail'),  # Truck detail view

    # API route for truck data
    path('api/trucks/<int:truck_id>/', views.get_truck_data, name='get_truck_data'),  # API to fetch truck data
]
