import { cn } from "../../lib/utils";

export function Badge({ children, variant = "default", dot = false, className }) {
  const variants = {
    default: "bg-[#141418] text-[#8A8A93] border-white/[0.1]",
    lime: "bg-[#D4FF3F]/10 text-[#D4FF3F] border-[#D4FF3F]/30",
    purple: "bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/30",
    cyan: "bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/30",
    green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    red: "bg-red-500/10 text-red-400 border-red-500/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold border tracking-wider uppercase",
        variants[variant] || variants.default,
        className
      )}
    >
      {dot && (
        <span className={cn(
          "w-1.5 h-1.5 rounded-full animate-pulse",
          variant === "lime" ? "bg-[#D4FF3F]" :
          variant === "purple" ? "bg-[#8B5CF6]" :
          variant === "cyan" ? "bg-[#00E5FF]" :
          variant === "green" ? "bg-emerald-400" :
          "bg-[#8A8A93]"
        )} />
      )}
      {children}
    </span>
  );
}

export function ScoreBadge({ score }) {
  let variant = "red";
  if (score >= 90) variant = "lime";
  else if (score >= 75) variant = "green";
  else if (score >= 60) variant = "amber";

  return (
    <Badge variant={variant} dot>
      {score}/100 VIRAL SCORE
    </Badge>
  );
}
