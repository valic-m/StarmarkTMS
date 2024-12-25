from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Location, LocationPhoto, Category  # Removed Customer
from .serializers import LocationSerializer, LocationPhotoSerializer, CategorySerializer


class LocationListCreateView(generics.ListCreateAPIView):
    """
    API view to list and create locations.
    """
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

    def create(self, request, *args, **kwargs):
        print("Request Data:", request.data)  # Log the request data
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except serializers.ValidationError as e:
            print("Validation Error:", e.detail)  # Print validation errors
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)


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
