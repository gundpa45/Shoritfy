import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise RuntimeError(
        "GEMINI_API_KEY environment variable is required. "
        "Get one free at https://aistudio.google.com/app/apikey"
    )

# Google GenAI client (newer SDK)
client = genai.Client(api_key=GEMINI_API_KEY)

# Generation config
config = types.GenerateContentConfig(
    temperature=0.1,
    max_output_tokens=1024,
    response_mime_type="application/json",
)

print("OK: Gemini model configured successfully!")
