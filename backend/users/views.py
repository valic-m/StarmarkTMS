from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
CustomUser = get_user_model()
from .serializers import CustomUserSerializer

class CustomUserListAPIView(APIView):
    """
    API View to list all active custom users.
    """
    def get(self, request):
        users = CustomUser.objects.filter(is_active=True)  # Filter only active users
        serializer = CustomUserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CustomUserInactiveListAPIView(APIView):
    """
    API View to list all inactive custom users.
    """
    def get(self, request):
        users = CustomUser.objects.filter(is_active=False)  # Filter only inactive users
        serializer = CustomUserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CustomUserActivityAPIView(APIView):
    """
    Placeholder API View for user activity.
    """
    def get(self, request):
        # Placeholder logic for user activity
        return Response({'message': 'User activity endpoint is under development.'}, status=status.HTTP_200_OK)


class CustomUserCommissionAPIView(APIView):
    """
    Placeholder API View for user commission.
    """
    def get(self, request):
        # Placeholder logic for user commission
        return Response({'message': 'User commission endpoint is under development.'}, status=status.HTTP_200_OK)