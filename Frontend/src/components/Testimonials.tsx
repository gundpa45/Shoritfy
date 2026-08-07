import { Flame, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'David Vance',
    role: 'Host, The FutureTech Podcast (450K Subs)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    metric: '+450K Subs in 60 Days',
    quote: 'Shortify turned our 2-hour long interviews into 12 viral shorts per episode. We hit 18M views on TikTok last month without hiring an editor.',
  },
  {
    name: 'Elena Rostova',
    role: 'Head of Growth, ScaleMedia Agency',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    metric: 'Saved 30 Hrs / Week',
    quote: 'The GPT-4o hook score is scarily accurate. It picks the exact moments that hold retention past 30 seconds. A absolute game changer for agencies.',
  },
  {
    name: 'Marcus Chen',
    role: 'Creator, Business Unlocked (1.2M Followers)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    metric: '$14,500 Extra Revenue',
    quote: 'The active speaker tracking and Hormozi captions look better than human editors charge $50 per clip for. Shortify pays for itself in 10 minutes.',
  }
];

export const Testimonials = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <Flame className="w-3.5 h-3.5" /> Creator Success Stories
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
          Trusted by <span className="text-amber-400">Top Content Creators</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg mt-3">
          See how podcasters, agencies, and YouTubers scale their short-form content output with Shortify AI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((item) => (
          <div
            key={item.name}
            className="nord-card rounded-3xl p-6 lg:p-8 flex flex-col justify-between border border-slate-800 hover:border-amber-500/40 transition-all duration-300 relative"
          >
            <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-800 pointer-events-none" />

            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold border border-amber-500/30 mb-4">
                {item.metric}
              </div>

              <p className="text-slate-300 text-sm leading-relaxed font-sans mb-6 italic">
                "{item.quote}"
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-900">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-11 h-11 rounded-full object-cover border border-amber-400/50"
              />
              <div>
                <h4 className="text-sm font-bold text-white font-display">{item.name}</h4>
                <p className="text-xs text-slate-400 font-mono">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
