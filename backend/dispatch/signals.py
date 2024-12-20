# File: C:/Users/valic/OneDrive/Documents/TMS/backend/dispatch/signals.py

from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Dispatch
from .utils import update_route_status

@receiver(post_save, sender=Dispatch)
def update_route_status_signal(sender, instance, **kwargs):
    """
    Signal to update the Samsara route status when a Dispatch object is updated.
    """
    if instance.status in ['In Transit', 'Completed']:
        update_route_status(instance.id, instance.status.lower())
