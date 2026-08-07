import { useState } from 'react';
import { MOCK_CLIPS } from '../mockData';
import type { Clip } from '../types';
import { Sparkles, Download, Type, FolderKanban, Plus, Edit3, Share2, BarChart3, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DashboardViewProps {
  onBackToLanding: () => void;
}

export const DashboardView = ({ onBackToLanding }: DashboardViewProps) => {
  const [activeClip, setActiveClip] = useState<Clip>(MOCK_CLIPS[0]);
  const [captionStyle, setCaptionStyle] = useState<'hormozi' | 'beast' | 'minimal' | 'neon'>('hormozi');
  const [newUrl, setNewUrl] = useState('');
  const [editableTranscript, setEditableTranscript] = useState(activeClip.transcriptSnippet);

  const handleSelectClip = (clip: Clip) => {
    setActiveClip(clip);
    setEditableTranscript(clip.transcriptSnippet);
  };

  const handleExport = () => {
    try {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    } catch {
      // silent
    }
    alert(`Exporting "${activeClip.title}" in 4K 60FPS! Scheduled for publication.`);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-zinc-100 font-sans flex flex-col">
      
      {/* SaaS Workspace Top Bar */}
      <header className="border-b border-[#18181B] bg-[#09090B] px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToLanding}
            className="text-xs font-mono text-zinc-400 hover:text-[#8BEAD8] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Landing Page
          </button>
          <span className="text-zinc-800">|</span>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8BEAD8] animate-pulse"></span>
            <span className="text-sm font-bold font-display text-white">Shortify SaaS Workspace</span>
            <span className="px-2 py-0.5 rounded bg-[#8BEAD8]/20 text-[#8BEAD8] text-[10px] font-mono border border-[#8BEAD8]/30">
              Pro Active
            </span>
          </div>
        </div>

        {/* Process Bar */}
        <div className="hidden md:flex items-center gap-2 max-w-md w-full">
          <div className="relative flex-1">
            <input
              type="text"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="Paste YouTube video URL..."
              className="w-full px-3 py-1.5 bg-[#18181B] border border-[#27272A] rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#8BEAD8] font-mono"
            />
          </div>
          <button
            onClick={() => {
              if (newUrl) alert(`Processing new video: ${newUrl}`);
            }}
            className="btn-nord-cyan px-3 py-1.5 text-xs font-display flex items-center gap-1 cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" /> Import
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#18181B] border border-[#27272A] flex items-center justify-center font-bold text-xs text-[#8BEAD8]">
            JD
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left Sidebar */}
        <aside className="lg:col-span-3 border-r border-[#18181B] bg-[#09090B] p-4 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-4 px-2">
              <span className="flex items-center gap-1.5"><FolderKanban className="w-4 h-4 text-[#8BEAD8]" /> Active Clips ({MOCK_CLIPS.length})</span>
            </div>

            <div className="space-y-2.5">
              {MOCK_CLIPS.map((clip) => (
                <div
                  key={clip.id}
                  onClick={() => handleSelectClip(clip)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    activeClip.id === clip.id
                      ? 'bg-[#18181B] border-[#8BEAD8]'
                      : 'bg-[#121215] border-[#18181B] hover:border-[#27272A]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1">
                    <span className="text-[#8BEAD8]">{clip.duration}</span>
                    <span className="px-1.5 py-0.5 rounded bg-[#8BEAD8]/20 text-[#8BEAD8] text-[10px] font-bold">
                      {clip.viralityScore}/100 Virality
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white font-display line-clamp-2">
                    {clip.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400 font-mono mt-1 truncate">
                    Timestamp: {clip.startTime} - {clip.endTime}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-[#121215] border border-[#27272A]">
            <div className="flex items-center gap-2 text-xs font-bold font-display text-[#8BEAD8] mb-1">
              <Sparkles className="w-4 h-4" /> 240 Mins Remaining
            </div>
            <p className="text-[11px] text-zinc-400 font-mono mb-3">
              Pro plan includes 300 mins monthly GPU rendering.
            </p>
            <div className="h-1.5 w-full bg-[#18181B] rounded-full overflow-hidden mb-3">
              <div className="h-full bg-[#8BEAD8] w-4/5 rounded-full" />
            </div>
          </div>
        </aside>

        {/* Center Canvas */}
        <main className="lg:col-span-5 p-6 bg-[#000000] flex flex-col items-center justify-center border-r border-[#18181B]">
          <div className="w-full max-w-[340px] aspect-[9/16] bg-[#000000] rounded-[44px] border-4 border-[#27272A] p-3 shadow-2xl relative flex flex-col justify-between overflow-hidden">
            
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#18181B] rounded-full z-30 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#000000]"></div>
            </div>

            <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-black flex items-center justify-center">
              <video
                src={activeClip.videoUrl}
                poster={activeClip.thumbnailUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-16 inset-x-4 text-center z-20 pointer-events-none">
                <div className="inline-block bg-black/85 px-4 py-2 rounded-xl border border-amber-400/50 shadow-2xl">
                  <span className="text-lg font-black font-display text-amber-300 uppercase tracking-wide">
                    {editableTranscript || activeClip.transcriptSnippet}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </main>

        {/* Right Panel */}
        <aside className="lg:col-span-4 p-6 bg-[#09090B] flex flex-col justify-between overflow-y-auto space-y-6">
          
          <div className="p-5 rounded-2xl bg-[#121215] border border-[#27272A]">
            <label className="block text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Edit3 className="w-4 h-4 text-[#8BEAD8]" /> Kinetic Caption Editor
            </label>
            <textarea
              rows={3}
              value={editableTranscript}
              onChange={(e) => setEditableTranscript(e.target.value)}
              className="w-full p-3 bg-[#18181B] border border-[#27272A] rounded-xl text-xs text-white font-mono focus:outline-none focus:border-[#8BEAD8]"
            />
          </div>

          <div className="p-5 rounded-2xl bg-[#121215] border border-[#27272A]">
            <label className="block text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Type className="w-4 h-4 text-[#8BEAD8]" /> Caption Style Preset
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
                  className={`p-2.5 rounded-xl text-xs font-semibold border text-left transition-all cursor-pointer ${
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

          <div className="p-5 rounded-2xl bg-[#121215] border border-[#27272A]">
            <label className="block text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-[#8BEAD8]" /> Virality Retention Score
            </label>
            <div className="flex items-center justify-between bg-[#18181B] p-3 rounded-xl border border-[#27272A] mb-3">
              <span className="text-xs font-mono text-zinc-400">Score Rating</span>
              <span className="text-lg font-extrabold font-mono text-[#8BEAD8]">
                {activeClip.viralityScore}/100 (Top 2%)
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              {activeClip.hookSummary}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={handleExport}
              className="btn-nord-cyan w-full py-4 text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer font-display"
            >
              <Download className="w-5 h-5" /> Export 4K Short Video
            </button>

            <button
              onClick={handleExport}
              className="btn-nord-dark w-full py-3 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer font-display"
            >
              <Share2 className="w-4 h-4 text-[#8BEAD8]" /> Auto-Publish
            </button>
          </div>

        </aside>

      </div>

    </div>
  );
};
