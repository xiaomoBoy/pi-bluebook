---
title: Extension 的需求与验收
description: 从“长任务结束后提醒我”的需求出发，认识 Pi Extension 的设计与验收。
prev:
  text: Skill、Extension 与 Package
  link: /guide/skills-extensions-packages
next:
  text: 子 Agent 如何分工
  link: /guide/subagents
---

<span class="library-status">MODULE 04 · STEP 11 · 可练习</span>

# Extension 的需求与验收

::: info 本课结果
你会显式加载一个只注册 `/bluebook-check` 命令的教学 Extension，亲眼确认它出现、执行并在停用后消失。桌面通知放在本课最后作为进阶设计，不把终端内提示冒充系统通知。
:::

我对 Extension 的理解来自一个很小的烦恼。Pi 跑长任务时，我会切到别的窗口，任务已经停下来却没有立即发现。

这个需求适合做第一个 Extension，因为它有清楚的触发条件、简单的系统动作，而且容易验收。

## 先把需求说清楚

不要一开始就写“实现完美的系统通知”。先给第一版定四条边界：

1. 只在 Agent 结束工作、等待新消息时考虑提醒。
2. 终端正在前台时不打扰。
3. 提醒内容不包含私密任务全文。
4. 提醒失败不得破坏 Pi 本身的会话。

这时你已经可以看到 Extension 的轮廓：它要接收 Pi 的事件，判断状态，再执行一个系统动作。

## 理解文件放在哪里

Pi 可以加载用户级或项目级的 Extension。初学时建议从独立练习项目开始，只让这个项目使用它。这样容易看清来源，出错时也容易停用。

项目信任提示不是多余的障碍。项目级 Extension 会运行代码，它能做什么取决于当前用户的权限。只有当你知道文件从哪里来、大致做什么，才应信任该项目。

官方当前的自动发现位置是用户级 `~/.pi/agent/extensions/` 和项目级 `.pi/extensions/`。放在这些位置的文件可以在 Pi 中用 `/reload` 重新加载；本课使用 `-e` 显式路径做一次性测试，不把教学文件长期安装进去。

## 实操：加载一个最小 Extension

这次不直接制作桌面通知。先用一个无文件读写、无网络访问的命令验证完整加载流程，再讨论系统通知所需的额外边界。

### 1. 下载并读完代码

退出 Pi，在普通终端进入 `pi-practice` 后执行：

```bash
mkdir -p bluebook-examples
curl -fL https://pi.xiaomovps.com/examples/extension/bluebook-check.ts \
  -o bluebook-examples/bluebook-check.ts
```

打开这个文件。完整代码只有一个导入、一个默认函数和一个 `registerCommand` 调用；命令执行后只通过 `ctx.ui.notify` 显示一条 Pi 界面提示。若你下载到的内容不同，停止，不加载。

### 2. 只为本次启动加载它

在普通终端执行：

```bash
pi --no-extensions -e ./bluebook-examples/bluebook-check.ts
```

`--no-extensions` 会忽略其他自动发现的 Extension，`-e` 再显式加入本课文件。进入 Pi 编辑区后输入：

```text
/bluebook-check
```

预期看到“蓝皮书 Extension 已加载；本命令没有读取或修改文件。”这条界面提示。它证明命令已注册且处理函数成功运行；它不证明桌面通知、后台任务或其他 Extension 能力已经可用。

![教学 Extension 被真实加载并返回固定提示](/images/06-Pi-Extension执行结果-实操图.png)

启动信息列出了 `bluebook-check.ts`，中间的中文提示是执行 `/bluebook-check` 后出现的 Pi 界面反馈。本次使用离线启动，命令本身没有模型调用、文件读写或网络访问。停用是否成功仍要按下一步重新启动后检查。

### 3. 停用并复核

输入 `/quit` 回到普通终端，再直接运行：

```bash
pi --no-extensions
```

此时 `/bluebook-check` 不应再成为可执行的 Extension 命令。若仍然出现，先核对本次启动命令是否真的没有 `-e`，再检查项目 `.pi/extensions/` 和用户目录 `~/.pi/agent/extensions/` 是否另有同名文件。不要删除不认识的文件；只记录来源并停止。

如果 Extension 语法错误，Pi 会显示加载错误。保留完整错误和文件路径，使用不带 `-e` 的命令重新启动即可绕过本课 Extension；加载失败不应成为删除会话或练习材料的理由。

## 用可观察结果验收

真正制作桌面通知时至少要测试三种情况：

| 场景 | 应有结果 |
| --- | --- |
| 终端在后台，Agent 真正结束任务 | 出现一次可见提醒 |
| 终端在前台，你正在查看 Pi | 不额外弹出提醒 |
| 仍在执行工具调用，或还有排队消息 | 不把中间状态误判为完成 |

命令行打印出一段控制字符，只能证明命令被调用。它不能证明 macOS 桌面上真的出现了通知。最后的证据要包括真实界面观察，并隐去用户名、路径和私密内容。

## 从最小命令走向桌面提醒

实际完成这个小功能时，会经历一个完整的 Extension 开发循环：从真实需求出发，找到事件，写最小行为，重新加载，复现场景，检查副作用。

当前官方 Extension 事件中，`agent_end` 代表一次底层运行结束，之后仍可能自动重试、压缩重试或处理排队消息；用于“任务已经不会自动继续”的状态集成时，应优先评估 `agent_settled`。但“终端是否在前台”和“怎样调用 macOS、Windows 或 Linux 的桌面通知”属于操作系统能力，不是同一个事件就能跨平台解决。

::: warning 进阶案例尚未冒充完成
本课已经完成 Extension 的下载、审查、加载、运行和停用闭环。后台桌面通知仍需分别核验操作系统通知权限、前台判断和真实界面；在没有真实截图与复现场景前，不把它标成已验收。
:::

## 本课验收

- 你读过实际加载的 `.ts` 文件，能指出它注册的命令和唯一可见动作。
- 带 `-e` 启动时 `/bluebook-check` 显示预期提示。
- 不带 `-e` 再启动时，该教学命令不再可用。
- 即使代码加载失败，也能绕过该文件重新进入 Pi，原会话和练习材料没有被删除。

### 本章依据

- [Pi Extensions](https://pi.dev/docs/latest/extensions)
- [我的 Extension 学习记录](https://x.com/xiaomovps/status/2096979758349496647)
- [从通知问题回到事件与状态](https://x.com/xiaomovps/status/2097181979540111592)

Extension API 与 `agent_settled` 事件核验于 2026-09-09。教学文件已在本机 Pi 0.80.10 中实际加载，`bluebook-check` 命令注册成功，并返回预期界面通知请求。
