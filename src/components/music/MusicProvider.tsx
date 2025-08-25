import { createContext, useContext, useMemo, useRef, useState, useEffect, ReactNode } from 'react';

export interface Song {
  title: string;
  src: string; // e.g. /assets/your-song.mp3 in public folder
}

interface MusicContextValue {
  playlist: Song[];
  currentIndex: number;
  isPlaying: boolean;
  currentSong: Song | null;
  setPlaylist: (songs: Song[]) => void;
  reloadFromManifest: () => Promise<void>;
  playIndex: (idx: number) => Promise<void>;
  togglePlay: () => Promise<void>;
  next: () => Promise<void>;
  prev: () => Promise<void>;
}

const MusicContext = createContext<MusicContextValue | undefined>(undefined);

export const useMusic = () => {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error('useMusic must be used within MusicProvider');
  return ctx;
};

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playlist, setPlaylist] = useState<Song[]>([
    { title: 'Birthday Song (Default)', src: '/birthday-song.wav' },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentSong = useMemo(() => playlist[currentIndex] ?? null, [playlist, currentIndex]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.src = currentSong?.src ?? '';
    if (isPlaying && currentSong) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentSong]);

  const ensureAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.preload = 'auto';
    }
  };

  const playIndex = async (idx: number) => {
    ensureAudio();
    const bounded = Math.max(0, Math.min(idx, playlist.length - 1));
    setCurrentIndex(bounded);
    setIsPlaying(true);
    try {
      if (audioRef.current) {
        audioRef.current.src = playlist[bounded]?.src ?? '';
        await audioRef.current.play();
      }
    } catch {
      setIsPlaying(false);
    }
  };

  const reloadFromManifest = async () => {
    try {
      const res = await fetch('/assets/playlist.json', { cache: 'no-store' });
      if (!res.ok) return;
      const json = await res.json();
      if (Array.isArray(json?.songs)) {
        const songs = json.songs.filter((s: any) => s && s.title && s.src);
        setPlaylist(songs);
        if (songs.length > 0) setCurrentIndex(0);
      }
    } catch {}
  };

  const togglePlay = async () => {
    ensureAudio();
    if (!audioRef.current) return;
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        if (!audioRef.current.src && currentSong) audioRef.current.src = currentSong.src;
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch {}
  };

  const next = async () => {
    if (playlist.length === 0) return;
    const idx = (currentIndex + 1) % playlist.length;
    await playIndex(idx);
  };

  const prev = async () => {
    if (playlist.length === 0) return;
    const idx = (currentIndex - 1 + playlist.length) % playlist.length;
    await playIndex(idx);
  };

  const value: MusicContextValue = {
    playlist,
    currentIndex,
    isPlaying,
    currentSong,
    setPlaylist,
    reloadFromManifest,
    playIndex,
    togglePlay,
    next,
    prev,
  };

  useEffect(() => {
    // Auto-load playlist from manifest so songs appear immediately
    reloadFromManifest();
  }, []);

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
};


