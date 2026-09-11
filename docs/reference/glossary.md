---
title: AI 与 Agent 热词表
description: 用人话解释 Pi 学习中反复出现的 20 个 AI 与 Agent 核心概念，并连接到对应课程和 FAQ。
prev:
  text: Pi 故障排查手册
  link: /reference/troubleshooting
next:
  text: 文件与工作目录
  link: /guide/files-and-context
---

<span class="library-status">GLOSSARY · 遇到术语时查这里</span>

# AI 与 Agent 热词表

这不是一份追求“大而全”的 AI 百科。第一版只解释 Pi 蓝皮书正文和 98 条学习记录中反复出现、会直接影响使用判断的 20 个词。

每个词先给一句人话解释，再说明它在 Pi 里意味着什么。需要操作时，继续进入对应课程；带有版本和产品边界的说明核验于 **2026-09-11**。

## 快速查找

| 认识 Pi | 理解会话 | 看懂运行过程 | 扩展 Pi |
| --- | --- | --- | --- |
| [Pi](#pi) | [Context](#context) | [Agent Loop](#agent-loop) | [Tool / Tool Call](#tool-tool-call) |
| [Pi Coding Agent](#pi-coding-agent) | [Context Window](#context-window) | [System Prompt](#system-prompt) | [Skill](#skill) |
| [Coding Agent](#coding-agent) | [Session](#session) | [Token](#token) | [Extension](#extension) |
| [Agent Harness](#agent-harness) | [Session Tree](#session-tree) | [Prompt Cache](#prompt-cache) | [Package](#package) |
| [Agent Runtime](#agent-runtime) | [Compaction](#compaction) | [Cache Hit](#cache-hit) | [Sub-agent](#sub-agent) |

## Pi {#pi}

**人话解释：** Pi 是一个运行在终端里的极简 Agent Harness。它把模型、工具、会话、上下文和工作目录连接起来，让模型不只回答问题，还能在你的电脑上处理真实任务。

**在 Pi 里意味着什么：** 日常所说的“打开 Pi”“让 Pi 改文件”，通常就是启动 `pi` 命令使用这套 Harness。Pi 不是模型，也不自带模型额度；它需要连接 Provider 提供的模型。官方当前把产品直接称为 Pi，安装包名称则是 `@earendil-works/pi-coding-agent`，不必把两种叫法理解成彼此独立的产品。

**相关：** [Pi Coding Agent](#pi-coding-agent) · [Agent Harness](#agent-harness) · [Pi 到底是什么？](/reference/faq#what-is-pi)

## Pi Coding Agent {#pi-coding-agent}

**人话解释：** Pi Coding Agent 是 Pi 的产品与安装包语境名称，强调它主要通过终端完成代码、文件和命令任务。

**在 Pi 里意味着什么：** 新手看到 `pi`、Pi、Pi Coding Agent 或 npm 包 `@earendil-works/pi-coding-agent` 时，多数情况下是在谈同一个日常使用入口。只有讨论源码包、SDK 或底层模块时，才需要进一步区分仓库中的不同组成部分。它仍然只是 Harness，不是负责推理的模型。

**相关：** [Pi](#pi) · [Coding Agent](#coding-agent) · [Pi 和 Pi Coding Agent 有什么区别？](/reference/faq#pi-vs-pi-coding-agent)

## Coding Agent {#coding-agent}

**人话解释：** Coding Agent 是一类以代码和文件任务为主要工作对象的 Agent。它能读取项目、修改文件、执行命令，并根据结果继续调整。

**在 Pi 里意味着什么：** “Coding”不代表只能写程序。整理 Markdown、检查配置、生成表格或运行构建，也可能属于它的工作范围。关键区别是它能调用真实工具影响工作目录，而不只是给出一段聊天答案。因此，权限控制和结果验收比普通问答更重要。

**相关：** [Agent Harness](#agent-harness) · [Tool / Tool Call](#tool-tool-call) · [Pi 和 Claude Code、Codex 有什么区别？](/reference/faq#pi-vs-other-agents)

## Agent Harness {#agent-harness}

**人话解释：** Agent Harness 是包在模型外面的运行系统。它负责准备指令和上下文、提供工具、保存会话，并让模型和工具在一个循环里协作。

**在 Pi 里意味着什么：** 模型决定“下一步想做什么”，Harness 决定模型能看到什么工具、工具怎样执行、结果如何送回，以及对话怎样保存。同一个模型放进不同 Harness，可能因为系统提示、工具设计和上下文组织不同而表现不同。Pi 的核心定位正是一个可由用户改造的极简 Harness。

![Pi 作为 Agent Harness，连接用户目标、模型、工具、项目文件和 Session。](/images/diagrams/pi-harness-overview.svg)

*图解：Harness 是模型外面负责组织工作的那一层。*

**相关：** [Agent Loop](#agent-loop) · [System Prompt](#system-prompt) · [什么是 Agent Harness？](/translations/what-is-a-harness)

## Agent Runtime {#agent-runtime}

**人话解释：** Agent Runtime 是让 Agent 实际运行的环境与生命周期层，关注任务状态、执行过程、恢复方式以及怎样被其他程序长期调用。

**在 Pi 里意味着什么：** Pi 具备 Session、RPC、SDK 和可扩展事件等 Runtime 组成部分，但“Agent Runtime”不是当前官方文档中的一个独立成品功能名称。蓝皮书使用这个词，是为了理解 Pi 如何从一次终端交互延伸到可嵌入、可恢复的长期工作方式，不代表启动 `pi` 就自动获得后台常驻、定时任务或无人值守安全保障。

**相关：** [Session](#session) · [Agent Loop](#agent-loop) · [VPS 与长任务](/guide/vps-and-long-running)

## Agent Loop {#agent-loop}

**人话解释：** Agent Loop 是“理解目标 → 选择动作 → 调用工具 → 读取结果 → 决定下一步”的循环。任务完成、遇到错误或需要人做决定时，循环才会停下。

**在 Pi 里意味着什么：** 当 Pi 读取文件后又继续搜索、修改并运行检查，这些连续动作就是循环的一部分。模型并不是一次规划好全部过程；每次工具结果都会成为下一步判断的新输入。循环能带来自主执行，也可能反复试错，所以任务需要明确停止条件和可独立检查的结果。

**相关：** [Agent Harness](#agent-harness) · [Tool / Tool Call](#tool-tool-call) · [安全与验收](/guide/safety)

## System Prompt {#system-prompt}

**人话解释：** System Prompt 是每轮请求中放在较高优先级位置的基础说明，用来告诉模型当前角色、可用工具和通用行为要求。

**在 Pi 里意味着什么：** Pi 刻意保持默认 System Prompt 较短，并允许通过配置和 Extension 调整。项目里的 `AGENTS.md`、`CLAUDE.md` 等上下文文件会继续补充项目要求，但它们不是操作系统权限。System Prompt 变长或频繁变化，也会增加 Context 占用并影响提示缓存前缀。

**相关：** [Context](#context) · [Prompt Cache](#prompt-cache) · [Project Trust 不是沙箱](/guide/safety)

## Token {#token}

**人话解释：** Token 是模型处理输入和生成输出时使用的计量单位。它不等同于汉字或单词，一个词、符号或代码片段可能被拆成不同数量的 Token。

**在 Pi 里意味着什么：** System Prompt、工具说明、对话、文件内容和工具结果都会占用输入 Token，模型回复则产生输出 Token。Token 会影响上下文容量、速度和可能的 API 成本，但“用得少”不等于任务质量高。判断结果仍要回到文件、测试和真实业务状态。

**相关：** [Context Window](#context-window) · [Prompt Cache](#prompt-cache) · [为什么说 Pi 比较省 Token？](/reference/faq#why-pi-uses-fewer-tokens)

## Context {#context}

**人话解释：** Context 是模型在当前这一轮真正收到、能够用来判断的输入集合，包括系统说明、选中的会话历史、文件内容和工具结果。

**在 Pi 里意味着什么：** Session 可以保存完整的树状历史，但当前模型只会收到从会话树中构造出的有效路径，以及 Harness 本轮加入的其他材料。磁盘上存在某个文件，不代表模型已经读过；很久以前说过一句话，也不代表它仍在当前 Context 中。重要约束应落到可重新读取的文件。

**相关：** [Session](#session) · [Context Window](#context-window) · [Context 和 Session 有什么区别？](/reference/faq#context-vs-session)

## Context Window {#context-window}

**人话解释：** Context Window 是模型单次请求能处理的最大上下文范围。System Prompt、历史消息、工具说明、工具结果和预留回复空间都要从这份容量里分配。

**在 Pi 里意味着什么：** 长任务不断加入网页、日志和文件后，会越来越接近窗口上限。窗口大不代表可以无限堆材料；无关内容仍会增加处理时间并干扰判断。接近上限时，Pi 可以进行 Compaction，但真正不能丢的目标、决定和进度应先写入文件。

![Session、项目文件与压缩摘要被 Pi 组装成当前 Context，再发送给模型。](/images/diagrams/context-session-compaction.svg)

*图解：磁盘上保存的历史，不等于这一轮模型收到的全部输入。*

**相关：** [Context](#context) · [Compaction](#compaction) · [Context Window 满了会怎样？](/reference/faq#context-window-full)

## Session {#session}

**人话解释：** Session 是 Pi 自动保存的一次工作会话。它记录消息、模型变化、工具调用、压缩摘要和分支结构，让你以后能够继续或回看任务。

**在 Pi 里意味着什么：** Session 默认按工作目录保存在本地 JSONL 文件中，可以通过 `/resume`、`pi -c` 等入口继续。它保存的是会话历史，不是项目文件的版本备份，也不是保证跨项目生效的长期记忆。文件被改坏时，仍要依靠 Git、备份或原始材料恢复。

**相关：** [Session Tree](#session-tree) · [Context](#context) · [Session 与续写](/guide/sessions)

## Session Tree {#session-tree}

**人话解释：** Session Tree 是 Pi 在同一份会话文件里保存多条对话路线的树状结构。回到旧节点继续提问，会长出新分支，而不是覆盖原来的路线。

**在 Pi 里意味着什么：** `/tree` 用来查看和切换同一 Session 内的节点；`/fork` 与 `/clone` 则会创建新的 Session 文件。当前 Context 只沿选中的有效路径构造，不会同时把所有失败分支都发给模型。离开分支时还可以生成摘要，保留其中值得带走的信息。

**相关：** [Session](#session) · [Context](#context) · [Pi Sessions 官方说明](https://pi.dev/docs/latest/sessions)

## Compaction {#compaction}

**人话解释：** Compaction 是在上下文变长时，用摘要替代一部分较早消息、同时保留近期原始内容的机制，从而腾出继续工作的空间。

**在 Pi 里意味着什么：** Pi 会在接近模型窗口限制时自动压缩，也可以通过 `/compact` 手动触发。压缩改变的是后续发送给模型的上下文表示，不会撤销已经写入磁盘的文件；摘要也可能遗漏细节。压缩前先保存目标、范围、完成项和下一步，压缩后再从文件核对。

**相关：** [Context Window](#context-window) · [Session](#session) · [上下文与压缩](/guide/context-and-compaction)

## Prompt Cache {#prompt-cache}

**人话解释：** Prompt Cache 是模型服务对重复提示前缀的复用机制。连续请求前半部分保持一致时，服务商可能不必每次从头处理全部输入。

**在 Pi 里意味着什么：** 稳定的 System Prompt、工具定义和追加式会话有利于复用前缀；切换模型、改变工具、改走分支或执行压缩，都可能改变可复用部分。是否支持、保留多久、怎样计费由 Provider 和模型决定，Pi 只能展示它收到的用量信息。

**相关：** [Cache Hit](#cache-hit) · [System Prompt](#system-prompt) · [提示缓存入门](/guide/prompt-caching)

## Cache Hit {#cache-hit}

**人话解释：** Cache Hit 表示当前请求有一部分输入成功复用了已有缓存。它描述“重复计算省下了多少”，不是给回答质量打的分数。

**在 Pi 里意味着什么：** 高命中可能降低延迟或输入成本，但输出仍可能漏项；低命中也可能只是刚换模型、刚压缩或缓存已过期。不同 Provider 返回的缓存字段并不统一，界面没有显示命中数据也不必然是故障。任务是否完成仍应检查真实产物。

**相关：** [Prompt Cache](#prompt-cache) · [Token](#token) · [为什么缓存命中率比较高？](/reference/faq#why-cache-hit-is-high)

## Tool / Tool Call {#tool-tool-call}

**人话解释：** Tool 是 Harness 提供给模型的外部能力，例如读取文件或执行命令；Tool Call 是模型在某一步选择并调用这个能力的动作。

**在 Pi 里意味着什么：** Pi 当前内置 `read`、`bash`、`edit`、`write`、`grep`、`find`、`ls` 等工具，不同系统和设置下的启用情况可能不同，Extension 也能注册新工具。工具说明会进入 Context，调用结果会送回 Agent Loop。工具越多不一定越好，权限和选择复杂度也会随之增加。

**相关：** [Agent Loop](#agent-loop) · [Extension](#extension) · [Pi 为什么保持少量核心工具？](/reference/faq#why-few-tools)

## Skill {#skill}

**人话解释：** Skill 是按需加载的专项能力包，用说明、脚本、参考资料和资源教 Agent 怎样完成一类任务。

**在 Pi 里意味着什么：** Pi 启动时通常只把 Skill 的名称和描述放入 Context，任务匹配后再读取完整 `SKILL.md`，这叫渐进式披露。Skill 适合固化已经跑通的工作流程，但它不是权限隔离层；Skill 也可能带脚本，或引导 Agent 执行有副作用的操作，使用前仍要审查来源。

**相关：** [Extension](#extension) · [Package](#package) · [Skill、Extension 与 Package](/guide/skills-extensions-packages)

## Extension {#extension}

**人话解释：** Extension 是加载到 Pi 进程中的 TypeScript 扩展代码，可以新增工具、命令、界面和事件处理，也能改变部分运行行为。

**在 Pi 里意味着什么：** 当文字说明不足以实现目标，例如需要拦截危险命令、增加自定义工具或保存扩展状态，才适合考虑 Extension。它以启动 Pi 的当前用户权限运行，能够执行任意代码；项目级 Extension 受 Project Trust 的加载决定影响，但被加载后并不会进入沙箱。

**相关：** [Skill](#skill) · [Package](#package) · [Pi Extensions 官方说明](https://pi.dev/docs/latest/extensions)

## Package {#package}

**人话解释：** Pi Package 是分发容器，可以把 Extension、Skill、提示模板和主题组合起来，通过 npm 或 Git 安装和共享。

**在 Pi 里意味着什么：** Package 解决的是“怎样配送一组资源”，不是新的能力层级，也不是安全容器。安装一个 Package 后，实际加载的可能是可执行 Extension，也可能是会影响 Agent 行为的 Skill。新手应先确认真实需求、检查来源与包含内容，再一次只启用一个最接近问题的资源。

![Skill 负责方法，Extension 负责运行能力，Package 负责打包和分发。](/images/diagrams/skill-extension-package.svg)

*图解：三者不是能力等级，Package 也不是安全容器。*

**相关：** [Skill](#skill) · [Extension](#extension) · [插件推荐](/plugins/)

## Sub-agent {#sub-agent}

**人话解释：** Sub-agent 是主 Agent 为一个边界清楚的子任务启动或委派的辅助 Agent，通常拥有独立 Context，并把结果交回主 Agent 合并。

**在 Pi 里意味着什么：** Pi 核心当前不内置 Sub-agent 功能；可以用独立 Session 练习分工，也可以通过 Extension 或第三方 Package 实现自动委派。多个 Agent 会增加模型调用、交接和冲突处理成本。只有子任务能够独立完成、交付格式清楚并有统一验收人时，并行才真正有价值。

**相关：** [Context](#context) · [Agent Loop](#agent-loop) · [子 Agent 如何分工](/guide/subagents)

## 本页依据与维护边界

- [Pi 官方网站](https://pi.dev/)
- [Pi 使用说明](https://pi.dev/docs/latest/usage)
- [Pi Sessions](https://pi.dev/docs/latest/sessions)
- [Pi Compaction](https://pi.dev/docs/latest/compaction)
- [Pi Skills](https://pi.dev/docs/latest/skills)
- [Pi Extensions](https://pi.dev/docs/latest/extensions)
- [Pi Packages](https://pi.dev/docs/latest/packages)
- [Pi Security](https://pi.dev/docs/latest/security)
- [什么是 Agent Harness？](/translations/what-is-a-harness)
- [98 条推文学习目录](/tweets/)

本页不维护模型清单、价格或短期插件状态。正文出现新概念时，先判断它是否会反复影响理解，再决定是否加入；第一版之外的候选词不会为了凑齐 AI 百科而提前扩张。
