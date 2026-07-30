import json

from models.ollama_model import client
from prompts.clip_prompt import SYSTEM_PROMPT


def analyze_transcript(segments):

    transcript = ""

    for segment in segments:
        transcript += (
            f"Start: {segment.start}\n"
            f"End: {segment.end}\n"
            f"Text: {segment.text}\n\n"
        )

    response = client.chat(
        model="qwen3",
        format="json",
        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT
            },
            {
                "role": "user",
                "content": transcript
            }
        ]
    )

    return json.loads(response["message"]["content"])