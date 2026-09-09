---
title: Pi：极简而高效
description: Earendil 官方文章《Pi, Minimal and Performant》的完整中文译文。
prev:
  text: Agent Harness 千千万，这一个属于我
  link: /translations/mine-agent-harness
next:
  text: Pi 与 Lefos 正式发布
  link: /translations/announcing-pi-and-lefos
---

<span class="library-status">Earendil 官方授权中文译文 · 06</span>

# Pi：极简而高效

> - **原文标题**　*Pi, Minimal and Performant*
> - **作者**　Earendil `<rfc@earendil.com>`
> - **发布日期**　2026-08-04
> - **原文地址**　[earendil.com/posts/pi-autoresearch-and-databricks](https://earendil.com/posts/pi-autoresearch-and-databricks/)
> - **授权说明**　经 Earendil 授权改编与翻译（*Adapted and translated with permission from Earendil.*）
> - **译文许可**　[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh-hans)

## Pi 的优势在于极简

AI 让代码变得廉价。结果是，许多公司为了追求更好的性能，开始打造越来越大的工具：更长的提示、更多的编排、更多层次和更多复杂度。这也从根本上提高了工具的使用成本。Pi 选择了相反的方向。

Pi 是一个有意选择极简路线的编程 Harness。它开箱只有 4 个工具，[系统提示](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/src/core/system-prompt.ts#L121-L159)和工具定义加起来不到 1,000 token。背后的想法是：大多数工作依靠基础能力就能完成；如果你需要更多，就自己构建。

越来越多的证据表明，Pi 的设计不只是更干净，也更便宜、性能更好。用户发现，即使还没有安装适应个人工作流和需求的 Extension，原生 Pi 也能产出行业领先的结果。下面 Databricks 与 Shopify 的案例，都得到了理想结果。

## 案例研究

### Databricks：每项任务的成本

Databricks 最近分享了一项研究：《[在 Databricks 数百万行代码库上测试编程 Agent](https://www.databricks.com/blog/benchmarking-coding-agents-databricks-multi-million-line-codebase)》。他们希望了解，哪些编程 Agent 在真实编程任务上表现最好，以及任务表现会怎样随着价格变化。

为了避免受到已经[过度饱和的外部基准](https://arxiv.org/html/2602.16763v3)影响，他们根据团队工程师经常执行的工作创建了内部基准。结果符合我们的预期，却可能令行业中的很多人感到意外。按他们的说法，模型通过哪一种 Harness 被调用，会显著影响成本和质量；在许多案例中，Pi 这样的简单 Harness 在他们的工作负载上表现最好。

![Databricks 编程 Agent 基准中的成本与任务通过率对比](/images/translations/databricks-cost-per-task.png)

*Databricks 编程 Agent 基准中的成本与任务通过率对比。制图：[Databricks](https://www.databricks.com/blog/benchmarking-coding-agents-databricks-multi-million-line-codebase)。图片随 Earendil 原文授权使用。*

使用 Opus 4.8、xhigh 时，Pi 取得了最高的总体通过率，成本却显著低于 Claude Code 和 Codex。

#### 极简 Harness，效果可以测量

Pi 的亮点在于，它不会用大量默认设置和指令把模型包裹起来，再让它们迷失在[指令层级](https://openai.com/index/the-instruction-hierarchy/)中。Pi 尽量不挡住模型，团队则可以添加自己的工作流真正需要的东西。

Databricks 的研究很有启发性，因为它把模型与 Harness 分开进行了比较。

他们报告说：在相同思考等级下，通过不同 Harness 运行同一个模型时，每项任务的成本差异显著——某些情况下超过两倍——但质量保持不变。我们把这种特征称为 Pi 的“上下文纪律”。Pi 每轮发送的上下文大约少三倍；它更好地管理上下文，维持更紧凑的工作集，并用更少轮次完成任务。

我们同意，成本分析应当考虑端到端工程经济，而不能只看每 token 的价格。模型层面也是如此。例如，我们观察到，使用 Haiku 4.5 运行复杂工作流时，成本往往高于 Sonnet 4.6，特别是涉及代码执行时。原因很简单：前者需要更多轮次才能成功完成任务。

如今，我们在 Harness 层面也看到了同样现象：强大、单价更高的模型配合高性能 Harness，可能比相反组合更便宜。

### Shopify 构建 Pi Autoresearch：可扩展胜过臃肿

极简主义是 Pi 核心理念的一部分。极简之所以行得通，是因为它并不等于僵化。事实上，Pi 是首批为可扩展和自我编辑而打造、并获得广泛使用的 Agent 基础设施之一。

Shopify 的实践为 Pi 的设计提供了另一项有价值的外部验证。在 [Shopify Engineering 的文章](https://shopify.engineering/autoresearch)中，David Cortés 描述了如何直接把 `pi-autoresearch` 构建为 Pi Extension：只需让 Pi“创建一个 Autoresearch Extension”。Pi 会阅读自己的 Extension 文档，然后从那里开始建立新的工作流。

Autoresearch 是一种使用编程 Agent 进行优化的自主循环。你提出改变后，它会运行实验，找出哪些做法有效、哪些会造成回退。只要目标可以测量，它就能丢弃产生回退的实验，并持续改进。

对 Shopify 和[其他使用者](https://x.com/pidotdev/status/2080616483072225778?s=20)来说，Autoresearch Extension 很快就成为重要的内部生产力工具。Shopify 报告的案例包括：单元测试速度提升 300 倍、React 组件挂载速度提升 20%、多个项目的构建时间缩短，甚至 pnpm 的性能也得到改进。

![Shopify pi-autoresearch 项目的实验记录界面](/images/translations/shopify-autoresearch.png)

*Shopify `pi-autoresearch` 项目的实验记录界面。图片来源：[davebcn87/pi-autoresearch](https://github.com/davebcn87/pi-autoresearch)，随 Earendil 原文授权使用。*

重点在于，Pi 并没有把这些工具全都内置进去。它做的是让用户能够非常轻松地构建它们。Pi 不会假设供应商最了解你的工作流、并试图把每一种工具都塞进产品；它假设你最了解自己，并把扩展能力交给你，让你塑造自己的工作方式。

## 为什么极简路线在今天更有优势

大约一年前，人们还可以认为原生 Harness 具有结构性优势，因为模型是围绕它们构建的。但这个论点已经越来越弱。

前沿模型如今普遍能够很好地理解终端或类终端的编程环境，并在其中行动。Anthropic 最近将 Claude Code 的系统提示缩减 80%，就是一个清晰信号。因此，问题正在从“Harness 对模型有多原生”，转向“Harness 怎样管理上下文，避免冗余，并通过干净的基础能力行动”。模型需要一个清晰的环境接口，也需要一个不浪费上下文的 Harness。

Pi 提供的正是这些：更少的提示开销和重复上下文、更便宜的运行成本、更少的不必要抽象。因为 Pi 可以扩展，你并没有失去能力，而是获得了选择权。只有当复杂性“证明自己值得留下”时，你才把它加入系统。

本地模型也在快速发展，Earendil 对它们的潜力十分看好。Pi 的上下文纪律在这里尤其有价值。本地模型的上下文窗口通常更小，[预填充](/translations/prompt-caching)也可能需要很长时间，因此，保持稳定的提示前缀十分重要。上下文纪律意味着，除非用户明确要求，否则不改变上下文，从而避免持续数分钟的重新预填充。

极简的默认系统提示和工具集，再加上这种上下文纪律，让 Pi 成为本地模型的理想 Harness。

Pi 正在证明，它能够同时做到：更便宜、更极简，也更高效。

::: info 译者说明
本文为 Earendil 原文的完整中文译文，原文案例图随文章授权使用并保留制图方与项目来源。文中的版本、基准结果和项目状态对应原文发布日期。中文译文及适配部分经授权按 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh-hans) 发布；如有歧义，请以[英文原文](https://earendil.com/posts/pi-autoresearch-and-databricks/)为准。
:::

## 继续阅读

- [英文原文：Pi, Minimal and Performant](https://earendil.com/posts/pi-autoresearch-and-databricks/)
- [上一篇：Agent Harness 千千万，这一个属于我](/translations/mine-agent-harness)
- [下一篇：Pi 与 Lefos 正式发布](/translations/announcing-pi-and-lefos)
