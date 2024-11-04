from django import forms
from .models import Customer

class CustomerForm(forms.ModelForm):
    class Meta:
        model = Customer
        fields = [
            'name', 'mc_number', 'scac', 'address_street', 'address_number', 'city',
            'state', 'zip_code', 'term_pay', 'tax_id', 'is_active', 'factoring', 
            'do_not_use', 'notes', 'contact_name', 'phone_number', 
            'cell_number', 'email', 'website', 'credit_limit', 
            'accounts_payable_contact', 'accounts_payable_phone', 
            'accounts_payable_email', 'accounts_payable_address', 
            'accounts_payable_city', 'accounts_payable_state', 
            'accounts_payable_zip', 'agent_name', 'agent_phone', 
            'agent_email'
        ]
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Customer Name'}),
            'mc_number': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'MC Number'}),
            'scac': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'SCAC'}),
            'address_street': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Street Address'}),
            'address_number': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Suite, Bldg, etc.'}),
            'city': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'City'}),
            'state': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'State'}),
            'zip_code': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Zip Code'}),
            'term_pay': forms.Select(attrs={'class': 'form-control'}, choices=[('Net 30', 'Net 30'), ('Net 15', 'Net 15')]),
            'tax_id': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Tax ID'}),
            'is_active': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
            'factoring': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
            'do_not_use': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
            'notes': forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'Notes'}),
            'contact_name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Main Contact Name'}),
            'phone_number': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Main Phone'}),
            'cell_number': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Cell Phone'}),
            'email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Email'}),
            'website': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Website'}),
            'credit_limit': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Credit Limit'}),
            'accounts_payable_contact': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Accounts Payable Contact'}),
            'accounts_payable_phone': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Accounts Payable Phone'}),
            'accounts_payable_email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Accounts Payable Email'}),
            'accounts_payable_address': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Accounts Payable Address'}),
            'accounts_payable_city': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'City'}),
            'accounts_payable_state': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'State'}),
            'accounts_payable_zip': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Zip Code'}),
            'agent_name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Agent Name'}),
            'agent_phone': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Agent Phone'}),
            'agent_email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Agent Email'}),
        }

    def __init__(self, *args, **kwargs):
        super(CustomerForm, self).__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            if isinstance(field.widget, forms.CheckboxInput):
                field.widget.attrs['class'] = 'form-check-input'
            else:
                field.widget.attrs['class'] = 'form-control'
                field.widget.attrs['placeholder'] = f"Enter {field.label.lower()}"

    # Validation for MC Number
    def clean_mc_number(self):
        mc_number = self.cleaned_data.get('mc_number')
        if not mc_number:
            raise forms.ValidationError("MC Number is required.")
        if len(mc_number) not in [6, 7]:
            raise forms.ValidationError("MC Number must be 6 or 7 digits long.")
        return mc_number

    # Validation for Phone Number
    def clean_phone_number(self):
        phone_number = self.cleaned_data.get('phone_number')
        if not phone_number.isdigit():
            raise forms.ValidationError("Phone number must contain only digits.")
        if len(phone_number) < 10:
            raise forms.ValidationError("Phone number must be at least 10 digits long.")
        return phone_number

    # Validation for ZIP Code
    def clean_zip_code(self):
        zip_code = self.cleaned_data.get('zip_code')
        if not zip_code.isdigit() or len(zip_code) not in [5, 9]:
            raise forms.ValidationError("ZIP code must be 5 or 9 digits long.")
        return zip_code
