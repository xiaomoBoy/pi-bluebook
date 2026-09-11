import fs from 'node:fs'
import path from 'node:path'

const distDir = path.resolve('docs/.vitepress/dist')
const requiredAssets = [
  'apple-touch-icon.png',
  'brand-mark.svg',
  'favicon-48.png',
  'icon-192.png',
  'icon-512.png',
  'og-image.png',
  'site.webmanifest',
  'sitemap.xml'
]

const htmlFiles = []

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filePath = path.join(directory, entry.name)
    if (entry.isDirectory() && entry.name !== 'assets') walk(filePath)
    if (entry.isFile() && entry.name.endsWith('.html') && entry.name !== '404.html') {
      htmlFiles.push(filePath)
    }
  }
}

function count(content, fragment) {
  return content.split(fragment).length - 1
}

function fail(message) {
  console.error(`SEO check failed: ${message}`)
  process.exitCode = 1
}

for (const asset of requiredAssets) {
  if (!fs.existsSync(path.join(distDir, asset))) fail(`missing ${asset}`)
}

walk(distDir)

for (const filePath of htmlFiles) {
  const html = fs.readFileSync(filePath, 'utf8')
  const relativePath = path.relative(distDir, filePath)
  const requiredFragments = [
    'rel="canonical"',
    'property="og:image"',
    'property="og:locale"',
    'name="twitter:image"',
    'name="twitter:card" content="summary_large_image"',
    'type="application/ld+json"'
  ]

  for (const fragment of requiredFragments) {
    if (count(html, fragment) !== 1) {
      fail(`${relativePath} has ${count(html, fragment)} occurrences of ${fragment}`)
    }
  }

  const isTW = relativePath.startsWith(`zh-TW${path.sep}`)
  const expectedLanguage = isTW ? 'zh-Hant-TW' : 'zh-CN'
  const expectedOgLocale = isTW ? 'zh_Hant_TW' : 'zh_CN'
  if (!html.includes(`<html lang="${expectedLanguage}"`)) {
    fail(`${relativePath} has the wrong html language`)
  }
  if (!html.includes(`property="og:locale" content="${expectedOgLocale}"`)) {
    fail(`${relativePath} has the wrong Open Graph locale`)
  }

  const alternateLinks = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">/g)]
  const alternateLanguages = new Set(alternateLinks.map((match) => match[1]))
  for (const language of ['zh-CN', 'zh-Hant-TW', 'x-default']) {
    if (!alternateLanguages.has(language)) {
      fail(`${relativePath} is missing the ${language} alternate`)
    }
  }

  for (const [, language, href] of alternateLinks) {
    if (language === 'x-default') continue
    const targetUrl = new URL(href)
    const cleanPath = decodeURIComponent(targetUrl.pathname)
    const targetFile = cleanPath.endsWith('/')
      ? path.join(distDir, cleanPath, 'index.html')
      : path.join(distDir, `${cleanPath}.html`)
    if (!fs.existsSync(targetFile)) {
      fail(`${relativePath} points to missing ${language} alternate ${cleanPath}`)
    }
  }

  const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
  if (!jsonLdMatch) continue

  try {
    const data = JSON.parse(jsonLdMatch[1])
    if (relativePath === 'index.html' || relativePath === 'zh-TW/index.html') {
      if (
        data['@type'] !== 'WebSite' ||
        data.alternateName !== 'PI BLUEBOOK' ||
        data.inLanguage !== expectedLanguage
      ) {
        fail('home page WebSite data is incomplete')
      }
    } else {
      const graphTypes = new Set(data['@graph']?.map((item) => item['@type']))
      const webPage = data['@graph']?.find((item) => item['@type'] === 'WebPage')
      if (
        !graphTypes.has('WebPage') ||
        !graphTypes.has('BreadcrumbList') ||
        webPage?.inLanguage !== expectedLanguage
      ) {
        fail(`${relativePath} is missing WebPage or BreadcrumbList data`)
      }
    }
  } catch (error) {
    fail(`${relativePath} has invalid JSON-LD: ${error.message}`)
  }
}

const sitemap = fs.readFileSync(path.join(distDir, 'sitemap.xml'), 'utf8')
const sitemapUrlCount = count(sitemap, '<url>')
if (sitemapUrlCount !== htmlFiles.length) {
  fail(`sitemap has ${sitemapUrlCount} URLs for ${htmlFiles.length} indexable pages`)
}

if (!process.exitCode) {
  console.log(`SEO check passed: ${htmlFiles.length} indexable pages`)
}
