import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const AestheticMusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sequenceTimerRef = useRef<number | null>(null);
  const activeNodesRef = useRef<AudioNode[]>([]);

  // Pentatonic scale frequencies for a sweet chime sound:
  // C4, D4, E4, G4, A4, C5, D5, E5, G5, A5, C6
  const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
  // A beautiful chord progression melody loop
  const melody = [
    [0, 4, 7], // C major
    [0, 5, 8], // Am
    [0, 4, 6], // F
    [0, 3, 5], // G
  ];

  const stopMusic = () => {
    if (sequenceTimerRef.current) {
      clearInterval(sequenceTimerRef.current);
      sequenceTimerRef.current = null;
    }
    activeNodesRef.current.forEach(node => {
      try {
        // @ts-ignore
        node.stop();
      } catch (e) {}
    });
    activeNodesRef.current = [];
    setIsPlaying(false);
  };

  const playNote = (freq: number, startTime: number, duration: number) => {
    if (!audioCtxRef.current || !gainNodeRef.current) return;
    const ctx = audioCtxRef.current;

    // Oscillator for the chime body
    const osc = ctx.createOscillator();
    // Use triangle wave for a warm, bell-like tone
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    // Oscillator gain envelope (Bell envelope: Instant attack, slow exponential decay)
    const noteGain = ctx.createGain();
    noteGain.gain.setValueAtTime(0, startTime);
    noteGain.gain.linearRampToValueAtTime(volume * 0.4, startTime + 0.02);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    // Connect nodes
    osc.connect(noteGain);
    
    // Add a simple feedback delay node for spacey reverb-like sound
    const delay = ctx.createDelay();
    delay.delayTime.setValueAtTime(0.35, startTime);
    const delayGain = ctx.createGain();
    delayGain.gain.setValueAtTime(0.4, startTime); // feedback level

    noteGain.connect(gainNodeRef.current);
    noteGain.connect(delay);
    delay.connect(delayGain);
    delayGain.connect(delay); // feedback loop
    delayGain.connect(gainNodeRef.current);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.5);

    activeNodesRef.current.push(osc);
  };

  const startMusic = () => {
    // Initialize AudioContext on user interaction
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Set up main gain node
    gainNodeRef.current = ctx.createGain();
    gainNodeRef.current.gain.setValueAtTime(isMuted ? 0 : volume, ctx.currentTime);
    gainNodeRef.current.connect(ctx.destination);

    setIsPlaying(true);
    toast.info("🎵 Ambient music box started. Enjoy the vibes!");

    let step = 0;
    const tempo = 240; // Beat interval in ms
    
    // Simple chime sequencer
    sequenceTimerRef.current = window.setInterval(() => {
      const now = ctx.currentTime;
      
      // Play a root note and some ambient random harmonics on the pentatonic scale
      if (step % 8 === 0) {
        // Chord base
        const progressionIndex = Math.floor(step / 8) % melody.length;
        const chord = melody[progressionIndex];
        chord.forEach((noteIdx, i) => {
          const freq = scale[noteIdx + 2];
          playNote(freq, now + i * 0.05, 2.5);
        });
      } else if (step % 2 === 0 && Math.random() > 0.4) {
        // Arpeggiated random bell
        const randomScaleIndex = Math.floor(Math.random() * 5) + 4; // Mid-high tones
        const freq = scale[randomScaleIndex];
        playNote(freq, now, 1.2);
      }

      step++;
    }, tempo);
  };

  const handlePlayToggle = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  const handleMuteToggle = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(newMuted ? 0 : volume, audioCtxRef.current?.currentTime || 0);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (gainNodeRef.current && !isMuted) {
      gainNodeRef.current.gain.setValueAtTime(newVol, audioCtxRef.current?.currentTime || 0);
    }
  };

  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 z-50 glass-panel p-3 sm:p-4 rounded-2xl flex items-center gap-3 sm:gap-4 shadow-xl border border-white/60 animate-bounce-slow max-w-[calc(100%-2rem)] sm:max-w-sm transition-all duration-300">
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-celebration-pink to-celebration-purple text-white animate-spin-slow">
        <Music size={18} />
      </div>

      <div className="flex flex-col flex-grow">
        <span className="text-xs font-semibold text-celebration-pink uppercase tracking-wider font-sans">Music Box</span>
        <span className="text-sm font-medium text-gray-800 line-clamp-1">Best Friend's Melody 🔔</span>
        
        {/* Cute animated visualizer */}
        <div className="flex items-end gap-[3px] h-6 mt-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="w-[3px] bg-gradient-to-t from-celebration-pink to-celebration-purple rounded-full"
              style={{
                height: isPlaying ? '100%' : '4px',
                animation: isPlaying ? 'bar-jump 0.8s ease-in-out infinite' : 'none',
                animationDelay: `${i * 0.12}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePlayToggle}
          className="w-9 h-9 rounded-full bg-white hover:bg-celebration-pink/10 border-celebration-pink/20 hover:border-celebration-pink transition-all"
        >
          {isPlaying ? <Pause size={15} className="text-celebration-purple" /> : <Play size={15} className="text-celebration-pink fill-celebration-pink" />}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleMuteToggle}
          className="w-8 h-8 rounded-full hover:bg-gray-100"
        >
          {isMuted ? <VolumeX size={16} className="text-gray-500" /> : <Volume2 size={16} className="text-gray-700" />}
        </Button>

        <input
          type="range"
          min="0"
          max="0.8"
          step="0.05"
          value={volume}
          onChange={handleVolumeChange}
          className="w-16 accent-celebration-pink cursor-pointer h-1 rounded-lg"
        />
      </div>
    </div>
  );
};

// Simple animation class extension for the visualizer spinner
const style = document.createElement('style');
style.textContent = `
  @keyframes spin-slow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .animate-spin-slow {
    animation: spin-slow 12s linear infinite;
  }
  @keyframes bounce-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }
  .animate-bounce-slow {
    animation: bounce-slow 3s ease-in-out infinite;
  }
`;
document.head.appendChild(style);

export default AestheticMusicPlayer;
