
import React, { useEffect, useState } from 'react';

interface ConfettiProps {
  count: number;
}

const Confetti = ({ count }: ConfettiProps) => {
  const [confetti, setConfetti] = useState<Array<{ id: number; color: string; x: string; delay: string }>>([]);

  useEffect(() => {
    const colors = [
      'bg-celebration-pink',
      'bg-celebration-yellow',
      'bg-celebration-blue',
      'bg-celebration-purple',
      'bg-celebration-green',
    ];

    const newConfetti = Array.from({ length: count }).map((_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      x: `${(Math.random() * 200) - 100}px`,  // Random X position between -100px and 100px
      delay: `${Math.random() * 0.5}s`,       // Random delay between 0-0.5s
    }));

    setConfetti(newConfetti);
  }, [count]);

  return (
    <div className="relative">
      {confetti.map((c) => (
        <div
          key={c.id}
          className={`confetti ${c.color}`}
          style={{
            '--random-x': c.x,
            animationDelay: c.delay,
            left: '50%',
            top: '50%',
          } as React.CSSProperties}
        ></div>
      ))}
    </div>
  );
};

export default Confetti;
