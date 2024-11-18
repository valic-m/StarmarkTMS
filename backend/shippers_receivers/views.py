from django.shortcuts import render, redirect, get_object_or_404
from django.core.paginator import Paginator
from backend.shippers_receivers.models import ShipperReceiverCompany
from backend.shippers_receivers.forms import CompanyForm
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from backend.shippers_receivers.serializers import ShipperReceiverCompanySerializer

def parse_duration(duration_str):
    """Parse a human-friendly duration string into a timedelta object."""
    match = re.match(r'(?:(\d+)\s*hours?)?\s*(?:(\d+)\s*minutes?)?\s*(?:(\d+)\s*seconds?)?', duration_str, re.IGNORECASE)
    if not match:
        return None

    hours = int(match.group(1)) if match.group(1) else 0
    minutes = int(match.group(2)) if match.group(2) else 0
    seconds = int(match.group(3)) if match.group(3) else 0

    return timedelta(hours=hours, minutes=minutes, seconds=seconds)


# API Views for RESTful Implementation

@api_view(['GET', 'POST'])
def shipper_list(request):
    """
    Handles listing all shippers (GET) or creating a new shipper (POST).
    """
    if request.method == 'GET':
        shippers = ShipperReceiverCompany.objects.all()
        serializer = ShipperReceiverCompanySerializer(shippers, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = ShipperReceiverCompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def shipper_detail(request, id):
    """
    Handles retrieving (GET), updating (PUT), or deleting (DELETE) a single shipper.
    """
    try:
        shipper = ShipperReceiverCompany.objects.get(pk=id)
    except ShipperReceiverCompany.DoesNotExist:
        return Response({'error': 'Shipper not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ShipperReceiverCompanySerializer(shipper)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = ShipperReceiverCompanySerializer(shipper, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        shipper.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def receiver_list(request):
    """
    Handles listing all receivers (GET) or creating a new receiver (POST).
    """
    if request.method == 'GET':
        receivers = ShipperReceiverCompany.objects.all()
        serializer = ShipperReceiverCompanySerializer(receivers, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = ShipperReceiverCompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def receiver_detail(request, id):
    """
    Handles retrieving (GET), updating (PUT), or deleting (DELETE) a single receiver.
    """
    try:
        receiver = ShipperReceiverCompany.objects.get(pk=id)
    except ShipperReceiverCompany.DoesNotExist:
        return Response({'error': 'Receiver not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ShipperReceiverCompanySerializer(receiver)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = ShipperReceiverCompanySerializer(receiver, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        receiver.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Traditional Django Views for HTML Forms

def add_company(request):
    company_type = request.GET.get('type', 'shipper')  # Default to 'shipper'
    is_modal = request.GET.get('modal') == 'true'

    if request.method == 'POST':
        form = CompanyForm(request.POST)
        if form.is_valid():
            company = form.save(commit=False)
            form.save()
            if is_modal:
                return render(request, 'shippers_receivers/close_modal.html')
            return redirect('shippers_receivers:company_list')
    else:
        form = CompanyForm()

    template_name = 'shippers_receivers/add_company.html'
    return render(request, template_name, {'form': form, 'type': company_type})


def edit_company(request, company_id):
    company = get_object_or_404(ShipperReceiverCompany, pk=company_id)

    if request.method == 'POST':
        form = CompanyForm(request.POST, instance=company)
        if form.is_valid():
            form.save()
            return redirect('shippers_receivers:company_list')
    else:
        form = CompanyForm(instance=company)

    return render(request, 'shippers_receivers/edit_company.html', {'form': form, 'company': company})


def company_list(request):
    companies = ShipperReceiverCompany.objects.all()
    return render(request, 'shippers_receivers/company_list.html', {'companies': companies})
