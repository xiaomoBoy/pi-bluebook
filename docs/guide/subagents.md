---
title: 子 Agent 如何分工
description: 从角色、输入、产物和验收四个方面理解子 Agent 协作。
prev:
  text: Extension 的需求与验收
  link: /guide/first-extension
next:
  text: Pi 工作原理
  link: /guide/how-pi-works
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

<a id="choose-subagents"></a>

## 怎样选择子 Agent 扩展

先完成下面的手动分工案例，再决定是否安装。以下是 **2026-10-12** 的资料核对，四项都是非官方项目；版本、维护状态和权限以各仓库为准，不按下载量排名。

| 项目 | 版本、安装与维护 | 适合场景与边界 |
| --- | --- | --- |
| [badlogic/pi-subagent](https://github.com/badlogic/pi-subagent) | 内部清单为 `0.1.0`，私有包，无公开 npm 版或 Release；README 采用源码克隆与 CLI 软链安装，需 Node.js 22.19 和 tmux。最近提交为 9 月 30 日，未归档，无 Issues 入口；未发现许可证。 | 适合习惯 tmux、想直接查看子会话的人；不支持嵌套。公开源码不等于已有开源许可，使用前核对授权；安装路径和 SSH 前置条件按 README 确认。 |
| [nicobailon/pi-subagents](https://github.com/nicobailon/pi-subagents) | `0.77.0`，MIT；`pi install npm:pi-subagents@0.77.0`。10 月 10 日发布，11 日仍有提交，未归档。 | 适合需要 reviewer、scout、oracle 等预设角色与前后台委派的人；先确认每个角色实际选择的模型、工具和后台行为。 |
| [tintinweb/pi-subagents](https://github.com/tintinweb/pi-subagents) | `0.20.0`，MIT；`pi install npm:@tintinweb/pi-subagents@0.20.0`，要求 Pi 1.1.0。10 月 9 日发布，11 日仍有提交，未归档。 | 适合迁移 Claude Code 式 Agent 与工作流习惯的人；嵌套默认关闭，子项工具限制不自动继承父项，需逐项配置。 |
| [pi-subagent-manager](https://github.com/championswimmer/pi-subagent-manager) | `0.25.0`，MIT；`pi install npm:pi-subagent-manager@0.25.0`，要求 Pi 0.99.2、Node.js 22.19。10 月 11 日发布并提交，未归档。 | 适合需要路径树、嵌套和暂停恢复的人；共享工作目录与系统权限，工具策略不是沙箱。 |

只有源码安装流程的第一项，安装步骤见[项目 README](https://github.com/badlogic/pi-subagent#install)，本课不额外维护一份软链脚本。其 README 使用的 `earendil-works/pi-subagent` 地址目前重定向到作者仓库，不能据此把它当成官方产品。

与[插件选择页](/plugins/#subagents)保持同一条边界：安装前先读源码、依赖与安装内容，再用没有真实资料的隔离练习目录；额外模型调用可能增加费用。一次只装一个，多个扩展可能争用 `/agents` 等命令。提示词和工具清单不能替代系统隔离。

表中命令用于核对安装来源，本课不要求逐项执行。若试用 npm 项后换另一项，先用 `pi remove` 加同一来源移除，再用 `pi list` 确认消失；源码安装按该项目 README 处理。

### 维护者最小复现

2026-10-12，在独立配置与练习目录中安装 `pi-subagents@0.77.0`，用 Pi 1.1.0 委派一个前台 `delegate`，固定为 `deepseek/deepseek-flash:off`，要求只回复 `BLUEBOOK_CHILD_OK`。这次无文件变更的测试显式采用文档支持的 `acceptance.level: "none"`，由维护者独立对照返回标记；工具事件记录了一个子任务、退出码为 `0`、工具计数为 `0`，主会话收到同一标记。随后用同一来源移除，`pi list` 显示没有 Package。

这只验证一次前台委派；没有测试并发、后台、嵌套、重启恢复或另外三个扩展，不能写成四项都「已验证可用」。

## 配套实操：CASE 05 · 两路独立审阅

本课不再维护第二份操作步骤。进入 [CASE 05 · 两路独立审阅](/cases/independent-review)，按其中的固定材料、三条会话、任务原文、独立验收和失败恢复完整练习一次。

案例刻意把两路审阅分开，再由主会话合并证据。它练习的是子任务边界和合并责任，不把手动会话写成 Pi 核心内置的子 Agent 功能。

## 本课验收

- 能说清哪些任务适合分开，哪些文件必须只有一个最终所有者。
- 能为每一路写明输入、只读或修改权限、交付证据和未知项。
- 已按 CASE 05 检查两份独立结果与主会话合并记录，或能准确说明它们的验收关系。
- 能解释：这是对分工方法的手动练习，不代表 Pi 核心内置子 Agent。

### 本章依据

- [Pi 使用说明中的设计原则](https://pi.dev/docs/latest/usage#design-principles)
- [Pi 官方 Extension 示例索引](https://pi.dev/docs/latest/extensions#examples-reference)
- [我对子 Agent 工作流的实际使用记录](https://x.com/xiaomovps/status/2091841029850681551)

核心能力边界的原核验日期为 2026-09-09；扩展资料与上述最小复现单独记录于 2026-10-12。

- [pi-subagents v0.77.0](https://github.com/nicobailon/pi-subagents/releases/tag/v0.77.0)
- [tintinweb v0.20.0](https://github.com/tintinweb/pi-subagents/releases/tag/v0.20.0)
- [pi-subagent-manager 版本与许可证](https://github.com/championswimmer/pi-subagent-manager/blob/main/package.json)
