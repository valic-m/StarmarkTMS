from rest_framework import serializers
from .models import Location, LocationPhoto, Category


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
