import { useState } from 'react';
import { Sliders, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export const BeforeAfterComparison = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#18181B]">
      
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-[#27272A] text-[#8BEAD8] text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <Sliders className="w-3.5 h-3.5" /> High-Retention Transformation
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
          Generic Long Videos vs. Shortify AI Shorts
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg mt-3">
          Drag the slider to experience how Shortify transforms raw 1-hour recordings into high-converting 9:16 viral short videos.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl border border-[#27272A] overflow-hidden bg-[#09090B] shadow-2xl aspect-[16/9] sm:aspect-[21/9] select-none">
          
          {/* BEFORE Layer */}
          <div className="absolute inset-0 bg-[#09090B] flex flex-col items-center justify-center p-6 text-center">
            <div className="max-w-md space-y-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-red-500/10 text-red-400 text-xs font-mono font-bold border border-red-500/20">
                <AlertCircle className="w-3.5 h-3.5" /> BEFORE: Raw 16:9 Podcast
              </span>
              <h4 className="text-xl sm:text-2xl font-bold text-zinc-300 font-display">
                1-Hour Uncut Widescreen Video
              </h4>
              <ul className="text-xs sm:text-sm text-zinc-400 space-y-2 text-left font-mono">
                <li className="flex items-center gap-2">❌ Unframed speakers with 60% empty space</li>
                <li className="flex items-center gap-2">❌ Tiny static YouTube subtitles</li>
                <li className="flex items-center gap-2">❌ Low viewer retention (90% drop off in 10s)</li>
              </ul>
            </div>
          </div>

          {/* AFTER Layer */}
          <div
            className="absolute inset-y-0 right-0 bg-[#121215] border-l-2 border-[#8BEAD8] flex flex-col items-center justify-center p-6 text-center transition-all duration-75 overflow-hidden"
            style={{ width: `${100 - sliderPosition}%` }}
          >
            <div className="max-w-md space-y-4 min-w-[280px]">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-[#8BEAD8]/20 text-[#8BEAD8] text-xs font-mono font-bold border border-[#8BEAD8]/30">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8BEAD8]" /> AFTER: Shortify Viral Short
              </span>
              <h4 className="text-xl sm:text-2xl font-bold text-white font-display">
                45-Second 9:16 Viral Masterpiece
              </h4>
              <ul className="text-xs sm:text-sm text-zinc-200 space-y-2 text-left font-mono">
                <li className="flex items-center gap-2">⚡ OpenCV Active Speaker Auto-Centering</li>
                <li className="flex items-center gap-2">⚡ Alex Hormozi Kinetic Animated Captions</li>
                <li className="flex items-center gap-2">⚡ 98/100 Virality Score & Auto Hashtags</li>
              </ul>
            </div>
          </div>

          {/* Handle */}
          <div
            className="absolute inset-y-0 w-1 bg-[#8BEAD8] cursor-ew-resize z-30 shadow-[0_0_15px_rgba(139,234,216,1)]"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#8BEAD8] text-black flex items-center justify-center shadow-xl border-2 border-white">
              <Sliders className="w-4 h-4" />
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-40"
          />

        </div>

        <div className="text-center mt-3 text-xs font-mono text-zinc-500 flex items-center justify-center gap-1">
          <ArrowRight className="w-3 h-3 text-[#8BEAD8]" /> Drag slider left or right to compare outputs
        </div>
      </div>

    </section>
  );
};
