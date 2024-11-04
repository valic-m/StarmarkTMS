# Path: C:/Users/valic/OneDrive/Documents/TMS/backend/dispatch/urls.py

from django.urls import path
from backend.dispatch import views  # Updated import path for views

urlpatterns = [
    # API endpoint for fetching active dispatches
    path('api/dispatch/active/', views.active_dispatches_api, name='active_dispatches_api'),

    # List of dispatched loads
    path('', views.dispatch_list, name='dispatch_list'),

    # Create and Edit Dispatch
    path('create/', views.create_or_edit_dispatch, name='create_dispatch'),
    path('edit/<int:dispatch_id>/', views.create_or_edit_dispatch, name='edit_dispatch'),

    # Mark dispatch as loaded/unloaded
    path('mark/<int:dispatch_id>/<str:status>/', views.mark_dispatch, name='mark_dispatch'),

    # Dispatch Load (with load_id)
    path('dispatch/<int:load_id>/', views.dispatch_load, name='dispatch_load'),

    # Load List and Available Loads routes
    path('load_list/', views.load_list, name='load_list'),
    path('available_loads/', views.available_loads, name='available_loads'),
]
