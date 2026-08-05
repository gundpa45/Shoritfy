import { Link } from "react-router";
import { Zap, ArrowLeft, Layers, LayoutDashboard, Sparkles } from "lucide-react";

export function UrlHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#070709]/80 backdrop-blur-xl">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
        {/* Brand & Studio Tag */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-[#D4FF3F] flex items-center justify-center shadow-[0_0_20px_rgba(212,255,63,0.3)] group-hover:scale-105 transition-all">
              <Zap size={16} className="text-[#070709] fill-[#070709]" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold tracking-tight text-white">
                Shortify
              </span>
              <span className="text-xs font-semibold text-[#94949E] bg-white/[0.06] border border-white/[0.08] px-2 py-0.5 rounded-md">
                URL Studio
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#14141A] border border-white/[0.08] text-xs font-medium text-[#94949E]">
            <span className="w-2 h-2 rounded-full bg-[#D4FF3F] animate-pulse" />
            <span>Whisper + Qwen Pipeline Active</span>
          </div>
        </div>

        {/* Studio Controls */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-xs text-[#94949E] hover:text-white transition-colors hidden sm:flex items-center gap-1.5 font-medium"
          >
            <ArrowLeft size={14} />
            <span>Landing</span>
          </Link>
          <Link
            to="/upload"
            className="text-xs text-[#94949E] hover:text-white transition-colors hidden sm:flex items-center gap-1.5 font-medium"
          >
            <Layers size={14} />
            <span>Batch Upload</span>
          </Link>
          <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />
          <Link to="/dashboard">
            <button className="px-3.5 py-1.5 rounded-xl bg-[#14141A] border border-white/[0.1] hover:border-white/20 text-xs font-semibold text-white hover:bg-[#1B1B24] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm">
              <LayoutDashboard size={14} className="text-[#D4FF3F]" />
              <span>Creator Dashboard</span>
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
