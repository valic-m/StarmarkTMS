from django.urls import path
from backend.shippers_receivers import views

app_name = 'shippers_receivers'  # Namespace for the app

urlpatterns = [
    path('shippers/', views.shipper_list, name='shipper_list'),  # List of shippers
    path('shippers/<int:id>/', views.shipper_detail, name='shipper_detail'),  # Shipper detail view
    path('receivers/', views.receiver_list, name='receiver_list'),  # List of receivers
    path('receivers/<int:id>/', views.receiver_detail, name='receiver_detail'),  # Receiver detail view
    path('add/', views.add_company, name='add_company'),  # Add company view
    path('edit/<int:company_id>/', views.edit_company, name='edit_company'),  # Edit company view
    path('companies/', views.company_list, name='company_list'),  # List of companies
]
