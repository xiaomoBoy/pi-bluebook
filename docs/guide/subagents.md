---
title: 子 Agent 如何分工
description: 从角色、输入、产物和验收四个方面理解子 Agent 协作。
prev:
  text: Extension 的需求与验收
  link: /guide/first-extension
next:
  text: 长时间任务与 VPS
  link: /guide/vps-and-long-running
---

<span class="library-status">MODULE 04 · STEP 12 · 可练习</span>

# 子 Agent 如何分工

一个 Agent 可以独立完成很多事。当任务同时需要技术核对、文字编辑和真实使用者检查时，把工作分给几个子 Agent 才可能节省时间。

截至 2026-09-09，官方明确说明 Pi 核心不内置子 Agent；官方代码仓库提供的是 Extension 示例。界面里没有看到分工按钮，不是安装失败。本课先用两个独立会话完成同样的分工结构，不要求安装社区 Package，也不把手动练习写成内置能力。

## 什么任务适合分工

适合并行的子任务有两个特征：边界清楚，可以独立交付。比如这本蓝皮书的一次内容更新，可以分成：

| 角色 | 输入 | 产物 |
| --- | --- | --- |
| 新手读者 | 安装章节 | 找出读者不知道在哪输入、看什么结果的位置 |
| 技术核对 | 官方文档和技术章节 | 列出过时、不准确或缺少边界的叙述 |
| 主编 | 完整章节与学习路线 | 检查重复、跳步和前后断裂 |

不适合并行的情况是，几个 Agent 同时修改同一个文件，却没有明确的所有者。这很容易出现覆盖、冲突和标准不一致。

## 怎样写一份可验收的分工

交给子 Agent 的说明至少包含：

- 只处理哪些文件或问题。
- 可以修改还是只读检查。
- 完成时要返回什么证据。
- 哪些判断必须交回主 Agent，不能自行扩大范围。

主 Agent 的职责不是把任务发出去就算完成。它要合并结果、处理冲突、运行整体检查，并对最终交付负责。

## 别过早扩大团队

如果你还不能给单个 Agent 写出可验收的任务，增加子 Agent 通常只会让问题变得更难看懂。先用一个 Agent 完成三至五个真实任务，再把稳定、独立、重复出现的部分分出去。

## 实操：用两个只读会话练习分工

材料仍使用 `input/项目会议记录.md`。这次两个会话不修改业务材料，分别检查“字段完整性”和“安全限制”，最后由第三个主会话合并。先在普通终端进入练习目录并建立会话导出目录：

```bash
cd ~/Downloads/pi-practice
pwd
mkdir -p reviews
```

### 1. 字段审阅会话

在普通终端确认位于 `pi-practice`，启动一个仅启用只读工具的命名会话：

```bash
pi --name "字段审阅" --no-extensions --tools read,grep,find,ls
```

在 Pi 编辑区发送：

```text
只读检查 input/项目会议记录.md。
列出每个行动项的事项、负责人、截止日期和限制；原文没有的写“未知”。
不要修改文件。返回引用到的原文短句与行号。
```

结果出现后，在 Pi 编辑区输入 `/export reviews/fields.html`。退出回到普通终端，运行 `test -f reviews/fields.html && echo "PASS: 字段审阅已导出"`。不要让这个会话写合并稿。

### 2. 安全审阅会话

退出后仍在同一目录启动另一个会话：

```bash
pi --name "安全审阅" --no-extensions --tools read,grep,find,ls
```

发送：

```text
只读检查 input/项目会议记录.md。
只列出涉及账号、私人路径、凭据、发布前检查和验收的限制。
不要修改文件；每条结论附原文短句与行号，不确定就标记“未知”。
```

结果出现后，在 Pi 编辑区输入 `/export reviews/safety.html`。退出回到普通终端，运行 `test -f reviews/safety.html && echo "PASS: 安全审阅已导出"`。

### 3. 主会话合并

在普通终端确认仍位于 `pi-practice`，启动主会话：

```bash
pwd
pi --name "分工合并" --no-extensions
```

在 Pi 编辑区发送：

```text
读取 reviews/fields.html、reviews/safety.html 和 input/项目会议记录.md。
把合并结果写入 reviews/merged.md，只包含：共同结论、字段审阅独有、
安全审阅独有、冲突与未知、回到原文后的最终核对。
每条最终结论附原文行号。两路冲突时必须以重新读取的原文为依据，不能按多数票决定。
不要修改 input 和两份 HTML 导出文件。
```

完成后退出 Pi，在普通终端执行：

```bash
test -f reviews/merged.md && echo "PASS: 合并记录存在"
sed -n '1,160p' reviews/merged.md
```

`--tools read,grep,find,ls` 只限制这次启动中提供给模型的工具，`--no-extensions` 再避免自动加载 Extension；它们仍不是操作系统沙箱，只读工具仍能读取当前用户有权读取的其他路径。Pi 进程、上下文文件和你显式加入的其他资源仍需按安全章节判断。

这个练习刻意把会话分开，使两路审阅不会互相抄结论。真正的子 Agent Extension 只是把“启动、传入材料、收回结果”自动化；角色边界和最终合并责任不会因此消失。

## 失败与恢复

- 某一路没有返回行号：只重跑该路，不让另一会话补写它的证据。
- 两路准备写同一文件：停止写入，改为各自返回只读结果，由主会话单独拥有最终文件。
- 恢复了错误会话：不要继续发送材料；先看历史和工作目录，再用 `/resume` 按名称选择正确会话。
- 想安装子 Agent Package：先停在这里，阅读完整源码、安装内容和权限；来源不明时不安装。

## 本课验收

- 存在两份互不读取对方结论的审阅结果。
- 每份结果都标明输入范围、只读限制、原文证据和未知项。
- 合并结果明确记录一致、差异、冲突与取舍理由。
- `reviews/fields.html`、`reviews/safety.html` 和 `reviews/merged.md` 三份产物都存在。
- 你能解释：这是对分工方法的手动练习，不代表 Pi 核心内置子 Agent。

### 本章依据

- [Pi 使用说明中的设计原则](https://pi.dev/docs/latest/usage#design-principles)
- [Pi 官方 Extension 示例索引](https://pi.dev/docs/latest/extensions#examples-reference)
- [我对子 Agent 工作流的实际使用记录](https://x.com/xiaomovps/status/2091841029850681551)

核心能力边界核验于 2026-09-09。
