import fs from 'node:fs'
import path from 'node:path'

const projectRoot = process.cwd()
const docsDir = path.join(projectRoot, 'docs')
const twDir = path.join(docsDir, 'zh-TW')
const examplesDir = path.join(docsDir, 'public', 'examples')
const examplesTWDir = path.join(docsDir, 'public', 'examples-tw')
const navigationFile = path.join(docsDir, '.vitepress', 'config', 'navigation.mts')
const navigationTWFile = path.join(docsDir, '.vitepress', 'config', 'navigation.zh-tw.mts')

const errors = []
compareTrees(docsDir, twDir, isContentPage, 'content page')
compareTrees(examplesDir, examplesTWDir, () => true, 'example file')
compareNavigationLinks()

if (errors.length) {
  console.error('Locale check failed: Simplified and Traditional structures differ')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log('Locale check passed: page, example, and navigation structures are aligned')

function compareTrees(sourceRoot, targetRoot, includeFile, label) {
  const sourceFiles = new Set(relativeFiles(sourceRoot, includeFile, true))
  const targetFiles = new Set(relativeFiles(targetRoot, includeFile, false))

  for (const file of sourceFiles) {
    if (!targetFiles.has(file)) errors.push(`missing Traditional ${label}: ${file}`)
  }
  for (const file of targetFiles) {
    if (!sourceFiles.has(file)) errors.push(`orphan Traditional ${label}: ${file}`)
  }
}

function relativeFiles(root, includeFile, isSourceTree) {
  if (!fs.existsSync(root)) return []
  const files = []

  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (isSourceTree && ['.vitepress', 'public', 'zh-TW', 'diagrams'].includes(entry.name)) continue

    const filePath = path.join(root, entry.name)
    if (entry.isDirectory()) {
      for (const child of relativeFiles(filePath, includeFile, false)) {
        files.push(path.join(entry.name, child))
      }
    } else if (entry.isFile() && includeFile(filePath)) {
      files.push(entry.name)
    }
  }

  return files
}

function isContentPage(filePath) {
  return filePath.endsWith('.md')
}

function compareNavigationLinks() {
  const simplified = navigationLinks(navigationFile, false)
  const traditional = navigationLinks(navigationTWFile, true)

  for (const link of simplified) {
    if (!traditional.has(link)) errors.push(`missing Traditional navigation link: ${link}`)
  }
  for (const link of traditional) {
    if (!simplified.has(link)) errors.push(`orphan Traditional navigation link: ${link}`)
  }
}

function navigationLinks(filePath, isTW) {
  if (!fs.existsSync(filePath)) return new Set()
  const source = fs.readFileSync(filePath, 'utf8')
  const links = [...source.matchAll(/\blink:\s*'([^']+)'/g)]
    .map((match) => match[1])
    .filter((link) => link.startsWith('/'))
    .map((link) => {
      if (!isTW) return link
      return link.replace(/^\/zh-TW(?=\/)/, '')
    })

  return new Set(links)
}
