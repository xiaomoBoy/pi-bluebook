---
title: Pi 插件推荐
description: 从小墨同学的 Pi 推文实践中整理插件、Package 与配套工具，并按需求、风险和当前可核验来源给出选择建议。
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

这一页把[推文档案](/tweets/04-skills-extensions)里的零散推荐重新整理，并在 2026 年 9 月 23 日重新核对项目来源、安装入口和主要风险。Pi 的 Package 目录变化很快，因此这里给出的是带核验日期的选择地图，不是永久排名或必装清单。

::: warning 安装第三方 Package 前先看源码
Pi Package 可以在当前用户权限下执行代码。名字里带 `safe`、`permission` 或 `sandbox`，也不代表它天然可信。先确认仓库和维护者，再看源码、依赖与权限；来源不明确的旧推荐，本页不提供安装命令。
:::

## Level 0：第一次任务保持零插件

如果你还没有完成[第一次任务](/guide/first-task)，先不要安装任何第三方 Package。原版 Pi 已经能读取、写入、编辑文件和运行命令，也能保存会话。第一次成功需要证明的是工作目录、模型、文件范围和验收流程都正确，不是证明你能装多少插件。

社区里“哪些插件必装”是高频问题，但没有一套配置适合所有人。界面套件、Plan Mode、子 Agent、浏览器和权限系统解决的是不同问题；一次装完整套件会让报错、快捷键冲突、额外模型调用和权限变化难以归因。

完成零插件任务后，再用下面的选择表一次只试一个。

## 如果你只想先选一个

| 你的实际需求 | 先看哪个 | 为什么 | 我的建议 |
| --- | --- | --- | --- |
| 随时看模型、上下文、Token、费用和 Git 状态 | [pi-footer](#pi-footer-状态栏) | 信息集中，最容易立即感受到价值 | **入门首选**；先临时加载 |
| 想让终端输出、Diff、Mermaid 和状态显示更完整 | [pi-cc-extensions](#pi-cc-extensions-终端体验套件) | 一套覆盖多个交互细节 | 与其他界面增强插件分开试 |
| 想先做只读规划，再允许修改 | [pi-plan-mode](#pi-plan-mode-轻量只读规划) | 只增加一个明确工作阶段 | 比子 Agent 更适合作为第二个插件 |
| 想在浏览器里标注计划和代码差异 | [Plannotator](#plannotator-可视化计划与代码审阅) | 把人工反馈落到具体位置 | 功能较重，稳定使用后再装 |
| 让 Pi 操作浏览器 | [三种浏览器方案](#浏览器插件只选一种) | 三者连接方式和权限边界不同 | **只选一种**，先用测试账号 |
| 希望危险操作先经过规则判断或确认 | [权限系统](#permission-system) | 增加 allow、deny、ask 规则 | 不能替代容器或系统沙箱 |
| 想把探索或审阅交给并行 Agent | [子-Agent](#subagents) | 可以隔离上下文并并行处理 | 进阶能力；先理解模型与成本 |
| 自动反复实验，优化一个可量化指标 | [pi-autoresearch](#pi-autoresearch-自动实验循环) | 适合有测试命令和明确分数的任务 | 仅在独立分支或 worktree 使用 |
| 把图表、架构图或交互界面直接渲染出来 | [pi-generative-ui](#pi-generative-ui-生成式界面) | 适合视觉化结果 | 先检查系统依赖 |
| 用手机远程接入正在运行的 Pi | [remote-pi](#remote-pi-远程控制) | 远程操作方便 | 实验性选择，先评估中继与凭据风险 |

如果你还不知道自己缺什么，先不要安装。完成[第一次任务](/guide/first-task)，遇到一个重复出现的具体问题，再回来选。

::: tip 插件已经报错时，不要继续叠加安装
[Extension 加载失败](/reference/troubleshooting#extension-failed)先检查加载位置与干净基线；多个插件同时异常时，按[插件互相冲突](/reference/troubleshooting#resource-conflict)逐个恢复。诊断阶段一次只改变一个变量。
:::

## Level 1：适合先试的界面增强

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

## Level 2：按任务选择

### pi-plan-mode：轻量只读规划

`@narumitw/pi-plan-mode` 增加一个只读 `/plan` 阶段，让 Pi 先探索、澄清并写出可以实施的计划，再回到正常模式修改文件。它适合“改动较大，但暂时不需要浏览器审阅界面”的场景。

- 当前核对来源：[narumiruna/pi-extensions · pi-plan-mode](https://github.com/narumiruna/pi-extensions/tree/main/packages/pi-plan-mode)
- 适合：重构、跨文件修改、需要先确认边界的任务。
- 注意：Plan Mode 约束的是当前工作阶段，不是系统权限隔离；退出规划阶段后仍要检查实际改动。

先在测试项目单次加载：

```bash
pi -e npm:@narumitw/pi-plan-mode
```

只提交一个规划任务，确认它没有修改文件、计划能指出目标文件和验收方法，再决定是否永久安装。

### Plannotator：可视化计划与代码审阅

Plannotator 为 Pi 增加浏览器里的计划审批、回复标注和代码差异审阅。它适合需要“Agent 先交计划，人逐项批注后再执行”的较大项目。

- 当前核对来源：[backnotprop/plannotator](https://github.com/backnotprop/plannotator)
- 当前 Package：[`@plannotator/pi-extension`](https://pi.dev/packages/%40plannotator/pi-extension)
- 适合：较大改动、多人审阅、需要把反馈落到具体段落或代码行的任务。
- 注意：它会启动浏览器审阅界面，并引入比纯终端 Plan Mode 更多的操作入口；刚开始学 Pi 时没有必要先装。

先临时试用当前 npm Package：

```bash
pi -e npm:@plannotator/pi-extension
```

确认浏览器审阅页能打开、反馈能够返回当前会话、退出后没有留下不需要的后台进程，再永久安装。

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

## Level 3：权限系统与子 Agent 最后再装

<a id="permission-system"></a>

### @gotgenes/pi-permission-system：权限规则

`@gotgenes/pi-permission-system` 可以为工具、Shell、MCP、Skill 和子 Agent 操作设置 `allow`、`deny`、`ask` 等规则，适合已经知道自己要拦截哪些动作的用户。

- 当前核对来源：[gotgenes/pi-permission-system](https://github.com/gotgenes/pi-permission-system)
- 当前 Package：[`@gotgenes/pi-permission-system`](https://pi.dev/packages/%40gotgenes/pi-permission-system)
- 适合：为稳定工作流增加可复查的确认和拒绝规则。
- 重要边界：权限插件本身也在 Pi 进程中运行，不能成为操作系统安全边界，也不能替代独立账户、容器或虚拟机。

如果只是担心第一次任务误改文件，先使用空练习目录、Git 和人工验收。只有能写出一条明确规则和对应测试时，再临时加载权限系统；不要因为包名里有 `permission` 就直接信任。

<a id="subagents"></a>

### 子 Agent：最后再装

子 Agent 可以把探索、实现或审阅放进独立上下文，也可以并行执行任务。社区里存在多个名称相近但接口、调度方式和持久化能力不同的实现；它们还会产生额外模型调用，可能使用与你主会话不同的默认模型。

- 一个当前仍活跃的方案：[tintinweb/pi-subagents](https://github.com/tintinweb/pi-subagents)
- 适合：可以独立描述、独立验收、并行处理确实能缩短时间的子任务。
- 不适合：第一次任务、范围模糊的“把整个项目做好”、尚未理解模型费用与会话上下文时。

安装任何子 Agent 前，必须先确认四件事：它默认调用哪个 Provider 和模型；是否允许后台运行；子任务能使用哪些工具；失败或中止后怎样找到实际产物。蓝皮书会在[子 Agent 如何分工](/guide/subagents)继续讲职责拆分，而不是在本页给出一个无条件的“必装”答案。

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
| 规划、子 Agent 与工作流 | `pi-plan-mode`、`pi-subagents`、Plannotator、`pi-autoresearch`、`pi-extension-doctor` | Plan Mode 与 Plannotator 已分轻重路线；子 Agent 只给进阶候选和安装前检查 |
| 远程控制 | `remote-pi`、`pi-telegram`、Pi Web、`pi-mobile`、官方 SSH Extension | 只把 `remote-pi` 作为实验性 Package；其余按客户端或远程方案另行整理 |
| 上下文压缩 | `pi-smart-compact`、`pi-context`、`pi-press`、Hypa | 保留在[上下文推文](/tweets/03-sessions-context)中，之后单开横向实测 |
| 长期记忆 | `pi-memory`、`pi-hermes-memory`、`pi-honcho`、`pi-hindsight` | 属于高影响能力，暂不依据功能描述直接推荐安装 |
| 安全与权限 | `@gotgenes/pi-permission-system`、`safe-coder`、`pi-permission-gate`、`pi-protected-paths`、`pi-sandbox`、`pi-permission-modes` | 只确认前者当前来源；其余名字继续作为历史线索，不依据旧推文安装 |
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

项目是否仍在维护、安装字符串和依赖都可能变化。本页当前来源最后核验于 **2026 年 9 月 23 日**。每次更新时，我会分别记录：

- **推文实践判断**：当时为什么推荐、解决了什么问题。
- **当前来源核验**：仓库是否唯一、安装方式是否仍有效、最近是否维护。
- **蓝皮书建议**：今天更适合谁、应当怎样试、什么情况下不要装。

这样，推文保留真实时间线，推荐页则负责给出当前可执行的选择。
