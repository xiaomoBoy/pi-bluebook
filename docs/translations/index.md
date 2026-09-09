---
title: Earendil 官方授权译文
description: 经 Earendil 正式授权发布的三篇 Pi 相关文章完整中文译文。
prev:
  text: 参考手册
  link: /reference/
next:
  text: 无法随身带走的会话
  link: /translations/session-portability
---

<span class="library-status">官方授权译文 · AUTHORIZED TRANSLATIONS</span>

# Earendil 官方授权译文

这里收录 Earendil Engineering 关于 Pi、Agent 会话和提示缓存的三篇文章中文译文。三篇译文均已获得 Earendil 正式授权，并按原文顺序完整翻译。

每一页都保留原文标题、作者、发布日期和原文链接，并标明：

> Adapted and translated with permission from Earendil.

中文译文及适配部分按 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh-hans) 发布；英文原文版权归 Earendil 所有。

## 建议阅读顺序

### 01 无法随身带走的会话

**原文标题**　*The Session You Cannot Take With You*

**发布日期**　2026-07-30

讨论当会话依赖提供商保存的 ID、密文、托管搜索和隐藏的 Agent 消息时，为什么本地转录记录不再等于完整会话，以及一个真正可移植的推理 API 应当满足什么条件。

[阅读中文译文](/translations/session-portability) · [查看英文原文](https://earendil.com/posts/session-portability/)

### 02 Pi 中的压缩机制

**原文标题**　*How Compaction Works in Pi*

**发布日期**　2026-08-13

从 LLM 的上下文窗口讲起，说明 Pi 何时触发压缩、压缩请求如何生成交接摘要，以及压缩为什么会重置提示缓存。

[阅读中文译文](/translations/compaction-in-pi) · [查看英文原文](https://earendil.com/posts/compaction-in-pi/)

### 03 Agent 中的提示缓存

**原文标题**　*Prompt Caching In Agents*

**发布日期**　2026-07-22

解释 KV 缓存、会话亲和性、前缀匹配、工具配置与 TTL，并说明缓存命中如何影响编程 Agent 的延迟、价格和设计。

[阅读中文译文](/translations/prompt-caching) · [查看英文原文](https://earendil.com/posts/prompt-caching/)

::: info 翻译与许可说明
三篇英文原文的版权归 Earendil 所有。中文译文及适配部分经 Earendil 授权按 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh-hans) 发布。译文力求忠实保留原文结构、观点、示例和链接；如有歧义，请以对应的英文原文为准。
:::
