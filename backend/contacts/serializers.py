from rest_framework import serializers
from .models import Contact


class ContactSerializer(serializers.ModelSerializer):
    """
    Serializer for the Contact model.
    """
    associated_entity = serializers.SerializerMethodField()

    class Meta:
        model = Contact
        fields = '__all__'

    def get_associated_entity(self, obj):
        """
        Return the name of the associated entity (e.g., Customer or Location).
        """
        return str(obj.associated_entity)
