# 🎬 Shortify — AI-Powered YouTube Clip Generator

> Turn long YouTube videos into viral short clips — automatically, powered by AI.

![Shortify](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🧩 Architecture

```
Shortify/
├── frontend/        → React + Vite + TailwindCSS (Vercel)
├── Backend/         → Node.js + Express + Prisma (Render)
├── AI-Service/      → Python FastAPI + Whisper + Gemini (Render)
└── temp/            → Shared media storage (runtime only)
```

### How It Works

1. **User** pastes a YouTube URL in the Creator Studio
2. **Backend** downloads the video + audio using `yt-dlp`
3. **AI Service** transcribes with Whisper, finds viral moments with Gemini, cuts clips with FFmpeg
4. **Frontend** displays the results with preview, download, and sharing

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 20+
- Python 3.11+
- FFmpeg installed (`choco install ffmpeg` or `brew install ffmpeg`)
- Google Gemini API key ([Get one free](https://aistudio.google.com/app/apikey))

### 1. Clone & Setup

```bash
git clone https://github.com/YOUR_USERNAME/Shortify.git
cd Shortify
```

### 2. AI Service

```bash
cd AI-Service
python -m venv venv
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate
pip install -r requirements.txt

# Create .env from template
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY

# Run
python app.py
```

### 3. Backend

```bash
cd Backend
npm install
npx prisma generate

# Create .env from template
cp .env.example .env
# Edit .env with your DATABASE_URL and YOUTUBE_API_KEY

# Run
npm run dev
```

### 4. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## ☁️ Deploy for Free ($0/month)

| Service | Platform | Free Tier |
|---------|----------|-----------|
| Frontend | **Vercel** | 100GB bandwidth/mo |
| Backend | **Render** | 750 hrs/mo, 512MB RAM |
| AI Service | **Render** | 750 hrs/mo, 512MB RAM |
| Database | **Neon** | 0.5GB, auto-suspend |
| LLM | **Google Gemini** | 60 RPM, 1M tokens/day |

### Deploy to Render (Backend + AI Service)

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your repo
4. For **Backend**: Root Directory = `Backend`, Build Command = `npm install && npx prisma generate`, Start Command = `npx tsx server.ts`
5. For **AI Service**: Root Directory = `AI-Service`, Build Command = `pip install -r requirements.txt`, Start Command = `uvicorn app:app --host 0.0.0.0 --port $PORT`
6. Add environment variables from `.env.example` files

### Deploy to Vercel (Frontend)

1. Go to [vercel.com](https://vercel.com) → Import Project
2. Select the `frontend` directory as root
3. Add env variable: `VITE_API_URL = https://your-backend.onrender.com`
4. Deploy!

## 🔑 Environment Variables

### AI Service (`AI-Service/.env`)
| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | ✅ | Google Gemini API key |
| `PORT` | ❌ | Server port (default: 8000) |

### Backend (`Backend/.env`)
| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `YOUTUBE_API_KEY` | ✅ | YouTube Data API v3 key |
| `AI_SERVICE_URL` | ✅ | URL of the AI service |
| `FRONTEND_URL` | ✅ | Frontend URL for CORS |
| `PORT` | ❌ | Server port (default: 3200) |

### Frontend (`frontend/.env`)
| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | ✅ | Backend API URL |

## 📄 License

MIT License — use it however you want.
