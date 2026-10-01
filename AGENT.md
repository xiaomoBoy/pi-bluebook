# Pi 学习蓝皮书项目说明

## 项目定位

这是一本面向中文初学者的非官方 Pi 学习手册，使用 VitePress 构建。内容从安装、登录和第一次任务开始，逐步讲解文件与会话、上下文、Skill、Extension、子 Agent、长任务与安全验收。

写作目标是让读者不仅知道“怎么操作”，还知道每一步应看到什么、如何判断任务是否真正完成。当前课程主要以 macOS 为操作环境。

## 先读哪份文件

| 任务 | 依据 |
| --- | --- |
| 改导航、配置、样式、脚本、图解，或构建与部署 | [`MAINTENANCE.md`](MAINTENANCE.md)：修改入口、常用命令、检查项、图解样式和部署流程 |
| 写或改课程正文、案例、图片与资料 | [`CONTRIBUTING.md`](CONTRIBUTING.md)「课程内容的写法」「图片与资料」 |
| 把推文、长文整理成章节并发布 | [`EDITORIAL_WORKFLOW.md`](EDITORIAL_WORKFLOW.md) |

环境：Node.js 22（见 `.nvmrc`）、npm、VitePress 1.6.4；繁体转换需要 Python 3 与 `requirements-dev.txt`。

目录结构见 [`README.md`](README.md)「目录结构」。

## 必须遵守

- `docs/zh-TW/`、`docs/public/examples-tw/` 和 `navigation.zh-tw.mts` 都是生成文件，不手工修改。简体正文、练习材料或导航更新后运行 `npm run sync:zh-tw`；繁体用字问题改 `scripts/zh-tw-glossary.json` 或转换脚本。
- 修改学习路径、导航或页面文件时，同步检查 `docs/.vitepress/config/navigation.mts` 中的入口与侧栏。
- 不把推测、模型自述或截图之外的信息写成已经验证的事实；版本、认证和模型支持等易变内容注明核验日期。
- 保留与当前任务无关的内容，不修改原始材料来替代整理稿。
- 不提交 `node_modules/`、VitePress 缓存、构建产物、日志或凭据。

## 验收

- 只修改仓库说明时，检查文字、命令和链接。
- 修改课程、导航、主题或样式后，运行 `npm run docs:check`。
- 检查新页面能从导航或相关章节到达，图片和下载材料路径有效。
