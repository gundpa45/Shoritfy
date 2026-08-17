import { useState } from 'react';
import { MOCK_CLIPS } from '../mockData';
import type { Clip } from '../types';
import { Download, Type, FolderKanban, Plus, Share2, BarChart3, ArrowLeft, Maximize, Play, Settings } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DashboardViewProps {
  onBackToLanding: () => void;
}

export const DashboardView = ({ onBackToLanding }: DashboardViewProps) => {
  const [activeClip, setActiveClip] = useState<Clip>(MOCK_CLIPS[0]);
  const [captionStyle, setCaptionStyle] = useState<'hormozi' | 'beast' | 'minimal' | 'neon'>('hormozi');
  const [newUrl, setNewUrl] = useState('');
  const [editableTranscript, setEditableTranscript] = useState(activeClip.transcriptSnippet);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSelectClip = (clip: Clip) => {
    setActiveClip(clip);
    setEditableTranscript(clip.transcriptSnippet);
  };

  const handleExport = () => {
    try {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 }, colors: ['#8BEAD8', '#ffffff', '#5eead4'] });
    } catch {
      // silent
    }
    alert(`Exporting "${activeClip.title}" in 4K 60FPS! Scheduled for publication.`);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-zinc-100 font-sans flex flex-col selection:bg-[#8BEAD8]/30">
      
      {/* SaaS Workspace Top Bar - Premium Dark */}
      <header className="border-b border-[#18181B] bg-[#050505]/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <button
            onClick={onBackToLanding}
            className="w-10 h-10 rounded-xl bg-[#0A0A0C] border border-[#18181B] text-zinc-400 hover:text-white hover:border-[#3F3F46] flex items-center justify-center transition-all cursor-pointer shadow-inner"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8BEAD8] opacity-60"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#8BEAD8]"></span>
            </div>
            <span className="text-base font-black font-display text-white tracking-wide">Studio<span className="text-[#8BEAD8]">SaaS</span></span>
            <span className="px-2.5 py-1 rounded-lg bg-[#8BEAD8]/10 text-[#8BEAD8] text-[10px] uppercase font-mono font-bold tracking-widest border border-[#8BEAD8]/20">
              Pro
            </span>
          </div>
        </div>

        {/* Process Bar */}
        <div className="hidden md:flex items-center gap-3 max-w-lg w-full bg-[#0A0A0C] p-1.5 rounded-2xl border border-[#18181B] shadow-inner">
          <div className="relative flex-1">
            <input
              type="text"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="Paste YouTube video URL to generate clips..."
              className="w-full px-4 py-2 bg-transparent text-sm text-white placeholder-zinc-600 focus:outline-none font-mono"
            />
          </div>
          <button
            onClick={() => {
              if (newUrl) {
                window.location.href = `/url?video=${encodeURIComponent(newUrl)}`;
              }
            }}
            className="bg-white text-black hover:bg-[#8BEAD8] px-5 py-2 rounded-xl text-xs font-bold font-display uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors shadow-lg"
          >
            <Plus className="w-4 h-4" /> Import
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-zinc-500 hover:text-white transition-colors cursor-pointer">
            <Settings className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#18181B] to-[#0A0A0C] border border-[#27272A] flex items-center justify-center font-black text-sm text-[#8BEAD8] shadow-inner cursor-pointer hover:border-[#8BEAD8]/50 transition-colors">
            JD
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar - Clip Navigation */}
        <aside className="w-[320px] shrink-0 border-r border-[#18181B] bg-[#050505] flex flex-col">
          <div className="p-6 pb-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mb-4">
              <span className="flex items-center gap-2 text-white"><FolderKanban className="w-4 h-4 text-[#8BEAD8]" /> Generated Clips</span>
              <span className="bg-[#18181B] px-2 py-1 rounded text-zinc-400">{MOCK_CLIPS.length}</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-3 custom-scrollbar">
            {MOCK_CLIPS.map((clip) => (
              <div
                key={clip.id}
                onClick={() => handleSelectClip(clip)}
                className={`group p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                  activeClip.id === clip.id
                    ? 'bg-[#18181B] border-[#8BEAD8]/40 shadow-[0_0_20px_rgba(139,234,216,0.05)]'
                    : 'bg-[#0A0A0C] border-[#18181B] hover:border-[#27272A]'
                }`}
              >
                {activeClip.id === clip.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#8BEAD8] shadow-[0_0_10px_rgba(139,234,216,0.8)]"></div>
                )}
                <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 mb-3">
                  <span className={activeClip.id === clip.id ? "text-white" : ""}>{clip.duration}</span>
                  <span className={`px-2 py-1 rounded border ${
                    activeClip.id === clip.id ? 'bg-[#8BEAD8]/10 text-[#8BEAD8] border-[#8BEAD8]/20' : 'bg-[#000000] border-[#18181B] text-zinc-600'
                  }`}>
                    Score {clip.viralityScore}
                  </span>
                </div>
                <h4 className={`text-sm font-bold font-display leading-snug line-clamp-2 ${
                  activeClip.id === clip.id ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-300'
                }`}>
                  {clip.title}
                </h4>
              </div>
            ))}
          </div>

          <div className="p-6 border-t border-[#18181B] bg-[#0A0A0C]">
            <div className="flex items-center justify-between text-xs font-bold font-display text-white mb-2 uppercase tracking-wide">
              <span>GPU Rendering Time</span>
              <span className="text-[#8BEAD8]">80% Left</span>
            </div>
            <div className="h-2 w-full bg-[#000000] rounded-full overflow-hidden border border-[#18181B] shadow-inner mb-2">
              <div className="h-full bg-gradient-to-r from-[#8BEAD8]/50 to-[#8BEAD8] w-4/5 rounded-full" />
            </div>
            <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
              240 / 300 Mins Remaining
            </p>
          </div>
        </aside>

        {/* Center Canvas - Premium Editor */}
        <main className="flex-1 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/80 via-[#000000]/95 to-[#000000]"></div>
          
          <div className="relative z-10 w-full max-w-[400px] flex flex-col items-center">
            
            <div className="w-full flex items-center justify-between mb-6 px-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">Live Preview</span>
              </div>
              <button className="text-zinc-500 hover:text-white transition-colors cursor-pointer p-2 rounded-lg bg-[#18181B] border border-[#27272A]">
                <Maximize className="w-4 h-4" />
              </button>
            </div>

            <div className="w-full aspect-[9/16] bg-[#000000] rounded-[3rem] border-8 border-[#18181B] p-2 shadow-[0_30px_60px_rgba(0,0,0,0.9)] relative flex flex-col justify-between overflow-hidden group">
              
              <div className="relative w-full h-full rounded-[2.25rem] overflow-hidden bg-black flex items-center justify-center">
                <video
                  src={activeClip.videoUrl}
                  poster={activeClip.thumbnailUrl}
                  autoPlay
                  loop
                  muted={!isPlaying}
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none"></div>

                <div className="absolute bottom-20 inset-x-4 text-center z-20 pointer-events-none">
                  {captionStyle === 'hormozi' && (
                    <div className="inline-block bg-black/90 px-5 py-2.5 rounded-2xl border-2 border-amber-400/30 shadow-2xl backdrop-blur-md transform scale-105">
                      <span className="text-2xl font-black font-display text-amber-300 uppercase tracking-tight leading-none">
                        {editableTranscript || activeClip.transcriptSnippet}
                      </span>
                    </div>
                  )}

                  {captionStyle === 'beast' && (
                    <div className="inline-block bg-yellow-400 text-black px-6 py-2 rounded-3xl font-black text-xl uppercase tracking-tighter transform -rotate-2 border-4 border-black shadow-xl max-w-xs">
                      {editableTranscript || activeClip.transcriptSnippet}
                    </div>
                  )}

                  {captionStyle === 'neon' && (
                    <div className="inline-block bg-[#050505]/80 backdrop-blur-xl text-[#8BEAD8] px-5 py-3 rounded-2xl border-2 border-[#8BEAD8]/50 font-mono font-bold text-sm shadow-[0_0_20px_rgba(139,234,216,0.3)]">
                      {editableTranscript || activeClip.transcriptSnippet}
                    </div>
                  )}

                  {captionStyle === 'minimal' && (
                    <div className="inline-block text-white font-medium text-lg tracking-wide bg-black/40 backdrop-blur-lg px-4 py-2 rounded-xl border border-white/10 max-w-xs">
                      {editableTranscript || activeClip.transcriptSnippet}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-all cursor-pointer z-30 opacity-0 group-hover:opacity-100"
                >
                  <div className="w-16 h-16 rounded-full bg-[#000000]/80 backdrop-blur-md border border-white/10 text-white flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform">
                    {isPlaying ? (
                      <div className="flex gap-1.5"><div className="w-2 h-6 bg-white rounded-full"></div><div className="w-2 h-6 bg-white rounded-full"></div></div>
                    ) : (
                      <Play className="w-7 h-7 fill-white ml-1.5" />
                    )}
                  </div>
                </button>
              </div>

              {/* iPhone Bottom Bar */}
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1/3 h-1.5 bg-zinc-700/50 rounded-full z-40 backdrop-blur-sm"></div>
            </div>

          </div>
        </main>

        {/* Right Sidebar - Inspector Panel */}
        <aside className="w-[400px] shrink-0 border-l border-[#18181B] bg-[#050505] p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
          
          <div className="rounded-[2rem] bg-[#0A0A0C] border border-[#18181B] p-6 shadow-lg">
            <label className="block text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#8BEAD8]" /> Virality Retention Score
            </label>
            <div className="flex flex-col gap-1 mb-4">
              <span className="text-4xl font-black font-display text-white tracking-tight drop-shadow-md">
                {activeClip.viralityScore}<span className="text-lg text-zinc-600">/100</span>
              </span>
              <span className="text-xs font-mono text-[#8BEAD8] font-bold uppercase tracking-wider">Top 2% of analyzed clips</span>
            </div>
            <p className="text-sm text-zinc-400 font-sans leading-relaxed p-4 rounded-2xl bg-[#000000] border border-[#18181B] shadow-inner">
              {activeClip.hookSummary}
            </p>
          </div>
          
          <div className="rounded-[2rem] bg-[#0A0A0C] border border-[#18181B] p-6 shadow-lg">
            <label className="block text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Type className="w-4 h-4 text-white" /> Caption Engine
            </label>
            <textarea
              rows={3}
              value={editableTranscript}
              onChange={(e) => setEditableTranscript(e.target.value)}
              className="w-full p-4 bg-[#000000] border border-[#18181B] rounded-2xl text-sm text-white font-mono focus:outline-none focus:border-[#8BEAD8]/50 shadow-inner resize-none mb-5"
            />

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
                      ? 'bg-gradient-to-br from-[#8BEAD8]/10 to-transparent border-[#8BEAD8] text-[#8BEAD8] shadow-[0_0_15px_rgba(139,234,216,0.1)]'
                      : 'bg-[#000000] border-[#18181B] text-zinc-500 hover:border-[#3F3F46] hover:text-white'
                  }`}
                >
                  {style.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-[#18181B] flex flex-col gap-3">
            <button
              onClick={handleExport}
              className="w-full py-4 rounded-2xl bg-white text-black text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 cursor-pointer font-display hover:bg-[#8BEAD8] transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(139,234,216,0.4)]"
            >
              <Download className="w-5 h-5" /> Export & Download
            </button>

            <button
              onClick={handleExport}
              className="w-full py-4 rounded-2xl bg-[#0A0A0C] border border-[#27272A] hover:bg-[#18181B] hover:border-[#3F3F46] text-white text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 cursor-pointer font-display shadow-lg"
            >
              <Share2 className="w-4 h-4 text-[#8BEAD8]" /> Publish to Socials
            </button>
          </div>

        </aside>

      </div>
    </div>
  );
};
