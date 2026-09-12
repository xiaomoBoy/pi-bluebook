---
title: 技能、擴充功能與 Pi 套件
description: 用“說明書、可執行功能、打包配送”區分 Pi 的三類擴充方式。
prev:
  text: 提示快取入門
  link: /zh-TW/guide/prompt-caching
next:
  text: 擴充功能的需求與驗收
  link: /zh-TW/guide/first-extension
---

<span class="library-status">MODULE 04 · STEP 10 · 可練習</span>

# 技能（Skill）、擴充功能（Extension）與 Pi 套件（Package）

剛開始擴充 Pi 時，這三個名字很容易混在一起。它們分別解決工作方法、可執行能力和資源分發三種問題，沒有由低到高的等級關係。

| 名稱 | 可以理解為 | 適合解決 | 新手何時用 |
| --- | --- | --- | --- |
| 技能 | 按需載入的專項能力包 | 提供工作流說明，也可帶指令碼、資源和參考文件 | 同一類任務已經做過幾次，要固化方法 |
| 擴充功能 | 載入進 Pi 的可執行功能 | 新工具、命令、事件處理、介面或自定義行為 | 光靠說明不夠，確實需要程式碼執行 |
| Pi 套件 | 用來分發一組 Pi 資源的包 | 把擴充功能、技能、提示模板、主題等一起安裝和共享 | 自己的組合已穩定，準備在多個專案或多人間複用 |

## 先判斷問題屬於哪一類

如果你每次寫教程都要重新解釋“先檢查讀者是否能獨立驗收”，這更像技能。它的價值在於穩定的工作方法，不一定需要新程式碼。

如果你想在任務結束時讓終端機彈出提醒，就需要監聽 Pi 事件並呼叫系統能力。這更像擴充功能。

如果你要把提醒擴充功能、配套技能、提示模板和主題交給另一臺電腦，一個 Pi 套件才開始有意義。

## 選擇順序

1. 先在真實任務中手動跑通。
2. 重複出現的步驟和標準，整理成技能。
3. 確實缺少可執行能力時，再開發或安裝擴充功能。
4. 要為多個專案或別人配送時，再考慮套件。

這個順序可以避免一個常見問題：任務還沒做穩定，先收集了一堆外掛程式和包，最後自己也說不清哪一層在起作用。

## 實作：只載入一個教學技能

本課沿用第 5 課的虛構會議記錄。你會載入一份只有文字規則的技能，讓 Pi 按固定欄位核對行動清單。它不會新增系統權限，但其中的說明仍會影響 Agent 的行為，所以你必須先閱讀內容。

### 1. 下載並檢查

在普通終端機進入 `pi-practice`，下載教學檔案：

```bash
mkdir -p bluebook-examples/action-list-review
curl -fL https://pi.xiaomovps.com/examples/skill/action-list-review/SKILL.md \
  -o bluebook-examples/action-list-review/SKILL.md
```

先開啟或在終端機檢視 `bluebook-examples/action-list-review/SKILL.md`。你應該看到兩項後設資料 `name`、`description`，以及六條只圍繞讀取、整理和核對會議記錄的規則。若檔案為空、內容不是純文字，或要求執行與任務無關的命令，停止，不載入。

### 2. 顯式載入

下面這條命令輸入在普通終端機。`--no-skills` 先忽略其他自動發現的技能，`--skill` 再只加入本課這一個檔案：

```bash
pi --no-skills --skill ./bluebook-examples/action-list-review/SKILL.md
```

![顯式載入教學技能，並在 Pi 編輯區準備呼叫](/images/05-Pi-Skill显式加载-实操图.png)

截圖同時保留兩處證據：頂部啟動命令明確指定了技能路徑，啟動資訊中的 `[Skills]` 列出了 `action-list-review`。底部呼叫尚未提交，因此這張圖證明“載入並準備顯式呼叫”，不證明後續檔案已經生成。

進入 Pi 後，如果 `/skill:` 命令可用，輸入下面這段可以強制載入指定技能；若命令未出現，先在 `/settings` 中啟用技能 commands，再重新輸入：

```text
/skill:action-list-review 請重新核對 input/專案會議記錄.md，
把結果寫入 output/行動清單-複核版.md。不要修改輸入檔案；原文沒有的資訊寫“原文未說明”。
```

Pi 啟動時只把技能的名稱與描述放進上下文，完整說明按需載入；官方也提醒模型不一定每次自動讀取，所以本課使用顯式 `/skill:action-list-review`。這仍不等於系統一定替你執行了所有檢查。觀察 Pi 是否實際讀取指定輸入、寫入指定輸出；完成後仍要獨立檢查檔案。

### 3. 驗收和停用

退出 Pi 後，在普通終端機執行：

```bash
test -f output/行動清單-複核版.md && echo "PASS: 複核版存在"
grep -c '^## ' output/行動清單-複核版.md
```

第一條應出現 `PASS`。第二條用於輔助計數；如果你的標題格式不同，應直接開啟檔案確認恰好三項，而不能只依賴這個數字。

這個技能沒有安裝到全域性或專案自動發現目錄。下次直接執行 `pi` 時，它不會因為本課命令而繼續載入。要再次使用，就重新帶上 `--skill`；要停用，只需退出本次 Pi，不再傳入該引數。

::: tip 專案級放置位置
當你已經讀懂並想讓同一專案自動發現它時，可放入 `.pi/skills/action-list-review/SKILL.md`。專案資源只有在專案被信任後才會載入。初次學習先用顯式 `--skill`，更容易看清來源與範圍。
:::

::: danger 安裝前先閱讀
Pi 套件以當前使用者的完整系統權限執行。除了可執行的擴充功能，技能和其他資源也可能引導 Agent 執行命令或產生副作用。不要因為它叫“包”或“社群資源”就直接信任。安裝前應審查整個包的來源、資源和安裝內容。
:::

### 本章依據

- [Pi 技能](https://pi.dev/docs/latest/skills)
- [Pi 擴充功能](https://pi.dev/docs/latest/extensions)
- [Pi 套件](https://pi.dev/docs/latest/packages)
- [技能、擴充功能和 Pi 套件的區別](/zh-TW/tweets/04-skills-extensions)

以上動態行為核驗於 2026-09-09。教學技能已在本機 Pi 0.80.10 中驗證為臨時載入，並出現在 `skill:action-list-review` 命令列表；Pi 的資源位置和命令可能更新，以對應官方頁面為準。
