import React, { useState } from 'react';
import { MailOpen, Heart } from 'lucide-react';
import { cn } from "@/lib/utils";

interface InteractiveEnvelopeProps {
  title: string;
  sender: string;
  children: React.ReactNode;
}

const InteractiveEnvelope = ({ title, sender, children }: InteractiveEnvelopeProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex flex-col items-center justify-center my-12 px-2">
      {/* Visual Instruction Banner */}
      {!isOpen && (
        <div className="text-center mb-6 animate-bounce text-sm font-semibold tracking-wider text-celebration-pink bg-white/80 px-4 py-2 rounded-full shadow-md glass-panel flex items-center gap-2 cursor-pointer" onClick={() => setIsOpen(true)}>
          <MailOpen size={16} />
          Click to Open My Special Letter For You
        </div>
      )}

      {/* Main Envelope Wrapper */}
      <div 
        className={cn(
          "relative w-full max-w-xl transition-all duration-700 ease-in-out cursor-pointer",
          isOpen ? "h-[auto] min-h-[500px]" : "h-64 sm:h-80 hover:scale-105"
        )}
        onClick={() => !isOpen && setIsOpen(true)}
      >
        {/* Envelope Back Face & Pocket */}
        <div className={cn(
          "absolute inset-0 bg-[#e0d6ff] rounded-2xl shadow-inner border border-purple-300/30 overflow-hidden transition-all duration-500",
          isOpen ? "opacity-0 pointer-events-none scale-95" : "opacity-100"
        )}>
          {/* Decorative interior pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C78CFF_1px,transparent_1px)] [background-size:16px_16px]"></div>
        </div>

        {/* The Letter content */}
        <div 
          className={cn(
            "w-full bg-[#fcfbf7] border border-[#f3ebdb] rounded-xl p-4 sm:p-8 md:p-10 shadow-2xl transition-all duration-1000 ease-in-out relative z-10",
            isOpen 
              ? "translate-y-0 scale-100 opacity-100 rotate-0" 
              : "translate-y-24 scale-90 opacity-20 rotate-[-2deg] pointer-events-none absolute left-0 right-0 top-0 h-40 sm:h-48 overflow-hidden"
          )}
        >
          {/* Old parchment aesthetic borders */}
          <div className="absolute inset-2 sm:inset-4 border border-[#e5dcc6] rounded-lg opacity-40 pointer-events-none"></div>
          
          <div className="prose prose-lg mx-auto font-handwriting text-xl sm:text-2xl text-gray-800 leading-relaxed selection:bg-celebration-pink/20">
            {children}
          </div>

          {/* Close button inside the letter */}
          {isOpen && (
            <div className="flex justify-center mt-8">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                  window.scrollTo({ top: 200, behavior: 'smooth' });
                }}
                className="text-sm font-semibold tracking-wider text-gray-500 hover:text-celebration-pink border-b border-dashed border-gray-300 hover:border-celebration-pink transition-all pb-1"
              >
                Close & Seal Envelope
              </button>
            </div>
          )}
        </div>

        {/* Envelope Front Flaps (Visible only when closed) */}
        {!isOpen && (
          <>
            {/* Left triangle flap */}
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-purple-200 to-purple-100/40 rounded-l-2xl border-l border-white/20" style={{ clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)' }}></div>
            
            {/* Right triangle flap */}
            <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-purple-200 to-purple-100/40 rounded-r-2xl border-r border-white/20" style={{ clipPath: 'polygon(100% 0%, 0% 50%, 100% 100%)' }}></div>
            
            {/* Bottom triangle flap */}
            <div className="absolute bottom-0 inset-x-0 h-2/3 bg-gradient-to-t from-purple-200 via-purple-100 to-purple-50/50 rounded-b-2xl border-b border-white/30" style={{ clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)' }}></div>

            {/* Top flap (Folded down) */}
            <div className="absolute top-0 inset-x-0 h-1/2 bg-purple-300 rounded-t-2xl origin-top transition-transform duration-500 z-20 shadow-md" style={{ clipPath: 'polygon(0% 0%, 50% 100%, 100% 0%)' }}></div>

            {/* Glowing Heart Wax Seal */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-transform duration-300 hover:scale-110 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-celebration-pink to-pink-500 shadow-lg flex items-center justify-center border border-pink-400/50 animate-pulse">
                <Heart className="fill-white text-white" size={24} />
              </div>
              {/* Seal details */}
              <div className="absolute text-[8px] text-white/70 font-semibold uppercase tracking-widest pointer-events-none mt-12">
                Open Me
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InteractiveEnvelope;
