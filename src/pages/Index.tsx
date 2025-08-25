import { useState, useEffect, useRef } from 'react';
import { useMusic } from '@/components/music/MusicProvider';
import StartScreen from '@/components/birthday/StartScreen';
import CandleStage from '@/components/birthday/CandleStage';
import WorldMapStage from '@/components/birthday/WorldMapStage';
import TimelineJourney from '@/components/birthday/TimelineJourney';
import FinalCelebration from '@/components/birthday/FinalCelebration';
import GiftsPanel from '@/components/gifts/GiftsPanel';

type Stage = 'start' | 'candle' | 'map' | 'timeline' | 'celebration';

const Index = () => {
  const [currentStage, setCurrentStage] = useState<Stage>('start');
  const [isTransitioning, setIsTransitioning] = useState(false);
  // removed mouse heart trail per user request
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const keyBufferRef = useRef<string>('');
  const music = useMusic();
  const [showGifts, setShowGifts] = useState(false);

  const transitionToStage = (stage: Stage) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStage(stage);
      setIsTransitioning(false);
    }, 500);
  };

  const resetJourney = () => {
    transitionToStage('start');
  };

  useEffect(() => {
    // Preload any audio or resources here if needed
  }, []);

  useEffect(() => {
    const phrase = 'jayeshlovesyouforever';
    const onKey = (e: KeyboardEvent) => {
      const ch = e.key.toLowerCase();
      if (!/[a-z]/.test(ch)) return;
      keyBufferRef.current = (keyBufferRef.current + ch).slice(-phrase.length);
      if (keyBufferRef.current.endsWith(phrase)) {
        setShowEasterEgg(true);
        keyBufferRef.current = '';
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const onMouseMove = () => {};

  const toggleMusic = async () => {
    await music.togglePlay();
    setIsMusicPlaying(v => !v);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" onMouseMove={onMouseMove}>
      {/* Background layers */}
      <div className={`fixed inset-0 transition-all duration-1000 ${
        currentStage === 'start' ? 'bg-gradient-to-b from-pink-200 via-rose-100 to-amber-100' :
        currentStage === 'candle' ? 'bg-gradient-to-b from-rose-300 via-rose-200 to-rose-100' :
        currentStage === 'map' ? 'bg-gradient-to-br from-blue-200 to-purple-200' :
        currentStage === 'timeline' ? 'bg-gradient-to-b from-purple-200 to-pink-200' :
        'magical-bg'
      }`} />
      
      {/* Sparkles background effect */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(28)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-accent rounded-full animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Transition overlay */}
      <div className={`fixed inset-0 bg-black transition-opacity duration-500 z-50 pointer-events-none ${
        isTransitioning ? 'opacity-50' : 'opacity-0'
      }`} />

      {/* Floating music control */}
      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 px-4 py-2 rounded-full bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur"
        aria-label="Toggle music"
      >
        {isMusicPlaying ? '🔊 Music On' : '🔈 Music Off'}
      </button>

      {/* audio handled by MusicProvider */}

      {/* Gifts button */}
      <button
        onClick={() => setShowGifts(true)}
        className="fixed top-4 right-44 z-50 px-4 py-2 rounded-full bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur"
      >
        🎁 Jayesh's Gifts
      </button>

      {/* Stage content */}
      <div className="relative z-10">
        {currentStage === 'start' && (
          <StartScreen onSolved={() => transitionToStage('candle')} />
        )}
        {currentStage === 'candle' && (
          <CandleStage onWishMade={() => transitionToStage('map')} />
        )}
        {currentStage === 'map' && (
          <WorldMapStage onJourneyStart={() => transitionToStage('timeline')} />
        )}
        {currentStage === 'timeline' && (
          <TimelineJourney onJourneyComplete={() => transitionToStage('celebration')} />
        )}
        {currentStage === 'celebration' && (
          <FinalCelebration onReplay={resetJourney} />
        )}
      </div>

      {/* Mouse heart trail removed as requested */}

      {/* Easter egg overlay */}
      {showEasterEgg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center aurora-bg">
          <div className="text-center px-6 py-8 bg-white/10 border border-white/30 rounded-2xl backdrop-blur-md shadow-2xl">
            <div className="sparkler-text text-4xl md:text-6xl font-extrabold mb-4">JAYESH LOVES YOU FOREVER</div>
            <p className="text-white/90 mb-6">Always and forever 💖</p>
            <button onClick={() => setShowEasterEgg(false)} className="px-6 py-3 rounded-full bg-white/20 text-white border border-white/30 hover:bg-white/30">Close</button>
          </div>
        </div>
      )}

      {/* Gifts Panel */}
      {showGifts && <GiftsPanel onClose={() => setShowGifts(false)} />}
    </div>
  );
};

export default Index;