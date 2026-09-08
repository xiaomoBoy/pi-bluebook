---
title: 理解 Session 与上下文
description: 小墨 Pi 学习记录第 3 阶段，收录 7 篇推文原文。
outline: false
prev:
  text: 第一次任务
  link: /tweets/02-first-tasks
next:
  text: Skill 与 Extension
  link: /tweets/04-skills-extensions
---

<span class="library-status">个人学习记录 · STAGE 03</span>

# 理解 Session 与上下文

**这一阶段要解决的问题**　弄清会话树、长期记忆、压缩、Token 与提示缓存之间的关系。

这一阶段只有七篇，却是整条学习路线的转折点。建议按时间顺序阅读，先看缓存与压缩，再看 Session Tree，最后回到“上下文越小是否越省钱”这次认识修正。

本页收录 7 篇原文。正文来自个人 Google Drive 原文库，已移除 x.com 地址和 t.co 媒体短链。原文涉及的版本与产品状态以发布日期为准。

<article class="tweet-entry" id="post-2092091965244609020">

## Pi 还有一个大家容易忽视的点，那就是缓存命中率🔥

<span class="tweet-meta">2026-08-25 11:29:28 · 小墨原文</span>

> Pi 还有一个大家容易忽视的点，那就是缓存命中率🔥
>
> 现在很多人还在比谁Agent更好用，模型更强，我更多时候关心的是，API的话账单能省多少。
>
> 有人用 Pi 接 DeepSeek V4 Flash，跑了接近 10 亿 input token，缓存命中 99.93%，最后只花了 2.65 美元。按官方说法，如果没有缓存，差不多得 132 美元。
>
> 同一模型在别的 Harness 里，缓存命中常见是 94% 到 97%。到了 Pi Agent，能稳住 99% 以上。差的这几个点，量一大，钱是指数级拉开的。
>
> 原因其实不神秘。Pi 系统提示词短，默认工具少，请求前能看、能改上下文。缓存前缀不容易被修改，命中率自然就高了。
>
> 更多时候我想说的是，可能AI使用成本才是新手小白学习Agent最大的障碍，毕竟不是所有人都能开通20或者200刀每个月的套餐。
>
> 希望以后Pi 可以越做越好，毕竟是实打实的帮我省钱👍🏻

</article>

<article class="tweet-entry" id="post-2092129372178350355">

## Pi 为什么省 Token？其实没有什么神奇缓存技术🔥

<span class="tweet-meta">2026-08-25 13:58:06 · 小墨原文</span>

> Pi 为什么省 Token？其实没有什么神奇缓存技术🔥
>
> 核心就一件事：它对 Context 很克制。
>
> 它的五大杀招：
>
> 前缀稳定：System Prompt、工具定义、AGENTS.md 等尽量少变化，Prompt Cache 更容易持续命中。
>
> 默认内容少：Pi 的 System Prompt 很薄，默认工具也少，所以基础 Context 本身就小。
>
> 历史以追加为主：Session 通常是在旧 Context 后继续追加新消息，而不是每轮重新拼 Prompt，更利于复用缓存。
>
> 按需加载：Skill 等能力只先暴露名称和描述，需要时再读取全文，避免一开始把大量无关内容塞进上下文。
>
> 长对话再 Compaction：只有 Context 太长时才压缩旧历史；Compaction 会暂时破坏缓存，但之后又会重新形成稳定前缀。
>
> 这里也纠正一下我前面的错误，Pi 不一定比其他的Agent缓存效率高，但是它通过这些方式优化对应的上下文，总体下来消耗的Token会比其他的Agent使用的更少。
>
> 整体Token消耗优化也非常重要，而不是只追求一个高缓存命中率。

</article>

<article class="tweet-entry" id="post-2092158815198380343">

## Pi 处理上下文压缩的方式，比我想象中有意思！

<span class="tweet-meta">2026-08-25 15:55:06 · 小墨原文</span>

> Pi 处理上下文压缩的方式，比我想象中有意思！
>
> 先简单说一下，Pi 原生的上下文压缩逻辑，其实非常简单：
>
> Context 快满了 → 总结旧上下文 → 保留最近消息 → 继续工作。
>
> 但是社区已经出现了好几种不同的思路：
>
> 1. pai-acp：遗忘流派，让 AI 自己决定忘掉什么
>
> 不再是等 Context 满了再统一压缩，而是让 Agent 主动去判断哪些历史已经没价值，然后提前压掉；需要时还能搜索甚至恢复。
>
> 2. pi-smart-compact：它会重点保留当前目标、修改过的文件、错误、关键决策、未完成事项，更像是一个留给自己的备忘录。
>
> 3. pi-context：把上下文当成 Git 管，可以主动 checkpoint、查看 timeline，再选择性 compact。
>
> 4. Hypa：设计思路是，最好的压缩，是就是从一开始就不让垃圾进入上下文，这样比单纯的上下文到达上限之后在压缩更省token。
>
> 5. pi-press：把压缩流程前置，上下文接近阈值时就提前生成摘要，真正需要 Compact 时可以直接切换，减少 Agent 因压缩产生的停顿。
>
> 其实看了这么多插件的设计思路，总结下来就是在合适的实际完成合适的内容选择，可能一开始就不让垃圾数据进入上下文是对的。
>
> 也有可能是提前就完成压缩操作，对你来说无感知才是最舒服的，但是需要解决的还是一个最根本的问题，Agent记忆 到底是怎么样的。
>
> 现在还没有一个盖棺定论的结论，但是这些启发和思路都是一直都在的。

</article>

<article class="tweet-entry" id="post-2092565910251004299">

## 研究完Pi 长期记忆，结果比我想象的更复杂🔥

<span class="tweet-meta">2026-08-26 18:52:45 · 小墨原文</span>

> 研究完Pi 长期记忆，结果比我想象的更复杂🔥
>
> Pi 原生更偏向于管理Session和Context，没有类似Hermes Agent Memory记忆系统，但是社区却有类似Hermes一样的记忆实现。
>
> 社区现在已经长出好几种完全不同的方案。
>
> 如果你想研究，我会推荐这四个项目：
>
> 1、pi-memory
>  最简单的文件记忆。MEMORY.md、Daily Log、Scratchpad，再加语义搜索。记忆就是真实文件，能打开、能改、能备份，不交给一个黑盒系统养着。
>
> 2、pi-hermes-memory
>  这套我比较熟。除了长期 Memory，还有 Session Search、失败记忆、用户偏好、自动整理和 Procedural Skills。它不只想让 Pi 记住东西，而是希望 Agent 能从失败、纠正和工作经历里慢慢长经验。
>
> 3、pi-honcho
>  更像独立的长期记忆层。用户记忆和项目记忆分开，习惯和偏好可以跨 Session、跨项目留着，项目知识又能单独维护。适合真把 Pi 当长期 Agent 用，而不是只当 Coding CLI。
>
> 4、pi-hindsight
>  思路比较有意思。不是每句话都往长期 Memory 塞，而是在 Context 要被压缩、Session 要结束这些节点，把真正值得留下的决策、经验、坑和项目知识提炼出来再存。
>
> 有段时间我自己也一直在研究Agent的长期记忆，而且还针对Hermes的记忆系统做了优化和魔改。
>
> 最主要不是学会了用什么，而是在学习过程中受到了很多启发，研究Pi的这些记忆插件也是一样的道理。
>
> 可能你的Pi Agent你不需要长期记忆，毕竟简介高效才是Pi的必杀技

</article>

<article class="tweet-entry" id="post-2093127901059457117">

## 我把Pi 上下文压缩，具象成了一款游戏🔥

<span class="tweet-meta">2026-08-28 08:05:54 · 小墨原文</span>

> 我把Pi 上下文压缩，具象成了一款游戏🔥
>
> 学习Pi 不要再干巴巴的看理论基础了，可以结合游戏一起学习
>
> 我就把Pi 上下文处理相关的内容做成了一款游戏，把上下文处理的特点都包含在里面。
>
> 1、隔一段时间会有一个上下文压缩能量条点击可以清除旁边的Token
>
> 2、接触对应的Token，上下文就会增加
>
> 3、默认上下文是根据时间再增加的，只有默认捡起道具才可以维持上下文不变
>
> 这些核心其实就是Pi 对上下文的处理和理解，也是我想把知识具象化的原因
>
> 在游戏中学，边学边玩，边玩边学🔥

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2093359637932445901">

## Pi 的上下文 其实不是一条聊天记录，而是从 Session Tree 里面临时构建出来的一条路径。

<span class="tweet-meta">2026-08-28 23:26:45 · 小墨原文</span>

> Pi 的上下文 其实不是一条聊天记录，而是从 Session Tree 里面临时构建出来的一条路径。
>
> 最近在研究Pi的源码，发现Pi保存的上下文在Session，只是模型的其中一个视角。
>
> 我现在才发现以前对 Agent Context 的理解还是太简单了。
>
> 1、Pi 保存的 Session 本身就是一棵树
>
> Pi 的每条 Session Entry

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2097224177887670482">

## Pi 有一个很反常识，上下文越小，不一定越省钱

<span class="tweet-meta">2026-09-08 15:23:03 · 小墨原文</span>

> Pi 有一个很反常识，上下文越小，不一定越省钱
>
> 我最近在重新看 Earendil 那篇《Prompt Caching In Agents》，我才看懂了Agent缓存没有那么简单。
>
> 以前我在使用 Agent 的时候，也会很自然地觉得，上下文 越短越好。不使用的工具和结果能删了就删了，处理好上下文越少，越省Token。
>
> 但 Prompt Cache会让这个问题变得完全不一样。
>
> Pi Agent 每一轮请求模型，并不是只发送你刚输入的新内容，而是会把 System Prompt、Tools、历史对话、Tool Call 等内容一起带上，然后把最新的消息追加到尾巴上。
>
> 但是有一个最重要的点： 需要保持Prefix 稳定，缓存才能高效的利用上。
>
> 假设一个对话已经积累了十几万 Token，其中大部分的对话格上下文都已命中了缓存。
>
> 但是你的Harness 为了节省Token清除了中间的一些可用内容，或者动态修改了前面的 Tool Definition、System Prompt，表面上看确实省掉了一部分Token消耗。
>
> 但是因为 Prefix 发生了变化，后面的几十万Token缓存可能直接失效，导致后面的上下文都需要重新缓存，消耗的Token成本反而更高。
>
> 最后你得到的结果，大概率是本末导致。
>
> 为了省几千 Token，重新计算了后面几万甚至十几万 Token。

</article>

## 下一步

完成这一阶段后，继续阅读[第 4 阶段　搭建自己的 Skill 与 Extension](/tweets/04-skills-extensions)。

