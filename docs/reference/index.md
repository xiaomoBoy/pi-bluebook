---
title: 参考手册
description: 按问题查找 Pi 的核心概念、操作入口、能力边界与延伸阅读。
prev:
  text: 实操案例
  link: /cases/
next:
  text: Session 与续写
  link: /guide/sessions
---

<span class="library-status">REFERENCE · 遇到问题时查这里</span>

# 参考手册

这里不承担从零教学，也不要求顺序阅读。遇到一个术语、一项能力或一个操作问题时，从对应主题进入；如果你希望完整学习，请回到[蓝皮书主线](/guide/)。

## 核心机制

| 你正在找什么 | 主题入口 | 适合解决的问题 |
| --- | --- | --- |
| Pi 能看到哪些材料 | [文件与工作目录](/guide/files-and-context) | 工作目录、文件范围与上下文边界 |
| 怎样保存并继续任务 | [Session 与续写](/guide/sessions) | 会话命名、恢复与可携带性 |
| 长任务为什么会忘记 | [上下文与压缩](/guide/context-and-compaction) | Context、Compaction 与交接记录 |
| Cache 数字代表什么 | [提示缓存](/guide/prompt-caching) | 缓存命中、成本与状态判断 |

## 能力与边界

| 能力 | 主题入口 | 先记住的一句话 |
| --- | --- | --- |
| 固化方法与新增能力 | [Skill、Extension 与 Package](/guide/skills-extensions-packages) | Skill 教它怎么做，Extension 给它新的运行能力 |
| 多任务分工 | [子 Agent](/guide/subagents) | 分工之后仍需统一证据和最终验收 |
| 安全地执行任务 | [权限、隔离与验收](/guide/safety) | 成功返回不等于业务结果已经完成 |
| 长时间运行 | [VPS 与长期任务](/guide/vps-and-long-running) | 先设计检查点、恢复路径和停止条件 |

## 操作入口

- [安装前检查](/guide/before-install)：确认环境和练习目录。
- [安装并启动 Pi](/guide/install-pi)：完成第一次启动。
- [登录与模型设置](/guide/connect-model)：连接 Provider 与模型。
- [从练习目录开始](/guide/ready-to-work)：把实验与真实文件隔离。

## 延伸阅读

专题文章不再作为一条独立课程。它们会从对应章节进入，用原始文章和实践进一步解释一个机制：

- 学完第 7 课后：[会话为什么也要归你](/translations/session-portability)
- 学完第 8 课后：[压缩前先给下一棒留下交接](/translations/compaction-in-pi)
- 学完第 9 课后：[别让缓存命中率带偏任务](/translations/prompt-caching)

[查看全部延伸阅读](/translations/)

::: tip 怎么使用参考手册
先用搜索或上面的主题索引定位问题；需要建立完整理解时，再沿着页面顶部的课程归属回到对应章节。
:::
