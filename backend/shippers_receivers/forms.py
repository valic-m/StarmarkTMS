# Path: C:/Users/valic/OneDrive/Documents/TMS/backend/shippers_receivers/forms.py

from django import forms
from backend.shippers_receivers.models import ShipperReceiverCompany  # Ensure correct import for the model

class CompanyForm(forms.ModelForm):
    class Meta:
        model = ShipperReceiverCompany  # Updated to reference ShipperReceiverCompany
        fields = [
            'company_name', 'contact_person', 'phone_number', 'email', 'address',
            'shipping_hours', 'shipping_manager_name', 'shipping_manager_phone', 'shipping_manager_email',
            'rating', 'load_time', 'comments', 'directions', 'do_not_load', #'is_shipper', #'is_receiver'
        ]

    def __init__(self, *args, **kwargs):
        super(CompanyForm, self).__init__(*args, **kwargs)

        # Add custom classes to form fields
        self.fields['company_name'].widget.attrs.update({'class': 'form-control'})
        self.fields['contact_person'].widget.attrs.update({'class': 'form-control'})
        self.fields['phone_number'].widget.attrs.update({'class': 'form-control'})
        self.fields['email'].widget.attrs.update({'class': 'form-control'})
        self.fields['address'].widget.attrs.update({'class': 'form-control'})
        self.fields['shipping_hours'].widget.attrs.update({'class': 'form-control'})
        self.fields['shipping_manager_name'].widget.attrs.update({'class': 'form-control'})
        self.fields['shipping_manager_phone'].widget.attrs.update({'class': 'form-control'})
        self.fields['shipping_manager_email'].widget.attrs.update({'class': 'form-control'})
        self.fields['rating'].widget.attrs.update({'class': 'form-control'})
        self.fields['load_time'].widget.attrs.update({'class': 'form-control'})
        self.fields['comments'].widget.attrs.update({'class': 'form-control'})
        self.fields['directions'].widget.attrs.update({'class': 'form-control'})
        self.fields['do_not_load'].widget.attrs.update({'class': 'form-check-input'})
        #self.fields['is_shipper'].widget.attrs.update({'class': 'form-check-input'})
        #self.fields['is_receiver'].widget.attrs.update({'class': 'form-check-input'})
