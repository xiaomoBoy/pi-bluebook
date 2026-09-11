---
title: 参考手册
description: 按问题查找 Pi 的核心概念、操作入口、能力边界与延伸阅读。
prev:
  text: 实操案例
  link: /cases/
next:
  text: 常见问题 FAQ
  link: /reference/faq
---

<span class="library-status">REFERENCE · 遇到问题时查这里</span>

# 参考手册

这里不承担从零教学，也不要求顺序阅读。遇到一个术语、一项能力或一个操作问题时，从对应主题进入；如果你第一次阅读，先从[导论：为什么要读这本 Pi 蓝皮书](/guide/introduction)开始，再按[蓝皮书主线](/guide/)继续。

::: info 先读本版说明
[十条仍然成立的判断](/guide/lasting-principles)区分当前结论与原始学习档案；[凡例与 2026 开放学习版说明](/guide/edition-2026)记录平台路径、核验截止、维护规则与版权边界。
:::

## 三种快速查法

| 你现在遇到的是 | 从这里进入 | 阅读路径 |
| --- | --- | --- |
| 一个具体问题 | [Pi 常见问题 FAQ](/reference/faq) | 先看短答，再进入对应概念或课程 |
| 一个已经发生的故障 | [Pi 故障排查手册](/reference/troubleshooting) | 按现象建立基线，每次只改变一个条件 |
| 一个看不懂的词 | [AI 与 Agent 热词表](/reference/glossary) | 先读人话解释，再理解它在 Pi 中的含义 |

FAQ、故障排查手册与热词表会互相引用，并继续连接主线课程。FAQ 回答“为什么”，故障手册处理“现在坏在哪里”，热词表解释“这个词是什么意思”。

## 核心机制

| 你正在找什么 | 主题入口 | 适合解决的问题 |
| --- | --- | --- |
| Pi 能看到哪些材料 | [文件与工作目录](/guide/files-and-context) | 工作目录、文件范围与上下文边界 |
| 怎样保存并继续任务 | [Session 与续写](/guide/sessions) | 会话命名、恢复与可携带性 |
| 长任务为什么会忘记 | [上下文与压缩](/guide/context-and-compaction) | Context、Compaction 与交接记录 |
| Cache 数字代表什么 | [提示缓存](/guide/prompt-caching) | 缓存命中、成本与状态判断 |
| 这些概念怎样连成一次运行 | [从 Prompt 到 Agent Loop](/guide/how-pi-works) | Context 组装、模型调用、工具闭环与 Session 写回 |

## 能力与边界

| 能力 | 主题入口 | 先记住的一句话 |
| --- | --- | --- |
| 固化方法与新增能力 | [Skill、Extension 与 Package](/guide/skills-extensions-packages) | Skill 教它怎么做，Extension 给它新的运行能力 |
| 选择第三方扩展 | [插件推荐](/plugins/) | 先确认需求和来源，只试一个最接近问题的插件 |
| 多任务分工 | [子 Agent](/guide/subagents) | 分工之后仍需统一证据和最终验收 |
| 安全地执行任务 | [权限、隔离与验收](/guide/safety) | 成功返回不等于业务结果已经完成 |
| 长时间运行 | [VPS 与长期任务](/guide/vps-and-long-running) | 先设计检查点、恢复路径和停止条件 |

## 操作入口

- [安装前检查](/guide/before-install)：确认环境和练习目录。
- [安装并启动 Pi](/guide/install-pi)：完成第一次启动。
- [Windows 中文路径](/guide/windows-setup)：用 Git Bash 完成 Windows 环境准备、安装和第一次启动。
- [登录与模型设置](/guide/connect-model)：连接 Provider 与模型。
- [从练习目录开始](/guide/ready-to-work)：把实验与真实文件隔离。
- [安装后生命周期管理](/guide/lifecycle-management)：更新 Pi、刷新模型目录、退出登录、卸载并处理本地数据。

## 常用命令速查

下面只列主线实际使用的入口。普通终端命令与 Pi 内部命令不要混输。

| 在哪里输入 | 命令 | 用途 |
| --- | --- | --- |
| 普通终端 | `pi` | 在当前目录启动交互界面 |
| 普通终端 | `pi --version` | 查看当前安装版本 |
| 普通终端 | `pi update` | 只更新 Pi 本体 |
| 普通终端 | `pi update --models` | 只刷新模型目录 |
| 普通终端 | `pi list` | 查看设置中登记的 Package |
| 普通终端 | `pi -c` | 继续当前项目最近会话 |
| 普通终端 | `pi -r` | 打开当前项目会话选择器 |
| 普通终端 | `pi --no-extensions -e ./file.ts` | 忽略自动发现的 Extension，只显式加载一个文件 |
| 普通终端 | `pi --no-skills --skill ./SKILL.md` | 忽略自动发现的 Skill，只显式加载一个文件 |
| Pi 编辑区 | `/login` | 管理模型服务认证 |
| Pi 编辑区 | `/logout` | 清除选定 Provider 的本地凭据 |
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

先停止重复尝试并保留完整错误，再核对输入位置、工作目录、当前模型和 Session。随后建立不加载附加资源的干净基线，每次只恢复一个变量。涉及密钥、付费、发布、删除或对外发送时，不自行扩大操作。

[打开完整的 Pi 故障排查手册 →](/reference/troubleshooting)

## 术语边界

- **Provider**：实际提供模型调用与计费的服务，不等同于 Pi 本身。
- **Session**：保存的对话树；它不会替代文件版本管理。
- **Context**：模型这一轮能参考的输入；不等于永久记忆。
- **Skill**：按需读取的工作说明与配套资源；能影响行为，也可能引导执行脚本。
- **Extension**：在 Pi 进程内运行的 TypeScript 能力，拥有当前用户权限。
- **Package**：分发 Skill、Extension、提示模板与主题的组合，不是安全容器。
- **Project Trust**：是否加载项目资源的决定，不是运行时沙箱。

## 延伸阅读

官方授权译文不是主线课程。它们按本版目录作为独立专区保留，从对应章节进入，用原作者的完整文章进一步解释一个机制：

- 学完第 7 课后：[无法随身带走的会话](/translations/session-portability)
- 学完第 8 课后：[Pi 中的压缩机制](/translations/compaction-in-pi)
- 学完第 9 课后：[Agent 中的提示缓存](/translations/prompt-caching)

[查看全部官方授权译文](/translations/)

::: tip 怎么使用参考手册
先用搜索或上面的主题索引定位问题；需要建立完整理解时，再沿着页面顶部的课程归属回到对应章节。
:::
