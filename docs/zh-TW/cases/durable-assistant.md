---
title: 選學案例 · 用 Pi Durable Assistant 觀察斷點恢復
description: 不填 API Key，在本機執行基於 Pi Durable 的個人 Agent，於長任務中途模擬程序崩潰，獨立檢查任務是否接著完成、是否重複執行。
prev: { text: CASE 08 · 畢業專案, link: /zh-TW/cases/graduation-project }
next: { text: Pi Durable 入門專篇, link: /zh-TW/guide/pi-durable }
---

<span class="library-status">選學案例 · 可練習</span>

# 用 Pi Durable Assistant 觀察斷點恢復

## 結果

在本機執行一個基於 Pi Durable 的網頁版個人 Agent，讓它執行一個需要等待 10 秒的任務；等待中途強制結束程序。程序被重新拉起後，任務從中斷處接著做完：三條待辦各只新增一次，等待按原截止時間繼續，最終回答照常出現。

::: info 這個案例和 CASE 06 有什麼不同
[CASE 06](/zh-TW/cases/checkpoint-recovery) 用進度檔案手動儲存檢查點，恢復靠新工作階段讀取檔案。本案例的檢查點由 Pi Durable 框架自動儲存：每呼叫一次模型、執行一個工具都會存檔，恢復不需要人寫進度檔案。兩種方法解決的是同一類問題，適用場景不同：日常用 Pi 處理長任務，CASE 06 的方法已經足夠；開發需要長期線上的 Agent 應用時，才值得了解本案例的框架做法。
:::

## 固定材料

- 演示專案：[Pi Durable Assistant v0.1.0](https://github.com/xiaomoBoy/pi-durable-assistant/releases/tag/v0.1.0)，基於 `@earendil-works/pi-durable@1.1.0`，MIT 許可。
- 執行環境：Node.js 22.13 或以上、npm、Git。**不需要 API Key、Docker 或伺服器。**

::: warning 非官方專案
Pi Durable Assistant 是本書作者小墨同學的個人開源專案，不是 Earendil 官方產品。Pi Durable 本身仍處於實驗階段，API 可能變化；本案例固定在上面的版本復現。
:::

## 1. 取得固定版本

在練習目錄中執行：

```bash
mkdir -p ~/Downloads/pi-practice
cd ~/Downloads/pi-practice
git clone --branch v0.1.0 https://github.com/xiaomoBoy/pi-durable-assistant.git
cd pi-durable-assistant
node --version
npm ci
npm run check
```

`node --version` 應顯示 `v22.13` 或更高版本；`npm run check` 結束、回到終端機提示符且沒有報錯，再繼續。

## 2. 用演示模型啟動

```bash
LLM_API=faux npm run dev
```

終端機出現「已啟動：埠 3000」後，用瀏覽器開啟 `http://127.0.0.1:3000`。如果 3000 埠被佔用，改用 `PORT=3001 LLM_API=faux npm run dev`，並開啟對應埠。

啟動服務的終端機要保持執行；後續終端機命令另開一個視窗。練習結束時，回到服務終端機按 `Ctrl+C` 停止。

`faux` 是專案內建的演示劇本：不存取任何真實模型，無論你輸入什麼，都會按固定順序執行「列三條待辦 → 等待 10 秒 → 勾掉三條待辦 → 回答」。它適合觀察恢復機制，**不能證明真實模型的能力**。

`npm run dev` 實際執行的是一個小指令碼：程序退出後 1 秒自動重新啟動，模擬伺服器上 Docker 的自動重啟。**Pi Durable 不會自己復活程序**，它負責的是程序重新啟動以後，從存檔接著做。

![Pi Durable Assistant 網頁介面：左側工作階段清單，中間對話，右側記事本、定時提醒、持久任務和執行狀態](/images/cases/durable-assistant/interface.webp)

先記下右下角「執行狀態」裡的**啟動次數**，後面要用它證明程序確實重啟過。

## 3. 發出任務，等它進入等待

先找到右下角「模擬程序崩潰」按鈕，再點選「新對話」，傳送：

```text
演示一下持久任務
```

幾秒內應依次看到：

- 對話中出現三次 `todo` 工具呼叫，右側「記事本」出現三條待辦；
- 接著出現 `wait_seconds` 工具，顯示「還剩 N 秒」的倒計時；
- 右側「持久任務」中，「呼叫模型」處於等待狀態，下面的「執行工具」正在執行。

![等待中的任務：對話裡的等待工具正在倒計時，右側持久任務顯示呼叫模型在等待、執行工具在執行](/images/cases/durable-assistant/waiting.webp)

截圖來自作者在演示站上使用真實模型的執行，任務內容與 `faux` 劇本不同；介面區域和狀態的含義相同。

## 4. 在等待中途模擬崩潰

倒計時還剩幾秒時，點選右下角「模擬程序崩潰」，並在彈窗中確認。伺服器會直接退出程序，不做任何收尾。如果已經錯過倒計時，新增對話後再發一次任務即可。

頁面頂部應出現「與伺服器斷開，正在重連」。約 1 至 2 秒後頁面自動重連。

![斷線重連：頁面頂部提示與伺服器斷開、正在重連](/images/cases/durable-assistant/reconnect.webp)

## 關鍵現象

| 觀察位置 | 崩潰前 | 重啟後應看到 |
| --- | --- | --- |
| 執行狀態 · 啟動次數 | 記下的數字 | 增加 1，啟動時間也變了 |
| 記事本 · 待辦 | 三條未完成 | 仍是同樣三條，沒有多出重複的待辦；等待結束後全部勾掉 |
| 等待工具 | 倒計時進行中 | 按原來的截止時間繼續倒數，**不是重新從 10 秒開始** |
| 對話末尾 | 還沒有回答 | 出現「演示任務完成。」 |

等待能接上，是因為等待工具第一次執行時，就把「幾點結束」記進了這個任務的備忘（Pi Durable 稱為 memo）。重啟後讀到的仍是同一個時間點，所以程序停掉的那段時間也被算了進去。

## 獨立驗收

不要只看 Agent 說「完成了」。逐項核對：

1. **程序確實重啟過**：啟動次數比崩潰前多 1。只看頁面有沒有重新整理不夠，容器裡程序編號可能始終是同一個數字。
2. **已完成的步驟沒有重做**：對話裡「已新增」的三條待辦各只出現一次。
3. **未完成的步驟接著做完**：等待完成記錄只出現一次「已等待 10 秒」，倒計時沒有重置為 10 秒，之後是三條「已完成」和最終回答。
4. **狀態與記錄一致**：記事本里的勾選狀態，與對話裡的「已完成」記錄逐條對應。

維護者在 2026-10-11 按本頁步驟實際復現：在等待開始約 3 秒後觸發崩潰，重啟後啟動次數從 1 變為 2；三條待辦各新增一次，等待完成記錄出現一次，從發起等待到下一步約相隔 10 秒，最終回答正常出現。

## 選做：兩項進階觀察

**同一次提交不會被收兩次。** 網路卡頓時，前端可能把同一句話傳送兩遍。Pi Durable 允許每次提交帶一個編號，同一個編號只會被接收一次。可以在另一個終端機用 `curl` 驗證（把 `8` 換成你的工作階段編號，也就是瀏覽器位址列中 `#` 後面的數字）：

```bash
curl -s -X POST http://127.0.0.1:3000/api/conversations/8/messages \
  -H 'content-type: application/json' \
  -d '{"text":"演示一下持久任務","requestId":"demo-1"}'
```

執行兩次，兩次返回的 `submissionId` 應完全相同，對話裡也只多出一條使用者訊息。

**定時計劃跨過崩潰。** 開啟右下角「任務中心」，建立一個單次計劃：內容填 `檢查任務狀態`，首次延遲填 `0.25`（即 15 秒），重複間隔填 `0`。建立後立刻模擬崩潰。重啟後計劃仍在，到點只執行一次，狀態變為已完成。維護者復現時，在計劃建立 4 秒後觸發崩潰，結果與此一致。

## 失敗恢復

| 現象 | 處理 |
| --- | --- |
| `npm ci` 報 Node 版本錯誤 | 升級到 Node.js 22.13 或以上，刪除 `node_modules` 後重新執行 |
| 埠被佔用 | 用 `PORT=3001` 換埠啟動，並開啟對應地址 |
| 點崩潰後頁面一直不重連 | 確認是用 `npm run dev` 啟動的；直接執行 `node server.mjs` 時，沒有指令碼把程序拉起來 |
| 「模擬程序崩潰」返回 403 | 生產環境預設停用這個按鈕，本案例只在本機開發模式下練習 |
| 克隆提示目錄已存在 | 換一個新的練習目錄，或保留舊目錄並改名；不要覆蓋舊資料 |
| 想重新開始 | 按 `Ctrl+C` 停止，把專案目錄下的 `data/` 改名備份，再重新啟動；新服務不會顯示舊工作階段和計劃，備份仍可恢復 |

## 這些現象對應 Pi Durable 的哪些機制

| 你在本案例看到的 | Pi Durable 的機制 | 延伸閱讀 |
| --- | --- | --- |
| 重啟後從中斷處繼續 | 每一步自動存檔，重啟後找出未完成的任務 | [Pi Durable 入門專篇](/zh-TW/guide/pi-durable) |
| 等待按原截止時間繼續 | 任務備忘（memo），重放時讀到同一個值 | [官方文章譯文](/zh-TW/translations/pi-durable) |
| 待辦沒有重複新增 | 工具宣告可以安全重放，修改和記錄在同一次提交中完成 | 同上 |
| 記事本和對話記錄一致 | Document：應用狀態與產生它的記錄一起儲存 | 同上 |
| 同一個編號只收一次 | 帶編號的冪等提交 | 同上 |
| 計劃到點只執行一次 | 後台任務與持久化的定時喚醒 | 同上 |

官方的旅行規劃演示從另一個角度展示同一件事：三項並行搜尋中，已經完成的直接複用結果，只有中斷的那一項重新執行。

![原理圖：三項並行搜尋中，天氣和博物館在程序退出前已完成並儲存結果，重啟後只有火車搜尋重新執行](/images/cases/durable-assistant/recovery-diagram.webp)

## 能力邊界

- 演示專案是單使用者的個人專案，不包含多使用者帳戶和細粒度權限。放到公網前，至少需要 HTTPS 和存取密碼。
- 只有宣告為「可以安全重放」的工具，才會在恢復時重新執行；沒有宣告的工具，模型會收到「這次呼叫被打斷了」，由它決定下一步。會寫外部資料的工具，需要自己保證執行兩遍也只生效一次。
- 已經抓取的網頁、已經發出的請求、寫到外部的檔案，不會因為恢復或分叉而撤銷。

不想自己準備伺服器，可以瞭解 Cloudflare 版 [Pi Durable Edge](https://github.com/xiaomoBoy/pi-durable-edge)。它跑在 Workers 和 Durable Objects 上，提供一鍵部署按鈕；目前是實驗版，線上部署和崩潰恢復仍待實測，功能也少於本案例的專案。

## 依據

- [Pi Durable Assistant v0.1.0](https://github.com/xiaomoBoy/pi-durable-assistant/releases/tag/v0.1.0) 與其[快速開始文件](https://github.com/xiaomoBoy/pi-durable-assistant/blob/v0.1.0/docs/GETTING_STARTED.md)
- [Pi Durable v1.1.0 README](https://github.com/earendil-works/pi/blob/v1.1.0/packages/durable/README.md)
- [Earendil：Pi Durable 釋出文章](https://earendil.com/posts/pi-durable/) 及本書[授權譯文](/zh-TW/translations/pi-durable)
