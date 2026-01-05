import { useState, useCallback, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

interface TapButtonProps {
  onTap: () => void;
}

export function TapButton({ onTap }: TapButtonProps) {
  const controls = useAnimation();
  const [isPressed, setIsPressed] = useState(false);

  const handleTap = useCallback(() => {
    onTap();
    
    // Trigger visual feedback
    controls.start({
      scale: [0.95, 1],
      transition: { duration: 0.1, ease: "easeOut" }
    });
    
    // Haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  }, [onTap, controls]);

  // Handle keyboard spacebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !e.repeat) {
        e.preventDefault(); // Prevent scrolling
        setIsPressed(true);
        handleTap();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setIsPressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleTap]);

  return (
    <motion.button
      animate={controls}
      whileTap={{ scale: 0.96 }}
      onPointerDown={() => setIsPressed(true)}
      onPointerUp={() => setIsPressed(false)}
      onPointerLeave={() => setIsPressed(false)}
      onClick={handleTap}
      className={`
        relative group w-64 h-64 sm:w-80 sm:h-80 rounded-full
        flex items-center justify-center
        transition-all duration-200 ease-out outline-none select-none
        touch-manipulation cursor-pointer
        ${isPressed 
          ? "bg-primary text-primary-foreground shadow-inner" 
          : "bg-white border-2 border-border shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] hover:border-primary/20"
        }
      `}
    >
      {/* Decorative inner rings */}
      <div className={`absolute inset-4 rounded-full border ${isPressed ? "border-white/10" : "border-black/5"}`} />
      <div className={`absolute inset-12 rounded-full border ${isPressed ? "border-white/10" : "border-black/5"}`} />
      
      {/* Label */}
      <span className={`text-2xl font-black tracking-widest uppercase transition-colors ${isPressed ? "text-white" : "text-black"}`}>
        TAP
      </span>
      
      {/* Pulse effect on hover (when not pressed) */}
      {!isPressed && (
        <div className="absolute inset-0 rounded-full bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-90 group-hover:scale-100" />
      )}
    </motion.button>
  );
}
