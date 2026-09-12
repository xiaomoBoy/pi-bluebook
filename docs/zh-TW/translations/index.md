---
title: Earendil 官方授權譯文
description: 經 Earendil 正式授權釋出的十一篇 Pi、代理框架、程式碼品質與公司願景文章完整中文譯文。
prev:
  text: 參考手冊
  link: /zh-TW/reference/
next:
  text: 無法隨身帶走的工作階段
  link: /zh-TW/translations/session-portability
---

<span class="library-status">官方授權譯文 · AUTHORIZED TRANSLATIONS</span>

# Earendil 官方授權譯文

這裡收錄 Earendil 關於 Pi、代理框架（Agent Harness）、工作階段機制、程式碼品質與公司願景的十一篇文章中文譯文。十一篇譯文均已獲得 Earendil 正式授權，並按原文完整翻譯。

每一頁都保留原文標題、作者、釋出日期和原文連結，並標明：

> Adapted and translated with permission from Earendil.

中文譯文及適配部分按 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh-hans) 釋出；英文原文版權歸 Earendil 所有。

## 建議閱讀順序

前六篇最貼近 Pi 學習：先理解工作階段、壓縮和快取，再認識代理框架，並從非工程師和效能案例兩個角度理解 Pi。第七至十篇記錄 Pi 加入 Earendil 的背景，以及 Earendil 對可信、個性化軟體的長期願景。第十一篇進一步討論 AI 程式碼的品質評估。

| 你現在想弄清什麼 | 建議先讀 | 讀完回到哪裡 |
| --- | --- | --- |
| Pi 為什麼這樣設計 | 《什麼是代理框架？》《這個代理框架屬於我》 | [導論](/zh-TW/guide/introduction)、[執行原理](/zh-TW/guide/how-pi-works) |
| 長對話為什麼會丟細節 | 工作階段可移植性、壓縮、提示快取三篇 | [模組三](/zh-TW/guide/context-and-compaction)、[壓縮實驗](/zh-TW/cases/compaction-before-after) |
| Agent 能執行，程式碼就合格了嗎 | 《衡量程式碼的粗糙程度》《Pi：極簡而高效》 | [程式碼修復](/zh-TW/cases/code-repair)、[畢業專案](/zh-TW/cases/graduation-project) |
| 想了解作者與公司的背景 | 公告、反思、制高點、通訊邀請 | 作為選讀，不是安裝前置條件 |

### 01 無法隨身帶走的工作階段

**原文標題**　*The 工作階段（Session） You Cannot Take With You*

**釋出日期**　2026-07-30

討論當工作階段依賴提供商儲存的 ID、密文、託管搜尋和隱藏的 Agent 訊息時，為什麼本地轉錄記錄不再等於完整工作階段，以及一個真正可移植的推理 API 應當滿足什麼條件。

[閱讀中文譯文](/zh-TW/translations/session-portability) · [檢視英文原文](https://earendil.com/posts/session-portability/)

### 02 Pi 中的壓縮機制

**原文標題**　*How 壓縮（Compaction） Works in Pi*

**釋出日期**　2026-08-13

從 LLM 的上下文視窗講起，說明 Pi 何時觸發壓縮、壓縮請求如何生成交接摘要，以及壓縮為什麼會重置提示快取。

[閱讀中文譯文](/zh-TW/translations/compaction-in-pi) · [檢視英文原文](https://earendil.com/posts/compaction-in-pi/)

### 03 Agent 中的提示快取

**原文標題**　*提示快取（Prompt Caching） In Agents*

**釋出日期**　2026-07-22

解釋 KV 快取、工作階段親和性、字首匹配、工具設定與 TTL，並說明快取命中如何影響程式設計 Agent 的延遲、價格和設計。

[閱讀中文譯文](/zh-TW/translations/prompt-caching) · [檢視英文原文](https://earendil.com/posts/prompt-caching/)

### 04 什麼是代理框架？

**原文標題**　*What is a 代理框架?*

**釋出日期**　2026-08-20

借用攀巖安全帶的比喻，解釋系統提示、工具、Agent 迴圈和模型轉換層，以及使用者為什麼可以擁有並改造自己的代理框架。

[閱讀中文譯文](/zh-TW/translations/what-is-a-harness) · [檢視英文原文](https://earendil.com/posts/what-is-a-harness/)

### 05 代理框架千千萬，這一個屬於我

**原文標題**　*There are many agent harnesses, but this one is mine.*

**釋出日期**　2026-09-01

一位非工程師講述如何從不敢詢問技術術語，走到用 Pi 整理收件箱、製作小工具，並真正擁有自己的工作方式。

[閱讀中文譯文](/zh-TW/translations/mine-agent-harness) · [檢視英文原文](https://earendil.com/posts/there-are-many-agent-harnesses-but-this-one-is-mine/)

### 06 Pi：極簡而高效

**原文標題**　*Pi, Minimal and Performant*

**釋出日期**　2026-08-04

透過 Databricks 與 Shopify 案例討論 Pi 的上下文紀律、每項任務成本，以及“極簡但可擴充”為什麼可能帶來更高效率。

[閱讀中文譯文](/zh-TW/translations/pi-minimal-performant) · [檢視英文原文](https://earendil.com/posts/pi-autoresearch-and-databricks/)

### 07 Pi 與 Lefos 正式釋出

**原文標題**　*Announcing Pi & Lefos*

**釋出日期**　2026-04-08

Earendil 宣佈收購 Pi、Mario Zechner 加入團隊，以及 Lefos 進入公開 Alpha 階段。

[閱讀中文譯文](/zh-TW/translations/announcing-pi-and-lefos) · [檢視英文原文](https://earendil.com/posts/announcing-pi-and-lefos/)

### 08 關於今日公告的一些思考

**原文標題**　*A Reflection on our Announcement Today*

**釋出日期**　2026-04-08

Armin 與 Colin 回顧 Earendil 的起點，說明 Pi、Lefos 和早期支持者背後共同的長期主義與信賴原則。

[閱讀中文譯文](/zh-TW/translations/announcement-reflection) · [檢視英文原文](https://earendil.com/posts/announcement-reflection/)

### 09 制高點

**原文標題**　*The High Ground*

**釋出日期**　2026-02-12

討論 2026 至 2031 年軟體與計算的變化，並提出未來制高點位於能力、定製、個性化、愉悅、簡單和信賴的交匯處。

[閱讀中文譯文](/zh-TW/translations/the-high-ground) · [檢視英文原文](https://earendil.com/posts/the-high-ground/)

### 10 邀請你開啟一場通訊

**原文標題**　*An Invitation to Begin a Correspondence*

**釋出日期**　2026-01-18

Earendil 邀請讀者透過開放寫作和電子郵件，加入一場關於軟體、人類自主權與理解的長期通訊。

[閱讀中文譯文](/zh-TW/translations/invitation) · [檢視英文原文](https://earendil.com/posts/invitation/)

### 11 如果程式設計已經不成問題，接下來呢？

**原文標題**　*If coding is solved, what now?: Measuring the sloppiness of code*

**釋出日期**　2026-09-10

從程式碼行數、冗長程度與侵蝕程度等指標出發，討論為什麼功能正確的 AI 程式碼仍會讓程式碼庫逐漸惡化，並藉助多輪程式設計評估說明自動評判的侷限，以及人類直覺與品味為何仍然不可缺少。

[閱讀中文譯文](/zh-TW/translations/measuring-code-sloppiness) · [檢視英文原文](https://earendil.com/posts/measuring-code-sloppiness/)

::: info 翻譯與許可說明
十一篇英文原文的版權歸 Earendil 所有。中文譯文及適配部分經 Earendil 授權按 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh-hans) 釋出。譯文力求忠實保留原文結構、觀點、示例、圖片和連結；如有歧義，請以對應的英文原文為準。原文配圖隨文章授權使用，並在譯文中保留攝影者、製圖方或專案來源署名。
:::
