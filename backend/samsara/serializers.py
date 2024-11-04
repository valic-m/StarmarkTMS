# Path: C:/Users/valic/OneDrive/Documents/TMS/backend/samsara/serializers.py

from rest_framework import serializers
from backend.samsara.models import Samsara  # Updated path to the Samsara model

class SamsaraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Samsara
        fields = '__all__'  # Serialize all fields of the Samsara model
