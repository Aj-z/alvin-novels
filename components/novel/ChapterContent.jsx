'use client';
import { useEffect, useState } from 'react';
import { getTheme } from '@/themes';

export default function ChapterContent({ content, chapterTheme = 'forest' }) {
  const [html, setHtml] = useState('');
  const theme = getTheme(chapterTheme);
  
  useEffect(() => {
    let p = content
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-8 mb-4">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mt-12 mb-6">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold mt-16 mb-8 text-center">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^---$/gim, '<div class="text-center my-12 text-2xl">' + (theme.decor?.divider || '✦') + '</div>')
      .replace(/\n\n/g, '</p><p class="mb-6 leading-relaxed text-lg">')
      .replace(/\n/g, '<br/>');
    setHtml('<p class="mb-6 leading-relaxed text-lg first-letter-dropcap">' + p + '</p>');
  }, [content, theme]);
  
  if (!html) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
      </div>
    );
  }
  
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
