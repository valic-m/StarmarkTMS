"""
Django settings for tms_project project.
"""

from pathlib import Path
import os
from datetime import timedelta
from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config("SECRET_KEY", default="default_secret_key")
DEBUG = config("DEBUG", default=True, cast=bool)
ALLOWED_HOSTS = config("ALLOWED_HOSTS", default="127.0.0.1,localhost").split(",")

# -----------------------------------------------------------------------------
# 1) Django-tenants configuration
# -----------------------------------------------------------------------------
SHARED_APPS = (
    'django_tenants',  # Must be first

    # Django core apps that you want in 'public' schema
    'django.contrib.contenttypes',
    'django.contrib.auth',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.admin',

    'tenants',       # Where you define Tenant model
    'backend.users', # <--- Move 'backend.users' HERE for Option B
)

TENANT_APPS = (
    # Only the per-tenant data apps (trucks, loads, etc.)
    'backend.trucks',
    'backend.loads',
    'backend.accounting',
    'backend.carriers',
    'backend.companies',
    'backend.customers',
    'backend.drivers_operators',
    'backend.equipment',
    'backend.repair_shops',
    'backend.shippers_receivers',
    # Note: 'backend.users' is NOT here, so user model is global.

    'backend.vendors',
    'backend.warehouses_crossdocks',
    'backend.dispatch',
    'backend.samsara',
    'backend.contacts',
)

INSTALLED_APPS = list(SHARED_APPS) + list(TENANT_APPS)

TENANT_MODEL = "tenants.Tenant"
TENANT_DOMAIN_MODEL = "tenants.Domain"

# -----------------------------------------------------------------------------
# 2) REST & other third-party settings
# -----------------------------------------------------------------------------
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',
    ),
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
    ],
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'AUTH_HEADER_TYPES': ('Bearer',),
}

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
CORS_ALLOW_CREDENTIALS = True

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',

    'django_tenants.middleware.main.TenantMainMiddleware',  # django-tenants

    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
]

ROOT_URLCONF = 'backend.tms_project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'backend', 'templates'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
            'debug': DEBUG,
        },
    },
]

WSGI_APPLICATION = 'backend.tms_project.wsgi.application'

# -----------------------------------------------------------------------------
# 3) Database config for django-tenants (PostgreSQL)
DATABASES = {
    'default': {
        'ENGINE': 'django_tenants.postgresql_backend',  # from django-tenants
        'NAME': 'starmarktms',                         # must match the DB name in RDS
        'USER': 'valic',                               # must match the RDS master or created user
        'PASSWORD': 'Starmark2008$',                   # must match the password in RDS
        'HOST': 'my-postgres-db.xxxxxx.us-east-1.rds.amazonaws.com',
        'PORT': '5432',
    }
}

DATABASE_ROUTERS = ['django_tenants.routers.TenantSyncRouter']

# -----------------------------------------------------------------------------
# 4) Auth & password settings
# -----------------------------------------------------------------------------
AUTH_USER_MODEL = 'users.CustomUser'  # (In SHARED_APPS => global user table in 'public')

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# -----------------------------------------------------------------------------
# 5) Static & Media
# -----------------------------------------------------------------------------
STATIC_URL = '/static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'backend', 'static')]
STATIC_ROOT = os.path.join(BASE_DIR, 'backend', 'staticfiles')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'backend', 'media')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

LOGIN_REDIRECT_URL = '/dashboard/'
LOGOUT_REDIRECT_URL = '/login/'

# Securely load the FMCSA WebKey
FMCSA_WEB_KEY = config("FMCSA_WEB_KEY", default="default_fmcsa_web_key")
