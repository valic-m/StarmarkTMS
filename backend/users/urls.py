from django.urls import path
from .views import CustomUserListAPIView

app_name = 'users'

urlpatterns = [
    path('', CustomUserListAPIView.as_view(), name='user_list'),
]
