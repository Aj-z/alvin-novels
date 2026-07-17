'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, BookOpen, Clock, Calendar, CheckCircle, HelpCircle, ArrowRight } from 'lucide-react';

export default function NovelListClient({ novels }) {
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Extract all unique genres across all novels
  const allGenres = useMemo(() => {
    const set = new Set();
    novels.forEach(n => {
      n.genres?.forEach(g => set.add(g));
    });
    return Array.from(set).sort();
  }, [novels]);

  // Filter novels based on search query, selected genre, and selected status
  const filteredNovels = useMemo(() => {
    return novels.filter(n => {
      const matchesSearch =
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.author.toLowerCase().includes(search.toLowerCase()) ||
        n.synopsis.toLowerCase().includes(search.toLowerCase()) ||
        n.tags?.some(t => t.toLowerCase().includes(search.toLowerCase()));

      const matchesGenre = selectedGenre ? n.genres?.includes(selectedGenre) : true;
      const matchesStatus = selectedStatus ? n.status === selectedStatus : true;

      return matchesSearch && matchesGenre && matchesStatus;
    });
  }, [novels, search, selectedGenre, selectedStatus]);

  return (
    <div className="space-y-12">
      {/* Search and Filters Section */}
      <div className="p-8 pl-0 rounded-2xl border border-brand-beige-300 bg-white/70 backdrop-blur-md shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ml-0 pl-[10px] w-[1258px] max-w-full">
          {/* Search Input */}
          <div className="relative">
            <span className="absolute left-3 top-3.5 text-stone-400">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search title, keywords..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-beige-300 text-sm outline-none focus:ring-2 focus:ring-brand-green-500/20 focus:border-brand-green-500 bg-brand-beige-100/40 text-brand-brown-900 placeholder:text-stone-400 transition-all"
            />
          </div>

          {/* Genre Dropdown */}
          <div className="relative">
            <select
              value={selectedGenre}
              onChange={e => setSelectedGenre(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-brand-beige-300 text-sm outline-none cursor-pointer focus:ring-2 focus:ring-brand-green-500/20 focus:border-brand-green-500 bg-brand-beige-100/40 text-brand-brown-900 transition-all appearance-none"
            >
              <option value="">All Genres</option>
              {allGenres.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-500 text-xs">
              ▼
            </div>
          </div>

          {/* Status Dropdown */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-brand-beige-300 text-sm outline-none cursor-pointer focus:ring-2 focus:ring-brand-green-500/20 focus:border-brand-green-500 bg-brand-beige-100/40 text-brand-brown-900 transition-all appearance-none"
            >
              <option value="">All Statuses</option>
              <option value="ongoing">Ongoing Works</option>
              <option value="completed">Completed Works</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-500 text-xs">
              ▼
            </div>
          </div>
        </div>

        {/* Filters Clear Button */}
        {(search || selectedGenre || selectedStatus) && (
          <div className="mt-4 flex justify-between items-center pt-3 border-t border-brand-beige-200">
            <span className="text-xs text-brand-brown-900/60 font-serif italic">
              Showing {filteredNovels.length} {filteredNovels.length === 1 ? 'novel' : 'novels'} matching criteria
            </span>
            <button
              onClick={() => {
                setSearch('');
                setSelectedGenre('');
                setSelectedStatus('');
              }}
              className="text-xs font-mono font-bold text-red-600 hover:text-red-700 transition-colors hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Grid Display */}
      {filteredNovels.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-brand-beige-300 rounded-3xl bg-white/40">
          <HelpCircle className="mx-auto text-stone-400 mb-4" size={40} />
          <p className="text-lg font-serif italic text-brand-brown-900/70 mb-4">No volumes match your active search or filters.</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedGenre('');
              setSelectedStatus('');
            }}
            className="px-6 py-2.5 bg-brand-green-500 text-white font-semibold rounded-xl text-sm hover:bg-brand-green-600 shadow-sm transition-all cursor-pointer"
          >
            Show All Books
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
          {filteredNovels.map(n => (
            <Link key={n.slug} href={`/novels/${n.slug}`} className="group block h-full">
              <div className="p-7 flex flex-col justify-between h-full bg-white border border-brand-beige-300 rounded-2xl hover:shadow-xl transition-all duration-300 relative">
                {/* Header Badge Row */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md uppercase tracking-wider"
                      style={{
                        backgroundColor: n.status === 'ongoing' ? 'rgba(45, 90, 39, 0.08)' : 'rgba(16, 185, 129, 0.08)',
                        color: n.status === 'ongoing' ? 'var(--primary)' : '#10b981',
                      }}
                    >
                      {n.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                    </span>
                    {n.featured && (
                      <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200/50 px-2.5 py-1 rounded-md">
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-serif font-bold group-hover:text-brand-green-500 transition-colors duration-300 mb-2 leading-snug">
                    {n.title}
                  </h3>
                  
                  <p className="text-xs text-brand-brown-900/50 uppercase tracking-wider font-sans mb-5">by Alvin Loria</p>
                  
                  <p className="text-sm font-serif text-brand-brown-900/80 leading-relaxed mb-6 line-clamp-3">
                    {n.synopsis}
                  </p>
                </div>

                <div>
                  {/* Genres Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {n.genres?.map(g => (
                      <span
                        key={g}
                        className="text-[10px] uppercase font-mono font-semibold tracking-wider px-2 py-0.5 rounded-md border border-brand-beige-300/60 bg-brand-beige-100 text-brand-brown-900/70"
                      >
                        {g}
                      </span>
                    ))}
                  </div>

                  {/* Footer Stats */}
                  <div className="border-t border-brand-beige-200 pt-4 flex justify-between items-center text-[11px] font-mono text-brand-brown-900/60">
                    <span className="flex items-center gap-1.5 font-bold text-brand-green-500">
                      <BookOpen size={12} /> {n.chapterCount} {n.chapterCount === 1 ? 'Chapter' : 'Chapters'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {new Date(n.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                {/* Micro interactive indicator */}
                <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-brand-green-500">
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

