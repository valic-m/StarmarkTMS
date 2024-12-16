import openai
import os

# Load your OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

def get_openai_response(user_message):
    """
    Sends the user message to OpenAI and retrieves a response.
    """
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_message},
            ]
        )
        return response.choices[0].message["content"]
    except Exception as e:
        raise ValueError(f"Error communicating with OpenAI: {str(e)}")
