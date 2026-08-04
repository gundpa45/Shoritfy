import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  ArrowRight,
  Sparkles,
  CheckCircle,
  SlidersHorizontal,
  Award,
  Clock,
  Video,
  ExternalLink,
  Clipboard,
  Zap,
  ShieldCheck,
  BarChart3,
  Loader2,
  X,
  Share2,
  Download,
  Terminal,
  Activity,
  Layers,
  Cpu
} from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Badge, ScoreBadge } from "../../../components/ui/Badge";
import { cn, formatDuration } from "../../../lib/utils";
import { aiService } from "../../../services/ai.service";

const SAMPLE_YOUTUBE_VIDEOS = [
  {
    id: "hormozi",
    title: "Alex Hormozi — How to Build a $100M Business in 2026",
    channel: "Acquisition.com",
    duration: "1:42:15",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    views: "1.4M views",
    predictedScore: 98,
    badge: "98/100 VIRAL HOOK",
    peaks: ["00:14 — Opening Pattern Interrupt", "00:48 — The $100M Offer Formula", "01:22 — Contrarian Business Rule"],
  },
  {
    id: "yc",
    title: "Y Combinator — The Secret to Pitching Investors in 2026",
    channel: "Y Combinator",
    duration: "0:45:10",
    url: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
    views: "680K views",
    predictedScore: 94,
    badge: "94/100 RETENTION",
    peaks: ["00:08 — What Investors Look For", "00:25 — Biggest Pitch Deck Mistake", "00:39 — Traction vs Idea"],
  },
  {
    id: "rogan",
    title: "Joe Rogan — AI, Humanoid Robotics & The Future of Work",
    channel: "PowerfulJRE",
    duration: "2:15:30",
    url: "https://www.youtube.com/watch?v=eBGIQ7ZuuiU",
    views: "3.2M views",
    predictedScore: 96,
    badge: "96/100 VIRAL HOOK",
    peaks: ["00:19 — When AGI Surpasses Humans", "01:05 — Robotics in Everyday Life", "01:58 — The Post-Scarcity Economy"],
  },
  {
    id: "lex",
    title: "Lex Fridman — Deep Learning & AGI Frontiers",
    channel: "Lex Fridman",
    duration: "3:12:00",
    url: "https://www.youtube.com/watch?v=L_Guz73e6fw",
    views: "1.8M views",
    predictedScore: 92,
    badge: "92/100 HOOK",
    peaks: ["00:32 — Transformer Architecture Breakthrough", "01:45 — Consciousness & Neural Nets", "02:50 — Future of Code"],
  },
];

function NordcraftStudioHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#0A0A0B]/95 backdrop-blur-md">
      <div className="w-full max-w-[1700px] mx-auto px-6 sm:px-12 lg:px-20 h-20 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="w-3 h-3 rounded-full bg-[#D4FF3F] group-hover:scale-125 transition-transform shadow-[0_0_12px_rgba(212,255,63,0.8)]" />
            <span className="text-lg font-extrabold tracking-tight text-[#F5F5F5] font-mono">
              Shortify <span className="text-[#A1A1A6] font-normal">// AI STUDIO</span>
            </span>
          </Link>
          <span className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121214] border border-white/10 text-xs font-mono text-[#D4FF3F] shadow-[0_0_15px_rgba(212,255,63,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#D4FF3F] animate-pulse" />
            SYS: ONLINE // YOUTUBE-PIPELINE
          </span>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm text-[#A1A1A6] hover:text-[#F5F5F5] font-mono transition-colors hidden sm:block">
            01 // Landing
          </Link>
          <Link to="/upload" className="text-sm text-[#A1A1A6] hover:text-[#F5F5F5] font-mono transition-colors hidden sm:block">
            02 // Batch Upload
          </Link>
          <Link to="/dashboard">
            <Button size="md" variant="secondary" className="border-white/10 text-xs font-mono px-5 h-10">
              Creator Dashboard →
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

function AudioRetentionWaveform({ peaks }) {
  const bars = [35, 65, 95, 45, 30, 85, 98, 70, 40, 60, 92, 55, 30, 88, 96, 50, 40, 75, 91, 65, 80, 94, 60, 35, 90, 85, 50, 95, 70, 40];

  return (
    <div className="w-full p-6 rounded-2xl bg-[#0F0F12] border border-white/[0.08] flex flex-col justify-between space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
        <span className="text-[#A1A1A6] flex items-center gap-2">
          <Activity size={15} className="text-[#D4FF3F]" />
          <span>AI RETENTION HEATMAP & HOOK DETECTION (30-CHANNEL SPECTRUM)</span>
        </span>
        <span className="text-[#D4FF3F] font-bold">● HIGH-ENGAGEMENT RETENTION PEAKS DETECTED</span>
      </div>

      {/* Full widescreen Waveform Bars */}
      <div className="h-28 flex items-end justify-between gap-1.5 pt-4 px-1">
        {bars.map((height, i) => {
          const isPeak = height >= 90;
          return (
            <div
              key={i}
              className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end"
            >
              <div
                className={cn(
                  "w-full rounded-t transition-all duration-500",
                  isPeak
                    ? "bg-[#D4FF3F] shadow-[0_0_16px_rgba(212,255,63,0.6)]"
                    : "bg-white/15 hover:bg-white/35"
                )}
                style={{ height: `${height}%` }}
              />
            </div>
          );
        })}
      </div>

      {/* Detected Peak Timestamps */}
      {peaks && (
        <div className="pt-3 border-t border-white/[0.08] flex flex-wrap items-center gap-2.5">
          <span className="text-xs font-mono text-[#A1A1A6] uppercase font-bold">Top Hook Windows:</span>
          {peaks.map((p, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-lg bg-[#1A1E18] border border-[#D4FF3F]/30 text-xs font-mono text-[#D4FF3F] font-semibold"
            >
              ✦ {p}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function UrlPage() {
  const [urlInput, setUrlInput] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // AI Pipeline customization settings
  const [numClips, setNumClips] = useState(6);
  const [clipFormat, setClipFormat] = useState("9:16");
  const [minDuration, setMinDuration] = useState("30s");
  const [autoCaptions, setAutoCaptions] = useState(true);
  const [viralBoost, setViralBoost] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const navigate = useNavigate();

  const handleUrlChange = (val) => {
    setUrlInput(val);
    const matched = SAMPLE_YOUTUBE_VIDEOS.find(
      (v) => v.url.toLowerCase() === val.toLowerCase() || val.includes(v.id)
    );
    setSelectedVideo(matched || null);
  };

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        handleUrlChange(text);
      }
    } catch (err) {
      console.warn("Clipboard access denied or empty", err);
    }
  };

  const handleSampleClick = (video) => {
    setUrlInput(video.url);
    setSelectedVideo(video);
  };

  const handleGenerateClips = async (e) => {
    if (e) e.preventDefault();
    if (!urlInput.trim()) return;

    setIsProcessing(true);

    try {
      const result = await aiService.submitUrlForClipping({
        url: urlInput.trim(),
        numClips,
        clipFormat,
        autoCaptions,
        viralBoost,
        minDuration,
      });

      setIsProcessing(false);
      navigate(`/processing/${result.jobId}`);
    } catch (err) {
      console.error("URL processing fallback error:", err);
      setIsProcessing(false);
      navigate("/processing/demo-job-id");
    }
  };

  const isValidUrl =
    urlInput.includes("youtube.com") ||
    urlInput.includes("youtu.be") ||
    urlInput.includes("twitch.tv") ||
    urlInput.length > 8;

  return (
    <div className="min-h-screen w-full bg-[#0A0A0B] text-[#F5F5F5] selection:bg-[#D4FF3F] selection:text-[#0A0A0B] overflow-x-hidden flex flex-col">
      {/* Top Edge-to-Edge Nordcraft Studio Header */}
      <NordcraftStudioHeader />

      {/* Background radial glow */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[1400px] h-[600px] hero-radial-glow pointer-events-none opacity-80" />
      <div className="absolute inset-0 noise-bg pointer-events-none opacity-50" />

      {/* Full Widescreen Edge-to-Edge Container */}
      <main className="relative z-10 w-full max-w-[1700px] mx-auto px-6 sm:px-12 lg:px-20 py-12 sm:py-16 flex-1">
        {/* Top Technical Badge */}
        <div className="flex justify-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#121214] border border-white/10 text-xs font-mono font-bold text-[#D4FF3F] shadow-[0_0_24px_rgba(212,255,63,0.2)]"
          >
            <Sparkles size={15} className="text-[#D4FF3F]" />
            <span>NORDCRAFT // WIDESCREEN YOUTUBE AI CLIPPING PROTOCOL</span>
          </motion.div>
        </div>

        {/* Cinematic Headline */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F5F5F5] leading-[1.08] mb-5"
          >
            Paste any YouTube link. <br />
            <span className="text-[#D4FF3F]">Get viral shorts</span> in seconds.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-xl text-[#A1A1A6] max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Our AI agent scans retention curves across 30 audio channels, isolates high-engagement hooks, auto-reframes to 9:16 vertical, and animates subtitles automatically.
          </motion.p>
        </div>

        {/* =========================================================
            FULL-WIDTH YOUTUBE URL CONSOLE INPUT CARD
           ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="w-full bg-[#121214] border border-white/[0.14] rounded-2xl p-6 sm:p-8 shadow-[0_24px_70px_rgba(0,0,0,0.85)] mb-10 transition-all duration-300 hover:border-white/25"
        >
          <form onSubmit={handleGenerateClips} className="space-y-6">
            {/* Input Row */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative flex-1 w-full bg-[#18181C] border border-white/10 rounded-xl px-5 py-4 flex items-center gap-4 focus-within:border-[#D4FF3F]/80 transition-all">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Play size={18} className="text-[#D4FF3F] fill-[#D4FF3F]" />
                </div>
                <input
                  id="youtube-url-page-input"
                  type="text"
                  value={urlInput}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  placeholder="Paste YouTube video link (e.g. https://www.youtube.com/watch?v=...)"
                  className="w-full bg-transparent border-none text-[#F5F5F5] placeholder:text-[#A1A1A6] text-base sm:text-lg focus:outline-none font-mono"
                  disabled={isProcessing}
                  autoFocus
                />
                {urlInput && (
                  <button
                    type="button"
                    onClick={() => {
                      setUrlInput("");
                      setSelectedVideo(null);
                    }}
                    className="p-1.5 rounded-md text-[#A1A1A6] hover:text-white transition-colors"
                    aria-label="Clear URL"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* Paste Button (Desktop) */}
              <button
                type="button"
                onClick={handlePasteFromClipboard}
                className="hidden sm:inline-flex items-center gap-2.5 px-6 h-14 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold text-[#F5F5F5] transition-all font-mono whitespace-nowrap"
              >
                <Clipboard size={16} className="text-[#D4FF3F]" />
                <span>Paste</span>
              </button>

              {/* Primary Submit CTA */}
              <Button
                type="submit"
                disabled={!isValidUrl || isProcessing}
                className="btn-accent w-full sm:w-auto px-10 h-14 text-base font-bold rounded-xl flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(212,255,63,0.35)] whitespace-nowrap"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={18} className="animate-spin text-[#0A0A0B]" />
                    <span>Extracting...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Shorts</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </Button>
            </div>

            {/* Quick Test Sample Video Links Row (Full Widescreen Layout) */}
            <div className="pt-4 border-t border-white/[0.08]">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs text-[#A1A1A6] font-mono uppercase tracking-widest mr-2 font-bold">
                  TRY SAMPLE URL:
                </span>
                {SAMPLE_YOUTUBE_VIDEOS.map((video) => {
                  const isSelected = selectedVideo?.id === video.id;
                  return (
                    <button
                      key={video.id}
                      type="button"
                      onClick={() => handleSampleClick(video)}
                      className={cn(
                        "px-4 py-2.5 rounded-xl border text-xs font-mono transition-all flex items-center gap-2",
                        isSelected
                          ? "bg-[#D4FF3F] border-[#D4FF3F] text-[#0A0A0B] font-bold shadow-md scale-[1.02]"
                          : "bg-white/5 border-white/10 text-[#F5F5F5] hover:border-white/30 hover:bg-white/10"
                      )}
                    >
                      <Play
                        size={12}
                        className={cn(
                          "flex-shrink-0",
                          isSelected ? "fill-[#0A0A0B] text-[#0A0A0B]" : "fill-[#D4FF3F] text-[#D4FF3F]"
                        )}
                      />
                      <span className="truncate max-w-[240px]">{video.title}</span>
                      <span
                        className={cn(
                          "text-[11px] px-2 py-0.5 rounded font-semibold",
                          isSelected ? "bg-black/20 text-[#0A0A0B]" : "bg-black/40 text-[#D4FF3F]"
                        )}
                      >
                        {video.duration}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </form>
        </motion.div>

        {/* =========================================================
            LIVE VIDEO METADATA & RETENTION HEATMAP (WIDESCREEN 12-COL)
           ========================================================= */}
        <AnimatePresence mode="wait">
          {(selectedVideo || isValidUrl) && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12"
            >
              {/* Left Column: Video Metadata Preview */}
              <div className="lg:col-span-5 bg-[#121214] border border-[#D4FF3F]/30 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-6">
                <div className="flex items-start gap-4">
                  <div className="relative w-36 aspect-video rounded-xl bg-black/60 border border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#D4FF3F] text-[#0A0A0B] flex items-center justify-center shadow-lg">
                      <Play size={20} className="fill-[#0A0A0B] ml-0.5" />
                    </div>
                    <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded font-mono font-bold">
                      {selectedVideo?.duration || "1:42:15"}
                    </span>
                  </div>

                  <div className="space-y-2 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#1A1E18] border border-[#D4FF3F]/30 text-[#D4FF3F] text-xs font-mono font-semibold">
                        <CheckCircle size={12} /> AI Pipeline Ready
                      </span>
                      <span className="text-xs text-[#A1A1A6] font-mono">
                        {selectedVideo?.channel || "YouTube Creator"}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white truncate">
                      {selectedVideo?.title || urlInput}
                    </h3>

                    <p className="text-xs text-[#A1A1A6] font-mono">
                      {selectedVideo?.views || "High Quality 4K/60FPS Stream"}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-[#A1A1A6] uppercase font-mono block">AI Hook Prediction</span>
                    <span className="text-sm font-mono text-[#D4FF3F] font-bold">
                      {selectedVideo?.badge || "95/100 VIRAL HOOK"}
                    </span>
                  </div>
                  <Button
                    onClick={handleGenerateClips}
                    disabled={isProcessing}
                    className="btn-accent px-6 py-3.5 text-xs font-bold rounded-xl flex items-center justify-center gap-2"
                  >
                    <span>Extract Shorts Now</span>
                    <ArrowRight size={15} />
                  </Button>
                </div>
              </div>

              {/* Right Column: Widescreen Audio Retention Heatmap */}
              <div className="lg:col-span-7 flex">
                <AudioRetentionWaveform peaks={selectedVideo?.peaks} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =========================================================
            AI PIPELINE CUSTOMIZATION SETTINGS DRAWER (WIDESCREEN 4-COL)
           ========================================================= */}
        <div className="w-full bg-[#121214] border border-white/10 rounded-2xl p-8 shadow-xl mb-14">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4FF3F]">
                <SlidersHorizontal size={18} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#F5F5F5]">
                  AI Clip Generation Settings
                </h3>
                <p className="text-sm text-[#A1A1A6] font-mono">
                  Configure output format, hook sensitivity, and animated subtitles
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs font-mono text-[#D4FF3F] hover:underline flex items-center gap-1.5"
            >
              <span>{showAdvanced ? "Hide Advanced Options" : "Show Advanced Options"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Target Clips */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#A1A1A6] uppercase tracking-wider font-mono">
                Clips to Extract
              </label>
              <select
                value={numClips}
                onChange={(e) => setNumClips(Number(e.target.value))}
                className="w-full h-12 bg-[#18181C] border border-white/10 rounded-xl px-4 text-sm text-white font-medium focus:outline-none focus:border-[#D4FF3F]"
              >
                <option value={3}>3 Top Viral Clips</option>
                <option value={6}>6 Viral Clips (Recommended)</option>
                <option value={10}>10 Viral Clips</option>
                <option value={15}>15 Complete Package</option>
              </select>
            </div>

            {/* Aspect Ratio */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#A1A1A6] uppercase tracking-wider font-mono">
                Aspect Ratio
              </label>
              <select
                value={clipFormat}
                onChange={(e) => setClipFormat(e.target.value)}
                className="w-full h-12 bg-[#18181C] border border-white/10 rounded-xl px-4 text-sm text-white font-medium focus:outline-none focus:border-[#D4FF3F]"
              >
                <option value="9:16">9:16 Vertical (Shorts/TikTok/Reels)</option>
                <option value="1:1">1:1 Square (Instagram Feed)</option>
                <option value="16:9">16:9 Horizontal (YouTube Clip)</option>
              </select>
            </div>

            {/* Clip Length */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#A1A1A6] uppercase tracking-wider font-mono">
                Target Clip Length
              </label>
              <select
                value={minDuration}
                onChange={(e) => setMinDuration(e.target.value)}
                className="w-full h-12 bg-[#18181C] border border-white/10 rounded-xl px-4 text-sm text-white font-medium focus:outline-none focus:border-[#D4FF3F]"
              >
                <option value="30s">30 - 60 seconds (Shortest)</option>
                <option value="45s">45 - 90 seconds (Optimal Hook)</option>
                <option value="60s">60 - 120 seconds (In-Depth)</option>
              </select>
            </div>

            {/* AI Auto-Captions Toggle */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#A1A1A6] uppercase tracking-wider font-mono">
                AI Dynamic Captions
              </label>
              <button
                type="button"
                onClick={() => setAutoCaptions(!autoCaptions)}
                className={cn(
                  "w-full h-12 px-5 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between",
                  autoCaptions
                    ? "bg-[#D4FF3F] border-[#D4FF3F] text-[#0A0A0B] font-extrabold shadow-sm"
                    : "bg-[#18181C] border-white/10 text-[#A1A1A6]"
                )}
              >
                <span>Animated Subtitles</span>
                <span className="font-mono">{autoCaptions ? "ON" : "OFF"}</span>
              </button>
            </div>
          </div>

          {/* Advanced row */}
          {showAdvanced && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#18181C] border border-white/10">
                <div>
                  <p className="text-sm font-bold text-white">Viral Hook Enhancement</p>
                  <p className="text-xs text-[#A1A1A6]">
                    Prioritizes clips with strong opening sentences and high audio energy
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setViralBoost(!viralBoost)}
                  className={cn(
                    "px-4 py-2 rounded-lg font-mono text-xs font-bold transition-colors",
                    viralBoost
                      ? "bg-[#D4FF3F] text-[#0A0A0B]"
                      : "bg-white/10 text-[#A1A1A6]"
                  )}
                >
                  {viralBoost ? "ENABLED" : "DISABLED"}
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-[#18181C] border border-white/10">
                <div>
                  <p className="text-sm font-bold text-white">Speaker Auto-Centering</p>
                  <p className="text-xs text-[#A1A1A6]">
                    AI facial tracking automatically pans 9:16 frame to active speaker
                  </p>
                </div>
                <span className="px-4 py-2 rounded-lg bg-[#D4FF3F]/20 text-[#D4FF3F] font-mono text-xs font-bold">
                  ALWAYS ON
                </span>
              </div>
            </motion.div>
          )}
        </div>

        {/* =========================================================
            HOW SHORTIFY YOUTUBE AI WORKS (WIDESCREEN 3-STEP STRIP)
           ========================================================= */}
        <div className="w-full mb-16">
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-[#A1A1A6] font-bold">
              HOW IT WORKS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F5F5] mt-2">
              From long YouTube video to viral shorts in 3 steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01 // FETCH",
                title: "Paste URL & AI Stream",
                desc: "We stream the audio track directly from YouTube without downloading heavy raw files, transcribing with Whisper AI in seconds.",
                icon: Play,
              },
              {
                step: "02 // DETECT",
                title: "Retention Hook Analysis",
                desc: "Our neural network evaluates topic switches, laughter, applause, and speech cadences to score the highest retention moments (0–100).",
                icon: Award,
              },
              {
                step: "03 // RENDER",
                title: "9:16 Auto-Frame & Subtitles",
                desc: "Clips are dynamically reframed for Shorts, Reels, and TikTok, overlaying customizable word-by-word animated captions.",
                icon: Sparkles,
              },
            ].map((card) => (
              <div
                key={card.step}
                className="relative p-8 rounded-2xl bg-[#121214] border border-white/10 flex flex-col justify-between group hover:border-white/20 transition-all shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-mono font-extrabold text-[#D4FF3F]/80 group-hover:text-[#D4FF3F] transition-colors">
                      {card.step}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4FF3F]">
                      <card.icon size={22} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#F5F5F5] mb-3">{card.title}</h3>
                  <p className="text-sm text-[#A1A1A6] leading-relaxed">{card.desc}</p>
                </div>
                <div className="mt-8 pt-5 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-[#A1A1A6]">
                  <span>AI Automated</span>
                  <span className="text-[#D4FF3F] font-semibold">10x Speed →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================
            BOTTOM CTA BAR (FULL WIDESCREEN BANNER)
           ========================================================= */}
        <div className="w-full p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-[#121214] via-[#161814] to-[#121214] border border-[#D4FF3F]/30 text-center space-y-5 shadow-2xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A1E18] border border-[#D4FF3F]/30 text-[#D4FF3F] text-xs font-mono font-bold">
            <Zap size={14} /> Ready to test with your own video?
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#F5F5F5]">
            Start clipping any YouTube video for free.
          </h2>
          <p className="text-base text-[#A1A1A6] max-w-xl mx-auto">
            No credit card required. Experience the power of AI hook detection and 9:16 vertical auto-framing immediately.
          </p>
          <div className="pt-3">
            <Link to="/upload">
              <Button className="btn-accent px-10 py-5 text-base font-bold rounded-xl shadow-[0_0_30px_rgba(212,255,63,0.35)]">
                Upload File or Batch Process →
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
