# Pi 學習藍皮書

一本面向中文初學者的非官方 Pi 學習手冊。先理解 Pi 是什麼、適合誰和真實使用門檻，再從安裝與登入開始，完成第一個可以獨立驗收的檔案任務，逐步學習上下文、工作流和擴充。

每一課按“場景 → 概念 → 實作 → 驗收”展開。目標是讓你知道從哪裡開始、每一步應該看到什麼，以及怎樣確認結果，而不只是複製一段命令。

[線上閱讀](https://pi.xiaomovps.com/zh-TW/) · [從導論開始](https://pi.xiaomovps.com/zh-TW/guide/introduction) · [反饋問題](https://github.com/xiaomoBoy/pi-bluebook/issues) · [簡體中文版](README.md)

## 繁體中文版說明

這是簡體中文版之外的追加版本，原有內容不受影響。網站導航列可切換「簡體中文 / 繁體中文」，繁中內容位於 `/zh-TW/` 路徑。

- 名詞採用臺灣常用說法（參照 IICM 電腦名詞譯名臺灣用語），專有名詞首次出現時中英並列，例如工作階段（Session）、代理框架（Agent Harness）。
- `docs/translations/` 的十篇授權譯文為簡中譯文之繁體轉換版，授權聲明與出處完整保留。
- 上游更新簡中原文後可執行 `npm run sync:zh-tw` 同步頁面、練習材料與導航，再按 `scripts/zh-tw-glossary.json` 校對名詞。

## 當前內容與學習路徑

2026 開放學習版的讀者對象、閱讀順序、基本主張和內容邊界已經確定；網站仍會持續校訂錯字、失效命令、連結和核驗日期。當前導論、序章、五個模組、14 課、1 篇原理串聯和 8 個配套案例，已經形成從理解 Pi、完成第一次任務、管理工作階段與上下文，到擴充、分工、長任務和安全驗收的完整學習路徑。需要真實系統介面的進階效果會明確標出，不用文字或偽圖代替實測。

| 順序 | 章節 | 你會完成什麼 |
| --- | --- | --- |
| 導論 | [為什麼要讀這本 Pi 藍皮書](docs/zh-TW/guide/introduction.md) | 理解 Pi 的位置、中文初學者的真實門檻和本版主張 |
| 長期判斷 | [從 98 條推文留下的十條判斷](docs/zh-TW/guide/lasting-principles.md) | 區分原始學習檔案與截至本版仍然成立的判斷 |
| 凡例 | [2026 開放學習版說明](docs/zh-TW/guide/edition-2026.md) | 明確平台路徑、核驗截止、維護規則和版權邊界 |
| 序章 | [Pi 作者 Mario Zechner](docs/zh-TW/guide/mario-zechner.md) | 沿完整時間線理解 libGDX、RoboVM、Pi 與 Earendil 之間的關聯 |
| 模組一 · 1 | [安裝前檢查](docs/zh-TW/guide/before-install.md) | 開啟終端機，準備練習目錄，檢查 Node.js 和 npm |
| 模組一 · 2 | [安裝並啟動 Pi](docs/zh-TW/guide/install-pi.md) | 安裝 Pi，確認可用，並學會啟動與退出 |
| Windows 路徑 | [Windows 中文安裝路徑](docs/zh-TW/guide/windows-setup.md) | 用 Git Bash 準備環境、安裝 Pi，並接入第 3 課 |
| 模組一 · 3 | [登入與模型設定](docs/zh-TW/guide/connect-model.md) | 連接可用服務，選擇模型，收到一次真實回覆 |
| 模組一 · 4 | [從練習目錄開始](docs/zh-TW/guide/ready-to-work.md) | 確認當前目錄和基礎設定，完成進入任務前的檢查 |
| 安裝後維護 | [更新、退出登入與解除安裝](docs/zh-TW/guide/lifecycle-management.md) | 管理 Pi 版本、認證、套件（Package）和本地資料 |
| 模組二 · 5 | [第一次任務](docs/zh-TW/guide/first-task.md) | 把虛構會議記錄整理成行動清單，獨立核對輸入與輸出 |
| 模組二 · 6至7 | [檔案與工作階段](docs/zh-TW/guide/files-and-context.md) | 用工作目錄和 `@檔案` 建立清晰起點，學會工作階段命名、續寫和分支 |
| 模組三 · 8至9 | [上下文與壓縮](docs/zh-TW/guide/context-and-compaction.md) | 理解長對話、壓縮、提示快取和可持續產物 |
| 模組四 · 10至12 | [擴充自己的 Pi](docs/zh-TW/guide/skills-extensions-packages.md) | 區分技能（Skill）、擴充功能（Extension）和套件，理解擴充功能設計與子代理（Subagent）分工 |
| 模組五 · 13至14 | [穩定工作流](docs/zh-TW/guide/vps-and-long-running.md) | 處理長時間任務，建立權限、隔離、恢復和驗收意識 |
| Agent Loop 原理 | [從一條 Prompt 到完整 Agent Loop](docs/zh-TW/guide/how-pi-works.md) | 把工作階段、上下文、工具、技能、模型呼叫與壓縮串成完整流程 |
| 實作案例 | [案例庫](docs/zh-TW/cases/index.md) | 用 7 個單項實驗和 1 個畢業專案，練習完整 Agent 工作流 |
| 參考手冊 | [主題索引](docs/zh-TW/reference/index.md) | 按問題查詢核心機制、操作入口、能力邊界與延伸閱讀 |
| 外掛程式推薦 | [選擇地圖](docs/zh-TW/plugins/index.md) | 從推文實踐中整理當前可核驗的外掛程式來源、適用場景和風險邊界 |
| 小墨札記 | [寫在藍皮書之外](docs/zh-TW/journey/index.md) | 單獨保留個人感悟、踩坑記錄與 98 條推文檔案 |
| Earendil 官方授權譯文 | [譯文專區](docs/zh-TW/translations/index.md) | 經 Earendil 授權釋出的十篇 Pi、代理框架（Agent Harness）、工作階段機制與公司願景文章完整中文譯文 |

已經能夠啟動 Pi 並獲得回覆的讀者，可以先檢查第 4 課的前置條件，再進入第一次任務。主線以 macOS 為基礎，Windows 使用者可通過獨立中文路徑完成安裝，再使用 Git Bash 繼續後續課程。

當前仍未驗收的是 Windows 真實介面截圖，以及擴充功能桌面通知的完整系統證據；取得對應實機後再補入，不用模擬圖或終端機文字代替。新的個人實踐只有在來源和操作重新核驗後才會進入本版。

## 本地執行網站

本倉庫使用 VitePress。預覽和修改網站不需要安裝 Pi，也不需要模型帳號或 API Key。

先準備 Git、Node.js 和 npm。倉庫的 [.nvmrc](.nvmrc) 指定 Node.js 22；這裡是網站開發環境，與課程中 Pi 自身的執行要求分別說明。

```bash
git clone https://github.com/xiaomoBoy/pi-bluebook.git
cd pi-bluebook
npm ci
npm run docs:dev
```

開啟終端機顯示的本地地址即可預覽；修改 `docs/` 下的檔案後，頁面會自動更新。停止預覽時，在該終端機按 `Ctrl+C`。只維護網站或預覽內容不需要 Python；同步繁體版本時，先執行 `python3 -m pip install -r requirements-dev.txt`，再執行 `npm run sync:zh-tw` 並進行人工校對。

檢查正式構建並預覽構建結果：

```bash
npm run docs:check
npm run docs:preview
```

`docs:check` 會依次檢查內容資源引用、完成正式構建並核對 SEO 產物。構建結果生成在 `docs/.vitepress/dist/`，無需提交到倉庫。

## 目錄結構

```text
pi-bluebook/
├── docs/
│   ├── index.md                 # 網站首頁（簡中）
│   ├── zh-TW/                   # 繁體中文版（與簡中 1:1 鏡像）
│   │   ├── index.md             # 繁中首頁
│   │   ├── guide/               # 繁中課程
│   │   ├── cases/               # 繁中實作案例
│   │   └── ...                  # 其餘欄目同簡中結構
│   ├── guide/                   # 按學習順序編寫的課程（簡中）
│   ├── cases/                   # 與課程模組對應的可復現實作（簡中）
│   ├── reference/               # 按主題查詢的參考手冊
│   ├── plugins/                 # 從推文實踐整理的外掛程式選擇與核驗清單
│   ├── journey/                 # 藍皮書之外的個人札記
│   ├── translations/            # Earendil 官方授權中文譯文
│   ├── tweets/                  # 推文與實踐資料索引
│   ├── public/
│   │   ├── examples/            # 可下載的練習材料（簡中）
│   │   ├── examples-tw/         # 可下載的練習材料（繁中）
│   │   └── images/              # 教程圖片（兩版共用）
│   └── .vitepress/
│       ├── config.mts           # 雙語站點、SEO、搜尋與頁尾
│       ├── config/              # 簡中來源導航與生成的繁中導航
│       └── theme/styles/        # 按職責拆分的頁面樣式
├── scripts/
│   ├── convert-zh-tw.py         # 簡轉繁管線（OpenCC＋名詞表）
│   ├── zh-tw-glossary.json      # 繁中名詞表
│   ├── check-content.mjs        # 內容、圖片與導航引用檢查
│   └── check-seo.mjs            # 建置 SEO 檢查（雙語）
├── MAINTENANCE.md              # 工程結構與維護入口
├── requirements-dev.txt        # 繁中轉換工具依賴
├── README_zh-TW.md             # 本文件（繁體中文版說明）
├── CONTRIBUTING.md             # 反饋與貢獻說明
├── EDITORIAL_WORKFLOW.md        # 文章審閱、核驗與釋出流程
├── LICENSE                     # 網站程式碼許可
└── LICENSE-CONTENT.md           # 原創內容許可
```

## 一起完善這本書

歡迎指出看不懂的步驟、失效命令、缺少的材料或錯誤連結，也歡迎補充有來源的實踐記錄和修正文案。你不需要會寫程式碼才能貢獻：在 [Issues](https://github.com/xiaomoBoy/pi-bluebook/issues) 寫清所讀章節、卡住的位置和實際現象即可。繁體中文版特有的名詞問題，請註明出自繁中頁面。

提交修改前請閱讀 [貢獻指南](CONTRIBUTING_zh-TW.md)。文章從原始材料到釋出的分工與驗收方式見 [文章工作流](EDITORIAL_WORKFLOW.md)。

## 許可證

本倉庫的網站程式碼、原創書稿、推文整理稿和原創圖片統一採用 [MIT License](LICENSE)。
你可以使用、修改和分發，也可以用於商業用途；分發本專案的全部或重要部分時，需要
保留原版權宣告和許可證。具體說明見[內容許可](LICENSE-CONTENT_zh-TW.md)。

- `docs/translations/` 中十篇 Earendil 官方授權譯文及適配部分採用 [CC BY 4.0](LICENSE-CONTENT_zh-TW.md)，英文原文版權歸 Earendil 所有。
- 第三方商標、截圖、引用和其他第三方素材不自動包含在原創內容許可中，其權利歸各自權利人所有；素材旁的單獨說明優先。

具體權利和條件以許可檔案為準。

## 非官方宣告

本專案為社群學習專案，與 Pi 官方無隸屬或授權關係。Pi 的安裝方式、認證支援和版本行為可能變化；課程中的動態說明應結合所標註的核驗日期及 [Pi 官方文件](https://pi.dev/docs/latest/quickstart) 閱讀。
