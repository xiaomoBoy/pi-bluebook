---
title: AI 與 Agent 熱詞表
description: 用人話解釋 Pi 學習中反覆出現的 20 個 AI 與 Agent 核心概念，並連接到對應課程和 FAQ。
prev:
  text: Pi 故障排查手冊
  link: /zh-TW/reference/troubleshooting
next:
  text: 檔案與工作目錄
  link: /zh-TW/guide/files-and-context
---

<span class="library-status">GLOSSARY · 遇到術語時查這裡</span>

# AI 與 Agent 熱詞表

這不是一份追求“大而全”的 AI 百科。第一版只解釋 Pi 藍皮書正文和 98 條學習記錄中反覆出現、會直接影響使用判斷的 20 個詞。

每個詞先給一句人話解釋，再說明它在 Pi 裡意味著什麼。需要操作時，繼續進入對應課程；帶有版本和產品邊界的說明核驗於 **2026-09-11**。

## 快速查詢

| 認識 Pi | 理解工作階段 | 看懂執行過程 | 擴充 Pi |
| --- | --- | --- | --- |
| [Pi](#pi) | [上下文（Context）](#上下文) | [Agent Loop](#agent-loop) | [Tool / Tool Call](#tool-tool-call) |
| [Pi Coding Agent](#pi-coding-agent) | [上下文 Window](#context-window) | [System Prompt](#system-prompt) | [技能（Skill）](#技能) |
| [Coding Agent](#coding-agent) | [工作階段（Session）](#工作階段) | [Token](#token) | [擴充功能（Extension）](#擴充功能) |
| [代理框架（Agent Harness）](#agent-harness) | [工作階段 Tree](#session-tree) | [Prompt Cache](#prompt-cache) | [包（Package）](#包) |
| [Agent Runtime](#agent-runtime) | [壓縮（Compaction）](#壓縮) | [Cache Hit](#cache-hit) | [子代理（Subagent）](#子代理) |

## Pi {#pi}

**人話解釋：** Pi 是一個執行在終端機裡的極簡代理框架。它把模型、工具、工作階段、上下文和工作目錄連接起來，讓模型不只回答問題，還能在你的電腦上處理真實任務。

**在 Pi 裡意味著什麼：** 日常所說的“開啟 Pi”“讓 Pi 改檔案”，通常就是啟動 `pi` 命令使用這套代理框架。Pi 不是模型，也不自帶模型額度；它需要連接模型服務商（Provider）提供的模型。官方當前把產品直接稱為 Pi，安裝包名稱則是 `@earendil-works/pi-coding-agent`，不必把兩種叫法理解成彼此獨立的產品。

**相關：** [Pi Coding Agent](#pi-coding-agent) · [代理框架](#agent-harness) · [Pi 到底是什麼？](/zh-TW/reference/faq#what-is-pi)

## Pi Coding Agent {#pi-coding-agent}

**人話解釋：** Pi Coding Agent 是 Pi 的產品與安裝包語境名稱，強調它主要透過終端機完成程式碼、檔案和命令任務。

**在 Pi 裡意味著什麼：** 新手看到 `pi`、Pi、Pi Coding Agent 或 npm 包 `@earendil-works/pi-coding-agent` 時，多數情況下是在談同一個日常使用入口。只有討論原始碼包、SDK 或底層模組時，才需要進一步區分倉庫中的不同組成部分。它仍然只是代理框架，不是負責推理的模型。

**相關：** [Pi](#pi) · [Coding Agent](#coding-agent) · [Pi 和 Pi Coding Agent 有什麼區別？](/zh-TW/reference/faq#pi-vs-pi-coding-agent)

## Coding Agent {#coding-agent}

**人話解釋：** Coding Agent 是一類以程式碼和檔案任務為主要工作物件的 Agent。它能讀取專案、修改檔案、執行命令，並根據結果繼續調整。

**在 Pi 裡意味著什麼：** “Coding”不代表只能寫程式。整理 Markdown、檢查配置、生成表格或執行構建，也可能屬於它的工作範圍。關鍵區別是它能呼叫真實工具影響工作目錄，而不只是給出一段聊天答案。因此，權限控制和結果驗收比普通問答更重要。

**相關：** [代理框架](#agent-harness) · [Tool / Tool Call](#tool-tool-call) · [Pi 和 Claude Code、Codex 有什麼區別？](/zh-TW/reference/faq#pi-vs-other-agents)

## 代理框架 {#agent-harness}

**人話解釋：** 代理框架是包在模型外面的執行系統。它負責準備指令和上下文、提供工具、儲存工作階段，並讓模型和工具在一個迴圈裡協作。

**在 Pi 裡意味著什麼：** 模型決定“下一步想做什麼”，代理框架決定模型能看到什麼工具、工具怎樣執行、結果如何送回，以及對話怎樣儲存。同一個模型放進不同代理框架，可能因為系統提示、工具設計和上下文組織不同而表現不同。Pi 的核心定位正是一個可由使用者改造的極簡代理框架。

![Pi 作為代理框架，連接使用者目標、模型、工具、專案檔案和工作階段。](/images/diagrams/pi-harness-overview.svg)

*圖解：代理框架是模型外面負責組織工作的那一層。*

**相關：** [Agent Loop](#agent-loop) · [System Prompt](#system-prompt) · [什麼是代理框架？](/zh-TW/translations/what-is-a-harness)

## Agent Runtime {#agent-runtime}

**人話解釋：** Agent Runtime 是讓 Agent 實際執行的環境與生命週期層，關注任務狀態、執行過程、恢復方式以及怎樣被其他程式長期呼叫。

**在 Pi 裡意味著什麼：** Pi 具備工作階段、RPC、SDK 和可擴充事件等 Runtime 組成部分，但“Agent Runtime”不是當前官方文件中的一個獨立成品功能名稱。藍皮書使用這個詞，是為了理解 Pi 如何從一次終端機互動延伸到可嵌入、可恢復的長期工作方式，不代表啟動 `pi` 就自動獲得後臺常駐、定時任務或無人值守安全保障。

**相關：** [工作階段](#工作階段) · [Agent Loop](#agent-loop) · [VPS 與長任務](/zh-TW/guide/vps-and-long-running)

## Agent Loop {#agent-loop}

**人話解釋：** Agent Loop 是“理解目標 → 選擇動作 → 呼叫工具 → 讀取結果 → 決定下一步”的迴圈。任務完成、遇到錯誤或需要人做決定時，迴圈才會停下。

**在 Pi 裡意味著什麼：** 當 Pi 讀取檔案後又繼續搜尋、修改並執行檢查，這些連續動作就是迴圈的一部分。模型並不是一次規劃好全部過程；每次工具結果都會成為下一步判斷的新輸入。迴圈能帶來自主執行，也可能反覆試錯，所以任務需要明確停止條件和可獨立檢查的結果。

**相關：** [代理框架](#agent-harness) · [Tool / Tool Call](#tool-tool-call) · [安全與驗收](/zh-TW/guide/safety)

## System Prompt {#system-prompt}

**人話解釋：** System Prompt 是每輪請求中放在較高優先順序位置的基礎說明，用來告訴模型當前角色、可用工具和通用行為要求。

**在 Pi 裡意味著什麼：** Pi 刻意保持預設 System Prompt 較短，並允許透過配置和擴充功能調整。專案裡的 `AGENTS.md`、`CLAUDE.md` 等上下文檔案會繼續補充專案要求，但它們不是作業系統權限。System Prompt 變長或頻繁變化，也會增加上下文佔用並影響提示快取字首。

**相關：** [上下文](#上下文) · [Prompt Cache](#prompt-cache) · [專案信賴（Project Trust）不是沙箱](/zh-TW/guide/safety)

## Token {#token}

**人話解釋：** Token 是模型處理輸入和生成輸出時使用的計量單位。它不等同於漢字或單詞，一個詞、符號或程式碼片段可能被拆成不同數量的 Token。

**在 Pi 裡意味著什麼：** System Prompt、工具說明、對話、檔案內容和工具結果都會佔用輸入 Token，模型回覆則產生輸出 Token。Token 會影響上下文容量、速度和可能的 API 成本，但“用得少”不等於任務品質高。判斷結果仍要回到檔案、測試和真實業務狀態。

**相關：** [上下文 Window](#context-window) · [Prompt Cache](#prompt-cache) · [為什麼說 Pi 比較省 Token？](/zh-TW/reference/faq#why-pi-uses-fewer-tokens)

## 上下文 {#上下文}

**人話解釋：** 上下文是模型在當前這一輪真正收到、能夠用來判斷的輸入集合，包括系統說明、選中的工作階段歷史、檔案內容和工具結果。

**在 Pi 裡意味著什麼：** 工作階段可以儲存完整的樹狀歷史，但當前模型只會收到從工作階段樹中構造出的有效路徑，以及代理框架本輪加入的其他材料。磁碟上存在某個檔案，不代表模型已經讀過；很久以前說過一句話，也不代表它仍在當前上下文中。重要約束應落到可重新讀取的檔案。

**相關：** [工作階段](#工作階段) · [上下文 Window](#context-window) · [上下文和工作階段有什麼區別？](/zh-TW/reference/faq#context-vs-session)

## 上下文 Window {#context-window}

**人話解釋：** 上下文 Window 是模型單次請求能處理的最大上下文範圍。System Prompt、歷史訊息、工具說明、工具結果和預留回覆空間都要從這份容量裡分配。

**在 Pi 裡意味著什麼：** 長任務不斷加入網頁、日誌和檔案後，會越來越接近視窗上限。視窗大不代表可以無限堆材料；無關內容仍會增加處理時間並干擾判斷。接近上限時，Pi 可以進行壓縮，但真正不能丟的目標、決定和進度應先寫入檔案。

![工作階段、專案檔案與壓縮摘要被 Pi 組裝成當前上下文，再傳送給模型。](/images/diagrams/context-session-compaction.svg)

*圖解：磁碟上儲存的歷史，不等於這一輪模型收到的全部輸入。*

**相關：** [上下文](#上下文) · [壓縮](#壓縮) · [上下文 Window 滿了會怎樣？](/zh-TW/reference/faq#context-window-full)

## 工作階段 {#工作階段}

**人話解釋：** 工作階段是 Pi 自動儲存的一次工作階段。它記錄訊息、模型變化、工具呼叫、壓縮摘要和分支結構，讓你以後能夠繼續或回看任務。

**在 Pi 裡意味著什麼：** 工作階段預設按工作目錄儲存在本地 JSONL 檔案中，可以透過 `/resume`、`pi -c` 等入口繼續。它儲存的是工作階段歷史，不是專案檔案的版本備份，也不是保證跨專案生效的長期記憶。檔案被改壞時，仍要依靠 Git、備份或原始材料恢復。

**相關：** [工作階段 Tree](#session-tree) · [上下文](#上下文) · [工作階段與續寫](/zh-TW/guide/sessions)

## 工作階段 Tree {#session-tree}

**人話解釋：** 工作階段 Tree 是 Pi 在同一份工作階段檔案裡儲存多條對話路線的樹狀結構。回到舊節點繼續提問，會長出新分支，而不是覆蓋原來的路線。

**在 Pi 裡意味著什麼：** `/tree` 用來檢視和切換同一工作階段內的節點；`/fork` 與 `/clone` 則會建立新的工作階段檔案。當前上下文只沿選中的有效路徑構造，不會同時把所有失敗分支都發給模型。離開分支時還可以生成摘要，保留其中值得帶走的資訊。

**相關：** [工作階段](#工作階段) · [上下文](#上下文) · [Pi 工作階段官方說明](https://pi.dev/docs/latest/sessions)

## 壓縮 {#壓縮}

**人話解釋：** 壓縮是在上下文變長時，用摘要替代一部分較早訊息、同時保留近期原始內容的機制，從而騰出繼續工作的空間。

**在 Pi 裡意味著什麼：** Pi 會在接近模型視窗限制時自動壓縮，也可以透過 `/compact` 手動觸發。壓縮改變的是後續傳送給模型的上下文表示，不會撤銷已經寫入磁碟的檔案；摘要也可能遺漏細節。壓縮前先儲存目標、範圍、完成項和下一步，壓縮後再從檔案核對。

**相關：** [上下文 Window](#context-window) · [工作階段](#工作階段) · [上下文與壓縮](/zh-TW/guide/context-and-compaction)

## Prompt Cache {#prompt-cache}

**人話解釋：** Prompt Cache 是模型服務對重複提示字首的複用機制。連續請求前半部分保持一致時，服務商可能不必每次從頭處理全部輸入。

**在 Pi 裡意味著什麼：** 穩定的 System Prompt、工具定義和追加式工作階段有利於複用字首；切換模型、改變工具、改走分支或執行壓縮，都可能改變可複用部分。是否支援、保留多久、怎樣計費由模型服務商和模型決定，Pi 只能展示它收到的用量資訊。

**相關：** [Cache Hit](#cache-hit) · [System Prompt](#system-prompt) · [提示快取入門](/zh-TW/guide/prompt-caching)

## Cache Hit {#cache-hit}

**人話解釋：** Cache Hit 表示當前請求有一部分輸入成功複用了已有快取。它描述“重複計算省下了多少”，不是給回答品質打的分數。

**在 Pi 裡意味著什麼：** 高命中可能降低延遲或輸入成本，但輸出仍可能漏項；低命中也可能只是剛換模型、剛壓縮或快取已過期。不同模型服務商返回的快取欄位並不統一，介面沒有顯示命中資料也不必然是故障。任務是否完成仍應檢查真實產物。

**相關：** [Prompt Cache](#prompt-cache) · [Token](#token) · [為什麼快取命中率比較高？](/zh-TW/reference/faq#why-cache-hit-is-high)

## Tool / Tool Call {#tool-tool-call}

**人話解釋：** Tool 是代理框架提供給模型的外部能力，例如讀取檔案或執行命令；Tool Call 是模型在某一步選擇並呼叫這個能力的動作。

**在 Pi 裡意味著什麼：** Pi 當前內建 `read`、`bash`、`edit`、`write`、`grep`、`find`、`ls` 等工具，不同系統和設定下的啟用情況可能不同，擴充功能也能註冊新工具。工具說明會進入上下文，呼叫結果會送回 Agent Loop。工具越多不一定越好，權限和選擇複雜度也會隨之增加。

**相關：** [Agent Loop](#agent-loop) · [擴充功能](#擴充功能) · [Pi 為什麼保持少量核心工具？](/zh-TW/reference/faq#why-few-tools)

## 技能 {#技能}

**人話解釋：** 技能是按需載入的專項能力包，用說明、指令碼、參考資料和資源教 Agent 怎樣完成一類任務。

**在 Pi 裡意味著什麼：** Pi 啟動時通常只把技能的名稱和描述放入上下文，任務匹配後再讀取完整 `SKILL.md`，這叫漸進式披露。技能適合固化已經跑通的工作流程，但它不是權限隔離層；技能也可能帶指令碼，或引導 Agent 執行有副作用的操作，使用前仍要審查來源。

**相關：** [擴充功能](#擴充功能) · [包](#包) · [技能、擴充功能與包](/zh-TW/guide/skills-extensions-packages)

## 擴充功能 {#擴充功能}

**人話解釋：** 擴充功能是載入到 Pi 程序中的 TypeScript 擴充程式碼，可以新增工具、命令、介面和事件處理，也能改變部分執行行為。

**在 Pi 裡意味著什麼：** 當文字說明不足以實現目標，例如需要攔截危險命令、增加自定義工具或儲存擴充狀態，才適合考慮擴充功能。它以啟動 Pi 的當前使用者權限執行，能夠執行任意程式碼；專案級擴充功能受專案信賴的載入決定影響，但被載入後並不會進入沙箱。

**相關：** [技能](#技能) · [包](#包) · [Pi 擴充功能官方說明](https://pi.dev/docs/latest/extensions)

## 包 {#包}

**人話解釋：** Pi 包是分發容器，可以把擴充功能、技能、提示模板和主題組合起來，透過 npm 或 Git 安裝和共享。

**在 Pi 裡意味著什麼：** 包解決的是“怎樣配送一組資源”，不是新的能力層級，也不是安全容器。安裝一個包後，實際載入的可能是可執行擴充功能，也可能是會影響 Agent 行為的技能。新手應先確認真實需求、檢查來源與包含內容，再一次只啟用一個最接近問題的資源。

![技能負責方法，擴充功能負責執行能力，包負責打包和分發。](/images/diagrams/skill-extension-package.svg)

*圖解：三者不是能力等級，包也不是安全容器。*

**相關：** [技能](#技能) · [擴充功能](#擴充功能) · [外掛程式推薦](/zh-TW/plugins/)

## 子代理 {#子代理}

**人話解釋：** 子代理是主代理（Main Agent）為一個邊界清楚的子任務啟動或委派的輔助 Agent，通常擁有獨立上下文，並把結果交回主代理合併。

**在 Pi 裡意味著什麼：** Pi 核心當前不內建子代理功能；可以用獨立工作階段練習分工，也可以透過擴充功能或第三方包實現自動委派。多個 Agent 會增加模型呼叫、交接和衝突處理成本。只有子任務能夠獨立完成、交付格式清楚並有統一驗收人時，並行才真正有價值。

**相關：** [上下文](#上下文) · [Agent Loop](#agent-loop) · [子代理如何分工](/zh-TW/guide/subagents)

## 本頁依據與維護邊界

- [Pi 官方網站](https://pi.dev/)
- [Pi 使用說明](https://pi.dev/docs/latest/usage)
- [Pi 工作階段](https://pi.dev/docs/latest/sessions)
- [Pi 壓縮](https://pi.dev/docs/latest/compaction)
- [Pi 技能](https://pi.dev/docs/latest/skills)
- [Pi 擴充功能](https://pi.dev/docs/latest/extensions)
- [Pi 包](https://pi.dev/docs/latest/packages)
- [Pi Security](https://pi.dev/docs/latest/security)
- [什麼是代理框架？](/zh-TW/translations/what-is-a-harness)
- [98 條推文學習目錄](/zh-TW/tweets/)

本頁不維護模型清單、價格或短期外掛程式狀態。正文出現新概念時，先判斷它是否會反覆影響理解，再決定是否加入；第一版之外的候選詞不會為了湊齊 AI 百科而提前擴張。
