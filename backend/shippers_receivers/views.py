from rest_framework import generics
from .models import Location, LocationPhoto, Category  # Removed Customer
from .serializers import LocationSerializer, LocationPhotoSerializer, CategorySerializer


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


# Removed CustomerListCreateView and CustomerRetrieveUpdateDestroyView


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
