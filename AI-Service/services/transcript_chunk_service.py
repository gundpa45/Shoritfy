def create_chunks(segments, max_segments=8):
    """
    Split transcript segments into smaller chunks.

    Args:
        segments (list): Whisper transcript segments.
        max_segments (int): Maximum segments per chunk.

    Returns:
        list: List of transcript chunks.
    """

    chunks = []

    for i in range(0, len(segments), max_segments):
        chunk = segments[i:i + max_segments]
        chunks.append(chunk)

    return chunks