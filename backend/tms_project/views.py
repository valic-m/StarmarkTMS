from django.http import JsonResponse, HttpResponse
from backend.companies.models import OperationalCompany

def dashboard(request):
    return JsonResponse({'message': 'Dashboard endpoint'})

def companies_list(request):
    data = []
    for c in OperationalCompany.objects.all():
        data.append({
            'id': c.id,
            'name': c.name,
            'address': c.address,
            'city': c.city,
            'state': c.state,
            'zip_code': c.zip_code,
            'phone_number': c.phone_number,
            'email': c.email
        })
    return JsonResponse({'companies': data})

def test_template_view(request):
    return HttpResponse("Previously rendered a template")

def debug_login_view(request):
    return HttpResponse("Debug login endpoint")

def add_company(request):
    if request.method == 'POST':
        return JsonResponse({'status': 'Company creation logic'})
    return JsonResponse({'info': 'Send a POST request with JSON'})
