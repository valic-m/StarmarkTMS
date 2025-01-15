from rest_framework.permissions import BasePermission
import logging

logger = logging.getLogger(__name__)

class IsTenantUser(BasePermission):
    """
    Custom permission to allow only users of the current tenant to access data.
    """
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            logger.warning(f"Unauthenticated access attempt to {view.__class__.__name__}")
            return False

        if hasattr(request, "tenant") and hasattr(request.user, "tenant"):
            if request.tenant != request.user.tenant:
                logger.warning(f"Tenant mismatch: {request.tenant} != {request.user.tenant}")
                return False

        logger.debug(f"Access granted for user: {request.user} on tenant: {request.tenant}")
        return True
