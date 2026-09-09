---
title: Pi 中的压缩机制
description: Earendil Engineering 官方文章《How Compaction Works in Pi》的完整中文译文。
prev:
  text: 无法随身带走的会话
  link: /translations/session-portability
next:
  text: Agent 中的提示缓存
  link: /translations/prompt-caching
---

<span class="library-status">Earendil 官方授权中文译文 · 02</span>

# Pi 中的压缩机制

> - **原文标题**　*How Compaction Works in Pi*
> - **作者**　Earendil Engineering `<rfc@earendil.com>`
> - **发布日期**　2026-08-13
> - **原文地址**　[earendil.com/posts/compaction-in-pi](https://earendil.com/posts/compaction-in-pi/)
> - **授权说明**　经 Earendil 授权改编与翻译（*Adapted and translated with permission from Earendil.*）
> - **译文许可**　[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh-hans)

如果你曾在 [Pi](https://pi.dev)、Claude Code 或 Codex 这类编程 Agent 中进行过一次很长的编程会话，那么你一定触发过压缩。本文将解释压缩的工作原理，以及 Pi 会在什么时候需要压缩。

## 一次 LLM 对话

大语言模型（LLM）的[上下文窗口](https://en.wikipedia.org/wiki/Context_window)是有限的。上下文窗口就是模型在生成回复时能够“看到”的内容。LLM 所采用的 [Transformer 架构](https://en.wikipedia.org/wiki/Transformer_(deep_learning))限制了它能处理的输入量。编程 Agent 会话的输入包含此前的所有消息和工具调用，并会随着工作推进不断增长。一旦输入超出上下文窗口，LLM 就会拒绝这次请求。

与 Pi 这样的编程 Agent 交互时，Agent 会向 LLM 发送请求并接收回复。每次请求都包含系统提示、[`AGENTS.md`](https://agents.md/) 等已加载文件、工具定义和对话历史。

编程 Agent 向 LLM 发出的第一次请求包含这些初始上下文，以及用户的第一条消息。

```text
请求 1：
[系统][工具][用户]
```

这会开启一个轮次。LLM 可能先返回一条包含工具调用的助手消息。Agent 程序执行这些调用，再把包含工具结果在内的完整对话发送给 LLM，然后得到另一条助手消息。当助手完成输出时，这个轮次就结束了。

```text
请求 1 结束后：
[系统][工具][用户][助手：工具调用][工具结果][助手]
                     <---------------->     ^      <---->
                         LLM 返回            |      LLM 返回
                                             |
                                        Agent 生成
```

我们继续工作，并发送另一条消息。

```text
请求 2：
[系统][工具][用户][助手：工具调用][工具结果][助手][用户]
                                                       ^
                                                    新用户消息
```

每个轮次都会让对话变长。最终，历史记录会超出上下文上限。下一次请求便会返回类似 `Request exceeds the maximum size`（请求超出最大大小）的错误。

```text
[系统][工具][用户][助手][……][工具结果][用户]
                                      ^
                                超出上下文窗口
```

## 处理上下文溢出

当现有对话无法原样继续时，我们有两个选择。

1. 开始一段新的空白对话，不带上已经积累的上下文。这样会丢弃历史记录，包括先前的决定和尚未解决的工作。这样做仍可能是个好主意，因为[上下文越长，LLM 的输出表现会下降](https://www.trychroma.com/research/context-rot)。
2. 如果我们想继续这段对话，就为对话上下文创建一个更小的表示。这就是压缩所做的事情。

## 压缩

理论上，压缩有很多种实现方式。例如，我们可以编写一个确定性函数，保留对话中的部分内容并丢弃其余内容。但在实践中，压缩通常会通过一次 LLM 请求来总结对话历史。

压缩会用一个压缩后的表示替换部分历史记录，从而为后续消息和工具调用留出空间。

```text
[系统][工具][压缩结果][用户]
                         ^
                      新消息
```

## Pi 的实现

下面更仔细地看看 Pi 具体如何[实现压缩](https://pi.dev/docs/latest/compaction#summary-format)。

当对话变得太长时，Pi 会用压缩来总结较早的内容，同时保留最近的工作。当上下文大小接近上下文窗口总容量时，压缩会自动触发；用户也可以使用 `/compact` 命令手动触发。

Pi 会在一个轮次结束后检查是否需要自动压缩。在此之前，每次请求都会在现有提示末尾继续追加内容，因此可以复用已经缓存的前缀。如果 Pi 在一个轮次进行到一半时遇到上下文溢出错误，也可能在轮次中途执行压缩。

压缩时，Pi 会原样保留一定数量的最近消息。

```text
压缩前：
[系统 + 工具][较早轮次][近期保留的消息]
```

由于 Pi 使用[可配置的 token 预算](https://pi.dev/docs/latest/compaction#when-it-triggers)，实际保留的消息数量并不固定。Pi 当前默认保留 2 万 token，大约相当于 5 到 20 个轮次。在这个分界点之前的所有消息都会被提取、序列化并接受总结。

## Pi 的压缩提示

对于编程 Agent 来说，一份好的摘要，理想效果就像一次从上一班到下一班的交接简报。Pi 的压缩提示强调，现有上下文中的大量内容已经不再相关；下一次 LLM 请求只应继续携带仍然重要的上下文。

因此，Pi 发出的压缩请求不同于普通对话请求。

1. 独立压缩请求所用的系统提示不同。它不会告诉 LLM“你是一名专业的编程助手”，而是告诉它：[“你是一名上下文摘要助手。”](https://github.com/earendil-works/pi/blob/47610217098d9ba8f22d223fa7c1413f9f5fd759/packages/coding-agent/src/core/compaction/utils.ts#L152-L158)
2. 压缩请求中的用户消息也不同。它要求生成[“一份关于这条对话分支的结构化摘要，供以后返回时作为上下文。”](https://github.com/earendil-works/pi/blob/47610217098d9ba8f22d223fa7c1413f9f5fd759/packages/coding-agent/src/core/compaction/compaction.ts#L463-L498)提示中规定了目标、进度和关键决定等章节。
3. 这是一次独立请求，不会使用现有的任何对话历史，因此它可以换用另一种 LLM，而不会产生不必要的成本。

压缩结果会作为一条压缩记录追加到 Pi 会话中，随后会话便可以继续。压缩请求结束后，上下文已经被压缩。

```text
压缩后：
[系统][工具][摘要][近期轮次][新用户消息]
```

此时，对话上下文中又有了容纳更多消息的空间。

Pi 会把压缩摘要以纯文本形式保存在会话中。这样一来，压缩后的上下文仍然可读且[可移植](./session-portability)，因为我们可以在 Pi 中切换模型，并继续使用这份摘要。

## 压缩与提示缓存

LLM 提供商使用[提示缓存](./prompt-caching)来降低同一段对话中重复请求的成本。在活跃的编程会话里，对于已经由模型生成过的上下文，我们支付的费用会更低。这种缓存要求前缀完全匹配，因此压缩会打破提示缓存。

```text
压缩前的缓存：
[系统][工具][较早历史][近期保留轮次]
<------------------ 已缓存前缀 ------------------>

压缩后的第一次请求：
[系统][工具][摘要][近期保留轮次][新用户消息]
<-- 可复用 -->^
              |
        第一个发生变化的 token
              |
              +-- 从这里开始的所有内容都必须重新计算
```

保留的轮次仍然包含相同的 token，但它们现在出现在一个不同前缀之后，因此先前缓存的状态无法再复用。

压缩后的新请求会重新开始受益于提示缓存。

## 实验

Pi 具有很强的可扩展性和可塑性，因此你可以用自己的压缩机制替换它原有的机制。如果想测试另一种压缩机制，可以让 Pi 创建一个带有自定义压缩提示的 Extension。

::: info 译者说明
本文为 Earendil Engineering 原文的完整中文译文。中文译文及适配部分经授权按 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh-hans) 发布；英文原文版权归 Earendil 所有。如中文表述与原文存在歧义，请以[英文原文](https://earendil.com/posts/compaction-in-pi/)为准。
:::

## 继续阅读

- [英文原文：How Compaction Works in Pi](https://earendil.com/posts/compaction-in-pi/)
- [上一篇：无法随身带走的会话](/translations/session-portability)
- [下一篇：Agent 中的提示缓存](/translations/prompt-caching)
