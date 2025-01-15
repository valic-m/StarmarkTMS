from django.contrib.auth.models import AbstractUser
from django.db import models

class PublicUser(AbstractUser):
    """
    A user model for the public schema only.
    Typically inherits from AbstractUser or AbstractBaseUser.
    Add any global fields you need here.
    """
    # Example extra fields:
    phone_number = models.CharField(max_length=30, blank=True, null=True)

    def __str__(self):
        return self.email or self.username
