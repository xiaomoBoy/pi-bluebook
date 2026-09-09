---
title: CASE 02 · 压缩前后对照
description: 在同一条 Session 中手动压缩，对照当前上下文、磁盘检查点与可选缓存数据。
prev: { text: CASE 01 · 会议记录, link: /cases/meeting-notes }
next: { text: CASE 03 · 第一个 Skill, link: /cases/first-skill }
---

<span class="library-status">CASE 02 · 模块三 · 可练习</span>

# 压缩前后对照

## 你会得到什么

在同一条 Pi Session 中留下三份记录：压缩前回答、压缩后的记忆回答、重新读取检查点后的回答。实验不预设“压缩后一定忘记”，而是让你用实际差异理解：Session、当前 Context、磁盘文件和提示缓存是不同证据。

::: warning 费用提醒
本案例会调用模型并手动执行一次 `/compact`。压缩本身也需要模型生成摘要，可能消耗套餐额度或产生 API 费用。先完成[登录课的费用检查](/guide/connect-model)，不确定时不要为了做实验继续。
:::

## 固定材料

- <a href="/examples/compaction/brief.md" download>下载实验简报 brief.md</a>
- <a href="/examples/compaction/checkpoint.md" download>下载检查点 checkpoint.md</a>
- <a href="/examples/compaction/settings.json" download>下载实验专用 settings.json</a>

前两份材料只包含固定教学文字，不含脚本、凭据和私人数据。`settings.json` 只把本实验目录的 `keepRecentTokens` 降到 `200`，让短会话也有可压缩的较早内容；不要把它复制到日常项目或用户级配置。

## 1. 建立独立实验目录

macOS 在普通终端中运行：

```bash
cd ~/Downloads/pi-practice
mkdir -p compaction-lab/.pi compaction-lab/results
curl -fL https://pi.xiaomovps.com/examples/compaction/brief.md \
  -o compaction-lab/brief.md
curl -fL https://pi.xiaomovps.com/examples/compaction/checkpoint.md \
  -o compaction-lab/checkpoint.md
curl -fL https://pi.xiaomovps.com/examples/compaction/settings.json \
  -o compaction-lab/.pi/settings.json
cd compaction-lab
shasum -a 256 brief.md checkpoint.md > input-before.sha256
```

Windows 用户继续使用 Git Bash，把第一行换成 `cd ~/pi-practice`，进入实验目录后把最后一行换成：

```bash
sha256sum brief.md checkpoint.md > input-before.sha256
```

确认 `pwd` 的末尾是 `compaction-lab`，并亲自打开两份 Markdown 文件和 `.pi/settings.json`。内容与本页说明一致后再继续；设置文件多出其他字段时停止。

## 2. 启动一条干净的 Session

仍在普通终端中运行：

```bash
pi --name "压缩前后对照" --no-extensions --no-skills --no-context-files
```

进入 Pi 后输入 `/session`，确认会话名称是“压缩前后对照”。记下界面显示的 Session ID；它只用于稍后确认仍在同一条会话中，不需要发布或上传会话文件。

如果首次进入该目录时出现 Project Trust 提示，只在已经核对三份下载材料后信任这个隔离练习目录。Project Trust 允许 Pi 采用目录内设置，不会把它变成沙箱；目录或文件与本页不一致时退出，不要确认。

## 3. 留出可压缩的较早内容

先发送第一轮观察：

```text
读取 brief.md 和 checkpoint.md，逐项核对六项固定信息是否一致。
只在回复中列出六项信息和核对结论；不要写文件，不要访问网络。
```

等它完成后，再发送第二轮观察：

```text
不要重新读取文件。只根据当前上下文说明：
1. 为什么“Session 已保存”不等于“当前 Context 永远包含全部原文”；
2. 为什么 checkpoint.md 能作为恢复依据；
3. 本实验唯一禁止动作是什么。
每项最多两句话，不要写文件，不要访问网络。
```

两轮都完成后再继续。实验专用的低阈值会让较早一轮进入压缩范围；如果跳过这一步，短会话仍可能没有可压缩内容。

## 4. 写下压缩前记录

把下面整段交给 Pi：

```text
不要重新读取文件。只根据当前上下文，把六项信息逐行写入
results/before.md，格式必须与 checkpoint.md 的列表一致。
最后只回复写入路径；不知道的内容写“未知”，不要猜测，不要访问网络。
```

执行过程只应写入 `results/before.md`。出现读取、网络访问、其他目录或输入修改时按 `Esc` 停止。

## 5. 手动压缩，再做一次记忆回答

先打开 `/session`，确认 Session ID 与第 2 步相同。然后在 Pi 编辑区输入：

```text
/compact
```

等待压缩完成，直到 Pi 再次回到可输入状态。不要连续执行第二次 `/compact`。

看到压缩完成提示后，接着发送：

```text
不要读取任何文件，也不要访问网络。
只根据你当前收到的上下文，把实验的六项固定信息写入
results/after-memory.md，格式与压缩前相同。
无法确认的项目写“未知”，不要猜测。最后只回复写入路径。
```

这一轮如果出现 `read`、`grep`、`find` 或其他读取动作，立即停止：那会让“当前上下文是否保留信息”的观察失效。

## 6. 从磁盘检查点恢复

无论上一份记录是否完整，都继续发送：

```text
现在读取 checkpoint.md，以文件为准，把六项固定信息写入
results/after-file.md。格式与 checkpoint.md 的列表一致。
如果它和 after-memory.md 不同，在回复中指出哪些字段不同；不要修改任何已有记录。
```

这一步的目的不是让 Agent “承认忘记”，而是验证磁盘检查点能否重新提供确定信息。

## 关键现象

| 观察对象 | 你要检查什么 | 它能证明什么 |
| --- | --- | --- |
| Session | `/session` 前后的 ID 是否相同 | 对话仍属于同一条已保存 Session |
| 当前 Context | `after-memory.md` 与压缩前记录是否一致 | 摘要和近期消息为这一轮保留了哪些信息 |
| 磁盘文件 | 两份输入的指纹是否不变；`after-file.md` 是否完整 | 文件可独立保存并重新提供约束 |
| 提示缓存 | Provider 是否显示缓存数据、压缩前后是否变化 | 仅记录当前服务的缓存现象，不代表记忆或任务质量 |

压缩后六项全部保留是有效结果；出现“未知”或差异也是有效结果。实验失败只有两类：没有留下可比较记录，或在记忆回答阶段偷偷重新读取了文件。

## 独立验收

先退出 Pi。macOS 在普通终端运行：

```bash
cd ~/Downloads/pi-practice/compaction-lab
shasum -a 256 -c input-before.sha256
test -f results/before.md
test -f results/after-memory.md
test -f results/after-file.md
grep -F '项目代号：北斗纸舟' results/after-file.md
grep -F '固定顺序：蓝色 → 金色 → 灰色' results/after-file.md
grep -F '验收短语：纸舟靠岸' results/after-file.md
diff -u results/before.md results/after-memory.md || true
```

Windows Git Bash 把 `shasum -a 256 -c` 换成 `sha256sum -c`，其余命令不变。

两份输入都显示 `OK`、三份记录都存在，而且 `after-file.md` 找到三条固定信息，说明文件恢复链路通过。最后一条 `diff` 没有输出，表示两份记录相同；出现差异时保留差异，它就是本次实验结果，不要把它改成预期答案。

再运行一次 Pi 并用 `pi -r` 找到“压缩前后对照”，打开 `/session` 核对原 Session ID。会话能够重新打开，只证明历史被保存；仍要另外检查磁盘文件和压缩后的回答。

## 失败恢复

- `/compact` 显示 `Nothing to compact (session too small)`：确认当前目录末尾是 `compaction-lab`、`.pi/settings.json` 内容正确，而且第 3、4 步均已完成；修正后新建 Session 重做，不在原会话连续试。
- `/compact` 发生其他错误或一直没有回到输入区：按 `Esc` 停止，保留错误文字和已有文件，不连续重试。
- 记忆回答阶段读取了文件：保留该记录并标注“本轮无效”，新建 Session 重新实验，不覆盖旧文件。
- 找不到原 Session：不要宣称会话已恢复；新建会话，从 `checkpoint.md` 和已有记录继续核对。
- 输入指纹变化：停止比较，保留现场；重新下载到新的实验目录，不覆盖已经改变的材料。
- `after-file.md` 仍缺字段：打开 `checkpoint.md` 人工核对，记录遗漏；不要让 Agent 反复改到测试通过。
- 实验结束后不想保留低阈值：退出 Pi，删除整个 `compaction-lab`；或只删除其中的 `.pi/settings.json`。这不会改用户级设置。

## 这个案例对应哪两条判断

- [第 6 条：Session 可保存，不等于模型始终记得全部内容](/guide/lasting-principles#_6-session-可保存-不等于模型始终记得全部内容)
- [第 7 条：压缩与提示缓存必须分开理解](/guide/lasting-principles#_7-压缩与提示缓存必须分开理解)

官方机制依据：[Pi Compaction](https://pi.dev/docs/latest/compaction) · [Pi Sessions](https://pi.dev/docs/latest/sessions)
