---
layout: home
title: Pi 学习蓝皮书
description: 面向中文初学者的 Pi 系统学习手册，从安装、第一次任务到搭建可控的 Agent 工作流。
---

<main class="bluebook-home">
  <section class="bluebook-hero" aria-labelledby="bluebook-title">
    <div class="bluebook-hero__main">
      <p class="bluebook-kicker"><span>PI BLUEBOOK</span><span>开放学习版 · 2026</span></p>
      <h1 id="bluebook-title">Pi 学习蓝皮书</h1>
      <p class="bluebook-deck">从第一次可验收的任务开始，逐步理解 Session、Context、Skill、Extension 与长期工作流。</p>
      <p class="bluebook-intro">一条为中文初学者重新编排的系统学习路线。先把一件真实的小事做完整，再一层一层搭出自己的 Pi。</p>
      <div class="bluebook-actions">
        <a class="bluebook-button bluebook-button--primary" href="/guide/">进入蓝皮书</a>
        <a class="bluebook-button" href="#reading-map">查看内容地图</a>
      </div>
    </div>
    <aside class="bluebook-edition" aria-label="本书概况">
      <div class="bluebook-edition__mark" aria-hidden="true">P<span>.</span></div>
      <p class="bluebook-edition__label">CURRENT EDITION</p>
      <dl>
        <div><dt>主线课程</dt><dd>14 课</dd></div>
        <div><dt>学习模块</dt><dd>5 个</dd></div>
        <div><dt>学习档案</dt><dd>98 篇</dd></div>
        <div><dt>更新状态</dt><dd>持续编写</dd></div>
      </dl>
      <p class="bluebook-edition__note">网站与原创内容采用 MIT License</p>
    </aside>
  </section>
  <section class="bluebook-principle" aria-label="本书方法">
    <span>本书方法</span>
    <strong>场景 → 概念 → 实操 → 验收</strong>
    <p>每一课都要留下一个能由你亲自检查的结果。</p>
  </section>
  <section class="bluebook-section" id="reading-map">
    <header class="bluebook-section__header">
      <div>
        <p>READING MAP</p>
        <h2>一条主线，两个配套区域</h2>
      </div>
      <p>蓝皮书负责连续学习；实操把知识变成结果；参考手册在遇到问题时提供查询和延伸阅读。</p>
    </header>
    <div class="bluebook-map">
      <a class="bluebook-map__item bluebook-map__item--primary" href="/guide/">
        <span>01 · CORE CURRICULUM</span>
        <h3>蓝皮书主线</h3>
        <p>全站的核心。5 个模块、14 课，从安装和第一次任务开始，完整走到扩展、VPS 与安全验收。</p>
        <b>按顺序学习 →</b>
      </a>
      <a class="bluebook-map__item" href="/cases/">
        <span>02 · LAB</span>
        <h3>实操案例</h3>
        <p>与课程章节对应，提供材料、步骤、预期结果和验收清单。</p>
        <b>进入案例库 →</b>
      </a>
      <a class="bluebook-map__item" href="/reference/">
        <span>03 · REFERENCE</span>
        <h3>参考手册</h3>
        <p>按主题查概念、能力边界、操作入口与章节延伸阅读。</p>
        <b>按问题查找 →</b>
      </a>
    </div>
    <aside class="bluebook-notes-strip">
      <span>AUTHOR'S NOTES</span>
      <p><strong>小墨札记</strong>保留 98 条推文、个人感悟和判断变化。它是蓝皮书的素材档案，不替代经过核验的教程。</p>
      <a href="/journey/">阅读札记 →</a>
    </aside>
  </section>
  <section class="bluebook-section" id="catalog">
    <header class="bluebook-section__header">
      <div>
        <p>THE CURRICULUM</p>
        <h2>五个模块，完整走完 Pi</h2>
      </div>
      <p>主线按学习依赖排序。已经能启动 Pi 的读者，可以从第二模块进入真实任务。</p>
    </header>
    <div class="bluebook-catalog">
      <article class="bluebook-module bluebook-module--lead">
        <div class="bluebook-module__number">01</div>
        <div class="bluebook-module__body">
          <p class="bluebook-module__meta">MODULE ONE · 4 LESSONS</p>
          <h3>安装与基础设置</h3>
          <ol>
            <li><a href="/guide/before-install"><span>01</span>安装前检查</a></li>
            <li><a href="/guide/install-pi"><span>02</span>安装并启动 Pi</a></li>
            <li><a href="/guide/connect-model"><span>03</span>登录与模型设置</a></li>
            <li><a href="/guide/ready-to-work"><span>04</span>从练习目录开始</a></li>
          </ol>
          <p class="bluebook-module__result"><span>完成标志</span>能在独立目录启动 Pi，并获得一次真实回复。</p>
        </div>
      </article>
      <article class="bluebook-module">
        <div class="bluebook-module__number">02</div>
        <div class="bluebook-module__body">
          <p class="bluebook-module__meta">MODULE TWO · 3 LESSONS</p>
          <h3>完成真实任务</h3>
          <ol>
            <li><a href="/guide/first-task"><span>05</span>第一次任务</a></li>
            <li><a href="/guide/files-and-context"><span>06</span>文件与工作目录</a></li>
            <li><a href="/guide/sessions"><span>07</span>会话的保存与续写</a></li>
          </ol>
          <p class="bluebook-module__result"><span>完成标志</span>知道 Agent 说“完成了”不等于真的完成。</p>
        </div>
      </article>
      <article class="bluebook-module">
        <div class="bluebook-module__number">03</div>
        <div class="bluebook-module__body">
          <p class="bluebook-module__meta">MODULE THREE · 2 LESSONS</p>
          <h3>长任务与上下文</h3>
          <ol>
            <li><a href="/guide/context-and-compaction"><span>08</span>上下文与压缩</a></li>
            <li><a href="/guide/prompt-caching"><span>09</span>提示缓存入门</a></li>
          </ol>
          <p class="bluebook-module__result"><span>完成标志</span>任务变长以后，仍然知道什么必须留下。</p>
        </div>
      </article>
      <article class="bluebook-module">
        <div class="bluebook-module__number">04</div>
        <div class="bluebook-module__body">
          <p class="bluebook-module__meta">MODULE FOUR · 3 LESSONS</p>
          <h3>扩展自己的 Pi</h3>
          <ol>
            <li><a href="/guide/skills-extensions-packages"><span>10</span>Skill、Extension 与 Package</a></li>
            <li><a href="/guide/first-extension"><span>11</span>Extension 的需求与验收</a></li>
            <li><a href="/guide/subagents"><span>12</span>子 Agent 如何分工</a></li>
          </ol>
          <p class="bluebook-module__result"><span>完成标志</span>从自己的需求出发，而不是堆满插件。</p>
        </div>
      </article>
      <article class="bluebook-module bluebook-module--wide">
        <div class="bluebook-module__number">05</div>
        <div class="bluebook-module__body">
          <p class="bluebook-module__meta">MODULE FIVE · 2 LESSONS</p>
          <h3>建立稳定工作流</h3>
          <ol>
            <li><a href="/guide/vps-and-long-running"><span>13</span>长时间任务与 VPS</a></li>
            <li><a href="/guide/safety"><span>14</span>权限、隔离与验收</a></li>
          </ol>
          <p class="bluebook-module__result"><span>完成标志</span>搭出能继续、能恢复、也能核对的工作方式。</p>
        </div>
      </article>
    </div>
  </section>
  <section class="bluebook-start">
    <div>
      <p>START HERE</p>
      <h2>不用先把所有概念学完。</h2>
      <span>准备一个练习目录，完成第一个可以亲自验收的结果。</span>
    </div>
    <a class="bluebook-button bluebook-button--primary" href="/guide/before-install">开始第 1 课</a>
  </section>
</main>
