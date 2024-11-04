from django.conf import settings
from django.shortcuts import redirect
from django.urls import resolve, reverse
import re

class LoginRequiredMiddleware:
    """
    Middleware that ensures the user is logged in to access non-public paths,
    with exceptions for specific URLs such as login, logout, admin, and login-debug.
    """
    def __init__(self, get_response):
        self.get_response = get_response

        try:
            # Exempt URLs: login, logout, admin, and login-debug
            self.exempt_urls = [
                str(reverse('login')),
                str(reverse('logout')),
                str(reverse('admin:index')),
                '/login-debug/',  # Exempt the login-debug view
            ]
            self.exempt_urls = [re.compile(re.escape(url)) for url in self.exempt_urls]
        except Exception as e:
            print(f"Error in reverse URL lookup: {e}")
            self.exempt_urls = []

    def __call__(self, request):
        try:
            # Get additional public paths from settings (if any)
            public_paths = getattr(settings, 'PUBLIC_PATHS', [])
            public_paths = [re.compile(re.escape(str(path))) for path in public_paths]

            # Combine exempt URLs and public paths
            exempt_urls = self.exempt_urls + public_paths

            # Current request path
            request_path = request.path

            # Resolve the URL name to avoid redirecting the login URL to itself
            current_url_name = resolve(request_path).url_name

            # Do not redirect if the user is authenticated or the request path is exempt
            if not request.user.is_authenticated and current_url_name != 'login':
                if not any(url.match(request_path) for url in exempt_urls):
                    return redirect(settings.LOGIN_URL)

            # Continue processing the request
            response = self.get_response(request)
            return response

        except Exception as e:
            print(f"Error during middleware execution: {e}")
            return redirect(settings.LOGIN_URL)
