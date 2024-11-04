from django.shortcuts import render, get_object_or_404, redirect
from django.apps import apps  # Import the apps module to dynamically load the OperationalCompany model
from .forms import CompanyForm  # Assuming the form is correct

# Dynamically load OperationalCompany model to avoid circular imports
OperationalCompany = apps.get_model('companies', 'OperationalCompany')

def company_list(request):
    """View to list all operational companies."""
    companies = OperationalCompany.objects.all()  # Fetch all operational companies from the database
    return render(request, 'companies/company_list.html', {'companies': companies})

def company_detail(request, company_id):
    """View to show details of a specific operational company."""
    company = get_object_or_404(OperationalCompany, pk=company_id)  # Fetch the operational company by ID
    return render(request, 'companies/company_detail.html', {'company': company})

def create_company(request):
    """View to create a new operational company."""
    if request.method == 'POST':
        form = CompanyForm(request.POST)  # Populate the form with submitted data
        if form.is_valid():
            form.save()  # Save the new company to the database
            return redirect('companies_list')  # Redirect to the company list page after successful creation
    else:
        form = CompanyForm()  # Create an empty form for GET requests
    return render(request, 'companies/company_form.html', {'form': form})
