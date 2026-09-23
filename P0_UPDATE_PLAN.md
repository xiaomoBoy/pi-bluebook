# Pi 蓝皮书 P0 入门更新计划

核验日期：2026-09-23

## 本轮目标

让第一次接触 Pi 的读者只沿一条入口路线，就能完成“准备环境 → 安装 → 连接模型 → 在练习目录执行任务 → 独立验收”的闭环；同时让 Windows 路线和插件推荐不再依赖过时入口或模糊榜单。

## 任务与完成标准

| 任务 | 实施位置 | 完成标准 | 状态 |
| --- | --- | --- | --- |
| P0-01 · 30 分钟第一次成功 | `docs/guide/start-here.md` | 用阶段、时间预算、完成证据和失败回退串起现有课程 | 已完成 |
| P0-02 · 双官方安装路线 | `docs/guide/install-pi.md`、`docs/guide/lifecycle-management.md` | 同时说明官方安装器与 npm；验证、更新和卸载方法前后一致 | 已完成 |
| P0-03 · Windows 路线选择 | `docs/guide/windows-setup.md` | 对比原生 Git Bash、PowerShell、WSL；为入门路线给出明确默认值和 Shell 验收 | 已完成 |
| P0-04 · 插件推荐分级 | `docs/plugins/index.md` | 明确零插件起步；按首装、按需、进阶分级；刷新 Plannotator 等当前来源 | 已完成 |
| P0-05 · 语言与站点验收 | `docs/zh-TW/`、正式构建产物 | 同步繁体；通过内容、链接、构建、页面检查；抽查桌面和 390px 页面 | 已完成 |

## 编辑规则

- 官方文档决定安装、命令、权限与数据边界；社区讨论只用于判断用户关心什么。
- 动态信息写明核验日期；插件不做永久 Top 榜。
- 不删除现有可验收练习，不把任务提示词描述成沙箱。
- 新手默认不安装第三方 Package；需要时先单次加载、单项验收，再决定永久安装。

## 最终验收页面

- `/guide/start-here`
- `/guide/install-pi`
- `/guide/windows-setup`
- `/guide/connect-model`
- `/guide/ready-to-work`
- `/guide/first-task`
- `/plugins/`
- `/guide/lifecycle-management`

## 执行结果

- `npm run docs:check` 全部通过：简繁结构一致、繁中术语、版本快照、正式构建、SEO 与 129 个生成页面均通过。
- 桌面端已检查入口页与插件页的标题、正文、提示框、导航和表格。
- 390px 已检查入口页、安装页与插件页；页面宽度无整体横向溢出，宽表格保留内部横向滚动，代码块没有超出正文容器。
- 当前内容仅在本地完成，尚未提交、推送或部署，等待最终确认。
