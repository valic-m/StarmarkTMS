from django import forms
from .models import Carrier

class CarrierForm(forms.ModelForm):
    """
    Form for creating or editing a Carrier.
    """
    class Meta:
        model = Carrier
        fields = ['name', 'phone', 'email', 'address', 'services_offered', 'active']  # Include all fields from the Carrier model
    
    def __init__(self, *args, **kwargs):
        """
        Initialize the form and customize the widgets.
        """
        super(CarrierForm, self).__init__(*args, **kwargs)
        # Add custom CSS classes to form fields
        self.fields['name'].widget.attrs.update({'class': 'form-control', 'placeholder': 'Enter carrier name'})
        self.fields['phone'].widget.attrs.update({'class': 'form-control', 'placeholder': 'Enter phone number'})
        self.fields['email'].widget.attrs.update({'class': 'form-control', 'placeholder': 'Enter email address'})
        self.fields['address'].widget.attrs.update({'class': 'form-control', 'placeholder': 'Enter address'})
        self.fields['services_offered'].widget.attrs.update({'class': 'form-control', 'placeholder': 'Describe services offered'})
        self.fields['active'].widget.attrs.update({'class': 'form-check-input'})  # For checkbox inputs like "active"
