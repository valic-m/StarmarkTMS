from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .utils import get_openai_response
import json

@csrf_exempt  # Allow React to send POST requests without CSRF token
def openai_chat_view(request):
    """
    API endpoint to process user messages and return OpenAI responses.
    """
    if request.method == "POST":
        try:
            # Parse JSON body
            data = json.loads(request.body)
            user_message = data.get("message", "")
            if not user_message:
                return JsonResponse({"error": "No message provided."}, status=400)

            # Get response from OpenAI
            openai_response = get_openai_response(user_message)
            return JsonResponse({"reply": openai_response}, status=200)

        except ValueError as e:
            return JsonResponse({"error": str(e)}, status=500)
        except Exception as e:
            return JsonResponse({"error": "Something went wrong."}, status=500)

    return JsonResponse({"error": "Invalid request method."}, status=405)
