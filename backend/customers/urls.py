from django.urls import path, include
from .views import (
    CustomerListCreate,
    CustomerCreateView,
    AdminCustomerView,  # Added AdminCustomerView
    customer_list,
    create_customer,
    edit_customer,
    delete_customer,
    customer_detail,
    add_customer,
    get_fmcsa_data,
)

app_name = 'customers'

urlpatterns = [
    # Web Views for Customer Management
    path('', customer_list, name='customer_list'),  # List all customers with search and pagination
    path('add/', add_customer, name='add_customer'),  # Add a new customer with optional FMCSA data integration
    path('create/', create_customer, name='create_customer'),  # Create a new customer
    path('<int:customer_id>/edit/', edit_customer, name='edit_customer'),  # Edit an existing customer
    path('<int:customer_id>/delete/', delete_customer, name='delete_customer'),  # Delete a customer
    path('<int:customer_id>/', customer_detail, name='customer_detail'),  # View details of a specific customer

    # FMCSA API Integration
    path('api/fmcsa/', get_fmcsa_data, name='get_fmcsa_data'),  # Fetch FMCSA data

    # REST API Endpoints
    path('api/', include(([  # Grouping API endpoints under the 'api' namespace
        path('customers/', CustomerListCreate.as_view(), name='customer_list_api'),  # List and create customers
        path('customers/create/', CustomerCreateView.as_view(), name='customer_create_api'),  # Create a customer with validation
        path('admin/customers/<int:customer_id>/', AdminCustomerView.as_view(), name='admin_customer_api'),  # Admin-only endpoint for customer management
    ], 'api'))),  # Grouped for scalability
]
