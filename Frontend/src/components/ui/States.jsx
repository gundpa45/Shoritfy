import { motion } from "framer-motion";
import { AlertCircle, RefreshCw, MessageCircle } from "lucide-react";
import { Button } from "./Button";

export function EmptyState({ icon, title, description, action, actionLabel }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-20 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {icon && (
        <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 text-purple-400">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-zinc-400 max-w-sm">{description}</p>
      {action && (
        <div className="mt-6">
          <Button variant="primary" onClick={action}>
            {actionLabel}
          </Button>
        </div>
      )}
    </motion.div>
  );
}

export function ErrorState({ message = "Something went wrong", onRetry, details }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-20 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 text-red-400">
        <AlertCircle size={28} />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{message}</h3>
      {details && <p className="text-sm text-zinc-500 max-w-sm mb-6">{details}</p>}
      <div className="flex gap-3 mt-4">
        {onRetry && (
          <Button variant="secondary" icon={<RefreshCw size={16} />} onClick={onRetry}>
            Try again
          </Button>
        )}
        <Button variant="ghost" icon={<MessageCircle size={16} />}>
          Contact support
        </Button>
      </div>
    </motion.div>
  );
}
