import { useState, useRef, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface CandleStageProps {
  onWishMade: () => void;
}

const CandleStage = ({ onWishMade }: CandleStageProps) => {
  const [candleLit, setCandleLit] = useState(true);
  const [showHearts, setShowHearts] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const blowOutCandle = () => {
    setCandleLit(false);
    setShowHearts(true);
    setShowConfetti(true);
    
    // Play cute birthday song
    if (audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
    
    // Wait for animations to complete before transitioning
    setTimeout(() => {
      onWishMade();
    }, 3000);
  };

  const stopMic = () => {
    setIsListening(false);
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(t => t.stop());
      micStreamRef.current = null;
    }
    if (analyserRef.current) {
      analyserRef.current.disconnect();
      analyserRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
  };

  const startMicBlowDetection = async () => {
    try {
      setMicError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(analyser);
      analyserRef.current = analyser;
      setIsListening(true);

      const data = new Uint8Array(analyser.frequencyBinCount);
      let blown = false;
      const threshold = 140; // simple volume threshold

      const tick = () => {
        if (!analyserRef.current || blown || !isListening) return;
        analyserRef.current.getByteFrequencyData(data);
        let avg = 0;
        for (let i = 0; i < data.length; i++) avg += data[i];
        avg = avg / data.length;
        if (avg > threshold) {
          blown = true;
          stopMic();
          blowOutCandle();
          return;
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    } catch (err: any) {
      setMicError('Microphone access denied. Tap the candle instead!');
      setIsListening(false);
    }
  };

  useEffect(() => {
    return () => {
      stopMic();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative">
      <div className="text-center mb-10 animate-fade-in-up">
        <p className="text-sm md:text-base text-white/80 mb-2">From Jayesh, with all my love</p>
        <h2 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-birthday-pink via-birthday-purple to-birthday-gold drop-shadow">
          Happy Birthday, Divyanshi!
        </h2>
        <p className="text-lg text-white/80 mt-4">Close your eyes, make a wish, and tap the candle to blow it out ✨</p>
        <div className="mt-4 flex items-center justify-center gap-3">
          {!isListening ? (
            <button
              onClick={startMicBlowDetection}
              className="px-5 py-2 rounded-full bg-white/15 border border-white/30 text-white hover:bg-white/25 transition-colors"
            >
              or enable your mic and blow 🎤💨
            </button>
          ) : (
            <span className="text-white/80 text-sm">Listening... blow towards the mic 💨</span>
          )}
        </div>
        {micError && <p className="text-rose-200 text-sm mt-2">{micError}</p>}
      </div>

      {/* Adorable Birthday Candle */}
      <div className="relative mb-16">
        <div 
          onClick={blowOutCandle}
          className="cursor-pointer transition-all duration-500 hover:scale-105 group"
        >
          {/* Cute Candle Base Plate */}
          <div className="w-28 h-3 bg-gradient-to-r from-rose-200 via-white to-rose-200 rounded-full mx-auto mb-3 shadow-lg border-2 border-rose-100" />
          
          {/* Cake base with frosting for a realistic candle mount */}
          <div className="relative w-48 mx-auto">
            <div className="w-full h-10 bg-gradient-to-b from-rose-200 to-rose-300 rounded-t-2xl shadow-lg border-2 border-rose-200" />
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-40 h-6 bg-gradient-to-b from-rose-50 to-rose-100 rounded-full border border-rose-200 shadow-soft" />
            {/* Sprinkles */}
            <div className="absolute -top-1 left-6 w-1.5 h-3 bg-yellow-300 rotate-12 rounded-sm" />
            <div className="absolute -top-1 left-14 w-1.5 h-3 bg-pink-300 -rotate-12 rounded-sm" />
            <div className="absolute -top-1 left-28 w-1.5 h-3 bg-purple-300 rotate-6 rounded-sm" />
            <div className="absolute -top-1 right-10 w-1.5 h-3 bg-blue-300 -rotate-6 rounded-sm" />
          </div>

          {/* Main Candle Body */}
          <div className="w-12 h-48 bg-gradient-to-b from-pink-100 via-pink-50 to-rose-50 rounded-t-2xl mx-auto relative shadow-xl border-2 border-pink-200/60">
            {/* Cute Heart Pattern on Candle */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-pink-300 text-sm">💕</div>
            <div className="absolute top-16 left-1/2 -translate-x-1/2 text-rose-300 text-sm">💖</div>
            <div className="absolute top-28 left-1/2 -translate-x-1/2 text-pink-300 text-sm">💕</div>

            {/* Melted Wax Drips */}
            <div className="absolute -left-1 top-8 w-2 h-8 bg-gradient-to-b from-pink-200 to-pink-100 rounded-full opacity-70" />
            <div className="absolute -right-1 top-14 w-2 h-10 bg-gradient-to-b from-pink-200 to-pink-100 rounded-full opacity-70" />

            {/* Wick */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-8 bg-gray-700 rounded-full" />

            {/* Beautiful Flame */}
            {candleLit && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 animate-candle-flicker">
                {/* Outer flame glow */}
                <div className="w-12 h-16 bg-gradient-to-t from-orange-500 via-yellow-300 to-yellow-100 rounded-full opacity-80 blur-sm" />
                {/* Main flame tear-drop */}
                <div className="absolute left-1/2 -translate-x-1/2 top-1 w-6 h-12 bg-gradient-to-t from-red-500 via-orange-400 to-yellow-200 rounded-b-full rounded-t-[70%] opacity-90" />
                {/* Inner flame core */}
                <div className="absolute left-1/2 -translate-x-1/2 top-3 w-3 h-8 bg-gradient-to-t from-orange-600 via-yellow-400 to-white rounded-b-full rounded-t-[70%] opacity-90" />
                {/* Sparkle effect */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-yellow-200 text-xs animate-pulse">✨</div>
              </div>
            )}

            {/* Magical Smoke when blown out */}
            {!candleLit && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                <div className="w-3 h-20 bg-gradient-to-t from-gray-300/40 via-purple-200/30 to-transparent rounded-full animate-float" />
                <div className="absolute w-2 h-16 bg-gradient-to-t from-pink-200/30 via-purple-100/20 to-transparent rounded-full ml-2 animate-float" style={{ animationDelay: '0.3s' }} />
                <div className="absolute w-1 h-12 bg-gradient-to-t from-blue-200/20 to-transparent rounded-full ml-1 animate-float" style={{ animationDelay: '0.6s' }} />
                {/* Magical sparkles in smoke */}
                <div className="absolute top-4 left-1 text-purple-300 text-xs animate-pulse" style={{ animationDelay: '0.2s' }}>✨</div>
                <div className="absolute top-8 left-3 text-pink-300 text-xs animate-pulse" style={{ animationDelay: '0.5s' }}>⭐</div>
              </div>
            )}
          </div>

          {/* Cute Candle Holder */}
          <div className="w-24 h-7 bg-gradient-to-b from-rose-300 to-rose-400 rounded-lg mx-auto -mt-2 shadow-lg border-2 border-rose-200">
            <div className="w-[72px] h-2 bg-gradient-to-r from-rose-200 to-rose-100 rounded-full mx-auto mt-2" />
          </div>
        </div>
      </div>

      {/* Rising hearts animation */}
      {showHearts && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <Heart
              key={i}
              className="absolute text-pink-400 animate-heart-rise"
              size={20 + Math.random() * 10}
              style={{
                left: `${40 + Math.random() * 20}%`,
                top: `${60 + Math.random() * 20}%`,
                animationDelay: `${i * 0.3}s`
              }}
              fill="currentColor"
               />
          ))}
        </div>
      )}

      {/* Confetti celebration */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(60)].map((_, i) => {
            const left = Math.random() * 100;
            const size = 6 + Math.random() * 6;
            const delay = Math.random() * 0.8;
            const duration = 3 + Math.random() * 2;
            const colors = ['#F472B6', '#C4B5FD', '#FDE68A', '#FCA5A5', '#A7F3D0', '#93C5FD'];
            const color = colors[i % colors.length];
            const rotation = Math.random() * 360;
            return (
              <div
                key={i}
                className="confetti animate-confetti"
                style={{
                  left: `${left}%`,
                  top: `-10vh`,
                  width: `${size}px`,
                  height: `${size * 1.8}px`,
                  backgroundColor: color,
                  transform: `rotate(${rotation}deg)`,
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`
                }}
              />
            );
          })}
        </div>
      )}

      {!candleLit && (
        <div className="text-center animate-fade-in-up">
          <p className="text-2xl text-white/90 mb-2">✨ Your wish is floating to the stars ✨</p>
          <p className="text-lg text-white/80">Get ready for our magical journey, my love 💕</p>
        </div>
      )}

      {/* Hidden audio element for birthday song */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        className="hidden"
      >
        <source src="" type="audio/wav" />
      </audio>
    </div>
  );
};

export default CandleStage;