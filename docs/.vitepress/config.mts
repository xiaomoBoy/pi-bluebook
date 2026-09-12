import { defineConfig } from 'vitepress'
import { nav, sidebar } from './config/navigation.mjs'
import { navTW, sidebarTW } from './config/navigation.zh-tw.mjs'
import { miniSearch } from './config/search.mjs'

const siteUrl = 'https://pi.xiaomovps.com'
const ogImageUrl = `${siteUrl}/og-image.png`

const localeContent = {
  root: {
    prefix: '',
    label: '简体中文',
    lang: 'zh-CN',
    ogLocale: 'zh_CN',
    alternateLocale: 'zh_Hant_TW',
    siteName: 'Pi Coding Agent 学习蓝皮书',
    siteDescription: '面向中文初学者的非官方 Pi Coding Agent 学习路径：从安装和第一次可验收任务开始，逐步掌握可控的 Agent 工作流。',
    homeSeoTitle: 'Pi Coding Agent 中文教程｜从入门到可控 Agent 工作流',
    homeLabel: '首页',
    sectionNames: {
      cases: '实操案例',
      guide: '蓝皮书主线',
      journey: '小墨札记',
      plugins: '插件推荐',
      reference: '参考手册',
      translations: '授权译文',
      tweets: '推文学习目录'
    }
  },
  'zh-TW': {
    prefix: 'zh-TW/',
    label: '繁體中文',
    lang: 'zh-Hant-TW',
    ogLocale: 'zh_Hant_TW',
    alternateLocale: 'zh_CN',
    siteName: 'Pi Coding Agent 學習藍皮書',
    siteDescription: '面向中文初學者的非官方 Pi Coding Agent 學習路徑：從安裝和第一次可驗收任務開始，逐步掌握可控的 Agent 工作流。',
    homeSeoTitle: 'Pi Coding Agent 中文教學｜從入門到可控 Agent 工作流',
    homeLabel: '首頁',
    sectionNames: {
      cases: '實作案例',
      guide: '藍皮書主線',
      journey: '小墨札記',
      plugins: '外掛程式',
      reference: '參考手冊',
      translations: '授權譯文',
      tweets: '推文學習目錄'
    }
  }
} as const

function getBreadcrumbList(
  pagePath: string,
  pageTitle: string,
  canonicalUrl: string,
  locale: (typeof localeContent)[keyof typeof localeContent]
) {
  const cleanPath = pagePath.replace(/\/$/, '')
  if (!cleanPath) return null

  const [section] = cleanPath.split('/')
  const sectionName = locale.sectionNames[section as keyof typeof locale.sectionNames]
  if (!sectionName) return null

  const localeRoot = `${siteUrl}/${locale.prefix}`
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: locale.homeLabel,
      item: localeRoot
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: sectionName,
      item: `${localeRoot}${section}/`
    }
  ]

  if (cleanPath !== section) {
    items.push({
      '@type': 'ListItem',
      position: 3,
      name: pageTitle,
      item: canonicalUrl
    })
  }

  return {
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumb`,
    itemListElement: items
  }
}

const sharedThemeConfig = {
  logo: '/brand-mark.svg',
  siteTitle: 'PI BLUEBOOK',
  outline: {
    level: [2, 3] as [number, number]
  },
  docFooter: {
    prev: '上一篇',
    next: '下一篇'
  },
  lastUpdated: {
    formatOptions: {
      dateStyle: 'medium' as const,
      timeStyle: 'short' as const
    }
  },
  search: {
    provider: 'local' as const,
    options: {
      miniSearch
    }
  }
}

const footerCN = {
  message: '<span class="pi-footer-brand">PI BLUEBOOK</span><span class="pi-footer-links"><a href="/guide/">学习目录</a><a href="/cases/">实操案例</a><a href="/reference/">参考手册</a><a href="/translations/">授权译文</a><a href="https://github.com/xiaomoBoy/pi-bluebook">GitHub</a></span>',
  copyright: '<span>© 2026 小墨</span><span>网站与原创内容采用 MIT License</span><span>Earendil 授权译文采用 CC BY 4.0 · 第三方内容归原作者所有</span>'
}

const footerTW = {
  message: '<span class="pi-footer-brand">PI BLUEBOOK</span><span class="pi-footer-links"><a href="/zh-TW/guide/">學習目錄</a><a href="/zh-TW/cases/">實作案例</a><a href="/zh-TW/reference/">參考手冊</a><a href="/zh-TW/translations/">授權譯文</a><a href="https://github.com/xiaomoBoy/pi-bluebook">GitHub</a></span>',
  copyright: '<span>© 2026 小墨</span><span>網站與原創內容採用 MIT License</span><span>Earendil 授權譯文採用 CC BY 4.0 · 第三方內容歸原作者所有</span>'
}

export default defineConfig({
  lang: 'zh-CN',
  title: localeContent.root.siteName,
  description: localeContent.root.siteDescription,
  cleanUrls: true,
  srcExclude: ['public/**/*.md'],
  sitemap: {
    hostname: siteUrl
  },
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#f4f1e9' }],
    ['meta', { name: 'author', content: '小墨' }],
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large' }],
    ['link', { rel: 'icon', href: '/brand-mark.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'icon', href: '/favicon-48.png', type: 'image/png', sizes: '48x48' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }]
  ],
  locales: {
    root: {
      label: localeContent.root.label,
      lang: localeContent.root.lang,
      title: localeContent.root.siteName,
      description: localeContent.root.siteDescription,
      themeConfig: {
        ...sharedThemeConfig,
        nav,
        sidebar,
        outline: {
          ...sharedThemeConfig.outline,
          label: '本页内容'
        },
        sidebarMenuLabel: '学习目录',
        darkModeSwitchLabel: '外观模式',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到暗色模式',
        returnToTopLabel: '返回顶部',
        skipToContentLabel: '跳转到正文',
        lastUpdated: {
          ...sharedThemeConfig.lastUpdated,
          text: '最后更新'
        },
        search: {
          ...sharedThemeConfig.search,
          options: {
            ...sharedThemeConfig.search.options,
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索内容'
              },
              modal: {
                displayDetails: '显示详细内容',
                backButtonTitle: '关闭搜索',
                noResultsText: '没有找到相关内容',
                resetButtonTitle: '清除查询',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        },
        footer: footerCN
      }
    },
    'zh-TW': {
      label: localeContent['zh-TW'].label,
      lang: localeContent['zh-TW'].lang,
      title: localeContent['zh-TW'].siteName,
      description: localeContent['zh-TW'].siteDescription,
      themeConfig: {
        ...sharedThemeConfig,
        nav: navTW,
        sidebar: sidebarTW,
        outline: {
          ...sharedThemeConfig.outline,
          label: '本頁內容'
        },
        sidebarMenuLabel: '學習目錄',
        darkModeSwitchLabel: '外觀模式',
        lightModeSwitchTitle: '切換到淺色模式',
        darkModeSwitchTitle: '切換到深色模式',
        returnToTopLabel: '返回頂部',
        skipToContentLabel: '跳到正文',
        lastUpdated: {
          ...sharedThemeConfig.lastUpdated,
          text: '最後更新'
        },
        search: {
          ...sharedThemeConfig.search,
          options: {
            ...sharedThemeConfig.search.options,
            translations: {
              button: {
                buttonText: '搜尋',
                buttonAriaLabel: '搜尋內容'
              },
              modal: {
                displayDetails: '顯示詳細內容',
                backButtonTitle: '關閉搜尋',
                noResultsText: '沒有找到相關內容',
                resetButtonTitle: '清除查詢',
                footer: {
                  selectText: '選擇',
                  navigateText: '切換',
                  closeText: '關閉'
                }
              }
            }
          }
        },
        footer: footerTW
      }
    }
  },
  transformPageData(pageData) {
    const isTW = pageData.relativePath.startsWith('zh-TW/')
    const locale = isTW ? localeContent['zh-TW'] : localeContent.root
    const localePath = isTW
      ? pageData.relativePath.slice(localeContent['zh-TW'].prefix.length)
      : pageData.relativePath
    const pagePath = localePath
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '')
    const canonicalUrl = new URL(`${locale.prefix}${pagePath}`, `${siteUrl}/`).href
    const counterpartUrl = new URL(
      isTW ? pagePath : `${localeContent['zh-TW'].prefix}${pagePath}`,
      `${siteUrl}/`
    ).href
    const isHome = localePath === 'index.md'
    const isSectionIndex = isHome || localePath.endsWith('/index.md')
    const pageTitle = isHome
      ? locale.homeSeoTitle
      : `${pageData.title} | ${locale.siteName}`
    const pageDescription = pageData.frontmatter.description || locale.siteDescription
    const breadcrumb = getBreadcrumbList(pagePath, pageData.title, canonicalUrl, locale)
    const structuredData = isHome
      ? {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          '@id': `${canonicalUrl}#website`,
          name: locale.siteName,
          alternateName: 'PI BLUEBOOK',
          url: canonicalUrl,
          description: pageDescription,
          inLanguage: locale.lang,
          author: {
            '@type': 'Person',
            name: '小墨',
            url: 'https://xiaomovps.com/'
          }
        }
      : {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebPage',
              '@id': canonicalUrl,
              url: canonicalUrl,
              name: pageData.title,
              description: pageDescription,
              inLanguage: locale.lang,
              ...(breadcrumb ? { breadcrumb: { '@id': breadcrumb['@id'] } } : {})
            },
            ...(breadcrumb ? [breadcrumb] : [])
          ]
        }

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['link', { rel: 'alternate', hreflang: locale.lang, href: canonicalUrl }],
      ['link', { rel: 'alternate', hreflang: isTW ? 'zh-CN' : 'zh-Hant-TW', href: counterpartUrl }],
      ['link', { rel: 'alternate', hreflang: 'x-default', href: isTW ? counterpartUrl : canonicalUrl }],
      ['meta', { property: 'og:type', content: isSectionIndex ? 'website' : 'article' }],
      ['meta', { property: 'og:site_name', content: locale.siteName }],
      ['meta', { property: 'og:locale', content: locale.ogLocale }],
      ['meta', { property: 'og:locale:alternate', content: locale.alternateLocale }],
      ['meta', { property: 'og:title', content: pageTitle }],
      ['meta', { property: 'og:description', content: pageDescription }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { property: 'og:image', content: ogImageUrl }],
      ['meta', { property: 'og:image:type', content: 'image/png' }],
      ['meta', { property: 'og:image:width', content: '1200' }],
      ['meta', { property: 'og:image:height', content: '630' }],
      ['meta', { property: 'og:image:alt', content: isTW ? 'Pi 學習藍皮書：從第一次可驗收的任務走向可控的 Agent 工作流' : 'Pi 学习蓝皮书：从第一次可验收的任务走向可控的 Agent 工作流' }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: pageTitle }],
      ['meta', { name: 'twitter:description', content: pageDescription }],
      ['meta', { name: 'twitter:image', content: ogImageUrl }],
      ['meta', { name: 'twitter:image:alt', content: isTW ? 'Pi 學習藍皮書：從第一次可驗收的任務走向可控的 Agent 工作流' : 'Pi 学习蓝皮书：从第一次可验收的任务走向可控的 Agent 工作流' }],
      ['script', { type: 'application/ld+json' }, JSON.stringify(structuredData)]
    )
  },
  themeConfig: {
    // VitePress enables the search index at build time from the root config.
    // Locale configs above provide the translated UI labels.
    search: sharedThemeConfig.search,
    logo: '/brand-mark.svg',
    siteTitle: 'PI BLUEBOOK'
  }
})
