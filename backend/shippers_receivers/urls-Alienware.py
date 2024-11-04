# File: C:/Users/valic/OneDrive/Documents/TMS/backend/shippers_receivers/urls.py

from django.urls import path
from backend.shippers_receivers import views  # Updated import path

urlpatterns = [
    path('shippers/', views.shipper_list, name='shipper_list'),  # List all shippers
    path('shippers/<int:id>/', views.shipper_detail, name='shipper_detail'),  # Detail view for a specific shipper
    path('receivers/', views.receiver_list, name='receiver_list'),  # List all receivers
    path('receivers/<int:id>/', views.receiver_detail, name='receiver_detail'),  # Detail view for a specific receiver
    path('add/', views.add_company, name='add_company'),  # Add a new company (shipper or receiver)
    path('edit/<int:company_id>/', views.edit_company, name='edit_company'),  # Edit an existing company
    path('companies/', views.company_list, name='company_list'),  # List all companies (both shippers and receivers)
]
