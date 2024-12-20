from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, generics
from .models import ShipperReceiverCompany
from .serializers import ShipperReceiverCompanySerializer

# API Views for RESTful Implementation

@api_view(['GET', 'POST'])
def shipper_list(request):
    """
    Handles listing all shippers (GET) or creating a new shipper (POST).
    """
    if request.method == 'GET':
        shippers = ShipperReceiverCompany.objects.filter(company_type='shipper')
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
        shipper = ShipperReceiverCompany.objects.get(pk=id, company_type='shipper')
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
        receivers = ShipperReceiverCompany.objects.filter(company_type='receiver')
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
        receiver = ShipperReceiverCompany.objects.get(pk=id, company_type='receiver')
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


class LocationListCreateView(generics.ListCreateAPIView):
    """
    API view to list and create locations.
    """
    queryset = ShipperReceiverCompany.objects.all()
    serializer_class = ShipperReceiverCompanySerializer


class LocationRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, or delete a specific location.
    """
    queryset = ShipperReceiverCompany.objects.all()
    serializer_class = ShipperReceiverCompanySerializer


# Generic API View for Shipper and Receiver Listing
class ShipperReceiverListAPIView(generics.ListAPIView):
    """
    API View to list all shippers and receivers.
    """
    queryset = ShipperReceiverCompany.objects.all()
    serializer_class = ShipperReceiverCompanySerializer
