FROM node:20-slim

WORKDIR /app

# Install system deps (yt-dlp needs python, ffmpeg for merging)
RUN apt-get update && \
    apt-get install -y --no-install-recommends python3 ffmpeg curl && \
    curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp && \
    chmod a+rx /usr/local/bin/yt-dlp && \
    rm -rf /var/lib/apt/lists/*

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Create temp directories
RUN mkdir -p /app/temp/audio /app/temp/video /app/temp/clips

# Cloud platforms inject PORT
ENV PORT=3200
EXPOSE ${PORT}

# Start the server with tsx
CMD ["npx", "tsx", "server.ts"]
