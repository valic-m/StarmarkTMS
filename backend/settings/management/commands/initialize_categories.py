# File: C:\Users\valic\Documents\Github\StarmarkTMS\backend\settings\views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import SettingsCategory

class SettingsCategoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_groups = request.user.groups.all()
        categories = SettingsCategory.objects.filter(roles__in=user_groups).distinct()
        data = [{"name": cat.name, "route": cat.route} for cat in categories]
        return Response(data)
