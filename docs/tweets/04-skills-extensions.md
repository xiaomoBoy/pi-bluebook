---
title: 搭建自己的 Skill 与 Extension
description: 小墨 Pi 学习记录第 4 阶段，收录 22 篇推文原文。
outline: false
prev:
  text: Session 与上下文
  link: /tweets/03-sessions-context
next:
  text: 子 Agent 分工
  link: /tweets/05-subagents-research
---

<span class="library-status">个人学习记录 · STAGE 04</span>

# 搭建自己的 Skill 与 Extension

**这一阶段要解决的问题**　从使用现成插件走向整理方法、控制数量，再解决自己的真实需求。

我早期更关心装哪些插件，后来开始区分 Skill、Extension 和 Package，也开始清理冲突、自己写提醒功能。这里保留了这个变化过程。

本页收录 22 篇原文。正文来自个人 Google Drive 原文库，已移除 x.com 地址和 t.co 媒体短链。原文涉及的版本与产品状态以发布日期为准。

<article class="tweet-entry" id="post-2087104117533814998">

## 最近Pi Agent很火，我推荐几个我自己常用的插件和项目：

<span class="tweet-meta">2026-08-11 17:09:32 · 小墨原文</span>

> 最近Pi Agent很火，我推荐几个我自己常用的插件和项目：
>
> Pi Package Catalog：官方插件市场
> pi-web-access：网页 / GitHub / PDF / YouTube
> pi-subagents：多 Agent、并行任务
> PI WEB：远程 Web 控制
> pi-telegram：Telegram 控制 Pi
> Plannotator：Plan / Diff / Review 可视化
> pi-hermes-memory：Hermes 风格长期记忆
>
> 如果只推荐三个，我希望你安装这 3 个：pi-web-access + pi-subagents + PI WEB

</article>

<article class="tweet-entry" id="post-2091445724420747389">

## 习惯Pi Agent之后我基本上弃用了 MCP ，我现在更愿意给 Pi 装 Skill，然后把剩下的任务交给 CLI。

<span class="tweet-meta">2026-08-23 16:41:32 · 小墨原文</span>

> 习惯Pi Agent之后我基本上弃用了 MCP ，我现在更愿意给 Pi 装 Skill，然后把剩下的任务交给 CLI。
>
> 本质还是MCP 太重了。工具描述先占用 context，模型再猜参数，Token 消耗没了，有时候还调错。Pi 自带 read / bash / edit / write，很多事让它读命令帮助直接跑，反而更稳。
>
> Skill 也更合适，启动只进名称和描述，真正用到才加载全文。
>
> 我自己常用这几个：
>
> Skill 目录：~/.pi/agent/skills/ 和项目里的 .pi/skills/gh /
> git CLI：提 PR、看 diff，比再套一层 GitHub MCP 干净
>
> ponytail：先复用现有代码，少生成一堆新文件 commit-
>
> helper / pr-helper：提交和 PR 走 Skill + gh pi-context-view：每加一样东西先看它吃多少 context pi-agent-
>
> skill-evolution：复杂任务跑完可以沉淀成 Skill pi-web-access：只有搜网页、GitHub、PDF 时才开
>
> 如果只留三个：项目 Skill 目录 + gh CLI + pi-context-view
>
> 网页需求再加 pi-web-access，越来越喜欢这种精简的感觉，虽然软件很小，插件很少，但是完成工作一点都不含糊。

</article>

<article class="tweet-entry" id="post-2091729625483452813">

## 推荐几个新手使用Pi Agent 必装的安全插件！

<span class="tweet-meta">2026-08-24 11:29:39 · 小墨原文</span>

> 推荐几个新手使用Pi Agent 必装的安全插件！
>
> 因为Pi Agent 默认几乎没有沙箱，也没有完整的权限判断。
>
> 但是不要觉得是 bug，其实是设计。Pi 默认就四个工具，read、write、edit、bash，权限跟你当前用户一样。模型一旦要删文件、改 `.env`、跑 `sudo`，它真能干。对老手这叫干净，对新手这叫危险。
>
> 所以我一般会让刚入门的人先装几样防护，别一上来就裸奔。
>
> 1. safe-coder
> 一站式入门包。危险命令会先问你，`.env`、`.git`、`node_modules` 可以先阻挡一下。小白先装这个最省事。
>
> 2. pi-permission-gate
> 官方示例同款思路。`rm -rf`、`sudo`、乱改保护路径，先弹确认再执行。没有界面时默认直接拦。
>
> 3. pi-protected-paths
> 专门护密钥和敏感文件。`.env`、凭证、常见配置，读写都会被挡住，避免模型手滑把密钥吐出来或改坏。
>
> 4. pi-sandbox
> 更接近真正的沙箱。文件和网络能按白名单控，会话里还能开关。比单纯弹窗确认更彻底，但也要多配一点。
>
> 5. pi-permission-modes
> 像权限挡位。默认确认、接受编辑、更自动，都能切换；特别危险的命令会直接封死。适合想一边用一边调松紧的人。
>
> 我非常建议小白的安装顺序：先 safe-coder，再加 pi-protected-paths。真要隔离环境，再上 pi-sandbox。
>
> Pi 其实本身已经很干净了，但是干净不等于安全。
>
> 先把护栏装上，再去玩 Skill 和插件，安全才是第一位。

</article>

<article class="tweet-entry" id="post-2091796705859797430">

## 分享一下Pi 远程设备的方案，官方插件+UU远程，基本上就够了

<span class="tweet-meta">2026-08-24 15:56:13 · 小墨原文</span>

> 分享一下Pi 远程设备的方案，官方插件+UU远程，基本上就够了
>
> 插件就推荐这五个：
>
> 1. 官方 SSH Extension
> 本地跑 Pi，远程操作 VPS 上的文件、Shell、Docker。最接近“我还在本机，但手伸到服务器”。
>
> 2. pi-mobile
> 手机或浏览器直接接管 Pi Session，能看 Tool Call、切模型、继续对话。适合人不在电脑前，又想盯着任务往下走。
>
> 3. PI WEB
> Pi 常驻服务器，多设备用浏览器进同一个控制面。更接近完整远程工作台，而不只是临时连一下。
>
> 4. remote-pi
> 社区插件，主打手机远程控制，后面还在往多 Pi、Agent Mesh 方向走。有点实验性，但方向值得盯。
>
> 5. tmux + Tailscale + Pi
> 最朴素的一套。Pi 跑在服务器，Mac 或手机随时 SSH 回去，接着同一个 Session 干。不依赖花活，稳。
>
> 我基本上是官方 SSH Extension+pi-mobile 以前是Tailscale内网穿透的方式，但是还是很麻烦而且官方的节点也不一定稳定，现在直接使用官方插件和VPS服务器就能完成。
>
> 实在解决不了的问题，可以上UU远程解决，基本上这一套组合拳下来，能满足百分之99的人的远程需求了！

</article>

<article class="tweet-entry" id="post-2092408367432319052">

## Pi Agent 别只记得安装插件，Skill有时候其实更好用🔥

<span class="tweet-meta">2026-08-26 08:26:44 · 小墨原文</span>

> Pi Agent 别只记得安装插件，Skill有时候其实更好用🔥
>
> 我推荐这几个比较实用的 Pi Skill：
>
> browser-tools：控制 Chrome 浏览器，打开网页、提取内容、截图、执行页面操作
>
> brave-search：网页搜索 + 内容提取，给 Pi 补上最基础的联网搜索能力
>
> youtube-transcript：直接读取 YouTube 视频字幕，拿来总结视频、做资料研究很好用
>
> gmcli：接入 Gmail，让 Pi 可以搜索邮件、查看邮件、处理草稿和标签
>
> gdcli：接入 Google Drive，让 Pi 可以查找、管理和分享云端文件
>
> transcribe：把音频转成文字，适合会议录音、视频素材、语音内容整理
>
> 这也只是针对我的日常工作和挑选，工作环境都不一样，所以按需安装，保持Pi Agent应有的简洁才是最主要的。
>
> 我也知道有很大一部分其实插件也解决了，但是有时候Skill+CLI的组合真的很爽😂

</article>

<article class="tweet-entry" id="post-2092436179228713122">

## 最近 Pi 很火，但很多人一上来就只装 Extension。其实 Skill 才是更值得折腾的一块。

<span class="tweet-meta">2026-08-26 10:17:15 · 小墨原文</span>

> 最近 Pi 很火，但很多人一上来就只装 Extension。其实 Skill 才是更值得折腾的一块。
>
> Pi 遵循 Agent Skills 标准，Claude Code、Codex 那套 Skill 很多能直接拿过来用，不用死盯 Pi 自己那点生态。
>
> 我自己比较常看这几个来源：
>
> Pi Skills
> Mario 自己维护的合集。网页搜索、浏览器、YouTube 转写、语音转文字、Google 服务都有，先从官方口味入手最稳。
>
> Anthropic Skills
> 目前最值得收藏的大型官方仓库。PDF、DOCX、PPTX、XLSX、Web 开发这些办公和前端能力很全，Pi 官方文档也直接推荐。
>
> 现在最好用的 Skill 搜索和排行榜。按热度找，而且已经原生支持装到 Pi，比在 GitHub 里瞎翻省事。
>
> mattpocock/skills
> 偏真实工程场景。不追求大而全，把开发流程拆成很多小 Skill，比如先质疑需求、再 TDD，用起来很解渴。
>
> Awesome Agent Skills
> 适合继续挖社区货。代码审查、测试、Debug、安全、重构、写作，分类比较全，当目录用就行。
>
> 如果只收藏三个：Pi Skills + Anthropic Skills +
>
> Pi 的 Skill 是按需加载的，平时只把名称和描述放进 Context，真正用到才读完整 SKILL.md。比一上来给 Agent 塞几十个工具干净得多，也更省 Token。
>
> 装再多 Extension，也不如先把几个真正会反复用的 Skill 用明白。

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2092630793277632999">

## Pi 插件和核心功能的边界到底在哪里？

<span class="tweet-meta">2026-08-26 23:10:34 · 小墨原文</span>

> Pi 插件和核心功能的边界到底在哪里？
>
> 最近我一直在思考一个问题：什么能力应该放进 Core，什么能力应该永远留给 Extension？
>
> 我觉得这是我研究Pi这么久以来，最有意思的地方。
>
> Pi 一直坚持核心足够轻，需要什么能力就自己往上加，但随着生态越来越大，Sub-agent、Sandbox、Memory、Plan Mode、Remote Session 这些东西也开始变得越来越常见。
>
> 很多时候大家都在讨论的是“要不要加功能”，这个问题，我反倒觉得更应该弄清楚这三大边界：
>
> 1、Agent 跑起来必须有的能力，应该进 Core
>
> 比如 Session、Context、Tool Call、Compaction，这些本身就是 Agent 正常工作的基础。
>
> 2、决定安全和生态规则的能力，Core 至少应该提供标准
>
> 比如权限、远程 Session、Sub-agent 通信，如果每个 Extension 都重新设计一套，最后反而会越来越乱。
>
> 3、具体怎么玩，继续留给 Extension
>
> Memory 用哪套、Plan Mode 怎么设计、Sub-agent 怎么分工、搜索工具用哪个，这些我反而希望 Pi 永远不要替用户决定。
>
> 我看了很多官方的材料和开源项目的说明，上面都把极简贯彻到底，而且很多地方官方都说了，不会把不必要的功能加到核心里面。
>
> 有一句话，我记得很深，能用插件解决的绝不去动核心，我感觉这才是 Pi 最难守住，也是最值得我们这些开发值得期待的地方。

</article>

<article class="tweet-entry" id="post-2093212359552893008">

## Pi Package 可能是最被大家忽然的功能🔥

<span class="tweet-meta">2026-08-28 13:41:31 · 小墨原文</span>

> Pi Package 可能是最被大家忽然的功能🔥
>
> 很多人可能只知道Skill，但是没仔细的去了解Pi Package这个功能，它解决的不是单个技能分享的问题，而是把你的使用习惯、配置、使用方式一起打包的实现。
>
> 他可以让你把你的Pi Agent，完整的分享给你想要的人！
>
> 1、以前加能力是散的

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2093945888637174062">

## 玩到最后，我开始让Pi自己改造自己🔥

<span class="tweet-meta">2026-08-30 14:16:18 · 小墨原文</span>

> 玩到最后，我开始让Pi自己改造自己🔥
>
> 最近我开始换一种方式使用 我的Pi。
>
> 以前 Agent 缺一个功能，我第一反应基本都是去找插件、翻 GitHub，看看有没有别人已经做好的。
>
> 但是现在不一样了，很多时候我找的都不一定符合我的心意，所以慢慢的我开始自己让它写自己的插件了。

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2094324181785796635">

## 玩 Pi，我发现很多人装了一堆插件，写代码还是乱🔥

<span class="tweet-meta">2026-08-31 15:19:30 · 小墨原文</span>

> 玩 Pi，我发现很多人装了一堆插件，写代码还是乱🔥
>
> 上次我分享了Pi常用的插件组合，推荐了联网的、远程控制和安全防护相关的，反响非常好，今天我分享一些特别的插件。
>
> 这次不推能连网的插件，我只推我反复用在写代码上插件。
>
> 1、ponytail
> 先复用现有代码，少生成一堆新文件。
> Pi

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2095028261482827875">

## Pi 你必须学会的事，学会写好AGENT.md🔥

<span class="tweet-meta">2026-09-02 13:57:15 · 小墨原文</span>

> Pi 你必须学会的事，学会写好AGENT.md🔥
>
> 很多人在创建项目的时候，根本就没有在意过或者根本就没有AGENTS.md文件，觉得这只是一个提示词文档。
>
> 这有可能就是你的Pi

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2095051345606943162">

## 玩 Pi 不是缺插件，是清理仓库里不用的东西🔥

<span class="tweet-meta">2026-09-02 15:28:59 · 小墨原文</span>

> 玩 Pi 不是缺插件，是清理仓库里不用的东西🔥
>
> 我现在意识到一件事，插件市场越翻越全，但是真正干活的时候越写越乱。这个时候我才意识到不是模型突然变笨，而是我的Pi变臃肿了。
>
> 在使用Claude Code的时候，我就被Superpowers

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2095175082696122460">

## Pi 终极建议，1 个网站、2 条用法、3 个插件🔥

<span class="tweet-meta">2026-09-02 23:40:40 · 小墨原文</span>

> Pi 终极建议，1 个网站、2 条用法、3 个插件🔥
>
> 1、一个学习网站
>
> 先去
>
> 按官网装，看 Quickstart 就够。装完丢一件真事进去，能跑通、能打断、能续上，这一步才算过。别先收藏教程，也别先翻插件市场。
>
> 2、两条使用建议
>
> 1、一件事一条 Session

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2095793347181109415">

## 推荐一个Pi 排版的插件，pi-cc-extensions

<span class="tweet-meta">2026-09-04 16:37:26 · 小墨原文</span>

> 推荐一个Pi 排版的插件，pi-cc-extensions
>
> 我自己使用下来非常的舒服，整体内容输出和排版得到了很大的提升，如果你对Pi 默认的输出格式不喜欢，十分推荐你去使用一下。
>
> 它不是单纯美化，而是直接把 Pi 往 Claude Code 那种阅读体验改。
>
> 主要的功能有：
>
> 1、Tool Call 自动摘要、折叠和展开
> 2、Edit

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2095842480969449940">

## Pi 可以自己生成可交付的ui，一个插件就搞定🔥

<span class="tweet-meta">2026-09-04 19:52:40 · 小墨原文</span>

> Pi 可以自己生成可交付的ui，一个插件就搞定🔥
>
> 前面我给大家推荐的插件可以解决排版的问题，但是有人还不满意，那我直接给出我的王炸。
>
> pi-generative-ui 一个可以生成可交互ui界面的插件，分分钟搭建一个属于自己的工作台，整体测试下来，虽然有一些小问题，但是瑕不掩瑜。
>
> 主要功能有：
>
> 1、把 Pi

<p class="tweet-media-note">原帖包含图片或视频，媒体素材待后续整理。</p>

</article>

<article class="tweet-entry" id="post-2096573015811113279">

## Pi 的工作台打造不是一朝一夕就能搭建好的，需要你自己根据你的需求去慢慢优化和迭代。

<span class="tweet-meta">2026-09-06 20:15:34 · 小墨原文</span>

> Pi 的工作台打造不是一朝一夕就能搭建好的，需要你自己根据你的需求去慢慢优化和迭代。
>
> 最近我开始自己写Extension，分享一些遇到的问题和小心得。
>
> 我现在有几个比较明显的感受：
>
> 1、不要一上来就写大而全的 Extension
>
> Pi 写 Extension 的门槛其实很低，一个 .ts 文件就能开始。
>
> 我建议可以先从一个小问题去开始写，比如增加一个命令，或者是拦截一个危险操作，甚至是改你下面的状态栏。
>
> 不要一开始就把东西写的大而全，因为你自己都可能不知道你的真实需求。
>
> 2、Global 和 Project 一定要分开
>
> 通用的 UI、通知、Context 这些可以放全局。
>
> 但项目自己的部署、数据库操作、特殊规则，我现在更愿意丢在项目目录里。
>
> 不然用久以后最麻烦的不是功能少，而是每打开一个 Pi，都背着一堆根本用不到的东西。
>
> 3、Tool 也不是越多越好
>
> 这个是我自己比较在意的地方。
>
> Extension 写着写着，很容易就变成了一个大满贯，但是真正你需要用到或加载的东西很少，如果写的过多的话，很容易影响pi的上下文和调用判断。
>
> 所以好的设计尽量精简，需要再加入，甚至是可以加入渐进式披露，这里的设计其实和 Pi 本身极简的设计挺像。
>
> 4、状态和 reload 比想象中更容易踩坑
>
> 开发的时候 /reload 非常爽，改完马上就能试。
>
> 但只要 Extension 开始存状态，就不能单纯相信内存里的变量。尤其后面如果要跑 Web、RPC、SSH 这些场景，很多写法都得提前考虑。
>
> 这个也是我开始自己写以后，才慢慢意识到的。
>
> 现在回头看，我觉得 Pi 最有意思的地方可能本来就不是有多少 Extension。
>
> 我是官方给你开放的入口，你哪里不舒服，或者哪里觉得不好用，直接马上改就可以了。
>
> 刚开始我也会到处找插件，后面开始删重复的，再到现在自己补一些真正缺的功能。
>
> 这个过程挺慢，但每次只解决一个真实问题，最后留下来的东西反而越来越像自己的。

</article>

<article class="tweet-entry" id="post-2096641158361579563">

## 其实 Pi 想操作浏览器，不用装一堆插件，先把这几个搞明白就够了🔥

<span class="tweet-meta">2026-09-07 00:46:20 · 小墨原文</span>

> 其实 Pi 想操作浏览器，不用装一堆插件，先把这几个搞明白就够了🔥
>
> pi-browser-harness
>
> 直接接你现在正在用的 Chrome。
> 最大的优势就是可以复用现有 Profile、Cookie 和登录状态，点网页、填表、截图、上传下载、看 Console、抓网络请求这些都能做。
>
> 适合拿 Pi 真正干日常网页任务。
>
> pi-agent-browser-native
>
> 更偏 Pi 原生体验。
>
> 底层接 agent-browser，但做成了 Pi 自己的 Tool，页面 Snapshot、点击、输入、截图这些都比较完整，而且专门控制了输出长度，对 Context 比较友好。
> 如果你比较在意 Pi 的极简和 Token，我会优先看这个。
>
> pi-chrome
>
> 比 browser-harness 更轻。
>
> 核心就是把已经登录好的 Chrome 安全地桥接给 Pi，不追求塞几十个浏览器 Tool。
>
> 如果你的需求只是让 Pi 用现成登录态看看网页、做点操作，这个反而够用。
>
> Steel Browser
>
> 这条路线和上面几个完全不同。
>
> 它不是操作你本机 Chrome，而是直接给 Pi 一台云浏览器。
>
> 特别适合后台任务、网页监控、批量抓取，电脑关了也不影响。要做真正长期运行的 Browser Agent，可以重点看这个。
>
> pi-browser-cdp-extension
>
> 比较适合开发者。
> 直接通过 Chrome CDP 给 Pi 一个浏览器执行能力，结构简单，源码也比较容易看懂。
>
> 如果你最近本来就在自己写 Extension，这个很适合拿来研究 Pi 是怎么把浏览器能力封成 Tool 的。
>
> 我自己会这样选：
>
> 日常主力先试 pi-browser-harness，想保持 Pi 极简就用 pi-agent-browser-native，长期后台自动化再考虑 Steel。
>
> 浏览器插件也不是越多越好。
>
> 先想清楚你是想操作自己现在的 Chrome，还是想给 Pi 一台独立浏览器，再去选对应的方案，少走很多弯路。

</article>

<article class="tweet-entry" id="post-2096787108564513046">

## Pi 现在可以直接给自己写 Extension，我最近已经开始让它补自己的工作台了。

<span class="tweet-meta">2026-09-07 10:26:17 · 小墨原文</span>

> Pi 现在可以直接给自己写 Extension，我最近已经开始让它补自己的工作台了。
>
> 因为很多小需求太私人，与其到处找插件，我现在更愿意先让 Pi 自己做一个。
>
> 1、先把问题直接告诉 Pi
>
> 比如我想加一个命令，或者每次执行某类危险操作前先提醒我。
>
> 不用先写完整需求文档，就说清楚现在哪里用着不舒服。
>
> 2、让它先做一个最小版本
>
> 一个 .ts 文件就够了。
>
> 先只解决眼前这个问题，别上来就塞设置页、配置文件、一堆 Tool。
>
> 3、写完直接让 Pi 自己加载测试
>
> 开发阶段我会先临时加载，改完以后 /reload 继续跑。
>
> 有报错就把终端结果继续丢给它，让它自己修。
>
> 4、最后拿真实操作测一次
>
> 比如做的是危险命令拦截，我就真的触发一次。
>
> Pi 能在命令执行前弹出确认，这个 Extension 就算跑通了。
>
> 我现在先把这种每天会碰到的小问题一个个补掉，稳定以后再决定哪些值得一直留在工作台里。

</article>

<article class="tweet-entry" id="post-2096836233679053242">

## Pi 插件装多了以后，我最近真的开始碰到兼容问题了。

<span class="tweet-meta">2026-09-07 13:41:30 · 小墨原文</span>

> Pi 插件装多了以后，我最近真的开始碰到兼容问题了。
>
> 最近因为测试和分享插件，把自己的Pi折腾的够呛，导致出现了插件冲突的问题。
>
> 然后我就发现了：pi-extension-doctor 这个插件，就是专门解决这个问题的
>
> 不了解也没关系，跟着做就行了：
>
> 1、先安装
>
> pi install npm:pi-extension-doctor
>
> 装完之后记得重新 /reload 一下，加载一下插件。
>
> 2、在 Pi 里面运行
>
> /extension-doctor
>
> 它会把所有加载的 Extension 扫一遍，判断出问题。
>
> 输出结果也不复杂，主要看着三个地方：
>
> confirmed 是已经确认有冲突
>
> inferred 是源码里发现了可能的问题
>
> unknown 是它没办法安全判断
>
> 我一般先处理 confirmed的问题，因为这是明显有问题的地方，不要一上来看到问题，就直接把插件删了，确定问题解决问题才是思路。
>
> 两个 Extension 同名导致加载有问题的情况很常见，只需要把其中一个你不需要的插件关掉就好了，然后再重新跑一次 Doctor就好。
>
> 有一些问题很简单，关闭或者删掉就好了，如果是版本依赖冲突可以选择直接升级，但是如果是代码级别的错误，又是自己离不开的，我的选择是直接下载源码，重新改一个自己的版本😂
>
> 开源地址我就留评论区了，记得点上你的小星星

</article>

<article class="tweet-entry" id="post-2096979610588283228">

## 最近我第一次给 Pi 写了一个自己的 Extension。

<span class="tweet-meta">2026-09-07 23:11:13 · 小墨原文</span>

> 最近我第一次给 Pi 写了一个自己的 Extension。
>
> 起因很简单，我经常把任务丢给 Pi 以后切去干别的，结果它什么时候跑完，我根本不知道。
>
> 我分享一下我的整体思路：
>
> 1、先发现需求
>
> Pi 跑任务的时候我经常切去做别的，不知道它什么时候结束。
>
> 2、再开始写
>
> 第一版只解决一个问题：任务结束，弹个提醒。
>
> 3、先做最小测试
>
> 确认通知能不能触发、会不会重复、修改以后有没有真的生效。
>
> 4、能用以后再迭代
>
> 文案不顺手就改，提醒太频繁就加耗时门槛，需要的时候再补开关。
>
> 5、最后才是最大的启发
>
> 以前我总在找别人写好的 Extension，现在反而会开始留意自己的工作流。
>
> 第一个插件不需要多厉害。
>
> 先解决一个自己每天真的会遇到的小问题，就够了。

</article>

<article class="tweet-entry" id="post-2096979758349496647">

## 最近我第一次给 Pi 写了一个自己的 Extension。

<span class="tweet-meta">2026-09-07 23:11:49 · 小墨原文</span>

> 最近我第一次给 Pi 写了一个自己的 Extension。
>
> 起因很简单，我经常把任务丢给 Pi 以后切去干别的，结果它什么时候跑完，我根本不知道。
>
> 我分享一下我的整体思路：
>
> 1、先发现需求
>
> Pi 跑任务的时候我经常切去做别的，不知道它什么时候结束。
>
> 2、再开始写
>
> 第一版只解决一个问题：任务结束，弹个提醒。
>
> 3、先做最小测试
>
> 确认通知能不能触发、会不会重复、修改以后有没有真的生效。
>
> 4、能用以后再迭代
>
> 文案不顺手就改，提醒太频繁就加耗时门槛，需要的时候再补开关。
>
> 5、最后才是最大的启发
>
> 以前我总在找别人写好的 Extension，现在反而会开始留意自己的工作流。
>
> 第一个插件不需要多厉害。
>
> 先解决一个自己每天真的会遇到的小问题，就够了。

</article>

<article class="tweet-entry" id="post-2097181979540111592">

## Pi 制作插件过程简单，但是里面细节问题真的很多😂

<span class="tweet-meta">2026-09-08 12:35:22 · 小墨原文</span>

> Pi 制作插件过程简单，但是里面细节问题真的很多😂
>
> 我前面写了一篇新手怎么制作第一个属于自己的插件，录了一个视频本来想演示一下，结果问题百出。
>
> 1、首先询问AI确定你的需求，在需求确定以后再开始你的插件设计，我这里问了AI给我举出了10条内容，有初版也有升级迭代版本。
>
> 2、开始编写最小MVP，首先测试最简单的气泡通知，当Pi完成任务的时候，iTerm2 会给我一个通知，活干完了，让我可以实时跟进进度。
>
> 这里遇到第一个坑，忘了开启iTerm2的通知权限，测试失败。
>
> 3、迭代升级内容，一开始使用的不是原生的通知机制，导致通知的内容出现了乱码，在做了一轮优化和迭代。
>
> 这里遇到一个很尴尬的问题，录屏里面一直无法出现相关通知的气泡，原因居然是没开启Mac通知里面的镜像通知，导致弹窗通知被静默了。
>
> 4、版本优化，做了一些相关的版本优化，多版本的Mac的兼容，也是为了更好的测试原生能力和Pi插件的兼容性问题，这一步没什么问题。
>
> 以前我写插件还真没遇到这么多问题，都是简单的/reload，然后开始使用就好了，但是现在发现解决和发现问题的能力同样重要。
>
> 不然AI可不会告诉你系统设置里面，藏了那么多机关。

</article>

## 下一步

完成这一阶段后，继续阅读[第 5 阶段　让子 Agent 学会分工](/tweets/05-subagents-research)。

