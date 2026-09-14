---
title: 從零開始操作
description: 按你的當前狀態選擇最短路徑，完成第一個 Pi 檔案任務，再進入系統學習。
prev: { text: 首頁, link: /zh-TW/ }
next: { text: 安裝前檢查, link: /zh-TW/guide/before-install }
---

# 從零開始操作

先讓 Pi 幫你整理一份虛構會議記錄，得到可以親自檢查的行動清單。你不需要先讀完作者故事、全部術語或外掛程式推薦。

這頁只負責帶路，具體操作以對應課程為準。完成一個階段，就用右側的完成標誌判斷是否繼續。

## 開始用 Agent，先準備這四樣

1. **一臺能穩定工作的電腦。** 我更喜歡在 Mac 或 Linux 上做命令行任務；手頭是 Windows 也可以，Pi 有[官方 Windows 路徑](https://pi.dev/docs/latest/windows)，本書給出了[完整中文步驟](/zh-TW/guide/windows-setup)。先用現有裝置跑通 Node.js、終端機和 Pi，不必為了入門先換電腦。
2. **一個順手的終端機。** Mac 上我最推薦 [iTerm2](https://iterm2.com/)；它只支援 macOS，系統自帶終端機也能執行 Pi。Linux 可以先用發行版自帶終端機。Windows 初學者先安裝並開啟 **Git Bash**；如果喜歡 [Windows Terminal](https://learn.microsoft.com/en-us/windows/terminal/install) 的視窗介面，也要確認實際執行的是 Git Bash，不能把預設開啟的 PowerShell 當成同一套命令環境。[Pi 終端機相容說明](https://pi.dev/docs/latest/terminal-setup)
3. **一個簡單、可擴充的 Agent。** 我推薦從 [Pi Coding Agent](https://pi.dev/docs/latest/quickstart) 開始。這裡實際安裝的是帶 `pi` 命令的完整終端機應用，底層 `pi-agent-core` 是它使用的元件；[兩者並非同一層](/zh-TW/reference/faq#pi-vs-pi-coding-agent)。Pi 負責連接模型、組織工具和儲存工作階段；安裝它本身不會附送模型額度。按自己的系統完成[安裝前檢查](/zh-TW/guide/before-install)或 [Windows 中文路徑](/zh-TW/guide/windows-setup)，再啟動 Pi。
4. **一種可用的模型存取方式。** 想按實際用量付費，可以先看 [DeepSeek 官方 API](https://api-docs.deepseek.com/quick_start/pricing)；想用 OpenAI 的 Codex 模型並同時使用 ChatGPT，可以從每月 $20 的 [ChatGPT Plus](https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus)開始。先檢視[四種選擇與接入邊界](/zh-TW/guide/connect-model#先選模型存取方式-官方-api-與訂閱)。Plus 是否夠長期使用，取決於任務量和當時的額度；用量不夠時，先檢查帳戶當前限額和可用的補充額度或更高檔方案，再決定是否升級。Plus 不包含單獨計費的 OpenAI API 用量。

這四樣準備好後，目標只是從練習目錄啟動 Pi、選到可用模型並收到一次真實回覆。模型、方案和裝置的選擇以後都可以調整。

上述平台、終端機和模型存取方式資訊核驗於 **2026 年 9 月 14 日**；實際購買和安裝時，請再檢視文中連結的官方頁面。

## Pi 之外，還有兩條分支路線

本書用原版 Pi 教基礎，因為它便於看清模型、工具和檔案實際怎樣配合。已經能完成基礎任務、想要更多現成能力時，可以閱讀[OMP 與 Selesai Code 對照](/zh-TW/reference/pi-forks)：OMP 更重程式碼導航、除錯和工具介面；Selesai 更重成套子代理（Subagent）、研究與工作階段交接。它們是獨立的 Agent，不是 Pi 外掛程式，也不會因為安裝了它們就自動獲得模型額度。

## 找到你現在的位置

| 當前狀態 | 從哪裡開始 | 完成標誌 |
| --- | --- | --- |
| Mac 或 Linux 上還沒裝 Pi | [安裝前檢查](/zh-TW/guide/before-install) → [安裝 Pi](/zh-TW/guide/install-pi) | Node.js、npm 和 Pi 能返回版本號，能啟動和退出 |
| Windows 上還沒裝 Pi | [Windows Git Bash 路徑](/zh-TW/guide/windows-setup) | 在 Git Bash 中建立練習目錄，並啟動 Pi |
| 已安裝，但還不能回覆 | [登入與模型設定](/zh-TW/guide/connect-model) | 確認存取方式和費用，收到一次真實回覆 |
| 已經能收到回覆 | [從練習目錄開始](/zh-TW/guide/ready-to-work) → [第一次任務](/zh-TW/guide/first-task) | 產生行動清單，三條事項完整，輸入檔案未變 |

Linux 使用者可以跟隨 macOS/Linux 通用命令，檔案指紋使用 `sha256sum`。本書不提供 Linux 桌面介面的逐屏教學。

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
