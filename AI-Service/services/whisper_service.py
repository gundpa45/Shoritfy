from models.whisper_model import model

def generate_transcript(audio_path: str):
    segments, info = model.transcribe(
        audio_path,
        beam_size=5
    )

    transcript = []
    transcript_segments = []

    for segment in segments:
        transcript.append(segment.text.strip())

        transcript_segments.append({
            "start": round(segment.start, 2),
            "end": round(segment.end, 2),
            "text": segment.text.strip()
        })

    return {
        "success": True,
        "language": info.language,
        "language_probability": round(info.language_probability, 4),
        "transcript": " ".join(transcript),
        "segments": transcript_segments
    }