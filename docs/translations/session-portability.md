---
title: 无法随身带走的会话
description: Earendil Engineering 官方文章《The Session You Cannot Take With You》的完整中文译文。
prev:
  text: 官方授权译文
  link: /translations/
next:
  text: Pi 中的压缩机制
  link: /translations/compaction-in-pi
---

<span class="library-status">Earendil 官方授权中文译文 · 01</span>

# 无法随身带走的会话

> - **原文标题**　*The Session You Cannot Take With You*
> - **作者**　Earendil Engineering `<rfc@earendil.com>`
> - **发布日期**　2026-07-30
> - **原文地址**　[earendil.com/posts/session-portability](https://earendil.com/posts/session-portability/)
> - **授权说明**　经 Earendil 授权改编与翻译（*Adapted and translated with permission from Earendil.*）
> - **译文许可**　[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh-hans)

推理 API 最初的承诺简单得令人愉快：发送一些输入，接收一些输出。如果你同时保存了两者，就保存了这段对话。你可以检查、归档或重放它，也可以把它交给另一个模型。

这种抽象从来没有完全成立。例如，[提示缓存](/translations/prompt-caching)位于别人的 GPU 上；不同模型的 token 化方式不同；采样也无法复现——而且这是有意如此。不过，以转录记录形式存在的会话**语义记录**仍然可以属于用户。一份转录记录应当包含指令、消息、工具调用和工具结果。另一个能力足够强的模型或许无法以完全相同的方式继续，但它可以理解发生过什么，并接手后续工作。

令人沮丧的是，推理 API 正在逐渐偏离这一特性——至少在一定程度上如此。它们越来越多地返回文本与提供商绑定状态的混合物，而这种状态被刻意设计成不可移植。

- 向用户计费，却最多只返回无用摘要的推理 token；真正内容只是不可读的加密数据块。
- 模型能看到源材料、客户端却看不到的网页搜索。
- 只有原提供商才能解密的压缩上下文。
- 以加密载荷形式隐藏，不让运行 Agent 的应用看到的子 Agent 指令和消息。
- 无法在其他地方解析的文件、向量存储、容器和缓存引用。
- 完全依赖 ID 的响应和对话状态，而这些 ID 所指向的数据全部存放在提供商服务器上。

提供商很容易为每项功能给出一个基本理由，也能提出这些设计为什么有利于用户的好论据。但它们合在一起，改变了 AI 会话在现实中的归属：你电脑上的转录记录不再等同于你的会话，而只是某个会话的局部视图；这个会话的运行状态属于推理提供商，而不属于你。

我们不喜欢这个方向。下面想谈谈它对作为用户的你意味着什么，也谈谈它对我们这些开发相关工具的人意味着什么。

## 检验会话归属的实用方法

我们所说的可移植会话，并不是指从一个模型切换到另一个模型后，必须生成完全相同的下一个 token。这显然不可能，因为模型的能力、训练出的性格、上下文窗口和工具使用方式都不同，更不用说整个过程本来就有很强的非确定性。

可移植性指的是一件更朴素的事：

```js
const transcript = session.export();
revokeCredentials(oldProvider);
session = newProvider.continueFrom(transcript);
```

这份归档应当包含足够多且能够理解的信息，让另一个模型接手工作。它不应该要求旧提供商解析某个 ID、解密某段数据、记住某次搜索结果，或重新构造某份摘要。

由此可以得到五项有用的检验标准：

1. **检查：** 用户能否看到模型看到了什么、执行了哪些工具调用，以及各个 Agent 之间说了什么？
2. **导出：** 除了同样可以下载的普通产物之外，会话本身是否自包含？
3. **重放：** 另一个实现能否重建语义等价的上下文？
4. **审计：** 事后能否由人解释系统为什么执行了某个操作？
5. **删除：** 用户能否找出并删除会话所依赖的每一份服务器端副本？

响应 ID 不是转录记录，因为数据存放在服务器上；密文不是由用户控制的状态，因为用户无法解密它；引用列表也不是搜索结果放进模型上下文里的证据，因为你通常无法取得模型当时看到的同一份数据。

## 为谁而加密？

这些功能的名称和宣传方式可能会误导用户。`encrypted_content` 听起来像是一项由用户控制的隐私功能。实际上，它通常是一个客户端无法读取、只有提供商能够打开的封装。提供商选择密钥，为自己的模型解密内容，并规定这些数据可以在哪里重放。

一个更准确的名称是**提供商封存状态（provider-sealed state）**。

提供商封存确实可能带来隐私收益。例如，OpenAI 可以在客户端设置 `store: false` 时返回加密的推理内容，然后在下一次请求中只把它解密到内存里，而不持久保存中间状态。对于零数据保留（Zero Data Retention）客户来说，这优于强制使用服务器端对话存储。但是别忘了：其实一开始并没有什么东西是非加密不可的！

这种加密不会对推理提供商隐藏数据，它隐藏的是你自己的数据。

## 存储式对话把转录记录变成了指针

OpenAI 的 Responses API 默认会存储响应。文档说明，默认情况下响应对象至少保留 30 天。你可以使用 `store: false`，而且应该这样做，因为它会让接口的工作方式更接近 Completions：数据不会存储在 OpenAI 的服务器上。

新的 Gemini Interactions API 做出了类似选择。它默认设置 `store: true`。付费层的 interaction 会保留 55 天，免费层则保留一天。

显然，在服务器上保存状态这个想法很有吸引力：

```js
const first = responses.create({
  model: "frontier-model",
  input: "Investigate this production failure",
  store: true,
});

const second = responses.create({
  model: "frontier-model",
  previousResponseId: first.id,
  input: "Now implement the fix",
  store: true,
});
```

应用需要发送的数据更少；提供商可以保留隐藏的推理和工具状态；缓存路由也会更容易。但是，如果本地应用只记录用户消息和最终文本，那么 `first.id` 就成了指向一个不受本地应用控制的数据库的外键。

## 不会给你看的推理过程

所有主要实验室都声称，有正当理由不公开原始思维链。因此，在非开放权重模型上，我们通常看不到这些 token。

通过 API 无法看到原始推理。使用已存储响应时，可以通过 `previous_response_id` 恢复先前推理。使用 `store: false` 时，API 会返回 `encrypted_content`，客户端必须保存并在后续请求中重放它。即使 `reasoning.context: "all_turns"` 允许后续采样使用已保存的推理，它仍然是不透明的。

Anthropic 会在 `signature` 字段中返回加密的完整 thinking。启用可读 thinking 文本时，用户看到的是另一个模型生成的摘要，而不是原始思维链。在使用工具的轮次中，thinking 块必须原样回传。Anthropic 的文档还说明，这些 thinking 块与生成它们的模型绑定，切换模型时应将其移除。因此，这些推理轨迹即使在 Anthropic 内部也并不试图做到可移植。

所有闭源权重模型上都在重复同一种情况。

这些加密机制允许会话在一个生态系统**内部**延续，却不会产生一份能够交给另一家提供商模型使用的可移植转录记录。会话归档可以包含加密数据块，但其他模型无法利用其中的含义：

```json
{"type": "reasoning", "encrypted_content": "gAAAAAB..."}
{"type": "thinking", "thinking": "", "signature": "EqQBCg..."}
{"type": "thought", "summary": [], "signature": "EpoGCp..."}
```

## 隐藏的搜索过程

以网页搜索为例。服务器端网页搜索是转录记录中出现“隐藏空洞”的最清晰案例之一。客户端搜索工具与普通工具的行为相同：

```js
const result = search(query);
record({
  query,
  retrievedAt: now(),
  results: result.map((item) => ({
    url: item.url,
    title: item.title,
    passages: item.passages,
  })),
});
model.send({ toolResult: result });
```

用户可以检查结果排序和文本片段，重新抓取页面，保存一份副本，或把相同证据交给另一个模型。

使用托管搜索时，提供商会执行一段私有工具循环。OpenAI、Google 和 Anthropic 会公开搜索动作、引用，有时还会公开来源 URL 列表，却不会公开生成答案时使用的完整文本上下文。URL 无法带来稳定重放，因为页面内容可能变化，也可能在当时就已经被缩减为模型所见的短得多的片段。

最终答案可能完全正确。问题会在下一轮显现：

> 比较第三个来源和第一个来源，重新核对有争议的数字，然后换一个模型继续这项研究。

新模型会收到答案和几个 URL，却收不到结果排序、摘取的段落、被过滤掉的材料，也收不到第一个模型使用过的确切证据。即使下一次请求发往别处，旧提供商仍是这段会话的一部分。即使你保留了引用并重新抓取网页，也无法重现当时的精确数据。

托管搜索应当提供全保真导出模式，包含查询、结果元数据、取回的段落、时间戳和保留的内容。用户界面仍可以只显示简洁引用，但这不应成为唯一记录。

## 不透明的压缩

很长的 Agent 会话最终都需要压缩。可见且由客户端控制的摘要虽然有损，但至少可以检查和转移。用户可以审阅、编辑它，也可以让另一个模型再生成一版。

与之相反，OpenAI 的服务器端压缩会生成一条加密的压缩项。文档称它“不透明，且无意让人类理解”。独立的 `/responses/compact` 端点返回一个“规范的下一上下文窗口”，并指示客户端原样传回。

从概念上看，这一转换如下：

```js
// 之前：成本高，但可以移植
let history = [
  userMessage,
  assistantMessage,
  toolCall,
  fullToolResult,
  // ……另外 200,000 个可理解的历史 token
];

// 之后：只有原提供商才能低成本地继续
history = [
  {
    type: "compaction",
    encryptedContent: "enc_provider_only_state...",
  },
  ...recentItems,
];
```

OpenAI 可以从压缩后的含义继续，但另一家提供商只能看到一段不可读字符串和最近的一小段后缀——更准确地说，它本可以看到这些内容，只是 Pi 从来不会把这类信息传给另一家提供商。

这并不是技术上的必然。Anthropic 的服务器端压缩会返回一个带有可读 `content` 字段的 `compaction` 块。它允许客户端提供自定义摘要指令，生成的摘要可以检查，也可以传给另一个模型。使用任意提供商时，同样可以在客户端执行压缩。

OpenAI 的封存产物可能比纯文本摘要保留更多与模型相关的状态，并在原模型上有更好的表现。把它作为可选优化是合理的，但同时应该提供可读的交接摘要，而不是用它取代摘要。不过还是那句话，这一切还附带了把你进一步锁进单一生态系统的好处。

## 子 Agent 带着隐藏指令而来

多 Agent 系统让问题更加复杂，因为此时不再只有一份转录记录，而是一棵会话树和一系列 Agent 间消息。这些消息通常就是像人类写出的一样的提示，只不过现在由一台机器写给另一台机器。

OpenAI 托管的 Responses Multi-agent beta 会返回三种新的项目类型：`multi_agent_call`、`multi_agent_call_output` 和 `agent_message`。`spawn_agent` 的示例里，`message` 参数是加密的；Agent 间消息也只包含 `encrypted_content`。一旦启用 Multi-agent，每个 Agent 都会隐式启用自动服务器端压缩，即使客户端没有提出要求。它不支持推理摘要，API 还会注入开发者无法编辑或移除的 root 和 subagent 指令。

这是一整套无法转移的状态：封存的任务委派、封存的 Agent 消息、各自被自动压缩的上下文、隐藏推理，以及提供商托管的编排过程。

2026 年 6 月，开源 Codex 客户端也合入了一项相关改动。这个提交名为 [“Encrypt multi-agent v2 message payloads”](https://github.com/openai/codex/commit/5f4d06ef186b896d316620556e561d59206c3ebf)，其中直接说明了这一流程：

```json
// 父模型发出的工具调用，Codex 会这样保存它
{
  "name": "spawn_agent",
  "arguments": {
    "task_name": "worker",
    "message": "<ciphertext>"
  }
}

// 子模型收到的输入
{
  "type": "agent_message",
  "author": "/root",
  "recipient": "/root/worker",
  "content": [{
    "type": "encrypted_content",
    "encrypted_content": "<ciphertext>"
  }]
}
```

Responses API 会加密父 Agent 发出的工具参数，Codex 负责转发，API 再在内部为子 Agent 解密。Codex 自己的 `InterAgentCommunication.content` 是空的。实际任务不会出现在它的可读 rollout 和历史记录中。

这大概不只是一个抽象的模型切换问题。可以想象，如果子 Agent 改错了文件、泄露了秘密、重复了另一个 Agent 的工作，或沿用了错误假设，用户甚至无法回答一个简单问题：**那个 Agent 当时到底被要求做什么？**

一个尚未关闭的 [Codex issue](https://github.com/openai/codex/issues/28058)要求加密传输同时保留一份单独的可读审计副本。这是最低限度可以接受的设计。更好的做法是让明文 Agent 间消息继续成为常态。

## “大多数人不会在会话中途切换模型”

也许确实如此。大多数人也不会每周更换操作系统或手机运营商。但即使你没有行使这种自由，它仍然很重要，因为它会改变你与提供商之间的关系，也会改变提供商对待你的方式。

作为用户，你还可能因为模型退役、服务宕机、价格变化、策略阻止下一次请求（你好，Fable）、某个机密阶段必须在本地运行，或审计人员需要重建事件经过，而不得不迁移会话。Agent 也让会话变得越来越长：一次编程或研究会话可能积累好几天的决定和证据；个人助手甚至可能积累跨越多年的会话记录——大概如此，毕竟我们还没有真正使用它们那么多年。

离开的选项本身也会形成约束。如果提供商知道用户可以去别处继续，它就必须在模型质量、价格、可靠性和信任上竞争。如果用户积累的上下文只能由一家提供商解释，产生的激励就会非常糟糕。

## 可移植推理 API 应当承诺什么

我们希望推理提供商和 Agent 开发者采用一小组规则。

1. **本地事件日志是规范记录。** 服务器存储可以镜像或加速它，但客户端无需解析服务器 ID，也能重建会话。
2. **存储必须明确。** `store: false` 应当易用、有清楚文档，最好成为默认设置。需要保留数据的功能，应在使用时明确说明。
3. **任何不透明项目都不能成为意义的唯一载体。** 为了在同一提供商内部获得更好效果，可以包含加密推理、压缩和工具签名，但每一项都应有可读、与提供商无关的交接表示。
4. **托管工具必须保留全保真日志。** 记录确切的输入、输出、证据、筛选、来源、时间戳和内容哈希，而不只是润色后的答案和引用。
5. **子 Agent 通信必须可审计。** 为每个 Agent 保存确切且可读的任务、消息、结果、继承关系、模型和工具权限。
6. **压缩必须可检查。** 返回可读摘要、创建摘要时使用的指令，以及足以理解哪些内容被丢弃的来源信息。
7. **产物必须可导出。** 文件、容器输出、搜索快照和生成媒体，都应能下载到一个按内容寻址的本地归档中。

## 蒸馏其实很棒

在模型层面，还存在一种相关的锁定。

美国一些最大的闭源权重实验室，对外部蒸馏表现得越来越敌对。Anthropic 在 [2026 年 2 月的一篇文章](https://www.anthropic.com/news/detecting-and-preventing-distillation-attacks)中指控 DeepSeek、Moonshot 和 MiniMax 开展相关行动，并称其为“蒸馏攻击”。Anthropic 的商业条款规定客户拥有输出，却禁止使用其服务训练竞争性 AI 模型。与此同时，Anthropic 自己的文章也承认，当前沿实验室对自己的模型使用蒸馏时，“蒸馏是一种被广泛使用且合理的训练方法”。

Anthropic 使用机器人从公共网络收集数据用于模型开发，还以切开纸质书并扫描而闻名。OpenAI 同样表示会使用公开互联网内容训练模型，并主张用公开可访问的互联网材料训练属于合理使用。两家公司都把内部用于生产较小模型的蒸馏描述成正常方法。OpenAI 还提供过明确的[第一方 API 蒸馏工作流](https://openai.com/index/api-model-distillation/)，允许使用更强 OpenAI 模型的输出微调较小的 OpenAI 模型。

其中的道德不对称显而易见。这些实验室要求社会接受机器可以学习人类放在互联网上的海量作品——往往没有事先取得个人许可——却坚持其他机器不能学习这些实验室生成的输出。这个原则最宽泛的版本，恰好允许知识流入封闭模型，却不允许再从中流出。

我们认为，对蒸馏的默认态度应该从敌视转向支持。蒸馏可以把昂贵的前沿能力转化为更小、更便宜、更快的模型，让它们能够在本地、离线、受限硬件或用户自己的控制下运行。它可以增加竞争，在 API 消失后保留能力，并减少常见任务所需的算力和能源。

## 最低限度的自由

用户应该能够关闭一个账户、保留一段会话，再把它交给另一个模型。新模型可能不同意此前的结论，可能追问问题，也可能表现更差，但它不应在旧模型能够看到用户历史、证据、计划和委派工作的位置，只看到一段密文。

我们不反对提供商构建更好的有状态 API。我们反对的是把更好的性能与更少的用户控制绑在一起。状态存储应当可选，托管工具应当可观察，压缩应当可读，Agent 通信应当可审计；理想情况下，不透明推理应该不再不透明，或者至少要有可移植的交接表示。蒸馏应该成为一条让能力更普及的路径，而不是用来筑起更高围墙的禁忌。

::: info 译者说明
本文为 Earendil Engineering 原文的完整中文译文。中文译文及适配部分经授权按 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh-hans) 发布；英文原文版权归 Earendil 所有。如中文表述与原文存在歧义，请以[英文原文](https://earendil.com/posts/session-portability/)为准。
:::

## 继续阅读

- [英文原文：The Session You Cannot Take With You](https://earendil.com/posts/session-portability/)
- [下一篇：Pi 中的压缩机制](/translations/compaction-in-pi)
