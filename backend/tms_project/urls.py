# C:\Users\valic\Documents\Github\StarmarkTMS\backend\tms_project\urls.py

from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from backend.customers.views import get_fmcsa_data

urlpatterns = [
    # Admin site
    path('admin/', admin.site.urls),  # Django admin

    # Users API
    path('api/users/', include('users.urls')),  # Users API endpoint

    # Customers API
    path('api/customers/', include('backend.customers.urls')),  # Include customer-related routes

    # FMCSA data endpoint
    path('api/fmcsa/', get_fmcsa_data, name='get_fmcsa_data'),

    # Shippers/Receivers and Locations API (currently mounted at /api/)
    path('api/', include('backend.shippers_receivers.urls')),  # Adjust if you prefer a sub-path

    # Fleet (Trucks, Inspections, etc.) - now properly routed under /api/fleet/
    path('api/trucks/', include('backend.trucks.urls')),

    # Login and logout routes
    path('login/', auth_views.LoginView.as_view(template_name='registration/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),

    # Dispatch-related routes
    path('dispatch/', include('dispatch.urls')),

    # Load-related routes
    path('loads/', include('backend.loads.urls')),

    # Accounting-related routes
    path('accounting/', include('accounting.urls')),

    # Password reset URLs
    path('password_reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),

    # Carrier-related routes
    path('carriers/', include('backend.carriers.urls')),

    # Companies routes
    path('companies/', include('companies.urls')),

    # Samsara-related routes
    path('samsara/', include('samsara.urls')),

    # OpenAI routes
    path('api/openai/', include('openai_app.urls')),  # Include OpenAI API routes
    path('api/contacts/', include('contacts.urls')),  # Add contacts API
]
