---
title: 写在蓝皮书之外
description: 小墨关于 Pi 的个人感悟、学习过程、踩坑记录与推文档案。
prev:
  text: 权限、隔离与验收
  link: /guide/safety
next:
  text: 推文学习目录
  link: /tweets/
---

<span class="library-status">XIAOMO'S NOTES · 蓝皮书之外</span>

# 写在蓝皮书之外

这里保留我的个人感悟、学习过程和判断变化。很多判断来自一次实操，后来读到源码或文章，又会回头修正早先的理解。它们不会被改写成一条过分整齐的成功路线，也不承担蓝皮书教程的职责。

下面这段话是我决定整理蓝皮书时写下的原文。

<article class="tweet-entry tweet-entry-featured">

<span class="tweet-meta">2026-09-08 18:48:38 · 小墨原文</span>

> 准备把自己的Pi学习过程整理出来
>
> 不知道会有多少来看，但是分享本来就是一件有意义的事情，把它整理出来，本身也是一种对学习的回顾
>
> 这两个月来，从简单的Pi Agent到研究源码，分析里面的内容怎么一步一步的学习成长到自己开始写插件
>
> 开始只是纯好奇，为什么会有一个这么简洁的Agent的出现，为什么Openclaw会选择它当作基座去进行开发，后来我也慢慢懂得了原因
>
> 很建议大家在学习之余去翻看一下作者的履历，那不仅仅是简单的历史回顾，更是一种思想的碰撞，也回答了为什么会这样
>
> 不说那么多了，开始动手了，然后你也感兴趣，请在评论区告诉我👇

</article>

## 从时间线改成学习路线

98 条原文已经按六个阶段整理。阶段顺序服务于学习，阶段内部仍保留发布时间。这样既能让新手知道先看什么，也不会抹掉我当时认识事物的先后。

<div class="journey-stage-grid">

<a class="journey-stage-card" href="/tweets/01-meet-pi">
  <span>STAGE 01 · 27 篇原文</span>
  <strong>从好奇开始认识 Pi</strong>
  <small>先理解 Pi 是什么、为什么保持简洁，以及 Agent Harness 会怎样影响实际体验。</small>
</a>

<a class="journey-stage-card" href="/tweets/02-first-tasks">
  <span>STAGE 02 · 25 篇原文</span>
  <strong>先把第一个任务做完</strong>
  <small>认识模型选择、入门技巧和基础界面，再回到一个可以独立验收的小任务。</small>
</a>

<a class="journey-stage-card" href="/tweets/03-sessions-context">
  <span>STAGE 03 · 7 篇原文</span>
  <strong>理解 Session 与上下文</strong>
  <small>弄清会话树、长期记忆、压缩、Token 与提示缓存之间的关系。</small>
</a>

<a class="journey-stage-card" href="/tweets/04-skills-extensions">
  <span>STAGE 04 · 22 篇原文</span>
  <strong>搭建自己的 Skill 与 Extension</strong>
  <small>从使用现成插件走向整理方法、控制数量，再解决自己的真实需求。</small>
</a>

<a class="journey-stage-card" href="/tweets/05-subagents-research">
  <span>STAGE 05 · 7 篇原文</span>
  <strong>让子 Agent 学会分工</strong>
  <small>学习怎样拆分搜索、整理、审阅任务，并检查不同 Agent 交回的证据。</small>
</a>

<a class="journey-stage-card" href="/tweets/06-long-running">
  <span>STAGE 06 · 10 篇原文</span>
  <strong>把 Pi 变成长期工作流</strong>
  <small>处理 VPS、远程设备、Runtime、界面与生态，让 Pi 从一次任务走向长期使用。</small>
</a>

</div>

## 我希望保留什么

学习记录里会同时留下当时的判断和后来的修正。早期推文有些内容依赖当时版本，语言也没有重新润色。它们继续保留，是因为学习过程本身包含试错。

真正需要读者照着操作的内容会进入蓝皮书主线，重新核验命令、版本与验收结果。个人记录负责说明我怎样走到这里，两部分互相连接，但承担的任务不同。

[从第一阶段开始阅读](/tweets/01-meet-pi) · [查看全部六个阶段](/tweets/)
