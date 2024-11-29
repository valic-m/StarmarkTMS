from django.urls import path
from .views import (
    CustomerListCreate,
    CustomerCreateView,
    AdminCustomerView,
    CustomerDetailView,  # API view for customer details by slug
    customer_list,       # Web view
    add_customer,
    edit_customer,
    delete_customer,
    customer_detail,
    get_fmcsa_data,
)

app_name = 'customers'

urlpatterns = [
    # Web views for customer management
    path('', customer_list, name='customer_list'),
    path('add/', add_customer, name='add_customer'),
    path('<slug:slug>/edit/', edit_customer, name='edit_customer'),
    path('<slug:slug>/delete/', delete_customer, name='delete_customer'),
    path('<slug:slug>/', customer_detail, name='customer_detail'),

    # FMCSA Data API
    path('fmcsa/', get_fmcsa_data, name='get_fmcsa_data'),

    # API views
    path('api/customers/', CustomerListCreate.as_view(), name='customer_list_create'),  # List & create customers
    path('api/customers/<slug:slug>/', CustomerDetailView.as_view(), name='customer_detail_api'),  # API for details
    path('api/customers/admin/<slug:slug>/', AdminCustomerView.as_view(), name='admin_customer_view'),
]
