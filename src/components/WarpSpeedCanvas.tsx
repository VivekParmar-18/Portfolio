import React, { useEffect, useRef } from 'react';

interface WarpSpeedCanvasProps {
  className?: string;
  speed?: number;
  starCount?: number;
}

export const WarpSpeedCanvas: React.FC<WarpSpeedCanvasProps> = ({
  className = '',
  speed = 2.4,
  starCount = 420
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Star data representation
    interface Star {
      x: number;
      y: number;
      z: number;
      pz: number;
      color: string;
      size: number;
    }

    const palette = ['#ffffff', '#f4f1ee', '#ff4c24', '#ff7854', '#38bdf8'];
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,
        pz: Math.random() * width,
        color: palette[Math.floor(Math.random() * palette.length)],
        size: Math.random() * 1.5 + 0.5
      });
    }

    let cx = width / 2;
    let cy = height / 2;

    const render = () => {
      cx = width / 2;
      cy = height / 2;

      // Subtle background trail
      ctx.fillStyle = 'rgba(5, 5, 5, 0.32)';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Move star closer in Z space
        star.pz = star.z;
        star.z -= speed * 4.5;

        // Reset if star passes camera
        if (star.z <= 0) {
          star.z = width;
          star.pz = width;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        // Project 3D coordinate to 2D screen
        const k = 250 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        const pk = 250 / star.pz;
        const prevPx = star.x * pk + cx;
        const prevPy = star.y * pk + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const alpha = Math.min(1, (1 - star.z / width) * 1.2);
          const weight = Math.max(0.6, (1 - star.z / width) * star.size * 2.2);

          ctx.beginPath();
          ctx.strokeStyle = star.color;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = weight;
          ctx.lineCap = 'round';
          ctx.moveTo(prevPx, prevPy);
          ctx.lineTo(px, py);
          ctx.stroke();

          // Tiny glowing head
          if (weight > 1.2) {
            ctx.beginPath();
            ctx.fillStyle = star.color;
            ctx.arc(px, py, weight * 0.7, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, starCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
};

export default WarpSpeedCanvas;
