'use client';
import { useEffect, useRef } from 'react';

export default function AmbientAudio({ soundFile, isPlaying, volume }) {
  const audioRef = useRef(null);

  const fullSoundPath = soundFile
    ? (soundFile.startsWith('/') || soundFile.startsWith('http') ? soundFile : `/audio/${soundFile}`)
    : '';

  // Handle initialization and source change
  useEffect(() => {
    if (!fullSoundPath) return;

    // Pause and clean up any existing audio
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(fullSoundPath);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    if (isPlaying) {
      audio.play().catch((err) => {
        console.warn('Audio play failed (often due to browser autoplay policies):', err);
      });
    }

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [fullSoundPath]);

  // Handle play/pause state independently
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => {
        console.warn('Audio play failed:', err);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Handle volume state independently
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  return null;
}
