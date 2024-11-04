"""
WSGI config for tms_project project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/wsgi/
"""

import os
from django.core.wsgi import get_wsgi_application

# Update the settings module to reflect the new backend path
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.tms_project.settings')

application = get_wsgi_application()
