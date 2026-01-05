import { motion, AnimatePresence } from "framer-motion";
import { type Measurement } from "@shared/schema";
import { Trash2 } from "lucide-react";

interface HistoryListProps {
  measurements: Measurement[];
  onClear: () => void;
  isClearing: boolean;
}

export function HistoryList({ measurements, onClear, isClearing }: HistoryListProps) {
  if (measurements.length === 0) return null;

  return (
    <div className="w-full max-w-sm mt-12 space-y-4">
      <div className="flex items-center justify-between px-4 pb-2 border-b border-border">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Recent History
        </h3>
        <button
          onClick={onClear}
          disabled={isClearing}
          className="p-2 -mr-2 text-muted-foreground hover:text-destructive transition-colors rounded-full hover:bg-destructive/10 disabled:opacity-50"
          title="Clear History"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-2">
        <AnimatePresence initial={false}>
          {measurements.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between px-4 py-3 bg-secondary/50 rounded-xl"
            >
              <span className="font-mono text-lg font-bold text-foreground">
                {Number(m.bpm).toFixed(1)}
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
