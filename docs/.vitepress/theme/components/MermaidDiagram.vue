<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { mermaidConfig } from '../../mermaidConfig'

const props = defineProps<{
  graph: string
  id: string
}>()

const root = ref<HTMLElement | null>(null)
const svg = ref('')
const error = ref('')
let observer: MutationObserver | undefined
let renderVersion = 0

function centerDiagram() {
  const element = root.value

  if (!element)
    return

  const targetScroll = Math.round((element.scrollWidth - element.clientWidth) / 2)

  if (targetScroll > 0)
    element.scrollLeft = targetScroll
}

async function renderDiagram() {
  const version = ++renderVersion
  error.value = ''

  try {
    const { default: mermaid } = await import('mermaid')
    const isDark = document.documentElement.classList.contains('dark')
    const config = {
      ...mermaidConfig,
      theme: isDark ? 'dark' : mermaidConfig.theme,
    }

    mermaid.initialize(config)

    const { svg: renderedSvg } = await mermaid.render(
      `${props.id}-${version}`,
      decodeURIComponent(props.graph),
    )

    if (version !== renderVersion)
      return

    svg.value = `${renderedSvg}<span hidden>${version}</span>`
    await nextTick()
    centerDiagram()
  }
  catch (caughtError) {
    error.value = caughtError instanceof Error
      ? caughtError.message
      : 'Unable to render diagram.'
  }
}

onMounted(() => {
  observer = new MutationObserver(() => {
    void renderDiagram()
  })
  observer.observe(document.documentElement, {
    attributeFilter: ['class'],
    attributes: true,
  })

  void renderDiagram()
})

onBeforeUnmount(() => {
  observer?.disconnect()
})

watch(
  () => [props.graph, props.id],
  () => {
    void renderDiagram()
  },
)
</script>

<template>
  <div ref="root">
    <p
      v-if="error"
      class="cid-mermaid__error"
    >
      {{ error }}
    </p>
    <p
      v-else-if="!svg"
      class="cid-mermaid__loading"
    >
      Loading diagram...
    </p>
    <div
      v-else
      v-html="svg"
    />
  </div>
</template>
