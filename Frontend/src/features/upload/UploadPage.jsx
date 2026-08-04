import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload, FileVideo, X, CheckCircle,
  Play, Clock, Zap, ArrowRight, Check,
  SlidersHorizontal, Award, Sparkles
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { cn } from "../../lib/utils";
import { aiService } from "../../services/ai.service";

const SUPPORTED_FORMATS = ["MP4", "MOV", "AVI", "MKV", "WebM", "FLV"];

const recentUploads = [
  { name: "Alex Hormozi — $100M Offers Deep Dive.mp4", channel: "Acquisition.com", score: 96, duration: "1:42:15", date: "2h ago" },
  { name: "Y Combinator — How to Pitch in 2026.mov", channel: "Y Combinator", score: 94, duration: "0:45:10", date: "1d ago" },
  { name: "Joe Rogan AI & Robotics Debate.mp4", channel: "PowerfulJRE", score: 91, duration: "2:15:30", date: "3d ago" },
];

function LiveConversionPipeline() {
  const [step, setStep] = useState(0);
  const steps = [
    { label: "1. Transcribing Audio", desc: "Whisper AI voice recognition & timestamps" },
    { label: "2. Detecting Highlights", desc: "Scoring viral hooks & audience retention" },
    { label: "3. Rendering 9:16 Shorts", desc: "Auto-framing & dynamic animated captions" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % steps.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-[#121214] border border-white/10 shadow-lg mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D4FF3F] animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#A1A1A6] font-mono">
            AI Conversion Pipeline in Motion
          </span>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-[#1A1E18] border border-[#D4FF3F]/30 text-xs font-semibold text-[#D4FF3F]">
          10x Faster than Manual Editing
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((s, idx) => {
          const active = idx === step;
          const completed = idx < step;
          return (
            <motion.div
              key={s.label}
              className={cn(
                "p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between",
                active
                  ? "bg-[#D4FF3F]/[0.05] border-[#D4FF3F]/60 shadow-sm"
                  : completed
                  ? "bg-[#18181C] border-white/10 opacity-80"
                  : "bg-[#121214] border-white/10"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={cn(
                  "text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md font-mono",
                  active
                    ? "bg-[#D4FF3F] text-[#0A0A0B]"
                    : completed
                    ? "bg-white/20 text-white"
                    : "bg-white/5 text-[#A1A1A6]"
                )}>
                  {active ? "Active" : completed ? "Done" : "Waiting"}
                </span>
                {completed ? (
                  <Check size={16} className="text-[#D4FF3F]" />
                ) : active ? (
                  <Sparkles size={16} className="text-[#D4FF3F] animate-spin" style={{ animationDuration: "3s" }} />
                ) : null}
              </div>
              <div>
                <h4 className={cn(
                  "text-sm font-bold",
                  active ? "text-[#D4FF3F]" : "text-[#F5F5F5]"
                )}>
                  {s.label}
                </h4>
                <p className="text-xs text-[#A1A1A6] mt-1">{s.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function DropZone({ onFile, uploading, progress }) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      onFile(droppedFile);
    }
  }, [onFile]);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFile(selectedFile);
    }
  };

  const clearFile = () => {
    setFile(null);
  };

  return (
    <div
      className={cn(
        "relative rounded-2xl border-2 border-dashed transition-all duration-200 overflow-hidden bg-[#121214]",
        dragging
          ? "border-[#D4FF3F] bg-[#D4FF3F]/[0.05]"
          : file
          ? "border-white/30 bg-[#18181C]"
          : "border-white/10 hover:border-white/20 hover:bg-[#18181C]"
      )}
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <input
        id="file-upload"
        type="file"
        accept="video/*"
        className="absolute inset-0 opacity-0 cursor-pointer z-10"
        onChange={handleChange}
        disabled={uploading}
        aria-label="Upload video file"
      />

      <div className="flex flex-col items-center justify-center py-16 px-8 text-center relative z-0">
        {uploading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full border-4 border-white/10 border-t-[#D4FF3F] animate-spin" />
            <div>
              <p className="text-[#F5F5F5] font-semibold">Uploading & Processing ({progress}%)...</p>
              <p className="text-xs text-[#A1A1A6] mt-1">{file?.name}</p>
            </div>
          </div>
        ) : file ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <CheckCircle size={24} className="text-[#D4FF3F]" />
            </div>
            <div>
              <p className="text-[#F5F5F5] font-semibold">{file.name}</p>
              <p className="text-xs text-[#A1A1A6]">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
            </div>
            <button
              onClick={clearFile}
              className="text-xs text-[#A1A1A6] hover:text-red-400 transition-colors flex items-center gap-1 mt-1"
            >
              <X size={12} /> Remove file
            </button>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
              <Upload size={22} className="text-[#D4FF3F]" />
            </div>
            <h3 className="text-base font-semibold text-[#F5F5F5] mb-1">
              {dragging ? "Drop to upload" : "Drag & drop your video"}
            </h3>
            <p className="text-sm text-[#A1A1A6] mb-4">or click anywhere to browse local filesystem</p>
            <div className="flex flex-wrap justify-center gap-2">
              {SUPPORTED_FORMATS.map(fmt => (
                <span key={fmt} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-semibold text-[#A1A1A6] font-mono">
                  {fmt}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function UploadPage() {
  const [tab, setTab] = useState("url");
  const [youtubeUrl, setYoutubeUrl] = useState("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(null);

  // Clip configuration options
  const [numClips, setNumClips] = useState(6);
  const [clipFormat, setClipFormat] = useState("9:16");
  const [autoCaptions, setAutoCaptions] = useState(true);
  const [viralBoost, setViralBoost] = useState(true);
  const [minDuration, setMinDuration] = useState("30s");

  const navigate = useNavigate();

  const handleFile = (f) => setFile(f);

  const handleUpload = async () => {
    setUploading(true);
    for (let i = 0; i <= 100; i += 5) {
      await new Promise(r => setTimeout(r, 60));
      setProgress(i);
    }
    await new Promise(r => setTimeout(r, 400));
    navigate("/processing/demo-job-id");
  };

  const handleYouTubeSubmit = async () => {
    if (!youtubeUrl) return;
    setUploading(true);

    try {
      const result = await aiService.submitUrlForClipping({
        url: youtubeUrl,
        numClips,
        clipFormat,
        autoCaptions,
        viralBoost,
        minDuration,
      });

      setUploading(false);
      navigate(`/processing/${result.jobId}`);
    } catch (err) {
      console.error("Backend API fallback mode triggered:", err);
      setUploading(false);
      navigate("/processing/demo-job-id");
    }
  };

  const isValidYouTubeUrl = youtubeUrl.includes("youtube.com") || youtubeUrl.includes("youtu.be");

  const sampleLinks = [
    { title: "Alex Hormozi — $100M Offers", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: "1:42:15" },
    { title: "Joe Rogan AI & Robotics Debate", url: "https://www.youtube.com/watch?v=eBGIQ7ZuuiU", duration: "2:15:30" },
    { title: "Y Combinator Startup Demo", url: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", duration: "0:45:10" },
  ];

  return (
    <div className="max-w-[1040px] mx-auto space-y-10 pb-16 pt-6 text-[#F5F5F5]">
      {/* Editorial Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121214] border border-white/10 text-[#F5F5F5] text-xs font-semibold font-mono">
          <Sparkles size={13} className="text-[#D4FF3F]" /> AI Video Clipper & Virality Prediction
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#F5F5F5] tracking-tight">
          Turn long videos into viral shorts in seconds.
        </h1>
        <p className="text-[#A1A1A6] text-lg max-w-2xl">
          Paste a YouTube URL or upload an audio/video file. Shortify analyzes retention signals, cuts viral clips, and applies dynamic captions automatically.
        </p>
      </div>

      {/* Live pipeline visual */}
      <LiveConversionPipeline />

      {/* Main SaaS Card */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#121214] border border-white/10 shadow-xl space-y-6">
        {/* Tab Switcher */}
        <div className="flex rounded-xl p-1 bg-[#1A1A1E] border border-white/10">
          <button
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all",
              tab === "url"
                ? "bg-[#242429] text-[#F5F5F5] shadow-sm border border-white/10"
                : "text-[#A1A1A6] hover:text-[#F5F5F5]"
            )}
            onClick={() => setTab("url")}
            aria-selected={tab === "url"}
          >
            <Play size={15} className="text-[#D4FF3F]" /> YouTube Link (Instant Fetch)
          </button>
          <button
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all",
              tab === "file"
                ? "bg-[#242429] text-[#F5F5F5] shadow-sm border border-white/10"
                : "text-[#A1A1A6] hover:text-[#F5F5F5]"
            )}
            onClick={() => setTab("file")}
            aria-selected={tab === "file"}
          >
            <FileVideo size={15} className="text-[#D4FF3F]" /> Upload Video File
          </button>
        </div>

        <AnimatePresence mode="wait">
          {tab === "url" ? (
            <motion.div
              key="url"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Clean Editorial YouTube URL Input Bar */}
              <div className="p-2 md:p-3 bg-[#18181C] rounded-2xl border border-white/10 shadow-sm flex flex-col sm:flex-row items-center gap-3">
                <div className="flex items-center gap-3 w-full sm:w-auto flex-1 pl-2">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Play size={16} className="text-[#D4FF3F] fill-[#D4FF3F]" />
                  </div>
                  <input
                    id="youtube-url-hero"
                    type="url"
                    placeholder="Paste any YouTube video URL (e.g. https://youtube.com/watch?v=...)"
                    value={youtubeUrl}
                    onChange={e => setYoutubeUrl(e.target.value)}
                    className="w-full bg-transparent border-0 text-[#F5F5F5] placeholder:text-[#A1A1A6] text-sm md:text-base focus:outline-none pr-4 font-mono"
                  />
                </div>
                <Button
                  size="lg"
                  className="btn-accent w-full sm:w-auto px-6 h-12 rounded-xl text-sm font-bold whitespace-nowrap flex items-center gap-2"
                  onClick={handleYouTubeSubmit}
                  loading={uploading}
                  disabled={!isValidYouTubeUrl}
                >
                  <span>Generate Clips</span>
                  <ArrowRight size={16} />
                </Button>
              </div>

              {/* Quick test sample links */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-[#A1A1A6] font-semibold">Try sample videos:</span>
                {sampleLinks.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setYoutubeUrl(s.url)}
                    className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-[#F5F5F5] px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 font-mono"
                  >
                    <Play size={10} className="text-[#D4FF3F] fill-[#D4FF3F]" />
                    <span>{s.title}</span>
                    <span className="text-[#A1A1A6]">({s.duration})</span>
                  </button>
                ))}
              </div>

              {/* YouTube Video Preview Card */}
              {youtubeUrl && isValidYouTubeUrl && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative w-full sm:w-40 h-24 rounded-lg bg-black/40 overflow-hidden flex-shrink-0 flex items-center justify-center border border-white/10">
                    <div className="w-10 h-10 rounded-full bg-[#D4FF3F] text-[#0A0A0B] flex items-center justify-center">
                      <Play size={16} className="fill-[#0A0A0B] ml-0.5" />
                    </div>
                    <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold">
                      1:42:15
                    </span>
                  </div>
                  <div className="flex-1 space-y-1 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1A1E18] border border-[#D4FF3F]/30 text-[#D4FF3F] text-xs font-semibold font-mono">
                      <CheckCircle size={12} className="text-[#D4FF3F]" /> Ready for AI Extraction
                    </div>
                    <h4 className="text-base font-bold text-[#F5F5F5] leading-snug">
                      Alex Hormozi — How to Build a $100M Business in 2026
                    </h4>
                    <p className="text-xs text-[#A1A1A6]">
                      Acquisition.com · 1.4M views · High Auto-Caption Accuracy
                    </p>
                  </div>
                </div>
              )}

              {/* Clip Parameters Config */}
              <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#F5F5F5] flex items-center gap-2 font-mono">
                    <SlidersHorizontal size={15} className="text-[#D4FF3F]" />
                    AI Clip Generation Settings
                  </h4>
                  <span className="text-xs text-[#A1A1A6] font-medium">Customizable pipeline</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-[#A1A1A6] font-semibold uppercase tracking-wider font-mono">Target Clips</label>
                    <select
                      value={numClips}
                      onChange={e => setNumClips(Number(e.target.value))}
                      className="w-full h-10 bg-[#121214] border border-white/10 rounded-lg px-3 text-sm text-[#F5F5F5] font-medium focus:outline-none focus:border-[#D4FF3F]"
                    >
                      <option value={3}>3 Viral Clips</option>
                      <option value={6}>6 Viral Clips (Recommended)</option>
                      <option value={10}>10 Viral Clips</option>
                      <option value={15}>15 Viral Clips</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-[#A1A1A6] font-semibold uppercase tracking-wider font-mono">Aspect Ratio</label>
                    <select
                      value={clipFormat}
                      onChange={e => setClipFormat(e.target.value)}
                      className="w-full h-10 bg-[#121214] border border-white/10 rounded-lg px-3 text-sm text-[#F5F5F5] font-medium focus:outline-none focus:border-[#D4FF3F]"
                    >
                      <option value="9:16">9:16 Vertical (Shorts/TikTok/Reels)</option>
                      <option value="1:1">1:1 Square (Instagram Feed)</option>
                      <option value="16:9">16:9 Horizontal (YouTube)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-[#A1A1A6] font-semibold uppercase tracking-wider font-mono">Clip Length</label>
                    <select
                      value={minDuration}
                      onChange={e => setMinDuration(e.target.value)}
                      className="w-full h-10 bg-[#121214] border border-white/10 rounded-lg px-3 text-sm text-[#F5F5F5] font-medium focus:outline-none focus:border-[#D4FF3F]"
                    >
                      <option value="30s">30 - 60 seconds</option>
                      <option value="45s">45 - 90 seconds</option>
                      <option value="60s">60 - 120 seconds</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-[#A1A1A6] font-semibold uppercase tracking-wider font-mono">Auto Captions</label>
                    <button
                      type="button"
                      onClick={() => setAutoCaptions(!autoCaptions)}
                      className={cn(
                        "w-full h-10 px-3 rounded-lg border text-xs font-semibold transition-all flex items-center justify-between",
                        autoCaptions
                          ? "bg-[#D4FF3F] border-[#D4FF3F] text-[#0A0A0B] font-extrabold"
                          : "bg-[#121214] border-white/10 text-[#A1A1A6]"
                      )}
                    >
                      <span>AI Dynamic Captions</span>
                      <span className="font-bold">{autoCaptions ? "ON" : "OFF"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="file"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <DropZone onFile={handleFile} uploading={uploading} progress={progress} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Generate CTA for File tab */}
        {tab === "file" && (
          <div className="pt-2">
            <Button
              size="lg"
              className="btn-accent w-full h-12 text-base font-bold rounded-xl flex items-center justify-center gap-2"
              onClick={handleUpload}
              loading={uploading}
              disabled={!file}
              icon={<Zap size={18} />}
            >
              {uploading ? "Extracting Viral Clips..." : "Upload File & Extract Viral Shorts"}
            </Button>
          </div>
        )}
      </div>

      {/* Feature Value Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "AI Transcript Analysis",
            desc: "Identifies emotional spikes, punchlines, and high-retention hooks automatically.",
            icon: Sparkles,
          },
          {
            title: "Viral Score Prediction",
            desc: "Every generated short receives an AI score estimating its viral likelihood 0–100.",
            icon: Award,
          },
          {
            title: "Smart Framing & Crop",
            desc: "Keeps speakers centered in 9:16 vertical video without awkward panning.",
            icon: SlidersHorizontal,
          },
        ].map(card => (
          <div
            key={card.title}
            className="p-6 rounded-2xl bg-[#121214] border border-white/10 space-y-2 shadow-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4FF3F] mb-3">
              <card.icon size={18} />
            </div>
            <h3 className="text-base font-bold text-[#F5F5F5]">{card.title}</h3>
            <p className="text-sm text-[#A1A1A6] leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#121214] border border-white/10 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-[#F5F5F5]">Recent Clips</h2>
            <p className="text-xs text-[#A1A1A6]">Projects ready for preview and 1080p download</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#1A1E18] border border-[#D4FF3F]/30 text-xs font-semibold text-[#D4FF3F]">
            3 Projects Ready
          </span>
        </div>
        <div className="space-y-3">
          {recentUploads.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-[#D4FF3F] flex-shrink-0">
                  <Play size={16} className="fill-[#D4FF3F]" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#F5F5F5] truncate">{item.name}</p>
                  <p className="text-xs text-[#A1A1A6] font-mono">
                    {item.channel} · {item.duration} · {item.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="text-right hidden sm:block">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#D4FF3F] px-2.5 py-1 rounded bg-[#1A1E18] border border-[#D4FF3F]/30 font-mono">
                    <Award size={13} className="text-[#D4FF3F]" /> Score {item.score}/100
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  className="border-white/10 text-white hover:bg-white/10"
                  onClick={() => navigate("/results/demo-job-id")}
                >
                  View Clips
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
