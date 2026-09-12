---
title: CASE 08 · 畢業專案
description: 在一個真實 GitHub 專案裡串聯需求、工作階段、上下文、技能、檢查點、獨立審閱與人工驗收。
prev: { text: CASE 07 · 安全審閱, link: /zh-TW/cases/safe-review }
next: { text: 回到課程, link: /zh-TW/guide/ }
---

<span class="library-status">CASE 08 · 畢業專案</span>

# Pi 藍皮書畢業專案

## 結果

你會把一個真實 GitHub 專案交給 Pi：先讀需求和倉庫，再用命名工作階段（Session）制定方案；人工批准後修改檔案、執行測試、儲存檢查點；最後讓另一個只讀工作階段使用 Review 技能（Skill）獨立複核，再由你完成最終驗收。

專案不大，但鏈路完整。畢業標準不是“Pi 成功寫了一篇文件”，而是你能解釋每一步的邊界，並用專案裡的真實證據判斷它是否完成。

<img class="diagram-figure" src="/images/diagrams/graduation-project-flow.svg" alt="CASE 08 三方驗收工作流：學習者批准計劃和最終驗收，Pi 主工作階段實施，獨立審閱工作階段只讀複核" />

這張圖有三條硬規則：主工作階段不能批准自己的計劃，審閱工作階段不能修改檔案，最後是否透過由人判斷。

## 這次要改什麼

練習倉庫使用 [Pi 學習藍皮書](https://github.com/xiaomoBoy/pi-bluebook)。任務是在參考手冊中新增“任務完成檢查表”，同時接入首頁與側欄。需求刻意限制為三個簡體原始檔、三個對應的繁體生成檔案和一個本地檢查點，足以練習真實專案流程，又不會把注意力帶到複雜業務程式碼上。

可以先預覽這三份材料；正式練習會從固定版本的克隆中複製它們：

- <a href="/examples-tw/graduation-project/requirements.md" download>畢業專案需求</a>
- <a href="/examples-tw/graduation-project/checkpoint-template.md" download>檢查點模板</a>
- <a href="/examples-tw/graduation-project/bluebook-graduation-review/SKILL.md" download>獨立審閱技能</a>

::: warning 安全邊界
始終在新克隆的練習倉庫中操作。全程不部署，不執行 `git add`、`git commit` 或 `git push`，也不讀取憑據。命令裡的工具白名單會減少可用工具，但不是作業系統沙箱。
:::

## 第 0 階段 · 準備隔離副本

在普通終端機執行。下面的啟用命令用於 macOS / Linux；Windows Git Bash 將 `source .venv/bin/activate` 換成 `source .venv/Scripts/activate`：

```bash
cd ~/Downloads
git clone https://github.com/xiaomoBoy/pi-bluebook.git pi-bluebook-graduation
cd pi-bluebook-graduation
git checkout --detach ea68e5f
npm ci
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -r requirements-dev.txt
npm run check:translations
git rev-parse HEAD
git status --short
```

如果 `pi-bluebook-graduation` 已存在，換一個新目錄名，不要覆蓋舊目錄。初始 `git status --short` 應該沒有輸出。本頁固定使用 `ea68e5f` 作為練習基線，準備階段的 `checkout` 只用於切換到已驗證版本；進入 Pi 以後不再執行 Git 寫操作。儲存 `git rev-parse HEAD` 的完整提交號，材料與倉庫不一致時先停止。Windows Git Bash 同樣可以使用 `~/Downloads`，這裡新克隆的倉庫不放在前面課程的 `pi-practice` 中。`python3 --version` 必須可用；若只提供 `python`，本頁和 npm 同步指令碼使用的 Python 命令需要先由你統一確認，不能帶著缺失環境繼續。

`.venv/` 是倉庫已忽略的本地 Python 環境。後續另開普通終端機時，也要先進入練習倉庫並執行對應的啟用命令，再啟動 Pi 或執行同步檢查。

把三份材料放在倉庫旁邊，而不是放進倉庫：

```bash
cd ..
mkdir -p pi-bluebook-graduation-materials/bluebook-graduation-review
cp pi-bluebook-graduation/docs/public/examples/graduation-project/requirements.md \
  pi-bluebook-graduation-materials/requirements.md
cp pi-bluebook-graduation/docs/public/examples/graduation-project/checkpoint-template.md \
  pi-bluebook-graduation-materials/checkpoint-template.md
cp pi-bluebook-graduation/docs/public/examples/graduation-project/bluebook-graduation-review/SKILL.md \
  pi-bluebook-graduation-materials/bluebook-graduation-review/SKILL.md
cd pi-bluebook-graduation
```

本案例以倉庫簡體原文為需求合同，繁體讀者也使用同一份源材料，不要自行翻譯需求規定的頁面標題；同步指令碼負責生成繁體頁面。

開啟三份材料檢查內容。需求檔案是驗收合同，模板規定檢查點欄位，技能只規定審閱方法；任何一份都不應包含安裝或部署指令。

## 第 1 階段 · 建立主工作階段，只做計劃

啟動一個有名字的工作階段：

```bash
pi --name "CASE 08 畢業專案" --no-extensions --no-skills --no-context-files \
  --tools read,write,edit,grep,find,ls,bash
```

這裡先關閉自動發現的技能和擴充功能（Extension），避免未知資源改變主任務行為。沒有安裝擴充功能不是漏做一課，而是根據需求判斷“現有工具已經足夠”。進入 Pi 後傳送：

```text
讀取 ../pi-bluebook-graduation-materials/requirements.md 和
../pi-bluebook-graduation-materials/checkpoint-template.md。
檢查當前倉庫的 README、package.json、參考手冊首頁、VitePress 導航配置，
以及需求提到的三個課程頁面。

這一輪只做兩件事：
1. 把你確認的目標、允許路徑、專案檢查命令、風險和唯一下一步寫入
   worklog/graduation-checkpoint.md；
2. 向我彙報實施計劃。

不要修改網站檔案，不要執行構建，不要部署，不要安裝依賴，
不要執行 git add、git commit、git push 或其他 Git 寫操作。完成後停止，等我批准。
```

### 第一次人工門

不要直接回復“繼續”。先退出或另開一個普通終端機，檢查：

```bash
git status --short
sed -n '1,220p' worklog/graduation-checkpoint.md
```

此時只應出現 `worklog/`。檢查點應準確列出三個簡體原始檔、三個繁體生成檔案、一個本地記錄、專案自帶檢查命令和禁止動作；倉庫結構不一致的地方必須寫成未知。範圍正確後，才批准實施。

## 第 2 階段 · 在同一工作階段實施

繼續剛才的工作階段；如果已經退出，可在倉庫目錄執行 `pi --resume` 選擇“CASE 08 畢業專案”。然後傳送：

```text
計劃已批准。繼續讀取需求和 worklog/graduation-checkpoint.md，
只實施需求允許的三個簡體原始檔，再執行 npm run sync:zh-tw 生成對應繁體檔案。
不要手工改寫繁體正文。

完成後執行 npm run check:translations、npm run docs:check、git diff --check 和 git status --short，
把真實命令結果、實際變更、失敗或未知寫回檢查點。
如果檢查失敗，只做需求範圍內的最小修正；如果需要擴大範圍，停止並說明原因。

不要部署，不要安裝依賴，不要執行 git add、git commit、git push 或其他 Git 寫操作。
```

這一步會讓上下文（Context）明顯變長：需求、專案說明、被讀取的檔案、工具呼叫、命令結果和修改差異都會進入當前任務鏈。工作階段儲存完整事件，模型當前實際收到的是由活動分支重建的上下文；兩者不是同一個概念。

### 上下文快滿時怎麼辦

不要為了展示概念而強行壓縮。只有底部提示接近模型上限，或 Pi 自動觸發壓縮（Compaction）時，才這樣處理：

1. 先讓 Pi 更新 `worklog/graduation-checkpoint.md`；
2. 需要時執行 `/compact`；
3. 壓縮後要求 Pi 重新讀取需求和檢查點，再說明唯一下一步；
4. 人工核對摘要有沒有丟失允許路徑、禁止動作和失敗記錄。

壓縮會把較早內容整理成摘要並保留較新的訊息，不會替代磁碟上的檢查點。快取命中隻影響複用輸入與成本，也不能當作任務完成證據。

## 第 3 階段 · 啟動獨立只讀審閱

主工作階段的“全部完成”只能當線索。另開一個普通終端機，在同一個練習倉庫啟動第二個工作階段：

```bash
pi --name "CASE 08 獨立審閱" --no-extensions --no-skills --no-context-files \
  --skill ../pi-bluebook-graduation-materials/bluebook-graduation-review/SKILL.md \
  --tools read,grep,find,ls
```

`--no-skills` 關閉自動發現，顯式 `--skill` 仍會載入指定技能。審閱工作階段不開放 `write`、`edit` 或 `bash`，只透過內建讀取和搜尋工具交付發現。它不能自行執行 Git 或構建；相關檢查由人在普通終端機執行。這限制了工具能力，但仍不等於作業系統沙箱。傳送：

```text
使用 bluebook-graduation-review 審閱當前工作樹。
需求檔案是 ../pi-bluebook-graduation-materials/requirements.md。

讀取需求中允許的檔案，檢查正文、導航和對應繁體頁是否一致。
不要寫檔案、執行命令或安裝依賴。Git 差異和構建結果由我提供；
未提供或無法獨立核對的過程證據必須標為“證據不足”。
逐項給出透過、失敗或證據不足，並附路徑與行號。
```

在另一個普通終端機執行 `git status --short`、`git diff --check`、`git diff`、`npm run check:translations` 和 `npm run docs:check`，把結果交給審閱工作階段。新檔案不會顯示在普通 `git diff` 中，要逐一開啟新增的簡繁頁面核對。

一份可信審閱不應該只說“透過”。例如，它可以確認當前差異只包含允許路徑，卻無法僅憑最終工作樹證明過去從未執行過某個禁止命令；後一項應該誠實標為“證據不足”。

## 第 4 階段 · 處理發現並更新檢查點

把審閱結果交回主工作階段。沒有發現就不要為了製造工作量而修改；有失敗項時，只修正會阻塞需求的問題：

```text
這是獨立審閱結果：
（貼上審閱結果）

重新讀取需求和檢查點。只處理失敗項；“證據不足”不得改寫成“已證明”。
修正後重新執行受影響的檢查並更新檢查點。若沒有阻塞項，不修改網站檔案。
```

這個來回就是最小的子代理（Subagent）協作閉環：主工作階段對實現負責，審閱工作階段對發現負責，人對範圍和最終判斷負責。

## 第 5 階段 · 人工畢業驗收

最後不要問 Pi“真的完成了嗎”。在普通終端機親自執行：

```bash
npm run check:translations
npm run docs:check
git diff --check
git status --short
git diff -- docs/reference/index.md docs/.vitepress/config/navigation.mts \
  docs/zh-TW/reference/index.md docs/.vitepress/config/navigation.zh-tw.mts
sed -n '1,200p' docs/reference/task-completion-checklist.md
sed -n '1,200p' docs/zh-TW/reference/task-completion-checklist.md
```

逐項開啟並確認：

- 新頁面有 frontmatter、一個一級標題和四個指定二級標題；
- 三個課程連結在專案中都有對應頁面；
- 簡繁兩種語言的參考手冊首頁和側欄都指向本語言的新頁面；
- 繁體內容由同步指令碼生成，`check:translations` 透過；
- 檢查結果來自這次真實執行，不是複製的文字；
- `worklog/` 仍是本地記錄，沒有進入提交；
- 沒有構建產物、依賴目錄或快取混入 Git 狀態。

如果還要檢查視覺結果，執行 `npm run docs:dev`，開啟終端機顯示的本地地址，再進入“參考手冊 → 任務完成檢查表”。本案例禁止部署，所以線上狀態應該寫“未部署”，不能虛構線上透過。

## 維護者真實復現記錄

早期單語言練習在 2026 年 9 月 11 日用 Pi `0.80.10` 復現過。隨後倉庫增加了繁體同步要求，舊的“三檔案”範圍已經不適用；不能用舊檢查頁數證明新版透過。

2026 年 9 月 12 日，維護者透過自動化操作，在 macOS 全新克隆 `ea68e5f` 上用 Pi `0.84.3` 重跑了新版流程：計劃階段僅寫檢查點，批准後生成簡繁頁面，獨立審閱只開放 `read,grep,find,ls`。另行執行 `check:translations`、`docs:check` 和 `git diff --check` 均透過；練習產物為 123 個構建頁面、1654 個有效錨點，兩套搜尋索引透過檢查。實際差異僅為需求允許的七個路徑。審閱保留了“最終工作樹不能證明全部歷史操作”的證據邊界。

這次驗證的是自動化維護復現，不是 Windows 實機記錄，也不代替讀者自己的人工驗收。復現時請在檢查點記錄你的 Pi 版本、倉庫提交號、日期，以及每條檢查命令的真實結果。

![早期隔離克隆中實際生成的任務完成檢查表頁面](/images/cases/graduation-project-output.png)

<small>歷史練習輸出，展示頁面形態；當前驗收以簡繁兩套頁面和當次檢查結果為準。</small>

## 前 14 課在這裡怎樣匯合

| 已學內容 | 在畢業專案中的動作 |
| --- | --- |
| 第 1–4 課：安裝、模型、工作目錄 | 檢查 Pi、進入全新克隆，並確認起始狀態 |
| 第 5–7 課：任務、檔案、工作階段 | 讀取需求與倉庫，用命名工作階段分兩輪完成 |
| 第 8–9 課：上下文、壓縮、Cache | 觀察上下文增長，先寫檢查點，必要時才壓縮；不把快取當完成證據 |
| 第 10–12 課：技能、擴充功能、子代理 | 主任務判斷無需擴充功能；審閱時顯式載入只讀技能，並隔離第二個工作階段 |
| 第 13–14 課：長任務、安全與驗收 | 儲存檢查點、限制路徑和動作、獨立執行檢查、保留未知 |

## 畢業判定

同時滿足下面五項才算完成：

1. **範圍透過：** 只出現需求允許的路徑；
2. **過程透過：** 先計劃、人工批准、再實施，檢查點能支援中斷恢復；
3. **結果透過：** 專案檢查與差異檢查由你親自執行並透過；
4. **審閱透過：** 獨立工作階段只開放讀取與搜尋工具，人工檢查與審閱發現被逐項處理；
5. **解釋透過：** 你能說明工作階段與上下文、技能與擴充功能、壓縮與檢查點、Agent 自述與真實證據的區別。

如果你只能展示最終頁面，卻說不清中間的邊界，這次任務完成了，但課程還沒有畢業。

## 失敗恢復

- 計劃階段出現網站檔案變化：立刻停止，記錄差異；不要用覆蓋整個倉庫的方式恢復。
- 構建失敗：保留完整錯誤、當前差異和檢查點，只修最小問題。
- 上下文丟失關鍵約束：讓 Pi 重新讀取需求與檢查點，不憑記憶繼續。
- 審閱發現範圍外變化：先查明來源；無法區分已有變化與本次變化時寫“證據不足”。
- 任務中斷：重新克隆不是第一選擇；先用工作階段、檢查點和真實 Git 狀態恢復現場。

## 依據

- [Pi 使用說明：工作階段、工具與資源引數](https://pi.dev/docs/latest/usage)
- [Pi 技能：顯式載入與漸進披露](https://pi.dev/docs/latest/skills)
- [Pi 壓縮：觸發條件與上下文重建](https://pi.dev/docs/latest/compaction)
- [Pi 工作階段：儲存、續寫與恢復](https://pi.dev/docs/latest/sessions)
