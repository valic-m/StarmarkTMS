from django.db import migrations, models
from django.utils.text import slugify

def generate_unique_slugs(apps, schema_editor):
    """
    Generate unique slugs for existing customers.
    """
    Customer = apps.get_model('customers', 'Customer')
    for customer in Customer.objects.all():
        base_slug = slugify(customer.name[:50]) or "customer"  # Fallback to "customer" if name is empty
        unique_slug = base_slug
        counter = 1
        while Customer.objects.filter(slug=unique_slug).exists():
            unique_slug = f"{base_slug}-{counter}"
            counter += 1
        customer.slug = unique_slug
        customer.save()

class Migration(migrations.Migration):

    dependencies = [
        ('customers', '0002_alter_customer_options_customer_priority_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='slug',
            field=models.SlugField(max_length=50, unique=True, blank=True, null=True),
        ),
        migrations.RunPython(generate_unique_slugs),  # Generate unique slugs
        migrations.AlterField(
            model_name='customer',
            name='slug',
            field=models.SlugField(max_length=50, unique=True),
        ),
    ]
