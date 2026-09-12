---
title: 迁移练习 · 修复一个小程序
description: 用四个固定测试复现行动清单程序的错误，让 Pi 最小修复，再亲自验证测试和修改范围。
prev: { text: 内容整理迁移练习, link: /cases/content-workflow }
next: { text: 毕业项目, link: /cases/graduation-project }
---

# 修复一个小程序

你已经会检查行动清单的字段。现在把同一套验收习惯用到代码：一个函数本来应该筛选未完成事项并按日期排序，却混进了已完成项，还改变了调用者的原始列表。

完成本例需要已经能使用 Pi，并有 Node.js 22 或更高版本。材料没有第三方依赖，不需要运行 `npm install`。它是故意带错的教学程序，与网站自身的生产代码无关。

## 1. 在新目录复现错误

在普通终端执行；macOS、Linux、Windows Git Bash 都可使用下面的主目录路径：

```bash
mkdir ~/pi-code-repair
cd ~/pi-code-repair
curl -fL https://pi.xiaomovps.com/examples/code-repair/action-list.mjs -o action-list.mjs
curl -fL https://pi.xiaomovps.com/examples/code-repair/action-list.test.mjs -o action-list.test.mjs
node --test action-list.test.mjs
```

目录已存在时换一个新名字，避免旧修复覆盖初始状态。先读两个文件，再运行测试；这次应看到 **4 个测试、2 个通过、2 个失败**。失败是需要记录的起点。如果一开始就全部通过，先核对下载材料和目录。

四个测试分别检查：排除已完成事项并按日期排序、不改变输入、同日期保留原顺序、空数组正常返回。日期已限定为 `YYYY-MM-DD` 或 `null`，本例不处理自然语言日期与时区。

给两份初始文件留副本：

```bash
cp action-list.mjs action-list.before.txt
cp action-list.test.mjs tests.before.txt
pi --no-extensions --no-skills --no-context-files
```

## 2. 让 Pi 只修一个文件

在 Pi 输入：

```text
读取 action-list.mjs 和 action-list.test.mjs，先运行
node --test action-list.test.mjs 复现失败，解释原因。
只修改 action-list.mjs：返回未完成事项，日期升序，未知日期最后；
同日期保留原顺序，不能改变传入数组或对象。
不能修改测试、初始副本或其他文件，不安装依赖，不访问网络或其他目录。
修复后重新运行测试，报告修改位置和实际结果。
```

执行范围由提示明确约定，并非操作系统沙箱。整个练习只使用下载后审查过的教学文件。

## 3. 离开 Pi，独立验收

输入 `/quit` 回到普通终端：

```bash
node --test action-list.test.mjs
cmp action-list.test.mjs tests.before.txt
diff -u action-list.before.txt action-list.mjs
ls -A
```

现在应是 **4 个通过、0 个失败**。`cmp` 无输出且退出码为 0，才表示测试文件没有被改；`diff` 应展示实现变化，它返回 1 只是表示两份文件不同。最后检查目录只有两份程序和两份初始副本，没有多出依赖或无关文件。

不要为了通过而删测试、把断言改宽或硬编码样例答案。读懂修复的基本结构：先得到未完成事项的新数组，再排序；未知日期单独处理，原数组顺序保持不变。固定测试证明的是这份需求范围，不能证明任意输入都正确。

## 失败后怎样继续

把失败测试名、预期值和实际值交回 Pi，请它只修对应问题。测试文件被修改时保留现场，用新目录重新开始；不要把“测试全绿”当成对修改测试行为的许可。

完成后可以进入[毕业项目](/cases/graduation-project)，把同样的方法用于有导航、双语内容和构建检查的真实仓库。

## 维护者复现记录

2026 年 9 月 12 日，在 macOS 的新练习目录中使用 Pi `0.84.3` 与 Node.js `24.14.1` 复现：原始材料 2 项通过、2 项失败；Pi 仅修改 `action-list.mjs` 后，维护者独立重跑得到 4 项通过、0 项失败，并用逐字节比较确认测试文件未改。不同模型的修复写法可以不同，仍以你的当次测试和文件差异为准。
