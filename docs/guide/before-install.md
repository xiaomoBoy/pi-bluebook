---
title: 安装前，先把终端和环境准备好
description: 打开终端，建立安全的练习目录，检查 Node.js 和 npm。
prev:
  text: 首页
  link: /
next:
  text: 安装并启动 Pi
  link: /guide/install-pi
---

<span class="library-status">MODULE 01 · 安装与基础设置</span>

# 安装前，先把终端和环境准备好

安装说明里经常只有一行命令，初学者却容易卡在更早的地方。命令应该输入在哪里？现在站在哪个目录？电脑里有没有 Pi 需要的运行环境？

这一课只处理这三件事。先不安装 Extension、Skill 或第三方 Package，也不把真实文件放进练习区。

::: info 本课环境
主线按 macOS 编写，Linux 可以使用同样的检查命令。Windows 的终端和路径不同，请先参考 [Pi 官方 Windows 设置](https://pi.dev/docs/latest/windows)，不要直接改写本页命令。
:::

## 1. 打开正确的输入位置

在 Mac 上按 `Command + Space`，输入“终端”，再按回车。看到带有光标的窗口后，输入下面这行并按回车。

```bash
pwd
```

`pwd` 的意思是“我现在在哪里”。看到一条以 `/Users/`开头的路径，就说明终端已经可以接收命令。

## 2. 新建一个专用练习目录

不要在下载目录根目录、Obsidian 知识库或正在工作的代码仓库里启动 Pi。先给它准备一个空白练习区。

```bash
mkdir ~/Downloads/pi-practice
cd ~/Downloads/pi-practice
pwd
```

最后一行输出应当以 `/Downloads/pi-practice` 结尾。

如果第一条命令提示 `File exists`，先不要进入那个目录。它可能保留着旧练习内容。换一个新名字，例如 `pi-practice-2`，重新执行上面的三个动作。后续课程里出现 `pi-practice` 时，也要换成你实际使用的名字。

## 3. 检查 Node.js 和 npm

Pi 的 npm 安装方式需要 Node.js 和 npm。在练习目录运行：

```bash
node --version
npm --version
```

两行都返回版本号，而且 Node.js 不低于 `22.19.0`，就可以进入下一课。这个最低版本要求核验于 2026-09-08，发布后请以 [Pi 官方源码要求](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/package.json) 为准。

如果看到 `command not found`，或 Node.js 版本太低，请先从 [Node.js 官方下载页](https://nodejs.org/en/download) 安装当前 LTS 版。安装后完全退出终端，重新打开，再执行这两条检查命令。

::: warning 先别这样做
不要为了跳过权限错误随意在 npm 命令前加 `sudo`，也不要随机执行网上的 PATH 修复命令。保留完整报错，后面才能准确判断问题。
:::

## 本课验收

- 我能打开终端，并用 `pwd` 查看当前位置。
- 我新建了一个空白的 `pi-practice` 目录。
- `node --version` 和 `npm --version` 都返回了可用版本号。

[下一课，安装并启动 Pi →](/guide/install-pi)
