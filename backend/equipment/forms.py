# Path: C:/Users/valic/OneDrive/Documents/TMS/backend/equipment/forms.py

from django import forms
from backend.equipment.models import Truck, Trailer  # Updated import paths

class TruckForm(forms.ModelForm):
    class Meta:
        model = Truck
        fields = [
            'name', 
            'license_plate', 
            'manufacturer', 
            'year', 
            'vin', 
            'owner', 
            'carrier', 
            'inspection_due', 
            'registration_exp', 
            'insurance_exp', 
            'fuel_type', 
            'tire_size', 
            'length_ft', 
            'axles', 
            'color', 
            'gross_weight', 
            'unladen_weight', 
            'acquired_date', 
            'value', 
            'downpayment', 
            'sold_date', 
            'sold_value', 
            'samsara_device_id'
        ]
        labels = {
            'name': 'Enter Truck Name',
            'license_plate': 'Enter License Plate',
            'manufacturer': 'Enter Manufacturer',
            'year': 'Enter Year of Manufacture',
            'vin': 'Enter VIN Number',
            'owner': 'Select Owner Company (from available companies)',
            'carrier': 'Select Carrier (optional)',
            'inspection_due': 'Next Inspection Due Date',
            'registration_exp': 'Registration Expiry Date',
            'insurance_exp': 'Insurance Expiry Date',
            'fuel_type': 'Fuel Type',
            'tire_size': 'Tire Size',
            'length_ft': 'Truck Length (in ft)',
            'axles': 'Number of Axles',
            'color': 'Color',
            'gross_weight': 'Gross Weight (in lbs)',
            'unladen_weight': 'Unladen Weight (in lbs)',
            'acquired_date': 'Acquired Date',
            'value': 'Truck Value',
            'downpayment': 'Downpayment',
            'sold_date': 'Sold Date',
            'sold_value': 'Sold Value',
            'samsara_device_id': 'Samsara Device ID',
        }

        widgets = {
            'name': forms.TextInput(attrs={'placeholder': 'Enter Truck Name'}),
            'license_plate': forms.TextInput(attrs={'placeholder': 'Enter License Plate'}),
            'manufacturer': forms.TextInput(attrs={'placeholder': 'Enter Manufacturer'}),
            'year': forms.NumberInput(attrs={'placeholder': 'Enter Year'}),
            'vin': forms.TextInput(attrs={'placeholder': 'Enter VIN'}),
            'fuel_type': forms.TextInput(attrs={'placeholder': 'Enter Fuel Type'}),
            'tire_size': forms.TextInput(attrs={'placeholder': 'Enter Tire Size'}),
            'length_ft': forms.NumberInput(attrs={'placeholder': 'Enter Length in Feet'}),
            'axles': forms.NumberInput(attrs={'placeholder': 'Enter Number of Axles'}),
            'color': forms.TextInput(attrs={'placeholder': 'Enter Truck Color'}),
            'gross_weight': forms.NumberInput(attrs={'placeholder': 'Enter Gross Weight in lbs'}),
            'unladen_weight': forms.NumberInput(attrs={'placeholder': 'Enter Unladen Weight in lbs'}),
            'samsara_device_id': forms.TextInput(attrs={'placeholder': 'Enter Samsara Device ID'}),
        }

class TrailerForm(forms.ModelForm):
    class Meta:
        model = Trailer
        fields = ['name', 'license_plate', 'manufacturer', 'year']
