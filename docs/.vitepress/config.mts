import { defineConfig } from 'vitepress'
import { nav, sidebar } from './config/navigation.mjs'

const siteName = 'Pi 学习蓝皮书'
const siteUrl = 'https://pi.xiaomovps.com'
const siteDescription = '面向中文初学者的非官方 Pi 学习路径：先理解 Pi，再从第一次任务走向可控的 Agent 工作流。'
const homeSeoTitle = 'Pi 学习蓝皮书｜中文初学者 Agent 学习路线'
const ogImageUrl = `${siteUrl}/og-image.png`

const sectionNames: Record<string, string> = {
  cases: '实操案例',
  guide: '蓝皮书主线',
  journey: '小墨札记',
  plugins: '插件推荐',
  reference: '参考手册',
  translations: '授权译文',
  tweets: '推文学习目录'
}

function getBreadcrumbList(pagePath: string, pageTitle: string, canonicalUrl: string) {
  const cleanPath = pagePath.replace(/\/$/, '')
  if (!cleanPath) return null

  const [section] = cleanPath.split('/')
  const sectionName = sectionNames[section]
  if (!sectionName) return null

  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: '首页',
      item: `${siteUrl}/`
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: sectionName,
      item: `${siteUrl}/${section}/`
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

export default defineConfig({
  lang: 'zh-CN',
  title: siteName,
  description: siteDescription,
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
    ['meta', { property: 'og:site_name', content: siteName }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['link', { rel: 'icon', href: '/brand-mark.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'icon', href: '/favicon-48.png', type: 'image/png', sizes: '48x48' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }]
  ],
  transformPageData(pageData) {
    const pagePath = pageData.relativePath
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '')
    const canonicalUrl = new URL(pagePath, `${siteUrl}/`).href
    const isHome = pageData.relativePath === 'index.md'
    const isSectionIndex = isHome || pageData.relativePath.endsWith('/index.md')
    const pageTitle = isHome
      ? homeSeoTitle
      : `${pageData.title} | ${siteName}`
    const pageDescription = pageData.frontmatter.description || siteDescription
    const breadcrumb = getBreadcrumbList(pagePath, pageData.title, canonicalUrl)
    const structuredData = isHome
      ? {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          '@id': `${siteUrl}/#website`,
          name: siteName,
          alternateName: 'PI BLUEBOOK',
          url: `${siteUrl}/`,
          description: pageDescription,
          inLanguage: 'zh-CN',
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
              inLanguage: 'zh-CN',
              ...(breadcrumb ? { breadcrumb: { '@id': breadcrumb['@id'] } } : {})
            },
            ...(breadcrumb ? [breadcrumb] : [])
          ]
        }

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:type', content: isSectionIndex ? 'website' : 'article' }],
      ['meta', { property: 'og:title', content: pageTitle }],
      ['meta', { property: 'og:description', content: pageDescription }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { property: 'og:image', content: ogImageUrl }],
      ['meta', { property: 'og:image:type', content: 'image/png' }],
      ['meta', { property: 'og:image:width', content: '1200' }],
      ['meta', { property: 'og:image:height', content: '630' }],
      ['meta', { property: 'og:image:alt', content: 'Pi 学习蓝皮书：从第一次可验收的任务走向可控的 Agent 工作流' }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: pageTitle }],
      ['meta', { name: 'twitter:description', content: pageDescription }],
      ['meta', { name: 'twitter:image', content: ogImageUrl }],
      ['meta', { name: 'twitter:image:alt', content: 'Pi 学习蓝皮书：从第一次可验收的任务走向可控的 Agent 工作流' }],
      ['script', { type: 'application/ld+json' }, JSON.stringify(structuredData)]
    )
  },
  themeConfig: {
    logo: '/brand-mark.svg',
    siteTitle: 'PI BLUEBOOK',
    nav,
    sidebar,
    outline: {
      level: [2, 3],
      label: '本页内容'
    },
    sidebarMenuLabel: '学习目录',
    darkModeSwitchLabel: '外观模式',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到暗色模式',
    returnToTopLabel: '返回顶部',
    skipToContentLabel: '跳转到正文',
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索内容'
          },
          modal: {
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
    footer: {
      message: '<span class="pi-footer-brand">PI BLUEBOOK</span><span class="pi-footer-links"><a href="/guide/">学习目录</a><a href="/cases/">实操案例</a><a href="/reference/">参考手册</a><a href="/translations/">授权译文</a><a href="https://github.com/xiaomoBoy/pi-bluebook">GitHub</a></span>',
      copyright: '<span>© 2026 小墨</span><span>网站与原创内容采用 MIT License</span><span>Earendil 授权译文采用 CC BY 4.0 · 第三方内容归原作者所有</span>'
    }
  }
})
