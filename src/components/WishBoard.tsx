import React, { useState, useEffect } from 'react';
import { Pin, Trash2, Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface WishNote {
  id: string;
  text: string;
  sender: string;
  color: string;
  rotation: number;
}

const WishBoard = () => {
  const [wishes, setWishes] = useState<WishNote[]>([]);
  const [newText, setNewText] = useState('');
  const [newSender, setNewSender] = useState('');
  const [selectedColor, setSelectedColor] = useState('celebration-pink');

  const colors = [
    { name: 'celebration-pink', hex: '#FF6B9F', label: 'Pink' },
    { name: 'celebration-yellow', hex: '#FFDE7D', label: 'Yellow' },
    { name: 'celebration-blue', hex: '#83BCFF', label: 'Blue' },
    { name: 'celebration-purple', hex: '#C78CFF', label: 'Purple' },
    { name: 'celebration-green', hex: '#7DFFD4', label: 'Green' },
  ];

  // Pre-load some heart-warming default wishes
  const defaultWishes: WishNote[] = [
    {
      id: 'default-1',
      text: "Wishing you a year filled with endless laughter, late night conversations, and food adventures! Happy Birthday!",
      sender: "Your School Mate",
      color: "celebration-yellow",
      rotation: -3
    },
    {
      id: 'default-2',
      text: "To the friend who knows all my silence and always has my back. You are truly irreplaceable!",
      sender: "Your Wellwisher",
      color: "celebration-pink",
      rotation: 2
    },
    {
      id: 'default-3',
      text: "Cheers to more crazy Gameistry gaming sessions, Biggies burgers, and more core memories! Have a blast!",
      sender: "Your Gaming Partner",
      color: "celebration-blue",
      rotation: -1
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('birthday_wishes');
    if (saved) {
      setWishes(JSON.parse(saved));
    } else {
      setWishes(defaultWishes);
      localStorage.setItem('birthday_wishes', JSON.stringify(defaultWishes));
    }
  }, []);

  const saveWishes = (updated: WishNote[]) => {
    setWishes(updated);
    localStorage.setItem('birthday_wishes', JSON.stringify(updated));
  };

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) {
      toast.error("Please enter a wish message.");
      return;
    }
    const senderName = newSender.trim() || "Anonymous Friend";
    
    const newNote: WishNote = {
      id: Date.now().toString(),
      text: newText.trim(),
      sender: senderName,
      color: selectedColor,
      rotation: Math.floor(Math.random() * 8) - 4 // Random angle between -4 and 4 deg
    };

    const updated = [newNote, ...wishes];
    saveWishes(updated);
    setNewText('');
    setNewSender('');
    toast.success("🌟 Wish pinned to the wall!");
  };

  const handleDeleteWish = (id: string) => {
    const updated = wishes.filter(w => w.id !== id);
    saveWishes(updated);
    toast.success("Wish removed.");
  };

  return (
    <div className="w-full max-w-4xl bg-[#fafafa]/80 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border border-white/60 my-16 relative overflow-hidden">
      {/* Board title and background deco */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-celebration-yellow/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-celebration-pink/20 rounded-full blur-2xl -ml-16 -mb-16"></div>

      <div className="relative text-center mb-8">
        <h2 className="text-3xl md:text-4xl text-celebration-purple flex items-center justify-center gap-2">
          <Sparkles className="text-celebration-pink fill-celebration-pink" size={24} />
          Friendship Wish Wall
          <Sparkles className="text-celebration-pink fill-celebration-pink" size={24} />
        </h2>
        <p className="text-gray-600 text-sm md:text-base mt-2">
          Leave a sweet note or birthday wish on the wall!
        </p>
      </div>

      {/* Form to post wish */}
      <form onSubmit={handleAddWish} className="mb-10 p-5 rounded-2xl bg-white/60 border border-white/80 shadow-sm flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            placeholder="Your Name (e.g. Your Wellwisher)"
            value={newSender}
            onChange={(e) => setNewSender(e.target.value)}
            className="bg-white/80 border-purple-200/50 focus:border-celebration-purple/80"
          />
          {/* Note color selectors */}
          <div className="flex items-center gap-3 justify-center md:justify-end">
            <span className="text-xs text-gray-500 font-medium">Choose Color:</span>
            <div className="flex gap-2">
              {colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setSelectedColor(c.name)}
                  style={{ backgroundColor: c.hex }}
                  className={`w-6 h-6 rounded-full border transition-all duration-200 ${
                    selectedColor === c.name 
                      ? 'scale-125 border-gray-800 shadow-md ring-2 ring-purple-300' 
                      : 'border-transparent hover:scale-110 shadow-sm'
                  }`}
                  title={c.label}
                ></button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Write your sweet message here..."
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            maxLength={180}
            className="flex-grow bg-white/80 border-purple-200/50 focus:border-celebration-purple/80"
          />
          <Button 
            type="submit" 
            className="bg-gradient-to-r from-celebration-pink to-celebration-purple text-white hover:opacity-90 transition-all flex gap-1 px-4"
          >
            <Plus size={16} /> Pin Note
          </Button>
        </div>
      </form>

      {/* Pinned notes grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative min-h-[250px] p-2">
        {wishes.map((wish) => {
          const colorObj = colors.find(c => c.name === wish.color) || colors[0];
          return (
            <div
              key={wish.id}
              style={{
                transform: `rotate(${wish.rotation}deg)`,
                backgroundColor: `${colorObj.hex}cc`
              }}
              className="relative p-6 rounded-xl shadow-lg border border-white/40 hover:scale-105 hover:rotate-0 hover:z-20 transition-all duration-300 min-h-[160px] flex flex-col justify-between group"
            >
              {/* Wooden cork pin graphic */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-red-700/80 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
                <Pin size={22} className="fill-red-800" />
              </div>

              {/* Delete button (hover only) */}
              <button
                type="button"
                onClick={() => handleDeleteWish(wish.id)}
                className="absolute top-2 right-2 p-1 text-gray-700 hover:text-red-600 rounded-full hover:bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                title="Remove Wish"
              >
                <Trash2 size={14} />
              </button>

              {/* Message text */}
              <p className="font-handwriting text-xl text-gray-800 leading-snug break-words pr-2">
                "{wish.text}"
              </p>

              {/* Sender name */}
              <div className="mt-4 border-t border-black/10 pt-2 flex items-center justify-between text-xs font-semibold text-gray-700 uppercase tracking-wider">
                <span>— {wish.sender}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WishBoard;
