
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import Confetti from '@/components/Confetti';

interface BalloonProps {
  color: string;
  style?: React.CSSProperties;
  interactive?: boolean;
  onPop?: () => void;
  popped?: boolean;
}

const Balloon = ({ color, style, interactive = false, onPop, popped: externalPopped }: BalloonProps) => {
  const [internalPopped, setInternalPopped] = useState(false);
  
  // Determine if the balloon is popped based on either internal state or external prop
  const isPopped = externalPopped !== undefined ? externalPopped : internalPopped;
  
  const handlePop = () => {
    if (interactive && !isPopped) {
      setInternalPopped(true);
      if (onPop) onPop();
    }
  };

  return (
    <div 
      className={cn(
        "balloon-container",
        interactive ? "cursor-pointer" : "",
        isPopped ? "animate-pop" : "animate-float"
      )} 
      style={style}
      onClick={handlePop}
    >
      {isPopped ? (
        <Confetti count={20} />
      ) : (
        <>
          <div className={`balloon bg-${color}`}></div>
          <div className="balloon-string"></div>
        </>
      )}
    </div>
  );
};

export default Balloon;
