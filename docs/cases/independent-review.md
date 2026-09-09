---
title: CASE 05 · 两路独立审阅
description: 用隔离的只读会话练习子任务分工，再由主会话合并证据。
prev: { text: CASE 04 · 最小 Extension, link: /cases/first-extension }
next: { text: CASE 06 · 中断恢复, link: /cases/checkpoint-recovery }
---

<span class="library-status">CASE 05 · 可练习</span>

# 两路独立审阅

## 结果

字段审阅和安全审阅互不读取对方结论，各自返回原文证据；主会话记录共同结论、差异、冲突和未知。

## 固定材料

- 输入：<a href="/examples/first-task/meeting-notes.md" download>虚构会议记录</a>

本案例用两个命名、只读的 Pi 会话练习分工结构，不要求安装 Package，也不宣称 Pi 核心内置子 Agent。

## 1. 准备目录

```bash
cd ~/Downloads/pi-practice
mkdir -p input reviews
curl -fL https://pi.xiaomovps.com/examples/first-task/meeting-notes.md \
  -o input/项目会议记录.md
shasum -a 256 input/项目会议记录.md > input-before.sha256
```

Windows 用户把第一行换成 `cd ~/pi-practice`，并把 `shasum -a 256` 换成 `sha256sum`。亲自打开输入，确认是虚构会议记录且不含私人信息后再继续。

## 2. 字段审阅会话

在普通终端运行：

```bash
pi --name "字段审阅" --no-extensions --tools read,grep,find,ls
```

进入 Pi 后发送：

```text
只读检查 input/项目会议记录.md。
列出每个行动项的事项、负责人、截止日期和限制；原文没有的写“未知”。
不要修改文件。返回引用到的原文短句与行号。
```

完成后输入 `/export reviews/fields.html`，退出 Pi。

## 3. 安全审阅会话

在同一普通终端运行：

```bash
pi --name "安全审阅" --no-extensions --tools read,grep,find,ls
```

进入 Pi 后发送：

```text
只读检查 input/项目会议记录.md。
只列出涉及账号、私人路径、凭据、发布前检查和验收的限制。
不要修改文件；每条结论附原文短句与行号，不确定就标记“未知”。
```

完成后输入 `/export reviews/safety.html`，退出 Pi。

## 4. 主会话合并

```bash
pi --name "分工合并" --no-extensions
```

发送：

```text
读取 reviews/fields.html、reviews/safety.html 和 input/项目会议记录.md。
把合并结果写入 reviews/merged.md，只包含：共同结论、字段审阅独有、
安全审阅独有、冲突与未知、回到原文后的最终核对。
每条最终结论附原文行号。两路冲突时必须以重新读取的原文为依据，不能按多数票决定。
不要修改 input 和两份 HTML 导出文件。
```

## 关键现象

两路会话互不读取对方结论，并且只由主会话写 `merged.md`。这里练习的是可审计的分工结构，不是假定核心内置了一个“子 Agent 按钮”。[第 12 课](/guide/subagents)解释这种手动分工与子 Agent 扩展的关系。

## 独立验收

退出 Pi 后运行：

```bash
test -f reviews/fields.html && echo "PASS: 字段审阅存在"
test -f reviews/safety.html && echo "PASS: 安全审阅存在"
test -f reviews/merged.md && echo "PASS: 合并记录存在"
shasum -a 256 -c input-before.sha256
sed -n '1,180p' reviews/merged.md
```

Windows Git Bash 把 `shasum -a 256 -c` 换成 `sha256sum -c`。

- 两路输入范围不同，输出都带原文位置。
- 两路不写同一个文件，也不提前交换结论。
- 主会话遇到冲突会回读原文，不按多数票决定。
- 最终记录保留未知项和取舍理由。

## 失败恢复

一路失败只重跑该路；选错会话先退出并核对名称。两个角色准备修改同一文件时立即停止，改为只返回结果，由主会话单独写最终稿。
