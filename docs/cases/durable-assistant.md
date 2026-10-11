---
title: 选学案例 · 用 Pi Durable Assistant 观察断点恢复
description: 不填 API Key，在本机运行基于 Pi Durable 的个人 Agent，于长任务中途模拟进程崩溃，独立检查任务是否接着完成、是否重复执行。
prev: { text: CASE 08 · 毕业项目, link: /cases/graduation-project }
next: { text: Pi Durable 入门专篇, link: /guide/pi-durable }
---

<span class="library-status">选学案例 · 可练习</span>

# 用 Pi Durable Assistant 观察断点恢复

## 结果

在本机运行一个基于 Pi Durable 的网页版个人 Agent，让它执行一个需要等待 10 秒的任务；等待中途强制结束进程。进程被重新拉起后，任务从中断处接着做完：三条待办各只添加一次，等待按原截止时间继续，最终回答照常出现。

::: info 这个案例和 CASE 06 有什么不同
[CASE 06](/cases/checkpoint-recovery) 用进度文件手动保存检查点，恢复靠新会话读取文件。本案例的检查点由 Pi Durable 框架自动保存：每调用一次模型、执行一个工具都会存档，恢复不需要人写进度文件。两种方法解决的是同一类问题，适用场景不同：日常用 Pi 处理长任务，CASE 06 的方法已经足够；开发需要长期在线的 Agent 应用时，才值得了解本案例的框架做法。
:::

## 固定材料

- 演示项目：[Pi Durable Assistant v0.1.0](https://github.com/xiaomoBoy/pi-durable-assistant/releases/tag/v0.1.0)，基于 `@earendil-works/pi-durable@1.1.0`，MIT 许可。
- 运行环境：Node.js 22.13 或以上、npm、Git。**不需要 API Key、Docker 或服务器。**

::: warning 非官方项目
Pi Durable Assistant 是本书作者小墨同学的个人开源项目，不是 Earendil 官方产品。Pi Durable 本身仍处于实验阶段，API 可能变化；本案例固定在上面的版本复现。
:::

## 1. 取得固定版本

在练习目录中执行：

```bash
mkdir -p ~/Downloads/pi-practice
cd ~/Downloads/pi-practice
git clone --branch v0.1.0 https://github.com/xiaomoBoy/pi-durable-assistant.git
cd pi-durable-assistant
node --version
npm ci
npm run check
```

`node --version` 应显示 `v22.13` 或更高版本；`npm run check` 结束、回到终端提示符且没有报错，再继续。

## 2. 用演示模型启动

```bash
LLM_API=faux npm run dev
```

终端出现「已启动：端口 3000」后，用浏览器打开 `http://127.0.0.1:3000`。如果 3000 端口被占用，改用 `PORT=3001 LLM_API=faux npm run dev`，并打开对应端口。

启动服务的终端要保持运行；后续终端命令另开一个窗口。练习结束时，回到服务终端按 `Ctrl+C` 停止。

`faux` 是项目内置的演示剧本：不访问任何真实模型，无论你输入什么，都会按固定顺序执行「列三条待办 → 等待 10 秒 → 勾掉三条待办 → 回答」。它适合观察恢复机制，**不能证明真实模型的能力**。

`npm run dev` 实际运行的是一个小脚本：进程退出后 1 秒自动重新启动，模拟服务器上 Docker 的自动重启。**Pi Durable 不会自己复活进程**，它负责的是进程重新启动以后，从存档接着做。

![Pi Durable Assistant 网页界面：左侧会话列表，中间对话，右侧记事本、定时提醒、持久任务和运行状态](/images/cases/durable-assistant/interface.webp)

先记下右下角「运行状态」里的**启动次数**，后面要用它证明进程确实重启过。

## 3. 发出任务，等它进入等待

先找到右下角「模拟进程崩溃」按钮，再点击「新对话」，发送：

```text
演示一下持久任务
```

几秒内应依次看到：

- 对话中出现三次 `todo` 工具调用，右侧「记事本」出现三条待办；
- 接着出现 `wait_seconds` 工具，显示「还剩 N 秒」的倒计时；
- 右侧「持久任务」中，「调用模型」处于等待状态，下面的「执行工具」正在运行。

![等待中的任务：对话里的等待工具正在倒计时，右侧持久任务显示调用模型在等待、执行工具在运行](/images/cases/durable-assistant/waiting.webp)

截图来自作者在演示站上使用真实模型的运行，任务内容与 `faux` 剧本不同；界面区域和状态的含义相同。

## 4. 在等待中途模拟崩溃

倒计时还剩几秒时，点击右下角「模拟进程崩溃」，并在弹窗中确认。服务器会直接退出进程，不做任何收尾。如果已经错过倒计时，新建对话后再发一次任务即可。

页面顶部应出现「与服务器断开，正在重连」。约 1 至 2 秒后页面自动重连。

![断线重连：页面顶部提示与服务器断开、正在重连](/images/cases/durable-assistant/reconnect.webp)

## 关键现象

| 观察位置 | 崩溃前 | 重启后应看到 |
| --- | --- | --- |
| 运行状态 · 启动次数 | 记下的数字 | 增加 1，启动时间也变了 |
| 记事本 · 待办 | 三条未完成 | 仍是同样三条，没有多出重复的待办；等待结束后全部勾掉 |
| 等待工具 | 倒计时进行中 | 按原来的截止时间继续倒数，**不是重新从 10 秒开始** |
| 对话末尾 | 还没有回答 | 出现「演示任务完成。」 |

等待能接上，是因为等待工具第一次执行时，就把「几点结束」记进了这个任务的备忘（Pi Durable 称为 memo）。重启后读到的仍是同一个时间点，所以进程停掉的那段时间也被算了进去。

## 独立验收

不要只看 Agent 说「完成了」。逐项核对：

1. **进程确实重启过**：启动次数比崩溃前多 1。只看页面有没有刷新不够，容器里进程编号可能始终是同一个数字。
2. **已完成的步骤没有重做**：对话里「已添加」的三条待办各只出现一次。
3. **未完成的步骤接着做完**：等待完成记录只出现一次「已等待 10 秒」，倒计时没有重置为 10 秒，之后是三条「已完成」和最终回答。
4. **状态与记录一致**：记事本里的勾选状态，与对话里的「已完成」记录逐条对应。

维护者在 2026-10-11 按本页步骤实际复现：在等待开始约 3 秒后触发崩溃，重启后启动次数从 1 变为 2；三条待办各添加一次，等待完成记录出现一次，从发起等待到下一步约相隔 10 秒，最终回答正常出现。

## 选做：两项进阶观察

**同一次提交不会被收两次。** 网络卡顿时，前端可能把同一句话发送两遍。Pi Durable 允许每次提交带一个编号，同一个编号只会被接收一次。可以在另一个终端用 `curl` 验证（把 `8` 换成你的会话编号，也就是浏览器地址栏中 `#` 后面的数字）：

```bash
curl -s -X POST http://127.0.0.1:3000/api/conversations/8/messages \
  -H 'content-type: application/json' \
  -d '{"text":"演示一下持久任务","requestId":"demo-1"}'
```

执行两次，两次返回的 `submissionId` 应完全相同，对话里也只多出一条用户消息。

**定时计划跨过崩溃。** 打开右下角「任务中心」，创建一个单次计划：内容填 `检查任务状态`，首次延迟填 `0.25`（即 15 秒），重复间隔填 `0`。创建后立刻模拟崩溃。重启后计划仍在，到点只执行一次，状态变为已完成。维护者复现时，在计划创建 4 秒后触发崩溃，结果与此一致。

## 失败恢复

| 现象 | 处理 |
| --- | --- |
| `npm ci` 报 Node 版本错误 | 升级到 Node.js 22.13 或以上，删除 `node_modules` 后重新执行 |
| 端口被占用 | 用 `PORT=3001` 换端口启动，并打开对应地址 |
| 点崩溃后页面一直不重连 | 确认是用 `npm run dev` 启动的；直接运行 `node server.mjs` 时，没有脚本把进程拉起来 |
| 「模拟进程崩溃」返回 403 | 生产环境默认禁用这个按钮，本案例只在本机开发模式下练习 |
| 克隆提示目录已存在 | 换一个新的练习目录，或保留旧目录并改名；不要覆盖旧数据 |
| 想重新开始 | 按 `Ctrl+C` 停止，把项目目录下的 `data/` 改名备份，再重新启动；新服务不会显示旧会话和计划，备份仍可恢复 |

## 这些现象对应 Pi Durable 的哪些机制

| 你在本案例看到的 | Pi Durable 的机制 | 延伸阅读 |
| --- | --- | --- |
| 重启后从中断处继续 | 每一步自动存档，重启后找出未完成的任务 | [Pi Durable 入门专篇](/guide/pi-durable) |
| 等待按原截止时间继续 | 任务备忘（memo），重放时读到同一个值 | [官方文章译文](/translations/pi-durable) |
| 待办没有重复添加 | 工具声明可以安全重放，修改和记录在同一次提交中完成 | 同上 |
| 记事本和对话记录一致 | Document：应用状态与产生它的记录一起保存 | 同上 |
| 同一个编号只收一次 | 带编号的幂等提交 | 同上 |
| 计划到点只执行一次 | 后台任务与持久化的定时唤醒 | 同上 |

官方的旅行规划演示从另一个角度展示同一件事：三项并行搜索中，已经完成的直接复用结果，只有中断的那一项重新执行。

![原理图：三项并行搜索中，天气和博物馆在进程退出前已完成并保存结果，重启后只有火车搜索重新执行](/images/cases/durable-assistant/recovery-diagram.webp)

## 能力边界

- 演示项目是单用户的个人项目，不包含多用户账户和细粒度权限。放到公网前，至少需要 HTTPS 和访问密码。
- 只有声明为「可以安全重放」的工具，才会在恢复时重新执行；没有声明的工具，模型会收到「这次调用被打断了」，由它决定下一步。会写外部数据的工具，需要自己保证执行两遍也只生效一次。
- 已经抓取的网页、已经发出的请求、写到外部的文件，不会因为恢复或分叉而撤销。

不想自己准备服务器，可以了解 Cloudflare 版 [Pi Durable Edge](https://github.com/xiaomoBoy/pi-durable-edge)。它跑在 Workers 和 Durable Objects 上，提供一键部署按钮；目前是实验版，线上部署和崩溃恢复仍待实测，功能也少于本案例的项目。

## 依据

- [Pi Durable Assistant v0.1.0](https://github.com/xiaomoBoy/pi-durable-assistant/releases/tag/v0.1.0) 与其[快速开始文档](https://github.com/xiaomoBoy/pi-durable-assistant/blob/v0.1.0/docs/GETTING_STARTED.md)
- [Pi Durable v1.1.0 README](https://github.com/earendil-works/pi/blob/v1.1.0/packages/durable/README.md)
- [Earendil：Pi Durable 发布文章](https://earendil.com/posts/pi-durable/) 及本书[授权译文](/translations/pi-durable)
