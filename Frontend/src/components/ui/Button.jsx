import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function Button({
  children,
  variant = "primary",
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
    "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFDFD] disabled:opacity-50 disabled:pointer-events-none select-none";

  const variants = {
    primary:
      "bg-[#7C3AED] text-white shadow-sm hover:bg-[#6D28D9]",
    secondary:
      "bg-[#FFFFFF] text-[#111111] border border-[#E5E5E3] hover:bg-[#F5F5F4] hover:border-[#D4D4D4]",
    ghost:
      "bg-transparent text-[#6B6B6B] hover:text-[#111111] hover:bg-[#F5F5F4]",
    danger:
      "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100",
    success:
      "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100",
    gradient:
      "bg-[#7C3AED] text-white shadow-sm hover:bg-[#6D28D9]",
    outline:
      "border border-[#E5E5E3] text-[#111111] hover:bg-[#F5F5F4]",
  };

  const sizes = {
    sm: "h-8 px-3 text-xs rounded-lg",
    md: "h-10 px-4 text-sm rounded-xl",
    lg: "h-12 px-6 text-base rounded-xl",
    xl: "h-14 px-8 text-lg rounded-xl",
    icon: "h-9 w-9 rounded-lg p-0",
  };

  return (
    <motion.button
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      onClick={onClick}
      disabled={disabled || loading}
      whileTap={{ scale: 0.98 }}
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
