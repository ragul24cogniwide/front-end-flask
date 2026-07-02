import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Balloon from "@/components/Balloon";
import Paper from "@/components/Paper";
import Confetti from "@/components/Confetti";
import { toast } from "sonner";
import { ArrowRight, Sparkles, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import SparkleCursor from "@/components/SparkleCursor";
import AestheticMusicPlayer from "@/components/AestheticMusicPlayer";
import InteractiveEnvelope from "@/components/InteractiveEnvelope";
import WishBoard from "@/components/WishBoard";

const HomePage = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [papers, setPapers] = useState<
    Array<{
      id: number;
      color: string;
      left: string;
      top: string;
      delay: string;
    }>
  >([]);

  useEffect(() => {
    // Create initial paper confetti effect
    createPapers(25);

    // Show initial celebration toast
    const welcomeToast = setTimeout(() => {
      toast("✨ Welcome to your special celebration space! 💖", {
        description: "Explore the letter, pin wishes, and enjoy the melodies.",
        duration: 5000,
      });
    }, 1200);

    // Show confetti after 2 seconds
    const confettiToast = setTimeout(() => {
      setShowConfetti(true);
    }, 2000);

    return () => {
      clearTimeout(welcomeToast);
      clearTimeout(confettiToast);
    };
  }, []);

  const createPapers = (count: number) => {
    const colors = [
      "celebration-pink",
      "celebration-yellow",
      "celebration-blue",
      "celebration-purple",
      "celebration-green",
    ];

    const newPapers = Array.from({ length: count }).map((_, i) => ({
      id: Date.now() + i,
      color: colors[Math.floor(Math.random() * colors.length)],
      left: `${Math.random() * 100}%`,
      top: `-50px`,
      delay: `${Math.random() * 3.5}s`,
    }));

    setPapers((prev) => [...prev, ...newPapers]);

    // Remove papers after animation
    setTimeout(() => {
      setPapers((prev) =>
        prev.filter((p) => !newPapers.find((np) => np.id === p.id))
      );
    }, 8500);
  };

  // Synthesize balloon pop sound effect
  const playPopSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.12);
      
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start(now);
      osc.stop(now + 0.18);
    } catch (e) {}
  };

  const handleBalloonPop = () => {
    playPopSound();
    setShowConfetti(true);
    createPapers(15);

    // Hide confetti after 3.5 seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-[#FAF9FE] relative overflow-hidden pb-24">
      {/* Sparkles cursor trail */}
      <SparkleCursor />

      {/* Floating Audio Music Box Player */}
      <AestheticMusicPlayer />

      {/* Aurora glow blobs background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[5%] left-[5%] w-[400px] h-[400px] rounded-full bg-celebration-pink/15 blur-[110px] animate-pulse-subtle"></div>
        <div className="absolute bottom-[30%] right-[5%] w-[450px] h-[450px] rounded-full bg-celebration-purple/15 blur-[120px] animate-pulse-subtle" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[45%] left-[25%] w-[350px] h-[350px] rounded-full bg-celebration-blue/10 blur-[100px] animate-pulse-subtle" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Confetti & balloons animated background overlays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 9 }).map((_, i) => (
          <Balloon
            key={i}
            color={
              [
                "celebration-pink",
                "celebration-yellow",
                "celebration-blue",
                "celebration-purple",
                "celebration-green",
              ][i % 5]
            }
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 50 + 5}%`,
              animationDelay: `${i * 0.6}s`,
              opacity: 0.5,
              transform: 'scale(0.9)',
            }}
          />
        ))}

        {papers.map((paper) => (
          <Paper
            key={paper.id}
            color={paper.color}
            style={{
              left: paper.left,
              top: paper.top,
              animationDelay: paper.delay,
            }}
          />
        ))}

        {showConfetti && <Confetti count={60} />}
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        
        {/* Header decoration */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-purple-200/50 shadow-sm text-sm font-semibold text-celebration-pink mb-4 animate-bounce">
            <Sparkles size={14} className="fill-celebration-pink text-celebration-pink" />
            Time to Celebrate!
          </div>
          
          <h1 className="text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-celebration-pink via-purple-500 to-celebration-blue mb-4 drop-shadow-sm leading-tight">
            Happy Birthday!
          </h1>
          <p className="text-base md:text-lg text-gray-600 font-medium tracking-wide">
            A customized space filled with memories, especially for you!
          </p>
        </header>

        {/* Action buttons with glass effects (Moved up for high visibility) */}
        <div className="mb-12 flex flex-col sm:flex-row gap-4 items-center justify-center relative z-10">
          <Button
            onClick={() => {
              handleBalloonPop();
              toast("🎊 Celebration popped! You are awesome! ❤️", {
                description: "Thanks for being such an irreplaceable friend!",
              });
            }}
            className="bg-gradient-to-r from-celebration-pink to-pink-500 hover:opacity-90 text-white rounded-full px-6 py-5 shadow-lg shadow-pink-500/20 hover:scale-105 active:scale-[0.98] transition-all flex gap-2 items-center text-sm font-semibold w-full sm:w-auto"
          >
            <Heart size={16} className="fill-white" /> Pop A Celebration!
          </Button>

          <Link to="/gallery" className="w-full sm:w-auto">
            <Button className="bg-gradient-to-r from-celebration-blue to-purple-500 hover:opacity-90 text-white rounded-full px-6 py-5 shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-[0.98] transition-all flex gap-2 items-center text-sm font-semibold w-full">
              Go to Gallery <ArrowRight size={16} />
            </Button>
          </Link>
        </div>

        {/* Letter Envelope Redesign Section */}
        <div className="flex flex-col items-center justify-center mb-12">
          
          <InteractiveEnvelope title="My Message for You" sender="Your Best Friend">
            <h1 className="text-center text-3xl text-celebration-purple mb-6 leading-normal font-sans font-bold">
              Happy Birthday to the one who means my
              Wellwisher/friend/school-mate to me.
            </h1>
            <p className="mb-5">
              Words will never truly capture how much you mean to me, but I
              hope this message comes close. Thank you for walking into my
              life and choosing to stay. For being there through the quiet
              moments, the storms, the belly laughs that stitched our hearts
              closer. Thank you for being real—with your honesty, your
              warmth, and your unwavering presence.
            </p>
            <p className="mb-5">
              You’ve seen me in my silence, understood me without
              explanations, and reminded me that I matter—especially on the
              days I forget. You’ve been my calm in the chaos, my light on
              the darkest days, and my reminder that best friend bond doesn’t always
              roar—sometimes, it whispers gently and stays. You’ve shown me
              that the most beautiful kind of friendship isn’t loud and
              showy—it’s the quiet, consistent kind. And that’s the kind
              you’ve gifted me.
            </p>
            <p className="mb-5">
              You’re not just a friend. You’re my person. My best friend.
              The one who changed how I see the world and myself. Your
              kindness, your strength, and your beautiful soul have left an
              imprint on my heart that I’ll carry forever.
            </p>
            <p className="mb-5">
              On your special day, I hope you feel even a fraction of the
              best friend warmth you’ve so freely given. You deserve peace, joy, and every
              silent wish you've ever made. I’m so lucky to know you, and
              even luckier to walk this life with you by my side as My Best
              Friend Forever.
            </p>
            <p className="mb-6">
              Thank you for being you—brilliant, kind, irreplaceable. Here’s
              to more memories, more laughter, and many more years of
              beautiful friendship.
            </p>
            <p className="text-center font-bold text-2xl text-celebration-purple/90 italic mt-6">
              💝 Happy Birthday, my best friend. I Wish you more than words
              could ever say. 💝
            </p>
          </InteractiveEnvelope>
        </div>

        {/* Bulletins / wishes section */}
        <div className="flex justify-center my-6">
          <WishBoard />
        </div>

        {/* Fun clickable popping balloons grid */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl text-gray-700 mb-6 flex items-center justify-center gap-2">
            🎈 Click to Pop Balloons for a Surprise!
          </h3>
          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-8 md:gap-16 max-w-lg">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="transform hover:scale-110 active:scale-95 transition-all">
                    <Balloon
                      color={
                        [
                          "celebration-pink",
                          "celebration-yellow",
                          "celebration-blue",
                        ][i]
                      }
                      interactive={true}
                      onPop={handleBalloonPop}
                    />
                  </div>
                  <p className="text-center mt-16 text-xs text-gray-500 font-semibold uppercase tracking-wider">
                    Pop Me!
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomePage;
