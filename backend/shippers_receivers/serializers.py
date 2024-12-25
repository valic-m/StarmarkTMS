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
    categories = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Category.objects.all()
    )  # Make categories writable by accepting a list of IDs
    photos = LocationPhotoSerializer(many=True, read_only=True)  # Photos remain read-only

    class Meta:
        model = Location
        fields = '__all__'

    def create(self, validated_data):
        """
        Custom create method to handle categories.
        """
        categories = validated_data.pop('categories', [])
        location = Location.objects.create(**validated_data)
        location.categories.set(categories)  # Assign categories
        return location

    def update(self, instance, validated_data):
        """
        Custom update method to handle categories.
        """
        categories = validated_data.pop('categories', None)
        if categories is not None:
            instance.categories.set(categories)  # Update categories
        return super().update(instance, validated_data)
