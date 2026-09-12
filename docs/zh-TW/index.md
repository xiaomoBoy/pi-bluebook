---
layout: home
title: Pi Coding Agent 學習藍皮書
titleTemplate: ':title｜中文初學者實戰路線'
description: 面向中文初學者的 Pi Coding Agent 系統教學，從安裝和第一次可驗收任務開始，逐步掌握工作階段、上下文、技能、擴充功能與長期 Agent 工作流。
---

<main class="bluebook-home">
  <section class="bluebook-hero" aria-labelledby="bluebook-title">
    <div class="bluebook-hero__main">
      <p class="bluebook-kicker"><span>PI BLUEBOOK</span><span>開放學習版 · 2026</span></p>
      <h1 id="bluebook-title">Pi Coding Agent 學習藍皮書</h1>
      <p class="bluebook-deck">從安裝和第一次可驗收任務開始，逐步理解工作階段（Session）、上下文（Context）、技能（Skill）、擴充功能（Extension）與長期工作流。</p>
      <p class="bluebook-intro">一條為中文初學者重新編排的終端機 Coding 代理框架（Agent Harness）學習路線。先把一件真實的小事做完整，再一層一層搭出自己的 Pi。</p>
      <div class="bluebook-actions">
        <a class="bluebook-button bluebook-button--primary" href="/zh-TW/guide/start-here">從零開始操作</a>
        <a class="bluebook-button" href="/zh-TW/guide/introduction">系統閱讀全書</a>
      </div>
    </div>
    <aside class="bluebook-edition" aria-label="本書概況">
      <div class="bluebook-edition__mark" aria-hidden="true">P<span>.</span></div>
      <p class="bluebook-edition__label">CURRENT EDITION</p>
      <dl>
        <div><dt>主線課程</dt><dd>14 課</dd></div>
        <div><dt>學習模組</dt><dd>5 個</dd></div>
        <div><dt>學習檔案</dt><dd>98 篇</dd></div>
        <div><dt>當前版次</dt><dd>2026 開放版</dd></div>
      </dl>
      <p class="bluebook-edition__note">網站與原創內容採用 MIT License</p>
    </aside>
  </section>
  <section class="bluebook-principle" aria-label="本書方法">
    <span>本書方法</span>
    <strong>場景 → 概念 → 實作 → 驗收</strong>
    <p>每一課都要留下一個能由你親自檢查的結果。</p>
  </section>
  <section class="bluebook-section" id="reading-map">
    <header class="bluebook-section__header">
      <div>
        <p>READING MAP</p>
        <h2>一條主線，五個功能入口</h2>
      </div>
      <p>先按主線學習，再到案例練習；遇到問題查手冊，需要擴充時看外掛程式，想追溯完整觀點再讀授權譯文。</p>
    </header>
    <div class="bluebook-map">
      <a class="bluebook-map__item bluebook-map__item--primary" href="/zh-TW/guide/introduction">
        <span>01 · CORE CURRICULUM</span>
        <h3>藍皮書主線</h3>
        <p>全站的核心。從導論進入，經過 5 個模組、14 課，完整走到擴充、VPS 與安全驗收。</p>
        <b>從導論開始 →</b>
      </a>
      <a class="bluebook-map__item" href="/zh-TW/cases/">
        <span>02 · LAB</span>
        <h3>實作案例</h3>
        <p>與課程章節對應，提供材料、步驟、預期結果和驗收清單。</p>
        <b>進入案例庫 →</b>
      </a>
      <a class="bluebook-map__item" href="/zh-TW/reference/">
        <span>03 · REFERENCE</span>
        <h3>參考手冊</h3>
        <p>FAQ 找短答，故障手冊按症狀排查，熱詞表解釋陌生概念。</p>
        <b>按問題查詢 →</b>
      </a>
      <a class="bluebook-map__item" href="/zh-TW/plugins/">
        <span>04 · PLUGINS</span>
        <h3>外掛程式推薦</h3>
        <p>從 98 條推文實踐中整理，按需求、來源和風險選擇，不做一鍵全家桶。</p>
        <b>檢視選擇地圖 →</b>
      </a>
      <a class="bluebook-map__item" href="/zh-TW/translations/">
        <span>05 · AUTHORIZED TRANSLATIONS</span>
        <h3>授權譯文</h3>
        <p>經 Earendil 授權釋出的十一篇完整中文譯文，保留原文資訊、授權宣告與圖片署名。</p>
        <b>進入譯文專區 →</b>
      </a>
    </div>
    <aside class="bluebook-notes-strip">
      <span>AUTHOR'S NOTES</span>
      <p><strong>小墨札記</strong>保留 98 條推文、個人感悟和判斷變化。它是藍皮書的素材檔案，不替代經過核驗的教學。</p>
      <a href="/zh-TW/journey/">閱讀札記 →</a>
    </aside>
  </section>
  <section class="bluebook-section" id="catalog">
    <header class="bluebook-section__header">
      <div>
        <p>THE CURRICULUM</p>
        <h2>五個模組，從安裝走到穩定工作流</h2>
      </div>
      <p>主線按學習依賴排序。已經能啟動 Pi 的讀者，可以從第二模組進入真實任務。</p>
    </header>
    <div class="bluebook-catalog">
      <article class="bluebook-module bluebook-module--lead">
        <div class="bluebook-module__number">01</div>
        <div class="bluebook-module__body">
          <p class="bluebook-module__meta">MODULE ONE · 4 LESSONS + PLATFORM & MAINTENANCE</p>
          <h3>安裝與基礎設定</h3>
          <ol>
            <li><a href="/zh-TW/guide/before-install"><span>01</span>安裝前檢查</a></li>
            <li><a href="/zh-TW/guide/install-pi"><span>02</span>安裝並啟動 Pi</a></li>
            <li><a href="/zh-TW/guide/windows-setup"><span>WIN</span>Windows 中文路徑</a></li>
            <li><a href="/zh-TW/guide/connect-model"><span>03</span>登入與模型設定</a></li>
            <li><a href="/zh-TW/guide/ready-to-work"><span>04</span>從練習目錄開始</a></li>
            <li><a href="/zh-TW/guide/lifecycle-management"><span>維護</span>更新、退出與解除安裝</a></li>
          </ol>
          <p class="bluebook-module__result"><span>完成標誌</span>能在獨立目錄啟動 Pi，並獲得一次真實回覆。</p>
        </div>
      </article>
      <article class="bluebook-module">
        <div class="bluebook-module__number">02</div>
        <div class="bluebook-module__body">
          <p class="bluebook-module__meta">MODULE TWO · 3 LESSONS</p>
          <h3>完成真實任務</h3>
          <ol>
            <li><a href="/zh-TW/guide/first-task"><span>05</span>第一次任務</a></li>
            <li><a href="/zh-TW/guide/files-and-context"><span>06</span>檔案與工作目錄</a></li>
            <li><a href="/zh-TW/guide/sessions"><span>07</span>工作階段的儲存與續寫</a></li>
          </ol>
          <p class="bluebook-module__result"><span>完成標誌</span>知道 Agent 說“完成了”不等於真的完成。</p>
        </div>
      </article>
      <article class="bluebook-module">
        <div class="bluebook-module__number">03</div>
        <div class="bluebook-module__body">
          <p class="bluebook-module__meta">MODULE THREE · 2 LESSONS</p>
          <h3>長任務與上下文</h3>
          <ol>
            <li><a href="/zh-TW/guide/context-and-compaction"><span>08</span>上下文與壓縮</a></li>
            <li><a href="/zh-TW/guide/prompt-caching"><span>09</span>提示快取入門</a></li>
          </ol>
          <p class="bluebook-module__result"><span>完成標誌</span>任務變長以後，仍然知道什麼必須留下。</p>
        </div>
      </article>
      <article class="bluebook-module">
        <div class="bluebook-module__number">04</div>
        <div class="bluebook-module__body">
          <p class="bluebook-module__meta">MODULE FOUR · 3 LESSONS + PRINCIPLES</p>
          <h3>擴充自己的 Pi</h3>
          <ol>
            <li><a href="/zh-TW/guide/skills-extensions-packages"><span>10</span>技能、擴充功能與包（Package）</a></li>
            <li><a href="/zh-TW/guide/first-extension"><span>11</span>擴充功能的需求與驗收</a></li>
            <li><a href="/zh-TW/guide/subagents"><span>12</span>子代理（Subagent）如何分工</a></li>
            <li><a href="/zh-TW/guide/how-pi-works"><span>原理</span>從 Prompt 到 Agent Loop</a></li>
          </ol>
          <p class="bluebook-module__result"><span>完成標誌</span>從自己的需求出發，而不是堆滿外掛程式。</p>
        </div>
      </article>
      <article class="bluebook-module bluebook-module--wide">
        <div class="bluebook-module__number">05</div>
        <div class="bluebook-module__body">
          <p class="bluebook-module__meta">MODULE FIVE · 2 LESSONS + CAPSTONE</p>
          <h3>建立穩定工作流</h3>
          <ol>
            <li><a href="/zh-TW/guide/vps-and-long-running"><span>13</span>長時間任務與 VPS</a></li>
            <li><a href="/zh-TW/guide/safety"><span>14</span>權限、隔離與驗收</a></li>
            <li><a href="/zh-TW/cases/graduation-project"><span>結課</span>CASE 08 · 畢業專案</a></li>
          </ol>
          <p class="bluebook-module__result"><span>完成標誌</span>搭出能繼續、能恢復、也能核對的工作方式。</p>
        </div>
      </article>
    </div>
  </section>
  <section class="bluebook-start">
    <div>
      <p>START HERE</p>
      <h2>不用先把所有概念學完。</h2>
      <span>準備一個練習目錄，完成第一個可以親自驗收的結果。</span>
    </div>
    <a class="bluebook-button bluebook-button--primary" href="/zh-TW/guide/start-here">從零開始操作</a>
  </section>
</main>
