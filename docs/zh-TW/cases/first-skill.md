---
title: CASE 03 · 把方法整理成 技能
description: 顯式載入一個教學 技能，複用行動清單的核對規則。
prev: { text: CASE 02 · 壓縮前後, link: /zh-TW/cases/compaction-before-after }
next: { text: CASE 04 · 最小 擴充功能, link: /zh-TW/cases/first-extension }
---

<span class="library-status">CASE 03 · 可練習</span>

# 把方法整理成 技能（Skill）

## 結果

將“指定輸入、固定四個欄位、未知不猜、寫後複核”固化為可讀取的 技能，並生成一份複核版行動清單。

## 固定材料

- 輸入：<a href="/examples-tw/first-task/meeting-notes.md" download>CASE 01 的虛構會議記錄</a>
- 技能：<a href="/examples-tw/skill/action-list-review/SKILL.md" download>下載 action-list-review/SKILL.md</a>

## 1. 下載並審查

在普通終端機準備獨立練習目錄，不要求先完成 CASE 01：

```bash
cd ~/Downloads/pi-practice
mkdir -p input output bluebook-examples/action-list-review
curl -fL https://pi.xiaomovps.com/examples/first-task/meeting-notes.md \
  -o input/專案會議記錄.md
curl -fL https://pi.xiaomovps.com/examples/skill/action-list-review/SKILL.md \
  -o bluebook-examples/action-list-review/SKILL.md
shasum -a 256 input/專案會議記錄.md > input-before.sha256
sed -n '1,160p' bluebook-examples/action-list-review/SKILL.md
```

Windows 使用者把第一行換成 `cd ~/pi-practice`，並把 `shasum -a 256` 換成 `sha256sum`。技能 正文應該只有 `name`、`description` 和圍繞會議記錄的檢查規則；出現不相關命令時停止。

## 2. 顯式載入並提交任務

在普通終端機執行：

```bash
pi --no-skills --skill ./bluebook-examples/action-list-review/SKILL.md
```

進入 Pi 後傳送：

```text
/skill:action-list-review 請重新核對 input/專案會議記錄.md，
把結果寫入 output/行動清單-複核版.md。不要修改輸入檔案；
原文沒有的資訊寫“原文未說明”。完成後重新讀取輸出並報告路徑。
```

如果 `/skill:action-list-review` 沒出現，先在 `/settings` 檢查 技能 commands，再重新啟動；不要把檔案複製到多個自動發現目錄碰運氣。

先讀完整個 `SKILL.md`，再使用 `--no-skills --skill <路徑>` 顯式載入。不要把看不懂的工作說明直接放進自動發現目錄。

![教學 技能 的真實載入狀態與顯式呼叫位置](/images/05-Pi-Skill显式加载-实操图.png)

圖中底部內容仍未提交，方便你在執行前最後一次核對 技能 名稱、輸入路徑和當前工作目錄。

[第 10 課](/zh-TW/guide/skills-extensions-packages)解釋三類擴充的邊界；本頁已包含完成案例所需的全部操作。

## 關鍵現象

同一條任務在顯式載入 技能 後，多了一套可見、可複核的檢查規則；技能 沒有替你提供輸入，也不會自動證明輸出正確。驗收仍然回到固定原文、輸出檔案和輸入指紋。

## 獨立驗收

退出 Pi 後執行：

```bash
test -f output/行動清單-複核版.md && echo "PASS: 複核版存在"
shasum -a 256 -c input-before.sha256
sed -n '1,160p' output/行動清單-複核版.md
```

Windows Git Bash 把 `shasum -a 256 -c` 換成 `sha256sum -c`。

- 實際載入的檔案與檢查過的檔案是同一個路徑。
- 輸出為新檔案，輸入指紋不變。
- 三項均有事項、負責人、日期、限制；缺失資訊不會被編造。
- 退出本次 Pi 後不再傳入 `--skill`，該教學 技能 不會繼續載入。

## 失敗恢復

技能 沒被使用時，核對路徑、後設資料和啟動引數；結果錯誤時回到原文驗收，不先改 技能 來掩蓋一次任務錯誤。來源或內容異常時停止載入。
