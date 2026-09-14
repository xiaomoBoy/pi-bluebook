---
title: 不只 Pi：OMP 与 Selesai Code 怎么选
description: 认识 Pi 的两条活跃分支，对比内置能力、工作方式、配置边界和试用路径。
prev:
  text: 参考手册
  link: /reference/
next:
  text: Skill、Extension 与 Package
  link: /guide/skills-extensions-packages
---

<span class="library-status">AGENT ROUTES · Pi 家族的不同选择</span>

# 不只 Pi：OMP 与 Selesai Code 怎么选

如果你已经能用 Pi 完成一次任务，下一步未必是继续给 Pi 装插件。Pi 的两个分支项目——OMP（Oh My Pi）和 Selesai Code——保留了终端 Coding Agent 的基本形态，却对“应该内置多少能力”给出了不同答案。这一页帮你判断哪条路线适合当前任务；本书的 14 课实操仍以原版 Pi 为准，下面的命令、界面和配置不能直接套回 Pi。

本文核验于 **2026 年 9 月 14 日**，依据 [Pi 官方文档](https://pi.dev/docs/latest/usage)、[OMP 项目说明](https://github.com/can1357/oh-my-pi)和 [Selesai 项目说明](https://github.com/SelesaiInTech/selesai-code)。功能与安装方式变化很快，实际试用时以各项目当时的文档和终端帮助为准。以下按使用场景给出个人推荐，链接均指向项目官方资料，不代表项目方背书。

## 先看关系：它们不是三个模型

本页说的“原版 Pi”是你通过 `pi` 命令启动的 **Pi Coding Agent**，即本书实际教你安装的官方终端应用；它不是供开发者调用的单独 `pi-agent-core` 包。[Pi 与 Pi Coding Agent 的区别](/reference/faq#pi-vs-pi-coding-agent)先把这层关系讲清楚，再比较下面两个 fork。

**Pi、OMP、Selesai Code 都是 Agent 工具，不是提供模型额度的订阅套餐。** 模型负责理解和生成，Agent 负责把模型回复接到本地文件、命令和会话。你在任一工具中能否使用某个模型，取决于该工具当前支持的 Provider、你的登录或 API Key，以及对应账户的计费规则；同一个模型名称也不代表三个工具拥有完全相同的工具和工作流。[模型访问方式与费用边界](/guide/connect-model#先选模型访问方式-官方-api-与订阅)单独讲这件事。

- **原版 Pi Coding Agent** 是主线。它默认以少量基础工具开始，把工作流能力留给 [Skill、Extension 与 Package](/guide/skills-extensions-packages)。[Pi 的设计说明](https://pi.dev/docs/latest/usage#design-principles)明确说，子 Agent、计划、待办等不是必须内置的核心功能。
- **OMP** 的仓库明确标注自己是 [Pi 的 fork](https://github.com/can1357/oh-my-pi)。它把 LSP 代码导航、调试、结构化编辑、浏览器、子 Agent、代码审阅等能力整合到自己的工具界面里，方向更像“终端里带着一套 IDE 的 Agent”。
- **Selesai Code** 也明确是 [Pi 的 fork](https://selesaiintech.github.io/selesai-code/why-selesai/)。它保留 Pi 的核心交互，同时把子 Agent、网页研究、会话交接、恢复工具、技能和终端界面打包发布，方向更像“一次安装就有协同工作流”。

它们不是 Pi 的官方升级版，也不是安装在 Pi 里面的两个插件。应该把它们当成**独立的 Agent 选择**，分别看各自的命令、设置和更新说明。

<div class="agent-routes-diagram"><img src="/images/diagrams/pi-agent-routes.svg" alt="Pi 底层组件组成官方 Pi Coding Agent，OMP 与 Selesai Code 是从 Pi 发展出的两个独立分支"></div>

*图解：本书安装的是中间的 Pi Coding Agent；底层库不需要单独安装，右侧两个 fork 也不是装进 Pi 的插件。手机阅读时可左右滑动图片，或[打开原图](/images/diagrams/pi-agent-routes.svg)放大查看。*

## 一眼看懂主要区别

手机阅读时可左右滑动下表，查看 OMP 和 Selesai 两列；后面的三个分节也分别解释了每条路线。

| 想比较的事 | 原版 Pi | OMP（Oh My Pi） | Selesai Code |
| --- | --- | --- | --- |
| 产品取向 | 核心精简，按需求自行扩展 | 更多代码工具与执行界面直接内置 | 把扩展、技能和协同流程成套提供 |
| 新手起点 | 先学会文件、命令、会话和验收 | 先弄清工具选择、权限与代码工作流 | 先弄清内置流程何时启动、何时交接 |
| 多 Agent | 可用社区扩展或自己实现，默认不内置 | 自带子 Agent 和任务协调入口 | 自带前台、后台、并行或链式子 Agent 分工 |
| 代码工作 | 依赖基础工具和按需扩展 | 重点提供 LSP、调试、结构化搜索与编辑 | 保留 Pi 核心工具，提供需先建图的代码上下文扩展 |
| 研究与恢复 | 可通过扩展补充；会话树、fork、压缩本身已有 | 内置网页搜索/读取、浏览器、任务协调与记忆等能力 | 打包网页研究、公开代码搜索、会话交接、撤销与可选检查点 |
| 更适合谁 | 想理解 Agent 底层、保持简单或亲手组装的人 | 经常在代码仓库里导航、重构、调试的人 | 希望少挑插件、直接试成套工作流的人 |

这张表比较的是**项目默认提供的产品形态**，不是能力上限。Pi 的扩展生态也能实现许多类似需求；OMP 和 Selesai 的内置项目、默认开关与具体表现则应以各自版本为准。[Pi 设计原则](https://pi.dev/docs/latest/usage#design-principles) · [OMP 功能说明](https://github.com/can1357/oh-my-pi) · [Selesai 功能对照](https://selesaiintech.github.io/selesai-code/why-selesai/)

## 路线一：继续用原版 Pi

如果你还在练习“让 Agent 找对目录、改对文件、交付可检查的结果”，我仍推荐先完成原版 Pi 的[第一次任务](/guide/first-task)和[文件与工作目录](/guide/files-and-context)。少量基础工具更容易看清：哪一步是模型判断，哪一步是工具真正修改了磁盘。需要子 Agent、网页研究或特殊 UI 时，再根据任务添加一个经过检查的扩展。这样你能知道新增能力解决了什么问题，也能在出错时缩小排查范围。

原版 Pi **不是功能残缺版**：它已经有模型切换、会话保存、分叉和压缩、Extension 与 Skill 等基础设施。没有内置的工作流，往往是作者有意留给用户组合，而不是做不到。[Pi 官方使用说明](https://pi.dev/docs/latest/usage)

## 路线二：OMP，更偏重代码工具

OMP 的明显差异在**代码理解与执行界面**。官方 README 展示了 LSP 导航和重命名、DAP 调试、结构化搜索与编辑、浏览器操作、子 Agent 面板，以及多模型角色等功能。对经常在大型代码仓库中定位定义、跨文件重构、追查运行时故障的人，这些入口可能减少自行安装和拼接工具的工作。[OMP 项目说明](https://github.com/can1357/oh-my-pi)

![OMP 的 GitHub 仓库首页，显示 can1357/oh-my-pi、项目描述与公开文件列表](/images/pi-forks-omp-github-2026-09-14.png)

*OMP 仓库页面快照（2026 年 9 月 14 日）。仓库名称和项目入口可据此核对；Star、版本与活动时间会继续变化。[查看大图](/images/pi-forks-omp-github-2026-09-14.png)。*

<!-- 截图待补：OMP 真实界面，优先展示 LSP/调试或 Agent Hub；图注标明版本、所选模型与可见操作，不展示凭据或私人路径。 -->

代价是学习面更宽：更多工具并不自动让任务更可靠。你需要看清某次调用究竟是读取、提出修改还是已经写盘；子 Agent 的分工结果仍要回到原始需求、测试和 diff 检查。OMP README 中的性能数字是项目方对特定任务和版本的说明，**不能直接推断你自己的模型、项目或费用也会得到同样结果**。

OMP 是独立命令 `omp`。官方目前列出 macOS/Linux 安装脚本、Homebrew、Bun 和 Windows PowerShell 路径；Mac 读者可先看 [官方安装段落](https://github.com/can1357/oh-my-pi#install)，再选择适合自己的方式。OMP 的原生用户设置通常位于 `~/.omp/agent/`，项目资源位于 `.omp/`，不要把本书的 `.pi/` 步骤原样复制过去。[OMP 配置说明](https://github.com/can1357/oh-my-pi/blob/main/docs/config-usage.md)

**我会在这些情况推荐 OMP：** 你已经会审查 Agent 改动，经常要用代码导航、调试或并行审阅，并愿意学习较多内置工具。若只是第一次让 Agent 整理文件，先把 Pi 主线跑通更容易判断工具是否真的帮上忙。

## 路线三：Selesai Code，更偏重成套工作流

Selesai 的核心选择是**将一组能力一起维护和发布**。官方对照页把子 Agent 分工、网页研究、公开代码搜索、会话消息与交接、持久记忆、终端显示等列为随产品提供的能力。读者无需从零挑选许多插件，就能试“研究 → 分工 → 执行 → 检查 → 交接”的流程。[Selesai 功能对照](https://selesaiintech.github.io/selesai-code/why-selesai/)

![Selesai Code 的 GitHub 仓库首页，显示 SelesaiInTech/selesai-code、项目描述与公开文件列表](/images/pi-forks-selesai-github-2026-09-14.png)

*Selesai Code 仓库页面快照（2026 年 9 月 14 日）。仓库名称和项目入口可据此核对；Star、版本与活动时间会继续变化。[查看大图](/images/pi-forks-selesai-github-2026-09-14.png)。*

<!-- 截图待补：Selesai 真实界面，优先展示子 Agent 分工、网页研究或交接；图注标明版本与任务状态，不展示凭据或私人路径。 -->

它与 OMP 的着重点不同：Selesai 更强调一套协调好的扩展与技能，以及长会话的连续性。比如 `/handoff-new` 用于生成可编辑的交接提示，`/undo` 用于撤销本轮可追踪的 `edit`、`write` 改动；它会标记可能修改文件的 Bash 命令，但**不会自动撤销命令造成的效果**。官方也把 git-backed rewind checkpoints 标为可选能力，不应写成默认开启。[Selesai 撤销边界](https://selesaiintech.github.io/selesai-code/capabilities/continuity/undo/) · [功能目录](https://selesaiintech.github.io/selesai-code/capabilities/)

Selesai 的发布包是 `@selesai/code`，启动命令是 `selesai`。官方推荐 npm 安装，用户级状态在 `~/.selesai/agent/`，项目资源在 `.selesai/`。它支持自己的 Provider 配置，也提供可选的 token.in 模型接入；**使用 Selesai 不要求购买 token.in**，现有模型凭据是否适用仍应逐项核对。[官方入门说明](https://selesaiintech.github.io/selesai-code/get-started/) · [项目 README](https://github.com/SelesaiInTech/selesai-code)

**我会在这些情况推荐 Selesai：** 你已经知道怎样给任务设停止条件和验收标准，但不想手动组合许多扩展，想直接试多 Agent、研究和交接串成的工作流。任务简单时，也应只启用当前需要的能力，避免把分工本身当作成果。

## 怎么选，才不会把三个工具都装成负担

1. **先确定任务。** 入门文件任务与理解 Agent Loop，选 Pi；跨文件代码导航、重构或调试，试 OMP；多阶段研究、分工和长会话交接，试 Selesai。
2. **一次只试一个新工具。** 用一个不含私人材料的练习目录，在相同模型和相近任务下比较，避免把模型质量差异误判成 Agent 差异。
3. **只比较能看见的结果。** 记录工具实际读写了什么、有没有完成要求、用了多少调用或额度、出了错能否恢复。界面看起来更热闹，不等于结果更准确。
4. **把费用与权限单独检查。** 三者都可能运行本地命令和读取文件；购买模型套餐也不会自动给所有 Agent 同样的登录权限。先核对所选 Provider 与凭据，敏感项目使用隔离环境，并审阅最终 diff。[Pi 安全说明](https://pi.dev/docs/latest/security) · [Selesai 安全边界](https://github.com/SelesaiInTech/selesai-code#pi-compatible-core)

### 一个可复用的对照任务

在同一份**副本**中，分别让三个 Agent 完成：“先告诉我这个项目如何运行检查；只读取，不改文件、不执行安装或测试。列出你实际查看的文件和依据。” 先检查回答有没有对应真实文件，再决定是否授权下一步。第二轮才给一个小修复任务，独立运行测试并比对最终 diff。这个对照只能帮助你判断当前版本和当前模型下的使用体验，不是普遍性能排名。

<!-- 截图待补：若有三款 Agent 执行同一任务的结果截图，放在此处；每张图只证明图中可见结果，不能据此声称普遍性能高低。 -->

想继续理解这些区别从哪里来，读[Pi 工作原理](/guide/how-pi-works)和[子 Agent 如何分工](/guide/subagents)；想实际换工具，先打开 [OMP 官方仓库](https://github.com/can1357/oh-my-pi)或 [Selesai 官方入门页](https://selesaiintech.github.io/selesai-code/get-started/)核对当前版本。
