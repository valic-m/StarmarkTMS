from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from django.http import HttpResponse
from django.template.loader import render_to_string, TemplateDoesNotExist
from dispatch import views as dispatch_views
from backend.tms_project import views  # Project-level views (dashboard, companies_list)
from users import views as user_views  # Views from the 'users' app
from backend.customers.views import CustomerListCreate, get_fmcsa_data  # Import necessary views
from .views import test_template_view  # Import your test view
import traceback  # Import traceback for more detailed error reporting

# Debug login view to test if the login.html template can be found
def debug_login_view(request):
    """
    A debug view to check if the 'login.html' template is loading correctly, with full traceback on errors.
    """
    try:
        rendered_template = render_to_string('registration/login.html')
        return HttpResponse(rendered_template)
    except TemplateDoesNotExist as e:
        return HttpResponse(f"Template 'registration/login.html' does not exist: {e}", status=500)
    except Exception as e:
        error_message = traceback.format_exc()  # Get the full traceback for debugging
        return HttpResponse(f"An error occurred: {error_message}", status=500)

urlpatterns = [
    # Admin site
    path('admin/', admin.site.urls),

    # Shippers and Receivers API
    path('api/shippers_receivers/', include('backend.shippers_receivers.urls')),

    # Login and logout routes
    path('login/', auth_views.LoginView.as_view(template_name='registration/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),

    # Home page with active dispatches
    path('', dispatch_views.home, name='home'),

    # Dashboard route
    path('dashboard/', views.dashboard, name='dashboard'),

    # Drivers and operators routes
    path('drivers_operators/', include('drivers_operators.urls')),

    # Equipment-related routes
    path('equipment/', include('equipment.urls')),

    # Customers routes
    path('client-management/customers/', include('backend.customers.urls', namespace='customers')),  # Use correct namespace for customers app

    # API endpoint for customers
    path('api/customers/', CustomerListCreate.as_view(), name='customer_list_api'),

    # FMCSA data endpoint
    path('api/fmcsa/', get_fmcsa_data, name='get_fmcsa_data'),

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

    # User-related routes
    path('active_users/', user_views.active_users, name='active_users'),
    path('user_activity/', user_views.user_activity, name='user_activity'),
    path('inactive_users/', user_views.inactive_users, name='inactive_users'),
    path('user_commission/', user_views.user_commission, name='user_commission'),

    # Samsara-related routes
    path('samsara/', include('samsara.urls')),

    # Test template route
    path('test-template/', test_template_view, name='test_template'),

    # Debug login route
    path('login-debug/', debug_login_view, name='login_debug'),

    # Authentication-related URLs
    path('auth/', include('authentication.urls')),
path('api/customers/', include('backend.customers.urls', namespace='customers')),

]
