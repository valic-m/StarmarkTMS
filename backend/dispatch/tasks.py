# File: C:/Users/valic/OneDrive/Documents/TMS/backend/dispatch/tasks.py

from celery import shared_task
from .utils import update_route_status

@shared_task
def update_route_status_task(route_id, status):
    """
    Celery task to update route status asynchronously.
    """
    result = update_route_status(route_id, status)
    return result
