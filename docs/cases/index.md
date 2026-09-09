---
title: 实操案例
description: 可以独立复现和验收的 Pi 完整任务案例。
prev:
  text: 蓝皮书主线
  link: /guide/
next:
  text: 第一次文件任务
  link: /guide/first-task
---

<span class="library-status">PRACTICE LAB · 从材料到验收</span>

# 实操案例

这里不重复讲一遍概念。每个案例都归属于一个蓝皮书模块，从一份明确材料开始，写清任务、限制、预期结果和失败后的恢复方式，让读者可以在自己的环境里完整复现。

## 案例结构

每个正式案例都应包含：

1. 可以下载或自行准备的练习材料；
2. 一段可以直接交给 Pi 的任务说明；
3. 执行过程中应该看到的关键现象；
4. 不依赖 Agent 自述的验收方法；
5. 出错后保留现场和恢复的方法。

## CASE 01 · 把会议记录整理成行动清单

**课程归属：** 模块二 · 完成真实任务

**状态：** 可练习

使用一份虚构会议记录，让 Pi 生成结构化行动清单，并独立核对负责人、日期、遗漏项和输出位置。

[开始这个案例](/cases/meeting-notes) · <a href="/examples/first-task/meeting-notes.md" download>下载练习材料</a>

## 案例路线图

下面的案例把后半本课程中的方法落到固定材料、明确步骤和独立验收。教学代码只用于最小、非破坏性练习；涉及真实桌面通知、远程服务器或陌生插件的进阶效果，仍以实际环境验收为准。

- [CASE 02 · 从重复流程整理出第一个 Skill](/cases/first-skill) — 模块四，可练习
- [CASE 03 · 加载并停用一个最小 Extension](/cases/first-extension) — 模块四，可练习
- [CASE 04 · 用两路独立会话完成有证据的审阅](/cases/independent-review) — 模块四，可练习
- [CASE 05 · 为长时间任务建立检查点和恢复路径](/cases/checkpoint-recovery) — 模块五，可练习
- [CASE 06 · 执行前完成一次安全边界审阅](/cases/safe-review) — 模块五，可练习

::: info 案例与个人经验的边界
小墨札记可以提供案例线索，但不会直接充当操作依据。涉及命令、版本、插件和权限的内容，需要重新核验后再发布。
:::
