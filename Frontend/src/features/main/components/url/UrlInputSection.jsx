import { motion, AnimatePresence } from "framer-motion";
import { Link2, Clipboard, X, Play, Video, Tv, HardDrive, Sparkles } from "lucide-react";
import { ScoreBadge } from "../../../../components/ui/Badge";
import { cn } from "../../../../lib/utils";

const PLATFORMS = [
  { name: "YouTube Long-form", icon: Video, color: "text-red-400" },
  { name: "Twitch VODs", icon: Tv, color: "text-purple-400" },
  { name: "Cloud Video Drive", icon: HardDrive, color: "text-cyan-400" },
];

export function UrlInputSection({
  urlInput,
  onUrlChange,
  onPaste,
  onClear,
  selectedVideo,
  isValidUrl
}) {
  return (
    <div className="w-full space-y-4">
      {/* Primary Hero Input Bar (Command Bar Style) */}
      <div className="relative group">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#D4FF3F]/20 via-[#00E5FF]/20 to-[#8B5CF6]/20 blur-xl opacity-30 group-hover:opacity-60 transition-all duration-500" />
        
        <div className="relative flex flex-col sm:flex-row items-center bg-[#0E0E12]/90 backdrop-blur-xl border border-white/[0.12] focus-within:border-[#D4FF3F]/70 rounded-2xl p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all">
          <div className="flex items-center gap-3.5 flex-1 w-full px-3 py-2 sm:py-0">
            <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center flex-shrink-0">
              <Link2
                size={18}
                className={cn("transition-colors", isValidUrl ? "text-[#D4FF3F]" : "text-[#94949E]")}
              />
            </div>
            <input
              type="text"
              value={urlInput}
              onChange={(e) => onUrlChange(e.target.value)}
              placeholder="Paste YouTube, Twitch, or Google Drive URL (e.g., https://youtube.com/watch?v=...)"
              className="w-full bg-transparent text-white placeholder:text-[#94949E]/60 text-sm sm:text-base font-medium focus:outline-none"
            />
            {urlInput && (
              <button
                type="button"
                onClick={onClear}
                className="text-[#94949E] hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-white/[0.08]">
            <button
              type="button"
              onClick={onPaste}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#14141A] border border-white/[0.1] hover:bg-[#1B1B24] text-xs font-semibold text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Clipboard size={14} className="text-[#D4FF3F]" />
              <span>Paste Clipboard</span>
            </button>
          </div>
        </div>
      </div>

      {/* Platform Indicators */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4FF3F]" />
          <span className="text-xs font-semibold text-[#94949E]">Supported Input Sources:</span>
        </div>
        <div className="flex items-center gap-3">
          {PLATFORMS.map((p) => (
            <span
              key={p.name}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#94949E] bg-[#0E0E12] border border-white/[0.08] px-3 py-1 rounded-lg"
            >
              <p.icon size={13} className={p.color} />
              <span>{p.name}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Selected Video Preview Card */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-5 sm:p-6 rounded-2xl bg-[#0E0E12] border border-[#D4FF3F]/40 shadow-[0_0_40px_rgba(212,255,63,0.08)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#14141A] border border-white/10 flex items-center justify-center flex-shrink-0 relative overflow-hidden group">
                <Play size={26} className="text-[#D4FF3F] fill-[#D4FF3F]" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-[#D4FF3F] bg-[#D4FF3F]/10 border border-[#D4FF3F]/30 px-2.5 py-0.5 rounded-full">
                    Pre-Analyzed Demo Track
                  </span>
                  <span className="text-xs font-mono text-[#94949E]">• {selectedVideo.duration}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white line-clamp-1">
                  {selectedVideo.title}
                </h3>
                <p className="text-xs text-[#94949E]">
                  Channel: <span className="text-white font-semibold">{selectedVideo.channel}</span> ({selectedVideo.views})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-white/[0.08]">
              <ScoreBadge score={selectedVideo.predictedScore} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
