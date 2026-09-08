---
title: 先把第一个任务做完
description: 小墨 Pi 学习记录第 2 阶段，收录 25 篇推文原文。
outline: false
prev:
  text: 认识 Pi
  link: /tweets/01-meet-pi
next:
  text: Session 与上下文
  link: /tweets/03-sessions-context
---

<span class="library-status">个人学习记录 · STAGE 02</span>

# 先把第一个任务做完

**这一阶段要解决的问题**　认识模型选择、入门技巧和基础界面，再回到一个可以独立验收的小任务。

这些记录里既有零基础教程，也有不同模型的使用体感。具体型号和产品状态会过时，挑选模型的方法仍然值得保留。学习时先完成任务，再比较速度与价格。

本页收录 25 篇原文。正文来自个人 Google Drive 原文库，已移除 x.com 地址和 t.co 媒体短链。原文涉及的版本与产品状态以发布日期为准。

<article class="tweet-entry" id="post-2087369163572756657">

## 我测试了一下Pi Agent + Deepseek V4 Flash 终于感受到了什么才是真实的吐字速度

<span class="tweet-meta">2026-08-12 10:42:44 · 小墨原文</span>

> 我测试了一下Pi Agent + Deepseek V4 Flash 终于感受到了什么才是真实的吐字速度
>
> 简直是原地起飞，基本上没有什么停顿，前面Claude和GPT用多了再用其他就没有感觉慢的模型了，但是今天这个测试的速度，可能才是我真正想要的AI 生成速度
>
> 什么时候国产也可以和国外模型能力齐平或者超越，我会毫不犹豫全面切回国产模型

</article>

<article class="tweet-entry" id="post-2087775404090114120">

## Pi Agent + 最新的Deepseek V4 Pro会擦除怎么样的火花？

<span class="tweet-meta">2026-08-13 13:36:59 · 小墨原文</span>

> Pi Agent + 最新的Deepseek V4 Pro会擦除怎么样的火花？
>
> 今天我就用这两个组合写一个炫酷的粒子特效页面，结果是让我惊喜的。
>
> 主要是Pi Agent几乎没有什么系统提示词，所以能最好的测试模型的原生能力，跑分可以作假很多时候都是高分低能，但是把这些外部影响去掉之后，留下来的就是模型最根本的能力。
>
> 整体效果很不错，这个提示词我在Qwen和Kimi都跑过，从流畅度和完整性，这次我只能说Deepseek还是牛逼的！

</article>

<article class="tweet-entry" id="post-2091511349431898427">

## 其实Pi 相关网站不用收藏那么多，只要几个就够了。

<span class="tweet-meta">2026-08-23 21:02:18 · 小墨原文</span>

> 其实Pi 相关网站不用收藏那么多，只要几个就够了。
>
> 官网：
> 文档、安装、更新都从这进，不要一上来先搜第三方教程。
>
> Skill 文档：
> 怎么写 SKILL.md、放哪、什么时候加载。重复流程优先写成 Skill，别先上 MCP。
>
> 扩展文档：
> 要加命令、拦危险操作、改状态栏才看这个。Skill 是说明书，扩展是改运行时。
>
> 包装安装：
> pi install 怎么用。扩展带系统权限，装之前先看安全说明。
>
> 插件市场：
> 装包先在这搜，比群里复制命令靠谱。
>
> 官方源码
> 权限拦截、沙箱、subagent 示例都在仓库里。
>
> 中文文档：
> 英文看着费劲就看这个，快速开始够用。
>
> 插件合集：
> 还想找插件再翻这个，当目录用。
>
> 建议你一定要先实操起来，结合文档一起看。不然收藏再多，有没有什么实际的提升。

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2091682103109017691">

## 很多人问我 Pi Agent 和 Deepseek Harness 有什么区别？

<span class="tweet-meta">2026-08-24 08:20:49 · 小墨原文</span>

> 很多人问我 Pi Agent 和 Deepseek Harness 有什么区别？
>
> 其实这两条路看起来不一样，本质是一回事：都是给你一个能跑起来的 Agent 壳子，但是模型和工具需要自己往里面对接。具体会长成什么样，只有你自己知道。
>
> 这两个我都用了一段时间，比较明显的差异点：
>
> 1.  Pi 默认极简，系统提示词很少；DSH 更完整，一上来就给你一套能干活的架子
>
> 2.  Pi 哪里不舒服就补 Skill、写扩展；DSH 是万物皆插件，连 Harness 自己都能改，核心都可以直接替换
>
> 3.  Context 处理不一样。DSH 工具结果太长会裁中间，裁掉就没了；Pi 走的是先压缩、完整内容落盘，需要再读回来
>
> 4.  对插件的态度也在分叉。DSH 越加越开放，主打一个万物皆可换；Pi 最近反而在划边界，哪些是对话、哪些是运行时、哪些能持久化
>
> 5.  体感上，Pi 更像角色编辑器，DSH 更像把「怎么造 Agent」整套开源出来
> 所以别问哪个更强。一个是先给你干净的底盘，一个是先给你能改的全套零件。
>
> 虽然两个Agent 有这么多不同，但是本质还是提供了相当高的自由度的Agent，一个是基于插件，一个是最少的干预，各有各的优点

</article>

<article class="tweet-entry" id="post-2091896626931749132">

## Pi Agent 第一步，肯定是设置好看的状态栏🔥

<span class="tweet-meta">2026-08-24 22:33:16 · 小墨原文</span>

> Pi Agent 第一步，肯定是设置好看的状态栏🔥
>
> 我这里给大家推荐 pi-footer 这个项目。
>
> 它不是简单换个颜色，而是把 Pi 当前的模型、Provider、Thinking Level、Context 使用率、Token 消耗、Session 费用、运行时间和 Git 状态，全都放到状态栏里。
>
> 平时 Pi 跑久了，最容易忽略的就是 Context 还剩多少、用了多少 Token、当前是什么模型。装上 pi-footer 之后，这些信息看一眼就知道，不需要频繁输入命令检查。
>
> 它目前内置了 10 套预设模式，比较常用的是：
>
> 1. compact：信息精简，适合屏幕较窄的终端。
>
> 2. powerline：彩色分块效果，最好看，但建议搭配 Nerd Font。
>
> 3. git-heavy：重点显示分支、文件修改、代码增删和同步状态。
>
> 4. pi-footer：接近 Pi 原生状态栏，改动不大，但可以自由编辑。
>
> 5. powerline-bright / blocks / mono：分别是亮色、多行分块和黑白高对比风格。
>
> 除了直接使用预设，你还可以自己增删状态组件、调整顺序、修改颜色和图标，甚至做成多行状态栏。喜欢简单就少放几个，想把 Agent 和项目状态都摆出来，也可以自己慢慢组合。
>
> 需要注意的是，Powerline 风格最好搭配 Nerd Font，不然部分图标可能显示不完整。
>
> 我视频里面就是没有安装Nerd Font，导致显示的图标不全。但是对我来说已经够用了，再做一些细分和优化就完全够了。所以意见大家把它用起来。

</article>

<article class="tweet-entry" id="post-2092509979408580806">

## Pi的零基础实战，万字长文教程终于来了🔥

<span class="tweet-meta">2026-08-26 15:10:30 · 小墨原文</span>

> Pi的零基础实战，万字长文教程终于来了🔥
>
> 终于有时间把Pi 学习内容整理成文章了，没有一上来就讲基础概念，而是直接带你实操。
>
> 文章桉顺序划分了五个板块：
>
> 1、认识 Pi
> 先分清它能读写哪些文件、执行哪些操作。本地 Agent 和本地模型不是一回事。
>
> 2、安装与界面
> 从练习目录装起，确认版本和登录，再认输入区、工具事件、状态栏和模型设置。
>
> 3、第一个真实任务
> 用 @ 引用会议记录，把材料、动作、限制和验收写进提示词，生成能打开的行动清单。
>
> 4、独立验收
> 不看它自己的总结。核对校验值、输出文件、负责人和截止日期，再用 AGENTS.md 和会话命令管后面的任务。
>
> 5、扩展与安全
> 分清 Skill、Extension、Package。Project Trust 不是沙箱，「不要访问目录外」只是提示词，不是系统锁。
>
> 只要你认真跟着教程实操，我相信你也可以从一个Pi小白蜕变成一个玩转Agent的大佬。
>
> 如果还有什么想了解，可以在评论区留言，下次我努力出对应的内容文章😂

</article>

<article class="tweet-entry" id="post-2092599173191434612">

## Pi Agent 零基础实操，万字长文就怕你们没耐心看🔥

<span class="tweet-meta">2026-08-26 21:04:56 · 小墨原文</span>

> Pi Agent 零基础实操，万字长文就怕你们没耐心看🔥
>
> 我专门把这篇万字长文浓缩成了几个关键点，做成了视频给你观看。
>
> 文章里面主要的几个章节都有复述，而且还有相关的动画和命令。
>
> 最主要也是我想尝试一下用知识小短片的方式，来科普AI相关的知识，如果大家喜欢以后，我会多尝试一些方向。

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2092808237339087232">

## Pi 里模型不用多，三档就够。

<span class="tweet-meta">2026-08-27 10:55:40 · 小墨原文</span>

> Pi 里模型不用多，三档就够。
>
> 1、GPT 5.6 Sol
> 主力。改代码、看结构、排问题、任务稍微绕一点，都先丢给它。它不是最便宜的，但少返工。我现在不会一上来就用免费模型硬刚复杂活，省那点钱，后面改的时间更贵。
>
> 2、DeepSeek
> 日常整理、批量改文件、写清单、重复性活，Flash 就够；要推理、要对齐逻辑，再上 Pro。Pi 的 Context 干净，接 DeepSeek 缓存和账单都更好看。能用这档解决的，就别把 Sol 拉来搬砖。
>
> 3、OpenRouter
> 免费额度和刚出的新模型从这进 Pi。新模型先跑两三个小任务：整理一份纪要、改几个文件名、读一个小仓库。手感对了再进正式项目；不对就换，不心疼。别拿还没验证的模型改你真正在用的代码。
>
> 具体建议就一条：先把默认使用好的模型当主力，便宜模型干杂活尤其是重复性高的劳动。
>
> 最后保留一个 OpenRouter 来作为兜底和白嫖，防止主力模型不可用不能排查问题，最主要是免费模型量大管饱，测试还是体验都很不错。

</article>

<article class="tweet-entry" id="post-2092853199053148319">

## 本地模型+ Pi Agent，才是本地模型正确打开方式🔥

<span class="tweet-meta">2026-08-27 13:54:20 · 小墨原文</span>

> 本地模型+ Pi Agent，才是本地模型正确打开方式🔥
>
> 今天看到Pi + 本地 Qwen3.8 模型的测试视频 ，我才发现，对于本地 Agent 来说，上下文的大小可能是成为下一个讨论的热点。
>
> 虽然本地模型虽然没有按 Token 收费，但是因为硬件限制，上下文可能只能支持256k，甚至64K。
>
> 总结下来：
>
> 1、上下文越长，等待时间越久
>
> 每次 Agent 调模型，都要先处理前面的上下文。云端可能只是账单变贵，本地模型则很直接，Prompt 越长，Prefill 越慢，你能明显感觉到 Agent 越聊越卡。
>
> 2、上下文还会真实占用你的硬件资源
>
> 长期 Session、Tool Result、各种插件说明全部塞进去，最后吃的不只是 Token，还有 KV Cache、内存和显存。
>
> 尤其本地跑 Qwen3.8-27B 这种模型，本身硬件资源就没有云端那么富裕，Pi 默认 Prompt 短、工具少的优势反而会被放大。
>
> 3、插件越多，本地模型反而越容易吃亏
>
> Pi 最开始只有很少的工具，Skill 又是按需加载，这种设计以前看起来只是“极简”。
>
> 但是放到本地模型场景，你会发现这些无关的 Tool Schema、日志、网页内容，少一点就意味着模型每一轮少处理一点垃圾数据。
>
> 4、省 Token 在本地其实变成了省时间
>
> 在本地因为Token免费了，我们更在意的应该是时间的消耗，因为如果运行的太慢，时间消耗就是一种成本了。
>
> 以前是：省 Token = 省钱，但是现在本地模型：
>
> 省 Token = 更低延迟 + 更少资源占用 + 更大的有效 Context + Agent 可以工作得更久。
>
> 所以最近看 Qwen3.8 和 Pi 的时候，我反而越来越理解 Pi 为什么一直在 上下文上做减法。
>
> 以前只知道它有极简的设计和高效的缓存，现在回过头来看，这套设计天然就契合本地模型的现实情况。
>
> 以后真的到了每家每户都可以自己在家部署自己的大模型，那我们就需要想怎么在有限的算力前提下，越快完成自己的需求越好。

</article>

<article class="tweet-entry" id="post-2092899784797667540">

## 看到GPT推出表情包功能，立马给我心心念念的Pi 安排上了。

<span class="tweet-meta">2026-08-27 16:59:27 · 小墨原文</span>

> 看到GPT推出表情包功能，立马给我心心念念的Pi 安排上了。
>
> 给它生成了一组表情包，以后别人来问我，我就去看发自己的Pi表情包了😂

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2093506603890958446">

## Pi Agent 跑国产大模型，和我预想的差不多

<span class="tweet-meta">2026-08-29 09:10:44 · 小墨原文</span>

> Pi Agent 跑国产大模型，和我预想的差不多
>
> 项目里有个接口会偶发失败，提交以后转圈，刷新又好了。日志不太干净，就让它们自己翻，找出原因，并给出能改的地方。
>
> 几个模型的体感差挺多。
>
> 1.  GLM 5.3 Flash：跑得比较久，最后能说个大概，但分析偏干，改哪里还是不够明确
>
> 2.  DeepSeek V4

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2093634905037230252">

## 同一个模型，换一个Agent Harness，就像换了一个模型？

<span class="tweet-meta">2026-08-29 17:40:33 · 小墨原文</span>

> 同一个模型，换一个Agent Harness，就像换了一个模型？
>
> 最近我一直在看 Pi + Qwen3.8 这类本地模型实测，越看越觉得，以前把 Agent 能力都归因到模型本身，可能一开始就想错了。
>
> 模型肯定是重要的，但是现在 Harness 在AI的使用当中，起到越来越关键性的作用了。

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2093888400738922672">

## 分享我最推荐的4个Pi Agent使用技巧🔥

<span class="tweet-meta">2026-08-30 10:27:51 · 小墨原文</span>

> 分享我最推荐的4个Pi Agent使用技巧🔥
>
> 我玩Pi 时间也不短了，我就分享一些我自己的使用技巧，不是简简单单的命令技巧，是一些从根本上的技巧分享
>
> 1、别一上来装一堆 Extension
>
> Pi 本身最大的优势就是轻。
>
> 我一般先裸用，真遇到重复需求，再加 Skill 或 Extension。否则工具越来越多，最后反而把 Pi

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2093978662697828756">

## Claude Code、Codex、DeepSeek Harness 和 Pi，看起来都在做 Agent，但走的其实是四条完全不同的路。

<span class="tweet-meta">2026-08-30 16:26:32 · 小墨原文</span>

> Claude Code、Codex、DeepSeek Harness 和 Pi，看起来都在做 Agent，但走的其实是四条完全不同的路。
>
> 以前我也喜欢比较谁写代码更强，但最近坚持研究 Pi，我越觉得真正应该在意的：它想替用户决定多少东西，又愿意把多少控制权交给你。
>
> 1、Claude Code：越来越像一个完整的 Agent 产品
>
> Claude Code

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2094345513344663712">

## DeepSeek Harness 和 Pi，你觉得谁更强？🔥

<span class="tweet-meta">2026-08-31 16:44:16 · 小墨原文</span>

> DeepSeek Harness 和 Pi，你觉得谁更强？🔥
>
> 如果只是看表面，两个都很像：都是开源、都 是MIT、都说能力用插件加，给用户足够的自由度。
>
> 但是如果拆开来看，其实重心根本不在同一个地方。
>
> 1、Pi 护住的是循环，dsh 拆掉的是循环
> Pi 默认就 read / write / edit / bash，系统提示词压得很短。

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2094658406976241811">

## Flash 模型已经能干活了，很多人还不知道上Pi有多爽🔥

<span class="tweet-meta">2026-09-01 13:27:35 · 小墨原文</span>

> Flash 模型已经能干活了，很多人还不知道上Pi有多爽🔥
>
> 这事看起来挺别扭。V4 Flash、GLM-5.3 Flash、Qwen 那一档，价格压得很低，但是工作能力一点也不差。
>
> 日常的比如：改改文件、跑个脚本、补一下测试用例，应付日常的简单任务基本上没啥问题。

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2094684026028339324">

## 用了两周 Pi，你应该知道的必备技巧🔥

<span class="tweet-meta">2026-09-01 15:09:23 · 小墨原文</span>

> 用了两周 Pi，你应该知道的必备技巧🔥
>
> Pi 乍一看像是一个很轻的 Agent，实际是把登录改造、路由重构、顺手问一句文档全堆进同一条 Session。

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2095082604169146610">

## Fable 5.1 出来了，进 Pi 就一句话：别当默认引擎🔥

<span class="tweet-meta">2026-09-02 17:33:12 · 小墨原文</span>

> Fable 5.1 出来了，进 Pi 就一句话：别当默认引擎🔥
>
> 1、针对任务选模型
>
> 整体测试里，科学终端从 24.7% 拉到 52.6%，办公自动化从 17.1% 拉到 31.4%，差不多翻倍。我最关心的 Agent 编程从 42.0% 到 55.8%。只看模型，这波提升不小。
>
> 但在 Pi

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2095103024012353851">

## Pi 模型厂商支持的还是不够多🔥

<span class="tweet-meta">2026-09-02 18:54:20 · 小墨原文</span>

> Pi 模型厂商支持的还是不够多🔥
>
> 在我使用Pi 的过程中，我有一个感觉越来越明显：
>
> 很多时候所谓模型支持，很多时候只代表可以把请求完整的发出去，仅此而已。
>
> 但是它不代表Pi 里面，就能和官方 Harness 一样完整工作。
>
> 1、DeepSeek 的问题更多出现在 Tool Call 和 Thinking

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2095381382801551533">

## Pi+ Gemini 3.8 Flash 真是快到飞起😂

<span class="tweet-meta">2026-09-03 13:20:26 · 小墨原文</span>

> Pi+ Gemini 3.8 Flash 真是快到飞起😂
>
> 跑了一下鹈鹕自行车测试，只花了二十几秒就完成了，真的和其他厂商的AI断崖式领先。
>
> 但是测试结果页不赖，整体完整的还是可调参数都是非常不错的，尤其是嘴巴的弧度，第一波的时候是一个静态图，后面加上参数就动起来。
>
> 大家来看看效果👇🏻

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2096048107951972445">

## 这就是Pi速度，模型刚出就更新😂

<span class="tweet-meta">2026-09-05 09:29:46 · 小墨原文</span>

> 这就是Pi速度，模型刚出就更新😂
>
> Pi 已经支持最新的GPT-6模型，速度真的太快了
>
> 只需要一行命令：“pi update - -models”，就可以更新最新的模型列表直接使用即可
>
> Pi都第一时间跟上了，Hermes啥时候把GPT-6对接上。

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2096247146937028914">

## GPT-6 越贵，Pi 的价值反而越大🔥

<span class="tweet-meta">2026-09-05 22:40:40 · 小墨原文</span>

> GPT-6 越贵，Pi 的价值反而越大🔥
>
> Astra 我感觉最大的问题不是模型强度，而是额度不耐烧普通的plus会员每几轮对话就烧完了。
>
> API 的价格已经涨到输入 $10/M、输出 $50/M，官方还明确提醒，Work / Codex 里 Astra 会比 Sol 更快吃掉额度。
>
> 这时候 Pi 的优势就开始被放大了。
>
> 有人专门测过

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2096391875913744841">

## GPT-6 越来越贵，本地模型越来越重要🔥。

<span class="tweet-meta">2026-09-06 08:15:46 · 小墨原文</span>

> GPT-6 越来越贵，本地模型越来越重要🔥。
>
> 最近X上，我发现一个很有意思的组合：
>
> Pi + Qwen3.8 27B。
>
> 以前本地模型最大的问题不是跑不起来，而是放进 Agent 以后，感觉只能聊天但是真正的干活搭配Agent，总有一种力不从心的感觉。
>
> 但 Qwen3.8 27B 开始有点不一样了。
>
> 27B Dense、256K 原生上下文，而且这代明显强化了 Coding 和 Agent 能力。
>
> 再配上 Pi 这种极简 Harness：
>
> 1、默认只有 4 个核心工具，本地模型不用先啃一大坨 Tool 定义
>
> 2、System Prompt 足够轻，对本地模型最昂贵的 Prefill 更友好
>
> 3、Ollama、llama.cpp 都能直接接，模型完全跑在自己机器上
>
> 4、没有 API 账单，也没有额度焦虑，真正可以让 Agent 在后台慢慢干活
>
> 但从规模上来讲，肯定是没办法和GPT-6抗衡的，但是它的优点你也不能忽视。
>
> 我日常的活动绝大部分都是改文件、跑脚本、整理项目、简单 Coding Qwen本地模型完全可以胜任。
>
> 如果真碰到解决不了的问题，再 /model 切到 GPT-6。
>
> 这样一来，GPT-6 不再是 Pi 的默认模型，而更像一个偶尔请出来解决难题的专家。
>
> Pi + 本地 Qwen3.8 负责干活，GPT-6 负责兜底。
>
> 我感觉这可能比单纯追求一个最强模型，更接近我想要的 Agent 使用方式。

</article>

<article class="tweet-entry" id="post-2096515795815633403">

## GPT-6 越来越强，我的Pi Agent反而越来越干净🔥

<span class="tweet-meta">2026-09-06 16:28:11 · 小墨原文</span>

> GPT-6 越来越强，我的Pi Agent反而越来越干净🔥
>
> 我日常使用的Pi其实已经很干净了，但是现在能力越来越强，反而越干净，可能说起来有点反直觉。
>
> 以前模型能力不够强，我们习惯性的往Agent里面不断加东西：Skill、AGENTS.md、各种 Prompt，还有大家应该都用过的，PowerSkill或者一整套的skill。
>
> 但是 GPT-6 Astra 出来以后，OpenAI Codex 的 Eric Provencher 专门提了一件事：
>
> 以前帮旧模型少犯错的规则，现在可能已经开始拖新模型后腿了。
>
> OpenAI 官方的 Astra 指南其实也在提醒，GPT-6 对 Skill、AGENTS.md 里的指令比以前更敏感，里面如果有过时、冲突或者写得太死的规则，它反而会老老实实执行。
>
> 所以如果你准备换 GPT-6，我觉得可以顺手给自己的 Agent 做一次大扫除：
>
> 1、删掉以前为了防模型犯傻写进去的重复规则，比如强制读完整仓库、每次都跑一大堆测试。
>
> 2、Skill 描述尽量短一点，只说什么时候该用，真正的流程、文档、脚本等需要的时候再加载。
>
> 3、重新翻一遍 AGENTS.md，尤其是那些用了半年一年，自己都已经忘记为什么加进去的规则。
>
> 这些东西越用越回归本质，就是把所有的能力都交给AI，以后AI的能力越强，这些束缚越来越不需要，给他一个干干净净的地方，然后让他自己操作即可。

</article>

<article class="tweet-entry" id="post-2097249000252649861">

## DeepSeek 发布全新系列模型： deepseek-v4.1-flash-expires-on-0910

<span class="tweet-meta">2026-09-08 17:01:41 · 小墨原文</span>

> DeepSeek 发布全新系列模型： deepseek-v4.1-flash-expires-on-0910
>
> 号称：采用了新的模型结构，原生多模态支持、能力更强、速度更快、且成本更低。
>
> 第一时间我就把他放到了Pi Agent上面跑，感觉300 token/s都说少了，就一个字，快
>
> 使用步骤：直接把deepseek-v4-flash 的模型名称换成deepseek-v4.1-flash-expires-on-0910，直接使用就可以了
>
> 刚跑的鹈鹕骑自行车的测试👇🏻

</article>

## 下一步

完成这一阶段后，继续阅读[第 3 阶段　理解 Session 与上下文](/tweets/03-sessions-context)。

