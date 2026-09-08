import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Pi 学习蓝皮书',
  description: '从第一次任务到搭出自己的 Agent',
  cleanUrls: true,
  sitemap: {
    hostname: 'https://pi.xiaomovps.com'
  },
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#f4f1e9' }],
    ['link', { rel: 'icon', href: '/brand-mark.svg', type: 'image/svg+xml' }]
  ],
  themeConfig: {
    logo: '/brand-mark.svg',
    siteTitle: 'PI BLUEBOOK',
    nav: [
      { text: '首页', link: '/' },
      { text: '开始学习', link: '/guide/before-install', activeMatch: '^/guide/' },
      { text: '优质译读', link: '/translations/' },
      { text: '推文资料', link: '/tweets/' },
      { text: 'GitHub', link: 'https://github.com/xiaomoBoy/pi-bluebook' }
    ],
    sidebar: [
      {
        text: '模块一 · 安装与基础设置',
        items: [
          { text: '1. 安装前检查', link: '/guide/before-install' },
          { text: '2. 安装并启动 Pi', link: '/guide/install-pi' },
          { text: '3. 登录与模型设置', link: '/guide/connect-model' },
          { text: '4. 从练习目录开始', link: '/guide/ready-to-work' }
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
      },
      {
        text: '个人学习记录',
        items: [
          { text: '从好奇到搭工作台', link: '/journey/' }
        ]
      },
      {
        text: '优质译读',
        items: [
          { text: '译读说明', link: '/translations/' },
          { text: '带不走的会话', link: '/translations/session-portability' },
          { text: 'Pi 的上下文压缩', link: '/translations/compaction-in-pi' },
          { text: 'Agent 中的提示缓存', link: '/translations/prompt-caching' }
        ]
      },
      {
        text: '资料库',
        items: [{ text: '推文资料', link: '/tweets/' }]
      }
    ],
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
      message: '非 Pi 官方项目 · 本站原创内容采用 CC BY-NC-SA 4.0 · 第三方内容见各页说明',
      copyright: 'Copyright © 2026 xiaomo'
    }
  }
})
