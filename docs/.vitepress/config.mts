import { defineConfig } from 'vitepress'

const siteUrl = 'https://pi.xiaomovps.com'
const ogImageUrl = `${siteUrl}/og-image.png`

// 簡中（預設 locale，原站行為不變）
const siteName = 'Pi 学习蓝皮书'
const siteDescription = '面向中文初学者的非官方 Pi 学习路径：先理解 Pi，再从第一次任务走向可控的 Agent 工作流。'
const homeSeoTitle = 'Pi 学习蓝皮书｜中文初学者 Agent 学习路线'

// 繁中（追加版本，/zh-TW/）
const siteNameTW = 'Pi 學習藍皮書'
const siteDescriptionTW = '面向中文初學者的非官方 Pi 學習路徑：先理解 Pi，再從第一次任務走向可控的 Agent 工作流。'
const homeSeoTitleTW = 'Pi 學習藍皮書｜中文初學者 Agent 學習路線'

const sectionNames: Record<string, string> = {
  cases: '实操案例',
  guide: '蓝皮书主线',
  journey: '小墨札记',
  plugins: '插件推荐',
  reference: '参考手册',
  translations: '授权译文',
  tweets: '推文学习目录'
}

const sectionNamesTW: Record<string, string> = {
  cases: '實作案例',
  guide: '藍皮書主線',
  journey: '小墨札記',
  plugins: '外掛程式',
  reference: '參考手冊',
  translations: '授權譯文',
  tweets: '推文學習目錄'
}

function getBreadcrumbList(
  pagePath: string,
  pageTitle: string,
  canonicalUrl: string,
  names: Record<string, string>
) {
  const cleanPath = pagePath.replace(/\/$/, '')
  if (!cleanPath) return null

  const [section] = cleanPath.split('/')
  const sectionName = names[section]
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

function getBreadcrumbListTW(
  pagePath: string,
  pageTitle: string,
  canonicalUrl: string,
  names: Record<string, string>
) {
  const cleanPath = pagePath.replace(/\/$/, '')
  if (!cleanPath) return null

  const [section] = cleanPath.split('/')
  const sectionName = names[section]
  if (!sectionName) return null

  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: '首頁',
      item: `${siteUrl}/zh-TW/`
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: sectionName,
      item: `${siteUrl}/zh-TW/${section}/`
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

const searchTextCN = {
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

const searchTextTW = {
  translations: {
    button: {
      buttonText: '搜尋',
      buttonAriaLabel: '搜尋內容'
    },
    modal: {
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

const sidebarCN = {
  '/guide/': [
    {
      text: '蓝皮书',
      items: [
        { text: '完整学习目录', link: '/guide/' },
        { text: '导论 · 为什么读这本书', link: '/guide/introduction' },
        { text: '十条仍然成立的判断', link: '/guide/lasting-principles' },
        { text: '凡例与本版说明', link: '/guide/edition-2026' },
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
        { text: 'CASE 02 · 压缩前后对照', link: '/cases/compaction-before-after' },
        { text: 'CASE 03 · 第一个 Skill', link: '/cases/first-skill' },
        { text: 'CASE 04 · 最小 Extension', link: '/cases/first-extension' },
        { text: 'CASE 05 · 两路独立审阅', link: '/cases/independent-review' },
        { text: 'CASE 06 · 从检查点恢复', link: '/cases/checkpoint-recovery' },
        { text: 'CASE 07 · 任务前安全审阅', link: '/cases/safe-review' }
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
      text: '第一次阅读',
      items: [
        { text: '导论 · 为什么读这本书', link: '/guide/introduction' },
        { text: '十条仍然成立的判断', link: '/guide/lasting-principles' },
        { text: '凡例与本版说明', link: '/guide/edition-2026' }
      ]
    },
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
        { text: 'Agent 中的提示缓存', link: '/translations/prompt-caching' },
        { text: '什么是 Agent Harness？', link: '/translations/what-is-a-harness' },
        { text: '这个 Harness 属于我', link: '/translations/mine-agent-harness' },
        { text: 'Pi：极简而高效', link: '/translations/pi-minimal-performant' },
        { text: 'Pi 与 Lefos 正式发布', link: '/translations/announcing-pi-and-lefos' },
        { text: '关于今日公告的思考', link: '/translations/announcement-reflection' },
        { text: '制高点', link: '/translations/the-high-ground' },
        { text: '邀请你开启一场通信', link: '/translations/invitation' }
      ]
    },
    {
      text: '本版入口',
      items: [
        { text: '导论 · 为什么读这本书', link: '/guide/introduction' },
        { text: '凡例与本版说明', link: '/guide/edition-2026' },
        { text: '参考手册主题索引', link: '/reference/' }
      ]
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
}

const sidebarTW = {
  '/zh-TW/guide/': [
    {
      text: '藍皮書',
      items: [
        { text: '完整學習目錄', link: '/zh-TW/guide/' },
        { text: '導論 · 為什麼讀這本書', link: '/zh-TW/guide/introduction' },
        { text: '十條仍然成立的判斷', link: '/zh-TW/guide/lasting-principles' },
        { text: '凡例與本版說明', link: '/zh-TW/guide/edition-2026' },
        { text: '序章 · Pi 作者 Mario Zechner', link: '/zh-TW/guide/mario-zechner' }
      ]
    },
    {
      text: '模組一 · 安裝與基礎設定',
      items: [
        { text: '1. 安裝前檢查', link: '/zh-TW/guide/before-install' },
        { text: '2. 安裝並啟動 Pi', link: '/zh-TW/guide/install-pi' },
        { text: 'Windows 中文路徑', link: '/zh-TW/guide/windows-setup' },
        { text: '3. 登入與模型設定', link: '/zh-TW/guide/connect-model' },
        { text: '4. 從練習目錄開始', link: '/zh-TW/guide/ready-to-work' },
        { text: '維護 · 更新、退出登入與解除安裝', link: '/zh-TW/guide/lifecycle-management' }
      ]
    },
    {
      text: '模組二 · 完成真實任務',
      items: [
        { text: '5. 第一次任務', link: '/zh-TW/guide/first-task' },
        { text: '6. 檔案與工作目錄', link: '/zh-TW/guide/files-and-context' },
        { text: '7. 工作階段的儲存與續寫', link: '/zh-TW/guide/sessions' }
      ]
    },
    {
      text: '模組三 · 長任務與上下文',
      items: [
        { text: '8. 上下文與壓縮', link: '/zh-TW/guide/context-and-compaction' },
        { text: '9. 提示快取入門', link: '/zh-TW/guide/prompt-caching' }
      ]
    },
    {
      text: '模組四 · 擴充自己的 Pi',
      items: [
        { text: '10. 技能、擴充功能與套件', link: '/zh-TW/guide/skills-extensions-packages' },
        { text: '11. 擴充功能的需求與驗收', link: '/zh-TW/guide/first-extension' },
        { text: '12. 子代理如何分工', link: '/zh-TW/guide/subagents' }
      ]
    },
    {
      text: '模組五 · 穩定工作流',
      items: [
        { text: '13. 長時間任務與 VPS', link: '/zh-TW/guide/vps-and-long-running' },
        { text: '14. 權限、隔離與驗收', link: '/zh-TW/guide/safety' }
      ]
    }
  ],
  '/zh-TW/cases/': [
    {
      text: '實作案例',
      items: [
        { text: '案例庫與使用方法', link: '/zh-TW/cases/' },
        { text: 'CASE 01 · 會議記錄行動清單', link: '/zh-TW/cases/meeting-notes' },
        { text: 'CASE 02 · 壓縮前後對照', link: '/zh-TW/cases/compaction-before-after' },
        { text: 'CASE 03 · 把方法整理成技能', link: '/zh-TW/cases/first-skill' },
        { text: 'CASE 04 · 載入最小擴充功能', link: '/zh-TW/cases/first-extension' },
        { text: 'CASE 05 · 兩路獨立審閱', link: '/zh-TW/cases/independent-review' },
        { text: 'CASE 06 · 從檢查點恢復', link: '/zh-TW/cases/checkpoint-recovery' },
        { text: 'CASE 07 · 任務前安全審閱', link: '/zh-TW/cases/safe-review' }
      ]
    },
    {
      text: '回到課程',
      items: [{ text: '藍皮書完整目錄', link: '/zh-TW/guide/' }]
    }
  ],
  '/zh-TW/plugins/': [
    {
      text: '外掛程式',
      items: [
        { text: '推薦總覽與選擇方法', link: '/zh-TW/plugins/' },
        { text: '技能、擴充功能與套件', link: '/zh-TW/guide/skills-extensions-packages' },
        { text: '安裝後生命週期管理', link: '/zh-TW/guide/lifecycle-management' },
        { text: '權限、隔離與驗收', link: '/zh-TW/guide/safety' }
      ]
    },
    {
      text: '原始記錄',
      items: [{ text: '技能與擴充功能推文', link: '/zh-TW/tweets/04-skills-extensions' }]
    }
  ],
  '/zh-TW/reference/': [
    {
      text: '第一次閱讀',
      items: [
        { text: '導論 · 為什麼讀這本書', link: '/zh-TW/guide/introduction' },
        { text: '十條仍然成立的判斷', link: '/zh-TW/guide/lasting-principles' },
        { text: '凡例與本版說明', link: '/zh-TW/guide/edition-2026' }
      ]
    },
    {
      text: '參考手冊',
      items: [{ text: '主題索引', link: '/zh-TW/reference/' }]
    },
    {
      text: '核心機制',
      items: [
        { text: '檔案與工作目錄', link: '/zh-TW/guide/files-and-context' },
        { text: '工作階段與續寫', link: '/zh-TW/guide/sessions' },
        { text: '上下文與壓縮', link: '/zh-TW/guide/context-and-compaction' },
        { text: '提示快取', link: '/zh-TW/guide/prompt-caching' }
      ]
    },
    {
      text: '能力與邊界',
      items: [
        { text: '技能、擴充功能與套件', link: '/zh-TW/guide/skills-extensions-packages' },
        { text: '子代理', link: '/zh-TW/guide/subagents' },
        { text: '權限、隔離與驗收', link: '/zh-TW/guide/safety' }
      ]
    },
    {
      text: 'Earendil 官方授權譯文',
      items: [{ text: '授權譯文目錄', link: '/zh-TW/translations/' }]
    }
  ],
  '/zh-TW/translations/': [
    {
      text: 'Earendil 官方授權譯文',
      items: [
        { text: '授權譯文目錄', link: '/zh-TW/translations/' },
        { text: '無法隨身帶走的工作階段', link: '/zh-TW/translations/session-portability' },
        { text: 'Pi 中的壓縮機制', link: '/zh-TW/translations/compaction-in-pi' },
        { text: 'Agent 中的提示快取', link: '/zh-TW/translations/prompt-caching' },
        { text: '什麼是代理框架？', link: '/zh-TW/translations/what-is-a-harness' },
        { text: '代理框架千千萬，這一個屬於我', link: '/zh-TW/translations/mine-agent-harness' },
        { text: 'Pi：極簡而高效', link: '/zh-TW/translations/pi-minimal-performant' },
        { text: 'Pi 與 Lefos 正式釋出', link: '/zh-TW/translations/announcing-pi-and-lefos' },
        { text: '關於今日公告的一些思考', link: '/zh-TW/translations/announcement-reflection' },
        { text: '制高點', link: '/zh-TW/translations/the-high-ground' },
        { text: '邀請你開啟一場通訊', link: '/zh-TW/translations/invitation' }
      ]
    },
    {
      text: '本版入口',
      items: [
        { text: '導論 · 為什麼讀這本書', link: '/zh-TW/guide/introduction' },
        { text: '凡例與本版說明', link: '/zh-TW/guide/edition-2026' },
        { text: '參考手冊主題索引', link: '/zh-TW/reference/' }
      ]
    }
  ],
  '/zh-TW/journey/': [
    {
      text: '小墨札記',
      items: [
        { text: '寫在藍皮書之外', link: '/zh-TW/journey/' },
        { text: '98 條推文檔案', link: '/zh-TW/tweets/' }
      ]
    },
    {
      text: '學習階段',
      items: [
        { text: '1. 從好奇開始認識 Pi', link: '/zh-TW/tweets/01-meet-pi' },
        { text: '2. 先把第一個任務做完', link: '/zh-TW/tweets/02-first-tasks' },
        { text: '3. 理解工作階段與上下文', link: '/zh-TW/tweets/03-sessions-context' },
        { text: '4. 技能與擴充功能', link: '/zh-TW/tweets/04-skills-extensions' },
        { text: '5. 讓子代理學會分工', link: '/zh-TW/tweets/05-subagents-research' },
        { text: '6. 把 Pi 變成長期工作流', link: '/zh-TW/tweets/06-long-running' }
      ]
    }
  ],
  '/zh-TW/tweets/': [
    {
      text: '小墨札記',
      items: [
        { text: '寫在藍皮書之外', link: '/zh-TW/journey/' },
        { text: '98 條推文檔案', link: '/zh-TW/tweets/' },
        { text: '1. 從好奇開始認識 Pi', link: '/zh-TW/tweets/01-meet-pi' },
        { text: '2. 先把第一個任務做完', link: '/zh-TW/tweets/02-first-tasks' },
        { text: '3. 理解工作階段與上下文', link: '/zh-TW/tweets/03-sessions-context' },
        { text: '4. 技能與擴充功能', link: '/zh-TW/tweets/04-skills-extensions' },
        { text: '5. 讓子代理學會分工', link: '/zh-TW/tweets/05-subagents-research' },
        { text: '6. 把 Pi 變成長期工作流', link: '/zh-TW/tweets/06-long-running' }
      ]
    }
  ]
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
    ['link', { rel: 'icon', href: '/brand-mark.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'icon', href: '/favicon-48.png', type: 'image/png', sizes: '48x48' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }]
  ],
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: siteName,
      description: siteDescription,
      themeConfig: {
        nav: [
          { text: '首页', link: '/' },
          { text: '蓝皮书', link: '/guide/', activeMatch: '^/guide/' },
          { text: '插件推荐', link: '/plugins/', activeMatch: '^/plugins/' },
          { text: '实操', link: '/cases/', activeMatch: '^/cases/' },
          { text: '参考手册', link: '/reference/', activeMatch: '^/reference/' },
          { text: '授权译文', link: '/translations/', activeMatch: '^/translations/' },
          { text: '小墨札记', link: '/journey/', activeMatch: '^/(journey|tweets)/' },
          { text: 'GitHub', link: 'https://github.com/xiaomoBoy/pi-bluebook' },
          { text: '联系合作', link: 'https://xiaomovps.com/' }
        ],
        sidebar: sidebarCN,
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
          options: searchTextCN
        },
        footer: {
          message: '网站与原创内容采用 MIT License · Earendil 授权译文采用 CC BY 4.0',
          copyright: '© 2026 小墨 · 第三方内容归原作者所有'
        }
      }
    },
    'zh-TW': {
      label: '繁體中文',
      lang: 'zh-Hant-TW',
      title: siteNameTW,
      description: siteDescriptionTW,
      themeConfig: {
        nav: [
          { text: '首頁', link: '/zh-TW/' },
          { text: '藍皮書', link: '/zh-TW/guide/', activeMatch: '^/zh-TW/guide/' },
          { text: '外掛程式', link: '/zh-TW/plugins/', activeMatch: '^/zh-TW/plugins/' },
          { text: '實作', link: '/zh-TW/cases/', activeMatch: '^/zh-TW/cases/' },
          { text: '參考手冊', link: '/zh-TW/reference/', activeMatch: '^/zh-TW/reference/' },
          { text: '授權譯文', link: '/zh-TW/translations/', activeMatch: '^/zh-TW/translations/' },
          { text: '小墨札記', link: '/zh-TW/journey/', activeMatch: '^/zh-TW/(journey|tweets)/' },
          { text: 'GitHub', link: 'https://github.com/xiaomoBoy/pi-bluebook' },
          { text: '聯絡合作', link: 'https://xiaomovps.com/' }
        ],
        sidebar: sidebarTW,
        outline: {
          level: [2, 3],
          label: '本頁內容'
        },
        sidebarMenuLabel: '學習目錄',
        darkModeSwitchLabel: '外觀模式',
        lightModeSwitchTitle: '切換到淺色模式',
        darkModeSwitchTitle: '切換到深色模式',
        returnToTopLabel: '返回頂部',
        skipToContentLabel: '跳到正文',
        docFooter: {
          prev: '上一篇',
          next: '下一篇'
        },
        lastUpdated: {
          text: '最後更新',
          formatOptions: {
            dateStyle: 'medium',
            timeStyle: 'short'
          }
        },
        search: {
          provider: 'local',
          options: searchTextTW
        },
        footer: {
          message: '網站與原創內容採用 MIT License · Earendil 授權譯文採用 CC BY 4.0',
          copyright: '© 2026 小墨 · 第三方內容歸原作者所有'
        }
      }
    }
  },
  transformPageData(pageData) {
    const isTW = pageData.relativePath.startsWith('zh-TW/')
    const localePath = isTW ? pageData.relativePath.slice('zh-TW/'.length) : pageData.relativePath
    const pagePath = localePath
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '')
    const urlPath = isTW ? `zh-TW/${pagePath}` : pagePath
    const canonicalUrl = new URL(urlPath, `${siteUrl}/`).href
    const isIndex = pageData.relativePath === 'index.md' || pageData.relativePath === 'zh-TW/index.md'
    const isSectionIndex = isIndex || pageData.relativePath.endsWith('/index.md')
    const activeName = isTW ? siteNameTW : siteName
    const activeDescription = isTW ? siteDescriptionTW : siteDescription
    const activeHomeTitle = isTW ? homeSeoTitleTW : homeSeoTitle
    const inLanguage = isTW ? 'zh-Hant-TW' : 'zh-CN'
    const ogLocale = isTW ? 'zh_Hant_TW' : 'zh_CN'
    const ogLocaleAlternate = isTW ? 'zh_CN' : 'zh_Hant_TW'
    const pageTitle = isIndex
      ? activeHomeTitle
      : `${pageData.title} | ${activeName}`
    const pageDescription = pageData.frontmatter.description || activeDescription
    const names = isTW ? sectionNamesTW : sectionNames
    const breadcrumb = isTW
      ? getBreadcrumbListTW(pagePath, pageData.title, canonicalUrl, names)
      : getBreadcrumbList(pagePath, pageData.title, canonicalUrl, names)

    // 對應語系的 canonical，用於 hreflang
    const counterpartPath = isTW ? pagePath : `zh-TW/${pagePath}`
    const counterpartUrl = new URL(counterpartPath, `${siteUrl}/`).href
    const structuredData = isIndex
      ? {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          '@id': `${canonicalUrl}#website`,
          name: activeName,
          alternateName: 'PI BLUEBOOK',
          url: canonicalUrl,
          description: pageDescription,
          inLanguage,
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
              inLanguage,
              ...(breadcrumb ? { breadcrumb: { '@id': breadcrumb['@id'] } } : {})
            },
            ...(breadcrumb ? [breadcrumb] : [])
          ]
        }

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['link', { rel: 'alternate', hreflang: isTW ? 'zh-Hant-TW' : 'zh-CN', href: canonicalUrl }],
      ['link', { rel: 'alternate', hreflang: isTW ? 'zh-CN' : 'zh-Hant-TW', href: counterpartUrl }],
      ['meta', { property: 'og:type', content: isSectionIndex ? 'website' : 'article' }],
      ['meta', { property: 'og:site_name', content: activeName }],
      ['meta', { property: 'og:locale', content: ogLocale }],
      ['meta', { property: 'og:locale:alternate', content: ogLocaleAlternate }],
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
    logo: '/brand-mark.svg',
    siteTitle: 'PI BLUEBOOK'
  }
})
