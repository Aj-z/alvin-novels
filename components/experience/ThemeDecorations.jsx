'use client';

export default function ThemeDecorations({ themeId }) {
  // Return different SVG or styled corner markers based on themeId
  switch (themeId) {
    case 'forest':
    case 'nature':
      return (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {/* Top-Left Ivy Branch */}
          <div className="absolute top-4 left-4 w-16 h-16 opacity-30 select-none text-[var(--theme-primary)]">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M10,10 C40,20 60,10 90,40 C60,40 50,70 10,90 C20,60 10,40 10,10 Z" />
              <path d="M30,30 Q45,20 50,10 Q55,20 70,30 Q55,40 50,50 Q45,40 30,30 Z" />
              <path d="M15,45 Q25,35 30,25 Q35,35 45,45 Q35,55 30,60 Q25,55 15,45 Z" />
            </svg>
          </div>
          {/* Top-Right Ivy Branch */}
          <div className="absolute top-4 right-4 w-16 h-16 opacity-30 select-none scale-x-[-1] text-[var(--theme-primary)]">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M10,10 C40,20 60,10 90,40 C60,40 50,70 10,90 C20,60 10,40 10,10 Z" />
              <path d="M30,30 Q45,20 50,10 Q55,20 70,30 Q55,40 50,50 Q45,40 30,30 Z" />
              <path d="M15,45 Q25,35 30,25 Q35,35 45,45 Q35,55 30,60 Q25,55 15,45 Z" />
            </svg>
          </div>
        </div>
      );
    case 'gothic':
      return (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {/* Gothic Spire Corner Left */}
          <div className="absolute top-4 left-4 w-12 h-16 opacity-25 select-none text-[var(--theme-primary)]">
            <svg viewBox="0 0 100 150" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10,140 L10,60 C10,30 50,10 50,10 C50,10 90,30 90,60 L90,140" />
              <path d="M30,140 L30,80 C30,65 50,55 50,55 C50,55 70,65 70,80 L70,140" />
              <path d="M50,10 L50,140" />
            </svg>
          </div>
          {/* Gothic Spire Corner Right */}
          <div className="absolute top-4 right-4 w-12 h-16 opacity-25 select-none scale-x-[-1] text-[var(--theme-primary)]">
            <svg viewBox="0 0 100 150" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10,140 L10,60 C10,30 50,10 50,10 C50,10 90,30 90,60 L90,140" />
              <path d="M30,140 L30,80 C30,65 50,55 50,55 C50,55 70,65 70,80 L70,140" />
              <path d="M50,10 L50,140" />
            </svg>
          </div>
        </div>
      );
    case 'cyberpunk':
      return (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {/* Futuristic HUD brackets */}
          <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 opacity-40 select-none text-[var(--theme-primary)]" style={{ borderColor: 'var(--theme-primary)' }} />
          <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 opacity-40 select-none text-[var(--theme-primary)]" style={{ borderColor: 'var(--theme-primary)' }} />
          <div className="absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 opacity-40 select-none text-[var(--theme-primary)]" style={{ borderColor: 'var(--theme-primary)' }} />
          <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 opacity-40 select-none text-[var(--theme-primary)]" style={{ borderColor: 'var(--theme-primary)' }} />
          {/* Subtle neon horizontal bars */}
          <div className="absolute top-0 left-12 right-12 h-[1px] opacity-20" style={{ background: 'linear-gradient(90deg, transparent, var(--theme-primary), transparent)' }} />
        </div>
      );
    case 'ocean':
      return (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {/* Sea waves SVG accents */}
          <div className="absolute top-4 left-4 w-16 h-12 opacity-30 select-none text-[var(--theme-primary)]">
            <svg viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10,30 C30,10 40,40 60,20 C80,0 90,30 110,10" strokeDasharray="4,2" />
              <path d="M5,40 C25,20 35,50 55,30 C75,10 85,40 105,20" />
            </svg>
          </div>
          <div className="absolute top-4 right-4 w-16 h-12 opacity-30 select-none scale-x-[-1] text-[var(--theme-primary)]">
            <svg viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10,30 C30,10 40,40 60,20 C80,0 90,30 110,10" strokeDasharray="4,2" />
              <path d="M5,40 C25,20 35,50 55,30 C75,10 85,40 105,20" />
            </svg>
          </div>
        </div>
      );
    case 'winter':
      return (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {/* Icy Snowflake Corner Left */}
          <div className="absolute top-4 left-4 w-12 h-12 opacity-30 select-none text-[var(--theme-primary)]">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="50" y1="10" x2="50" y2="90" />
              <line x1="10" y1="50" x2="90" y2="50" />
              <line x1="22" y1="22" x2="78" y2="78" />
              <line x1="22" y1="78" x2="78" y2="22" />
              <circle cx="50" cy="50" r="10" />
            </svg>
          </div>
          {/* Icy Snowflake Corner Right */}
          <div className="absolute top-4 right-4 w-12 h-12 opacity-30 select-none text-[var(--theme-primary)]">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="50" y1="10" x2="50" y2="90" />
              <line x1="10" y1="50" x2="90" y2="50" />
              <line x1="22" y1="22" x2="78" y2="78" />
              <line x1="22" y1="78" x2="78" y2="22" />
              <circle cx="50" cy="50" r="10" />
            </svg>
          </div>
        </div>
      );
    case 'academy':
    case 'library':
    case 'ancient':
      return (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {/* Elegant Victorian / scroll borders */}
          <div className="absolute top-5 left-5 w-12 h-12 opacity-30 select-none text-[var(--theme-primary)]">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10,90 L10,10 L90,10" />
              <path d="M20,80 C20,50 50,20 80,20" />
              <circle cx="20" cy="20" r="4" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute top-5 right-5 w-12 h-12 opacity-30 select-none scale-x-[-1] text-[var(--theme-primary)]">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10,90 L10,10 L90,10" />
              <path d="M20,80 C20,50 50,20 80,20" />
              <circle cx="20" cy="20" r="4" fill="currentColor" />
            </svg>
          </div>
        </div>
      );
    case 'celestial':
    case 'space':
      return (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {/* Crescent Moon & Star corner decorations */}
          <div className="absolute top-4 left-4 w-12 h-12 opacity-35 select-none text-[var(--theme-accent)]">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M50,10 C27.9,10 10,27.9 10,50 C10,68.6 22.7,84.3 40,88.5 C33.8,81.4 30,72.1 30,62 C30,37.1 50.1,17 75,17 C78.4,17 81.7,17.4 84.9,18.1 C77.5,13.1 68.6,10 50,10 Z" />
            </svg>
          </div>
          <div className="absolute top-4 right-4 w-10 h-10 opacity-35 select-none text-[var(--theme-accent)]">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <polygon points="50,5 64,36 98,36 70,57 81,91 50,70 19,91 30,57 2,36 36,36" />
            </svg>
          </div>
        </div>
      );
    default:
      return null;
  }
}
