import type { App } from 'vue'
import DefaultTheme from 'vitepress/theme'
import FlexGrid from './components/FlexGrid.vue'
import GridItem from './components/GridItem.vue'
import Tabs from './components/Tabs.vue'
import './styles.css'
import 'uno.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component('FlexGrid', FlexGrid)
    app.component('GridItem', GridItem)
    app.component('Tabs', Tabs)
  },
}
