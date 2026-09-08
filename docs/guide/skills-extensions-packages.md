---
title: Skill、Extension 与 Pi Package
description: 用“说明书、可执行功能、打包配送”区分 Pi 的三类扩展方式。
prev:
  text: 提示缓存入门
  link: /guide/prompt-caching
next:
  text: 第一个 Extension
  link: /guide/first-extension
---

<span class="library-status">MODULE 04 · STEP 10 · 初稿</span>

# Skill、Extension 与 Pi Package

刚开始扩展 Pi 时，这三个名字很容易混在一起。它们分别解决工作方法、可执行能力和资源分发三种问题，没有由低到高的等级关系。

| 名称 | 可以理解为 | 适合解决 | 新手何时用 |
| --- | --- | --- | --- |
| Skill | 给 Agent 的专项工作说明书 | 告诉 Pi 应按什么步骤、标准和边界完成任务 | 同一类任务已经做过几次，要固化方法 |
| Extension | 加载进 Pi 的可执行功能 | 新工具、命令、事件处理、界面或自定义行为 | 光靠说明不够，确实需要代码运行 |
| Pi Package | 用来分发一组 Pi 资源的包 | 把 Extension、Skill、提示模板、主题等一起安装和共享 | 自己的组合已稳定，准备在多个项目或多人间复用 |

## 先判断问题属于哪一类

如果你每次写教程都要重新解释“先检查读者是否能独立验收”，这更像 Skill。它的价值在于稳定的工作方法，不一定需要新代码。

如果你想在任务结束时让终端弹出提醒，就需要监听 Pi 事件并调用系统能力。这更像 Extension。

如果你要把提醒 Extension、安装说明、配套 Skill 和默认设置交给另一台电脑，一个 Pi Package 才开始有意义。

## 选择顺序

1. 先在真实任务中手动跑通。
2. 重复出现的步骤和标准，整理成 Skill。
3. 确实缺少可执行能力时，再开发或安装 Extension。
4. 要为多个项目或别人配送时，再考虑 Package。

这个顺序可以避免一个常见问题：任务还没做稳定，先收集了一堆插件和包，最后自己也说不清哪一层在起作用。

::: danger 安装前先阅读
Pi Package 以当前用户的完整系统权限运行。除了可执行的 Extension，Skill 和其他资源也可能引导 Agent 运行命令或产生副作用。不要因为它叫“包”或“社区资源”就直接信任。安装前应审查整个包的来源、资源和安装内容。
:::

### 本章依据

- [Pi Skills](https://pi.dev/docs/latest/skills)
- [Pi Extensions](https://pi.dev/docs/latest/extensions)
- [Pi Packages](https://pi.dev/docs/latest/packages)
- [Skill、Extension 和 Pi Package 的区别](/tweets/#skill-extension-package)
