import { motion } from "framer-motion";
import { ArrowRight, Zap, Clock, Sparkles } from "lucide-react";

export function ProcessingTriggerBar({
  isProcessing,
  onSubmit,
  isDisabled,
  numClips,
  clipFormat
}) {
  return (
    <div className="w-full p-6 rounded-2xl bg-gradient-to-r from-[#0E0E12] via-[#14141A] to-[#0E0E12] border border-[#D4FF3F]/30 shadow-[0_0_50px_rgba(212,255,63,0.1)] flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#D4FF3F]/10 border border-[#D4FF3F]/30 flex items-center justify-center flex-shrink-0">
          <Zap size={22} className="text-[#D4FF3F]" />
        </div>
        <div className="space-y-1">
          <h4 className="text-base font-extrabold text-white">
            Ready to extract {numClips} Shorts ({clipFormat})
          </h4>
          <p className="text-xs text-[#94949E] flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-mono">
              <Clock size={13} className="text-[#D4FF3F]" />
              Estimated Processing: ~45s
            </span>
            <span>•</span>
            <span className="text-[#D4FF3F] font-bold">Cost: 2 Credits</span>
          </p>
        </div>
      </div>

      <div className="w-full sm:w-auto">
        <button
          type="button"
          onClick={onSubmit}
          disabled={isDisabled || isProcessing}
          className="w-full sm:w-auto btn-accent px-8 h-13 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-40 disabled:pointer-events-none"
        >
          {isProcessing ? (
            <>
              <span className="h-4 w-4 border-2 border-[#070709] border-t-transparent rounded-full animate-spin" />
              <span>Processing Video...</span>
            </>
          ) : (
            <>
              <span>Generate AI Shorts Now</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
