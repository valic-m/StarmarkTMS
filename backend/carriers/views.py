from django.shortcuts import render, get_object_or_404, redirect
from .models import Carrier  # Assuming you have a Carrier model
from .forms import CarrierForm  # Assuming you have a CarrierForm for creating or editing carriers

def carrier_list(request):
    """View to list all carriers"""
    carriers = Carrier.objects.all()  # Fetch all carriers from the database
    return render(request, 'carriers/carrier_list.html', {'carriers': carriers})  # Render a template to display the list

def carrier_detail(request, carrier_id):
    """View to show details of a specific carrier"""
    carrier = get_object_or_404(Carrier, pk=carrier_id)  # Fetch the carrier or show 404 if not found
    return render(request, 'carriers/carrier_detail.html', {'carrier': carrier})  # Render a template to display carrier details

def create_carrier(request):
    """View to create a new carrier"""
    if request.method == 'POST':
        form = CarrierForm(request.POST)  # Populate form with submitted data
        if form.is_valid():  # Validate the form
            form.save()  # Save the new carrier if valid
            return redirect('carrier_list')  # Redirect to the carrier list after successful creation
    else:
        form = CarrierForm()  # Create an empty form for GET requests
    return render(request, 'carriers/carrier_form.html', {'form': form})  # Render the form template for creating a carrier
