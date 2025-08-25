import { useEffect, useState } from 'react';
import { useMusic } from './MusicProvider';

interface MusicControlsProps {
  songs?: { title: string; src: string }[];
}

const MusicControls = ({ songs }: MusicControlsProps) => {
  const { playlist, setPlaylist, reloadFromManifest, currentIndex, playIndex, togglePlay, isPlaying, next, prev } = useMusic();
  const [showLibrary, setShowLibrary] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (songs && songs.length > 0) setPlaylist(songs);
  }, [songs]);

  return (
    <div className="fixed top-4 left-4 z-50 text-white">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-full bg-white/15 border border-white/30 backdrop-blur px-3 py-2 shadow-lg hover:bg-white/25"
          aria-label="Open Jayesh's Playlist"
        >
          ♪ Jayesh
        </button>
      ) : (
        <div className="flex items-center gap-2 bg-white/15 border border-white/30 backdrop-blur px-3 py-2 rounded-full shadow-xl">
          <span className="text-sm mr-1">Jayesh's Playlist</span>
          <button onClick={prev} className="px-2">⏮️</button>
          <button onClick={togglePlay} className="px-2">{isPlaying ? '⏸️' : '▶️'}</button>
          <button onClick={next} className="px-2">⏭️</button>
          <select
            className="bg-transparent text-white px-2 py-1 outline-none max-w-[160px]"
            value={currentIndex}
            onChange={(e) => playIndex(parseInt(e.target.value, 10))}
          >
            {playlist.map((s, i) => (
              <option key={s.src} value={i} className="text-black">{s.title}</option>
            ))}
          </select>
          <button onClick={() => setShowLibrary(true)} className="px-2">📚</button>
          <button onClick={reloadFromManifest} className="px-2">🔄</button>
          <button onClick={() => setIsOpen(false)} className="px-2" aria-label="Close">✖</button>
        </div>
      )}

      {showLibrary && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-lg border border-white/30 rounded-2xl p-4 w-[90vw] max-w-xl text-white relative">
            <button className="absolute top-2 right-2 px-2 py-1 bg-white/20 rounded-full" onClick={() => setShowLibrary(false)}>✖</button>
            <h3 className="text-xl font-bold mb-3">Song Library</h3>
            <p className="text-sm mb-3">Add files to <code className="bg-white/10 px-1 rounded">public/assets</code> and list them in <code className="bg-white/10 px-1 rounded">public/assets/playlist.json</code>. Then press 🔄 to reload.</p>
            <ul className="space-y-2 max-h-[50vh] overflow-auto">
              {playlist.map((s, i) => (
                <li key={s.src} className={`flex items-center justify-between p-2 rounded ${i === currentIndex ? 'bg-white/15' : 'bg-white/5'}`}>
                  <div>
                    <div className="font-medium">{s.title}</div>
                    <div className="text-xs text-white/70">{s.src}</div>
                  </div>
                  <button className="px-3 py-1 bg-white/20 rounded-full" onClick={() => playIndex(i)}>Play</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicControls;


