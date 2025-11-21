import React, { useEffect, useRef } from 'react';

interface StarBackgroundProps {
  isWarping: boolean;
}

const StarBackground: React.FC<StarBackgroundProps> = ({ isWarping }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { x: number; y: number; z: number }[] = [];
    const numStars = 800;
    const focalLength = canvas.width;
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;

    // Initialize stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width - centerX,
        y: Math.random() * canvas.height - centerY,
        z: Math.random() * canvas.width
      });
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      centerX = canvas.width / 2;
      centerY = canvas.height / 2;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const render = () => {
      // Trail effect depends on warping state
      ctx.fillStyle = isWarping ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const speed = isWarping ? 200 : 2;

      stars.forEach((star) => {
        star.z -= speed;

        if (star.z <= 0) {
          star.z = canvas.width;
          star.x = Math.random() * canvas.width - centerX;
          star.y = Math.random() * canvas.height - centerY;
        }

        const x = (star.x / star.z) * focalLength + centerX;
        const y = (star.y / star.z) * focalLength + centerY;
        
        // Calculate radius based on depth
        const radius = Math.max(0.1, (1 - star.z / canvas.width) * (isWarping ? 3 : 1.5));

        ctx.beginPath();
        ctx.fillStyle = isWarping ? '#06b6d4' : 'white';
        
        if (isWarping) {
           // Draw streaks
           const prevZ = star.z + speed * 2; // Look back in time
           const prevX = (star.x / prevZ) * focalLength + centerX;
           const prevY = (star.y / prevZ) * focalLength + centerY;
           
           ctx.moveTo(prevX, prevY);
           ctx.lineTo(x, y);
           ctx.strokeStyle = `rgba(100, 200, 255, ${1 - star.z / canvas.width})`;
           ctx.lineWidth = radius;
           ctx.stroke();
        } else {
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isWarping]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
};

export default StarBackground;