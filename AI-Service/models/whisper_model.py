from faster_whisper import WhisperModel

_model = None


def get_whisper_model() -> WhisperModel:
    """
    Lazy-load Whisper model on first use.
    This avoids blocking server startup and saves memory
    on cold starts (important for free cloud tiers).
    """
    global _model

    if _model is None:
        print("⏳ Loading Faster-Whisper model (first request)...")

        _model = WhisperModel(
            "base",
            device="cpu",
            compute_type="int8"
        )

        print("✅ Whisper model loaded successfully!")

    return _model