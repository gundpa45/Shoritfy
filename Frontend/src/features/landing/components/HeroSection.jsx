import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  Play,
  Volume2,
  VolumeX,
  Star,
  Share2,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Scissors,
  Activity,
  X,
  Check,
  ShieldAlert,
  Loader2
} from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { aiService } from "../../../services/ai.service";

export function HeroSection() {
  const [urlInput, setUrlInput] = useState("");
  const [mutedCards, setMutedCards] = useState({ brutallismo: true, namu: true });
  const [activeDemoModal, setActiveDemoModal] = useState(null);
  const [isProcessingUrl, setIsProcessingUrl] = useState(false);
  const [processedJob, setProcessedJob] = useState(null);

  const navigate = useNavigate();

  const toggleMute = (key, e) => {
    e.stopPropagation();
    setMutedCards((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDemoSelect = (demoName) => {
    setProcessedJob(null);
    setActiveDemoModal(demoName);
  };

  const handleUrlSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!urlInput.trim()) return;

    setIsProcessingUrl(true);
    setProcessedJob(null);
    setActiveDemoModal("Extracting Clips from URL...");

    try {
      const result = await aiService.submitUrlForClipping({ url: urlInput.trim() });
      setProcessedJob(result.data);
      setIsProcessingUrl(false);
    } catch (err) {
      console.error("URL processing error", err);
      setIsProcessingUrl(false);
    }
  };

  return (
    <section className="relative min-h-[96vh] w-full flex flex-col items-center justify-center pt-28 pb-20 px-4 sm:px-8 overflow-hidden bg-[#0A0A0B]">
      {/* Ambient Radial Glow around center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[520px] hero-radial-glow pointer-events-none opacity-80" />
      <div className="absolute inset-0 noise-bg pointer-events-none opacity-50" />

      {/* =========================================================
          LEFT FLANK: Floating Video & Creative Studio Cards (Desktop XL+)
         ========================================================= */}
      <div className="hidden xl:flex flex-col gap-5 absolute left-5 2xl:left-12 top-1/2 -translate-y-1/2 w-[270px] 2xl:w-[305px] z-10 pointer-events-auto">
        {/* Card L1: Japanese Brutalist Short ("The House of Shadow and Light") */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => handleDemoSelect("影光舎 — Shadow & Light")}
          className="group relative rounded-2xl border border-white/[0.08] bg-[#121214] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.7)] hover:border-white/20 transition-all duration-300 cursor-pointer hover:-translate-y-1"
        >
          <div className="bg-gradient-to-r from-[#E64825] to-[#F16529] p-3 text-white flex items-center justify-between">
            <span className="text-xl font-bold tracking-tighter font-mono">影光舎</span>
            <span className="text-[10px] bg-black/40 px-2 py-0.5 rounded font-mono uppercase tracking-wider">
              99/100 HOOK
            </span>
          </div>
          <div className="p-4 bg-[#18181C] relative aspect-[4/3] flex flex-col justify-end border-b border-white/[0.06] overflow-hidden">
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 200 150">
              <polygon points="0,150 100,20 200,150" fill="white" />
              <line x1="100" y1="20" x2="100" y2="150" stroke="white" strokeWidth="2" />
              <line x1="0" y1="90" x2="200" y2="90" stroke="white" strokeWidth="1" />
            </svg>
            <div className="relative z-10">
              <h4 className="text-xs font-bold text-[#F5F5F5] uppercase tracking-wide">
                The House of Shadow and Light
              </h4>
              <p className="text-[10px] text-[#A1A1A6] mt-1 line-clamp-2 leading-relaxed">
                We reject uniform brightness, sculpting sunlight through deep eaves and textured walls.
              </p>
            </div>
          </div>
          <div className="p-3 bg-[#121214] flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#A1A1A6]">9:16 Vertical Clip</span>
            <span className="text-[11px] font-bold text-[#E64825] group-hover:translate-x-0.5 transition-transform">
              Enter →
            </span>
          </div>
        </motion.div>

        {/* Card L2: Minimalist Dark Architectural Short ("brutallismo") */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => handleDemoSelect("brutallismo — Concrete AI")}
          className="group relative rounded-2xl border border-white/[0.08] bg-[#121214] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.7)] hover:border-white/20 transition-all duration-300 cursor-pointer hover:-translate-y-1"
        >
          <div className="relative aspect-video bg-[#0D0D0F] p-3 flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#262629]/40 via-transparent to-[#121214]" />
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs font-bold font-mono tracking-wider text-[#F5F5F5]">
                brutallismo
              </span>
              <span className="w-2 h-2 rounded-full bg-[#D4FF3F] animate-pulse" />
            </div>

            <div className="relative z-10 flex items-center justify-between mt-auto pt-4">
              <button
                onClick={(e) => toggleMute("brutallismo", e)}
                className="w-7 h-7 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center text-[#F5F5F5] hover:bg-white/10 transition-colors"
                aria-label="Toggle mute"
              >
                {mutedCards.brutallismo ? <VolumeX size={13} /> : <Volume2 size={13} />}
              </button>
              <div className="flex-1 mx-2 h-1 bg-white/10 rounded-full overflow-hidden relative">
                <div className="w-1/2 h-full bg-[#D4FF3F]" />
              </div>
              <span className="text-[10px] font-mono text-[#A1A1A6]">00:24</span>
            </div>
          </div>
          <div className="px-3 py-2 bg-[#121214] border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#A1A1A6]">
            <span>Auto-Reframed 4K</span>
            <span className="text-[#D4FF3F] font-mono">97/100</span>
          </div>
        </motion.div>

        {/* Card L3: Editorial Typography Preview ("Imagine. The View.") */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => handleDemoSelect("Imagine. The View. AI Forge.")}
          className="group relative rounded-2xl border border-white/[0.08] bg-[#0C0C0E] p-4 shadow-[0_12px_40px_rgba(0,0,0,0.7)] hover:border-white/20 transition-all duration-300 cursor-pointer hover:-translate-y-1"
        >
          <p className="text-xl font-black leading-tight tracking-tighter bg-gradient-to-r from-[#FF3366] via-[#FF6633] to-[#D4FF3F] bg-clip-text text-transparent">
            Imagine. The View. AI. Forge.
          </p>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.06] text-[11px]">
            <span className="text-[#A1A1A6] font-mono">Mimetic 1.0</span>
            <span className="text-[#F5F5F5] font-semibold flex items-center gap-1">
              Download 4K <ExternalLink size={11} />
            </span>
          </div>
        </motion.div>
      </div>

      {/* =========================================================
          RIGHT FLANK: Floating Video & Creative Studio Cards (Desktop XL+)
         ========================================================= */}
      <div className="hidden xl:flex flex-col gap-5 absolute right-5 2xl:right-12 top-1/2 -translate-y-1/2 w-[270px] 2xl:w-[305px] z-10 pointer-events-auto">
        {/* Card R1: Large Bold Yellow Typography Short ("Namu") */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => handleDemoSelect("Namu — Immersive Clips")}
          className="group relative rounded-2xl border border-white/[0.08] bg-[#121214] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.7)] hover:border-white/20 transition-all duration-300 cursor-pointer hover:-translate-y-1"
        >
          <div className="p-3 bg-[#161619] border-b border-white/[0.06] flex items-center justify-end gap-1.5">
            {["Tours", "Community", "Gear"].map((tag) => (
              <span
                key={tag}
                className="text-[10px] bg-white/[0.06] px-2 py-0.5 rounded-full text-[#A1A1A6] font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="p-4 bg-gradient-to-b from-[#18181C] to-[#121214] text-center py-8">
            <h3 className="text-4xl font-black text-[#F5D400] tracking-tight leading-none mb-2">
              Namu
            </h3>
            <p className="text-[11px] text-[#A1A1A6] max-w-[200px] mx-auto leading-relaxed">
              Immersive, custom-tailored clips connect you deeply with the audience.
            </p>
          </div>
          <div className="p-3 bg-[#121214] border-t border-white/[0.06] flex items-center justify-end">
            <span className="px-3 py-1 rounded-lg bg-[#F5D400] text-[#0A0A0B] font-bold text-[11px]">
              Explore short
            </span>
          </div>
        </motion.div>

        {/* Card R2: Vibrant Purple/Pink FinTech Short ("PayBoy") */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => handleDemoSelect("PayBoy — Viral Hook Analysis")}
          className="group relative rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#1A1228] via-[#14101E] to-[#121214] p-4 shadow-[0_12px_40px_rgba(0,0,0,0.7)] hover:border-white/20 transition-all duration-300 cursor-pointer hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-white font-mono">PayBoy</span>
            <span className="px-1.5 py-0.5 rounded bg-[#9D4EDD]/20 text-[#C77DFF] text-[10px] font-mono">
              VIRAL SCORE 98
            </span>
          </div>
          <div className="h-20 rounded-xl bg-gradient-to-r from-[#C77DFF] to-[#7B2CBF] p-3 flex flex-col justify-between shadow-lg mb-3">
            <div className="flex items-center justify-between text-white text-[11px] font-mono">
              <span>PayBoy</span>
              <span className="font-bold italic">VISA</span>
            </div>
            <div className="flex items-center justify-between text-white/90 text-xs font-mono">
              <span>**** 6721</span>
              <ShieldAlert size={14} className="text-white" />
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#A1A1A6]">
            <span>Auto-Captions Enabled</span>
            <span className="text-[#D4FF3F] font-semibold">Ready to Post</span>
          </div>
        </motion.div>

        {/* Card R3: Orange Brand Engineering Card ("syn... Built in Shortify") */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => handleDemoSelect("syn — Engineered Performance")}
          className="group relative rounded-2xl border border-[#E64825]/30 bg-gradient-to-r from-[#E64825]/10 to-[#121214] p-4 shadow-[0_12px_40px_rgba(0,0,0,0.7)] hover:border-[#E64825]/60 transition-all duration-300 cursor-pointer hover:-translate-y-1 flex items-center justify-between"
        >
          <div>
            <span className="text-sm font-extrabold text-[#E64825] tracking-tight">syn...</span>
            <p className="text-[11px] text-[#A1A1A6] mt-0.5 max-w-[150px]">
              Precision engineered performance in seconds
            </p>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0A0A0B] border border-white/10 text-[10px] font-mono text-[#F5F5F5] whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF3F]" />
            Built in Shortify
          </div>
        </motion.div>
      </div>

      {/* =========================================================
          CENTER NORDCRAFT HERO VOID (Title, Subtitle, CTA Bar, Demos)
         ========================================================= */}
      <div className="relative z-20 max-w-3xl mx-auto text-center w-full">
        {/* Top Community / Release Badges Row */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center flex-wrap justify-center gap-3 mb-8"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121214] border border-white/[0.08] text-xs font-medium text-[#A1A1A6] hover:text-[#F5F5F5] hover:border-white/20 transition-all"
          >
            <Star size={13} className="text-[#D4FF3F]" />
            <span>Star</span>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121214] border border-white/[0.08] text-xs font-medium text-[#A1A1A6] hover:text-[#F5F5F5] hover:border-white/20 transition-all"
          >
            <Share2 size={13} />
            <span>Follow</span>
          </a>
          <a
            href="https://discord.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121214] border border-white/[0.08] text-xs font-medium text-[#A1A1A6] hover:text-[#F5F5F5] hover:border-white/20 transition-all"
          >
            <MessageSquare size={13} />
            <span>Chat</span>
          </a>
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A1E18] border border-[#D4FF3F]/30 text-xs font-semibold text-[#D4FF3F] shadow-[0_0_15px_rgba(212,255,63,0.15)]">
            <Sparkles size={13} />
            New Shortify 2.0!
          </span>
        </motion.div>

        {/* Large Tight Bold Headline */}
        <motion.h1
          className="text-4xl sm:text-6xl lg:text-[70px] font-bold tracking-[-0.03em] text-[#F5F5F5] leading-[1.07] mb-6 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          The video clipping engine for <span className="text-[#D4FF3F]">ambitious creators</span>
        </motion.h1>

        {/* Plain-Language Subheadline */}
        <motion.p
          className="text-base sm:text-xl text-[#A1A1A6] max-w-xl mx-auto mb-10 leading-relaxed font-normal"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
        >
          Shortify combines a powerful AI agent with an auto-reframing video clipper, giving you the speed of AI and complete creative control.
        </motion.p>

        {/* NORDCRAFT-STYLE CTA BAR: Button + "or" + Interactive URL Input Box */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Primary Action Button */}
          <Link to="/upload" className="w-full sm:w-auto">
            <Button
              className="btn-accent w-full sm:w-auto px-7 py-4 text-base font-semibold rounded-xl flex items-center justify-center gap-2.5 shadow-[0_0_24px_rgba(212,255,63,0.3)] hover:scale-[1.02] transition-transform duration-200"
            >
              Start clipping
            </Button>
          </Link>

          {/* "or" separator text */}
          <span className="text-xs font-mono text-[#A1A1A6] px-1 uppercase tracking-wider">
            or
          </span>

          {/* Interactive URL Bar with Real API Backend Submission */}
          <form
            onSubmit={handleUrlSubmit}
            className="w-full sm:flex-1 bg-[#121214] border border-white/[0.12] rounded-xl pl-4 pr-1.5 py-1.5 flex items-center justify-between gap-2 shadow-lg hover:border-white/20 focus-within:border-[#D4FF3F]/80 transition-all"
          >
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Start with a YouTube link..."
              className="bg-transparent border-none outline-none text-sm text-[#F5F5F5] placeholder-[#A1A1A6] flex-1 font-mono"
            />
            <button
              type="submit"
              disabled={isProcessingUrl}
              className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#D4FF3F] hover:text-[#0A0A0B] text-white flex items-center justify-center transition-all duration-200 disabled:opacity-50"
              aria-label="Process link"
            >
              {isProcessingUrl ? (
                <Loader2 size={16} className="animate-spin text-[#D4FF3F]" />
              ) : (
                <ArrowUp size={18} />
              )}
            </button>
          </form>
        </motion.div>

        {/* "Or try a demo" Row with clickable chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.32 }}
          className="flex flex-wrap items-center justify-center gap-2.5 text-xs text-[#A1A1A6]"
        >
          <span className="font-mono">Or try a demo</span>

          <button
            onClick={() => handleDemoSelect("Namu — Immersive Clips")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#121214] border border-white/[0.08] text-[#F5F5F5] hover:border-[#F5D400]/60 transition-colors group"
          >
            <span className="w-4 h-4 rounded bg-[#F5D400] text-[#0A0A0B] font-bold text-[10px] flex items-center justify-center">
              N
            </span>
            <span className="font-mono group-hover:text-[#F5D400]">Namuro</span>
          </button>

          <button
            onClick={() => handleDemoSelect("brutallismo — Concrete AI")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#121214] border border-white/[0.08] text-[#F5F5F5] hover:border-white/30 transition-colors group"
          >
            <span className="w-4 h-4 rounded bg-[#262629] text-white font-mono text-[10px] flex items-center justify-center">
              _
            </span>
            <span className="font-mono">brutallismo</span>
          </button>

          <button
            onClick={() => handleDemoSelect("xr201p — 4K 60FPS Showcase")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#121214] border border-white/[0.08] text-[#F5F5F5] hover:border-[#00FFC2]/60 transition-colors group"
          >
            <span className="w-4 h-4 rounded bg-[#00FFC2]/20 text-[#00FFC2] font-mono text-[10px] flex items-center justify-center">
              %
            </span>
            <span className="font-mono group-hover:text-[#00FFC2]">xr201p</span>
          </button>
        </motion.div>
      </div>

      {/* =========================================================
          TABLET & MOBILE: Surrounding Cards Grid (Visible < 1280px)
         ========================================================= */}
      <div className="w-full max-w-6xl mx-auto mt-16 xl:hidden">
        <div className="flex items-center justify-between mb-6 px-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[#A1A1A6]">
            FEATURED AI VIRAL TRANSFORMATIONS
          </span>
          <span className="text-xs font-mono text-[#D4FF3F]">6 CREATIVE STUDIO EXAMPLES</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <div
            onClick={() => handleDemoSelect("影光舎 — Shadow & Light")}
            className="rounded-xl border border-white/[0.08] bg-[#121214] overflow-hidden cursor-pointer hover:border-white/20 transition-all"
          >
            <div className="bg-gradient-to-r from-[#E64825] to-[#F16529] px-3 py-2 text-white flex items-center justify-between font-mono text-sm font-bold">
              <span>影光舎</span>
              <span className="text-[10px] bg-black/40 px-1.5 py-0.5 rounded">99/100</span>
            </div>
            <div className="p-4">
              <h4 className="text-xs font-bold text-[#F5F5F5] uppercase">
                The House of Shadow & Light
              </h4>
              <p className="text-[11px] text-[#A1A1A6] mt-1">
                9:16 Vertical Clip · Animated Captions
              </p>
            </div>
          </div>

          <div
            onClick={() => handleDemoSelect("brutallismo — Concrete AI")}
            className="rounded-xl border border-white/[0.08] bg-[#121214] p-4 cursor-pointer hover:border-white/20 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-[#F5F5F5]">brutallismo</span>
              <span className="text-[10px] font-mono text-[#D4FF3F]">97/100 HOOK</span>
            </div>
            <p className="text-[11px] text-[#A1A1A6] mt-2">
              Auto-reframed 4K concrete architecture recording
            </p>
          </div>

          <div
            onClick={() => handleDemoSelect("Namu — Immersive Clips")}
            className="rounded-xl border border-white/[0.08] bg-[#121214] p-4 cursor-pointer hover:border-[#F5D400]/40 transition-all text-center"
          >
            <h3 className="text-2xl font-black text-[#F5D400] mb-1">Namu</h3>
            <p className="text-[11px] text-[#A1A1A6]">Immersive, custom-tailored clips</p>
          </div>

          <div
            onClick={() => handleDemoSelect("PayBoy — Viral Hook Analysis")}
            className="rounded-xl border border-white/[0.08] bg-gradient-to-br from-[#1A1228] to-[#121214] p-4 cursor-pointer hover:border-[#9D4EDD]/40 transition-all"
          >
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-white font-bold">PayBoy</span>
              <span className="text-[#C77DFF]">SCORE 98</span>
            </div>
            <p className="text-[11px] text-[#A1A1A6] mt-2">
              FinTech viral hook analysis with animated subtitles
            </p>
          </div>

          <div
            onClick={() => handleDemoSelect("Imagine. The View. AI Forge.")}
            className="rounded-xl border border-white/[0.08] bg-[#0C0C0E] p-4 cursor-pointer hover:border-white/20 transition-all"
          >
            <p className="text-sm font-black bg-gradient-to-r from-[#FF3366] to-[#D4FF3F] bg-clip-text text-transparent">
              Imagine. The View. AI. Forge.
            </p>
            <p className="text-[11px] text-[#A1A1A6] mt-2 font-mono">Mimetic 1.0 · 4K Export</p>
          </div>

          <div
            onClick={() => handleDemoSelect("syn — Engineered Performance")}
            className="rounded-xl border border-[#E64825]/30 bg-[#121214] p-4 cursor-pointer hover:border-[#E64825] transition-all flex items-center justify-between"
          >
            <div>
              <span className="text-xs font-bold text-[#E64825]">syn...</span>
              <p className="text-[10px] text-[#A1A1A6]">Engineered performance</p>
            </div>
            <span className="text-[10px] font-mono text-[#D4FF3F]">Built in Shortify</span>
          </div>
        </div>
      </div>

      {/* =========================================================
          INTERACTIVE DEMO / LIVE API PROCESSING MODAL
         ========================================================= */}
      <AnimatePresence>
        {activeDemoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => {
              if (!isProcessingUrl) setActiveDemoModal(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl rounded-2xl bg-[#121214] border border-white/10 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.9)] relative"
            >
              {!isProcessingUrl && (
                <button
                  onClick={() => setActiveDemoModal(null)}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#A1A1A6] hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              )}

              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4FF3F] animate-pulse" />
                <h3 className="text-base font-bold font-mono text-[#F5F5F5]">
                  {activeDemoModal}
                </h3>
              </div>

              {isProcessingUrl ? (
                /* LIVE PROCESSING STATE */
                <div className="py-12 flex flex-col items-center justify-center gap-4 text-center">
                  <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-[#D4FF3F] animate-spin" />
                  <div>
                    <p className="text-sm font-bold text-[#F5F5F5] font-mono">
                      Analyzing video & transcript with Shortify AI...
                    </p>
                    <p className="text-xs text-[#A1A1A6] mt-1">
                      Target URL: {urlInput}
                    </p>
                  </div>
                </div>
              ) : processedJob ? (
                /* LIVE BACKEND API RESULT */
                <div className="space-y-6">
                  <div className="aspect-video rounded-xl bg-[#0A0A0B] border border-white/10 overflow-hidden relative flex flex-col justify-between p-6">
                    <div className="flex items-center justify-between text-xs font-mono text-[#A1A1A6]">
                      <span className="text-[#D4FF3F] font-bold">● AI Extracted Pipeline Ready</span>
                      <span>{processedJob.videoDetails?.duration || "1:42:15"} · 9:16 Shorts</span>
                    </div>
                    <div className="text-center my-auto">
                      <h4 className="text-base font-bold text-white max-w-md mx-auto leading-snug">
                        {processedJob.videoDetails?.title || urlInput}
                      </h4>
                      <p className="text-xs text-[#A1A1A6] mt-1">
                        {processedJob.clips?.length || 4} Viral Clips Scored & Reframed
                      </p>
                    </div>
                    <div className="bg-black/70 backdrop-blur-md p-3 rounded-lg border border-white/10 text-center">
                      <p className="text-xs font-mono text-[#D4FF3F]">
                        Top Clip Score: 98/100 — "We sculpt sunlight through deep eaves..."
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-[#A1A1A6]">
                      <Check size={14} className="text-[#D4FF3F]" />
                      <span>Pipeline Status: Active in Backend Storage</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setActiveDemoModal(null)}
                        className="px-4 py-2 text-xs font-semibold rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                      >
                        Close
                      </Button>
                      <Button
                        onClick={() => navigate(`/processing/${processedJob.jobId}`)}
                        className="btn-accent px-5 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5"
                      >
                        Open in Clip Studio <ArrowRight size={13} />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                /* STATIC DEMO MODAL */
                <>
                  <div className="aspect-video rounded-xl bg-[#0A0A0B] border border-white/10 overflow-hidden relative flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                      <div className="flex items-center justify-between text-xs font-mono text-[#A1A1A6] mb-2">
                        <span className="text-[#D4FF3F]">● AI Hook Detected</span>
                        <span>9:16 Auto-Framed · 4K 60fps</span>
                      </div>
                      <div className="bg-black/70 backdrop-blur-md p-3 rounded-lg border border-white/10 text-center">
                        <p className="text-sm font-bold text-white leading-snug">
                          "We sculpt sunlight through deep eaves, creating an{" "}
                          <span className="text-[#0A0A0B] bg-[#D4FF3F] px-1.5 py-0.5 rounded font-extrabold">
                            unforgettable
                          </span>{" "}
                          visual hook..."
                        </p>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-[#D4FF3F] text-[#0A0A0B] flex items-center justify-center mx-auto mb-3 shadow-[0_0_25px_rgba(212,255,63,0.4)] cursor-pointer hover:scale-105 transition-transform">
                        <Play size={20} className="fill-[#0A0A0B] ml-0.5" />
                      </div>
                      <p className="text-xs text-[#A1A1A6] font-mono">
                        Click to preview full AI captions timeline
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-[#A1A1A6]">
                      <Check size={14} className="text-[#D4FF3F]" />
                      <span>AI Retention Score: 98/100</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setActiveDemoModal(null)}
                        className="px-4 py-2 text-xs font-semibold rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                      >
                        Close
                      </Button>
                      <Link to="/upload">
                        <Button
                          className="btn-accent px-5 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5"
                        >
                          Export Clip <ArrowRight size={13} />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
