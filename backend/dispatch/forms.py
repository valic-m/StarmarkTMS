# Path: C:/Users/valic/OneDrive/Documents/TMS/backend/dispatch/forms.py

from django import forms
from backend.dispatch.models import Dispatch  # Updated import path for Dispatch model
from backend.loads.models import Load  # Updated import path for Load model

class DispatchForm(forms.ModelForm):
    class Meta:
        model = Dispatch
        fields = ['load', 'driver', 'truck', 'status', 'pickup_time', 'delivery_time']

    def __init__(self, *args, **kwargs):
        super(DispatchForm, self).__init__(*args, **kwargs)
        # Only show available loads that haven't been dispatched yet (status='Booked')
        self.fields['load'] = forms.ModelChoiceField(
            queryset=Load.objects.filter(status='Booked'),
            widget=forms.Select(attrs={'class': 'form-control'}),
            required=True
        )
        # Add custom CSS classes to the form fields
        self.fields['driver'].widget.attrs.update({'class': 'form-control'})
        self.fields['truck'].widget.attrs.update({'class': 'form-control'})
        self.fields['status'].widget.attrs.update({'class': 'form-control'})
        self.fields['pickup_time'].widget.attrs.update({'class': 'form-control'})
        self.fields['delivery_time'].widget.attrs.update({'class': 'form-control'})
