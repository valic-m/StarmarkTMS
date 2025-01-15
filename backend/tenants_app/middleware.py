# backend/tenants_app/middleware.py

import logging
from django.db import connection
from django_tenants.middleware.main import TenantMainMiddleware
from django_tenants.utils import get_tenant_domain_model
from django.http import HttpResponseForbidden

logger = logging.getLogger(__name__)


class DomainTenantMiddleware(TenantMainMiddleware):
    """
    Middleware that looks up the tenant based on the request's host,
    e.g. "starmark.localhost".
    Removes any requirement for an X-Tenant header.

    For each tenant, you must have a Domain row in the DB:
      Domain.objects.create(domain="starmark.localhost", tenant=..., is_primary=True)
    Then requests to http://starmark.localhost[:port]/ will switch to the correct tenant schema.
    """

    def process_request(self, request):
        # Extract the hostname (e.g. "starmark.localhost") without the port.
        host = request.get_host().split(':')[0]

        domain_model = get_tenant_domain_model()
        try:
            domain_obj = domain_model.objects.select_related('tenant').get(domain=host)
            tenant = domain_obj.tenant
            connection.set_tenant(tenant)
            logger.info(f"Switched to tenant schema: {tenant.schema_name} via domain '{host}'")
        except domain_model.DoesNotExist:
            logger.error(f"No matching domain found for host: '{host}'")
            return HttpResponseForbidden(f"No tenant found for domain '{host}'")


class DynamicCorsMiddleware:
    """
    Middleware to dynamically handle CORS for tenant domains.
    Adds "Access-Control-Allow-Origin" for valid tenant domains,
    plus some local dev domains if needed.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        origin = request.headers.get('Origin')
        if not origin:
            logger.debug("No Origin header in request; skipping CORS handling.")
            return response

        # Collect all known tenant domains from DB
        domain_model = get_tenant_domain_model()
        allowed_domains = list(domain_model.objects.values_list('domain', flat=True))

        # Also allow local dev domains if needed:
        allowed_domains.append("http://localhost:3000")
        allowed_domains.append("http://starmark.localhost:8000")

        if origin in allowed_domains:
            logger.debug(f"Allowing CORS for origin: {origin}")
            response["Access-Control-Allow-Origin"] = origin
            response["Access-Control-Allow-Credentials"] = "true"
            response["Access-Control-Allow-Headers"] = "Authorization, X-Tenant, Content-Type"
            response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        else:
            logger.warning(f"Origin not allowed: {origin}")

        return response
