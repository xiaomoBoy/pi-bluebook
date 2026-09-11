# CASE 08 · 毕业项目需求

## 项目

- GitHub 仓库：`https://github.com/xiaomoBoy/pi-bluebook`
- 技术栈：VitePress
- 工作方式：在本地克隆仓库后完成，不部署、不提交、不推送。

## 目标

为参考手册新增一页“任务完成检查表”，帮助初学者在 Pi 报告完成后，从真实文件、命令结果和线上状态三个层面独立验收。

## 允许修改的文件

1. 新建 `docs/reference/task-completion-checklist.md`
2. 修改 `docs/reference/index.md`
3. 修改 `docs/.vitepress/config/navigation.mts`
4. 新建或更新 `worklog/graduation-checkpoint.md`

除上述路径外，不修改其他项目文件。`worklog/` 是本次本地练习记录，不应加入提交。

## 页面要求

`docs/reference/task-completion-checklist.md` 必须包含：

- VitePress frontmatter：`title` 与 `description`
- 一级标题：`任务完成检查表`
- 四个二级标题：
  - `开始前`
  - `执行中`
  - `完成后`
  - `失败与恢复`
- 至少链接到以下三个现有页面：
  - `/guide/first-task`
  - `/guide/context-and-compaction`
  - `/guide/safety`
- 明确写出：“Agent 的完成报告只是线索，不是完成证明。”

## 导航要求

- 在 `docs/reference/index.md` 增加新页面入口。
- 在 `docs/.vitepress/config/navigation.mts` 的参考手册侧栏增加“任务完成检查表”。
- 不改变其他页面的标题、排序和链接。

## 验收要求

1. `npm run docs:check` 通过。
2. Git 差异只包含本需求允许的项目文件；依赖目录、构建产物与缓存不得进入差异。
3. 新页面能从参考手册首页和侧栏到达。
4. 三个课程链接都能在项目中找到对应页面。
5. 页面四个阶段完整，没有把“Pi 回复完成”写成最终证据。

## 禁止事项

- 不部署网站。
- 不执行 `git add`、`git commit` 或 `git push`。
- 不修改或读取凭据文件。
- 不安装新的 Package、Extension 或系统依赖。
- 不用删除、覆盖或重置整个仓库的方式恢复错误。

如果仓库结构与需求不一致，先把差异写入检查点并停止，不自行扩大修改范围。
