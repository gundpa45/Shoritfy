import { motion } from "framer-motion";
import { Play, Flame, Eye, Clock, Sparkles } from "lucide-react";
import { cn } from "../../../../lib/utils";

export function SampleVideoGrid({ videos, selectedVideo, onSelectSample }) {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame size={16} className="text-[#D4FF3F]" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Or Pick a High-Viral Sample Video
          </h3>
        </div>
        <span className="text-xs text-[#94949E] font-medium">1-Click Instant Pre-load</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {videos.map((video) => {
          const isSelected = selectedVideo?.id === video.id;
          return (
            <motion.div
              key={video.id}
              onClick={() => onSelectSample(video)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "p-5 rounded-2xl bg-[#0E0E12] border transition-all cursor-pointer flex flex-col justify-between space-y-4 relative overflow-hidden group shadow-lg",
                isSelected
                  ? "border-[#D4FF3F] bg-[#D4FF3F]/[0.05] shadow-[0_0_30px_rgba(212,255,63,0.12)]"
                  : "border-white/[0.08] hover:border-white/20 hover:bg-[#14141A]"
              )}
            >
              {/* Badge & Duration */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-[#D4FF3F] bg-[#D4FF3F]/10 border border-[#D4FF3F]/25 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {video.badge}
                </span>
                <span className="text-xs font-mono text-[#94949E] flex items-center gap-1">
                  <Clock size={11} />
                  {video.duration}
                </span>
              </div>

              {/* Title & Metadata */}
              <div className="space-y-1.5">
                <h4 className="text-sm font-bold text-white group-hover:text-[#D4FF3F] transition-colors line-clamp-2 leading-snug">
                  {video.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-[#94949E] pt-1">
                  <span>{video.channel}</span>
                  <span className="flex items-center gap-1 text-[11px] text-[#94949E]">
                    <Eye size={11} />
                    {video.views}
                  </span>
                </div>
              </div>

              {/* Action row */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-[#94949E] group-hover:text-white transition-colors flex items-center gap-1.5 font-semibold">
                  <Play size={13} className="text-[#D4FF3F] fill-[#D4FF3F]" />
                  <span>Load Demo Track</span>
                </span>
                <span className="text-[11px] font-bold text-[#D4FF3F]">95%+ Hook Score</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
