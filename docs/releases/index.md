---
title: Pi 版本更新记录
description: 按版本号、年份、变更类型和主题检索 Pi Coding Agent 的完整官方更新记录。
aside: false
lastUpdated: false
---

<span class="library-status">RELEASE ARCHIVE · 官方版本记录快照</span>

# Pi 版本更新记录

查某个功能从哪一版出现、一次升级改了什么，或者某个报错是否已经修复，不必再从几千行更新日志里逐段翻找。

本页把 Pi Coding Agent 官方 `CHANGELOG.md` 整理成可检索档案。**版本号、发布日期和英文变更明细均来自官方记录**；中文只用于检索标签、分类和五个关键节点说明，不把推测补成官方事实。官方 Changelog 目前从 `0.10.0` 开始，本页不虚构更早版本的更新内容。

<PiReleaseExplorer />

## 数据边界与维护方式

- 事实源：[Pi Coding Agent 官方 Changelog](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/CHANGELOG.md)。每条版本记录都可以回到对应官方原文核对。
- 页面保存经过核验的本地快照，网站构建不依赖浏览器临时请求 GitHub；断网时仍能查询已经收录的版本。
- 更新数据时运行 `npm run sync:pi-releases`，再同步繁体页面并执行完整检查。页面会显示本次快照的核验日期。
- 官方英文记录按上游仓库许可使用；本页的中文分类和关键节点说明属于蓝皮书整理内容。项目许可边界见[内容许可](https://github.com/xiaomoBoy/pi-bluebook/blob/main/LICENSE-CONTENT.md)。

如果你准备升级 Pi，先阅读[更新、退出登录与卸载](/guide/lifecycle-management)，记录当前 `pi --version`，再对照这里检查目标版本的 Breaking Changes 和迁移说明。
