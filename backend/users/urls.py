from django.urls import path
from .views import (
    CustomUserListAPIView,
    CustomUserInactiveListAPIView,
    CustomUserActivityAPIView,
    CustomUserCommissionAPIView,
    LoginView
)

app_name = 'users'

urlpatterns = [
    path('', CustomUserListAPIView.as_view(), name='user_list'),  # List active users
    path('inactive/', CustomUserInactiveListAPIView.as_view(), name='inactive_user_list'),  # List inactive users
    path('activity/', CustomUserActivityAPIView.as_view(), name='user_activity'),  # Placeholder for activity
    path('commission/', CustomUserCommissionAPIView.as_view(), name='user_commission'),  # Placeholder for commission
    path('login/', LoginView.as_view(), name='user_login'),  # User login
]
