---
title: 藍皮書主線
description: Pi 學習藍皮書的五個學習模組與 14 課完整目錄。
prev:
  text: 首頁
  link: /zh-TW/
next:
  text: 導論 · 為什麼讀這本書
  link: /zh-TW/guide/introduction
---

<span class="library-status">CORE CURRICULUM · 5 個模組 · 14 課</span>

# 藍皮書主線

這部分負責完整、連續、經過核驗的學習過程。第一次閱讀先從導論理解 Pi 是什麼、這本書為誰而寫，再閱讀凡例和序章；已經能夠安裝、登入並正常使用 Pi 的讀者，可以從第二模組進入真實任務。

個人推文和使用感悟不會直接當作教程結論。能夠進入主線的內容，需要重新檢查來源、操作方式、風險邊界與成功訊號。每個模組同時標出配套實作與延伸閱讀，但它們不會打斷主線順序。

## 開篇 · 先知道為什麼讀

1. [導論：為什麼要讀這本 Pi 藍皮書](/zh-TW/guide/introduction)
2. [從 98 條推文留下的十條判斷](/zh-TW/guide/lasting-principles)
3. [凡例與 2026 開放學習版說明](/zh-TW/guide/edition-2026)

導論說明 Pi 的位置、中文初學者的真實門檻和本版主張；十條判斷把個人學習記錄中經受住後續實踐的部分蒸餾進書；凡例則固定平臺路徑、核驗日期、維護方式和版權邊界。

## 序章 · 先認識做出 Pi 的人

[Mario Zechner 的完整職業時間線](/zh-TW/guide/mario-zechner)從 2009 年的 AFX 與 libGDX 寫起，經過 RoboVM、獨立開發和 Coding Agent 實踐，再走到 2026 年的 Pi 與 Earendil。它不是安裝前置條件，但能幫助你理解 Pi 為什麼保持極簡、開放和可擴充。

## 模組一 · 安裝與基礎設定

1. [安裝前檢查](/zh-TW/guide/before-install)
2. [安裝並啟動 Pi](/zh-TW/guide/install-pi)
3. [登入與模型設定](/zh-TW/guide/connect-model)
4. [從練習目錄開始](/zh-TW/guide/ready-to-work)

::: info Windows 使用者從這裡開始
先完成 [Windows 中文路徑：安裝並啟動 Pi](/zh-TW/guide/windows-setup)，通過頁面驗收後直接接入第 3 課。後續看到“普通終端機”時繼續使用 Git Bash，並按頁面裡的對照表替換練習目錄和指紋命令。
:::

**完成標誌：** 能在獨立練習目錄啟動 Pi，並獲得一次真實回覆。

安裝完成後不必立即停下來學習維護命令；需要升級、換帳號、解除安裝或處理本地資料時，進入 [安裝後生命週期管理](/zh-TW/guide/lifecycle-management)。

## 模組二 · 完成真實任務

5. [第一次任務](/zh-TW/guide/first-task)
6. [檔案與工作目錄](/zh-TW/guide/files-and-context)
7. [工作階段的儲存與續寫](/zh-TW/guide/sessions)

**完成標誌：** 能獨立檢查輸入材料、輸出檔案和任務要求，不讓 Agent 給自己打分。

**配套內容：**[CASE 01 · 把會議記錄整理成行動清單](/zh-TW/cases/meeting-notes) · [授權譯文：無法隨身帶走的工作階段](/zh-TW/translations/session-portability)

## 模組三 · 長任務與上下文

8. [上下文與壓縮](/zh-TW/guide/context-and-compaction)
9. [提示快取入門](/zh-TW/guide/prompt-caching)

**完成標誌：** 任務持續變長時，知道怎樣留下關鍵結果，並理解壓縮和快取不是一回事。

**配套實驗：**[CASE 02 · 壓縮前後對照](/zh-TW/cases/compaction-before-after)

**官方授權譯文：**[Pi 中的壓縮機制](/zh-TW/translations/compaction-in-pi) · [Agent 中的提示快取](/zh-TW/translations/prompt-caching)

## 模組四 · 擴充自己的 Pi

10. [技能（Skill）、擴充功能（Extension） 與 套件（Package）](/zh-TW/guide/skills-extensions-packages)
11. [擴充功能 的需求與驗收](/zh-TW/guide/first-extension)
12. [子代理（Subagent） 如何分工](/zh-TW/guide/subagents)

**完成標誌：** 能從真實需求出發選擇擴充方式，並檢查新增能力是否真的生效。

**配套實作：**[CASE 03 · 第一個 技能](/zh-TW/cases/first-skill) · [CASE 04 · 最小 擴充功能](/zh-TW/cases/first-extension) · [CASE 05 · 兩路獨立審閱](/zh-TW/cases/independent-review)

## 模組五 · 建立穩定工作流

13. [長時間任務與 VPS](/zh-TW/guide/vps-and-long-running)
14. [權限、隔離與驗收](/zh-TW/guide/safety)

**完成標誌：** 建立檢查點、恢復路徑和權限邊界，讓長任務可以繼續，也可以安全停下。

**配套實作：**[CASE 06 · 從檢查點恢復](/zh-TW/cases/checkpoint-recovery) · [CASE 07 · 任務前安全審閱](/zh-TW/cases/safe-review)

## 需要查詢，而不是繼續上課時

進入[參考手冊](/zh-TW/reference/)按主題查詢。個人經歷、推文原文和認知變化單獨儲存在[小墨札記](/zh-TW/journey/)，不會混進課程結論。
