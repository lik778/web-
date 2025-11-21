
import React from 'react';
import { Destination } from '../types';

interface Planet3DProps {
  destination: Destination;
}

const Planet3D: React.FC<Planet3DProps> = ({ destination }) => {
  const isBlackHole = destination.id === 'blackhole_cygnus';
  
  let glowColor = '#06b6d4';
  if (destination.color.includes('red')) glowColor = '#ef4444';
  if (destination.color.includes('blue')) glowColor = '#93c5fd';
  if (destination.color.includes('yellow')) glowColor = '#eab308';
  if (destination.color.includes('purple')) glowColor = '#c084fc';
  if (destination.color.includes('emerald')) glowColor = '#34d399';

  if (isBlackHole) {
    return (
      <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center animate-[float-space_6s_ease-in-out_infinite]">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-600 via-yellow-500 to-transparent opacity-60 blur-xl animate-[accretion-spin_2s_linear_infinite]"></div>
        <div className="absolute inset-4 rounded-full border-[20px] border-orange-400/40 blur-md animate-[accretion-spin_4s_linear_infinite_reverse]"></div>
        <div className="relative w-32 h-32 md:w-48 md:h-48 bg-black rounded-full shadow-[0_0_50px_rgba(255,255,255,0.5)] z-10 border border-white/20">
            <div className="absolute -inset-1 bg-white/50 rounded-full blur-sm"></div>
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-white/10 scale-150 animate-pulse"></div>
      </div>
    );
  }

  // Extract styles to variables to avoid JSX parsing ambiguity with commas
  const planetContainerStyle = {
    boxShadow: `inset -40px -40px 100px rgba(0,0,0,0.9), 0 0 30px ${glowColor}40`
  };

  const planetTextureStyle = {
    backgroundImage: `url(${destination.imagePlaceholder})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat-x',
    backgroundPosition: 'center',
    animation: 'planet-rotate 120s linear infinite'
  };

  const planetAtmosphereStyle = {
    background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0) 60%)'
  };

  return (
    <div className="relative w-64 h-64 md:w-[500px] md:h-[500px] flex items-center justify-center perspective-1000 animate-[float-space_8s_ease-in-out_infinite]">
      <div className="absolute w-[120%] h-[120%] border border-dashed border-white/10 rounded-full animate-[orbit-spin_20s_linear_infinite]"></div>
      <div className="absolute w-[140%] h-[140%] border-[0.5px] border-white/5 rounded-full animate-[orbit-spin_30s_linear_infinite_reverse]"></div>

      <div 
        className="relative w-full h-full rounded-full planet-shadow overflow-hidden transition-all duration-1000"
        style={planetContainerStyle}
      >
        <div 
          className="absolute inset-0 w-[200%] h-full opacity-90"
          style={planetTextureStyle}
        />
        <div 
            className="absolute inset-0 rounded-full mix-blend-overlay opacity-50"
            style={planetAtmosphereStyle}
        />
      </div>
      
      <div className="absolute -right-12 top-1/2 w-24 h-px bg-gradient-to-r from-transparent via-cyan-500 to-cyan-500"></div>
      <div className="absolute -right-12 top-1/2 translate-x-full -translate-y-1/2 pl-2 text-xs font-mono text-cyan-400">
         DIA: {Math.floor(Math.random() * 10000 + 5000)} KM
      </div>
    </div>
  );
};

export default Planet3D;
