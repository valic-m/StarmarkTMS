# File: C:/Users/valic/Documents/TMS/backend/customers/serializers.py

from rest_framework import serializers
from .models import Customer
import logging

# Configure logger
logger = logging.getLogger(__name__)

# Serializer for Customer model
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'name', 'contact_name', 'mc_number', 'city', 'phone_number', 'credit_limit']
