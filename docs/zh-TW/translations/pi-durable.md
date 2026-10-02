---
title: Pi Durable
description: Earendil《Pi Durable》完整中文譯文：長期執行、崩潰恢復、併發對話、可持久化擴充、後台壓縮與多人協作。
prev:
  text: Pi 1.0
  link: /zh-TW/translations/pi-1-0
next:
  text: 官方授權譯文目錄
  link: /zh-TW/translations/
---

<span class="library-status">Earendil 官方授權中文譯文 · 14</span>

# Pi Durable

::: info 繁體轉換版說明
本頁為簡中授權譯文之繁體轉換版。英文原文版權歸 Earendil 所有，中文譯文及轉換部分按 CC BY 4.0 發布。如有歧義，請以英文原文為準。
:::

> - **原文標題**　*Pi Durable*
> - **作者**　Earendil Engineering `<rfc@earendil.com>`
> - **釋出日期**　2026-10-01
> - **原文地址**　[earendil.com/posts/pi-durable](https://earendil.com/posts/pi-durable/)
> - **授權說明**　經 Earendil 授權改編與翻譯（*Adapted and translated with permission from Earendil.*）
> - **譯文許可**　[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh-hans)

::: tip 譯者說明
本文按原文順序完整翻譯，保留全部程式碼示例及英文程式碼註釋，並附原文終端機錄屏與中文步驟說明。示例中的模型、路徑和外部服務沿用原文，不代表已在本書環境實測。Pi Durable 是實驗性框架，API 可能變化；入門導讀見[Pi Durable：讓 Agent 在中斷後繼續工作](/zh-TW/guide/pi-durable)。
:::

今天，Earendil 與 Pi 社群[釋出了 Pi 1.0](/zh-TW/translations/pi-1-0)。這體現了我們的信念：經過無數小時的打磨、維護和持續開發，Pi 如今已經是一個堅實的構建基礎。同時，Pi 還在繼續演進。與 Pi 1.0 一同釋出的，還有一個名為 Pi Durable 的實驗性新包。它專為能夠在各處執行、持續工作、可靠恢復且易於改造的 Agent 而構建。歡迎你加入，一起把它做成最好的持久化代理框架（Agent Harness）。

## 為什麼需要 Pi Durable？

Pi 程式設計助手的設計目標，是在你的本地或遠端機器上、在終端機裡，由一個人驅動執行。如果程序退出了，你檢視發生了什麼，再讓它繼續。這正是 Pi 1.0 專注並擅長的事情，這一點不會改變。

在 Earendil，我們希望以最適合每個人需求的形式，把這項技術帶給所有人。為此，我們需要一個能夠在各處執行、從不同介面接入、支援無限延續的對話、經受住嚴重的內部和外部故障，並允許多個人共同引導同一個 Agent 的代理框架。

Pi Durable 就是這樣的代理框架。它不會取代 Pi 程式設計助手，而是一個用於構建各類 Agent 應用的框架，程式設計助手也包括在內。它與 Pi 程式設計助手不僅共享 pi-ai 等程式碼，也共享極簡與可塑性的原則。

它還讓我們能在不干擾 Pi 程式設計助手的情況下探索這一領域的設計。我們用 Pi Durable 構建 Agent 應用時獲得的經驗，只要被證明有價值，就會反過來融入 Pi 程式設計助手。

## 什麼是代理框架？

每個人對代理框架都有自己的定義。我們[之前寫過這個話題](/zh-TW/translations/what-is-a-harness)，這裡再結合 Pi Durable 重新介紹一下。

代理框架是儲存，加上讓一個或多個大語言模型對話並行執行所需的機制。它提供模型能夠呼叫的工具，以及工具執行的執行環境。

對話是你與 Agent 的互動，以轉錄記錄的形式儲存。Agent 則是大語言模型，加上思考級別等設定，以及它能呼叫的工具。

工具透過執行環境完成工作。執行環境可以是你的膝上型電腦、遠端虛擬機器，也可以是記憶體中的沙箱。每段對話都可以自行決定使用哪些工具和哪種執行環境。

代理框架執行的所有事情，從呼叫模型到執行工具，都是任務。

和 Pi 的其他部分一樣，Pi Durable 的設計也以讓你的 Agent 能理解它為目標。不含測試的全部原始碼約為 15,000 行，按 GPT 計算約 150,000 Token，按 Claude 計算約 250,000 Token。這還是最壞的情況。基於 Pi Durable 開發時，你的 Agent 很少需要讀完所有程式碼；僅儲存後端就佔了約 3,000 行，通常可以跳過。

下面帶你簡要看看 Pi Durable，說明我們構建了什麼，以及為什麼這樣構建。

## 在各處長期執行

我們希望 Agent 能長時間執行，也能在各處執行。目前，“各處”指的是任何有 JavaScript 執行時的地方。

在 Pi Durable 中，代理框架在一個儲存後端之上開啟。它自帶記憶體、SQLite 和 JSONL 儲存，也提供一致性測試套件與基準測試，供你實現自己的後端。SQLite 和 JSONL 的儲存程式碼不使用 Node API，因此只需一個小型介面卡，就能執行在 Bun 或 Cloudflare Durable Object 中。儲存介面很小，很容易基於你已有的系統實現，例如鍵值儲存或 Postgres。同一時刻，一個儲存由一個程序持有，其他客戶端連接到這個程序。

使用 SQLite 時，代理框架只把工作集留在記憶體裡：活躍的轉錄記錄、正在執行的任務，以及等待處理的提交。其他內容都保留在磁碟上，直到需要時才讀取。活躍轉錄記錄的大小自然受到模型上下文視窗的約束，因為壓縮會在舊訊息溢位視窗前先做摘要。所以，即使一段對話有數萬條訊息，也能以適中的記憶體佔用執行。

需要檔案或 Shell 的工具，透過執行環境獲取它們。Pi Durable 自帶 Node 執行環境，讓工具存取本地檔案。和儲存一樣，執行環境介面也很小，容易實現，因此你也可以向工具提供遠端執行環境。這樣，代理框架可以執行在一臺機器上，工具執行在另一臺機器上。你的 `env` 函式根據對話的工作目錄，為每次工具呼叫構建環境，讓不同對話可以在不同地方執行。

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

## 經受住崩潰

我們希望 Agent 在程序退出後仍能恢復，無論原因是筆記本休眠、容器重新部署，還是機器記憶體耗盡，都能從中斷處繼續。

在 Pi Durable 中，一次執行的每一步都是任務，前進之前都會儲存檢查點。如果程序退出，新程序開啟同一份儲存，找到尚未完成的任務，再從各自最後的檢查點繼續。被中斷的模型請求會重新傳送；已經生成的部分回答仍保留在轉錄記錄中，並標記為已中止。被中斷的工具呼叫，如果可以安全重跑就會重跑；否則，模型會收到呼叫已中斷的通知。

Pi Durable 沒有內建子代理（Subagent），但只需幾行程式碼就能構建，下方的 triage 工具會展示這一點。子代理在自己的對話裡執行，因此也能從中斷處繼續。可以安全重跑的子代理工具，會重新找到原來的子代理，再等待它的回答。已經排隊的訊息仍然保留在佇列中。`requestId` 讓一次提交只被接受一次（exactly-once），因此客戶端在崩潰後重試時，拿到的是原來的提交，而不會重複提問。

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

## 同時進行多段對話

我們希望一個代理框架能同時執行多段對話，彼此不會阻塞。

在 Pi Durable 中，一個代理框架可以按需併發執行任意數量的對話，併為它們提供相同的保障。對話可以全新開始，也可以在另一段對話轉錄記錄的任意位置分叉；分叉能看到父對話截至那個位置的歷史，無需複製這些記錄。

想象一個 Slack 頻道，你的 Agent 會回應任何人的提及。隨後，有人開啟了一個討論串。頻道可以是一段對話，討論串則是在它所回覆的訊息處分叉出來的另一段對話。兩者同時執行，互不阻塞。

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

每段對話還儲存自己的 Agent 設定：模型、思考級別、選中的擴充及其中啟用的工具、附加指令，以及執行環境中的工作目錄。主代理（Main Agent）旁邊的審閱 Agent，可以使用更便宜的模型、只讀工具和自己的程式碼檢出目錄。

## 擴充

我們希望 Agent 的所有能力都可以插拔，並且每個接入的部分都能參與持久化與恢復。

在 Pi Durable 中，擴充是一組有名字的系統提示片段、工具、鉤子和任務。應用把擴充安裝到登錄檔裡。每段對話選擇自己使用的擴充和工具，儲存的只有它們的名稱。

### 系統提示片段

每次請求前，系統提示都會根據該對話所選擴充的片段重新構建，因此某個片段發生變化，下一次請求就會用到。Pi Durable 會把變化記錄在轉錄記錄中實際發生變化的位置，確保重啟或分叉後，看到的仍是模型當時看到的內容。對於支援在對話中途修改系統提示和工具的模型，只會傳送變化的部分，因此提示快取仍然有效。

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

每次工具呼叫都作為獨立的持久化任務執行，並在執行前儲存呼叫意圖。崩潰後，只有工具明確宣告可以安全重跑，才會再次執行。否則，模型會收到呼叫中斷的通知，以及目前已儲存的輸出，再決定下一步怎麼做。每段對話也可以獲得自己的一套工具，例如前面那個 Slack 討論串，可以搜尋，但不能部署。

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

工具會獲得此次呼叫的代理框架 API：它可以提交記錄和文件、啟動任務和對話，以及與其他對話通訊。因此，用幾行程式碼就能實現子代理。工具建立一段歸自己所有的對話，為它指定較小的模型和專門的指令，再等待它回答。子代理和其他對話沒有區別，所以它也能在崩潰後恢復、單獨統計成本，介面也可以把它展示在對應工具呼叫的下方。

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

擴充也能修改其他擴充的工具。後載入的擴充如果提供同名工具，就會替換先前的工具，例如把 bash 換成在 Python 虛擬環境裡執行的版本。包裝器會裝飾最終生效的那個工具；只要某段對話選中了提供包裝器的擴充，這個包裝就會生效。

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

### 鉤子

鉤子讓擴充能夠介入任務，包括生成模型回覆、呼叫工具和執行壓縮等內建任務。它們可以在請求發給模型之前改寫請求，阻止或改寫工具呼叫，替換結果，讓一次執行繼續，或者自己編寫摘要。崩潰後，鉤子可能再次執行，因此需要作出決策的鉤子，會把決策存進 memo：這是一個隨任務儲存的小值，以第一次寫入為準。

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

多個擴充可以對同一件事設定鉤子。鉤子按對話選擇擴充的順序組成呼叫鏈，每種鉤子都定義了自己在鏈上的執行方式。`beforeTool` 會把改寫後的引數繼續向後傳遞，遇到第一個阻止決定就停止。`afterTool` 會把結果沿鏈傳遞。`onYield` 遇到第一個要求繼續執行的鉤子就停止。`afterResponse` 等觀察型鉤子則始終全部執行。如果某個鉤子丟擲異常，系統會報告異常並繼續執行後續鉤子；但 `beforeTool` 是例外，異常會阻止這次工具呼叫。

### 任務

代理框架使用內建任務執行對話：每次模型請求、每次工具呼叫，以及每次壓縮，都有對應的任務。擴充也能帶來自己的任務，並獲得相同的機制：每一步後的檢查點、重啟後仍然有效的定時器，以及等待其他任務的能力。

一個將帳單分攤到多張銀行卡的結帳流程，會同時向每張卡扣款。如果其中一張卡被拒付，其他付款任務就會中止，並自行退款：

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

任務和對話共同組成一棵歸屬樹。中止一個任務，會從下往上中止歸它所有的工作，讓每個任務先清理自己產生的影響；只有它擁有的工作全部結束，它自己才算結束。子代理也是同樣的模式：一段歸啟動它的工具呼叫所有的對話。

任務預設在前臺執行，屬於對話當前正在處理的工作。只有這些任務完成，對話才會進入空閒狀態；中止對話時，例如使用者按下 Esc，也會中止這些任務及其擁有的全部工作。後台任務歸屬於對話，但不屬於對話當前的工作。它執行時，對話仍可進入空閒狀態；普通的中止操作不會影響它及其擁有的工作。

這適合那些需要在啟動它們的回合結束後繼續執行的子代理，或明天才觸發的提醒。直接中止任務本身，或者使用 `{ background: true }` 中止對話，仍然會讓它們停止。

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

## 壓縮

我們希望長對話能一直進行下去，不必讓 Agent 停下來等待摘要。

在 Pi Durable 中，壓縮和其他工作一樣也是任務，可以在對話繼續進行時執行。當上下文接近模型上限，後台壓縮會為較早的訊息生成摘要，並在下一個回合邊界放入摘要。只有當下一次請求不借助摘要就無法裝進上下文視窗時，對話才會等待摘要完成。如果提供商仍以請求過長為由拒絕，代理框架會壓縮並重試一次。你也可以隨時手動壓縮，並提供自己的指令。

較早的訊息始終保留在儲存中。

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

`reset()` 更進一步：它會開啟新的上下文，也可以用一份交接說明作為起點。工具透過返回 `control: { handoff }`，也能提出同樣的請求。由於沒有任何內容被刪除，另一個工具仍然可以搜尋交接之前的全部內容。這樣，就能構建一個把工作交接給自己、之後再回查歷史的 Agent。

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

## 應用狀態也能持久儲存

我們希望，構建在 Agent 之上的應用，其狀態能像對話本身一樣可靠地持久儲存。

在 Pi Durable 中，待辦清單、計劃、工單，或對話執行所在的沙箱等應用狀態，都儲存在文件中。文件是帶型別的 JSON，與轉錄記錄一同儲存，並在同一次原子提交中修改，因此狀態不會與產生它的轉錄記錄相互矛盾。每種文件都宣告分叉應從什麼狀態開始：父對話在分叉點時的值、它當前的值，或者一個全新的值。

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

我們希望不停止 Agent，也能修改它正在使用的程式碼。

在 Pi Durable 中，對話執行時，登錄檔仍然可以變化。用一個已經安裝過的名稱安裝擴充，會一次性替換原擴充。已經開始的工具呼叫，繼續使用開始時的程式碼完成；下一次呼叫則使用新程式碼。對話只儲存擴充和工具的名稱，從不儲存程式碼，因此重啟後，它們會使用新程序安裝的實現。

``` typescript
// The extension's file changed on disk.
// same name "ops": replaces the installed one
registry.install(await loadExtension("./ops.ts"));
```

## 多人協作

我們希望多個人和多個客戶端能同時參與同一段對話：觀看過程、中途加入，並引導它。

在 Pi Durable 中，介面需要的一切都是已提交的狀態，因此任意數量的客戶端都可以連接到代理框架中的任意對話。客戶端先獲取當前檢視：轉錄記錄、正在流式生成的回答、執行中的工具及其輸出、排隊的訊息、Agent 設定和用量。此後只接收發生變化的部分。中途加入或重新連接的客戶端，從當前檢視開始。任何客戶端都可以引導正在執行的對話，或將後續訊息加入佇列。

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

對於遠端客戶端，`thread.watch()` 會提供每次提交的精確操作，資料足夠小，適合透過 Socket 傳送。如果你更喜歡程式設計助手裡熟悉的事件，`watchEvents()` 可以把提交轉換成那些事件，代價是傳輸的資料更多。

## 試試看

你今天就可以嘗試 Pi Durable。它仍是實驗性的，API 可能繼續變化。把你的 Agent 指向 Pi 程式碼檢出目錄裡的 `packages/durable`，讓它閱讀 [README](https://github.com/earendil-works/pi/blob/main/packages/durable/README.md)、三十多個[示例](https://github.com/earendil-works/pi/tree/main/packages/durable/test/examples)、[基於 Pi Durable 的小型程式設計助手](https://github.com/earendil-works/pi/tree/main/packages/coding-agent/src/experimental/durable)，或這個漂亮的[旅行規劃 Agent](https://github.com/earendil-works/pi/tree/main/packages/coding-agent/src/experimental/vacation)，然後開始構建。

旅行規劃器大約有 1,300 行 TypeScript，其中大部分是終端機介面。如果它看起來像程式設計助手，那只是因為它借用了 Pi 程式設計助手的終端機介面元件。



<PiTerminalReplay src="/recordings/earendil/pi-durable.cast" poster="npt:0:17" title="Pi Durable · 旅行規劃 Agent" />

**原文錄屏步驟（中文說明）**

1. 一個基於 Pi Durable、帶終端機介面的旅行規劃器。
2. 子代理並行執行三次搜尋，每次搜尋都是一個持久化任務。
3. 與此同時，主代理仍然可以聊天。
4. 程序退出。天氣和博物館搜尋已完成，火車搜尋尚未完成。
5. 重新啟動。`search` 可以安全重跑，因此只有火車搜尋再次執行。
6. 切換到子代理，並給它新的引導。
7. 回到主代理：在它工作時提問、壓縮上下文，並繼續引導。
8. 報告以訊息形式送達；主代理將它整理成旅行計劃。



在 Pi 程式碼檢出目錄中，執行這兩個演示：

``` bash
npm install && npm run build
node packages/coding-agent/src/experimental/durable/main.ts
node packages/coding-agent/src/experimental/vacation/main.ts
```

在你自己的專案中基於 Pi Durable 開發：

``` bash
npm install @earendil-works/pi-durable @earendil-works/pi-ai @earendil-works/chord
```

未來幾周，我們會繼續介紹 Pi Durable，並展示我們用它構建、輔助日常工作的小型 Agent 工具，例如 Slack 機器人或 GitHub 問題分流機器人。現在先不透露太多。就像我們自己也使用 Pi 一樣，隨著我們親自使用 Pi Durable，還會有更多內容釋出。

## 常見問題

### 為什麼又選 TypeScript？

因為這是最快把它搭起來的辦法。不過，大家現在都知道，把所有東西移植到 Rust 或彙編“很容易”。我們不排除未來這樣做，但目前會專注於 TypeScript。

---

繼續閱讀：[Pi Durable 入門專篇](/zh-TW/guide/pi-durable) · [Pi 1.0 釋出譯文](/zh-TW/translations/pi-1-0) · [官方版本檔案](/zh-TW/releases/)
