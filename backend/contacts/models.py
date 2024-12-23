from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.core.validators import RegexValidator


class Contact(models.Model):
    """
    Represents an individual contact that can be associated with any company type.
    """
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone_number = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        validators=[
            RegexValidator(
                regex=r'^\(\d{3}\)\d{3}-\d{4}$',
                message="Phone number must be in the format (000)000-0000.",
            )
        ],
    )
    email = models.EmailField(blank=True, null=True)

    # Generic Foreign Key for associating with any model
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    associated_entity = GenericForeignKey('content_type', 'object_id')

    # Additional fields
    job_title = models.CharField(max_length=100, blank=True, null=True)
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.associated_entity})"
