---
title: 子代理如何分工
description: 從角色、輸入、產物和驗收四個方面理解子代理協作。
prev:
  text: 擴充功能的需求與驗收
  link: /zh-TW/guide/first-extension
next:
  text: Pi 工作原理
  link: /zh-TW/guide/how-pi-works
---

<span class="library-status">MODULE 04 · STEP 12 · 可練習</span>

# 子代理（Subagent）如何分工

一個 Agent 可以獨立完成很多事。當任務同時需要技術核對、文字編輯和真實使用者檢查時，把工作分給幾個子代理才可能節省時間。

截至 2026-09-09，官方明確說明 Pi 核心不內建子代理；官方程式碼倉庫提供的是擴充功能（Extension）示例。介面裡沒有看到分工按鈕，不是安裝失敗。本課先用兩個獨立工作階段完成同樣的分工結構，不要求安裝社群包（Package），也不把手動練習寫成內建能力。

## 什麼任務適合分工

適合並行的子任務有兩個特徵：邊界清楚，可以獨立交付。比如這本藍皮書的一次內容更新，可以分成：

| 角色 | 輸入 | 產物 |
| --- | --- | --- |
| 新手讀者 | 安裝章節 | 找出讀者不知道在哪輸入、看什麼結果的位置 |
| 技術核對 | 官方文件和技術章節 | 列出過時、不準確或缺少邊界的敘述 |
| 主編 | 完整章節與學習路線 | 檢查重複、跳步和前後斷裂 |

不適合並行的情況是，幾個 Agent 同時修改同一個檔案，卻沒有明確的所有者。這很容易出現覆蓋、衝突和標準不一致。

## 怎樣寫一份可驗收的分工

交給子代理的說明至少包含：

- 只處理哪些檔案或問題。
- 可以修改還是隻讀檢查。
- 完成時要返回什麼證據。
- 哪些判斷必須交回主代理（Main Agent），不能自行擴大範圍。

主代理的職責不是把任務發出去就算完成。它要合併結果、處理衝突、執行整體檢查，並對最終交付負責。

## 別過早擴大團隊

如果你還不能給單個 Agent 寫出可驗收的任務，增加子代理通常只會讓問題變得更難看懂。先用一個 Agent 完成三至五個真實任務，再把穩定、獨立、重複出現的部分分出去。

<a id="choose-subagents"></a>

## 怎樣選擇子代理擴充

先完成下面的手動分工案例，再決定是否安裝。以下是 **2026-10-12** 的資料核對，四項都是非官方專案；版本、維護狀態和權限以各倉庫為準，不按下載量排名。

| 專案 | 版本、安裝與維護 | 適合場景與邊界 |
| --- | --- | --- |
| [badlogic/pi-subagent](https://github.com/badlogic/pi-subagent) | 內部清單為 `0.1.0`，私有包，無公開 npm 版或 Release；README 採用原始碼克隆與 CLI 軟鏈安裝，需 Node.js 22.19 和 tmux。最近提交為 9 月 30 日，未歸檔，無 Issues 入口；未發現許可證。 | 適合習慣 tmux、想直接檢視子工作階段的人；不支援巢狀。公開原始碼不等於已有開源許可，使用前核對授權；安裝路徑和 SSH 前置條件按 README 確認。 |
| [nicobailon/pi-subagents](https://github.com/nicobailon/pi-subagents) | `0.77.0`，MIT；`pi install npm:pi-subagents@0.77.0`。10 月 10 日釋出，11 日仍有提交，未歸檔。 | 適合需要 reviewer、scout、oracle 等預設角色與前後台委派的人；先確認每個角色實際選擇的模型、工具和後台行為。 |
| [tintinweb/pi-subagents](https://github.com/tintinweb/pi-subagents) | `0.20.0`，MIT；`pi install npm:@tintinweb/pi-subagents@0.20.0`，要求 Pi 1.1.0。10 月 9 日釋出，11 日仍有提交，未歸檔。 | 適合遷移 Claude Code 式 Agent 與工作流習慣的人；巢狀預設關閉，子項工具限制不自動繼承父項，需逐項設定。 |
| [pi-subagent-manager](https://github.com/championswimmer/pi-subagent-manager) | `0.25.0`，MIT；`pi install npm:pi-subagent-manager@0.25.0`，要求 Pi 0.99.2、Node.js 22.19。10 月 11 日釋出並提交，未歸檔。 | 適合需要路徑樹、巢狀和暫停恢復的人；共享工作目錄與系統權限，工具策略不是沙箱。 |

只有原始碼安裝流程的第一項，安裝步驟見[專案 README](https://github.com/badlogic/pi-subagent#install)，本課不額外維護一份軟鏈指令碼。其 README 使用的 `earendil-works/pi-subagent` 地址目前重定向到作者倉庫，不能據此把它當成官方產品。

與[外掛程式選擇頁](/zh-TW/plugins/#子代理)保持同一條邊界：安裝前先讀原始碼、依賴與安裝內容，再用沒有真實資料的隔離練習目錄；額外模型呼叫可能增加費用。一次只裝一個，多個擴充可能爭用 `/agents` 等命令。提示詞和工具清單不能替代系統隔離。

表中命令用於核對安裝來源，本課不要求逐項執行。若試用 npm 項後換另一項，先用 `pi remove` 加同一來源移除，再用 `pi list` 確認消失；原始碼安裝按該專案 README 處理。

### 維護者最小復現

2026-10-12，在獨立設定與練習目錄中安裝 `pi-subagents@0.77.0`，用 Pi 1.1.0 委派一個前臺 `delegate`，固定為 `deepseek/deepseek-flash:off`，要求只回復 `BLUEBOOK_CHILD_OK`。這次無檔案變更的測試顯式採用文件支援的 `acceptance.level: "none"`，由維護者獨立對照返回標記；工具事件記錄了一個子任務、退出碼為 `0`、工具計數為 `0`，主工作階段收到同一標記。隨後用同一來源移除，`pi list` 顯示沒有包。

這隻驗證一次前臺委派；沒有測試併發、後台、巢狀、重啟恢復或另外三個擴充，不能寫成四項都「已驗證可用」。

## 配套實作：CASE 05 · 兩路獨立審閱

本課不再維護第二份操作步驟。進入 [CASE 05 · 兩路獨立審閱](/zh-TW/cases/independent-review)，按其中的固定材料、三條工作階段、任務原文、獨立驗收和失敗恢復完整練習一次。

案例刻意把兩路審閱分開，再由主工作階段合併證據。它練習的是子任務邊界和合並責任，不把手動工作階段寫成 Pi 核心內建的子代理功能。

## 本課驗收

- 能說清哪些任務適合分開，哪些檔案必須只有一個最終所有者。
- 能為每一路寫明輸入、只讀或修改權限、交付證據和未知項。
- 已按 CASE 05 檢查兩份獨立結果與主工作階段合併記錄，或能準確說明它們的驗收關係。
- 能解釋：這是對分工方法的手動練習，不代表 Pi 核心內建子代理。

### 本章依據

- [Pi 使用說明中的設計原則](https://pi.dev/docs/latest/usage#design-principles)
- [Pi 官方擴充功能示例索引](https://pi.dev/docs/latest/extensions#examples-reference)
- [我對子代理工作流的實際使用記錄](https://x.com/xiaomovps/status/2091841029850681551)

核心能力邊界的原核驗日期為 2026-09-09；擴充資料與上述最小復現單獨記錄於 2026-10-12。

- [pi-subagents v0.77.0](https://github.com/nicobailon/pi-subagents/releases/tag/v0.77.0)
- [tintinweb v0.20.0](https://github.com/tintinweb/pi-subagents/releases/tag/v0.20.0)
- [pi-subagent-manager 版本與許可證](https://github.com/championswimmer/pi-subagent-manager/blob/main/package.json)
