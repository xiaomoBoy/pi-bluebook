---
title: CASE 04 · 載入最小擴充功能
description: 審查、載入、執行並停用一個只註冊介面命令的教學擴充功能。
prev: { text: CASE 03 · 第一個技能, link: /zh-TW/cases/first-skill }
next: { text: CASE 05 · 獨立分工, link: /zh-TW/cases/independent-review }
---

<span class="library-status">CASE 04 · 可練習</span>

# 載入最小擴充功能（Extension）

## 結果

顯式載入 `bluebook-check.ts`，執行 `/bluebook-check` 看見預期提示，再以不帶 `-e` 的啟動方式確認它已停用。

## 固定材料

- 擴充功能：<a href="/examples-tw/extension/bluebook-check.ts" download>下載 bluebook-check.ts</a>

這份程式碼不讀寫檔案、不存取網路，只註冊一個命令。仍然要先閱讀全文，因為任何擴充功能都以 Pi 程序的使用者權限執行。

## 1. 下載並審查

```bash
cd ~/Downloads/pi-practice
mkdir -p bluebook-examples
curl -fL https://pi.xiaomovps.com/examples-tw/extension/bluebook-check.ts \
  -o bluebook-examples/bluebook-check.ts
sed -n '1,160p' bluebook-examples/bluebook-check.ts
```

Windows 使用者把第一行換成 `cd ~/pi-practice`。實際檔案應該只有一個匯入、預設函式和 `registerCommand`，沒有網路或檔案操作；內容不一致時停止。

## 2. 載入並執行

在普通終端機執行：

```bash
pi --no-extensions -e ./bluebook-examples/bluebook-check.ts
```

進入 Pi 後輸入：

```text
/bluebook-check
```

預期出現“藍皮書擴充功能已載入；本命令沒有讀取或修改檔案。”這條 Pi 介面提示。

![最小擴充功能的真實載入與執行結果](/images/06-Pi-Extension执行结果-实操图.png)

固定提示出現後只完成了“載入並執行”這一半；案例還要求退出，再用不帶 `-e` 的方式重啟確認命令消失。

## 3. 停用

輸入 `/quit` 回到普通終端機，再執行：

```bash
pi --no-extensions
```

此時 `/bluebook-check` 不應繼續出現。如果仍然存在，檢查本次命令是否還帶 `-e`，以及專案或使用者擴充功能目錄是否另有同名檔案；不要刪除來源不明的檔案。

[第 11 課](/zh-TW/guide/first-extension)繼續解釋桌面通知為什麼需要真實系統證據；本案例只驗收最小命令的載入、執行和停用。

## 關鍵現象

同一個命令只在顯式傳入教學擴充功能時出現，退出並用 `--no-extensions` 重啟後消失。這一對照證明的是本次載入與停用鏈路，不代表任何系統通知已經出現。

## 獨立驗收

- `pi --no-extensions -e <檔案>` 啟動後，命令可執行並顯示固定提示。
- 不帶 `-e` 重啟後，教學命令不再可用。
- 載入錯誤可以透過不載入該檔案恢復，練習材料和工作階段不需要刪除。

## 再走一步：改成自己的命令

複製原檔案，保留可以比較的基線：

```bash
cp bluebook-examples/bluebook-check.ts bluebook-examples/bluebook-check-custom.ts
```

開啟新檔案，只修改兩處：把 `registerCommand` 的命令名改為 `bluebook-check-custom`；把通知文字改為“自定義核對完成；請繼續檢查真實產物。”不要增加檔案、網路或系統呼叫。

先退出舊程序，再載入副本：

```bash
pi --no-extensions -e ./bluebook-examples/bluebook-check-custom.ts
```

在 Pi 中執行 `/bluebook-check-custom`，應看到自己的新文字。舊的 `/bluebook-check` 不應在本次命令行表中註冊。退出後以 `pi --no-extensions` 重啟，兩個教學命令都不應註冊。

對照修改前後的兩處差異：命令名決定怎樣呼叫，通知文字決定可觀察的結果。真實桌面通知還需要系統介面和前後臺判斷，見[第 11 課](/zh-TW/guide/first-extension)的進階邊界。

## 失敗恢復

保留完整載入錯誤與檔案路徑。不要把檔案複製到多個自動發現目錄反覆嘗試；先用 `--no-extensions` 回到乾淨狀態，再核對下載內容。
