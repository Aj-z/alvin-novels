'use client';
import { useEffect, useRef } from 'react';

export default function NeonLines({ color = '#00ffff' }) {
  const c = useRef(null);
  useEffect(() => {
    const canvas = c.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); let id;
    const R = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
    R(); addEventListener('resize', R);

    const streams = Array.from({ length: 8 }, () => ({
      x: Math.random() * canvas.width,
      y: 0,
      len: Math.random() * 150 + 50,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.25 + 0.05
    }));

    (function A() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      streams.forEach(s => {
        s.y += s.speed;
        if (s.y > canvas.height) {
          s.y = -s.len;
          s.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        const grad = ctx.createLinearGradient(s.x, s.y, s.x, s.y + s.len);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(1, color);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = s.opacity;
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x, s.y + s.len);
        ctx.stroke();
      });
      id = requestAnimationFrame(A);
    })();
    return () => { cancelAnimationFrame(id); removeEventListener('resize', R); };
  }, [color]);

  return <canvas ref={c} className="fixed inset-0 pointer-events-none z-0" />;
}
