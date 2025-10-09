import type { App } from 'vue'
import DefaultTheme from 'vitepress/theme'
import AuthorDetail from './components/blog/AuthorDetail.vue'
import Post from './components/blog/Post.vue'
import PostAuthor from './components/blog/PostAuthor.vue'
import PostDetail from './components/blog/PostDetail.vue'
import PostIcon from './components/blog/PostIcon.vue'
import Posts from './components/blog/Posts.vue'
import FlexGrid from './components/FlexGrid.vue'
import GridItem from './components/GridItem.vue'
import 'uno.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component('Posts', Posts)
    app.component('Post', Post)
    app.component('PostDetail', PostDetail)
    app.component('PostIcon', PostIcon)
    app.component('PostAuthor', PostAuthor)
    app.component('AuthorDetail', AuthorDetail)
    app.component('FlexGrid', FlexGrid)
    app.component('GridItem', GridItem)
  },
}
