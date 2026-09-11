---
title: Pi 插件推荐
description: 从小墨的 Pi 推文实践中整理插件、Package 与配套工具，并按需求、风险和当前可核验来源给出选择建议。
prev:
  text: Skill、Extension 与 Package
  link: /guide/skills-extensions-packages
next:
  text: 安装后生命周期管理
  link: /guide/lifecycle-management
---

<span class="library-status">PLUGIN GUIDE · 从需求出发，不做全家桶</span>

# Pi 插件推荐

我的推文里陆续提到过很多 Pi 插件。把它们放在一起以后，最重要的结论并不是“都值得安装”，而是：**先说清楚自己缺什么，再只试一个最接近需求的插件。**

这一页把[推文档案](/tweets/04-skills-extensions)里的零散推荐重新整理，并在 2026 年 9 月 9 日核对了仍能确认的项目来源、安装入口和主要风险。它是一张选择地图，不是必装清单。

::: warning 安装第三方 Package 前先看源码
Pi Package 可以在当前用户权限下执行代码。名字里带 `safe`、`permission` 或 `sandbox`，也不代表它天然可信。先确认仓库和维护者，再看源码、依赖与权限；来源不明确的旧推荐，本页不提供安装命令。
:::

## 如果你只想先选一个

| 你的实际需求 | 先看哪个 | 为什么 | 我的建议 |
| --- | --- | --- | --- |
| 随时看模型、上下文、Token、费用和 Git 状态 | [pi-footer](#pi-footer-状态栏) | 信息集中，最容易立即感受到价值 | **入门首选**；先临时加载 |
| 想让终端输出、Diff、Mermaid 和状态显示更完整 | [pi-cc-extensions](#pi-cc-extensions-终端体验套件) | 一套覆盖多个交互细节 | 与其他界面增强插件分开试 |
| 让 Pi 操作浏览器 | [三种浏览器方案](#浏览器插件只选一种) | 三者连接方式和权限边界不同 | **只选一种**，先用测试账号 |
| 自动反复实验，优化一个可量化指标 | [pi-autoresearch](#pi-autoresearch-自动实验循环) | 适合有测试命令和明确分数的任务 | 仅在独立分支或 worktree 使用 |
| 在浏览器里审批计划、标注代码差异 | [Plannotator](#plannotator-计划与代码审阅) | 把“先审后做”变成可视流程 | 功能较重，稳定使用后再装 |
| 把图表、架构图或交互界面直接渲染出来 | [pi-generative-ui](#pi-generative-ui-生成式界面) | 适合视觉化结果 | 先检查系统依赖 |
| 用手机远程接入正在运行的 Pi | [remote-pi](#remote-pi-远程控制) | 远程操作方便 | 实验性选择，先评估中继与凭据风险 |

如果你还不知道自己缺什么，先不要安装。完成[第一次任务](/guide/first-task)，遇到一个重复出现的具体问题，再回来选。

::: tip 插件已经报错时，不要继续叠加安装
[Extension 加载失败](/reference/troubleshooting#extension-failed)先检查加载位置与干净基线；多个插件同时异常时，按[插件互相冲突](/reference/troubleshooting#resource-conflict)逐个恢复。诊断阶段一次只改变一个变量。
:::

## 第一组：适合先试的界面增强

### pi-footer：状态栏

`pi-footer` 把模型、Provider、思考等级、上下文占用、Token、费用和 Git 状态集中在底部。它最适合“我总想知道当前 Pi 到底在用什么、还剩多少上下文”的场景。

- 当前核对来源：[wobondar/pi-footer](https://github.com/wobondar/pi-footer)
- 适合：日常状态观察、控制成本、及时发现上下文过长。
- 注意：同名项目不止一个，安装时不要只凭名字搜索。

先临时试用：

```bash
pi -e npm:pi-footer
```

确认没有遮挡输入区、字体图标正常，再永久安装：

```bash
pi install npm:pi-footer
```

### pi-cc-extensions：终端体验套件

`pi-cc-extensions` 更像一组界面增强：格式化输出、富文本 Diff、Mermaid、上下文与状态展示集中在一套 Package 里。

- 当前核对来源：[minuque/pi-cc-extensions](https://github.com/minuque/pi-cc-extensions)
- 适合：经常阅读代码差异、图表和较长输出。
- 注意：它覆盖范围较广。先停用其他 footer、状态栏和输出美化插件，避免重复渲染或快捷键冲突。

```bash
pi -e npm:pi-cc-extensions
```

满意后再运行：

```bash
pi install npm:pi-cc-extensions
```

## 第二组：按任务选择

### 浏览器插件只选一种

这三种方案不是简单的“强、中、弱”，而是三条不同路线。不要同时安装后再比较，否则很难判断是哪个插件在控制浏览器。

| 项目 | 更适合的场景 | 前置条件与边界 | 当前来源 |
| --- | --- | --- | --- |
| `pi-browser-harness` | 日常网页操作，希望能力较完整 | 浏览器自动化本身能读取页面和执行操作；先用测试账号与非敏感环境 | [amankumarsingh77/pi-browser-harness](https://github.com/amankumarsingh77/pi-browser-harness) |
| `pi-agent-browser-native` | 想要较轻的原生桥接 | 需要先安装上游 `agent-browser`，并满足项目注明的 Pi 版本要求 | [fitchmultz/pi-agent-browser-native](https://github.com/fitchmultz/pi-agent-browser-native) |
| `pi-chrome` | 想连接已有的真实 Chrome | Chrome 扩展需要标签页与脚本等较宽权限；不要先连接常用主账号 | [tianrendong/pi-chrome](https://github.com/tianrendong/pi-chrome) |

我的选择顺序：普通网页任务先看 `pi-browser-harness`；已经在使用 `agent-browser` 时再看 native 桥接；确实需要现有 Chrome 会话时才考虑 `pi-chrome`。

安装前先进入各自仓库阅读最新前置条件。验证时只给一个无敏感数据的页面任务，例如：“打开测试页，读取标题，不要提交任何表单。”

### pi-generative-ui：生成式界面

`pi-generative-ui` 可以把图表、架构图、界面草图等内容渲染成可交互窗口，适合“文字解释不如直接画出来”的任务。

- 当前核对来源：[Michaelliv/pi-generative-ui](https://github.com/Michaelliv/pi-generative-ui)
- 适合：数据图表、系统架构、交互原型和可视化说明。
- 注意：macOS、Linux、Windows 的运行依赖不同；尤其 Windows 需要先检查项目列出的 .NET 与 WebView2 条件。

```bash
pi -e npm:pi-generative-ui
```

### pi-autoresearch：自动实验循环

`pi-autoresearch` 会围绕一个可量化目标不断修改、运行测试、记录结果，再保留更好的实验。它适合性能、准确率、构建体积等有明确测量方法的问题，不适合“把项目整体做得更好”这种没有评分标准的目标。

- 当前核对来源：[davebcn87/pi-autoresearch](https://github.com/davebcn87/pi-autoresearch)
- 适合：有固定测试命令、明确指标和可回滚代码的实验。
- 重要边界：项目本身建议在独立分支或 worktree、干净工作区中运行，并明确提示其完整用户权限风险。

```bash
pi -e npm:pi-autoresearch
```

先用一个小仓库做三轮以内的实验，确认它能留下实验记录、不会改动范围外文件，再考虑永久安装。

### Plannotator：计划与代码审阅

Plannotator 为 Pi 增加浏览器里的计划审批和代码差异标注。它适合需要“Agent 先交计划，人确认后再执行”的项目，也能把具体行的意见送回 Pi。

- 当前核对来源：[CodeByPeete/plannotator-pi](https://github.com/CodeByPeete/plannotator-pi)
- 适合：较大改动、多人审阅、需要留下结构化反馈的任务。
- 注意：它会引入计划阶段、浏览器界面和更多操作入口，刚开始学 Pi 时没有必要先装。

它当前提供带版本的 Git 安装方式。请以仓库 README 的最新版本为准，不要复制旧推文里的版本号。

### pi-extension-doctor：扩展诊断

`pi-extension-doctor` 是按命令触发的只读诊断工具，用来发现扩展冲突和过期 API。它不会把“插件有问题”自动变成“已经修好”，但可以帮助缩小排查范围。

- 当前核对来源：[dmae97/pi-extension-doctor](https://github.com/dmae97/pi-extension-doctor)
- 适合：已安装多个 Extension，出现加载错误或行为冲突。
- 注意：当前包要求 Node.js 22.19.0 或更高版本；先核对本机版本和项目最新说明。

```bash
pi -e npm:pi-extension-doctor
```

### remote-pi：远程控制

`remote-pi` 让手机或其他设备远程连接 Pi，适合查看长任务或在离开电脑时继续操作。

- 当前核对来源：[jacobaraujo7/remote_pi](https://github.com/jacobaraujo7/remote_pi)
- 适合：已经理解会话、权限和远程访问风险的用户。
- 注意：远程方案可能经过外部网络或中继服务。先读清数据流、认证方式和仓库安全说明，不要在含有生产凭据的会话里直接试。

```bash
pi -e npm:remote-pi
```

官方 SSH Extension、`pi-mobile`、Pi Web、`tmux + Tailscale` 也在推文里出现过，但它们分别属于官方示例、客户端或远程工作流，不应和普通 Package 混成一个“插件榜单”。

## 推文提过，但暂不提供安装命令

以下名字在历史推文中出现过：

- `safe-coder`
- `pi-permission-gate`
- `pi-protected-paths`
- `pi-sandbox`
- `pi-permission-modes`
- `pi-browser-cdp-extension`

它们表达的需求仍然重要：限制危险命令、保护敏感路径、隔离运行环境、控制浏览器。但本轮核对没有把每个名字唯一对应到一个仍可确认的当前来源。这里保留检索线索，不依据旧推文直接给出安装命令。

如果目标是安全，先使用系统账户权限、独立测试目录、Git 分支或 worktree、容器，以及 Pi 自带的 Project Trust 和资源禁用参数。第三方“安全插件”只能作为额外一层，不能替代这些边界。

## 这些是 Skill 或独立工具，不是插件

推文里还推荐过 `browser-tools`、`brave-search`、`youtube-transcript`、`gmcli`、`gdcli`、`transcribe` 等 Skill。Skill 主要提供工作说明和配套资源；它可能调用工具，但不等同于在 Pi 进程中运行的 Extension。

Pi Desktop、Pi Web、`pi-mobile`、Steel Browser，以及 `tmux + Tailscale + Pi` 则是客户端、浏览器服务或组合工作流。它们有价值，只是不应该用同一套“安装插件”的方法管理。先读[Skill、Extension 与 Package](/guide/skills-extensions-packages)，再决定自己真正需要哪一类能力。

## 推文提及项目总表

为了不让原始记录里的名字散落丢失，下面按主题建立一个检索索引。**“已收录”只表示推文提到过，不代表本页已经确认其当前安装来源。**

| 主题 | 推文里出现的项目 | 本页处理方式 |
| --- | --- | --- |
| 界面与上下文观察 | `pi-footer`、`pi-cc-extensions`、`pi-generative-ui`、`pi-context-view` | 前三个已有当前来源；`pi-context-view` 留待复核 |
| 浏览器与网页 | `pi-browser-harness`、`pi-agent-browser-native`、`pi-chrome`、`pi-browser-cdp-extension`、`pi-web-access` | 三个浏览器 Extension 已分路线整理；后两个暂作历史线索 |
| 子 Agent 与工作流 | `pi-subagents`、Plannotator、`pi-autoresearch`、`pi-extension-doctor` | 后三个已有当前来源；`pi-subagents` 回到子 Agent 专题继续核对 |
| 远程控制 | `remote-pi`、`pi-telegram`、Pi Web、`pi-mobile`、官方 SSH Extension | 只把 `remote-pi` 作为实验性 Package；其余按客户端或远程方案另行整理 |
| 上下文压缩 | `pi-smart-compact`、`pi-context`、`pi-press`、Hypa | 保留在[上下文推文](/tweets/03-sessions-context)中，之后单开横向实测 |
| 长期记忆 | `pi-memory`、`pi-hermes-memory`、`pi-honcho`、`pi-hindsight` | 属于高影响能力，暂不依据功能描述直接推荐安装 |
| 安全与权限 | `safe-coder`、`pi-permission-gate`、`pi-protected-paths`、`pi-sandbox`、`pi-permission-modes` | 当前来源未逐一确认，不提供安装命令 |
| 有趣与专业软件 | `pi-arcade`、`pi-unity` | 保留为生态案例，不列入初学者首装清单 |

这张表也说明了为什么不能直接做“Top 20 插件”：长期记忆、远程控制、浏览器和权限插件都会显著扩大数据与执行边界，它们需要独立的实测和威胁检查。

## 安装与验收：固定走这五步

1. **确认来源**：打开仓库，核对维护者、最近更新、README、许可证、依赖和安装字符串。
2. **先临时加载**：支持 npm Package 时，优先用 `pi -e npm:包名`，不要一上来永久安装。
3. **只做一个测试**：在空目录或测试项目里给出单一、可观察的任务，不连接生产账号。
4. **检查副作用**：确认新增文件、网络连接、浏览器权限、快捷键和界面没有超出预期。
5. **再决定保留**：有持续价值才 `pi install`；不需要时用同一来源字符串移除。

常用管理命令：

```bash
pi list
pi install npm:pi-footer
pi remove npm:pi-footer
```

安装、更新、停用与删除本地数据的完整边界，见[安装后生命周期管理](/guide/lifecycle-management)。Package 的官方规则与安全提示以 [Pi Packages 文档](https://pi.dev/docs/latest/packages)为准。

## 我会怎样继续维护这份清单

项目是否仍在维护、安装字符串和依赖都可能变化。每次更新时，我会分别记录：

- **推文实践判断**：当时为什么推荐、解决了什么问题。
- **当前来源核验**：仓库是否唯一、安装方式是否仍有效、最近是否维护。
- **蓝皮书建议**：今天更适合谁、应当怎样试、什么情况下不要装。

这样，推文保留真实时间线，推荐页则负责给出当前可执行的选择。
