import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const novelsDir = path.join(process.cwd(), 'content/novels')

export function getAllNovels() {
  if (!fs.existsSync(novelsDir)) return []
  const dirs = fs.readdirSync(novelsDir)
  const novels = []
  for (const dir of dirs) {
    const mp = path.join(novelsDir, dir, 'metadata.json')
    if (!fs.existsSync(mp)) continue
    try {
      const m = JSON.parse(fs.readFileSync(mp, 'utf8').trim())
      const ch = getNovelChapters(dir)
      novels.push({ ...m, slug: dir, chapterCount: ch.length, chapters: ch })
    } catch (e) { console.error('Error:', dir, e.message) }
  }
  return novels.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
}

export function getNovelBySlug(slug) {
  const mp = path.join(novelsDir, slug, 'metadata.json')
  if (!fs.existsSync(mp)) return null
  try {
    const m = JSON.parse(fs.readFileSync(mp, 'utf8').trim())
    const ch = getNovelChapters(slug)
    return { ...m, slug, chapters: ch, chapterCount: ch.length }
  } catch (e) { return null }
}

export function getNovelChapters(slug) {
  const dp = path.join(novelsDir, slug)
  if (!fs.existsSync(dp)) return []
  return fs.readdirSync(dp).filter(f => f.endsWith('.md')).map(f => {
    const c = fs.readFileSync(path.join(dp, f), 'utf8')
    const { data, content } = matter(c)
    const s = readingTime(content)
    return { ...data, slug: f.replace('.md', ''), novelSlug: slug, content, readingTime: s, wordCount: s.words }
  }).sort((a, b) => (parseInt(a.slug.split('-')[1])||0) - (parseInt(b.slug.split('-')[1])||0))
}

export function getChapter(ns, cs) {
  const ch = getNovelChapters(ns)
  const i = ch.findIndex(c => c.slug === cs)
  if (i === -1) return null
  return { ...ch[i], prevChapter: i>0?ch[i-1]:null, nextChapter: i<ch.length-1?ch[i+1]:null, chapterNumber: i+1, totalChapters: ch.length }
}
