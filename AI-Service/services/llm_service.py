import json
import time

from models.ollama_model import client
from prompts.clip_prompt import SYSTEM_PROMPT


def analyze_transcript(segments):
    # -----------------------------
    # Build transcript efficiently
    # -----------------------------
    transcript_lines = []

    for segment in segments:
        transcript_lines.append(
            f"[{segment['start']}-{segment['end']}] {segment['text']}"
        )

    transcript = "\n".join(transcript_lines)

    print("=" * 60)
    print(f"Segments: {len(segments)}")
    print(f"Transcript Length: {len(transcript)} characters")
    print("=" * 60)

    start_time = time.perf_counter()

    response = client.chat(
        model="qwen2.5:7b",

        format="json",

        options={
        "temperature":0,
        "num_predict":256,
        "num_ctx":2048,
        "stop":["<|im_end|>"]
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

    end_time = time.perf_counter()

    print(f"LLM Time: {end_time-start_time:.2f} sec")

    print("=" * 60)
    print("JSON Returned By Ollama")
    print("=" * 60)
    print(response["message"]["content"])
    print("=" * 60)

    content = response["message"]["content"]

    print(content)

    try:
        return json.loads(content)

    except json.JSONDecodeError:
        raise Exception(
            "Ollama returned incomplete JSON.\n\n"
            + content
    )