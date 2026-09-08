---
title: 安装 Pi，并第一次打开它
description: 使用官方 npm 命令安装 Pi，确认版本，练习启动和退出。
prev:
  text: 安装前检查
  link: /guide/before-install
next:
  text: 登录与模型设置
  link: /guide/connect-model
---

<span class="library-status">MODULE 01 · STEP 02</span>

# 安装 Pi，并第一次打开它

上一课准备好了终端、空白练习目录、Node.js 和 npm。现在只做一件事，让 `pi` 命令能在这台电脑上正常打开和退出。

## 1. 执行官方安装命令

复制整行命令到终端，然后按回车。

```bash
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
```

`-g` 表示把 Pi 安装成这台电脑可以直接调用的命令。`--ignore-scripts` 会禁止依赖包在安装时运行生命周期脚本；Pi 的正常 npm 安装不需要这些脚本。

安装过程结束后，检查它是否真的可用。

```bash
pi --version
```

看到版本号，而不是 `command not found`，就算通过。本书不把某个具体 Pi 版本当成永久要求，安装命令核验于 2026-09-08，后续以 [Pi 官方 Quickstart](https://pi.dev/docs/latest/quickstart) 为准。

## 2. 第一次启动

先确认仍然在练习目录，再启动 Pi。

```bash
cd ~/Downloads/pi-practice
pwd
pi
```

界面出现后，你会看到可以输入消息的编辑区，下方状态栏会显示当前目录和模型。这时你已从普通终端进入 Pi 交互界面。

如果它提示登录，这不代表安装失败。认证放在下一课处理。

## 3. 学会回到终端

在 Pi 编辑区输入：

```text
/quit
```

回到原来的终端提示符后，再输入一次 `pi`。能再次看到 Pi 界面，说明你已经分清了两个状态。

::: warning 遇到常见失败时
- 安装过程出现 `npm ERR!` 或 `EACCES`，不要直接加 `sudo`。保留完整错误，先确认 Node.js 来自官方 LTS 安装。
- 安装成功后仍提示 `pi: command not found`，完全退出终端并重新打开，再运行 `pi --version`。
- 网络下载失败，检查网络后用同一条官方命令重试一次，先别混用多个安装器。
:::

## 本课验收

- `pi --version` 能返回版本号。
- 我能从 `pi-practice` 目录启动 Pi。
- 我能用 `/quit` 退出，再重新启动。

[下一课，登录账号并选择模型 →](/guide/connect-model)
