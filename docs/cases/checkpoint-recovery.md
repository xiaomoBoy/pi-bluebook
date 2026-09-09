---
title: CASE 05 · 从检查点恢复
description: 处理三篇小材料，中断后按进度文件继续且不重不漏。
prev: { text: CASE 04 · 独立分工, link: /cases/independent-review }
next: { text: CASE 06 · 安全边界, link: /cases/safe-review }
---

<span class="library-status">CASE 05 · 可练习</span>

# 从检查点恢复

## 结果

先处理一篇并停止，再由新会话读取 `long-task/progress.md` 完成剩余两篇；最终三篇不重不漏，失败项有记录。

## 材料与步骤

- <a href="/examples/long-task/source/article-a.md" download>article-a.md</a>
- <a href="/examples/long-task/source/article-b.md" download>article-b.md</a>
- <a href="/examples/long-task/source/article-c.md" download>article-c.md</a>
- <a href="/examples/long-task/progress-template.md" download>进度模板</a>
- 完整步骤：[第 13 课 · 长时间任务与 VPS](/guide/vps-and-long-running)

![完成三篇材料后对照数量与进度文件](/images/07-Pi-长任务检查点-实操图.png)

恢复会话先读 `progress.md`，完成后再做这张图里的三处核对。不要从“会话还在”推断任务已经完成。

## 验收

输入文件数、索引条目数、进度中的已完成数都为 3；已处理列表无重复，失败列表与实际一致。再逐篇核对摘要，不能只比数字。

## 失败恢复

中断后先读进度和现有输出，不从头盲跑。发现重复时保留现场，列出重复项及来源后再决定修正；文件损坏时写入失败列表并停止。
