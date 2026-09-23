import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

const CHANGELOG_URL =
  'https://raw.githubusercontent.com/earendil-works/pi/main/packages/coding-agent/CHANGELOG.md'
const PACKAGE_URL =
  'https://raw.githubusercontent.com/earendil-works/pi/main/packages/coding-agent/package.json'
const SOURCE_URL =
  'https://github.com/earendil-works/pi/blob/main/packages/coding-agent/CHANGELOG.md'
const OUTPUT_PATH = path.join(
  process.cwd(),
  'docs',
  '.vitepress',
  'data',
  'pi-releases.json'
)

const [changelog, packageSource] = await Promise.all([
  fetchText(CHANGELOG_URL),
  fetchText(PACKAGE_URL)
])

const packageJson = JSON.parse(packageSource)
const releases = parseReleases(changelog)

if (!releases.length) {
  throw new Error('No released Pi versions were found in the official changelog.')
}

const snapshot = {
  meta: {
    source: 'Pi Coding Agent official changelog',
    sourceUrl: SOURCE_URL,
    rawUrl: CHANGELOG_URL,
    packageUrl: PACKAGE_URL,
    verifiedAt: new Date().toISOString().slice(0, 10),
    sourceSha256: crypto.createHash('sha256').update(changelog).digest('hex'),
    packageName: packageJson.name,
    packageVersion: packageJson.version,
    latestVersion: releases[0].version,
    latestDate: releases[0].date,
    oldestVersion: releases.at(-1).version,
    oldestDate: releases.at(-1).date,
    releaseCount: releases.length
  },
  releases
}

fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true })
fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(snapshot, null, 2)}\n`)

console.log(
  `Pi release snapshot updated: ${releases.length} versions, ` +
  `${releases.at(-1).version} → ${releases[0].version}`
)

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      Accept: 'text/plain',
      'User-Agent': 'Pi-Bluebook-release-sync/1.0'
    }
  })

  if (!response.ok) {
    throw new Error(`Unable to fetch ${url}: HTTP ${response.status}`)
  }

  return response.text()
}

function parseReleases(source) {
  const headerPattern = /^## \[([^\]]+)\](?: - (\d{4}-\d{2}-\d{2}))?$/gm
  const headers = [...source.matchAll(headerPattern)]
  const releases = []

  for (const [index, match] of headers.entries()) {
    const version = match[1]
    const date = match[2] || null
    if (version.toLowerCase() === 'unreleased' || !date) continue

    const bodyStart = match.index + match[0].length
    const bodyEnd = headers[index + 1]?.index ?? source.length
    const body = source.slice(bodyStart, bodyEnd).trim()
    const sections = parseSections(body)
    const bodyText = sections
      .flatMap((section) => [section.title, ...section.items])
      .join(' ')

    releases.push({
      version,
      date,
      year: date.slice(0, 4),
      sourceUrl: `${SOURCE_URL}#${githubHeadingAnchor(version, date)}`,
      itemCount: sections.reduce((total, section) => total + section.items.length, 0),
      changeTypes: getChangeTypes(sections),
      topics: getTopics(bodyText),
      sections
    })
  }

  return releases
}

function parseSections(body) {
  const sections = []
  let currentSection = createSection('Overview')
  let currentItem = ''
  let inCodeBlock = false

  const flushItem = () => {
    const cleaned = cleanMarkdown(currentItem)
    if (cleaned) currentSection.items.push(cleaned)
    currentItem = ''
  }

  const flushSection = () => {
    flushItem()
    if (currentSection.items.length) sections.push(currentSection)
  }

  for (const rawLine of body.split('\n')) {
    const line = rawLine.trimEnd()

    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock
      continue
    }

    const sectionMatch = line.match(/^###\s+(.+)$/)
    if (sectionMatch && !inCodeBlock) {
      flushSection()
      currentSection = createSection(cleanMarkdown(sectionMatch[1]))
      continue
    }

    const topLevelBullet = line.match(/^-\s+(.+)$/)
    if (topLevelBullet && !inCodeBlock) {
      flushItem()
      currentItem = topLevelBullet[1]
      continue
    }

    const nestedBullet = line.match(/^\s+(?:[-*]|\d+\.)\s+(.+)$/)
    if (nestedBullet) {
      currentItem = appendText(currentItem, nestedBullet[1], ' — ')
      continue
    }

    const numberedItem = line.match(/^\d+\.\s+(.+)$/)
    if (numberedItem && !inCodeBlock) {
      flushItem()
      currentItem = numberedItem[1]
      continue
    }

    if (/^#{4,}\s+/.test(line)) {
      currentItem = appendText(currentItem, line.replace(/^#{4,}\s+/, ''), ' — ')
      continue
    }

    if (!line.trim()) {
      if (currentItem && !inCodeBlock) flushItem()
      continue
    }

    if (/^(?:\|?\s*:?-+:?\s*)+\|?$/.test(line)) continue

    currentItem = appendText(currentItem, line.trim(), inCodeBlock ? ' · ' : ' ')
  }

  flushSection()
  return sections.length ? sections : [createSection('Overview', ['No details recorded.'])]
}

function createSection(title, items = []) {
  return {
    title,
    key: sectionKey(title),
    items
  }
}

function appendText(existing, next, separator) {
  return existing ? `${existing}${separator}${next}` : next
}

function cleanMarkdown(value) {
  return value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<([^>]+)>/g, '$1')
    .replace(/<[^>]*>/g, '')
    .replace(/[`*_~]/g, '')
    .replace(/\\([\\`*_{}\[\]()#+\-.!])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

function sectionKey(title) {
  const normalized = title.toLowerCase()
  if (normalized.includes('breaking')) return 'breaking'
  if (normalized.includes('new feature')) return 'features'
  if (normalized === 'added') return 'added'
  if (normalized === 'changed') return 'changed'
  if (normalized === 'fixed') return 'fixed'
  if (normalized.includes('deprecated')) return 'deprecated'
  if (normalized.includes('removed')) return 'removed'
  if (normalized.includes('migration')) return 'migration'
  return 'overview'
}

function getChangeTypes(sections) {
  const types = new Set(sections.map((section) => section.key))
  if (types.has('features') || types.has('added')) types.add('features')
  return [...types]
}

function getTopics(text) {
  const source = text.toLowerCase()
  const definitions = {
    models: ['model', 'thinking', 'reasoning', 'anthropic', 'openai', 'claude', 'gpt-', 'gemini'],
    providers: ['provider', 'oauth', 'api key', 'authentication', 'openrouter', 'copilot'],
    sessions: ['session', '/resume', 'branch', 'fork', '/tree', 'transcript'],
    context: ['context', 'compaction', 'compact', 'prompt cache', 'token'],
    extensions: ['extension', 'hook', 'custom tool', 'event handler'],
    packages: ['package', 'skill', 'prompt template', 'theme'],
    safety: ['trust', 'permission', 'security', 'credential', 'redact'],
    interface: ['tui', 'editor', 'footer', 'display', 'clipboard', 'markdown', 'image'],
    sdk: ['sdk', 'rpc', 'cli', 'print mode', 'typescript'],
    platforms: ['windows', 'wsl', 'macos', 'linux', 'terminal']
  }

  return Object.entries(definitions)
    .filter(([, terms]) => terms.some((term) => source.includes(term)))
    .map(([topic]) => topic)
}

function githubHeadingAnchor(version, date) {
  return `${version.replace(/[^a-z\d-]/gi, '').toLowerCase()}---${date}`
}
