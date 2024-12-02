from rest_framework import serializers
from django.contrib.auth import get_user_model
CustomUser = get_user_model()

class CustomUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)  # Ensures email is valid
    username = serializers.CharField(required=True)  # Ensures username is required

    class Meta:
        model = CustomUser
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'is_active',
            'date_joined',
            'last_login',
        ]  # List the specific fields for clarity
        read_only_fields = ['date_joined', 'last_login']  # Make read-only fields explicit

    def validate_email(self, value):
        """
        Check that the email is valid and not already in use.
        """
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already in use.")
        return value

    def create(self, validated_data):
        """
        Custom creation logic if needed.
        """
        return CustomUser.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        """
        Custom update logic if needed.
        """
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
