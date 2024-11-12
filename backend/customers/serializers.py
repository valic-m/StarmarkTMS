from rest_framework import serializers
from .models import Customer
import logging

# Configure logger
logger = logging.getLogger(__name__)

# Serializer for Customer model with selected fields
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'name', 'contact_name', 'mc_number', 'city', 'phone_number', 'credit_limit']

# Serializer for Customer model with all fields
class CustomerFullSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'  # Includes all fields in the Customer model

# Serializer for Customer model with all fields (duplicate if used for additional purposes)
class CustomerCompleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'  # Or specify fields if you don't need all
