
import React from 'react';
import { cn } from "@/lib/utils";

interface PaperProps {
  color: string;
  style?: React.CSSProperties;
}

const Paper = ({ color, style }: PaperProps) => {
  const shapes = ['square', 'rectangle', 'circle', 'triangle'];
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  
  return (
    <div 
      className={cn(
        "paper",
        {
          'rounded-full': shape === 'circle',
          'rounded-sm': shape === 'square',
          'rounded-sm w-[30px] h-[20px]': shape === 'rectangle',
          'clip-path-triangle': shape === 'triangle',
        },
        `bg-${color}`
      )} 
      style={style}
    ></div>
  );
};

export default Paper;
