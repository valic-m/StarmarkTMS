from django.urls import path
from . import views

urlpatterns = [
    path('companies-list/', views.company_list, name='companies_list'),  # List all companies
    path('company/<int:company_id>/', views.company_detail, name='company_detail'),  # View details of a specific company
    path('create-company/', views.create_company, name='create_company'),  # Route for creating a company
]
