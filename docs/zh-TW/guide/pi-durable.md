---
title: Pi Durable：讓 Agent 在中斷後繼續工作
description: 從官方旅行規劃演示理解 Pi Durable 的持久化任務、崩潰恢復與併發工作階段，以及它和 Pi、tmux、進度檔案的區別。
prev:
  text: 長時間任務與 VPS
  link: /zh-TW/guide/vps-and-long-running
next:
  text: Pi Durable 官方完整譯文
  link: /zh-TW/translations/pi-durable
---

<span class="library-status">選學專篇 · PI DURABLE</span>

# Pi Durable：讓 Agent 在中斷後繼續工作

假設一個 Agent 正在安排旅行：天氣查完了，博物館查完了，火車時刻還在查詢，程序卻突然退出。重新開啟以後，它能不能保留前兩項結果，只恢復剩下的工作？

2026 年 10 月 1 日，Earendil 隨 Pi 1.0 釋出了 Pi Durable，嘗試解決的就是這類問題。**它是供開發者構建長期執行 Agent 應用的實驗性框架。** 你平時在終端機裡使用的 Pi 程式設計助手繼續存在；升級 Pi，並不會自動把已有工作階段變成 Durable 應用。

讀完本篇，你應該能區分不同的恢復方式，理解一次任務恢復時發生了什麼，並知道如何沿官方旅行規劃示例繼續探索。

::: info 核驗範圍 · 2026-10-02
本篇依據釋出文章及 Pi `v1.0.0` 的 README、示例原始碼整理。下面的操作是官方示例的復現路徑，本篇未把它標為藍皮書實測案例。Pi Durable 的 API 仍可能變化；閱讀概念不需要安裝它。
:::

## 儲存工作階段、保持程序、恢復任務，分別解決什麼問題？

藍皮書已經介紹過 [tmux 與 VPS](/zh-TW/guide/vps-and-long-running)，也做過[透過進度檔案恢復任務](/zh-TW/cases/checkpoint-recovery)的練習。它們各有用處：

| 方式 | 留下什麼 | 中斷後怎樣繼續 |
| --- | --- | --- |
| Pi 工作階段記錄與 `progress.md` | 對話，以及由任務明確寫下的業務進度 | 人或新工作階段讀取記錄，核對檔案，再決定下一步 |
| tmux | 仍在執行的終端機工作階段和其中的程序 | SSH 斷開後重新連接；程序本身已經退出，則需要另行處理 |
| Pi Durable | 對話、任務檢查點、排隊訊息和應用狀態 | 新程序開啟同一份持久化儲存，恢復未完成任務 |

Durable 處理的是任務內部的恢復邏輯。讓退出的服務重新啟動，仍是應用或程序管理器的職責。它也不能替代你檢查“最終檔案是否正確”這件事。

## 先認識四個部件

**工作階段（Conversation）**儲存人與 Agent 的互動記錄，以及這段對話使用的模型、工具和指令。應用可以同時執行多個工作階段，或從已有歷史中分叉。

**任務（Task）**是執行中的工作單元。一次模型請求、一次工具呼叫、一次壓縮，都可以成為任務。任務在推進時儲存檢查點，讓新程序知道哪些已經完成，哪些還在等待。

**儲存（Storage）**承接這些狀態。框架提供記憶體、SQLite 和 JSONL 後端。要跨程序恢復，需要保留下來的 SQLite、JSONL 或其他持久化後端；記憶體後端會隨程序消失。同一份儲存在同一時刻由一個程序持有，多個客戶端連接到這個程序。

**執行環境（Execution Environment）**決定工具實際在哪裡工作。代理框架（Agent Harness）與工具可以位於不同機器上。自帶的 Node 執行環境能存取本地檔案，它本身並不等於一個隔離沙箱。

這些概念都圍繞同一個問題：除了聊天內容，還要儲存哪些狀態，才能讓工作真正接著進行？

## “接著做”並不總是從那一行繼續

框架恢復的是任務狀態，不是凍結並恢復整個作業系統程序。

| 中斷的工作 | Pi Durable 的處理 |
| --- | --- |
| 正在生成的模型回覆 | 重新發出請求；原來的部分回答留在記錄中，標為已中止 |
| 宣告 `replay: "safe"` 的工具 | 可以重新執行，例如只讀查詢 |
| 沒有宣告可安全重跑的工具 | 把中斷情況和已儲存的輸出告訴模型，由它決定下一步 |
| 客戶端重試同一條輸入 | 用相同 `requestId` 找回原提交，避免重複提交 |

這裡尤其要區分“輸入不重複提交”和“任何外部操作只執行一次”。資料庫之外的付款、發訊息、部署等動作，仍需應用設計冪等性或補償邏輯。原文的付款程式碼也明確使用了冪等鍵和退款處理。

長對話同樣有邊界：舊訊息可以繼續留在儲存裡，當前請求仍受模型上下文視窗限制。Durable 用後台壓縮來延續對話；這不意味著模型每次都能看到全部歷史。

## 先看旅行規劃演示

[完整譯文中的原始錄屏](/zh-TW/translations/pi-durable#試試看)展示了一個旅行規劃 Agent。主代理（Main Agent）把調研交給子代理（Subagent），子代理同時執行天氣、博物館和火車三項搜尋；與此同時，主代理還能繼續與使用者聊天。

官方示例裡，三項搜尋分別等待約 6 秒、10 秒和 30 秒，再返回預先準備的資料。**它演示的是並行任務與恢復，不是實時天氣或票務查詢。** 模型呼叫仍需要可用的模型憑據，也可能產生用量費用。

錄屏裡，天氣和博物館結果已經返回，火車搜尋尚未完成時，程序退出。重新開啟原工作階段後，已完成結果仍在，允許安全重跑的火車搜尋再次執行。報告完成後，透過訊息交給主代理，由它整理成計劃。

這裡的子代理是應用透過工具與獨立工作階段構建出來的。Durable 提供構建機制，沒有替所有應用預設一種子代理產品形態。

## 想動手時，從官方示例開始

以下命令按 **Pi `v1.0.0`** 固定，避免後續 `main` 的變化讓步驟失去對應關係。需要 Git、Node.js **22.19.0 或更高版本**、npm，以及已能在 Pi 中正常使用的模型。

先在普通終端機檢查 Node：

```bash
node --version
```

然後開啟日常使用的 Pi，在 Pi 輸入框中用 `/login` 完成認證，並選好一個可用的預設模型。確認普通對話能夠返回回答後退出。旅行演示覆用 Pi 的憑據與設定，自身沒有 `/login`。

### 1. 在獨立目錄取得原始碼

在你存放實驗專案的目錄中，用普通終端機執行下列命令。`pi-durable-demo` 是本次新增的原始碼目錄；如果同名目錄已存在，換一個新名字。

```bash
git clone --branch v1.0.0 --depth 1 https://github.com/earendil-works/pi.git pi-durable-demo
cd pi-durable-demo
npm install
npm run build
```

預期結果是依賴安裝和構建都成功結束。若構建失敗，先核對 Node 版本與報錯，不跳過構建繼續啟動。

### 2. 啟動旅行規劃器

仍在剛才的 **Pi 原始碼倉庫根目錄**執行：

```bash
node packages/coding-agent/src/experimental/vacation/main.ts
```

看到演示終端機介面後，傳送：

> 為兩個人安排一個維也納週末，把天氣、博物館和火車的調研交給子代理。

先讓它完整執行一次，熟悉 `/agents` 切換主工作階段與子代理、`/tasks` 檢視任務圖的入口。看到報告確實送達主工作階段，再嘗試下一步。

### 3. 觀察中斷後的恢復

重新啟動一段新的演示工作階段並提出同樣的請求。觀察任務清單，在天氣和博物館已經完成、火車仍在執行時，按官方演示說明使用 `Ctrl+C` 退出。模型響應速度不同，三個任務的開始時間也可能不同，以實際任務狀態為準。

然後在**同一工作目錄**執行：

```bash
node packages/coding-agent/src/experimental/vacation/main.ts --continue
```

`--continue` 選擇當前目錄最近的演示工作階段。資料儲存在：

```text
~/.pi/agent/experimental/vacation-sessions/<cwd-hash>/<session>/session.sqlite
```

上面的尖括號表示程式生成的目錄，不需要你手工建立。恢復前不要刪除資料檔案，也不要換工作目錄，否則可能開啟另一份工作階段。

### 4. 用狀態與結果驗收

本次觀察應能回答以下問題：

- 恢復後，原來的工作階段和已完成搜尋結果是否仍在？
- 天氣、博物館這兩項已完成任務是否沒有重複執行？
- 火車這項未完成且可安全重跑的搜尋，是否重新執行並完成？
- 最終報告是否送達主工作階段，旅行計劃是否引用了這些結果？

僅憑 Agent 說“恢復成功”還不夠，要對照任務狀態與實際報告。若重啟後出現空白工作階段，先檢查是否用了 `--continue`、是否仍在原工作目錄，以及原 SQLite 檔案是否還在。認證報錯則回到普通 Pi 檢查登入與預設模型設定。

## 什麼時候值得繼續學習？

如果你主要是在終端機裡寫程式碼、改文章、完成單次任務，繼續使用 Pi 和已有的工作階段、進度檔案方法即可。

當你要開發一個長期線上的機器人、多使用者共同參與的工作流，或需要讓多段對話和後台任務在重啟後繼續執行的應用時，Pi Durable 才開始顯得有價值。它還支援應用狀態文件、擴充熱替換、多人訂閱同一對話等機制；這些能力需要開發者組合，不等於現成的 Slack 服務或多人聊天網站。

下一步可以讀[官方完整譯文](/zh-TW/translations/pi-durable)，再對照以下固定版本資料。原文中的支付、審批、部署片段用來說明機制，其中的外部服務需要自行實現，不是可以直接複製執行的完整應用。

## 來源與繼續閱讀

- [Earendil：Pi Durable 釋出文章](https://earendil.com/posts/pi-durable/)
- [Pi v1.0.0：Durable README](https://github.com/earendil-works/pi/blob/v1.0.0/packages/durable/README.md)
- [旅行規劃器 README：執行、恢復與工作階段目錄](https://github.com/earendil-works/pi/blob/v1.0.0/packages/coding-agent/src/experimental/vacation/README.md)
- [旅行規劃器原始碼：模擬搜尋與等待時間](https://github.com/earendil-works/pi/blob/v1.0.0/packages/coding-agent/src/experimental/vacation/vacation.ts)
- [Durable 包的執行環境要求](https://github.com/earendil-works/pi/blob/v1.0.0/packages/durable/package.json)
- [三十多個官方示例](https://github.com/earendil-works/pi/tree/v1.0.0/packages/durable/test/examples) · [小型程式設計助手示例](https://github.com/earendil-works/pi/tree/v1.0.0/packages/coding-agent/src/experimental/durable)
