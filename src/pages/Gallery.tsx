import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import Paper from "@/components/Paper";
import Balloon from "@/components/Balloon";
import { toast } from "sonner";

import image1 from "../assets/_rainbow._.sparkle_-20220528-0002.jpg";
import image2 from "../assets/Snapchat-1312354775.jpg";
import image3 from "../assets/Snapchat-2139148319.jpg";
import image4 from "../assets/Snapchat-341135461.png";
import image5 from "../assets/ghibli.png";
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

// Gallery images - these are placeholder images that would be replaced with actual friend photos
const galleryImages = [
  {
    id: 1,
    source: image1,
    title: "",
    description: "",
  },
  {
    id: 2,
    source: image2,
    title: "Biggies Burger",
    description: "",
  },
  {
    id: 3,
    source: image3,
    title: "Biggies Burger",
    description: "",
  },
  {
    id: 4,
    source: image4,
    title: "Biggies Burger",
    description: "",
  },
  {
    id: 5,
    source: image5,
    title: "Ghibli style😂",
    description: "",
  },
  {
    id: 6,
    source: image6,
    title: "",
    description: "",
  },
  {
    id: 7,
    source: image7,
    title: "",
    description: "",
  },
  {
    id: 8,
    source: image8,
    title: "",
    description: "",
  },
  {
    id: 9,
    source: image9,
    title: "",
    description: "",
  },
  {
    id: 10,
    source: image10,
    title: "",
    description: "",
  },
  {
    id: 11,
    source: image11,
    title: "",
    description: "",
  },
  {
    id: 12,
    source: image12,
    title: "",
    description: "",
  },
  {
    id: 13,
    source: image13,
    title: "",
    description: "",
  },
  {
    id: 14,
    source: image14,
    title: "",
    description: "",
  },
  {
    id: 15,
    source: image15,
    title: "",
    description: "",
  },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [papers] = useState<
    Array<{
      id: number;
      color: string;
      left: string;
      top: string;
      delay: string;
    }>
  >(
    Array.from({ length: 15 }).map((_, i) => ({
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
      delay: `${Math.random() * 3}s`,
    }))
  );
  const [balloonPopped, setBalloonPopped] = useState<Array<boolean>>([]);

  useEffect(() => {
    // Initialize balloon popped states
    setBalloonPopped(Array(6).fill(false));

    // Auto pop balloons with different delays
    const popTimers = Array.from({ length: 6 }).map((_, i) => {
      return setTimeout(() => {
        setBalloonPopped((prev) => {
          const newState = [...prev];
          newState[i] = true;
          return newState;
        });
      }, 1000 + i * 300); // Pop each balloon with 300ms delay between them
    });

    // Show welcome toast
    setTimeout(() => {
      toast("🎉 Welcome to our memory gallery!", {
        description: "Enjoy these special moments together",
      });
    }, 800);

    // Cleanup timers
    return () => {
      popTimers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const handlePrevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((prev) =>
        prev === 0 ? galleryImages.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((prev) =>
        prev === galleryImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-celebration-blue/20 via-celebration-purple/10 to-celebration-pink/20 relative overflow-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
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
              top: `${Math.random() * 40}%`,
              animationDelay: `${i * 0.5}s`,
            }}
            interactive={false}
            onPop={() => {}}
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

      {/* Main content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl text-celebration-purple mb-4">
            Our Memories
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            A collection of our wonderful times together
          </p>
          <Link to="/home">
            <Button className="bg-celebration-blue hover:bg-celebration-blue/90 mb-8 flex items-center gap-2">
              <ArrowLeft size={16} /> Back to Home
            </Button>
          </Link>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="gallery-card group"
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.source}
                alt={image.title}
                className="w-full h-64 object-cover"
              />
              <div className="gallery-card-overlay">
                <div className="text-white text-center p-4">
                  <h3 className="text-xl font-bold">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl bg-white overflow-hidden relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
            </Button>

            <div className="relative aspect-video">
              <img
                src={galleryImages[selectedImage].source}
                alt={galleryImages[selectedImage].title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold mb-2">
                {galleryImages[selectedImage].title}
              </h3>
              <p className="text-gray-600">
                {galleryImages[selectedImage].description}
              </p>
            </div>

            <div className="flex justify-between p-4">
              <Button
                variant="outline"
                onClick={handlePrevImage}
                className="flex items-center gap-1"
              >
                <ArrowLeft size={16} /> Previous
              </Button>
              <Button
                variant="outline"
                onClick={handleNextImage}
                className="flex items-center gap-1"
              >
                Next <ArrowRight size={16} />
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Gallery;
