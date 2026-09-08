import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Pi 学习蓝皮书',
  description: '从第一次任务到搭出自己的 Agent',
  cleanUrls: true,
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
      { text: '开始学习', link: '/guide/first-task' },
      { text: '推文资料', link: '/tweets/' },
      { text: 'GitHub', link: 'https://github.com/xiaomoBoy/pi-bluebook' }
    ],
    sidebar: [
      {
        text: '开始这里',
        items: [
          { text: '学习蓝皮书', link: '/' },
          { text: '第一次任务', link: '/guide/first-task' }
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
      message: '非 Pi 官方项目 · 内容采用 CC BY-NC-SA 4.0',
      copyright: 'Copyright © 2026 xiaomo'
    }
  }
})
