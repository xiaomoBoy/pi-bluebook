---
title: CASE 05 · 兩路獨立審閱
description: 用隔離的只讀工作階段練習子任務分工，再由主工作階段合併證據。
prev: { text: CASE 04 · 最小 擴充功能, link: /zh-TW/cases/first-extension }
next: { text: CASE 06 · 中斷恢復, link: /zh-TW/cases/checkpoint-recovery }
---

<span class="library-status">CASE 05 · 可練習</span>

# 兩路獨立審閱

## 結果

欄位審閱和安全審閱互不讀取對方結論，各自返回原文證據；主工作階段記錄共同結論、差異、衝突和未知。

## 固定材料

- 輸入：<a href="/examples-tw/first-task/meeting-notes.md" download>虛構會議記錄</a>

本案例用兩個命名、只讀的 Pi 工作階段練習分工結構，不要求安裝 套件（Package），也不宣稱 Pi 核心內建子代理（Subagent）。

## 1. 準備目錄

```bash
cd ~/Downloads/pi-practice
mkdir -p input reviews
curl -fL https://pi.xiaomovps.com/examples/first-task/meeting-notes.md \
  -o input/專案會議記錄.md
shasum -a 256 input/專案會議記錄.md > input-before.sha256
```

Windows 使用者把第一行換成 `cd ~/pi-practice`，並把 `shasum -a 256` 換成 `sha256sum`。親自開啟輸入，確認是虛構會議記錄且不含私人資訊後再繼續。

## 2. 欄位審閱工作階段

在普通終端機執行：

```bash
pi --name "欄位審閱" --no-extensions --tools read,grep,find,ls
```

進入 Pi 後傳送：

```text
只讀檢查 input/專案會議記錄.md。
列出每個行動項的事項、負責人、截止日期和限制；原文沒有的寫“未知”。
不要修改檔案。返回引用到的原文短句與行號。
```

完成後輸入 `/export reviews/fields.html`，退出 Pi。

## 3. 安全審閱工作階段

在同一普通終端機執行：

```bash
pi --name "安全審閱" --no-extensions --tools read,grep,find,ls
```

進入 Pi 後傳送：

```text
只讀檢查 input/專案會議記錄.md。
只列出涉及帳號、私人路徑、憑據、釋出前檢查和驗收的限制。
不要修改檔案；每條結論附原文短句與行號，不確定就標記“未知”。
```

完成後輸入 `/export reviews/safety.html`，退出 Pi。

## 4. 主工作階段合併

```bash
pi --name "分工合併" --no-extensions
```

傳送：

```text
讀取 reviews/fields.html、reviews/safety.html 和 input/專案會議記錄.md。
把合併結果寫入 reviews/merged.md，只包含：共同結論、欄位審閱獨有、
安全審閱獨有、衝突與未知、回到原文後的最終核對。
每條最終結論附原文行號。兩路衝突時必須以重新讀取的原文為依據，不能按多數票決定。
不要修改 input 和兩份 HTML 匯出檔案。
```

## 關鍵現象

兩路工作階段互不讀取對方結論，並且只由主工作階段寫 `merged.md`。這裡練習的是可審計的分工結構，不是假定核心內建了一個“子代理 按鈕”。[第 12 課](/zh-TW/guide/subagents)解釋這種手動分工與子代理 擴充的關係。

## 獨立驗收

退出 Pi 後執行：

```bash
test -f reviews/fields.html && echo "PASS: 欄位審閱存在"
test -f reviews/safety.html && echo "PASS: 安全審閱存在"
test -f reviews/merged.md && echo "PASS: 合併記錄存在"
shasum -a 256 -c input-before.sha256
sed -n '1,180p' reviews/merged.md
```

Windows Git Bash 把 `shasum -a 256 -c` 換成 `sha256sum -c`。

- 兩路輸入範圍不同，輸出都帶原文位置。
- 兩路不寫同一個檔案，也不提前交換結論。
- 主工作階段遇到衝突會回讀原文，不按多數票決定。
- 最終記錄保留未知項和取捨理由。

## 失敗恢復

一路失敗只重跑該路；選錯工作階段先退出並核對名稱。兩個角色準備修改同一檔案時立即停止，改為只返回結果，由主工作階段單獨寫最終稿。
