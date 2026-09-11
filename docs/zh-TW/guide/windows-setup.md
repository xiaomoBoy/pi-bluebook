---
title: Windows 中文路徑：安裝並啟動 Pi
description: 在 Windows 上用 Git Bash 準備 Node.js、安裝 Pi、建立練習目錄並完成第一次啟動。
prev:
  text: 藍皮書主線
  link: /zh-TW/guide/
next:
  text: 登入與模型設定
  link: /zh-TW/guide/connect-model
---

<span class="library-status">WINDOWS PATH · 安裝與第一次啟動</span>

# Windows 中文路徑：安裝並啟動 Pi

你在 Windows 電腦上開啟了藍皮書，卻發現第 1、2 課寫的是 Mac 終端機、`Command` 快捷鍵和 `/Users/...` 路徑。不要把這些命令逐字改成 Windows 格式，也不要同時混用命令提示符、PowerShell、WSL 和 Git Bash。

這條中文路徑把 Windows 獨有的準備工作集中在一頁完成。透過本頁驗收後，直接進入[第 3 課：登入與模型設定](/zh-TW/guide/connect-model)，再回到共同主線。

::: info 本頁採用的路線
Pi 在 Windows 上預設使用 **Git Bash**。官方依次查詢自定義 Bash 路徑、Git for Windows 的預設安裝位置 `C:\Program Files\Git\bin\bash.exe`，最後才查詢 PATH 中的其他 `bash.exe`。本頁面向第一次安裝的讀者，只使用官方推薦的 Git for Windows 預設路線，不配置 Cygwin、MSYS2、WSL 或可選 PowerShell 工具。
:::

## 先分清兩個輸入位置

這一頁會在兩個地方輸入內容：

1. **Git Bash 視窗**：輸入 `pwd`、`npm`、`pi` 等普通終端機命令。
2. **Pi 底部編輯區**：Pi 開啟後輸入訊息，以及 `/quit` 這樣的 Pi 內部命令。

在網頁複製程式碼仍使用 `Ctrl+C`。貼上到 Git Bash 時可以按 `Shift+Insert`，也可以在視窗中右鍵選擇貼上。貼上後先核對整行，再按 `Enter`；不要把程式碼框外的示例輸出一起輸入。

輸錯但還沒有按 `Enter` 時，按 `Ctrl+C` 取消當前輸入。命令已經開始執行後，不要為了催促它而反覆按鍵。

## 1. 安裝並確認 Git Bash

從 [Git for Windows 官方網站](https://git-scm.com/download/win)下載安裝程式。第一次使用時保留預設安裝位置；本課不要求更改編輯器、終端機模擬器或其他高階選項。

安裝完成後，關閉舊終端機。從 Windows 開始選單搜尋並開啟 **Git Bash**。不要開啟“命令提示符”，也不要把本頁程式碼先放進 PowerShell。

在 Git Bash 中逐行執行：

```bash
git --version
bash --version | sed -n '1p'
test -f "/c/Program Files/Git/bin/bash.exe" && echo "PASS: Pi 能找到預設 Git Bash"
```

透過時應看到 Git 版本、Bash 版本，最後再看到一行 `PASS`。版本數字可以不同。

如果前兩條有版本號、最後一條沒有輸出，說明 Git Bash 可能裝在了其他位置。這不等於 Git 已損壞，但本頁的預設路線尚未透過。第一次安裝建議重新使用預設位置；已經明確維護自定義環境的讀者，再參考 [Pi 官方 Windows 設定](https://pi.dev/docs/latest/windows)配置 `shellPath`。

### 小檢查

- [ ] 我開啟的是 Git Bash。
- [ ] `git --version` 和 `bash --version` 都有輸出。
- [ ] 預設路徑檢查顯示 `PASS`。

## 2. 安裝並檢查 Node.js

Pi 的 npm 安裝方式需要 Node.js 和 npm。從 [Node.js 官方下載頁](https://nodejs.org/en/download)下載當前 LTS 版並完成安裝。安裝結束後，關閉所有 Git Bash 視窗，再重新開啟一個新的 Git Bash，讓新的 PATH 生效。

執行：

```bash
node --version
npm --version
```

兩條命令都應返回版本號，並且 Node.js 不低於 `22.19.0`。最低版本要求核驗於 2026-09-09；釋出後的變化以 [Pi 官方原始碼要求](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/package.json)為準。

如果出現 `command not found`，先確認 Node.js 安裝程式已經完成，再完全關閉並重開 Git Bash。不要先從網上覆制陌生的 PATH 修改命令，也不要在多個 Node.js 安裝器之間來回切換。

## 3. 建立 Windows 專用練習目錄

Windows 路徑常寫成 `C:\Users\你的使用者名稱\...`，Git Bash 會把同一個位置顯示成 `/c/Users/你的使用者名稱/...`。本書後續命令使用 `/`，這是 Git Bash 的正常寫法，不需要改成反斜槓。

在 Git Bash 中建立一個空白練習目錄：

```bash
mkdir ~/pi-practice
cd ~/pi-practice
pwd
ls -A
```

`pwd` 應以 `/pi-practice` 結尾；`ls -A` 不顯示檔名，才說明目錄為空。這個目錄通常對應資源管理器裡的 `C:\Users\你的使用者名稱\pi-practice`。

如果 `mkdir` 顯示 `File exists`，不要直接使用可能留有舊檔案的目錄。改用新名字並記住它：

```bash
mkdir ~/pi-practice-2
cd ~/pi-practice-2
pwd
ls -A
```

::: warning 為什麼不直接使用整個使用者目錄
練習目錄能讓任務範圍和產物更容易核對，但它不是安全沙箱。Pi 的工具仍以你的 Windows 使用者權限執行。不要在 `~`、桌面根目錄、整個下載目錄或裝有真實工作的倉庫上層直接啟動 Pi。
:::

## 4. 安裝 Pi 並確認命令可用

仍在 Git Bash 中執行官方 npm 安裝命令：

```bash
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
```

等待命令結束、重新出現可輸入行後，再執行：

```bash
pi --version
command -v pi
```

第一條應顯示 Pi 版本號，第二條應顯示 Git Bash 實際找到的 `pi` 命令位置。安裝命令核驗於 2026-09-09，後續以 [Pi 官方 Quickstart](https://pi.dev/docs/latest/quickstart) 為準。

如果安裝過程出現 `npm ERR!`、`EPERM` 或 `Access is denied`：

- 不要先改用管理員身份反覆安裝。
- 等命令結束，儲存從安裝命令到最後一行錯誤的完整文字。
- 關閉其他可能正在執行的 Pi 或 Node.js 程序，再重開 Git Bash，只用同一條官方命令重試一次。
- 仍然失敗時，記錄 `node --version`、`npm --version` 和完整錯誤；不要刪除不認識的系統目錄。

如果安裝完成但 `pi` 顯示 `command not found`，完全關閉 Git Bash 後重新開啟，再執行 `pi --version`。仍失敗時保留 `npm prefix -g` 和錯誤輸出，再進行針對性排查，不要隨機追加 PATH。

## 5. 從練習目錄第一次啟動

確認當前位置後啟動 Pi：

```bash
cd ~/pi-practice
pwd
pi
```

如果你使用了 `pi-practice-2`，三處課程中的目錄名都要換成自己的實際名字。Pi 開啟後，底部狀態列顯示的工作目錄應與剛才的 `pwd` 一致。

第一次啟動可能直接出現登入提示。這表示 Pi 已經啟動，認證留到下一課。現在在 **Pi 底部編輯區**輸入：

```text
/quit
```

退出後應回到 Git Bash。再執行一次 `pi`，確認能夠重新開啟；隨後可以再次 `/quit`，也可以繼續下一課。

## 6. 以後怎樣跟隨藍皮書主線

從下一課開始，Windows 使用者繼續使用 Git Bash，並遵守這組固定替換：

| 主線中的寫法 | Windows Git Bash 使用 |
| --- | --- |
| `~/Downloads/pi-practice` | `~/pi-practice` |
| `/Users/你的使用者名稱/...` | `/c/Users/你的使用者名稱/...` |
| `shasum -a 256` | `sha256sum` |
| `Command+C` / `Command+V` | 網頁複製用 `Ctrl+C`，Git Bash 貼上用 `Shift+Insert` |

`curl`、`sed`、`find`、`test` 等後續練習命令繼續在 Git Bash 中執行。看到藍皮書寫“普通終端機”時，Windows 使用者應理解為“Git Bash”。

Pi 官方還提供可選的 `powershell` 工具，但它不是本書入門路線的前置條件。即使啟用該工具，Pi 編輯區裡的 `!` 和 `!!` 仍使用 Bash。先把一條路線跑通，再決定是否增加第二種 Shell。

## 本頁驗收

- Git Bash 的 Git、Bash 和預設路徑檢查全部透過。
- `node --version` 不低於本頁要求，`npm --version` 有輸出。
- 我建立了空白的 `~/pi-practice`，並能說出它對應的 Windows 路徑。
- `pi --version` 有輸出，`command -v pi` 能找到命令。
- 我能從練習目錄開啟 Pi，用 `/quit` 回到 Git Bash，再重新開啟。
- 我知道後續課程中的路徑和指紋命令應怎樣替換。

透過後，不需要再照抄 macOS 的第 1、2 課，直接繼續登入。

[下一課，登入帳號並選擇模型 →](/zh-TW/guide/connect-model)

已經安裝完成、現在需要升級或解除安裝？檢視 [安裝後生命週期管理](/zh-TW/guide/lifecycle-management)。

### 本頁依據

- [Pi 官方 Windows 設定](https://pi.dev/docs/latest/windows)
- [Pi 官方 Quickstart](https://pi.dev/docs/latest/quickstart)
- [Git for Windows](https://git-scm.com/download/win)
- [Node.js 下載頁](https://nodejs.org/en/download)

頁面中的動態要求核驗於 2026-09-09。Pi、Node.js 或 Git for Windows 更新後，應優先複查上述官方頁面。
