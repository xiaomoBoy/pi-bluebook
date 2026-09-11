---
title: 长时间任务与 VPS
description: 理解本地电脑与 VPS 运行 Pi 的取舍，为长任务设计检查点。
prev:
  text: Pi 工作原理
  link: /guide/how-pi-works
next:
  text: 权限、隔离与验收
  link: /guide/safety
---

<span class="library-status">MODULE 05 · STEP 13 · 可练习</span>

# 长时间任务与 VPS

当 Pi 开始处理数小时的整理、检查或构建任务，本地电脑会遇到合盖休眠、网络切换和终端窗口被关闭等问题。我个人后来把一部分长任务放到 VPS，主要是为了让运行环境更稳定，不需要让自己的 Mac 一直保持唤醒。

这是我的使用方式，不是所有人的必选项。

::: info 先看门槛
没有已经能独立 SSH 登录的 VPS，不需要为了本课购买服务器。先在本地完成“检查点与恢复”练习即可。下面的 tmux 操作只适合已经能登录自己 VPS 的读者；命令输入在远程普通终端，不是在 Pi 编辑区。
:::

::: warning VPS 不会自动保持前台任务
如果你通过 SSH 登录 VPS，然后直接在前台启动 Pi，SSH 断开后进程仍可能结束。VPS 提供持续开机的环境，`tmux` 等持久终端工具才让你断开后能重新连回同一个终端会话。
:::

## 先判断是不是真的需要 VPS

适合先留在本地的情况：

- 你刚开始学 Pi，还在做几分钟的练习。
- 任务依赖本地应用、图片或私密文件。
- 你还不熟悉 SSH、Linux 文件路径与权限。

开始考虑 VPS 的情况：

- 任务需要长时间运行，且不希望被本地休眠打断。
- 工作材料可以明确放在远程项目目录，不依赖本地界面。
- 你已经知道如何限制权限、保存会话、查看进程和备份产物。

## 远程稳定不等于任务可靠

VPS 不会自动解决方向跑偏、上下文丢失、凭据不足或输出质量不合格。它只是让进程更容易持续运行。每个长任务仍然需要：

1. 可以查看的阶段产物。
2. 明确的停止条件和失败处理。
3. 定期检查点，而不是放着不管。
4. 完成后的独立验收与备份。

## 用 tmux 保留终端会话

本节只给出最小概念，不包括 VPS 购买、SSH 加固和防火墙配置。在已安装 `tmux` 的 VPS 中，可以创建一个有名字的终端会话：

```bash
tmux new -s pi-work
```

进入后，再切换到正确项目目录并启动 Pi。想暂时离开而不结束会话，先按 `Ctrl+B`，松开后再按 `D`。之后重新登录 VPS，运行：

```bash
tmux attach -t pi-work
```

重新连入后，亲眼查看 Pi 是否还在运行、当前是否等待输入，并检查阶段产物。能够连回 tmux 只能证明终端会话仍然存在，不能单独证明 Pi 任务没有失败。

### 常见情况怎么停下来

| 现象 | 下一步 |
| --- | --- |
| `tmux: command not found` | 不继续照抄命令；按 VPS 系统的官方包管理说明安装，或先只做本地练习 |
| 会话名 `pi-work` 已存在 | 用 `tmux attach -t pi-work` 查看，不新建同名会话 |
| `can't find session` | 运行 `tmux ls` 核对真实名称；没有任何会话时说明旧会话已结束 |
| 重新连入后只看到普通 shell | Pi 已经退出或从未启动；先检查产物和日志，不直接宣称任务仍在运行 |
| 组合键变成普通换行 | 核对 tmux 扩展按键配置；不要连续提交未完成的多行任务 |

Pi 官方当前建议 tmux 3.5 及以上启用 `extended-keys` 和 `csi-u`，以区分 `Enter`、`Shift+Enter` 与 `Ctrl+Enter`。修改 `~/.tmux.conf` 会影响你的远程终端环境；先阅读[官方 tmux 设置](https://pi.dev/docs/latest/tmux)，不要为了本课盲改现有配置。

## 一份可复用的长任务说明

```text
目标：整理 source 目录中的文章，建立内容清单。
范围：只读 source，只写 output。
阶段产物：每处理 20 篇，更新 output/progress.md。
停止条件：遇到损坏文件、需要登录或准备访问其他目录时停止。
验收：给出文件数、失败列表、生成文件和复核命令。
```

如果这些边界在本地还没跑通，换到 VPS 只会让调试更远。先用小样本验证，再把同一套工作流搬到远程。

## 本地实操：中断后从检查点继续

下载三篇很短的虚构材料和进度模板。下面的命令输入在本地普通终端；先固定回到自己的练习目录：

```bash
cd ~/Downloads/pi-practice
pwd
mkdir -p long-task/source long-task/output
for name in article-a article-b article-c; do
  curl -fL "https://pi.xiaomovps.com/examples/long-task/source/${name}.md" \
    -o "long-task/source/${name}.md"
done
curl -fL https://pi.xiaomovps.com/examples/long-task/progress-template.md \
  -o long-task/progress.md
```

运行 `find long-task -type f -print`。第一次练习开始前只能看到三篇 `source` 材料和 `progress.md`，`long-task/output/` 必须为空。如果目录中已有旧输出，换用一个新的目录名；不要用 `mkdir -p` 覆盖式地接着追加，否则会把上一次结果重复计入。

确认 `pwd` 以你的练习目录名结尾后，在普通终端启动第一次会话：

```bash
pi --name "检查点练习-第一步"
```

看到 Pi 状态栏仍指向同一练习目录，再让它只处理第一篇并更新检查点。任务中固定要求每篇在索引里使用二级标题，便于后面的数量检查：

```text
读取 long-task/progress.md 和 long-task/source/article-a.md。
在 long-task/output/index.md 中用“## 文件名”作为二级标题，下一行写原文标题与一句话摘要，
再更新 long-task/progress.md 的已完成数量、已处理文件和下一步。
只处理这一篇，然后停止等待我验收。
```

输入 `/quit` 退出 Pi，独立打开 `long-task/output/index.md` 与 `long-task/progress.md`。确认已完成数是 1、已处理列表只有 `article-a.md`、下一步指向尚未处理的文件。随后在同一个普通终端确认 `pwd`，启动新会话：

```bash
pwd
pi --name "检查点练习-恢复"
```

状态栏仍指向同一练习目录后发送：

```text
先读取 long-task/progress.md，再列出 long-task/source 中尚未处理的文件。
逐篇完成剩余文件；在 long-task/output/index.md 中继续用“## 文件名”作二级标题，
每完成一篇就同时更新 long-task/output/index.md 和 long-task/progress.md。
不要重复已经记录为完成的文件。遇到损坏或无法读取的文件时记录到失败列表并停止。
```

最后在普通终端检查数量：

```bash
find long-task/source -type f -name '*.md' | wc -l
grep -c '^## ' long-task/output/index.md
```

两个数字都应为 `3`，并且 `long-task/progress.md` 的已完成数、已处理文件和失败列表与实际文件一致。数字一致仍不代表摘要正确，还要逐篇打开原文与索引核对。

![在真实终端中核对源文件、索引条目与检查点](/images/07-Pi-长任务检查点-实操图.png)

截图把三个独立信号放在同一窗口里：源文件数是 3，索引条目数是 3，进度文件也记录了三篇已处理且失败项为空。三处一致后再逐篇核对摘要内容；数字相等只能证明数量没有明显缺口。

## 本课验收

- 你能从 `long-task/progress.md` 判断已经处理什么、下一步是什么，而不是依赖旧会话自述。
- 中断后没有重复或漏掉三篇材料，失败项不会被悄悄跳过。
- 如果使用 VPS，能脱离 tmux、重新连接同一会话，并分别判断“终端仍在”与“任务已完成”。

### 个人记录

- [我把 Pi 长时间放在 VPS 运行的原因](https://x.com/xiaomovps/status/2093242314764537867)

### 参考资料

- [Pi with tmux](https://pi.dev/docs/latest/tmux)

tmux 相关说明核验于 2026-09-09。

tmux 可以保留终端会话，但不会在 VPS 重启、进程崩溃或内存不足后自动恢复 Pi。关于 tmux 会话本身的命令与生命周期，另见 [tmux 官方手册](https://github.com/tmux/tmux/wiki/Getting-Started)。
