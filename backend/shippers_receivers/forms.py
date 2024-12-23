from django import forms
from .models import Location, Customer, Contact, LocationPhoto, Category


class LocationForm(forms.ModelForm):
    class Meta:
        model = Location
        fields = '__all__'


class CustomerForm(forms.ModelForm):
    class Meta:
        model = Customer
        fields = '__all__'


class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = '__all__'


class LocationPhotoForm(forms.ModelForm):
    class Meta:
        model = LocationPhoto
        fields = '__all__'


class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = '__all__'
