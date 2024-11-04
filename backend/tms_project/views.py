# File: C:/Users/valic/OneDrive/Documents/TMS/backend/tms_project/views.py

from django.shortcuts import render
from backend.companies.models import OperationalCompany  # Correct import for OperationalCompany
from django.http import HttpResponse
from django.template.loader import get_template, TemplateDoesNotExist
import traceback

# Define the dashboard view
def dashboard(request):
    """
    Renders the dashboard page.
    """
    return render(request, 'backend/dashboard.html')  # Path to the dashboard template

# Define the companies list view
def companies_list(request):
    """
    View to list all operational companies.
    """
    companies = OperationalCompany.objects.all()  # Fetch all operational companies from the database
    return render(request, 'backend/companies/companies_list.html', {'companies': companies})  # Path to the companies template

# Test template view with error handling
def test_template_view(request):
    """
    View for testing template rendering.
    """
    try:
        # Attempt to render the 'test.html' template
        return render(request, 'test.html')  # Ensure the 'test.html' exists in the templates folder
    except Exception as e:
        # If there's an error, return a basic HTTP response with the error message
        return HttpResponse(f"Error rendering template: {e}")

# Enhanced debug view to check if the login.html template can be found
def debug_login_view(request):
    """
    A temporary view to check if the 'login.html' template is loading correctly.
    """
    try:
        template = get_template('registration/login.html')
        return HttpResponse("Login template loaded successfully!")
    except TemplateDoesNotExist as e:
        return HttpResponse(f"Template 'registration/login.html' does not exist: {e}", status=500)
    except Exception as e:
        # Capture the full traceback for more detailed error logging
        error_message = traceback.format_exc()
        return HttpResponse(f"An error occurred: {error_message}", status=500)
    
    # File: C:/Users/valic/OneDrive/Documents/TMS/backend/shippers_receivers/views.py

def add_company(request):
    company_type = request.GET.get('type', 'shipper')  # Get the type from the request query parameters
    is_modal = request.GET.get('modal') == 'true'  # Check if the modal parameter is set

    if request.method == 'POST':
        form = CompanyForm(request.POST)
        if form.is_valid():
            company = form.save(commit=False)
            company.is_shipper = company_type == 'shipper'  # Set the type based on the form submission
            company.save()
            return redirect('company_list')  # Redirect to the company list after saving
    else:
        form = CompanyForm()

    # Render the modal template if the modal parameter is set, otherwise render the full page template
    template_name = 'shippers_receivers/add_shipper_modal.html' if is_modal else 'shippers_receivers/add_company.html'
    return render(request, template_name, {'form': form, 'type': company_type})
