import json
import time

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

    # 👇 Debug information
    print("=" * 50)
    print(f"Segments: {len(segments)}")
    print(f"Transcript length: {len(transcript)} characters")
    print("=" * 50)

    start_time = time.time()

    response = client.chat(
        model="qwen3",
        alive="30min",
        format="json",
        options={
        "temperature": 0
                  },
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

    end_time = time.time()

    print(f"Ollama response time: {end_time - start_time:.2f} seconds")

    return json.loads(response["message"]["content"])