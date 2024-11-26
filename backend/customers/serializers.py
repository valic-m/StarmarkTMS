from rest_framework import serializers
from decimal import Decimal
from .models import Customer
import logging

# Configure logger
logger = logging.getLogger(__name__)

# Serializer for Customer model with selected fields
class CustomerSerializer(serializers.ModelSerializer):
    credit_limit = serializers.DecimalField(max_digits=15, decimal_places=2, required=False)

    def validate_credit_limit(self, value):
        """
        Validates the credit_limit field by sanitizing the input.
        """
        if value is None:
            return value
        try:
            # Remove commas and ensure it is a valid decimal
            sanitized_value = Decimal(str(value).replace(",", ""))
            return sanitized_value
        except (ValueError, TypeError):
            raise serializers.ValidationError("A valid number is required.")

    class Meta:
        model = Customer
        fields = [
            'id',
            'name',
            'slug',  # Include the slug field for URL-based lookups
            'contact_name',
            'mc_number',
            'city',
            'phone_number',
            'credit_limit',
        ]


# Serializer for Customer model with all fields
class CustomerFullSerializer(serializers.ModelSerializer):
    credit_limit = serializers.DecimalField(max_digits=15, decimal_places=2, required=False)

    def validate_credit_limit(self, value):
        """
        Validates the credit_limit field by sanitizing the input.
        """
        if value is None:
            return value
        try:
            # Remove commas and ensure it is a valid decimal
            sanitized_value = Decimal(str(value).replace(",", ""))
            return sanitized_value
        except (ValueError, TypeError):
            raise serializers.ValidationError("A valid number is required.")

    def validate_phone_number(self, value):
        """
        Validates the phone number field to ensure it matches the expected format.
        """
        if value and len(value) == 10 and value.isdigit():
            return f"({value[:3]}){value[3:6]}-{value[6:]}"
        return value

    class Meta:
        model = Customer
        fields = '__all__'  # Includes all fields in the Customer model


# Serializer for Customer model with additional customization if required
class CustomerCompleteSerializer(serializers.ModelSerializer):
    credit_limit = serializers.DecimalField(max_digits=15, decimal_places=2, required=False)

    def validate_credit_limit(self, value):
        """
        Validates the credit_limit field by sanitizing the input.
        """
        if value is None:
            return value
        try:
            # Remove commas and ensure it is a valid decimal
            sanitized_value = Decimal(str(value).replace(",", ""))
            return sanitized_value
        except (ValueError, TypeError):
            raise serializers.ValidationError("A valid number is required.")

    def validate_phone_number(self, value):
        """
        Validates the phone number field to ensure it matches the expected format.
        """
        if value and len(value) == 10 and value.isdigit():
            return f"({value[:3]}){value[3:6]}-{value[6:]}"
        return value

    class Meta:
        model = Customer
        fields = '__all__'
