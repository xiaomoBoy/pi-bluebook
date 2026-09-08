---
title: 进入练习目录，确认基础设置
description: 理解当前目录、模型和项目信任，通过安装模块的最终验收。
prev:
  text: 登录与模型设置
  link: /guide/connect-model
next:
  text: 第一次任务
  link: /guide/first-task
---

<span class="library-status">MODULE 01 · STEP 04</span>

# 进入练习目录，确认基础设置

安装和登录已经完成，现在还需要确认 Pi 会从哪里开始工作。这一步会直接影响它看到的项目内容，也决定下一课的练习文件放在哪里。

## 1. 从明确的目录启动

先在 Pi 中输入 `/quit` 回到终端，再执行：

```bash
cd ~/Downloads/pi-practice
pwd
pi
```

`pwd` 的结果应当以 `/Downloads/pi-practice` 结尾。Pi 打开后，再看一眼底部状态栏，确认当前工作目录没有变。

如果目录不对，不要发送任务。退出 Pi，回到终端重新 `cd` 到正确位置。

## 2. 只检查现在需要的设置

输入 `/model`，确认已经选中一个可用模型。如果需要更改，在列表中选择；希望下次继续使用时，按 `Ctrl+S` 保存为默认模型。

输入 `/settings` 可以打开常用设置。这一阶段保持默认值就够了。主题、会话压缩和其他选项会在真正遇到需求时再讲。

## 3. 正确理解项目信任

全新空目录通常不会出现项目信任提示。当目录里存在项目级 `.pi` 配置、Extension、Skill 或其他项目资源时，Pi 才可能询问是否信任。

只信任你自己创建或已经检查的项目。对来源不明的仓库，先拒绝加载项目资源，再检查 `.pi/` 和 `.agents/skills/`。

::: danger Project Trust 不是沙箱
拒绝项目资源，不会把 Pi 限制在当前目录。内置的读取、写入、编辑和命令工具仍以当前用户权限运行。需要真正隔离时，应使用容器、虚拟机或策略沙箱。
:::

## 4. 做最终检查

在进入第一个文件任务前，逐项确认：

- [ ] 我能打开终端，用 `pwd` 看到当前位置。
- [ ] `node --version`、`npm --version` 和 `pi --version` 都返回版本号。
- [ ] 我只在空白的 `pi-practice` 目录运行 Pi。
- [ ] 底部状态栏显示正确的工作目录和模型。
- [ ] 我已经收到一次无工具调用的模型回复。
- [ ] 我知道用 `Esc` 中止生成，用 `/quit` 退出 Pi。

能做到这些，就已经具备了第一次任务的前置条件。

[下一课，整理会议记录并独立验收 →](/guide/first-task)

### 本模块依据

- [Pi Quickstart](https://pi.dev/docs/latest/quickstart)
- [Pi 使用说明](https://pi.dev/docs/latest/usage)
- [Pi 设置说明](https://pi.dev/docs/latest/settings)
- [Pi 安全说明](https://pi.dev/docs/latest/security)
