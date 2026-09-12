---
title: CASE 03 · 把方法整理成 Skill
description: 显式加载一个教学 Skill，复用行动清单的核对规则。
prev: { text: CASE 02 · 压缩前后, link: /cases/compaction-before-after }
next: { text: CASE 04 · 最小 Extension, link: /cases/first-extension }
---

<span class="library-status">CASE 03 · 可练习</span>

# 把方法整理成 Skill

## 结果

将“指定输入、固定四个字段、未知不猜、写后复核”固化为可读取的 Skill，并生成一份复核版行动清单。

## 固定材料

- 输入：<a href="/examples/first-task/meeting-notes.md" download>CASE 01 的虚构会议记录</a>
- Skill：<a href="/examples/skill/action-list-review/SKILL.md" download>下载 action-list-review/SKILL.md</a>

## 1. 下载并审查

在普通终端准备独立练习目录，不要求先完成 CASE 01：

```bash
cd ~/Downloads/pi-practice
mkdir -p input output bluebook-examples/action-list-review
curl -fL https://pi.xiaomovps.com/examples/first-task/meeting-notes.md \
  -o input/项目会议记录.md
curl -fL https://pi.xiaomovps.com/examples/skill/action-list-review/SKILL.md \
  -o bluebook-examples/action-list-review/SKILL.md
shasum -a 256 input/项目会议记录.md > input-before.sha256
sed -n '1,160p' bluebook-examples/action-list-review/SKILL.md
```

Windows 用户把第一行换成 `cd ~/pi-practice`，并把 `shasum -a 256` 换成 `sha256sum`。Skill 正文应该只有 `name`、`description` 和围绕会议记录的检查规则；出现不相关命令时停止。

## 2. 显式加载并提交任务

在普通终端运行：

```bash
pi --no-skills --skill ./bluebook-examples/action-list-review/SKILL.md
```

进入 Pi 后发送：

```text
/skill:action-list-review 请重新核对 input/项目会议记录.md，
把结果写入 output/行动清单-复核版.md。不要修改输入文件；
原文没有的信息写“原文未说明”。完成后重新读取输出并报告路径。
```

如果 `/skill:action-list-review` 没出现，先在 `/settings` 检查 Skill commands，再重新启动；不要把文件复制到多个自动发现目录碰运气。

先读完整个 `SKILL.md`，再使用 `--no-skills --skill <路径>` 显式加载。不要把看不懂的工作说明直接放进自动发现目录。

![教学 Skill 的真实加载状态与显式调用位置](/images/05-Pi-Skill显式加载-实操图.png)

图中底部内容仍未提交，方便你在执行前最后一次核对 Skill 名称、输入路径和当前工作目录。

[第 10 课](/guide/skills-extensions-packages)解释三类扩展的边界；本页已包含完成案例所需的全部操作。

## 关键现象

同一条任务在显式加载 Skill 后，多了一套可见、可复核的检查规则；Skill 没有替你提供输入，也不会自动证明输出正确。验收仍然回到固定原文、输出文件和输入指纹。

## 独立验收

退出 Pi 后运行：

```bash
test -f output/行动清单-复核版.md && echo "PASS: 复核版存在"
shasum -a 256 -c input-before.sha256
sed -n '1,160p' output/行动清单-复核版.md
```

Windows Git Bash 把 `shasum -a 256 -c` 换成 `sha256sum -c`。

- 实际加载的文件与检查过的文件是同一个路径。
- 输出为新文件，输入指纹不变。
- 三项均有事项、负责人、日期、限制；缺失信息不会被编造。
- 退出本次 Pi 后不再传入 `--skill`，该教学 Skill 不会继续加载。

## 再走一步：修改自己的核对规则

先保留原 Skill，复制成一个新练习：

```bash
mkdir -p bluebook-examples/action-list-latest
cp bluebook-examples/action-list-review/SKILL.md bluebook-examples/action-list-latest/SKILL.md
```

打开新文件，把 frontmatter 的 `name` 改成 `action-list-latest`，并增加一条：“结果按截止日期从晚到早排列；未知日期放在最后，不补写日期。”其他规则保留。

重新启动，只显式加载新文件：

```bash
pi --no-extensions --no-skills --skill ./bluebook-examples/action-list-latest/SKILL.md
```

在 Pi 输入 `/skill:action-list-latest`，要求读取同一输入，写入 `output/行动清单-倒序版.md`。验收时负责人顺序应是小陈、小周、小林，日期分别为 2026-09-01、2026-08-30、2026-08-28；三项的限制不能因排序丢失。

最后重新核对输入指纹，确认旧 Skill 没被改写。这样你练习的是“把重复规则变成自己的方法”，而不仅是加载别人提供的文件。想换一种输入，继续做[内容整理迁移练习](/cases/content-workflow)。

## 失败恢复

Skill 没被使用时，核对路径、元数据和启动参数；结果错误时回到原文验收，不先改 Skill 来掩盖一次任务错误。来源或内容异常时停止加载。
