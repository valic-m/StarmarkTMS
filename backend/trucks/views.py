
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny  # <-- Added AllowAny here
from .models import (
    Truck,
    InspectionType,
    Inspection,
    MaintenanceLog,
    Expense,
    OutOfServiceHistory
)
from .serializers import (
    TruckSerializer,
    InspectionTypeSerializer,
    InspectionSerializer,
    MaintenanceLogSerializer,
    ExpenseSerializer,
    OutOfServiceHistorySerializer
)


class TruckViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing Truck instances.
    """
    queryset = Truck.objects.all()
    serializer_class = TruckSerializer
    permission_classes = [AllowAny]


class InspectionTypeViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing InspectionType instances.
    """
    queryset = InspectionType.objects.all()
    serializer_class = InspectionTypeSerializer
    permission_classes = [AllowAny]


class InspectionViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing Inspection instances.
    """
    queryset = Inspection.objects.select_related('truck', 'inspection_type').all()
    serializer_class = InspectionSerializer
    permission_classes = [AllowAny]


class MaintenanceLogViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing MaintenanceLog instances.
    """
    queryset = MaintenanceLog.objects.select_related('truck').all()
    serializer_class = MaintenanceLogSerializer
    permission_classes = [AllowAny]


class ExpenseViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing Expense instances.
    """
    queryset = Expense.objects.select_related('truck').all()
    serializer_class = ExpenseSerializer
    permission_classes = [AllowAny]


class OutOfServiceHistoryViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing OutOfServiceHistory instances.
    """
    queryset = OutOfServiceHistory.objects.select_related('truck').all()
    serializer_class = OutOfServiceHistorySerializer
    permission_classes = [AllowAny]  # Now anyone can access this endpoint without authentication
