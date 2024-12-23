from django import forms
from backend.loads.models import Load, Pickup, Delivery
from backend.customers.models import Customer
from backend.shippers_receivers.models import Location
from django.forms import inlineformset_factory


class LoadForm(forms.ModelForm):
    class Meta:
        model = Load
        fields = [
            'customer', 'reference_number', 'rate',
            'trailer_type', 'load_type', 'pickup_location', 'dropoff_location',
            'feet_required', 'pallet_count', 'pallet_dimensions', 'weight',
            'commodity', 'booked_by', 'attachment'
        ]

        widgets = {
            'customer': forms.Select(attrs={'class': 'form-control'}),  # Dropdown for customer selection
            'reference_number': forms.TextInput(attrs={'class': 'form-control'}),
            'rate': forms.NumberInput(attrs={'class': 'form-control'}),
            'trailer_type': forms.Select(attrs={'class': 'form-control'}),
            'load_type': forms.Select(attrs={'class': 'form-control'}),
            'pickup_location': forms.Select(attrs={'class': 'form-control'}),  # Updated to use Location
            'dropoff_location': forms.Select(attrs={'class': 'form-control'}),  # Updated to use Location
            'feet_required': forms.NumberInput(attrs={'class': 'form-control'}),
            'pallet_count': forms.NumberInput(attrs={'class': 'form-control'}),
            'pallet_dimensions': forms.TextInput(attrs={'class': 'form-control'}),
            'weight': forms.NumberInput(attrs={'class': 'form-control'}),
            'commodity': forms.TextInput(attrs={'class': 'form-control'}),
            'booked_by': forms.Select(attrs={'class': 'form-control'}),
            'attachment': forms.FileInput(attrs={'class': 'form-control'}),
        }


# Pickup Form
class PickupForm(forms.ModelForm):
    class Meta:
        model = Pickup
        fields = ['pickup_location', 'pickup_number', 'pickup_date']

        widgets = {
            'pickup_location': forms.Select(attrs={'class': 'form-control'}),  # Updated to use Location
            'pickup_number': forms.NumberInput(attrs={'class': 'form-control'}),
            'pickup_date': forms.DateTimeInput(attrs={'class': 'form-control', 'type': 'datetime-local'}),
        }


# Delivery Form
class DeliveryForm(forms.ModelForm):
    class Meta:
        model = Delivery
        fields = ['delivery_location', 'delivery_number', 'delivery_date']

        widgets = {
            'delivery_location': forms.Select(attrs={'class': 'form-control'}),  # Updated to use Location
            'delivery_number': forms.NumberInput(attrs={'class': 'form-control'}),
            'delivery_date': forms.DateTimeInput(attrs={'class': 'form-control', 'type': 'datetime-local'}),
        }


# Create formsets for multiple pickups and deliveries
PickupFormSet = inlineformset_factory(Load, Pickup, form=PickupForm, extra=1, can_delete=True)
DeliveryFormSet = inlineformset_factory(Load, Delivery, form=DeliveryForm, extra=1, can_delete=True)
