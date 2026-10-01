---
title: “你說過不要 MCP！”
description: Earendil Engineering 官方文章《“You Said No MCP!”》的完整中文譯文，說明 Pi 為什麼改為支援 MCP，以及 Codemode 是什麼。
prev:
  text: 衡量程式碼的粗糙程度
  link: /zh-TW/translations/measuring-code-sloppiness
next:
  text: 官方授權譯文目錄
  link: /zh-TW/translations/
---

<span class="library-status">Earendil 官方授權中文譯文 · 12</span>

# “你說過不要 MCP！”

::: info 繁體轉換版說明
本頁為簡中授權譯文之繁體轉換版。英文原文版權歸 Earendil 所有，中文譯文及轉換部分按 CC BY 4.0 發布。如有歧義，請以英文原文為準。
:::

> - **原文標題**　*“You Said No MCP!”*
> - **作者**　Earendil Engineering `<rfc@earendil.com>`
> - **釋出日期**　2026-09-29
> - **原文地址**　[earendil.com/posts/you-said-no-mcp](https://earendil.com/posts/you-said-no-mcp/)
> - **授權說明**　經 Earendil 授權改編與翻譯（*Adapted and translated with permission from Earendil.*）
> - **譯文許可**　[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh-hans)

如果你以前存取過 pi.dev，就會看到一句頗為自豪的宣告：Pi 不支援 [MCP](https://en.wikipedia.org/wiki/Model_Context_Protocol)。如果你聽過我們談論 Pi 的播客，也會不止一次聽到我們對 MCP 不以為然的評價。Mario 甚至還[專門寫過一篇文章](https://mariozechner.at/posts/2025-11-02-what-if-you-dont-need-mcp/)。然而，如果你現在升級 Pi，就會發現它已經支援 MCP 了。這是怎麼回事？

## 情況變了

首先要記住，[世界並非一成不變](https://lucumr.pocoo.org/2016/11/5/be-careful-about-what-you-dislike/)。過去一年裡，我們一直在關注 MCP，而今天的 MCP 已經不同於從前。不過，僅憑這一點，還不足以成為把它納入核心的理由。你也知道，Pi 有很好的擴充生態，MCP 完全可以做成一個擴充吧？甚至可以是由 Earendil 官方認可的擴充。沒錯，你說得對：MCP 確實可以作為擴充提供，[以前也的確如此](https://github.com/nicobailon/pi-mcp-adapter)。

如今 MCP 成了核心的一部分，是我們一起討論、重新思考後作出的決定。

## 到底變了什麼？

我們把 MCP 納入核心，不只是因為 MCP 本身發生了變化，還因為我們發現，為支援它而需要做的改動也有普遍的用處。例如，我們為 MCP 所做的改動，也讓在 Pi 中使用 Jev 變得更容易。歸根結底，Pi 需要的東西與 MCP 需要的很相似：一個以直譯器形式提供、可供施展的沙箱。

雖然 MCP 已經在許多方面有所改善，但仍有不少問題沒有解決。它最大的問題依然是難以組合使用。即使有了 Codemode——一個方便組合工具呼叫的小巧沙箱——MCP 在這方面仍不盡如人意。不過，到了現在，這與其說是 MCP 本身的問題，不如說是現有 MCP 伺服器，以及不同代理框架（Agent Harness）使用這些伺服器的方式所帶來的問題。

許多 MCP 伺服器仍然是為那些直接把工具一股腦塞進上下文的代理框架構建的，並試圖透過返回文字，在伺服器這一側節省 Token。我們現在更願意把 MCP 看成一種接近 OpenAPI、同時具備智慧工具發現能力的東西。這意味著，工具應該返回結構化資料，而且應該能夠根據文件和描述被發現。

命令行工具（CLI）之所以這麼好用，是因為 Agent 和模型可以藉助高效的 Bash 技巧，把各種東西串聯起來。但從根本上說，MCP 也沒有理由做不到這一點。Pi 中的 MCP，就是把這些工具暴露給一個 JavaScript 沙箱；Codex 等其他代理框架也採用了類似做法。

## 現代 LLM 中的 MCP

這就引出了一個問題：為什麼我們不只做 Codemode，而不引入 MCP？部分原因在於 Pi 目前表達和描述工具的方式。最近幾個月，我們做了很多工作，讓 Pi 能夠適應新模型提供的能力，例如延遲載入工具、在對話中途插入系統訊息，以及調整推理級別。但我們還沒有升級工具設定體系，讓它更好地利用這些新能力並支援更大的工具規模。

在採用 Codemode 的環境中，需要決定一個工具是直接提供給 LLM，還是隻提供給 LLM 的 Codemode 部分。普通的 MCP 擴充無法從 Pi 的工具設定體系中獲取足夠的後設資料，因此很難把這種體驗做好。所以，我們需要確保工具既可以被設定為延遲載入，也可以被設定為僅供 Codemode 使用。

當然，我們也可以只接好這些後設資料，讓 MCP 擴充能夠做得更好。但我們同時認為，MCP 與 Codemode 結合，已經解決了 MCP 過去的許多問題。我們相信，要對一件事產生積極影響，最好的辦法就是擁抱它。雖然我們認為如今的 MCP 已經比以往好得多，但伺服器和使用模式仍有改進空間。

因此，我們希望參與討論，幫助它發展成適合小型代理框架的樣子，而不是站在場邊觀望。

## 什麼是 Codemode？

前面說了這麼多 Codemode，也該解釋一下它究竟是什麼了。代理框架執行工具時，大體上可以在兩側進行：一側是 Bash 執行的地方，另一側是代理框架的 Agent 迴圈執行的地方。這兩側的信賴級別很不一樣。代理框架迴圈往往執行在受信賴的環境中，而它執行的工具則經常執行在信賴程度沒那麼高的沙箱裡。

Codemode 的特別之處在於，它執行在代理框架所在的那一側。可以把它理解為一種編排和協調工具呼叫的機制。它是一個沙箱，讓 Agent 能更靈活地決定工具呼叫的順序，並用 JavaScript 把這些呼叫組合起來。由於 Codemode 也執行在代理框架側，它的狀態會作為工作階段記錄的一部分儲存，而不是儲存在檔案系統中。

理論上，任何語言都可以勝任，但 JavaScript 很有吸引力：小型 JavaScript 實現可以打包成 WASM 二進位制檔案分發，並提供合理程度的保護。

在 Pi 中，設定 MCP 時會自動載入 Codemode，也可以把它作為預設工具加入設定。直接讓 Pi 修改自己的設定、啟用 Codemode 就行！之後，你就能用它做不少有意思的事，而且不侷限於 MCP。例如，當你登入的服務商提供“Jev”時，就可以提出這樣的請求：

> 透過 Codemode 使用 typesafe/jev，找出我們的問題追蹤系統中最不滿的 20 位評論者。

它就會在 Pi 內部，巧妙地把 Linear MCP 和 Jev 等能力組合起來完成這項分析，完全不浪費上下文。

以下是這樣一次 Pi 工作階段的精簡回放。

<PiCodemodeReplay />

::: details 展開中文文字版與完整程式碼

> 透過 Codemode 使用 typesafe/jev，找出我們的問題追蹤系統中最不滿的人。

我會從 Linear 獲取尚未關閉的問題，讓 Jev 評估每個討論串的語氣，每次並行處理四個。

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

問題追蹤系統中的大多數討論都很平和。Jev 將 167 個尚未關閉的問題中的 156 個評為中性，11 個評為輕度不滿，沒有任何一個被評為高度不滿。

最明顯的幾個例子是：

- PI-6907：README 中沒有安裝說明（“這讓人很不滿”）。
- PI-10031：在思考過程中按下 Esc 後，Pi 卡在“Working...”狀態。
- PI-4714：希望增加 `/update` 命令（“實在太煩人了”）。
- PI-7730：macOS 上的長工作階段中，CPU 佔用率過高。

每個問題的評判結果都已在 Codemode 中儲存為 `frustration`，因此我可以深入檢視其中任何一個，而不必重新獲取這些問題。

:::

——

關於 Jev 和 Codemode 等內容，我們以後還會繼續介紹。我們希望這篇文章能夠展示：隨著世界不斷變化，我們也會持續審慎地調整和更新 Pi。

::: info 譯者說明
本文為 Earendil Engineering 原文的完整中文譯文。動態回放採用原文演示資料，保留英文介面；文字版中的程式碼與執行結果保留原文，對話說明譯為中文。中文譯文及適配部分經授權按 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh-hans) 釋出；英文原文版權歸 Earendil 所有。如中文表述與原文存在歧義，請以[英文原文](https://earendil.com/posts/you-said-no-mcp/)為準。
:::

## 繼續閱讀

- [英文原文：“You Said No MCP!”](https://earendil.com/posts/you-said-no-mcp/)
- [上一篇：衡量程式碼的粗糙程度](/zh-TW/translations/measuring-code-sloppiness)
- [返回：官方授權譯文目錄](/zh-TW/translations/)
