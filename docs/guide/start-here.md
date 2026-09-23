---
title: 30 分钟完成第一次 Pi 任务
description: 按操作系统选择最短路径，在练习目录完成安装、连接、第一次文件任务与独立验收。
prev: { text: 首页, link: / }
next: { text: 安装前检查, link: /guide/before-install }
---

# 30 分钟完成第一次 Pi 任务

第一次使用 Pi，不以“界面打开了”或“模型回复了”作为终点。你的目标是让 Pi 帮你整理一份虚构会议记录，得到可以亲自检查的行动清单，并确认输入没有被改动。

这条路线在网络和安装环境正常时大约需要 30 分钟；下载速度、浏览器授权和账户状态可能让它更久。时间不是验收标准，右侧证据全部通过才算完成。这页只负责带路，具体操作仍以对应课程为准。

## 先看完整闭环

| 阶段 | 预计时间 | 进入哪一页 | 通过证据 |
| --- | ---: | --- | --- |
| 1. 准备环境 | 5 分钟 | macOS/Linux：[安装前检查](/guide/before-install)；Windows：[中文安装路径](/guide/windows-setup) | 终端、练习目录、Node.js 与 npm 检查通过 |
| 2. 安装 Pi | 5–10 分钟 | [安装并启动 Pi](/guide/install-pi) | `pi --version` 有输出，能启动并退出 |
| 3. 连接模型 | 5 分钟 | [登录与模型设置](/guide/connect-model) | 模型准确回复“Pi 已连接”，没有使用工具 |
| 4. 确认工作位置 | 2 分钟 | [从练习目录开始](/guide/ready-to-work) | 状态栏目录、模型与信任决定都能解释清楚 |
| 5. 完成第一次任务 | 10 分钟 | [第一次任务](/guide/first-task) | 输入指纹未变，输出存在，三条事项逐项对应 |

::: tip 本轮先保持零插件
第一次任务不需要 Extension、Skill、Package、子 Agent、Plan Mode 或浏览器自动化。先确认原版 Pi 的安装、模型、文件和验收闭环都正常；只有遇到一个重复出现的具体需求，才进入[插件推荐](/plugins/)选择一个方案。
:::

## 开始用 Agent，先准备这四样

1. **一台能稳定工作的电脑。** 我更喜欢在 Mac 或 Linux 上做命令行任务；手头是 Windows 也可以，Pi 有[官方 Windows 路径](https://pi.dev/docs/latest/windows)，本书给出了[完整中文步骤](/guide/windows-setup)。先用现有设备跑通 Node.js、终端和 Pi，不必为了入门先换电脑。
2. **一个顺手的终端。** Mac 上我最推荐 [iTerm2](https://iterm2.com/)；它只支持 macOS，系统自带终端也能运行 Pi。Linux 可以先用发行版自带终端。Windows 初学者先安装并打开 **Git Bash**；如果喜欢 [Windows Terminal](https://learn.microsoft.com/en-us/windows/terminal/install) 的窗口界面，也要确认实际运行的是 Git Bash，不能把默认打开的 PowerShell 当成同一套命令环境。[Pi 终端兼容说明](https://pi.dev/docs/latest/terminal-setup)
3. **一个简单、可扩展的 Agent。** 我推荐从 [Pi Coding Agent](https://pi.dev/docs/latest/quickstart) 开始。这里实际安装的是带 `pi` 命令的完整终端应用，底层 `pi-agent-core` 是它使用的组件；[两者并非同一层](/reference/faq#pi-vs-pi-coding-agent)。Pi 负责连接模型、组织工具和保存会话；安装它本身不会附送模型额度。macOS/Linux 可以选择官方安装器或 npm，Windows 初学者继续使用本书的 Git Bash 路线。
4. **一种可用的模型访问方式。** 想按实际用量付费，可以先看 [DeepSeek 官方 API](https://api-docs.deepseek.com/quick_start/pricing)；想用 OpenAI 的 Codex 模型并同时使用 ChatGPT，可以从每月 $20 的 [ChatGPT Plus](https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus)开始。先查看[四种选择与接入边界](/guide/connect-model#先选模型访问方式-官方-api-与订阅)。Plus 是否够长期使用，取决于任务量和当时的额度；用量不够时，先检查账户当前限额和可用的补充额度或更高档方案，再决定是否升级。Plus 不包含单独计费的 OpenAI API 用量。

这四样准备好后，先完成一次无文件的真实回复，再进入文件任务。**安装 Pi、登录 Provider、选中模型、完成任务是四个不同的验收点**；前一步成功不能替后一步作证。

上述平台、终端和模型访问方式信息最后核验于 **2026 年 9 月 23 日**；实际购买和安装时，请再查看文中链接的官方页面。

## Pi 之外，还有两条分支路线

本书用原版 Pi 教基础，因为它便于看清模型、工具和文件实际怎样配合。已经能完成基础任务、想要更多现成能力时，可以阅读[OMP 与 Selesai Code 对照](/reference/pi-forks)：OMP 更重代码导航、调试和工具界面；Selesai 更重成套子 Agent、研究与会话交接。它们是独立的 Agent，不是 Pi 插件，也不会因为安装了它们就自动获得模型额度。

## 找到你现在的位置

| 当前状态 | 从哪里开始 | 完成标志 |
| --- | --- | --- |
| Mac 或 Linux 上还没装 Pi | [安装前检查](/guide/before-install) → [安装 Pi](/guide/install-pi) | Node.js、npm 和 Pi 能返回版本号，能启动和退出 |
| Windows 上还没装 Pi | [Windows 路线选择与 Git Bash 实操](/guide/windows-setup) | 选定一种 Windows 环境；在 Git Bash 入门路线中建立练习目录并启动 Pi |
| 已安装，但还不能回复 | [登录与模型设置](/guide/connect-model) | 确认访问方式和费用，收到一次真实回复 |
| 已经能收到回复 | [从练习目录开始](/guide/ready-to-work) → [第一次任务](/guide/first-task) | 产生行动清单，三条事项完整，输入文件未变 |

Linux 用户可以跟随 macOS/Linux 通用命令，文件指纹使用 `sha256sum`。本书不提供 Linux 桌面界面的逐屏教程。

## 第一次成功应该留下什么

- `pi --version` 的真实输出，以及一次准确的“Pi 已连接”回复。
- `input/项目会议记录.md`：你亲自检查过的固定材料。
- `output/行动清单.md`：包含事项、负责人、截止日期和风险提醒。
- 输入指纹校验通过，输出恰好包含三条事项。

命令找不到、模型没有真实回复、文件不存在、字段遗漏或输入被改动，都不算完成。回到对应阶段只解决这一项，不要同时重装 Pi、切换 Provider、安装插件并修改终端设置。

## 做完以后怎么选

想理解刚才发生了什么，继续读[文件与工作目录](/guide/files-and-context)、[会话保存](/guide/sessions)，再跟随[完整主线](/guide/)。想先建立概念全貌，可以回到[导论](/guide/introduction)和[Pi 工作原理](/guide/how-pi-works)。

完成基础课程后，用[内容整理迁移练习](/cases/content-workflow)处理相互冲突的资料，或用[小型代码修复](/cases/code-repair)练习“先复现失败，再验证修复”。学完第 14 课后进入[毕业项目](/cases/graduation-project)，把前面的方法串成一次完整工作流。

## 卡住时先缩小问题

启动不了，查[启动故障](/reference/troubleshooting#cannot-start)；没有模型，查[模型与认证](/reference/troubleshooting#model-missing)；找不到产物，查[文件与目录错误](/reference/troubleshooting#wrong-files)。求助时带上章节、操作系统、Pi 版本、执行位置和去除凭据后的错误文字。
