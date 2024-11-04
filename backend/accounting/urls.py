# Path: C:\Users\valic\OneDrive\Documents\TMS\backend\accounting\urls.py

from django.urls import path
from backend.accounting import views  # Updated import path for backend structure

urlpatterns = [
    path('ready_to_print_invoices/', views.ready_to_print_invoices, name='ready_to_print_invoices'),
    path('create_invoice/<int:load_id>/', views.create_invoice, name='create_invoice'),
    path('unpaid_invoices/', views.unpaid_invoices, name='unpaid_invoices'),
    path('invoice_list/', views.invoice_list, name='invoice_list'),  # Add this route
    path('ar-aging-report/', views.ar_aging_report, name='ar_aging_report'),
    path('customer-summary-invoice/', views.customer_summary_invoice, name='customer_summary_invoice'),
    path('driver-settlements/', views.driver_settlements, name='driver_settlements'),
    path('carrier-settlements/', views.carrier_settlements, name='carrier_settlements'),
    path('owner-operator-settlements/', views.owner_operator_settlements, name='owner_operator_settlements'),
    path('settlement-history/', views.settlement_history, name='settlement_history'),
    path('chart-of-accounts/', views.chart_of_accounts, name='chart_of_accounts'),
    path('income-by-customer/', views.income_by_customer, name='income_by_customer'),
    path('income-by-truck/', views.income_by_truck, name='income_by_truck'),
]
