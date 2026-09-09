---
title: Windows 中文路径：安装并启动 Pi
description: 在 Windows 上用 Git Bash 准备 Node.js、安装 Pi、建立练习目录并完成第一次启动。
prev:
  text: 蓝皮书主线
  link: /guide/
next:
  text: 登录与模型设置
  link: /guide/connect-model
---

<span class="library-status">WINDOWS PATH · 安装与第一次启动</span>

# Windows 中文路径：安装并启动 Pi

你在 Windows 电脑上打开了蓝皮书，却发现第 1、2 课写的是 Mac 终端、`Command` 快捷键和 `/Users/...` 路径。不要把这些命令逐字改成 Windows 格式，也不要同时混用命令提示符、PowerShell、WSL 和 Git Bash。

这条中文路径把 Windows 独有的准备工作集中在一页完成。通过本页验收后，直接进入[第 3 课：登录与模型设置](/guide/connect-model)，再回到共同主线。

::: info 本页采用的路线
Pi 在 Windows 上默认使用 **Git Bash**。官方依次查找自定义 Bash 路径、Git for Windows 的默认安装位置 `C:\Program Files\Git\bin\bash.exe`，最后才查找 PATH 中的其他 `bash.exe`。本页面向第一次安装的读者，只使用官方推荐的 Git for Windows 默认路线，不配置 Cygwin、MSYS2、WSL 或可选 PowerShell 工具。
:::

## 先分清两个输入位置

这一页会在两个地方输入内容：

1. **Git Bash 窗口**：输入 `pwd`、`npm`、`pi` 等普通终端命令。
2. **Pi 底部编辑区**：Pi 打开后输入消息，以及 `/quit` 这样的 Pi 内部命令。

在网页复制代码仍使用 `Ctrl+C`。粘贴到 Git Bash 时可以按 `Shift+Insert`，也可以在窗口中右键选择粘贴。粘贴后先核对整行，再按 `Enter`；不要把代码框外的示例输出一起输入。

输错但还没有按 `Enter` 时，按 `Ctrl+C` 取消当前输入。命令已经开始运行后，不要为了催促它而反复按键。

## 1. 安装并确认 Git Bash

从 [Git for Windows 官方网站](https://git-scm.com/download/win)下载安装程序。第一次使用时保留默认安装位置；本课不要求更改编辑器、终端模拟器或其他高级选项。

安装完成后，关闭旧终端。从 Windows 开始菜单搜索并打开 **Git Bash**。不要打开“命令提示符”，也不要把本页代码先放进 PowerShell。

在 Git Bash 中逐行执行：

```bash
git --version
bash --version | sed -n '1p'
test -f "/c/Program Files/Git/bin/bash.exe" && echo "PASS: Pi 能找到默认 Git Bash"
```

通过时应看到 Git 版本、Bash 版本，最后再看到一行 `PASS`。版本数字可以不同。

如果前两条有版本号、最后一条没有输出，说明 Git Bash 可能装在了其他位置。这不等于 Git 已损坏，但本页的默认路线尚未通过。第一次安装建议重新使用默认位置；已经明确维护自定义环境的读者，再参考 [Pi 官方 Windows 设置](https://pi.dev/docs/latest/windows)配置 `shellPath`。

### 小检查

- [ ] 我打开的是 Git Bash。
- [ ] `git --version` 和 `bash --version` 都有输出。
- [ ] 默认路径检查显示 `PASS`。

## 2. 安装并检查 Node.js

Pi 的 npm 安装方式需要 Node.js 和 npm。从 [Node.js 官方下载页](https://nodejs.org/en/download)下载当前 LTS 版并完成安装。安装结束后，关闭所有 Git Bash 窗口，再重新打开一个新的 Git Bash，让新的 PATH 生效。

执行：

```bash
node --version
npm --version
```

两条命令都应返回版本号，并且 Node.js 不低于 `22.19.0`。最低版本要求核验于 2026-09-09；发布后的变化以 [Pi 官方源码要求](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/package.json)为准。

如果出现 `command not found`，先确认 Node.js 安装程序已经完成，再完全关闭并重开 Git Bash。不要先从网上复制陌生的 PATH 修改命令，也不要在多个 Node.js 安装器之间来回切换。

## 3. 建立 Windows 专用练习目录

Windows 路径常写成 `C:\Users\你的用户名\...`，Git Bash 会把同一个位置显示成 `/c/Users/你的用户名/...`。本书后续命令使用 `/`，这是 Git Bash 的正常写法，不需要改成反斜杠。

在 Git Bash 中建立一个空白练习目录：

```bash
mkdir ~/pi-practice
cd ~/pi-practice
pwd
ls -A
```

`pwd` 应以 `/pi-practice` 结尾；`ls -A` 不显示文件名，才说明目录为空。这个目录通常对应资源管理器里的 `C:\Users\你的用户名\pi-practice`。

如果 `mkdir` 显示 `File exists`，不要直接使用可能留有旧文件的目录。改用新名字并记住它：

```bash
mkdir ~/pi-practice-2
cd ~/pi-practice-2
pwd
ls -A
```

::: warning 为什么不直接使用整个用户目录
练习目录能让任务范围和产物更容易核对，但它不是安全沙箱。Pi 的工具仍以你的 Windows 用户权限运行。不要在 `~`、桌面根目录、整个下载目录或装有真实工作的仓库上层直接启动 Pi。
:::

## 4. 安装 Pi 并确认命令可用

仍在 Git Bash 中执行官方 npm 安装命令：

```bash
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
```

等待命令结束、重新出现可输入行后，再执行：

```bash
pi --version
command -v pi
```

第一条应显示 Pi 版本号，第二条应显示 Git Bash 实际找到的 `pi` 命令位置。安装命令核验于 2026-09-09，后续以 [Pi 官方 Quickstart](https://pi.dev/docs/latest/quickstart) 为准。

如果安装过程出现 `npm ERR!`、`EPERM` 或 `Access is denied`：

- 不要先改用管理员身份反复安装。
- 等命令结束，保存从安装命令到最后一行错误的完整文字。
- 关闭其他可能正在运行的 Pi 或 Node.js 进程，再重开 Git Bash，只用同一条官方命令重试一次。
- 仍然失败时，记录 `node --version`、`npm --version` 和完整错误；不要删除不认识的系统目录。

如果安装完成但 `pi` 显示 `command not found`，完全关闭 Git Bash 后重新打开，再运行 `pi --version`。仍失败时保留 `npm prefix -g` 和错误输出，再进行针对性排查，不要随机追加 PATH。

## 5. 从练习目录第一次启动

确认当前位置后启动 Pi：

```bash
cd ~/pi-practice
pwd
pi
```

如果你使用了 `pi-practice-2`，三处课程中的目录名都要换成自己的实际名字。Pi 打开后，底部状态栏显示的工作目录应与刚才的 `pwd` 一致。

第一次启动可能直接出现登录提示。这表示 Pi 已经启动，认证留到下一课。现在在 **Pi 底部编辑区**输入：

```text
/quit
```

退出后应回到 Git Bash。再执行一次 `pi`，确认能够重新打开；随后可以再次 `/quit`，也可以继续下一课。

## 6. 以后怎样跟随蓝皮书主线

从下一课开始，Windows 用户继续使用 Git Bash，并遵守这组固定替换：

| 主线中的写法 | Windows Git Bash 使用 |
| --- | --- |
| `~/Downloads/pi-practice` | `~/pi-practice` |
| `/Users/你的用户名/...` | `/c/Users/你的用户名/...` |
| `shasum -a 256` | `sha256sum` |
| `Command+C` / `Command+V` | 网页复制用 `Ctrl+C`，Git Bash 粘贴用 `Shift+Insert` |

`curl`、`sed`、`find`、`test` 等后续练习命令继续在 Git Bash 中执行。看到蓝皮书写“普通终端”时，Windows 用户应理解为“Git Bash”。

Pi 官方还提供可选的 `powershell` 工具，但它不是本书入门路线的前置条件。即使启用该工具，Pi 编辑区里的 `!` 和 `!!` 仍使用 Bash。先把一条路线跑通，再决定是否增加第二种 Shell。

## 本页验收

- Git Bash 的 Git、Bash 和默认路径检查全部通过。
- `node --version` 不低于本页要求，`npm --version` 有输出。
- 我建立了空白的 `~/pi-practice`，并能说出它对应的 Windows 路径。
- `pi --version` 有输出，`command -v pi` 能找到命令。
- 我能从练习目录打开 Pi，用 `/quit` 回到 Git Bash，再重新打开。
- 我知道后续课程中的路径和指纹命令应怎样替换。

通过后，不需要再照抄 macOS 的第 1、2 课，直接继续登录。

[下一课，登录账号并选择模型 →](/guide/connect-model)

已经安装完成、现在需要升级或卸载？查看 [安装后生命周期管理](/guide/lifecycle-management)。

### 本页依据

- [Pi 官方 Windows 设置](https://pi.dev/docs/latest/windows)
- [Pi 官方 Quickstart](https://pi.dev/docs/latest/quickstart)
- [Git for Windows](https://git-scm.com/download/win)
- [Node.js 下载页](https://nodejs.org/en/download)

页面中的动态要求核验于 2026-09-09。Pi、Node.js 或 Git for Windows 更新后，应优先复查上述官方页面。
