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
    'name="twitter:image"',
    'name="twitter:card" content="summary_large_image"',
    'type="application/ld+json"'
  ]

  for (const fragment of requiredFragments) {
    if (count(html, fragment) !== 1) {
      fail(`${relativePath} has ${count(html, fragment)} occurrences of ${fragment}`)
    }
  }

  const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
  if (!jsonLdMatch) continue

  try {
    const data = JSON.parse(jsonLdMatch[1])
    if (relativePath === 'index.html' || relativePath === 'zh-TW/index.html') {
      if (data['@type'] !== 'WebSite' || data.alternateName !== 'PI BLUEBOOK') {
        fail('home page WebSite data is incomplete')
      }
    } else {
      const graphTypes = new Set(data['@graph']?.map((item) => item['@type']))
      if (!graphTypes.has('WebPage') || !graphTypes.has('BreadcrumbList')) {
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
