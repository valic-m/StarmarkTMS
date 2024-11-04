# File: C:/Users/valic/Documents/TMS/backend/customers/urls.py

from django.urls import path
from .views import (
    CustomerListCreate,
    customer_list,
    create_customer,
    edit_customer,
    delete_customer,
    customer_detail,
    add_customer
)

app_name = 'customers'  # Namespace for the app

urlpatterns = [
    # API endpoint for customer list and creation
    path('api/customers/', CustomerListCreate.as_view(), name='customer_list_api'),

    # Django template views for customer management
    path('', customer_list, name='customer_list'),  # List all customers with search and pagination
    path('create/', create_customer, name='create_customer'),  # Create a new customer
    path('<int:customer_id>/edit/', edit_customer, name='edit_customer'),  # Edit an existing customer
    path('<int:customer_id>/delete/', delete_customer, name='delete_customer'),  # Delete a customer
    path('<int:customer_id>/', customer_detail, name='customer_detail'),  # View details of a specific customer

    # Route for adding a new customer (e.g., for use with a modal form)
    path('add/', add_customer, name='add_customer'),  # Add a new customer with optional FMCSA data integration
]