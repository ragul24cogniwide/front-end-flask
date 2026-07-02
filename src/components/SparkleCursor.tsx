import React, { useEffect } from 'react';

const SparkleCursor = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Limit sparkle generation rate
      if (Math.random() > 0.3) return;

      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle-star';
      sparkle.style.left = `${e.clientX}px`;
      sparkle.style.top = `${e.clientY}px`;
      
      // Random slight offset
      const offsetX = (Math.random() * 20 - 10) + 'px';
      const offsetY = (Math.random() * 20 - 10) + 'px';
      sparkle.style.setProperty('--offset-x', offsetX);
      sparkle.style.setProperty('--offset-y', offsetY);
      
      document.body.appendChild(sparkle);

      // Remove after animation finishes
      setTimeout(() => {
        sparkle.remove();
      }, 900);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return null; // This component runs purely as a side-effect
};

export default SparkleCursor;
