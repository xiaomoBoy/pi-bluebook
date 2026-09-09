---
title: CASE 01 · 会议记录行动清单
description: 从一份虚构会议记录生成行动清单，并独立核对输入与输出。
prev: { text: 案例库, link: /cases/ }
next: { text: CASE 02 · 压缩前后, link: /cases/compaction-before-after }
---

<span class="library-status">CASE 01 · 可练习</span>

# 会议记录行动清单

## 结果

从三条虚构会议记录生成 `output/行动清单.md`，原文件保持不变，三个行动项的负责人、日期和限制逐项对应。

## 固定材料

- <a href="/examples/first-task/meeting-notes.md" download>下载虚构会议记录</a>
- 操作目录：独立的 `pi-practice`

材料应包含小林、小周、小陈三项任务，以及各自的日期和限制。它是无私人信息的教学文本。

## 1. 准备输入与指纹

macOS 在普通终端运行：

```bash
mkdir -p ~/Downloads/pi-practice/input ~/Downloads/pi-practice/output
cd ~/Downloads/pi-practice
curl -fL https://pi.xiaomovps.com/examples/first-task/meeting-notes.md \
  -o input/项目会议记录.md
shasum -a 256 input/项目会议记录.md > input-before.sha256
test ! -e output/行动清单.md && echo "PASS: 输出尚不存在"
```

Windows 用户使用 Git Bash，把目录换成 `~/pi-practice`，并把 `shasum -a 256` 换成 `sha256sum`。如果最后没有出现 `PASS`，换一个新的空练习目录，不用旧结果继续。

## 2. 任务原文

在当前练习目录启动 `pi`，把下面整段交给它：

```text
读取 input/项目会议记录.md，整理成 output/行动清单.md。

每个事项单独一行，必须保留事项、负责人、截止日期和风险提醒；
不要修改 input 中的原文件，也不要访问当前练习目录以外的内容。
完成后列出新增和修改的文件，并说明我应该怎样验收。
```

## 关键现象

- 读取对象只有 `input/项目会议记录.md`。
- 写入对象是新文件 `output/行动清单.md`。
- 如果准备写入 `input` 或出现练习目录外路径，按 `Esc` 停止。

[第 5 课](/guide/first-task)解释为什么这段任务要同时写明输入、输出、限制和验收；完成本案例不需要返回课程复制步骤。

## 独立验收

退出 Pi。macOS 运行：

```bash
cd ~/Downloads/pi-practice
shasum -a 256 -c input-before.sha256
test -f output/行动清单.md && echo "PASS: 输出文件存在"
sed -n '1,120p' output/行动清单.md
```

Windows Git Bash 把第一条检查换成 `sha256sum -c input-before.sha256`。

1. 执行前指纹检查仍为 `OK`。
2. 输出文件存在，并且恰好有三个事项。
3. 小林、小周、小陈分别对应正确日期和限制。
4. 实际读写记录没有出现练习目录之外的路径。

## 失败恢复

输入发生变化、输出混入旧内容或路径不对时，停止继续修改，保留现场；在新的空练习目录重新下载材料并生成新指纹。不要用 Agent 的“已经修好”代替重新检查。
