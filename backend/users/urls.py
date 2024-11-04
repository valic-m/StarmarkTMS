# File: C:/Users/valic/OneDrive/Documents/TMS/backend/tms_project/urls.py

from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from django.http import HttpResponse
from django.template.loader import get_template, TemplateDoesNotExist
from dispatch import views as dispatch_views
from backend.tms_project import views  # Project-level views (dashboard, companies_list)
from users import views as user_views  # Views from the 'users' app
from .views import test_template_view  # Import your test view

# Temporary debug view to test if the login.html template can be found
def debug_login_view(request):
    try:
        template = get_template('registration/login.html')
        return HttpResponse("Login template loaded successfully!")
    except TemplateDoesNotExist:
        return HttpResponse("Template does not exist", status=500)

urlpatterns = [
    # Login and logout routes using Django's built-in authentication views
    path('login/', auth_views.LoginView.as_view(template_name='registration/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),

    # Admin page
    path('admin/', admin.site.urls),  # Access to the Django admin page

    # Home page with active dispatches
    path('', dispatch_views.home, name='home'),  # Home page route for showing active dispatches

    # Dashboard route
    path('dashboard/', views.dashboard, name='dashboard'),  # Dashboard page route

    # Include URLs for the drivers_operators app
    path('drivers_operators/', include('drivers_operators.urls')),  # Routes related to drivers and operators

    # Include URLs for the equipment app
    path('equipment/', include('equipment.urls')),  # Routes for trucks, trailers, etc.

    # Include URLs for customers
    path('customers/', include('customers.urls')),  # Customer-related routes

    # Include URLs for dispatch (dispatch routes, including create and list)
    path('dispatch/', include('dispatch.urls')),  # Dispatch-related routes

    # Include URLs for loads
    path('loads/', include('loads.urls')),  # Load-related routes

    # Include URLs for accounting
    path('accounting/', include('accounting.urls')),  # Accounting-related routes

    # Password reset URLs
    path('password_reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),

    # Include URLs for the shippers_receivers app
    path('shippers_receivers/', include('shippers_receivers.urls')),  # Shippers and receivers-related routes

    # Include URLs for carriers
    path('carriers/', include('backend.carriers.urls')),  # Carrier-related routes

    # Include URLs for companies
    path('companies/', include('companies.urls')),  # Include URLs from the companies app

    # Include URLs for users
    path('active_users/', user_views.active_users, name='active_users'),  # Active users route
    path('user_activity/', user_views.user_activity, name='user_activity'),  # User activity route
    path('inactive_users/', user_views.inactive_users, name='inactive_users'),  # Inactive users route
    path('user_commission/', user_views.user_commission, name='user_commission'),  # User commission route

    # Include Samsara app URLs
    path('samsara/', include('samsara.urls')),  # Include the Samsara app URLs

    # Test template URL
    path('test-template/', test_template_view, name='test_template'),  # Your test template URL

    # Debug login route
    path('login-debug/', debug_login_view, name='login_debug'),  # Debug login route to test template
]
