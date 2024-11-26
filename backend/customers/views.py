# File: views.py

import logging
from decimal import Decimal, InvalidOperation
from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import api_view
from rest_framework.pagination import PageNumberPagination
from .models import Customer
from .forms import CustomerForm
from .serializers import CustomerSerializer, CustomerFullSerializer
from .fmcsa_utils import fetch_fmcsa_data

# Configure logger
logger = logging.getLogger(__name__)

# --- FMCSA API View ---
def get_fmcsa_data(request):
    """
    Fetch FMCSA data for a given MC docket number.
    """
    mc_number = request.GET.get('mcNumber')
    logger.info(f"Received request for MC number: {mc_number}")

    if not mc_number:
        logger.error("MC number is missing in the request")
        return JsonResponse({"error": "MC number is required"}, status=400)

    data = fetch_fmcsa_data(mc_number)
    logger.info(f"Fetched data from FMCSA: {data}")

    if "error" in data:
        return JsonResponse({"error": data["error"]}, status=400)

    content = data.get("content", [{}])[0].get("carrier", {})
    mapped_data = {
        "legalName": content.get("legalName", ""),
        "phyStreet": content.get("phyStreet", ""),
        "phyCity": content.get("phyCity", ""),
        "phyState": content.get("phyState", ""),
        "phyZipcode": content.get("phyZipcode", ""),
        "phone": content.get("phone", ""),
        "dotNumber": content.get("dotNumber", ""),
    }

    return JsonResponse(mapped_data, safe=False)


# --- Customer Management Views ---
def customer_list(request):
    """
    List customers with optional search and pagination.
    """
    query = request.GET.get('q', '')
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
        customers = Customer.objects.all().order_by('name')

    paginator = Paginator(customers, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, 'customers/customer_list.html', {'page_obj': page_obj, 'query': query})


def add_customer(request):
    """
    Add a new customer with FMCSA data integration.
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
            if request.is_ajax():
                return JsonResponse({'success': True, 'slug': customer.slug})
            return redirect('customers:customer_list')
        else:
            if request.is_ajax():
                return JsonResponse({'success': False, 'errors': form.errors})
    else:
        form = CustomerForm()
    return render(request, 'customers/add_customer.html', {'form': form})


def edit_customer(request, slug):
    """
    Edit an existing customer using slug.
    """
    customer = get_object_or_404(Customer, slug=slug)
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
            if request.is_ajax():
                return JsonResponse({'success': True, 'slug': customer.slug})
            return redirect('customers:customer_list')
        else:
            if request.is_ajax():
                return JsonResponse({'success': False, 'errors': form.errors})
    else:
        form = CustomerForm(instance=customer)
    return render(request, 'customers/edit_customer.html', {'form': form, 'customer': customer})


def delete_customer(request, slug):
    """
    Delete an existing customer using slug.
    """
    customer = get_object_or_404(Customer, slug=slug)
    if request.method == 'POST':
        customer.delete()
        if request.is_ajax():
            return JsonResponse({'success': True})
        return redirect('customers:customer_list')
    return render(request, 'customers/delete_customer.html', {'customer': customer})


def customer_detail(request, slug):
    """
    Show details of a single customer using slug.
    """
    customer = get_object_or_404(Customer, slug=slug)
    return render(request, 'customers/customer_detail.html', {'customer': customer})


# --- API Views ---
@api_view(['GET'])
def customer_detail_by_slug(request, slug):
    """
    API View to get customer details by slug.
    """
    customer = get_object_or_404(Customer, slug=slug)
    serializer = CustomerSerializer(customer)
    return Response(serializer.data)


class CustomerPagination(PageNumberPagination):
    """
    Custom pagination for customer API views.
    """
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class CustomerListCreate(generics.ListCreateAPIView):
    """
    API endpoint to list and create customers.
    """
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    pagination_class = CustomerPagination

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminCustomerView(APIView):
    """
    Admin-only API view for managing customers.
    """
    permission_classes = [IsAdminUser]

    def get(self, request, slug):
        customer = Customer.objects.filter(slug=slug).first()
        if not customer:
            return Response({'error': 'Customer not found'}, status=404)
        serializer = CustomerFullSerializer(customer)
        return Response(serializer.data)

    def patch(self, request, slug):
        customer = Customer.objects.filter(slug=slug).first()
        if not customer:
            return Response({'error': 'Customer not found'}, status=404)
        serializer = CustomerFullSerializer(customer, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


class CustomerCreateView(APIView):
    """
    Create a customer with credit limit sanitization.
    """
    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        try:
            if 'credit_limit' in data:
                data['credit_limit'] = Decimal(str(data['credit_limit']).replace(",", ""))
        except (ValueError, InvalidOperation):
            return Response({'credit_limit': ['A valid number is required.']}, status=400)

        serializer = CustomerSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=400)
