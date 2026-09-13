---
title: Pi 常見問題 FAQ
description: 集中回答初學者最常問的 20 個 Pi 問題，並連接到熱詞解釋、主線課程和官方資料。
prev:
  text: 參考手冊
  link: /zh-TW/reference/
next:
  text: Pi 故障排查手冊
  link: /zh-TW/reference/troubleshooting
---

<span class="library-status">FAQ · 先找問題，再繼續學習</span>

# Pi 常見問題 FAQ

這裡優先給結論，不在同一頁複製一遍完整教學。找到與你相同的問題後，先讀短答，再沿“繼續閱讀”進入對應熱詞或課程。

涉及 Pi 產品、工具、模型服務商（Provider）、權限和版本行為的回答核驗於 **2026-09-11**。實際介面與本頁不一致時，以 [Pi 最新官方文件](https://pi.dev/docs/latest) 和你本機 `pi --help` 為準。

## 快速查詢

### 認識 Pi

1. [Pi 到底是什麼？](#what-is-pi)
2. [Pi 和 Pi Coding Agent 有什麼區別？](#pi-vs-pi-coding-agent)
3. [Pi 和 Claude Code、Codex 有什麼區別？](#pi-vs-other-agents)
4. [代理框架（Agent Harness）到底是什麼？](#what-is-agent-harness)
5. [Pi 為什麼設計得這麼簡單？](#why-pi-is-minimal)
6. [Pi 為什麼保持少量核心工具？](#why-few-tools)

### 模型、成本與本地執行

7. [Pi 自帶模型嗎？](#does-pi-include-models)
8. [Pi 可以使用哪些模型？](#which-models)
9. [本地 Agent 和本地模型是一回事嗎？](#local-agent-vs-local-model)
10. [為什麼說 Pi 比較省 Token？](#why-pi-uses-fewer-tokens)
11. [Pi 的快取命中率為什麼經常比較高？](#why-cache-hit-is-high)

### 工作階段與上下文

12. [上下文（Context）和工作階段（Session）有什麼區別？](#context-vs-session)
13. [上下文 Window 滿了會發生什麼？](#context-window-full)
14. [壓縮（Compaction）會把以前的聊天記錄刪掉嗎？](#does-compaction-delete-history)
15. [Pi 有長期記憶嗎？](#does-pi-have-long-term-memory)

### 擴充與安全

16. [技能（Skill）、擴充功能（Extension）和包（Package）有什麼區別？](#skill-extension-package)
17. [技能和 MCP 應該怎麼選？](#skill-vs-mcp)
18. [擴充功能是不是裝得越多越好？](#more-extensions-better)
19. [Pi 安裝第三方外掛程式安全嗎？](#are-third-party-packages-safe)
20. [專案信賴（Project Trust）是不是沙箱？](#is-project-trust-a-sandbox)

## Pi 到底是什麼？ {#what-is-pi}

**短答：Pi 是一個極簡、可擴充的終端機代理框架，不是大語言模型。**

它負責把模型、工具、工作階段、上下文和工作目錄連接起來，讓模型能夠讀取檔案、執行命令並持續處理任務。真正完成推理的是你透過模型服務商接入的模型；Pi 負責組織這套工作過程。

![Pi 把使用者目標連接到模型、工具、專案檔案和工作階段，並負責組織整個工作過程。](/images/diagrams/pi-harness-overview.svg)

*圖解：模型負責判斷，Pi 負責把判斷變成可執行、可儲存、可驗收的工作。*

**繼續閱讀：** [Pi](/zh-TW/reference/glossary#pi) · [代理框架](/zh-TW/reference/glossary#agent-harness) · [導論：為什麼讀這本書](/zh-TW/guide/introduction)

## Pi 和 Pi Coding Agent 有什麼區別？ {#pi-vs-pi-coding-agent}

**短答：在日常使用裡，兩者通常指向同一個終端機產品，不需要硬拆成兩個軟體。**

官方網站直接使用 Pi 這個名字，安裝包則叫 `@earendil-works/pi-coding-agent`。討論安裝、命令和介面時，可以把 Pi Coding Agent 理解為完整名稱；討論原始碼、SDK 或組成模組時，再區分具體包和底層能力。

**繼續閱讀：** [Pi Coding Agent](/zh-TW/reference/glossary#pi-coding-agent) · [Pi 官方網站](https://pi.dev/)

## Pi 和 Claude Code、Codex 有什麼區別？ {#pi-vs-other-agents}

**短答：它們都能把模型帶進真實工作，但預設能力、產品邊界和定製方式不同，不能只做“誰更強”的排名。**

Pi 的核心取向是保持小，把子代理（Subagent）、計劃模式、權限彈窗等工作流選擇留給使用者透過擴充功能、包或外部隔離環境補充。Claude Code 和 Codex 的功能會持續更新，真正比較時應固定日期、模型、任務、權限與驗收標準，而不是把模型能力和代理框架能力混在一起。

**繼續閱讀：** [Coding Agent](/zh-TW/reference/glossary#coding-agent) · [從 98 條推文留下的十條判斷](/zh-TW/guide/lasting-principles)

## 代理框架到底是什麼？ {#what-is-agent-harness}

**短答：它是模型外面負責“組織工作”的那層軟體。**

代理框架會準備系統提示和上下文，向模型描述可用工具，執行模型選擇的 Tool Call，把結果送回 Agent Loop，並儲存工作階段。同一個模型換到不同代理框架後，可能因為這些組織方式不同而表現不同。

**繼續閱讀：** [代理框架](/zh-TW/reference/glossary#agent-harness) · [什麼是代理框架？](/zh-TW/translations/what-is-a-harness)

## Pi 為什麼設計得這麼簡單？ {#why-pi-is-minimal}

**短答：這是產品取向，不是“還沒做完”。**

Pi 把核心保持小，讓使用者按真實需求選擇模型、工具和工作流，也減少預設上下文與隱藏行為。代價是使用者要更清楚自己安裝了什麼、開放了哪些權限，以及最終怎樣驗收結果。

**繼續閱讀：** [Pi 官方設計原則](https://pi.dev/docs/latest/usage#design-principles) · [從 98 條推文留下的十條判斷](/zh-TW/guide/lasting-principles)

## Pi 為什麼保持少量核心工具？ {#why-few-tools}

**短答：少量預設工具讓基礎工作流更容易理解，也減少模型每輪需要選擇和處理的工具說明。**

Pi 當前內建 `read`、`bash`、`edit`、`write`、`grep`、`find`、`ls` 等工具，其中最常被概括的是讀、寫、編輯和執行命令四類核心能力；Windows 還會出現 PowerShell 入口。不要把“預設簡潔”寫成“永遠只有四個內建工具”，需要的新能力可以由擴充功能增加。

**繼續閱讀：** [Tool / Tool Call](/zh-TW/reference/glossary#tool-tool-call) · [Pi 使用說明](https://pi.dev/docs/latest/usage#tool-options)

## Pi 自帶模型嗎？ {#does-pi-include-models}

**短答：不自帶。安裝 Pi 不等於已經獲得模型或呼叫額度。**

Pi 負責組織 Agent 工作流，真正的推理由模型服務商提供的模型完成。開始使用前，你仍需透過受支援的訂閱登入、API Key、本地模型路由或自定義模型服務商建立可用連接。

**繼續閱讀：** [登入與模型設定](/zh-TW/guide/connect-model) · [Pi 模型服務商](https://pi.dev/docs/latest/providers)

## Pi 可以使用哪些模型？ {#which-models}

**短答：使用 Pi 當前內建目錄或你設定的模型服務商所支援的模型，不建議在 FAQ 裡維護一張容易過時的完整型號表。**

執行 `/model` 檢視當前環境真實可選項；也可以透過官方支援的自定義模型和模型服務商方式擴充。選模型時同時考慮任務型別、穩定性、費用、速度和上下文 Window，不要只看排行榜。

**繼續閱讀：** [登入與模型設定](/zh-TW/guide/connect-model) · [Pi 模型服務商](https://pi.dev/docs/latest/providers)

## 本地 Agent 和本地模型是一回事嗎？ {#local-agent-vs-local-model}

**短答：不是，它們描述的是兩個不同位置。**

本地 Agent 表示 Pi 程序執行在你的電腦或伺服器上；本地模型表示推理也在你控制的硬體上完成。你可以本地執行 Pi、連接雲端模型，也可以讓本地 Pi 透過 llama.cpp 等方式連接本地模型，檔案位置與推理位置要分別判斷。

![本地執行的 Pi 可以連接雲端模型服務商和模型，也可以透過本地介面連接在自有硬體執行的模型。](/images/diagrams/local-agent-model.svg)

*圖解：先問 Agent 在哪裡執行，再問模型在哪裡推理。*

**繼續閱讀：** [代理框架](/zh-TW/reference/glossary#agent-harness) · [Pi llama.cpp 指南](https://pi.dev/docs/latest/llama-cpp)

## 為什麼說 Pi 比較省 Token？ {#why-pi-uses-fewer-tokens}

**短答：不是因為 Pi 有一種能自動消除 Token 的技術，而是它的預設 System Prompt、基礎工作流和按需擴充比較剋制。**

技能採用漸進式載入，穩定字首還能在模型服務商支援時利用 Prompt Cache。不過，讀入大檔案、堆積工具結果或同時啟用許多擴充仍會消耗上下文；真實費用要以當前模型服務商的計費記錄為準。

**繼續閱讀：** [Token](/zh-TW/reference/glossary#token) · [技能](/zh-TW/reference/glossary#技能) · [提示快取入門](/zh-TW/guide/prompt-caching)

## Pi 的快取命中率為什麼經常比較高？ {#why-cache-hit-is-high}

**短答：連續工作階段中的穩定字首有機會被模型服務商重複利用，但並不是每個模型都會返回同樣的快取資料。**

Pi 較短的基礎提示、相對穩定的工具說明和追加式工作階段，有利於保持相同字首；切換模型、調整工具、改變舊分支或執行壓縮都可能改變快取。命中率高不代表答案正確，仍要獨立驗收產物。

**繼續閱讀：** [Prompt Cache](/zh-TW/reference/glossary#prompt-cache) · [Cache Hit](/zh-TW/reference/glossary#cache-hit) · [Agent 中的提示快取](/zh-TW/translations/prompt-caching)

## 上下文和工作階段有什麼區別？ {#context-vs-session}

**短答：工作階段是儲存下來的完整工作階段結構，上下文是當前這一輪實際傳送給模型的輸入。**

Pi 的工作階段可以包含多條分支、工具結果和壓縮記錄；模型當前只看到從選中路徑構造出的內容以及本輪加入的其他材料。因此“歷史還在”不等於“模型現在仍能看到所有細節”。

![工作階段儲存完整歷史，Pi 從選中路徑、專案檔案和壓縮摘要組裝當前上下文後傳送給模型。](/images/diagrams/context-session-compaction.svg)

*圖解：工作階段負責儲存，上下文決定模型這一輪實際能看到什麼。*

**繼續閱讀：** [上下文](/zh-TW/reference/glossary#上下文) · [工作階段](/zh-TW/reference/glossary#工作階段) · [工作階段與續寫](/zh-TW/guide/sessions)

## 上下文 Window 滿了會發生什麼？ {#context-window-full}

**短答：模型不能繼續無限接收新內容，Pi 通常需要壓縮較早歷史或重新組織任務。**

Pi 會根據模型視窗和預留回覆空間判斷何時自動壓縮，也可以由使用者手動執行 `/compact`。如果任務已經混入大量無關內容，開啟新的工作階段可能比反覆壓縮更清楚；無論採用哪種方式，都應先把關鍵狀態寫入檔案。

**繼續閱讀：** [上下文 Window](/zh-TW/reference/glossary#context-window) · [壓縮](/zh-TW/reference/glossary#壓縮) · [上下文與壓縮](/zh-TW/guide/context-and-compaction)

## 壓縮會把以前的聊天記錄刪掉嗎？ {#does-compaction-delete-history}

**短答：在 Pi 當前實現中，壓縮主要改變後續送給模型的舊歷史表示，不等於把整個工作階段檔案簡單刪掉。**

Pi 會寫入壓縮摘要和保留邊界，原工作階段仍用於記錄歷史結構；但模型後續看到的是摘要加近期原文，早期細節可能沒有進入摘要。壓縮也不會恢復或撤銷磁碟檔案，所以關鍵決定仍要另外落盤並複查。

**繼續閱讀：** [壓縮](/zh-TW/reference/glossary#壓縮) · [Pi 中的壓縮機制](/zh-TW/translations/compaction-in-pi) · [Pi 壓縮](https://pi.dev/docs/latest/compaction)

## Pi 有長期記憶嗎？ {#does-pi-have-long-term-memory}

**短答：Pi 原生有可恢復的工作階段，但不要把它等同於會跨任務自動整理經驗的長期 Memory 系統。**

工作階段讓你續寫同一工作歷史，上下文決定模型本輪能看到什麼；跨工作階段、跨專案保留偏好和經驗，通常需要檔案、技能、自建擴充功能或第三方包。重要知識最好儲存為可讀、可審查、可版本管理的專案檔案。

**繼續閱讀：** [工作階段](/zh-TW/reference/glossary#工作階段) · [上下文](/zh-TW/reference/glossary#上下文) · [無法隨身帶走的工作階段](/zh-TW/translations/session-portability)

## 技能、擴充功能和包有什麼區別？ {#skill-extension-package}

**短答：技能教它怎麼做，擴充功能增加或改變執行能力，包負責打包和分發這些資源。**

同一需求先手動跑通，重複流程再整理成技能；只有確實缺少可執行能力時才開發或安裝擴充功能；準備跨專案或給別人複用時再考慮包。三者沒有由低到高的等級關係。

![缺少方法時選擇技能，缺少執行能力時考慮擴充功能，需要分發時再使用包。](/images/diagrams/skill-extension-package.svg)

*圖解：先確認真實需求，再決定是否需要程式碼能力和分發。*

**繼續閱讀：** [技能](/zh-TW/reference/glossary#技能) · [擴充功能](/zh-TW/reference/glossary#擴充功能) · [包](/zh-TW/reference/glossary#包)

## 技能和 MCP 應該怎麼選？ {#skill-vs-mcp}

**短答：先判斷你缺的是“做事方法”，還是一個需要穩定呼叫的外部工具介面。**

固定流程、檢查標準和參考資料優先寫成技能；已有 CLI 能清楚完成的工作，可以先讓 Pi 讀取幫助並呼叫 CLI。Pi 核心當前不內建 MCP；只有確實需要結構化暴露外部能力、並願意承擔工具說明、認證和維護成本時，再透過擴充功能或包接入 MCP。

**繼續閱讀：** [技能](/zh-TW/reference/glossary#技能) · [Tool / Tool Call](/zh-TW/reference/glossary#tool-tool-call) · [技能、擴充功能與包](/zh-TW/guide/skills-extensions-packages)

## 擴充功能是不是裝得越多越好？ {#more-extensions-better}

**短答：不是。數量增加會同時增加來源、權限、相容性和排查成本。**

擴充功能可以註冊工具、改變提示或攔截執行事件，多個擴充一起啟用後，很難判斷結果究竟由哪一個造成。先保持最小設定，出現真實需求後一次只加入一個，並分別記錄啟用前、啟用後和停用恢復的現象。

**繼續閱讀：** [擴充功能](/zh-TW/reference/glossary#擴充功能) · [外掛程式推薦與選擇方法](/zh-TW/plugins/) · [第一個擴充功能](/zh-TW/guide/first-extension)

## Pi 安裝第三方外掛程式安全嗎？ {#are-third-party-packages-safe}

**短答：不能預設安全；“能安裝”只說明格式相容，不代表來源、程式碼和權限已經透過審查。**

擴充功能以當前使用者權限執行並可執行任意程式碼，技能也可能引導 Agent 執行指令碼或產生副作用。安裝前檢查作者、倉庫、實際包含資源、依賴和權限；處理重要檔案時使用最小權限、備份或隔離環境，並在安裝後做一次可逆的小範圍驗證。

**繼續閱讀：** [包](/zh-TW/reference/glossary#包) · [權限、隔離與驗收](/zh-TW/guide/safety) · [Pi 包安全說明](https://pi.dev/docs/latest/packages)

## 專案信賴是不是沙箱？ {#is-project-trust-a-sandbox}

**短答：不是。專案信賴只控制是否載入專案級設定、資源、包和擴充功能。**

一旦開始在目錄中工作，Pi 的內建工具和已載入擴充功能仍以當前使用者權限執行；`AGENTS.md`、`CLAUDE.md` 等上下文檔案也有單獨的載入規則。真正隔離不可信專案，需要容器、虛擬機器、受限帳戶或其他作業系統級邊界，不能只依賴“拒絕信賴”。

![專案信賴只決定是否載入專案資源，Pi 的檔案、命令和網路能力仍由帳戶、容器或虛擬機器限制。](/images/diagrams/project-trust-boundary.svg)

*圖解：Trust 管“是否載入”，隔離環境管“能夠做什麼”。*

**繼續閱讀：** [Pi Security](https://pi.dev/docs/latest/security) · [權限、隔離與驗收](/zh-TW/guide/safety)

## 還沒有找到答案？

先用站內搜尋輸入中英文關鍵詞，例如“上下文 / 上下文”“壓縮 / 壓縮”“子代理 / 子代理”。如果問題需要完整操作步驟，請回到[藍皮書主線](/zh-TW/guide/)；如果它來自真實使用且本頁沒有覆蓋，可以在 [GitHub Issues](https://github.com/xiaomoBoy/pi-bluebook/issues) 中說明所用版本、操作位置、預期結果和實際現象。
