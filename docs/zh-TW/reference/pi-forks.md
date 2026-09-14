---
title: 不只 Pi：OMP 與 Selesai Code 怎麼選
description: 認識 Pi 的兩條活躍分支，對比內建能力、工作方式、設定邊界和試用路徑。
prev:
  text: 參考手冊
  link: /zh-TW/reference/
next:
  text: 技能、擴充功能與包
  link: /zh-TW/guide/skills-extensions-packages
---

<span class="library-status">AGENT ROUTES · Pi 家族的不同選擇</span>

# 不只 Pi：OMP 與 Selesai Code 怎麼選

如果你已經能用 Pi 完成一次任務，下一步未必是繼續給 Pi 裝外掛程式。Pi 的兩個分支專案——OMP（Oh My Pi）和 Selesai Code——保留了終端機 Coding Agent 的基本形態，卻對“應該內建多少能力”給出了不同答案。這一頁幫你判斷哪條路線適合當前任務；本書的 14 課實作仍以原版 Pi 為準，下面的命令、介面和設定不能直接套回 Pi。

本文核驗於 **2026 年 9 月 14 日**，依據 [Pi 官方文件](https://pi.dev/docs/latest/usage)、[OMP 專案說明](https://github.com/can1357/oh-my-pi)和 [Selesai 專案說明](https://github.com/SelesaiInTech/selesai-code)。功能與安裝方式變化很快，實際試用時以各專案當時的文件和終端機幫助為準。以下按使用場景給出個人推薦，連結均指向專案官方資料，不代表專案方背書。

## 先看關係：它們不是三個模型

本頁說的“原版 Pi”是你透過 `pi` 命令啟動的 **Pi Coding Agent**，即本書實際教你安裝的官方終端機應用；它不是供開發者呼叫的單獨 `pi-agent-core` 包。[Pi 與 Pi Coding Agent 的區別](/zh-TW/reference/faq#pi-vs-pi-coding-agent)先把這層關係講清楚，再比較下面兩個 fork。

**Pi、OMP、Selesai Code 都是 Agent 工具，不是提供模型額度的訂閱方案。** 模型負責理解和生成，Agent 負責把模型回覆接到本地檔案、命令和工作階段。你在任一工具中能否使用某個模型，取決於該工具當前支援的模型服務商（Provider）、你的登入或 API Key，以及對應帳戶的計費規則；同一個模型名稱也不代表三個工具擁有完全相同的工具和工作流。[模型存取方式與費用邊界](/zh-TW/guide/connect-model#先選模型存取方式-官方-api-與訂閱)單獨講這件事。

- **原版 Pi Coding Agent** 是主線。它預設以少量基礎工具開始，把工作流能力留給 [技能（Skill）、擴充功能（Extension）與包（Package）](/zh-TW/guide/skills-extensions-packages)。[Pi 的設計說明](https://pi.dev/docs/latest/usage#design-principles)明確說，子代理（Subagent）、計劃、待辦等不是必須內建的核心功能。
- **OMP** 的倉庫明確標註自己是 [Pi 的 fork](https://github.com/can1357/oh-my-pi)。它把 LSP 程式碼導航、除錯、結構化編輯、瀏覽器、子代理、程式碼審閱等能力整合到自己的工具介面裡，方向更像“終端機裡帶著一套 IDE 的 Agent”。
- **Selesai Code** 也明確是 [Pi 的 fork](https://selesaiintech.github.io/selesai-code/why-selesai/)。它保留 Pi 的核心互動，同時把子代理、網頁研究、工作階段交接、恢復工具、技能和終端機介面打包釋出，方向更像“一次安裝就有協同工作流”。

它們不是 Pi 的官方升級版，也不是安裝在 Pi 裡面的兩個外掛程式。應該把它們當成**獨立的 Agent 選擇**，分別看各自的命令、設定和更新說明。

<div class="agent-routes-diagram"><img src="/images/diagrams/pi-agent-routes.svg" alt="Pi 底層元件組成官方 Pi Coding Agent，OMP 與 Selesai Code 是從 Pi 發展出的兩個獨立分支"></div>

*圖解：本書安裝的是中間的 Pi Coding Agent；底層庫不需要單獨安裝，右側兩個 fork 也不是裝進 Pi 的外掛程式。手機閱讀時可左右滑動圖片，或[開啟原圖](/images/diagrams/pi-agent-routes.svg)放大檢視。*

## 一眼看懂主要區別

手機閱讀時可左右滑動下表，檢視 OMP 和 Selesai 兩列；後面的三個分節也分別解釋了每條路線。

| 想比較的事 | 原版 Pi | OMP（Oh My Pi） | Selesai Code |
| --- | --- | --- | --- |
| 產品取向 | 核心精簡，按需求自行擴充 | 更多程式碼工具與執行介面直接內建 | 把擴充、技能和協同流程成套提供 |
| 新手起點 | 先學會檔案、命令、工作階段和驗收 | 先弄清工具選擇、權限與程式碼工作流 | 先弄清內建流程何時啟動、何時交接 |
| 多代理 | 可用社群擴充或自己實現，預設不內建 | 自帶子代理和任務協調入口 | 自帶前臺、後台、並行或鏈式子代理分工 |
| 程式碼工作 | 依賴基礎工具和按需擴充 | 重點提供 LSP、除錯、結構化搜尋與編輯 | 保留 Pi 核心工具，提供需先建圖的程式碼上下文擴充 |
| 研究與恢復 | 可透過擴充補充；工作階段樹、fork、壓縮本身已有 | 內建網頁搜尋/讀取、瀏覽器、任務協調與記憶等能力 | 打包網頁研究、公開程式碼搜尋、工作階段交接、撤銷與可選檢查點 |
| 更適合誰 | 想理解 Agent 底層、保持簡單或親手組裝的人 | 經常在程式碼倉庫裡導航、重構、除錯的人 | 希望少挑外掛程式、直接試成套工作流的人 |

這張表比較的是**專案預設提供的產品形態**，不是能力上限。Pi 的擴充生態也能實現許多類似需求；OMP 和 Selesai 的內建專案、預設開關與具體表現則應以各自版本為準。[Pi 設計原則](https://pi.dev/docs/latest/usage#design-principles) · [OMP 功能說明](https://github.com/can1357/oh-my-pi) · [Selesai 功能對照](https://selesaiintech.github.io/selesai-code/why-selesai/)

## 路線一：繼續用原版 Pi

如果你還在練習“讓 Agent 找對目錄、改對檔案、交付可檢查的結果”，我仍推薦先完成原版 Pi 的[第一次任務](/zh-TW/guide/first-task)和[檔案與工作目錄](/zh-TW/guide/files-and-context)。少量基礎工具更容易看清：哪一步是模型判斷，哪一步是工具真正修改了磁碟。需要子代理、網頁研究或特殊 UI 時，再根據任務新增一個經過檢查的擴充。這樣你能知道新增能力解決了什麼問題，也能在出錯時縮小排查範圍。

原版 Pi **不是功能殘缺版**：它已經有模型切換、工作階段儲存、分叉和壓縮、擴充功能與技能等基礎設施。沒有內建的工作流，往往是作者有意留給使用者組合，而不是做不到。[Pi 官方使用說明](https://pi.dev/docs/latest/usage)

## 路線二：OMP，更偏重程式碼工具

OMP 的明顯差異在**程式碼理解與執行介面**。官方 README 展示了 LSP 導航和重新命名、DAP 除錯、結構化搜尋與編輯、瀏覽器操作、子代理面板，以及多模型角色等功能。對經常在大型程式碼倉庫中定位定義、跨檔案重構、追查執行時故障的人，這些入口可能減少自行安裝和拼接工具的工作。[OMP 專案說明](https://github.com/can1357/oh-my-pi)

![OMP 的 GitHub 倉庫首頁，顯示 can1357/oh-my-pi、專案描述與公開檔案清單](/images/pi-forks-omp-github-2026-09-14.png)

*OMP 倉庫頁面快照（2026 年 9 月 14 日）。倉庫名稱和專案入口可據此核對；Star、版本與活動時間會繼續變化。[檢視大圖](/images/pi-forks-omp-github-2026-09-14.png)。*

<!-- 截圖待補：OMP 真實介面，優先展示 LSP/除錯或 Agent Hub；圖註標明版本、所選模型與可見操作，不展示憑據或私人路徑。 -->

代價是學習面更寬：更多工具並不自動讓任務更可靠。你需要看清某次呼叫究竟是讀取、提出修改還是已經寫盤；子代理的分工結果仍要回到原始需求、測試和 diff 檢查。OMP README 中的效能數字是專案方對特定任務和版本的說明，**不能直接推斷你自己的模型、專案或費用也會得到同樣結果**。

OMP 是獨立命令 `omp`。官方目前列出 macOS/Linux 安裝指令碼、Homebrew、Bun 和 Windows PowerShell 路徑；Mac 讀者可先看 [官方安裝段落](https://github.com/can1357/oh-my-pi#install)，再選擇適合自己的方式。OMP 的原生使用者設定通常位於 `~/.omp/agent/`，專案資源位於 `.omp/`，不要把本書的 `.pi/` 步驟原樣複製過去。[OMP 設定說明](https://github.com/can1357/oh-my-pi/blob/main/docs/config-usage.md)

**我會在這些情況推薦 OMP：** 你已經會審查 Agent 改動，經常要用程式碼導航、除錯或並行審閱，並願意學習較多內建工具。若只是第一次讓 Agent 整理檔案，先把 Pi 主線跑通更容易判斷工具是否真的幫上忙。

## 路線三：Selesai Code，更偏重成套工作流

Selesai 的核心選擇是**將一組能力一起維護和釋出**。官方對照頁把子代理分工、網頁研究、公開程式碼搜尋、工作階段訊息與交接、持久記憶、終端機顯示等列為隨產品提供的能力。讀者無需從零挑選許多外掛程式，就能試“研究 → 分工 → 執行 → 檢查 → 交接”的流程。[Selesai 功能對照](https://selesaiintech.github.io/selesai-code/why-selesai/)

![Selesai Code 的 GitHub 倉庫首頁，顯示 SelesaiInTech/selesai-code、專案描述與公開檔案清單](/images/pi-forks-selesai-github-2026-09-14.png)

*Selesai Code 倉庫頁面快照（2026 年 9 月 14 日）。倉庫名稱和專案入口可據此核對；Star、版本與活動時間會繼續變化。[檢視大圖](/images/pi-forks-selesai-github-2026-09-14.png)。*

<!-- 截圖待補：Selesai 真實介面，優先展示子代理分工、網頁研究或交接；圖註標明版本與任務狀態，不展示憑據或私人路徑。 -->

它與 OMP 的著重點不同：Selesai 更強調一套協調好的擴充與技能，以及長工作階段的連續性。比如 `/handoff-new` 用於生成可編輯的交接提示，`/undo` 用於撤銷本輪可追蹤的 `edit`、`write` 改動；它會標記可能修改檔案的 Bash 命令，但**不會自動撤銷命令造成的效果**。官方也把 git-backed rewind checkpoints 標為可選能力，不應寫成預設開啟。[Selesai 撤銷邊界](https://selesaiintech.github.io/selesai-code/capabilities/continuity/undo/) · [功能目錄](https://selesaiintech.github.io/selesai-code/capabilities/)

Selesai 的釋出包是 `@selesai/code`，啟動命令是 `selesai`。官方推薦 npm 安裝，使用者級狀態在 `~/.selesai/agent/`，專案資源在 `.selesai/`。它支援自己的模型服務商設定，也提供可選的 token.in 模型接入；**使用 Selesai 不要求購買 token.in**，現有模型憑據是否適用仍應逐項核對。[官方入門說明](https://selesaiintech.github.io/selesai-code/get-started/) · [專案 README](https://github.com/SelesaiInTech/selesai-code)

**我會在這些情況推薦 Selesai：** 你已經知道怎樣給任務設停止條件和驗收標準，但不想手動組合許多擴充，想直接試多代理、研究和交接串成的工作流。任務簡單時，也應只啟用當前需要的能力，避免把分工本身當作成果。

## 怎麼選，才不會把三個工具都裝成負擔

1. **先確定任務。** 入門檔案任務與理解 Agent Loop，選 Pi；跨檔案程式碼導航、重構或除錯，試 OMP；多階段研究、分工和長工作階段交接，試 Selesai。
2. **一次只試一個新工具。** 用一個不含私人材料的練習目錄，在相同模型和相近任務下比較，避免把模型品質差異誤判成 Agent 差異。
3. **只比較能看見的結果。** 記錄工具實際讀寫了什麼、有沒有完成要求、用了多少呼叫或額度、出了錯能否恢復。介面看起來更熱鬧，不等於結果更準確。
4. **把費用與權限單獨檢查。** 三者都可能執行本地命令和讀取檔案；購買模型方案也不會自動給所有 Agent 同樣的登入權限。先核對所選模型服務商與憑據，敏感專案使用隔離環境，並審閱最終 diff。[Pi 安全說明](https://pi.dev/docs/latest/security) · [Selesai 安全邊界](https://github.com/SelesaiInTech/selesai-code#pi-compatible-core)

### 一個可複用的對照任務

在同一份**副本**中，分別讓三個 Agent 完成：“先告訴我這個專案如何執行檢查；只讀取，不改檔案、不執行安裝或測試。列出你實際檢視的檔案和依據。” 先檢查回答有沒有對應真實檔案，再決定是否授權下一步。第二輪才給一個小修復任務，獨立執行測試並比對最終 diff。這個對照只能幫助你判斷當前版本和當前模型下的使用體驗，不是普遍效能排名。

<!-- 截圖待補：若有三款 Agent 執行同一任務的結果截圖，放在此處；每張圖只證明圖中可見結果，不能據此聲稱普遍效能高低。 -->

想繼續理解這些區別從哪裡來，讀[Pi 工作原理](/zh-TW/guide/how-pi-works)和[子代理如何分工](/zh-TW/guide/subagents)；想實際換工具，先開啟 [OMP 官方倉庫](https://github.com/can1357/oh-my-pi)或 [Selesai 官方入門頁](https://selesaiintech.github.io/selesai-code/get-started/)核對當前版本。
