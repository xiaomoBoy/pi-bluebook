---
title: 從零開始操作
description: 按你的當前狀態選擇最短路徑，完成第一個 Pi 檔案任務，再進入系統學習。
prev: { text: 首頁, link: /zh-TW/ }
next: { text: 安裝前檢查, link: /zh-TW/guide/before-install }
---

# 從零開始操作

先讓 Pi 幫你整理一份虛構會議記錄，得到可以親自檢查的行動清單。你不需要先讀完作者故事、全部術語或外掛程式推薦。

這頁只負責帶路，具體操作以對應課程為準。完成一個階段，就用右側的完成標誌判斷是否繼續。

## 找到你現在的位置

| 當前狀態 | 從哪裡開始 | 完成標誌 |
| --- | --- | --- |
| Mac 上還沒裝 Pi | [安裝前檢查](/zh-TW/guide/before-install) → [安裝 Pi](/zh-TW/guide/install-pi) | Node.js、npm 和 Pi 能返回版本號，能啟動和退出 |
| Windows 上還沒裝 Pi | [Windows Git Bash 路徑](/zh-TW/guide/windows-setup) | 在 Git Bash 中建立練習目錄，並啟動 Pi |
| 已安裝，但還不能回覆 | [登入與模型設定](/zh-TW/guide/connect-model) | 確認存取方式和費用，收到一次真實回覆 |
| 已經能收到回覆 | [從練習目錄開始](/zh-TW/guide/ready-to-work) → [第一次任務](/zh-TW/guide/first-task) | 產生行動清單，三條事項完整，輸入檔案未變 |

Linux 使用者可以跟隨 macOS/Linux 通用命令，檔案指紋使用 `sha256sum`。本書不提供 Linux 桌面介面的逐屏教程。

## 第一次成功應該留下什麼

- `input/專案會議記錄.md`：你親自檢查過的固定材料。
- `output/行動清單.md`：包含事項、負責人、截止日期和風險提醒。
- 輸入指紋校驗透過，輸出恰好包含三條事項。

檔案不存在、欄位遺漏或輸入被改動，都應回到[第一次任務的驗收步驟](/zh-TW/guide/first-task)，不要僅憑模型說“完成了”繼續。

## 做完以後怎麼選

想理解剛才發生了什麼，繼續讀[檔案與工作目錄](/zh-TW/guide/files-and-context)、[工作階段儲存](/zh-TW/guide/sessions)，再跟隨[完整主線](/zh-TW/guide/)。想先建立概念全貌，可以回到[導論](/zh-TW/guide/introduction)和[Pi 工作原理](/zh-TW/guide/how-pi-works)。

完成基礎課程後，用[內容整理遷移練習](/zh-TW/cases/content-workflow)處理相互衝突的資料，或用[小型程式碼修復](/zh-TW/cases/code-repair)練習“先復現失敗，再驗證修復”。學完第 14 課後進入[畢業專案](/zh-TW/cases/graduation-project)，把前面的方法串成一次完整工作流。

## 卡住時先縮小問題

啟動不了，查[啟動故障](/zh-TW/reference/troubleshooting#cannot-start)；沒有模型，查[模型與認證](/zh-TW/reference/troubleshooting#model-missing)；找不到產物，查[檔案與目錄錯誤](/zh-TW/reference/troubleshooting#wrong-files)。求助時帶上章節、作業系統、Pi 版本、執行位置和去除憑據後的錯誤文字。
