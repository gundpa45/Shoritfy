import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function Card({ children, className, hover = false, glow = false, onClick, ...props }) {
  const base = cn(
    "bg-[#0D0D10] border border-white/[0.08] rounded-2xl shadow-xl transition-all duration-300 p-6 relative overflow-hidden",
    glow && "hover:border-[#D4FF3F]/35 hover:shadow-[0_0_30px_rgba(212,255,63,0.1)]",
    hover && "cursor-pointer hover:border-white/20 hover:-translate-y-0.5",
    className
  );

  if (hover || onClick) {
    return (
      <motion.div
        className={base}
        onClick={onClick}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={base} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className }) {
  return <div className={cn("mb-4 space-y-1", className)}>{children}</div>;
}

export function CardTitle({ children, className }) {
  return (
    <h3 className={cn("text-lg font-bold text-[#F5F5F5] tracking-tight", className)}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className }) {
  return (
    <p className={cn("text-sm text-[#8A8A93] leading-relaxed", className)}>{children}</p>
  );
}

export function CardContent({ children, className }) {
  return <div className={cn("", className)}>{children}</div>;
}

export function CardFooter({ children, className }) {
  return (
    <div className={cn("mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between", className)}>
      {children}
    </div>
  );
}

export function StatCard({ icon, label, value, change, color = "lime", loading = false }) {
  const colors = {
    lime: { bg: "bg-[#D4FF3F]/10", text: "text-[#D4FF3F]", border: "border-[#D4FF3F]/20" },
    purple: { bg: "bg-[#8B5CF6]/10", text: "text-[#8B5CF6]", border: "border-[#8B5CF6]/20" },
    cyan: { bg: "bg-[#00E5FF]/10", text: "text-[#00E5FF]", border: "border-[#00E5FF]/20" },
    green: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
    red: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20" },
  };
  const c = colors[color] || colors.lime;

  return (
    <motion.div
      className="bg-[#0D0D10] border border-white/[0.08] rounded-2xl p-5 shadow-lg hover:border-white/20 transition-all"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {loading ? (
        <div className="space-y-3">
          <div className="h-10 w-10 rounded-xl bg-white/5 animate-pulse" />
          <div className="h-4 w-24 bg-white/5 animate-pulse rounded" />
          <div className="h-7 w-16 bg-white/5 animate-pulse rounded" />
        </div>
      ) : (
        <>
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3 border", c.bg, c.border)}>
            <span className={c.text}>{icon}</span>
          </div>
          <p className="text-xs font-mono font-semibold text-[#8A8A93] uppercase tracking-wider">{label}</p>
          <p className="text-2xl font-extrabold text-[#F5F5F5] mt-1 font-mono tracking-tight">{value}</p>
          {change !== undefined && (
            <p className={cn("text-xs mt-1.5 font-mono font-semibold flex items-center gap-1", change >= 0 ? "text-[#D4FF3F]" : "text-red-400")}>
              <span>{change >= 0 ? "▲ +" : "▼ "}{change}%</span>
              <span className="text-[#8A8A93] font-normal">vs last month</span>
            </p>
          )}
        </>
      )}
    </motion.div>
  );
}
