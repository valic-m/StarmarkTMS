from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.utils.timezone import localtime

CustomUser = get_user_model()

class CustomUserSerializer(serializers.ModelSerializer):
    # Add SerializerMethodField for formatted dates
    date_joined_formatted = serializers.SerializerMethodField()
    last_login_formatted = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = [
            'id',
            'first_name',
            'last_name',
            'email',
            'role',
            'is_active',
            'is_staff',
            'last_login',
            'date_joined',
            'last_login_formatted',  # Include formatted last login
            'date_joined_formatted',  # Include formatted date joined
        ]
        read_only_fields = ['date_joined', 'last_login']

    def get_date_joined_formatted(self, obj):
        """
        Return the date_joined in a more readable format.
        """
        return localtime(obj.date_joined).strftime('%b %d, %Y %H:%M') if obj.date_joined else None

    def get_last_login_formatted(self, obj):
        """
        Return the last_login in a more readable format, or None if not available.
        """
        return localtime(obj.last_login).strftime('%b %d, %Y %H:%M') if obj.last_login else None
