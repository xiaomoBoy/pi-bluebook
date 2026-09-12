---
title: 遷移練習 · 從資料到可核對的草稿
description: 用一份已確認簡報和一份舊討論記錄，練習來源優先順序、事實追溯、未知項與人工編輯。
prev: { text: 案例庫, link: /zh-TW/cases/ }
next: { text: 小型程式碼修復, link: /zh-TW/cases/code-repair }
---

# 從資料到可核對的草稿

整理文章時，輸入往往不止一份。同一個活動在舊討論裡說招募 20 人，最新簡報卻只確認 12 人；地點與時間還沒定。直接讓 Agent “寫一篇吸引人的公告”，就可能把舊提議寫成事實。

這個練習沿用[第一次任務](/zh-TW/guide/first-task)的檔案驗收方法，再加一條規則：每個事實必須能回到來源。材料是虛構讀書會，不對應真實活動，最終只製作待確認草稿。

## 1. 準備兩種來源

普通終端機中執行；macOS、Linux、Windows Git Bash 都可使用：

```bash
mkdir ~/pi-content-workflow
cd ~/pi-content-workflow
mkdir source output
curl -fL https://pi.xiaomovps.com/examples-tw/content-workflow/confirmed-brief.md -o source/confirmed-brief.md
curl -fL https://pi.xiaomovps.com/examples-tw/content-workflow/old-note.md -o source/old-note.md
cp source/confirmed-brief.md confirmed-before.txt
cp source/old-note.md old-before.txt
```

如果目錄已存在，換新名字重新開始。讀完兩份材料，確認已確認簡報日期較新，並明確要求舊討論服從它。檔名和“最新”字樣本身不是可信度證明；這次來源優先順序由已審查的固定材料明確給出。

## 2. 先做事實表，再寫草稿

啟動 Pi：

```bash
pi --no-extensions --no-skills --no-context-files
```

傳送：

```text
讀取 source 中兩份虛構資料，只寫 output/brief.md。
先做事實表，列出事項、採用的值、原始檔案與原文短句、衝突或未知。
已確認簡報優先於舊討論；舊提議不能變成既定事實。
再寫一段待確認的活動介紹，並單獨列出釋出前必須確認的問題。
不要編造地點、開始時間、報名連結或禮物承諾，不要聲稱已開放報名。
不修改來源和副本，不存取網路、不釋出、不讀取其他目錄。
```

這次先核對事實表，再修改文字表達。Agent 應採用 12 人，保留 20 人是舊討論這一衝突，地點、開始時間、報名連結和禮物承諾仍為未知或未確認。

## 3. 對照來源完成編輯

退出 Pi，在普通終端機檢查：

```bash
cmp source/confirmed-brief.md confirmed-before.txt
cmp source/old-note.md old-before.txt
sed -n '1,220p' output/brief.md
find . -maxdepth 2 -type f
```

兩次 `cmp` 都無輸出且退出碼為 0，表示來源保持不變。逐項確認：

| 驗收項 | 應有結果 |
| --- | --- |
| 已確認事實 | 名稱“週末讀書交流”、日期 2026-09-20、12 人、分享與討論形式 |
| 衝突處理 | 20 人只作為舊提議說明，不出現在草稿的已確認名額中 |
| 來源追溯 | 每個事實都有真實檔名與可找到的原文短句 |
| 未確認內容 | 地點、開始時間、報名連結、禮物承諾沒有被補寫成事實 |
| 釋出狀態 | 明確是待確認草稿，沒有傳送或釋出 |

如果需要把介紹寫得更簡潔，只讓 Pi 修改介紹段落，保留事實表和未知項。每次潤色後重新檢查這張表，避免語言變好看了，事實卻變了。

## 把方法用到自己的文章

以後處理產品資料、教學或訪談，可以繼續保留“來源 → 事實表 → 草稿 → 人工驗收”的順序。真實技術內容還要核對官方版本和日期；無法驗證的體驗、價格或效果不能因為出現在材料裡就直接採用。

重複做過幾次後，再把穩定的核對規則整理成 [技能（Skill）](/zh-TW/cases/first-skill)。需要程式碼示例時，繼續做[小型程式碼修復](/zh-TW/cases/code-repair)，用可執行的測試驗證文章裡的程式。

## 維護者復現記錄

2026 年 9 月 12 日，在 macOS 新練習目錄中用 Pi `0.84.3` 完成了這份材料練習。輸出採用 12 人，明確記錄舊討論的 20 人衝突，地點、開始時間、報名連結和禮物承諾保持未確認。兩份來源與事前副本逐位元組一致，僅新增 `output/brief.md`。這證明本次固定材料流程已經跑通，不代表模型每次都會正確處理新的來源。
