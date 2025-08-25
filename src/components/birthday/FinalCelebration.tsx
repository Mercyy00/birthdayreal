import { useState, useEffect } from 'react';
import React from 'react';
// VideoModal component to unmount video on close
type VideoModalProps = {
  src: string;
  caption: string;
  onClose: () => void;
};

const VideoModal = ({ src, caption, onClose, onPrev, onNext, hasPrev, hasNext }: VideoModalProps & {
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-fade-in-up">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-4 flex flex-col items-center">
        <div className="flex w-full justify-between mb-2">
          <button onClick={onPrev} disabled={!hasPrev} className="px-3 py-1 rounded bg-black/10 text-black font-bold disabled:opacity-30">⬅ Prev</button>
          <button onClick={onNext} disabled={!hasNext} className="px-3 py-1 rounded bg-black/10 text-black font-bold disabled:opacity-30">Next ➡</button>
        </div>
        <video
          src={src}
          controls
          autoPlay
          className="w-full max-h-[70vh] object-contain rounded-xl mb-4"
        />
        <p className="text-center italic text-lg text-black/80 mb-4">{caption}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-full bg-black/20 text-black border border-black/30 hover:bg-black/30 font-semibold"
        >
          ⬅ Back to Video Wall
        </button>
      </div>
    </div>
  );
};
import photowall from '@/../public/assets/photowall.json';
import videowall from '@/../public/assets/videowall.json';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Gift, Heart, Sparkles, RotateCcw, Calendar } from 'lucide-react';

interface FinalCelebrationProps {
  onReplay: () => void;
}

const FinalCelebration = ({ onReplay }: FinalCelebrationProps) => {
  const [showCake, setShowCake] = useState(false);
  const [showSecretMessage, setShowSecretMessage] = useState(false);
  const [showPhotoWall, setShowPhotoWall] = useState(false);
  const [showVideoWall, setShowVideoWall] = useState(false);
  const [openPhotoIndex, setOpenPhotoIndex] = useState<number | null>(null);
  const [openVideoIndex, setOpenVideoIndex] = useState<number | null>(null);
  const [balloonColors] = useState([
    'text-pink-400',
    'text-purple-400', 
    'text-yellow-400',
    'text-blue-400',
    'text-green-400',
    'text-red-400'
  ]);

  useEffect(() => {
    // Stagger the appearance of elements
    setTimeout(() => setShowCake(true), 1000);
  }, []);

  const revealSecret = () => {
    setShowSecretMessage(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Fireworks overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="firework"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 60}%`,
              animationDelay: `${i * 0.6}s`
            }}
          />
        ))}
      </div>
      {/* Floating balloons */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute animate-balloon-float ${balloonColors[i % balloonColors.length]}`}
            style={{
              left: `${10 + i * 12}%`,
              top: `${10 + (i % 3) * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          >
            {/* Balloon SVG */}
            <svg width="40" height="60" viewBox="0 0 40 60" fill="currentColor">
              <ellipse cx="20" cy="20" rx="18" ry="22" />
              <path d="M20 42 L20 55" stroke="currentColor" strokeWidth="1" fill="none" />
              <polygon points="18,55 22,55 20,58" fill="currentColor" />
            </svg>
          </div>
        ))}
      </div>

      {/* Gift boxes at bottom right */}
      <div className="fixed bottom-8 right-8 flex space-x-4 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <Gift
            key={i}
            className="text-primary w-12 h-12 animate-gift-bounce hover:scale-110 transition-transform cursor-pointer pointer-events-auto"
            style={{
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Main celebration content */}
      <div className="text-center mb-12 animate-fade-in-up relative z-10">
        <div className="sparkler-text text-5xl md:text-7xl font-extrabold mb-4">HAPPY BIRTHDAY, DIVUUUUUUU!</div>
        <p className="text-2xl md:text-3xl text-white/90 mb-4">
          bohot special journey rahi h abtk aur special banaenge milke!
        </p>
        <p className="text-xl text-white/80">
          Kaha tha na best gift dunga ✨
        </p>
      </div>

      {/* Birthday cake */}
      {showCake && (
        <div className="mb-12 animate-fade-in-up relative z-10">
          <div className="relative cursor-pointer group">
            {/* Cake SVG */}
            <svg width="150" height="120" viewBox="0 0 150 120" className="drop-shadow-lg">
              {/* Cake base */}
              <rect x="20" y="60" width="110" height="50" fill="hsl(var(--birthday-cream))" rx="5" />
              <rect x="15" y="55" width="120" height="15" fill="hsl(var(--birthday-peach))" rx="8" />
              
              {/* Cake top layer */}
              <rect x="30" y="40" width="90" height="30" fill="hsl(var(--birthday-pink))" rx="5" />
              <rect x="25" y="35" width="100" height="15" fill="hsl(var(--birthday-purple))" rx="8" />
              
              {/* Candles */}
              <rect x="60" y="20" width="3" height="20" fill="#8B4513" />
              <rect x="70" y="18" width="3" height="22" fill="#8B4513" />
              <rect x="80" y="20" width="3" height="20" fill="#8B4513" />
              
              {/* Candle flames */}
              <ellipse cx="61.5" cy="17" rx="2" ry="4" fill="hsl(var(--birthday-gold))" className="animate-candle-flicker" />
              <ellipse cx="71.5" cy="15" rx="2" ry="4" fill="hsl(var(--birthday-gold))" className="animate-candle-flicker" />
              <ellipse cx="81.5" cy="17" rx="2" ry="4" fill="hsl(var(--birthday-gold))" className="animate-candle-flicker" />
              
              {/* Decorative elements */}
              <circle cx="45" cy="50" r="3" fill="hsl(var(--birthday-gold))" />
              <circle cx="105" cy="50" r="3" fill="hsl(var(--birthday-gold))" />
              <circle cx="75" cy="85" r="4" fill="hsl(var(--birthday-purple))" />
            </svg>
            
            {/* Sparkles around cake */}
            <div className="absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <Sparkles
                  key={i}
                  className="absolute text-yellow-300 w-4 h-4 animate-sparkle"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${10 + Math.random() * 80}%`,
                    animationDelay: `${i * 0.4}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col items-center space-y-4 relative z-10">
        <Card className="cute-card">
          <CardContent className="p-6 text-center">
            <Heart className="text-primary w-8 h-8 mx-auto mb-4" fill="currentColor" />
            <p className="text-lg text-foreground mb-4">
              HAPPPPYYY BIRTHDAYYYYY MY BESANNN KA LADDDUUUUU
            </p>
            <p className="text-foreground/80">
              Thank you for everything ,i am sorry for times ive been worst , thank you for accepting me , I'm your greatest supporter,your well wisher and i love you 508.69 🌟
            </p>
          </CardContent>
        </Card>

        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <Button
            onClick={onReplay}
            variant="outline"
            className="magical-button bg-white/10 text-white border-white/30 hover:bg-white/20"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Replay Journey
          </Button>
          
          <Button
            onClick={revealSecret}
            className="magical-button"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Continue Our Journey...
          </Button>
          <Button
            onClick={() => setShowPhotoWall(v => !v)}
            variant="outline"
            className="magical-button bg-white/10 text-white border-white/30 hover:bg-white/20"
          >
            📸 Photo Wall
          </Button>
          <Button
            onClick={() => setShowVideoWall(v => !v)}
            variant="outline"
            className="magical-button bg-white/10 text-white border-white/30 hover:bg-white/20"
          >
            🎬 Video Wall
          </Button>
      {/* Video wall */}
      {showVideoWall && (
        <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center p-6">
          <div className="bg-white/10 backdrop-blur-lg border border-white/30 rounded-2xl p-6 max-w-5xl w-full max-h-[85vh] overflow-auto relative">
            <button
              onClick={() => setShowVideoWall(false)}
              className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/20 text-white border border-white/30 hover:bg-white/30"
              aria-label="Close video wall"
            >
              ✖
            </button>
            <h3 className="text-center text-white text-2xl font-bold mb-4">Our Little Video Wall</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {videowall.map((video, i) => (
                <div
                  key={i}
                  className="bg-white/80 text-black rounded-xl p-3 shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform cursor-pointer"
                  onClick={() => setOpenVideoIndex(i)}
                >
                  <div className="bg-white rounded-lg overflow-hidden flex items-center justify-center">
                    <video src={video.src} className="w-full h-48 object-cover" preload="metadata" muted />
                  </div>
                  <p className="mt-2 text-center italic">{video.caption}</p>
                </div>
              ))}
            </div>

            {/* Video Modal */}
            {openVideoIndex !== null && (
              <VideoModal
                src={videowall[openVideoIndex].src}
                caption={videowall[openVideoIndex].caption}
                onClose={() => {
                  setOpenVideoIndex(null);
                  setShowVideoWall(false);
                }}
                onPrev={() => setOpenVideoIndex(i => (i !== null && i > 0 ? i - 1 : i))}
                onNext={() => setOpenVideoIndex(i => (i !== null && i < videowall.length - 1 ? i + 1 : i))}
                hasPrev={openVideoIndex > 0}
                hasNext={openVideoIndex < videowall.length - 1}
              />
            )}
          </div>
        </div>
      )}
        </div>
      </div>

      {/* Secret future message */}
      {showSecretMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in-up">
          <Card className="cute-card max-w-md mx-4">
            <CardContent className="p-8 text-center">
              <Sparkles className="text-primary w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">
                🌟 Our Next Adventure 🌟
              </h3>
              <p className="text-lg text-foreground/90 mb-6">
                I wish you the most happiest birthday of your life.. baby,You are the best babu bestest bestesttttttttttttttt my life you are my everything im so happy with youuuu              </p>
              <p className="text-sm text-foreground/70 mb-6">
                (surprises toh khtm nhi honge kbhi kyuki hr din apka presence ke liye bhagwan se thanyou kehta hoon main im so luckyy to have you princess )
              </p>
              <Button
                onClick={() => setShowSecretMessage(false)}
                className="magical-button"
              >
                ✨ I Can't Wait!
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Sparkle effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-yellow-300 w-3 h-3 animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Polaroid photo wall */}
      {showPhotoWall && (
        <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center p-6">
          <div className="bg-white/10 backdrop-blur-lg border border-white/30 rounded-2xl p-6 max-w-5xl w-full max-h-[85vh] overflow-auto relative">
            <button
              onClick={() => setShowPhotoWall(false)}
              className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/20 text-white border border-white/30 hover:bg-white/30"
              aria-label="Close photo wall"
            >
              ✖
            </button>
            <h3 className="text-center text-white text-2xl font-bold mb-4">Our Little Photo Wall</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {photowall.map((photo, i) => (
                <div
                  key={i}
                  className="bg-white/80 text-black rounded-xl p-3 shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform cursor-pointer"
                  onClick={() => setOpenPhotoIndex(i)}
                >
                  <div className="bg-white rounded-lg overflow-hidden">
                    <img src={photo.src} alt={`Photo ${i + 1}`} className="w-full h-48 object-cover" />
                  </div>
                  <p className="mt-2 text-center italic">{photo.caption}</p>
                </div>
              ))}
            </div>

            {/* Photo Modal */}
            {openPhotoIndex !== null && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-fade-in-up">
                <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-4 flex flex-col items-center">
                  <div className="flex w-full justify-between mb-2">
                    <button onClick={() => setOpenPhotoIndex(i => (i !== null && i > 0 ? i - 1 : i))} disabled={openPhotoIndex === 0} className="px-3 py-1 rounded bg-black/10 text-black font-bold disabled:opacity-30">⬅ Prev</button>
                    <button onClick={() => setOpenPhotoIndex(i => (i !== null && i < photowall.length - 1 ? i + 1 : i))} disabled={openPhotoIndex === photowall.length - 1} className="px-3 py-1 rounded bg-black/10 text-black font-bold disabled:opacity-30">Next ➡</button>
                  </div>
                  <img
                    src={photowall[openPhotoIndex].src}
                    alt={`Photo ${openPhotoIndex + 1}`}
                    className="w-full max-h-[70vh] object-contain rounded-xl mb-4"
                  />
                  <p className="text-center italic text-lg text-black/80">
                    {photowall[openPhotoIndex].caption}
                  </p>
                  <button
                    onClick={() => setOpenPhotoIndex(null)}
                    className="px-4 py-2 rounded-full bg-black/20 text-black border border-black/30 hover:bg-black/30 font-semibold mt-2"
                  >
                    ⬅ Back to Photo Wall
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FinalCelebration;

