import type { DefaultTheme } from 'vitepress'

/** Global navigation shown in the top bar. */
export const nav = [
      { text: '首页', link: '/' },
      {
        text: '开始学习',
        items: [
          {
            text: '学习入口',
            items: [
              { text: '从零开始操作', link: '/guide/start-here' },
              { text: '完整学习目录', link: '/guide/' },
              { text: '从导论开始', link: '/guide/introduction' },
              { text: 'Pi 完整运行原理', link: '/guide/how-pi-works' }
            ]
          },
          {
            text: '完成课程',
            items: [
              { text: 'CASE 08 · 毕业项目', link: '/cases/graduation-project' }
            ]
          }
        ]
      },
      {
        text: '动手实践',
        items: [
          {
            text: '案例与扩展',
            items: [
              { text: '实操案例库', link: '/cases/' },
              { text: '插件推荐与选择', link: '/plugins/' },
              { text: 'Skill、Extension 与 Package', link: '/guide/skills-extensions-packages' }
            ]
          },
          {
            text: '管理与安全',
            items: [
              { text: '安装后生命周期管理', link: '/guide/lifecycle-management' },
              { text: '权限、隔离与验收', link: '/guide/safety' }
            ]
          }
        ]
      },
      {
        text: '查问题',
        items: [
          {
            text: '快速定位',
            items: [
              { text: '参考手册首页', link: '/reference/' },
              { text: '常见问题 FAQ', link: '/reference/faq' },
              { text: '故障排查手册', link: '/reference/troubleshooting' },
              { text: 'AI 与 Agent 热词', link: '/reference/glossary' }
            ]
          }
        ]
      },
      {
        text: '延伸资料',
        items: [
          {
            text: '文章与档案',
            items: [
              { text: 'Earendil 授权译文', link: '/translations/' },
              { text: '小墨札记', link: '/journey/' },
              { text: '98 条推文档案', link: '/tweets/' }
            ]
          },
          {
            text: '项目',
            items: [
              { text: 'GitHub 仓库', link: 'https://github.com/xiaomoBoy/pi-bluebook' }
            ]
          }
        ]
      },
      { text: '联系合作', link: 'https://xiaomovps.com/' }
    ] satisfies DefaultTheme.NavItem[]

/** Section-specific sidebars. Keep learning order here, not in the main config. */
export const sidebar = {
      '/guide/': [
        {
          text: '蓝皮书',
          collapsed: true,
          items: [
            { text: '完整学习目录', link: '/guide/' },
            { text: '从零开始操作', link: '/guide/start-here' },
            { text: '导论 · 为什么读这本书', link: '/guide/introduction' },
            { text: '十条仍然成立的判断', link: '/guide/lasting-principles' },
            { text: '凡例与本版说明', link: '/guide/edition-2026' },
            { text: '序章 · Pi 作者 Mario Zechner', link: '/guide/mario-zechner' }
          ]
        },
        {
          text: '模块一 · 安装与基础设置',
          collapsed: true,
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
          collapsed: true,
          items: [
            { text: '5. 第一次任务', link: '/guide/first-task' },
            { text: '6. 文件与工作目录', link: '/guide/files-and-context' },
            { text: '7. 会话的保存与续写', link: '/guide/sessions' }
          ]
        },
        {
          text: '模块三 · 长任务与上下文',
          collapsed: true,
          items: [
            { text: '8. 上下文与压缩', link: '/guide/context-and-compaction' },
            { text: '9. 提示缓存入门', link: '/guide/prompt-caching' }
          ]
        },
        {
          text: '模块四 · 扩展自己的 Pi',
          collapsed: true,
          items: [
            { text: '10. Skill、Extension 与 Package', link: '/guide/skills-extensions-packages' },
            { text: '11. Extension 的需求与验收', link: '/guide/first-extension' },
            { text: '12. 子 Agent 如何分工', link: '/guide/subagents' }
          ]
        },
        {
          text: '原理串联',
          collapsed: true,
          items: [
            { text: '从 Prompt 到 Agent Loop', link: '/guide/how-pi-works' }
          ]
        },
        {
          text: '模块五 · 稳定工作流',
          collapsed: true,
          items: [
            { text: '13. 长时间任务与 VPS', link: '/guide/vps-and-long-running' },
            { text: '14. 权限、隔离与验收', link: '/guide/safety' }
          ]
        },
        {
          text: '结课与查错',
          collapsed: true,
          items: [
            { text: 'CASE 08 · 毕业项目', link: '/cases/graduation-project' },
            { text: 'Pi 故障排查手册', link: '/reference/troubleshooting' }
          ]
        }
      ],
      '/cases/': [
        {
          text: '开始实践',
          collapsed: true,
          items: [
            { text: '案例库与使用方法', link: '/cases/' },
            { text: '蓝皮书完整目录', link: '/guide/' }
          ]
        },
        {
          text: '单项练习 · CASE 01–07',
          collapsed: true,
          items: [
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
          text: '迁移练习',
          collapsed: true,
          items: [
            { text: '从资料到可核对的草稿', link: '/cases/content-workflow' },
            { text: '修复一个小程序', link: '/cases/code-repair' }
          ]
        },
        {
          text: '综合结课',
          collapsed: true,
          items: [
            { text: 'CASE 08 · Pi 蓝皮书毕业项目', link: '/cases/graduation-project' }
          ]
        },
        {
          text: '遇到问题',
          collapsed: true,
          items: [{ text: 'Pi 故障排查手册', link: '/reference/troubleshooting' }]
        }
      ],
      '/plugins/': [
        {
          text: '选择与理解',
          collapsed: true,
          items: [
            { text: '推荐总览与选择方法', link: '/plugins/' },
            { text: 'Skill、Extension 与 Package', link: '/guide/skills-extensions-packages' }
          ]
        },
        {
          text: '动手练习',
          collapsed: true,
          items: [
            { text: 'CASE 03 · 第一个 Skill', link: '/cases/first-skill' },
            { text: 'CASE 04 · 最小 Extension', link: '/cases/first-extension' }
          ]
        },
        {
          text: '管理与排查',
          collapsed: true,
          items: [
            { text: '安装后生命周期管理', link: '/guide/lifecycle-management' },
            { text: 'Extension 加载失败', link: '/reference/troubleshooting#extension-failed' },
            { text: '插件互相冲突', link: '/reference/troubleshooting#resource-conflict' },
            { text: '权限、隔离与验收', link: '/guide/safety' }
          ]
        },
        {
          text: '原始记录',
          collapsed: true,
          items: [{ text: 'Skill 与 Extension 推文', link: '/tweets/04-skills-extensions' }]
        }
      ],
      '/reference/': [
        {
          text: '快速查问题',
          collapsed: true,
          items: [
            { text: '主题索引', link: '/reference/' },
            { text: '常见问题 FAQ', link: '/reference/faq' },
            { text: 'Pi 故障排查手册', link: '/reference/troubleshooting' },
            { text: 'AI 与 Agent 热词', link: '/reference/glossary' }
          ]
        },
        {
          text: '理解运行机制',
          collapsed: true,
          items: [
            { text: '从 Prompt 到 Agent Loop', link: '/guide/how-pi-works' },
            { text: '文件与工作目录', link: '/guide/files-and-context' },
            { text: 'Session 与续写', link: '/guide/sessions' },
            { text: '上下文与压缩', link: '/guide/context-and-compaction' },
            { text: '提示缓存', link: '/guide/prompt-caching' }
          ]
        },
        {
          text: '能力与边界',
          collapsed: true,
          items: [
            { text: 'Skill、Extension 与 Package', link: '/guide/skills-extensions-packages' },
            { text: '插件推荐与选择', link: '/plugins/' },
            { text: '子 Agent', link: '/guide/subagents' },
            { text: '权限、隔离与验收', link: '/guide/safety' }
          ]
        },
        {
          text: '继续学习',
          collapsed: true,
          items: [
            { text: '蓝皮书完整目录', link: '/guide/' },
            { text: '8 个实操案例', link: '/cases/' }
          ]
        }
      ],
      '/translations/': [
        {
          text: '译文目录',
          collapsed: true,
          items: [
            { text: '十一篇授权译文总览', link: '/translations/' }
          ]
        },
        {
          text: 'Session 与上下文',
          collapsed: true,
          items: [
            { text: '无法随身带走的会话', link: '/translations/session-portability' },
            { text: 'Pi 中的压缩机制', link: '/translations/compaction-in-pi' },
            { text: 'Agent 中的提示缓存', link: '/translations/prompt-caching' }
          ]
        },
        {
          text: 'Harness 与 Pi',
          collapsed: true,
          items: [
            { text: '什么是 Agent Harness？', link: '/translations/what-is-a-harness' },
            { text: '这个 Harness 属于我', link: '/translations/mine-agent-harness' },
            { text: 'Pi：极简而高效', link: '/translations/pi-minimal-performant' }
          ]
        },
        {
          text: '公告与长期思考',
          collapsed: true,
          items: [
            { text: 'Pi 与 Lefos 正式发布', link: '/translations/announcing-pi-and-lefos' },
            { text: '关于今日公告的思考', link: '/translations/announcement-reflection' },
            { text: '制高点', link: '/translations/the-high-ground' },
            { text: '邀请你开启一场通信', link: '/translations/invitation' }
          ]
        },
        {
          text: '代码质量与评估',
          collapsed: true,
          items: [
            { text: '衡量代码的粗糙程度', link: '/translations/measuring-code-sloppiness' }
          ]
        },
        {
          text: '回到蓝皮书',
          collapsed: true,
          items: [
            { text: '从 Prompt 到 Agent Loop', link: '/guide/how-pi-works' },
            { text: '参考手册主题索引', link: '/reference/' }
          ]
        }
      ],
      '/journey/': [
        {
          text: '小墨札记',
          collapsed: true,
          items: [
            { text: '写在蓝皮书之外', link: '/journey/' },
            { text: '98 条推文档案', link: '/tweets/' }
          ]
        },
        {
          text: '学习阶段',
          collapsed: true,
          items: [
            { text: '1. 从好奇开始认识 Pi', link: '/tweets/01-meet-pi' },
            { text: '2. 先把第一个任务做完', link: '/tweets/02-first-tasks' },
            { text: '3. 理解 Session 与上下文', link: '/tweets/03-sessions-context' },
            { text: '4. Skill 与 Extension', link: '/tweets/04-skills-extensions' },
            { text: '5. 让子 Agent 学会分工', link: '/tweets/05-subagents-research' },
            { text: '6. 把 Pi 变成长期工作流', link: '/tweets/06-long-running' }
          ]
        },
        {
          text: '回到当前结论',
          collapsed: true,
          items: [
            { text: '十条仍然成立的判断', link: '/guide/lasting-principles' },
            { text: '蓝皮书完整目录', link: '/guide/' }
          ]
        }
      ],
      '/tweets/': [
        {
          text: '小墨札记',
          collapsed: true,
          items: [
            { text: '写在蓝皮书之外', link: '/journey/' },
            { text: '98 条推文档案', link: '/tweets/' }
          ]
        },
        {
          text: '学习阶段',
          collapsed: true,
          items: [
            { text: '1. 从好奇开始认识 Pi', link: '/tweets/01-meet-pi' },
            { text: '2. 先把第一个任务做完', link: '/tweets/02-first-tasks' },
            { text: '3. 理解 Session 与上下文', link: '/tweets/03-sessions-context' },
            { text: '4. Skill 与 Extension', link: '/tweets/04-skills-extensions' },
            { text: '5. 让子 Agent 学会分工', link: '/tweets/05-subagents-research' },
            { text: '6. 把 Pi 变成长期工作流', link: '/tweets/06-long-running' }
          ]
        },
        {
          text: '回到当前结论',
          collapsed: true,
          items: [
            { text: '十条仍然成立的判断', link: '/guide/lasting-principles' },
            { text: '蓝皮书完整目录', link: '/guide/' }
          ]
        }
      ]
    } satisfies DefaultTheme.Sidebar
