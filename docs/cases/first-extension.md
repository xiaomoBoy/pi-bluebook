---
title: CASE 04 · 加载最小 Extension
description: 审查、加载、执行并停用一个只注册界面命令的教学 Extension。
prev: { text: CASE 03 · 第一个 Skill, link: /cases/first-skill }
next: { text: CASE 05 · 独立分工, link: /cases/independent-review }
---

<span class="library-status">CASE 04 · 可练习</span>

# 加载最小 Extension

## 结果

显式加载 `bluebook-check.ts`，执行 `/bluebook-check` 看见预期提示，再以不带 `-e` 的启动方式确认它已停用。

## 固定材料

- Extension：<a href="/examples/extension/bluebook-check.ts" download>下载 bluebook-check.ts</a>

这份代码不读写文件、不访问网络，只注册一个命令。仍然要先阅读全文，因为任何 Extension 都以 Pi 进程的用户权限运行。

## 1. 下载并审查

```bash
cd ~/Downloads/pi-practice
mkdir -p bluebook-examples
curl -fL https://pi.xiaomovps.com/examples/extension/bluebook-check.ts \
  -o bluebook-examples/bluebook-check.ts
sed -n '1,160p' bluebook-examples/bluebook-check.ts
```

Windows 用户把第一行换成 `cd ~/pi-practice`。实际文件应该只有一个导入、默认函数和 `registerCommand`，没有网络或文件操作；内容不一致时停止。

## 2. 加载并执行

在普通终端运行：

```bash
pi --no-extensions -e ./bluebook-examples/bluebook-check.ts
```

进入 Pi 后输入：

```text
/bluebook-check
```

预期出现“蓝皮书 Extension 已加载；本命令没有读取或修改文件。”这条 Pi 界面提示。

![最小 Extension 的真实加载与执行结果](/images/06-Pi-Extension执行结果-实操图.png)

固定提示出现后只完成了“加载并执行”这一半；案例还要求退出，再用不带 `-e` 的方式重启确认命令消失。

## 3. 停用

输入 `/quit` 回到普通终端，再运行：

```bash
pi --no-extensions
```

此时 `/bluebook-check` 不应继续出现。如果仍然存在，检查本次命令是否还带 `-e`，以及项目或用户 Extension 目录是否另有同名文件；不要删除来源不明的文件。

[第 11 课](/guide/first-extension)继续解释桌面通知为什么需要真实系统证据；本案例只验收最小命令的加载、执行和停用。

## 关键现象

同一个命令只在显式传入教学 Extension 时出现，退出并用 `--no-extensions` 重启后消失。这一对照证明的是本次加载与停用链路，不代表任何系统通知已经出现。

## 独立验收

- `pi --no-extensions -e <文件>` 启动后，命令可执行并显示固定提示。
- 不带 `-e` 重启后，教学命令不再可用。
- 加载错误可以通过不加载该文件恢复，练习材料和会话不需要删除。

## 再走一步：改成自己的命令

复制原文件，保留可以比较的基线：

```bash
cp bluebook-examples/bluebook-check.ts bluebook-examples/bluebook-check-custom.ts
```

打开新文件，只修改两处：把 `registerCommand` 的命令名改为 `bluebook-check-custom`；把通知文字改为“自定义核对完成；请继续检查真实产物。”不要增加文件、网络或系统调用。

先退出旧进程，再加载副本：

```bash
pi --no-extensions -e ./bluebook-examples/bluebook-check-custom.ts
```

在 Pi 中执行 `/bluebook-check-custom`，应看到自己的新文字。旧的 `/bluebook-check` 不应在本次命令列表中注册。退出后以 `pi --no-extensions` 重启，两个教学命令都不应注册。

对照修改前后的两处差异：命令名决定怎样调用，通知文字决定可观察的结果。真实桌面通知还需要系统接口和前后台判断，见[第 11 课](/guide/first-extension)的进阶边界。

## 失败恢复

保留完整加载错误与文件路径。不要把文件复制到多个自动发现目录反复尝试；先用 `--no-extensions` 回到干净状态，再核对下载内容。
