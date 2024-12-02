from django.urls import path
from .views import (
    CustomerListCreate,       # API for listing and creating customers
    CustomerCreateView,       # API for creating a new customer
    CustomerDetailView,       # API for customer details
    AdminCustomerView,        # API for admin-only customer management
    get_fmcsa_data            # API for FMCSA data
)

# Namespace for app-specific URLs
app_name = 'customers'

# URL patterns
urlpatterns = [
    # API Endpoints for Customer Management
    path('api/customers/', CustomerListCreate.as_view(), name='customer_list_create'),  # List & create customers
    path('api/customers/create/', CustomerCreateView.as_view(), name='create_customer'),  # Create a new customer (API)
    path('api/customers/<slug:slug>/', CustomerDetailView.as_view(), name='customer_detail'),  # Retrieve customer details by slug
    path('api/customers/admin/<slug:slug>/', AdminCustomerView.as_view(), name='admin_customer'),  # Admin-only view for a customer

    # FMCSA Data API
    path('api/fmcsa/', get_fmcsa_data, name='get_fmcsa_data'),  # Fetch FMCSA data for a customer
]
