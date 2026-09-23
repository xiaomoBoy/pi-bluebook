---
title: Pi 外掛程式推薦
description: 從小墨同學的 Pi 推文實踐中整理外掛程式、包與配套工具，並按需求、風險和當前可核驗來源給出選擇建議。
prev:
  text: 技能、擴充功能與包
  link: /zh-TW/guide/skills-extensions-packages
next:
  text: 安裝後生命週期管理
  link: /zh-TW/guide/lifecycle-management
---

<span class="library-status">PLUGIN GUIDE · 從需求出發，不做全家桶</span>

# Pi 外掛程式推薦

我的推文裡陸續提到過很多 Pi 外掛程式。把它們放在一起以後，最重要的結論並不是“都值得安裝”，而是：**先說清楚自己缺什麼，再只試一個最接近需求的外掛程式。**

這一頁把[推文檔案](/zh-TW/tweets/04-skills-extensions)裡的零散推薦重新整理，並在 2026 年 9 月 23 日重新核對專案來源、安裝入口和主要風險。Pi 的包（Package）目錄變化很快，因此這裡給出的是帶核驗日期的選擇地圖，不是永久排名或必裝清單。

::: warning 安裝第三方包前先看原始碼
Pi 包可以在當前使用者權限下執行程式碼。名字裡帶 `safe`、`permission` 或 `sandbox`，也不代表它天然可信。先確認倉庫和維護者，再看原始碼、依賴與權限；來源不明確的舊推薦，本頁不提供安裝命令。
:::

## Level 0：第一次任務保持零外掛程式

如果你還沒有完成[第一次任務](/zh-TW/guide/first-task)，先不要安裝任何第三方包。原版 Pi 已經能讀取、寫入、編輯檔案和執行命令，也能儲存工作階段。第一次成功需要證明的是工作目錄、模型、檔案範圍和驗收流程都正確，不是證明你能裝多少外掛程式。

社群裡“哪些外掛程式必裝”是高頻問題，但沒有一套設定適合所有人。介面套件、Plan Mode、子代理（Subagent）、瀏覽器和權限系統解決的是不同問題；一次裝完整套件會讓報錯、快捷鍵衝突、額外模型呼叫和權限變化難以歸因。

完成零外掛程式任務後，再用下面的選擇表一次只試一個。

## 如果你只想先選一個

| 你的實際需求 | 先看哪個 | 為什麼 | 我的建議 |
| --- | --- | --- | --- |
| 隨時看模型、上下文、Token、費用和 Git 狀態 | [pi-footer](#pi-footer-狀態列) | 資訊集中，最容易立即感受到價值 | **入門首選**；先臨時載入 |
| 想讓終端機輸出、Diff、Mermaid 和狀態顯示更完整 | [pi-cc-extensions](#pi-cc-extensions-終端機體驗包) | 一套覆蓋多個互動細節 | 與其他介面增強外掛程式分開試 |
| 想先做只讀規劃，再允許修改 | [pi-plan-mode](#pi-plan-mode-輕量只讀規劃) | 只增加一個明確工作階段 | 比子代理更適合作為第二個外掛程式 |
| 想在瀏覽器裡標註計劃和程式碼差異 | [Plannotator](#plannotator-視覺化計劃與程式碼審閱) | 把人工回饋落到具體位置 | 功能較重，穩定使用後再裝 |
| 讓 Pi 操作瀏覽器 | [三種瀏覽器方案](#瀏覽器外掛程式只選一種) | 三者連接方式和權限邊界不同 | **只選一種**，先用測試使用者帳戶 |
| 希望危險操作先經過規則判斷或確認 | [權限系統](#permission-system) | 增加 allow、deny、ask 規則 | 不能替代容器或系統沙箱 |
| 想把探索或審閱交給並行 Agent | [子-Agent](#子代理) | 可以隔離上下文並並行處理 | 進階能力；先理解模型與成本 |
| 自動反覆實驗，最佳化一個可量化指標 | [pi-autoresearch](#pi-autoresearch-自動實驗迴圈) | 適合有測試命令和明確分數的任務 | 僅在獨立分支或 worktree 使用 |
| 把圖表、架構圖或互動介面直接渲染出來 | [pi-generative-ui](#pi-generative-ui-生成式介面) | 適合視覺化結果 | 先檢查系統依賴 |
| 用手機遠端接入正在執行的 Pi | [remote-pi](#remote-pi-遠端控制) | 遠端操作方便 | 實驗性選擇，先評估中繼與憑據風險 |

如果你還不知道自己缺什麼，先不要安裝。完成[第一次任務](/zh-TW/guide/first-task)，遇到一個重複出現的具體問題，再回來選。

::: tip 外掛程式已經報錯時，不要繼續疊加安裝
[擴充功能（Extension）載入失敗](/zh-TW/reference/troubleshooting#extension-failed)先檢查載入位置與乾淨基線；多個外掛程式同時異常時，按[外掛程式互相衝突](/zh-TW/reference/troubleshooting#resource-conflict)逐個恢復。診斷階段一次只改變一個變數。
:::

## Level 1：適合先試的介面增強

### pi-footer：狀態列

`pi-footer` 把模型、模型服務商（Provider）、思考等級、上下文佔用、Token、費用和 Git 狀態集中在底部。它最適合“我總想知道當前 Pi 到底在用什麼、還剩多少上下文”的場景。

- 當前核對來源：[wobondar/pi-footer](https://github.com/wobondar/pi-footer)
- 適合：日常狀態觀察、控制成本、及時發現上下文過長。
- 注意：同名專案不止一個，安裝時不要只憑名字搜尋。

先臨時試用：

```bash
pi -e npm:pi-footer
```

確認沒有遮擋輸入區、字型圖示正常，再永久安裝：

```bash
pi install npm:pi-footer
```

### pi-cc-extensions：終端機體驗包

`pi-cc-extensions` 更像一組介面增強：格式化輸出、富文字 Diff、Mermaid、上下文與狀態展示集中在一套包裡。

- 當前核對來源：[minuque/pi-cc-extensions](https://github.com/minuque/pi-cc-extensions)
- 適合：經常閱讀程式碼差異、圖表和較長輸出。
- 注意：它覆蓋範圍較廣。先停用其他 footer、狀態列和輸出美化外掛程式，避免重複渲染或快捷鍵衝突。

```bash
pi -e npm:pi-cc-extensions
```

滿意後再執行：

```bash
pi install npm:pi-cc-extensions
```

## Level 2：按任務選擇

### pi-plan-mode：輕量只讀規劃

`@narumitw/pi-plan-mode` 增加一個只讀 `/plan` 階段，讓 Pi 先探索、澄清並寫出可以實施的計劃，再回到正常模式修改檔案。它適合“改動較大，但暫時不需要瀏覽器審閱介面”的場景。

- 當前核對來源：[narumiruna/pi-extensions · pi-plan-mode](https://github.com/narumiruna/pi-extensions/tree/main/packages/pi-plan-mode)
- 適合：重構、跨檔案修改、需要先確認邊界的任務。
- 注意：Plan Mode 約束的是當前工作階段，不是系統權限隔離；退出規劃階段後仍要檢查實際改動。

先在測試專案單次載入：

```bash
pi -e npm:@narumitw/pi-plan-mode
```

只提交一個規劃任務，確認它沒有修改檔案、計劃能指出目標檔案和驗收方法，再決定是否永久安裝。

### Plannotator：視覺化計劃與程式碼審閱

Plannotator 為 Pi 增加瀏覽器裡的計劃審批、回覆標註和程式碼差異審閱。它適合需要“Agent 先交計劃，人逐項批註後再執行”的較大專案。

- 當前核對來源：[backnotprop/plannotator](https://github.com/backnotprop/plannotator)
- 當前包：[`@plannotator/pi-extension`](https://pi.dev/packages/%40plannotator/pi-extension)
- 適合：較大改動、多人審閱、需要把回饋落到具體段落或程式碼行的任務。
- 注意：它會啟動瀏覽器審閱介面，並引入比純終端機 Plan Mode 更多的操作入口；剛開始學 Pi 時沒有必要先裝。

先臨時試用當前 npm 包：

```bash
pi -e npm:@plannotator/pi-extension
```

確認瀏覽器審閱頁能開啟、回饋能夠返回當前工作階段、退出後沒有留下不需要的後台程序，再永久安裝。

### 瀏覽器外掛程式只選一種

這三種方案不是簡單的“強、中、弱”，而是三條不同路線。不要同時安裝後再比較，否則很難判斷是哪個外掛程式在控制瀏覽器。

| 專案 | 更適合的場景 | 前置條件與邊界 | 當前來源 |
| --- | --- | --- | --- |
| `pi-browser-harness` | 日常網頁操作，希望能力較完整 | 瀏覽器自動化本身能讀取頁面和執行操作；先用測試使用者帳戶與非敏感環境 | [amankumarsingh77/pi-browser-harness](https://github.com/amankumarsingh77/pi-browser-harness) |
| `pi-agent-browser-native` | 想要較輕的原生橋接 | 需要先安裝上游 `agent-browser`，並滿足專案註明的 Pi 版本要求 | [fitchmultz/pi-agent-browser-native](https://github.com/fitchmultz/pi-agent-browser-native) |
| `pi-chrome` | 想連接已有的真實 Chrome | Chrome 擴充需要標籤頁與指令碼等較寬權限；不要先連接常用主帳戶 | [tianrendong/pi-chrome](https://github.com/tianrendong/pi-chrome) |

我的選擇順序：普通網頁任務先看 `pi-browser-harness`；已經在使用 `agent-browser` 時再看 native 橋接；確實需要現有 Chrome 工作階段時才考慮 `pi-chrome`。

安裝前先進入各自倉庫閱讀最新前置條件。驗證時只給一個無敏感資料的頁面任務，例如：“開啟測試頁，讀取標題，不要提交任何表單。”

### pi-generative-ui：生成式介面

`pi-generative-ui` 可以把圖表、架構圖、介面草圖等內容渲染成可互動視窗，適合“文字解釋不如直接畫出來”的任務。

- 當前核對來源：[Michaelliv/pi-generative-ui](https://github.com/Michaelliv/pi-generative-ui)
- 適合：資料圖表、系統架構、互動原型和視覺化說明。
- 注意：macOS、Linux、Windows 的執行依賴不同；尤其 Windows 需要先檢查專案列出的 .NET 與 WebView2 條件。

```bash
pi -e npm:pi-generative-ui
```

### pi-autoresearch：自動實驗迴圈

`pi-autoresearch` 會圍繞一個可量化目標不斷修改、執行測試、記錄結果，再保留更好的實驗。它適合效能、準確率、構建體積等有明確測量方法的問題，不適合“把專案整體做得更好”這種沒有評分標準的目標。

- 當前核對來源：[davebcn87/pi-autoresearch](https://github.com/davebcn87/pi-autoresearch)
- 適合：有固定測試命令、明確指標和可回滾程式碼的實驗。
- 重要邊界：專案本身建議在獨立分支或 worktree、乾淨工作區中執行，並明確提示其完整使用者權限風險。

```bash
pi -e npm:pi-autoresearch
```

先用一個小倉庫做三輪以內的實驗，確認它能留下實驗記錄、不會改動範圍外檔案，再考慮永久安裝。

### pi-extension-doctor：擴充診斷

`pi-extension-doctor` 是按命令觸發的只讀診斷工具，用來發現擴充衝突和過期 API。它不會把“外掛程式有問題”自動變成“已經修好”，但可以幫助縮小排查範圍。

- 當前核對來源：[dmae97/pi-extension-doctor](https://github.com/dmae97/pi-extension-doctor)
- 適合：已安裝多個擴充功能，出現載入錯誤或行為衝突。
- 注意：當前包要求 Node.js 22.19.0 或更高版本；先核對本機版本和專案最新說明。

```bash
pi -e npm:pi-extension-doctor
```

### remote-pi：遠端控制

`remote-pi` 讓手機或其他裝置遠端連接 Pi，適合檢視長任務或在離開電腦時繼續操作。

- 當前核對來源：[jacobaraujo7/remote_pi](https://github.com/jacobaraujo7/remote_pi)
- 適合：已經理解工作階段、權限和遠端存取風險的使用者。
- 注意：遠端方案可能經過外部網路或中繼服務。先讀清資料流、認證方式和倉庫安全說明，不要在含有生產憑據的工作階段裡直接試。

```bash
pi -e npm:remote-pi
```

官方 SSH 擴充功能、`pi-mobile`、Pi Web、`tmux + Tailscale` 也在推文裡出現過，但它們分別屬於官方示例、客戶端或遠端工作流，不應和普通包混成一個“外掛程式榜單”。

## Level 3：權限系統與子代理最後再裝

<a id="permission-system"></a>

### @gotgenes/pi-permission-system：權限規則

`@gotgenes/pi-permission-system` 可以為工具、Shell、MCP、技能（Skill）和子代理操作設定 `allow`、`deny`、`ask` 等規則，適合已經知道自己要攔截哪些動作的使用者。

- 當前核對來源：[gotgenes/pi-permission-system](https://github.com/gotgenes/pi-permission-system)
- 當前包：[`@gotgenes/pi-permission-system`](https://pi.dev/packages/%40gotgenes/pi-permission-system)
- 適合：為穩定工作流增加可複查的確認和拒絕規則。
- 重要邊界：權限外掛程式本身也在 Pi 程序中執行，不能成為作業系統安全邊界，也不能替代獨立帳戶、容器或虛擬機器。

如果只是擔心第一次任務誤改檔案，先使用空練習目錄、Git 和人工驗收。只有能寫出一條明確規則和對應測試時，再臨時載入權限系統；不要因為包名裡有 `permission` 就直接信賴。

<a id="子代理"></a>

### 子代理：最後再裝

子代理可以把探索、實現或審閱放進獨立上下文，也可以並行執行任務。社群裡存在多個名稱相近但介面、排程方式和持久化能力不同的實現；它們還會產生額外模型呼叫，可能使用與你主工作階段不同的預設模型。

- 一個當前仍活躍的方案：[tintinweb/pi-subagents](https://github.com/tintinweb/pi-subagents)
- 適合：可以獨立描述、獨立驗收、並行處理確實能縮短時間的子任務。
- 不適合：第一次任務、範圍模糊的“把整個專案做好”、尚未理解模型費用與工作階段上下文時。

安裝任何子代理前，必須先確認四件事：它預設呼叫哪個模型服務商和模型；是否允許後台執行；子任務能使用哪些工具；失敗或中止後怎樣找到實際產物。藍皮書會在[子代理如何分工](/zh-TW/guide/subagents)繼續講職責拆分，而不是在本頁給出一個無條件的“必裝”答案。

## 推文提過，但暫不提供安裝命令

以下名字在歷史推文中出現過：

- `safe-coder`
- `pi-permission-gate`
- `pi-protected-paths`
- `pi-sandbox`
- `pi-permission-modes`
- `pi-browser-cdp-extension`

它們表達的需求仍然重要：限制危險命令、保護敏感路徑、隔離執行環境、控制瀏覽器。但本輪核對沒有把每個名字唯一對應到一個仍可確認的當前來源。這裡保留檢索線索，不依據舊推文直接給出安裝命令。

如果目標是安全，先使用系統帳戶權限、獨立測試目錄、Git 分支或 worktree、容器，以及 Pi 自帶的專案信賴（Project Trust）和資源停用引數。第三方“安全外掛程式”只能作為額外一層，不能替代這些邊界。

## 這些是技能或獨立工具，不是外掛程式

推文裡還推薦過 `browser-tools`、`brave-search`、`youtube-transcript`、`gmcli`、`gdcli`、`transcribe` 等技能。技能主要提供工作說明和配套資源；它可能呼叫工具，但不等同於在 Pi 程序中執行的擴充功能。

Pi Desktop、Pi Web、`pi-mobile`、Steel Browser，以及 `tmux + Tailscale + Pi` 則是客戶端、瀏覽器服務或組合工作流。它們有價值，只是不應該用同一套“安裝外掛程式”的方法管理。先讀[技能、擴充功能與包](/zh-TW/guide/skills-extensions-packages)，再決定自己真正需要哪一類能力。

## 推文提及專案總表

為了不讓原始記錄裡的名字散落丟失，下面按主題建立一個檢索索引。**“已收錄”只表示推文提到過，不代表本頁已經確認其當前安裝來源。**

| 主題 | 推文裡出現的專案 | 本頁處理方式 |
| --- | --- | --- |
| 介面與上下文觀察 | `pi-footer`、`pi-cc-extensions`、`pi-generative-ui`、`pi-context-view` | 前三個已有當前來源；`pi-context-view` 留待複核 |
| 瀏覽器與網頁 | `pi-browser-harness`、`pi-agent-browser-native`、`pi-chrome`、`pi-browser-cdp-extension`、`pi-web-access` | 三個瀏覽器擴充功能已分路線整理；後兩個暫作歷史線索 |
| 規劃、子代理與工作流 | `pi-plan-mode`、`pi-subagents`、Plannotator、`pi-autoresearch`、`pi-extension-doctor` | Plan Mode 與 Plannotator 已分輕重路線；子代理只給進階候選和安裝前檢查 |
| 遠端控制 | `remote-pi`、`pi-telegram`、Pi Web、`pi-mobile`、官方 SSH 擴充功能 | 只把 `remote-pi` 作為實驗性包；其餘按客戶端或遠端方案另行整理 |
| 上下文壓縮 | `pi-smart-compact`、`pi-context`、`pi-press`、Hypa | 保留在[上下文推文](/zh-TW/tweets/03-sessions-context)中，之後單開橫向實測 |
| 長期記憶 | `pi-memory`、`pi-hermes-memory`、`pi-honcho`、`pi-hindsight` | 屬於高影響能力，暫不依據功能描述直接推薦安裝 |
| 安全與權限 | `@gotgenes/pi-permission-system`、`safe-coder`、`pi-permission-gate`、`pi-protected-paths`、`pi-sandbox`、`pi-permission-modes` | 只確認前者當前來源；其餘名字繼續作為歷史線索，不依據舊推文安裝 |
| 有趣與專業軟體 | `pi-arcade`、`pi-unity` | 保留為生態案例，不列入初學者首裝清單 |

這張表也說明了為什麼不能直接做“Top 20 外掛程式”：長期記憶、遠端控制、瀏覽器和權限外掛程式都會顯著擴大資料與執行邊界，它們需要獨立的實測和威脅檢查。

## 安裝與驗收：固定走這五步

1. **確認來源**：開啟倉庫，核對維護者、最近更新、README、許可證、依賴和安裝字串。
2. **先臨時載入**：支援 npm 包時，優先用 `pi -e npm:包名`，不要一上來永久安裝。
3. **只做一個測試**：在空目錄或測試專案裡給出單一、可觀察的任務，不連接生產使用者帳戶。
4. **檢查副作用**：確認新增檔案、網路連接、瀏覽器權限、快捷鍵和介面沒有超出預期。
5. **再決定保留**：有持續價值才 `pi install`；不需要時用同一來源字串移除。

常用管理命令：

```bash
pi list
pi install npm:pi-footer
pi remove npm:pi-footer
```

安裝、更新、停用與刪除本地資料的完整邊界，見[安裝後生命週期管理](/zh-TW/guide/lifecycle-management)。包的官方規則與安全提示以 [Pi 包文件](https://pi.dev/docs/latest/packages)為準。

## 我會怎樣繼續維護這份清單

專案是否仍在維護、安裝字串和依賴都可能變化。本頁當前來源最後核驗於 **2026 年 9 月 23 日**。每次更新時，我會分別記錄：

- **推文實踐判斷**：當時為什麼推薦、解決了什麼問題。
- **當前來源核驗**：倉庫是否唯一、安裝方式是否仍有效、最近是否維護。
- **藍皮書建議**：今天更適合誰、應當怎樣試、什麼情況下不要裝。

這樣，推文保留真實時間線，推薦頁則負責給出當前可執行的選擇。
