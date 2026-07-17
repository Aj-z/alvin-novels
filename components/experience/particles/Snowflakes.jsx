'use client';
import { useEffect, useRef } from 'react';

export default function Snowflakes({ color = '#ffffff' }) {
  const c = useRef(null);
  useEffect(() => {
    const canvas = c.current; if(!canvas)return;
    const ctx = canvas.getContext('2d'); let id;
    const R = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
    R(); addEventListener('resize', R);
    const sf = Array.from({length:40}, () => ({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, r: Math.random()*2+.5, s: Math.random()*.8+.3, w: Math.random()*.3-.15, o: Math.random()*.4+.2 }));
    (function A() {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      sf.forEach(f => {
        f.y+=f.s; f.x+=f.w;
        if(f.y>canvas.height){f.y=-10;f.x=Math.random()*canvas.width;}
        if(f.x>canvas.width)f.x=0; if(f.x<0)f.x=canvas.width;
        ctx.beginPath(); ctx.fillStyle=color; ctx.globalAlpha=f.o; ctx.arc(f.x,f.y,f.r,0,Math.PI*2); ctx.fill();
      });
      id=requestAnimationFrame(A);
    })();
    return () => { cancelAnimationFrame(id); removeEventListener('resize',R); };
  }, [color]);
  return <canvas ref={c} className="fixed inset-0 pointer-events-none z-0" />;
}
