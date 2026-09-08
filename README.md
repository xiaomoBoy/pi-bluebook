# Pi 学习蓝皮书

一本面向中文初学者的非官方 Pi 学习手册。从打开终端、安装与登录开始，完成第一个可以独立验收的文件任务，再逐步学习上下文、工作流和扩展。

每一课按“场景 → 概念 → 实操 → 验收”展开。目标是让你知道从哪里开始、每一步应该看到什么，以及怎样确认结果，而不只是复制一段命令。

[在线阅读](https://pi.xiaomovps.com) · [从安装前检查开始](https://pi.xiaomovps.com/guide/before-install) · [反馈问题](https://github.com/xiaomoBoy/pi-bluebook/issues)

## 当前内容与学习路径

项目仍在持续编写中。当前已经建立从安装、第一次任务、会话与上下文，到扩展、长任务和安全验收的五个模块。新增章节是可阅读的阶段性初稿，后续会继续补实操和截图。

| 顺序 | 章节 | 你会完成什么 |
| --- | --- | --- |
| 模块一 · 1 | [安装前检查](docs/guide/before-install.md) | 打开终端，准备练习目录，检查 Node.js 和 npm |
| 模块一 · 2 | [安装并启动 Pi](docs/guide/install-pi.md) | 安装 Pi，确认可用，并学会启动与退出 |
| 模块一 · 3 | [登录与模型设置](docs/guide/connect-model.md) | 连接可用服务，选择模型，收到一次真实回复 |
| 模块一 · 4 | [从练习目录开始](docs/guide/ready-to-work.md) | 确认当前目录和基础设置，完成进入任务前的检查 |
| 模块二 · 5 | [第一次任务](docs/guide/first-task.md) | 把虚构会议记录整理成行动清单，独立核对输入与输出 |
| 模块二 · 6至7 | [文件与会话](docs/guide/files-and-context.md) | 用工作目录和 `@文件` 建立清晰起点，学会会话命名、续写和分支 |
| 模块三 · 8至9 | [上下文与压缩](docs/guide/context-and-compaction.md) | 理解长对话、压缩、提示缓存和可持续产物 |
| 模块四 · 10至12 | [扩展自己的 Pi](docs/guide/skills-extensions-packages.md) | 区分 Skill、Extension 和 Package，理解 Extension 设计与子 Agent 分工 |
| 模块五 · 13至14 | [稳定工作流](docs/guide/vps-and-long-running.md) | 处理长时间任务，建立权限、隔离、恢复和验收意识 |
| 个人记录 | [我的 Pi 学习记录](docs/journey/index.md) | 把个人感悟与实践过程放在一起，连接六阶段原文路线 |
| 原文启发与实践 | [学习专区](docs/translations/index.md) | 从会话、压缩和提示缓存原文出发，重构为带场景与练习的中文学习文章 |
| 推文原文 | [六阶段学习目录](docs/tweets/index.md) | 98 条 Pi 推文按学习顺序整理，保留原文与发布日期 |

已经能够启动 Pi 并获得回复的读者，可以先检查第 4 课的前置条件，再进入第一次任务。当前操作主线以 macOS 为主；其他系统的适用范围见各课说明。

后续计划继续补入真实界面截图、Extension 代码实操、不同系统的安装差异和更多来源经过核对的个人实践。

## 本地运行网站

本仓库使用 VitePress。预览和修改网站不需要安装 Pi，也不需要模型账号或 API Key。

先准备 Git、Node.js 和 npm。仓库的 [.nvmrc](.nvmrc) 指定 Node.js 22；这里是网站开发环境，与课程中 Pi 自身的运行要求分别说明。

```bash
git clone https://github.com/xiaomoBoy/pi-bluebook.git
cd pi-bluebook
npm ci
npm run docs:dev
```

打开终端显示的本地地址即可预览；修改 `docs/` 下的文件后，页面会自动更新。停止预览时，在该终端按 `Ctrl+C`。

检查正式构建并预览构建结果：

```bash
npm run docs:build
npm run docs:preview
```

构建结果生成在 `docs/.vitepress/dist/`，无需提交到仓库。`docs:preview` 预览的是上一次构建结果，内容有变化时请重新构建。

## 目录结构

```text
pi-bluebook/
├── docs/
│   ├── index.md                 # 网站首页
│   ├── guide/                   # 按学习顺序编写的课程
│   ├── journey/                 # 个人学习记录与感悟
│   ├── translations/            # 标明作者与来源的原文启发与实践
│   ├── tweets/                  # 推文与实践资料索引
│   ├── public/
│   │   ├── examples/            # 可下载的练习材料
│   │   └── images/              # 教程图片
│   └── .vitepress/
│       ├── config.mts           # 导航、侧栏与网站配置
│       └── theme/               # 页面主题和样式
├── CONTRIBUTING.md             # 反馈与贡献说明
├── EDITORIAL_WORKFLOW.md        # 文章审阅、核验与发布流程
├── LICENSE                     # 网站代码许可
└── LICENSE-CONTENT.md           # 原创内容许可
```

## 一起完善这本书

欢迎指出看不懂的步骤、失效命令、缺少的材料或错误链接，也欢迎补充有来源的实践记录和修正文案。你不需要会写代码才能贡献：在 [Issues](https://github.com/xiaomoBoy/pi-bluebook/issues) 写清所读章节、卡住的位置和实际现象即可。

提交修改前请阅读 [贡献指南](CONTRIBUTING.md)。文章从原始材料到发布的分工与验收方式见 [文章工作流](EDITORIAL_WORKFLOW.md)。

## 许可证

本仓库分别许可网站代码与原创内容：

- 网站代码采用 [MIT License](LICENSE)。
- 原创书稿、推文整理稿和原创图片采用 [CC BY-NC-SA 4.0](LICENSE-CONTENT.md)：转载与改编需署名、限非商业使用，并以相同许可分享衍生作品。
- 第三方商标、截图、引用和其他第三方素材不自动包含在原创内容许可中，其权利归各自权利人所有；素材旁的单独说明优先。

具体权利和条件以对应许可文件为准。不要将网站代码的 MIT 许可套用于整本书的内容。

## 非官方声明

本项目为社区学习项目，与 Pi 官方无隶属或授权关系。Pi 的安装方式、认证支持和版本行为可能变化；课程中的动态说明应结合所标注的核验日期及 [Pi 官方文档](https://pi.dev/docs/latest/quickstart) 阅读。
