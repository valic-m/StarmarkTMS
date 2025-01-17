from django.core.management.base import BaseCommand
from django_tenants.utils import schema_context
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    help = "Create a superuser in a specified tenant schema."

    def add_arguments(self, parser):
        parser.add_argument("--schema", required=True, help="Tenant schema name.")
        parser.add_argument("--username", required=True)
        parser.add_argument("--email", required=True)
        parser.add_argument("--password", required=True)

    def handle(self, *args, **options):
        schema_name = options["schema"]
        username = options["username"]
        email = options["email"]
        password = options["password"]

        with schema_context(schema_name):
            User = get_user_model()
            user = User.objects.create_superuser(username, email, password)
            self.stdout.write(self.style.SUCCESS(
                f"Created superuser '{user.username}' for schema '{schema_name}'"
            ))
