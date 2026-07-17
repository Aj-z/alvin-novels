import { getAllNovels } from '@/lib/novels';
import NovelListClient from './NovelListClient';
import { Sparkles, BookOpen, Library, Award, ChevronRight } from 'lucide-react';

export default function Home() {
  const novels = getAllNovels();
  const featured = novels.filter(n => n.featured);

  return (
    <div className="min-h-screen pb-20 bg-brand-beige-50 text-brand-brown-900 selection:bg-brand-green-500/10">
      {/* Decorative Top Accent Bar */}
      <div className="h-1.5 w-full bg-linear-to-r from-brand-green-500 via-amber-400 to-brand-green-700" />

      {/* Hero Banner with High-End Literary Style */}
      <section className="relative text-center py-28 px-6 border-b border-brand-beige-300 bg-linear-to-b from-brand-beige-200/50 to-brand-beige-50 flex flex-col items-center justify-center">
        {/* Subtle decorative background watermark */}
        <div className="absolute inset-0 pointer-events-none opacity-2 flex items-center justify-center select-none overflow-hidden">
          <span className="font-serif text-[24vw] leading-none font-bold uppercase tracking-tighter">AL</span>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-beige-300 bg-brand-beige-100 text-[10px] uppercase tracking-widest font-mono text-brand-green-500 font-bold mb-6">
            <Library size={12} />
            <span>PREMIUM DIGITAL CATALOGUE</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-brand-brown-900 mb-6">
            Alvin Loria <span className="italic font-light text-brand-green-500 font-serif font-serif-italic">Novels</span>
          </h1>

          <div className="w-16 h-[2px] bg-brand-green-500 mx-auto my-6 opacity-60" />

          <p className="text-lg md:text-2xl font-serif leading-relaxed max-w-3xl mx-auto text-brand-brown-900/80 font-light italic">
            Immerse yourself in worlds of fantasy, high-tech futures, and dark folklore. Escapes curated with custom ambient soundscapes and responsive storytelling experiences.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        
        {/* Featured Row */}
        {featured.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center justify-between gap-4 ml-0 mt-0 mb-[15px] pl-[10px]">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-lg bg-amber-500/10 text-amber-600">
                  <Sparkles size={24} />
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-brand-brown-900">
                  Featured Masterpieces
                </h2>
              </div>
              <div className="hidden sm:block flex-grow h-[1px] bg-brand-beige-300" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8 ml-[10px]">
              {featured.map(n => (
                <a key={`feat-${n.slug}`} href={`/novels/${n.slug}`} className="group block h-full">
                  <div className="relative overflow-hidden p-8 rounded-3xl border border-brand-beige-300 bg-white shadow-xs transition-all duration-500 hover:shadow-xl hover:border-brand-green-500/40 hover:-translate-y-1 flex flex-col h-full">
                    {/* Background glow effect */}
                    <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 rounded-full bg-amber-500/5 blur-2xl group-hover:bg-brand-green-500/10 transition-colors duration-500" />
                    
                    <div className="relative z-10 flex flex-col flex-grow">
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono tracking-wider uppercase bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-md font-bold">
                            <Award size={12} /> FEATURED
                          </span>
                          <span className="text-xs font-mono font-bold text-brand-green-600 bg-brand-green-500/10 px-2 py-1 rounded">
                            {n.genres?.[0] || 'Novel'}
                          </span>
                        </div>
                        
                        <h3 className="text-3xl font-display font-bold mb-2 text-brand-brown-900 group-hover:text-brand-green-500 transition-colors duration-200">
                          {n.title}
                        </h3>
                        <p className="text-xs font-sans tracking-wide text-brand-brown-900/50 uppercase mb-5">By Alvin Loria</p>
                        
                        <p className="text-sm leading-relaxed text-brand-brown-900/80 line-clamp-3 font-serif mb-6">
                          {n.synopsis}
                        </p>
                      </div>

                      <div className="mt-auto">
                        <div className="flex items-center justify-between pt-5 border-t border-brand-beige-200">
                          <span className="text-[11px] font-mono opacity-60 flex items-center gap-1.5">
                            <BookOpen size={12} /> {n.chapterCount} Chapters
                          </span>
                          <div className="flex items-center gap-1 text-xs font-mono text-brand-green-500 font-bold group-hover:underline">
                            <span>Begin</span>
                            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Dynamic Catalog Section */}
        <section className="mt-16">
          <div className="flex items-center justify-between gap-4 my-10 ml-[10px]">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-lg bg-brand-green-500/10 text-brand-green-500">
                <BookOpen size={24} />
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-brand-brown-900">
                Explore the Library
              </h2>
            </div>
            <div className="hidden sm:block flex-grow h-[1px] bg-brand-beige-300" />
          </div>

          {/* Interactive list with Search, Genre and Status filtering */}
          <NovelListClient novels={novels} />
        </section>
      </main>

      {/* Footer styled like an elegant, high-end imprint page */}
      <footer className="border-t border-brand-beige-300 bg-brand-beige-100/50 py-16 text-center text-xs text-brand-brown-900/60 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="font-mono tracking-widest text-brand-green-500 font-bold my-3">AJLORIA NOVELS PLATFORM • CHRONICLES OF FANTASY & FUTURE</p>
          <p className="max-w-md mx-auto mb-6 text-brand-brown-900/40">
            A boutique, serverless web anthology presenting immersive worlds with dedicated high-fidelity scores and tailored ambient visual elements.
          </p>
          <div className="w-8 h-[1px] bg-brand-beige-300 mx-auto mb-6" />
          <p className="opacity-70 font-sans">
            &copy; {new Date().getFullYear()} Alvin Loria. All rights reserved. Managed with premium lightweight services.
          </p>
        </div>
      </footer>
    </div>
  );
}

