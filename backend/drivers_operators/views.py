# Path: C:/Users/valic/OneDrive/Documents/TMS/backend/drivers_operators/views.py

from django.shortcuts import render, redirect, get_object_or_404
from backend.drivers_operators.forms import DriverForm  # Updated import path for forms
from backend.drivers_operators.models import Driver  # Updated import path for models
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required

# Home view
def home(request):
    return render(request, 'drivers_operators/home.html')  # Updated template path

# Drivers list view
def drivers_list(request):
    drivers = Driver.objects.all()  # Query all drivers from the database
    return render(request, 'drivers_operators/drivers.html', {'drivers': drivers})  # Updated template path

# Add driver view
def add_driver(request):
    if request.method == 'POST':
        form = DriverForm(request.POST)
        if form.is_valid():
            form.save()  # Save the driver to the database
            return redirect('drivers_list')
    else:
        form = DriverForm()
    return render(request, 'drivers_operators/add_driver.html', {'form': form})  # Updated template path

# Edit driver view
def edit_driver(request, driver_id):
    driver = get_object_or_404(Driver, pk=driver_id)
    
    if request.method == 'POST':
        form = DriverForm(request.POST, instance=driver)
        if form.is_valid():
            form.save()
            return redirect('drivers_list')
    else:
        form = DriverForm(instance=driver)
    return render(request, 'drivers_operators/edit_driver.html', {'form': form, 'driver': driver})  # Updated template path

# Driver dashboard view
@login_required
def driver_dashboard(request):
    driver = request.user.driver_profile if hasattr(request.user, 'driver_profile') else None
    return render(request, 'drivers_operators/driver_dashboard.html', {'driver': driver})  # Updated template path

# Signup view for new users
def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = UserCreationForm()
    return render(request, 'registration/signup.html', {'form': form})  # Updated template path

# Drivers and operators list view
def driver_operator_list(request):
    return render(request, 'drivers_operators/driver_operator_list.html')  # Updated template path
