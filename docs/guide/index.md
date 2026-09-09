---
title: 蓝皮书主线
description: Pi 学习蓝皮书的五个学习模块与 14 课完整目录。
prev:
  text: 首页
  link: /
next:
  text: 导论 · 为什么读这本书
  link: /guide/introduction
---

<span class="library-status">CORE CURRICULUM · 5 个模块 · 14 课</span>

# 蓝皮书主线

这部分负责完整、连续、经过核验的学习过程。第一次阅读先从导论理解 Pi 是什么、这本书为谁而写，再阅读凡例和序章；已经能够安装、登录并正常使用 Pi 的读者，可以从第二模块进入真实任务。

个人推文和使用感悟不会直接当作教程结论。能够进入主线的内容，需要重新检查来源、操作方式、风险边界与成功信号。每个模块同时标出配套实操与延伸阅读，但它们不会打断主线顺序。

## 开篇 · 先知道为什么读

1. [导论：为什么要读这本 Pi 蓝皮书](/guide/introduction)
2. [从 98 条推文留下的十条判断](/guide/lasting-principles)
3. [凡例与 2026 开放学习版说明](/guide/edition-2026)

导论说明 Pi 的位置、中文初学者的真实门槛和本版主张；十条判断把个人学习记录中经受住后续实践的部分蒸馏进书；凡例则固定平台路径、核验日期、维护方式和版权边界。

## 序章 · 先认识做出 Pi 的人

[Mario Zechner 的完整职业时间线](/guide/mario-zechner)从 2009 年的 AFX 与 libGDX 写起，经过 RoboVM、独立开发和 Coding Agent 实践，再走到 2026 年的 Pi 与 Earendil。它不是安装前置条件，但能帮助你理解 Pi 为什么保持极简、开放和可扩展。

## 模块一 · 安装与基础设置

1. [安装前检查](/guide/before-install)
2. [安装并启动 Pi](/guide/install-pi)
3. [登录与模型设置](/guide/connect-model)
4. [从练习目录开始](/guide/ready-to-work)

::: info Windows 用户从这里开始
先完成 [Windows 中文路径：安装并启动 Pi](/guide/windows-setup)，通过页面验收后直接接入第 3 课。后续看到“普通终端”时继续使用 Git Bash，并按页面里的对照表替换练习目录和指纹命令。
:::

**完成标志：** 能在独立练习目录启动 Pi，并获得一次真实回复。

安装完成后不必立即停下来学习维护命令；需要升级、换账号、卸载或处理本地数据时，进入 [安装后生命周期管理](/guide/lifecycle-management)。

## 模块二 · 完成真实任务

5. [第一次任务](/guide/first-task)
6. [文件与工作目录](/guide/files-and-context)
7. [会话的保存与续写](/guide/sessions)

**完成标志：** 能独立检查输入材料、输出文件和任务要求，不让 Agent 给自己打分。

**配套内容：**[CASE 01 · 把会议记录整理成行动清单](/cases/meeting-notes) · [授权译文：无法随身带走的会话](/translations/session-portability)

## 模块三 · 长任务与上下文

8. [上下文与压缩](/guide/context-and-compaction)
9. [提示缓存入门](/guide/prompt-caching)

**完成标志：** 任务持续变长时，知道怎样留下关键结果，并理解压缩和缓存不是一回事。

**配套实验：**[CASE 02 · 压缩前后对照](/cases/compaction-before-after)

**官方授权译文：**[Pi 中的压缩机制](/translations/compaction-in-pi) · [Agent 中的提示缓存](/translations/prompt-caching)

## 模块四 · 扩展自己的 Pi

10. [Skill、Extension 与 Package](/guide/skills-extensions-packages)
11. [Extension 的需求与验收](/guide/first-extension)
12. [子 Agent 如何分工](/guide/subagents)

**完成标志：** 能从真实需求出发选择扩展方式，并检查新增能力是否真的生效。

**配套实操：**[CASE 03 · 第一个 Skill](/cases/first-skill) · [CASE 04 · 最小 Extension](/cases/first-extension) · [CASE 05 · 两路独立审阅](/cases/independent-review)

## 模块五 · 建立稳定工作流

13. [长时间任务与 VPS](/guide/vps-and-long-running)
14. [权限、隔离与验收](/guide/safety)

**完成标志：** 建立检查点、恢复路径和权限边界，让长任务可以继续，也可以安全停下。

**配套实操：**[CASE 06 · 从检查点恢复](/cases/checkpoint-recovery) · [CASE 07 · 任务前安全审阅](/cases/safe-review)

## 需要查找，而不是继续上课时

进入[参考手册](/reference/)按主题查询。个人经历、推文原文和认知变化单独保存在[小墨札记](/journey/)，不会混进课程结论。
