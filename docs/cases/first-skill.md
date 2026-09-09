---
title: CASE 02 · 把方法整理成 Skill
description: 显式加载一个教学 Skill，复用行动清单的核对规则。
prev: { text: CASE 01 · 会议记录, link: /cases/meeting-notes }
next: { text: CASE 03 · 最小 Extension, link: /cases/first-extension }
---

<span class="library-status">CASE 02 · 可练习</span>

# 把方法整理成 Skill

## 结果

将“指定输入、固定四个字段、未知不猜、写后复核”固化为可读取的 Skill，并生成一份复核版行动清单。

## 材料与步骤

- 输入：<a href="/examples/first-task/meeting-notes.md" download>CASE 01 的虚构会议记录</a>
- Skill：<a href="/examples/skill/action-list-review/SKILL.md" download>下载 action-list-review/SKILL.md</a>
- 完整步骤：[第 10 课 · Skill、Extension 与 Package](/guide/skills-extensions-packages)

先读完整个 `SKILL.md`，再使用 `--no-skills --skill <路径>` 显式加载。不要把看不懂的工作说明直接放进自动发现目录。

![教学 Skill 的真实加载状态与显式调用位置](/images/05-Pi-Skill显式加载-实操图.png)

图中底部内容仍未提交，方便你在执行前最后一次核对 Skill 名称、输入路径和当前工作目录。

## 验收

- 实际加载的文件与检查过的文件是同一个路径。
- 输出为新文件，输入指纹不变。
- 三项均有事项、负责人、日期、限制；缺失信息不会被编造。
- 退出本次 Pi 后不再传入 `--skill`，该教学 Skill 不会继续加载。

## 失败恢复

Skill 没被使用时，核对路径、元数据和启动参数；结果错误时回到原文验收，不先改 Skill 来掩盖一次任务错误。来源或内容异常时停止加载。
