from django.urls import path
from .views import openai_chat_view

urlpatterns = [
    path("chat/", openai_chat_view, name="openai_chat"),
]
