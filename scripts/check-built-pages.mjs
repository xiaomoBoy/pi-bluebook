import fs from 'node:fs'
import path from 'node:path'
import MiniSearch from 'minisearch'
import { miniSearch } from '../docs/.vitepress/config/search.mjs'

// Check the rendered IDs, including translated heading slugs. Source-file
// existence alone cannot detect a link to a removed heading.
const dist = path.resolve('docs/.vitepress/dist')
const pages = new Map()
const errors = []
const decodeHtml = (value) => value.replace(/&(?:amp|quot|apos|lt|gt|#\d+|#x[\da-f]+);/gi, (entity) => {
  const named = { '&amp;': '&', '&quot;': '"', '&apos;': "'", '&lt;': '<', '&gt;': '>' }
  return named[entity] ?? String.fromCodePoint(
    entity.startsWith('&#x') ? parseInt(entity.slice(3), 16) : parseInt(entity.slice(2), 10)
  )
})

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name)
    if (entry.isDirectory() && entry.name !== 'assets') walk(file)
    if (entry.isFile() && file.endsWith('.html')) {
      const html = fs.readFileSync(file, 'utf8')
      pages.set(file, {
        html,
        ids: new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => decodeHtml(m[1]))),
        links: [...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)].map((m) => decodeHtml(m[1]))
      })
    }
  }
}
walk(dist)

let anchors = 0
for (const [file, page] of pages) {
  const relative = path.relative(dist, file)
  for (const href of page.links) {
    if (/^(?:[a-z][\w+.-]*:|\/\/)/i.test(href) || !href.includes('#')) continue
    try {
      const url = new URL(href, `https://local.invalid/${relative}`)
      if (!url.hash) continue
      const target = path.join(dist, decodeURIComponent(url.pathname))
      const candidates = [target, `${target}.html`, path.join(target, 'index.html')]
      const linkedPage = candidates.map((candidate) => pages.get(candidate)).find(Boolean)
      if (!linkedPage) {
        errors.push(`${relative}: missing anchor page ${href}`)
      } else if (!linkedPage.ids.has(decodeURIComponent(url.hash.slice(1)))) {
        errors.push(`${relative}: missing anchor ${href}`)
      }
      anchors += 1
    } catch {
      errors.push(`${relative}: malformed link ${href}`)
    }
  }
  if (relative !== '404.html' && !page.html.includes('VPNavBarSearch')) {
    errors.push(`${relative}: search control is missing`)
  }
}

const chunks = fs.readdirSync(path.join(dist, 'assets/chunks'))
for (const locale of ['root', 'zh-TW']) {
  const indexFile = chunks.find((name) => name.startsWith(`@localSearchIndex${locale}.`) && name.endsWith('.js'))
  if (!indexFile) {
    errors.push(`missing ${locale} search index`)
    continue
  }
  const { default: indexJSON } = await import(path.join(dist, 'assets/chunks', indexFile))
  const index = MiniSearch.loadJSON(indexJSON, {
    fields: ['title', 'titles', 'text'], storeFields: ['title', 'titles'], ...miniSearch.options
  })
  const queries = locale === 'root' ? ['安装失败', '上下文', 'Skill'] : ['安裝失敗', '上下文', '技能']
  for (const query of queries) {
    const results = index.search(query, { prefix: true, fuzzy: 0.2, ...miniSearch.searchOptions })
    if (!results.slice(0, 10).some((result) => /\/(guide|reference)\//.test(result.id))) {
      errors.push(`${locale}: no relevant course/reference result for ${query}`)
    }
  }
}
if (errors.length) {
  console.error(`Built-page check failed:\n${errors.map((error) => `- ${error}`).join('\n')}`)
  process.exit(1)
}
console.log(`Built-page check passed: ${pages.size} pages, ${anchors} anchors, both search indexes`)
