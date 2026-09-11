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

練習倉庫使用 [Pi 學習藍皮書](https://github.com/xiaomoBoy/pi-bluebook)。任務是在參考手冊中新增“任務完成檢查表”，同時接入首頁與側欄。需求刻意限制為三個網站檔案和一個本地檢查點，足以練習真實專案流程，又不會把注意力帶到複雜業務程式碼上。

先下載三份固定材料：

- <a href="/examples-tw/graduation-project/requirements.md" download>畢業專案需求</a>
- <a href="/examples-tw/graduation-project/checkpoint-template.md" download>檢查點模板</a>
- <a href="/examples-tw/graduation-project/bluebook-graduation-review/SKILL.md" download>獨立審閱技能</a>

::: warning 安全邊界
始終在新克隆的練習倉庫中操作。全程不部署，不執行 `git add`、`git commit` 或 `git push`，也不讀取憑據。命令裡的工具白名單會減少可用工具，但不是作業系統沙箱。
:::

## 第 0 階段 · 準備隔離副本

在普通終端機執行：

```bash
cd ~/Downloads
git clone https://github.com/xiaomoBoy/pi-bluebook.git pi-bluebook-graduation
cd pi-bluebook-graduation
npm ci
git status --short
```

如果 `pi-bluebook-graduation` 已存在，換一個新目錄名，不要覆蓋舊目錄。初始 `git status --short` 應該沒有輸出。

把三份材料放在倉庫旁邊，而不是放進倉庫：

```bash
cd ..
mkdir -p pi-bluebook-graduation-materials/bluebook-graduation-review
curl -fL https://pi.xiaomovps.com/examples/graduation-project/requirements.md \
  -o pi-bluebook-graduation-materials/requirements.md
curl -fL https://pi.xiaomovps.com/examples/graduation-project/checkpoint-template.md \
  -o pi-bluebook-graduation-materials/checkpoint-template.md
curl -fL https://pi.xiaomovps.com/examples/graduation-project/bluebook-graduation-review/SKILL.md \
  -o pi-bluebook-graduation-materials/bluebook-graduation-review/SKILL.md
cd pi-bluebook-graduation
```

開啟三份材料檢查內容。需求檔案是驗收合同，模板規定檢查點欄位，技能只規定審閱方法；任何一份都不應包含安裝或部署指令。

## 第 1 階段 · 建立主工作階段，只做計劃

啟動一個有名字的工作階段：

```bash
pi --name "CASE 08 畢業專案" --no-extensions --no-skills \
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

此時只應出現 `worklog/`。檢查點應準確列出三個網站檔案、一個本地記錄、專案自帶檢查命令和禁止動作；倉庫結構不一致的地方必須寫成未知。範圍正確後，才批准實施。

## 第 2 階段 · 在同一工作階段實施

繼續剛才的工作階段；如果已經退出，可在倉庫目錄執行 `pi --resume` 選擇“CASE 08 畢業專案”。然後傳送：

```text
計劃已批准。繼續讀取需求和 worklog/graduation-checkpoint.md，
只實施需求允許的三個網站檔案。

完成後執行 npm run docs:check、git diff --check 和 git status --short，
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
pi --name "CASE 08 獨立審閱" --no-extensions --no-skills \
  --skill ../pi-bluebook-graduation-materials/bluebook-graduation-review/SKILL.md \
  --tools read,grep,find,ls,bash
```

`--no-skills` 關閉自動發現，顯式 `--skill` 仍會載入指定技能。審閱工作階段沒有 `write` 和 `edit`，職責上相當於只讀子代理（Subagent）：它只交付發現，不替主工作階段修正。傳送：

```text
使用 bluebook-graduation-review 審閱當前工作樹。
需求檔案是 ../pi-bluebook-graduation-materials/requirements.md。

bash 只允許執行 git status --short、git diff、git diff --check 和 npm run docs:check；
不得寫檔案、部署、安裝依賴或執行 Git 寫操作。
逐項給出透過、失敗或證據不足，並附路徑與行號。
```

一份可信審閱不應該只說“透過”。例如，它可以確認當前差異只包含允許路徑，卻無法僅憑最終工作樹證明過去從未執行過某個禁止命令；後一項應該誠實標為“證據不足”。

## 第 4 階段 · 處理發現並更新檢查點

把審閱結果交回主工作階段。沒有發現就不要為了製造工作量而修改；有失敗項時，只修正會阻塞需求的問題：

```text
這是獨立審閱結果：
（貼上審閱結果）

重新讀取需求和檢查點。只處理失敗項；“證據不足”不得改寫成“已證明”。
修正後重新執行受影響的檢查並更新檢查點。若沒有阻塞項，不修改網站檔案。
```

這個來回就是最小的子代理協作閉環：主工作階段對實現負責，審閱工作階段對發現負責，人對範圍和最終判斷負責。

## 第 5 階段 · 人工畢業驗收

最後不要問 Pi“真的完成了嗎”。在普通終端機親自執行：

```bash
npm run docs:check
git diff --check
git status --short
git diff -- docs/reference/task-completion-checklist.md \
  docs/reference/index.md docs/.vitepress/config/navigation.mts
```

逐項開啟並確認：

- 新頁面有 frontmatter、一個一級標題和四個指定二級標題；
- 三個課程連結在專案中都有對應頁面；
- 參考手冊首頁和側欄指向同一個新地址；
- 檢查結果來自這次真實執行，不是複製的文字；
- `worklog/` 仍是本地記錄，沒有進入提交；
- 沒有構建產物、依賴目錄或快取混入 Git 狀態。

如果還要檢查視覺結果，執行 `npm run docs:dev`，開啟終端機顯示的本地地址，再進入“參考手冊 → 任務完成檢查表”。本案例禁止部署，所以線上狀態應該寫“未部署”，不能虛構線上透過。

## 維護者真實復現記錄

這套流程在一個全新克隆中用 Pi `0.80.10` 實際跑過一次，日期為 2026 年 9 月 11 日：

- 主工作階段先只生成檢查點，經人工核對後才實施；
- 第二輪只修改三個網站路徑，並更新本地 `worklog/`；
- `npm run docs:check` 與 `git diff --check` 均真實透過；
- SEO 檢查報告 `52 indexable pages`；
- 獨立只讀工作階段逐項審閱後沒有發現範圍外變化和驗收阻塞項；
- 審閱者把“無法從工作樹證明全部歷史操作”保留為證據不足。

![隔離克隆中實際生成的任務完成檢查表頁面，參考手冊首頁和側欄均已出現入口](/images/cases/graduation-project-output.png)

<small>真實練習輸出截圖：全新克隆在本地執行，頁面沒有部署，也沒有提交。</small>

這些結果證明練習要求可以完成，不代表你的執行自動透過。版本、倉庫內容和本地環境變化後，仍以你當次看到的檔案和命令結果為準。

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
4. **審閱透過：** 獨立工作階段沒有修改權限，發現被逐項處理；
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
