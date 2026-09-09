---
title: 参考手册
description: 按问题查找 Pi 的核心概念、操作入口、能力边界与延伸阅读。
prev:
  text: 实操案例
  link: /cases/
next:
  text: Session 与续写
  link: /guide/sessions
---

<span class="library-status">REFERENCE · 遇到问题时查这里</span>

# 参考手册

这里不承担从零教学，也不要求顺序阅读。遇到一个术语、一项能力或一个操作问题时，从对应主题进入；如果你希望完整学习，请回到[蓝皮书主线](/guide/)。

## 核心机制

| 你正在找什么 | 主题入口 | 适合解决的问题 |
| --- | --- | --- |
| Pi 能看到哪些材料 | [文件与工作目录](/guide/files-and-context) | 工作目录、文件范围与上下文边界 |
| 怎样保存并继续任务 | [Session 与续写](/guide/sessions) | 会话命名、恢复与可携带性 |
| 长任务为什么会忘记 | [上下文与压缩](/guide/context-and-compaction) | Context、Compaction 与交接记录 |
| Cache 数字代表什么 | [提示缓存](/guide/prompt-caching) | 缓存命中、成本与状态判断 |

## 能力与边界

| 能力 | 主题入口 | 先记住的一句话 |
| --- | --- | --- |
| 固化方法与新增能力 | [Skill、Extension 与 Package](/guide/skills-extensions-packages) | Skill 教它怎么做，Extension 给它新的运行能力 |
| 多任务分工 | [子 Agent](/guide/subagents) | 分工之后仍需统一证据和最终验收 |
| 安全地执行任务 | [权限、隔离与验收](/guide/safety) | 成功返回不等于业务结果已经完成 |
| 长时间运行 | [VPS 与长期任务](/guide/vps-and-long-running) | 先设计检查点、恢复路径和停止条件 |

## 操作入口

- [安装前检查](/guide/before-install)：确认环境和练习目录。
- [安装并启动 Pi](/guide/install-pi)：完成第一次启动。
- [登录与模型设置](/guide/connect-model)：连接 Provider 与模型。
- [从练习目录开始](/guide/ready-to-work)：把实验与真实文件隔离。

## 常用命令速查

下面只列主线实际使用的入口。普通终端命令与 Pi 内部命令不要混输。

| 在哪里输入 | 命令 | 用途 |
| --- | --- | --- |
| 普通终端 | `pi` | 在当前目录启动交互界面 |
| 普通终端 | `pi --version` | 查看当前安装版本 |
| 普通终端 | `pi -c` | 继续当前项目最近会话 |
| 普通终端 | `pi -r` | 打开当前项目会话选择器 |
| 普通终端 | `pi --no-extensions -e ./file.ts` | 忽略自动发现的 Extension，只显式加载一个文件 |
| 普通终端 | `pi --no-skills --skill ./SKILL.md` | 忽略自动发现的 Skill，只显式加载一个文件 |
| Pi 编辑区 | `/login` | 管理模型服务认证 |
| Pi 编辑区 | `/model` | 选择当前模型 |
| Pi 编辑区 | `/name 名称` | 设置会话显示名 |
| Pi 编辑区 | `/resume` | 浏览并切换会话 |
| Pi 编辑区 | `/tree` | 在当前会话树中选择节点 |
| Pi 编辑区 | `/fork` / `/clone` | 从旧消息或当前分支创建新会话 |
| Pi 编辑区 | `/compact` | 把较早上下文整理为摘要 |
| Pi 编辑区 | `/reload` | 重新加载自动发现位置中的资源 |
| Pi 编辑区 | `/quit` | 退出 Pi 回到普通终端 |

Package 管理命令输入在普通终端：`pi install <来源>` 安装，`pi list` 查看，`pi config` 启用或停用资源，`pi remove <来源>` 移除。Package 可能包含可执行 Extension 与会引导 Agent 执行操作的 Skill；看不清来源和完整内容时不要安装。

命令行为会随版本变化；本表核验于 2026-09-09。遇到不一致时先运行 `pi --help`，再查 [Using Pi](https://pi.dev/docs/latest/usage) 和对应专题页。

## 文件与配置位置

| 位置 | 作用 | 边界 |
| --- | --- | --- |
| `~/.pi/agent/` | 用户级认证、设置、会话与资源 | 可能包含凭据和私人会话，不要上传 |
| `.pi/` | 当前项目的设置、Extension、Skill 等 | 项目资源受 Project Trust 控制 |
| `.agents/skills/` | 可被多个 Agent 工具发现的项目 Skill | 项目级资源，需要先审查来源 |
| `AGENTS.md`、`CLAUDE.md` | 项目上下文说明 | 默认加载不受拒绝 Project Trust 保护，可用 `--no-context-files` 关闭 |
| `docs/public/` | 本蓝皮书站点的公开下载材料 | 构建后复制到网站根路径，不放凭据 |

## 故障排查顺序

1. 先停止重复尝试，保留完整错误文字。
2. 核对输入位置：普通终端还是 Pi 编辑区。
3. 核对 `pwd`、实际文件路径、当前模型和会话名称。
4. 临时禁用非必要资源：例如 `--no-extensions`、`--no-skills`。
5. 只改变一个条件后重试，并记录实际结果。
6. 涉及密钥、付费、发布、删除或对外发送时，不自行扩大操作。

| 现象 | 首先检查 |
| --- | --- |
| `pi: command not found` | 重新打开终端后运行 `pi --version`，不要随机改 PATH |
| 模型列表为空 | `/login` 的认证是否完成、账号是否真有调用权限 |
| 找不到会话 | 是否位于创建会话时的同一工作目录 |
| Skill 没被使用 | 实际加载路径、`name`/`description`、启动参数 |
| Extension 加载错误 | 文件内容和路径；不带 `-e` 重新启动恢复 |
| Agent 说完成但结果不对 | 回到输入、输出、差异、测试或真实界面重新验收 |

## 术语边界

- **Provider**：实际提供模型调用与计费的服务，不等同于 Pi 本身。
- **Session**：保存的对话树；它不会替代文件版本管理。
- **Context**：模型这一轮能参考的输入；不等于永久记忆。
- **Skill**：按需读取的工作说明与配套资源；能影响行为，也可能引导执行脚本。
- **Extension**：在 Pi 进程内运行的 TypeScript 能力，拥有当前用户权限。
- **Package**：分发 Skill、Extension、提示模板与主题的组合，不是安全容器。
- **Project Trust**：是否加载项目资源的决定，不是运行时沙箱。

## 延伸阅读

专题文章不再作为一条独立课程。它们会从对应章节进入，用原始文章和实践进一步解释一个机制：

- 学完第 7 课后：[无法随身带走的会话](/translations/session-portability)
- 学完第 8 课后：[Pi 中的压缩机制](/translations/compaction-in-pi)
- 学完第 9 课后：[Agent 中的提示缓存](/translations/prompt-caching)

[查看全部官方授权译文](/translations/)

::: tip 怎么使用参考手册
先用搜索或上面的主题索引定位问题；需要建立完整理解时，再沿着页面顶部的课程归属回到对应章节。
:::
