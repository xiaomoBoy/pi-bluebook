---
title: Skill、Extension 与 Pi Package
description: 用“说明书、可执行功能、打包配送”区分 Pi 的三类扩展方式。
prev:
  text: 提示缓存入门
  link: /guide/prompt-caching
next:
  text: Extension 的需求与验收
  link: /guide/first-extension
---

<span class="library-status">MODULE 04 · STEP 10 · 可练习</span>

# Skill、Extension 与 Pi Package

刚开始扩展 Pi 时，这三个名字很容易混在一起。它们分别解决工作方法、可执行能力和资源分发三种问题，没有由低到高的等级关系。

| 名称 | 可以理解为 | 适合解决 | 新手何时用 |
| --- | --- | --- | --- |
| Skill | 按需加载的专项能力包 | 提供工作流说明，也可带脚本、资源和参考文档 | 同一类任务已经做过几次，要固化方法 |
| Extension | 加载进 Pi 的可执行功能 | 新工具、命令、事件处理、界面或自定义行为 | 光靠说明不够，确实需要代码运行 |
| Pi Package | 用来分发一组 Pi 资源的包 | 把 Extension、Skill、提示模板、主题等一起安装和共享 | 自己的组合已稳定，准备在多个项目或多人间复用 |

## 先判断问题属于哪一类

如果你每次写教程都要重新解释“先检查读者是否能独立验收”，这更像 Skill。它的价值在于稳定的工作方法，不一定需要新代码。

如果你想在任务结束时让终端弹出提醒，就需要监听 Pi 事件并调用系统能力。这更像 Extension。

如果你要把提醒 Extension、配套 Skill、提示模板和主题交给另一台电脑，一个 Pi Package 才开始有意义。

## 选择顺序

1. 先在真实任务中手动跑通。
2. 重复出现的步骤和标准，整理成 Skill。
3. 确实缺少可执行能力时，再开发或安装 Extension。
4. 要为多个项目或别人配送时，再考虑 Package。

这个顺序可以避免一个常见问题：任务还没做稳定，先收集了一堆插件和包，最后自己也说不清哪一层在起作用。

## 实操：只加载一个教学 Skill

本课沿用第 5 课的虚构会议记录。你会加载一份只有文字规则的 Skill，让 Pi 按固定字段核对行动清单。它不会新增系统权限，但其中的说明仍会影响 Agent 的行为，所以你必须先阅读内容。

### 1. 下载并检查

在普通终端进入 `pi-practice`，下载教学文件：

```bash
mkdir -p bluebook-examples/action-list-review
curl -fL https://pi.xiaomovps.com/examples/skill/action-list-review/SKILL.md \
  -o bluebook-examples/action-list-review/SKILL.md
```

先打开或在终端查看 `bluebook-examples/action-list-review/SKILL.md`。你应该看到两项元数据 `name`、`description`，以及六条只围绕读取、整理和核对会议记录的规则。若文件为空、内容不是纯文本，或要求运行与任务无关的命令，停止，不加载。

### 2. 显式加载

下面这条命令输入在普通终端。`--no-skills` 先忽略其他自动发现的 Skill，`--skill` 再只加入本课这一个文件：

```bash
pi --no-skills --skill ./bluebook-examples/action-list-review/SKILL.md
```

![显式加载教学 Skill，并在 Pi 编辑区准备调用](/images/05-Pi-Skill显式加载-实操图.png)

截图同时保留两处证据：顶部启动命令明确指定了 Skill 路径，启动信息中的 `[Skills]` 列出了 `action-list-review`。底部调用尚未提交，因此这张图证明“加载并准备显式调用”，不证明后续文件已经生成。

进入 Pi 后，如果 `/skill:` 命令可用，输入下面这段可以强制加载指定 Skill；若命令未出现，先在 `/settings` 中启用 Skill commands，再重新输入：

```text
/skill:action-list-review 请重新核对 input/项目会议记录.md，
把结果写入 output/行动清单-复核版.md。不要修改输入文件；原文没有的信息写“原文未说明”。
```

Pi 启动时只把 Skill 的名称与描述放进上下文，完整说明按需加载；官方也提醒模型不一定每次自动读取，所以本课使用显式 `/skill:action-list-review`。这仍不等于系统一定替你执行了所有检查。观察 Pi 是否实际读取指定输入、写入指定输出；完成后仍要独立检查文件。

### 3. 验收和停用

退出 Pi 后，在普通终端执行：

```bash
test -f output/行动清单-复核版.md && echo "PASS: 复核版存在"
grep -c '^## ' output/行动清单-复核版.md
```

第一条应出现 `PASS`。第二条用于辅助计数；如果你的标题格式不同，应直接打开文件确认恰好三项，而不能只依赖这个数字。

这个 Skill 没有安装到全局或项目自动发现目录。下次直接运行 `pi` 时，它不会因为本课命令而继续加载。要再次使用，就重新带上 `--skill`；要停用，只需退出本次 Pi，不再传入该参数。

::: tip 项目级放置位置
当你已经读懂并想让同一项目自动发现它时，可放入 `.pi/skills/action-list-review/SKILL.md`。项目资源只有在项目被信任后才会加载。初次学习先用显式 `--skill`，更容易看清来源与范围。
:::

::: danger 安装前先阅读
Pi Package 以当前用户的完整系统权限运行。除了可执行的 Extension，Skill 和其他资源也可能引导 Agent 运行命令或产生副作用。不要因为它叫“包”或“社区资源”就直接信任。安装前应审查整个包的来源、资源和安装内容。
:::

### 本章依据

- [Pi Skills](https://pi.dev/docs/latest/skills)
- [Pi Extensions](https://pi.dev/docs/latest/extensions)
- [Pi Packages](https://pi.dev/docs/latest/packages)
- [Skill、Extension 和 Pi Package 的区别](/tweets/#skill-extension-package)

以上动态行为核验于 2026-09-09。教学 Skill 已在本机 Pi 0.80.10 中验证为临时加载，并出现在 `skill:action-list-review` 命令列表；Pi 的资源位置和命令可能更新，以对应官方页面为准。
