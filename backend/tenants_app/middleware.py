# backend/tenants_app/middleware.py

import logging
from django.db import connection
from django_tenants.middleware.main import TenantMainMiddleware
from django_tenants.utils import get_tenant_domain_model
from django.http import HttpResponseForbidden

logger = logging.getLogger(__name__)

class DomainTenantMiddleware(TenantMainMiddleware):
    def process_request(self, request):
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
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        origin = request.headers.get('Origin')
        if not origin:
            logger.debug("No Origin header in request; skipping CORS handling.")
            return response

        domain_model = get_tenant_domain_model()
        allowed_domains = list(domain_model.objects.values_list('domain', flat=True))

        # local dev domains if needed
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
