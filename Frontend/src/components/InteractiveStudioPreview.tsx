import { useState, useRef } from 'react';
import { Play, Pause, Download, Share2, Sparkles, Flame, Type, Check, Hash, Copy, Maximize2, Scissors } from 'lucide-react';
import { MOCK_CLIPS } from '../mockData';
import type { Clip } from '../types';
import confetti from 'canvas-confetti';

interface StudioPreviewProps {
  onOpenPricing: () => void;
  apiData?: any;
}

export const InteractiveStudioPreview = ({ onOpenPricing, apiData }: StudioPreviewProps) => {
  const [selectedClip, setSelectedClip] = useState<Clip>(MOCK_CLIPS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [captionStyle, setCaptionStyle] = useState<'hormozi' | 'beast' | 'minimal' | 'neon'>('hormozi');
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '1:1' | '16:9'>('9:16');
  const [copiedHashtags, setCopiedHashtags] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  if (apiData) {
    console.log("Real backend API data received:", apiData);
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleDownload = () => {
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch {
      // silent
    }
    alert(`Downloading "${selectedClip.title}" in 4K 60FPS vertical format!`);
  };

  const handleCopyHashtags = () => {
    navigator.clipboard.writeText(selectedClip.hashtags.join(' '));
    setCopiedHashtags(true);
    setTimeout(() => setCopiedHashtags(false), 2000);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto border-t border-[#121215] relative" id="demo">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#8BEAD8]/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#050505] border border-[#27272A] shadow-[0_0_15px_rgba(139,234,216,0.1)] text-[#8BEAD8] text-xs font-mono font-bold uppercase tracking-widest mb-6">
          <Sparkles className="w-3.5 h-3.5" /> Interactive Output Studio
        </div>
        <h2 className="text-4xl sm:text-6xl font-extrabold text-white font-display tracking-tight mb-4 drop-shadow-2xl">
          Preview & Customize Your Viral Shorts
        </h2>
        <p className="text-zinc-400 text-lg sm:text-xl font-light">
          Test real video playback, switch Alex Hormozi caption styles, toggle 9:16 framing, and export in 4K immediately.
        </p>
      </div>

      {/* Main Studio Card */}
      <div className="rounded-[2.5rem] p-2 relative overflow-hidden bg-gradient-to-b from-[#18181B] to-[#000000] shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10 border border-[#27272A]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
        
        <div className="rounded-[2.25rem] bg-[#050507] p-6 lg:p-10 relative overflow-hidden h-full flex flex-col">
          
          {/* Clip Tabs */}
          <div className="flex items-center gap-4 overflow-x-auto pb-6 mb-10 border-b border-[#18181B] scrollbar-none">
            <span className="text-xs font-mono text-zinc-500 font-bold uppercase shrink-0 mr-2 flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-500" /> AI Selected Clips:
            </span>
            {MOCK_CLIPS.map((clip) => (
              <button
                key={clip.id}
                onClick={() => setSelectedClip(clip)}
                className={`group px-5 py-3 rounded-2xl text-xs font-bold transition-all shrink-0 flex items-center gap-3 border backdrop-blur-md cursor-pointer ${
                  selectedClip.id === clip.id
                    ? 'bg-[#18181B]/80 border-[#8BEAD8]/50 text-white shadow-[0_0_20px_rgba(139,234,216,0.15)]'
                    : 'bg-[#000000]/40 border-[#18181B] text-zinc-500 hover:border-[#3F3F46] hover:text-zinc-300'
                }`}
              >
                <div className={`w-2.5 h-2.5 rounded-full transition-colors ${selectedClip.id === clip.id ? 'bg-[#8BEAD8] shadow-[0_0_8px_rgba(139,234,216,0.8)]' : 'bg-zinc-700'}`}></div>
                <span className="truncate max-w-[200px] font-display">{clip.title}</span>
                <span className={`px-2 py-1 rounded-lg text-[10px] font-mono border ${
                  selectedClip.id === clip.id ? 'bg-[#8BEAD8]/10 text-[#8BEAD8] border-[#8BEAD8]/20' : 'bg-[#18181B] text-zinc-500 border-transparent group-hover:text-zinc-400'
                }`}>
                  {clip.viralityScore} / 100
                </span>
              </button>
            ))}
          </div>

          {/* 2 Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center flex-1">
            
            {/* Phone Player (Left) */}
            <div className="lg:col-span-5 flex justify-center relative">
              {/* Premium Glow Behind Phone */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[550px] bg-[#8BEAD8]/20 rounded-[50px] blur-[80px] z-0 pointer-events-none" />
              
              <div className="relative w-full max-w-[340px] aspect-[9/16] bg-[#000000] rounded-[50px] border-[6px] border-[#18181B] shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-hidden z-10 group">
                
                {/* iPhone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-[#18181B] rounded-b-3xl z-40 flex items-center justify-center">
                  <div className="w-16 h-4 rounded-full bg-[#000000] shadow-inner flex items-center justify-end px-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A] border border-[#333]"></div>
                  </div>
                </div>

                <div className="relative w-full h-full rounded-[44px] overflow-hidden bg-black flex items-center justify-center">
                  <video
                    ref={videoRef}
                    src={selectedClip.videoUrl}
                    poster={selectedClip.thumbnailUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                      aspectRatio === '1:1' ? 'scale-75 rounded-3xl' : aspectRatio === '16:9' ? 'scale-[0.5625] rounded-3xl' : 'scale-100'
                    }`}
                  />

                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none"></div>

                  <div className="absolute bottom-20 inset-x-4 text-center z-20 pointer-events-none">
                    {captionStyle === 'hormozi' && (
                      <div className="inline-block bg-black/90 px-5 py-2.5 rounded-2xl border-2 border-amber-400/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md transform scale-110">
                        <span className="text-2xl font-black font-display text-amber-300 uppercase tracking-tight leading-none drop-shadow-md">
                          IF YOU FAIL <span className="text-[#8BEAD8] underline decoration-4 underline-offset-4">THE FIRST 3 SECONDS</span>
                        </span>
                      </div>
                    )}

                    {captionStyle === 'beast' && (
                      <div className="inline-block bg-yellow-400 text-black px-6 py-2 rounded-3xl font-black text-2xl uppercase tracking-tighter transform -rotate-2 shadow-2xl border-4 border-black">
                        99% OF PEOPLE SCROLL!
                      </div>
                    )}

                    {captionStyle === 'neon' && (
                      <div className="inline-block bg-[#050505]/80 backdrop-blur-xl text-[#8BEAD8] px-5 py-3 rounded-2xl border-2 border-[#8BEAD8]/50 font-mono font-bold text-base shadow-[0_0_20px_rgba(139,234,216,0.3)]">
                        ⚡ AI Retention Spike: 98.4%
                      </div>
                    )}

                    {captionStyle === 'minimal' && (
                      <div className="inline-block text-white font-medium text-lg tracking-wide bg-black/40 backdrop-blur-lg px-5 py-2 rounded-xl border border-white/10">
                        Dopamine anticipation drives action.
                      </div>
                    )}
                  </div>

                  <button
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-all cursor-pointer z-30 opacity-0 group-hover:opacity-100 backdrop-blur-[2px]"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#000000]/80 backdrop-blur-md border border-[#8BEAD8]/40 text-[#8BEAD8] flex items-center justify-center shadow-[0_0_30px_rgba(139,234,216,0.2)] transform hover:scale-110 transition-transform">
                      {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 fill-[#8BEAD8] ml-1.5" />}
                    </div>
                  </button>
                </div>

                {/* iPhone Bottom Bar */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1.5 bg-zinc-600 rounded-full z-40"></div>
              </div>
            </div>

            {/* Right Controls */}
            <div className="lg:col-span-7 flex flex-col gap-6 lg:gap-8 h-full justify-center">
              
              {/* Info Card */}
              <div className="p-8 rounded-[2rem] bg-gradient-to-br from-[#121215] to-[#0A0A0C] border border-[#27272A] shadow-2xl relative overflow-hidden group hover:border-[#3F3F46] transition-colors">
                <div className="absolute top-0 right-0 p-6 opacity-10 text-white transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                  <Maximize2 className="w-32 h-32" />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 mb-4 relative z-10">
                  <span className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#8BEAD8]/20 to-[#8BEAD8]/5 text-[#8BEAD8] text-xs font-mono font-bold border border-[#8BEAD8]/20 flex items-center gap-2 shadow-[0_0_15px_rgba(139,234,216,0.1)]">
                    <Sparkles className="w-3.5 h-3.5" /> Score: {selectedClip.viralityScore}/100
                  </span>
                  <span className="text-xs font-mono text-zinc-500 bg-[#000000] px-4 py-1.5 rounded-xl border border-[#18181B]">
                    Est. Views: <strong className="text-white">{selectedClip.viewsEstimate}</strong>
                  </span>
                </div>

                <h3 className="text-2xl lg:text-3xl font-extrabold font-display text-white mb-3 tracking-tight relative z-10 leading-tight">
                  {selectedClip.title}
                </h3>
                <p className="text-zinc-400 text-sm font-sans mb-6 leading-relaxed relative z-10 border-l-2 border-[#8BEAD8]/30 pl-4 bg-gradient-to-r from-[#8BEAD8]/5 to-transparent py-2 rounded-r-xl">
                  <strong className="text-[#8BEAD8] font-mono block mb-1 text-xs uppercase tracking-wider">AI Analysis:</strong>
                  {selectedClip.hookSummary}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-5 border-t border-[#18181B] relative z-10">
                  <span className="text-xs text-zinc-500 font-mono flex items-center gap-1.5 uppercase tracking-wider mr-2">
                    <Hash className="w-3.5 h-3.5 text-[#8BEAD8]" /> Tags
                  </span>
                  {selectedClip.hashtags.map((tag) => (
                    <span key={tag} className="px-3 py-1.5 rounded-xl bg-[#000000] text-zinc-300 text-[11px] font-mono border border-[#27272A] shadow-inner">
                      {tag}
                    </span>
                  ))}
                  <button
                    onClick={handleCopyHashtags}
                    className="ml-auto px-4 py-1.5 rounded-xl bg-[#18181B] hover:bg-[#27272A] text-zinc-300 text-xs font-mono font-bold flex items-center gap-2 transition-colors cursor-pointer border border-[#3F3F46]/50"
                  >
                    {copiedHashtags ? <Check className="w-3.5 h-3.5 text-[#8BEAD8]" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                    {copiedHashtags ? 'Copied!' : 'Copy All'}
                  </button>
                </div>
              </div>

              {/* Controls Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                
                {/* Caption Style */}
                <div className="p-6 rounded-[2rem] bg-[#0A0A0C] border border-[#27272A] shadow-lg">
                  <label className="block text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Type className="w-4 h-4 text-[#8BEAD8]" /> Caption Style
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'hormozi', name: 'Hormozi' },
                      { id: 'beast', name: 'MrBeast' },
                      { id: 'neon', name: 'Neon' },
                      { id: 'minimal', name: 'Minimal' }
                    ].map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setCaptionStyle(style.id as any)}
                        className={`py-3 px-2 rounded-xl text-center text-xs font-bold font-display uppercase tracking-wide border transition-all cursor-pointer ${
                          captionStyle === style.id
                            ? 'bg-gradient-to-br from-[#8BEAD8]/10 to-transparent border-[#8BEAD8] text-[#8BEAD8] shadow-[0_0_15px_rgba(139,234,216,0.15)]'
                            : 'bg-[#000000] border-[#18181B] text-zinc-500 hover:border-[#3F3F46] hover:text-white'
                        }`}
                      >
                        {style.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Aspect Ratio */}
                <div className="p-6 rounded-[2rem] bg-[#0A0A0C] border border-[#27272A] shadow-lg">
                  <label className="block text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Scissors className="w-4 h-4 text-[#8BEAD8]" /> AI Smart Crop
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: '9:16', name: '9:16' },
                      { id: '1:1', name: '1:1' },
                      { id: '16:9', name: '16:9' }
                    ].map((ratio) => (
                      <button
                        key={ratio.id}
                        onClick={() => setAspectRatio(ratio.id as any)}
                        className={`py-3 px-1 rounded-xl text-center text-xs font-bold font-mono border transition-all cursor-pointer ${
                          aspectRatio === ratio.id
                            ? 'bg-gradient-to-br from-[#8BEAD8]/10 to-transparent border-[#8BEAD8] text-[#8BEAD8] shadow-[0_0_15px_rgba(139,234,216,0.15)]'
                            : 'bg-[#000000] border-[#18181B] text-zinc-500 hover:border-[#3F3F46] hover:text-white'
                        }`}
                      >
                        {ratio.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                <button
                  onClick={handleDownload}
                  className="w-full sm:flex-1 py-4 px-8 rounded-2xl bg-white text-black text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 cursor-pointer font-display hover:bg-[#8BEAD8] transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(139,234,216,0.4)]"
                >
                  <Download className="w-5 h-5" /> Export 4K Short
                </button>

                <button
                  onClick={onOpenPricing}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#121215] border border-[#27272A] hover:bg-[#18181B] hover:border-[#3F3F46] text-white text-sm font-bold transition-all flex items-center justify-center gap-3 cursor-pointer font-display"
                >
                  <Share2 className="w-4 h-4 text-[#8BEAD8]" /> Auto-Publish
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
