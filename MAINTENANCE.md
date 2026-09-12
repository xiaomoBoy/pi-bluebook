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
| 响应式布局 | `docs/.vitepress/theme/styles/layout.css` | 顶部菜单、侧栏、正文与页脚 |
| 正文和课程 | `docs/guide/`、`docs/cases/`、`docs/reference/` | 导航、交叉链接、图片与验收步骤 |
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

完整检查依次完成：

1. 校验 Markdown、HTML 和导航中的本地页面、图片及下载链接。
2. 执行 VitePress 正式构建，捕获死链和渲染错误。
3. 检查正式产物中的 canonical、Open Graph、Twitter Card、JSON-LD 和 sitemap。
4. 核对所有页面的站内锚点、搜索入口及两种语言的搜索索引。

只想快速检查内容引用时，可运行 `npm run check:content`。只检查已经生成的正式产物，可运行 `npm run check:seo`。

简体正文更新后，运行 `npm run sync:zh-tw` 重新生成繁体页面、练习材料和繁体导航。转换管线为 OpenCC s2twp 加 `scripts/zh-tw-glossary.json` 名词覆盖层：词表以《电子计算机名词》为准收敛简中用字（如账号、回车、菜单类用字），有冲突的名词经使用者确认后保留并记入词表 `_comment`。不要手工改生成文件，改词表后重跑即可。`npm run check:translations` 只读比对生成内容，`npm run check:terms` 回归检查 38 组已淘汰用字是否复发，两项都进 `npm run docs:check` 与 CI。转换依赖锁定在 `requirements-dev.txt`；生成后仍需人工检查授权译文说明和关键页面排版，名词问题一般不需要再人工逐项校对。

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

- `.diagram-design` 指向固定的 `pi-bluebook` 风格档案。
- HTML 是可编辑源稿，SVG 是网站发布资源；修改图解时应同步更新两者。
- 正文引用统一使用 `/images/diagrams/<名称>.svg`。
- 新图先本地预览并确认，再加入正文和部署。

## 提交与发布

- 一个提交只处理一个清晰主题；大规模结构整理与内容扩写尽量分开。
- 提交前查看 `git diff`，避免把 `.wrangler/`、构建产物、日志或凭据加入仓库。
- `main` 分支上的推送和 Pull Request 会自动执行 `npm run docs:check`。
- 部署使用 `npm run deploy`；命令成功后仍需打开生产域名和本次修改的关键页面验收。
- 只检查 Cloudflare 打包而不发布时，使用 `npm run deploy:dry-run`。
