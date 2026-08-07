import { Terminal, Cpu, Eye, Sparkles, Hash, Share2, Layers, Check } from 'lucide-react';

const FEATURES = [
  {
    icon: Terminal,
    tag: 'TRANSCRIPTION ENGINE',
    title: 'OpenAI Whisper v3 Precision',
    description: 'Generates sub-second word timestamps and speaker diarization across 50+ languages with 99.4% speech-to-text accuracy.',
    badge: '50+ Languages',
  },
  {
    icon: Cpu,
    tag: 'HOOK DETECTION',
    title: 'GPT-4o Virality Scoring',
    description: 'Analyzes dialogue curiosity loops, emotional climaxes, and assigns virality scores to isolate top 5% retention moments.',
    badge: '99.2% Hook Accuracy',
  },
  {
    icon: Eye,
    tag: 'COMPUTER VISION',
    title: 'Active Speaker Auto-Frame',
    description: 'Tracks faces in real-time using OpenCV to dynamically re-center dual speakers into vertical 9:16 without letterboxing.',
    badge: '60 FPS Tracking',
  },
  {
    icon: Sparkles,
    tag: 'KINETIC TYPOGRAPHY',
    title: 'Alex Hormozi Captions',
    description: 'Burn energetic word-by-word highlighted captions, emoji pop-ins, and sound effect triggers directly into 4K video streams.',
    badge: '10+ Preset Styles',
  },
  {
    icon: Hash,
    tag: 'SEO METADATA',
    title: 'AI Title & Hashtags Generator',
    description: 'Automatically drafts high-converting titles, descriptions, and trending hashtags optimized for TikTok and YouTube algorithms.',
    badge: 'Auto SEO',
  },
  {
    icon: Share2,
    tag: 'PUBLISHING PIPELINE',
    title: '1-Click Multi-Platform Export',
    description: 'Schedule and push clips directly to TikTok, Instagram Reels, and YouTube Shorts without leaving the Shortify SaaS workspace.',
    badge: 'Direct Export',
  }
];

export const FeatureGrid = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#18181B]" id="features">
      
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-[#27272A] text-[#8BEAD8] text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <Layers className="w-3.5 h-3.5" /> Full Feature Suite
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
          Engineered for Maximum Content Leverage
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg mt-3">
          Shortify replaces an entire editing agency with automated AI pipelines designed specifically for viral video growth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="nord-card p-6 lg:p-8 flex flex-col justify-between border border-[#27272A] hover:border-zinc-700 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#18181B] border border-[#27272A] flex items-center justify-center text-[#8BEAD8]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-[#18181B] border border-[#27272A] text-[10px] font-mono font-bold text-zinc-300">
                    {feature.badge}
                  </span>
                </div>

                <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase block mb-1">
                  {feature.tag}
                </span>

                <h3 className="text-xl font-bold font-display text-white mb-3">
                  {feature.title}
                </h3>

                <p className="text-zinc-400 text-sm leading-relaxed font-sans">
                  {feature.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#18181B] flex items-center gap-2 text-xs font-mono text-zinc-400">
                <Check className="w-4 h-4 text-[#8BEAD8]" /> Automated Pipeline Step
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
