'use client';
import { useEffect, useRef } from 'react';

export default function Fireflies({ color = '#a8e6a1' }) {
  const c = useRef(null);
  useEffect(() => {
    const canvas = c.current; if(!canvas)return;
    const ctx = canvas.getContext('2d'); let id;
    const R = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
    R(); addEventListener('resize', R);
    const ff = Array.from({length:15}, () => ({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, r: Math.random()*2+1, sx: (Math.random()-.5)*.3, sy: (Math.random()-.5)*.3, o: Math.random(), os: (Math.random()-.5)*.015 }));
    (function A() {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ff.forEach(f => {
        f.x+=f.sx; f.y+=f.sy; f.o+=f.os;
        if(f.x<0||f.x>canvas.width)f.sx*=-1;
        if(f.y<0||f.y>canvas.height)f.sy*=-1;
        if(f.o<=.2||f.o>=.7)f.os*=-1;
        const g = ctx.createRadialGradient(f.x,f.y,0,f.x,f.y,f.r*3);
        g.addColorStop(0,color); g.addColorStop(1,'transparent');
        ctx.beginPath(); ctx.fillStyle=g; ctx.globalAlpha=f.o; ctx.arc(f.x,f.y,f.r*3,0,Math.PI*2); ctx.fill();
      });
      id=requestAnimationFrame(A);
    })();
    return () => { cancelAnimationFrame(id); removeEventListener('resize',R); };
  }, [color]);
  return <canvas ref={c} className="fixed inset-0 pointer-events-none z-0" />;
}
