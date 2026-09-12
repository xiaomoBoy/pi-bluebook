---
title: Earendil 官方授权译文
description: 经 Earendil 正式授权发布的十一篇 Pi、Agent Harness、代码质量与公司愿景文章完整中文译文。
prev:
  text: 参考手册
  link: /reference/
next:
  text: 无法随身带走的会话
  link: /translations/session-portability
---

<span class="library-status">官方授权译文 · AUTHORIZED TRANSLATIONS</span>

# Earendil 官方授权译文

这里收录 Earendil 关于 Pi、Agent Harness、会话机制、代码质量与公司愿景的十一篇文章中文译文。十一篇译文均已获得 Earendil 正式授权，并按原文完整翻译。

每一页都保留原文标题、作者、发布日期和原文链接，并标明：

> Adapted and translated with permission from Earendil.

中文译文及适配部分按 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh-hans) 发布；英文原文版权归 Earendil 所有。

## 建议阅读顺序

前六篇最贴近 Pi 学习：先理解会话、压缩和缓存，再认识 Harness，并从非工程师和性能案例两个角度理解 Pi。第七至十篇记录 Pi 加入 Earendil 的背景，以及 Earendil 对可信、个性化软件的长期愿景。第十一篇进一步讨论 AI 代码的质量评估。

| 你现在想弄清什么 | 建议先读 | 读完回到哪里 |
| --- | --- | --- |
| Pi 为什么这样设计 | 《什么是 Agent Harness？》《这个 Harness 属于我》 | [导论](/guide/introduction)、[运行原理](/guide/how-pi-works) |
| 长对话为什么会丢细节 | 会话可移植性、压缩、提示缓存三篇 | [模块三](/guide/context-and-compaction)、[压缩实验](/cases/compaction-before-after) |
| Agent 能运行，代码就合格了吗 | 《衡量代码的粗糙程度》《Pi：极简而高效》 | [代码修复](/cases/code-repair)、[毕业项目](/cases/graduation-project) |
| 想了解作者与公司的背景 | 公告、反思、制高点、通信邀请 | 作为选读，不是安装前置条件 |

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

### 04 什么是 Agent Harness？

**原文标题**　*What is a Harness?*

**发布日期**　2026-08-20

借用攀岩安全带的比喻，解释系统提示、工具、Agent 循环和模型转换层，以及用户为什么可以拥有并改造自己的 Harness。

[阅读中文译文](/translations/what-is-a-harness) · [查看英文原文](https://earendil.com/posts/what-is-a-harness/)

### 05 Agent Harness 千千万，这一个属于我

**原文标题**　*There are many agent harnesses, but this one is mine.*

**发布日期**　2026-09-01

一位非工程师讲述如何从不敢询问技术术语，走到用 Pi 整理收件箱、制作小工具，并真正拥有自己的工作方式。

[阅读中文译文](/translations/mine-agent-harness) · [查看英文原文](https://earendil.com/posts/there-are-many-agent-harnesses-but-this-one-is-mine/)

### 06 Pi：极简而高效

**原文标题**　*Pi, Minimal and Performant*

**发布日期**　2026-08-04

通过 Databricks 与 Shopify 案例讨论 Pi 的上下文纪律、每项任务成本，以及“极简但可扩展”为什么可能带来更高效率。

[阅读中文译文](/translations/pi-minimal-performant) · [查看英文原文](https://earendil.com/posts/pi-autoresearch-and-databricks/)

### 07 Pi 与 Lefos 正式发布

**原文标题**　*Announcing Pi & Lefos*

**发布日期**　2026-04-08

Earendil 宣布收购 Pi、Mario Zechner 加入团队，以及 Lefos 进入公开 Alpha 阶段。

[阅读中文译文](/translations/announcing-pi-and-lefos) · [查看英文原文](https://earendil.com/posts/announcing-pi-and-lefos/)

### 08 关于今日公告的一些思考

**原文标题**　*A Reflection on our Announcement Today*

**发布日期**　2026-04-08

Armin 与 Colin 回顾 Earendil 的起点，说明 Pi、Lefos 和早期支持者背后共同的长期主义与信任原则。

[阅读中文译文](/translations/announcement-reflection) · [查看英文原文](https://earendil.com/posts/announcement-reflection/)

### 09 制高点

**原文标题**　*The High Ground*

**发布日期**　2026-02-12

讨论 2026 至 2031 年软件与计算的变化，并提出未来制高点位于能力、定制、个性化、愉悦、简单和信任的交汇处。

[阅读中文译文](/translations/the-high-ground) · [查看英文原文](https://earendil.com/posts/the-high-ground/)

### 10 邀请你开启一场通信

**原文标题**　*An Invitation to Begin a Correspondence*

**发布日期**　2026-01-18

Earendil 邀请读者通过开放写作和电子邮件，加入一场关于软件、人类自主权与理解的长期通信。

[阅读中文译文](/translations/invitation) · [查看英文原文](https://earendil.com/posts/invitation/)

### 11 如果编程已经不成问题，接下来呢？

**原文标题**　*If coding is solved, what now?: Measuring the sloppiness of code*

**发布日期**　2026-09-10

从代码行数、冗长程度与侵蚀程度等指标出发，讨论为什么功能正确的 AI 代码仍会让代码库逐渐恶化，并借助多轮编程评估说明自动评判的局限，以及人类直觉与品味为何仍然不可缺少。

[阅读中文译文](/translations/measuring-code-sloppiness) · [查看英文原文](https://earendil.com/posts/measuring-code-sloppiness/)

::: info 翻译与许可说明
十一篇英文原文的版权归 Earendil 所有。中文译文及适配部分经 Earendil 授权按 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh-hans) 发布。译文力求忠实保留原文结构、观点、示例、图片和链接；如有歧义，请以对应的英文原文为准。原文配图随文章授权使用，并在译文中保留摄影者、制图方或项目来源署名。
:::
