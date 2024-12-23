from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from django.shortcuts import get_object_or_404
from backend.loads.models import Load
from backend.customers.models import Customer
from backend.loads.serializers import LoadSerializer
from backend.customers.serializers import CustomerSerializer
from backend.shippers_receivers.models import Location
from backend.shippers_receivers.serializers import LocationSerializer
from backend.users.models import CustomUser
from backend.users.serializers import CustomUserSerializer


# API to list and create loads
class LoadListCreateAPIView(generics.ListCreateAPIView):
    queryset = Load.objects.all()
    serializer_class = LoadSerializer

    def perform_create(self, serializer):
        """
        Optionally create a new customer if not provided.
        """
        customer_data = self.request.data.get('customer')
        if customer_data and isinstance(customer_data, dict):  # Check for nested customer data
            customer_serializer = CustomerSerializer(data=customer_data)
            if customer_serializer.is_valid():
                customer = customer_serializer.save()
                serializer.save(customer=customer)
            else:
                raise ValueError("Invalid customer data")
        else:
            serializer.save()


# API to retrieve, update, or delete a load by load_number
class LoadDetailAPIView(APIView):
    def get(self, request, load_number):
        load = get_object_or_404(Load, load_number=load_number)
        serializer = LoadSerializer(load)
        return Response(serializer.data)

    def patch(self, request, load_number):
        load = get_object_or_404(Load, load_number=load_number)
        serializer = LoadSerializer(load, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, load_number):
        load = get_object_or_404(Load, load_number=load_number)
        load.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# API to fetch locations (shippers and receivers)
class LocationListAPIView(generics.ListAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


# API to fetch custom users for "Booked With"
class CustomUserListAPIView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
