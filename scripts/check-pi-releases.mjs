import fs from 'node:fs'
import path from 'node:path'

const snapshotPath = path.join(
  process.cwd(),
  'docs',
  '.vitepress',
  'data',
  'pi-releases.json'
)

const errors = []

if (!fs.existsSync(snapshotPath)) {
  fail('release snapshot is missing; run npm run sync:pi-releases')
}

const snapshot = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'))
const { meta, releases } = snapshot

if (!meta || !Array.isArray(releases)) fail('release snapshot has an invalid structure')
if (!/^https:\/\/github\.com\/earendil-works\/pi\//.test(meta.sourceUrl)) {
  errors.push('sourceUrl must point to the official earendil-works/pi repository')
}
if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.verifiedAt)) errors.push('verifiedAt is invalid')
if (!/^[a-f\d]{64}$/.test(meta.sourceSha256)) errors.push('sourceSha256 is invalid')
if (meta.releaseCount !== releases.length) errors.push('releaseCount does not match the data')
if (meta.latestVersion !== releases[0]?.version) errors.push('latestVersion does not match')
if (meta.oldestVersion !== releases.at(-1)?.version) errors.push('oldestVersion does not match')

const versions = new Set()
for (const [index, release] of releases.entries()) {
  if (versions.has(release.version)) errors.push(`duplicate version: ${release.version}`)
  versions.add(release.version)

  if (!/^\d+\.\d+\.\d+(?:[-+].+)?$/.test(release.version)) {
    errors.push(`invalid version: ${release.version}`)
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(release.date)) {
    errors.push(`invalid date for ${release.version}`)
  }
  if (!release.sourceUrl.startsWith(meta.sourceUrl)) {
    errors.push(`invalid source URL for ${release.version}`)
  }
  if (!Array.isArray(release.sections) || !release.sections.length || !release.itemCount) {
    errors.push(`missing release details for ${release.version}`)
  }

  if (index > 0 && compareVersions(releases[index - 1].version, release.version) < 0) {
    errors.push(`versions are out of order near ${release.version}`)
  }
}

const milestoneChecks = [
  ['0.12.7', /Context Compaction/i],
  ['0.35.0', /extensions system|unifies hooks/i],
  ['0.50.0', /Pi packages/i],
  ['0.79.0', /Project trust/i],
  ['0.84.0', /AGENTS\.override\.md/i]
]

for (const [version, pattern] of milestoneChecks) {
  const release = releases.find((entry) => entry.version === version)
  const text = release?.sections.flatMap((section) => section.items).join(' ') || ''
  if (!pattern.test(text)) errors.push(`milestone evidence is missing for ${version}`)
}

if (errors.length) {
  console.error('Pi release snapshot check failed:')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(
  `Pi release snapshot check passed: ${releases.length} versions, ` +
  `${releases.at(-1).version} → ${releases[0].version}, verified ${meta.verifiedAt}`
)

function compareVersions(left, right) {
  const parse = (version) => version.split(/[.+-]/).slice(0, 3).map(Number)
  const a = parse(left)
  const b = parse(right)
  for (let index = 0; index < 3; index += 1) {
    if (a[index] !== b[index]) return a[index] - b[index]
  }
  return 0
}

function fail(message) {
  console.error(`Pi release snapshot check failed: ${message}`)
  process.exit(1)
}
