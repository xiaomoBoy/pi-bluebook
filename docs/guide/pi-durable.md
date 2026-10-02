---
title: Pi Durable：让 Agent 在中断后继续工作
description: 从官方旅行规划演示理解 Pi Durable 的持久化任务、崩溃恢复与并发会话，以及它和 Pi、tmux、进度文件的区别。
prev:
  text: 长时间任务与 VPS
  link: /guide/vps-and-long-running
next:
  text: Pi Durable 官方完整译文
  link: /translations/pi-durable
---

<span class="library-status">选学专篇 · PI DURABLE</span>

# Pi Durable：让 Agent 在中断后继续工作

假设一个 Agent 正在安排旅行：天气查完了，博物馆查完了，火车时刻还在查询，进程却突然退出。重新打开以后，它能不能保留前两项结果，只恢复剩下的工作？

2026 年 10 月 1 日，Earendil 随 Pi 1.0 发布了 Pi Durable，尝试解决的就是这类问题。**它是供开发者构建长期运行 Agent 应用的实验性框架。** 你平时在终端里使用的 Pi 编程助手继续存在；升级 Pi，并不会自动把已有会话变成 Durable 应用。

读完本篇，你应该能区分不同的恢复方式，理解一次任务恢复时发生了什么，并知道如何沿官方旅行规划示例继续探索。

::: info 核验范围 · 2026-10-02
本篇依据发布文章及 Pi `v1.0.0` 的 README、示例源码整理。下面的操作是官方示例的复现路径，本篇未把它标为蓝皮书实测案例。Pi Durable 的 API 仍可能变化；阅读概念不需要安装它。
:::

## 保存会话、保持进程、恢复任务，分别解决什么问题？

蓝皮书已经介绍过 [tmux 与 VPS](/guide/vps-and-long-running)，也做过[通过进度文件恢复任务](/cases/checkpoint-recovery)的练习。它们各有用处：

| 方式 | 留下什么 | 中断后怎样继续 |
| --- | --- | --- |
| Pi 会话记录与 `progress.md` | 对话，以及由任务明确写下的业务进度 | 人或新会话读取记录，核对文件，再决定下一步 |
| tmux | 仍在运行的终端会话和其中的进程 | SSH 断开后重新连接；进程本身已经退出，则需要另行处理 |
| Pi Durable | 对话、任务检查点、排队消息和应用状态 | 新进程打开同一份持久化存储，恢复未完成任务 |

Durable 处理的是任务内部的恢复逻辑。让退出的服务重新启动，仍是应用或进程管理器的职责。它也不能替代你检查“最终文件是否正确”这件事。

## 先认识四个部件

<strong>会话（Conversation）</strong>保存人与 Agent 的交互记录，以及这段对话使用的模型、工具和指令。应用可以同时运行多个会话，或从已有历史中分叉。

<strong>任务（Task）</strong>是运行中的工作单元。一次模型请求、一次工具调用、一次压缩，都可以成为任务。任务在推进时保存检查点，让新进程知道哪些已经完成，哪些还在等待。

<strong>存储（Storage）</strong>承接这些状态。框架提供内存、SQLite 和 JSONL 后端。要跨进程恢复，需要保留下来的 SQLite、JSONL 或其他持久化后端；内存后端会随进程消失。同一份存储在同一时刻由一个进程持有，多个客户端连接到这个进程。

<strong>执行环境（Execution Environment）</strong>决定工具实际在哪里工作。Harness 与工具可以位于不同机器上。自带的 Node 执行环境能访问本地文件，它本身并不等于一个隔离沙箱。

这些概念都围绕同一个问题：除了聊天内容，还要保存哪些状态，才能让工作真正接着进行？

## “接着做”并不总是从那一行继续

框架恢复的是任务状态，不是冻结并恢复整个操作系统进程。

| 中断的工作 | Pi Durable 的处理 |
| --- | --- |
| 正在生成的模型回复 | 重新发出请求；原来的部分回答留在记录中，标为已中止 |
| 声明 `replay: "safe"` 的工具 | 可以重新执行，例如只读查询 |
| 没有声明可安全重跑的工具 | 把中断情况和已保存的输出告诉模型，由它决定下一步 |
| 客户端重试同一条输入 | 用相同 `requestId` 找回原提交，避免重复提交 |

这里尤其要区分“输入不重复提交”和“任何外部操作只执行一次”。数据库之外的付款、发消息、部署等动作，仍需应用设计幂等性或补偿逻辑。原文的付款代码也明确使用了幂等键和退款处理。

长对话同样有边界：旧消息可以继续留在存储里，当前请求仍受模型上下文窗口限制。Durable 用后台压缩来延续对话；这不意味着模型每次都能看到全部历史。

## 先看旅行规划演示

[完整译文中的原始录屏](/translations/pi-durable#试试看)展示了一个旅行规划 Agent。主 Agent 把调研交给子 Agent，子 Agent 同时执行天气、博物馆和火车三项搜索；与此同时，主 Agent 还能继续与用户聊天。

官方示例里，三项搜索分别等待约 6 秒、10 秒和 30 秒，再返回预先准备的数据。**它演示的是并行任务与恢复，不是实时天气或票务查询。** 模型调用仍需要可用的模型凭据，也可能产生用量费用。

录屏里，天气和博物馆结果已经返回，火车搜索尚未完成时，进程退出。重新打开原会话后，已完成结果仍在，允许安全重跑的火车搜索再次执行。报告完成后，通过消息交给主 Agent，由它整理成计划。

这里的子 Agent 是应用通过工具与独立会话构建出来的。Durable 提供构建机制，没有替所有应用预设一种子 Agent 产品形态。

## 想动手时，从官方示例开始

以下命令按 **Pi `v1.0.0`** 固定，避免后续 `main` 的变化让步骤失去对应关系。需要 Git、Node.js **22.19.0 或更高版本**、npm，以及已能在 Pi 中正常使用的模型。

先在普通终端检查 Node：

```bash
node --version
```

然后打开日常使用的 Pi，在 Pi 输入框中用 `/login` 完成认证，并选好一个可用的默认模型。确认普通对话能够返回回答后退出。旅行演示复用 Pi 的凭据与设置，自身没有 `/login`。

### 1. 在独立目录取得源码

在你存放实验项目的目录中，用普通终端执行下列命令。`pi-durable-demo` 是本次新建的源码目录；如果同名目录已存在，换一个新名字。

```bash
git clone --branch v1.0.0 --depth 1 https://github.com/earendil-works/pi.git pi-durable-demo
cd pi-durable-demo
npm install
npm run build
```

预期结果是依赖安装和构建都成功结束。若构建失败，先核对 Node 版本与报错，不跳过构建继续启动。

### 2. 启动旅行规划器

仍在刚才的 **Pi 源码仓库根目录**执行：

```bash
node packages/coding-agent/src/experimental/vacation/main.ts
```

看到演示终端界面后，发送：

> 为两个人安排一个维也纳周末，把天气、博物馆和火车的调研交给子 Agent。

先让它完整运行一次，熟悉 `/agents` 切换主会话与子 Agent、`/tasks` 查看任务图的入口。看到报告确实送达主会话，再尝试下一步。

### 3. 观察中断后的恢复

重新启动一段新的演示会话并提出同样的请求。观察任务列表，在天气和博物馆已经完成、火车仍在运行时，按官方演示说明使用 `Ctrl+C` 退出。模型响应速度不同，三个任务的开始时间也可能不同，以实际任务状态为准。

然后在**同一工作目录**执行：

```bash
node packages/coding-agent/src/experimental/vacation/main.ts --continue
```

`--continue` 选择当前目录最近的演示会话。数据保存在：

```text
~/.pi/agent/experimental/vacation-sessions/<cwd-hash>/<session>/session.sqlite
```

上面的尖括号表示程序生成的目录，不需要你手工创建。恢复前不要删除数据文件，也不要换工作目录，否则可能打开另一份会话。

### 4. 用状态与结果验收

本次观察应能回答以下问题：

- 恢复后，原来的会话和已完成搜索结果是否仍在？
- 天气、博物馆这两项已完成任务是否没有重复执行？
- 火车这项未完成且可安全重跑的搜索，是否重新运行并完成？
- 最终报告是否送达主会话，旅行计划是否引用了这些结果？

仅凭 Agent 说“恢复成功”还不够，要对照任务状态与实际报告。若重启后出现空白会话，先检查是否用了 `--continue`、是否仍在原工作目录，以及原 SQLite 文件是否还在。认证报错则回到普通 Pi 检查登录与默认模型配置。

## 什么时候值得继续学习？

如果你主要是在终端里写代码、改文章、完成单次任务，继续使用 Pi 和已有的会话、进度文件方法即可。

当你要开发一个长期在线的机器人、多用户共同参与的工作流，或需要让多段对话和后台任务在重启后继续运行的应用时，Pi Durable 才开始显得有价值。它还支持应用状态文档、扩展热替换、多人订阅同一对话等机制；这些能力需要开发者组合，不等于现成的 Slack 服务或多人聊天网站。

下一步可以读[官方完整译文](/translations/pi-durable)，再对照以下固定版本资料。原文中的支付、审批、部署片段用来说明机制，其中的外部服务需要自行实现，不是可以直接复制运行的完整应用。

## 来源与继续阅读

- [Earendil：Pi Durable 发布文章](https://earendil.com/posts/pi-durable/)
- [Pi v1.0.0：Durable README](https://github.com/earendil-works/pi/blob/v1.0.0/packages/durable/README.md)
- [旅行规划器 README：运行、恢复与会话目录](https://github.com/earendil-works/pi/blob/v1.0.0/packages/coding-agent/src/experimental/vacation/README.md)
- [旅行规划器源码：模拟搜索与等待时间](https://github.com/earendil-works/pi/blob/v1.0.0/packages/coding-agent/src/experimental/vacation/vacation.ts)
- [Durable 包的运行环境要求](https://github.com/earendil-works/pi/blob/v1.0.0/packages/durable/package.json)
- [三十多个官方示例](https://github.com/earendil-works/pi/tree/v1.0.0/packages/durable/test/examples) · [小型编程助手示例](https://github.com/earendil-works/pi/tree/v1.0.0/packages/coding-agent/src/experimental/durable)
