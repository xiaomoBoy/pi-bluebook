---
title: '如果程式設計已經不成問題，接下來呢？——衡量程式碼的粗糙程度'
description: 'Earendil 官方文章《If coding is solved, what now?: Measuring the sloppiness of code》的完整中文譯文，討論如何衡量 AI 生成程式碼的冗長、侵蝕與累積問題。'
prev:
  text: 邀請你開啟一場通訊
  link: /zh-TW/translations/invitation
next:
  text: 官方授權譯文目錄
  link: /zh-TW/translations/
---

<span class="library-status">Earendil 官方授權中文譯文 · 11</span>

# 如果程式設計已經不成問題，接下來呢？——衡量程式碼的粗糙程度

::: info 繁體轉換版說明
本頁為簡中授權譯文之繁體轉換版。英文原文版權歸 Earendil 所有，中文譯文及轉換部分按 CC BY 4.0 發布。如有歧義，請以英文原文為準。
:::

> - **原文標題**　*If coding is solved, what now?: Measuring the sloppiness of code*
> - **作者**　Sebastian，Earendil `<sebastian@earendil.com>`
> - **釋出日期**　2026-09-10
> - **原文地址**　[earendil.com/posts/measuring-code-sloppiness](https://earendil.com/posts/measuring-code-sloppiness/)
> - **授權說明**　經 Earendil 授權改編與翻譯（*Adapted and translated with permission from Earendil.*）
> - **譯文許可**　[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh-hans)

LLM 在生成程式碼方面已經近乎完美，但事情並沒有就此結束。程式碼在形式上正確，並不意味著它不會引入不必要的抽象、製造重複，或從整體上作出糟糕的決定。這並不是什麼突破性的觀察：大多數用 vibe coding（憑感覺寫程式碼）的方式開發過專案的人都已經發現，每增加一項功能，有時都會讓程式碼行數（LOC）急劇膨脹。

這會削弱人類的自主權，因為對於那些每月新增數百萬行程式碼的專案，人類很難跟上。<sup id="fnref-1"><a href="#fn-1">1</a></sup> 有些人可能會說，這根本不是問題，因為他們相信自己的 Agent 能處理好。我得告訴你一個壞訊息：Agent 其實也無法真正處理好這些粗糙程式碼。

我有物理學背景，因此解決問題時一直習慣採用實驗和定量的方法。我剛加入 Earendil 時，任務是弄清楚如何衡量程式碼的粗糙程度。我的本能反應是先深入研究相關文獻，再看看其他公司正在怎麼做。

坦白說，除少數幾篇很有洞見的研究論文外，我對這個行業目前在多大程度上仍然“憑感覺”行事感到失望。在研究過程中和 X 上，我不斷看到這樣的宣傳：“端到端程式設計 Agent”“不只建議程式碼，還能把它交付上線的 AI”，或“不需要人類級成本的人類級評估”。就像所有講得不錯的故事一樣，這些說法也包含一部分事實。

LLM 的確能寫出**幾乎**完全正確的程式碼。這是因為程式碼具有可規模化和可驗證的特性。讓 LLM 生成程式碼，再用隱藏測試檢查這些程式碼，是一件相當直接的事，也能由此得到清晰的獎勵訊號。與之形成鮮明對比的是，判斷這些程式碼的“粗糙程度”往往需要人類的直覺與品味，而且總體而言極其困難。我認為，說明其中原因的最好方式，就是逐一看看有哪些可能的衡量方法。

**讓 AI 當裁判：** 這可能是業界評估程式碼品質最常見的方法，但根據我的觀察，它很少奏效。最天真的做法，是讓模型按 1 到 10 分評價程式碼品質；這種方法基本等同於隨機數生成器。更精細的做法，是把方案 A 和方案 B 交給裁判模型，讓它決定更偏好哪一個；但問題是，把兩個方案的 A／B 標記或顯示順序對調後，[模型的偏好就可能改變](https://arxiv.org/pdf/2604.16790)。我這裡說得稍微有些刻薄，而且這種效應在更大的模型上並沒有那麼明顯，但核心問題仍然成立。讓 LLM 評判自己寫出的程式碼，並不能代替真正可靠的評估。雖然評分準則或讓 LLM 編寫測試等方向有一些有趣的嘗試，但它們離真正消除粗糙程式碼還很遠。

**讓人來評判 AI：** 如果暫且忽略軟體工程師的能力差異巨大這一事實，這會是確保程式碼保持人類可讀性的最佳辦法。缺點則是，無論用於訓練 AI，還是建立包含多個模型服務商和代理框架（Agent Harness）的大型基準測試，它都無法規模化。<sup id="fnref-2"><a href="#fn-2">2</a></sup>

**最簡單的方法：** 在我的研究和測試中，直接衡量程式碼行數的變化量，竟然成了一個非常有效的粗糙程度指標。諷刺之處在於，一旦我們開始專門針對它進行最佳化，它就會[失去作為衡量指標的意義](https://en.wikipedia.org/wiki/Goodhart%27s_law)。

接下來兩個指標來自論文 [SlopCodeBench](https://arxiv.org/html/2603.24755v1#A7)。它們能夠很好地區分既有程式碼庫與 LLM 生成的粗糙程式碼，因此看起來很有希望。

**冗長程度（Verbosity）：** 嘗試衡量重複程式碼行與不必要的冗長程式碼行所佔的比例。<sup id="fnref-3"><a href="#fn-3">3</a></sup>

<div class="translation-formula" dir="ltr">
  <code>Verbosity = |AST-Grep flagged lines ∪ clone lines| / LOC</code>
</div>

也就是說，分子是被 AST-Grep 標記的程式碼行與重複程式碼行的並集行數，分母是全部程式碼行數。

**侵蝕程度（Erosion）：** 嘗試衡量一個程式碼庫的體量權重，在多大程度上集中於少數龐大而複雜的函式。

<div class="translation-formula" dir="ltr">
  <code>mass(f) = CC(f) × √SLOC(f)</code>
</div>

其中，`f` 代表函式，SLOC 是原始碼行數，`CC(f)` 是該函式的[循環複雜度](https://ieeexplore.ieee.org/document/1702388)。

<div class="translation-formula" dir="ltr">
  <code>Erosion = Σ<sub>f: CC(f) &gt; 10</sub> mass(f) / Σ<sub>f</sub> mass(f)</code>
</div>

侵蝕程度就是：循環複雜度大於 10 的函式，其體量權重之和佔所有函式體量權重之和的比例。

如果把 SlopCodeBench 評估過程中生成的程式碼，與一組成熟程式碼庫的平均冗長程度和侵蝕程度進行比較，兩者之間的差異非常明顯。成熟程式碼庫的平均冗長程度為 `0.15 ± 0.06`，Agent 程式碼則為 `0.33 ± 0.10`。侵蝕程度方面，成熟程式碼庫為 `0.31 ± 0.17`，Agent 程式碼則為 `0.68 ± 0.20`。平均而言，Agent 程式碼的冗長與侵蝕程度大約都是人類程式碼的兩倍。隨後，我也調查了自己一些透過 vibe coding 完成的專案，其中許多專案的冗長程度高達 `0.4`，侵蝕程度高達 `0.75`；因此，這些結果很可能並不只是評估方法造成的假象。<sup id="fnref-4"><a href="#fn-4">4</a></sup>

要回到 Agent 為什麼無法真正自行處理粗糙程式碼這個問題，我們需要看看 SlopCodeBench 的評估方式。其他程式設計基準通常會在一開始向 Agent 提供完整的指令清單，再設定一組用於判斷程式是否合格的隱藏測試；SlopCodeBench 的做法恰好相反。它安排多輪指令與測試迭代，並在不同檢查點之間清除模型的上下文。這更貼近人類實際使用程式設計 Agent 時的迭代過程。結果是，糟糕的程式設計決策會隨著時間不斷累積。若按“所有檢查點的全部測試結果都必須合格”的端到端完整求解標準，即使最先進的模型，端到端完整成功率也是 `0%`。<sup id="fnref-5"><a href="#fn-5">5</a></sup> 對於那些每天欣然新增數萬、甚至數十萬行程式碼的人來說，這應該是一個警告訊號。當然，這裡仍然存在常見的保留意見，例如測試可能過於嚴格，或個別題目描述略有歧義；但總體趨勢依然成立。

希望在瞭解這些指標之後，你已經能更清楚地看見：為什麼評估程式碼的粗糙程度如此困難，以及為什麼人類的直覺與品味，仍然會以隱性或顯性的方式融入評估過程。

還有一些看起來很有希望的方向值得繼續探索，例如函式之間的耦合程度、程式碼變動量、內聚性等等。如果你也在研究評估，並願意聊聊，我很樂意交流：[`sebastian@earendil.com`](mailto:sebastian@earendil.com)

## 註釋

1. <span id="fn-1">這讓我想起一句話：“用程式碼行數衡量程式設計進度，就像用重量衡量建造飛機的進度。”</span> [返回正文](#fnref-1)
2. <span id="fn-2">我可不想為了得到一份不斷變化的模型服務商排名，強迫任何人審查數百萬行程式碼。</span> [返回正文](#fnref-2)
3. <span id="fn-3">這裡的規則是一套透過 [AST-Grep](https://ast-grep.github.io/) 實現的人工啟發式規則，這再次說明了其中的人類因素。</span> [返回正文](#fnref-3)
4. <span id="fn-4">不過，有一個出了名“很憑感覺”的開放專案，在這兩個指標上的得分都不算高；這可能是因為函式之間的耦合程度非常高，和／或大量互不相關的函式體量拉低了平均值。</span> [返回正文](#fnref-4)
5. <span id="fn-5">尚未在 Fable 5.1 或 Astra 上測試；已經測試過 GPT 5.6 sol xhigh 等模型。</span> [返回正文](#fnref-5)

::: info 譯者說明
本文為 Earendil 原文的完整中文譯文。中文譯文及適配部分經授權按 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh-hans) 釋出；如有歧義，請以[英文原文](https://earendil.com/posts/measuring-code-sloppiness/)為準。
:::

## 繼續閱讀

- [英文原文：If coding is solved, what now?: Measuring the sloppiness of code](https://earendil.com/posts/measuring-code-sloppiness/)
- [上一篇：邀請你開啟一場通訊](/zh-TW/translations/invitation)
- [返回：官方授權譯文目錄](/zh-TW/translations/)
