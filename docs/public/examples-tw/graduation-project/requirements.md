# CASE 08 · 畢業專案需求

## 專案

- GitHub 倉庫：`https://github.com/xiaomoBoy/pi-bluebook`
- 技術棧：VitePress
- 工作方式：在本地克隆倉庫後完成，不部署、不提交、不推送。

## 目標

為參考手冊新增一頁“任務完成檢查表”，幫助初學者在 Pi 報告完成後，從真實檔案、命令結果和線上狀態三個層面獨立驗收。

## 允許修改的檔案

1. 新建 `docs/reference/task-completion-checklist.md`
2. 修改 `docs/reference/index.md`
3. 修改 `docs/.vitepress/config/navigation.mts`
4. 由 `npm run sync:zh-tw` 生成 `docs/zh-TW/reference/task-completion-checklist.md`
5. 由同一指令碼更新 `docs/zh-TW/reference/index.md`
6. 由同一指令碼更新 `docs/.vitepress/config/navigation.zh-tw.mts`
7. 新建或更新 `worklog/graduation-checkpoint.md`

簡體是內容源，繁體必須由指令碼生成。除上述路徑外，不修改其他專案檔案。`worklog/` 是本次本地練習記錄，不應加入提交。

## 頁面要求

`docs/reference/task-completion-checklist.md` 必須包含：

- VitePress frontmatter：`title` 與 `description`
- 一級標題：`任務完成檢查表`
- 四個二級標題：
  - `開始前`
  - `執行中`
  - `完成後`
  - `失敗與恢復`
- 至少連結到以下三個現有頁面：
  - `/guide/first-task`
  - `/guide/context-and-compaction`
  - `/guide/safety`
- 明確寫出：“Agent 的完成報告只是線索，不是完成證明。”

## 導航要求

- 在 `docs/reference/index.md` 增加新頁面入口。
- 在 `docs/.vitepress/config/navigation.mts` 的參考手冊側欄增加“任務完成檢查表”。
- 不改變其他頁面的標題、排序和連結。

## 驗收要求

1. `npm run check:translations` 與 `npm run docs:check` 均透過。
2. Git 差異只包含本需求允許的專案檔案；依賴目錄、構建產物與快取不得進入差異。
3. 簡體和繁體的新頁面都能從各自語言的參考手冊首頁和側欄到達。
4. 三個課程連結都能在專案中找到對應頁面。
5. 頁面四個階段完整，沒有把“Pi 回覆完成”寫成最終證據。

## 禁止事項

- 不部署網站。
- 不執行 `git add`、`git commit` 或 `git push`。
- 不修改或讀取憑據檔案。
- 不安裝新的套件（Package）、擴充功能（Extension）或系統依賴。
- 不用刪除、覆蓋或重置整個倉庫的方式恢復錯誤。

如果倉庫結構與需求不一致，先把差異寫入檢查點並停止，不自行擴大修改範圍。
