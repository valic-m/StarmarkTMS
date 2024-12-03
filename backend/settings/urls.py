# File: C:\Users\valic\Documents\Github\StarmarkTMS\backend\settings\urls.py

from django.urls import path
from .views import SettingsCategoryView

urlpatterns = [
    path('categories/', SettingsCategoryView.as_view(), name='settings_categories'),
]
