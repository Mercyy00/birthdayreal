import { useEffect, useState } from 'react';

type GiftItem =
  | { type: 'note'; title: string; text: string }
  | { type: 'voice'; title: string; src: string }
  | { type: 'image'; title: string; src: string }
  | { type: 'link'; title: string; url: string };

const GiftsPanel = ({ onClose }: { onClose: () => void }) => {
  const [items, setItems] = useState<GiftItem[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/assets/gifts.json', { cache: 'no-store' });
        if (!res.ok) return;
        const json = await res.json();
        if (Array.isArray(json?.items)) setItems(json.items);
      } catch {}
    };
    load();
  }, []);

  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const openGift = (idx: number) => setOpenIdx(idx);
  const closeGift = () => setOpenIdx(null);
  const nextGift = () => setOpenIdx(i => (i !== null && i < items.length - 1 ? i + 1 : i));
  const prevGift = () => setOpenIdx(i => (i !== null && i > 0 ? i - 1 : i));

  return (
    <div className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-lg border border-white/30 rounded-2xl p-6 max-w-3xl w-full max-h-[85vh] overflow-auto text-white relative">
        <button className="absolute top-3 right-3 px-3 py-1 bg-white/20 rounded-full" onClick={onClose}>✖</button>
        <h3 className="text-2xl font-bold mb-1">Jayesh's Gifts</h3>
        <p className="text-sm mb-4">Add files to <code className="bg-white/10 px-1 rounded">public/assets</code> and list them in <code className="bg-white/10 px-1 rounded">public/assets/gifts.json</code>.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item, idx) => (
            <div key={idx} className="bg-white/10 rounded-xl p-4 border border-white/20 cursor-pointer" onClick={() => openGift(idx)}>
              <div className="font-semibold mb-2">{item.title}</div>
              {item.type === 'note' && (
                <p className="text-white/85 whitespace-pre-wrap">{item.text}</p>
              )}
              {item.type === 'voice' && (
                <audio controls className="w-full">
                  <source src={(item as any).src} />
                </audio>
              )}
              {item.type === 'image' && (
                <img src={(item as any).src} alt={item.title} className="w-full h-48 object-contain" />
              )}
              {item.type === 'link' && (
                <a
                  href={(item as any).url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-4 py-2 bg-pink-200 text-pink-900 rounded-full font-semibold shadow hover:bg-pink-300 transition"
                >
                  Visit Link
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Gift Modal */}
        {openIdx !== null && (
          <div className="fixed inset-0 z-[80] bg-black/80 flex items-center justify-center p-4 animate-fade-in-up">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 flex flex-col items-center text-black">
              <div className="flex w-full justify-between mb-2">
                <button onClick={prevGift} disabled={openIdx === 0} className="px-3 py-1 rounded bg-black/10 text-black font-bold disabled:opacity-30">⬅ Prev</button>
                <button onClick={nextGift} disabled={openIdx === items.length - 1} className="px-3 py-1 rounded bg-black/10 text-black font-bold disabled:opacity-30">Next ➡</button>
              </div>
              <div className="font-semibold text-lg mb-2">{items[openIdx].title}</div>
              {items[openIdx].type === 'note' && (
                <p className="text-black/85 whitespace-pre-wrap mb-4">{(items[openIdx] as any).text}</p>
              )}
              {items[openIdx].type === 'voice' && (
                <audio controls className="w-full mb-4">
                  <source src={(items[openIdx] as any).src} />
                </audio>
              )}
              {items[openIdx].type === 'image' && (
                <img src={(items[openIdx] as any).src} alt={items[openIdx].title} className="w-full max-h-[50vh] object-contain mb-4" />
              )}
              {items[openIdx].type === 'link' && (
                <a
                  href={(items[openIdx] as any).url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-4 py-2 bg-pink-200 text-pink-900 rounded-full font-semibold shadow hover:bg-pink-300 transition mb-4"
                >
                  Visit Link
                </a>
              )}
              <button
                onClick={closeGift}
                className="px-4 py-2 rounded-full bg-black/20 text-black border border-black/30 hover:bg-black/30 font-semibold mt-2"
              >
                ⬅ Back to Gifts
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftsPanel;


