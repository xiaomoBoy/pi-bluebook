# 项目维护手册

这份文件说明 Pi 学习蓝皮书的工程入口、修改边界和发布前检查。它面向维护者；内容写作规范仍以 [`CONTRIBUTING.md`](CONTRIBUTING.md) 和 [`EDITORIAL_WORKFLOW.md`](EDITORIAL_WORKFLOW.md) 为准。

## 单一维护入口

| 要调整的内容 | 修改位置 | 同步检查 |
| --- | --- | --- |
| 顶部菜单、各板块侧栏 | `docs/.vitepress/config/navigation.mts` | 运行 `npm run sync:zh-tw`，检查两种语言入口 |
| 站点名称、SEO、搜索、页脚 | `docs/.vitepress/config.mts` | `npm run docs:check` |
| 全站颜色、字体、基础组件 | `docs/.vitepress/theme/styles/foundation.css` | 明暗模式与正文页面 |
| 首页结构样式 | `docs/.vitepress/theme/styles/home.css` | 首页桌面端与窄屏 |
| 推文档案与札记组件 | `docs/.vitepress/theme/styles/archive.css` | 分页、锚点与移动端 |
| 版本档案检索组件 | `docs/.vitepress/theme/components/PiReleaseExplorer.vue`、`styles/releases.css` | 筛选、永久链接与移动端 |
| 响应式布局 | `docs/.vitepress/theme/styles/layout.css` | 顶部菜单、侧栏、正文与页脚 |
| 正文和课程 | `docs/guide/`、`docs/cases/`、`docs/reference/` | 导航、交叉链接、图片与验收步骤 |
| Pi 版本档案 | `docs/releases/`、`docs/.vitepress/data/pi-releases.json` | 先运行 `npm run sync:pi-releases`，再同步繁体并检查页面 |
| 图解源稿 | `docs/diagrams/` | 对应 SVG 是否同步导出 |
| 网站使用的图片和下载材料 | `docs/public/images/`、`docs/public/examples/` | 引用路径与隐私信息 |

`docs/.vitepress/theme/custom.css` 是稳定的样式入口，只负责按顺序加载拆分后的样式文件。通常不要再把具体规则直接堆回这个文件。

## 常用工作流

首次准备环境：

```bash
npm ci
python3 -m pip install -r requirements-dev.txt
```

编辑时使用热更新预览：

```bash
npm run docs:dev
```

提交前运行完整检查：

```bash
npm run docs:check
```

完整检查依次运行以下命令，任一步失败即停止：

| 命令 | 检查内容 |
| --- | --- |
| `check:translations` | 繁体页面、练习材料和导航与简体源及名词表重新生成的结果逐字节一致 |
| `check:content` | Markdown、HTML 和导航中的本地页面、图片及下载链接都存在 |
| `check:locales` | 简繁两套页面、练习材料和导航结构一一对应 |
| `check:terms` | 繁体生成内容中没有已淘汰用字 |
| `check:releases` | 版本快照的顺序、重复项、来源和五个关键节点证据 |
| `docs:build` | VitePress 正式构建，捕获死链和渲染错误 |
| `check:seo` | 正式产物中的 canonical、hreflang、Open Graph、Twitter Card、JSON-LD 和 sitemap |
| `check:pages` | 所有页面的站内锚点、搜索入口及两种语言的搜索索引 |

需要单独排查时，可以只运行其中一项，例如 `npm run check:content`。

简体正文更新后，运行 `npm run sync:zh-tw` 重新生成繁体页面、练习材料和繁体导航。转换管线为 OpenCC s2twp 加 `scripts/zh-tw-glossary.json` 名词覆盖层：词表以[乐词网](https://terms.naer.edu.tw/)电子计算机名词为准收敛简中用字（如账号、回车、菜单类用字），有冲突的名词经使用者确认后保留并记入词表 `_comment`。不要手工改生成文件，改词表后重跑即可。`npm run check:translations` 只读比对生成内容，`npm run check:terms` 回归检查已淘汰用字是否复发（违禁表见 `scripts/check-zh-tw-terms.py`），两项都进 `npm run docs:check` 与 CI。转换依赖锁定在 `requirements-dev.txt`；生成后仍需人工检查授权译文说明和关键页面排版，名词问题一般不需要再人工逐项校对。

版本档案的数据源是 Pi Coding Agent 官方 `CHANGELOG.md`。刷新时运行 `npm run sync:pi-releases`；脚本会下载官方记录、保留每个正式版本的完整条目，并更新来源哈希与核验日期。生成后的 JSON 需要提交到仓库，使正式网站和 CI 构建不依赖实时网络。`npm run check:releases` 会检查版本顺序、重复项、来源和五个关键节点证据。

## 新增页面

1. 把页面放入职责明确的内容目录，不在根目录临时堆放正文。
2. 写清页面标题、场景、步骤和可观察的验收结果。
3. 在 `navigation.mts` 的对应侧栏加入入口；如果是核心页面，再判断是否需要顶部菜单入口。
4. 从相关课程、案例或参考页面增加双向阅读链接。
5. 图片放入 `docs/public/images/<主题>/`，练习材料放入 `docs/public/examples/<案例>/`。
6. 运行 `npm run sync:zh-tw` 生成对应繁体页面和导航，不直接长期维护生成文件。
7. 运行 `npm run docs:check`，再检查两种语言的桌面端和窄屏页面。

## 调整样式

- 优先复用 `foundation.css` 中的 `--pi-*` 设计变量，不在页面组件里重复写颜色。
- 按职责修改对应样式文件，并保持 `custom.css` 的导入顺序。
- 修改导航、侧栏、正文宽度或页脚时，至少检查 1280px、桌面窄屏和手机宽度。
- 结构重构应先保证构建前后页面一致，再单独进行视觉改版，避免两种变化混在一起难以回退。

## 图解维护

项目使用 Diagram Design 生成架构图、流程图和概念图。根目录 `.diagram-design` 固定选择 `pi-bluebook` 样式档案，出图先读取该档案，不再每次重新确定视觉方向。

- 视觉基准是用户确认的第一版《Pi 如何组织一次真实任务》：暖白背景、深灰文字、克制的蓝色强调、细边框、无阴影。
- 保留第一版的字号、间距和节点左上角小型描边标签框；除非用户明确要求，不做全局放大、取消标签框或重新排版。
- 文档内图默认使用 960×600 的 `doc-inline` 尺寸、静态 minimal-light 版本，密度控制在 4/10。
- 中文节点名使用 16px 无衬线体，说明文字 12px；英文技术标签和连线标签使用 8px 等宽体。
- 每张图只突出 1–2 个重点；连线优先使用水平、垂直或圆角直角路径，不使用斜线，不加阴影和渐变。
- `docs/diagrams/` 中的 HTML 是可编辑源稿，`docs/public/images/diagrams/` 中的 SVG 是网站发布资源；修改图解时同步更新两者，只有明确需要位图时才导出 PNG。
- 正文引用统一使用 `/images/diagrams/<名称>.svg`。
- 出图后运行 Diagram Design 自检，并检查标题、正文、标签、连线、图例和移动端缩放是否清晰。
- 新图先本地预览并获得确认，再加入正文和部署。

## 提交与发布

- 一个提交只处理一个清晰主题；大规模结构整理与内容扩写尽量分开。
- 提交前查看 `git diff`，避免把 `.wrangler/`、构建产物、日志或凭据加入仓库。
- `main` 分支上的推送和 Pull Request 会自动执行 `npm run docs:check`。

网站使用 Cloudflare Workers 静态资源部署，生产域名为 `https://pi.xiaomovps.com`，配置位于 `wrangler.jsonc`。

1. 首次在一台电脑上部署时，运行 `npx wrangler login` 完成 Cloudflare 登录；后续复用本机保存的授权，不把 Token 或凭据写入仓库。
2. 在项目根目录运行 `npm run deploy`。该命令先完成全部检查，通过后才执行 Cloudflare 部署；只检查打包而不发布时，使用 `npm run deploy:dry-run`。
3. 部署命令成功不等于验收完成。至少打开以下线上地址，确认正文为本次版本：
   - `https://pi.xiaomovps.com/`
   - `https://pi.xiaomovps.com/reference/`
   - 本次新增或修改的页面
4. 最后运行 `git status --short --branch`，确认没有意外暂存、提交、凭据文件或构建产物。部署记录可用 `npx wrangler deployments list` 查看。
