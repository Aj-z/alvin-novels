'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { getTheme } from '@/themes';
import ReaderControls from '@/components/experience/ReaderControls';
import ThemeDecorations from '@/components/experience/ThemeDecorations';
import AmbientAudio from '@/components/experience/AmbientAudio';
import AdSense from '@/components/ads/AdSense';

// Import particle components
import Fireflies from '@/components/experience/particles/Fireflies';
import Snowflakes from '@/components/experience/particles/Snowflakes';
import Stars from '@/components/experience/particles/Stars';
import NeonLines from '@/components/experience/particles/NeonLines';

export default function ChapterPageClient({ novel, chapter }) {
  const [currentTheme, setCurrentTheme] = useState('story');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [soundVolume, setSoundVolume] = useState(0.5);
  const [decorationsVisible, setDecorationsVisible] = useState(true);
  const [showBottomAd, setShowBottomAd] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Determine active theme colors based on mode selection
  const storyThemeName = chapter.theme || novel.theme || 'forest';
  const storyTheme = getTheme(storyThemeName);

  const activeTheme = useMemo(() => {
    if (currentTheme === 'story') {
      return {
        id: storyThemeName,
        colors: {
          bg: storyTheme.colors.bg,
          text: storyTheme.colors.text,
          textSecondary: storyTheme.colors.textLight || '#5a4a3a',
          primary: storyTheme.colors.primary,
          surface: storyTheme.colors.surface,
          border: storyTheme.colors.border,
          link: storyTheme.colors.primary,
          linkHover: storyTheme.colors.secondary,
        },
        typography: storyTheme.typography,
        decor: storyTheme.decor,
      };
    } else if (currentTheme === 'light') {
      return {
        id: 'light',
        colors: {
          bg: '#ffffff',
          text: '#1a1a1a',
          textSecondary: '#666666',
          primary: '#2563eb',
          surface: '#f8fafc',
          border: '#e2e8f0',
          link: '#2563eb',
          linkHover: '#1d4ed8',
        },
        typography: { heading: 'serif', body: 'serif', dropCap: true },
        decor: { divider: '✦', particles: 'none' },
      };
    } else if (currentTheme === 'dark') {
      return {
        id: 'dark',
        colors: {
          bg: '#121212',
          text: '#e2e8f0',
          textSecondary: '#94a3b8',
          primary: '#3b82f6',
          surface: '#1e293b',
          border: '#334155',
          link: '#3b82f6',
          linkHover: '#60a5fa',
        },
        typography: { heading: 'serif', body: 'serif', dropCap: true },
        decor: { divider: '✦', particles: 'none' },
      };
    } else if (currentTheme === 'paper') {
      return {
        id: 'paper',
        colors: {
          bg: '#fbf0d9',
          text: '#2d1e10',
          textSecondary: '#7c5e43',
          primary: '#b45309',
          surface: '#f3e5c8',
          border: '#e4d3b2',
          link: '#b45309',
          linkHover: '#92400e',
        },
        typography: { heading: 'serif', body: 'serif', dropCap: true },
        decor: { divider: '📜', particles: 'none' },
      };
    } else {
      // high-contrast
      return {
        id: 'contrast',
        colors: {
          bg: '#ffffff',
          text: '#000000',
          textSecondary: '#000000',
          primary: '#000000',
          surface: '#ffffff',
          border: '#000000',
          link: '#000000',
          linkHover: '#000000',
        },
        typography: { heading: 'sans', body: 'sans', dropCap: false },
        decor: { divider: '✦', particles: 'none' },
      };
    }
  }, [currentTheme, storyTheme, storyThemeName]);

  const paragraphs = useMemo(() => {
    if (!chapter.content) return [];
    return chapter.content.split('\n\n').filter(p => p.trim().length > 0);
  }, [chapter.content]);

  // Separate paragraphs for inserting mid-chapter AdSense placement
  const midIndex = Math.floor(paragraphs.length / 2);

  const renderPara = (para, i) => {
    if (para.trim() === '---') {
      return (
        <div
          key={`divider-${i}`}
          className="text-center my-12 text-2xl font-serif opacity-60"
          style={{ color: 'var(--theme-primary)' }}
        >
          {activeTheme.decor?.divider || '✦'}
        </div>
      );
    }

    const html = para
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br/>');

    // Drop cap styling for the first paragraph if the theme supports it
    const isFirstPara = i === 0;
    const dropCapClass = isFirstPara && activeTheme.typography?.dropCap ? 'first-letter:text-5xl first-letter:float-left first-letter:font-bold first-letter:mr-2 first-letter:mt-1' : '';

    return (
      <p
        key={i}
        className={`${dropCapClass} mb-6 text-lg md:text-xl leading-relaxed text-justify`}
        style={{
          color: 'var(--theme-text)',
          fontFamily: activeTheme.typography?.body === 'mono' 
            ? 'var(--font-mono)' 
            : activeTheme.typography?.body === 'sans' 
              ? 'var(--font-sans)' 
              : 'var(--font-serif)',
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div
      className="min-h-screen transition-colors duration-500 relative flex flex-col justify-between"
      style={{
        backgroundColor: activeTheme.colors.bg,
        color: activeTheme.colors.text,
        '--theme-bg': activeTheme.colors.bg,
        '--theme-text': activeTheme.colors.text,
        '--theme-text-secondary': activeTheme.colors.textSecondary,
        '--theme-primary': activeTheme.colors.primary,
        '--theme-surface': activeTheme.colors.surface,
        '--theme-border': activeTheme.colors.border,
        '--theme-link': activeTheme.colors.link,
        '--theme-link-hover': activeTheme.colors.linkHover,
      }}
    >
      {/* Background Particles System (Only if Story Theme is active and decorations are visible) */}
      {decorationsVisible && currentTheme === 'story' && activeTheme.decor?.particles === 'fireflies' && (
        <Fireflies color={activeTheme.decor.particleColor} />
      )}
      {decorationsVisible && currentTheme === 'story' && activeTheme.decor?.particles === 'snow' && (
        <Snowflakes color={activeTheme.decor.particleColor} />
      )}
      {decorationsVisible && currentTheme === 'story' && activeTheme.decor?.particles === 'stars' && (
        <Stars color={activeTheme.decor.particleColor} />
      )}
      {decorationsVisible && currentTheme === 'story' && activeTheme.decor?.particles === 'neon' && (
        <NeonLines color={activeTheme.decor.particleColor} />
      )}

      {/* Edge & Corner Theme Decorations */}
      {decorationsVisible && currentTheme === 'story' && (
        <ThemeDecorations themeId={storyThemeName} />
      )}

      {/* Ambient Audio Player */}
      {chapter.sound && (
        <AmbientAudio
          soundFile={chapter.sound}
          isPlaying={soundEnabled}
          volume={soundVolume}
        />
      )}

      {/* Floating Reader Experience Controls */}
      <ReaderControls
        currentTheme={currentTheme}
        onThemeChange={(newTheme) => {
          setCurrentTheme(newTheme);
          triggerToast(`Switched theme to ${newTheme.toUpperCase()}`);
        }}
        soundEnabled={soundEnabled}
        onSoundToggle={() => {
          setSoundEnabled(!soundEnabled);
          triggerToast(soundEnabled ? 'Ambient audio paused' : 'Ambient audio started playing');
        }}
        soundVolume={soundVolume}
        onVolumeChange={(v) => setSoundVolume(v)}
        decorationsVisible={decorationsVisible}
        onDecorationsToggle={() => {
          setDecorationsVisible(!decorationsVisible);
          triggerToast(decorationsVisible ? 'Theme decorations hidden' : 'Theme decorations displayed');
        }}
        hasAudio={!!chapter.sound}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-20 flex-grow py-16">
        <article className="max-w-2xl md:max-w-3xl mx-auto pt-10">
          <header className="text-center mb-10 border-b pb-8" style={{ borderColor: 'var(--theme-border)' }}>
            <p className="text-sm font-semibold tracking-wide uppercase mb-2">
              <Link
                href={`/novels/${novel.slug}`}
                className="hover:underline transition-all"
                style={{ color: 'var(--theme-primary)' }}
              >
                {novel.title}
              </Link>
            </p>
            <h1
              className="text-3xl md:text-5xl font-bold mb-4"
              style={{
                color: 'var(--theme-primary)',
                fontFamily: activeTheme.typography?.heading === 'sans' 
                  ? 'var(--font-sans)' 
                  : 'var(--font-display)',
              }}
            >
              Chapter {chapter.chapterNumber}
            </h1>
            {chapter.title && (
              <p className="text-xl md:text-2xl italic opacity-85 mb-4" style={{ color: 'var(--theme-text-secondary)', fontFamily: 'var(--font-serif)' }}>
                {chapter.title}
              </p>
            )}
            <div className="flex justify-center items-center gap-6 text-sm opacity-70" style={{ color: 'var(--theme-text-secondary)' }}>
              <span className="flex items-center gap-1">📖 {chapter.readingTime?.text || '3 min read'}</span>
              <span>•</span>
              <span className="flex items-center gap-1">📝 {chapter.wordCount?.toLocaleString() || '1,200'} words</span>
            </div>
          </header>

          {/* Top AdSense Slot (Below Chapter Header) */}
          <div className="my-8 py-4 border-y flex flex-col items-center justify-center opacity-75" style={{ borderColor: 'var(--theme-border)', backgroundColor: 'rgba(var(--theme-surface), 0.1)' }}>
            <span className="text-[10px] font-mono tracking-widest uppercase mb-1 opacity-55">ADVERTISEMENT</span>
            <AdSense
                adSlot="234228901"
                style={{
                    display: "block",
                    minHeight: "90px",
                }}
            />
          </div>

          {/* Chapter Content Paragraphs with optional Mid-chapter Ad */}
          <div className="space-y-6">
            {paragraphs.map((p, idx) => {
              const element = renderPara(p, idx);
              if (idx === midIndex && paragraphs.length > 6) {
                return (
                  <div key={`section-mid-${idx}`}>
                    {/* Mid-chapter Ad (Only for longer chapters) */}
                    <div className="my-10 py-4 border-y flex flex-col items-center justify-center opacity-75" style={{ borderColor: 'var(--theme-border)' }}>
                      <span className="text-[10px] font-mono tracking-widest uppercase mb-1 opacity-55">ADVERTISEMENT</span>
                      <AdSense
                          adSlot="3236789012"
                          style={{
                              display: "block",
                              minHeight: "90px",
                          }}
                      />
                    </div>
                    {element}
                  </div>
                );
              }
              return element;
            })}
          </div>

          {/* Bottom AdSense Slot (End of Chapter) */}
          <div className="my-12 py-4 border-y flex flex-col items-center justify-center opacity-75" style={{ borderColor: 'var(--theme-border)' }}>
            <span className="text-[10px] font-mono tracking-widest uppercase mb-1 opacity-55">ADVERTISEMENT</span>
            <AdSense
                adSlot="3456781212"
                style={{
                    display: "block",
                    minHeight: "100px",
                }}
            />
          </div>

          {/* Chapter Navigation (Next/Prev buttons) */}
          <nav className="flex items-center justify-between py-8 border-t border-b mt-12" style={{ borderColor: 'var(--theme-border)' }}>
            {chapter.prevChapter ? (
              <Link
                href={`/novels/${novel.slug}/${chapter.prevChapter.slug}`}
                className="flex items-center gap-2 hover:opacity-80 transition-all text-left group"
                style={{ color: 'var(--theme-link)' }}
              >
                <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
                <div>
                  <div className="text-xs opacity-65">Previous Chapter</div>
                  <div className="font-semibold text-sm">Ch. {chapter.chapterNumber - 1}</div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            <Link
              href={`/novels/${novel.slug}`}
              className="font-bold hover:underline py-2 px-4 rounded-full border transition-all text-sm"
              style={{ borderColor: 'var(--theme-border)', backgroundColor: 'var(--theme-surface)' }}
            >
              📑 Index
            </Link>

            {chapter.nextChapter ? (
              <Link
                href={`/novels/${novel.slug}/${chapter.nextChapter.slug}`}
                className="flex items-center gap-2 hover:opacity-80 transition-all text-right group"
                style={{ color: 'var(--theme-link)' }}
              >
                <div>
                  <div className="text-xs opacity-65">Next Chapter</div>
                  <div className="font-semibold text-sm">Ch. {chapter.chapterNumber + 1}</div>
                </div>
                <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            ) : (
              <div />
            )}
          </nav>

          {/* Support Author Panel */}
          <div className="text-center mt-12 p-8 rounded-2xl border transition-all" style={{ backgroundColor: 'var(--theme-surface)', borderColor: 'var(--theme-border)' }}>
            <h4 className="text-lg font-serif font-bold mb-2">✨ Enjoying Elara&apos;s journey?</h4>
            <p className="text-sm opacity-80 mb-6 max-w-md mx-auto">
              This novel platform runs entirely on free tier services to scale sustainably. Consider supporting Alvin Loria to keep the chapters coming!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => triggerToast('Redirecting to Buy Me a Coffee... (mock integration)')}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                ☕ Buy Me a Coffee
              </button>
              <button
                onClick={() => triggerToast('Redirecting to Patreon... (mock integration)')}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                ❤️ Support on Patreon
              </button>
            </div>
          </div>
        </article>
      </div>

      {/* Floating Bottom Sticky Bar */}
      {showBottomAd && (
        <div
          className="fixed bottom-0 left-0 right-0 h-14 border-t flex items-center justify-between px-6 z-40 transition-all shadow-2xl backdrop-blur-md"
          style={{
            backgroundColor: 'var(--theme-surface)',
            borderColor: 'var(--theme-border)',
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-mono tracking-widest text-white px-1.5 py-0.5 rounded bg-amber-600 font-bold">SPONSOR</span>
            <p className="text-xs truncate max-w-[200px] sm:max-w-md font-serif italic" style={{ color: 'var(--theme-text-secondary)' }}>
              Looking for your next read? Browse other titles in Alvin Loria&apos;s premium catalog!
            </p>
          </div>
          <div className="flex items-center gap-4">
            <AdSense
                adSlot="4567891123"
                style={{
                    display: "block",
                    minHeight: "50px",
                }}
            />
            <button
              onClick={() => {
                setShowBottomAd(false);
                triggerToast('Sticky sponsor space hidden for this session.');
              }}
              className="text-[10px] font-mono tracking-wider opacity-60 hover:opacity-100 hover:underline cursor-pointer"
              style={{ color: 'var(--theme-text)' }}
            >
              [ HIDE ]
            </button>
          </div>
        </div>
      )}

      {/* Elegant Toast Feedback */}
      {showToast && (
        <div
          className="fixed bottom-20 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full shadow-lg text-xs font-mono tracking-wide z-50 animate-bounce duration-500"
          style={{
            backgroundColor: 'var(--theme-primary)',
            color: '#ffffff',
          }}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
