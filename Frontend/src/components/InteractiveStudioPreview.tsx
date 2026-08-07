import { useState, useRef } from 'react';
import { Play, Pause, Download, Share2, Sparkles, Flame, Type, Smartphone, Check, Hash, Copy } from 'lucide-react';
import { MOCK_CLIPS } from '../mockData';
import type { Clip } from '../types';
import confetti from 'canvas-confetti';

interface StudioPreviewProps {
  onOpenPricing: () => void;
}

export const InteractiveStudioPreview = ({ onOpenPricing }: StudioPreviewProps) => {
  const [selectedClip, setSelectedClip] = useState<Clip>(MOCK_CLIPS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [captionStyle, setCaptionStyle] = useState<'hormozi' | 'beast' | 'minimal' | 'neon'>('hormozi');
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '1:1' | '16:9'>('9:16');
  const [copiedHashtags, setCopiedHashtags] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

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
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#18181B]" id="demo">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-[#27272A] text-[#8BEAD8] text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" /> Interactive Output Studio
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
          Preview & Customize Your Viral Shorts
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg mt-3">
          Test real video playback, switch Alex Hormozi caption styles, toggle 9:16 framing, and copy viral hashtags.
        </p>
      </div>

      {/* Main Studio Card */}
      <div className="nord-card p-6 lg:p-10 relative bg-[#09090B]">
        
        {/* Clip Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8 border-b border-[#18181B] scrollbar-none">
          <span className="text-xs font-mono text-zinc-400 font-bold uppercase shrink-0 mr-2 flex items-center gap-1">
            <Flame className="w-4 h-4 text-amber-400" /> Extracted Clips ({MOCK_CLIPS.length}):
          </span>
          {MOCK_CLIPS.map((clip) => (
            <button
              key={clip.id}
              onClick={() => setSelectedClip(clip)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-2 border cursor-pointer ${
                selectedClip.id === clip.id
                  ? 'bg-[#18181B] border-[#8BEAD8] text-white'
                  : 'bg-[#121215] border-[#27272A] text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#8BEAD8]"></span>
              <span className="truncate max-w-[180px]">{clip.title}</span>
              <span className="px-1.5 py-0.5 rounded bg-[#8BEAD8]/20 text-[#8BEAD8] text-[10px] font-mono">
                {clip.viralityScore}/100
              </span>
            </button>
          ))}
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Phone Player */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[320px] aspect-[9/16] bg-[#000000] rounded-[40px] border-4 border-[#27272A] p-3 shadow-2xl flex flex-col justify-between overflow-hidden">
              
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#18181B] rounded-full z-30 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#000000]"></div>
              </div>

              <div className="relative w-full h-full rounded-[30px] overflow-hidden bg-black flex items-center justify-center">
                <video
                  ref={videoRef}
                  src={selectedClip.videoUrl}
                  poster={selectedClip.thumbnailUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={`w-full h-full object-cover transition-all ${
                    aspectRatio === '1:1' ? 'scale-75' : aspectRatio === '16:9' ? 'scale-50' : 'scale-100'
                  }`}
                />

                <div className="absolute bottom-16 inset-x-4 text-center z-20 pointer-events-none">
                  {captionStyle === 'hormozi' && (
                    <div className="inline-block bg-black/85 px-4 py-2 rounded-xl border border-amber-400/40 shadow-2xl">
                      <span className="text-xl font-black font-display text-amber-300 uppercase tracking-wide">
                        IF YOU FAIL <span className="text-[#8BEAD8] underline">THE FIRST 3 SECONDS</span>
                      </span>
                    </div>
                  )}

                  {captionStyle === 'beast' && (
                    <div className="inline-block bg-yellow-400 text-black px-4 py-1.5 rounded-2xl font-black text-lg uppercase tracking-wider transform -rotate-1">
                      99% OF PEOPLE SCROLL AWAY!
                    </div>
                  )}

                  {captionStyle === 'neon' && (
                    <div className="inline-block bg-[#09090B] text-[#8BEAD8] px-4 py-2 rounded-xl border border-[#8BEAD8] font-mono font-bold text-sm">
                      ⚡ AI Retention Spike: 98.4%
                    </div>
                  )}

                  {captionStyle === 'minimal' && (
                    <div className="inline-block text-white font-medium text-base tracking-wide bg-black/60 px-3 py-1 rounded-md">
                      Dopamine anticipation drives action.
                    </div>
                  )}
                </div>

                <button
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors cursor-pointer z-10"
                >
                  <div className="w-14 h-14 rounded-full bg-[#18181B]/90 border border-[#8BEAD8]/50 text-[#8BEAD8] flex items-center justify-center shadow-xl">
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-[#8BEAD8] ml-1" />}
                  </div>
                </button>
              </div>

            </div>
          </div>

          {/* Right Controls */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            <div className="p-6 rounded-2xl bg-[#121215] border border-[#27272A]">
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="px-2.5 py-1 rounded-md bg-[#8BEAD8]/20 text-[#8BEAD8] text-xs font-mono font-bold border border-[#8BEAD8]/30">
                  Virality Potential: {selectedClip.viralityScore}/100
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  Est. Views: <strong className="text-white">{selectedClip.viewsEstimate}</strong>
                </span>
              </div>

              <h3 className="text-xl font-bold font-display text-white mb-2">
                {selectedClip.title}
              </h3>
              <p className="text-zinc-400 text-sm font-sans mb-4">
                <strong className="text-[#8BEAD8] font-mono">AI Hook Summary:</strong> {selectedClip.hookSummary}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#27272A]">
                <span className="text-xs text-zinc-400 font-mono flex items-center gap-1">
                  <Hash className="w-3.5 h-3.5 text-[#8BEAD8]" /> Tags:
                </span>
                {selectedClip.hashtags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg bg-[#18181B] text-zinc-300 text-xs font-mono border border-[#27272A]">
                    {tag}
                  </span>
                ))}
                <button
                  onClick={handleCopyHashtags}
                  className="ml-auto px-2.5 py-1 rounded-lg bg-[#18181B] hover:bg-[#27272A] text-zinc-300 text-xs font-mono flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedHashtags ? <Check className="w-3 h-3 text-[#8BEAD8]" /> : <Copy className="w-3 h-3" />}
                  {copiedHashtags ? 'Copied' : 'Copy All'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#121215] border border-[#27272A]">
                <label className="block text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Type className="w-4 h-4 text-[#8BEAD8]" /> Caption Style
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'hormozi', name: 'Alex Hormozi' },
                    { id: 'beast', name: 'MrBeast' },
                    { id: 'neon', name: 'Cyber Neon' },
                    { id: 'minimal', name: 'Minimalist' }
                  ].map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setCaptionStyle(style.id as any)}
                      className={`p-2.5 rounded-xl text-left text-xs font-semibold border transition-all cursor-pointer ${
                        captionStyle === style.id
                          ? 'bg-[#18181B] border-[#8BEAD8] text-[#8BEAD8]'
                          : 'bg-[#09090B] border-[#27272A] text-zinc-400 hover:text-white'
                      }`}
                    >
                      {style.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#121215] border border-[#27272A]">
                <label className="block text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-[#8BEAD8]" /> Output Ratio
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: '9:16', name: '9:16' },
                    { id: '1:1', name: '1:1' },
                    { id: '16:9', name: '16:9' }
                  ].map((ratio) => (
                    <button
                      key={ratio.id}
                      onClick={() => setAspectRatio(ratio.id as any)}
                      className={`p-2.5 rounded-xl text-center text-xs font-semibold border transition-all cursor-pointer ${
                        aspectRatio === ratio.id
                          ? 'bg-[#18181B] border-[#8BEAD8] text-[#8BEAD8]'
                          : 'bg-[#09090B] border-[#27272A] text-zinc-400 hover:text-white'
                      }`}
                    >
                      {ratio.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                onClick={handleDownload}
                className="btn-nord-cyan w-full sm:flex-1 py-3.5 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer font-display"
              >
                <Download className="w-4 h-4" /> Download 4K Short
              </button>

              <button
                onClick={onOpenPricing}
                className="btn-nord-dark w-full sm:w-auto px-6 py-3.5 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer font-display"
              >
                <Share2 className="w-4 h-4 text-[#8BEAD8]" /> Auto-Publish
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
