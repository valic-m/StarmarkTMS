from django.db import IntegrityError
from rest_framework import generics, status, serializers
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.exceptions import ValidationError

from .models import Location, OperatingHours, LocationPhoto, LocationComment, Category
from .serializers import (
    LocationSerializer,
    LocationPhotoSerializer,
    CategorySerializer,
    OperatingHoursSerializer,
    LocationCommentSerializer,
)


class LocationListCreateView(generics.ListCreateAPIView):
    """
    API view to list and create locations.
    """
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [AllowAny]  # Temporarily allow unauthenticated access

    def create(self, request, *args, **kwargs):
        print("Request Data:", request.data)
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except IntegrityError:
            return Response(
                {'detail': 'A location with this address already exists.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        except ValidationError as e:
            print("Validation Error:", e.detail)
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)


class LocationRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, or delete a specific location.
    """
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class OperatingHoursListCreateView(generics.ListCreateAPIView):
    """
    API view to list and create operating hours for a location.
    """
    queryset = OperatingHours.objects.all()
    serializer_class = OperatingHoursSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except serializers.ValidationError as e:
            print("Validation Error:", e.detail)
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)


class OperatingHoursRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, or delete specific operating hours.
    """
    queryset = OperatingHours.objects.all()
    serializer_class = OperatingHoursSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class LocationPhotoListCreateView(generics.ListCreateAPIView):
    """
    API view to list and create location photos.
    """
    queryset = LocationPhoto.objects.all()
    serializer_class = LocationPhotoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class LocationPhotoRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, or delete a specific location photo.
    """
    queryset = LocationPhoto.objects.all()
    serializer_class = LocationPhotoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class LocationCommentListCreateView(generics.ListCreateAPIView):
    """
    API view to list and create comments for a location.
    """
    queryset = LocationComment.objects.all()
    serializer_class = LocationCommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def create(self, request, *args, **kwargs):
        """
        Custom create logic to attach the user who created the comment.
        """
        data = request.data.copy()
        if request.user.is_authenticated:
            data['user'] = request.user.id
        else:
            return Response(
                {'detail': 'Authentication credentials were not provided.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        serializer = self.get_serializer(data=data)
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except serializers.ValidationError as e:
            print("Validation Error:", e.detail)
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)


class LocationCommentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, or delete a specific comment.
    """
    queryset = LocationComment.objects.all()
    serializer_class = LocationCommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class CategoryListCreateView(generics.ListCreateAPIView):
    """
    API view to list and create categories.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class CategoryRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, or delete a specific category.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
