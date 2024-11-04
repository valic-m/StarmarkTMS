import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tms_project.settings')
import django
django.setup()
from companies.models import Company
