import { Activity, Sparkles } from "lucide-react";
import { cn } from "../../../../lib/utils";

export function AudioRetentionVisualizer({ peaks }) {
  const bars = [35, 65, 95, 45, 30, 85, 98, 70, 40, 60, 92, 55, 30, 88, 96, 50, 40, 75, 91, 65, 80, 94, 60, 35, 90, 85, 50, 95, 70, 40];

  return (
    <div className="w-full p-6 rounded-2xl bg-[#0E0E12] border border-white/[0.08] flex flex-col justify-between space-y-4 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <span className="text-[#94949E] flex items-center gap-2 font-semibold">
          <Activity size={16} className="text-[#D4FF3F]" />
          <span className="text-white">Audio Retention Heatmap & Hook Window Detection</span>
        </span>
        <span className="text-[#D4FF3F] text-xs font-bold bg-[#D4FF3F]/10 border border-[#D4FF3F]/20 px-3 py-1 rounded-full">
          ● Retention Peaks Detected
        </span>
      </div>

      {/* Full widescreen Waveform Bars */}
      <div className="h-28 flex items-end justify-between gap-1.5 pt-4 px-1">
        {bars.map((height, i) => {
          const isPeak = height >= 90;
          return (
            <div
              key={i}
              className="flex-1 flex flex-col items-center gap-1 h-full justify-end group cursor-pointer"
            >
              <div
                className={cn(
                  "w-full rounded-t transition-all duration-200",
                  isPeak
                    ? "bg-[#D4FF3F] shadow-[0_0_16px_rgba(212,255,63,0.5)]"
                    : "bg-white/10 group-hover:bg-white/30"
                )}
                style={{ height: `${height}%` }}
              />
            </div>
          );
        })}
      </div>

      {/* Detected Peak Timestamps */}
      {peaks && peaks.length > 0 && (
        <div className="pt-3 border-t border-white/[0.06] flex flex-wrap items-center gap-2.5 text-xs">
          <span className="text-[#94949E] font-semibold">Predicted Hook Windows:</span>
          {peaks.map((p, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-lg bg-[#14141A] border border-[#D4FF3F]/30 text-xs font-mono text-[#D4FF3F] font-semibold flex items-center gap-1.5"
            >
              <Sparkles size={12} />
              {p}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
