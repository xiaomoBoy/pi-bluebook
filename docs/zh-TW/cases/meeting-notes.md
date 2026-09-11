---
title: CASE 01 · 會議記錄行動清單
description: 從一份虛構會議記錄生成行動清單，並獨立核對輸入與輸出。
prev: { text: 案例庫, link: /zh-TW/cases/ }
next: { text: CASE 02 · 壓縮前後, link: /zh-TW/cases/compaction-before-after }
---

<span class="library-status">CASE 01 · 可練習</span>

# 會議記錄行動清單

## 結果

從三條虛構會議記錄生成 `output/行動清單.md`，原檔案保持不變，三個行動項的負責人、日期和限制逐項對應。

## 固定材料

- <a href="/examples-tw/first-task/meeting-notes.md" download>下載虛構會議記錄</a>
- 操作目錄：獨立的 `pi-practice`

材料應包含小林、小周、小陳三項任務，以及各自的日期和限制。它是無私人資訊的教學文本。

## 1. 準備輸入與指紋

macOS 在普通終端機執行：

```bash
mkdir -p ~/Downloads/pi-practice/input ~/Downloads/pi-practice/output
cd ~/Downloads/pi-practice
curl -fL https://pi.xiaomovps.com/examples/first-task/meeting-notes.md \
  -o input/專案會議記錄.md
shasum -a 256 input/專案會議記錄.md > input-before.sha256
test ! -e output/行動清單.md && echo "PASS: 輸出尚不存在"
```

Windows 使用者使用 Git Bash，把目錄換成 `~/pi-practice`，並把 `shasum -a 256` 換成 `sha256sum`。如果最後沒有出現 `PASS`，換一個新的空練習目錄，不用舊結果繼續。

## 2. 任務原文

在當前練習目錄啟動 `pi`，把下面整段交給它：

```text
讀取 input/專案會議記錄.md，整理成 output/行動清單.md。

每個事項單獨一行，必須保留事項、負責人、截止日期和風險提醒；
不要修改 input 中的原檔案，也不要存取當前練習目錄以外的內容。
完成後列出新增和修改的檔案，並說明我應該怎樣驗收。
```

## 關鍵現象

- 讀取物件只有 `input/專案會議記錄.md`。
- 寫入物件是新檔案 `output/行動清單.md`。
- 如果準備寫入 `input` 或出現練習目錄外路徑，按 `Esc` 停止。

[第 5 課](/zh-TW/guide/first-task)解釋為什麼這段任務要同時寫明輸入、輸出、限制和驗收；完成本案例不需要返回課程複製步驟。

## 獨立驗收

退出 Pi。macOS 執行：

```bash
cd ~/Downloads/pi-practice
shasum -a 256 -c input-before.sha256
test -f output/行動清單.md && echo "PASS: 輸出檔案存在"
sed -n '1,120p' output/行動清單.md
```

Windows Git Bash 把第一條檢查換成 `sha256sum -c input-before.sha256`。

1. 執行前指紋檢查仍為 `OK`。
2. 輸出檔案存在，並且恰好有三個事項。
3. 小林、小周、小陳分別對應正確日期和限制。
4. 實際讀寫記錄沒有出現練習目錄之外的路徑。

## 失敗恢復

輸入發生變化、輸出混入舊內容或路徑不對時，停止繼續修改，保留現場；在新的空練習目錄重新下載材料並生成新指紋。不要用 Agent 的“已經修好”代替重新檢查。
