---
title: Pi 版本更新記錄
description: 按版本號、年份、變更型別和主題檢索 Pi Coding Agent 的完整官方更新記錄。
aside: false
lastUpdated: false
---

<span class="library-status">RELEASE ARCHIVE · 官方版本記錄快照</span>

# Pi 版本更新記錄

查某個功能從哪一版出現、一次升級改了什麼，或者某個報錯是否已經修復，不必再從幾千行更新日誌裡逐段翻找。

本頁把 Pi Coding Agent 官方 `CHANGELOG.md` 整理成可檢索檔案。**版本號、釋出日期和英文變更明細均來自官方記錄**；中文只用於檢索標籤、分類和五個關鍵節點說明，不把推測補成官方事實。官方 Changelog 目前從 `0.10.0` 開始，本頁不虛構更早版本的更新內容。

<PiReleaseExplorer />

## 資料邊界與維護方式

- 事實源：[Pi Coding Agent 官方 Changelog](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/CHANGELOG.md)。每條版本記錄都可以回到對應官方原文核對。
- 頁面儲存經過核驗的本地快照，網站構建不依賴瀏覽器臨時請求 GitHub；斷網時仍能查詢已經收錄的版本。
- 更新資料時執行 `npm run sync:pi-releases`，再同步繁體頁面並執行完整檢查。頁面會顯示本次快照的核驗日期。
- 官方英文記錄按上游倉庫許可使用；本頁的中文分類和關鍵節點說明屬於藍皮書整理內容。專案許可邊界見[內容許可](https://github.com/xiaomoBoy/pi-bluebook/blob/main/LICENSE-CONTENT.md)。

如果你準備升級 Pi，先閱讀[更新、退出登入與解除安裝](/zh-TW/guide/lifecycle-management)，記錄當前 `pi --version`，再對照這裡檢查目標版本的 Breaking Changes 和遷移說明。
