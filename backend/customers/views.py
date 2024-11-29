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
from django.core.paginator import Paginator

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
    customers = Customer.objects.all().order_by('name')
    if query:
        customers = customers.filter(
            name__icontains=query
        ) | customers.filter(
            contact_name__icontains=query
        ) | customers.filter(
            mc_number__icontains=query
        ) | customers.filter(
            city__icontains=query
        ) | customers.filter(
            phone_number__icontains=query
        )

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
class CustomerDetailView(APIView):
    """
    API view to retrieve a customer's details using its slug.
    """
    def get(self, request, slug):
        customer = get_object_or_404(Customer, slug=slug)
        serializer = CustomerSerializer(customer)
        return Response(serializer.data, status=status.HTTP_200_OK)


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
        customer = get_object_or_404(Customer, slug=slug)
        serializer = CustomerFullSerializer(customer)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, slug):
        customer = get_object_or_404(Customer, slug=slug)
        serializer = CustomerFullSerializer(customer, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomerCreateView(APIView):
    """
    API view to create a new customer.
    """
    def post(self, request, *args, **kwargs):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
