from django.db import migrations

def create_public_tenant(apps, schema_editor):
    Tenant = apps.get_model('tenants', 'Tenant')
    Tenant.objects.get_or_create(
        schema_name='public',
        defaults={
            'name': 'Public Tenant',
            'seats': 999,  # or whatever default seats you want
        }
    )

class Migration(migrations.Migration):

    dependencies = [
        ('tenants', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_public_tenant),
    ]
