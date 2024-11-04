# Path: C:/Users/valic/OneDrive/Documents/TMS/backend/drivers_operators/urls.py

from django.urls import path
from django.shortcuts import redirect
from backend.drivers_operators import views  # Updated import path for views

urlpatterns = [
    # Redirect drivers_operators/ to drivers_list or another view of your choice
    path('', lambda request: redirect('drivers_list'), name='drivers_operators_redirect'),  # Redirect to drivers_list

    # Other routes
    path('drivers_operators_home/', views.home, name='drivers_operators_home'),  # Home for drivers_operators
    path('drivers/', views.drivers_list, name='drivers_list'),  # List of drivers
    path('drivers/add/', views.add_driver, name='add_driver'),  # Add new driver
    path('drivers/<int:driver_id>/edit/', views.edit_driver, name='edit_driver'),  # Edit driver
    path('dashboard/', views.driver_dashboard, name='dashboard'),  # Driver dashboard
    path('drivers-operators/', views.driver_operator_list, name='driver_operator_list'),  # List of drivers and operators
]
