---
title: 序章：先認識 Pi 的作者 Mario Zechner
description: 從 libGDX、RoboVM 到 Pi 與 Earendil，沿時間線理解 Mario Zechner 的經歷怎樣進入 Pi 的設計。
prev:
  text: 凡例與本版說明
  link: /zh-TW/guide/edition-2026
next:
  text: 第 1 課 · 安裝前檢查
  link: /zh-TW/guide/before-install
---

<span class="library-status">PROLOGUE · 作者與作品</span>

# 先認識 Pi 的作者 Mario Zechner

在安裝 Pi 之前，先花一點時間認識它的作者。

Mario Zechner 是一名軟體開發者、教練、演講者和天使投資人。他在個人網站中概括自己有 15 年以上的學術、創業、工業與開源經歷，技術工作橫跨計算機圖形、編譯器、資料科學和應用機器學習。Pi 並不是他第一次做開發工具，也不是一次突然轉向 AI 的偶然嘗試。它背後連著十多年開源專案、商業化得失和工具設計經驗。

![Mario Zechner 的個人網站與文章目錄](/images/mario-zechner/01-mario-website.webp)

<p class="image-caption">Mario 的個人網站把他的身份寫成 developer、coach、speaker。截圖保留於 2026-09-09；頁面內容會繼續更新。</p>

::: info 怎樣閱讀這篇時間線
這是一份公開職業經歷時間線，不是私人傳記。年份與事實優先採用 Mario 本人的文章、libGDX 官方歷史和 Pi 官方頁面；公開來源沒有明確寫出的出生年份、學歷和私人經歷不作推測。文中的“影響了 Pi”是結合其公開表述所作的編輯分析，會與事實敘述分開。
:::

## 一眼看完這條時間線

| 時間 | 階段 | 留下的東西 |
| --- | --- | --- |
| 2009 | 從 Android 遊戲開發問題出發製作 AFX | 先解決自己的真實痛點 |
| 2010—2014 | AFX 開源並發展為 libGDX，釋出 1.0 | 跨平台框架、開源社群與可擴充底座 |
| 2013—2016 | 參與 RoboVM 商業化，經歷收購、閉源與停運 | 對開源控制權和商業邊界的長期警惕 |
| 2016—2024 | 逐步交接 libGDX，繼續獨立開發、諮詢、教學與公共專案 | 讓專案脫離個人後仍能繼續維護 |
| 2025 | 深入使用 Coding Agent，參與 VibeTunnel，開發 Sitegeist 與 Pi | 從使用別人的 Agent 走向製作自己的代理框架（Agent Harness） |
| 2026-04 | 加入 Earendil，帶著 Pi 進入團隊 | 在家庭、開源持續性與商業支援之間找平衡 |
| 2026 至今 | 繼續負責 Pi 的技術方向，核心保持 MIT | “底座保持小，工作流由使用者決定” |

## 2009：一切從 Android 遊戲開發的不順手開始

2009 年中，Mario 為了製作 Android 遊戲，開始開發一個叫 AFX（Android Effects）的框架。當時把改動部署到 Android 裝置上測試很麻煩，他便讓同一套程式碼也能在桌面執行。這個看似具體的小問題，後來變成了 libGDX 最重要的特徵之一：用一套開發方式覆蓋多個平台。

這段起點很能說明 Mario 後來的工作方法。他通常不是先設計一個宏大的平台，而是先遇到自己無法忍受的摩擦，再做一個足夠小、自己每天願意使用的工具。

## 2010—2014：libGDX 從個人工具變成開源框架

2010 年 3 月，Mario 將 AFX 以 LGPL 許可證開源；2010 年 3 月 6 日，第一批 libGDX 程式碼公開。專案很快迎來貢獻者，並在教程、安裝體驗和功能逐步完善後被更多 Android 遊戲開發者採用。

![libGDX 官方歷史頁面](/images/mario-zechner/02-libgdx-history.webp)

<p class="image-caption">libGDX 官方歷史從 2009 年的 AFX 講起，記錄了專案開源、社群增長和後續交接。截圖保留於 2026-09-09。</p>

2012 年以後，libGDX 繼續擴充到 HTML5/WebGL、iOS，並遷向 GitHub、Maven 等更成熟的協作和依賴體系。2014 年 4 月 20 日，經過四年開發，libGDX 1.0 正式釋出。

libGDX 後來被很多遊戲和工具採用。需要特別分清：Mario 並沒有參與制作《殺戮尖塔》；這款遊戲使用的是他發起的 libGDX 框架。Ingress 也使用過 libGDX，而 Pokémon Go 沒有。真正值得關注的不是“某款名作與作者有關”，而是一個個人開源框架最終成了別人創造作品的底座。

![libGDX Showcase 中的 Slay the Spire](/images/mario-zechner/08-libgdx-slay-the-spire.webp)

<p class="image-caption">libGDX 官方 Showcase 收錄了使用該框架製作的《殺戮尖塔》。框架作者與遊戲作者不是同一件事。</p>

## 2013—2016：RoboVM 帶來的商業化經驗與教訓

為了讓 Java/JVM 應用進入 iOS，libGDX 社群採用了 RoboVM。RoboVM 能把 JVM 程式碼提前編譯並執行在 iOS 上，Mario 很早加入團隊，負責第一個商業專有元件——偵錯程式。團隊隨後擴張，並補齊 IDE、Xcode storyboard 整合等商業能力。

RoboVM 後來被 Xamarin 收購，開源核心隨之閉源；Xamarin 再被微軟收購後，RoboVM 被停止。Mario 在 2026 年的回顧中直言，這段經歷讓他對風險投資支援的創業和開源商業化長期保持警惕。他不是控股股東，卻要面對社群對於閉源決定的批評。

但這段歷史也留下另一個結果：libGDX 貢獻者從舊程式碼分叉出 MobiVM，並逐步恢復能力，繼續支撐 libGDX 的 iOS 後端。對 Mario 來說，“任何人都可以分叉”不是許可證頁面上的裝飾，而是一條親歷過的專案生存路徑。

## 2016—2024：把專案交出去，也把技術帶到公共問題裡

2016 年前後，Mario 將 libGDX 的主要維護工作交給核心貢獻者團隊。libGDX 官方歷史記載，2017 年出現了第一個不是由 Mario 釋出的版本。專案並沒有因此停下，後來仍持續更新、遷移構建系統並舉辦社群活動。

這段時期裡，他繼續參與建立在 libGDX 之上的商業工具 Spine，也以獨立開發者、顧問、教練、演講者和投資人的身份工作。他還把資料與軟體能力用於食品價格、公共政策和社會議題。個人網站對這段經歷的概括不是某一個連續職位，而是學術、創業、工業、開源和公共參與的組合。

這一階段對理解 Pi 很重要：一個健康的開源專案不應該只能靠作者永遠親自扛著；工具也不必替使用者決定最終要做什麼。

## 2025：從重度使用 Coding Agent 到自己製作 Pi

2025 年 4 月，Mario 開始密集使用 Claude Code。他喜歡早期版本的簡單和可預測，卻逐漸無法接受工具不斷加入自己不需要的功能、隱藏上下文、改變系統提示與模型行為。他想看清模型實際收到什麼、儲存可處理的完整工作階段（Session），並能自由切換模型、工具和介面。

同年 5 月，他與 Peter Steinberger、Armin Ronacher 一起製作 VibeTunnel；之後又開發瀏覽器 Agent Sitegeist。到了 2025 年，他開始把多年使用 LLM 與開發 Agent 的經驗收束成 Pi：先寫統一多模型介面 `pi-ai`，再寫 Agent 迴圈、終端機介面和最終的 Coding Agent。

![Mario 講述構建極簡 Coding Agent 的文章](/images/mario-zechner/03-pi-building-article.webp)

<p class="image-caption">Mario 於 2025-11-30 釋出長文，系統解釋 Pi 的組成與取捨。截圖中的終端機記錄來自作者頁面。</p>

他的公開原則很直接：如果自己不需要，就不把它做進核心。Pi 因此沒有把計劃模式、子代理（Subagent）、MCP、後臺命令或權限彈窗全部固化成唯一答案，而是提供擴充功能（Extension）、技能（Skill）、模板和主題，讓使用者自己組合。

這不是“功能少所以還沒做完”，而是一種帶立場的產品設計：核心只提供原語，把工作流的決定權留給使用者。

## 2026：Pi 從個人專案走向 Earendil

Pi 被越來越多專案採用，其中包括建立在 Pi 之上的 OpenClaw。關注度隨之上升，Mario 收到投資與工作邀約，也面臨是否圍繞 Pi 獨自創業的選擇。

他最終沒有成立一家只圍繞 Pi 的高壓創業公司。Mario 在《I've sold out》中寫得很清楚：他希望陪伴年幼的孩子，也希望組建小團隊讓 Pi 的開源開發能夠持續，同時避免重演 RoboVM 的歷史。

2026 年 4 月 8 日，他宣佈加入 Armin Ronacher 等人所在的 Earendil，並帶著 Pi 一起進入團隊。Pi 的所有權歸 Earendil；Mario 是公司股東，並與 Armin、Colin 一起負責 Pi 的決策，繼續主導技術方向、路線、合併與開源邊界。

![Mario 宣佈加入 Earendil 的文章](/images/mario-zechner/04-earendil-announcement.webp)

<p class="image-caption">《I've sold out》不是一句簡單的“專案被賣了”。文章主體討論的是家庭選擇、開源持續性、RoboVM 的教訓與 Pi 的治理安排。</p>

專案倉庫隨後從 Mario 的個人帳號遷入 Earendil 組織，軟體包名稱也調整為 `@earendil-works/pi-coding-agent`。截至本頁核驗時，Pi 核心仍使用 MIT License，官方站點是 `pi.dev`。

![Pi 官方網站首頁](/images/mario-zechner/07-pi-homepage.webp)

<p class="image-caption">Pi 官網把專案定義為 minimal 代理框架：讓 Pi 適應你的工作流，而不是反過來。</p>

![Mario Zechner 的 X 主頁](/images/mario-zechner/05-mario-x-profile.webp)

<p class="image-caption">Mario 的公開帳號是 <a href="https://x.com/badlogicgames">@badlogicgames</a>。關注人數和簡介屬於動態資訊，截圖僅代表 2026-09-09 的頁面狀態。</p>

![Pi 的 X 主頁](/images/mario-zechner/06-pi-x-profile.webp)

<p class="image-caption">Pi 的公開帳號是 <a href="https://x.com/pidotdev">@pidotdev</a>；官網與文件仍應以 <a href="https://pi.dev/">pi.dev</a> 為準。</p>

## 這條時間線怎樣幫助你理解 Pi

如果只看功能表，Pi 很容易被理解成“又一個終端機 Coding Agent”。把 Mario 的經歷連起來以後，幾個設計選擇會變得更清楚：

- **為什麼核心保持克制：** libGDX 和 Pi 都從作者自己的真實問題出發，而不是從功能數量出發。
- **為什麼強調可擴充：** 一個底座的價值，在於別人能在上面製作自己的工具和作品。
- **為什麼重視可見的上下文與工作階段：** Mario 不願讓代理框架在背後替使用者做太多無法檢查的決定。
- **為什麼堅持可分叉的開源核心：** RoboVM 的閉源與社群分叉讓這件事不再只是理念。
- **為什麼加入團隊但保留技術主導：** 這是在開源持續性、商業支援與個人生活之間尋找的一次現實安排。

所以，學習 Pi 不只是記住命令。你接下來會看到的工作階段樹、最小工具集、擴充功能和技能，都可以在這條經歷裡找到來處。

## 主要公開來源

- [Mario Zechner 個人網站與自我介紹](https://mariozechner.at/)
- [libGDX 官方歷史](https://libgdx.com/history/)
- [Mario：What I learned building an opinionated and minimal coding agent](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/)
- [Mario：I've sold out](https://mariozechner.at/posts/2026-04-08-ive-sold-out/)
- [Pi 官方網站](https://pi.dev/)
- [Pi 當前 GitHub 倉庫](https://github.com/earendil-works/pi)

::: warning 截圖與權利說明
本頁截圖來自 Mario Zechner、libGDX、Pi 與 X 的公開頁面，用於人物與專案歷史說明；第三方頁面、商標、遊戲畫面與截圖內容不包含在本站原創內容的 MIT License 中，其權利歸各自權利人所有。
:::

[繼續第 1 課：安裝前檢查 →](/zh-TW/guide/before-install)
