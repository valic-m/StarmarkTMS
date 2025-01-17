"""
Django settings for tms_project project.
"""
import os
from pathlib import Path
from datetime import timedelta
from decouple import config
from corsheaders.defaults import default_headers

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config("SECRET_KEY", default="default_secret_key")
DEBUG = config("DEBUG", default=True, cast=bool)

ALLOWED_HOSTS = [
    "127.0.0.1",
    # For infinite subdomains of localhost (like starmark.localhost):
    ".localhost",
]

CSRF_TRUSTED_ORIGINS = [
    "https://*.localhost:8000",
]

# -----------------------------------------------------------------------------
# 1) Django-tenants configuration (SINGLE, GLOBAL AUTH)
# -----------------------------------------------------------------------------
SHARED_APPS = (
    "django_tenants",  # django-tenants core

    # Tenant + Domain models (public schema only):
    "backend.tenants_app.apps.TenantsAppConfig",

    # Public user model & additional public-only apps:
    "backend.public_users.apps.PublicUsersConfig",

    # Global Django apps:
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # Additional globally-shared apps:
    "backend.openai_app",
)

TENANT_APPS = (
    # Put only tenant-specific apps that need separate tables per schema:
    "backend.trucks.apps.TrucksConfig",
    "backend.loads",
    "backend.accounting",
    "backend.carriers",
    "backend.companies",
    "backend.customers",
    "backend.drivers_operators",
    "backend.repair_shops",
    "backend.shippers_receivers",
    "backend.vendors",
    "backend.warehouses_crossdocks",
    "backend.dispatch",
    "backend.samsara",
    "backend.contacts",
    "backend.accounts",
    "backend.trailers",
    "backend.settings",
    "backend.users.apps.UsersConfig",

    "backend.authentication",

    # We skip django.contrib.auth/admin here, because we want a single global DB
    "backend.tenant_user.apps.TenantUserConfig",
)

# Merge them into INSTALLED_APPS without duplication
INSTALLED_APPS = list(SHARED_APPS) + [
    app for app in TENANT_APPS if app not in SHARED_APPS
]

TENANT_MODEL = "tenants_app.Tenant"
TENANT_DOMAIN_MODEL = "tenants_app.Domain"

# -----------------------------------------------------------------------------
# 2) Django REST Framework & JWT
# -----------------------------------------------------------------------------
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.BasicAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.AllowAny",),
    "DEFAULT_RENDERER_CLASSES": ["rest_framework.renderers.JSONRenderer"],
    "DEFAULT_PARSER_CLASSES": ["rest_framework.parsers.JSONParser"],
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "ALGORITHM": "HS256",
    "SIGNING_KEY": SECRET_KEY,
    "AUTH_HEADER_TYPES": ("Bearer",),
}

# -----------------------------------------------------------------------------
# 3) CORS Configuration
# -----------------------------------------------------------------------------
CORS_ALLOWED_ORIGINS = []
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_HEADERS = list(default_headers) + [
    "Authorization",
    "X-Tenant",
]

# -----------------------------------------------------------------------------
# 4) Middleware
# -----------------------------------------------------------------------------
MIDDLEWARE = [
    "backend.tenants_app.middleware.DynamicCorsMiddleware",  # your custom dynamic CORS

    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.security.SecurityMiddleware",

    "django.contrib.sessions.middleware.SessionMiddleware",

    # Domain-based tenant middleware:
    "backend.tenants_app.middleware.DomainTenantMiddleware",

    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
]

ROOT_URLCONF = "backend.tms_project.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "backend", "templates")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
            "debug": DEBUG,
        },
    },
]

WSGI_APPLICATION = "backend.tms_project.wsgi.application"

# -----------------------------------------------------------------------------
# 5) Database config
# -----------------------------------------------------------------------------
DATABASES = {
    "default": {
        "ENGINE": "django_tenants.postgresql_backend",
        "NAME": "starmarktms",
        "USER": "valic",
        "PASSWORD": "Starmark2008$",
        "HOST": "localhost",
        "PORT": "5432",
    }
}
DATABASE_ROUTERS = ["django_tenants.routers.TenantSyncRouter"]

# -----------------------------------------------------------------------------
# 6) Auth & Passwords
# -----------------------------------------------------------------------------
AUTH_USER_MODEL = "public_users.PublicUser"  # Single global user DB in public schema

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# -----------------------------------------------------------------------------
# 7) Static & Media
# -----------------------------------------------------------------------------
STATIC_URL = "/static/"
STATICFILES_DIRS = [os.path.join(BASE_DIR, "backend", "static")]
STATIC_ROOT = os.path.join(BASE_DIR, "backend", "staticfiles")

MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "backend", "media")

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

LOGIN_REDIRECT_URL = "/dashboard/"
LOGOUT_REDIRECT_URL = "/login/"

FMCSA_WEB_KEY = config("FMCSA_WEB_KEY", default="default_fmcsa_web_key")

# -----------------------------------------------------------------------------
# 8) Logging
# -----------------------------------------------------------------------------
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
        },
    },
    "root": {
        "handlers": ["console"],
        "level": "DEBUG",
    },
}

# If you decide to use django-tenant-users or some custom user backend, you might do:
# AUTHENTICATION_BACKENDS = ["tenant_users.permissions.backend.UserBackend"]
# But for now, you're using default ModelBackend + your global user.
