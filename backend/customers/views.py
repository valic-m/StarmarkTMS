import logging
from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Customer
from .forms import CustomerForm
from .serializers import CustomerSerializer
from django.core.paginator import Paginator
from .fmcsa_utils import fetch_fmcsa_data  # Assuming you have an FMCSA utility module

# Configure logger
logger = logging.getLogger(__name__)


# --- Django Template Views ---

# View to list all customers with pagination and search functionality
def customer_list(request):
    query = request.GET.get('q', '')  # Search query
    if query:
        customers = Customer.objects.filter(
            name__icontains=query) | Customer.objects.filter(
            contact_name__icontains=query) | Customer.objects.filter(
            mc_number__icontains=query) | Customer.objects.filter(
            city__icontains=query) | Customer.objects.filter(
            phone_number__icontains=query)
    else:
        customers = Customer.objects.all().order_by('name')  # Add ordering here

    paginator = Paginator(customers, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, 'customers/customer_list.html', {'page_obj': page_obj, 'query': query})


# View to create a new customer
def create_customer(request):
    if request.method == 'POST':
        form = CustomerForm(request.POST)
        if form.is_valid():
            customer = form.save(commit=False)
            mc_number = form.cleaned_data.get('mc_number')
            if mc_number:
                fmcsa_data = fetch_fmcsa_data(mc_number)
                if fmcsa_data:
                    customer.name = fmcsa_data.get('name', customer.name)
                    customer.address_street = fmcsa_data.get('address', customer.address_street)
                    customer.phone_number = fmcsa_data.get('phone', customer.phone_number)

            customer.save()
            return redirect('customers:customer_list')
    else:
        form = CustomerForm()
    return render(request, 'customers/create_customer.html', {'form': form})


# View to edit an existing customer
def edit_customer(request, customer_id):
    customer = get_object_or_404(Customer, pk=customer_id)
    if request.method == 'POST':
        form = CustomerForm(request.POST, instance=customer)
        if form.is_valid():
            customer = form.save(commit=False)
            mc_number = form.cleaned_data.get('mc_number')
            if mc_number:
                fmcsa_data = fetch_fmcsa_data(mc_number)
                if fmcsa_data:
                    customer.name = fmcsa_data.get('name', customer.name)
                    customer.address_street = fmcsa_data.get('address', customer.address_street)
                    customer.phone_number = fmcsa_data.get('phone', customer.phone_number)

            customer.save()
            return redirect('customers:customer_list')
    else:
        form = CustomerForm(instance=customer)
    return render(request, 'customers/edit_customer.html', {'form': form, 'customer': customer})


# View to delete a customer
def delete_customer(request, customer_id):
    customer = get_object_or_404(Customer, pk=customer_id)
    if request.method == 'POST':
        customer.delete()
        return redirect('customers:customer_list')
    return render(request, 'customers/delete_customer.html', {'customer': customer})


# View to add a new customer from a modal form (for use in 'loads/create_load.html')
def add_customer(request):
    if request.method == 'POST':
        form = CustomerForm(request.POST)
        if form.is_valid():
            customer = form.save(commit=False)
            mc_number = form.cleaned_data.get('mc_number')
            if mc_number:
                fmcsa_data = fetch_fmcsa_data(mc_number)
                if fmcsa_data:
                    customer.name = fmcsa_data.get('name', customer.name)
                    customer.address_street = fmcsa_data.get('address', customer.address_street)
                    customer.phone_number = fmcsa_data.get('phone', customer.phone_number)

            customer.save()
            # Return JSON response for AJAX calls
            if request.is_ajax():
                return JsonResponse({'success': True})
            return redirect('customers:customer_list')
        else:
            # Return JSON response for form errors in AJAX calls
            if request.is_ajax():
                return JsonResponse({'success': False, 'errors': form.errors})
    else:
        form = CustomerForm()
    return render(request, 'customers/add_customer.html', {'form': form})


# View to show details of a single customer
def customer_detail(request, customer_id):
    customer = get_object_or_404(Customer, pk=customer_id)
    return render(request, 'customers/customer_detail.html', {'customer': customer})


# --- API Views (Django REST Framework) ---

class CustomerListCreate(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    def create(self, request, *args, **kwargs):
        logger.info("Received data for new customer creation: %s", request.data)
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            self.perform_create(serializer)
            logger.info("Customer created successfully with data: %s", serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            logger.error("Customer creation failed with errors: %s", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
