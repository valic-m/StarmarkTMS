# File: C:/Users/valic/OneDrive/Documents/TMS/backend/loads/urls.py

from django.urls import path
from backend.loads import views as load_views
from backend.customers import views as customer_views  # Ensure this import is present for customer views

urlpatterns = [
    # Load-related URLs
    path('list/', load_views.load_list, name='load_list'),  # List all loads
    path('create/', load_views.create_load, name='create_load'),  # Create a new load
    path('<int:load_number>/', load_views.load_detail, name='load_detail'),  # Detail view using load_number
    path('edit/<int:load_number>/', load_views.edit_load, name='edit_load'),  # Edit a load using load_number
    path('delete/<int:load_number>/', load_views.delete_load, name='delete_load'),  # Delete a load using load_number

    # Customer-related URLs
    path('customers/add/', customer_views.add_customer, name='add_customer'),  # URL for adding a new customer
]
