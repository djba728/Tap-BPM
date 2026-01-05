import { useState, useRef } from "react";
import { RotateCcw } from "lucide-react";

export default function Home() {
  const [bpm, setBpm] = useState<number>(0);
  const [tapCount, setTapCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const tapsRef = useRef<number[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTap = () => {
    const now = Date.now();
    setIsActive(true);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      tapsRef.current = [];
      setTapCount(0);
      setBpm(0);
      setIsActive(false);
    }, 3000);

    tapsRef.current.push(now);
    
    if (tapsRef.current.length > 10) {
      tapsRef.current.shift();
    }

    const count = tapsRef.current.length;
    setTapCount(count);

    if (count >= 2) {
      let totalInterval = 0;
      for (let i = 1; i < tapsRef.current.length; i++) {
        totalInterval += tapsRef.current[i] - tapsRef.current[i - 1];
      }
      const avgInterval = totalInterval / (tapsRef.current.length - 1);
      const calculatedBpm = Math.round(60000 / avgInterval);
      setBpm(calculatedBpm);
    }
  };

  const handleReset = () => {
    tapsRef.current = [];
    setTapCount(0);
    setBpm(0);
    setIsActive(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-zinc-950 via-zinc-900 to-black flex flex-col items-center justify-between p-6 sm:p-8">
      {/* Header */}
      <header className="w-full max-w-md flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${isActive ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' : 'bg-zinc-600'}`} />
          <h1 className="text-lg font-semibold text-zinc-300 tracking-wide">TAP BPM</h1>
        </div>
        <button
          onClick={handleReset}
          className="p-2.5 rounded-full text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 transition-all active:scale-95"
          data-testid="button-reset"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
        {/* BPM Display */}
        <div className="text-center mb-16">
          <div 
            className={`font-mono font-black tracking-tighter transition-all duration-300 ${
              bpm > 0 
                ? 'text-8xl sm:text-[10rem] text-white' 
                : 'text-7xl sm:text-9xl text-zinc-700'
            }`}
            style={{ fontVariantNumeric: 'tabular-nums' }}
            data-testid="text-bpm"
          >
            {bpm > 0 ? bpm : "--"}
          </div>
          <div className={`text-sm font-medium uppercase tracking-[0.3em] mt-3 transition-colors duration-300 ${
            bpm > 0 ? 'text-zinc-400' : 'text-zinc-600'
          }`}>
            BPM
          </div>
          {tapCount > 0 && (
            <div className="text-xs text-zinc-500 mt-4 font-medium">
              {tapCount} / 10 taps
            </div>
          )}
        </div>

        {/* TAP Button */}
        <button
          onClick={handleTap}
          className={`
            relative w-40 h-40 sm:w-52 sm:h-52 rounded-full 
            font-bold text-xl sm:text-2xl tracking-[0.2em] uppercase
            transition-all duration-150 ease-out
            touch-manipulation select-none
            active:scale-[0.97]
            ${isActive 
              ? 'bg-white text-zinc-900 shadow-[0_0_60px_rgba(255,255,255,0.3)]' 
              : 'bg-zinc-800 text-zinc-400 border-2 border-zinc-700 hover:border-zinc-500 hover:text-zinc-300'
            }
          `}
          data-testid="button-tap"
        >
          <span className="relative z-10">TAP</span>
          {isActive && (
            <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
          )}
        </button>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-md text-center">
        <p className="text-xs text-zinc-600">
          タップするか <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-500 font-mono text-[10px] border border-zinc-700">SPACE</kbd> で計測
        </p>
      </footer>
    </div>
  );
}
