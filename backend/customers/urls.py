from django.urls import path
from .views import (
    CustomerListCreate,       # API for listing and creating customers
    CustomerCreateView,       # API for creating a new customer
    CustomerDetailView,       # API for customer details
    AdminCustomerView,        # API for admin-only customer management
    get_fmcsa_data            # API for FMCSA data
)

app_name = 'customers'

urlpatterns = [
    # API Endpoints for Customer Management
    path('customers/', CustomerListCreate.as_view(), name='customer-list-create'),
    path('create/', CustomerCreateView.as_view(), name='create_customer'),  # Create a new customer
    path('<slug:slug>/', CustomerDetailView.as_view(), name='customer_detail'),  # Retrieve customer details by slug
    path('admin/<slug:slug>/', AdminCustomerView.as_view(), name='admin_customer'),  # Admin-only view for a customer

    # FMCSA Data API
    path('fmcsa/', get_fmcsa_data, name='get_fmcsa_data'),  # Fetch FMCSA data for a customer
]
