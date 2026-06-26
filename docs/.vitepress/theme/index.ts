import type { App } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { defineComponent, h, nextTick, onMounted, watch } from 'vue'
import FlexGrid from './components/FlexGrid.vue'
import GridItem from './components/GridItem.vue'
import Tabs from './components/Tabs.vue'
import './styles.css'
import 'uno.css'

function centerWideMermaidBlocks() {
  if (typeof document === 'undefined')
    return

  document.querySelectorAll<HTMLElement>('.cid-mermaid').forEach((element) => {
    const targetScroll = Math.round((element.scrollWidth - element.clientWidth) / 2)

    if (targetScroll <= 0)
      return

    element.scrollLeft = targetScroll
  })
}

function scheduleMermaidCentering() {
  if (typeof window === 'undefined')
    return

  nextTick(() => {
    window.requestAnimationFrame(centerWideMermaidBlocks)
    window.setTimeout(centerWideMermaidBlocks, 150)
    window.setTimeout(centerWideMermaidBlocks, 600)
  })
}

const MermaidAwareLayout = defineComponent({
  name: 'MermaidAwareLayout',
  setup() {
    const route = useRoute()

    onMounted(scheduleMermaidCentering)
    watch(() => route.path, scheduleMermaidCentering)

    return () => h(DefaultTheme.Layout!)
  },
})

export default {
  ...DefaultTheme,
  Layout: MermaidAwareLayout,
  enhanceApp({ app }: { app: App }) {
    app.component('FlexGrid', FlexGrid)
    app.component('GridItem', GridItem)
    app.component('Tabs', Tabs)
  },
}
