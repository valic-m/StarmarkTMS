# File: C:/Users/valic/OneDrive/Documents/TMS/backend/shippers_receivers/views.py
from django.shortcuts import render, redirect, get_object_or_404
from django.core.paginator import Paginator
from backend.shippers_receivers.models import ShipperReceiverCompany
from backend.shippers_receivers.forms import CompanyForm
import re
from datetime import timedelta

def parse_duration(duration_str):
    """Parse a human-friendly duration string into a timedelta object."""
    match = re.match(r'(?:(\d+)\s*hours?)?\s*(?:(\d+)\s*minutes?)?\s*(?:(\d+)\s*seconds?)?', duration_str, re.IGNORECASE)
    if not match:
        return None

    hours = int(match.group(1)) if match.group(1) else 0
    minutes = int(match.group(2)) if match.group(2) else 0
    seconds = int(match.group(3)) if match.group(3) else 0

    return timedelta(hours=hours, minutes=minutes, seconds=seconds)

def add_company(request):
    company_type = request.GET.get('type', 'shipper')  # Default to 'shipper'
    is_modal = request.GET.get('modal') == 'true'

    if request.method == 'POST':
        form = CompanyForm(request.POST)
        if form.is_valid():
            company = form.save(commit=False)
            # You can set other fields or perform additional logic here if needed
            form.save()
            if is_modal:
                return render(request, 'shippers_receivers/close_modal.html')
            return redirect('shippers_receivers:company_list')
    else:
        form = CompanyForm()

    template_name = 'shippers_receivers/add_company.html'
    return render(request, template_name, {'form': form, 'type': company_type})

def edit_company(request, company_id):
    # Retrieve the company object or return a 404 if it does not exist
    company = get_object_or_404(ShipperReceiverCompany, pk=company_id)

    if request.method == 'POST':
        # Update the company with the submitted form data
        form = CompanyForm(request.POST, instance=company)
        if form.is_valid():
            form.save()
            return redirect('shippers_receivers:company_list')  # Redirect to the company list after saving
        else:
            print("Form is not valid:", form.errors)  # Optional: print form errors for debugging
    else:
        # Display the form with the existing company data for editing
        form = CompanyForm(instance=company)

    # Render the edit_company.html template
    return render(request, 'shippers_receivers/edit_company.html', {'form': form, 'company': company})

def company_list(request):
    companies = ShipperReceiverCompany.objects.all()
    return render(request, 'shippers_receivers/company_list.html', {'companies': companies})

def shipper_list(request):
    query = request.GET.get('q', '')
    # Get all companies, treating them as shippers
    shippers = ShipperReceiverCompany.objects.all()

    if query:
        shippers = shippers.filter(company_name__icontains=query)

    shippers = shippers.order_by('company_name')
    paginator = Paginator(shippers, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    context = {
        'page_obj': page_obj,
        'query': query,
    }

    return render(request, 'shippers_receivers/shipper_list.html', context)

def shipper_detail(request, id):
    # Get the company object without filtering by 'is_shipper'
    shipper = get_object_or_404(ShipperReceiverCompany, pk=id)
    return render(request, 'shippers_receivers/shipper_detail.html', {'shipper': shipper})

def receiver_list(request):
    query = request.GET.get('q', '')
    # Get all companies, treating them as receivers
    receivers = ShipperReceiverCompany.objects.all()

    if query:
        receivers = receivers.filter(company_name__icontains=query)

    receivers = receivers.order_by('company_name')
    paginator = Paginator(receivers, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    context = {
        'page_obj': page_obj,
        'query': query,
    }

    return render(request, 'shippers_receivers/receiver_list.html', context)

def receiver_detail(request, id):
    # Get the company object without filtering by 'is_receiver'
    receiver = get_object_or_404(ShipperReceiverCompany, pk=id)
    return render(request, 'shippers_receivers/receiver_detail.html', {'receiver': receiver})
