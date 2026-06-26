import type { App } from 'vue'
import { useRoute, useRouter } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { defineComponent, h, nextTick, onMounted, onUnmounted, watch } from 'vue'
import DiagramLegend from './components/DiagramLegend.vue'
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

function createMermaidLinkHandler(router: ReturnType<typeof useRouter>) {
  return (event: MouseEvent) => {
    if (
      event.defaultPrevented
      || event.button !== 0
      || event.ctrlKey
      || event.shiftKey
      || event.altKey
      || event.metaKey
      || !(event.target instanceof Element)
    ) {
      return
    }

    const link = event.target.closest<HTMLAnchorElement | SVGAElement>('.cid-mermaid a')

    if (!link || link.hasAttribute('download'))
      return

    const target = link.getAttribute('target')

    if (target && target !== '_self')
      return

    const linkHref = link.getAttribute('href') ?? link.getAttribute('xlink:href')

    if (!linkHref)
      return

    const targetUrl = new URL(linkHref, link.baseURI)
    const currentUrl = new URL(window.location.href)

    if (targetUrl.origin !== currentUrl.origin)
      return

    event.preventDefault()
    router.go(`${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`)
  }
}

const MermaidAwareLayout = defineComponent({
  name: 'MermaidAwareLayout',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const handleMermaidLinkClick = createMermaidLinkHandler(router)

    onMounted(() => {
      scheduleMermaidCentering()
      window.addEventListener('click', handleMermaidLinkClick, { capture: true })
    })
    onUnmounted(() => {
      window.removeEventListener('click', handleMermaidLinkClick, { capture: true })
    })
    watch(() => route.path, scheduleMermaidCentering)

    return () => h(DefaultTheme.Layout!)
  },
})

export default {
  ...DefaultTheme,
  Layout: MermaidAwareLayout,
  enhanceApp({ app }: { app: App }) {
    app.component('DiagramLegend', DiagramLegend)
    app.component('FlexGrid', FlexGrid)
    app.component('GridItem', GridItem)
    app.component('Tabs', Tabs)
  },
}
