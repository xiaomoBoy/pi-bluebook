---
title: 參考手冊
description: 按問題查詢 Pi 的核心概念、操作入口、能力邊界與延伸閱讀。
prev:
  text: 實作案例
  link: /zh-TW/cases/
next:
  text: 工作階段 與續寫
  link: /zh-TW/guide/sessions
---

<span class="library-status">REFERENCE · 遇到問題時查這裡</span>

# 參考手冊

這裡不承擔從零教學，也不要求順序閱讀。遇到一個術語、一項能力或一個操作問題時，從對應主題進入；如果你第一次閱讀，先從[導論：為什麼要讀這本 Pi 藍皮書](/zh-TW/guide/introduction)開始，再按[藍皮書主線](/zh-TW/guide/)繼續。

::: info 先讀本版說明
[十條仍然成立的判斷](/zh-TW/guide/lasting-principles)區分當前結論與原始學習檔案；[凡例與 2026 開放學習版說明](/zh-TW/guide/edition-2026)記錄平臺路徑、核驗截止、維護規則與版權邊界。
:::

## 核心機制

| 你正在找什麼 | 主題入口 | 適合解決的問題 |
| --- | --- | --- |
| Pi 能看到哪些材料 | [檔案與工作目錄](/zh-TW/guide/files-and-context) | 工作目錄、檔案範圍與上下文邊界 |
| 怎樣儲存並繼續任務 | [工作階段（Session） 與續寫](/zh-TW/guide/sessions) | 工作階段命名、恢復與可攜帶性 |
| 長任務為什麼會忘記 | [上下文與壓縮](/zh-TW/guide/context-and-compaction) | 上下文（Context）、壓縮（Compaction） 與交接記錄 |
| Cache 數字代表什麼 | [提示快取](/zh-TW/guide/prompt-caching) | 快取命中、成本與狀態判斷 |

## 能力與邊界

| 能力 | 主題入口 | 先記住的一句話 |
| --- | --- | --- |
| 固化方法與新增能力 | [技能（Skill）、擴充功能（Extension） 與 套件（Package）](/zh-TW/guide/skills-extensions-packages) | 技能 教它怎麼做，擴充功能 給它新的執行能力 |
| 選擇第三方擴充 | [外掛程式推薦](/zh-TW/plugins/) | 先確認需求和來源，只試一個最接近問題的外掛程式 |
| 多工分工 | [子代理（Subagent）](/zh-TW/guide/subagents) | 分工之後仍需統一證據和最終驗收 |
| 安全地執行任務 | [權限、隔離與驗收](/zh-TW/guide/safety) | 成功返回不等於業務結果已經完成 |
| 長時間執行 | [VPS 與長期任務](/zh-TW/guide/vps-and-long-running) | 先設計檢查點、恢復路徑和停止條件 |

## 操作入口

- [安裝前檢查](/zh-TW/guide/before-install)：確認環境和練習目錄。
- [安裝並啟動 Pi](/zh-TW/guide/install-pi)：完成第一次啟動。
- [Windows 中文路徑](/zh-TW/guide/windows-setup)：用 Git Bash 完成 Windows 環境準備、安裝和第一次啟動。
- [登入與模型設定](/zh-TW/guide/connect-model)：連接 模型服務商（Provider） 與模型。
- [從練習目錄開始](/zh-TW/guide/ready-to-work)：把實驗與真實檔案隔離。
- [安裝後生命週期管理](/zh-TW/guide/lifecycle-management)：更新 Pi、重新整理模型目錄、退出登入、解除安裝並處理本地資料。

## 常用命令速查

下面只列主線實際使用的入口。普通終端機命令與 Pi 內部命令不要混輸。

| 在哪裡輸入 | 命令 | 用途 |
| --- | --- | --- |
| 普通終端機 | `pi` | 在當前目錄啟動互動介面 |
| 普通終端機 | `pi --version` | 檢視當前安裝版本 |
| 普通終端機 | `pi update` | 只更新 Pi 本體 |
| 普通終端機 | `pi update --models` | 只重新整理模型目錄 |
| 普通終端機 | `pi list` | 檢視設定中登記的 套件 |
| 普通終端機 | `pi -c` | 繼續當前專案最近工作階段 |
| 普通終端機 | `pi -r` | 開啟當前專案工作階段選擇器 |
| 普通終端機 | `pi --no-extensions -e ./file.ts` | 忽略自動發現的 擴充功能，只顯式載入一個檔案 |
| 普通終端機 | `pi --no-skills --skill ./SKILL.md` | 忽略自動發現的 技能，只顯式載入一個檔案 |
| Pi 編輯區 | `/login` | 管理模型服務認證 |
| Pi 編輯區 | `/logout` | 清除選定 模型服務商 的本地憑據 |
| Pi 編輯區 | `/model` | 選擇當前模型 |
| Pi 編輯區 | `/name 名稱` | 設定工作階段顯示名 |
| Pi 編輯區 | `/resume` | 瀏覽並切換工作階段 |
| Pi 編輯區 | `/tree` | 在當前工作階段樹中選擇節點 |
| Pi 編輯區 | `/fork` / `/clone` | 從舊訊息或當前分支建立新工作階段 |
| Pi 編輯區 | `/compact` | 把較早上下文整理為摘要 |
| Pi 編輯區 | `/reload` | 重新載入自動發現位置中的資源 |
| Pi 編輯區 | `/quit` | 退出 Pi 回到普通終端機 |

套件 管理命令輸入在普通終端機：`pi install <來源>` 安裝，`pi list` 檢視，`pi config` 啟用或停用資源，`pi remove <來源>` 移除。套件 可能包含可執行 擴充功能 與會引導 Agent 執行操作的 技能；看不清來源和完整內容時不要安裝。

命令列為會隨版本變化；本表核驗於 2026-09-09。遇到不一致時先執行 `pi --help`，再查 [Using Pi](https://pi.dev/docs/latest/usage) 和對應專題頁。

## 檔案與配置位置

| 位置 | 作用 | 邊界 |
| --- | --- | --- |
| `~/.pi/agent/` | 使用者級認證、設定、工作階段與資源 | 可能包含憑據和私人工作階段，不要上傳 |
| `.pi/` | 當前專案的設定、擴充功能、技能 等 | 專案資源受 專案信任（Project Trust） 控制 |
| `.agents/skills/` | 可被多個 Agent 工具發現的專案 技能 | 專案級資源，需要先審查來源 |
| `AGENTS.md`、`CLAUDE.md` | 專案上下文說明 | 預設載入不受拒絕 專案信任 保護，可用 `--no-context-files` 關閉 |
| `docs/public/` | 本藍皮書站點的公開下載材料 | 構建後複製到網站根路徑，不放憑據 |

## 故障排查順序

1. 先停止重複嘗試，保留完整錯誤文字。
2. 核對輸入位置：普通終端機還是 Pi 編輯區。
3. 核對 `pwd`、實際檔案路徑、當前模型和工作階段名稱。
4. 臨時停用非必要資源：例如 `--no-extensions`、`--no-skills`。
5. 只改變一個條件後重試，並記錄實際結果。
6. 涉及金鑰、付費、釋出、刪除或對外發送時，不自行擴大操作。

| 現象 | 首先檢查 |
| --- | --- |
| `pi: command not found` | 重新開啟終端機後執行 `pi --version`，不要隨機改 PATH |
| 模型列表為空 | `/login` 的認證是否完成、帳號是否真有呼叫權限 |
| 找不到工作階段 | 是否位於建立工作階段時的同一工作目錄 |
| 技能 沒被使用 | 實際載入路徑、`name`/`description`、啟動引數 |
| 擴充功能 載入錯誤 | 檔案內容和路徑；不帶 `-e` 重新啟動恢復 |
| Agent 說完成但結果不對 | 回到輸入、輸出、差異、測試或真實介面重新驗收 |

## 術語邊界

- **模型服務商**：實際提供模型呼叫與計費的服務，不等同於 Pi 本身。
- **工作階段**：儲存的對話樹；它不會替代檔案版本管理。
- **上下文**：模型這一輪能參考的輸入；不等於永久記憶。
- **技能**：按需讀取的工作說明與配套資源；能影響行為，也可能引導執行指令碼。
- **擴充功能**：在 Pi 程序內執行的 TypeScript 能力，擁有當前使用者權限。
- **套件**：分發 技能、擴充功能、提示模板與主題的組合，不是安全容器。
- **專案信任**：是否載入專案資源的決定，不是執行時沙箱。

## 延伸閱讀

官方授權譯文不是主線課程。它們按本版目錄作為獨立專區保留，從對應章節進入，用原作者的完整文章進一步解釋一個機制：

- 學完第 7 課後：[無法隨身帶走的工作階段](/zh-TW/translations/session-portability)
- 學完第 8 課後：[Pi 中的壓縮機制](/zh-TW/translations/compaction-in-pi)
- 學完第 9 課後：[Agent 中的提示快取](/zh-TW/translations/prompt-caching)

[檢視全部官方授權譯文](/zh-TW/translations/)

::: tip 怎麼使用參考手冊
先用搜索或上面的主題索引定位問題；需要建立完整理解時，再沿著頁面頂部的課程歸屬回到對應章節。
:::
