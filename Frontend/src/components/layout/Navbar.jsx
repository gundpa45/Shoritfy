import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Menu, X, ChevronRight } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Comparison", href: "#comparison" },
  { label: "Pricing", href: "#pricing" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#0A0A0B]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/80"
            : "bg-transparent"
        )}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-[#D4FF3F] flex items-center justify-center shadow-[0_0_15px_rgba(212,255,63,0.2)] group-hover:scale-105 transition-all duration-200">
                <Zap size={16} className="text-[#0A0A0B] fill-[#0A0A0B]" />
              </div>
              <span className="text-lg font-bold text-[#F5F5F5] tracking-tight">
                Shortify
              </span>
            </Link>

            {/* Desktop links */}
            {isLanding && (
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="px-4 py-2 text-sm font-medium text-[#A1A1A6] hover:text-[#F5F5F5] transition-colors rounded-lg hover:bg-white/[0.04]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="flex items-center gap-3">
              <Link to="/login" className="hidden sm:block">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm text-[#A1A1A6] hover:text-[#F5F5F5] hover:bg-white/[0.04] rounded-lg"
                >
                  Sign in
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  size="sm"
                  className="btn-accent px-4 py-2 text-sm font-semibold rounded-lg flex items-center gap-1.5"
                >
                  Get Started Free
                  <ChevronRight size={14} className="opacity-80" />
                </Button>
              </Link>
              {isLanding && (
                <button
                  className="md:hidden text-[#A1A1A6] hover:text-[#F5F5F5] p-2 rounded-lg hover:bg-white/[0.04]"
                  onClick={() => setMobileOpen(!mobileOpen)}
                  aria-label="Toggle navigation"
                >
                  {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#0A0A0B]/95 backdrop-blur-xl md:hidden pt-24"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block px-4 py-3 text-lg text-[#A1A1A6] hover:text-[#F5F5F5] hover:bg-white/[0.04] rounded-xl transition-colors font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-6 space-y-3 border-t border-white/[0.08]">
                <Link to="/login" className="block">
                  <Button
                    variant="secondary"
                    className="w-full py-3 bg-[#121214] border border-white/[0.08] text-[#F5F5F5]"
                  >
                    Sign in
                  </Button>
                </Link>
                <Link to="/register" className="block">
                  <Button className="w-full py-3 btn-accent text-[#0A0A0B] font-semibold">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


