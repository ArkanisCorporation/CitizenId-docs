import type { App } from 'vue'
import { useData, useRoute, useRouter } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { defineComponent, h, nextTick, onMounted, onUnmounted, watch } from 'vue'
import DiagramLegend from './components/DiagramLegend.vue'
import FlexGrid from './components/FlexGrid.vue'
import GridItem from './components/GridItem.vue'
import ImageFigure from './components/ImageFigure.vue'
import ImageStepper from './components/ImageStepper.vue'
import MermaidDiagram from './components/MermaidDiagram.vue'
import Tabs from './components/Tabs.vue'
import './styles.css'
import 'uno.css'

type ScrollOffset = number | string | string[] | {
  selector: string
  padding?: number
}

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

function getCurrentHashTarget() {
  if (typeof window === 'undefined')
    return null

  const hash = window.location.hash

  if (!hash || hash === '#')
    return null

  let targetId = hash.slice(1)

  try {
    targetId = decodeURIComponent(targetId)
  }
  catch {}

  return document.getElementById(targetId)
}

function tryOffsetSelector(selector: string, padding: number) {
  const element = document.querySelector(selector)

  if (!element)
    return 0

  const bottom = element.getBoundingClientRect().bottom

  if (bottom < 0)
    return 0

  return bottom + padding
}

function getScrollOffset(scrollOffset: ScrollOffset | undefined) {
  let offsetConfig = scrollOffset
  let offset = 0
  let padding = 24

  if (
    typeof offsetConfig === 'object'
    && !Array.isArray(offsetConfig)
    && 'selector' in offsetConfig
  ) {
    padding = offsetConfig.padding ?? padding
    offsetConfig = offsetConfig.selector
  }

  if (typeof offsetConfig === 'number') {
    offset = offsetConfig
  }
  else if (typeof offsetConfig === 'string') {
    offset = tryOffsetSelector(offsetConfig, padding)
  }
  else if (Array.isArray(offsetConfig)) {
    for (const selector of offsetConfig) {
      const selectorOffset = tryOffsetSelector(selector, padding)

      if (selectorOffset) {
        offset = selectorOffset
        break
      }
    }
  }

  return offset
}

function scrollToCurrentHashTarget(scrollOffset: ScrollOffset | undefined) {
  const target = getCurrentHashTarget()

  if (!target)
    return

  const targetPadding = Number.parseInt(window.getComputedStyle(target).paddingTop, 10) || 0
  const targetTop = window.scrollY
    + target.getBoundingClientRect().top
    - getScrollOffset(scrollOffset)
    + targetPadding

  window.scrollTo(0, targetTop)
}

function scheduleHashTargetScroll(scrollOffset: ScrollOffset | undefined) {
  if (typeof window === 'undefined' || !window.location.hash)
    return

  nextTick(() => {
    window.requestAnimationFrame(() => scrollToCurrentHashTarget(scrollOffset))
    window.setTimeout(() => scrollToCurrentHashTarget(scrollOffset), 150)
    window.setTimeout(() => scrollToCurrentHashTarget(scrollOffset), 700)
  })
}

function createMermaidLinkHandler(
  router: ReturnType<typeof useRouter>,
  scheduleScroll: () => void,
) {
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
    scheduleScroll()
  }
}

const MermaidAwareLayout = defineComponent({
  name: 'MermaidAwareLayout',
  setup() {
    const { site } = useData()
    const route = useRoute()
    const router = useRouter()
    const scheduleCurrentHashTargetScroll = () => scheduleHashTargetScroll(site.value.scrollOffset)
    const handleMermaidLinkClick = createMermaidLinkHandler(router, scheduleCurrentHashTargetScroll)

    onMounted(() => {
      scheduleMermaidCentering()
      scheduleCurrentHashTargetScroll()
      window.addEventListener('click', handleMermaidLinkClick, { capture: true })
      window.addEventListener('hashchange', scheduleCurrentHashTargetScroll)
      window.addEventListener('cid:mermaid-rendered', scheduleCurrentHashTargetScroll)
    })
    onUnmounted(() => {
      window.removeEventListener('click', handleMermaidLinkClick, { capture: true })
      window.removeEventListener('hashchange', scheduleCurrentHashTargetScroll)
      window.removeEventListener('cid:mermaid-rendered', scheduleCurrentHashTargetScroll)
    })
    watch(() => route.path, () => {
      scheduleMermaidCentering()
      scheduleCurrentHashTargetScroll()
    })

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
    app.component('ImageFigure', ImageFigure)
    app.component('ImageStepper', ImageStepper)
    app.component('MermaidDiagram', MermaidDiagram)
    app.component('Tabs', Tabs)
  },
}
