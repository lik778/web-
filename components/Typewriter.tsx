
import React, { useEffect, useState } from 'react';
import { audioService } from '../services/audioService';

interface TypewriterProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 30, onComplete, className = '' }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    // Helper to reduce sound frequency (play every 3 chars)
    let soundCounter = 0;

    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        
        // Play sound effect
        soundCounter++;
        if (soundCounter % 2 === 0 && text.charAt(i) !== ' ') {
            audioService.playDataStream();
        }

        i++;
      } else {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, onComplete]);

  return <p className={`whitespace-pre-line ${className}`}>{displayedText}</p>;
};

export default Typewriter;
