from rest_framework import serializers
from decimal import Decimal
from .models import Customer


class CustomerSerializer(serializers.ModelSerializer):
    """
    Serializer for the Customer model with essential fields.
    """
    credit_limit = serializers.DecimalField(max_digits=15, decimal_places=2, required=False)

    def validate_credit_limit(self, value):
        """
        Validates and sanitizes the credit_limit field.
        """
        if value is None:
            return value
        try:
            return Decimal(str(value).replace(",", ""))
        except (ValueError, TypeError):
            raise serializers.ValidationError("A valid number is required.")

    class Meta:
        model = Customer
        fields = [
            'id',
            'name',
            'slug',  # Include slug for URL lookups
            'contact_name',
            'mc_number',
            'city',
            'state',
            'phone_number',
            'email',
            'credit_limit',
            'notes',
        ]


class CustomerFullSerializer(serializers.ModelSerializer):
    """
    Full serializer for the Customer model, including all fields.
    """
    credit_limit = serializers.DecimalField(max_digits=15, decimal_places=2, required=False)

    def validate_credit_limit(self, value):
        """
        Validates and sanitizes the credit_limit field.
        """
        if value is None:
            return value
        try:
            return Decimal(str(value).replace(",", ""))
        except (ValueError, TypeError):
            raise serializers.ValidationError("A valid number is required.")

    def validate_phone_number(self, value):
        """
        Validates and formats the phone_number field.
        """
        if value and len(value) == 10 and value.isdigit():
            return f"({value[:3]}) {value[3:6]}-{value[6:]}"
        return value

    class Meta:
        model = Customer
        fields = '__all__'  # Include all fields from the model


class CustomerCompleteSerializer(serializers.ModelSerializer):
    """
    Serializer with additional validation and customization.
    """
    credit_limit = serializers.DecimalField(max_digits=15, decimal_places=2, required=False)

    def validate_credit_limit(self, value):
        """
        Validates and sanitizes the credit_limit field.
        """
        if value is None:
            return value
        try:
            return Decimal(str(value).replace(",", ""))
        except (ValueError, TypeError):
            raise serializers.ValidationError("A valid number is required.")

    def validate_phone_number(self, value):
        """
        Validates and formats the phone_number field.
        """
        if value and len(value) == 10 and value.isdigit():
            return f"({value[:3]}) {value[3:6]}-{value[6:]}"
        return value

    class Meta:
        model = Customer
        fields = '__all__'
