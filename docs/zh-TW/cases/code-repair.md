---
title: 遷移練習 · 修復一個小程式
description: 用四個固定測試復現行動清單程式的錯誤，讓 Pi 最小修復，再親自驗證測試和修改範圍。
prev: { text: 內容整理遷移練習, link: /zh-TW/cases/content-workflow }
next: { text: 畢業專案, link: /zh-TW/cases/graduation-project }
---

# 修復一個小程式

你已經會檢查行動清單的欄位。現在把同一套驗收習慣用到程式碼：一個函式本來應該篩選未完成事項並按日期排序，卻混進了已完成項，還改變了呼叫者的原始列表。

完成本例需要已經能使用 Pi，並有 Node.js 22 或更高版本。材料沒有第三方依賴，不需要執行 `npm install`。它是故意帶錯的教學程式，與網站自身的生產程式碼無關。

## 1. 在新目錄復現錯誤

在普通終端機執行；macOS、Linux、Windows Git Bash 都可使用下面的主目錄路徑：

```bash
mkdir ~/pi-code-repair
cd ~/pi-code-repair
curl -fL https://pi.xiaomovps.com/examples-tw/code-repair/action-list.mjs -o action-list.mjs
curl -fL https://pi.xiaomovps.com/examples-tw/code-repair/action-list.test.mjs -o action-list.test.mjs
node --test action-list.test.mjs
```

目錄已存在時換一個新名字，避免舊修復覆蓋初始狀態。先讀兩個檔案，再執行測試；這次應看到 **4 個測試、2 個透過、2 個失敗**。失敗是需要記錄的起點。如果一開始就全部透過，先核對下載材料和目錄。

四個測試分別檢查：排除已完成事項並按日期排序、不改變輸入、同日期保留原順序、空陣列正常返回。日期已限定為 `YYYY-MM-DD` 或 `null`，本例不處理自然語言日期與時區。

給兩份初始檔案留副本：

```bash
cp action-list.mjs action-list.before.txt
cp action-list.test.mjs tests.before.txt
pi --no-extensions --no-skills --no-context-files
```

## 2. 讓 Pi 只修一個檔案

在 Pi 輸入：

```text
讀取 action-list.mjs 和 action-list.test.mjs，先執行
node --test action-list.test.mjs 復現失敗，解釋原因。
只修改 action-list.mjs：返回未完成事項，日期升序，未知日期最後；
同日期保留原順序，不能改變傳入陣列或物件。
不能修改測試、初始副本或其他檔案，不安裝依賴，不存取網路或其他目錄。
修復後重新執行測試，報告修改位置和實際結果。
```

執行範圍由提示明確約定，並非作業系統沙箱。整個練習只使用下載後審查過的教學檔案。

## 3. 離開 Pi，獨立驗收

輸入 `/quit` 回到普通終端機：

```bash
node --test action-list.test.mjs
cmp action-list.test.mjs tests.before.txt
diff -u action-list.before.txt action-list.mjs
ls -A
```

現在應是 **4 個透過、0 個失敗**。`cmp` 無輸出且退出碼為 0，才表示測試檔案沒有被改；`diff` 應展示實現變化，它返回 1 只是表示兩份檔案不同。最後檢查目錄只有兩份程式和兩份初始副本，沒有多出依賴或無關檔案。

不要為了透過而刪測試、把斷言改寬或硬編碼樣例答案。讀懂修復的基本結構：先得到未完成事項的新陣列，再排序；未知日期單獨處理，原陣列順序保持不變。固定測試證明的是這份需求範圍，不能證明任意輸入都正確。

## 失敗後怎樣繼續

把失敗測試名、預期值和實際值交回 Pi，請它只修對應問題。測試檔案被修改時保留現場，用新目錄重新開始；不要把“測試全綠”當成對修改測試行為的許可。

完成後可以進入[畢業專案](/zh-TW/cases/graduation-project)，把同樣的方法用於有導航、雙語內容和構建檢查的真實倉庫。

## 維護者復現記錄

2026 年 9 月 12 日，在 macOS 的新練習目錄中使用 Pi `0.84.3` 與 Node.js `24.14.1` 復現：原始材料 2 項透過、2 項失敗；Pi 僅修改 `action-list.mjs` 後，維護者獨立重跑得到 4 項透過、0 項失敗，並用逐位元組比較確認測試檔案未改。不同模型的修復寫法可以不同，仍以你的當次測試和檔案差異為準。
