import { Zap, ShieldCheck, Terminal } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-app-border bg-app-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-app-raised border border-app-border flex items-center justify-center text-app-accent">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <span className="text-base font-extrabold text-app-text font-display">Shortify.ai</span>
            <span className="block text-[10px] font-mono text-app-subtle uppercase tracking-widest">
              AI Video Platform
            </span>
          </div>
        </div>

        {/* Security / Compliance Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-app-muted">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-app-accent" /> SOC2 Type II Certified
          </div>
          <div className="flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-app-muted" /> 256-bit SSL Encrypted
          </div>
        </div>

        {/* Copyright */}
        <div className="text-xs font-mono text-app-subtle flex items-center gap-1">
          © {new Date().getFullYear()} Shortify Inc. All rights reserved.
        </div>

      </div>
    </footer>
  );
};
