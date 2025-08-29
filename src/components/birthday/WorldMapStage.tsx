import { useState } from 'react';
import "./WorldMapStage.custom.css";
import { Button } from '@/components/ui/button';
import { Heart, Plane } from 'lucide-react';

interface WorldMapStageProps {
  onJourneyStart: () => void;
}

const WorldMapStage = ({ onJourneyStart }: WorldMapStageProps) => {
  const [showHearts, setShowHearts] = useState(false);
  const [selectedHeart, setSelectedHeart] = useState<number | null>(null);

  // Easter egg hearts with secret messages
  const heartMessages = [
    "You have been greatest part of my life",
    "You are fine like wineeee  ft.2 bje ahmm.. ✨",
    "you know how this grown up man acts for you 🌟",
    "babyyyyy attention chahiyeee dherr sariiii 💫",
    "Main apki hr baat manunga"
  ];

  const handleHeartClick = (index: number) => {
    setSelectedHeart(index);
    setTimeout(() => setSelectedHeart(null), 5000);
  };

  const startJourney = () => {
    setShowHearts(true);
    setTimeout(() => {
      onJourneyStart();
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative">
      <div className="text-center mb-12 animate-fade-in-up">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-birthday-pink via-birthday-purple to-birthday-gold mb-2">
          Our Journey, Reimagined ✈️💖
        </h2>
        <p className="text-lg text-white/85 mb-1">A handcrafted path through places and moments we love.</p>
        <p className="text-white/75 text-sm">Tip: Tap the hearts to see surprise notes!</p>
      </div>

      {/* Constellation Journey */}
      <div className="relative w-full max-w-5xl h-[28rem] mb-12">
        {/* Night sky canvas */}
        <div className="w-full h-full rounded-3xl border-4 border-white/30 shadow-2xl relative overflow-hidden" style={{ background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.06), transparent), linear-gradient(180deg, rgba(30, 27, 75, 0.95), rgba(99, 102, 241, 0.6))' }}>
          
          {/* Stars */}
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
          
          {/* Constellation path */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path d="M 80 220 L 180 180 L 260 200 L 360 140 L 460 180 L 560 120" stroke="#fff" strokeWidth="2" strokeDasharray="5 8" fill="none">
              <animate attributeName="stroke-dashoffset" from="120" to="0" dur="3s" repeatCount="indefinite" />
            </path>
            {[80, 180, 260, 360, 460, 560].map((x, idx) => (
              <g key={x}>
                <circle cx={x} cy={[220,180,200,140,180,120][idx]} r="4" fill="#fff" />
                <circle cx={x} cy={[220,180,200,140,180,120][idx]} r="10" fill="url(#glow)" />
              </g>
            ))}
          </svg>
          
          {/* Plane following the path feel */}
          <div className="absolute top-1/2 left-8 w-20 h-20" style={{ pointerEvents: 'none' }}>
            <div
              className={`relative text-5xl plane-anim ${showHearts ? 'plane-fly' : ''}`}
              style={{
                transition: 'none',
                animation: showHearts ? 'planePath 2.8s cubic-bezier(0.77,0,0.18,1) forwards' : 'none'
              }}
            >
              ✈️
              <div className="absolute top-3 left-6 text-xs">😊</div>
              <div className="absolute top-2 -right-4 text-pink-400 text-sm animate-pulse">💕</div>
              <div className="absolute top-6 -right-8 text-rose-400 text-xs animate-pulse" style={{ animationDelay: '0.5s' }}>💖</div>
            </div>
          </div>
          
          {/* Cute details */}
          <div className="absolute top-8 right-8 text-3xl animate-pulse">💫</div>
          
          {/* Sparkling stars */}
          <div className="absolute top-4 left-1/2 text-yellow-300 text-sm animate-twinkle">⭐</div>
          <div className="absolute top-20 right-12 text-yellow-300 text-xs animate-twinkle" style={{ animationDelay: '0.7s' }}>✨</div>
          <div className="absolute bottom-32 right-20 text-yellow-300 text-sm animate-twinkle" style={{ animationDelay: '1.4s' }}>⭐</div>
          
          {/* Surprise hearts */}
          {[...Array(5)].map((_, i) => (
            <Heart
              key={i}
              className="absolute text-pink-400 cursor-pointer hover:scale-125 transition-all duration-300 animate-float-slow"
              size={24}
              style={{
                left: `${20 + i * 15 + Math.random() * 10}%`,
                top: `${30 + Math.random() * 40}%`,
                animationDelay: `${i * 1.2}s`,
                animationDuration: '7s'
              }}
              fill="currentColor"
              onClick={() => handleHeartClick(i)}
            />
          ))}
        </div>
      </div>

      {/* Secret message popup */}
      {selectedHeart !== null && (
        <div className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in-up">
          <div className="cute-card max-w-md mx-4 text-center animate-heart-popup">
            <Heart className="text-pink-400 w-8 h-8 mx-auto mb-4 animate-float-slow" fill="currentColor" />
            <p className="text-lg font-medium text-foreground">
              {heartMessages[selectedHeart]}
            </p>
          </div>
        </div>
      )}

      {/* Action button */}
      <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
        <button
          onClick={startJourney}
          className="px-12 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xl font-bold rounded-full hover:from-pink-600 hover:to-rose-600 hover:scale-110 transition-all duration-300 shadow-2xl border-4 border-white/40 relative overflow-hidden group"
        >
          <span className="relative z-10">💕 Forever?? (yaha question mark kyu haii bhadweee jayyy)💕</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
        <p className="text-white/60 text-sm mt-4">
          Click the hearts to see your baby boiss feelingss! 💕
        </p>
      </div>
    </div>
  );
};

export default WorldMapStage;