---
title: Pi 工作原理：从一条 Prompt 到一次完整 Agent Loop
description: 把 Session、Context、System Prompt、Tool、Skill、模型调用与 Compaction 串成一条完整运行链，并用会议记录任务走完一次真实 Agent Loop。
prev:
  text: 子 Agent 如何分工
  link: /guide/subagents
next:
  text: 长时间任务与 VPS
  link: /guide/vps-and-long-running
---

<span class="library-status">PRINCIPLE MAP · 完整运行链路</span>

# Pi 工作原理：从一条 Prompt 到一次完整 Agent Loop

前面的课程分别讲过 Session、Context、System Prompt、Tool、Skill、Compaction 和 Cache。单独看，每个词都不难；真正容易卡住的是：**当你提交一条任务以后，它们究竟怎样连在一起？**

这一篇只做一件事：把一次请求从输入到完成完整跑通。读完以后，你应该能看着 Pi 界面里的模型回复、工具调用和工具结果，说清它现在位于哪一步，以及下一步为什么还会再次调用模型。

::: info 先记住一句话
Pi 是组织运行过程的 Agent Harness。模型负责判断下一步，工具负责接触真实环境，Session 保存过程，Context 是某一次模型调用真正收到的输入。
:::

## 先看完整运行链

![Pi 从一条 Prompt 到一次完整 Agent Loop：Pi 从当前 Session 组装 Context，调用模型；模型可以反复调用工具并读取结果，最后回复用户并把过程写回 Session；上下文过长时才进入 Compaction。](/images/diagrams/pi-agent-loop.svg)

图里最重要的不是箭头数量，而是中间那一圈：

```text
模型 → Tool Call → 工具执行 → Tool Result → 模型再次推理
```

只要模型仍然需要外部信息或动作，这个循环就可以继续。模型可能先读取文件，再搜索内容，再修改文件，最后运行检查；每次工具返回的结果都会成为下一次模型判断的依据。模型不再请求工具、而是给出普通回复时，这一轮 Agent Loop 才结束。

图中的 Compaction 使用虚线，因为它不是每条 Prompt 都会经过的固定步骤。只有上下文接近限额、手动执行 `/compact`，或相应机制被触发时，Pi 才会把较早内容整理成摘要，再带着保留的近期消息继续。

## 不要把所有术语排成一条流水线

下面这条写法适合记忆大方向：

```text
输入任务 → 读取 Session → 构建 Context → 调模型 → 调工具 → 返回结果
→ 再次推理 → 回复用户 → 写入 Session → 必要时 Compaction → 继续
```

但真实结构里有三个需要修正的地方。

### 1. System Prompt、Tool 和 Skill 共同参与 Context 组装

它们不是三个依次执行的站点。

- **System Prompt** 规定 Pi 以什么身份工作、有哪些基础规则，并列出当前能力。
- **Tool 定义** 告诉模型有哪些工具、每个工具能做什么、需要哪些参数；工具本身要等模型发出 Tool Call 才会执行。
- **Skill** 通常先以名称和描述出现在系统提示中。任务匹配时，模型再通过读取工具加载完整 `SKILL.md`，其内容从那一刻开始参与后续判断。
- **Context 文件和项目规则**、当前工作目录、活动 Session 分支中的消息与压缩摘要，也会一起构成这一轮模型可见的输入。

所以更准确的说法是：**Pi 先组装 Context，再把 System Prompt、消息和可用工具等信息一起交给模型。**

### 2. Session 不等于 Context

Session 是保存在磁盘上的工作历史，包含用户消息、模型回复、Tool Call、Tool Result、分支与压缩记录。Context 则是 Pi 从当前活动分支重建出来、准备交给模型的本轮输入。

你可以把 Session 想成完整工作档案，把 Context 想成这一次摆到模型桌面上的材料。档案还在，不代表所有旧内容每一轮都完整放在桌面上。

### 3. Cache 不负责决定下一步

提示缓存不是 Agent Loop 中一个新的执行节点。它是模型 Provider 对重复前缀的一种复用机制，可能影响延迟和费用，但不会替 Pi 保存 Session，也不会替模型执行 Tool Call。

因此图里没有单独画 Cache。需要理解缓存命中与上下文变化时，再回到[提示缓存入门](/guide/prompt-caching)。

## 一次 Agent Loop，逐步发生了什么

### 第 0 步：Pi 先准备本次运行环境

启动 Pi 时，它会确定工作目录、模型、可用工具，并加载允许使用的项目资源。可用 Skill 的名称与描述会进入系统提示；Extension 还可以注册新工具，或在 Agent Loop 开始前调整系统提示和上下文。

这一步决定的是“模型稍后能看到什么、能调用什么”，还没有替用户完成任务。

### 第 1 步：用户提交 Prompt

你在编辑区提交任务。Pi 把这条用户消息加入当前 Session 的活动分支，然后准备第一次模型调用。

Prompt 不需要把所有背景重复一遍。当前 Session、项目规则和你明确引用的文件，会由 Pi 按当前运行状态参与上下文组装。但没有实际读入 Context 的材料，不能假设模型已经知道。

### 第 2 步：Pi 构建本轮 Context

Pi 从当前 Session 分支重建消息历史，并组合系统提示、项目 Context 文件、可用工具说明、Skill 索引和当前工作目录等信息。若之前发生过 Compaction，较早消息可能以摘要形式进入当前 Context，较近消息继续保留。

Context 是一次模型调用的输入快照。下一次调用时，因为新 Tool Result 或新消息已经加入，它会随之变化。

### 第 3 步：模型做第一次判断

模型读取当前 Context 后，通常会返回两类结果之一：

1. 已经可以回答，直接生成普通回复。
2. 还需要读取信息或执行动作，返回一个或多个 Tool Call。

模型只是在提出工具调用请求。真正读取文件、执行命令或写入内容的是 Pi 提供的工具。

### 第 4 步：Pi 执行 Tool Call

Pi 按工具名称和参数调用对应能力。例如 `read` 读取文件，`write` 写入文件，`bash` 执行命令。界面会显示 Tool Call 与随后的 Tool Result，让你知道它碰了什么对象、返回了什么。

Tool Result 可能是文件内容、命令输出、变更差异，也可能是明确的错误。无论成功还是失败，它都不是最终回答，而是下一次推理的新证据。

### 第 5 步：Tool Result 回到模型

Pi 把 Tool Result 加入消息历史，再次调用模型。模型此时可以根据真实结果决定：

- 继续调用另一个工具；
- 修正上一次失败的参数；
- 检查刚写入的结果；
- 或停止调用工具，给出最终回复。

这就是 Agent Loop 的核心。**一次用户 Prompt 可以触发多次模型调用，也可以包含多轮 Tool Call 与 Tool Result。**

### 第 6 步：Pi 保存过程并结束本轮

当模型不再请求工具而是给出普通回复，Pi 会把回复继续写入 Session。用户消息、模型消息、Tool Call 和 Tool Result 共同构成可恢复的会话历史。

这里的“结束”只表示 Agent 已经回到等待输入状态，不等于业务结果必然正确。文件是否存在、内容是否完整、网页是否上线，仍要回到真实环境独立验收。

### 第 7 步：Context 变长，必要时进行 Compaction

随着消息和工具结果增加，当前 Context 会逐渐占用更多空间。接近模型上下文限额时，Pi 可以总结较早内容、保留较近消息，并在同一个任务中继续运行；你也可以用 `/compact` 手动触发。

压缩以后，新的摘要会参与后续 Context 重建。它能帮助任务继续，但不是无损记忆，也不会替你恢复磁盘文件。关键目标、决定和验收结果仍应写进项目文件。

## 用真实任务走一遍：把会议记录整理成行动清单

沿用[第一次任务](/guide/first-task)和 [CASE 01](/cases/meeting-notes) 的练习：读取 `input/项目会议记录.md`，生成 `output/行动清单.md`，保留事项、负责人、日期和风险提醒。

下面描述的是这项可复现任务的典型可观察路径。不同模型可能合并调用、增加检查步骤或采用不同顺序；看不见的模型内部思考不会被当成已验证事实。

| 环节 | 这项任务里发生什么 | 你能观察什么 |
| --- | --- | --- |
| Prompt | 用户指定输入、输出、四个字段和不可越过的范围 | Session 中出现完整用户消息 |
| Context | Pi 组合系统提示、工作目录、活动工具、当前会话历史与用户任务 | 启动区能看到已加载资源；底部能看到当前目录与模型 |
| 第一次模型调用 | 模型判断必须先取得会议记录内容 | 出现读取 `input/项目会议记录.md` 的 Tool Call |
| Tool Result | 读取工具把三条事项返回给模型 | 界面显示被读取路径与返回内容 |
| 再次模型调用 | 模型根据原文组织四类字段，并决定写入目标文件 | 出现写入 `output/行动清单.md` 的 Tool Call |
| 再次 Tool Result | 写入工具报告成功或返回错误 | 界面显示实际写入路径；报错时模型可以继续修正 |
| 结束本轮 | 模型不再调用工具，报告产物和建议的验收方法 | Pi 回到可输入状态，最终回复写入 Session |
| 独立验收 | 用户离开模型总结，核对输入指纹、输出路径和三条内容 | `input` 未变，输出文件存在，四类字段逐项对应 |

这个例子里不需要为了展示概念而强行加入 Skill。若后来把“每次都按四个字段检查行动清单”固化成 Skill，变化发生在 Context 组装阶段：系统提示会先列出该 Skill；模型按需读取完整说明后，再沿用同一个工具循环完成任务。

## 遇到问题时，从链路上定位

| 现象 | 先检查哪一段 |
| --- | --- |
| 模型像是不知道项目规则 | Context 文件是否被加载，工作目录是否正确 |
| 模型说读过文件，但界面没有读取记录 | 是否真的产生并执行了 Tool Call |
| 工具报错后任务停止 | Tool Result 的错误内容，以及模型是否获得下一次推理机会 |
| 回复看起来正确，但文件没有变化 | 实际写入 Tool Call、目标路径和磁盘文件 |
| 长任务开始遗漏早期要求 | Context 占用、Compaction 摘要和项目交接文件 |
| Cache 命中下降 | 系统提示、工具定义或历史前缀是否发生变化；不要把它当成记忆丢失 |

## 本篇验收

读完后，不看前文，尝试说清下面四件事：

1. 为什么 Tool Call 之后还要再次调用模型？
2. 为什么 Session 中保存了旧消息，模型仍可能遗漏旧细节？
3. System Prompt、Tool 和 Skill 为什么不是三个顺序执行的步骤？
4. 为什么 Pi 回复“完成”以后，仍要独立检查真实文件或线上结果？

如果能回答，你已经把前面分散的术语接成了一套工作模型。下一步不是记更多词，而是在 [CASE 01](/cases/meeting-notes) 中盯着一次真实工具循环，再去[上下文与压缩](/guide/context-and-compaction)观察长任务如何改变 Context。

### 本篇依据

- [Pi SDK：System Prompt、Tools、Skills 与 Context Files](https://pi.dev/docs/latest/sdk)
- [Pi Agent Core：带 Tool Call 的事件序列](https://github.com/badlogic/pi-mono/tree/main/packages/agent)
- [Pi Extensions：Agent Loop 前后的事件与上下文调整](https://pi.dev/docs/latest/extensions)
- [Pi Skills：按需加载与渐进披露](https://pi.dev/docs/latest/skills)
- [Pi Sessions](https://pi.dev/docs/latest/sessions)
- [Pi Compaction](https://pi.dev/docs/latest/compaction)

以上动态行为核验于 2026-09-11。Pi 的资源加载、事件和压缩机制可能继续更新，以官方 Latest 文档和对应源码为准。
