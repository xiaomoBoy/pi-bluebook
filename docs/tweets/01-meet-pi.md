---
title: 从好奇开始认识 Pi
description: 小墨 Pi 学习记录第 1 阶段，收录 27 篇推文原文。
outline: false
prev:
  text: 学习目录
  link: /tweets/
next:
  text: 第一次任务
  link: /tweets/02-first-tasks
---

<span class="library-status">个人学习记录 · STAGE 01</span>

# 从好奇开始认识 Pi

**这一阶段要解决的问题**　先理解 Pi 是什么、为什么保持简洁，以及 Agent Harness 会怎样影响实际体验。

这一阶段不急着安装很多插件。先从 Pi 的定位、作者、设计取向和我的学习起点读起。文章按发布时间从早到晚排列，你会看到我怎样从“它为什么这么小”逐渐走到“我要整理自己的学习过程”。

本页收录 27 篇原文。正文来自个人 Google Drive 原文库，已移除 x.com 地址和 t.co 媒体短链。原文涉及的版本与产品状态以发布日期为准。

<article class="tweet-entry" id="post-2086991504451792928">

## Pi Agent不知道怎么就火了，我其实很早就在用了，总结下里几个优点：

<span class="tweet-meta">2026-08-11 09:42:03 · 小墨原文</span>

> Pi Agent不知道怎么就火了，我其实很早就在用了，总结下里几个优点：
>
> 1、几乎没有系统提示词，干净整洁，上下文小
>
> 2、节约token，因为几乎没有什么外置的组件
>
> 3、几乎任何地方的扩展性，哪里不舒服就可以安装扩展或者自己写插件完善
>
> 但是不建议初学者使用，因为没有内置的权限控制相关的组件，如果AI能力不强或者语义有问题可能会导致一些不可逆的后果。

</article>

<article class="tweet-entry" id="post-2087509640334746086">

## Pi Agent 已经够小够简洁了，还有比更小的Agent？

<span class="tweet-meta">2026-08-12 20:00:56 · 小墨原文</span>

> Pi Agent 已经够小够简洁了，还有比更小的Agent？
>
> 这款Agent 跑起来是需要15mb，简直是agent里面的泥石流。
>
> 采用rust语言写的，轻量便捷低消耗，主要还要增加了许多特殊的功能可以结合Claude Code、Codex等第三方Agent，真的很推荐大家去玩一下
>
> 完整内容看下面的文章👇

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2091350038165492014">

## Pi 这次锐评挺准的。

<span class="tweet-meta">2026-08-23 10:21:19 · 小墨原文</span>

> Pi 这次锐评挺准的。
>
> 现在大家还在比谁模型更强、谁 Tool 更多。
>
> 真正容易出问题的是 Agent 连续跑几小时之后：context 被裁掉，工具结果找不回来，进程死在半路，它自己都不清楚刚才干没干完。
>
> 这事我用 Hermes 的时候经常碰到。重复任务一多，token 全耗在工具日志上；中间那段一旦被 prune 掉，后面模型再聪明也只能猜。
>
> 所以我现在不太会先想着换更强的模型，更实际的还是这三件事：
>
> 1.  低复杂度、高消耗的任务，丢给本地小模型
>
> 2.  工具输出先落盘，别把 context 当成唯一记忆
>
> 3.  权限和恢复按「会挂」来设计，别按 demo 能跑完来设计
>
> 模型以后只会更便宜。Harness 这边要是不跟上，跑得越久越难受。

</article>

<article class="tweet-entry" id="post-2091562941862838780">

## Pi Agent 的口号是：There are many agent harnesses, but this one is yours.

<span class="tweet-meta">2026-08-24 00:27:19 · 小墨原文</span>

> Pi Agent 的口号是：There are many agent harnesses, but this one is yours.
>
> 翻译过来就是：Agent 很多，但这个是你的。
>
> 这也是我喜欢它的原因。
>
> 别的 Agent 一上来就帮你配好一切，省事，但你很难按照自己的想法去修改。
>
> Pi Agent反过来干，给了你一个很干净的房子，模型、工具、Skill、工作流这些都可以自己搭配选择。
>
> 我总结下来有以下几个优点：
> 1、几乎没有什么内置系统提示词，模型上下文非常干净，测试模型能力很准
>
> 2、特别省 Token，外置组件少，同样做完一件事，省下来的都是真金白银
>
> 3、哪里不舒服就补 Skill 或者写插件，扩展性很强
>
> 4、不绑死一家模型，DeepSeek、本地小模型、GPT 都可以随便接入
>
> 5、它更像角色编辑器，不是开箱即用的满级号
>
> 推荐新手学习使用，但不建议纯新手上来就当作第一个Agent使用，因为默认权限比较松，得自己有点边界意识。
>
> 但你要是已经在用 Claude Code、Codex、Hermes，真的值得把 Pi 加进日常工作当中，体验Diy Agent的乐趣
>
> 还是那句话，先用起来比什么都重要

</article>

<article class="tweet-entry" id="post-2091709706402488671">

## 很多人用 Pi，但未必知道背后这个人。

<span class="tweet-meta">2026-08-24 10:10:30 · 小墨原文</span>

> 很多人用 Pi，但未必知道背后这个人。
>
> Pi Agent 的作者叫 Mario Zechner，X 上是 @badlogicgames。奥地利人，以前不是做 AI 的，是做游戏框架的。libGDX 就是他搞出来的，Ingress、杀戮尖塔这些都用过。
>
> 后来还做过 RoboVM，公司卖了又被微软关掉，社区反噬那一套他经历过，所以现在特别不愿意自己去融一堆钱当 CEO。
>
> 2025 年底他自己折腾了一个极简 coding agent，两晚写出来，本来只给自己用。默认就四个工具：read、write、edit、bash，系统提示词压得很短，其他全靠你自己加。口号也写得很直：There are many agent harnesses, but this one is yours。
>
> 后来 Flask 作者 Armin Ronacher 的公司 Earendil 把 Pi 收了，Mario 入股并加入团队。他自己发文标题就叫 I've sold out，写得很坦率：不想再走一遍创业那套高压，家里有小孩，但又希望 Pi 能有人养着别停更。技术方向还是他拍板，核心继续开源。
>
> 这人说话冲，bio 写的是 Old man yelling at Claudes。讨厌 Agent 越做越重、提示词越写越长。他自己还专门测过 MCP 和 CLI，结论也和很多人实际感受一样：CLI 往往更省、更稳。
> 所以 Pi 长成现在这样，不是产品经理堆出来的功能清单，是一个老开源作者按自己脾气做的壳。你喜欢它干净、可改、不绑死模型，基本都能从他这个人身上对上号。
>
> 感兴趣的话可以去看他博客  @badlogicgames。产品号是 @pidotdev。

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2091721408221168104">

## 很多人用 Pi，但未必知道背后这个人。

<span class="tweet-meta">2026-08-24 10:57:00 · 小墨原文</span>

> 很多人用 Pi，但未必知道背后这个人。
>
> Pi Agent 的作者叫 Mario Zechner，X 上是 @badlogicgames。奥地利人，以前不是做 AI 的，是做游戏框架的。libGDX 就是他搞出来的，Ingress、杀戮尖塔这些都用过。
>
> 后来还做过 RoboVM，公司卖了又被微软关掉，社区反噬那一套他经历过，所以现在特别不愿意自己去融一堆钱当 CEO。
>
> 2025 年底他自己折腾了一个极简 coding agent，两晚写出来，本来只给自己用。默认就四个工具：read、write、edit、bash，系统提示词压得很短，其他全靠你自己加。口号也写得很直：There are many agent harnesses, but this one is yours。
>
> 后来 Flask 作者 Armin Ronacher 的公司 Earendil 把 Pi 收了，Mario 入股并加入团队。他自己发文标题就叫 I've sold out，写得很坦率：不想再走一遍创业那套高压，家里有小孩，但又希望 Pi 能有人养着别停更。技术方向还是他拍板，核心继续开源。
>
> 这人说话冲，bio 写的是 Old man yelling at Claudes。讨厌 Agent 越做越重、提示词越写越长。他自己还专门测过 MCP 和 CLI，结论也和很多人实际感受一样：CLI 往往更省、更稳。
> 所以 Pi 长成现在这样，不是产品经理堆出来的功能清单，是一个老开源作者按自己脾气做的壳。你喜欢它干净、可改、不绑死模型，基本都能从他这个人身上对上号。
>
> 感兴趣的话可以去看他博客  @badlogicgames。产品号是 @pidotdev。

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2091773823658131469">

## 很多人把Pi 和 Pi coding agent 搞混在了一起，傻傻的分不清，我用一分钟给你讲清楚😄

<span class="tweet-meta">2026-08-24 14:25:17 · 小墨原文</span>

> 很多人把Pi 和 Pi coding agent 搞混在了一起，傻傻的分不清，我用一分钟给你讲清楚😄
>
> 先说结论：
> Pi 是一整套底层框架（harness）， Pi coding agent 是用这套框架做出来的、专门给你写代码用的那个成品。
>
> 打个比方，Pi框架就是发动机、轮子、车架，这些配件。Pi coding agent更像是基于这些配件已经组装好的整车。
>
> 再拆细一点：
>
> 1、层级不一样
> Pi 本身包含好几层东西：统一对接各种模型的接口、agent 运行的核心循环、终端界面、扩展系统。 你平时安装后敲的那个 pi 命令，其实只是其中最上层、最常用的那个coding 版本，也就是 Pi coding agent。
>
> 2、默认给你的东西不一样
> 纯 Pi 更干净，几乎什么都不预装，完全靠你自己加。 Pi coding agent 已经默认给你配好了最基础的四件套：读文件、写文件、改文件、跑命令（read / write / edit / bash）。所以很多人一装就能直接干活。
>
> 3、扩展方式是一样的，但使用场景不同
> 不管你用的是哪个，加 Skill、写插件、装扩展，底层机制都是同一套。 区别在于：一个是我自己从零搭一个 Agent，一个是：我先用已经搭好的 coding 版本，不够再往上加。
>
> 4、为什么大家会搞混
> 因为官网、文档、群里聊天，大家口头说的Pi，十有八九指的就是那个能直接敲命令写代码的 Pi coding agent。 只有真正想改底层、做自己的 Agent、或者嵌进别的产品里的人，才会去碰完整的 Pi harness。
>
> 5、实际怎么选
> 只是想快速用 AI 写代码、改项目 → 直接装 Pi coding agent 就够了。 想自己定义 Agent 行为、改工具、改工作流、甚至做成别的形态 → 你真正在玩的是 Pi 这套底层。
>
> 如果用一句话总结： Pi 是一个壳子，包含的是作者自己的Agent哲学，Pi coding agent 是已经给你配好的那个写代码版本。 大部分人用的是后者，却以为自己在玩整个 Pi。
>
> 我想你看完这个内容，下次就不会再搞不清楚这两个区别了，这也是我自己深化内容出来的结果，一般人可能还真不会注意到这两者之间的差别。

</article>

<article class="tweet-entry" id="post-2092202209526301103">

## Pi 创作者 Mario Zechner 的 X bio 为什么会有这么一句话？

<span class="tweet-meta">2026-08-25 18:47:32 · 小墨原文</span>

> Pi 创作者 Mario Zechner 的 X bio 为什么会有这么一句话？
>
> Old man yelling at Claudes。
>
> 其实很多人和我一样也很奇怪，其实你看过他的心路历程，你也就能明白了。
>
> Mario 最早其实是 Claude Code 的重度用户，甚至会自己 Patch 客户端、抓 system prompt、研究每次更新到底改了什么。
>
> 但用得越深，他越受不了一件事：
>
> Claude Code 一直在变。
>
> system prompt 在变，工具在变，隐藏规则也在变。你辛苦调好的 Prompt、Skill 和 Workflow，可能一次更新之后效果就完全不一样。
>
> 后来他也试了 Codex、OpenCode 和其他 Agent，最后发现问题都差不多：
>
> Harness 管得太多了，给的自由太少，慢慢的他开始厌倦了。
>
> 于是 2025 年底，他干脆花了两个晚上自己写了 Pi。
>
> 默认只有 read、write、edit、bash 四个工具，系统提示词尽可能短，模型不绑死，其他能力全部交给用户自己扩展。
>
> 这也是为什么 Pi 会有一句非常有代表性的口号：
>
> There are many agent harnesses, but this one is yours.
>
> Mario 想做的从来不是一个功能最多的 Agent。
>
> 而是一个足够干净、透明、稳定，最后控制权还在你手里的 Harness。
>
> 如果你用了 Pi，却一直没理解它为什么这么“简陋”，为什么很多东西明明能内置却偏偏不做。
>
> Mario 自己讲 Pi 诞生过程的这个视频，可能会给你答案。

</article>

<article class="tweet-entry" id="post-2092238018447020036">

## 如果你也想开始学习 Pi，可以看看我的学习分享🔥

<span class="tweet-meta">2026-08-25 21:09:50 · 小墨原文</span>

> 如果你也想开始学习 Pi，可以看看我的学习分享🔥
>
> 其实Pi没有想象的那么难，只是大多数人一开始学习的方向就错了，一上来研究 Harness、Agent Loop、Extension 这些东西。
>
> 如果让我推荐，我会建议按照这 5 个步骤进行学习：
>
> 1、先搞懂 Pi 到底是什么
>
> 先把 Pi、Pi Coding Agent、Claude Code、Codex 这些东西的关系弄明白，你只需要知道 Pi 最大的特点就是足够轻，而且很多能力都可以自己往上加。
>
> 2、先把最基础的功能用熟
>
> 安装、登录模型、新建 Session、继续之前的任务，再把几个常用命令摸熟，先让 Pi 真正进入你的日常工作，而不是装完以后就开始研究源码。
>
> 3、然后开始给 Pi 加能力
>
> 学会安装 Extension 和 Skill，再试试 SSH、安全插件、上下文工具这些真正能改善体验的东西，这一步基本也是 Pi 最好玩的阶段。
>
> 4、再去理解 Context 和 Token
>
> 等真正用过一段时间，再去理解为什么 Pi 的 System Prompt 很短、工具很少、缓存容易命中，以及上下文满了以后 Compaction 到底在干什么，会比一开始硬啃概念容易很多。
>
> 5、最后再玩 Pi 真正有意思的进阶玩法
>
> 手机远程、多设备协同、Sub-agent、多模型分工，甚至慢慢组合出一套属于自己的 Pi，这时候你才会真正理解为什么很多人把 Pi 当成 Harness，而不只是另一个 Coding Agent。
>
> 按照这五个点去学习，我相信你也一定可以体会到使用Pi 的快乐，就是那种自由自在的感觉，想要什么都可以动手自己去创造。
>
> 学习网站，我只推荐一个：

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2092265777214951636">

## 回看Pi 的版本迭代记录，就像再看一部Agent发展史！

<span class="tweet-meta">2026-08-25 23:00:08 · 小墨原文</span>

> 回看Pi 的版本迭代记录，就像再看一部Agent发展史！
>
> 看作者从最开始只有一个简单的构思，再到一个具体的产品，其实里面每一个点都是作者对自己想要的Agent的不妥协。
>
> 从众多版本里面，我选择了这五个最具有代表性的版本。
>
> 1、开始解决上下文问题（0.12）
>
> 这一版加入了 Context Compaction，上下文快满的时候会自动总结旧内容、保留最近的消息，Session 也开始支持 Branch，可以说 Pi 从这里开始真正具备了长时间工作的基础。
>
> 2、Extension 正式成为核心玩法（0.35）
>
> 以前分散的 Hooks、Custom Tools 被统一成了 Extension，从这里开始，你可以给 Pi 加工具、命令、UI、状态、权限控制，今天我们看到的大量 Pi 插件基本都是沿着这套机制发展出来的。
>
> 3、Pi 开始有自己的生态（0.50）
>
> Extension、Skill、Prompt、Theme 可以打包成 Pi Package，一键安装和分享，也意味着 Pi 从“自己折腾自己的 Agent”，开始慢慢变成大家可以互相分享能力的生态。
>
> 4、开始关注安全和使用成本（0.79）
>
> 加入 Project Trust，项目里的配置、Extension 不再默认直接加载，同时 Pi 甚至把 Prompt Cache Hit Rate 直接显示在界面底部，能看出来官方已经开始认真关注安全、Token 和缓存效率。
>
> 5、开始越来越像一个 Agent Harness（0.84）
>
> AGENTS.override.md、默认工具控制、Remote Session 相关能力陆续出现，你可以更细地控制 Context、工具和 Session，Pi 也开始慢慢从一个极简 Coding Agent，往一个可以自己组合的 Agent Harness 发展。
>
> 我中间也花了时间去研究作者的历史，再结合他的一些发言和过去开源的经历，我能慢慢的读懂。他为什么会自己写一个属于自己的Agent。
>
> 很多人会说这个Pi Agent这个工具偏极客，但是真正懂的人才会知道，想要有一个属于自己的工具有多难，而且是可以随意组装和优化的。
>
> 只有深度的去理解了，你也会跟我一样， 读懂了里面的设计哲学。
>
> 可能这就是 Pi 最让我上头的地方。

</article>

<article class="tweet-entry" id="post-2092930420090519653">

## Pi 真正的用法，其实是构建属于自Agent🔥

<span class="tweet-meta">2026-08-27 19:01:11 · 小墨原文</span>

> Pi 真正的用法，其实是构建属于自Agent🔥
>
> 最近我都在深度研究Pi，今天脑子突然冒出来一个想法：
>
> 既然 Pi 本身已经把 Agent 最麻烦的东西都做好了，我是不是可以基于他简单的架构，完成我自己的Agent
>
> 我分析了一下相关的内容，总结了以下几个方面：
>
> 1、Pi 先把 Agent 的基本骨架给你了
>
> 模型怎么接、Session 怎么保存、Tool 怎么调用、Context 怎么压缩，这些 Pi 本身已经处理好了。
>
> 你不需要重新实现一个 Agent Loop，更多时候是在现成底座上继续加东西。
>
> 2、真正属于自己的部分，其实是能力组合
>
> 比如我想做一个研究 Agent，可以加搜索、浏览器、YouTube、Memory。
>
> 想做服务器 Agent，就加 SSH、Docker、日志分析。
>
> 甚至想做一个长期个人 Agent，也可以继续往上加记忆、消息渠道、定时任务。
>
> 这时候 Pi 更像是一个可以不断组装的底座，而不是一个固定形态的 Coding Agent。
>
> 3、连客户端都不一定要用 Pi 原来的终端
>
> Pi 已经提供 SDK、RPC 这些接口，所以你完全可以在外面重新做 Web、桌面端、移动端，底下继续跑同一个 Pi。
>
> 这也是我最近研究 Pi 桌面端和移动端之后最大的一个感受：
>
> 你不一定是在改 Pi，而是在用 Pi 做自己的产品。
>
> 4、最后真正形成差异的，可能不是模型
>
> 大家都可以用 GPT、Claude、Qwen，但是你给 Agent 配了什么 Skill、什么 Extension、什么 Memory、什么工具和工作规则，最后才会慢慢变成完全不同的东西。
>
> 所以现在我越来越觉得，Pi 最好玩的地方可能不是拿它和 Claude Code、Codex 比谁更强。
>
> 而是你可以把它当成一个已经做好的 Agent 底座，然后一点点把自己的习惯和能力往上叠。
>
> 最后得到的可能已经不是 Pi。
>
> 而是一个真正属于自己的 Agent。

</article>

<article class="tweet-entry" id="post-2092983677626331480">

## Pi 不是难，是很多人把学习顺序搞反了。

<span class="tweet-meta">2026-08-27 22:32:49 · 小墨原文</span>

> Pi 不是难，是很多人把学习顺序搞反了。
>
> 很多人都是先研究架构，再回头装软件，收藏夹放的满满当当，电脑里面却空空如也。
>
> 其实没那么多复杂的事情，只要跟着下面五个步骤一起做，一天就能干完。
>
> 1. 当天只做开通
> 去  按官方方式装，不要先搜第三方教程。
>
> 装完先配一个你有额度的模型，新建Session，丢一件真事进去：改一个函数、写个脚本、排查一段报错。能跑通、能打断、能续上，这一步才算过。
>
> 2. 把基本操作摸成肌肉记忆
> 记这几个就够：新建 / 切 Session、继续上次任务、/scoped-models 把常用模型收成短名单、Ctrl+P 切换。先固定一个主力模型，别一天换五个。
>
> 任务没结束别新开一堆窗口，上下文会散。
>
> 3. 加能力只加你会重复用的
> 先写或装 Skill：把「每回都要交代一遍」的流程写进 SKILL.md。
>
> 再装 Extension：SSH、安全拦截、上下文查看。Skill 是说明书，扩展才改运行时。
>
> 装包用 pi install，去官方文档和插件市场搜，群里复制的命令先别用。MCP 先放下。
>
> 4. 等窗口满了再调 Context
> 连续做一件稍长的事，看 Token、缓存、Compaction 什么时候开始工作。这时再懂为什么 Prompt 短、默认工具少。
>
> 爆过一次再决定要不要加压缩、要不要切轻量模型，比先背概念有用。
>
> 5. 稳定一周后再玩组合
> 日常已经离不开，再试远程、多设备、Sub-agent、一个模型写一个模型审。先单会话做熟，再并行。
>
> 并行以前先想清楚：谁负责写、谁负责看、结果放哪，不然只是多开几个窗口。
>
> 一定要记住，学习Pi难的不是理解，而是开始动手，只有你真正的进行操作和学习，你才能真正的掌握它。
>
> 马上在你的电脑安全使用吧。🔥

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2093013305237598446">

## 学 Pi 别收藏文档了，看完这个视频，比收藏十篇教程都有用。

<span class="tweet-meta">2026-08-28 00:30:32 · 小墨原文</span>

> 学 Pi 别收藏文档了，看完这个视频，比收藏十篇教程都有用。
>
> 这次我直接制作好视频，那你完整的了解PI Agent 这个系统：
>
> 1、模型负责理解和判断
> 2、上下文告诉它项目背景和规则
> 3、工具负责读取、修改和运行
> 4、会话保存整个工作过程
> 5、Skill 和 Extension 增加新能力
> 6、RPC、SDK 等方式把它接进其他流程
>
> 你提出任务，模型作出决定，工具执行操作，结果再回到模型——这才是 Pi 真正的工作循环。
>
> Pi 的优势不是默认功能有多豪华，而是核心足够轻，大脑、工具和规则都能自己选择。
>
> 先理解这套结构，再去装插件、写 Skill、做自动化。否则装得越多，越不知道 Pi 到底强在哪里。
>
> 两分钟，把 Pi 的完整构成一次讲清楚。👇

</article>

<article class="tweet-entry" id="post-2093675914836255111">

## Pi 和 Oh My Pi，正在把 Agent Harness 推向两个极端🔥

<span class="tweet-meta">2026-08-29 20:23:31 · 小墨原文</span>

> Pi 和 Oh My Pi，正在把 Agent Harness 推向两个极端🔥
>
> 本质上他们都是一个爹妈生的，甚至 Oh My Pi 本身就是从 Pi Fork 出来的，但是后期发展越往对方的极端方向走。
>
> Pi 的思路很简单：核心能精简的尽量精简，额外的功能都交给插件。

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2093697448527233162">

## Pi 0.84.4（2026-08-28）是目前最新版，官方推文里重点提了这 3 条：

<span class="tweet-meta">2026-08-29 21:49:05 · 小墨原文</span>

> Pi 0.84.4（2026-08-28）是目前最新版，官方推文里重点提了这 3 条：
>
> 1、大工具结果会立刻压缩 工具输出太大时，现在会在同一次运行里先 compaction，再继续下一条回复，不容易把上下文撑爆。
>
> 2、支持 DeepSeek V4 Flash Vision（实验性） 内置 DeepSeek 提供商可以直接用这个带视觉的模型。

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2094089240812691764">

## 以前是我盯着 Pi 改代码，现在有人开始让 Pi 自己死磕优化了😂

<span class="tweet-meta">2026-08-30 23:45:55 · 小墨原文</span>

> 以前是我盯着 Pi 改代码，现在有人开始让 Pi 自己死磕优化了😂
>
> 最近看到一个很值得玩的项目：pi-autoresearch。
>
> 它受 Karpathy Autoresearch 启发，直接把这套思路搬进了 Pi里面。
>
> 你不需要一步一步告诉它该怎么优化，只需要给一个明确指标。
>
> 剩下的事情，它自己来：
>
> 想方案 → 修改 → 测试 →

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2094260899712548912">

## Pi 最矛盾的点：追求极简，还是复杂🔥

<span class="tweet-meta">2026-08-31 11:08:02 · 小墨原文</span>

> Pi 最矛盾的点：追求极简，还是复杂🔥
>
> 最近看到一个挺有意思的项目：Plannotator。
>
> 可能很多人听过甚至都安装过，我自己看下来他就是复杂的代表插件。
>
> Pi 本身其实是很克制的，很多能力都不会往 Core 里塞，但 Plannotator 刚好反过来，专门给 Pi 补了一套可视化 Review。
>
> Agent 写完

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2094294968307487038">

## 我去，《杀戮尖塔》居然和 Pi 作者 Mario Zechner 有关系🔥

<span class="tweet-meta">2026-08-31 13:23:25 · 小墨原文</span>

> 我去，《杀戮尖塔》居然和 Pi 作者 Mario Zechner 有关系🔥
>
> 准确来说，《杀戮尖塔》不是 Mario 做的，但是它使用的游戏开发框架 libGDX，是 Mario 很早以前开源项目。
>
> 这件事我之前还真不知道，继续往下翻他的经历，突然感觉 Pi 为什么会长成今天这样，好像又更容易理解了一点。
>
> Mario 在 2009

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2094627740440047962">

## 我发现了新玩法，拿Grok Bot 来跑Pi Agent🔥

<span class="tweet-meta">2026-09-01 11:25:44 · 小墨原文</span>

> 我发现了新玩法，拿Grok Bot 来跑Pi Agent🔥
>
> 刚才测试了一下使用Grok Bot运行对应的Agent，在上面完美的运行了，安装本身是没有难度的因为Grok Bot本质都是一台服务器。
>
> 但是中间踩的坑还是分享一下：

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2094765507207708692">

## 不到一年，Pi 10 万Star了🔥

<span class="tweet-meta">2026-09-01 20:33:10 · 小墨原文</span>

> 不到一年，Pi 10 万Star了🔥
>
> 2025 年底，Mario Zechner 给自己写了个极简 coding agent。他没想到这么短的时间就冲上了十万Star。
>
> Pi的口号：There are many agent harnesses, but this one is yours.
>
> 2026 年 1 月，Flask 作者 Armin Ronacher 公开说这套架构值得花时间和精力去构建完善。
>
> 4

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2095857935255798186">

## 我来分享一下自己对Pi的学习过程

<span class="tweet-meta">2026-09-04 20:54:05 · 小墨原文</span>

> 我来分享一下自己对Pi的学习过程
>
> 一开始我也只是单纯的好奇去接触了Pi Agent这个产品，发了一些相关的内容，发现挺有流量的。
>
> 后面慢慢的我就会往这个方向发的内容越来越多，从最简单的插件分享，到后面的源码阅读都是一步一步走过来的。
>
> 有的时候也会去挖掘更深层次的东西。

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2095918886445330713">

## 推荐一个很有意思的 Pi 项目，pi-vs-claude-code。

<span class="tweet-meta">2026-09-05 00:56:17 · 小墨原文</span>

> 推荐一个很有意思的 Pi 项目，pi-vs-claude-code。
>
> 我一开始看名字还以为它只是拿 Pi 和 Claude Code 做对比，后面翻了一下才发现完全不是。
>
> 它更像是在做一件事情：
>
> Claude Code 有的功能，看看能不能用 Pi 自己一个一个搭出来。
>
> 如果你已经开始折腾 Pi 的 Extension、Subagent

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2096461907666579807">

## Pi虽然核心简单，但是组合在一起一点也不简单。

<span class="tweet-meta">2026-09-06 12:54:03 · 小墨原文</span>

> Pi虽然核心简单，但是组合在一起一点也不简单。
>
> 可以打造成自己的工作台，非常的完美
>
> 可以通过 Extension API，很多原本固定的东西都可以自己改，所以完全可以把 Pi 慢慢做成自己的 AI 工作台：
>
> 1、做一套常驻状态栏
> 模型、Thinking、Token、Context、Git 分支这些信息直接放在底部，当前状态一眼就能看到。
>
> 2、挂一个 Todo / Task 面板
> 把当前目标、已完成步骤、下一步任务留在界面里，跑长任务的时候不用反复问 Pi 现在做到哪了。
>
> 3、把 Context 做成可视化
> System Prompt、Skill、Tool 分别占了多少，上下文还剩多少，什么时候该 Compact，都可以直接看到。
>
> 4、再配合 pi-cc-extensions 补阅读体验
> Tool Call 折叠、Rich Diff、Markdown、Mermaid、长输出这些一起处理，Pi 默认比较素的阅读体验基本就补齐了。
>
> 最有 Pi 味道的是，这些东西不用等官方慢慢加。
>
> 你甚至可以直接让 Pi 帮你写 Extension，改完 /reload，马上继续用。
>
> 我现在越来越喜欢这种感觉：
>
> 不是去找一个功能最全的 Coding Agent，而是拿一个足够简单的 Pi，慢慢改成自己的工作环境。

</article>

<article class="tweet-entry" id="post-2096847370902544442">

## 看懂Pi设计的魅力，可能只需要一分钟。

<span class="tweet-meta">2026-09-07 14:25:45 · 小墨原文</span>

> 看懂Pi设计的魅力，可能只需要一分钟。
>
> 今天我突然看懂了为什么Pi，要自己设计Session、处理压缩算法、构建自己的上下文体系，都是为了不妥协！
>
> 上下文：尽量保持前缀稳定，让Prompt Cache持续命中，少花Token，也少被Harness随意改写。
>
> Session：完整记录掌握在自己手里，不依赖某一家模型厂商保存状态，换模型还能继续跑。
>
> 压缩：自己决定什么留下、什么丢掉，压缩后的内容依然可见、可修改、可迁移，而不是变成Provider才能读懂的黑盒。
>
> 模型：GPT、Claude、Gemini，甚至本地模型，都只是可以随时替换的一层。
>
> Harness：Pi也不希望你最后只是从厂商锁定，换成另一种Harness锁定。
>
> 这些设计看起来都很克制，甚至有点固执，但最后其实只指向一件事：
>
> 不妥协。
>
> 模型可以换，Provider可以换，Harness也可以换。
>
> 但Session、Context和Memory，应该一直属于你自己。
>
> 这才是一个真正自由的Agent。

</article>

<article class="tweet-entry" id="post-2096905514995331392">

## 如果不在学习和研究Pi，这几篇必读文章你一定不能错过🔥

<span class="tweet-meta">2026-09-07 18:16:48 · 小墨原文</span>

> 如果不在学习和研究Pi，这几篇必读文章你一定不能错过🔥
>
> 很多时候只是看源码和简单的概念没有什么体会，光看 README 也很难真正理解作者设计的初衷。
>
> 反而是这些文章，可以体现出作者的思想，让你能慢慢知道 Pi 为什么会设计成现在这样。
>
> 1、Prompt Caching In Agents
>
> 讲 Prompt Cache、前缀稳定和缓存命中，也是我觉得最适合理解 Pi 设计思路的一篇。
>
> 2、How Compaction Works in Pi
>
> 专门讲 Pi 的压缩机制，什么时候触发、保留什么、压缩以后 Session 怎么继续跑。
>
> 3、The Session You Cannot Take With You
>
> 这篇我很推荐。
>
> 讲 Session 可迁移性、Provider 黑盒，以及一个 Agent 的历史到底是不是真的属于你。
>
> 4、AgentHarness v2
>
> 想往底层继续看就读这篇。
>
> Session、Lane、持久化、恢复机制，能看到 Pi 对 Agent Runtime 的一些更深设计。
>
> 5、Pi Real Sessions
>
> Mario 公开的真实 Pi Session 数据。
>
> 可以直接看 Tool Call、Thinking、Compaction、Branch，了解真实 Agent 到底是怎么工作的。
>
> 如果只让我推荐三篇，一定要看的就是：
>
> Prompt Caching In Agents
> How Compaction Works in Pi
> The Session You Cannot Take With You
>
> 这三篇看完，我觉得基本就能开始看懂 Pi 了。

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2096905691852333156">

## 如果你也在学习和研究Pi，这几篇必读文章你一定不要错过🔥

<span class="tweet-meta">2026-09-07 18:17:30 · 小墨原文</span>

> 如果你也在学习和研究Pi，这几篇必读文章你一定不要错过🔥
>
> 很多时候只是看源码和简单的概念没有什么体会，光看 README 也很难真正理解作者设计的初衷。
>
> 反而是这些文章，可以体现出作者的思想，让你能慢慢知道 Pi 为什么会设计成现在这样。
>
> 1、Prompt Caching In Agents
>
> 讲 Prompt Cache、前缀稳定和缓存命中，也是我觉得最适合理解 Pi 设计思路的一篇。
>
> 2、How Compaction Works in Pi
>
> 专门讲 Pi 的压缩机制，什么时候触发、保留什么、压缩以后 Session 怎么继续跑。
>
> 3、The Session You Cannot Take With You
>
> 这篇我很推荐。
>
> 讲 Session 可迁移性、Provider 黑盒，以及一个 Agent 的历史到底是不是真的属于你。
>
> 4、AgentHarness v2
>
> 想往底层继续看就读这篇。
>
> Session、Lane、持久化、恢复机制，能看到 Pi 对 Agent Runtime 的一些更深设计。
>
> 5、Pi Real Sessions
>
> Mario 公开的真实 Pi Session 数据。
>
> 可以直接看 Tool Call、Thinking、Compaction、Branch，了解真实 Agent 到底是怎么工作的。
>
> 如果只让我推荐三篇，一定要看的就是：
>
> Prompt Caching In Agents
> How Compaction Works in Pi
> The Session You Cannot Take With You
>
> 这三篇看完，我觉得基本就能开始看懂 Pi 了。

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2097275917915853200">

## 准备把自己的Pi学习过程整理出来

<span class="tweet-meta">2026-09-08 18:48:38 · 小墨原文</span>

> 准备把自己的Pi学习过程整理出来
>
> 不知道会有多少来看，但是分享本来就是一件有意义的事情，把它整理出来，本身也是一种对学习的回顾
>
> 这两个月来，从简单的Pi Agent到研究源码，分析里面的内容怎么一步一步的学习成长到自己开始写插件
>
> 开始只是纯好奇，为什么会有一个这么简洁的Agent的出现，为什么Openclaw会选择它当作基座去进行开发，后来我也慢慢懂得了原因
>
> 很建议大家在学习之余去翻看一下作者的履历，那不仅仅是简单的历史回顾，更是一种思想的碰撞，也回答了为什么会这样
>
> 不说那么多了，开始动手了，然后你也感兴趣，请在评论区告诉我👇

</article>

## 下一步

完成这一阶段后，继续阅读[第 2 阶段　先把第一个任务做完](/tweets/02-first-tasks)。

