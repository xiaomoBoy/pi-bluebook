import DefaultTheme from 'vitepress/theme'
import { defineAsyncComponent, nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vitepress'
import './custom.css'

const entrySelector = '.tweet-entry:not(.tweet-entry-featured)'
const entriesPerPage = 5

const tweetStringsCN = {
  toolsLabel: '本阶段文章阅读工具',
  titlePrefix: '本阶段文章',
  unit: '篇',
  perPageNote: '每页完整显示',
  directorySummary: '展开标题目录，直接跳到某一篇',
  paginationLabel: '文章分页',
  paginationLabelBottom: '文章分页（页尾）',
  previous: '上一页',
  next: '下一页',
  pageAria: '第',
  pageUnit: '页',
  untitled: '未命名记录'
}

const tweetStringsTW = {
  toolsLabel: '本階段文章閱讀工具',
  titlePrefix: '本階段文章',
  unit: '篇',
  perPageNote: '每頁完整顯示',
  directorySummary: '展開標題目錄，直接跳到某一篇',
  paginationLabel: '文章分頁',
  paginationLabelBottom: '文章分頁（頁尾）',
  previous: '上一頁',
  next: '下一頁',
  pageAria: '第',
  pageUnit: '頁',
  untitled: '未命名紀錄'
}

function hashTarget() {
  try {
    return document.getElementById(decodeURIComponent(window.location.hash.slice(1)))
  } catch {
    // A malformed URL fragment must not prevent the archive from rendering.
    return null
  }
}

let activeRenderPage: ((page: number, shouldScroll: boolean) => void) | null = null

function openHashTarget(shouldScroll = false) {
  if (!window.location.hash) return

  const target = hashTarget()
  const entry = target?.closest<HTMLElement>('.tweet-entry')
  if (!entry) return

  const page = entry.dataset.archivePage
  if (page !== undefined && activeRenderPage) {
    activeRenderPage(Number(page), false)
  }

  window.requestAnimationFrame(() => {
    if (shouldScroll) entry.scrollIntoView({ block: 'start' })
  })
}

function enhanceTweetArchive() {
  document.querySelectorAll('.tweet-archive-tools, .tweet-pagination').forEach((el) => el.remove())
  const entries = Array.from(document.querySelectorAll<HTMLElement>(entrySelector))
  if (!entries.length) {
    activeRenderPage = null
    return
  }

  const strings = window.location.pathname.startsWith('/zh-TW/') ? tweetStringsTW : tweetStringsCN

  const pageCount = Math.ceil(entries.length / entriesPerPage)
  let currentPage = 0

  for (const [index, entry] of entries.entries()) {
    entry.classList.remove('is-collapsed', 'is-expanded')
    entry.querySelector('.tweet-toggle')?.remove()
    entry.dataset.archivePage = String(Math.floor(index / entriesPerPage))
  }

  const tools = document.createElement('section')
  tools.className = 'tweet-archive-tools'
  tools.setAttribute('aria-label', strings.toolsLabel)

  const heading = document.createElement('div')
  heading.className = 'tweet-archive-tools__heading'

  const title = document.createElement('strong')
  title.textContent = `${strings.titlePrefix} · ${entries.length} ${strings.unit}`

  const note = document.createElement('span')
  note.className = 'tweet-archive-tools__note'
  note.textContent = `${strings.perPageNote} ${entriesPerPage} ${strings.unit}`

  heading.append(title, note)

  const directory = document.createElement('details')
  directory.className = 'tweet-quick-index'

  const summary = document.createElement('summary')
  summary.textContent = strings.directorySummary

  const list = document.createElement('ol')
  for (const entry of entries) {
    const item = document.createElement('li')
    const link = document.createElement('a')
    const entryTitle = entry.querySelector('h2')?.textContent?.trim() || strings.untitled
    link.href = `#${entry.id}`
    link.textContent = entryTitle
    link.addEventListener('click', () => {
      const targetPage = Number(entry.dataset.archivePage || 0)
      renderPage(targetPage, false)
      directory.open = false
      // VitePress handles the click first (capture phase) and measures before
      // the page switch and the directory collapse; scroll again afterwards.
      window.requestAnimationFrame(() => entry.scrollIntoView({ block: 'start' }))
    })
    item.append(link)
    list.append(item)
  }

  directory.append(summary, list)

  function createPagination(position: 'top' | 'bottom') {
    const pagination = document.createElement('nav')
    pagination.className = `tweet-pagination tweet-pagination--${position}`
    pagination.setAttribute(
      'aria-label',
      position === 'top' ? strings.paginationLabel : strings.paginationLabelBottom
    )

    const previous = document.createElement('button')
    previous.type = 'button'
    previous.dataset.direction = 'previous'
    previous.textContent = strings.previous
    previous.addEventListener('click', () => renderPage(currentPage - 1, true))

    const pages = document.createElement('div')
    pages.className = 'tweet-pagination__pages'

    for (let page = 0; page < pageCount; page += 1) {
      const pageButton = document.createElement('button')
      pageButton.type = 'button'
      pageButton.dataset.page = String(page)
      pageButton.textContent = String(page + 1)
      pageButton.setAttribute('aria-label', `${strings.pageAria} ${page + 1} ${strings.pageUnit}`)
      pageButton.addEventListener('click', () => renderPage(page, true))
      pages.append(pageButton)
    }

    const next = document.createElement('button')
    next.type = 'button'
    next.dataset.direction = 'next'
    next.textContent = strings.next
    next.addEventListener('click', () => renderPage(currentPage + 1, true))

    pagination.append(previous, pages, next)
    return pagination
  }

  const topPagination = createPagination('top')
  const bottomPagination = createPagination('bottom')

  function renderPage(page: number, shouldScroll: boolean) {
    currentPage = Math.max(0, Math.min(page, pageCount - 1))

    for (const [index, entry] of entries.entries()) {
      entry.classList.toggle(
        'is-paged-out',
        Math.floor(index / entriesPerPage) !== currentPage
      )
    }

    for (const pagination of document.querySelectorAll<HTMLElement>('.tweet-pagination')) {
      const previous = pagination.querySelector<HTMLButtonElement>('[data-direction="previous"]')
      const next = pagination.querySelector<HTMLButtonElement>('[data-direction="next"]')
      if (previous) previous.disabled = currentPage === 0
      if (next) next.disabled = currentPage === pageCount - 1

      for (const pageButton of pagination.querySelectorAll<HTMLButtonElement>('[data-page]')) {
        const isCurrent = Number(pageButton.dataset.page) === currentPage
        pageButton.classList.toggle('is-current', isCurrent)
        if (isCurrent) {
          pageButton.setAttribute('aria-current', 'page')
        } else {
          pageButton.removeAttribute('aria-current')
        }
      }
    }

    if (shouldScroll) {
      window.requestAnimationFrame(() => {
        tools.scrollIntoView({ block: 'start', behavior: 'smooth' })
      })
    }
  }

  activeRenderPage = renderPage

  tools.append(heading, directory, topPagination)
  entries[0].insertAdjacentElement('beforebegin', tools)
  entries.at(-1)?.insertAdjacentElement('afterend', bottomPagination)

  const initialEntry = hashTarget()?.closest<HTMLElement>('.tweet-entry')
  const initialPage = initialEntry ? Number(initialEntry.dataset.archivePage || 0) : 0
  renderPage(initialPage, false)
  openHashTarget(true)
}

function scheduleEnhancement() {
  nextTick(() => window.requestAnimationFrame(enhanceTweetArchive))
}

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component(
      'PiReleaseExplorer',
      defineAsyncComponent(() => import('./components/PiReleaseExplorer.vue'))
    )
    app.component(
      'PiCodemodeReplay',
      defineAsyncComponent(() => import('./components/PiCodemodeReplay.vue'))
    )
    if (typeof window === 'undefined') return
    // VitePress also decodes the fragment while rendering language links.
    // Drop an invalid incoming fragment before those components render.
    const normalizeHash = () => {
      try {
        decodeURIComponent(window.location.hash)
      } catch {
        window.history.replaceState(
          window.history.state, '', window.location.pathname + window.location.search
        )
      }
    }
    normalizeHash()
    window.addEventListener('hashchange', normalizeHash)
  },
  setup() {
    const route = useRoute()
    const onHashChange = () => openHashTarget(true)

    onMounted(() => {
      scheduleEnhancement()
      watch(() => route.path, scheduleEnhancement)
      window.addEventListener('hashchange', onHashChange)
    })
    onUnmounted(() => {
      window.removeEventListener('hashchange', onHashChange)
      activeRenderPage = null
    })
  }
}
