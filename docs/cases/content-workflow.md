---
title: 迁移练习 · 从资料到可核对的草稿
description: 用一份已确认简报和一份旧讨论记录，练习来源优先级、事实追溯、未知项与人工编辑。
prev: { text: 案例库, link: /cases/ }
next: { text: 小型代码修复, link: /cases/code-repair }
---

# 从资料到可核对的草稿

整理文章时，输入往往不止一份。同一个活动在旧讨论里说招募 20 人，最新简报却只确认 12 人；地点与时间还没定。直接让 Agent “写一篇吸引人的公告”，就可能把旧提议写成事实。

这个练习沿用[第一次任务](/guide/first-task)的文件验收方法，再加一条规则：每个事实必须能回到来源。材料是虚构读书会，不对应真实活动，最终只制作待确认草稿。

## 1. 准备两种来源

普通终端中执行；macOS、Linux、Windows Git Bash 都可使用：

```bash
mkdir ~/pi-content-workflow
cd ~/pi-content-workflow
mkdir source output
curl -fL https://pi.xiaomovps.com/examples/content-workflow/confirmed-brief.md -o source/confirmed-brief.md
curl -fL https://pi.xiaomovps.com/examples/content-workflow/old-note.md -o source/old-note.md
cp source/confirmed-brief.md confirmed-before.txt
cp source/old-note.md old-before.txt
```

如果目录已存在，换新名字重新开始。读完两份材料，确认已确认简报日期较新，并明确要求旧讨论服从它。文件名和“最新”字样本身不是可信度证明；这次来源优先级由已审查的固定材料明确给出。

## 2. 先做事实表，再写草稿

启动 Pi：

```bash
pi --no-extensions --no-skills --no-context-files
```

发送：

```text
读取 source 中两份虚构资料，只写 output/brief.md。
先做事实表，列出事项、采用的值、来源文件与原文短句、冲突或未知。
已确认简报优先于旧讨论；旧提议不能变成既定事实。
再写一段待确认的活动介绍，并单独列出发布前必须确认的问题。
不要编造地点、开始时间、报名链接或礼物承诺，不要声称已开放报名。
不修改来源和副本，不访问网络、不发布、不读取其他目录。
```

这次先核对事实表，再修改文字表达。Agent 应采用 12 人，保留 20 人是旧讨论这一冲突，地点、开始时间、报名链接和礼物承诺仍为未知或未确认。

## 3. 对照来源完成编辑

退出 Pi，在普通终端检查：

```bash
cmp source/confirmed-brief.md confirmed-before.txt
cmp source/old-note.md old-before.txt
sed -n '1,220p' output/brief.md
find . -maxdepth 2 -type f
```

两次 `cmp` 都无输出且退出码为 0，表示来源保持不变。逐项确认：

| 验收项 | 应有结果 |
| --- | --- |
| 已确认事实 | 名称“周末读书交流”、日期 2026-09-20、12 人、分享与讨论形式 |
| 冲突处理 | 20 人只作为旧提议说明，不出现在草稿的已确认名额中 |
| 来源追溯 | 每个事实都有真实文件名与可找到的原文短句 |
| 未确认内容 | 地点、开始时间、报名链接、礼物承诺没有被补写成事实 |
| 发布状态 | 明确是待确认草稿，没有发送或发布 |

如果需要把介绍写得更简洁，只让 Pi 修改介绍段落，保留事实表和未知项。每次润色后重新检查这张表，避免语言变好看了，事实却变了。

## 把方法用到自己的文章

以后处理产品资料、教程或访谈，可以继续保留“来源 → 事实表 → 草稿 → 人工验收”的顺序。真实技术内容还要核对官方版本和日期；无法验证的体验、价格或效果不能因为出现在材料里就直接采用。

重复做过几次后，再把稳定的核对规则整理成 [Skill](/cases/first-skill)。需要代码示例时，继续做[小型代码修复](/cases/code-repair)，用可运行的测试验证文章里的程序。

## 维护者复现记录

2026 年 9 月 12 日，在 macOS 新练习目录中用 Pi `0.84.3` 完成了这份材料练习。输出采用 12 人，明确记录旧讨论的 20 人冲突，地点、开始时间、报名链接和礼物承诺保持未确认。两份来源与事前副本逐字节一致，仅新增 `output/brief.md`。这证明本次固定材料流程已经跑通，不代表模型每次都会正确处理新的来源。
