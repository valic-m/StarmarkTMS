from django.urls import path
from . import views

urlpatterns = [
    # Carrier list view (showing all carriers)
    path('', views.carrier_list, name='carrier_list'),  # Existing route for carrier list

    # Carrier detail view (for a specific carrier, using its ID)
    path('<int:carrier_id>/', views.carrier_detail, name='carrier_detail'),  # Existing route for carrier detail

    # Create new carrier view
    path('create/', views.create_carrier, name='create_carrier'),  # Route for creating a carrier
]
