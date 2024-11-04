# Path: C:/Users/valic/OneDrive/Documents/TMS/backend/equipment/views.py

import logging
from django.shortcuts import render, get_object_or_404, redirect
from django.conf import settings
from backend.equipment.models import Truck, Trailer  # Updated import paths for models
from backend.samsara.services import get_recent_gps_data  # Updated import path for the Samsara service
from django.db.models import Q
from django.contrib import messages
from rest_framework.decorators import api_view
from rest_framework.response import Response
from backend.equipment.forms import TruckForm, TrailerForm  # Updated import paths for forms
from backend.equipment.serializers import TruckSerializer  # Updated import path for serializers

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# View to display specific truck details and GPS data from the Samsara model
def specific_truck_view(request, truck_id):
    truck = get_object_or_404(Truck, pk=truck_id)

    # Get recent GPS data from the Samsara model or fetch new data if outdated
    gps_data = get_recent_gps_data(truck.samsara_device_id)

    # Debugging to print the fetched GPS data to the logs
    if gps_data:
        logging.debug(f"Fetched GPS Data: {gps_data}")
    else:
        logging.debug("No GPS data fetched for this vehicle.")

    return render(request, 'equipment/truck_detail.html', {
        'truck': truck,
        'gps_data': gps_data
    })

# List all trucks and trailers
def equipment_list(request):
    trucks = Truck.objects.all()
    trailers = Trailer.objects.all()
    return render(request, 'equipment/equipment_list.html', {'trucks': trucks, 'trailers': trailers})

# Add new truck
def add_truck(request):
    if request.method == 'POST':
        form = TruckForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('trucks_list')  # Redirect to the truck list page
    else:
        form = TruckForm()

    return render(request, 'equipment/add_truck.html', {'form': form})

# Truck list view (if required for redirect)
def trucks_list(request):
    trucks = Truck.objects.all()
    return render(request, 'equipment/trucks_list.html', {'trucks': trucks})

# Add new trailer
def add_trailer(request):
    if request.method == 'POST':
        form = TrailerForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('trailers_list')
    else:
        form = TrailerForm()
    return render(request, 'equipment/add_trailer.html', {'form': form})

# Edit existing truck
def edit_truck(request, truck_id):
    truck = get_object_or_404(Truck, pk=truck_id)
    if request.method == 'POST':
        form = TruckForm(request.POST, instance=truck)
        if form.is_valid():
            form.save()
            return redirect('trucks_list')
    else:
        form = TruckForm(instance=truck)
    return render(request, 'equipment/edit_truck.html', {'form': form, 'truck': truck})

# Edit existing trailer
def edit_trailer(request, trailer_id):
    trailer = get_object_or_404(Trailer, pk=trailer_id)
    if request.method == 'POST':
        form = TrailerForm(request.POST, instance=trailer)
        if form.is_valid():
            form.save()
            return redirect('trailers_list')
    else:
        form = TrailerForm(instance=trailer)
    return render(request, 'equipment/edit_trailer.html', {'form': form, 'trailer': trailer})

# List trucks with search functionality
def trucks_list(request):
    query = request.GET.get('search_query', '')
    trucks = Truck.objects.all()

    if query:
        trucks = trucks.filter(
            Q(name__icontains=query) |
            Q(license_plate__icontains(query)) |
            Q(vin__icontains(query))
        )

    total_trucks = trucks.count()
    return render(request, 'equipment/trucks_list.html', {'trucks': trucks, 'total_trucks': total_trucks})

# List trailers separately
def trailers_list(request):
    trailers = Trailer.objects.all()
    return render(request, 'equipment/trailers_list.html', {'trailers': trailers})

# Truck details view with GPS data from Samsara model
def truck_detail(request, truck_id):
    truck = get_object_or_404(Truck, id=truck_id)
    
    # Fetch recent GPS data
    gps_data = get_recent_gps_data(truck.samsara_device_id)
    
    # Provide default values if GPS data is None
    if not gps_data:
        gps_data = {
            'location': 'Location unknown',
            'latitude': None,
            'longitude': None,
            'speed': 'Speed not available',
            'engine_hours': 'No engine hours data',
            'odometer': 'No odometer data',
        }
    
    context = {
        'truck': truck,
        'gps_data': gps_data,
    }
    
    return render(request, 'equipment/truck_detail.html', context)

# Trailer details view with GPS data
def trailer_detail(request, trailer_id):
    trailer = get_object_or_404(Trailer, pk=trailer_id)

    # Fetch GPS data for the trailer (if applicable)
    gps_data = get_recent_gps_data(trailer.samsara_device_id)

    context = {
        'trailer': trailer,
        'gps_data': gps_data or {
            'location': 'Location unknown',
            'coordinates': (None, None),
            'speed': 'Speed not available',
            'engine_hours': 'No engine hours data',
            'odometer': 'No odometer data',
        }
    }

    return render(request, 'equipment/trailer_detail.html', context)

# API view to get truck data
@api_view(['GET'])
def get_truck_data(request, truck_id):
    try:
        truck_data = Truck.objects.get(id=truck_id)
        serializer = TruckSerializer(truck_data)
        return Response(serializer.data)
    except Truck.DoesNotExist:
        return Response({'error': 'Truck not found'}, status=404)
