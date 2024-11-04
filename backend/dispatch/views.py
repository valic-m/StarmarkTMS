# Path: C:/Users/valic/OneDrive/Documents/TMS/backend/dispatch/views.py

from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse
from django.views.generic import ListView
from backend.dispatch.models import Dispatch
from backend.dispatch.forms import DispatchForm
from backend.drivers_operators.models import Driver
from backend.equipment.models import Truck
from backend.loads.models import Load
from backend.loads.forms import LoadForm

# Home view that shows active dispatches on the dashboard
def home(request):
    dispatches = Dispatch.objects.filter(status__in=['Dispatched', 'Loaded'])
    return render(request, 'home.html', {'dispatches': dispatches})

# API view to fetch active dispatch data in JSON format
def active_dispatches_api(request):
    # Fetch active dispatches and their related data
    active_dispatches = Dispatch.objects.filter(status__in=['Dispatched', 'Loaded']).values(
        'id', 'load__id', 'driver__name', 'truck__number', 
        'load__pickup_location', 'load__dropoff_location', 'status'
    )
    return JsonResponse(list(active_dispatches), safe=False)

# List of dispatched loads
def dispatch_list(request):
    dispatches = Dispatch.objects.all()
    return render(request, 'dispatch/dispatch_list.html', {'dispatches': dispatches})

# Create or edit a dispatch
def create_or_edit_dispatch(request, dispatch_id=None):
    if dispatch_id:
        dispatch = get_object_or_404(Dispatch, pk=dispatch_id)
    else:
        dispatch = Dispatch()

    if request.method == 'POST':
        form = DispatchForm(request.POST, instance=dispatch)
        if form.is_valid():
            form.save()
            return redirect('dispatch_list')
    else:
        form = DispatchForm(instance=dispatch)

    context = {'form': form, 'dispatch': dispatch}
    return render(request, 'dispatch/create_or_edit_dispatch.html', context)

# Mark dispatch as loaded/unloaded
def mark_dispatch(request, dispatch_id, status):
    dispatch = get_object_or_404(Dispatch, pk=dispatch_id)
    dispatch.status = status
    dispatch.save()
    return redirect('dispatch_list')

# Dispatch load view for assigning a driver and truck to a load
def dispatch_load(request, load_id):
    load = get_object_or_404(Load, id=load_id)
    drivers = Driver.objects.all()
    trucks = Truck.objects.all()

    if request.method == 'POST':
        selected_driver_id = request.POST.get('driver')
        selected_truck_id = request.POST.get('truck')

        selected_driver = get_object_or_404(Driver, pk=selected_driver_id)
        selected_truck = get_object_or_404(Truck, pk=selected_truck_id)

        # Assign the dispatch to the load
        Dispatch.objects.create(
            load=load,
            driver=selected_driver,
            truck=selected_truck,
            status='Dispatched',
            pickup_time=load.pickup_time,
            delivery_time=load.delivery_time
        )

        return redirect('dispatch_list')

    context = {'load': load, 'drivers': drivers, 'trucks': trucks}
    return render(request, 'dispatch/dispatch_load.html', context)

# Edit an existing load
def edit_load(request, load_id):
    load = get_object_or_404(Load, id=load_id)
    if request.method == 'POST':
        form = LoadForm(request.POST, instance=load)
        if form.is_valid():
            form.save()
            return redirect('available_loads')
    else:
        form = LoadForm(instance=load)
    return render(request, 'loads/edit_load.html', {'form': form})

# List loads
def load_list(request):
    loads = Load.objects.all()
    return render(request, 'dispatch/load_list.html', {'loads': loads})

# View for available loads (loads that have not been dispatched yet)
def available_loads(request):
    loads = Load.objects.filter(status='Booked')
    return render(request, 'dispatch/available_loads.html', {'loads': loads})

# Class-based view for available loads
class AvailableLoadsView(LoginRequiredMixin, ListView):
    model = Load
    template_name = 'dispatch/available_loads.html'
    context_object_name = 'loads'
    login_url = '/login/'

    def get_queryset(self):
        # Only return loads that are not yet dispatched
        return Load.objects.filter(status='Booked')
