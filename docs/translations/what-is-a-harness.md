---
title: 什么是 Agent Harness？
description: Earendil Product 官方文章《What is a Harness?》的完整中文译文。
prev:
  text: Agent 中的提示缓存
  link: /translations/prompt-caching
next:
  text: Agent Harness 千千万，这一个属于我
  link: /translations/mine-agent-harness
---

<span class="library-status">Earendil 官方授权中文译文 · 04</span>

# 什么是 Agent Harness？

> - **原文标题**　*What is a Harness?*
> - **作者**　Earendil Product `<rfc@earendil.com>`
> - **发布日期**　2026-08-20
> - **原文地址**　[earendil.com/posts/what-is-a-harness](https://earendil.com/posts/what-is-a-harness/)
> - **授权说明**　经 Earendil 授权改编与翻译（*Adapted and translated with permission from Earendil.*）
> - **译文许可**　[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh-hans)

**Harness**——剑桥词典释义：

*名词。* 一种由带子和腰带组成的装备，用于控制或固定人、动物或物体。

*动词。* 控制某种事物，通常是为了利用它的力量。

——

说到 harness，我首先想到的是中学时攀爬学校岩壁前穿上的那套带子和腰带。充其量，我只能算一个水平平平的攀岩者。

![Royal Robbins 攀登酋长岩，安全带上挂满攀登工具](/images/translations/royal-robbins-el-capitan-climbing.png)

*Royal Robbins 攀登酋长岩，安全带上挂满了攀登工具。摄影：[Tom Frost](https://www.frostworksclimbing.com/cool_aid.htm)。图片随 Earendil 原文授权使用。*

不过，如果你最近一直沉浸在 AI 新闻里，脑海中最典型的 harness 也许已经是 Agent Harness 了。如果是这样，这篇文章并不是写给你的。

这篇文章写给那些对 Agent Harness 有些好奇，却还不知道它是什么，而且一直不好意思开口询问的人。

让我们先回到攀岩。

攀岩时为什么要穿安全带？首先，它会支撑你、保护你。安全带连接着登山扣和绳索，防止你坠落，控制你的节奏，也约束你的路线。你还可以把粉袋、岩塞工具和快挂等其他装备挂在上面。

当你去攀登不同的山峰、选择不同的路线时，这套安全带也可以随身带走。你甚至能根据地形调整安全带，以及装备环上携带的东西。攀岩安全带具有适应性，杂技演员和树艺师也会使用它。拥有它的人，可以把它变成适合自己的样子。

无论从结构还是功能来看，攀岩安全带和 Agent Harness 都有一些相似之处。

## Agent Harness

有人曾用一个简化的公式来描述：Agent = Model + Harness。这里的 Harness 指的就是 Agent Harness。但 Agent Harness 到底是什么？Agent Harness 利用 AI 模型创造 AI Agent，最早主要用于编程。如今，各类 AI Agent 的核心都有 Harness。理解 Agent Harness 的工作方式，也会帮助你理解 AI Agent 究竟是什么。

Agent Harness 是一种软件，它为 AI 模型提供运行环境。与大多数 AI 模型不同，作为最终用户的你，可以拥有自己的 Agent Harness。

软件工程师通常会在电脑的终端中直接使用 [Pi](https://pi.dev/) 这样的 Harness。不过，[OpenClaw](https://openclaw.ai/) 之类的 Harness 也可以使用 iMessage、聊天应用或电子邮件等不同界面。我们的 Harness [Lefos](https://www.lefos.com/about) 就主要通过电子邮件进行交互。

无论采用哪种界面，Harness 通常都会完成四件事：

1. 提供一组指导 AI 模型如何回应的指令，这组指令通常称为“系统提示”。
2. 描述并提供一组工具，让 AI 模型可以调用它们来响应用户请求。
3. 建立约束模型行为的框架，其中一项核心工作是形成“Agent 循环”。
4. 提供关键的转换层，让 Harness 能够配合多种不同的 AI 模型工作。

### 一、系统提示

多数 AI 模型本身都带有一套在训练过程中逐步形成和完善的规则与指引。一个广为人知的例子是 Claude Opus 4.5 的“[灵魂文档](https://gist.github.com/Richard-Weiss/efe157692991535403bd7e7fb20b6695)”，它向模型解释自己是什么，以及应当如何行动。

AI Harness 中的系统提示与它类似，但没有那么深地嵌入模型。它更像新员工入职第一天收到的工作说明：员工还没有把这些要求内化，却知道执行工作时应该遵循它们。系统提示会和每一次用户提示一起放进对话，对模型能否在这个 Harness 的语境中恰当行动十分重要。

### 二、工具

工具是用代码编写、可以由模型“调用”的一组能力。Harness 不仅会向模型描述这些工具，也会提供工具本身的软件实现。它们可能包括网页搜索工具、编写和运行代码的工具，或撰写电子邮件的工具。

关键在于，Harness 通常不会硬性规定模型应该在何时、以何种方式使用某个工具。它只是提供工具、清楚描述工具，然后让 AI 模型自己决定何时以及怎样使用。

### 三、Agent 循环

现在，一个 AI 模型已经位于 Agent Harness 中，并拥有一组指令和工具。假设这个 Harness 通过电子邮件工作，配有网页搜索、编写代码和撰写邮件三种工具；用户要求 Agent 比较当地小学的排名与考试成绩，并给出建议。它会怎样行动？

首先，模型尝试理解请求，也就是“提示”。它利用预训练获得的知识和权重，理解什么是“小学”、什么是“当地”，以及用户可能关心哪些排名。随后，它构造网页搜索查询来获取近期数据。

拿到结果后，模型可以在初始请求的语境中审阅它们。它也许发现第一次搜索没有取得正确信息，或信息还不够，于是自行决定再次搜索。模型依据自己的判断再次调用工具，这就是“循环”的第一个清晰例子。

假设相关数据已经收集齐全，模型接着决定通过“编写代码”工具制作电子表格——归根结底，电子表格也可以由代码生成。它能用这个工具完成计算并格式化结果，让内容更容易理解。然后，它再把电子表格和最初的请求进行比较。如果数据仍不能令它满意，它可能再次进入循环，回到搜索阶段。

当模型认为材料已经足够，它会调用撰写邮件工具，审阅并概括发现、写出邮件，再附上电子表格等附件。模型检查最终成果并判定任务完成，Agent 循环随之闭合。几秒钟后，用户就会收到一封包含摘要、建议和数据表的邮件。你可以在[这个 Pi 会话](https://pi.dev/session/#b23f2459599f8439327f65c90ee95d06)中查看 Agent 循环的实际样子。

### 四、转换层

转换层让同一个 Harness 可以配合不同 AI 模型工作。有些 Harness 甚至会在同一个 Agent 循环中使用多个模型，因为不同模型可能擅长不同任务。

转换层之所以关键，还因为它把控制权交给了最终用户。用户可以让自己的 Harness 使用 Anthropic 的模型、OpenAI 的模型，或者探索通常具有良好性价比——也就是每项任务成本——的开放权重模型。

这层转换能力会把一部分权力和杠杆从 AI 实验室转回最终用户手中。如果人们能够在自己的电脑上、本地拥有并运行 Harness，就能保留自主权：自由改造自己的工具，也能在本地保存那些随着时间推移构成人机通信记录的会话。

与其依附某家 AI 实验室发布的单一应用，用户可以选择使用并逐渐建立与自己 Harness 的关系。在前面的例子里，用户可以把同一封邮件分别交给 OpenAI、Anthropic 和开放权重模型，然后比较结果与成本，并把所有回答保存在一个地方，而不是让三份答案分别留在三个应用里。

## 把 Harness 变成你自己的

与 AI 模型本身不同，你可以拥有并改造 Harness。就像攀岩安全带一样，你可以让它成为自己的工具。人们喜欢 Pi 的原因之一就在这里。

Pi 是一个极简的 Agent Harness。它的系统提示很短，默认工具也很少。开箱即用时，它刻意不挡在用户和模型之间。不过，人们在使用 Pi 的过程中，可以按照自身需求扩展和塑造它：修改系统提示，或者设计适合自己工作流的 [Extension](https://pi.dev/packages)，再把这些 Extension 分享给其他人。原文写作时，Pi 用户相互分享的 Extension 已超过 5,000 个。

Pi 还是免费、开源的软件，运行在你自己的笔记本电脑上。这意味着人们现在可以拥有一个位于自己硬件之上、能够帮助自己运用 AI 的工具。

## 中立的开源 Harness 是自主权工具

Harness 并非一开始就是开源和中立的。首个流行的 Agent Harness Claude Code，并不是为了提供模型无关的转换层，而是为了让用户在本地电脑上使用 Claude 模型编程。此后，OpenClaw、OpenCode、Hermes 和 Pi 等免费开源 Agent Harness 的兴起令人鼓舞。

Earendil 正在把 Pi 建设成一个中立的 Harness，为 Pi 用户提供能力上的选择与自由。我们也在探索，怎样让 Harness 带来的好处与自主权惠及更广泛的人群。

如今，许多人担忧越来越大的 AI 公司拥有过多权力和影响力，其中一些人可能选择完全避开 AI。Earendil 相信，我们可以通过打造软件和开放协议，弥合分歧与无知，培养持久的喜悦与理解，从而增强人类的自主权。

我们无法通过忽视当今已有的技术实现这一目标，而要睁大眼睛、牢牢握住把手去驾驭它：确保是我们挥舞锤子，而不是锤子挥舞我们。

::: info 译者说明
本文为 Earendil Product 原文的完整中文译文，原文配图随文章授权使用并保留摄影者署名。中文译文及适配部分经授权按 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh-hans) 发布；如有歧义，请以[英文原文](https://earendil.com/posts/what-is-a-harness/)为准。
:::

## 继续阅读

- [英文原文：What is a Harness?](https://earendil.com/posts/what-is-a-harness/)
- [下一篇：Agent Harness 千千万，这一个属于我](/translations/mine-agent-harness)
