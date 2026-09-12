---
title: CASE 06 · 從檢查點恢復
description: 用三篇練習材料模擬長任務中斷，透過進度檔案恢復處理，檢查續寫過程是否做到不重不漏。
prev: { text: CASE 05 · 獨立分工, link: /zh-TW/cases/independent-review }
next: { text: CASE 07 · 安全邊界, link: /zh-TW/cases/safe-review }
---

<span class="library-status">CASE 06 · 可練習</span>

# 從檢查點恢復

## 結果

先處理一篇並停止，再由新工作階段讀取 `long-task/progress.md` 完成剩餘兩篇；最終三篇不重不漏，失敗項有記錄。

## 固定材料

- <a href="/examples-tw/long-task/source/article-a.md" download>article-a.md</a>
- <a href="/examples-tw/long-task/source/article-b.md" download>article-b.md</a>
- <a href="/examples-tw/long-task/source/article-c.md" download>article-c.md</a>
- <a href="/examples-tw/long-task/progress-template.md" download>進度模板</a>

三篇材料都是短小的虛構文字；進度模板明確分開已完成、已處理、失敗和下一步。

## 1. 準備一個空任務

```bash
cd ~/Downloads/pi-practice
mkdir -p long-task/source long-task/output
curl -fL https://pi.xiaomovps.com/examples-tw/long-task/source/article-a.md -o long-task/source/article-a.md
curl -fL https://pi.xiaomovps.com/examples-tw/long-task/source/article-b.md -o long-task/source/article-b.md
curl -fL https://pi.xiaomovps.com/examples-tw/long-task/source/article-c.md -o long-task/source/article-c.md
curl -fL https://pi.xiaomovps.com/examples-tw/long-task/progress-template.md -o long-task/progress.md
find long-task -type f -print
```

Windows 使用者把第一行換成 `cd ~/pi-practice`。開始前應只有三篇 `source` 和 `progress.md`；`output` 中出現舊檔案時換新目錄，不覆蓋繼續。

## 2. 第一條工作階段（Session）只做一篇

```bash
pi --name "檢查點練習-第一步"
```

傳送：

```text
讀取 long-task/progress.md 和 long-task/source/article-a.md。
在 long-task/output/index.md 中用“## 檔名”作為二級標題，下一行寫原文標題與一句話摘要，
再更新 long-task/progress.md 的已完成數量、已處理檔案和下一步。
只處理這一篇，然後停止等待我驗收。
```

退出 Pi，開啟 `index.md` 和 `progress.md`，確認已完成數為 1、列表只有 `article-a.md`，下一步仍指向未處理材料。

## 3. 新工作階段從檢查點恢復

```bash
pi --name "檢查點練習-恢復"
```

傳送：

```text
先讀取 long-task/progress.md，再列出 long-task/source 中尚未處理的檔案。
逐篇完成剩餘檔案；在 long-task/output/index.md 中繼續用“## 檔名”作二級標題，
每完成一篇就同時更新 long-task/output/index.md 和 long-task/progress.md。
不要重複已經記錄為完成的檔案。遇到損壞或無法讀取的檔案時記錄到失敗列表並停止。
```

## 關鍵現象

恢復工作階段先讀取磁碟進度，而不是猜測前一個工作階段做到哪裡。[第 13 課](/zh-TW/guide/vps-and-long-running)進一步解釋 VPS 與 tmux 邊界。

![完成三篇材料後對照數量與進度檔案](/images/07-Pi-长任务检查点-实操图.png)

恢復工作階段先讀 `progress.md`，完成後再做這張圖裡的三處核對。不要從“工作階段還在”推斷任務已經完成。

## 獨立驗收

```bash
find long-task/source -type f -name '*.md' | wc -l
grep -c '^## ' long-task/output/index.md
sed -n '1,180p' long-task/progress.md
```

輸入檔案數、索引條目數、進度中的已完成數都為 3；已處理列表無重複，失敗列表與實際一致。再逐篇核對摘要，不能只比數字。

## 失敗恢復

中斷後先讀進度和現有輸出，不從頭盲跑。發現重複時保留現場，列出重複項及來源後再決定修正；檔案損壞時寫入失敗列表並停止。
