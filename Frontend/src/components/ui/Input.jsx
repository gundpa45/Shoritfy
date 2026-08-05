import { cn } from "../../lib/utils";

export function Input({ label, error, icon, endIcon, className, id, type = "text", ...props }) {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-xs font-mono font-semibold uppercase tracking-wider text-[#8A8A93]">
          {label}
        </label>
      )}
      <div className="relative flex items-center w-full">
        {icon && (
          <span className="absolute left-3.5 text-[#8A8A93] pointer-events-none flex items-center justify-center">
            {icon}
          </span>
        )}
        <input
          id={id}
          type={type}
          className={cn(
            "w-full h-12 rounded-xl bg-[#0D0D10] border border-white/[0.1] text-[#F5F5F5] placeholder:text-[#8A8A93]/60 font-medium",
            "transition-all duration-200 focus:outline-none focus:border-[#D4FF3F]/70 focus:ring-2 focus:ring-[#D4FF3F]/20 focus:bg-[#121216]",
            "text-sm px-4",
            icon ? "pl-11" : "",
            endIcon ? "pr-11" : "",
            error && "border-red-500/60 focus:border-red-500/80 focus:ring-red-500/20",
            className
          )}
          {...props}
        />
        {endIcon && (
          <span className="absolute right-3.5 text-[#8A8A93] flex items-center justify-center">
            {endIcon}
          </span>
        )}
      </div>
      {error && (
        <p className="text-xs font-mono text-red-400 mt-1">{error}</p>
      )}
    </div>
  );
}

export function Textarea({ label, error, className, id, rows = 4, ...props }) {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-xs font-mono font-semibold uppercase tracking-wider text-[#8A8A93]">
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        className={cn(
          "w-full rounded-xl bg-[#0D0D10] border border-white/[0.1] text-[#F5F5F5] placeholder:text-[#8A8A93]/60 font-medium",
          "transition-all duration-200 focus:outline-none focus:border-[#D4FF3F]/70 focus:ring-2 focus:ring-[#D4FF3F]/20 focus:bg-[#121216]",
          "text-sm p-4 resize-none leading-relaxed",
          error && "border-red-500/60 focus:border-red-500/80 focus:ring-red-500/20",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-xs font-mono text-red-400 mt-1">{error}</p>
      )}
    </div>
  );
}
