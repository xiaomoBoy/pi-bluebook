---
title: 序章：先认识 Pi 的作者 Mario Zechner
description: 从 libGDX、RoboVM 到 Pi 与 Earendil，沿时间线理解 Mario Zechner 的经历怎样进入 Pi 的设计。
prev:
  text: 蓝皮书主线
  link: /guide/
next:
  text: 第 1 课 · 安装前检查
  link: /guide/before-install
---

<span class="library-status">PROLOGUE · 作者与作品</span>

# 先认识 Pi 的作者 Mario Zechner

在安装 Pi 之前，先花一点时间认识它的作者。

Mario Zechner 是一名软件开发者、教练、演讲者和天使投资人。他在个人网站中概括自己有 15 年以上的学术、创业、工业与开源经历，技术工作横跨计算机图形、编译器、数据科学和应用机器学习。Pi 并不是他第一次做开发工具，也不是一次突然转向 AI 的偶然尝试。它背后连着十多年开源项目、商业化得失和工具设计经验。

![Mario Zechner 的个人网站与文章目录](/images/mario-zechner/01-mario-website.webp)

<p class="image-caption">Mario 的个人网站把他的身份写成 developer、coach、speaker。截图保留于 2026-09-09；页面内容会继续更新。</p>

::: info 怎样阅读这篇时间线
这是一份公开职业经历时间线，不是私人传记。年份与事实优先采用 Mario 本人的文章、libGDX 官方历史和 Pi 官方页面；公开来源没有明确写出的出生年份、学历和私人经历不作推测。文中的“影响了 Pi”是结合其公开表述所作的编辑分析，会与事实叙述分开。
:::

## 一眼看完这条时间线

| 时间 | 阶段 | 留下的东西 |
| --- | --- | --- |
| 2009 | 从 Android 游戏开发问题出发制作 AFX | 先解决自己的真实痛点 |
| 2010—2014 | AFX 开源并发展为 libGDX，发布 1.0 | 跨平台框架、开源社区与可扩展底座 |
| 2013—2016 | 参与 RoboVM 商业化，经历收购、闭源与停运 | 对开源控制权和商业边界的长期警惕 |
| 2016—2024 | 逐步交接 libGDX，继续独立开发、咨询、教学与公共项目 | 让项目脱离个人后仍能继续维护 |
| 2025 | 深入使用 Coding Agent，参与 VibeTunnel，开发 Sitegeist 与 Pi | 从使用别人的 Agent 走向制作自己的 Harness |
| 2026-04 | 加入 Earendil，带着 Pi 进入团队 | 在家庭、开源持续性与商业支持之间找平衡 |
| 2026 至今 | 继续负责 Pi 的技术方向，核心保持 MIT | “底座保持小，工作流由使用者决定” |

## 2009：一切从 Android 游戏开发的不顺手开始

2009 年中，Mario 为了制作 Android 游戏，开始开发一个叫 AFX（Android Effects）的框架。当时把改动部署到 Android 设备上测试很麻烦，他便让同一套代码也能在桌面运行。这个看似具体的小问题，后来变成了 libGDX 最重要的特征之一：用一套开发方式覆盖多个平台。

这段起点很能说明 Mario 后来的工作方法。他通常不是先设计一个宏大的平台，而是先遇到自己无法忍受的摩擦，再做一个足够小、自己每天愿意使用的工具。

## 2010—2014：libGDX 从个人工具变成开源框架

2010 年 3 月，Mario 将 AFX 以 LGPL 许可证开源；2010 年 3 月 6 日，第一批 libGDX 代码公开。项目很快迎来贡献者，并在教程、安装体验和功能逐步完善后被更多 Android 游戏开发者采用。

![libGDX 官方历史页面](/images/mario-zechner/02-libgdx-history.webp)

<p class="image-caption">libGDX 官方历史从 2009 年的 AFX 讲起，记录了项目开源、社区增长和后续交接。截图保留于 2026-09-09。</p>

2012 年以后，libGDX 继续扩展到 HTML5/WebGL、iOS，并迁向 GitHub、Maven 等更成熟的协作和依赖体系。2014 年 4 月 20 日，经过四年开发，libGDX 1.0 正式发布。

libGDX 后来被很多游戏和工具采用。需要特别分清：Mario 并没有参与制作《杀戮尖塔》；这款游戏使用的是他发起的 libGDX 框架。Ingress 也使用过 libGDX，而 Pokémon Go 没有。真正值得关注的不是“某款名作与作者有关”，而是一个个人开源框架最终成了别人创造作品的底座。

![libGDX Showcase 中的 Slay the Spire](/images/mario-zechner/08-libgdx-slay-the-spire.webp)

<p class="image-caption">libGDX 官方 Showcase 收录了使用该框架制作的《杀戮尖塔》。框架作者与游戏作者不是同一件事。</p>

## 2013—2016：RoboVM 带来的商业化经验与教训

为了让 Java/JVM 应用进入 iOS，libGDX 社区采用了 RoboVM。RoboVM 能把 JVM 代码提前编译并运行在 iOS 上，Mario 很早加入团队，负责第一个商业专有组件——调试器。团队随后扩张，并补齐 IDE、Xcode storyboard 集成等商业能力。

RoboVM 后来被 Xamarin 收购，开源核心随之闭源；Xamarin 再被微软收购后，RoboVM 被停止。Mario 在 2026 年的回顾中直言，这段经历让他对风险投资支持的创业和开源商业化长期保持警惕。他不是控股股东，却要面对社区对于闭源决定的批评。

但这段历史也留下另一个结果：libGDX 贡献者从旧代码分叉出 MobiVM，并逐步恢复能力，继续支撑 libGDX 的 iOS 后端。对 Mario 来说，“任何人都可以分叉”不是许可证页面上的装饰，而是一条亲历过的项目生存路径。

## 2016—2024：把项目交出去，也把技术带到公共问题里

2016 年前后，Mario 将 libGDX 的主要维护工作交给核心贡献者团队。libGDX 官方历史记载，2017 年出现了第一个不是由 Mario 发布的版本。项目并没有因此停下，后来仍持续更新、迁移构建系统并举办社区活动。

这段时期里，他继续参与建立在 libGDX 之上的商业工具 Spine，也以独立开发者、顾问、教练、演讲者和投资人的身份工作。他还把数据与软件能力用于食品价格、公共政策和社会议题。个人网站对这段经历的概括不是某一个连续职位，而是学术、创业、工业、开源和公共参与的组合。

这一阶段对理解 Pi 很重要：一个健康的开源项目不应该只能靠作者永远亲自扛着；工具也不必替使用者决定最终要做什么。

## 2025：从重度使用 Coding Agent 到自己制作 Pi

2025 年 4 月，Mario 开始密集使用 Claude Code。他喜欢早期版本的简单和可预测，却逐渐无法接受工具不断加入自己不需要的功能、隐藏上下文、改变系统提示与模型行为。他想看清模型实际收到什么、保存可处理的完整 Session，并能自由切换模型、工具和界面。

同年 5 月，他与 Peter Steinberger、Armin Ronacher 一起制作 VibeTunnel；之后又开发浏览器 Agent Sitegeist。到了 2025 年，他开始把多年使用 LLM 与开发 Agent 的经验收束成 Pi：先写统一多模型接口 `pi-ai`，再写 Agent 循环、终端界面和最终的 Coding Agent。

![Mario 讲述构建极简 Coding Agent 的文章](/images/mario-zechner/03-pi-building-article.webp)

<p class="image-caption">Mario 于 2025-11-30 发布长文，系统解释 Pi 的组成与取舍。截图中的终端记录来自作者页面。</p>

他的公开原则很直接：如果自己不需要，就不把它做进核心。Pi 因此没有把计划模式、子 Agent、MCP、后台命令或权限弹窗全部固化成唯一答案，而是提供 Extension、Skill、模板和主题，让使用者自己组合。

这不是“功能少所以还没做完”，而是一种带立场的产品设计：核心只提供原语，把工作流的决定权留给使用者。

## 2026：Pi 从个人项目走向 Earendil

Pi 被越来越多项目采用，其中包括建立在 Pi 之上的 OpenClaw。关注度随之上升，Mario 收到投资与工作邀约，也面临是否围绕 Pi 独自创业的选择。

他最终没有成立一家只围绕 Pi 的高压创业公司。Mario 在《I've sold out》中写得很清楚：他希望陪伴年幼的孩子，也希望组建小团队让 Pi 的开源开发能够持续，同时避免重演 RoboVM 的历史。

2026 年 4 月 8 日，他宣布加入 Armin Ronacher 等人所在的 Earendil，并带着 Pi 一起进入团队。Pi 的所有权归 Earendil；Mario 是公司股东，并与 Armin、Colin 一起负责 Pi 的决策，继续主导技术方向、路线、合并与开源边界。

![Mario 宣布加入 Earendil 的文章](/images/mario-zechner/04-earendil-announcement.webp)

<p class="image-caption">《I've sold out》不是一句简单的“项目被卖了”。文章主体讨论的是家庭选择、开源持续性、RoboVM 的教训与 Pi 的治理安排。</p>

项目仓库随后从 Mario 的个人账号迁入 Earendil 组织，软件包名称也调整为 `@earendil-works/pi-coding-agent`。截至本页核验时，Pi 核心仍使用 MIT License，官方站点是 `pi.dev`。

![Pi 官方网站首页](/images/mario-zechner/07-pi-homepage.webp)

<p class="image-caption">Pi 官网把项目定义为 minimal agent harness：让 Pi 适应你的工作流，而不是反过来。</p>

![Mario Zechner 的 X 主页](/images/mario-zechner/05-mario-x-profile.webp)

<p class="image-caption">Mario 的公开账号是 <a href="https://x.com/badlogicgames">@badlogicgames</a>。关注人数和简介属于动态信息，截图仅代表 2026-09-09 的页面状态。</p>

![Pi 的 X 主页](/images/mario-zechner/06-pi-x-profile.webp)

<p class="image-caption">Pi 的公开账号是 <a href="https://x.com/pidotdev">@pidotdev</a>；官网与文档仍应以 <a href="https://pi.dev/">pi.dev</a> 为准。</p>

## 这条时间线怎样帮助你理解 Pi

如果只看功能表，Pi 很容易被理解成“又一个终端 Coding Agent”。把 Mario 的经历连起来以后，几个设计选择会变得更清楚：

- **为什么核心保持克制：** libGDX 和 Pi 都从作者自己的真实问题出发，而不是从功能数量出发。
- **为什么强调可扩展：** 一个底座的价值，在于别人能在上面制作自己的工具和作品。
- **为什么重视可见的上下文与 Session：** Mario 不愿让 Harness 在背后替使用者做太多无法检查的决定。
- **为什么坚持可分叉的开源核心：** RoboVM 的闭源与社区分叉让这件事不再只是理念。
- **为什么加入团队但保留技术主导：** 这是在开源持续性、商业支持与个人生活之间寻找的一次现实安排。

所以，学习 Pi 不只是记住命令。你接下来会看到的 Session 树、最小工具集、Extension 和 Skill，都可以在这条经历里找到来处。

## 主要公开来源

- [Mario Zechner 个人网站与自我介绍](https://mariozechner.at/)
- [libGDX 官方历史](https://libgdx.com/history/)
- [Mario：What I learned building an opinionated and minimal coding agent](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/)
- [Mario：I've sold out](https://mariozechner.at/posts/2026-04-08-ive-sold-out/)
- [Pi 官方网站](https://pi.dev/)
- [Pi 当前 GitHub 仓库](https://github.com/earendil-works/pi)

::: warning 截图与权利说明
本页截图来自 Mario Zechner、libGDX、Pi 与 X 的公开页面，用于人物与项目历史说明；第三方页面、商标、游戏画面与截图内容不包含在本站原创内容的 MIT License 中，其权利归各自权利人所有。
:::

[继续第 1 课：安装前检查 →](/guide/before-install)
