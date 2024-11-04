from django.shortcuts import render, get_object_or_404, redirect
from backend.loads.models import Load
from backend.customers.models import Customer
from backend.loads.forms import LoadForm
from backend.shippers_receivers.models import ShipperReceiverCompany
from backend.users.models import CustomUser  # Import your custom user model

# View to list all loads
def load_list(request):
    loads = Load.objects.all()
    return render(request, 'loads/load_list.html', {'loads': loads})

# View to show details of a single load using load_number
def load_detail(request, load_number):
    load = get_object_or_404(Load, load_number=load_number)
    return render(request, 'loads/load_detail.html', {'load': load})

# View to create a new load with error debugging
def create_load(request):
    if request.method == 'POST':
        form = LoadForm(request.POST)
        if form.is_valid():
            customer = form.cleaned_data.get('customer')
            # Handle the creation of a new customer if one is not selected from the form
            if not customer:
                customer_name = request.POST.get('new_customer_name')
                if customer_name:
                    customer = Customer.objects.create(
                        name=customer_name,
                        address=request.POST.get('new_customer_address', ''),
                        mc_number=request.POST.get('new_customer_mc', ''),
                        phone_number=request.POST.get('new_customer_phone', ''),
                        email=request.POST.get('new_customer_email', ''),
                        accounting_email=request.POST.get('new_customer_accounting_email', ''),
                        broker_email=request.POST.get('new_customer_broker_email', '')
                    )
                    form.instance.customer = customer
            form.save()
            return redirect('load_list')  # Redirect to the load list after saving
        else:
            # Log form errors for debugging purposes
            print("Form is not valid")
            print(form.errors)
    else:
        form = LoadForm()

    users = CustomUser.objects.all()  # Fetch all custom users for "Booked With"

    # Query the shippers and receivers to be passed to the template
    companies = ShipperReceiverCompany.objects.all()

    return render(request, 'loads/create_load.html', {
        'form': form,
        'shippers': companies,  # Use companies for both shipper and receiver fields
        'receivers': companies,
        'users': users,  # Add custom users to the context for "Booked With"
    })

# View to edit an existing load using load_number
def edit_load(request, load_number):
    load = get_object_or_404(Load, load_number=load_number)
    if request.method == 'POST':
        form = LoadForm(request.POST, instance=load)
        if form.is_valid():
            form.save()
            return redirect('load_list')  # Redirect after successful edit
        else:
            print("Form is not valid")
            print(form.errors)
    else:
        form = LoadForm(instance=load)
    return render(request, 'loads/edit_load.html', {'form': form})

# View to delete a load using load_number
def delete_load(request, load_number):
    load = get_object_or_404(Load, load_number=load_number)
    load.delete()  # Deletes the load from the database
    return redirect('load_list')  # Redirect back to the load list page after deletion
