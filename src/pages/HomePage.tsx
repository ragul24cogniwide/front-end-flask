import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Balloon from "@/components/Balloon";
import Paper from "@/components/Paper";
import Confetti from "@/components/Confetti";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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
    createPapers(20);

    // Show initial celebration toast
    setTimeout(() => {
      toast("🎉 Welcome to your special celebration page!");
    }, 1000);

    // Show confetti after 2 seconds
    setTimeout(() => {
      setShowConfetti(true);
    }, 2000);
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
      delay: `${Math.random() * 3}s`,
    }));

    setPapers((prev) => [...prev, ...newPapers]);

    // Remove papers after animation
    setTimeout(() => {
      setPapers((prev) =>
        prev.filter((p) => !newPapers.find((np) => np.id === p.id))
      );
    }, 8000);
  };

  const handleBalloonPop = () => {
    setShowConfetti(true);
    createPapers(10);

    // Hide confetti after 3 seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-celebration-pink/20 via-celebration-blue/10 to-celebration-purple/20 relative overflow-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
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
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              animationDelay: `${i * 0.5}s`,
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

        {showConfetti && <Confetti count={50} />}
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl text-celebration-purple mb-4">
            Happy Celebration!
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            A special page just for you, my best friend!
          </p>
        </header>

        <div className="flex flex-col items-center justify-center mb-16">
          <Card className="w-full max-w-2xl p-6 bg-white/80 backdrop-blur-md shadow-xl">
            <CardContent className="text-center">
              <h2 className="text-3xl text-celebration-pink mb-6">
                For My Amazing Friend
              </h2>
              <div className="prose prose-lg mx-auto">
                <h1>Happy Birthday to the one who means the world to me.</h1>
                <p className="mb-4">
                  Words will never truly capture how much you mean to me, but I
                  hope this message comes close. Thank you for walking into my
                  life and choosing to stay. For being there through the quiet
                  moments, the storms, the belly laughs that stitched our hearts
                  closer. Thank you for being real—with your honesty, your
                  warmth, and your unwavering presence.
                </p>
                <p className="mb-4">
                  You’ve seen me in my silence, understood me without
                  explanations, and reminded me that I matter—especially on the
                  days I forget. You’ve been my calm in the chaos, my light on
                  the darkest days, and my reminder that love doesn’t always
                  roar—sometimes, it whispers gently and stays. You’ve shown me
                  that the most beautiful kind of friendship isn’t loud and
                  showy—it’s the quiet, consistent kind. And that’s the kind
                  you’ve gifted me.
                </p>
                <p>
                  You’re not just a friend. You’re my person. My best friend.
                  The one who changed how I see the world and myself. Your
                  kindness, your strength, and your beautiful soul have left an
                  imprint on my heart that I’ll carry forever.
                </p>
                <p>
                  On your special day, I hope you feel even a fraction of the
                  love you’ve so freely given. You deserve peace, joy, and every
                  silent wish you've ever made. I’m so lucky to know you, and
                  even luckier to walk this life with you by my side as My Best
                  Friend Forever.
                </p>
                <p>
                  Thank you for being you—brilliant, kind, irreplaceable. Here’s
                  to more memories, more laughter, and many more years of
                  beautiful friendship.
                </p>
                <br />
                <p className="text-bold text-purple-600">
                  Happy Birthday, my best friend. I Wish you more than words
                  could ever say.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 flex gap-4">
            <Button
              onClick={() => {
                handleBalloonPop();
                toast("🎊 You're amazing!", {
                  description: "Thanks for being such a wonderful friend!",
                });
              }}
              className="bg-celebration-pink hover:bg-celebration-pink/90"
            >
              Pop A Celebration!
            </Button>

            <Link to="/gallery">
              <Button className="bg-celebration-blue hover:bg-celebration-blue/90 flex gap-2 items-center">
                Go to Gallery <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="relative">
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
                <p className="text-center mt-16 text-sm text-gray-600">
                  Click to pop!
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
