# ——— Stage 1: Build ———
FROM python:3.11-slim AS builder

WORKDIR /app

# Install system deps (ffmpeg is critical)
RUN apt-get update && \
    apt-get install -y --no-install-recommends ffmpeg && \
    rm -rf /var/lib/apt/lists/*

# Install Python deps
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ——— Stage 2: Runtime ———
FROM python:3.11-slim

WORKDIR /app

# Copy ffmpeg from builder
COPY --from=builder /usr/bin/ffmpeg /usr/bin/ffmpeg
COPY --from=builder /usr/bin/ffprobe /usr/bin/ffprobe
COPY --from=builder /usr/lib/ /usr/lib/

# Copy installed Python packages
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

# Copy application code
COPY . .

# Create temp directories
RUN mkdir -p /app/outputs /tmp/shortify/clips

# Cloud platforms inject PORT via env var
ENV PORT=8000
EXPOSE ${PORT}

# Run with uvicorn — bind 0.0.0.0 for container networking
CMD ["sh", "-c", "uvicorn app:app --host 0.0.0.0 --port ${PORT}"]
