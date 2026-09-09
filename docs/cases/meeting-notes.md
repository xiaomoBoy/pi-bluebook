---
title: CASE 01 · 会议记录行动清单
description: 从一份虚构会议记录生成行动清单，并独立核对输入与输出。
prev: { text: 案例库, link: /cases/ }
next: { text: CASE 02 · 第一个 Skill, link: /cases/first-skill }
---

<span class="library-status">CASE 01 · 可练习</span>

# 会议记录行动清单

## 结果

从三条虚构会议记录生成 `output/行动清单.md`，原文件保持不变，三个行动项的负责人、日期和限制逐项对应。

## 材料与步骤

- <a href="/examples/first-task/meeting-notes.md" download>下载虚构会议记录</a>
- 操作目录：独立的 `pi-practice`
- 完整步骤：[第 5 课 · 第一次任务](/guide/first-task)

## 验收

1. 执行前指纹检查仍为 `OK`。
2. 输出文件存在，并且恰好有三个事项。
3. 小林、小周、小陈分别对应正确日期和限制。
4. 实际读写记录没有出现练习目录之外的路径。

## 失败恢复

输入发生变化、输出混入旧内容或路径不对时，停止继续修改，保留现场；在新的空练习目录重新下载材料并生成新指纹。不要用 Agent 的“已经修好”代替重新检查。
