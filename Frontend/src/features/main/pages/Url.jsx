import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { aiService } from "../../../services/ai.service";

import { UrlHeader } from "../components/url/UrlHeader";
import { UrlInputSection } from "../components/url/UrlInputSection";
import { SampleVideoGrid } from "../components/url/SampleVideoGrid";
import { PipelineSettings } from "../components/url/PipelineSettings";
import { AudioRetentionVisualizer } from "../components/url/AudioRetentionVisualizer";
import { ProcessingTriggerBar } from "../components/url/ProcessingTriggerBar";

const SAMPLE_YOUTUBE_VIDEOS = [
  {
    id: "hormozi",
    title: "Alex Hormozi — How to Build a $100M Business in 2026",
    channel: "Acquisition.com",
    duration: "1:42:15",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    views: "1.4M views",
    predictedScore: 98,
    badge: "98/100 HOOK",
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
    badge: "96/100 HOOK",
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

export default function UrlPage() {
  const [urlInput, setUrlInput] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Clipping config state
  const [numClips, setNumClips] = useState(6);
  const [clipFormat, setClipFormat] = useState("9:16");
  const [captionStyle, setCaptionStyle] = useState("hormozi");
  const [minDuration, setMinDuration] = useState("30s");
  const [viralBoost, setViralBoost] = useState(true);

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

  const handleClearUrl = () => {
    setUrlInput("");
    setSelectedVideo(null);
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
        captionStyle,
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
    <div className="min-h-screen w-full bg-[#070709] text-white selection:bg-[#D4FF3F] selection:text-[#070709] overflow-x-hidden flex flex-col grid-mesh-bg relative">
      {/* Studio Header Navigation */}
      <UrlHeader />

      {/* Radial Ambient Glow Overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[550px] hero-radial-glow pointer-events-none opacity-80" />

      {/* Main Studio Container */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12 sm:py-16 flex-1 space-y-12">
        {/* Page Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14141A] border border-white/[0.1] text-xs font-semibold text-[#94949E] shadow-sm">
            <Sparkles size={14} className="text-[#D4FF3F]" />
            <span>AI Short Generator & Clipper</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-white via-white to-neutral-400 bg-clip-text text-transparent">
            Turn Any Long Video Into <span className="text-[#D4FF3F]">Viral Shorts</span>
          </h1>
          <p className="text-base sm:text-lg text-[#94949E] leading-relaxed max-w-2xl mx-auto font-medium">
            Paste any YouTube link or pick a sample track. Our AI transcribes speech, detects viral hook moments, auto-frames speakers, and renders 9:16 Shorts with dynamic captions.
          </p>
        </motion.div>

        {/* URL Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <UrlInputSection
            urlInput={urlInput}
            onUrlChange={handleUrlChange}
            onPaste={handlePasteFromClipboard}
            onClear={handleClearUrl}
            selectedVideo={selectedVideo}
            isValidUrl={isValidUrl}
          />
        </motion.div>

        {/* Sample Videos Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <SampleVideoGrid
            videos={SAMPLE_YOUTUBE_VIDEOS}
            selectedVideo={selectedVideo}
            onSelectSample={handleSampleClick}
          />
        </motion.div>

        {/* Audio Retention Heatmap */}
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AudioRetentionVisualizer peaks={selectedVideo.peaks} />
          </motion.div>
        )}

        {/* Pipeline Config Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <PipelineSettings
            numClips={numClips}
            setNumClips={setNumClips}
            clipFormat={clipFormat}
            setClipFormat={setClipFormat}
            captionStyle={captionStyle}
            setCaptionStyle={setCaptionStyle}
            viralBoost={viralBoost}
            setViralBoost={setViralBoost}
            minDuration={minDuration}
            setMinDuration={setMinDuration}
          />
        </motion.div>

        {/* Trigger Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          <ProcessingTriggerBar
            isProcessing={isProcessing}
            onSubmit={handleGenerateClips}
            isDisabled={!isValidUrl}
            numClips={numClips}
            clipFormat={clipFormat}
          />
        </motion.div>
      </main>
    </div>
  );
}
