# Pi 学习蓝皮书项目说明

## 项目定位

这是一本面向中文初学者的非官方 Pi 学习手册，使用 VitePress 构建。内容从安装、登录和第一次任务开始，逐步讲解文件与会话、上下文、Skill、Extension、子 Agent、长任务与安全验收。

写作目标是让读者不仅知道“怎么操作”，还知道每一步应看到什么、如何判断任务是否真正完成。当前课程主要以 macOS 为操作环境。

## 技术基础

- Node.js：22（见 `.nvmrc`）
- 包管理器：npm
- 网站框架：VitePress 1.6.4
- 网站配置：`docs/.vitepress/config.mts`
- 主题与样式：`docs/.vitepress/theme/`
- 构建产物：`docs/.vitepress/dist/`，不纳入 Git

常用命令：

```bash
npm ci
npm run docs:dev
npm run docs:build
npm run docs:preview
```

## 主要目录

- `docs/guide/`：按学习顺序组织的主线课程。
- `docs/cases/`：与课程配套的可复现实操案例。
- `docs/reference/`：按主题查找的参考手册。
- `docs/translations/`：与课程相关的延伸阅读。
- `docs/journey/`：蓝皮书之外的个人札记。
- `docs/tweets/`：98 条推文与实践资料档案。
- `docs/public/images/`：教程图片。
- `docs/public/examples/`：供读者下载和练习的材料。

## 基础内容规范

- 面向初学者写作，先说明场景和前置条件，再给出操作步骤与可观察的验收结果。
- 课程正文尽量遵循“场景 → 概念 → 实操 → 验收 → 下一步”的结构。
- 明确区分终端命令、Pi 内部命令和发送给模型的任务文字。
- 技术事实应有可靠来源；版本、认证和模型支持等易变化内容需要注明核验日期。
- 不把推测、模型自述或截图之外的信息写成已经验证的事实。
- 图片不能代替必要的正文步骤；加入图片前检查清晰度、隐私信息、来源与授权范围。
- 修改学习路径、导航或页面文件时，同步检查 `docs/.vitepress/config.mts` 中的入口与侧栏。
- 保留与当前任务无关的内容，不修改原始材料来替代整理稿。

更完整的贡献要求见 `CONTRIBUTING.md`，文章审阅与发布流程见 `EDITORIAL_WORKFLOW.md`。

## 基础验收

- 只修改仓库说明时，检查文字、命令和链接。
- 修改课程、导航、主题或样式后，运行 `npm run docs:build`。
- 检查新页面能从导航或相关章节到达，图片和下载材料路径有效。
- 不提交 `node_modules/`、VitePress 缓存、构建产物、日志或凭据。

## 固定图解流程

项目使用 Diagram Design 生成辅助理解的架构图、流程图和概念图。根目录 `.diagram-design` 固定选择 `pi-bluebook` 样式档案，后续出图先读取该档案，不再每次重新确定视觉方向。

- 视觉基准是用户确认的第一版《Pi 如何组织一次真实任务》：暖白背景、深灰文字、克制的蓝色强调、细边框、无阴影。
- 保留第一版的字号、间距和节点左上角小型描边标签框；除非用户明确要求，不做全局放大、取消标签框或重新排版。
- 文档内图默认使用 960×600 的 `doc-inline` 尺寸、静态 minimal-light 版本，密度控制在 4/10。
- 中文节点名使用 16px 无衬线体，说明文字 12px；英文技术标签和连线标签使用 8px 等宽体。
- 每张图只突出 1–2 个重点；连线优先使用水平、垂直或圆角直角路径，不使用斜线，不加阴影和渐变。
- 源稿保留为自包含 HTML；需要插入文档时再导出 SVG，只有明确需要位图时才导出 PNG。
- 出图后运行 Diagram Design 自检，并检查标题、正文、标签、连线、图例和移动端缩放是否清晰。
- 新图先本地预览并获得确认，再放入 `docs/public/images/` 和对应正文；部署仍按下方固定流程执行。

## 固定部署流程

网站使用 Cloudflare Workers 静态资源部署，生产域名为 `https://pi.xiaomovps.com`，配置位于 `wrangler.jsonc`。

1. 首次在一台电脑上部署时，运行 `npx wrangler login` 完成 Cloudflare 登录；后续优先复用本机保存的授权，不把 Token 或凭据写入仓库。
2. 在项目根目录运行 `npm run deploy`。该命令会先完成 VitePress 构建和 SEO 检查，全部通过后才执行 Cloudflare 部署。
3. 部署命令成功不等于验收完成。至少检查以下线上地址能正常打开，且正文为本次版本：
   - `https://pi.xiaomovps.com/`
   - `https://pi.xiaomovps.com/reference/`
   - 本次新增或修改的页面
4. 最后运行 `git status --short --branch`，确认没有意外暂存、提交、凭据文件或构建产物。

常用命令：

```bash
npm run docs:check
npm run deploy
npx wrangler deployments list
```
