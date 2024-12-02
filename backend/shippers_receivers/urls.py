from django.urls import path
from backend.shippers_receivers import views

app_name = 'shippers_receivers'  # Namespace for the app

urlpatterns = [
    # Shipper-related endpoints
    path('shippers/', views.shipper_list, name='shipper_list'),  # List and create shippers
    path('shippers/<int:id>/', views.shipper_detail, name='shipper_detail'),  # Retrieve, update, or delete a specific shipper

    # Receiver-related endpoints
    path('receivers/', views.receiver_list, name='receiver_list'),  # List and create receivers
    path('receivers/<int:id>/', views.receiver_detail, name='receiver_detail'),  # Retrieve, update, or delete a specific receiver

    # Combined endpoint for both shippers and receivers
    path('all/', views.ShipperReceiverListAPIView.as_view(), name='all_companies'),  # List all shippers and receivers
]
