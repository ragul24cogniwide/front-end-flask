import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, X, Heart, Sparkles, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Paper from "@/components/Paper";
import Balloon from "@/components/Balloon";
import { toast } from "sonner";
import SparkleCursor from "@/components/SparkleCursor";
import AestheticMusicPlayer from "@/components/AestheticMusicPlayer";

import image1 from "../assets/_rainbow._.sparkle_-20220528-0002.jpg";
import image2 from "../assets/Snapchat-1312354775.jpg";
import image17 from "../assets/Snapchat-2139148319.jpg";
import image4 from "../assets/Snapchat-341135461.png";
import image18 from "../assets/ghibli.png";
import image6 from "../assets/Snapchat-1703127967.jpg";
import image7 from "../assets/IMG_20240701_161318_443.jpg";
import image8 from "../assets/IMG_20240701_161347_205.jpg";
import image9 from "../assets/IMG_20240701_161350_426.jpg";
import image10 from "../assets/IMG_20240701_161353_614.jpg";
import image11 from "../assets/IMG_20240701_161312_245.jpg";
import image12 from "../assets/IMG_20240701_161340_847.jpg";
import image13 from "../assets/Snapchat-225346477.jpg";
import image14 from "../assets/Snapchat-1354848155.jpg";
import image15 from "../assets/Snapchat-1703127967.jpg";

import image16 from "../assets/20260103_154827.jpg";
import image3 from "../assets/20260103_154835.jpg";
import image5 from "../assets/20260103_155020.jpg";
import image19 from "../assets/20260103_155238.jpg";
import image20 from "../assets/20260103_164616.jpg";
import image21 from "../assets/20260103_172330.jpg";
import image22 from "../assets/20260103_172342.jpg";
import image23 from "../assets/20260103_174021.jpg";
import image24 from "../assets/20260103_172119.jpg";
import image25 from "../assets/20260103_174022.jpg";

// Keep exactly the same photo entries
const galleryImages = [
  {
    id: 1,
    source: image1,
    title: "Sweet Snap",
    description: "Always shining bright together.",
  },
  {
    id: 2,
    source: image2,
    title: "Biggies Burger",
    description: "Burgers, giggles, and standard happy food times.",
  },
  {
    id: 3,
    source: image3,
    title: "Gameistry",
    description: "Board games and intense rivalries.",
  },
  {
    id: 4,
    source: image4,
    title: "Biggies Burger",
    description: "Can never say no to burgers!",
  },
  {
    id: 5,
    source: image5,
    title: "Gameistry",
    description: "The gaming squad on fire.",
  },
  {
    id: 18,
    source: image18,
    title: "Ghibli style😂",
    description: "Like a cozy anime frame.",
  },
  {
    id: 19,
    source: image19,
    title: "Gameistry",
    description: "Victory pose at the board game cafe.",
  },
  {
    id: 6,
    source: image6,
    title: "Happy Moments",
    description: "Cherished snapshot of pure friendship.",
  },
  {
    id: 20,
    source: image20,
    title: "Gameistry",
    description: "Strategizing for the next big win.",
  },
  {
    id: 7,
    source: image7,
    title: "Summer Memories",
    description: "Walking through beautiful summer days.",
  },
  {
    id: 8,
    source: image8,
    title: "Fun Times",
    description: "Laughs and light moments that make life beautiful.",
  },
  {
    id: 9,
    source: image9,
    title: "Good Day",
    description: "Every day spent with you is a good day.",
  },
  {
    id: 10,
    source: image10,
    title: "Smiles",
    description: "Sincere smiles and simple joys.",
  },
  {
    id: 23,
    source: image23,
    title: "Gameistry",
    description: "Full concentration on the gameboard.",
  },
  {
    id: 11,
    source: image11,
    title: "Candid Shot",
    description: "The best memories are the unscripted ones.",
  },
  {
    id: 21,
    source: image21,
    title: "Game night",
    description: "Late night gaming battles.",
  },
  {
    id: 22,
    source: image22,
    title: "Snack time",
    description: "Chilling and sharing good snacks.",
  },
  {
    id: 13,
    source: image13,
    title: "Cute Selfies",
    description: "Silly faces and endless memories.",
  },
  {
    id: 14,
    source: image14,
    title: "Joyous Snap",
    description: "Capturing details of happiness.",
  },
  {
    id: 12,
    source: image12,
    title: "Peaceful Times",
    description: "Cozy spaces and soft lighting.",
  },
  {
    id: 15,
    source: image15,
    title: "Best Memories",
    description: "Laughter is best shared.",
  },
  {
    id: 16,
    source: image16,
    title: "Gameistry",
    description: "Another legendary board game afternoon.",
  },
  {
    id: 17,
    source: image17,
    title: "Biggies Burger",
    description: "Late night food runs are our favorite.",
  },
  {
    id: 24,
    source: image24,
    title: "Gameistry",
    description: "Deep thinking over chess and cards.",
  },
  {
    id: 25,
    source: image25,
    title: "Gameistry",
    description: "Signing off another wonderful day.",
  }
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState("All");
  const [likes, setLikes] = useState<Record<number, number>>({});
  
  const [papers] = useState<
    Array<{
      id: number;
      color: string;
      left: string;
      top: string;
      delay: string;
    }>
  >(
    Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      color: [
        "celebration-pink",
        "celebration-yellow",
        "celebration-blue",
        "celebration-purple",
        "celebration-green",
      ][i % 5],
      left: `${Math.random() * 100}%`,
      top: `-50px`,
      delay: `${Math.random() * 3.5}s`,
    }))
  );

  // Initialize likes on mount
  useEffect(() => {
    const saved = localStorage.getItem("gallery_likes");
    if (saved) {
      setLikes(JSON.parse(saved));
    } else {
      const initialLikes: Record<number, number> = {};
      galleryImages.forEach((img) => {
        initialLikes[img.id] = Math.floor(Math.random() * 6) + 3; // 3 to 8 starting likes
      });
      setLikes(initialLikes);
      localStorage.setItem("gallery_likes", JSON.stringify(initialLikes));
    }

    // Show gallery load toast
    const timer = setTimeout(() => {
      toast("📷 Polaroid scrapbooks loaded!", {
        description: "Filter notes, best friend snaps, and click to view full size.",
      });
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handlePrevImage = () => {
    if (selectedImage !== null) {
      const filteredList = getFilteredImages();
      const currentFilteredIndex = filteredList.findIndex(
        (img) => img.id === filteredImages[selectedImage].id
      );
      const prevFilteredIndex =
        currentFilteredIndex === 0
          ? filteredList.length - 1
          : currentFilteredIndex - 1;
      
      const originalIndex = galleryImages.findIndex(
        (img) => img.id === filteredList[prevFilteredIndex].id
      );
      setSelectedImage(originalIndex);
    }
  };

  const handleNextImage = () => {
    if (selectedImage !== null) {
      const filteredList = getFilteredImages();
      const currentFilteredIndex = filteredList.findIndex(
        (img) => img.id === filteredImages[selectedImage].id
      );
      const nextFilteredIndex =
        currentFilteredIndex === filteredList.length - 1
          ? 0
          : currentFilteredIndex + 1;

      const originalIndex = galleryImages.findIndex(
        (img) => img.id === filteredList[nextFilteredIndex].id
      );
      setSelectedImage(originalIndex);
    }
  };

  // Keyboard navigation within lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "Escape") setSelectedImage(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  const handleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = {
      ...likes,
      [id]: (likes[id] || 0) + 1,
    };
    setLikes(updated);
    localStorage.setItem("gallery_likes", JSON.stringify(updated));

    // play chime pop
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.08);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch (err) {}
  };

  const getFilteredImages = () => {
    if (filter === "All") return galleryImages;
    if (filter === "Gameistry") return galleryImages.filter((img) => img.title === "Gameistry" || img.title === "Game night");
    if (filter === "Biggies Burger") return galleryImages.filter((img) => img.title === "Biggies Burger");
    // Snaps category represents everything else
    return galleryImages.filter((img) => img.title !== "Gameistry" && img.title !== "Game night" && img.title !== "Biggies Burger");
  };

  const filteredImages = getFilteredImages();

  return (
    <div className="min-h-screen bg-[#FAF9FE] relative overflow-hidden pb-24">
      {/* Sparkles cursor trail */}
      <SparkleCursor />

      {/* Floating Audio Music Box Player */}
      <AestheticMusicPlayer />

      {/* Aurora glow blobs background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] right-[5%] w-[350px] h-[350px] rounded-full bg-celebration-blue/15 blur-[100px] animate-pulse-subtle"></div>
        <div className="absolute bottom-[10%] left-[5%] w-[450px] h-[450px] rounded-full bg-celebration-pink/15 blur-[120px] animate-pulse-subtle" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-[40%] left-[30%] w-[350px] h-[350px] rounded-full bg-celebration-purple/10 blur-[115px] animate-pulse-subtle" style={{ animationDelay: "4.5s" }}></div>
      </div>

      {/* Falling papers and balloons */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 7 }).map((_, i) => (
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
              top: `${Math.random() * 45 + 5}%`,
              animationDelay: `${i * 0.7}s`,
              opacity: 0.45,
              transform: "scale(0.85)",
            }}
            interactive={false}
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
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        
        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-purple-200/50 shadow-sm text-sm font-semibold text-celebration-pink mb-4">
            <ImageIcon size={14} />
            Memory Scrapbook Album
          </div>
          
          <h1 className="text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-celebration-pink via-purple-500 to-celebration-blue mb-4">
            Our Memories
          </h1>
          <p className="text-base md:text-lg text-gray-600 font-medium tracking-wide mb-6">
            A beautiful scrapbook collections of our memorable moments spent together
          </p>
          
          <Link to="/home">
            <Button className="bg-white/70 hover:bg-celebration-pink/15 text-gray-700 hover:text-celebration-pink rounded-full border border-purple-100 hover:border-celebration-pink/50 shadow-sm px-6 py-5 flex items-center gap-2 transition-all">
              <ArrowLeft size={16} /> Back to Home
            </Button>
          </Link>
        </header>

        {/* Filter categories tags */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {["All", "Gameistry", "Biggies Burger", "Other Snaps"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat === "Other Snaps" ? "Snaps" : cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold shadow-sm border transition-all duration-300 ${
                (filter === cat || (cat === "Other Snaps" && filter === "Snaps"))
                  ? "bg-gradient-to-r from-celebration-pink to-celebration-purple text-white border-transparent scale-105"
                  : "bg-white/75 text-gray-600 border-purple-100 hover:bg-purple-50 hover:text-celebration-purple"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Polaroid Scrapbook Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 p-2">
          {filteredImages.map((image) => {
            // Consistent random slant angle based on image ID
            const rotationAngle = (image.id % 6) - 3; // between -3deg and +2deg
            const tapeColorClass = 
              image.id % 3 === 0 
                ? "washi-tape-pink" 
                : image.id % 3 === 1 
                ? "washi-tape-blue" 
                : "washi-tape-purple";

            // Find image index inside unfiltered list for Lightbox triggers
            const originalIndex = galleryImages.findIndex((img) => img.id === image.id);

            return (
              <div
                key={image.id}
                style={{ transform: `rotate(${rotationAngle}deg)` }}
                className="polaroid-card group cursor-pointer hover:rotate-0 hover:scale-105 hover:z-20 transition-all duration-300"
                onClick={() => setSelectedImage(originalIndex)}
              >
                {/* Washi Tape styling overlay */}
                <div className={`washi-tape ${tapeColorClass}`}></div>

                {/* Picture Area */}
                <div className="overflow-hidden rounded-sm relative aspect-square bg-gray-100 border border-gray-200/50">
                  <img
                    src={image.source}
                    alt={image.title || "Memory Snap"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Hearts overlay count on hover */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={(e) => handleLike(image.id, e)}
                      className="w-12 h-12 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                      title="Best Friend this snap"
                    >
                      <Heart className="text-red-500 fill-red-500" size={20} />
                    </button>
                  </div>
                </div>

                {/* Handwritten labels footer */}
                <div className="mt-4 text-center">
                  <h3 className="font-handwriting text-2xl text-gray-800 tracking-wide font-semibold truncate leading-tight">
                    {image.title || "Forever Memory"}
                  </h3>
                  
                  {/* Likes and interactives row */}
                  <div className="mt-2 flex items-center justify-center gap-1.5 text-xs text-gray-400 font-semibold uppercase tracking-wider">
                    <Heart size={11} className="text-red-500 fill-red-500" />
                    <span>{likes[image.id] || 0} Best Friends</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Immersive Cinematic Lightbox overlay */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          
          {/* Close trigger button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 rounded-full w-12 h-12 bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-white/30"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Modal Container */}
          <div className="w-full max-w-4xl bg-transparent flex flex-col relative z-10 px-2">
            
            {/* The Image inside cinema viewport */}
            <div className="relative aspect-[4/3] max-h-[70vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black/40 border border-white/5 shadow-2xl">
              <img
                src={galleryImages[selectedImage].source}
                alt={galleryImages[selectedImage].title || "Memory"}
                className="max-w-full max-h-full object-contain"
              />

              {/* Prev / Next visual slide arrow pads */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/10 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
              >
                <ArrowLeft size={20} />
              </button>

              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/10 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
              >
                <ArrowRight size={20} />
              </button>
            </div>

            {/* Custom Polaroid Caption Info */}
            <div className="text-center mt-6 text-white p-2">
              <h3 className="font-handwriting text-4xl text-transparent bg-clip-text bg-gradient-to-r from-celebration-pink via-purple-300 to-celebration-blue mb-2 font-bold">
                {galleryImages[selectedImage].title || "Forever Memory"}
              </h3>
              <p className="text-gray-300 text-sm md:text-base font-medium max-w-md mx-auto leading-relaxed">
                {galleryImages[selectedImage].description || "A wonderful piece of our life together. Cherishing this moment forever."}
              </p>
              
              {/* Heart interact inside details */}
              <div className="mt-4 flex items-center justify-center gap-3">
                <Button
                  onClick={(e) => handleLike(galleryImages[selectedImage].id, e)}
                  className="bg-white/10 hover:bg-celebration-pink/20 hover:text-celebration-pink border border-white/10 hover:border-celebration-pink/35 text-white rounded-full px-5 flex gap-2 items-center"
                >
                  <Heart className="fill-red-500 text-red-500 animate-pulse" size={15} />
                  Best Friend Snap ({likes[galleryImages[selectedImage].id] || 0})
                </Button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
