# Path: C:\Users\valic\OneDrive\Documents\TMS\backend\accounts\urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.account_list, name='account_list'),  # List of all accounts
    path('<int:account_id>/', views.account_detail, name='account_detail'),  # Detail view for an account
    path('create/', views.create_account, name='create_account'),  # Form to create a new account
]
