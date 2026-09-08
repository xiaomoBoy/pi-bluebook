import DefaultTheme from 'vitepress/theme'
import { nextTick, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'
import './custom.css'

const entrySelector = '.tweet-entry:not(.tweet-entry-featured)'

function setEntryState(entry: HTMLElement, expanded: boolean) {
  entry.classList.toggle('is-collapsed', !expanded)
  entry.classList.toggle('is-expanded', expanded)

  const button = entry.querySelector<HTMLButtonElement>('.tweet-toggle')
  if (!button) return

  const entryTitle = entry.querySelector('h2')?.textContent?.trim() || '本篇记录'
  button.setAttribute('aria-expanded', String(expanded))
  button.setAttribute('aria-label', `${expanded ? '收起' : '展开'}原文：${entryTitle}`)
  button.textContent = expanded ? '收起原文' : '展开原文'
}

function openHashTarget(shouldScroll = false) {
  if (!window.location.hash) return

  const targetId = decodeURIComponent(window.location.hash.slice(1))
  const target = document.getElementById(targetId)
  const entry = target?.closest<HTMLElement>('.tweet-entry')
  if (!entry) return

  setEntryState(entry, true)
  if (shouldScroll) {
    window.requestAnimationFrame(() => entry.scrollIntoView({ block: 'start' }))
  }
}

function enhanceTweetArchive() {
  const entries = Array.from(document.querySelectorAll<HTMLElement>(entrySelector))
  if (!entries.length) return

  for (const entry of entries) {
    if (entry.dataset.archiveReady === 'true') continue

    const heading = entry.querySelector('h2')
    const meta = entry.querySelector('.tweet-meta')
    if (!heading || !meta) continue

    entry.dataset.archiveReady = 'true'
    entry.classList.add('is-collapsed')

    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'tweet-toggle'
    button.textContent = '展开原文'
    button.setAttribute('aria-expanded', 'false')
    button.setAttribute('aria-label', `展开原文：${heading.textContent?.trim() || '本篇记录'}`)
    button.addEventListener('click', () => {
      setEntryState(entry, entry.classList.contains('is-collapsed'))
    })
    meta.insertAdjacentElement('afterend', button)
  }

  if (!document.querySelector('.tweet-archive-tools')) {
    const tools = document.createElement('section')
    tools.className = 'tweet-archive-tools'
    tools.setAttribute('aria-label', '本阶段文章阅读工具')

    const heading = document.createElement('div')
    heading.className = 'tweet-archive-tools__heading'

    const title = document.createElement('strong')
    title.textContent = `本阶段文章 · ${entries.length} 篇`

    const actions = document.createElement('div')
    actions.className = 'tweet-archive-actions'

    const expandAll = document.createElement('button')
    expandAll.type = 'button'
    expandAll.textContent = '全部展开'
    expandAll.addEventListener('click', () => entries.forEach((entry) => setEntryState(entry, true)))

    const collapseAll = document.createElement('button')
    collapseAll.type = 'button'
    collapseAll.textContent = '全部收起'
    collapseAll.addEventListener('click', () => entries.forEach((entry) => setEntryState(entry, false)))

    actions.append(expandAll, collapseAll)
    heading.append(title, actions)

    const directory = document.createElement('details')
    directory.className = 'tweet-quick-index'

    const summary = document.createElement('summary')
    summary.textContent = '展开标题目录，直接跳到某一篇'

    const list = document.createElement('ol')
    for (const entry of entries) {
      const item = document.createElement('li')
      const link = document.createElement('a')
      const entryTitle = entry.querySelector('h2')?.textContent?.trim() || '未命名记录'
      link.href = `#${entry.id}`
      link.textContent = entryTitle
      link.addEventListener('click', () => {
        setEntryState(entry, true)
        directory.open = false
      })
      item.append(link)
      list.append(item)
    }

    directory.append(summary, list)
    tools.append(heading, directory)
    entries[0].insertAdjacentElement('beforebegin', tools)
  }

  openHashTarget(true)
}

function scheduleEnhancement() {
  nextTick(() => window.requestAnimationFrame(enhanceTweetArchive))
}

export default {
  extends: DefaultTheme,
  setup() {
    const route = useRoute()

    onMounted(() => {
      scheduleEnhancement()
      watch(() => route.path, scheduleEnhancement)
      window.addEventListener('hashchange', () => openHashTarget())
    })
  }
}
