# File: C:/Users/valic/OneDrive/Documents/TMS/backend/customers/urls.py

from django.urls import path
from backend.customers import views as customer_views

urlpatterns = [
    # Customer management routes
    path('', customer_views.customer_list, name='customer_list'),  # List customers
    path('create/', customer_views.create_customer, name='create_customer'),  # Create new customer
    path('edit/<int:customer_id>/', customer_views.edit_customer, name='edit_customer'),  # Edit customer
    path('delete/<int:customer_id>/', customer_views.delete_customer, name='delete_customer'),  # Delete customer
    path('<int:customer_id>/', customer_views.customer_detail, name='customer_detail'),  # Customer details view

    # Add customer route
    path('add/', customer_views.add_customer, name='add_customer'),  # Separate URL for adding a new customer
]
