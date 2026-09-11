---
title: 長時間任務與 VPS
description: 理解本地電腦與 VPS 執行 Pi 的取捨，為長任務設計檢查點。
prev:
  text: 子代理 如何分工
  link: /zh-TW/guide/subagents
next:
  text: 權限、隔離與驗收
  link: /zh-TW/guide/safety
---

<span class="library-status">MODULE 05 · STEP 13 · 可練習</span>

# 長時間任務與 VPS

當 Pi 開始處理數小時的整理、檢查或構建任務，本地電腦會遇到合蓋休眠、網路切換和終端機視窗被關閉等問題。我個人後來把一部分長任務放到 VPS，主要是為了讓執行環境更穩定，不需要讓自己的 Mac 一直保持喚醒。

這是我的使用方式，不是所有人的必選項。

::: info 先看門檻
沒有已經能獨立 SSH 登入的 VPS，不需要為了本課購買伺服器。先在本地完成“檢查點與恢復”練習即可。下面的 tmux 操作只適合已經能登入自己 VPS 的讀者；命令輸入在遠端普通終端機，不是在 Pi 編輯區。
:::

::: warning VPS 不會自動保持前臺任務
如果你通過 SSH 登入 VPS，然後直接在前臺啟動 Pi，SSH 斷開後進程仍可能結束。VPS 提供持續開機的環境，`tmux` 等持久終端機工具才讓你斷開後能重新連回同一個終端機工作階段。
:::

## 先判斷是不是真的需要 VPS

適合先留在本地的情況：

- 你剛開始學 Pi，還在做幾分鐘的練習。
- 任務依賴本地應用、圖片或私密檔案。
- 你還不熟悉 SSH、Linux 檔案路徑與權限。

開始考慮 VPS 的情況：

- 任務需要長時間執行，且不希望被本地休眠打斷。
- 工作材料可以明確放在遠端專案目錄，不依賴本地介面。
- 你已經知道如何限制權限、儲存工作階段、檢視程序和備份產物。

## 遠端穩定不等於任務可靠

VPS 不會自動解決方向跑偏、上下文丟失、憑據不足或輸出質量不合格。它只是讓程序更容易持續執行。每個長任務仍然需要：

1. 可以檢視的階段產物。
2. 明確的停止條件和失敗處理。
3. 定期檢查點，而不是放著不管。
4. 完成後的獨立驗收與備份。

## 用 tmux 保留終端機工作階段

本節只給出最小概念，不包括 VPS 購買、SSH 加固和防火牆配置。在已安裝 `tmux` 的 VPS 中，可以建立一個有名字的終端機工作階段：

```bash
tmux new -s pi-work
```

進入後，再切換到正確專案目錄並啟動 Pi。想暫時離開而不結束工作階段，先按 `Ctrl+B`，鬆開後再按 `D`。之後重新登入 VPS，執行：

```bash
tmux attach -t pi-work
```

重新連入後，親眼檢視 Pi 是否還在執行、當前是否等待輸入，並檢查階段產物。能夠連回 tmux 只能證明終端機工作階段仍然存在，不能單獨證明 Pi 任務沒有失敗。

### 常見情況怎麼停下來

| 現象 | 下一步 |
| --- | --- |
| `tmux: command not found` | 不繼續照抄命令；按 VPS 系統的官方包管理說明安裝，或先只做本地練習 |
| 工作階段名 `pi-work` 已存在 | 用 `tmux attach -t pi-work` 檢視，不新建同名工作階段 |
| `can't find session` | 執行 `tmux ls` 核對真實名稱；沒有任何工作階段時說明舊工作階段已結束 |
| 重新連入後只看到普通 shell | Pi 已經退出或從未啟動；先檢查產物和日誌，不直接宣稱任務仍在執行 |
| 組合鍵變成普通換行 | 核對 tmux 擴充按鍵配置；不要連續提交未完成的多行任務 |

Pi 官方當前建議 tmux 3.5 及以上啟用 `extended-keys` 和 `csi-u`，以區分 `Enter`、`Shift+Enter` 與 `Ctrl+Enter`。修改 `~/.tmux.conf` 會影響你的遠端終端機環境；先閱讀[官方 tmux 設定](https://pi.dev/docs/latest/tmux)，不要為了本課盲改現有配置。

## 一份可複用的長任務說明

```text
目標：整理 source 目錄中的文章，建立內容清單。
範圍：只讀 source，只寫 output。
階段產物：每處理 20 篇，更新 output/progress.md。
停止條件：遇到損壞檔案、需要登入或準備存取其他目錄時停止。
驗收：給出檔案數、失敗列表、生成檔案和複核命令。
```

如果這些邊界在本地還沒跑通，換到 VPS 只會讓除錯更遠。先用小樣本驗證，再把同一套工作流搬到遠端。

## 本地實作：中斷後從檢查點繼續

下載三篇很短的虛構材料和進度模板。下面的命令輸入在本地普通終端機；先固定回到自己的練習目錄：

```bash
cd ~/Downloads/pi-practice
pwd
mkdir -p long-task/source long-task/output
for name in article-a article-b article-c; do
  curl -fL "https://pi.xiaomovps.com/examples/long-task/source/${name}.md" \
    -o "long-task/source/${name}.md"
done
curl -fL https://pi.xiaomovps.com/examples/long-task/progress-template.md \
  -o long-task/progress.md
```

執行 `find long-task -type f -print`。第一次練習開始前只能看到三篇 `source` 材料和 `progress.md`，`long-task/output/` 必須為空。如果目錄中已有舊輸出，換用一個新的目錄名；不要用 `mkdir -p` 覆蓋式地接著追加，否則會把上一次結果重複計入。

確認 `pwd` 以你的練習目錄名結尾後，在普通終端機啟動第一次工作階段：

```bash
pi --name "檢查點練習-第一步"
```

看到 Pi 狀態列仍指向同一練習目錄，再讓它只處理第一篇並更新檢查點。任務中固定要求每篇在索引裡使用二級標題，便於後面的數量檢查：

```text
讀取 long-task/progress.md 和 long-task/source/article-a.md。
在 long-task/output/index.md 中用“## 檔名”作為二級標題，下一行寫原文標題與一句話摘要，
再更新 long-task/progress.md 的已完成數量、已處理檔案和下一步。
只處理這一篇，然後停止等待我驗收。
```

輸入 `/quit` 退出 Pi，獨立開啟 `long-task/output/index.md` 與 `long-task/progress.md`。確認已完成數是 1、已處理列表只有 `article-a.md`、下一步指向尚未處理的檔案。隨後在同一個普通終端機確認 `pwd`，啟動新工作階段：

```bash
pwd
pi --name "檢查點練習-恢復"
```

狀態列仍指向同一練習目錄後傳送：

```text
先讀取 long-task/progress.md，再列出 long-task/source 中尚未處理的檔案。
逐篇完成剩餘檔案；在 long-task/output/index.md 中繼續用“## 檔名”作二級標題，
每完成一篇就同時更新 long-task/output/index.md 和 long-task/progress.md。
不要重複已經記錄為完成的檔案。遇到損壞或無法讀取的檔案時記錄到失敗列表並停止。
```

最後在普通終端機檢查數量：

```bash
find long-task/source -type f -name '*.md' | wc -l
grep -c '^## ' long-task/output/index.md
```

兩個數字都應為 `3`，並且 `long-task/progress.md` 的已完成數、已處理檔案和失敗列表與實際檔案一致。數字一致仍不代表摘要正確，還要逐篇開啟原文與索引核對。

![在真實終端機中核對原始檔、索引條目與檢查點](/images/07-Pi-长任务检查点-实操图.png)

截圖把三個獨立訊號放在同一窗口裡：原始檔數是 3，索引條目數是 3，進度檔案也記錄了三篇已處理且失敗項為空。三處一致後再逐篇核對摘要內容；數字相等只能證明數量沒有明顯缺口。

## 本課驗收

- 你能從 `long-task/progress.md` 判斷已經處理什麼、下一步是什麼，而不是依賴舊工作階段自述。
- 中斷後沒有重複或漏掉三篇材料，失敗項不會被悄悄跳過。
- 如果使用 VPS，能脫離 tmux、重新連接同一工作階段，並分別判斷“終端機仍在”與“任務已完成”。

### 個人記錄

- [我把 Pi 長時間放在 VPS 執行的原因](https://x.com/xiaomovps/status/2093242314764537867)

### 參考資料

- [Pi with tmux](https://pi.dev/docs/latest/tmux)

tmux 相關說明核驗於 2026-09-09。

tmux 可以保留終端機工作階段，但不會在 VPS 重啟、程序崩潰或記憶體不足後自動恢復 Pi。關於 tmux 工作階段本身的命令與生命週期，另見 [tmux 官方手冊](https://github.com/tmux/tmux/wiki/Getting-Started)。
