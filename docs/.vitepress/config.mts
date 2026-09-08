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
      { text: '开始学习', link: '/guide/before-install' },
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
        text: '模块二 · 完成第一个任务',
        items: [
          { text: '5. 第一次任务', link: '/guide/first-task' }
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
      message: '非 Pi 官方项目 · 内容采用 CC BY-NC-SA 4.0',
      copyright: 'Copyright © 2026 xiaomo'
    }
  }
})
