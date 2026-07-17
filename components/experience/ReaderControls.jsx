'use client';

import { useState, useRef, useEffect } from 'react';
import { Sun, Moon, BookOpen, FileText, Eye, Sparkles, Paintbrush, Volume2, VolumeX, ChevronDown } from 'lucide-react';

const opts = [
  { id: 'story', label: 'Story' },
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'paper', label: 'Paper' },
  { id: 'high-contrast', label: 'Contrast' },
];

export default function ReaderControls({
  currentTheme,
  onThemeChange,
  soundEnabled,
  onSoundToggle,
  soundVolume,
  onVolumeChange,
  decorationsVisible,
  onDecorationsToggle,
  hasAudio,
}) {
  const [showTheme, setShowTheme] = useState(false);
  const [showVol, setShowVol] = useState(false);
  const ref = useRef(null);
  const curr = opts.find(o => o.id === currentTheme) || opts[0];

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowTheme(false);
        setShowVol(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const getThemeIcon = (id, size = 15) => {
    switch (id) {
      case 'story': return <BookOpen size={size} />;
      case 'light': return <Sun size={size} />;
      case 'dark': return <Moon size={size} />;
      case 'paper': return <FileText size={size} />;
      case 'high-contrast': return <Eye size={size} />;
      default: return <BookOpen size={size} />;
    }
  };

  return (
    <div
      ref={ref}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 rounded-full shadow-xl px-4 py-2 backdrop-blur-md text-xs font-mono tracking-wide transition-all duration-300 border hover:shadow-2xl"
      style={{
        backgroundColor: 'var(--theme-surface)',
        borderColor: 'var(--theme-border)',
        boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.15)',
      }}
    >
      {/* Theme selector */}
      <div className="relative">
        <button
          onClick={() => setShowTheme(!showTheme)}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-full hover:opacity-80 transition-all cursor-pointer"
          style={{ color: 'var(--theme-text)' }}
        >
          <span style={{ color: 'var(--theme-primary)' }}>{getThemeIcon(curr.id)}</span>
          <span className="hidden sm:inline font-bold text-[11px] uppercase tracking-wider">{curr.label}</span>
          <ChevronDown size={12} className="opacity-60" />
        </button>

        {showTheme && (
          <div
            className="absolute top-full left-0 mt-3 w-44 rounded-2xl shadow-2xl py-2 animate-fadeIn border"
            style={{
              backgroundColor: 'var(--theme-surface)',
              borderColor: 'var(--theme-border)',
            }}
          >
            <div className="px-3 py-1 text-[9px] font-bold text-stone-400 uppercase tracking-widest border-b mb-1" style={{ borderColor: 'var(--theme-border)' }}>
              Appearance
            </div>
            {opts.map((o) => (
              <button
                key={o.id}
                onClick={() => {
                  onThemeChange(o.id);
                  setShowTheme(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer text-left"
                style={{
                  color: currentTheme === o.id ? 'var(--theme-primary)' : 'var(--theme-text)',
                  fontWeight: currentTheme === o.id ? 'bold' : 'normal',
                }}
              >
                <span>{getThemeIcon(o.id, 14)}</span>
                <span className="uppercase tracking-wider text-[10px]">{o.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="w-px h-4" style={{ backgroundColor: 'var(--theme-border)' }} />

      {/* Decorations Toggle */}
      <button
        onClick={onDecorationsToggle}
        className="p-2 rounded-full hover:opacity-80 transition-all cursor-pointer flex items-center justify-center"
        style={{ color: decorationsVisible ? 'var(--theme-primary)' : 'var(--theme-text-secondary)' }}
        title="Toggle Artistic Effects"
      >
        <Paintbrush size={15} className={decorationsVisible ? 'animate-pulse' : ''} />
      </button>

      {hasAudio && (
        <>
          <div className="w-px h-4" style={{ backgroundColor: 'var(--theme-border)' }} />

          {/* Sound Toggle */}
          <div className="flex items-center gap-0.5">
            <button
              onClick={onSoundToggle}
              className="p-2 rounded-full hover:opacity-80 transition-all cursor-pointer flex items-center justify-center"
              style={{ color: soundEnabled ? 'var(--theme-primary)' : 'var(--theme-text-secondary)' }}
              title="Toggle Ambient Audio"
            >
              {soundEnabled ? <Volume2 size={15} className="animate-pulse" /> : <VolumeX size={15} />}
            </button>

            {soundEnabled && (
              <div className="relative flex items-center">
                <button
                  onClick={() => setShowVol(!showVol)}
                  className="p-1 rounded-full hover:opacity-80 transition-all cursor-pointer text-[10px]"
                  style={{ color: 'var(--theme-text-secondary)' }}
                >
                  <ChevronDown size={10} />
                </button>

                {showVol && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 p-3 rounded-2xl shadow-2xl animate-fadeIn border flex items-center justify-center"
                    style={{
                      backgroundColor: 'var(--theme-surface)',
                      borderColor: 'var(--theme-border)',
                    }}
                  >
                    <div className="flex flex-col gap-1 items-center">
                      <span className="text-[8px] uppercase tracking-widest text-stone-400 font-bold mb-1">Volume</span>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={soundVolume}
                        onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                        className="w-24 cursor-pointer accent-brand-green-500"
                        style={{ accentColor: 'var(--theme-primary)' }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

