from rest_framework import serializers
from backend.shippers_receivers.models import ShipperReceiverCompany

class ShipperReceiverCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = ShipperReceiverCompany
        fields = '__all__'  # Include all fields in the model
        read_only_fields = ['id']  # ID should be read-only
