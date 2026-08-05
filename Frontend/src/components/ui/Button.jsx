import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function Button({
  children,
  variant = "accent",
  size = "md",
  className,
  loading = false,
  icon,
  iconRight,
  onClick,
  type = "button",
  disabled,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4FF3F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] disabled:opacity-40 disabled:pointer-events-none select-none cursor-pointer";

  const variants = {
    accent:
      "btn-accent font-semibold text-[#050505]",
    primary:
      "bg-white text-[#050505] hover:bg-neutral-200 shadow-md font-semibold",
    secondary:
      "bg-[#141418] text-[#F5F5F5] border border-white/[0.1] hover:border-white/20 hover:bg-[#1C1C22]",
    glass:
      "bg-white/[0.05] text-[#F5F5F5] backdrop-blur-md border border-white/[0.08] hover:bg-white/[0.1] hover:border-white/20",
    ghost:
      "bg-transparent text-[#8A8A93] hover:text-[#F5F5F5] hover:bg-white/[0.06]",
    outline:
      "border border-white/[0.12] text-[#F5F5F5] hover:bg-white/[0.06] hover:border-white/25",
    danger:
      "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20",
  };

  const sizes = {
    sm: "h-8 px-3 text-xs rounded-lg font-mono",
    md: "h-10 px-4 text-sm rounded-xl",
    lg: "h-12 px-6 text-base rounded-xl",
    xl: "h-14 px-8 text-lg rounded-xl font-bold",
    icon: "h-9 w-9 rounded-xl p-0",
  };

  return (
    <motion.button
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      onClick={onClick}
      disabled={disabled || loading}
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -1 }}
      {...props}
    >
      {loading ? (
        <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : icon ? (
        <span className="flex-shrink-0">{icon}</span>
      ) : null}
      {children}
      {iconRight && !loading && (
        <span className="flex-shrink-0">{iconRight}</span>
      )}
    </motion.button>
  );
}
