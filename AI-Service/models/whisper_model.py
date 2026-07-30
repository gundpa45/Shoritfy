from faster_whisper import WhisperModel

print("Loading Faster-Whisper model...")

model = WhisperModel(
    "base",
    device="cpu",
    compute_type="int8"
)

print("Whisper model loaded successfully!")