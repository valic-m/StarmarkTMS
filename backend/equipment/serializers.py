# Path: C:/Users/valic/OneDrive/Documents/TMS/backend/equipment/serializers.py

from rest_framework import serializers
from backend.equipment.models import Truck  # Updated import path for Truck model

class TruckSerializer(serializers.ModelSerializer):
    class Meta:
        model = Truck
        fields = '__all__'  # Serialize all fields of the Truck model
