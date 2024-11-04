from django import forms
from backend.companies.models import OperationalCompany  # Ensure you're importing the correct model

class CompanyForm(forms.ModelForm):
    """Form for creating or editing a company."""
    
    class Meta:
        model = OperationalCompany  # Change this to OperationalCompany
        fields = '__all__'  # You can specify the fields instead of using all fields if needed
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Company Name'}),
            'address': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Address'}),
            'city': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'City'}),
            'state': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'State'}),
            'zip_code': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Zip Code'}),
            'phone_number': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Phone Number'}),
            'fax_number': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Fax Number'}),
            'email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Email'}),
            'email_password': forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Email Password'}),
            'federal_id': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Federal ID'}),
            'mc_number': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'MC Number'}),
            'bank_name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Bank Name'}),
            'bank_address': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Bank Address'}),
            'bank_city': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Bank City'}),
            'bank_phone': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Bank Phone'}),
            'bank_fraction_number': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Bank Fraction Number'}),
            'bank_account_number': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Bank Account Number'}),
            'bank_routing_number': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Bank Routing Number'}),
            'driver_instructions': forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'Driver Instructions'}),
            'brokerage_notes': forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'Brokerage Notes'}),
            'logo': forms.FileInput(attrs={'class': 'form-control'}),
        }
        
    def __init__(self, *args, **kwargs):
        super(CompanyForm, self).__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].widget.attrs.update({'class': 'form-control'})
