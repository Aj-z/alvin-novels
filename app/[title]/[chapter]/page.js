import { getAllNovels, getChapter, getNovelBySlug } from '@/lib/novels'
import { notFound } from 'next/navigation'
import ChapterPageClient from './ChapterPageClient'

export async function generateStaticParams() {
  const novels = getAllNovels()
  return novels.flatMap(n => (n.chapters||[]).map(ch => ({ title: n.slug, chapter: ch.slug })))
}

export async function generateMetadata(props) {
  const params = await props.params
  const novel = getNovelBySlug(params.title)
  const chapter = getChapter(params.title, params.chapter)
  if (!novel || !chapter) return { title: 'Not Found' }
  return { title: 'Ch. ' + chapter.chapterNumber + ' - ' + novel.title }
}

export default async function ChapterPage(props) {
  const params = await props.params
  const novel = getNovelBySlug(params.title)
  const chapter = getChapter(params.title, params.chapter)
  if (!novel || !chapter) notFound()
  return <ChapterPageClient novel={novel} chapter={chapter} />
}