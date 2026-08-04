import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

export function ProgressBar({ value = 0, max = 100, className, color = "purple", animated = true, showLabel = false, size = "md" }) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  const colors = {
    purple: "from-purple-600 to-purple-500",
    cyan: "from-cyan-600 to-cyan-400",
    green: "from-green-600 to-green-400",
    amber: "from-amber-600 to-amber-400",
    gradient: "from-purple-600 to-cyan-500",
  };

  const sizes = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  return (
    <div className={cn("w-full", className)}>
      <div className={cn("w-full bg-white/5 rounded-full overflow-hidden", sizes[size])}>
        <motion.div
          className={cn("h-full bg-gradient-to-r rounded-full", colors[color])}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: animated ? 0.6 : 0, ease: "easeOut" }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-zinc-400 mt-1 text-right">{Math.round(percent)}%</p>
      )}
    </div>
  );
}

export function ProgressRing({ value = 0, max = 100, size = 80, strokeWidth = 6, color = "#7C3AED", label }) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </svg>
      {label && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {label}
        </div>
      )}
    </div>
  );
}

export function StepProgress({ steps, currentStep }) {
  return (
    <div className="space-y-2">
      {steps.map((step, index) => {
        const isDone = index < currentStep;
        const isCurrent = index === currentStep;
        const isPending = index > currentStep;

        return (
          <div key={step.label} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className={cn(
                "font-medium flex items-center gap-2",
                isDone ? "text-green-400" : isCurrent ? "text-white" : "text-zinc-600"
              )}>
                {isDone ? (
                  <span className="w-4 h-4 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-xs">✓</span>
                ) : isCurrent ? (
                  <span className="w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  </span>
                ) : (
                  <span className="w-4 h-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs text-zinc-600">{index + 1}</span>
                )}
                {step.label}
              </span>
              {step.detail && (
                <span className="text-xs text-zinc-500">{step.detail}</span>
              )}
            </div>
            {!isPending && (
              <ProgressBar
                value={isDone ? 100 : step.progress || 0}
                color={isDone ? "green" : "gradient"}
                size="sm"
              />
            )}
            {isPending && (
              <div className="h-1 w-full bg-white/5 rounded-full" />
            )}
          </div>
        );
      })}
    </div>
  );
}
