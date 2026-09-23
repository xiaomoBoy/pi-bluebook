<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vitepress'
import releaseData from '../../data/pi-releases.json'

type ReleaseSection = {
  title: string
  key: string
  items: string[]
}

type Release = {
  version: string
  date: string
  year: string
  sourceUrl: string
  itemCount: number
  changeTypes: string[]
  topics: string[]
  sections: ReleaseSection[]
}

type Snapshot = {
  meta: {
    sourceUrl: string
    verifiedAt: string
    latestVersion: string
    latestDate: string
    oldestVersion: string
    oldestDate: string
    releaseCount: number
  }
  releases: Release[]
}

const snapshot = releaseData as Snapshot
const route = useRoute()
const query = ref('')
const changeType = ref('all')
const topic = ref('all')
const year = ref('all')
const displayLimit = ref(18)
const explorer = ref<HTMLElement | null>(null)

const strings = {
  cn: {
    archive: 'PI RELEASE ARCHIVE',
    verified: '官方记录核验于',
    versions: '个正式版本',
    ledgerLabel: '版本档案概况',
    range: '记录范围',
    latest: '当前最新',
    latestNote: '以官方 Coding Agent Changelog 与包版本为准',
    latestChanges: '这一版的重点',
    source: '查看官方原文',
    milestoneTitle: '五个关键节点',
    milestoneDeck: '从上下文、扩展生态到安全与 Harness 化，沿着代表性版本理解 Pi 的演进。',
    explorerTitle: '检索全部版本',
    explorerDeck: '输入版本号或关键词，也可以按年份、变更类型与主题缩小范围。中文主题词会自动匹配官方英文记录。',
    searchLabel: '搜索版本记录',
    searchPlaceholder: '例如：0.84、上下文、Extension、Windows…',
    typeLabel: '变更类型',
    topicLabel: '主题',
    yearLabel: '年份',
    all: '全部',
    features: '新功能',
    breaking: '破坏性变更',
    fixed: '问题修复',
    changed: '行为调整',
    models: '模型',
    providers: 'Provider',
    sessions: 'Session',
    context: '上下文',
    extensions: 'Extension',
    packages: 'Package',
    safety: '安全',
    interface: '界面',
    sdk: 'SDK / CLI',
    platforms: '平台',
    results: '条匹配版本',
    empty: '没有找到匹配的版本。可以减少筛选条件，或改用官方英文关键词。',
    reset: '清除筛选',
    changes: '项记录',
    loadMore: '继续加载',
    remaining: '条未显示',
    officialEnglish: '以下明细保留官方英文表述，避免翻译改变技术含义。',
    permalink: '本版本链接',
    overview: '版本说明',
    added: '新增',
    migration: '迁移说明',
    deprecated: '弃用',
    removed: '移除'
  },
  tw: {
    archive: 'PI RELEASE ARCHIVE',
    verified: '官方記錄核驗於',
    versions: '個正式版本',
    ledgerLabel: '版本檔案概況',
    range: '記錄範圍',
    latest: '目前最新',
    latestNote: '以官方 Coding Agent Changelog 與套件版本為準',
    latestChanges: '這一版的重點',
    source: '檢視官方原文',
    milestoneTitle: '五個關鍵節點',
    milestoneDeck: '從上下文、擴充生態到安全與 Harness 化，沿著代表性版本理解 Pi 的演進。',
    explorerTitle: '檢索全部版本',
    explorerDeck: '輸入版本號或關鍵字，也可以按年份、變更類型與主題縮小範圍。中文主題詞會自動匹配官方英文記錄。',
    searchLabel: '搜尋版本記錄',
    searchPlaceholder: '例如：0.84、上下文、Extension、Windows…',
    typeLabel: '變更類型',
    topicLabel: '主題',
    yearLabel: '年份',
    all: '全部',
    features: '新功能',
    breaking: '破壞性變更',
    fixed: '問題修復',
    changed: '行為調整',
    models: '模型',
    providers: 'Provider',
    sessions: 'Session',
    context: '上下文',
    extensions: 'Extension',
    packages: 'Package',
    safety: '安全',
    interface: '介面',
    sdk: 'SDK / CLI',
    platforms: '平臺',
    results: '條符合版本',
    empty: '沒有找到符合的版本。可以減少篩選條件，或改用官方英文關鍵字。',
    reset: '清除篩選',
    changes: '項記錄',
    loadMore: '繼續載入',
    remaining: '條未顯示',
    officialEnglish: '以下明細保留官方英文表述，避免翻譯改變技術含義。',
    permalink: '本版本連結',
    overview: '版本說明',
    added: '新增',
    migration: '遷移說明',
    deprecated: '棄用',
    removed: '移除'
  }
}

const milestones = [
  {
    family: '0.12',
    version: 'v0.12',
    labelCN: '上下文开始变长',
    labelTW: '上下文開始變長',
    textCN: '加入 Context Compaction 与分支来源记录，长会话第一次有了可持续工作的基础。',
    textTW: '加入 Context Compaction 與分支來源記錄，長工作階段第一次有了可持續工作的基礎。'
  },
  {
    family: '0.35',
    version: 'v0.35',
    labelCN: 'Extension 成为核心',
    labelTW: 'Extension 成為核心',
    textCN: 'Hooks 与 Custom Tools 统一为 Extension，能力扩展有了共同入口。',
    textTW: 'Hooks 與 Custom Tools 統一為 Extension，能力擴充有了共同入口。'
  },
  {
    family: '0.50',
    version: 'v0.50',
    labelCN: '共享生态成形',
    labelTW: '共享生態成形',
    textCN: 'Extension、Skill、Prompt 与 Theme 可以通过 Pi Package 安装和分享。',
    textTW: 'Extension、Skill、Prompt 與 Theme 可以透過 Pi Package 安裝和分享。'
  },
  {
    family: '0.79',
    version: 'v0.79',
    labelCN: '安全与成本可见',
    labelTW: '安全與成本可見',
    textCN: 'Project Trust 与缓存命中率进入核心体验，项目输入不再默认全部信任。',
    textTW: 'Project Trust 與快取命中率進入核心體驗，專案輸入不再預設全部信任。'
  },
  {
    family: '0.84',
    version: 'v0.84',
    labelCN: '走向 Agent Harness',
    labelTW: '走向 Agent Harness',
    textCN: '目录级上下文覆盖、远程 Session 与工具控制，让 Pi 更适合自由组合。',
    textTW: '目錄級上下文覆蓋、遠端 Session 與工具控制，讓 Pi 更適合自由組合。'
  }
]

const typeOptions = ['all', 'features', 'breaking', 'fixed', 'changed']
const topicOptions = [
  'all',
  'models',
  'providers',
  'sessions',
  'context',
  'extensions',
  'packages',
  'safety',
  'interface',
  'sdk',
  'platforms'
]

const synonymMap: Record<string, string[]> = {
  上下文: ['context', 'compaction', 'compact'],
  压缩: ['compaction', 'compact'],
  壓縮: ['compaction', 'compact'],
  会话: ['session', 'resume', 'transcript'],
  會話: ['session', 'resume', 'transcript'],
  工作阶段: ['session', 'resume', 'transcript'],
  工作階段: ['session', 'resume', 'transcript'],
  扩展: ['extension', 'hook'],
  擴充: ['extension', 'hook'],
  插件: ['extension', 'package'],
  外掛: ['extension', 'package'],
  模型: ['model', 'thinking', 'reasoning'],
  登录: ['login', 'oauth', 'authentication'],
  登入: ['login', 'oauth', 'authentication'],
  安全: ['trust', 'permission', 'security', 'credential'],
  缓存: ['cache'],
  快取: ['cache'],
  修复: ['fixed', 'fix'],
  修復: ['fixed', 'fix'],
  界面: ['tui', 'editor', 'footer', 'display'],
  介面: ['tui', 'editor', 'footer', 'display']
}

const indexedReleases = snapshot.releases.map((release) => ({
  release,
  searchText: normalizeText([
    release.version,
    release.date,
    ...release.topics,
    ...release.sections.flatMap((section) => [section.title, ...section.items])
  ].join(' '))
}))

const isTW = computed(() => route.path.startsWith('/zh-TW/'))
const t = computed(() => (isTW.value ? strings.tw : strings.cn))
const years = computed(() => [...new Set(snapshot.releases.map((release) => release.year))])
const latestRelease = snapshot.releases[0]
const latestHighlights = computed(() => {
  const prioritySections = latestRelease.sections.filter((section) =>
    ['features', 'added', 'changed'].includes(section.key)
  )
  const pool = prioritySections.length ? prioritySections : latestRelease.sections
  return pool.flatMap((section) => section.items).slice(0, 3)
})

const filteredReleases = computed(() => {
  const terms = normalizeText(query.value).split(/\s+/).filter(Boolean)

  return indexedReleases
    .filter(({ release, searchText }) => {
      if (year.value !== 'all' && release.year !== year.value) return false
      if (changeType.value !== 'all' && !release.changeTypes.includes(changeType.value)) return false
      if (topic.value !== 'all' && !release.topics.includes(topic.value)) return false

      return terms.every((term) => {
        if (searchText.includes(term)) return true
        return (synonymMap[term] || []).some((synonym) => searchText.includes(synonym))
      })
    })
    .map(({ release }) => release)
})

const visibleReleases = computed(() => filteredReleases.value.slice(0, displayLimit.value))
const remainingCount = computed(() => Math.max(0, filteredReleases.value.length - displayLimit.value))

watch([query, changeType, topic, year], () => {
  displayLimit.value = 18
})

onMounted(() => {
  const hash = decodeURIComponent(window.location.hash.slice(1))
  if (!hash.startsWith('release-v')) return

  const release = snapshot.releases.find((entry) => releaseId(entry.version) === hash)
  if (!release) return

  query.value = release.version
  nextTick(() => document.getElementById(hash)?.scrollIntoView({ block: 'start' }))
})

function normalizeText(value: string) {
  return value.normalize('NFKC').toLowerCase().trim()
}

function releaseId(version: string) {
  return `release-v${version.replace(/[^a-z\d]+/gi, '-')}`
}

function sectionLabel(section: ReleaseSection) {
  const label = (t.value as Record<string, string>)[section.key]
  return label || section.title
}

function setMilestone(family: string) {
  query.value = family
  changeType.value = 'all'
  topic.value = 'all'
  year.value = 'all'
  nextTick(() => explorer.value?.scrollIntoView({ block: 'start', behavior: 'smooth' }))
}

function resetFilters() {
  query.value = ''
  changeType.value = 'all'
  topic.value = 'all'
  year.value = 'all'
}
</script>

<template>
  <div class="pi-release-explorer">
    <section class="release-hero" aria-labelledby="release-archive-title">
      <div class="release-hero__main">
        <p class="release-kicker">{{ t.archive }}</p>
        <h2 id="release-archive-title">{{ t.latest }} <span>v{{ snapshot.meta.latestVersion }}</span></h2>
        <p class="release-latest-date">{{ snapshot.meta.latestDate }} · {{ t.latestNote }}</p>
        <div class="release-highlights">
          <p>{{ t.latestChanges }}</p>
          <ul>
            <li v-for="item in latestHighlights" :key="item">{{ item }}</li>
          </ul>
        </div>
        <a class="release-source-link" :href="latestRelease.sourceUrl" target="_blank" rel="noreferrer">
          {{ t.source }} <span aria-hidden="true">↗</span>
        </a>
      </div>
      <dl class="release-ledger" :aria-label="t.ledgerLabel">
        <div>
          <dt>{{ t.versions }}</dt>
          <dd>{{ snapshot.meta.releaseCount }}</dd>
        </div>
        <div>
          <dt>{{ t.range }}</dt>
          <dd>v{{ snapshot.meta.oldestVersion }}—v{{ snapshot.meta.latestVersion }}</dd>
        </div>
        <div>
          <dt>{{ t.verified }}</dt>
          <dd>{{ snapshot.meta.verifiedAt }}</dd>
        </div>
      </dl>
    </section>

    <section class="release-milestones" aria-labelledby="release-milestones-title">
      <header>
        <p>EVOLUTION MAP</p>
        <h2 id="release-milestones-title">{{ t.milestoneTitle }}</h2>
        <span>{{ t.milestoneDeck }}</span>
      </header>
      <div class="release-milestone-grid">
        <button
          v-for="(milestone, index) in milestones"
          :key="milestone.family"
          type="button"
          @click="setMilestone(milestone.family)"
        >
          <span class="release-milestone__index">0{{ index + 1 }}</span>
          <b>{{ milestone.version }}</b>
          <strong>{{ isTW ? milestone.labelTW : milestone.labelCN }}</strong>
          <small>{{ isTW ? milestone.textTW : milestone.textCN }}</small>
        </button>
      </div>
    </section>

    <section ref="explorer" class="release-browser" aria-labelledby="release-browser-title">
      <header class="release-browser__header">
        <div>
          <p>QUERY THE ARCHIVE</p>
          <h2 id="release-browser-title">{{ t.explorerTitle }}</h2>
        </div>
        <span>{{ t.explorerDeck }}</span>
      </header>

      <div class="release-controls">
        <label class="release-search">
          <span>{{ t.searchLabel }}</span>
          <span class="release-search__field">
            <span aria-hidden="true">⌕</span>
            <input v-model="query" type="search" :placeholder="t.searchPlaceholder">
          </span>
        </label>

        <fieldset>
          <legend>{{ t.typeLabel }}</legend>
          <div class="release-filter-row">
            <button
              v-for="option in typeOptions"
              :key="option"
              type="button"
              :class="{ 'is-active': changeType === option }"
              :aria-pressed="changeType === option"
              @click="changeType = option"
            >
              {{ (t as Record<string, string>)[option] }}
            </button>
          </div>
        </fieldset>

        <fieldset>
          <legend>{{ t.topicLabel }}</legend>
          <div class="release-filter-row release-filter-row--topics">
            <button
              v-for="option in topicOptions"
              :key="option"
              type="button"
              :class="{ 'is-active': topic === option }"
              :aria-pressed="topic === option"
              @click="topic = option"
            >
              {{ (t as Record<string, string>)[option] }}
            </button>
          </div>
        </fieldset>

        <fieldset>
          <legend>{{ t.yearLabel }}</legend>
          <div class="release-filter-row">
            <button
              type="button"
              :class="{ 'is-active': year === 'all' }"
              :aria-pressed="year === 'all'"
              @click="year = 'all'"
            >
              {{ t.all }}
            </button>
            <button
              v-for="option in years"
              :key="option"
              type="button"
              :class="{ 'is-active': year === option }"
              :aria-pressed="year === option"
              @click="year = option"
            >
              {{ option }}
            </button>
          </div>
        </fieldset>
      </div>

      <div class="release-result-bar" aria-live="polite">
        <strong>{{ filteredReleases.length }} {{ t.results }}</strong>
        <button v-if="query || changeType !== 'all' || topic !== 'all' || year !== 'all'" type="button" @click="resetFilters">
          {{ t.reset }}
        </button>
      </div>

      <div v-if="visibleReleases.length" class="release-list">
        <article
          v-for="(release, index) in visibleReleases"
          :id="releaseId(release.version)"
          :key="release.version"
          class="release-record"
        >
          <details :open="index === 0 && displayLimit === 18">
            <summary>
              <span class="release-record__version">v{{ release.version }}</span>
              <span class="release-record__date">{{ release.date }}</span>
              <span class="release-record__count">{{ release.itemCount }} {{ t.changes }}</span>
              <span class="release-record__toggle" aria-hidden="true">＋</span>
            </summary>
            <div class="release-record__body">
              <p class="release-record__note">{{ t.officialEnglish }}</p>
              <section v-for="section in release.sections" :key="`${release.version}-${section.title}`">
                <h3><span>{{ sectionLabel(section) }}</span><small>{{ section.title }}</small></h3>
                <ul>
                  <li v-for="item in section.items" :key="item">{{ item }}</li>
                </ul>
              </section>
              <footer>
                <a :href="release.sourceUrl" target="_blank" rel="noreferrer">{{ t.source }} ↗</a>
                <a :href="`#${releaseId(release.version)}`">{{ t.permalink }} #</a>
              </footer>
            </div>
          </details>
        </article>
      </div>

      <div v-else class="release-empty">
        <span aria-hidden="true">∅</span>
        <p>{{ t.empty }}</p>
        <button type="button" @click="resetFilters">{{ t.reset }}</button>
      </div>

      <button v-if="remainingCount" class="release-load-more" type="button" @click="displayLimit += 18">
        <span>{{ t.loadMore }}</span>
        <small>{{ remainingCount }} {{ t.remaining }}</small>
      </button>
    </section>
  </div>
</template>
