from django.urls import path
from .views import (
    CustomerListCreate,  # API to list and create customers with pagination
    CustomerCreateView,  # API to create customers
    AdminCustomerView,   # API for admin-only customer management
    customer_list,       # Web view to list customers
    add_customer,        # Web view to add a new customer
    edit_customer,       # Web view to edit an existing customer by slug
    delete_customer,     # Web view to delete a customer by slug
    customer_detail,     # Web view to display a customer's details by slug
    get_fmcsa_data,      # API to fetch FMCSA data
)

app_name = 'customers'

urlpatterns = [
    # Web Views for Customer Management
    path('', customer_list, name='customer_list'),  # List all customers with search and pagination
    path('add/', add_customer, name='add_customer'),  # Add a new customer
    path('create/', CustomerCreateView.as_view(), name='create_customer'),  # Create a new customer (API)
    path('<slug:slug>/edit/', edit_customer, name='edit_customer'),  # Edit an existing customer by slug
    path('<slug:slug>/delete/', delete_customer, name='delete_customer'),  # Delete a customer by slug
    path('<slug:slug>/', customer_detail, name='customer_detail'),  # View customer details by slug
    path('fmcsa/', get_fmcsa_data, name='get_fmcsa_data'),  # Get FMCSA data
    # API Views
    path('api/customers/', CustomerListCreate.as_view(), name='customer_list_create'),  # List & create customers (API)
    path('api/customers/<slug:slug>/', AdminCustomerView.as_view(), name='admin_customer_view'),  # Admin view of a customer by slug
]

