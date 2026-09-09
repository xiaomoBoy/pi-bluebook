---
title: 延伸阅读
description: 与蓝皮书章节配套的原文研读、机制解释与补充实践。
prev:
  text: 参考手册
  link: /reference/
next:
  text: 会话为什么也要归你
  link: /translations/session-portability
---

<span class="library-status">EXTENDED READING · 与章节配套</span>

# 延伸阅读

这里不是另一套课程，而是蓝皮书章节的延伸。一次会话怎样算真正留在自己手里，长任务被压缩以后会留下什么，状态栏里的缓存数字又在说明什么——需要继续追问这些机制时，再从对应章节进入这里。

Earendil Engineering 的三篇文章帮我把这些问题连了起来。这个板块保留原文的技术事实和思想来源，再用我自己的学习顺序重做标题、结构、例子和练习。它们不是逐段翻译，也不是几百字的内容概述。

## 按课程章节阅读

### 01 会话为什么也要归你

**参考原文**　*The Session You Cannot Take With You*

**作者**　Earendil Engineering `<rfc@earendil.com>`

**适合什么时候读**　已经完成一两个真实任务，开始保存和续写会话

**对应章节**　[第 7 课 · 会话的保存与续写](/guide/sessions)

从一份会议记录任务开始，检查聊天、工具证据和项目文件能不能一起留下。文章最后会带你命名会话、写一份可接手的决定记录，再导出会话。

[阅读学习文章](/translations/session-portability) · [查看英文原文](https://earendil.com/posts/session-portability/)

### 02 压缩前先给下一棒留下交接

**参考原文**　*How Compaction Works in Pi*

**作者**　Earendil Engineering `<rfc@earendil.com>`

**适合什么时候读**　一个任务已经持续很多轮，准备进入下一阶段

**对应章节**　[第 8 课 · 上下文与压缩](/guide/context-and-compaction)

把上下文压缩理解成一次工作交接。你会看见 Pi 压缩前后的输入变化，写出 `CHECKPOINT.md`，再完成一次有明确验收的 `/compact` 练习。

[阅读学习文章](/translations/compaction-in-pi) · [查看英文原文](https://earendil.com/posts/compaction-in-pi/)

### 03 别让缓存命中率带偏任务

**参考原文**　*Prompt Caching In Agents*

**作者**　Earendil Engineering `<rfc@earendil.com>`

**适合什么时候读**　已经能看懂 Pi 底部的 token、cache 和 cost

**对应章节**　[第 9 课 · 提示缓存入门](/guide/prompt-caching)

提示缓存复用的是输入前缀的计算。文章会把缓存、上下文和项目记录分开，随后让你在同一个 Pi 会话里观察两轮请求的变化。

[阅读学习文章](/translations/prompt-caching) · [查看英文原文](https://earendil.com/posts/prompt-caching/)

## 怎样使用延伸阅读

第一次阅读时先跟着例子走，不需要记住 KV cache、provider-sealed state 之类术语。每篇只完成一个小练习，亲眼看到会话、压缩或缓存怎样出现在 Pi 里。

第二次阅读可以打开英文原文对照。原作者负责提出问题并解释机制，本站负责把这些内容放进一条面向初学者的 Pi 学习路径。两部分的归属会在每一页底部单独说明。

::: info 来源与内容边界
三篇英文原文的版权归 Earendil Engineering 与发布方所有。本站保留作者、标题、发布日期和原文链接。中文文章经过重新选题、组织和实践化处理，不构成全文翻译，也不替代原文。本站新增的场景、练习与个人判断由小墨负责。
:::
