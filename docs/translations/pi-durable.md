---
title: Pi Durable
description: Earendil《Pi Durable》完整中文译文：长期运行、崩溃恢复、并发对话、可持久化扩展、后台压缩与多人协作。
prev:
  text: Pi 1.0
  link: /translations/pi-1-0
next:
  text: 官方授权译文目录
  link: /translations/
---

<span class="library-status">Earendil 官方授权中文译文 · 14</span>

# Pi Durable

> - **原文标题**　*Pi Durable*
> - **作者**　Earendil Engineering `<rfc@earendil.com>`
> - **发布日期**　2026-10-01
> - **原文地址**　[earendil.com/posts/pi-durable](https://earendil.com/posts/pi-durable/)
> - **授权说明**　经 Earendil 授权改编与翻译（*Adapted and translated with permission from Earendil.*）
> - **译文许可**　[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh-hans)

::: tip 译者说明
本文按原文顺序完整翻译，保留全部代码示例及英文代码注释，并附原文终端录屏与中文步骤说明。示例中的模型、路径和外部服务沿用原文，不代表已在本书环境实测。Pi Durable 是实验性框架，API 可能变化；入门导读见[Pi Durable：让 Agent 在中断后继续工作](/guide/pi-durable)。
:::

今天，Earendil 与 Pi 社区[发布了 Pi 1.0](/translations/pi-1-0)。这体现了我们的信念：经过无数小时的打磨、维护和持续开发，Pi 如今已经是一个坚实的构建基础。同时，Pi 还在继续演进。与 Pi 1.0 一同发布的，还有一个名为 Pi Durable 的实验性新包。它专为能够在各处运行、持续工作、可靠恢复且易于改造的 Agent 而构建。欢迎你加入，一起把它做成最好的持久化 Harness。

## 为什么需要 Pi Durable？

Pi 编程助手的设计目标，是在你的本地或远程机器上、在终端里，由一个人驱动运行。如果进程退出了，你查看发生了什么，再让它继续。这正是 Pi 1.0 专注并擅长的事情，这一点不会改变。

在 Earendil，我们希望以最适合每个人需求的形式，把这项技术带给所有人。为此，我们需要一个能够在各处运行、从不同界面接入、支持无限延续的对话、经受住严重的内部和外部故障，并允许多个人共同引导同一个 Agent 的 Harness。

Pi Durable 就是这样的 Harness。它不会取代 Pi 编程助手，而是一个用于构建各类 Agent 应用的框架，编程助手也包括在内。它与 Pi 编程助手不仅共享 pi-ai 等代码，也共享极简与可塑性的原则。

它还让我们能在不干扰 Pi 编程助手的情况下探索这一领域的设计。我们用 Pi Durable 构建 Agent 应用时获得的经验，只要被证明有价值，就会反过来融入 Pi 编程助手。

## 什么是 Harness？

每个人对 Harness 都有自己的定义。我们[之前写过这个话题](/translations/what-is-a-harness)，这里再结合 Pi Durable 重新介绍一下。

Harness 是存储，加上让一个或多个大语言模型对话并行运行所需的机制。它提供模型能够调用的工具，以及工具运行的执行环境。

对话是你与 Agent 的交互，以转录记录的形式保存。Agent 则是大语言模型，加上思考级别等设置，以及它能调用的工具。

工具通过执行环境完成工作。执行环境可以是你的笔记本电脑、远程虚拟机，也可以是内存中的沙箱。每段对话都可以自行决定使用哪些工具和哪种执行环境。

Harness 运行的所有事情，从调用模型到执行工具，都是任务。

和 Pi 的其他部分一样，Pi Durable 的设计也以让你的 Agent 能理解它为目标。不含测试的全部源码约为 15,000 行，按 GPT 计算约 150,000 Token，按 Claude 计算约 250,000 Token。这还是最坏的情况。基于 Pi Durable 开发时，你的 Agent 很少需要读完所有代码；仅存储后端就占了约 3,000 行，通常可以跳过。

下面带你简要看看 Pi Durable，说明我们构建了什么，以及为什么这样构建。

## 在各处长期运行

我们希望 Agent 能长时间运行，也能在各处运行。目前，“各处”指的是任何有 JavaScript 运行时的地方。

在 Pi Durable 中，Harness 在一个存储后端之上打开。它自带内存、SQLite 和 JSONL 存储，也提供一致性测试套件与基准测试，供你实现自己的后端。SQLite 和 JSONL 的存储代码不使用 Node API，因此只需一个小型适配器，就能运行在 Bun 或 Cloudflare Durable Object 中。存储接口很小，很容易基于你已有的系统实现，例如键值存储或 Postgres。同一时刻，一个存储由一个进程持有，其他客户端连接到这个进程。

使用 SQLite 时，Harness 只把工作集留在内存里：活跃的转录记录、正在运行的任务，以及等待处理的提交。其他内容都保留在磁盘上，直到需要时才读取。活跃转录记录的大小自然受到模型上下文窗口的约束，因为压缩会在旧消息溢出窗口前先做摘要。所以，即使一段对话有数万条消息，也能以适中的内存占用运行。

需要文件或 Shell 的工具，通过执行环境获取它们。Pi Durable 自带 Node 执行环境，让工具访问本地文件。和存储一样，执行环境接口也很小，容易实现，因此你也可以向工具提供远程执行环境。这样，Harness 可以运行在一台机器上，工具运行在另一台机器上。你的 `env` 函数根据对话的工作目录，为每次工具调用构建环境，让不同对话可以在不同地方运行。

``` typescript
import { BACKGROUND_CONTEXT } from "@earendil-works/chord/context";
import { createModels } from "@earendil-works/pi-ai/models";
import { openaiProvider } from "@earendil-works/pi-ai/providers/openai";
import { createRegistry, Harness } from "@earendil-works/pi-durable";
import { NodeExecutionEnv } from "@earendil-works/pi-durable/env/node";
import {
    openNodeSqliteStorage,
} from "@earendil-works/pi-durable/storage/sqlite/node";
import { CodingTools } from "@earendil-works/pi-durable/tools";

const context = BACKGROUND_CONTEXT; // every call takes a context for cancellation
const models = createModels();
models.setProvider(openaiProvider());

const registry = createRegistry();
registry.install(CodingTools); // read, write, edit, bash

const env = ({ cwd }: { cwd?: string }) =>
    new NodeExecutionEnv({ cwd: cwd ?? process.cwd() });
const harness = await Harness.open(
    await openNodeSqliteStorage("./agent.sqlite"),
    { models, registry, env },
    context,
);
// The root conversation: created on first use, and the same one after every
// restart.
const root = await harness.root(context, {
    agent: {
        model: { provider: "openai", modelId: "gpt-6.1-sol" },
        cwd: "/work/repo",
    },
});
```

## 经受住崩溃

我们希望 Agent 在进程退出后仍能恢复，无论原因是笔记本休眠、容器重新部署，还是机器内存耗尽，都能从中断处继续。

在 Pi Durable 中，一次运行的每一步都是任务，前进之前都会保存检查点。如果进程退出，新进程打开同一份存储，找到尚未完成的任务，再从各自最后的检查点继续。被中断的模型请求会重新发送；已经生成的部分回答仍保留在转录记录中，并标记为已中止。被中断的工具调用，如果可以安全重跑就会重跑；否则，模型会收到调用已中断的通知。

Pi Durable 没有内置子 Agent，但只需几行代码就能构建，下方的 triage 工具会展示这一点。子 Agent 在自己的对话里运行，因此也能从中断处继续。可以安全重跑的子 Agent 工具，会重新找到原来的子 Agent，再等待它的回答。已经排队的消息仍然保留在队列中。`requestId` 让一次提交只被接受一次（exactly-once），因此客户端在崩溃后重试时，拿到的是原来的提交，而不会重复提问。

``` typescript
const job = {
    type: "input",
    content: "Fix the flaky login test",
    requestId: "job-42",
} as const;
await root.submit(job, context);
// The process dies here, in the middle of a tool call.

// A new process opens the same storage.
const harness = await Harness.open(
    await openNodeSqliteStorage("./agent.sqlite"),
    { models, registry, env },
    context,
);
harness.resume(); // continue the interrupted run
const root = await harness.root(context);
// the same submission, answered
const settled = await (await root.submit(job, context)).wait(context);
```

## 同时进行多段对话

我们希望一个 Harness 能同时运行多段对话，彼此不会阻塞。

在 Pi Durable 中，一个 Harness 可以按需并发运行任意数量的对话，并为它们提供相同的保障。对话可以全新开始，也可以在另一段对话转录记录的任意位置分叉；分叉能看到父对话截至那个位置的历史，无需复制这些记录。

想象一个 Slack 频道，你的 Agent 会回应任何人的提及。随后，有人开启了一个讨论串。频道可以是一段对话，讨论串则是在它所回复的消息处分叉出来的另一段对话。两者同时运行，互不阻塞。

``` typescript
const channel = await harness.root(context);
const question = await channel.submit(
    { type: "input", content: "@agent why did the deploy fail?" },
    context,
);
const answered = await question.wait(context);

// Someone replies to the agent's answer in a thread. Every conversation names
// its owner, which decides what an abort reaches (more on that under Tasks).
// The thread has none.
const thread = await channel.fork(
    answered.answer!,
    { ownership: { kind: "ownerless" } },
    context,
);

// Both conversations work at the same time.
const inThread = await thread.submit(
    { type: "input", content: "@agent can we roll it back?" },
    context,
);
const inChannel = await channel.submit(
    { type: "input", content: "@agent who is on call today?" },
    context,
);
await Promise.all([inThread.wait(context), inChannel.wait(context)]);
```

每段对话还保存自己的 Agent 配置：模型、思考级别、选中的扩展及其中启用的工具、附加指令，以及执行环境中的工作目录。主 Agent 旁边的审阅 Agent，可以使用更便宜的模型、只读工具和自己的代码检出目录。

## 扩展

我们希望 Agent 的所有能力都可以插拔，并且每个接入的部分都能参与持久化与恢复。

在 Pi Durable 中，扩展是一组有名字的系统提示片段、工具、钩子和任务。应用把扩展安装到注册表里。每段对话选择自己使用的扩展和工具，保存的只有它们的名称。

### 系统提示片段

每次请求前，系统提示都会根据该对话所选扩展的片段重新构建，因此某个片段发生变化，下一次请求就会用到。Pi Durable 会把变化记录在转录记录中实际发生变化的位置，确保重启或分叉后，看到的仍是模型当时看到的内容。对于支持在对话中途修改系统提示和工具的模型，只会发送变化的部分，因此提示缓存仍然有效。

``` typescript
import { defineExtension, section } from "@earendil-works/pi-durable";

const ProjectContext = defineExtension({
    name: "project-context",
    sections: [
        // Read from the conversation's execution environment. The files can be
        // loaded and watched in the background; every request renders the
        // latest state.
        section("agents_md", (input) => agentsMd.latest(input.env)),
        section("skills", (input) => skills.latest(input.env)),
    ],
});
```

### 工具

每次工具调用都作为独立的持久化任务运行，并在执行前保存调用意图。崩溃后，只有工具明确声明可以安全重跑，才会再次执行。否则，模型会收到调用中断的通知，以及目前已保存的输出，再决定下一步怎么做。每段对话也可以获得自己的一套工具，例如前面那个 Slack 讨论串，可以搜索，但不能部署。

``` typescript
import { Type } from "@earendil-works/pi-ai";
import { defineTool } from "@earendil-works/pi-durable";

const searchIssues = defineTool({
    name: "search_issues",
    description: "Search the issue tracker",
    parameters: Type.Object({ query: Type.String() }),
    replay: "safe", // only reads, so a rerun after a crash is fine
    execute: async (args, api) => {
        // streamed to every client watching
        api.output(`searching for ${args.query}\n`);
        return {
            content: [{ type: "text", text: await tracker.search(args.query) }],
        };
    },
});

const deploy = defineTool({
    name: "deploy",
    description: "Deploy a version to production",
    parameters: Type.Object({ version: Type.String() }),
    // No replay: a deploy interrupted by a crash is reported to the model,
    // never repeated.
    execute: async (args) => ({
        content: [{ type: "text", text: await ci.deploy(args.version) }],
    }),
});

registry.install(defineExtension({ name: "ops", tools: [searchIssues, deploy] }));

// The thread may search, but not deploy.
await thread.configure({ tools: { remove: [deploy] } }, context);
```

工具会获得此次调用的 Harness API：它可以提交记录和文档、启动任务和对话，以及与其他对话通信。因此，用几行代码就能实现子 Agent。工具创建一段归自己所有的对话，为它指定较小的模型和专门的指令，再等待它回答。子 Agent 和其他对话没有区别，所以它也能在崩溃后恢复、单独统计成本，界面也可以把它展示在对应工具调用的下方。

``` typescript
import type { AssistantMessage } from "@earendil-works/pi-ai";
import { AssistantEntry, configure } from "@earendil-works/pi-durable";

const triage = defineTool({
    name: "triage",
    description: "Label an incoming issue as bug, feature, or question",
    parameters: Type.Object({ issue: Type.String() }),
    // a rerun after a crash finds the same subagent and the same submission
    replay: "safe",
    execute: async (args, api, context) => {
        const child = await api.commit(async (tx) => {
            const existing = (
                await tx.scanConversations({ ownerTaskId: api.taskId }, 1)
            ).items[0];
            if (existing !== undefined) return existing.id;
            // Owned by this call, so aborting the call aborts the subagent.
            const created = await tx.createConversation({
                ownership: { kind: "task", taskId: api.taskId },
            });
            // It starts as a copy of this conversation's agent. Make it a small
            // model without tools.
            await configure(tx, created.id, {
                model: { provider: "openai", modelId: "gpt-6-luna" },
                tools: [],
                instructions: "Answer with one word: bug, feature, or question.",
            });
            return created.id;
        }, context);
        // lets a UI show the subagent under the call
        await api.details({ conversationId: child }, context);
        const subagent = await api.conversation(child, context);
        const request = {
            type: "input",
            content: args.issue,
            requestId: `triage:${api.taskId}`,
        } as const;
        const settled = await (
            await subagent!.submit(request, context)
        ).wait(context);
        // The answer is an entry in the subagent's transcript. Read it and take
        // its text.
        const entry = await api.commit(
            (tx) => tx.entry(AssistantEntry, settled.answer!),
            context,
        );
        const message = entry?.model?.[0] as AssistantMessage;
        const text = message.content
            .flatMap((content) => (content.type === "text" ? [content.text] : []))
            .join("");
        return { content: [{ type: "text", text }] };
    },
});
```

扩展也能修改其他扩展的工具。后加载的扩展如果提供同名工具，就会替换先前的工具，例如把 bash 换成在 Python 虚拟环境里运行的版本。包装器会装饰最终生效的那个工具；只要某段对话选中了提供包装器的扩展，这个包装就会生效。

``` typescript
import { wrapTool } from "@earendil-works/pi-durable";
import { createBashTool } from "@earendil-works/pi-durable/tools";

// Times every bash call, whichever bash the conversation ends up with.
const Timing = defineExtension({
    name: "timing",
    wraps: [
        wrapTool(createBashTool(), (bash) => ({
            ...bash,
            execute: async (args, api, context) => {
                const start = Date.now();
                try {
                    return await bash.execute(args, api, context);
                } finally {
                    metrics.record("bash", Date.now() - start);
                }
            },
        })),
    ],
});
```

### 钩子

钩子让扩展能够介入任务，包括生成模型回复、调用工具和执行压缩等内置任务。它们可以在请求发给模型之前改写请求，阻止或改写工具调用，替换结果，让一次运行继续，或者自己编写摘要。崩溃后，钩子可能再次运行，因此需要作出决策的钩子，会把决策存进 memo：这是一个随任务保存的小值，以第一次写入为准。

``` typescript
import { hook, ToolTask } from "@earendil-works/pi-durable";

const Approval = defineExtension({
    name: "approval",
    hooks: [
        hook(ToolTask, {
            beforeTool: async (call, api, context) => {
                if (call.name !== "deploy") return undefined;
                // After a restart, the hook finds the stored answer instead of
                // asking again.
                let approved = await api.memo<boolean>(
                    "approval:deploy",
                    context,
                );
                approved ??= await api.memo(
                    "approval:deploy",
                    await askInSlack(call),
                    context,
                );
                return approved
                    ? undefined
                    : { block: "Nobody approved the deploy." };
            },
        }),
    ],
});
```

多个扩展可以对同一件事设置钩子。钩子按对话选择扩展的顺序组成调用链，每种钩子都定义了自己在链上的运行方式。`beforeTool` 会把改写后的参数继续向后传递，遇到第一个阻止决定就停止。`afterTool` 会把结果沿链传递。`onYield` 遇到第一个要求继续运行的钩子就停止。`afterResponse` 等观察型钩子则始终全部执行。如果某个钩子抛出异常，系统会报告异常并继续执行后续钩子；但 `beforeTool` 是例外，异常会阻止这次工具调用。

### 任务

Harness 使用内置任务运行对话：每次模型请求、每次工具调用，以及每次压缩，都有对应的任务。扩展也能带来自己的任务，并获得相同的机制：每一步后的检查点、重启后仍然有效的定时器，以及等待其他任务的能力。

一个将账单分摊到多张银行卡的结账流程，会同时向每张卡扣款。如果其中一张卡被拒付，其他付款任务就会中止，并自行退款：

``` typescript
import { defineTask, type TaskId } from "@earendil-works/pi-durable";

const Payment = defineTask<{ card: string }, { phase: "charge" }, string>({
    name: "shop.payment",
    version: 1,
    initial: () => ({ phase: "charge" }),
    phases: {
        charge: async (task, runtime, context) => {
            // The key makes the charge idempotent: if a crash reruns this
            // phase, the card is only charged once.
            const charge = await bank.charge(
                task.input.card,
                `payment-${task.id}`,
            );
            await runtime.commit(
                () => ({
                    status: "terminal",
                    outcome: charge.ok
                        ? { status: "completed", result: charge.receipt }
                        : { status: "failed", error: { message: charge.error } },
                }),
                context,
            );
        },
    },
    // Another payment failed, or the checkout was cancelled: undo this one.
    abort: async (task, runtime, context) => {
        await bank.refund(`payment-${task.id}`);
        await runtime.commit(
            () => ({ status: "terminal", outcome: { status: "aborted" } }),
            context,
        );
    },
});

type CheckoutState =
    | { phase: "pay" }
    | { phase: "decide"; payments: TaskId<string>[] };
const Checkout = defineTask<{ cards: string[] }, CheckoutState, string>({
    name: "shop.checkout",
    version: 1,
    initial: () => ({ phase: "pay" }),
    phases: {
        pay: async (task, runtime, context) => {
            await runtime.commit(async (tx) => {
                const payments: TaskId<string>[] = [];
                for (const card of task.input.cards) {
                    payments.push(
                        await tx.createTask(Payment, { card }, {
                            ownership: { kind: "task", taskId: task.id },
                        }),
                    );
                }
                // Run no code until every payment is done. The first failed
                // payment aborts the others.
                return {
                    status: "waiting",
                    checkpoint: { phase: "decide", payments },
                    on: payments,
                    policy: "failFast",
                };
            }, context);
        },
        decide: async (task, runtime, context) => {
            const outcomes = await runtime.outcomes(
                task.state.checkpoint.payments,
                context,
            );
            const paid = outcomes.every(
                (outcome) => outcome.status === "completed",
            );
            await runtime.commit(
                () => ({
                    status: "terminal",
                    outcome: paid
                        ? { status: "completed", result: "Order placed." }
                        : {
                            status: "failed",
                            error: { message: "A payment failed." },
                        },
                }),
                context,
            );
        },
    },
    abort: (_task, runtime, context) =>
        runtime.commit(
            () => ({ status: "terminal", outcome: { status: "aborted" } }),
            context,
        ),
});

// The agent starts a checkout with a tool.
const checkout = defineTool({
    name: "checkout",
    description: "Pay for the cart, split across several cards",
    parameters: Type.Object({ cards: Type.Array(Type.String()) }),
    execute: async (args, api, context) => {
        // Owned by this call: aborting the call aborts the checkout and refunds
        // its payments.
        const owner = {
            ownership: { kind: "task", taskId: api.taskId },
        } as const;
        const id = await api.createTask(
            Checkout,
            { cards: args.cards },
            owner,
            context,
        );
        const { outcome } = (await api.waitForTask(id, context)).state;
        const text =
            outcome.status === "completed" ? outcome.result : outcome.status;
        return { content: [{ type: "text", text }] };
    },
});

registry.install(defineExtension({
    name: "shop",
    tools: [checkout],
    tasks: [Payment, Checkout],
}));
```

任务和对话共同组成一棵归属树。中止一个任务，会从下往上中止归它所有的工作，让每个任务先清理自己产生的影响；只有它拥有的工作全部结束，它自己才算结束。子 Agent 也是同样的模式：一段归启动它的工具调用所有的对话。

任务默认在前台运行，属于对话当前正在处理的工作。只有这些任务完成，对话才会进入空闲状态；中止对话时，例如用户按下 Esc，也会中止这些任务及其拥有的全部工作。后台任务归属于对话，但不属于对话当前的工作。它运行时，对话仍可进入空闲状态；普通的中止操作不会影响它及其拥有的工作。

这适合那些需要在启动它们的回合结束后继续运行的子 Agent，或明天才触发的提醒。直接中止任务本身，或者使用 `{ background: true }` 中止对话，仍然会让它们停止。

``` typescript
// Part of the current work: Esc aborts it, and the conversation waits for it.
await api.createTask(
    Checkout,
    input,
    { ownership: { kind: "task", taskId: api.taskId } },
    context,
);

// Side work: the conversation goes idle while it runs, and Esc leaves it alone.
await api.createTask(
    Reminder,
    input,
    { ownership: { kind: "conversation" }, background: true },
    context,
);
```

## 压缩

我们希望长对话能一直进行下去，不必让 Agent 停下来等待摘要。

在 Pi Durable 中，压缩和其他工作一样也是任务，可以在对话继续进行时运行。当上下文接近模型上限，后台压缩会为较早的消息生成摘要，并在下一个回合边界放入摘要。只有当下一次请求不借助摘要就无法装进上下文窗口时，对话才会等待摘要完成。如果提供商仍以请求过长为由拒绝，Harness 会压缩并重试一次。你也可以随时手动压缩，并提供自己的指令。

较早的消息始终保留在存储中。

``` typescript
const harness = await Harness.open(storage, {
    models,
    registry,
    settings: {
        compaction: {
            // past contextWindow - reserveTokens, the next request waits for a
            // summary
            reserveTokens: 16384,
            // this far before that, a summary starts in the background
            backgroundTokens: 32768,
        },
    },
}, context);

// Manual, also while the agent is working.
await root.compact("Keep the names of the failing tests", context);
```

`reset()` 更进一步：它会开启新的上下文，也可以用一份交接说明作为起点。工具通过返回 `control: { handoff }`，也能提出同样的请求。由于没有任何内容被删除，另一个工具仍然可以搜索交接之前的全部内容。这样，就能构建一个把工作交接给自己、之后再回查历史的 Agent。

``` typescript
const handoff = defineTool({
    name: "handoff",
    description:
        "Start over from a handoff note. " +
        "Older messages stay searchable with search_history.",
    parameters: Type.Object({ note: Type.String() }),
    execute: async (args, api, context) => {
        // Queued behind the handoff, so it starts the next run in the new
        // context.
        const self = await api.conversation(api.conversationId, context);
        await self!.submit(
            {
                type: "input",
                content: "Continue.",
                requestId: `handoff:${api.taskId}`,
            },
            context,
        );
        // Ends this run and starts a new context from the note, like
        // reset(note).
        return {
            content: [{ type: "text", text: "Handing off." }],
            control: { handoff: args.note },
        };
    },
});

const searchHistory = defineTool({
    name: "search_history",
    description: "Search older messages, including those before a handoff",
    parameters: Type.Object({ text: Type.String() }),
    replay: "safe",
    execute: async (args, api, context) => {
        // Tools read records through a transaction too. One that writes
        // nothing stores nothing.
        const page = await api.commit(
            (tx) => tx.scanEntries({ conversationId: api.conversationId }, 200),
            context,
        );
        const hits = page.items.filter((entry) =>
            JSON.stringify(entry.model ?? []).includes(args.text),
        );
        const text = hits.map((entry) => JSON.stringify(entry.model)).join("\n");
        return { content: [{ type: "text", text }] };
    },
});
```

## 应用状态也能持久保存

我们希望，构建在 Agent 之上的应用，其状态能像对话本身一样可靠地持久保存。

在 Pi Durable 中，待办清单、计划、工单，或对话运行所在的沙箱等应用状态，都保存在文档中。文档是带类型的 JSON，与转录记录一同存储，并在同一次原子提交中修改，因此状态不会与产生它的转录记录相互矛盾。每种文档都声明分叉应从什么状态开始：父对话在分叉点时的值、它当前的值，或者一个全新的值。

``` typescript
import { defineDoc } from "@earendil-works/pi-durable";

const Todos = defineDoc<{ items: string[] }>({
    kind: "app.todos",
    version: 1,
    scope: "conversation",
    history: "rewindable",
    fork: "asOf", // a fork starts with the todos its parent had at the fork entry
    initial: () => ({ items: [] }),
});

const Todo = defineExtension({
    name: "todo",
    tools: [
        defineTool({
            name: "todo",
            description: "Add an item to your todo list",
            parameters: Type.Object({ item: Type.String() }),
            execute: async (args, api, context) => {
                await api.commit(async (tx) => {
                    const todos = await tx.doc(Todos, api.conversationId);
                    todos.items.push(args.item);
                }, context);
                const text = `Added ${args.item}`;
                return { content: [{ type: "text", text }] };
            },
        }),
    ],
    // The model sees the list before every request.
    sections: [
        section("todos", async (input, context) => {
            const todos = await input.read.snapshot(
                Todos,
                input.conversationId,
                context,
            );
            return todos?.items.join("\n") || undefined;
        }),
    ],
});

// A UI subscribes to the committed value.
const todos = await harness.documentState(Todos, channel.id, context);
todos?.subscribe((value) => renderTodos(value?.items ?? []));
```

## 可塑性

我们希望不停止 Agent，也能修改它正在使用的代码。

在 Pi Durable 中，对话运行时，注册表仍然可以变化。用一个已经安装过的名称安装扩展，会一次性替换原扩展。已经开始的工具调用，继续使用开始时的代码完成；下一次调用则使用新代码。对话只保存扩展和工具的名称，从不保存代码，因此重启后，它们会使用新进程安装的实现。

``` typescript
// The extension's file changed on disk.
// same name "ops": replaces the installed one
registry.install(await loadExtension("./ops.ts"));
```

## 多人协作

我们希望多个人和多个客户端能同时参与同一段对话：观看过程、中途加入，并引导它。

在 Pi Durable 中，界面需要的一切都是已提交的状态，因此任意数量的客户端都可以连接到 Harness 中的任意对话。客户端先获取当前视图：转录记录、正在流式生成的回答、运行中的工具及其输出、排队的消息、Agent 配置和用量。此后只接收发生变化的部分。中途加入或重新连接的客户端，从当前视图开始。任何客户端都可以引导正在运行的对话，或将后续消息加入队列。

``` typescript
// A second client joins the thread while the agent is working.
const view = await thread.viewState(context);
render(view.value);
view.subscribe((value) => render(value));

// And steers it. The message joins the running work after the current tool
// calls.
await thread.submit(
    { type: "input", content: "Check the staging logs first", whenBusy: "steer" },
    context,
);
```

对于远程客户端，`thread.watch()` 会提供每次提交的精确操作，数据足够小，适合通过 Socket 发送。如果你更喜欢编程助手里熟悉的事件，`watchEvents()` 可以把提交转换成那些事件，代价是传输的数据更多。

## 试试看

你今天就可以尝试 Pi Durable。它仍是实验性的，API 可能继续变化。把你的 Agent 指向 Pi 代码检出目录里的 `packages/durable`，让它阅读 [README](https://github.com/earendil-works/pi/blob/main/packages/durable/README.md)、三十多个[示例](https://github.com/earendil-works/pi/tree/main/packages/durable/test/examples)、[基于 Pi Durable 的小型编程助手](https://github.com/earendil-works/pi/tree/main/packages/coding-agent/src/experimental/durable)，或这个漂亮的[旅行规划 Agent](https://github.com/earendil-works/pi/tree/main/packages/coding-agent/src/experimental/vacation)，然后开始构建。

旅行规划器大约有 1,300 行 TypeScript，其中大部分是终端界面。如果它看起来像编程助手，那只是因为它借用了 Pi 编程助手的终端界面组件。



<PiTerminalReplay src="/recordings/earendil/pi-durable.cast" poster="npt:0:17" title="Pi Durable · 旅行规划 Agent" />

**原文录屏步骤（中文说明）**

1. 一个基于 Pi Durable、带终端界面的旅行规划器。
2. 子 Agent 并行执行三次搜索，每次搜索都是一个持久化任务。
3. 与此同时，主 Agent 仍然可以聊天。
4. 进程退出。天气和博物馆搜索已完成，火车搜索尚未完成。
5. 重新启动。`search` 可以安全重跑，因此只有火车搜索再次运行。
6. 切换到子 Agent，并给它新的引导。
7. 回到主 Agent：在它工作时提问、压缩上下文，并继续引导。
8. 报告以消息形式送达；主 Agent 将它整理成旅行计划。



在 Pi 代码检出目录中，运行这两个演示：

``` bash
npm install && npm run build
node packages/coding-agent/src/experimental/durable/main.ts
node packages/coding-agent/src/experimental/vacation/main.ts
```

在你自己的项目中基于 Pi Durable 开发：

``` bash
npm install @earendil-works/pi-durable @earendil-works/pi-ai @earendil-works/chord
```

未来几周，我们会继续介绍 Pi Durable，并展示我们用它构建、辅助日常工作的小型 Agent 工具，例如 Slack 机器人或 GitHub 问题分流机器人。现在先不透露太多。就像我们自己也使用 Pi 一样，随着我们亲自使用 Pi Durable，还会有更多内容发布。

## 常见问题

### 为什么又选 TypeScript？

因为这是最快把它搭起来的办法。不过，大家现在都知道，把所有东西移植到 Rust 或汇编“很容易”。我们不排除未来这样做，但目前会专注于 TypeScript。

---

继续阅读：[Pi Durable 入门专篇](/guide/pi-durable) · [Pi 1.0 发布译文](/translations/pi-1-0) · [官方版本档案](/releases/)
