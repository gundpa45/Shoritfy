import { useState } from 'react';
import { Check, Zap } from 'lucide-react';

interface PricingProps {
  onSelectPlan: (planName: string, price: string) => void;
}

export const Pricing = ({ onSelectPlan }: PricingProps) => {
  const [annual, setAnnual] = useState(true);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-app-border" id="pricing">
      
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-app-raised border border-app-border text-app-accent text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <Zap className="w-3.5 h-3.5" /> Transparent Pricing
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-app-text font-display tracking-tight">
          Simple Plans for Viral Creators
        </h2>
        <p className="text-app-muted text-base sm:text-lg mt-3">
          Start for free today. Upgrade anytime as your audience scales.
        </p>

        <div className="flex items-center justify-center gap-3 mt-8">
          <span className={`text-xs font-mono font-semibold ${!annual ? 'text-app-text' : 'text-app-muted'}`}>
            Monthly
          </span>
          <button
            onClick={() => setAnnual(!annual)}
            className="relative w-14 h-7 rounded-full bg-app-raised border border-app-border p-1 transition-colors cursor-pointer"
          >
            <div
              className={`w-5 h-5 rounded-full bg-[#8BEAD8] transition-transform ${
                annual ? 'translate-x-7' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-xs font-mono font-semibold flex items-center gap-1.5 ${annual ? 'text-app-text' : 'text-app-muted'}`}>
            Annual Billing
            <span className="px-2 py-0.5 rounded-md bg-[#8BEAD8]/20 text-app-accent text-[10px] font-bold border border-app-accent/30">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
        
        {/* Free */}
        <div className="nord-card p-8 border border-app-border flex flex-col justify-between hover:border-app-border transition-all bg-app-surface">
          <div>
            <h3 className="text-xl font-bold font-display text-app-text mb-2">Starter Creator</h3>
            <p className="text-xs text-app-muted font-mono mb-6">Ideal for experimenting with AI short clips.</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-extrabold text-app-text font-display">$0</span>
              <span className="text-xs text-app-muted font-mono">/ forever</span>
            </div>

            <ul className="space-y-3 text-xs font-sans text-app-muted mb-8">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-app-accent" /> 60 Video Processing Mins / mo
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-app-accent" /> Standard Subtitles
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-app-accent" /> 720p HD Video Output
              </li>
              <li className="flex items-center gap-2 text-app-subtle">
                <span>❌</span> 9:16 Speaker Auto-Crop
              </li>
              <li className="flex items-center gap-2 text-app-subtle">
                <span>❌</span> Alex Hormozi Animated Captions
              </li>
            </ul>
          </div>

          <button
            onClick={() => onSelectPlan('Starter Creator', '$0')}
            className="btn-nord-dark w-full py-3 text-xs font-bold transition-all cursor-pointer font-display"
          >
            Get Started Free
          </button>
        </div>

        {/* Pro Plan */}
        <div className="nord-card p-8 border-2 border-app-accent flex flex-col justify-between relative bg-app-surface shadow-2xl scale-[1.02]">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#8BEAD8] text-black font-extrabold text-[10px] font-mono tracking-wider uppercase">
            🔥 Most Popular
          </div>

          <div>
            <h3 className="text-xl font-bold font-display text-app-text mb-2">Pro Viral</h3>
            <p className="text-xs text-app-muted font-mono mb-6">Everything creators need to go viral consistently.</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-extrabold text-app-accent font-display">
                {annual ? '$23' : '$29'}
              </span>
              <span className="text-xs text-app-muted font-mono">/ month</span>
            </div>

            <ul className="space-y-3 text-xs font-sans text-app-text mb-8">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-app-accent" /> 300 Video Processing Mins / mo
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-app-accent" /> Alex Hormozi Kinetic Captions
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-app-accent" /> 4K Ultra-HD 60FPS Video Export
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-app-accent" /> OpenCV Speaker Face Auto-Crop
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-app-accent" /> GPT-4o Retention Hook Predictor
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-app-accent" /> No Watermarks
              </li>
            </ul>
          </div>

          <button
            onClick={() => onSelectPlan('Pro Viral', annual ? '$23/mo' : '$29/mo')}
            className="btn-nord-cyan w-full py-3.5 text-sm font-extrabold cursor-pointer font-display"
          >
            Start 7-Day Free Trial
          </button>
        </div>

        {/* Agency Plan */}
        <div className="nord-card p-8 border border-app-border flex flex-col justify-between hover:border-app-border transition-all bg-app-surface">
          <div>
            <h3 className="text-xl font-bold font-display text-app-text mb-2">Studio Agency</h3>
            <p className="text-xs text-app-muted font-mono mb-6">Designed for high-volume content agencies.</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-extrabold text-app-text font-display">
                {annual ? '$63' : '$79'}
              </span>
              <span className="text-xs text-app-muted font-mono">/ month</span>
            </div>

            <ul className="space-y-3 text-xs font-sans text-app-muted mb-8">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-app-accent" /> Unlimited Video Mins Processing
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-app-accent" /> Custom Watermark & Brand Overlay
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-app-accent" /> REST API & Webhook Access
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-app-accent" /> Multi-User Team Workspaces (5 Seats)
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-app-accent" /> Priority Worker GPU Execution
              </li>
            </ul>
          </div>

          <button
            onClick={() => onSelectPlan('Studio Agency', annual ? '$63/mo' : '$79/mo')}
            className="btn-nord-dark w-full py-3 text-xs font-bold transition-all cursor-pointer font-display"
          >
            Contact Sales / Subscribe
          </button>
        </div>

      </div>

    </section>
  );
};
