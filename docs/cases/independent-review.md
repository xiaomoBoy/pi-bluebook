---
title: CASE 04 · 两路独立审阅
description: 用隔离的只读会话练习子任务分工，再由主会话合并证据。
prev: { text: CASE 03 · 最小 Extension, link: /cases/first-extension }
next: { text: CASE 05 · 中断恢复, link: /cases/checkpoint-recovery }
---

<span class="library-status">CASE 04 · 可练习</span>

# 两路独立审阅

## 结果

字段审阅和安全审阅互不读取对方结论，各自返回原文证据；主会话记录共同结论、差异、冲突和未知。

## 材料与步骤

- 输入：<a href="/examples/first-task/meeting-notes.md" download>虚构会议记录</a>
- 完整步骤：[第 12 课 · 子 Agent 如何分工](/guide/subagents)

本案例用两个命名、只读的 Pi 会话练习分工结构，不要求安装 Package，也不宣称 Pi 核心内置子 Agent。

## 验收

- 两路输入范围不同，输出都带原文位置。
- 两路不写同一个文件，也不提前交换结论。
- 主会话遇到冲突会回读原文，不按多数票决定。
- 最终记录保留未知项和取舍理由。

## 失败恢复

一路失败只重跑该路；选错会话先退出并核对名称。两个角色准备修改同一文件时立即停止，改为只返回结果，由主会话单独写最终稿。
