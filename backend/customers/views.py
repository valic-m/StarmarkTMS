import logging
from decimal import Decimal, InvalidOperation
from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from .models import Customer
from .forms import CustomerForm
from .serializers import CustomerSerializer, CustomerFullSerializer
from django.core.paginator import Paginator
from .fmcsa_utils import fetch_fmcsa_data

# Configure logger
logger = logging.getLogger(__name__)

# --- FMCSA API View ---
def get_fmcsa_data(request):
    """
    Django view to fetch FMCSA data for a given MC docket number.
    """
    mc_number = request.GET.get('mcNumber')  # Get MC number from query parameters
    logger.info(f"Received request for MC number: {mc_number}")

    if not mc_number:
        logger.error("MC number is missing in the request")
        return JsonResponse({"error": "MC number is required"}, status=400)

    # Fetch data using the utility function
    data = fetch_fmcsa_data(mc_number)
    logger.info(f"Fetched data from FMCSA: {data}")

    if "error" in data:
        return JsonResponse({"error": data["error"]}, status=400)

    # Extract and map relevant fields for frontend use
    content = data.get("content", [{}])[0].get("carrier", {})
    mapped_data = {
        "legalName": content.get("legalName", ""),
        "phyStreet": content.get("phyStreet", ""),
        "phyCity": content.get("phyCity", ""),
        "phyState": content.get("phyState", ""),
        "phyZipcode": content.get("phyZipcode", ""),
        "phone": content.get("phone", ""),  # Default to empty if missing
        "dotNumber": content.get("dotNumber", ""),
    }

    return JsonResponse(mapped_data, safe=False)


# --- Customer Management Views ---
def customer_list(request):
    """
    View to list customers with optional search and pagination.
    """
    query = request.GET.get('q', '')  # Search query
    if query:
        customers = Customer.objects.filter(
            name__icontains=query
        ) | Customer.objects.filter(
            contact_name__icontains=query
        ) | Customer.objects.filter(
            mc_number__icontains=query
        ) | Customer.objects.filter(
            city__icontains=query
        ) | Customer.objects.filter(
            phone_number__icontains=query
        )
    else:
        customers = Customer.objects.all().order_by('name')  # Alphabetical ordering

    paginator = Paginator(customers, 10)  # Paginate by 10 items per page
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, 'customers/customer_list.html', {'page_obj': page_obj, 'query': query})


def add_customer(request):
    """
    View to add a new customer with FMCSA data integration.
    """
    if request.method == 'POST':
        form = CustomerForm(request.POST)
        if form.is_valid():
            customer = form.save(commit=False)
            mc_number = form.cleaned_data.get('mc_number')
            if mc_number:
                fmcsa_data = fetch_fmcsa_data(mc_number)
                if fmcsa_data:
                    customer.name = fmcsa_data.get('legalName', customer.name)
                    customer.address_street = fmcsa_data.get('phyStreet', customer.address_street)
                    customer.phone_number = fmcsa_data.get('phone', customer.phone_number)

            customer.save()
            if request.is_ajax():  # For AJAX requests
                return JsonResponse({'success': True})
            return redirect('customers:customer_list')
        else:
            if request.is_ajax():
                return JsonResponse({'success': False, 'errors': form.errors})
    else:
        form = CustomerForm()
    return render(request, 'customers/add_customer.html', {'form': form})


def create_customer(request):
    """
    View to create a new customer with optional FMCSA data integration.
    """
    if request.method == 'POST':
        form = CustomerForm(request.POST)
        if form.is_valid():
            customer = form.save(commit=False)
            mc_number = form.cleaned_data.get('mc_number')
            if mc_number:
                fmcsa_data = fetch_fmcsa_data(mc_number)
                if fmcsa_data:
                    customer.name = fmcsa_data.get('legalName', customer.name)
                    customer.address_street = fmcsa_data.get('phyStreet', customer.address_street)
                    customer.phone_number = fmcsa_data.get('phone', customer.phone_number)

            customer.save()
            return redirect('customers:customer_list')
    else:
        form = CustomerForm()
    return render(request, 'customers/create_customer.html', {'form': form})


def edit_customer(request, customer_id):
    """
    View to edit an existing customer with optional FMCSA data integration.
    """
    customer = get_object_or_404(Customer, pk=customer_id)
    if request.method == 'POST':
        form = CustomerForm(request.POST, instance=customer)
        if form.is_valid():
            customer = form.save(commit=False)
            mc_number = form.cleaned_data.get('mc_number')
            if mc_number:
                fmcsa_data = fetch_fmcsa_data(mc_number)
                if fmcsa_data:
                    customer.name = fmcsa_data.get('legalName', customer.name)
                    customer.address_street = fmcsa_data.get('phyStreet', customer.address_street)
                    customer.phone_number = fmcsa_data.get('phone', customer.phone_number)

            customer.save()
            return redirect('customers:customer_list')
    else:
        form = CustomerForm(instance=customer)
    return render(request, 'customers/edit_customer.html', {'form': form, 'customer': customer})


def delete_customer(request, customer_id):
    """
    View to delete an existing customer.
    """
    customer = get_object_or_404(Customer, pk=customer_id)
    if request.method == 'POST':
        customer.delete()
        return redirect('customers:customer_list')
    return render(request, 'customers/delete_customer.html', {'customer': customer})


def customer_detail(request, customer_id):
    """
    View to show details of a single customer.
    """
    customer = get_object_or_404(Customer, pk=customer_id)
    return render(request, 'customers/customer_detail.html', {'customer': customer})


# --- API Views (Django REST Framework) ---
class CustomerListCreate(generics.ListCreateAPIView):
    """
    API endpoint to list and create customers.
    """
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


class AdminCustomerView(APIView):
    """
    Admin-only API View to manage customers, including 'do_not_use'.
    """
    permission_classes = [IsAdminUser]

    def get(self, request, customer_id):
        customer = Customer.objects.filter(id=customer_id).first()
        if not customer:
            return Response({'error': 'Customer not found'}, status=404)
        serializer = CustomerFullSerializer(customer)
        return Response(serializer.data)

    def patch(self, request, customer_id):
        customer = Customer.objects.filter(id=customer_id).first()
        if not customer:
            return Response({'error': 'Customer not found'}, status=404)
        serializer = CustomerFullSerializer(customer, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


class CustomerCreateView(APIView):
    """
    API View to create a customer with credit_limit sanitization.
    """
    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        try:
            # Clean up credit_limit before validation
            if 'credit_limit' in data:
                data['credit_limit'] = Decimal(str(data['credit_limit']).replace(",", ""))
        except (ValueError, InvalidOperation):
            return Response({'credit_limit': ['A valid number is required.']}, status=400)

        serializer = CustomerSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        else:
            return Response(serializer.errors, status=400)
