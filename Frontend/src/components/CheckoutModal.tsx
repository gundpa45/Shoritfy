import React, { useState } from 'react';
import { X, ShieldCheck, Zap, Lock, CreditCard, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  price: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, planName, price }) => {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch {
      // silent
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="nord-card rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-700 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
              <Zap className="w-4 h-4" /> Shortify Subscription
            </div>

            <h3 className="text-2xl font-extrabold font-display text-white mb-1">
              Upgrade to {planName}
            </h3>
            <p className="text-slate-400 text-xs font-mono mb-6">
              Total due today: <strong className="text-cyan-300 font-bold text-sm">{price}</strong> (7-day free trial, cancel anytime).
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                  Account Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="creator@channel.com"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Card Details</span>
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-400" /> 256-bit Encrypted
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="4242 •••• •••• 4242"
                    className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                  <CreditCard className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="MM / YY"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500 font-mono text-center"
                />
                <input
                  type="text"
                  required
                  placeholder="CVC"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500 font-mono text-center"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-emerald-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all font-display cursor-pointer flex items-center justify-center gap-2 mt-4"
              >
                <Sparkles className="w-4 h-4 fill-slate-950" />
                Confirm Subscription
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-slate-900 flex items-center justify-center gap-2 text-[11px] font-mono text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Satisfaction Guarantee. Cancel in 1-click.
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold font-display text-white mb-2">Welcome to Shortify Pro!</h3>
            <p className="text-sm font-mono text-slate-300 mb-6">
              Your account ({email || 'creator@channel.com'}) has been upgraded to <strong className="text-cyan-400">{planName}</strong>.
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-cyan-400 text-slate-950 font-bold text-sm font-display cursor-pointer"
            >
              Start Clipping Now 🚀
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
