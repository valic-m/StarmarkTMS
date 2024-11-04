# Path: C:/Users/valic/OneDrive/Documents/TMS/backend/drivers_operators/forms.py

from django import forms
from django.contrib.auth.models import User
from backend.drivers_operators.models import Driver  # Updated import path for Driver model

class DriverForm(forms.ModelForm):
    username = forms.CharField(max_length=150)
    email = forms.EmailField()

    class Meta:
        model = Driver
        fields = [
            'full_name', 'print_check_as', 'is_employee', 'ssn', 'ein', 'pay_type', 'pay_rate',
            'assigned_truck', 'assigned_trailer', 'phone_number'
        ]

    def save(self, commit=True):
        # Create a new user
        user = User.objects.create_user(
            username=self.cleaned_data['username'],
            email=self.cleaned_data['email'],
            password=self.cleaned_data['password']  # Assuming password is passed in the form
        )
        # Save the driver with the associated user
        driver = super().save(commit=False)
        driver.user = user
        if commit:
            driver.save()
        return driver

    def __init__(self, *args, **kwargs):
        super(DriverForm, self).__init__(*args, **kwargs)
        # Custom CSS classes for form fields
        self.fields['full_name'].widget.attrs.update({'class': 'form-control'})
        self.fields['print_check_as'].widget.attrs.update({'class': 'form-control'})
        self.fields['is_employee'].widget.attrs.update({'class': 'form-control'})
        self.fields['ssn'].widget.attrs.update({'class': 'form-control'})
        self.fields['ein'].widget.attrs.update({'class': 'form-control'})
        self.fields['pay_type'].widget.attrs.update({'class': 'form-control'})
        self.fields['pay_rate'].widget.attrs.update({'class': 'form-control'})
        self.fields['assigned_truck'].widget.attrs.update({'class': 'form-control'})
        self.fields['assigned_trailer'].widget.attrs.update({'class': 'form-control'})
        self.fields['phone_number'].widget.attrs.update({'class': 'form-control'})
        self.fields['username'].widget.attrs.update({'class': 'form-control'})
        self.fields['email'].widget.attrs.update({'class': 'form-control'})
