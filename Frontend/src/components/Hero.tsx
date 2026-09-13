import React, { useState } from 'react';
import { ArrowUp, Star, MessageSquare, Flame, Play } from 'lucide-react';
import { SAMPLE_URLS } from '../mockData';

interface HeroProps {
  onProcessUrl: (url: string) => void;
}

export const Hero = ({ onProcessUrl }: HeroProps) => {
  const [url, setUrl] = useState('');
  const [selectedSample, setSelectedSample] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      return;
    } else {
      onProcessUrl(url);
    }
  };

  const handleSelectSample = (sampleUrl: string, name: string) => {
    setUrl(sampleUrl);
    setSelectedSample(name);
    onProcessUrl(sampleUrl);
  };

  return (
    <section className="relative pt-16 pb-24 md:pt-24 md:pb-36 bg-app-bg overflow-hidden">
      
      {/* Background Side Fading Grid Gallery (Nordcraft Exact Match) */}
      <div className="absolute inset-y-0 left-0 w-1/4 pointer-events-none opacity-30 z-0 hidden lg:block overflow-hidden">
        <div className="hero-side-fade-left absolute inset-0 z-10" />
        <div className="space-y-4 -rotate-6 scale-95 translate-x-[-20%]">
          <div className="w-56 h-72 rounded-2xl bg-app-surface border border-app-border p-4 flex flex-col justify-between shadow-2xl">
            <div className="w-full h-40 rounded-xl bg-app-raised overflow-hidden">
              <img src="https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?auto=format&fit=crop&w=300&q=80" alt="Short preview" className="w-full h-full object-cover" />
            </div>
            <div className="h-4 bg-app-raised rounded w-3/4"></div>
            <div className="h-3 bg-app-raised/60 rounded w-1/2"></div>
          </div>
          <div className="w-56 h-72 rounded-2xl bg-app-surface border border-app-border p-4 flex flex-col justify-between shadow-2xl">
            <div className="w-full h-40 rounded-xl bg-app-raised overflow-hidden">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" alt="Short preview" className="w-full h-full object-cover" />
            </div>
            <div className="h-4 bg-app-raised rounded w-4/5"></div>
          </div>
        </div>
      </div>

      <div className="absolute inset-y-0 right-0 w-1/4 pointer-events-none opacity-30 z-0 hidden lg:block overflow-hidden">
        <div className="hero-side-fade-right absolute inset-0 z-10" />
        <div className="space-y-4 rotate-6 scale-95 translate-x-[20%]">
          <div className="w-56 h-72 rounded-2xl bg-app-surface border border-app-border p-4 flex flex-col justify-between shadow-2xl">
            <div className="w-full h-40 rounded-xl bg-app-raised overflow-hidden">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" alt="Short preview" className="w-full h-full object-cover" />
            </div>
            <div className="h-4 bg-app-raised rounded w-2/3"></div>
          </div>
          <div className="w-56 h-72 rounded-2xl bg-app-surface border border-app-border p-4 flex flex-col justify-between shadow-2xl">
            <div className="w-full h-40 rounded-xl bg-app-raised overflow-hidden">
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80" alt="Short preview" className="w-full h-full object-cover" />
            </div>
            <div className="h-4 bg-app-raised rounded w-3/4"></div>
          </div>
        </div>
      </div>

      {/* Main Center Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        
        {/* Top Badge Pill (Nordcraft Exact Match) */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-app-raised border border-app-border mb-8 text-xs text-app-muted font-sans">
          <span className="flex items-center gap-1 hover:text-app-text transition-colors cursor-pointer">
            <Star className="w-3.5 h-3.5 text-app-muted" /> Star 12k
          </span>
          <span className="text-zinc-700">|</span>
          <span className="flex items-center gap-1 hover:text-app-text transition-colors cursor-pointer">
            <MessageSquare className="w-3.5 h-3.5 text-app-muted" /> Chat
          </span>
          <span className="px-2 py-0.5 rounded-full bg-app-raised text-app-accent font-semibold border border-app-accent/30 font-mono text-[11px]">
            New Shortify 3.4!
          </span>
        </div>

        {/* H1 Headline (Nordcraft Typography Exact Match) */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-app-text font-display tracking-tight leading-[1.08] max-w-3xl mx-auto mb-6">
          The AI video creator for creative studios
        </h1>

        {/* Subhead */}
        <p className="text-base sm:text-xl text-app-muted font-normal leading-relaxed max-w-2xl mx-auto mb-10">
          Shortify combines a powerful AI Whisper pipeline with autonomous speaker tracking, giving you the speed of AI and complete creative control.
        </p>

        {/* Primary Dual Action Row (Nordcraft Dual Box Exact Match) */}
        <div className="max-w-xl mx-auto mb-8">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            
            {/* Start Clipping CTA Button */}
            <button
              type="button"
              onClick={() => { if (url.trim()) onProcessUrl(url.trim()); }}
              className="btn-nord-cyan px-6 py-3.5 rounded-2xl text-sm font-bold shrink-0 w-full sm:w-auto font-display cursor-pointer"
            >
              Find the good parts
            </button>

            <span className="text-app-subtle font-mono text-xs hidden sm:inline">or</span>

            {/* Input Box with Upward Arrow Send Button */}
            <div className="relative flex-1 w-full">
              <input
                type="url"
                aria-label="YouTube video URL"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Start with a YouTube URL..."
                className="w-full pl-4 pr-12 py-3.5 bg-app-raised border border-app-border rounded-2xl text-xs sm:text-sm text-app-text placeholder-app-subtle focus:outline-none focus:border-app-accent transition-all font-mono"
              />
              <button
                type="submit"
                aria-label="Find clips from YouTube URL"
                className="absolute right-2 top-2 bottom-2 w-9 h-9 rounded-xl bg-app-border hover:bg-app-border-strong text-app-text flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>

          </form>
        </div>

        {/* Or Try A Demo Pills Row (Nordcraft Exact Match) */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-sans text-app-muted">
          <span className="text-app-subtle mr-1 flex items-center gap-1 font-mono">
            <Flame className="w-3.5 h-3.5 text-amber-400" /> Or try a demo
          </span>
          {SAMPLE_URLS.map((sample) => (
            <button
              key={sample.name}
              type="button"
              onClick={() => handleSelectSample(sample.url, sample.name)}
              className={`px-3 py-1.5 rounded-xl border text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedSample === sample.name
                  ? 'bg-app-raised border-app-accent text-app-accent font-medium'
                  : 'bg-app-raised border-app-border text-app-muted hover:border-app-border hover:text-app-text'
              }`}
            >
              <Play className="w-3 h-3 text-app-accent" />
              {sample.name}
            </button>
          ))}
        </div>

      </div>

    </section>
  );
};
