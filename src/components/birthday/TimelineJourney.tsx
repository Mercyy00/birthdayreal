import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, MapPin, Calendar, Gift } from 'lucide-react';

interface TimelineJourneyProps {
  onJourneyComplete: () => void;
}

interface Memory {
  id: number;
  date: string;
  title: string;
  description: string;
  image: string; // Now required - your beautiful pictures!
  location: { x: number; y: number };
}

const TimelineJourney = ({ onJourneyComplete }: TimelineJourneyProps) => {
  const [currentMemoryIndex, setCurrentMemoryIndex] = useState(0);
  // Sample memories - can be customized with your beautiful pictures!
  const memories: Memory[] = [
    {
      id: 1,
      date: "feb, 2024",
      title: "everyhting begins here",
      description: "likee ye humari first interaction haiiii ykkk i thought ki tu ldka h but meko kya pta meri zindagi mein itna special itna beautiful part bnne wali hai tu  💕",
      image: "/pfp.jpg", // Replace with your actual picture!
      location: { x: 25, y: 40 }
    },
    {
      id: 2,
      date: "sep, 2024", 
      title: "cakeeeee",
      description: "Peechle saal ka Birthday Cake abhi tk rkha hai maine smbhal krrrr ☀️💖",
      image: "/cake.webp", // Replace with your beach picture!
      location: { x: 45, y: 35 }
    },
    {
      id: 3,
      date: "April, 2024",
      title: "Minecraft",
      description: "This is the best part of our memories where truly forget the rest of the life got engaged in building our own world💕",
      image: "/minecraft.jpg", // Replace with your cozy movie night picture!
      location: { x: 65, y: 50 }
    },
    {
      id: 4,
      date: "Today",
      title: "Your Special Day 🎂",
      description: "And here we are, celebrating YOU! Every memory we've made has led to this perfect moment. You are my sunshine, my heart, my everything. Happy Birthday, my love! ✨💖",
      image: "/birthday.jpg", // Replace with a beautiful picture of the birthday person!
      location: { x: 85, y: 30 }
    }
  ];

  const currentMemory = memories[currentMemoryIndex];
  const isLastMemory = currentMemoryIndex === memories.length - 1;

  const nextMemory = () => {
    if (isLastMemory) {
      onJourneyComplete();
    } else {
      setCurrentMemoryIndex(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100 overflow-hidden">
      {/* Floating cute hearts background */}
      <div className="pointer-events-none select-none absolute inset-0 z-0">
        <div className="absolute left-10 top-20 text-pink-300 text-6xl opacity-40 animate-float-slow">💕</div>
        <div className="absolute right-16 top-32 text-purple-300 text-5xl opacity-30 animate-float">💖</div>
        <div className="absolute left-1/2 bottom-10 text-yellow-300 text-7xl opacity-30 animate-float" style={{ animationDelay: '1s' }}>💛</div>
        <div className="absolute right-1/4 bottom-24 text-pink-200 text-6xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>💗</div>
      </div>
      {/* Progress indicator */}
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {memories.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index <= currentMemoryIndex 
                  ? 'bg-primary scale-110 shadow-glow-pink' 
                  : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Map background with journey path */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full relative">
          {/* Draw path between memories */}
          <svg className="absolute inset-0 w-full h-full">
            {memories.slice(0, -1).map((memory, index) => {
              const next = memories[index + 1];
              return (
                <line
                  key={index}
                  x1={`${memory.location.x}%`}
                  y1={`${memory.location.y}%`}
                  x2={`${next.location.x}%`}
                  y2={`${next.location.y}%`}
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  className={index < currentMemoryIndex ? 'opacity-60' : 'opacity-30'}
                />
              );
            })}
          </svg>
          
          {/* Memory points */}
          {memories.map((memory, index) => (
            <MapPin
              key={memory.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                index === currentMemoryIndex 
                  ? 'text-primary w-8 h-8 animate-glow-pulse' 
                  : index < currentMemoryIndex
                  ? 'text-secondary w-6 h-6'
                  : 'text-white/30 w-4 h-4'
              }`}
              style={{
                left: `${memory.location.x}%`,
                top: `${memory.location.y}%`
              }}
              fill="currentColor"
            />
          ))}
        </div>
      </div>

      {/* Memory card */}
      <Card className="cute-card max-w-2xl mx-auto relative z-10 animate-fade-in-up">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <Calendar className="text-primary w-6 h-6 mr-2" />
              <span className="text-lg font-semibold text-primary">{currentMemory.date}</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">{currentMemory.title}</h3>
          </div>

          <div className="mb-8">
            <p className="text-lg text-foreground/80 leading-relaxed text-center mb-6">
              {currentMemory.description}
            </p>
          </div>

          {/* Your Beautiful Picture */}
          <div className="mb-8">
            <div className="relative">
              <img 
                src={currentMemory.image} 
                alt={currentMemory.title}
                className="w-full rounded-2xl shadow-xl border-4 border-primary/20"
                style={{ maxHeight: '80vh', objectFit: 'contain' }}
              />
              {/* Cute photo frame effect */}
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-pink-400 rounded-full shadow-lg"></div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-rose-400 rounded-full shadow-lg"></div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-purple-400 rounded-full shadow-lg"></div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-pink-400 rounded-full shadow-lg"></div>
              {/* Floating hearts */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-pink-400 text-2xl animate-float">💕</div>
              <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-rose-400 text-xl animate-float" style={{ animationDelay: '0.5s' }}>💖</div>
            </div>
          </div>

          {/* Continue button */}
          <div className="text-center">
            <Button
              onClick={nextMemory}
              className="magical-button"
            >
              {isLastMemory ? (
                <>🎉 Complete Our Beautiful Journey 🎉</>
              ) : (
                <>💖 Next Precious Memory 💖</>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimelineJourney;