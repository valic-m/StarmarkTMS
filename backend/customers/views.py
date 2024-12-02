import logging
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.pagination import PageNumberPagination
from .models import Customer
from .serializers import CustomerSerializer, CustomerFullSerializer
from .fmcsa_utils import fetch_fmcsa_data

# Configure logger
logger = logging.getLogger(__name__)


# --- FMCSA API View ---
@api_view(['GET'])
def get_fmcsa_data(request):
    """
    Fetch FMCSA data for a given MC docket number.
    """
    mc_number = request.GET.get('mcNumber')
    logger.info(f"Received request for MC number: {mc_number}")

    if not mc_number:
        logger.error("MC number is missing in the request")
        return Response({"error": "MC number is required"}, status=status.HTTP_400_BAD_REQUEST)

    data = fetch_fmcsa_data(mc_number)
    logger.info(f"Fetched data from FMCSA: {data}")

    if "error" in data:
        return Response({"error": data["error"]}, status=status.HTTP_400_BAD_REQUEST)

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

    return Response(mapped_data, status=status.HTTP_200_OK)


# --- API Views ---
class CustomerListCreate(generics.ListCreateAPIView):
    """
    API endpoint to list and create customers.
    """
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    pagination_class = PageNumberPagination


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


class CustomerDetailView(APIView):
    """
    API view to retrieve or update a customer's details using slug.
    """
    def get(self, request, slug):
        customer = generics.get_object_or_404(Customer, slug=slug)
        serializer = CustomerFullSerializer(customer)
        return Response(serializer.data)

    def patch(self, request, slug):
        customer = generics.get_object_or_404(Customer, slug=slug)
        serializer = CustomerFullSerializer(customer, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminCustomerView(APIView):
    """
    Admin-only API view for managing customers.
    """
    def get(self, request, slug):
        customer = generics.get_object_or_404(Customer, slug=slug)
        serializer = CustomerFullSerializer(customer)
        return Response(serializer.data)

    def patch(self, request, slug):
        customer = generics.get_object_or_404(Customer, slug=slug)
        serializer = CustomerFullSerializer(customer, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
