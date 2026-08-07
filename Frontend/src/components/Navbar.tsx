import { useState } from 'react';
import { ChevronDown, Menu, X, Zap, LayoutDashboard, Compass } from 'lucide-react';
import type { ViewMode } from '../types';

interface NavbarProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  onOpenPricing: () => void;
}

export const Navbar = ({ viewMode, setViewMode, onOpenPricing }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#000000]/90 backdrop-blur-md border-b border-[#18181B] transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Left: Brand Logo & Version Pill (Nordcraft exact match) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('landing')}
              className="flex items-center gap-2 text-left focus:outline-none group cursor-pointer"
            >
              {/* Nordcraft Style Icon */}
              <div className="w-8 h-8 rounded-lg bg-[#18181B] border border-[#27272A] flex items-center justify-center text-[#8BEAD8] group-hover:border-[#8BEAD8]/50 transition-colors">
                <Zap className="w-4 h-4 fill-[#8BEAD8]/20" />
              </div>
              <span className="text-lg font-extrabold text-white font-display tracking-tight flex items-center gap-0.5">
                Shortify<span className="text-[#8BEAD8]">.ai</span>
              </span>
            </button>

            {/* Nordcraft Version Pill Badge */}
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#18181B] border border-[#27272A] text-[11px] font-mono text-zinc-400 font-medium">
              v.3.4.0
            </span>
          </div>

          {/* Center: Clean Professional Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-zinc-300">
            <div className="relative group cursor-pointer flex items-center gap-1 hover:text-white transition-colors">
              <span>Product</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
            </div>

            <a href="#pipeline" className="hover:text-white transition-colors flex items-center gap-1">
              <span>AI Engine</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
            </a>

            <a href="#demo" className="hover:text-white transition-colors flex items-center gap-1">
              <span>Community</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
            </a>

            <a
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                onOpenPricing();
              }}
              className="hover:text-white transition-colors"
            >
              Pricing
            </a>

            <a href="#features" className="hover:text-white transition-colors">
              Blog
            </a>
          </nav>

          {/* Right: SaaS Studio Toggle, Sign Up Button & Mobile Menu (Nordcraft exact) */}
          <div className="flex items-center gap-3">
            
            {/* View Switcher Pill */}
            <div className="hidden sm:flex items-center p-1 rounded-xl bg-[#09090B] border border-[#27272A]">
              <button
                onClick={() => setViewMode('landing')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'landing'
                    ? 'bg-[#18181B] text-white border border-[#27272A]'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Compass className="w-3.5 h-3.5" /> Landing
              </button>
              <button
                onClick={() => setViewMode('dashboard')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'dashboard'
                    ? 'bg-[#8BEAD8]/15 text-[#8BEAD8] border border-[#8BEAD8]/30'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#8BEAD8]" /> SaaS Studio
              </button>
            </div>

            {/* Nordcraft Signature Cyan Sign Up Button */}
            <button
              onClick={() => setViewMode('dashboard')}
              className="btn-nord-cyan px-4 py-2 sm:px-5 sm:py-2 text-xs sm:text-sm font-semibold cursor-pointer font-display"
            >
              Sign up
            </button>

            {/* Nordcraft Menu Icon Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#18181B] border border-[#27272A] text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#09090B] border-b border-[#27272A] px-4 py-6 space-y-4">
          <button
            onClick={() => { setViewMode('landing'); setMobileMenuOpen(false); }}
            className="block w-full text-left text-sm font-medium text-zinc-300 hover:text-white py-2"
          >
            Landing Page
          </button>
          <button
            onClick={() => { setViewMode('dashboard'); setMobileMenuOpen(false); }}
            className="block w-full text-left text-sm font-medium text-[#8BEAD8] py-2"
          >
            Open SaaS Studio Workspace
          </button>
          <button
            onClick={() => { onOpenPricing(); setMobileMenuOpen(false); }}
            className="block w-full text-left text-sm font-medium text-zinc-300 hover:text-white py-2"
          >
            Pricing
          </button>
        </div>
      )}
    </header>
  );
};
