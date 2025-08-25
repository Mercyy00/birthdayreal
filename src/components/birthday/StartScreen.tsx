import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface StartScreenProps {
  onSolved: () => void;
}

const StartScreen = ({ onSolved }: StartScreenProps) => {
  const [attempts, setAttempts] = useState(0);
  const [typed, setTyped] = useState('');
  const loveNote = "A tiny surprise for the girl who makes my world brighter. — Jayesh";

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      setTyped(loveNote.slice(0, idx + 1));
      idx++;
      if (idx >= loveNote.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Create a 4x4 grid of buttons, with the correct one at position 6 (0-indexed)
  const correctButtonIndex = 6;
  const totalButtons = 16;

  const handleButtonClick = (index: number) => {
    if (index === correctButtonIndex) {
      onSolved();
    } else {
      setAttempts(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center mb-12 animate-fade-in-up">
        <p className="text-sm text-white/80 mb-2">For my favorite person</p>
        <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-birthday-pink via-birthday-purple to-birthday-gold mb-4">
          Divu, ready for a surprise?
        </h1>
        <p className="text-xl text-white/85 mb-6">Tap the magical button to begin our cute little journey ✨</p>
        <p className="text-white/80 italic">{typed}<span className="opacity-60">|</span></p>
      </div>

      {/* Mystery button grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {[...Array(totalButtons)].map((_, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(index)}
            className={`mystery-button ${
              index === correctButtonIndex ? 'correct' : ''
            }`}
            aria-label={`Mystery button ${index + 1}`}
          />
        ))}
      </div>

      <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
        <p className="text-white/60 text-sm">
          {attempts > 0 && `Attempts: ${attempts} • `}
          <span className="text-pink-500 font-extrabold text-lg drop-shadow-md">Made with love by Jayesh 💗</span>
        </p>
      </div>
    </div>
  );
};

export default StartScreen;