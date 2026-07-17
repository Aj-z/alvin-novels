import Link from 'next/link';

export default function ChapterNavigation({ novel, currentChapter }) {
  return (
    <nav className="flex items-center justify-between py-8 mt-12" style={{borderTop: '1px solid var(--theme-border)'}}>
      {currentChapter.prevChapter ? (
        <Link href={'/novels/' + novel.slug + '/' + currentChapter.prevChapter.slug} className="flex items-center gap-2 hover:opacity-80" style={{color: 'var(--theme-link)'}}>
          <span>←</span><div><div className="text-sm">Previous</div><div className="font-medium">Ch. {currentChapter.chapterNumber - 1}</div></div>
        </Link>
      ) : <div />}
      <Link href={'/novels/' + novel.slug} className="font-medium hover:opacity-80" style={{color: 'var(--theme-link)'}}>Contents</Link>
      {currentChapter.nextChapter ? (
        <Link href={'/novels/' + novel.slug + '/' + currentChapter.nextChapter.slug} className="flex items-center gap-2 text-right hover:opacity-80" style={{color: 'var(--theme-link)'}}>
          <div><div className="text-sm">Next</div><div className="font-medium">Ch. {currentChapter.chapterNumber + 1}</div></div><span>→</span>
        </Link>
      ) : <div />}
    </nav>
  );
}
