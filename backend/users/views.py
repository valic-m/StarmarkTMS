from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from .serializers import CustomUserSerializer
import logging

# Configure logger
logger = logging.getLogger(__name__)

CustomUser = get_user_model()

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


class LoginView(APIView):
    """
    API View for user login.
    """
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        logger.info(f"Login attempt received. Email: {email}")

        if not email or not password:
            logger.warning("Email or password missing in request.")
            return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate user
        user = authenticate(request, username=email, password=password)

        if user:
            logger.info(f"Login successful for user: {user.email}")
            refresh = RefreshToken.for_user(user)  # Generate tokens
            return Response({
                'token': str(refresh.access_token),
                'user': {
                    'name': user.first_name,
                    'email': user.email,
                    'role': getattr(user, 'role', 'user'),  # Gracefully handle if `role` does not exist
                }
            }, status=status.HTTP_200_OK)
        else:
            logger.warning(f"Login failed for email: {email}")
            return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)
