---
title: '如果编程已经不成问题，接下来呢？——衡量代码的粗糙程度'
description: 'Earendil 官方文章《If coding is solved, what now?: Measuring the sloppiness of code》的完整中文译文，讨论如何衡量 AI 生成代码的冗长、侵蚀与累积问题。'
prev:
  text: 邀请你开启一场通信
  link: /translations/invitation
next:
  text: 官方授权译文目录
  link: /translations/
---

<span class="library-status">Earendil 官方授权中文译文 · 11</span>

# 如果编程已经不成问题，接下来呢？——衡量代码的粗糙程度

> - **原文标题**　*If coding is solved, what now?: Measuring the sloppiness of code*
> - **作者**　Sebastian，Earendil `<sebastian@earendil.com>`
> - **发布日期**　2026-09-10
> - **原文地址**　[earendil.com/posts/measuring-code-sloppiness](https://earendil.com/posts/measuring-code-sloppiness/)
> - **授权说明**　经 Earendil 授权改编与翻译（*Adapted and translated with permission from Earendil.*）
> - **译文许可**　[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh-hans)

LLM 在生成代码方面已经近乎完美，但事情并没有就此结束。代码在形式上正确，并不意味着它不会引入不必要的抽象、制造重复，或从整体上作出糟糕的决定。这并不是什么突破性的观察：大多数用 vibe coding（凭感觉写代码）的方式开发过项目的人都已经发现，每增加一项功能，有时都会让代码行数（LOC）急剧膨胀。

这会削弱人类的自主权，因为对于那些每月新增数百万行代码的项目，人类很难跟上。<sup id="fnref-1"><a href="#fn-1">1</a></sup> 有些人可能会说，这根本不是问题，因为他们相信自己的 Agent 能处理好。我得告诉你一个坏消息：Agent 其实也无法真正处理好这些粗糙代码。

我有物理学背景，因此解决问题时一直习惯采用实验和定量的方法。我刚加入 Earendil 时，任务是弄清楚如何衡量代码的粗糙程度。我的本能反应是先深入研究相关文献，再看看其他公司正在怎么做。

坦白说，除少数几篇很有洞见的研究论文外，我对这个行业目前在多大程度上仍然“凭感觉”行事感到失望。在研究过程中和 X 上，我不断看到这样的宣传：“端到端编程 Agent”“不只建议代码，还能把它交付上线的 AI”，或“不需要人类级成本的人类级评估”。就像所有讲得不错的故事一样，这些说法也包含一部分事实。

LLM 的确能写出**几乎**完全正确的代码。这是因为代码具有可规模化和可验证的特性。让 LLM 生成代码，再用隐藏测试检查这些代码，是一件相当直接的事，也能由此得到清晰的奖励信号。与之形成鲜明对比的是，判断这些代码的“粗糙程度”往往需要人类的直觉与品味，而且总体而言极其困难。我认为，说明其中原因的最好方式，就是逐一看看有哪些可能的衡量方法。

**让 AI 当裁判：** 这可能是业界评估代码质量最常见的方法，但根据我的观察，它很少奏效。最天真的做法，是让模型按 1 到 10 分评价代码质量；这种方法基本等同于随机数生成器。更精细的做法，是把方案 A 和方案 B 交给裁判模型，让它决定更偏好哪一个；但问题是，把两个方案的 A／B 标记或显示顺序对调后，[模型的偏好就可能改变](https://arxiv.org/pdf/2604.16790)。我这里说得稍微有些刻薄，而且这种效应在更大的模型上并没有那么明显，但核心问题仍然成立。让 LLM 评判自己写出的代码，并不能代替真正可靠的评估。虽然评分准则或让 LLM 编写测试等方向有一些有趣的尝试，但它们离真正消除粗糙代码还很远。

**让人来评判 AI：** 如果暂且忽略软件工程师的能力差异巨大这一事实，这会是确保代码保持人类可读性的最佳办法。缺点则是，无论用于训练 AI，还是建立包含多个模型服务商和 Agent Harness 的大型基准测试，它都无法规模化。<sup id="fnref-2"><a href="#fn-2">2</a></sup>

**最简单的方法：** 在我的研究和测试中，直接衡量代码行数的变化量，竟然成了一个非常有效的粗糙程度指标。讽刺之处在于，一旦我们开始专门针对它进行优化，它就会[失去作为衡量指标的意义](https://en.wikipedia.org/wiki/Goodhart%27s_law)。

接下来两个指标来自论文 [SlopCodeBench](https://arxiv.org/html/2603.24755v1#A7)。它们能够很好地区分既有代码库与 LLM 生成的粗糙代码，因此看起来很有希望。

**冗长程度（Verbosity）：** 尝试衡量重复代码行与不必要的冗长代码行所占的比例。<sup id="fnref-3"><a href="#fn-3">3</a></sup>

<div class="translation-formula" dir="ltr">
  <code>Verbosity = |AST-Grep flagged lines ∪ clone lines| / LOC</code>
</div>

也就是说，分子是被 AST-Grep 标记的代码行与重复代码行的并集行数，分母是全部代码行数。

**侵蚀程度（Erosion）：** 尝试衡量一个代码库的体量权重，在多大程度上集中于少数庞大而复杂的函数。

<div class="translation-formula" dir="ltr">
  <code>mass(f) = CC(f) × √SLOC(f)</code>
</div>

其中，`f` 代表函数，SLOC 是源代码行数，`CC(f)` 是该函数的[圈复杂度](https://ieeexplore.ieee.org/document/1702388)。

<div class="translation-formula" dir="ltr">
  <code>Erosion = Σ<sub>f: CC(f) &gt; 10</sub> mass(f) / Σ<sub>f</sub> mass(f)</code>
</div>

侵蚀程度就是：圈复杂度大于 10 的函数，其体量权重之和占所有函数体量权重之和的比例。

如果把 SlopCodeBench 评估过程中生成的代码，与一组成熟代码库的平均冗长程度和侵蚀程度进行比较，两者之间的差异非常明显。成熟代码库的平均冗长程度为 `0.15 ± 0.06`，Agent 代码则为 `0.33 ± 0.10`。侵蚀程度方面，成熟代码库为 `0.31 ± 0.17`，Agent 代码则为 `0.68 ± 0.20`。平均而言，Agent 代码的冗长与侵蚀程度大约都是人类代码的两倍。随后，我也调查了自己一些通过 vibe coding 完成的项目，其中许多项目的冗长程度高达 `0.4`，侵蚀程度高达 `0.75`；因此，这些结果很可能并不只是评估方法造成的假象。<sup id="fnref-4"><a href="#fn-4">4</a></sup>

要回到 Agent 为什么无法真正自行处理粗糙代码这个问题，我们需要看看 SlopCodeBench 的评估方式。其他编程基准通常会在一开始向 Agent 提供完整的指令清单，再设置一组用于判断程序是否合格的隐藏测试；SlopCodeBench 的做法恰好相反。它安排多轮指令与测试迭代，并在不同检查点之间清除模型的上下文。这更贴近人类实际使用编程 Agent 时的迭代过程。结果是，糟糕的编程决策会随着时间不断累积。若按“所有检查点的全部测试结果都必须合格”的端到端完整求解标准，即使最先进的模型，端到端完整成功率也是 `0%`。<sup id="fnref-5"><a href="#fn-5">5</a></sup> 对于那些每天欣然新增数万、甚至数十万行代码的人来说，这应该是一个警告信号。当然，这里仍然存在常见的保留意见，例如测试可能过于严格，或个别题目描述略有歧义；但总体趋势依然成立。

希望在了解这些指标之后，你已经能更清楚地看见：为什么评估代码的粗糙程度如此困难，以及为什么人类的直觉与品味，仍然会以隐性或显性的方式融入评估过程。

还有一些看起来很有希望的方向值得继续探索，例如函数之间的耦合程度、代码变动量、内聚性等等。如果你也在研究评估，并愿意聊聊，我很乐意交流：[`sebastian@earendil.com`](mailto:sebastian@earendil.com)

## 注释

1. <span id="fn-1">这让我想起一句话：“用代码行数衡量编程进度，就像用重量衡量建造飞机的进度。”</span> [返回正文](#fnref-1)
2. <span id="fn-2">我可不想为了得到一份不断变化的模型服务商排名，强迫任何人审查数百万行代码。</span> [返回正文](#fnref-2)
3. <span id="fn-3">这里的规则是一套通过 [AST-Grep](https://ast-grep.github.io/) 实现的人工启发式规则，这再次说明了其中的人类因素。</span> [返回正文](#fnref-3)
4. <span id="fn-4">不过，有一个出了名“很凭感觉”的开放项目，在这两个指标上的得分都不算高；这可能是因为函数之间的耦合程度非常高，和／或大量互不相关的函数体量拉低了平均值。</span> [返回正文](#fnref-4)
5. <span id="fn-5">尚未在 Fable 5.1 或 Astra 上测试；已经测试过 GPT 5.6 sol xhigh 等模型。</span> [返回正文](#fnref-5)

::: info 译者说明
本文为 Earendil 原文的完整中文译文。中文译文及适配部分经授权按 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh-hans) 发布；如有歧义，请以[英文原文](https://earendil.com/posts/measuring-code-sloppiness/)为准。
:::

## 继续阅读

- [英文原文：If coding is solved, what now?: Measuring the sloppiness of code](https://earendil.com/posts/measuring-code-sloppiness/)
- [上一篇：邀请你开启一场通信](/translations/invitation)
- [返回：官方授权译文目录](/translations/)
