---
title: Pi 中的壓縮機制
description: Earendil Engineering 官方文章《How 壓縮 Works in Pi》的完整中文譯文。
prev:
  text: 無法隨身帶走的工作階段
  link: /zh-TW/translations/session-portability
next:
  text: Agent 中的提示快取
  link: /zh-TW/translations/prompt-caching
---

<span class="library-status">Earendil 官方授權中文譯文 · 02</span>

# Pi 中的壓縮機制

::: info 繁體轉換版說明
本頁為簡中授權譯文之繁體轉換版。英文原文版權歸 Earendil 所有，中文譯文及轉換部分按 CC BY 4.0 發布。如有歧義，請以英文原文為準。
:::

> - **原文標題**　*How 壓縮（Compaction） Works in Pi*
> - **作者**　Earendil Engineering `<rfc@earendil.com>`
> - **釋出日期**　2026-08-13
> - **原文地址**　[earendil.com/posts/compaction-in-pi](https://earendil.com/posts/compaction-in-pi/)
> - **授權說明**　經 Earendil 授權改編與翻譯（*Adapted and translated with permission from Earendil.*）
> - **譯文許可**　[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh-hans)

如果你曾在 [Pi](https://pi.dev)、Claude Code 或 Codex 這類程式設計 Agent 中進行過一次很長的程式設計工作階段，那麼你一定觸發過壓縮。本文將解釋壓縮的工作原理，以及 Pi 會在什麼時候需要壓縮。

## 一次 LLM 對話

大語言模型（LLM）的[上下文視窗](https://en.wikipedia.org/wiki/Context_window)是有限的。上下文視窗就是模型在生成回覆時能夠“看到”的內容。LLM 所採用的 [Transformer 架構](https://en.wikipedia.org/wiki/Transformer_(deep_learning))限制了它能處理的輸入量。程式設計 Agent 工作階段的輸入包含此前的所有訊息和工具呼叫，並會隨著工作推進不斷增長。一旦輸入超出上下文視窗，LLM 就會拒絕這次請求。

與 Pi 這樣的程式設計 Agent 互動時，Agent 會向 LLM 傳送請求並接收回復。每次請求都包含系統提示、[`AGENTS.md`](https://agents.md/) 等已載入檔案、工具定義和對話歷史。

程式設計 Agent 向 LLM 發出的第一次請求包含這些初始上下文，以及使用者的第一條訊息。

```text
請求 1：
[系統][工具][使用者]
```

這會開啟一個輪次。LLM 可能先返回一條包含工具呼叫的助手訊息。Agent 程式執行這些呼叫，再把包含工具結果在內的完整對話傳送給 LLM，然後得到另一條助手訊息。當助手完成輸出時，這個輪次就結束了。

```text
請求 1 結束後：
[系統][工具][使用者][助手：工具呼叫][工具結果][助手]
                     <---------------->     ^      <---->
                         LLM 返回            |      LLM 返回
                                             |
                                        Agent 生成
```

我們繼續工作，併傳送另一條訊息。

```text
請求 2：
[系統][工具][使用者][助手：工具呼叫][工具結果][助手][使用者]
                                                       ^
                                                    新使用者訊息
```

每個輪次都會讓對話變長。最終，歷史記錄會超出上下文上限。下一次請求便會返回類似 `Request exceeds the maximum size`（請求超出最大大小）的錯誤。

```text
[系統][工具][使用者][助手][……][工具結果][使用者]
                                      ^
                                超出上下文視窗
```

## 處理上下文溢位

當現有對話無法原樣繼續時，我們有兩個選擇。

1. 開始一段新的空白對話，不帶上已經積累的上下文。這樣會丟棄歷史記錄，包括先前的決定和尚未解決的工作。這樣做仍可能是個好主意，因為[上下文越長，LLM 的輸出表現會下降](https://www.trychroma.com/research/context-rot)。
2. 如果我們想繼續這段對話，就為對話上下文建立一個更小的表示。這就是壓縮所做的事情。

## 壓縮

理論上，壓縮有很多種實現方式。例如，我們可以編寫一個確定性函式，保留對話中的部分內容並丟棄其餘內容。但在實踐中，壓縮通常會透過一次 LLM 請求來總結對話歷史。

壓縮會用一個壓縮後的表示替換部分歷史記錄，從而為後續訊息和工具呼叫留出空間。

```text
[系統][工具][壓縮結果][使用者]
                         ^
                      新訊息
```

## Pi 的實現

下面更仔細地看看 Pi 具體如何[實現壓縮](https://pi.dev/docs/latest/compaction#summary-format)。

當對話變得太長時，Pi 會用壓縮來總結較早的內容，同時保留最近的工作。當上下文大小接近上下文視窗總容量時，壓縮會自動觸發；使用者也可以使用 `/compact` 命令手動觸發。

Pi 會在一個輪次結束後檢查是否需要自動壓縮。在此之前，每次請求都會在現有提示末尾繼續追加內容，因此可以複用已經快取的字首。如果 Pi 在一個輪次進行到一半時遇到上下文溢位錯誤，也可能在輪次中途執行壓縮。

壓縮時，Pi 會原樣保留一定數量的最近訊息。

```text
壓縮前：
[系統 + 工具][較早輪次][近期保留的訊息]
```

由於 Pi 使用[可配置的 token 預算](https://pi.dev/docs/latest/compaction#when-it-triggers)，實際保留的訊息數量並不固定。Pi 當前預設保留 2 萬 token，大約相當於 5 到 20 個輪次。在這個分界點之前的所有訊息都會被提取、序列化並接受總結。

## Pi 的壓縮提示

對於程式設計 Agent 來說，一份好的摘要，理想效果就像一次從上一班到下一班的交接簡報。Pi 的壓縮提示強調，現有上下文中的大量內容已經不再相關；下一次 LLM 請求只應繼續攜帶仍然重要的上下文。

因此，Pi 發出的壓縮請求不同於普通對話請求。

1. 獨立壓縮請求所用的系統提示不同。它不會告訴 LLM“你是一名專業的程式設計助手”，而是告訴它：[“你是一名上下文摘要助手。”](https://github.com/earendil-works/pi/blob/47610217098d9ba8f22d223fa7c1413f9f5fd759/packages/coding-agent/src/core/compaction/utils.ts#L152-L158)
2. 壓縮請求中的使用者訊息也不同。它要求生成[“一份關於這條對話分支的結構化摘要，供以後返回時作為上下文。”](https://github.com/earendil-works/pi/blob/47610217098d9ba8f22d223fa7c1413f9f5fd759/packages/coding-agent/src/core/compaction/compaction.ts#L463-L498)提示中規定了目標、進度和關鍵決定等章節。
3. 這是一次獨立請求，不會使用現有的任何對話歷史，因此它可以換用另一種 LLM，而不會產生不必要的成本。

壓縮結果會作為一條壓縮記錄追加到 Pi 工作階段中，隨後工作階段便可以繼續。壓縮請求結束後，上下文已經被壓縮。

```text
壓縮後：
[系統][工具][摘要][近期輪次][新使用者訊息]
```

此時，對話上下文中又有了容納更多訊息的空間。

Pi 會把壓縮摘要以純文字形式儲存在工作階段中。這樣一來，壓縮後的上下文仍然可讀且[可移植](./session-portability)，因為我們可以在 Pi 中切換模型，並繼續使用這份摘要。

## 壓縮與提示快取

LLM 提供商使用[提示快取](./prompt-caching)來降低同一段對話中重複請求的成本。在活躍的程式設計工作階段裡，對於已經由模型生成過的上下文，我們支付的費用會更低。這種快取要求字首完全匹配，因此壓縮會打破提示快取。

```text
壓縮前的快取：
[系統][工具][較早歷史][近期保留輪次]
<------------------ 已快取字首 ------------------>

壓縮後的第一次請求：
[系統][工具][摘要][近期保留輪次][新使用者訊息]
<-- 可複用 -->^
              |
        第一個發生變化的 token
              |
              +-- 從這裡開始的所有內容都必須重新計算
```

保留的輪次仍然包含相同的 token，但它們現在出現在一個不同字首之後，因此先前快取的狀態無法再複用。

壓縮後的新請求會重新開始受益於提示快取。

## 實驗

Pi 具有很強的可擴充性和可塑性，因此你可以用自己的壓縮機制替換它原有的機制。如果想測試另一種壓縮機制，可以讓 Pi 建立一個帶有自定義壓縮提示的擴充功能（Extension）。

::: info 譯者說明
本文為 Earendil Engineering 原文的完整中文譯文。中文譯文及適配部分經授權按 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh-hans) 釋出；英文原文版權歸 Earendil 所有。如中文表述與原文存在歧義，請以[英文原文](https://earendil.com/posts/compaction-in-pi/)為準。
:::

## 繼續閱讀

- [英文原文：How 壓縮 Works in Pi](https://earendil.com/posts/compaction-in-pi/)
- [上一篇：無法隨身帶走的工作階段](/zh-TW/translations/session-portability)
- [下一篇：Agent 中的提示快取](/zh-TW/translations/prompt-caching)
