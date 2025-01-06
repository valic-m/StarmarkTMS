from rest_framework import serializers
from .models import Dispatch, DispatchStop
from backend.loads.models import Load
from backend.drivers_operators.models import Driver
from backend.trucks.models import Truck

class LoadSerializer(serializers.ModelSerializer):
    """Serializer for related Load model in Dispatch"""
    class Meta:
        model = Load
        fields = [
            'id', 'reference_number', 'pallet_count', 'weight', 'pickup_location', 'dropoff_location', 'status'
        ]


class DriverSerializer(serializers.ModelSerializer):
    """Serializer for related Driver model in Dispatch"""
    class Meta:
        model = Driver
        fields = ['id', 'full_name', 'license_number']


class TruckSerializer(serializers.ModelSerializer):
    """Serializer for related Truck model in Dispatch"""
    class Meta:
        model = Truck
        fields = ['id', 'number', 'capacity']


class DispatchStopSerializer(serializers.ModelSerializer):
    """Serializer for DispatchStop model"""
    class Meta:
        model = DispatchStop
        fields = [
            'id', 'dispatch', 'location', 'stop_order', 'pallets_handled',
            'weight_handled', 'is_crossdock', 'is_internal', 'arrival_time', 'departure_time'
        ]

    def validate(self, data):
        """Custom validation to ensure stop order is unique within a dispatch"""
        dispatch = data.get('dispatch')
        stop_order = data.get('stop_order')

        if DispatchStop.objects.filter(dispatch=dispatch, stop_order=stop_order).exists():
            raise serializers.ValidationError(
                f"Stop order {stop_order} already exists for this dispatch."
            )
        return data


class DispatchSerializer(serializers.ModelSerializer):
    """Serializer for Dispatch model with nested relationships"""
    load = LoadSerializer(read_only=True)
    driver = DriverSerializer(read_only=True)
    truck = TruckSerializer(read_only=True)
    stops = DispatchStopSerializer(many=True, read_only=True)

    class Meta:
        model = Dispatch
        fields = [
            'id', 'load', 'driver', 'truck', 'dispatch_time', 'status',
            'pickup_time', 'delivery_time', 'shipper_in_time',
            'shipper_out_time', 'receiver_in_time', 'receiver_out_time', 'stops'
        ]