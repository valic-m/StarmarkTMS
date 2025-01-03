
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# If you want /api/trucks/ to be the final listing/creation route for trucks,
# register the TruckViewSet with an empty string ('') rather than 'trucks'.
router = DefaultRouter()
router.register(r'', views.TruckViewSet, basename='truck')
router.register(r'inspection-types', views.InspectionTypeViewSet, basename='inspection-type')
router.register(r'inspections', views.InspectionViewSet, basename='inspection')
router.register(r'maintenance-logs', views.MaintenanceLogViewSet, basename='maintenance-log')
router.register(r'expenses', views.ExpenseViewSet, basename='expense')
router.register(r'out-of-service-history', views.OutOfServiceHistoryViewSet, basename='out-of-service-history')

urlpatterns = [
    # This mounts all the routes from the router at whatever prefix
    # you set in the main urls.py (e.g., path('api/trucks/', include('backend.fleet.urls'))).
    path('', include(router.urls)),
]
