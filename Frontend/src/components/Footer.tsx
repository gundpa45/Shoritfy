import { Zap, ShieldCheck, Terminal } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-[#18181B] bg-[#000000] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#18181B] border border-[#27272A] flex items-center justify-center text-[#8BEAD8]">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <span className="text-base font-extrabold text-white font-display">Shortify.ai</span>
            <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              AI Video Platform
            </span>
          </div>
        </div>

        {/* Security / Compliance Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#8BEAD8]" /> SOC2 Type II Certified
          </div>
          <div className="flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-zinc-400" /> 256-bit SSL Encrypted
          </div>
        </div>

        {/* Copyright */}
        <div className="text-xs font-mono text-zinc-500 flex items-center gap-1">
          © {new Date().getFullYear()} Shortify Inc. All rights reserved.
        </div>

      </div>
    </footer>
  );
};
