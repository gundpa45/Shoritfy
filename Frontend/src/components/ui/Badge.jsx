import { cn } from "../../lib/utils";

export function Badge({ children, variant = "default", className }) {
  const variants = {
    default: "bg-[#F5F5F4] text-[#6B6B6B] border-[#E5E5E3]",
    purple: "bg-[#7C3AED]/10 text-[#7C3AED] border-[#7C3AED]/20",
    cyan: "bg-blue-500/10 text-blue-600 border-blue-200",
    green: "bg-green-500/10 text-green-700 border-green-200",
    amber: "bg-amber-500/10 text-amber-700 border-amber-200",
    red: "bg-red-500/10 text-red-700 border-red-200",
    gradient: "bg-[#7C3AED] text-white border-0",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function ScoreBadge({ score }) {
  let variant = "red";
  if (score >= 80) variant = "green";
  else if (score >= 60) variant = "amber";

  return (
    <Badge variant={variant}>
      {score}/100
    </Badge>
  );
}
