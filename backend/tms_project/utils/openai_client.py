from dotenv import load_dotenv
import os
import openai

# Load environment variables from .env file
load_dotenv()

# Retrieve the OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

try:
    # Use the updated `openai.ChatCompletion` API
    response = openai.ChatCompletion.create(
        model="gpt-4",  # Specify the model you want to use
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Hello, OpenAI!"}
        ],
        max_tokens=50
    )

    # Print the assistant's reply
    print(response["choices"][0]["message"]["content"].strip())

except Exception as e:
    print(f"An error occurred: {e}")
