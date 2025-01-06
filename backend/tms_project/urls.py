from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from backend.customers.views import get_fmcsa_data

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/customers/', include('backend.customers.urls')),
    path('api/fmcsa/', get_fmcsa_data, name='get_fmcsa_data'),
    path('api/', include('backend.shippers_receivers.urls')),
    path('api/trucks/', include('backend.trucks.urls')),
    path('login/', auth_views.LoginView.as_view(), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('dispatch/', include('dispatch.urls')),
    path('loads/', include('backend.loads.urls')),
    path('accounting/', include('accounting.urls')),
    path('password_reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
    path('carriers/', include('backend.carriers.urls')),
    path('companies/', include('companies.urls')),
    path('samsara/', include('samsara.urls')),
    path('api/openai/', include('openai_app.urls')),
    path('api/contacts/', include('contacts.urls')),
]
