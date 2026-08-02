def compress_transcript(segments, chunk_duration=30):
    """
    Merge Whisper segments into larger chunks.

    Example:
    0-30 sec
    30-60 sec
    60-90 sec
    """

    compressed = []

    if not segments:
        return compressed

    current_chunk = {
        "start": segments[0]["start"],
        "end": segments[0]["end"],
        "text": segments[0]["text"]
    }

    for segment in segments[1:]:

        # If this segment still belongs in the same chunk
        if segment["end"] - current_chunk["start"] <= chunk_duration:

            current_chunk["end"] = segment["end"]

            current_chunk["text"] += " " + segment["text"]

        else:

            compressed.append(current_chunk)

            current_chunk = {
                "start": segment["start"],
                "end": segment["end"],
                "text": segment["text"]
            }

    compressed.append(current_chunk)

    return compressed