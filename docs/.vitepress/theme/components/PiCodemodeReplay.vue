<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import { useData } from 'vitepress'
import replay from '../data/earendil-codemode-replay.json'

// Original recording: https://earendil.com/static/posts/you-said-no-mcp/codemode-replay.json
// Used with the article's Earendil translation permission. This is a replay only;
// the recorded JavaScript and tool calls are displayed, never executed.
const { lang } = useData()
const tw = computed(() => /^zh-(?:tw|hant)/i.test(lang.value))
const labels = computed(() => tw.value ? {
  title: '原文動態回放', play: '播放', pause: '暫停', resume: '繼續播放',
  restart: '重新播放', result: '查看結果', ready: '準備播放',
  typing: '輸入請求', intro: '規劃分析', code: '生成程式碼',
  calls: '呼叫工具', output: '返回結果', answer: '分析完成',
  caption: 'Earendil 原文的 Pi 工作階段精簡回放；保留英文介面與原始資料。中文說明及完整程式碼見下方文字版。',
  source: '查看原文', earlier: '次較早的呼叫', terminal: 'Pi 終端機回放',
} : {
  title: '原文动态回放', play: '播放', pause: '暂停', resume: '继续播放',
  restart: '重新播放', result: '查看结果', ready: '准备播放',
  typing: '输入请求', intro: '规划分析', code: '生成代码',
  calls: '调用工具', output: '返回结果', answer: '分析完成',
  caption: 'Earendil 原文的 Pi 会话精简回放；保留英文界面与原始数据。中文说明及完整代码见下方文字版。',
  source: '查看原文', earlier: '次较早的调用', terminal: 'Pi 终端回放',
})
const duration = 18000
const elapsed = ref(0)
const playing = ref(false)
const chat = ref<HTMLElement>()
let frame = 0
let last = 0
let following = true
const progress = computed(() => Math.min(1, elapsed.value / duration))
const portion = (start: number, end: number) => Math.max(0, Math.min(1, (elapsed.value - start) / (end - start)))
const editor = computed(() => elapsed.value < 2400 ? replay.prompt.slice(0, Math.floor(portion(0, 2100) * replay.prompt.length)) : '')
const intro = computed(() => replay.intro.slice(0, Math.ceil(portion(2800, 3900) * replay.intro.length)))
const scriptLength = replay.script.reduce((sum, token) => sum + token[1].length, 0)
const script = computed(() => {
  let remaining = Math.ceil(portion(4200, 6500) * scriptLength)
  return replay.script.map(([kind, text]) => {
    const shown = text.slice(0, Math.max(0, remaining))
    remaining -= text.length
    return { kind, text: shown }
  }).filter(token => token.text)
})
const simTime = computed(() => replay.wallMs * Math.pow(portion(6800, 15500), 1.6))
const started = computed(() => elapsed.value < 6800 ? [] : replay.calls.filter(call => call.t <= simTime.value))
const visibleCalls = computed(() => started.value.slice(-8))
const answerCount = computed(() => Math.ceil(portion(16200, duration) * replay.answer.length))
// Source output contains escaped display newlines; decode only those characters.
const output = replay.output.replace(/\\n/g, '\n')
const plain = (html: string) => html.replace(/<\/?(?:b|code)>/g, '')
const answers = replay.answer.map(([kind, content]) => ({
  kind, lines: (Array.isArray(content) ? content : [content]).map(plain),
}))
const phase = computed(() => {
  const t = elapsed.value
  if (!t) return labels.value.ready
  if (t < 2400) return labels.value.typing
  if (t < 4200) return labels.value.intro
  if (t < 6800) return labels.value.code
  if (t < 15500) return labels.value.calls
  if (t < 16200) return labels.value.output
  return labels.value.answer
})
function pause() {
  playing.value = false
  cancelAnimationFrame(frame)
}
function tick(now: number) {
  if (!playing.value) return
  elapsed.value = Math.min(duration, elapsed.value + Math.min(now - last, 100))
  last = now
  if (following) nextTick(() => {
    if (chat.value) chat.value.scrollTop = chat.value.scrollHeight
  })
  if (elapsed.value >= duration) pause()
  else frame = requestAnimationFrame(tick)
}
function play() {
  if (playing.value) return pause()
  if (elapsed.value >= duration) elapsed.value = 0
  following = true
  playing.value = true
  last = performance.now()
  frame = requestAnimationFrame(tick)
}
function restart() {
  pause()
  elapsed.value = 0
  play()
}
function showResult() {
  pause()
  elapsed.value = duration
  nextTick(() => {
    if (chat.value) chat.value.scrollTop = chat.value.scrollHeight
  })
}
onBeforeUnmount(pause)
</script>

<template>
  <figure class="codemode-replay" aria-label="Pi Codemode">
    <div class="replay-heading"><strong>Pi · Codemode</strong><span>{{ labels.title }}</span></div>
    <div ref="chat" class="replay-chat" tabindex="0" role="region" :aria-label="labels.terminal"
      @wheel.passive="following = false" @touchstart.passive="following = false"
      @keydown="following = false">
      <p v-if="elapsed < 2400" class="replay-placeholder">{{ replay.prompt }}</p>
      <p v-else class="replay-prompt">› {{ replay.prompt }}</p>
      <p v-if="intro">{{ intro }}</p>
      <div v-if="elapsed >= 4200" class="replay-tool">
        <strong>codemode</strong>
        <pre class="replay-code"><code><span v-for="(token, index) in script" :key="index" :class="'syntax-' + token.kind">{{ token.text }}</span></code></pre>
        <div v-if="started.length" class="replay-calls">
          <div v-if="started.length > 8" class="replay-muted">… {{ started.length - 8 }} {{ labels.earlier }}</div>
          <div v-for="(call, index) in visibleCalls" :key="index" class="replay-call">
            <span :class="simTime >= call.t + call.d ? 'call-done' : 'call-pending'">{{ simTime >= call.t + call.d ? '✓' : '…' }}</span>
            {{ call.name }} <span class="replay-muted">{{ call.args }}</span>
            <span v-if="simTime >= call.t + call.d" class="replay-muted"> {{ call.d }}ms</span>
          </div>
        </div>
        <pre v-if="elapsed >= 15800" class="replay-output"><code>{{ output }}</code></pre>
      </div>
      <div v-for="(answer, index) in answers.slice(0, answerCount)" :key="index" class="replay-answer">
        <ul v-if="answer.kind === 'ul'"><li v-for="line in answer.lines" :key="line">{{ line }}</li></ul>
        <p v-else>{{ answer.lines[0] }}</p>
      </div>
    </div>
    <div class="replay-editor">› {{ editor }}<span v-if="playing" class="replay-cursor">▍</span></div>
    <div class="replay-footer"><span>{{ replay.cwd }}</span><span>{{ replay.model }}</span></div>
    <div class="replay-controls">
      <button type="button" class="replay-primary" @click="play">{{ playing ? labels.pause : elapsed >= duration ? labels.restart : elapsed ? labels.resume : labels.play }}</button>
      <button v-if="elapsed < duration" type="button" :disabled="elapsed === 0" @click="restart">{{ labels.restart }}</button>
      <button type="button" :disabled="elapsed >= duration" @click="showResult">{{ labels.result }}</button>
      <span role="status">{{ phase }}</span>
    </div>
    <progress :value="progress" max="1" :aria-label="labels.title" />
    <figcaption>{{ labels.caption }} <a href="https://earendil.com/posts/you-said-no-mcp/" target="_blank" rel="noopener noreferrer">{{ labels.source }} ↗</a></figcaption>
  </figure>
</template>

<style scoped>
.codemode-replay { margin: 24px 0; min-width: 0; overflow: hidden; border: 1px solid var(--vp-c-divider); border-radius: 12px; background: #131820; color: #e4e7ed; }
.replay-heading, .replay-footer { display: flex; justify-content: space-between; gap: 12px; padding: 12px 16px; background: #1b222d; font-size: 12px; line-height: 1.6; flex-wrap: wrap; }
.replay-heading span, .replay-footer { color: #a9b5c5; }
.replay-chat { height: 440px; overflow: auto; overscroll-behavior: contain; padding: 16px; font: 12px/1.65 var(--vp-font-family-mono); }
.replay-chat p { margin: 0 0 16px; line-height: inherit; overflow-wrap: anywhere; }
.replay-placeholder { color: #a9b5c5; }
.replay-prompt { background: #27364a; padding: 12px; border-radius: 6px; }
.replay-tool { padding: 12px; background: #1b242b; border-left: 2px solid #8abb9a; }
.replay-code, .replay-output { margin: 10px 0; padding: 0; background: transparent; border-radius: 0; white-space: pre-wrap; overflow-wrap: anywhere; font: inherit; }
.replay-code code, .replay-output code { padding: 0; background: none; color: inherit; font: inherit; }
.replay-calls { margin: 14px 0; padding: 10px 0; border-top: 1px solid #384455; }
.replay-call { overflow-wrap: anywhere; }
.replay-muted { color: #a9b5c5; }
.call-done, .syntax-s { color: #a6d49f; }
.call-pending, .syntax-n { color: #e8bb86; }
.syntax-k { color: #c7a4ed; }
.syntax-f { color: #8ac8ee; }
.syntax-p { color: #b6c3d6; }
.replay-answer { margin-top: 16px; }
.replay-answer ul { padding-left: 20px; }
.replay-answer li { margin: 4px 0; }
.replay-editor { min-height: 43px; padding: 10px 16px; border-top: 1px solid #667ca1; font: 12px/1.7 var(--vp-font-family-mono); overflow-wrap: anywhere; }
.replay-cursor { color: #a9c4ed; }
.replay-controls { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; padding: 12px 16px; }
.replay-controls button { padding: 6px 10px; min-height: 36px; border: 1px solid #5d708c; border-radius: 6px; font-size: 13px; line-height: 1.5; color: #e4e7ed; }
.replay-controls button:disabled { opacity: .4; cursor: default; }
.replay-controls button:not(:disabled):hover { background: #304159; }
.replay-controls .replay-primary { background: #304159; }
.replay-controls span { margin-left: auto; font-size: 12px; color: #a9b5c5; }
.replay-controls button:focus-visible, .replay-chat:focus-visible { outline: 2px solid #8ac8ee; outline-offset: -2px; }
.codemode-replay progress { display: block; width: 100%; height: 3px; border: 0; accent-color: #8ac8ee; }
.codemode-replay figcaption { padding: 12px 16px; background: var(--vp-c-bg-soft); color: var(--vp-c-text-2); font-size: 12px; line-height: 1.8; }
@media (max-width: 640px) {
  .replay-chat { height: 360px; padding: 12px; font-size: 11px; }
  .replay-tool { padding: 8px; }
  .replay-heading, .replay-footer, .replay-controls { padding: 10px 12px; }
}
</style>
