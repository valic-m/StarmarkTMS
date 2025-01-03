# backend/fleet/serializers.py

from rest_framework import serializers
from .models import (
    Truck,
    InspectionType,
    Inspection,
    MaintenanceLog,
    Expense,
    OutOfServiceHistory
)


class TruckSerializer(serializers.ModelSerializer):
    """
    Serializer for the Truck model, including all fields and nested relationships if needed.
    """

    class Meta:
        model = Truck
        fields = [
            "id",
            "name",
            "license_plate",
            "manufacturer",
            "year",
            "vin",
            "starting_mileage",
            "color",
            "owner",
            "carrier",
            "is_leased",
            "leased_to",
            "sub_leased",
            "owner_operated",
            "annual_insurance_cost",
            "insurance_renewal_date",
            "annual_plate_cost",
            "dashcam_installed",
            "apu_installed",
            "fuel_card",
            "integration_id",
            "is_out_of_service",
            "out_of_service_reason",

            # VIN decoding fields
            "suggested_vin",
            "error_code",
            "possible_values",
            "additional_error_text",
            "error_text",
            "vehicle_descriptor",
            "destination_market",
            "decoded_make",
            "manufacturer_name",
            "decoded_model",
            "decoded_model_year",
            "plant_city",
            "series",
            "trim",
            "vehicle_type",
            "plant_country",
            "plant_company_name",
            "plant_state",
            "trim2",
            "series2",
            "note",
            "base_price",
            "non_land_use",
            "body_class",
            "doors",
            "windows",
            "wheel_base_type",
            "track_width_inches",
            "gross_vehicle_weight_rating_from",
            "bed_length_inches",
            "curb_weight_pounds",
            "wheel_base_inches_from",
            "wheel_base_inches_to",
            "gross_combination_weight_rating_from",
            "gross_combination_weight_rating_to",
            "gross_vehicle_weight_rating_to",
            "bed_type",
            "cab_type_decoded",
            "trailer_type_connection",
            "trailer_body_type",
            "trailer_length_feet",
            "other_trailer_info",
            "number_of_wheels",
            "wheel_size_front_inches",
            "wheel_size_rear_inches",
            "entertainment_system",
            "steering_location",
            "number_of_seats",
            "number_of_seat_rows",
            "transmission_style",
            "transmission_speeds",
            "drive_type_decoded",
            "axles",
            "axle_configuration",
            "brake_system_type",
            "brake_system_description",
            "other_battery_info",
            "battery_type",
            "number_of_battery_cells_per_module",
            "battery_current_amps_from",
            "battery_voltage_volts_from",
            "battery_energy_kwh_from",
            "ev_drive_unit",
            "battery_current_amps_to",
            "battery_voltage_volts_to",
            "battery_energy_kwh_to",
            "number_of_battery_modules_per_pack",
            "number_of_battery_packs_per_vehicle",
            "charger_level",
            "charger_power_kw",
            "engine_number_of_cylinders_decoded",
            "displacement_cc",
            "displacement_ci",
            "displacement_l",
            "engine_stroke_cycles",
            "engine_model_decoded",
            "engine_power_kw",
            "fuel_type_primary_decoded",
            "valve_train_design",
            "engine_configuration_decoded",
            "fuel_type_secondary",
            "fuel_delivery_fuel_injection_type",
            "engine_brake_hp_from",
            "cooling_type",
            "engine_brake_hp_to",
            "electrification_level",
            "other_engine_info",
            "turbo",
            "top_speed_mph",
            "engine_manufacturer_decoded",
            "pretensioner",
            "seat_belt_type",
            "other_restraint_system_info",
            "curtain_air_bag_locations",
            "seat_cushion_air_bag_locations",
            "front_air_bag_locations",
            "knee_air_bag_locations",
            "side_air_bag_locations",
            "anti_lock_braking_system_abs",
            "electronic_stability_control_esc",
            "traction_control_decoded",
            "tire_pressure_monitoring_system_tpms_type",
            "active_safety_system_note",
            "auto_reverse_system_for_windows_and_sunroofs",
            "automatic_pedestrian_alerting_sound_for_hybrid_and_ev_only",
            "event_data_recorder_edr",
            "keyless_ignition",
            "sae_automation_level_from",
            "sae_automation_level_to",
            "adaptive_cruise_control_acc",
            "crash_imminent_braking_cib",
            "blind_spot_warning_bsw",
            "forward_collision_warning_fcw",
            "lane_departure_warning_ldw",
            "lane_keeping_assistance_lka",
            "backup_camera_decoded",
            "parking_assist_decoded",
            "bus_length_feet",
            "bus_floor_configuration_type",
            "bus_type",
            "other_bus_info",
            "custom_motorcycle_type",
            "motorcycle_suspension_type",
            "motorcycle_chassis_type",
            "other_motorcycle_info",
            "dynamic_brake_support_dbs",
            "pedestrian_automatic_emergency_braking_paeb",
            "automatic_crash_notification_acn_advanced_automatic_crash_notification_aacn",
            "daytime_running_light_drl",
            "headlamp_light_source",
            "semiautomatic_headlamp_beam_switching",
            "adaptive_driving_beam_adb",
            "rear_cross_traffic_alert",
            "rear_automatic_emergency_braking",
            "blind_spot_intervention_bsi",
            "lane_centering_assistance",
        ]


class InspectionTypeSerializer(serializers.ModelSerializer):
    """
    Serializer for the InspectionType model.
    """

    class Meta:
        model = InspectionType
        fields = [
            "id",
            "name",
            "description"
        ]


class InspectionSerializer(serializers.ModelSerializer):
    """
    Serializer for the Inspection model.
    """

    # Optionally, you can display related data (truck name, inspection type name, etc.)
    truck_name = serializers.CharField(source="truck.name", read_only=True)
    inspection_type_name = serializers.CharField(source="inspection_type.name", read_only=True)

    class Meta:
        model = Inspection
        fields = [
            "id",
            "truck",
            "truck_name",
            "inspection_type",
            "inspection_type_name",
            "date_performed",
            "expiration_date",
            "document"
        ]


class MaintenanceLogSerializer(serializers.ModelSerializer):
    """
    Serializer for the MaintenanceLog model.
    """

    truck_name = serializers.CharField(source="truck.name", read_only=True)

    class Meta:
        model = MaintenanceLog
        fields = [
            "id",
            "truck",
            "truck_name",
            "description",
            "date",
            "cost",
            "document"
        ]


class ExpenseSerializer(serializers.ModelSerializer):
    """
    Serializer for the Expense model.
    """

    truck_name = serializers.CharField(source="truck.name", read_only=True)

    class Meta:
        model = Expense
        fields = [
            "id",
            "truck",
            "truck_name",
            "description",
            "date",
            "amount",
            "document"
        ]


class OutOfServiceHistorySerializer(serializers.ModelSerializer):
    """
    Serializer for the OutOfServiceHistory model.
    """

    truck_name = serializers.CharField(source="truck.name", read_only=True)

    class Meta:
        model = OutOfServiceHistory
        fields = [
            "id",
            "truck",
            "truck_name",
            "reason",
            "date_start",
            "date_end"
        ]
