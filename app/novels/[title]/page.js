import { getAllNovels, getNovelBySlug } from '@/lib/novels';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, BookOpen, Clock, Tag, Sparkles, Coffee, Heart, Calendar } from 'lucide-react';

export async function generateStaticParams() {
  return getAllNovels().map(n => ({ title: n.slug }));
}

export async function generateMetadata(props) {
  const params = await props.params;
  const novel = getNovelBySlug(params.title);
  if (!novel) return { title: 'Not Found' };
  return { title: `${novel.title} | Alvin Loria Novels`, description: novel.synopsis };
}

export default async function NovelPage(props) {
  const params = await props.params;
  const novel = getNovelBySlug(params.title);
  if (!novel) notFound();

  return (
    <div className="min-h-screen bg-brand-beige-50 text-brand-brown-900 pb-24 selection:bg-brand-green-500/10">
      {/* Novel Header / Hero Section */}
      <section className="relative py-24 px-6 border-b border-brand-beige-300 overflow-hidden bg-linear-to-b from-brand-beige-200/60 to-brand-beige-50">
        <div className="max-w-5xl mx-auto">
          {/* Back Navigation */}
          <p className="text-sm font-mono tracking-wider mb-10">
            <Link href="/" className="inline-flex items-center gap-1 hover:underline text-brand-green-500 font-bold transition-all group">
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Library</span>
            </Link>
          </p>

          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Novel Info Block */}
            <div className="flex-grow space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="text-[10px] font-mono font-bold px-3 py-1 rounded-md uppercase tracking-wider"
                  style={{
                    backgroundColor: novel.status === 'ongoing' ? 'rgba(45, 90, 39, 0.08)' : 'rgba(16, 185, 129, 0.08)',
                    color: novel.status === 'ongoing' ? 'var(--primary)' : '#10b981',
                  }}
                >
                  {novel.status === 'ongoing' ? 'Ongoing Story' : 'Completed'}
                </span>
                <span className="text-xs text-brand-brown-900/50 font-mono flex items-center gap-1">
                  <BookOpen size={12} /> {novel.chapterCount} Chapters
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-display font-extrabold mb-2 leading-tight tracking-tight text-brand-brown-900">
                {novel.title}
              </h1>
              
              <p className="text-lg md:text-xl font-serif italic text-brand-brown-900/60 font-light">
                A literary masterwork by Alvin Loria
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {novel.genres?.map(g => (
                  <span
                    key={g}
                    className="text-[10px] uppercase font-mono font-semibold tracking-wider px-3 py-1 rounded-md border border-brand-beige-300 bg-white text-brand-brown-900/80 shadow-xs"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Novel Details Section */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left Column: Synopsis */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-display font-bold tracking-tight text-brand-brown-900 flex items-center gap-2 border-b border-brand-beige-300 pb-3">
                <Sparkles size={18} className="text-brand-green-500" />
                <span>Synopsis</span>
              </h2>
              <p className="text-base md:text-lg leading-relaxed font-serif text-brand-brown-900/90 text-justify whitespace-pre-wrap font-light">
                {novel.synopsis}
              </p>
            </div>
            
            {novel.tags && novel.tags.length > 0 && (
              <div className="pt-6">
                <h4 className="text-[10px] font-mono tracking-widest text-brand-brown-900/50 uppercase mb-3 flex items-center gap-1.5">
                  <Tag size={12} /> ASSOCIATED TAGS
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {novel.tags.map(t => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full font-serif bg-white border border-brand-beige-300 text-brand-brown-900/70 hover:border-brand-green-500/30 transition-colors"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Meta Info / Quick Start */}
          <div className="space-y-6">
            <div className="p-8 rounded-3xl border border-brand-beige-300 bg-white shadow-xs space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 rounded-full bg-brand-green-500/5 blur-xl" />
              <h3 className="text-xl font-display font-bold text-brand-brown-900">Start Your Journey</h3>
              {novel.chapters && novel.chapters.length > 0 ? (
                <div className="space-y-3 relative z-10">
                  <Link
                    href={`/novels/${novel.slug}/${novel.chapters[0].slug}`}
                    className="flex items-center justify-center gap-2 w-full text-center py-3.5 bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold rounded-xl text-sm shadow-md transition-all cursor-pointer"
                  >
                    <BookOpen size={16} />
                    <span>Read Chapter 1</span>
                  </Link>
                  {novel.chapters.length > 1 && (
                    <Link
                      href={`/novels/${novel.slug}/${novel.chapters[novel.chapters.length - 1].slug}`}
                      className="flex items-center justify-center gap-1 w-full text-center py-3 border border-brand-beige-300 text-brand-brown-900/80 font-bold rounded-xl text-sm hover:bg-brand-beige-100 transition-all cursor-pointer"
                    >
                      <span>Latest: Ch. {novel.chapters.length}</span>
                    </Link>
                  )}
                </div>
              ) : (
                <p className="text-sm text-brand-brown-900/60 font-serif italic">No chapters posted yet!</p>
              )}
            </div>
          </div>
        </div>

        {/* Chapters Table */}
        <section className="mt-20">
          <div className="flex items-center justify-between border-b border-brand-beige-300 pb-4 mb-8">
            <h2 className="text-3xl font-display font-bold text-brand-brown-900 flex items-center gap-2">
              <BookOpen size={22} className="text-brand-green-500" />
              <span>Chapter Index</span>
            </h2>
            <span className="text-[10px] font-mono tracking-wider text-brand-brown-900/50 uppercase">
              ORDERED BY CHRONOLOGY
            </span>
          </div>

          {novel.chapters && novel.chapters.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {novel.chapters.map((ch, i) => (
                <Link
                  key={ch.slug}
                  href={`/novels/${novel.slug}/${ch.slug}`}
                  className="group flex justify-between items-center p-5 rounded-2xl border border-brand-beige-300 bg-white hover:border-brand-green-500/40 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-mono font-bold text-brand-green-500 bg-brand-green-500/5 px-2.5 py-1 rounded-md">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-base font-serif font-bold text-brand-brown-900 group-hover:text-brand-green-500 transition-colors duration-200">
                      {ch.title || `Chapter ${i + 1}`}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono opacity-50 flex items-center gap-1 shrink-0">
                    <Clock size={10} /> {ch.readingTime?.text || '3 min'}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-dashed border-brand-beige-300 rounded-3xl bg-white/40">
              <p className="text-sm text-brand-brown-900/50 font-serif italic">No chapters published yet. Stay tuned!</p>
            </div>
          )}
        </section>
      </main>

      {/* Author Support Banner */}
      <section className="max-w-5xl mx-auto px-6 mt-8">
        <div className="relative overflow-hidden p-10 rounded-3xl text-center border border-brand-beige-300 bg-white/80 backdrop-blur-sm shadow-xs max-w-3xl mx-auto">
          <div className="absolute top-0 left-0 -ml-8 -mt-8 w-24 h-24 rounded-full bg-brand-green-500/5 blur-xl" />
          <h3 className="text-2xl font-display font-bold text-brand-brown-900 mb-3 flex items-center justify-center gap-2">
            <Coffee size={20} className="text-amber-500" />
            <span>Support Alvin Loria&apos;s Works</span>
          </h3>
          <p className="text-sm font-serif leading-relaxed text-brand-brown-900/70 mb-6 max-w-lg mx-auto font-light">
            If you enjoy the handcrafted scores, immersive themes, and high-fidelity text experiences, consider sharing your thoughts or subscribing for premium tier notifications!
          </p>
          <button className="px-6 py-2.5 border border-brand-beige-300 rounded-xl text-xs font-mono font-bold text-brand-green-500 hover:bg-brand-beige-100 transition-all cursor-pointer">
            JOIN MEMBERSHIP PLATFORM
          </button>
        </div>
      </section>
    </div>
  );
}

