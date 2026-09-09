import { defineConfig } from 'vitepress'

const siteName = 'Pi 学习蓝皮书'
const siteUrl = 'https://pi.xiaomovps.com'
const siteDescription = '面向初学者的非官方 Pi 学习路径：从安装、第一次任务到搭出自己的 Agent。'

export default defineConfig({
  lang: 'zh-CN',
  title: siteName,
  description: siteDescription,
  cleanUrls: true,
  sitemap: {
    hostname: siteUrl
  },
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#f4f1e9' }],
    ['meta', { name: 'author', content: '小墨' }],
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: siteName }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['link', { rel: 'icon', href: '/brand-mark.svg', type: 'image/svg+xml' }],
    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteName,
        url: siteUrl,
        description: siteDescription,
        inLanguage: 'zh-CN',
        author: {
          '@type': 'Person',
          name: '小墨',
          url: 'https://xiaomovps.com/'
        }
      })
    ]
  ],
  transformPageData(pageData) {
    const pagePath = pageData.relativePath
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '')
    const canonicalUrl = new URL(pagePath, `${siteUrl}/`).href
    const pageTitle = pageData.relativePath === 'index.md'
      ? siteName
      : `${pageData.title} | ${siteName}`
    const pageDescription = pageData.frontmatter.description || siteDescription

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:title', content: pageTitle }],
      ['meta', { property: 'og:description', content: pageDescription }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { name: 'twitter:card', content: 'summary' }],
      ['meta', { name: 'twitter:title', content: pageTitle }],
      ['meta', { name: 'twitter:description', content: pageDescription }]
    )
  },
  themeConfig: {
    logo: '/brand-mark.svg',
    siteTitle: 'PI BLUEBOOK',
    nav: [
      { text: '首页', link: '/' },
      { text: '蓝皮书', link: '/guide/', activeMatch: '^/guide/' },
      { text: '插件推荐', link: '/plugins/', activeMatch: '^/plugins/' },
      { text: '实操', link: '/cases/', activeMatch: '^/cases/' },
      { text: '参考手册', link: '/reference/', activeMatch: '^/(reference|translations)/' },
      { text: '小墨札记', link: '/journey/', activeMatch: '^/(journey|tweets)/' },
      { text: 'GitHub', link: 'https://github.com/xiaomoBoy/pi-bluebook' },
      { text: '联系合作', link: 'https://xiaomovps.com/' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '蓝皮书',
          items: [
            { text: '完整学习目录', link: '/guide/' },
            { text: '序章 · Pi 作者 Mario Zechner', link: '/guide/mario-zechner' }
          ]
        },
        {
          text: '模块一 · 安装与基础设置',
          items: [
            { text: '1. 安装前检查', link: '/guide/before-install' },
            { text: '2. 安装并启动 Pi', link: '/guide/install-pi' },
            { text: 'Windows 中文安装路径', link: '/guide/windows-setup' },
            { text: '3. 登录与模型设置', link: '/guide/connect-model' },
            { text: '4. 从练习目录开始', link: '/guide/ready-to-work' },
            { text: '维护 · 更新、退出与卸载', link: '/guide/lifecycle-management' }
          ]
        },
        {
          text: '模块二 · 完成真实任务',
          items: [
            { text: '5. 第一次任务', link: '/guide/first-task' },
            { text: '6. 文件与工作目录', link: '/guide/files-and-context' },
            { text: '7. 会话的保存与续写', link: '/guide/sessions' }
          ]
        },
        {
          text: '模块三 · 长任务与上下文',
          items: [
            { text: '8. 上下文与压缩', link: '/guide/context-and-compaction' },
            { text: '9. 提示缓存入门', link: '/guide/prompt-caching' }
          ]
        },
        {
          text: '模块四 · 扩展自己的 Pi',
          items: [
            { text: '10. Skill、Extension 与 Package', link: '/guide/skills-extensions-packages' },
            { text: '11. Extension 的需求与验收', link: '/guide/first-extension' },
            { text: '12. 子 Agent 如何分工', link: '/guide/subagents' }
          ]
        },
        {
          text: '模块五 · 稳定工作流',
          items: [
            { text: '13. 长时间任务与 VPS', link: '/guide/vps-and-long-running' },
            { text: '14. 权限、隔离与验收', link: '/guide/safety' }
          ]
        }
      ],
      '/cases/': [
        {
          text: '实操案例',
          items: [
            { text: '案例库与使用方法', link: '/cases/' },
            { text: 'CASE 01 · 会议记录行动清单', link: '/cases/meeting-notes' },
            { text: 'CASE 02 · 第一个 Skill', link: '/cases/first-skill' },
            { text: 'CASE 03 · 最小 Extension', link: '/cases/first-extension' },
            { text: 'CASE 04 · 两路独立审阅', link: '/cases/independent-review' },
            { text: 'CASE 05 · 从检查点恢复', link: '/cases/checkpoint-recovery' },
            { text: 'CASE 06 · 任务前安全审阅', link: '/cases/safe-review' }
          ]
        },
        {
          text: '回到课程',
          items: [{ text: '蓝皮书完整目录', link: '/guide/' }]
        }
      ],
      '/plugins/': [
        {
          text: '插件推荐',
          items: [
            { text: '推荐总览与选择方法', link: '/plugins/' },
            { text: 'Skill、Extension 与 Package', link: '/guide/skills-extensions-packages' },
            { text: '安装后生命周期管理', link: '/guide/lifecycle-management' },
            { text: '权限、隔离与验收', link: '/guide/safety' }
          ]
        },
        {
          text: '原始记录',
          items: [{ text: 'Skill 与 Extension 推文', link: '/tweets/04-skills-extensions' }]
        }
      ],
      '/reference/': [
        {
          text: '参考手册',
          items: [{ text: '主题索引', link: '/reference/' }]
        },
        {
          text: '核心机制',
          items: [
            { text: '文件与工作目录', link: '/guide/files-and-context' },
            { text: 'Session 与续写', link: '/guide/sessions' },
            { text: '上下文与压缩', link: '/guide/context-and-compaction' },
            { text: '提示缓存', link: '/guide/prompt-caching' }
          ]
        },
        {
          text: '能力与边界',
          items: [
            { text: 'Skill、Extension 与 Package', link: '/guide/skills-extensions-packages' },
            { text: '子 Agent', link: '/guide/subagents' },
            { text: '权限、隔离与验收', link: '/guide/safety' }
          ]
        },
        {
          text: 'Earendil 官方授权译文',
          items: [{ text: '授权译文目录', link: '/translations/' }]
        }
      ],
      '/translations/': [
        {
          text: 'Earendil 官方授权译文',
          items: [
            { text: '授权译文目录', link: '/translations/' },
            { text: '无法随身带走的会话', link: '/translations/session-portability' },
            { text: 'Pi 中的压缩机制', link: '/translations/compaction-in-pi' },
            { text: 'Agent 中的提示缓存', link: '/translations/prompt-caching' }
          ]
        },
        {
          text: '返回参考手册',
          items: [{ text: '主题索引', link: '/reference/' }]
        }
      ],
      '/journey/': [
        {
          text: '小墨札记',
          items: [
            { text: '写在蓝皮书之外', link: '/journey/' },
            { text: '98 条推文档案', link: '/tweets/' }
          ]
        },
        {
          text: '学习阶段',
          items: [
            { text: '1. 从好奇开始认识 Pi', link: '/tweets/01-meet-pi' },
            { text: '2. 先把第一个任务做完', link: '/tweets/02-first-tasks' },
            { text: '3. 理解 Session 与上下文', link: '/tweets/03-sessions-context' },
            { text: '4. Skill 与 Extension', link: '/tweets/04-skills-extensions' },
            { text: '5. 让子 Agent 学会分工', link: '/tweets/05-subagents-research' },
            { text: '6. 把 Pi 变成长期工作流', link: '/tweets/06-long-running' }
          ]
        }
      ],
      '/tweets/': [
        {
          text: '小墨札记',
          items: [
            { text: '写在蓝皮书之外', link: '/journey/' },
            { text: '98 条推文档案', link: '/tweets/' },
            { text: '1. 从好奇开始认识 Pi', link: '/tweets/01-meet-pi' },
            { text: '2. 先把第一个任务做完', link: '/tweets/02-first-tasks' },
            { text: '3. 理解 Session 与上下文', link: '/tweets/03-sessions-context' },
            { text: '4. Skill 与 Extension', link: '/tweets/04-skills-extensions' },
            { text: '5. 让子 Agent 学会分工', link: '/tweets/05-subagents-research' },
            { text: '6. 把 Pi 变成长期工作流', link: '/tweets/06-long-running' }
          ]
        }
      ]
    },
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
      message: '网站与原创内容采用 MIT License · Earendil 授权译文采用 CC BY 4.0',
      copyright: '© 2026 小墨 · 第三方内容归原作者所有'
    }
  }
})
