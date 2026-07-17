import { getAllNovels, getNovelBySlug } from '@/lib/novels';
import { notFound } from 'next/navigation';
import Link from 'next/link';

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
    <div className="min-h-screen pb-16" style={{ backgroundColor: '#fcfaf7', color: '#2c1810' }}>
      {/* Novel Header / Hero Section */}
      <section className="py-20 px-6 border-b relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f5efe6, #faf8f5)', borderColor: '#e4d3b2' }}>
        <div className="max-w-4xl mx-auto">
          {/* Back Navigation */}
          <p className="text-sm font-mono tracking-wider opacity-75 mb-6">
            <Link href="/novels" className="hover:underline text-[#4a7c3f] font-semibold">
              ← Back to Library
            </Link>
          </p>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Book Info Block */}
            <div className="flex-grow">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span
                  className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded uppercase tracking-wider"
                  style={{
                    backgroundColor: novel.status === 'ongoing' ? '#e3f2fd' : '#e8f5e9',
                    color: novel.status === 'ongoing' ? '#1976d2' : '#388e3c',
                  }}
                >
                  {novel.status === 'ongoing' ? '🖊️ Ongoing' : '✅ Completed'}
                </span>
                <span className="text-xs opacity-70 font-mono">Ch. {novel.chapterCount}</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-serif font-extrabold mb-2 leading-tight">
                {novel.title}
              </h1>
              <p className="text-lg italic opacity-80 mb-6">by {novel.author}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {novel.genres?.map(g => (
                  <span
                    key={g}
                    className="text-xs uppercase font-semibold tracking-wider px-3 py-1 rounded"
                    style={{ backgroundColor: '#f5efe6', color: '#5a4a3a' }}
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
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Synopsis */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-serif font-bold border-b pb-2" style={{ borderColor: '#e4d3b2' }}>
              Synopsis
            </h2>
            <p className="text-base md:text-lg leading-relaxed font-serif text-justify whitespace-pre-wrap opacity-90">
              {novel.synopsis}
            </p>
            
            {novel.tags && novel.tags.length > 0 && (
              <div className="pt-4">
                <h4 className="text-xs uppercase font-mono tracking-wider opacity-60 mb-2">TAGS</h4>
                <div className="flex flex-wrap gap-1.5">
                  {novel.tags.map(t => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded-full font-serif bg-white border"
                      style={{ borderColor: '#e4d3b2', color: '#5a4a3a' }}
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
            <div className="p-6 rounded-2xl border bg-white" style={{ borderColor: '#dfcca7' }}>
              <h3 className="text-lg font-serif font-bold mb-4">Start Reading</h3>
              {novel.chapters && novel.chapters.length > 0 ? (
                <div className="space-y-3">
                  <Link
                    href={`/novels/${novel.slug}/${novel.chapters[0].slug}`}
                    className="block w-full text-center py-3 bg-[#2d5a27] hover:bg-[#4a7c3f] text-white font-bold rounded-lg text-sm transition-all"
                  >
                    📖 Read Chapter 1
                  </Link>
                  {novel.chapters.length > 1 && (
                    <Link
                      href={`/novels/${novel.slug}/${novel.chapters[novel.chapters.length - 1].slug}`}
                      className="block w-full text-center py-3 border border-[#dfcca7] text-[#2d5a27] font-semibold rounded-lg text-sm hover:bg-[#fcfaf7] transition-all"
                    >
                      Latest Chapter (Ch. {novel.chapters.length})
                    </Link>
                  )}
                </div>
              ) : (
                <p className="text-sm opacity-70">No chapters posted yet!</p>
              )}
            </div>
          </div>
        </div>

        {/* Chapters Table */}
        <section className="mt-16">
          <div className="flex items-center justify-between border-b pb-3 mb-6" style={{ borderColor: '#e4d3b2' }}>
            <h2 className="text-2xl font-serif font-bold">Chapters ({novel.chapterCount})</h2>
            <span className="text-xs opacity-70 font-mono">ORDERED BY NUMBER</span>
          </div>

          {novel.chapters && novel.chapters.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {novel.chapters.map((ch, i) => (
                <Link
                  key={ch.slug}
                  href={`/novels/${novel.slug}/${ch.slug}`}
                  className="group flex justify-between items-center p-4 rounded-xl border bg-white hover:border-[#4a7c3f] transition-all duration-200"
                  style={{ borderColor: '#e4d3b2' }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono font-bold text-[#4a7c3f]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-serif font-semibold group-hover:text-[#4a7c3f] transition-colors duration-200">
                      {ch.title || `Chapter ${i + 1}`}
                    </span>
                  </div>
                  <span className="text-xs opacity-60 font-mono">
                    {ch.readingTime?.text || '3 min'}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed rounded-2xl" style={{ borderColor: '#e4d3b2' }}>
              <p className="text-sm opacity-65 font-serif italic">No chapters published yet. Stay tuned!</p>
            </div>
          )}
        </section>
      </main>

      {/* Author Support Banner */}
      <section className="max-w-4xl mx-auto px-6 mt-12">
        <div className="p-8 rounded-2xl text-center border bg-white" style={{ borderColor: '#dfcca7' }}>
          <h3 className="text-xl font-serif font-bold mb-2">Want to support Alvin Loria&apos;s works?</h3>
          <p className="text-sm opacity-85 mb-4 max-w-lg mx-auto font-serif">
            Show some love by liking the stories, recommending titles to friends, or subscribing to our author platform memberships!
          </p>
        </div>
      </section>
    </div>
  );
}
