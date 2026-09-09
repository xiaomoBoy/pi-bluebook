---
title: CASE 03 · 加载最小 Extension
description: 审查、加载、执行并停用一个只注册界面命令的教学 Extension。
prev: { text: CASE 02 · 第一个 Skill, link: /cases/first-skill }
next: { text: CASE 04 · 独立分工, link: /cases/independent-review }
---

<span class="library-status">CASE 03 · 可练习</span>

# 加载最小 Extension

## 结果

显式加载 `bluebook-check.ts`，执行 `/bluebook-check` 看见预期提示，再以不带 `-e` 的启动方式确认它已停用。

## 材料与步骤

- Extension：<a href="/examples/extension/bluebook-check.ts" download>下载 bluebook-check.ts</a>
- 完整步骤：[第 11 课 · Extension 的需求与验收](/guide/first-extension)

这份代码不读写文件、不访问网络，只注册一个命令。仍然要先阅读全文，因为任何 Extension 都以 Pi 进程的用户权限运行。

![最小 Extension 的真实加载与执行结果](/images/06-Pi-Extension执行结果-实操图.png)

固定提示出现后只完成了“加载并执行”这一半；案例还要求退出，再用不带 `-e` 的方式重启确认命令消失。

## 验收

- `pi --no-extensions -e <文件>` 启动后，命令可执行并显示固定提示。
- 不带 `-e` 重启后，教学命令不再可用。
- 加载错误可以通过不加载该文件恢复，练习材料和会话不需要删除。

## 失败恢复

保留完整加载错误与文件路径。不要把文件复制到多个自动发现目录反复尝试；先用 `--no-extensions` 回到干净状态，再核对下载内容。
