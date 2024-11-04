# Path: samsara/forms.py

from django import forms
from .models import Samsara

class SamsaraForm(forms.ModelForm):
    class Meta:
        model = Samsara
        fields = '__all__'  # Include all fields in the form
