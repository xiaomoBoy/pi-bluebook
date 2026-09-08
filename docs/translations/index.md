---
title: 优质译读
description: 精选 Pi 与 Agent 工程相关文章，提供标明作者、来源和学习位置的中文摘要式译读。
prev:
  text: 从好奇到搭工作台
  link: /journey/
next:
  text: 带不走的会话
  link: /translations/session-portability
---

<span class="library-status">优质译读 · CURATED READING</span>

# 优质译读

我在学习 Pi 的过程中，有三篇文章帮我把许多零散的使用体感连了起来。它们讨论会话能否带走、上下文如何压缩，以及 Agent 为什么会使用提示缓存。

本板块提供的是中文摘要式译读，目标是帮助中文读者抓住论点、术语和与 Pi 学习路线的联系。它们不是全文逐句翻译，也不替代原文。

## 阅读顺序

### 01 带不走的会话

**原题**：*The Session You Cannot Take With You*  
**作者**：Earendil Engineering `<rfc@earendil.com>`  
**发布日期**：2026-07-30  
**学习位置**：完成“会话的保存与续写”后

如果一次 Agent 会话依赖于提供商内部、无法导出的隐藏状态，用户就很难真正拥有自己的工作记录。这篇文章给出一组很实用的可携带性检查标准。

[阅读中文译读](/translations/session-portability) · [查看原文](https://earendil.com/posts/session-portability/)

### 02 Pi 的上下文压缩如何工作

**原题**：*How Compaction Works in Pi*  
**作者**：Earendil Engineering `<rfc@earendil.com>`  
**发布日期**：2026-08-13  
**学习位置**：进入长任务与上下文模块时

上下文不可能无限增长。Pi 会保留较近的对话，并把更早的部分整理成摘要。文章解释了这个过程保留什么、改变什么。

[阅读中文译读](/translations/compaction-in-pi) · [查看原文](https://earendil.com/posts/compaction-in-pi/)

### 03 Agent 中的提示缓存

**原题**：*Prompt Caching In Agents*  
**作者**：Earendil Engineering `<rfc@earendil.com>`  
**发布日期**：2026-07-22  
**学习位置**：已经能观察会话底部 token、cache 和 cost 信息后

连续对话会反复携带相同的前缀。提示缓存能够复用已处理的部分，但模型、工具、分支与压缩都可能影响这种复用。

[阅读中文译读](/translations/prompt-caching) · [查看原文](https://earendil.com/posts/prompt-caching/)

::: info 版权与来源说明
原文版权归原作者与发布方所有。本站只提供基于原文的中文摘要、术语解释和学习联系，并在每页保留原文链接。如需引用、转载或深入研究，请以英文原文为准。
:::

