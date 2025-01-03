# backend/fleet/models.py

from django.db import models
from backend.companies.models import OperationalCompany  # Import OperationalCompany from companies app
from backend.carriers.models import Carrier  # Import Carrier from carriers app
# from backend.vendors.models import Vendor  # For the "Payable To" feature


class Truck(models.Model):
    """
    Represents a truck used in the transportation management system.
    """

    # Basic truck details
    name = models.CharField(max_length=100, help_text="The name or identifier for the truck.")
    license_plate = models.CharField(max_length=20, unique=True, help_text="The license plate of the truck.")
    manufacturer = models.CharField(max_length=100, help_text="The manufacturer of the truck.")
    year = models.PositiveIntegerField(help_text="The year the truck was manufactured.")
    vin = models.CharField(max_length=17, unique=True, help_text="The Vehicle Identification Number (VIN).")
    starting_mileage = models.PositiveIntegerField(help_text="Starting mileage when the truck was purchased.")
    color = models.CharField(max_length=30, blank=True, help_text="The color of the truck.")

    # Ownership and leasing details
    owner = models.ForeignKey(
        OperationalCompany,
        on_delete=models.CASCADE,
        related_name="trucks",
        null=True,  # <--- add this
        blank=True,  # <--- add this
        help_text="The operational company that owns the truck."
    )
    carrier = models.ForeignKey(
        Carrier,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="trucks",
        help_text="The carrier associated with the truck (optional)."
    )
    # payable_to = models.ForeignKey(
    #     Vendor, on_delete=models.SET_NULL, null=True, blank=True,
    #     related_name="trucks", help_text="The entity (vendor) paid from truck profits."
    # )
    is_leased = models.BooleanField(default=False, help_text="Indicates if the truck is leased.")
    leased_to = models.CharField(max_length=255, blank=True, help_text="Name of the company the truck is leased to.")
    sub_leased = models.BooleanField(default=False, help_text="Indicates if the truck is sub-leased.")
    owner_operated = models.BooleanField(default=True, help_text="Indicates if the truck is owner-operated.")

    # Insurance and licensing
    annual_insurance_cost = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, help_text="Annual insurance cost.")
    insurance_renewal_date = models.DateField(blank=True, null=True, help_text="Insurance renewal date.")
    annual_plate_cost = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, help_text="Annual plate cost.")

    # Equipment and features
    dashcam_installed = models.BooleanField(default=False, help_text="Indicates if a dashcam is installed.")
    apu_installed = models.BooleanField(default=False, help_text="Indicates if an APU is installed.")
    fuel_card = models.CharField(max_length=50, blank=True, help_text="Assigned fuel card.")

    # Integration details
    integration_id = models.CharField(
        max_length=50,
        blank=True,
        null=True,
        unique=True,
        help_text="Unique integration ID to link the truck to Samsara or other telematics systems."
    )

    # Status
    is_out_of_service = models.BooleanField(default=False, help_text="Indicates if the truck is out of service.")
    out_of_service_reason = models.TextField(blank=True, help_text="Reason for being out of service.")

    # ===========================================
    # Fields from VIN decoding (all optional)
    # ===========================================
    suggested_vin = models.CharField(
        max_length=20, blank=True, null=True,
        help_text="Suggested VIN from decode."
    )
    error_code = models.CharField(
        max_length=10, blank=True, null=True,
        help_text="Error code from decoding."
    )
    possible_values = models.TextField(
        blank=True, null=True,
        help_text="Possible values from decoding."
    )
    additional_error_text = models.TextField(
        blank=True, null=True,
        help_text="Additional error text from decoding."
    )
    error_text = models.TextField(
        blank=True, null=True,
        help_text="Error text from decoding."
    )
    vehicle_descriptor = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Vehicle descriptor from decoding."
    )
    destination_market = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Destination market from decoding."
    )
    decoded_make = models.CharField(
        max_length=100, blank=True, null=True,
        help_text="Make from decoding."
    )
    manufacturer_name = models.CharField(
        max_length=100, blank=True, null=True,
        help_text="Manufacturer name from decoding."
    )
    decoded_model = models.CharField(
        max_length=100, blank=True, null=True,
        help_text="Model from decoding."
    )
    decoded_model_year = models.CharField(
        max_length=4, blank=True, null=True,
        help_text="Model year from decoding."
    )
    plant_city = models.CharField(
        max_length=100, blank=True, null=True,
        help_text="Plant city from decoding."
    )
    series = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Series from decoding."
    )
    trim = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Trim from decoding."
    )
    vehicle_type = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Vehicle type from decoding."
    )
    plant_country = models.CharField(
        max_length=100, blank=True, null=True,
        help_text="Plant country from decoding."
    )
    plant_company_name = models.CharField(
        max_length=100, blank=True, null=True,
        help_text="Plant company name from decoding."
    )
    plant_state = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Plant state from decoding."
    )
    trim2 = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Second trim from decoding."
    )
    series2 = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Second series from decoding."
    )
    note = models.TextField(
        blank=True, null=True,
        help_text="Note from decoding."
    )
    base_price = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Base price from decoding."
    )
    non_land_use = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Non-land use info from decoding."
    )
    body_class = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Body class from decoding."
    )
    doors = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Doors info from decoding."
    )
    windows = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Windows info from decoding."
    )
    wheel_base_type = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Wheel base type from decoding."
    )
    track_width_inches = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Track width (inches) from decoding."
    )
    gross_vehicle_weight_rating_from = models.CharField(
        max_length=100, blank=True, null=True,
        help_text="Gross vehicle weight rating (from) from decoding."
    )
    bed_length_inches = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Bed length (inches) from decoding."
    )
    curb_weight_pounds = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Curb weight (pounds) from decoding."
    )
    wheel_base_inches_from = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Wheel base (inches) (from) from decoding."
    )
    wheel_base_inches_to = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Wheel base (inches) (to) from decoding."
    )
    gross_combination_weight_rating_from = models.CharField(
        max_length=100, blank=True, null=True,
        help_text="Gross combination weight rating (from) from decoding."
    )
    gross_combination_weight_rating_to = models.CharField(
        max_length=100, blank=True, null=True,
        help_text="Gross combination weight rating (to) from decoding."
    )
    gross_vehicle_weight_rating_to = models.CharField(
        max_length=100, blank=True, null=True,
        help_text="Gross vehicle weight rating (to) from decoding."
    )
    bed_type = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Bed type from decoding."
    )
    cab_type_decoded = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Cab type from decoding."
    )
    trailer_type_connection = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Trailer type connection from decoding."
    )
    trailer_body_type = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Trailer body type from decoding."
    )
    trailer_length_feet = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Trailer length (feet) from decoding."
    )
    other_trailer_info = models.TextField(
        blank=True, null=True,
        help_text="Other trailer info from decoding."
    )
    number_of_wheels = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Number of wheels from decoding."
    )
    wheel_size_front_inches = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Wheel size front (inches) from decoding."
    )
    wheel_size_rear_inches = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Wheel size rear (inches) from decoding."
    )
    entertainment_system = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Entertainment system info from decoding."
    )
    steering_location = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Steering location from decoding."
    )
    number_of_seats = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Number of seats from decoding."
    )
    number_of_seat_rows = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Number of seat rows from decoding."
    )
    transmission_style = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Transmission style from decoding."
    )
    transmission_speeds = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Transmission speeds from decoding."
    )
    drive_type_decoded = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Drive type from decoding."
    )
    axles = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Axles from decoding."
    )
    axle_configuration = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Axle configuration from decoding."
    )
    brake_system_type = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Brake system type from decoding."
    )
    brake_system_description = models.TextField(
        blank=True, null=True,
        help_text="Brake system description from decoding."
    )
    other_battery_info = models.TextField(
        blank=True, null=True,
        help_text="Other battery info from decoding."
    )
    battery_type = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Battery type from decoding."
    )
    number_of_battery_cells_per_module = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Number of battery cells per module from decoding."
    )
    battery_current_amps_from = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Battery current (amps) (from) from decoding."
    )
    battery_voltage_volts_from = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Battery voltage (volts) (from) from decoding."
    )
    battery_energy_kwh_from = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Battery energy (kWh) (from) from decoding."
    )
    ev_drive_unit = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="EV drive unit from decoding."
    )
    battery_current_amps_to = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Battery current (amps) (to) from decoding."
    )
    battery_voltage_volts_to = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Battery voltage (volts) (to) from decoding."
    )
    battery_energy_kwh_to = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Battery energy (kWh) (to) from decoding."
    )
    number_of_battery_modules_per_pack = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Number of battery modules per pack from decoding."
    )
    number_of_battery_packs_per_vehicle = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Number of battery packs per vehicle from decoding."
    )
    charger_level = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Charger level from decoding."
    )
    charger_power_kw = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Charger power (kW) from decoding."
    )
    engine_number_of_cylinders_decoded = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Engine number of cylinders from decoding."
    )
    displacement_cc = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Displacement (cc) from decoding."
    )
    displacement_ci = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Displacement (ci) from decoding."
    )
    displacement_l = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Displacement (l) from decoding."
    )
    engine_stroke_cycles = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Engine stroke cycles from decoding."
    )
    engine_model_decoded = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Engine model from decoding."
    )
    engine_power_kw = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Engine power (kW) from decoding."
    )
    fuel_type_primary_decoded = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Fuel type (primary) from decoding."
    )
    valve_train_design = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Valve train design from decoding."
    )
    engine_configuration_decoded = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Engine configuration from decoding."
    )
    fuel_type_secondary = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Fuel type (secondary) from decoding."
    )
    fuel_delivery_fuel_injection_type = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Fuel delivery / Fuel injection type from decoding."
    )
    engine_brake_hp_from = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Engine brake (hp) from (decoding)."
    )
    cooling_type = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Cooling type from decoding."
    )
    engine_brake_hp_to = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Engine brake (hp) to (decoding)."
    )
    electrification_level = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Electrification level from decoding."
    )
    other_engine_info = models.TextField(
        blank=True, null=True,
        help_text="Other engine info from decoding."
    )
    turbo = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Turbo info from decoding."
    )
    top_speed_mph = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Top speed (mph) from decoding."
    )
    engine_manufacturer_decoded = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Engine manufacturer from decoding."
    )
    pretensioner = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Pretensioner from decoding."
    )
    seat_belt_type = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Seat belt type from decoding."
    )
    other_restraint_system_info = models.TextField(
        blank=True, null=True,
        help_text="Other restraint system info from decoding."
    )
    curtain_air_bag_locations = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Curtain air bag locations from decoding."
    )
    seat_cushion_air_bag_locations = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Seat cushion air bag locations from decoding."
    )
    front_air_bag_locations = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Front air bag locations from decoding."
    )
    knee_air_bag_locations = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Knee air bag locations from decoding."
    )
    side_air_bag_locations = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Side air bag locations from decoding."
    )
    anti_lock_braking_system_abs = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Anti-lock braking system (ABS) from decoding."
    )
    electronic_stability_control_esc = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Electronic stability control (ESC) from decoding."
    )
    traction_control_decoded = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Traction control from decoding."
    )
    tire_pressure_monitoring_system_tpms_type = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Tire pressure monitoring system (TPMS) type from decoding."
    )
    active_safety_system_note = models.TextField(
        blank=True, null=True,
        help_text="Active safety system note from decoding."
    )
    auto_reverse_system_for_windows_and_sunroofs = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Auto-reverse system for windows/sunroofs from decoding."
    )
    automatic_pedestrian_alerting_sound_for_hybrid_and_ev_only = models.CharField(
        max_length=100, blank=True, null=True,
        help_text="Pedestrian alerting sound (Hybrid/EV) from decoding."
    )
    event_data_recorder_edr = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Event data recorder (EDR) from decoding."
    )
    keyless_ignition = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Keyless ignition from decoding."
    )
    sae_automation_level_from = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="SAE automation level (from) from decoding."
    )
    sae_automation_level_to = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="SAE automation level (to) from decoding."
    )
    adaptive_cruise_control_acc = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Adaptive cruise control (ACC) from decoding."
    )
    crash_imminent_braking_cib = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Crash imminent braking (CIB) from decoding."
    )
    blind_spot_warning_bsw = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Blind spot warning (BSW) from decoding."
    )
    forward_collision_warning_fcw = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Forward collision warning (FCW) from decoding."
    )
    lane_departure_warning_ldw = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Lane departure warning (LDW) from decoding."
    )
    lane_keeping_assistance_lka = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Lane keeping assistance (LKA) from decoding."
    )
    backup_camera_decoded = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Backup camera from decoding."
    )
    parking_assist_decoded = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Parking assist from decoding."
    )
    bus_length_feet = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Bus length (feet) from decoding."
    )
    bus_floor_configuration_type = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Bus floor configuration from decoding."
    )
    bus_type = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Bus type from decoding."
    )
    other_bus_info = models.TextField(
        blank=True, null=True,
        help_text="Other bus info from decoding."
    )
    custom_motorcycle_type = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Custom motorcycle type from decoding."
    )
    motorcycle_suspension_type = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Motorcycle suspension type from decoding."
    )
    motorcycle_chassis_type = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Motorcycle chassis type from decoding."
    )
    other_motorcycle_info = models.TextField(
        blank=True, null=True,
        help_text="Other motorcycle info from decoding."
    )
    dynamic_brake_support_dbs = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Dynamic brake support (DBS) from decoding."
    )
    pedestrian_automatic_emergency_braking_paeb = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Pedestrian automatic emergency braking (PAEB) from decoding."
    )
    automatic_crash_notification_acn_advanced_automatic_crash_notification_aacn = models.CharField(
        max_length=100, blank=True, null=True,
        help_text="ACN/AACN from decoding."
    )
    daytime_running_light_drl = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Daytime running light (DRL) from decoding."
    )
    headlamp_light_source = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Headlamp light source from decoding."
    )
    semiautomatic_headlamp_beam_switching = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Semiautomatic headlamp beam switching from decoding."
    )
    adaptive_driving_beam_adb = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Adaptive driving beam (ADB) from decoding."
    )
    rear_cross_traffic_alert = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Rear cross traffic alert from decoding."
    )
    rear_automatic_emergency_braking = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Rear automatic emergency braking from decoding."
    )
    blind_spot_intervention_bsi = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Blind spot intervention (BSI) from decoding."
    )
    lane_centering_assistance = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="Lane centering assistance from decoding."
    )

    def __str__(self):
        return f"{self.name} ({self.license_plate})"


class InspectionType(models.Model):
    """
    Represents types of inspections (e.g., Annual, DOT, Emissions).
    """
    name = models.CharField(max_length=100, unique=True, help_text="Type of inspection.")
    description = models.TextField(blank=True, help_text="Details about the inspection type.")

    def __str__(self):
        return self.name


class Inspection(models.Model):
    """
    Represents an inspection record for a truck.
    """
    truck = models.ForeignKey(
        Truck,
        on_delete=models.CASCADE,
        related_name="inspections",
        help_text="The truck being inspected."
    )
    inspection_type = models.ForeignKey(
        InspectionType,
        on_delete=models.CASCADE,
        related_name="inspections",
        help_text="Type of inspection."
    )
    date_performed = models.DateField(help_text="Date when the inspection was performed.")
    expiration_date = models.DateField(help_text="Expiration date of the inspection.")
    document = models.FileField(
        upload_to="truck_inspections/",
        blank=True,
        help_text="Attached inspection document."
    )

    def __str__(self):
        return f"{self.inspection_type.name} - {self.truck.name} ({self.date_performed})"


class MaintenanceLog(models.Model):
    """
    Represents a maintenance log for a truck.
    """
    truck = models.ForeignKey(
        Truck,
        on_delete=models.CASCADE,
        related_name="maintenance_logs",
        help_text="The truck being maintained."
    )
    description = models.TextField(help_text="Description of the maintenance activity.")
    date = models.DateField(help_text="Date of maintenance.")
    cost = models.DecimalField(max_digits=10, decimal_places=2, help_text="Cost of the maintenance.")
    document = models.FileField(
        upload_to="truck_maintenance/",
        blank=True,
        help_text="Attached maintenance receipt or document."
    )

    def __str__(self):
        return f"Maintenance on {self.truck.name} ({self.date})"


class Expense(models.Model):
    """
    Represents an expense related to a truck.
    """
    truck = models.ForeignKey(
        Truck,
        on_delete=models.CASCADE,
        related_name="expenses",
        help_text="The truck associated with the expense."
    )
    description = models.TextField(help_text="Description of the expense.")
    date = models.DateField(help_text="Date of the expense.")
    amount = models.DecimalField(max_digits=10, decimal_places=2, help_text="Amount of the expense.")
    document = models.FileField(
        upload_to="truck_expenses/",
        blank=True,
        help_text="Attached receipt or document."
    )

    def __str__(self):
        return f"Expense for {self.truck.name} - {self.amount} ({self.date})"


class OutOfServiceHistory(models.Model):
    """
    Represents the history of out-of-service events for a truck.
    """
    truck = models.ForeignKey(
        Truck,
        on_delete=models.CASCADE,
        related_name="out_of_service_history",
        help_text="The truck taken out of service."
    )
    reason = models.TextField(help_text="Reason for taking the truck out of service.")
    date_start = models.DateField(help_text="Date when the truck was taken out of service.")
    date_end = models.DateField(blank=True, null=True, help_text="Date when the truck was put back in service.")

    def __str__(self):
        return f"Out of Service: {self.truck.name} ({self.date_start} - {self.date_end or 'Current'})"
