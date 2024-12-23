from rest_framework import serializers
from .models import Location, Customer, LocationPhoto, Category


class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer for the Category model.
    """
    class Meta:
        model = Category
        fields = '__all__'


class LocationPhotoSerializer(serializers.ModelSerializer):
    """
    Serializer for the LocationPhoto model.
    """
    class Meta:
        model = LocationPhoto
        fields = '__all__'


class LocationSerializer(serializers.ModelSerializer):
    """
    Serializer for the Location model.
    """
    categories = CategorySerializer(many=True, read_only=True)
    photos = LocationPhotoSerializer(many=True, read_only=True)

    class Meta:
        model = Location
        fields = '__all__'


class CustomerSerializer(serializers.ModelSerializer):
    """
    Serializer for the Customer model.
    """
    class Meta:
        model = Customer
        fields = '__all__'
