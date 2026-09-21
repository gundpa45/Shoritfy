import json
import time

from models.gemini_model import client, config
from prompts.clip_prompt import SYSTEM_PROMPT


def analyze_transcript(segments):
    """
    Analyze transcript segments using Google Gemini to find viral moments.
    """
    # Build transcript efficiently
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

    # Combine system prompt and user transcript into a single prompt
    full_prompt = f"{SYSTEM_PROMPT}\n\nHere is the transcript:\n\n{transcript}"

    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=full_prompt,
        config=config,
    )

    end_time = time.perf_counter()
    print(f"Gemini Time: {end_time - start_time:.2f} sec")

    content = response.text

    print("=" * 60)
    print("JSON Returned By Gemini")
    print("=" * 60)
    print(content)
    print("=" * 60)

    try:
        return json.loads(content)
    except json.JSONDecodeError:
        raise Exception(
            "Gemini returned invalid JSON.\n\n" + content
        )