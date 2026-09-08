---
title: 带不走的会话
description: The Session You Cannot Take With You 中文摘要式译读。
prev:
  text: 优质译读
  link: /translations/
next:
  text: Pi 的上下文压缩
  link: /translations/compaction-in-pi
---

<span class="library-status">中文摘要式译读 · 01</span>

# 带不走的会话

> **英文原题**：*The Session You Cannot Take With You*  
> **作者**：Earendil Engineering `<rfc@earendil.com>`  
> **发布日期**：2026-07-30  
> **原文**：[earendil.com/posts/session-portability](https://earendil.com/posts/session-portability/)  
> **中文摘要与学习延伸**：小墨／Pi 学习蓝皮书

## 文章想解决的问题

一次 Agent 会话会包含你和模型的消息，还可能包含工具调用、工具结果、分支、压缩摘要和提供商保存的隐藏状态。关键状态如果只留在远程服务内部，单独导出聊天记录无法带走完整会话。

作者用检查、导出、重放、审计和删除五项测试衡量会话可携带性。只有一个“导出”按钮还不足以让用户拥有完整工作记录。

## 核心论点

### 本地事件记录应当是正本

作者倾向于把本地可读的事件日志视为会话的权威记录。它应当保存文字、事件顺序、工具调用和分支关系。这份记录可以被普通工具读取时，会话就不必完全绑定在某个服务商里。

### 托管 Web 搜索会留下不可见细节

原文讨论的“隐藏搜索”是托管端的 Web 搜索，不是搜索会话历史。如果搜索查询、结果排序和提供给模型的摘录没有完整进入客户端记录，导出文件就不足以重现模型当时看到的信息。这会同时影响审计和复现。

### 压缩和子 Agent 也是会话的一部分

长会话会被压缩，主 Agent 还可能把子任务分给其他 Agent。作者提醒，这些过程不应成为不可见的黑箱。一份有用的会话记录需要能说明经历了什么转换，哪些内容被保留或摘要。

## 本站学习延伸

Pi 将会话保存为本地 JSONL 文件，并提供续写、树状导航、分支、压缩与导出能力。对初学者来说，不需要立即阅读 JSONL，但应从一开始建立一个认识：会话是一份可管理的工作记录，不只是屏幕上的聊天气泡。

回到实操，你可以给重要会话命名，用 `/session` 查看信息，用 `/export` 导出，并把会话中的关键决定另外写进项目文件。

## 术语对照

| 英文 | 本站译法 | 简要理解 |
| --- | --- | --- |
| session portability | 会话可携带性 | 会话能被导出、检查并在其他环境继续使用 |
| canonical event log | 权威事件记录 | 作为会话正本的完整、可读记录 |
| replay | 重放 | 根据历史事件重建工作过程 |
| audit | 审计 | 追溯什么时候发生了什么 |

::: info 译读说明
本页是对原文论点的中文摘要和学习延伸，不是完整翻译。原文版权归原作者所有，准确表述以 [英文原文](https://earendil.com/posts/session-portability/) 为准。
:::
