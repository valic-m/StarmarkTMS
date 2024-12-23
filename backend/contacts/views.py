from rest_framework import generics
from .models import Contact
from .serializers import ContactSerializer


class ContactListCreateView(generics.ListCreateAPIView):
    """
    API endpoint to list and create contacts.
    """
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


class ContactRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint to retrieve, update, or delete a contact.
    """
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
