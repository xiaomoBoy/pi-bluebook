---
title: 寫在藍皮書之外
description: 小墨關於 Pi 的個人感悟、學習過程、踩坑記錄與推文件案。
prev:
  text: 權限、隔離與驗收
  link: /zh-TW/guide/safety
next:
  text: 推文學習目錄
  link: /zh-TW/tweets/
---

<span class="library-status">XIAOMO'S NOTES · 藍皮書之外</span>

# 寫在藍皮書之外

這裡保留我的個人感悟、學習過程和判斷變化。很多判斷來自一次實作，後來讀到原始碼或文章，又會回頭修正早先的理解。它們不會被改寫成一條過分整齊的成功路線，也不承擔藍皮書教程的職責。

下面這段話是我決定整理藍皮書時寫下的原文。

<article class="tweet-entry tweet-entry-featured">

<span class="tweet-meta">2026-09-08 18:48:38 · 小墨原文</span>

> 準備把自己的Pi學習過程整理出來
>
> 不知道會有多少來看，但是分享本來就是一件有意義的事情，把它整理出來，本身也是一種對學習的回顧
>
> 這兩個月來，從簡單的Pi Agent到研究原始碼，分析裡面的內容怎麼一步一步的學習成長到自己開始寫外掛程式
>
> 開始只是純好奇，為什麼會有一個這麼簡潔的Agent的出現，為什麼Openclaw會選擇它當作基座去進行開發，後來我也慢慢懂得了原因
>
> 很建議大家在學習之餘去翻看一下作者的履歷，那不僅僅是簡單的歷史回顧，更是一種思想的碰撞，也回答了為什麼會這樣
>
> 不說那麼多了，開始動手了，然後你也感興趣，請在評論區告訴我👇

</article>

## 從時間線改成學習路線

98 條原文已經按六個階段整理。階段順序服務於學習，階段內部仍保留髮布時間。這樣既能讓新手知道先看什麼，也不會抹掉我當時認識事物的先後。

<div class="journey-stage-grid">

<a class="journey-stage-card" href="/zh-TW/tweets/01-meet-pi">
  <span>STAGE 01 · 27 篇原文</span>
  <strong>從好奇開始認識 Pi</strong>
  <small>先理解 Pi 是什麼、為什麼保持簡潔，以及 代理框架（Agent Harness） 會怎樣影響實際體驗。</small>
</a>

<a class="journey-stage-card" href="/zh-TW/tweets/02-first-tasks">
  <span>STAGE 02 · 25 篇原文</span>
  <strong>先把第一個任務做完</strong>
  <small>認識模型選擇、入門技巧和基礎介面，再回到一個可以獨立驗收的小任務。</small>
</a>

<a class="journey-stage-card" href="/zh-TW/tweets/03-sessions-context">
  <span>STAGE 03 · 7 篇原文</span>
  <strong>理解 工作階段（Session） 與上下文</strong>
  <small>弄清工作階段樹、長期記憶、壓縮、Token 與提示快取之間的關係。</small>
</a>

<a class="journey-stage-card" href="/zh-TW/tweets/04-skills-extensions">
  <span>STAGE 04 · 22 篇原文</span>
  <strong>搭建自己的 技能（Skill） 與 擴充功能（Extension）</strong>
  <small>從使用現成外掛程式走向整理方法、控制數量，再解決自己的真實需求。</small>
</a>

<a class="journey-stage-card" href="/zh-TW/tweets/05-subagents-research">
  <span>STAGE 05 · 7 篇原文</span>
  <strong>讓子代理（Subagent） 學會分工</strong>
  <small>學習怎樣拆分搜尋、整理、審閱任務，並檢查不同 Agent 交回的證據。</small>
</a>

<a class="journey-stage-card" href="/zh-TW/tweets/06-long-running">
  <span>STAGE 06 · 10 篇原文</span>
  <strong>把 Pi 變成長期工作流</strong>
  <small>處理 VPS、遠端裝置、Runtime、介面與生態，讓 Pi 從一次任務走向長期使用。</small>
</a>

</div>

## 我希望保留什麼

學習記錄裡會同時留下當時的判斷和後來的修正。早期推文有些內容依賴當時版本，語言也沒有重新潤色。它們繼續保留，是因為學習過程本身包含試錯。

真正需要讀者照著操作的內容會進入藍皮書主線，重新核驗命令、版本與驗收結果。個人記錄負責說明我怎樣走到這裡，兩部分互相連接，但承擔的任務不同。

[從第一階段開始閱讀](/zh-TW/tweets/01-meet-pi) · [檢視全部六個階段](/zh-TW/tweets/)
