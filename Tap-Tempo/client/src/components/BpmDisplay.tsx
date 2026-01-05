import { motion, AnimatePresence } from "framer-motion";

interface BpmDisplayProps {
  bpm: number | null;
  tapCount: number;
}

export function BpmDisplay({ bpm, tapCount }: BpmDisplayProps) {
  const isWaiting = tapCount < 2;

  return (
    <div 
      className="flex flex-col items-center justify-center h-40 sm:h-56"
      data-testid="container-bpm-display"
    >
      <AnimatePresence mode="wait">
        {isWaiting ? (
          <motion.div
            key="waiting"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center space-y-2"
          >
            <span 
              className="text-5xl sm:text-7xl font-bold text-muted-foreground/40 font-mono tracking-tighter"
              data-testid="text-bpm-placeholder"
            >
              --.-
            </span>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
              {tapCount === 0 ? "タップして開始" : "もう1回タップ"}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="active"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center"
          >
            <div className="relative">
              <span 
                className="text-6xl sm:text-8xl font-black text-foreground font-mono tracking-tighter tabular-nums leading-none"
                data-testid="text-bpm-value"
              >
                {bpm !== null ? bpm.toFixed(1) : "--.-"}
              </span>
              <span className="absolute -top-2 -right-10 sm:-top-4 sm:-right-14 text-sm sm:text-base font-bold text-muted-foreground uppercase tracking-widest">
                BPM
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {tapCount}回タップ
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
