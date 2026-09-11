---
title: CASE 08 · 毕业项目
description: 在一个真实 GitHub 项目里串联需求、Session、Context、Skill、检查点、独立审阅与人工验收。
prev: { text: CASE 07 · 安全审阅, link: /cases/safe-review }
next: { text: 回到课程, link: /guide/ }
---

<span class="library-status">CASE 08 · 毕业项目</span>

# Pi 蓝皮书毕业项目

## 结果

你会把一个真实 GitHub 项目交给 Pi：先读需求和仓库，再用命名 Session 制定方案；人工批准后修改文件、运行测试、保存检查点；最后让另一个只读 Session 使用 Review Skill 独立复核，再由你完成最终验收。

项目不大，但链路完整。毕业标准不是“Pi 成功写了一篇文档”，而是你能解释每一步的边界，并用项目里的真实证据判断它是否完成。

<img class="diagram-figure" src="/images/diagrams/graduation-project-flow.svg" alt="CASE 08 三方验收工作流：学习者批准计划和最终验收，Pi 主 Session 实施，独立审阅 Session 只读复核" />

这张图有三条硬规则：主 Session 不能批准自己的计划，审阅 Session 不能修改文件，最后是否通过由人判断。

## 这次要改什么

练习仓库使用 [Pi 学习蓝皮书](https://github.com/xiaomoBoy/pi-bluebook)。任务是在参考手册中新增“任务完成检查表”，同时接入首页与侧栏。需求刻意限制为三个网站文件和一个本地检查点，足以练习真实项目流程，又不会把注意力带到复杂业务代码上。

先下载三份固定材料：

- <a href="/examples/graduation-project/requirements.md" download>毕业项目需求</a>
- <a href="/examples/graduation-project/checkpoint-template.md" download>检查点模板</a>
- <a href="/examples/graduation-project/bluebook-graduation-review/SKILL.md" download>独立审阅 Skill</a>

::: warning 安全边界
始终在新克隆的练习仓库中操作。全程不部署，不执行 `git add`、`git commit` 或 `git push`，也不读取凭据。命令里的工具白名单会减少可用工具，但不是操作系统沙箱。
:::

## 第 0 阶段 · 准备隔离副本

在普通终端执行：

```bash
cd ~/Downloads
git clone https://github.com/xiaomoBoy/pi-bluebook.git pi-bluebook-graduation
cd pi-bluebook-graduation
npm ci
git status --short
```

如果 `pi-bluebook-graduation` 已存在，换一个新目录名，不要覆盖旧目录。初始 `git status --short` 应该没有输出。

把三份材料放在仓库旁边，而不是放进仓库：

```bash
cd ..
mkdir -p pi-bluebook-graduation-materials/bluebook-graduation-review
curl -fL https://pi.xiaomovps.com/examples/graduation-project/requirements.md \
  -o pi-bluebook-graduation-materials/requirements.md
curl -fL https://pi.xiaomovps.com/examples/graduation-project/checkpoint-template.md \
  -o pi-bluebook-graduation-materials/checkpoint-template.md
curl -fL https://pi.xiaomovps.com/examples/graduation-project/bluebook-graduation-review/SKILL.md \
  -o pi-bluebook-graduation-materials/bluebook-graduation-review/SKILL.md
cd pi-bluebook-graduation
```

打开三份材料检查内容。需求文件是验收合同，模板规定检查点字段，Skill 只规定审阅方法；任何一份都不应包含安装或部署指令。

## 第 1 阶段 · 建立主 Session，只做计划

启动一个有名字的 Session：

```bash
pi --name "CASE 08 毕业项目" --no-extensions --no-skills \
  --tools read,write,edit,grep,find,ls,bash
```

这里先关闭自动发现的 Skill 和 Extension，避免未知资源改变主任务行为。没有安装 Extension 不是漏做一课，而是根据需求判断“现有工具已经足够”。进入 Pi 后发送：

```text
读取 ../pi-bluebook-graduation-materials/requirements.md 和
../pi-bluebook-graduation-materials/checkpoint-template.md。
检查当前仓库的 README、package.json、参考手册首页、VitePress 导航配置，
以及需求提到的三个课程页面。

这一轮只做两件事：
1. 把你确认的目标、允许路径、项目检查命令、风险和唯一下一步写入
   worklog/graduation-checkpoint.md；
2. 向我汇报实施计划。

不要修改网站文件，不要运行构建，不要部署，不要安装依赖，
不要执行 git add、git commit、git push 或其他 Git 写操作。完成后停止，等我批准。
```

### 第一次人工门

不要直接回复“继续”。先退出或另开一个普通终端，检查：

```bash
git status --short
sed -n '1,220p' worklog/graduation-checkpoint.md
```

此时只应出现 `worklog/`。检查点应准确列出三个网站文件、一个本地记录、项目自带检查命令和禁止动作；仓库结构不一致的地方必须写成未知。范围正确后，才批准实施。

## 第 2 阶段 · 在同一 Session 实施

继续刚才的 Session；如果已经退出，可在仓库目录执行 `pi --resume` 选择“CASE 08 毕业项目”。然后发送：

```text
计划已批准。继续读取需求和 worklog/graduation-checkpoint.md，
只实施需求允许的三个网站文件。

完成后运行 npm run docs:check、git diff --check 和 git status --short，
把真实命令结果、实际变更、失败或未知写回检查点。
如果检查失败，只做需求范围内的最小修正；如果需要扩大范围，停止并说明原因。

不要部署，不要安装依赖，不要执行 git add、git commit、git push 或其他 Git 写操作。
```

这一步会让 Context 明显变长：需求、项目说明、被读取的文件、工具调用、命令结果和修改差异都会进入当前任务链。Session 保存完整事件，模型当前实际收到的是由活动分支重建的 Context；两者不是同一个概念。

### Context 快满时怎么办

不要为了展示概念而强行压缩。只有底部提示接近模型上限，或 Pi 自动触发 Compaction 时，才这样处理：

1. 先让 Pi 更新 `worklog/graduation-checkpoint.md`；
2. 需要时执行 `/compact`；
3. 压缩后要求 Pi 重新读取需求和检查点，再说明唯一下一步；
4. 人工核对摘要有没有丢失允许路径、禁止动作和失败记录。

Compaction 会把较早内容整理成摘要并保留较新的消息，不会替代磁盘上的检查点。缓存命中只影响复用输入与成本，也不能当作任务完成证据。

## 第 3 阶段 · 启动独立只读审阅

主 Session 的“全部完成”只能当线索。另开一个普通终端，在同一个练习仓库启动第二个 Session：

```bash
pi --name "CASE 08 独立审阅" --no-extensions --no-skills \
  --skill ../pi-bluebook-graduation-materials/bluebook-graduation-review/SKILL.md \
  --tools read,grep,find,ls,bash
```

`--no-skills` 关闭自动发现，显式 `--skill` 仍会加载指定 Skill。审阅 Session 没有 `write` 和 `edit`，职责上相当于只读 Sub-agent：它只交付发现，不替主 Session 修正。发送：

```text
使用 bluebook-graduation-review 审阅当前工作树。
需求文件是 ../pi-bluebook-graduation-materials/requirements.md。

bash 只允许运行 git status --short、git diff、git diff --check 和 npm run docs:check；
不得写文件、部署、安装依赖或执行 Git 写操作。
逐项给出通过、失败或证据不足，并附路径与行号。
```

一份可信审阅不应该只说“通过”。例如，它可以确认当前差异只包含允许路径，却无法仅凭最终工作树证明过去从未执行过某个禁止命令；后一项应该诚实标为“证据不足”。

## 第 4 阶段 · 处理发现并更新检查点

把审阅结果交回主 Session。没有发现就不要为了制造工作量而修改；有失败项时，只修正会阻塞需求的问题：

```text
这是独立审阅结果：
（粘贴审阅结果）

重新读取需求和检查点。只处理失败项；“证据不足”不得改写成“已证明”。
修正后重新运行受影响的检查并更新检查点。若没有阻塞项，不修改网站文件。
```

这个来回就是最小的 Sub-agent 协作闭环：主 Session 对实现负责，审阅 Session 对发现负责，人对范围和最终判断负责。

## 第 5 阶段 · 人工毕业验收

最后不要问 Pi“真的完成了吗”。在普通终端亲自执行：

```bash
npm run docs:check
git diff --check
git status --short
git diff -- docs/reference/task-completion-checklist.md \
  docs/reference/index.md docs/.vitepress/config.mts
```

逐项打开并确认：

- 新页面有 frontmatter、一个一级标题和四个指定二级标题；
- 三个课程链接在项目中都有对应页面；
- 参考手册首页和侧栏指向同一个新地址；
- 检查结果来自这次真实运行，不是复制的文字；
- `worklog/` 仍是本地记录，没有进入提交；
- 没有构建产物、依赖目录或缓存混入 Git 状态。

如果还要检查视觉结果，执行 `npm run docs:dev`，打开终端显示的本地地址，再进入“参考手册 → 任务完成检查表”。本案例禁止部署，所以线上状态应该写“未部署”，不能虚构线上通过。

## 维护者真实复现记录

这套流程在一个全新克隆中用 Pi `0.80.10` 实际跑过一次，日期为 2026 年 9 月 11 日：

- 主 Session 先只生成检查点，经人工核对后才实施；
- 第二轮只修改三个网站路径，并更新本地 `worklog/`；
- `npm run docs:check` 与 `git diff --check` 均真实通过；
- SEO 检查报告 `52 indexable pages`；
- 独立只读 Session 逐项审阅后没有发现范围外变化和验收阻塞项；
- 审阅者把“无法从工作树证明全部历史操作”保留为证据不足。

![隔离克隆中实际生成的任务完成检查表页面，参考手册首页和侧栏均已出现入口](/images/cases/graduation-project-output.png)

<small>真实练习输出截图：全新克隆在本地运行，页面没有部署，也没有提交。</small>

这些结果证明练习要求可以完成，不代表你的运行自动通过。版本、仓库内容和本地环境变化后，仍以你当次看到的文件和命令结果为准。

## 前 14 课在这里怎样汇合

| 已学内容 | 在毕业项目中的动作 |
| --- | --- |
| 第 1–4 课：安装、模型、工作目录 | 检查 Pi、进入全新克隆，并确认起始状态 |
| 第 5–7 课：任务、文件、Session | 读取需求与仓库，用命名 Session 分两轮完成 |
| 第 8–9 课：Context、Compaction、Cache | 观察上下文增长，先写检查点，必要时才压缩；不把缓存当完成证据 |
| 第 10–12 课：Skill、Extension、Sub-agent | 主任务判断无需 Extension；审阅时显式加载只读 Skill，并隔离第二个 Session |
| 第 13–14 课：长任务、安全与验收 | 保存检查点、限制路径和动作、独立运行检查、保留未知 |

## 毕业判定

同时满足下面五项才算完成：

1. **范围通过：** 只出现需求允许的路径；
2. **过程通过：** 先计划、人工批准、再实施，检查点能支持中断恢复；
3. **结果通过：** 项目检查与差异检查由你亲自运行并通过；
4. **审阅通过：** 独立 Session 没有修改权限，发现被逐项处理；
5. **解释通过：** 你能说明 Session 与 Context、Skill 与 Extension、压缩与检查点、Agent 自述与真实证据的区别。

如果你只能展示最终页面，却说不清中间的边界，这次任务完成了，但课程还没有毕业。

## 失败恢复

- 计划阶段出现网站文件变化：立刻停止，记录差异；不要用覆盖整个仓库的方式恢复。
- 构建失败：保留完整错误、当前差异和检查点，只修最小问题。
- Context 丢失关键约束：让 Pi 重新读取需求与检查点，不凭记忆继续。
- 审阅发现范围外变化：先查明来源；无法区分已有变化与本次变化时写“证据不足”。
- 任务中断：重新克隆不是第一选择；先用 Session、检查点和真实 Git 状态恢复现场。

## 依据

- [Pi 使用说明：Session、工具与资源参数](https://pi.dev/docs/latest/usage)
- [Pi Skills：显式加载与渐进披露](https://pi.dev/docs/latest/skills)
- [Pi Compaction：触发条件与上下文重建](https://pi.dev/docs/latest/compaction)
- [Pi Sessions：保存、续写与恢复](https://pi.dev/docs/latest/sessions)
