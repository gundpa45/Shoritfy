import { Link } from "react-router";
import { Zap, Share2, GitBranch, MessageSquare } from "lucide-react";

export function FooterSection() {
  return (
    <footer className="border-t border-white/[0.08] py-16 px-6 sm:px-8 bg-[#0A0A0B] text-[#A1A1A6]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-[#D4FF3F] flex items-center justify-center shadow-[0_0_15px_rgba(212,255,63,0.2)] group-hover:scale-105 transition-transform">
                <Zap size={16} className="text-[#0A0A0B] fill-[#0A0A0B]" />
              </div>
              <span className="text-lg font-bold text-[#F5F5F5] tracking-tight">
                Shortify
              </span>
            </Link>
            <p className="text-sm text-[#A1A1A6] max-w-xs leading-relaxed">
              AI-powered video clipping SaaS. Engineered for cinematic speed, precision, and creator workflows.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                className="p-2 rounded-lg bg-[#121214] border border-white/[0.08] text-[#A1A1A6] hover:text-[#F5F5F5] hover:border-white/[0.16] transition-colors"
                aria-label="Share"
              >
                <Share2 size={16} />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-[#121214] border border-white/[0.08] text-[#A1A1A6] hover:text-[#F5F5F5] hover:border-white/[0.16] transition-colors"
                aria-label="Repository"
              >
                <GitBranch size={16} />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-[#121214] border border-white/[0.08] text-[#A1A1A6] hover:text-[#F5F5F5] hover:border-white/[0.16] transition-colors"
                aria-label="Community"
              >
                <MessageSquare size={16} />
              </a>
            </div>
          </div>

          {[
            {
              title: "Product",
              links: ["Features", "Pricing", "Pipeline", "Changelog", "Docs"],
            },
            {
              title: "Resources",
              links: ["API Reference", "Creator Kit", "Community", "Support"],
            },
            {
              title: "Company",
              links: ["About", "Privacy Policy", "Terms of Service", "Security"],
            },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-xs font-mono uppercase tracking-wider text-[#F5F5F5] font-semibold mb-4">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#A1A1A6] hover:text-[#D4FF3F] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 Shortify AI Inc. All rights reserved.</p>
          <p className="font-mono text-[#A1A1A6]">
            Built with controlled precision · #0A0A0B · #D4FF3F
          </p>
        </div>
      </div>
    </footer>
  );
}
