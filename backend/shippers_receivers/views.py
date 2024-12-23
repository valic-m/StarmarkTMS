from rest_framework import generics
from .models import Location, Customer, LocationPhoto, Category
from .serializers import LocationSerializer, CustomerSerializer, LocationPhotoSerializer, CategorySerializer


class LocationListCreateView(generics.ListCreateAPIView):
    """
    API view to list and create locations.
    """
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class LocationRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, or delete a specific location.
    """
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class CustomerListCreateView(generics.ListCreateAPIView):
    """
    API view to list and create customers.
    """
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class CustomerRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, or delete a specific customer.
    """
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class LocationPhotoListCreateView(generics.ListCreateAPIView):
    """
    API view to list and create location photos.
    """
    queryset = LocationPhoto.objects.all()
    serializer_class = LocationPhotoSerializer


class LocationPhotoRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, or delete a specific location photo.
    """
    queryset = LocationPhoto.objects.all()
    serializer_class = LocationPhotoSerializer


class CategoryListCreateView(generics.ListCreateAPIView):
    """
    API view to list and create categories.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CategoryRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, or delete a specific category.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
