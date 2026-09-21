import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sparkles, LayoutDashboard, Compass } from 'lucide-react';
import { ThemeSwitcher } from '../theme/ThemeSwitcher';
import type { ViewMode } from '../types';

interface NavbarProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  onOpenPricing: () => void;
}

export const Navbar = ({ viewMode, setViewMode, onOpenPricing }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-app-bg/95 backdrop-blur-md border-b border-app-border">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-3">
          <Link to="/" className="flex items-center gap-2 text-app-text font-bold tracking-tight text-lg">
            <span className="w-9 h-9 rounded-xl bg-app-accent/10 text-app-accent grid place-items-center"><Sparkles size={19} /></span>
            <span>Shortify<span className="text-app-accent">.ai</span></span>
          </Link>
          <nav aria-label="Main navigation" className="hidden xl:flex items-center gap-6 text-sm text-app-muted">
            <Link to="/#features" className="hover:text-app-text">Features</Link>
            <Link to="/studio/demo" className="hover:text-app-text">Demo</Link>
            <button onClick={onOpenPricing} className="hover:text-app-text cursor-pointer">Pricing</button>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <nav aria-label="Switch workspace view" className="hidden lg:flex items-center p-1 rounded-xl bg-app-surface border border-app-border">
              <button onClick={() => setViewMode('landing')} aria-current={viewMode === 'landing' ? 'page' : undefined} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer ${viewMode === 'landing' ? 'bg-app-raised text-app-text' : 'text-app-subtle hover:text-app-text'}`}><Compass size={15} /> Landing</button>
              <button onClick={() => setViewMode('dashboard')} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-app-subtle hover:text-app-text cursor-pointer"><LayoutDashboard size={15} /> Creator Studio</button>
            </nav>
            <div className="hidden sm:block"><ThemeSwitcher /></div>
            <Link to="/signin" className="hidden md:block text-xs font-semibold text-app-muted hover:text-app-text px-1">Sign in</Link>
            <Link to="/signup" className="btn-nord-cyan px-4 py-2.5 text-xs sm:text-sm font-semibold whitespace-nowrap">Sign up</Link>
            <button aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="xl:hidden p-2.5 rounded-xl bg-app-raised border border-app-border text-app-text cursor-pointer">{mobileMenuOpen ? <X size={17} /> : <Menu size={17} />}</button>
          </div>
        </div>
      </div>
      {mobileMenuOpen && <nav aria-label="Mobile navigation" id="mobile-navigation" className="xl:hidden bg-app-surface border-t border-app-border px-5 py-5 space-y-4 text-sm text-app-text">
        <Link to="/" className="block" onClick={() => setMobileMenuOpen(false)}>Landing</Link>
        <Link to="/studio" className="block" onClick={() => setMobileMenuOpen(false)}>Creator Studio</Link>
        <Link to="/signin" className="block" onClick={() => setMobileMenuOpen(false)}>Sign in</Link>
        <button className="block cursor-pointer" onClick={() => { onOpenPricing(); setMobileMenuOpen(false); }}>Pricing</button>
        <div className="sm:hidden flex items-center justify-between border-t border-app-border pt-4"><span className="text-app-subtle">Appearance</span><ThemeSwitcher /></div>
      </nav>}
    </header>
  );
};
