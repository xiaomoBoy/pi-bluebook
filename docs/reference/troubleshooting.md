---
title: Pi 故障排查手册
description: 按启动、模型、Extension、Skill、Session、无响应、Context 和插件冲突等症状，逐步缩小 Pi 问题范围。
prev:
  text: 常见问题 FAQ
  link: /reference/faq
next:
  text: AI 与 Agent 热词表
  link: /reference/glossary
---

<span class="library-status">TROUBLESHOOTING · 按症状缩小范围</span>

# Pi 故障排查手册

这不是错误代码百科，也不从“Session、Context、Extension”这些知识分类开始。先找到你眼前看到的现象，再按同一条路线处理：**保留现场 → 检查最小条件 → 建立干净基线 → 每次只恢复一个变量 → 到达停止条件就停。**

涉及命令和当前行为的内容核验于 **2026 年 9 月 11 日**，本机版本为 Pi `0.80.10`。实际输出不一致时，先以你本机的 `pi --help` 和 [Pi 最新官方文档](https://pi.dev/docs/latest) 为准。

::: warning 先不要做的事
不要一上来重装、清空 `~/.pi/agent/`、删除 Session、运行 `pi update --all`，或同时停用一批自己记不清的插件。这些动作会改变现场，让原来的问题更难定位；认证目录还可能包含私人会话与凭据。
:::

## 先用一分钟判断问题在哪一层

| 看到的现象 | 先进入 |
| --- | --- |
| 普通终端提示 `command not found`，或 Pi 界面根本打不开 | [启动不了](#cannot-start) |
| Pi 能打开，但模型列表为空、缺少目标模型或请求报认证错误 | [模型不出来](#model-missing) |
| 启动时出现 `.ts`、import、工具或命令注册错误 | [Extension 加载失败](#extension-failed) |
| Skill 能看到却不执行，或 `/skill:name` 不存在 | [Skill 没触发](#skill-not-triggered) |
| `pi -c`、`pi -r` 找不到原来的任务 | [Session 找不到](#session-missing) |
| 界面已经打开，但发送后长期没有新内容 | [突然不响应](#not-responding) |
| Context 接近上限、压缩失败或压缩后忘了关键要求 | [Context 爆了](#context-full) |
| 单独启用都正常，一起启用就报错或行为改变 | [插件互相冲突](#resource-conflict) |
| Pi 读错目录、修改越界，或“说完成”但文件不对 | [文件和工具结果异常](#wrong-files) |

### 建立最小基线

很多问题都需要先回答一个问题：**不用任何项目资源和自动发现资源时，Pi 能不能正常启动？**

在普通终端运行：

```bash
pi --no-approve --no-extensions --no-skills --no-context-files \
  --no-prompt-templates --no-themes --verbose
```

这条命令只用于排查。它临时忽略项目资源、Extension、Skill、上下文文件、提示模板和主题，但不是沙箱，也不会修复任何东西。

- 基线也失败：优先查安装、Node、终端、认证或 Provider。
- 基线正常：问题更可能来自项目目录、Session 或某个附加资源。
- 恢复一个资源后才失败：已经把范围缩小到这个资源或它与当前环境的组合。

## 1. 为什么启动不了？ {#cannot-start}

**你看到的现象**

- 普通终端显示 `pi: command not found`。
- `pi` 有输出，但在进入交互界面前退出。
- 界面卡在启动阶段，错误中出现 Node、模块、配置或资源路径。

**先检查什么**

先区分“系统找不到命令”和“Pi 已经启动但初始化失败”。不要把 Pi 编辑区当作普通终端，也不要根据旧教程随机改 PATH。

```bash
pwd
command -v node
node --version
command -v pi
pi --version
pi --help
```

Windows 用户在本书约定的 Git Bash 中运行这些命令。如果 `command -v pi` 没有结果，问题还没进入 Pi 内部；回到[安装并启动 Pi](/guide/install-pi)核对安装方式和当前官方要求。

**怎样缩小范围**

如果 `pi --version` 正常，但交互界面打不开，先运行本页的[最小基线](#建立最小基线)。如果仍卡在启动网络阶段，再试一次：

```bash
pi --offline --no-approve --no-extensions --no-skills \
  --no-context-files --no-prompt-templates --no-themes --verbose
```

`--offline` 只用于判断启动网络操作是否相关。离线能打开不代表 Provider 调用一定正常，也不应直接得出“网络就是唯一原因”。

**什么时候停止**

- 错误要求提升系统权限、修改系统目录或执行陌生安装脚本。
- 你准备删除整个配置目录，只为了“试试看”。
- Node 或 Pi 的来源无法确认，且错误涉及被替换的可执行文件。

保留版本、完整错误、终端类型和 `command -v` 的路径，再求助。

## 2. 为什么模型不出来？ {#model-missing}

**你看到的现象**

- `/model` 列表为空，或没有教程里提到的型号。
- 能选模型，但发送后出现未登录、无权限、额度不足或模型不可用。
- Provider 已经发布新模型，本地目录还没出现。

**先检查什么**

先把三个问题分开：目录里有没有这个模型、当前有没有凭据、账号是否真有该模型的调用权限。安装 Pi 本身不会自动获得模型或额度。

```bash
pi --list-models
pi --list-models 关键词
pi update --models
```

前两条只查看当前目录；第三条刷新模型目录，不升级 Pi 本体。然后启动 Pi，在编辑区使用 `/login` 核对 Provider、用 `/model` 重新选择。

**怎样缩小范围**

| 常见结果 | 更可能的方向 |
| --- | --- |
| `--list-models` 完全没有目标 Provider | 模型目录或自定义 Provider 配置 |
| 列表有模型，但 `/model` 里不可用 | 当前 Provider、范围过滤或认证状态 |
| 请求返回 401 / 403 | 凭据、订阅或账号权限；以 Provider 的原始错误为准 |
| 请求返回 429 | 额度、速率限制或并发限制；不要立即反复重试 |
| 请求返回 404 / model not found | 模型 ID、区域、Provider 或目录过期 |
| 请求超时或 5xx | 网络、代理或 Provider 服务状态 |

不同 Provider 的状态码含义可能不同，这张表只是定位方向。测试付费模型前先确认费用；不要把 API Key 粘到聊天、截图、项目文件或命令参数中。

**什么时候停止**

- 登录页、回调域名或 Provider 来源不可信。
- 重试正在持续计费，或 429 尚未恢复。
- 需要复制 `auth.json`、完整 Token 或 API Key 才能继续求助。

## 3. 为什么 Extension 加载失败？ {#extension-failed}

**你看到的现象**

- 启动信息显示某个 `.ts` / `.js` 文件加载失败。
- Extension 注册的命令或工具没有出现。
- 加载后 Pi 能启动，但调用自定义工具时报错。

**先检查什么**

先保留错误中的**完整文件路径和第一条异常**。Extension 在 Pi 进程中执行代码，问题可能来自发现路径、Project Trust、import、依赖、版本或运行时逻辑。

```bash
pi --no-extensions --verbose
pi --no-extensions -e ./path/to/extension.ts --verbose
```

第一条确认“没有 Extension 时能否启动”；第二条关闭自动发现后只显式加载目标文件。

**怎样缩小范围**

- 不带 Extension 正常，显式加载失败：问题已经缩小到该文件、依赖或当前 Pi 兼容性。
- 显式加载正常，自动发现失败：检查全局与项目发现位置、设置、Package 和 Project Trust。
- 启动正常，只有工具执行失败：保留该次 Tool Call 输入与错误，问题在运行路径，不是“没加载”。
- 只有 `/reload` 后失败：重新启动做一次冷加载，区分重载状态和文件本身。

用 `pi list` 查看登记的 Package，用 `pi config` 查看其中哪些 Extension 被启用。不要为了排查先运行 `pi update --all`，更新多个 Package 会同时引入更多变量。

**什么时候停止**

- Extension 来源不明，或要求凭据、系统权限、删除文件与对外发送。
- 错误指向依赖安装，但你还没有审查 `package.json` 和安装脚本。
- 关闭 Extension 后问题消失，但重新启用会重复产生越界写入或危险命令。

## 4. 为什么 Skill 没触发？ {#skill-not-triggered}

**你看到的现象**

- 你认为任务应该匹配某个 Skill，但 Pi 没有读取它。
- `/skill:name` 不存在。
- Skill 被读取了，结果却没有按说明执行。

**先检查什么**

先区分“没有发现”“发现但没有自动选择”和“已经加载但执行偏离”。确认真正的入口是 `SKILL.md`，frontmatter 至少有有效的 `name` 与非空 `description`。

```bash
test -f ./path/to/skill/SKILL.md
sed -n '1,40p' ./path/to/skill/SKILL.md
pi --no-skills --skill ./path/to/skill/SKILL.md --verbose
```

`--no-skills` 关闭自动发现，但显式 `--skill` 仍然会加载指定路径。进入 Pi 后使用 `/skill:name` 可以强制读取该 Skill；自动匹配不能保证每次都触发。

**怎样缩小范围**

- `/skill:name` 不存在：检查路径、frontmatter、名称规则和启动警告。
- 命令存在，自动任务没触发：`description` 可能没有准确描述使用场景，或模型没有选择读取；先用显式命令验证，不要直接把描述改成“适用于所有任务”。
- Skill 已读取但找不到脚本：检查相对路径是否以 Skill 目录为基准、配套文件是否齐全。
- 出现同名警告：Pi 会保留先发现的同名 Skill；先确认实际加载来源，再处理碰撞。

**什么时候停止**

- Skill 引导执行未审查的脚本、安装依赖、读取凭据或访问任务外目录。
- 为了提高触发率准备写一个覆盖所有任务的宽泛描述。
- 你无法确认当前加载的是哪一个同名 Skill。

## 5. 为什么 Session 找不到？ {#session-missing}

**你看到的现象**

- `pi -c` 打开的不是刚才的任务。
- `pi -r` 或 `/resume` 列表里没有熟悉的会话名。
- 项目移动、重命名或换电脑后，原会话不再出现。

**先检查什么**

Pi 的 Session 默认按工作目录组织。`pi -c` 是继续**当前项目**最近的 Session，不是全局最近聊天。

```bash
pwd
pi -r
```

在选择器中可用 `Ctrl+P` 显示路径、`Ctrl+N` 只看命名 Session。进入候选会话后用 `/session` 核对文件、ID、消息数、Token 和成本；发现选错就退出，不要继续写入。

**怎样缩小范围**

- 回到创建 Session 时的原目录，再运行 `pi -r`。
- 如果知道 Session 文件或 ID，使用 `pi --session <路径或ID>` 精确打开。
- 如果当时用了 `--no-session`，这次对话本来就不会保存。
- 如果当时用了 `--session-dir`，必须回到相同目录设置或提供具体 Session 路径。
- 仓库被移动或重命名时，旧 Session 仍可能存在，只是不会自动归到新路径下。

**什么时候停止**

- 准备直接编辑 JSONL 来“修复”会话树。
- 会话包含私人提示、凭据或客户资料，却准备整份公开上传。
- 还没确认路径和名称，就要在选择器里批量删除旧 Session。

## 6. 为什么突然不响应？ {#not-responding}

**你看到的现象**

- 发送后长期没有文字，但状态栏仍显示工作中。
- 卡在一次工具调用、网络请求或 Compaction。
- 界面能操作，只有当前 Session 不再向前。

**先检查什么**

先等当前工具的合理完成时间，再按一次 `Esc` 停止这一轮。`Esc` 能中止尚未完成的工作，但不能撤销已经发生的文件写入、命令、发布或对外发送。

停止后立即记录：当前模型、最后一个 Tool Call、最后一条可见错误、是否已经有文件变化，以及这次请求是否可能计费。

**怎样缩小范围**

启动一个不保存、没有工具和附加资源的最小测试：

```bash
pi --no-session --no-tools --no-extensions --no-skills \
  --no-context-files --verbose
```

只发送一句短文本，不让它读文件或运行命令。

- 最小请求也不返回：优先检查认证、网络、代理、Provider 状态和额度。
- 最小请求正常，原 Session 不正常：检查 Context、Session 历史或特定模型。
- 没有工具时正常，一启用工具就卡：定位最后一个 Tool Call 和外部进程。
- 没有 Extension 时正常：转到[Extension 排查](#extension-failed)或[冲突排查](#resource-conflict)。

**什么时候停止**

- 相同请求可能计费，却已经连续重试。
- 最后一个动作涉及部署、删除、付款或对外发送，结果状态未知。
- 外部命令仍可能在后台运行，而你准备重复启动同一任务。

先独立检查真实系统状态，不要把“界面没回复”直接等同于“动作没发生”。

## 7. 为什么 Context 爆了？ {#context-full}

**你看到的现象**

- 状态栏的 Context 占用接近上限。
- Pi 自动开始 Compaction，或 `/compact` 失败。
- 压缩后还能继续，但漏掉早期约束、错误原文或文件状态。

**先检查什么**

先把不能丢的事实写入项目内的检查点：目标、禁止事项、已完成、真实文件变化、失败原文和唯一下一步。不要把关键状态只留在准备被压缩的聊天里。

在 Pi 中用 `/session` 查看当前 Session 信息；需要压缩时使用：

```text
/compact
```

Compaction 需要模型生成摘要。它会用摘要和近期消息重建后续 Context，不会撤销磁盘修改，也不保证逐字保留全部旧细节。

**怎样缩小范围**

- 压缩前就混入多个无关任务：新建命名 Session，重新读取检查点，通常比连续压缩更清楚。
- 单次工具输出特别大：以后改为读取必要片段，把长日志保存到文件并提取关键行。
- `/compact` 本身失败：保留错误；检查当前模型是否可用、请求是否仍能调用 Provider。
- 压缩后漏约束：让 Pi 重新读取原需求和检查点，并逐项复述；不要用新的长解释继续覆盖问题。

**什么时候停止**

- 摘要已经丢失安全边界或禁止动作，而下一步具有副作用。
- 连续压缩仍无法容纳单个超大输入或工具结果。
- 你无法说明磁盘文件、Session 历史和当前 Context 哪一个才是可信来源。

## 8. 为什么插件互相冲突？ {#resource-conflict}

**你看到的现象**

- 两个 Package 单独启用正常，一起启用时启动失败。
- 同名命令、工具或 Skill 指向了意外来源。
- 加载新插件后，System Prompt、模型、工具选择或界面行为发生变化。

**先检查什么**

不要先更新全部插件。先记录“最后一次正常”的资源组合，再查看当前登记内容：

```bash
pi list
pi --no-approve --no-extensions --no-skills --no-context-files \
  --no-prompt-templates --no-themes --verbose
```

如果干净基线正常，就从零开始每次只显式加入一个资源：

```bash
pi --no-extensions -e ./one-extension.ts --no-skills --verbose
pi --no-skills --skill ./one-skill/SKILL.md --no-extensions --verbose
```

**怎样缩小范围**

1. 固定同一个目录、Pi 版本、模型和测试任务。
2. 先测 A，再测 B，最后测 A+B。
3. 记录每次启动时真实加载的资源和第一处行为差异。
4. A、B 单独正常而 A+B 失败，才有“冲突”的证据。
5. 确认来源后，可用 `pi config` 暂停 Package 中的某项资源；一次只改一个开关。

同名 Skill 会发生发现顺序与名称碰撞；Extension 还可能注册同名命令、工具或事件处理器。不要只按 Package 名猜能力，应该检查实际加载的是 Extension、Skill、模板还是主题。

**什么时候停止**

- 无法确认两个资源的来源、版本或实际代码。
- 冲突涉及命令拦截、权限控制、凭据、部署或删除保护。
- 需要通过删除整个 Package 目录、全局配置或所有缓存来继续试错。

## 9. 为什么读错文件、改错目录或“完成”却没有结果？ {#wrong-files}

**你看到的现象**

- Pi 回答了内容，但目标文件不存在或没有变化。
- 修改出现在同名的另一个项目里。
- Agent 说测试通过，普通终端复跑却失败。
- `Esc` 后以为动作已撤销，实际文件已经改变。

**先检查什么**

回到真实环境，不问 Agent 自己是否完成：

```bash
pwd
git status --short
git diff --check
git diff
```

不是 Git 项目时，直接打开目标文件并检查修改时间、内容和输出路径。再回看 Session 中真正发生的 Tool Call，不要只看最后总结。

**怎样缩小范围**

- `pwd` 不对：停止当前 Session，回到正确目录再创建或恢复任务。
- 状态有范围外文件：先保留差异，分清已有变化与本次变化，不做批量恢复。
- Agent 报告通过但没有命令输出：由人在普通终端运行项目规定的检查。
- 本地文件正确但线上不对：继续检查部署版本、构建目录、缓存和正式 URL；本地通过不是线上通过。

**什么时候停止**

- 发现凭据文件、用户目录或任务外仓库被读取或修改。
- 发布、付款、删除、消息发送的最终状态无法确认。
- 为了恢复准备使用覆盖整个仓库或用户目录的破坏性命令。

## 求助前整理一份最小证据包

不要只发“坏了”或一张截掉错误的截图。复制下面模板，只填写与问题有关的部分：

```text
现象：
期望结果：
操作系统与终端：
Pi 版本（pi --version）：
Node 版本（node --version）：
当前目录（pwd，可隐去私人上级路径）：
实际启动命令（删除 Key 和 Token）：
第一条完整错误：
最小基线是否能启动：
只启用目标资源时的结果：
Provider 与模型名（不要提供凭据）：
Session 名称或 ID（不要上传整份私人 Session）：
已经发生的文件或外部状态变化：
```

一份好的证据包能让别人判断问题属于安装、Provider、Session、Context 还是附加资源，也能避免让你重复已经失败且可能产生副作用的动作。

## 全局停止条件

出现以下任一情况，停止自动重试，先由人确认：

- 凭据、付款、额度或账号权限不清楚；
- 删除、覆盖、发布或对外发送的最终状态未知；
- Extension 或 Skill 来源不明，却要求运行代码或安装依赖；
- 实际路径离开任务目录，或出现无法归因的文件变化；
- 相同请求持续计费、持续 429，或外部服务仍在处理；
- 修复方案要求清空认证、Session、整个配置目录或整个仓库；
- 你没有办法保存当前错误、差异和恢复点。

## 依据与继续阅读

- [Pi Using Pi：命令、工具与资源参数](https://pi.dev/docs/latest/usage)
- [Pi Providers：登录、目录与凭据解析](https://pi.dev/docs/latest/providers)
- [Pi Sessions：保存位置、选择器与精确恢复](https://pi.dev/docs/latest/sessions)
- [Pi Compaction：触发、摘要与 Context 重建](https://pi.dev/docs/latest/compaction)
- [Pi Skills：发现、显式加载与校验](https://pi.dev/docs/latest/skills)
- [Pi Extensions：发现位置、权限与错误处理](https://pi.dev/docs/latest/extensions)
- [Pi Packages：查看、筛选和停用资源](https://pi.dev/docs/latest/packages)
- [权限、隔离与验收](/guide/safety)
