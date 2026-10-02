---
title: “你说过不要 MCP！”
description: Earendil Engineering 官方文章《“You Said No MCP!”》的完整中文译文，说明 Pi 为什么改为支持 MCP，以及 Codemode 是什么。
prev:
  text: 衡量代码的粗糙程度
  link: /translations/measuring-code-sloppiness
next:
  text: Pi 1.0
  link: /translations/pi-1-0
---

<span class="library-status">Earendil 官方授权中文译文 · 12</span>

# “你说过不要 MCP！”

> - **原文标题**　*“You Said No MCP!”*
> - **作者**　Earendil Engineering `<rfc@earendil.com>`
> - **发布日期**　2026-09-29
> - **原文地址**　[earendil.com/posts/you-said-no-mcp](https://earendil.com/posts/you-said-no-mcp/)
> - **授权说明**　经 Earendil 授权改编与翻译（*Adapted and translated with permission from Earendil.*）
> - **译文许可**　[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh-hans)

如果你以前访问过 pi.dev，就会看到一句颇为自豪的声明：Pi 不支持 [MCP](https://en.wikipedia.org/wiki/Model_Context_Protocol)。如果你听过我们谈论 Pi 的播客，也会不止一次听到我们对 MCP 不以为然的评价。Mario 甚至还[专门写过一篇文章](https://mariozechner.at/posts/2025-11-02-what-if-you-dont-need-mcp/)。然而，如果你现在升级 Pi，就会发现它已经支持 MCP 了。这是怎么回事？

## 情况变了

首先要记住，[世界并非一成不变](https://lucumr.pocoo.org/2016/11/5/be-careful-about-what-you-dislike/)。过去一年里，我们一直在关注 MCP，而今天的 MCP 已经不同于从前。不过，仅凭这一点，还不足以成为把它纳入核心的理由。你也知道，Pi 有很好的扩展生态，MCP 完全可以做成一个扩展吧？甚至可以是由 Earendil 官方认可的扩展。没错，你说得对：MCP 确实可以作为扩展提供，[以前也的确如此](https://github.com/nicobailon/pi-mcp-adapter)。

如今 MCP 成了核心的一部分，是我们一起讨论、重新思考后作出的决定。

## 到底变了什么？

我们把 MCP 纳入核心，不只是因为 MCP 本身发生了变化，还因为我们发现，为支持它而需要做的改动也有普遍的用处。例如，我们为 MCP 所做的改动，也让在 Pi 中使用 Jev 变得更容易。归根结底，Pi 需要的东西与 MCP 需要的很相似：一个以解释器形式提供、可供施展的沙箱。

虽然 MCP 已经在许多方面有所改善，但仍有不少问题没有解决。它最大的问题依然是难以组合使用。即使有了 Codemode——一个方便组合工具调用的小巧沙箱——MCP 在这方面仍不尽如人意。不过，到了现在，这与其说是 MCP 本身的问题，不如说是现有 MCP 服务器，以及不同 Harness 使用这些服务器的方式所带来的问题。

许多 MCP 服务器仍然是为那些直接把工具一股脑塞进上下文的 Harness 构建的，并试图通过返回文本，在服务器这一侧节省 Token。我们现在更愿意把 MCP 看成一种接近 OpenAPI、同时具备智能工具发现能力的东西。这意味着，工具应该返回结构化数据，而且应该能够根据文档和描述被发现。

命令行工具（CLI）之所以这么好用，是因为 Agent 和模型可以借助高效的 Bash 技巧，把各种东西串联起来。但从根本上说，MCP 也没有理由做不到这一点。Pi 中的 MCP，就是把这些工具暴露给一个 JavaScript 沙箱；Codex 等其他 Harness 也采用了类似做法。

## 现代 LLM 中的 MCP

这就引出了一个问题：为什么我们不只做 Codemode，而不引入 MCP？部分原因在于 Pi 目前表达和描述工具的方式。最近几个月，我们做了很多工作，让 Pi 能够适应新模型提供的能力，例如延迟加载工具、在对话中途插入系统消息，以及调整推理级别。但我们还没有升级工具配置体系，让它更好地利用这些新能力并支持更大的工具规模。

在采用 Codemode 的环境中，需要决定一个工具是直接提供给 LLM，还是只提供给 LLM 的 Codemode 部分。普通的 MCP 扩展无法从 Pi 的工具配置体系中获取足够的元数据，因此很难把这种体验做好。所以，我们需要确保工具既可以被配置为延迟加载，也可以被配置为仅供 Codemode 使用。

当然，我们也可以只接好这些元数据，让 MCP 扩展能够做得更好。但我们同时认为，MCP 与 Codemode 结合，已经解决了 MCP 过去的许多问题。我们相信，要对一件事产生积极影响，最好的办法就是拥抱它。虽然我们认为如今的 MCP 已经比以往好得多，但服务器和使用模式仍有改进空间。

因此，我们希望参与讨论，帮助它发展成适合小型 Harness 的样子，而不是站在场边观望。

## 什么是 Codemode？

前面说了这么多 Codemode，也该解释一下它究竟是什么了。Harness 执行工具时，大体上可以在两侧进行：一侧是 Bash 运行的地方，另一侧是 Harness 的 Agent 循环运行的地方。这两侧的信任级别很不一样。Harness 循环往往运行在受信任的环境中，而它执行的工具则经常运行在信任程度没那么高的沙箱里。

Codemode 的特别之处在于，它运行在 Harness 所在的那一侧。可以把它理解为一种编排和协调工具调用的机制。它是一个沙箱，让 Agent 能更灵活地决定工具调用的顺序，并用 JavaScript 把这些调用组合起来。由于 Codemode 也运行在 Harness 侧，它的状态会作为会话记录的一部分保存，而不是保存在文件系统中。

理论上，任何语言都可以胜任，但 JavaScript 很有吸引力：小型 JavaScript 实现可以打包成 WASM 二进制文件分发，并提供合理程度的保护。

在 Pi 中，配置 MCP 时会自动加载 Codemode，也可以把它作为默认工具加入配置。直接让 Pi 修改自己的配置、启用 Codemode 就行！之后，你就能用它做不少有意思的事，而且不局限于 MCP。例如，当你登录的服务商提供“Jev”时，就可以提出这样的请求：

> 通过 Codemode 使用 typesafe/jev，找出我们的问题追踪系统中最不满的 20 位评论者。

它就会在 Pi 内部，巧妙地把 Linear MCP 和 Jev 等能力组合起来完成这项分析，完全不浪费上下文。

以下是这样一次 Pi 会话的精简回放。

<PiCodemodeReplay />

::: details 展开中文文字版与完整代码

> 通过 Codemode 使用 typesafe/jev，找出我们的问题追踪系统中最不满的人。

我会从 Linear 获取尚未关闭的问题，让 Jev 评估每个讨论串的语气，每次并行处理四个。

**codemode**

```javascript
const { issues } = await tools.mcp__linear__list_issues({
  team: "Pi", state: "open", limit: 250,
});
const jev = await models.getModelOfType(
  "classifier", "cloudflare-workers-ai", "typesafe/jev",
);
const questions = {
  frustration: {
    type: "choice",
    instructions: "Judge ONLY the emotional tone of the people writing. " +
      "Ignore how severe the bug is.",
    criteria: {
      none: "Neutral, factual, or friendly, even about a serious bug",
      mild: "Explicit annoyance, impatience, or disappointment",
      high: "Clearly angry, exasperated, sarcastic, or fed up",
    },
  },
};

const results = [];
let next = 0;
async function worker() {
  while (next < issues.length) {
    const issue = issues[next++];
    const { comments } = await tools.mcp__linear__list_comments({
      issueId: issue.identifier,
    });
    const c = await models.classify(jev, { state: { ...issue, comments }, questions });
    results.push({ id: issue.identifier, title: issue.title, ...c.answers.frustration });
  }
}
await Promise.all([worker(), worker(), worker(), worker()]);
store("frustration", results);

const score = (r) => r.probabilities.mild * 0.5 + r.probabilities.high;
const counts = {};
for (const r of results) counts[r.choice] = (counts[r.choice] ?? 0) + 1;
const flagged = results.filter((r) => r.choice !== "none");
flagged.sort((a, b) => score(b) - score(a));
return {
  total: results.length,
  counts,
  flagged: flagged.map((r) => `${r.id} ${r.title}`),
};
```

```text
... (331 earlier calls)
✓ mcp__linear__list_comments {"issueId":"PI-4714"} 255ms
✓ mcp__linear__list_comments {"issueId":"PI-3200"} 354ms
✓ models.classify cloudflare-workers-ai/typesafe/jev 756ms
✓ models.classify cloudflare-workers-ai/typesafe/jev 750ms

{
  "total": 167,
  "counts": {
    "none": 156,
    "mild": 11
  },
  "flagged": [
    "PI-7740 TUI after /reload does not follows custom tool's re…",
    "PI-9566 context size defaults to 128k despite the real size…",
    "PI-10031 Pi sporadically stuck in \"Working...\" when thinking…",
    "PI-4714 [feature] /update TUI command instead of pi update",
    "PI-5916 Support provider extensions with model aliases and…",
    "PI-7547 [Windows] [sink-thread] How do you use Pi on window…",
    "PI-6907 Add an Installation section to the README",
    "PI-6212 Proposal: Bedrock path should honor `compat.forceAd…",
    "PI-9932 before_agent_start: forced system prompt keeps tool…",
    "PI-7730 High CPU usage on Mac OS with long session",
    "PI-6600 pi update --extensions and npm scripts: npm 11.16.0…"
  ]
}
```

问题追踪系统中的大多数讨论都很平和。Jev 将 167 个尚未关闭的问题中的 156 个评为中性，11 个评为轻度不满，没有任何一个被评为高度不满。

最明显的几个例子是：

- PI-6907：README 中没有安装说明（“这让人很不满”）。
- PI-10031：在思考过程中按下 Esc 后，Pi 卡在“Working...”状态。
- PI-4714：希望增加 `/update` 命令（“实在太烦人了”）。
- PI-7730：macOS 上的长会话中，CPU 占用率过高。

每个问题的评判结果都已在 Codemode 中保存为 `frustration`，因此我可以深入查看其中任何一个，而不必重新获取这些问题。

:::

——

关于 Jev 和 Codemode 等内容，我们以后还会继续介绍。我们希望这篇文章能够展示：随着世界不断变化，我们也会持续审慎地调整和更新 Pi。

::: info 译者说明
本文为 Earendil Engineering 原文的完整中文译文。动态回放采用原文演示数据，保留英文界面；文字版中的代码与运行结果保留原文，对话说明译为中文。中文译文及适配部分经授权按 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh-hans) 发布；英文原文版权归 Earendil 所有。如中文表述与原文存在歧义，请以[英文原文](https://earendil.com/posts/you-said-no-mcp/)为准。
:::

## 继续阅读

- [英文原文：“You Said No MCP!”](https://earendil.com/posts/you-said-no-mcp/)
- [上一篇：衡量代码的粗糙程度](/translations/measuring-code-sloppiness)
- [返回：官方授权译文目录](/translations/)
