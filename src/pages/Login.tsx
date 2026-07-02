import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import Balloon from '@/components/Balloon';
import { Lock, Unlock, Eye, EyeOff, Key } from 'lucide-react';
import SparkleCursor from '@/components/SparkleCursor';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const navigate = useNavigate();

  // Synthesize a cute key unlock chime using Web Audio API
  const playUnlockSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = audioCtx.currentTime;
      
      // Chime 1
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.exponentialRampToValueAtTime(783.99, now + 0.15); // G5
      gain1.gain.setValueAtTime(0.15, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      
      // Chime 2
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(659.25, now + 0.1); // E5
      osc2.frequency.exponentialRampToValueAtTime(1046.50, now + 0.3); // C6
      gain2.gain.setValueAtTime(0.15, now + 0.1);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);

      osc1.start(now);
      osc1.stop(now + 0.35);
      osc2.start(now + 0.1);
      osc2.stop(now + 0.45);
    } catch (e) {
      console.warn("AudioContext block", e);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      setIsUnlocking(true);
      playUnlockSound();
      
      // Wait for the unlocking animation/sound to play
      setTimeout(() => {
        toast.success("✨ Celebration space unlocked successfully! Welcome! 🎉");
        navigate('/home');
      }, 900);
    } else {
      toast.error("Please enter a username and password to unlock.");
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9fe] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Sparkles Cursor trail */}
      <SparkleCursor />

      {/* Aurora glowing background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[10%] w-[350px] h-[350px] rounded-full bg-celebration-pink/20 blur-[100px] animate-pulse-subtle"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[450px] h-[450px] rounded-full bg-celebration-purple/20 blur-[120px] animate-pulse-subtle" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-[40%] left-[45%] w-[300px] h-[300px] rounded-full bg-celebration-blue/15 blur-[100px] animate-pulse-subtle" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Background balloons */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 10 }).map((_, i) => (
          <Balloon 
            key={i} 
            color={['celebration-pink', 'celebration-yellow', 'celebration-blue', 'celebration-purple', 'celebration-green'][i % 5]} 
            style={{ 
              left: `${Math.random() * 90 + 5}%`, 
              top: `${Math.random() * 70 + 5}%`,
              animationDelay: `${i * 0.4}s`,
              transform: 'scale(0.85)',
              opacity: 0.65
            }} 
          />
        ))}
      </div>

      {/* Glass Login Card */}
      <Card className="w-full max-w-md bg-white/45 backdrop-blur-xl border border-white/60 shadow-2xl relative z-10 p-4 md:p-6 rounded-3xl animate-pulse-subtle">
        <CardHeader className="text-center pb-2">
          {/* Unlocking animation visual header */}
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-celebration-pink to-celebration-purple text-white flex items-center justify-center shadow-lg shadow-pink-500/25 mb-4 transform hover:rotate-12 transition-transform duration-300">
            {isUnlocking ? (
              <Unlock className="w-8 h-8 animate-bounce" />
            ) : (
              <Lock className="w-8 h-8" />
            )}
          </div>
          
          <CardTitle className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-celebration-pink via-purple-500 to-celebration-blue tracking-wide pb-1">
            Unlock Celebration
          </CardTitle>
          <CardDescription className="text-gray-600 text-sm md:text-base font-medium mt-1">
            Enter the private birthday space for your best friend!
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-4">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1 ml-1" htmlFor="username">
                Username
              </label>
              <Input 
                id="username"
                type="text" 
                placeholder="Enter friend's nickname or any name" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className="bg-white/80 border-purple-200/50 focus:border-celebration-purple focus:ring-2 focus:ring-celebration-purple/20 rounded-2xl h-11 px-4 text-gray-800 placeholder-gray-400"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1 ml-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Input 
                  id="password"
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter passcode" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/80 border-purple-200/50 focus:border-celebration-purple focus:ring-2 focus:ring-celebration-purple/20 rounded-2xl h-11 pl-4 pr-10 text-gray-800 placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-celebration-purple focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </form>
        </CardContent>
        
        <CardFooter className="pt-4">
          <Button 
            onClick={handleLogin} 
            disabled={isUnlocking}
            className="w-full bg-gradient-to-r from-celebration-pink to-celebration-purple text-white font-semibold rounded-2xl h-12 shadow-lg shadow-pink-500/20 hover:shadow-pink-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {isUnlocking ? (
              <>
                <Unlock className="w-5 h-5 animate-spin" />
                Unlocking Space...
              </>
            ) : (
              <>
                <Key className="w-5 h-5" />
                Unlock Portal
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
