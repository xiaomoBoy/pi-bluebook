<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { useData } from 'vitepress'
import type { Player } from 'asciinema-player'
import 'asciinema-player/dist/bundle/asciinema-player.css'

const props = defineProps<{ src: string; poster: string; title: string }>()
const { lang } = useData()
const tw = computed(() => /^zh-(?:tw|hant)/i.test(lang.value))
const labels = computed(() => tw.value ? {
  play: '播放', pause: '暫停', restart: '重新播放', result: '查看結尾',
  caption: 'Earendil 原文終端機錄影；英文介面原樣保留，中文步驟見下方。可拖動進度或點選章節時間跳轉。',
  source: '原始錄影', error: '錄影載入失敗，請重新整理或開啟原始錄影。', chapter: '章節',
} : {
  play: '播放', pause: '暂停', restart: '重新播放', result: '查看结尾',
  caption: 'Earendil 原文终端录屏；英文界面原样保留，中文步骤见下方。可拖动进度或点击章节时间跳转。',
  source: '原始录屏', error: '录屏加载失败，请刷新或打开原始录屏。', chapter: '章节',
})
const durable = props.src.includes('durable')
const times = durable ? [0, 17.9, 23.9, 38.6, 44.9, 48.9, 62.3, 87] : [0, 25.3, 61, 74.8, 87.8, 104.5, 110.2]
const source = durable
  ? 'https://earendil.com/static/posts/pi-durable/vacation.cast.json'
  : 'https://earendil.com/static/posts/pi-1-0/demo.cast.json'
const mount = ref<HTMLElement>()
const playing = ref(false)
const ready = ref(false)
const failed = ref(false)
let player: Player | undefined
let disposed = false
const stamp = (time: number) => `${Math.floor(time / 60)}:${String(Math.floor(time % 60)).padStart(2, '0')}`
async function control(action: 'toggle' | 'restart' | 'result' | number) {
  if (!player) return
  try {
    if (action === 'toggle') await (playing.value ? player.pause() : player.play())
    else if (action === 'restart') { await player.seek(0); await player.play() }
    else { await player.pause(); await player.seek(action === 'result' ? '100%' : action) }
  } catch { failed.value = true }
}
onMounted(async () => {
  try {
    const { create } = await import('asciinema-player')
    if (disposed || !mount.value) return
    player = create(props.src, mount.value, {
      poster: props.poster, preload: true, autoPlay: false, fit: 'width',
      controls: true, idleTimeLimit: 3, terminalFontSize: '14px',
      markers: times.map((time, i) => [time, `${labels.value.chapter} ${i + 1}`]),
    })
    player.addEventListener('playing', () => { playing.value = true })
    player.addEventListener('pause', () => { playing.value = false })
    player.addEventListener('ended', () => { playing.value = false })
    // The player also reports fetch/parser failures asynchronously.
    ;(player as any).addEventListener('error', () => { failed.value = true })
    ready.value = true
  } catch { failed.value = true }
})
onBeforeUnmount(() => { disposed = true; player?.dispose() })
</script>

<template>
  <figure class="terminal-replay" :aria-label="title">
    <strong>{{ title }}</strong>
    <div ref="mount" class="terminal-screen" />
    <div class="terminal-controls">
      <button :disabled="!ready || failed" @click="control('toggle')">{{ playing ? labels.pause : labels.play }}</button>
      <button :disabled="!ready || failed" @click="control('restart')">{{ labels.restart }}</button>
      <button :disabled="!ready || failed" @click="control('result')">{{ labels.result }}</button>
    </div>
    <div class="terminal-chapters" :aria-label="labels.chapter">
      <button v-for="(time, i) in times" :key="i" :disabled="!ready || failed" @click="control(time)">{{ labels.chapter }} {{ i + 1 }} · {{ stamp(time) }}</button>
    </div>
    <p v-if="failed" role="alert">{{ labels.error }}</p>
    <figcaption>{{ labels.caption }} <a :href="source" target="_blank" rel="noopener noreferrer">{{ labels.source }} ↗</a></figcaption>
  </figure>
</template>

<style scoped>
.terminal-replay { margin: 24px 0; padding: 16px; border: 1px solid var(--vp-c-divider); border-radius: 12px; min-width: 0; }
.terminal-screen { margin: 12px 0; min-width: 0; overflow: hidden; }
.terminal-controls, .terminal-chapters { display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0; }
button { padding: 5px 12px; border: 1px solid var(--vp-c-divider); border-radius: 6px; background: var(--vp-c-bg-soft); font-size: 13px; cursor: pointer; }
button:hover { border-color: var(--vp-c-brand-1); }
button:disabled { opacity: .5; cursor: default; }
figcaption { font-size: 13px; color: var(--vp-c-text-2); line-height: 1.7; }
/* The player's terminal must keep its monospace metrics, not prose code styles. */
.terminal-screen :deep(pre) { padding: 0; margin: 0; background: transparent; }
</style>
