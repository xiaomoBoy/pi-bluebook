# FAQ 与热词科普图解放置清单

`docs/diagrams/` 保存 Diagram Design 的自包含 HTML 源稿；网站引用的 SVG 位于 `docs/public/images/diagrams/`。全部图解使用项目根目录 `.diagram-design` 指定的 `pi-bluebook` 样式。

| 图解 | 主要插入位置 | 复用位置 | 解决的问题 |
| --- | --- | --- | --- |
| `pi-harness-overview` | FAQ「Pi 到底是什么？」 | 热词「Agent Harness」 | 把模型、工具、文件、Session 与 Pi 的职责放进一张图 |
| `local-agent-model` | FAQ「本地 Agent 和本地模型是一回事吗？」 | 暂不复用 | 区分 Agent 运行位置与模型推理位置 |
| `context-session-compaction` | FAQ「Context 和 Session 有什么区别？」 | 热词「Context Window」之后 | 区分完整历史、本轮输入、项目文件和压缩摘要 |
| `skill-extension-package` | FAQ「Skill、Extension 和 Package 有什么区别？」 | 热词「Package」之后 | 用选择路径解释方法、运行能力和分发容器 |
| `project-trust-boundary` | FAQ「Project Trust 是不是沙箱？」 | 暂不复用 | 区分项目资源加载闸门与操作系统隔离边界 |
| `graduation-project-flow` | CASE 08「Pi 蓝皮书毕业项目」 | 暂不复用 | 明确学习者、主 Session 与只读审阅 Session 的职责和验收门 |

参考手册首页已经通过表格完成导航与比较，本阶段不再插图，避免重复表达。
