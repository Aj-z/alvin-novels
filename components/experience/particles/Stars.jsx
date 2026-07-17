'use client';
import { useEffect, useRef } from 'react';

export default function Stars({ color = '#ffffff' }) {
  const c = useRef(null);
  useEffect(() => {
    const canvas = c.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); let id;
    const R = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
    R(); addEventListener('resize', R);
    
    const stars = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.3,
      o: Math.random(),
      os: (Math.random() - 0.5) * 0.01
    }));

    (function A() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.o += s.os;
        if (s.o <= 0.1 || s.o >= 0.9) s.os *= -1;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.globalAlpha = Math.max(0.1, Math.min(s.o, 0.9));
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      id = requestAnimationFrame(A);
    })();
    return () => { cancelAnimationFrame(id); removeEventListener('resize', R); };
  }, [color]);

  return <canvas ref={c} className="fixed inset-0 pointer-events-none z-0" />;
}
