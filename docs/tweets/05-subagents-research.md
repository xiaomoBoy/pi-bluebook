---
title: 让子 Agent 学会分工
description: 小墨 Pi 学习记录第 5 阶段，收录 7 篇推文原文。
outline: false
prev:
  text: Skill 与 Extension
  link: /tweets/04-skills-extensions
next:
  text: 长期运行
  link: /tweets/06-long-running
---

<span class="library-status">个人学习记录 · STAGE 05</span>

# 让子 Agent 学会分工

**这一阶段要解决的问题**　学习怎样拆分搜索、整理、审阅任务，并检查不同 Agent 交回的证据。

子 Agent 的价值来自分工和复核。这里从不同 Agent 的体验出发，再进入多 Agent 搜索、资料对比和具体研究场景。

本页收录 7 篇原文。正文来自个人 Google Drive 原文库，已移除 x.com 地址和 t.co 媒体短链。原文涉及的版本与产品状态以发布日期为准。

<article class="tweet-entry" id="post-2090071185421955145">

## 我想分享的是，一定要多尝试不同的Agent，真的你会回来感谢我的！

<span class="tweet-meta">2026-08-19 21:39:36 · 小墨原文</span>

> 我想分享的是，一定要多尝试不同的Agent，真的你会回来感谢我的！
>
> 因为每个Agent时间都有相似之处，但是又有很多不同之处。
>
> 比如我自己最常用的，Claude Code、Codex 他们两个之间我觉得差别最大的就是生态上的差距，没有几个人可以完整的体验Claude的产品线，但是Codex可以。
>
> Pi Agent和Deepseek harness 两个从里层就有很大的区别，一个是简洁的设计AI不需要这么多，一个万物皆插件的设计思维。
>
> 还有就是我自己常用的Hermes和Openclaw，两个产品类似，但是大方向不一样，一个是讲究自进化低维护skill优先，一个是插件生态和独特的记忆体系，各有优点。
>
> 用了这么多，但是有部分核心设计都是共通的，用多了，你才能知道哪一些才是你真正需要的想用的

</article>

<article class="tweet-entry" id="post-2091841029850681551">

## Pi Agent 的 Sub-agent功能一定要用起来！

<span class="tweet-meta">2026-08-24 18:52:20 · 小墨原文</span>

> Pi Agent 的 Sub-agent功能一定要用起来！
>
> 虽然官方没有内置相关的功能，但是只需要安装插件就能用上。
>
> 再多任务并行的情况下，是帮你提效的好帮手，尤其是处理一下简单重复数据量大的时候，就非常合适。
>
> 这里我简单介绍一下工作原理：
>
> 1. 主 Agent 负责拆任务
>
> 你平时对话的 Pi 就是主 Agent。
>
> 比如分析一个大型项目，它可以让 scout 找入口文件，让 researcher 查文档，再让 reviewer 检查风险。
>
> 你只需要把目标和限制讲清楚，剩下的任务分配交给插件。
>
> 2. 每个 Sub-agent 都有独立 context
>
> 大部分插件会单独启动一个 Pi 进程，让 Sub-agent 自己读文件、调用工具。
>
> 它干完以后，只把结论交回主 Agent，不会把几十次工具调用全部塞进主对话。
>
> 好处是省 context，缺点是它不一定知道你之前聊过什么。所以任务里最好写清楚路径、目标和需要返回的结果。
>
> 3. 不同 Agent 可以使用不同模型和权限
>
> 查代码的 scout，只开放 read、grep、find。
>
> 负责 Review 的 Agent 可以看代码、跑测试，但不一定需要修改文件。
>
> 真正干活的 worker，再开放 edit、write 和 bash。
>
> 简单任务还可以交给便宜模型，复杂判断再用强模型，不需要所有 Agent 都用最贵的配置。
>
> 4. 支持单独、并行和链式执行
>
> 官方 Sub-agent 示例支持三种常见方式：
>
> Single：一个 Agent 完成一个任务
> Parallel：几个 Agent 同时处理不同任务
> Chain：scout 找代码 → planner 出方案 → worker 修改 → reviewer 检查
>
> 自由组合任务，不仅可以让任务分开跑，而且可以组合在一起跑最终的结果会聚到一起是分开处理
>
> 但是相关缺点也是有的，就是对Token的消耗会乘几倍增长，如果你的工作不是很紧急，或者是对应套餐额度不够也不建议长期使用
>
> 如果大家对这部分感兴趣，下次我就介绍一下相关的插件，把你的Pi 打造成一个多线程并行开发工作台

</article>

<article class="tweet-entry" id="post-2093160756716204485">

## Pi Agent 的 Sub-agent 我一直在用，最近我又拿 Apodex 1.1 跑了一轮多 Agent 搜索。

<span class="tweet-meta">2026-08-28 10:16:28 · 小墨原文</span>

> Pi Agent 的 Sub-agent 我一直在用，最近我又拿 Apodex 1.1 跑了一轮多 Agent 搜索。
>
> 它处理资料对比的方式，和普通 Deep Research 不太一样。
>
> Pi Agent 本身没有内置 Sub-agent，需要通过插件扩展。你可以让 scout 搜资料，researcher 整理信息，再交给 reviewer

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2093177805433704718">

## 我用Pi 接入 Apodex 1.1，让它帮我查查孙宇晨说的是真是假🔥

<span class="tweet-meta">2026-08-28 11:24:12 · 小墨原文</span>

> 我用Pi 接入 Apodex 1.1，让它帮我查查孙宇晨说的是真是假🔥
>
> 孙宇晨那篇《我的女友景甜》发出来以后，相关话题很快冲上热搜。
>
> 文章写了大量恋爱和财产纠纷细节，开头与结尾又标注了纯属虚构。随后代理律师公开谈到三千余万元财产争议，景甜一方也作出了回应。

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2093222498943025525">

## 看到这个用 Apodex 搜《红楼梦》的例子，我想到 Pi 的 Sub-agent 很适合处理这类问题。

<span class="tweet-meta">2026-08-28 14:21:48 · 小墨原文</span>

> 看到这个用 Apodex 搜《红楼梦》的例子，我想到 Pi 的 Sub-agent 很适合处理这类问题。
>
> 《红楼梦》里的很多问题都牵涉不同版本、脂批和后来的研究观点。模型如果顺着最先搜到的解释写下去，很容易把原文、校注和后人推论混在一起。
>
> 接进 Pi 以后，可以让 Sub-agent

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2094032795546849667">

## 我开始让 Pi 学我怎么分析自己的 X 推文了🔥

<span class="tweet-meta">2026-08-30 20:01:38 · 小墨原文</span>

> 我开始让 Pi 学我怎么分析自己的 X 推文了🔥
>
> 以前我复盘X推文数据，基本都是自己来，其实很浪费时间。
>
> 要去看曝光、点赞、收藏，再回头看开头有没有吸引力，中间哪一段信息密度最高，为什么有的内容明明写得不错，但就是没人看。
>
> 做多了以后我发现，其实我每次分析的思路都差不多。

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2095306131560431748">

## OMP 越做越狠了：一个 Agent，开始配一整个模型团队。

<span class="tweet-meta">2026-09-03 08:21:25 · 小墨原文</span>

> OMP 越做越狠了：一个 Agent，开始配一整个模型团队。
>
> 以前使用Pi 开启子线程代理，我都会纠结一个问题：
>
> 是不是所有的Subagent都需要继承主线程的模型等级，但是实际使用下来消耗又高，使用又慢。
>
> 但是我在 Oh My Pi 这种多 Agent Harness，找到了一个模糊的方向。

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

## 下一步

完成这一阶段后，继续阅读[第 6 阶段　把 Pi 变成长期工作流](/tweets/06-long-running)。

