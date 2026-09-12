import fs from 'node:fs'
import path from 'node:path'

const projectRoot = process.cwd()
const docsDir = path.join(projectRoot, 'docs')
const publicDir = path.join(docsDir, 'public')
const navigationFiles = [
  path.join(docsDir, '.vitepress', 'config', 'navigation.mts'),
  path.join(docsDir, '.vitepress', 'config', 'navigation.zh-tw.mts')
]

const contentFiles = [
  ...walk(projectRoot, (filePath) =>
    filePath.endsWith('.md') &&
    !filePath.includes(`${path.sep}node_modules${path.sep}`) &&
    !filePath.includes(`${path.sep}.git${path.sep}`) &&
    !filePath.startsWith(publicDir)
  ),
  ...navigationFiles
]

const errors = []
let checkedReferences = 0

for (const filePath of contentFiles) {
  const source = fs.readFileSync(filePath, 'utf8')
  const references = extractReferences(source, navigationFiles.includes(filePath))

  for (const reference of references) {
    const target = normalizeTarget(reference.target)
    if (!target || isExternalTarget(target)) continue

    checkedReferences += 1
    const candidates = resolveCandidates(filePath, target)
    if (candidates.some((candidate) => fs.existsSync(candidate))) continue

    const relativeFile = path.relative(projectRoot, filePath)
    errors.push(`${relativeFile}:${reference.line} -> ${reference.target}`)
  }
}

if (errors.length) {
  console.error('Content check failed: unresolved local references')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(
  `Content check passed: ${contentFiles.length} source files, ${checkedReferences} local references`
)

function walk(directory, includeFile) {
  const files = []

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue

    const filePath = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...walk(filePath, includeFile))
    if (entry.isFile() && includeFile(filePath)) files.push(filePath)
  }

  return files
}

function extractReferences(source, isNavigationFile) {
  const patterns = isNavigationFile
    ? [/\blink:\s*['"]([^'"]+)['"]/g]
    : [
        /!?\[[^\]]*\]\((?:<([^>]+)>|([^\s)]+))(?:\s+['"][^'"]*['"])?\)/g,
        /\b(?:href|src)=["']([^"']+)["']/g,
        // Download commands in code fences are part of the reader's workflow.
        /https:\/\/pi\.xiaomovps\.com(\/examples(?:-tw)?\/[^\s`"'<>)]*)/g
      ]

  const references = []
  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) {
      const target = match.slice(1).find(Boolean)
      if (!target) continue
      // Shell loops resolve these names at runtime; check their concrete files separately.
      if (target.includes('${')) continue

      references.push({
        target,
        line: source.slice(0, match.index).split('\n').length
      })
    }
  }

  return references
}

function normalizeTarget(rawTarget) {
  const withoutFragment = rawTarget.trim().split('#', 1)[0].split('?', 1)[0]
  if (!withoutFragment) return null

  try {
    return decodeURIComponent(withoutFragment)
  } catch {
    return withoutFragment
  }
}

function isExternalTarget(target) {
  return (
    target.startsWith('//') ||
    target.startsWith('data:') ||
    target.startsWith('mailto:') ||
    target.startsWith('tel:') ||
    /^[a-z][a-z\d+.-]*:/i.test(target)
  )
}

function resolveCandidates(sourceFile, target) {
  if (target.startsWith('/')) {
    const relativeTarget = target.slice(1)
    const publicTarget = path.join(publicDir, relativeTarget)
    const pageTarget = path.join(docsDir, relativeTarget)

    return candidateVariants(pageTarget, publicTarget)
  }

  const relativeTarget = path.resolve(path.dirname(sourceFile), target)
  return candidateVariants(relativeTarget)
}

function candidateVariants(primaryTarget, publicTarget) {
  const candidates = [primaryTarget]
  if (publicTarget) candidates.push(publicTarget)

  for (const target of [...candidates]) {
    if (path.extname(target)) continue
    candidates.push(`${target}.md`, path.join(target, 'index.md'))
  }

  return candidates
}
