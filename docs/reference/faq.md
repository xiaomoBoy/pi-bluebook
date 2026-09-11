---
title: Pi 常见问题 FAQ
description: 集中回答初学者最常问的 20 个 Pi 问题，并连接到热词解释、主线课程和官方资料。
prev:
  text: 参考手册
  link: /reference/
next:
  text: Pi 故障排查手册
  link: /reference/troubleshooting
---

<span class="library-status">FAQ · 先找问题，再继续学习</span>

# Pi 常见问题 FAQ

这里优先给结论，不在同一页复制一遍完整教程。找到与你相同的问题后，先读短答，再沿“继续阅读”进入对应热词或课程。

涉及 Pi 产品、工具、Provider、权限和版本行为的回答核验于 **2026-09-11**。实际界面与本页不一致时，以 [Pi 最新官方文档](https://pi.dev/docs/latest) 和你本机 `pi --help` 为准。

## 快速查找

### 认识 Pi

1. [Pi 到底是什么？](#what-is-pi)
2. [Pi 和 Pi Coding Agent 有什么区别？](#pi-vs-pi-coding-agent)
3. [Pi 和 Claude Code、Codex 有什么区别？](#pi-vs-other-agents)
4. [Agent Harness 到底是什么？](#what-is-agent-harness)
5. [Pi 为什么设计得这么简单？](#why-pi-is-minimal)
6. [Pi 为什么保持少量核心工具？](#why-few-tools)

### 模型、成本与本地运行

7. [Pi 自带模型吗？](#does-pi-include-models)
8. [Pi 可以使用哪些模型？](#which-models)
9. [本地 Agent 和本地模型是一回事吗？](#local-agent-vs-local-model)
10. [为什么说 Pi 比较省 Token？](#why-pi-uses-fewer-tokens)
11. [Pi 的缓存命中率为什么经常比较高？](#why-cache-hit-is-high)

### 会话与上下文

12. [Context 和 Session 有什么区别？](#context-vs-session)
13. [Context Window 满了会发生什么？](#context-window-full)
14. [Compaction 会把以前的聊天记录删掉吗？](#does-compaction-delete-history)
15. [Pi 有长期记忆吗？](#does-pi-have-long-term-memory)

### 扩展与安全

16. [Skill、Extension 和 Package 有什么区别？](#skill-extension-package)
17. [Skill 和 MCP 应该怎么选？](#skill-vs-mcp)
18. [Extension 是不是装得越多越好？](#more-extensions-better)
19. [Pi 安装第三方插件安全吗？](#are-third-party-packages-safe)
20. [Project Trust 是不是沙箱？](#is-project-trust-a-sandbox)

## Pi 到底是什么？ {#what-is-pi}

**短答：Pi 是一个极简、可扩展的终端 Agent Harness，不是大语言模型。**

它负责把模型、工具、Session、Context 和工作目录连接起来，让模型能够读取文件、执行命令并持续处理任务。真正完成推理的是你通过 Provider 接入的模型；Pi 负责组织这套工作过程。

![Pi 把用户目标连接到模型、工具、项目文件和 Session，并负责组织整个工作过程。](/images/diagrams/pi-harness-overview.svg)

*图解：模型负责判断，Pi 负责把判断变成可执行、可保存、可验收的工作。*

**继续阅读：** [Pi](/reference/glossary#pi) · [Agent Harness](/reference/glossary#agent-harness) · [导论：为什么读这本书](/guide/introduction)

## Pi 和 Pi Coding Agent 有什么区别？ {#pi-vs-pi-coding-agent}

**短答：在日常使用里，两者通常指向同一个终端产品，不需要硬拆成两个软件。**

官方网站直接使用 Pi 这个名字，安装包则叫 `@earendil-works/pi-coding-agent`。讨论安装、命令和界面时，可以把 Pi Coding Agent 理解为完整名称；讨论源码、SDK 或组成模块时，再区分具体包和底层能力。

**继续阅读：** [Pi Coding Agent](/reference/glossary#pi-coding-agent) · [Pi 官方网站](https://pi.dev/)

## Pi 和 Claude Code、Codex 有什么区别？ {#pi-vs-other-agents}

**短答：它们都能把模型带进真实工作，但默认能力、产品边界和定制方式不同，不能只做“谁更强”的排名。**

Pi 的核心取向是保持小，把子 Agent、计划模式、权限弹窗等工作流选择留给用户通过 Extension、Package 或外部隔离环境补充。Claude Code 和 Codex 的功能会持续更新，真正比较时应固定日期、模型、任务、权限与验收标准，而不是把模型能力和 Harness 能力混在一起。

**继续阅读：** [Coding Agent](/reference/glossary#coding-agent) · [从 98 条推文留下的十条判断](/guide/lasting-principles)

## Agent Harness 到底是什么？ {#what-is-agent-harness}

**短答：它是模型外面负责“组织工作”的那层软件。**

Harness 会准备系统提示和 Context，向模型描述可用工具，执行模型选择的 Tool Call，把结果送回 Agent Loop，并保存 Session。同一个模型换到不同 Harness 后，可能因为这些组织方式不同而表现不同。

**继续阅读：** [Agent Harness](/reference/glossary#agent-harness) · [什么是 Agent Harness？](/translations/what-is-a-harness)

## Pi 为什么设计得这么简单？ {#why-pi-is-minimal}

**短答：这是产品取向，不是“还没做完”。**

Pi 把核心保持小，让用户按真实需求选择模型、工具和工作流，也减少默认 Context 与隐藏行为。代价是使用者要更清楚自己安装了什么、开放了哪些权限，以及最终怎样验收结果。

**继续阅读：** [Pi 官方设计原则](https://pi.dev/docs/latest/usage#design-principles) · [从 98 条推文留下的十条判断](/guide/lasting-principles)

## Pi 为什么保持少量核心工具？ {#why-few-tools}

**短答：少量默认工具让基础工作流更容易理解，也减少模型每轮需要选择和处理的工具说明。**

Pi 当前内置 `read`、`bash`、`edit`、`write`、`grep`、`find`、`ls` 等工具，其中最常被概括的是读、写、编辑和执行命令四类核心能力；Windows 还会出现 PowerShell 入口。不要把“默认简洁”写成“永远只有四个内置工具”，需要的新能力可以由 Extension 增加。

**继续阅读：** [Tool / Tool Call](/reference/glossary#tool-tool-call) · [Pi 使用说明](https://pi.dev/docs/latest/usage#tool-options)

## Pi 自带模型吗？ {#does-pi-include-models}

**短答：不自带。安装 Pi 不等于已经获得模型或调用额度。**

Pi 负责组织 Agent 工作流，真正的推理由 Provider 提供的模型完成。开始使用前，你仍需通过受支持的订阅登录、API Key、本地模型路由或自定义 Provider 建立可用连接。

**继续阅读：** [登录与模型设置](/guide/connect-model) · [Pi Providers](https://pi.dev/docs/latest/providers)

## Pi 可以使用哪些模型？ {#which-models}

**短答：使用 Pi 当前内置目录或你配置的 Provider 所支持的模型，不建议在 FAQ 里维护一张容易过时的完整型号表。**

运行 `/model` 查看当前环境真实可选项；也可以通过官方支持的自定义模型和 Provider 方式扩展。选模型时同时考虑任务类型、稳定性、费用、速度和 Context Window，不要只看排行榜。

**继续阅读：** [登录与模型设置](/guide/connect-model) · [Pi Providers](https://pi.dev/docs/latest/providers)

## 本地 Agent 和本地模型是一回事吗？ {#local-agent-vs-local-model}

**短答：不是，它们描述的是两个不同位置。**

本地 Agent 表示 Pi 进程运行在你的电脑或服务器上；本地模型表示推理也在你控制的硬件上完成。你可以本地运行 Pi、连接云端模型，也可以让本地 Pi 通过 llama.cpp 等方式连接本地模型，文件位置与推理位置要分别判断。

![本地运行的 Pi 可以连接云端 Provider 和模型，也可以通过本地接口连接在自有硬件运行的模型。](/images/diagrams/local-agent-model.svg)

*图解：先问 Agent 在哪里运行，再问模型在哪里推理。*

**继续阅读：** [Agent Harness](/reference/glossary#agent-harness) · [Pi llama.cpp 指南](https://pi.dev/docs/latest/llama-cpp)

## 为什么说 Pi 比较省 Token？ {#why-pi-uses-fewer-tokens}

**短答：不是因为 Pi 有一种能自动消除 Token 的技术，而是它的默认 System Prompt、基础工作流和按需扩展比较克制。**

Skill 采用渐进式加载，稳定前缀还能在 Provider 支持时利用 Prompt Cache。不过，读入大文件、堆积工具结果或同时启用许多扩展仍会消耗 Context；真实费用要以当前模型服务商的计费记录为准。

**继续阅读：** [Token](/reference/glossary#token) · [Skill](/reference/glossary#skill) · [提示缓存入门](/guide/prompt-caching)

## Pi 的缓存命中率为什么经常比较高？ {#why-cache-hit-is-high}

**短答：连续会话中的稳定前缀有机会被 Provider 重复利用，但并不是每个模型都会返回同样的缓存数据。**

Pi 较短的基础提示、相对稳定的工具说明和追加式 Session，有利于保持相同前缀；切换模型、调整工具、改变旧分支或执行 Compaction 都可能改变缓存。命中率高不代表答案正确，仍要独立验收产物。

**继续阅读：** [Prompt Cache](/reference/glossary#prompt-cache) · [Cache Hit](/reference/glossary#cache-hit) · [Agent 中的提示缓存](/translations/prompt-caching)

## Context 和 Session 有什么区别？ {#context-vs-session}

**短答：Session 是保存下来的完整会话结构，Context 是当前这一轮实际发送给模型的输入。**

Pi 的 Session 可以包含多条分支、工具结果和压缩记录；模型当前只看到从选中路径构造出的内容以及本轮加入的其他材料。因此“历史还在”不等于“模型现在仍能看到所有细节”。

![Session 保存完整历史，Pi 从选中路径、项目文件和压缩摘要组装当前 Context 后发送给模型。](/images/diagrams/context-session-compaction.svg)

*图解：Session 负责保存，Context 决定模型这一轮实际能看到什么。*

**继续阅读：** [Context](/reference/glossary#context) · [Session](/reference/glossary#session) · [Session 与续写](/guide/sessions)

## Context Window 满了会发生什么？ {#context-window-full}

**短答：模型不能继续无限接收新内容，Pi 通常需要压缩较早历史或重新组织任务。**

Pi 会根据模型窗口和预留回复空间判断何时自动 Compaction，也可以由用户手动执行 `/compact`。如果任务已经混入大量无关内容，开启新的 Session 可能比反复压缩更清楚；无论采用哪种方式，都应先把关键状态写入文件。

**继续阅读：** [Context Window](/reference/glossary#context-window) · [Compaction](/reference/glossary#compaction) · [上下文与压缩](/guide/context-and-compaction)

## Compaction 会把以前的聊天记录删掉吗？ {#does-compaction-delete-history}

**短答：在 Pi 当前实现中，Compaction 主要改变后续送给模型的旧历史表示，不等于把整个 Session 文件简单删掉。**

Pi 会写入压缩摘要和保留边界，原会话仍用于记录历史结构；但模型后续看到的是摘要加近期原文，早期细节可能没有进入摘要。压缩也不会恢复或撤销磁盘文件，所以关键决定仍要另外落盘并复查。

**继续阅读：** [Compaction](/reference/glossary#compaction) · [Pi 中的压缩机制](/translations/compaction-in-pi) · [Pi Compaction](https://pi.dev/docs/latest/compaction)

## Pi 有长期记忆吗？ {#does-pi-have-long-term-memory}

**短答：Pi 原生有可恢复的 Session，但不要把它等同于会跨任务自动整理经验的长期 Memory 系统。**

Session 让你续写同一工作历史，Context 决定模型本轮能看到什么；跨 Session、跨项目保留偏好和经验，通常需要文件、Skill、自建 Extension 或第三方 Package。重要知识最好保存为可读、可审查、可版本管理的项目文件。

**继续阅读：** [Session](/reference/glossary#session) · [Context](/reference/glossary#context) · [无法随身带走的会话](/translations/session-portability)

## Skill、Extension 和 Package 有什么区别？ {#skill-extension-package}

**短答：Skill 教它怎么做，Extension 增加或改变运行能力，Package 负责打包和分发这些资源。**

同一需求先手动跑通，重复流程再整理成 Skill；只有确实缺少可执行能力时才开发或安装 Extension；准备跨项目或给别人复用时再考虑 Package。三者没有由低到高的等级关系。

![缺少方法时选择 Skill，缺少运行能力时考虑 Extension，需要分发时再使用 Package。](/images/diagrams/skill-extension-package.svg)

*图解：先确认真实需求，再决定是否需要代码能力和分发。*

**继续阅读：** [Skill](/reference/glossary#skill) · [Extension](/reference/glossary#extension) · [Package](/reference/glossary#package)

## Skill 和 MCP 应该怎么选？ {#skill-vs-mcp}

**短答：先判断你缺的是“做事方法”，还是一个需要稳定调用的外部工具接口。**

固定流程、检查标准和参考资料优先写成 Skill；已有 CLI 能清楚完成的工作，可以先让 Pi 读取帮助并调用 CLI。Pi 核心当前不内置 MCP；只有确实需要结构化暴露外部能力、并愿意承担工具说明、认证和维护成本时，再通过 Extension 或 Package 接入 MCP。

**继续阅读：** [Skill](/reference/glossary#skill) · [Tool / Tool Call](/reference/glossary#tool-tool-call) · [Skill、Extension 与 Package](/guide/skills-extensions-packages)

## Extension 是不是装得越多越好？ {#more-extensions-better}

**短答：不是。数量增加会同时增加来源、权限、兼容性和排查成本。**

Extension 可以注册工具、改变提示或拦截运行事件，多个扩展一起启用后，很难判断结果究竟由哪一个造成。先保持最小配置，出现真实需求后一次只加入一个，并分别记录启用前、启用后和停用恢复的现象。

**继续阅读：** [Extension](/reference/glossary#extension) · [插件推荐与选择方法](/plugins/) · [第一个 Extension](/guide/first-extension)

## Pi 安装第三方插件安全吗？ {#are-third-party-packages-safe}

**短答：不能默认安全；“能安装”只说明格式兼容，不代表来源、代码和权限已经通过审查。**

Extension 以当前用户权限运行并可执行任意代码，Skill 也可能引导 Agent 运行脚本或产生副作用。安装前检查作者、仓库、实际包含资源、依赖和权限；处理重要文件时使用最小权限、备份或隔离环境，并在安装后做一次可逆的小范围验证。

**继续阅读：** [Package](/reference/glossary#package) · [权限、隔离与验收](/guide/safety) · [Pi Packages 安全说明](https://pi.dev/docs/latest/packages)

## Project Trust 是不是沙箱？ {#is-project-trust-a-sandbox}

**短答：不是。Project Trust 只控制是否加载项目级设置、资源、Package 和 Extension。**

一旦开始在目录中工作，Pi 的内置工具和已加载 Extension 仍以当前用户权限运行；`AGENTS.md`、`CLAUDE.md` 等上下文文件也有单独的加载规则。真正隔离不可信项目，需要容器、虚拟机、受限账户或其他操作系统级边界，不能只依赖“拒绝信任”。

![Project Trust 只决定是否加载项目资源，Pi 的文件、命令和网络能力仍由账户、容器或虚拟机限制。](/images/diagrams/project-trust-boundary.svg)

*图解：Trust 管“是否加载”，隔离环境管“能够做什么”。*

**继续阅读：** [Pi Security](https://pi.dev/docs/latest/security) · [权限、隔离与验收](/guide/safety)

## 还没有找到答案？

先用站内搜索输入中英文关键词，例如“上下文 / Context”“压缩 / Compaction”“子 Agent / Sub-agent”。如果问题需要完整操作步骤，请回到[蓝皮书主线](/guide/)；如果它来自真实使用且本页没有覆盖，可以在 [GitHub Issues](https://github.com/xiaomoBoy/pi-bluebook/issues) 中说明所用版本、操作位置、预期结果和实际现象。
