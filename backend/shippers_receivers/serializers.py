from rest_framework import serializers
from .models import (
    Location,
    LocationPhoto,
    Category,
    OperatingHours,
    LocationComment
)


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


class OperatingHoursSerializer(serializers.ModelSerializer):
    """
    Serializer for the OperatingHours model.
    """
    class Meta:
        model = OperatingHours
        fields = ['day', 'open_time', 'close_time']
        extra_kwargs = {
            'open_time': {'allow_null': True, 'required': False},
            'close_time': {'allow_null': True, 'required': False},
        }

    def to_internal_value(self, data):
        """
        Override to convert empty strings to None for open_time and close_time.
        """
        if 'open_time' in data and data['open_time'] == '':
            data['open_time'] = None
        if 'close_time' in data and data['close_time'] == '':
            data['close_time'] = None
        return super().to_internal_value(data)


class LocationCommentSerializer(serializers.ModelSerializer):
    """
    Serializer for the LocationComment model.
    """
    # Show the username or string representation of the user
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = LocationComment
        fields = '__all__'


class LocationSerializer(serializers.ModelSerializer):
    """
    Serializer for the Location model.
    """
    categories = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Category.objects.all(),
        help_text="List of category IDs associated with the location."
    )
    photos = LocationPhotoSerializer(many=True, read_only=True)
    operating_hours = OperatingHoursSerializer(many=True, required=False)
    location_comments = LocationCommentSerializer(many=True, read_only=True)

    class Meta:
        model = Location
        fields = [
            'id',
            'name',
            'phone_number',
            'email',
            'address_line1',
            'address_line2',
            'city',
            'state',
            'zip_code',
            'load_time',
            'do_not_load',
            'no_reefers',
            'plus_code',
            'website',
            'categories',
            'charges_lumper',
            'lumper_fee',
            'directions',
            'lat',
            'lng',
            'appointment_required',
            'fcfs',
            'photos',
            'operating_hours',
            'location_comments'
        ]
        read_only_fields = (
            'id',
            'photos',
            'location_comments'
        )

    def validate(self, attrs):
        """
        Custom validation to prevent creating a duplicate location
        with the same address_line1, city, state, and zip_code.
        """
        address_line1 = attrs.get('address_line1')
        city = attrs.get('city')
        state = attrs.get('state')
        zip_code = attrs.get('zip_code')

        # Check if the combination already exists
        if self.instance:
            # If updating, exclude the current instance from the check
            exists = Location.objects.filter(
                address_line1=address_line1,
                city=city,
                state=state,
                zip_code=zip_code
            ).exclude(id=self.instance.id).exists()
        else:
            exists = Location.objects.filter(
                address_line1=address_line1,
                city=city,
                state=state,
                zip_code=zip_code
            ).exists()

        if exists:
            raise serializers.ValidationError(
                "A location with this address already exists."
            )
        return attrs

    def create(self, validated_data):
        """
        Custom create method to handle category and operating hours relationships.
        """
        categories = validated_data.pop('categories', [])
        operating_hours_data = validated_data.pop('operating_hours', [])

        # Create the Location instance
        location = Location.objects.create(**validated_data)
        location.categories.set(categories)

        # Create OperatingHours instances
        for oh_data in operating_hours_data:
            OperatingHours.objects.create(location=location, **oh_data)

        return location

    def update(self, instance, validated_data):
        """
        Custom update method to handle category and operating hours relationships.
        """
        categories = validated_data.pop('categories', None)
        operating_hours_data = validated_data.pop('operating_hours', None)

        if categories is not None:
            instance.categories.set(categories)

        if operating_hours_data is not None:
            # Remove existing operating hours
            instance.operating_hours.all().delete()
            # Add new operating hours
            for oh_data in operating_hours_data:
                OperatingHours.objects.create(location=instance, **oh_data)

        # Update other fields
        return super().update(instance, validated_data)
