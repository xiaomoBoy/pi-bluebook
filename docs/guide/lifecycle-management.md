---
title: 安装以后：更新、退出登录与卸载
description: 安全管理 Pi 的版本、认证、Package 与本地数据，理解更新、退出登录、卸载和彻底清理的区别。
prev:
  text: 从练习目录开始
  link: /guide/ready-to-work
next:
  text: 第一次任务
  link: /guide/first-task
---

<span class="library-status">MAINTENANCE PATH · 安装后生命周期</span>

# 安装以后：更新、退出登录与卸载

Pi 已经能正常使用以后，你迟早会遇到这些问题：提示有新版本时要不要更新？换一个模型账号是不是要重新安装？卸载以后，旧会话和 API Key 还在不在？

它们不是同一个动作。更新改变程序版本；退出登录处理 Pi 保存的认证；卸载只移除 `pi` 命令；本地会话、设置和 Package 由你另外决定是否保留。

::: danger 先记住最容易误判的一点
按照 Pi 官方当前说明，卸载 Pi **不会**自动删除 `~/.pi/agent/`。这个目录可能包含认证信息、会话、设置和已安装 Package。看到 `pi: command not found`，不能证明凭据和历史记录已经从电脑中消失。
:::

本页按蓝皮书使用的 npm 安装路线编写，macOS、Linux 和 Windows Git Bash 都可以使用。Windows 用户看到“普通终端”时，仍应打开 Git Bash。

## 先判断自己要完成哪件事

| 你的目标 | 应做的动作 | 不会自动发生的事 |
| --- | --- | --- |
| 使用新版 Pi | `pi update` | 不会顺便更新所有 Package |
| 只刷新模型目录 | `pi update --models` | 不会升级 Pi 本体 |
| 更新已安装 Package | 先 `pi list`，审查后用 `pi update --extensions` | 不代表 Pi 本体已经更新 |
| 换账号或移除 Pi 保存的凭据 | 在 Pi 中使用 `/logout` | 不会卸载程序或删除会话 |
| 暂时不用 Pi，但想保留历史 | npm 卸载 Pi，保留 `~/.pi/agent/` | 不会自动清理本地数据 |
| 不再保留这台电脑上的 Pi 数据 | 先退出登录和盘点，再单独处理数据目录 | 不能只靠卸载命令 |

不确定时，先停在“查看版本和盘点”阶段。检查命令不会替你修改设置。

## 1. 更新前先留下恢复点

不要在 Pi 正在修改文件、运行构建或等待模型回复时更新。先让当前任务结束，在 Pi 编辑区输入 `/quit`，回到普通终端。

如果当前目录是 Git 仓库，先用自己的正常流程确认重要修改已经提交或另有备份。Pi 的更新命令只负责 Pi，不会替你的项目创建恢复点。

记录当前版本和已安装 Package：

```bash
pi --version
pi list
```

把版本号记在临时笔记中。`pi list` 展示的是用户设置和当前项目设置中登记的 Package；它们可能包含能够执行代码的 Extension，所以后面不要未经检查就全部更新。

再确认 Pi 的本地数据目录是否存在，但不要打印其中的认证内容：

```bash
test -d ~/.pi/agent && echo "FOUND: Pi 本地数据目录存在"
ls -la ~/.pi/agent
```

`ls` 只用于确认文件和目录名称。不要运行 `cat ~/.pi/agent/auth.json`，不要把 `auth.json` 的内容放进截图、聊天、工单或 Git 仓库。

### 更新前验收

- [ ] 当前 Pi 任务已经结束，我已回到普通终端。
- [ ] 项目中的重要修改已有恢复点。
- [ ] 我记录了更新前的 `pi --version`。
- [ ] 我看过 `pi list`，没有把陌生 Package 当成 Pi 本体。

## 2. 只更新 Pi 本体

普通更新使用：

```bash
pi update
```

官方当前说明，`pi update` 默认只更新 Pi 本体，与 `pi update --self` 的目标相同。它不会自动把所有已安装 Package 一起升级。

命令结束、普通终端重新出现输入行后，检查：

```bash
pi --version
```

新版本号可能变化，也可能已经是最新版而保持不变。不要只根据“出现了很多下载文字”判断成功；最终要看更新命令没有错误、`pi --version` 仍可执行。

然后从独立练习目录启动 Pi，完成一次最小连通测试：

```bash
cd ~/Downloads/pi-practice
pi
```

Windows Git Bash 把目录换成 `~/pi-practice`。进入 Pi 后提交：

```text
只回复“更新后连接正常”。不要读取、创建、修改文件，也不要运行命令。
```

能收到准确回复，说明当前认证和模型调用也能工作。测试失败时先保留完整错误和更新前后的版本号，不要紧接着重装、清空设置和更换 Provider；一次只排查一个变量。

::: warning `--force` 不是日常更新按钮
`pi update --self --force` 会在已经是最新版时仍尝试重新安装，适合明确的修复场景，不是普通更新的必经步骤。官方还说明，实验性的安装器管理模式不支持 `--force`；这种安装应重新运行对应安装器进行修复。
:::

## 3. 分清 Pi、模型目录和 Package 的更新

Pi 当前提供这些不同范围：

| 命令 | 实际范围 | 什么时候使用 |
| --- | --- | --- |
| `pi update` | 只更新 Pi | 日常升级本体 |
| `pi update --self` | 只更新 Pi | 需要明确写出范围时 |
| `pi update --models` | 只刷新模型目录 | Provider 已支持新模型，但本地选择器还没有时 |
| `pi update --extensions` | 更新已安装 Package，并核对固定的 Git 引用 | 已逐项确认 Package 来源和变更时 |
| `pi update --all` | 更新 Pi 和 Package | 已看过 `pi list`，并准备一起验收时 |

Package 可以包含 Extension、Skill、Prompt Template 和主题。其中 Extension 能以当前用户权限执行代码，Skill 也可能引导模型执行操作。更新第三方 Package 前，先确认来源、当前版本、更新内容和回退办法。

初学者的默认顺序应当是：

1. 先运行 `pi update`，验证 Pi 本体。
2. 需要新模型目录时，单独运行 `pi update --models`。
3. 只有确实需要时，查看 `pi list` 后逐项处理 Package。
4. 不把 `pi update --all` 当成看见更新提示后的第一反应。

## 4. 换账号或退出登录

如果只是要换模型账号，不需要卸载 Pi。进入 Pi，在底部编辑区输入：

```text
/logout
```

按界面选择要清除的 Provider 凭据。完成后可以用 `/login` 登录另一个账号，再用 `/model` 选择可用模型。

Pi 官方说明，使用 `/login` 保存的令牌或 API Key 位于 `~/.pi/agent/auth.json`，`/logout` 用于清除凭据。不要直接打开这个文件复制或手工删改某一段 JSON；手工改坏格式会同时影响其他 Provider。

::: warning 环境变量是另一条凭据来源
如果你曾在 Shell 配置、系统环境或启动脚本中设置 API Key，`/logout` 不会替你修改那些外部配置。Pi 当前的凭据解析顺序包括命令行参数、`auth.json`、环境变量和自定义 Provider 配置。退出后仍然能调用某个 Provider，不一定是 `/logout` 失效，也可能是外部环境仍提供了凭据。

不要用 `echo $OPENAI_API_KEY` 一类命令检查，这会把真实密钥打印在屏幕和日志中。只检查变量名称和它来自哪个配置位置；需要撤销时到对应服务商后台撤销旧 Key。
:::

如果电脑丢失、账号异常或密钥可能泄露，仅删除本地文件不够。应当在服务商后台撤销令牌或 API Key，再生成新的凭据。

### 退出登录验收

- `/logout` 已针对正确 Provider 完成。
- 我没有把 `auth.json` 或密钥内容打印出来。
- 如果要换账号，重新 `/login` 后已用一次真实回复验证。
- 如果旧凭据可能泄露，我已在服务商后台撤销，而不只是清理本地文件。

## 5. 卸载 Pi，但保留设置和会话

先用 `/quit` 退出 Pi，再回到普通终端。蓝皮书使用 npm 全局安装，因此卸载命令是：

```bash
npm uninstall -g @earendil-works/pi-coding-agent
```

命令结束后检查 `pi` 是否仍能被找到：

```bash
if command -v pi >/dev/null 2>&1; then
  echo "CHECK: 仍然找到了 pi，请确认安装方式"
else
  echo "PASS: pi 命令已经移除"
fi
```

如果仍然找到 `pi`，不要继续删除目录。先运行 `command -v pi`，确认它是否来自另一个 Node.js 版本、另一个包管理器或旧安装位置。

通过 npm 卸载后，`~/.pi/agent/` 默认仍然保留。以后重新执行蓝皮书的官方安装命令，原有设置和会话通常仍可继续使用；重新安装后仍要运行 `pi --version`，并用 `/resume` 实际确认需要的会话是否存在。

如果 Pi 是通过 pnpm、Yarn 或 Bun 安装的，应使用同一个包管理器移除。不要为了“卸载干净”把四种命令全部运行一遍。

## 6. 决定本地数据保留到什么程度

卸载程序后，再单独决定这些内容：

| 位置 | 可能包含什么 | 常见决定 |
| --- | --- | --- |
| `~/.pi/agent/auth.json` | OAuth 令牌或 API Key | 先用 `/logout` 处理；不要放入普通备份包 |
| `~/.pi/agent/sessions/` | 按工作目录保存的会话 | 需要续写或留档时保留 |
| `~/.pi/agent/settings.json` | 默认模型、主题、Package 等用户设置 | 准备重装时通常保留 |
| `~/.pi/agent/npm/`、`git/` | 用户级 Pi Package 文件 | 不再使用相关 Package 时才处理 |
| `~/.pi/agent/models-store.json` | 模型目录缓存 | 可重新刷新，不等同于认证凭据 |
| 项目中的 `.pi/` | 项目设置、资源或本地 Package | 属于项目范围，不会因全局卸载自动消失 |

第一次清理时，不提供一条 `rm -rf ~/.pi/agent` 让你整目录删除。更安全的顺序是：

1. 在 Pi 中逐个 `/logout`，确认不再需要本地保存的认证。
2. 用 `pi list` 和 `ls -la ~/.pi/agent` 盘点名称，不读取凭据正文。
3. 单独备份确实需要的 `sessions/` 和设置说明；不要把 `auth.json` 放进未加密压缩包、网盘共享或 Git。
4. 使用操作系统的废纸篓或回收站处理不再需要的 Pi 数据，以便发现误删时仍有恢复机会。
5. 最后检查项目目录中的 `.pi/`；全局目录与项目资源是两个不同范围。

如果你的目标只是“恢复到接近新安装状态”，也应先把原目录改名并确认新环境可用，而不是直接永久删除。这个动作会让 Pi 暂时看不到旧设置、认证和会话；只有在你已经完成盘点和备份时才进行。

## 7. 完成一次完整生命周期验收

根据你实际做的动作逐项检查，不需要为了完成本课真的卸载正在使用的 Pi。

- **只更新：** 更新前后版本均有记录，`pi --version` 可用，并收到一次最小真实回复。
- **更新 Package：** 先检查 `pi list`，更新后重新验证相关 Extension、Skill 或主题，而不是只看命令成功。
- **退出登录：** 正确 Provider 已退出，没有打印密钥；换账号后完成真实调用。
- **只卸载程序：** `command -v pi` 不再找到命令，同时明确知道 `~/.pi/agent/` 是否保留。
- **准备清理数据：** 已区分认证、会话、设置、Package 和项目 `.pi/`，先备份或移入回收站，不执行不透明的整目录删除命令。

**更新、退出登录、卸载、删除数据是四个独立决定。每完成一个动作，就用与它对应的证据验收。**

[继续第 5 课，完成第一次真实任务 →](/guide/first-task)

### 本页依据

- [Pi Quickstart：安装与卸载](https://pi.dev/docs/latest/quickstart)
- [Pi Packages：更新范围与 Package 管理](https://pi.dev/docs/latest/packages)
- [Pi Providers：登录、退出与凭据位置](https://pi.dev/docs/latest/providers)
- [Pi Sessions：会话保存位置](https://pi.dev/docs/latest/sessions)
- [Pi Settings：设置与更新检查](https://pi.dev/docs/latest/settings)

页面中的命令和存储位置核验于 2026-09-09，并在本机 Pi `0.84.3` 的命令帮助中复核。实际使用时仍应以当前官方文档和本机 `pi --help` 为准。
