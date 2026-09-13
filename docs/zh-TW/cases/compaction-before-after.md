---
title: CASE 02 · 壓縮前後對照
description: 在同一條工作階段中手動壓縮，對照當前上下文、磁碟檢查點與可選快取資料。
prev: { text: CASE 01 · 會議記錄, link: /zh-TW/cases/meeting-notes }
next: { text: CASE 03 · 第一個技能, link: /zh-TW/cases/first-skill }
---

<span class="library-status">CASE 02 · 模組三 · 可練習</span>

# 壓縮前後對照

## 你會得到什麼

在同一條 Pi 工作階段（Session）中留下三份記錄：壓縮前回答、壓縮後的記憶回答、重新讀取檢查點後的回答。實驗不預設“壓縮後一定忘記”，而是讓你用實際差異理解：工作階段、當前上下文（Context）、磁碟檔案和提示快取是不同證據。

::: warning 費用提醒
本案例會呼叫模型並手動執行一次 `/compact`。壓縮本身也需要模型生成摘要，可能消耗方案額度或產生 API 費用。先完成[登入課的費用檢查](/zh-TW/guide/connect-model)，不確定時不要為了做實驗繼續。
:::

## 固定材料

- <a href="/examples-tw/compaction/brief.md" download>下載實驗簡報 brief.md</a>
- <a href="/examples-tw/compaction/checkpoint.md" download>下載檢查點 checkpoint.md</a>
- <a href="/examples-tw/compaction/settings.json" download>下載實驗專用 settings.json</a>

前兩份材料只包含固定教學文字，不含指令碼、憑據和私人資料。`settings.json` 只把本實驗目錄的 `keepRecentTokens` 降到 `200`，讓短工作階段也有可壓縮的較早內容；不要把它複製到日常專案或使用者級設定。

## 1. 建立獨立實驗目錄

macOS 在普通終端機中執行：

```bash
cd ~/Downloads/pi-practice
mkdir -p compaction-lab/.pi compaction-lab/results
curl -fL https://pi.xiaomovps.com/examples-tw/compaction/brief.md \
  -o compaction-lab/brief.md
curl -fL https://pi.xiaomovps.com/examples-tw/compaction/checkpoint.md \
  -o compaction-lab/checkpoint.md
curl -fL https://pi.xiaomovps.com/examples-tw/compaction/settings.json \
  -o compaction-lab/.pi/settings.json
cd compaction-lab
shasum -a 256 brief.md checkpoint.md > input-before.sha256
```

Windows 使用者繼續使用 Git Bash，把第一行換成 `cd ~/pi-practice`，進入實驗目錄後把最後一行換成：

```bash
sha256sum brief.md checkpoint.md > input-before.sha256
```

確認 `pwd` 的末尾是 `compaction-lab`，並親自開啟兩份 Markdown 檔案和 `.pi/settings.json`。內容與本頁說明一致後再繼續；設定檔案多出其他欄位時停止。

## 2. 啟動一條幹淨的工作階段

仍在普通終端機中執行：

```bash
pi --name "壓縮前後對照" --no-extensions --no-skills --no-context-files
```

進入 Pi 後輸入 `/session`，確認工作階段名稱是“壓縮前後對照”。記下介面顯示的工作階段 ID；它只用於稍後確認仍在同一條工作階段中，不需要釋出或上傳工作階段檔案。

如果首次進入該目錄時出現專案信賴（Project Trust）提示，只在已經核對三份下載材料後信賴這個隔離練習目錄。專案信賴允許 Pi 採用目錄內設定，不會把它變成沙箱；目錄或檔案與本頁不一致時退出，不要確認。

## 3. 留出可壓縮的較早內容

先傳送第一輪觀察：

```text
讀取 brief.md 和 checkpoint.md，逐項核對六項固定資訊是否一致。
只在回覆中列出六項資訊和核對結論；不要寫檔案，不要存取網路。
```

等它完成後，再傳送第二輪觀察：

```text
不要重新讀取檔案。只根據當前上下文說明：
1. 為什麼“Session 已儲存”不等於“當前 Context 永遠包含全部原文”；
2. 為什麼 checkpoint.md 能作為恢復依據；
3. 本實驗唯一禁止動作是什麼。
每項最多兩句話，不要寫檔案，不要存取網路。
```

兩輪都完成後再繼續。實驗專用的低閾值會讓較早一輪進入壓縮範圍；如果跳過這一步，短工作階段仍可能沒有可壓縮內容。

## 4. 寫下壓縮前記錄

把下面整段交給 Pi：

```text
不要重新讀取檔案。只根據當前上下文，把六項資訊逐行寫入
results/before.md，格式必須與 checkpoint.md 的清單一致。
最後只回複寫入路徑；不知道的內容寫“未知”，不要猜測，不要存取網路。
```

執行過程只應寫入 `results/before.md`。出現讀取、網路存取、其他目錄或輸入修改時按 `Esc` 停止。

## 5. 手動壓縮，再做一次記憶回答

先開啟 `/session`，確認工作階段 ID 與第 2 步相同。然後在 Pi 編輯區輸入：

```text
/compact
```

等待壓縮完成，直到 Pi 再次回到可輸入狀態。不要連續執行第二次 `/compact`。

看到壓縮完成提示後，接著傳送：

```text
不要讀取任何檔案，也不要存取網路。
只根據你當前收到的上下文，把實驗的六項固定資訊寫入
results/after-memory.md，格式與壓縮前相同。
無法確認的專案寫“未知”，不要猜測。最後只回複寫入路徑。
```

這一輪如果出現 `read`、`grep`、`find` 或其他讀取動作，立即停止：那會讓“當前上下文是否保留資訊”的觀察失效。

## 6. 從磁碟檢查點恢復

無論上一份記錄是否完整，都繼續傳送：

```text
現在讀取 checkpoint.md，以檔案為準，把六項固定資訊寫入
results/after-file.md。格式與 checkpoint.md 的清單一致。
如果它和 after-memory.md 不同，在回覆中指出哪些欄位不同；不要修改任何已有記錄。
```

這一步的目的不是讓 Agent “承認忘記”，而是驗證磁碟檢查點能否重新提供確定資訊。

## 關鍵現象

| 觀察物件 | 你要檢查什麼 | 它能證明什麼 |
| --- | --- | --- |
| 工作階段 | `/session` 前後的 ID 是否相同 | 對話仍屬於同一條已儲存工作階段 |
| 當前上下文 | `after-memory.md` 與壓縮前記錄是否一致 | 摘要和近期訊息為這一輪保留了哪些資訊 |
| 磁碟檔案 | 兩份輸入的指紋是否不變；`after-file.md` 是否完整 | 檔案可獨立儲存並重新提供約束 |
| 提示快取 | 模型服務商（Provider）是否顯示快取資料、壓縮前後是否變化 | 僅記錄當前服務的快取現象，不代表記憶或任務品質 |

壓縮後六項全部保留是有效結果；出現“未知”或差異也是有效結果。實驗失敗只有兩類：沒有留下可比較記錄，或在記憶回答階段偷偷重新讀取了檔案。

## 獨立驗收

先退出 Pi。macOS 在普通終端機執行：

```bash
cd ~/Downloads/pi-practice/compaction-lab
shasum -a 256 -c input-before.sha256
test -f results/before.md
test -f results/after-memory.md
test -f results/after-file.md
grep -F '專案代號：北斗紙舟' results/after-file.md
grep -F '固定順序：藍色 → 金色 → 灰色' results/after-file.md
grep -F '驗收短語：紙舟靠岸' results/after-file.md
diff -u results/before.md results/after-memory.md || true
```

Windows Git Bash 把 `shasum -a 256 -c` 換成 `sha256sum -c`，其餘命令不變。

兩份輸入都顯示 `OK`、三份記錄都存在，而且 `after-file.md` 找到三條固定資訊，說明檔案恢復鏈路透過。最後一條 `diff` 沒有輸出，表示兩份記錄相同；出現差異時保留差異，它就是本次實驗結果，不要把它改成預期答案。

再執行一次 Pi 並用 `pi -r` 找到“壓縮前後對照”，開啟 `/session` 核對原工作階段 ID。工作階段能夠重新開啟，只證明歷史被儲存；仍要另外檢查磁碟檔案和壓縮後的回答。

## 失敗恢復

- `/compact` 顯示 `Nothing to compact (session too small)`：確認當前目錄末尾是 `compaction-lab`、`.pi/settings.json` 內容正確，而且第 3、4 步均已完成；修正後新增工作階段重做，不在原工作階段連續試。
- `/compact` 發生其他錯誤或一直沒有回到輸入區：按 `Esc` 停止，保留錯誤文字和已有檔案，不連續重試。
- 記憶回答階段讀取了檔案：保留該記錄並標註“本輪無效”，新增工作階段重新實驗，不覆蓋舊檔案。
- 找不到原工作階段：不要宣稱工作階段已恢復；新增工作階段，從 `checkpoint.md` 和已有記錄繼續核對。
- 輸入指紋變化：停止比較，保留現場；重新下載到新的實驗目錄，不覆蓋已經改變的材料。
- `after-file.md` 仍缺欄位：開啟 `checkpoint.md` 人工核對，記錄遺漏；不要讓 Agent 反覆改到測試透過。
- 實驗結束後不想保留低閾值：退出 Pi，刪除整個 `compaction-lab`；或只刪除其中的 `.pi/settings.json`。這不會改使用者級設定。

## 這個案例對應哪兩條判斷

- [第 6 條：工作階段可儲存，不等於模型始終記得全部內容](/zh-TW/guide/lasting-principles#session-and-context)
- [第 7 條：壓縮與提示快取必須分開理解](/zh-TW/guide/lasting-principles#compaction-and-cache)

官方機制依據：[Pi 壓縮（Compaction）](https://pi.dev/docs/latest/compaction) · [Pi 工作階段](https://pi.dev/docs/latest/sessions)
