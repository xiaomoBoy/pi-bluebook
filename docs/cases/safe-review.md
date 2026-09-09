---
title: CASE 07 · 任务前安全审阅
description: 在不执行未知代码的前提下，判断任务范围、权限、恢复点和验收方式。
prev: { text: CASE 06 · 中断恢复, link: /cases/checkpoint-recovery }
next: { text: 回到课程, link: /guide/safety }
---

<span class="library-status">CASE 07 · 可练习</span>

# 任务前安全审阅

## 结果

在真正执行任务前完成四问检查，记录目录、文件、风险和恢复点；任何未知都保留为未知，不用“项目已信任”代替隔离判断。

## 固定材料

- <a href="/examples/safety/review-brief.md" download>陌生仓库请求（无可执行代码）</a>
- <a href="/examples/safety/plan-template.md" download>安全审阅模板</a>

在普通终端进入 `pi-practice`，把两份文件保存到 `safety-review/`：

```bash
cd ~/Downloads/pi-practice
pwd
mkdir -p safety-review
curl -fL https://pi.xiaomovps.com/examples/safety/review-brief.md \
  -o safety-review/review-brief.md
curl -fL https://pi.xiaomovps.com/examples/safety/plan-template.md \
  -o safety-review/plan-template.md
```

先打开两份文件，确认它们只有固定场景和七个空白标题，不包含可执行代码。然后显式关闭 Extension 和上下文文件，只提供读取、搜索与写入工具：

```bash
pi --name "安全审阅练习" --no-extensions --no-context-files \
  --tools read,write,grep,find,ls
```

这些参数不是沙箱；`write` 仍能以当前用户权限写文件。本课材料是无害的固定教学文本，任务只允许写一个新结果。进入 Pi 后发送：

```text
读取 safety-review/review-brief.md 和 safety-review/plan-template.md。
按照模板把审阅结果写入 safety-review/plan.md。
只依据场景中明确写出的事实；不知道的写“未知”，不要访问网络、运行命令、安装依赖、
读取其他目录或修改两份输入。最终“是否可以继续”只能写“信息不足”，并列出继续前必须确认的事项。
```

执行过程中只应看到两次输入读取和一次 `safety-review/plan.md` 写入。出现其他路径或工具动作时按 `Esc` 停止，并按照[第 14 课](/guide/safety)保留现场。

## 关键现象

Agent 只能把材料中已有的事实写成已知，把仓库内容、脚本行为和凭据需求保留为未知；最终结论必须停在“信息不足”。如果输出直接建议安装或执行，说明安全审阅越过了当前证据。

## 独立验收

- 计划写清只读范围、可能执行的动作、凭据暴露面和需要的隔离方式。
- 没有运行未知安装脚本，也没有把真实密钥放入练习目录。
- Project Trust 被正确描述为资源加载许可，而不是沙箱。
- 恢复前先保留路径、时间、状态、差异和已执行命令。

退出 Pi 后独立检查：

```bash
test -f safety-review/plan.md && echo "PASS: 安全审阅存在"
grep -E '^## (已知事实|未知与风险|允许的只读检查|当前禁止的动作|需要的隔离与最小凭据|恢复点与证据|是否可以继续)$' safety-review/plan.md
```

第二条应列出七个标题。再打开文件确认最终判断是“信息不足”，且没有把虚构的仓库内容写成已经检查过的事实。

## 失败恢复

如果已经误运行未知内容，先断开继续操作并保留现场；不要让 Agent 批量清理。根据实际影响寻求对应的凭据撤销、主机检查和文件恢复。本案例不能替代专业事件响应。
