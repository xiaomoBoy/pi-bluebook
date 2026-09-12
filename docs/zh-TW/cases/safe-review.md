---
title: CASE 07 · 任務前安全審閱
description: 在不執行未知程式碼的前提下，判斷任務範圍、權限、恢復點和驗收方式。
prev: { text: CASE 06 · 中斷恢復, link: /zh-TW/cases/checkpoint-recovery }
next: { text: CASE 08 · 畢業專案, link: /zh-TW/cases/graduation-project }
---

<span class="library-status">CASE 07 · 可練習</span>

# 任務前安全審閱

## 結果

在真正執行任務前完成四問檢查，記錄目錄、檔案、風險和恢復點；任何未知都保留為未知，不用“專案已信任”代替隔離判斷。

## 固定材料

- <a href="/examples-tw/safety/review-brief.md" download>陌生倉庫請求（無可執行程式碼）</a>
- <a href="/examples-tw/safety/plan-template.md" download>安全審閱模板</a>

在普通終端機進入 `pi-practice`，把兩份檔案儲存到 `safety-review/`：

```bash
cd ~/Downloads/pi-practice
pwd
mkdir -p safety-review
curl -fL https://pi.xiaomovps.com/examples-tw/safety/review-brief.md \
  -o safety-review/review-brief.md
curl -fL https://pi.xiaomovps.com/examples-tw/safety/plan-template.md \
  -o safety-review/plan-template.md
```

先開啟兩份檔案，確認它們只有固定場景和七個空白標題，不包含可執行程式碼。然後顯式關閉擴充功能（Extension）和上下文檔案，只提供讀取、搜尋與寫入工具：

```bash
pi --name "安全審閱練習" --no-extensions --no-context-files \
  --tools read,write,grep,find,ls
```

這些引數不是沙箱；`write` 仍能以當前使用者權限寫檔案。本課材料是無害的固定教學文字，任務只允許寫一個新結果。進入 Pi 後傳送：

```text
讀取 safety-review/review-brief.md 和 safety-review/plan-template.md。
按照模板把審閱結果寫入 safety-review/plan.md。
只依據場景中明確寫出的事實；不知道的寫“未知”，不要存取網路、執行命令、安裝依賴、
讀取其他目錄或修改兩份輸入。最終“是否可以繼續”只能寫“資訊不足”，並列出繼續前必須確認的事項。
```

執行過程中只應看到兩次輸入讀取和一次 `safety-review/plan.md` 寫入。出現其他路徑或工具動作時按 `Esc` 停止，並按照[第 14 課](/zh-TW/guide/safety)保留現場。

## 關鍵現象

Agent 只能把材料中已有的事實寫成已知，把倉庫內容、指令碼行為和憑據需求保留為未知；最終結論必須停在“資訊不足”。如果輸出直接建議安裝或執行，說明安全審閱越過了當前證據。

## 獨立驗收

- 計劃寫清只讀範圍、可能執行的動作、憑據暴露面和需要的隔離方式。
- 沒有執行未知安裝指令碼，也沒有把真實金鑰放入練習目錄。
- 專案信任（Project Trust）被正確描述為資源載入許可，而不是沙箱。
- 恢復前先保留路徑、時間、狀態、差異和已執行命令。

退出 Pi 後獨立檢查：

```bash
test -f safety-review/plan.md && echo "PASS: 安全審閱存在"
grep -E '^## (已知事實|未知與風險|允許的只讀檢查|當前禁止的動作|需要的隔離與最小憑據|恢復點與證據|是否可以繼續)$' safety-review/plan.md
```

第二條應列出七個標題。再開啟檔案確認最終判斷是“資訊不足”，且沒有把虛構的倉庫內容寫成已經檢查過的事實。

## 失敗恢復

如果已經誤執行未知內容，先斷開繼續操作並保留現場；不要讓 Agent 批次清理。根據實際影響尋求對應的憑據撤銷、主機檢查和檔案恢復。本案例不能替代專業事件響應。
