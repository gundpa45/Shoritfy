import { motion } from "framer-motion";
import { SlidersHorizontal, Smartphone, Monitor, Square, Subtitles, Zap, Sparkles } from "lucide-react";
import { cn } from "../../../../lib/utils";

const ASPECT_RATIOS = [
  { id: "9:16", label: "9:16 Vertical", desc: "TikTok / Shorts / Reels", icon: Smartphone },
  { id: "16:9", label: "16:9 Landscape", desc: "YouTube / Video Podcast", icon: Monitor },
  { id: "1:1", label: "1:1 Square", desc: "Instagram / LinkedIn", icon: Square },
];

const CAPTION_STYLES = [
  { id: "hormozi", name: "Hormozi Bold Yellow", desc: "High-retention animated word pop" },
  { id: "neon", name: "Cyberpunk Lime Neon", desc: "Glowing tech captions & highlights" },
  { id: "minimal", name: "Apple Minimal White", desc: "Clean subtle lower-third typography" },
];

export function PipelineSettings({
  numClips,
  setNumClips,
  clipFormat,
  setClipFormat,
  captionStyle,
  setCaptionStyle,
  viralBoost,
  setViralBoost,
  minDuration,
  setMinDuration
}) {
  return (
    <div className="w-full p-6 sm:p-8 rounded-2xl bg-[#0E0E12] border border-white/[0.08] space-y-6 shadow-xl">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal size={18} className="text-[#D4FF3F]" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Configure AI Clipping Pipeline
          </h3>
        </div>
        <span className="text-xs font-semibold text-[#94949E] bg-[#14141A] border border-white/[0.08] px-3 py-1 rounded-full">
          Whisper-v3 + Qwen Engine
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Aspect Ratio Selection */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-[#94949E]">
            Target Aspect Ratio
          </label>
          <div className="grid grid-cols-3 gap-3">
            {ASPECT_RATIOS.map((fmt) => {
              const active = clipFormat === fmt.id;
              return (
                <button
                  key={fmt.id}
                  type="button"
                  onClick={() => setClipFormat(fmt.id)}
                  className={cn(
                    "p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 text-center transition-all cursor-pointer",
                    active
                      ? "border-[#D4FF3F] bg-[#D4FF3F]/10 text-white shadow-[0_0_20px_rgba(212,255,63,0.15)]"
                      : "border-white/[0.08] bg-[#14141A] text-[#94949E] hover:border-white/20 hover:text-white"
                  )}
                >
                  <fmt.icon size={22} className={active ? "text-[#D4FF3F]" : "text-[#94949E]"} />
                  <div>
                    <p className="text-xs font-bold">{fmt.label}</p>
                    <p className="text-[10px] text-[#94949E] mt-0.5">{fmt.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Target Clip Count */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[#94949E]">
              Target Shorts Count
            </label>
            <span className="text-xs font-bold text-[#D4FF3F]">
              {numClips} Shorts Selected
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2.5">
            {[3, 6, 9, 12].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => setNumClips(count)}
                className={cn(
                  "py-3.5 rounded-xl border text-xs font-bold transition-all cursor-pointer",
                  numClips === count
                    ? "border-[#D4FF3F] bg-[#D4FF3F] text-[#070709] shadow-[0_0_20px_rgba(212,255,63,0.25)]"
                    : "border-white/[0.08] bg-[#14141A] text-[#94949E] hover:border-white/20 hover:text-white"
                )}
              >
                {count} Clips
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Presets Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-5 border-t border-white/[0.08]">
        {/* Caption Style */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[#94949E] flex items-center gap-1.5">
            <Subtitles size={14} className="text-[#D4FF3F]" />
            <span>Caption Style Preset</span>
          </label>
          <select
            value={captionStyle}
            onChange={(e) => setCaptionStyle(e.target.value)}
            className="w-full h-11 px-3.5 rounded-xl bg-[#14141A] border border-white/[0.1] text-xs font-semibold text-white focus:outline-none focus:border-[#D4FF3F] cursor-pointer"
          >
            {CAPTION_STYLES.map((c) => (
              <option key={c.id} value={c.id} className="bg-[#14141A] text-white">
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Min Duration */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[#94949E]">Min Clip Duration</label>
          <select
            value={minDuration}
            onChange={(e) => setMinDuration(e.target.value)}
            className="w-full h-11 px-3.5 rounded-xl bg-[#14141A] border border-white/[0.1] text-xs font-semibold text-white focus:outline-none focus:border-[#D4FF3F] cursor-pointer"
          >
            <option value="15s" className="bg-[#14141A]">15 Seconds (Micro Hooks)</option>
            <option value="30s" className="bg-[#14141A]">30 Seconds (Standard Shorts)</option>
            <option value="60s" className="bg-[#14141A]">60 Seconds (Deep Dive)</option>
          </select>
        </div>

        {/* Viral Boost Toggle */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[#94949E] flex items-center gap-1.5">
            <Zap size={14} className="text-[#D4FF3F]" />
            <span>AI Hook Accelerator</span>
          </label>
          <button
            type="button"
            onClick={() => setViralBoost(!viralBoost)}
            className={cn(
              "w-full h-11 px-3.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer",
              viralBoost
                ? "border-[#D4FF3F]/50 bg-[#D4FF3F]/10 text-white"
                : "border-white/[0.1] bg-[#14141A] text-[#94949E]"
            )}
          >
            <span>Pattern Interrupt Detection</span>
            <span className={cn("w-2.5 h-2.5 rounded-full", viralBoost ? "bg-[#D4FF3F] animate-pulse" : "bg-[#94949E]")} />
          </button>
        </div>
      </div>
    </div>
  );
}
