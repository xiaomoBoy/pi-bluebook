---
title: 从零开始操作
description: 按你的当前状态选择最短路径，完成第一个 Pi 文件任务，再进入系统学习。
prev: { text: 首页, link: / }
next: { text: 安装前检查, link: /guide/before-install }
---

# 从零开始操作

先让 Pi 帮你整理一份虚构会议记录，得到可以亲自检查的行动清单。你不需要先读完作者故事、全部术语或插件推荐。

这页只负责带路，具体操作以对应课程为准。完成一个阶段，就用右侧的完成标志判断是否继续。

## 找到你现在的位置

| 当前状态 | 从哪里开始 | 完成标志 |
| --- | --- | --- |
| Mac 上还没装 Pi | [安装前检查](/guide/before-install) → [安装 Pi](/guide/install-pi) | Node.js、npm 和 Pi 能返回版本号，能启动和退出 |
| Windows 上还没装 Pi | [Windows Git Bash 路径](/guide/windows-setup) | 在 Git Bash 中建立练习目录，并启动 Pi |
| 已安装，但还不能回复 | [登录与模型设置](/guide/connect-model) | 确认访问方式和费用，收到一次真实回复 |
| 已经能收到回复 | [从练习目录开始](/guide/ready-to-work) → [第一次任务](/guide/first-task) | 产生行动清单，三条事项完整，输入文件未变 |

Linux 用户可以跟随 macOS/Linux 通用命令，文件指纹使用 `sha256sum`。本书不提供 Linux 桌面界面的逐屏教程。

## 第一次成功应该留下什么

- `input/项目会议记录.md`：你亲自检查过的固定材料。
- `output/行动清单.md`：包含事项、负责人、截止日期和风险提醒。
- 输入指纹校验通过，输出恰好包含三条事项。

文件不存在、字段遗漏或输入被改动，都应回到[第一次任务的验收步骤](/guide/first-task)，不要仅凭模型说“完成了”继续。

## 做完以后怎么选

想理解刚才发生了什么，继续读[文件与工作目录](/guide/files-and-context)、[会话保存](/guide/sessions)，再跟随[完整主线](/guide/)。想先建立概念全貌，可以回到[导论](/guide/introduction)和[Pi 工作原理](/guide/how-pi-works)。

完成基础课程后，用[内容整理迁移练习](/cases/content-workflow)处理相互冲突的资料，或用[小型代码修复](/cases/code-repair)练习“先复现失败，再验证修复”。学完第 14 课后进入[毕业项目](/cases/graduation-project)，把前面的方法串成一次完整工作流。

## 卡住时先缩小问题

启动不了，查[启动故障](/reference/troubleshooting#cannot-start)；没有模型，查[模型与认证](/reference/troubleshooting#model-missing)；找不到产物，查[文件与目录错误](/reference/troubleshooting#wrong-files)。求助时带上章节、操作系统、Pi 版本、执行位置和去除凭据后的错误文字。
