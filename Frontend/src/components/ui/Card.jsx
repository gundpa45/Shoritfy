import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function Card({ children, className, hover = false, onClick, ...props }) {
  const base = cn(
    "bg-white border border-[#E5E5E3] rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-6",
    hover && "cursor-pointer",
    className
  );

  if (hover || onClick) {
    return (
      <motion.div
        className={base}
        onClick={onClick}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.15 }}
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
  return <div className={cn("mb-4", className)}>{children}</div>;
}

export function CardTitle({ children, className }) {
  return (
    <h3 className={cn("text-lg font-bold text-[#111111]", className)}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className }) {
  return (
    <p className={cn("text-sm text-[#6B6B6B] mt-1", className)}>{children}</p>
  );
}

export function CardContent({ children, className }) {
  return <div className={cn("", className)}>{children}</div>;
}

export function CardFooter({ children, className }) {
  return (
    <div className={cn("mt-4 flex items-center", className)}>{children}</div>
  );
}

export function StatCard({ icon, label, value, change, color = "purple", loading = false }) {
  const colors = {
    purple: { bg: "bg-[#7C3AED]/10", text: "text-[#7C3AED]", border: "border-[#7C3AED]/20" },
    cyan: { bg: "bg-blue-500/10", text: "text-blue-600", border: "border-blue-200" },
    green: { bg: "bg-green-500/10", text: "text-green-700", border: "border-green-200" },
    amber: { bg: "bg-amber-500/10", text: "text-amber-700", border: "border-amber-200" },
    red: { bg: "bg-red-500/10", text: "text-red-700", border: "border-red-200" },
  };
  const c = colors[color];

  return (
    <motion.div
      className="bg-white border border-[#E5E5E3] rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-5"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
    >
      {loading ? (
        <div className="space-y-3">
          <div className="h-10 w-10 rounded-xl bg-[#F5F5F4] animate-pulse" />
          <div className="h-4 w-24 bg-[#F5F5F4] animate-pulse rounded" />
          <div className="h-7 w-16 bg-[#F5F5F4] animate-pulse rounded" />
        </div>
      ) : (
        <>
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3 border", c.bg, c.border)}>
            <span className={c.text}>{icon}</span>
          </div>
          <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">{label}</p>
          <p className="text-2xl font-bold text-[#111111] mt-1">{value}</p>
          {change !== undefined && (
            <p className={cn("text-xs mt-1 font-semibold", change >= 0 ? "text-green-600" : "text-red-600")}>
              {change >= 0 ? "+" : ""}{change}% from last month
            </p>
          )}
        </>
      )}
    </motion.div>
  );
}
