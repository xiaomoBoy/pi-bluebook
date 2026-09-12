---
title: Pi：極簡而高效
description: Earendil 官方文章《Pi, Minimal and Performant》的完整中文譯文。
prev:
  text: 代理框架千千萬，這一個屬於我
  link: /zh-TW/translations/mine-agent-harness
next:
  text: Pi 與 Lefos 正式釋出
  link: /zh-TW/translations/announcing-pi-and-lefos
---

<span class="library-status">Earendil 官方授權中文譯文 · 06</span>

# Pi：極簡而高效

::: info 繁體轉換版說明
本頁為簡中授權譯文之繁體轉換版。英文原文版權歸 Earendil 所有，中文譯文及轉換部分按 CC BY 4.0 發布。如有歧義，請以英文原文為準。
:::

> - **原文標題**　*Pi, Minimal and Performant*
> - **作者**　Earendil `<rfc@earendil.com>`
> - **釋出日期**　2026-08-04
> - **原文地址**　[earendil.com/posts/pi-autoresearch-and-databricks](https://earendil.com/posts/pi-autoresearch-and-databricks/)
> - **授權說明**　經 Earendil 授權改編與翻譯（*Adapted and translated with permission from Earendil.*）
> - **譯文許可**　[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh-hans)

## Pi 的優勢在於極簡

AI 讓程式碼變得廉價。結果是，許多公司為了追求更好的效能，開始打造越來越大的工具：更長的提示、更多的編排、更多層次和更多複雜度。這也從根本上提高了工具的使用成本。Pi 選擇了相反的方向。

Pi 是一個有意選擇極簡路線的程式設計代理框架（Agent Harness）。它開箱只有 4 個工具，[系統提示](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/src/core/system-prompt.ts#L121-L159)和工具定義加起來不到 1,000 token。背後的想法是：大多數工作依靠基礎能力就能完成；如果你需要更多，就自己構建。

越來越多的證據表明，Pi 的設計不只是更乾淨，也更便宜、效能更好。使用者發現，即使還沒有安裝適應個人工作流和需求的擴充功能（Extension），原生 Pi 也能產出行業領先的結果。下面 Databricks 與 Shopify 的案例，都得到了理想結果。

## 案例研究

### Databricks：每項任務的成本

Databricks 最近分享了一項研究：《[在 Databricks 數百萬行程式碼庫上測試程式設計 Agent](https://www.databricks.com/blog/benchmarking-coding-agents-databricks-multi-million-line-codebase)》。他們希望瞭解，哪些程式設計 Agent 在真實程式設計任務上表現最好，以及任務表現會怎樣隨著價格變化。

為了避免受到已經[過度飽和的外部基準](https://arxiv.org/html/2602.16763v3)影響，他們根據團隊工程師經常執行的工作建立了內部基準。結果符合我們的預期，卻可能令行業中的很多人感到意外。按他們的說法，模型透過哪一種代理框架被呼叫，會顯著影響成本和品質；在許多案例中，Pi 這樣的簡單代理框架在他們的工作負載上表現最好。

![Databricks 程式設計 Agent 基準中的成本與任務透過率對比](/images/translations/databricks-cost-per-task.png)

*Databricks 程式設計 Agent 基準中的成本與任務透過率對比。製圖：[Databricks](https://www.databricks.com/blog/benchmarking-coding-agents-databricks-multi-million-line-codebase)。圖片隨 Earendil 原文授權使用。*

使用 Opus 4.8、xhigh 時，Pi 取得了最高的總體透過率，成本卻顯著低於 Claude Code 和 Codex。

#### 極簡代理框架，效果可以測量

Pi 的亮點在於，它不會用大量預設設定和指令把模型包裹起來，再讓它們迷失在[指令層級](https://openai.com/index/the-instruction-hierarchy/)中。Pi 儘量不擋住模型，團隊則可以新增自己的工作流真正需要的東西。

Databricks 的研究很有啟發性，因為它把模型與代理框架分開進行了比較。

他們報告說：在相同思考等級下，透過不同代理框架執行同一個模型時，每項任務的成本差異顯著——某些情況下超過兩倍——但品質保持不變。我們把這種特徵稱為 Pi 的“上下文紀律”。Pi 每輪傳送的上下文大約少三倍；它更好地管理上下文，維持更緊湊的工作集，並用更少輪次完成任務。

我們同意，成本分析應當考慮端到端工程經濟，而不能只看每 token 的價格。模型層面也是如此。例如，我們觀察到，使用 Haiku 4.5 執行復雜工作流時，成本往往高於 Sonnet 4.6，特別是涉及程式碼執行時。原因很簡單：前者需要更多輪次才能成功完成任務。

如今，我們在代理框架層面也看到了同樣現象：強大、單價更高的模型配合高效能代理框架，可能比相反組合更便宜。

### Shopify 構建 Pi Autoresearch：可擴充勝過臃腫

極簡主義是 Pi 核心理念的一部分。極簡之所以行得通，是因為它並不等於僵化。事實上，Pi 是首批為可擴充和自我編輯而打造、並獲得廣泛使用的 Agent 基礎設施之一。

Shopify 的實踐為 Pi 的設計提供了另一項有價值的外部驗證。在 [Shopify Engineering 的文章](https://shopify.engineering/autoresearch)中，David Cortés 描述瞭如何直接把 `pi-autoresearch` 構建為 Pi 擴充功能：只需讓 Pi“建立一個 Autoresearch 擴充功能”。Pi 會閱讀自己的擴充功能文件，然後從那裡開始建立新的工作流。

Autoresearch 是一種使用程式設計 Agent 進行最佳化的自主迴圈。你提出改變後，它會執行實驗，找出哪些做法有效、哪些會造成回退。只要目標可以測量，它就能丟棄產生回退的實驗，並持續改進。

對 Shopify 和[其他使用者](https://x.com/pidotdev/status/2080616483072225778?s=20)來說，Autoresearch 擴充功能很快就成為重要的內部生產力工具。Shopify 報告的案例包括：單元測試速度提升 300 倍、React 元件掛載速度提升 20%、多個專案的構建時間縮短，甚至 pnpm 的效能也得到改進。

![Shopify pi-autoresearch 專案的實驗記錄介面](/images/translations/shopify-autoresearch.png)

*Shopify `pi-autoresearch` 專案的實驗記錄介面。圖片來源：[davebcn87/pi-autoresearch](https://github.com/davebcn87/pi-autoresearch)，隨 Earendil 原文授權使用。*

重點在於，Pi 並沒有把這些工具全都內建進去。它做的是讓使用者能夠非常輕鬆地構建它們。Pi 不會假設供應商最瞭解你的工作流、並試圖把每一種工具都塞進產品；它假設你最瞭解自己，並把擴充能力交給你，讓你塑造自己的工作方式。

## 為什麼極簡路線在今天更有優勢

大約一年前，人們還可以認為原生代理框架具有結構性優勢，因為模型是圍繞它們構建的。但這個論點已經越來越弱。

前沿模型如今普遍能夠很好地理解終端機或類終端機的程式設計環境，並在其中行動。Anthropic 最近將 Claude Code 的系統提示縮減 80%，就是一個清晰訊號。因此，問題正在從“代理框架對模型有多原生”，轉向“代理框架怎樣管理上下文，避免冗餘，並透過乾淨的基礎能力行動”。模型需要一個清晰的環境介面，也需要一個不浪費上下文的代理框架。

Pi 提供的正是這些：更少的提示開銷和重複上下文、更便宜的執行成本、更少的不必要抽象。因為 Pi 可以擴充，你並沒有失去能力，而是獲得了選擇權。只有當複雜性“證明自己值得留下”時，你才把它加入系統。

本地模型也在快速發展，Earendil 對它們的潛力十分看好。Pi 的上下文紀律在這裡尤其有價值。本地模型的上下文視窗通常更小，[預填充](/zh-TW/translations/prompt-caching)也可能需要很長時間，因此，保持穩定的提示字首十分重要。上下文紀律意味著，除非使用者明確要求，否則不改變上下文，從而避免持續數分鐘的重新預填充。

極簡的預設系統提示和工具集，再加上這種上下文紀律，讓 Pi 成為本地模型的理想代理框架。

Pi 正在證明，它能夠同時做到：更便宜、更極簡，也更高效。

::: info 譯者說明
本文為 Earendil 原文的完整中文譯文，原文案例圖隨文章授權使用並保留製圖方與專案來源。文中的版本、基準結果和專案狀態對應原文釋出日期。中文譯文及適配部分經授權按 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh-hans) 釋出；如有歧義，請以[英文原文](https://earendil.com/posts/pi-autoresearch-and-databricks/)為準。
:::

## 繼續閱讀

- [英文原文：Pi, Minimal and Performant](https://earendil.com/posts/pi-autoresearch-and-databricks/)
- [上一篇：代理框架千千萬，這一個屬於我](/zh-TW/translations/mine-agent-harness)
- [下一篇：Pi 與 Lefos 正式釋出](/zh-TW/translations/announcing-pi-and-lefos)
