# Path: C:\Users\valic\OneDrive\Documents\TMS\backend\accounting\views.py

from django.shortcuts import render, get_object_or_404, redirect
from backend.accounting.models import Invoice  # Adjusted import path for backend structure
from backend.loads.models import Load  # Adjusted import path for backend structure

# View for listing all invoices
def invoice_list(request):
    invoices = Invoice.objects.all()  # Fetching all invoices from the database
    return render(request, 'accounting/invoice_list.html', {'invoices': invoices})

# View for "Ready to Print Invoices" - Shows loads marked as "Delivered" but not yet invoiced
def ready_to_print_invoices(request):
    delivered_loads = Load.objects.filter(status='Delivered', invoice__isnull=True)  # Loads delivered but not invoiced
    return render(request, 'accounting/ready_to_print_invoices.html', {'delivered_loads': delivered_loads})

# View for creating an invoice for a delivered load
def create_invoice(request, load_id):
    load = get_object_or_404(Load, pk=load_id)
    if load.status != 'Delivered':
        return render(request, 'accounting/error.html', {'message': 'Cannot create invoice for undelivered load.'})
    
    # Create an invoice for the delivered load
    invoice = Invoice.objects.create(load=load, total_amount=load.calculate_total_amount())
    
    # After creating an invoice, redirect to the unpaid invoices page
    return redirect('unpaid_invoices')

# View for listing unpaid invoices
def unpaid_invoices(request):
    unpaid_invoices = Invoice.objects.filter(is_paid=False)  # Fetch unpaid invoices
    return render(request, 'accounting/unpaid_invoices.html', {'invoices': unpaid_invoices})

# Additional Views
def ar_aging_report(request):
    return render(request, 'accounting/ar_aging_report.html')  # Render the template

def customer_summary_invoice(request):
    return render(request, 'accounting/customer_summary_invoice.html')

def driver_settlements(request):
    return render(request, 'accounting/driver_settlements.html')

def carrier_settlements(request):
    return render(request, 'accounting/carrier_settlements.html')

def owner_operator_settlements(request):
    return render(request, 'accounting/owner_operator_settlements.html')

def settlement_history(request):
    return render(request, 'accounting/settlement_history.html')

def chart_of_accounts(request):
    return render(request, 'chart_of_accounts.html')

def income_by_customer(request):
    return render(request, 'accounting/income_by_customer.html')

def income_by_truck(request):
    return render(request, 'accounting/income_by_truck.html')
