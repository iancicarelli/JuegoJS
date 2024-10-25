import { createMemoryHistory, createRouter } from 'vue-router'

import GameView from './GameView.vue'
import HomeView from './HomeView.vue'
import AboutView from './AboutView.vue'

const routes = [
  { path: '/play', component: GameView },
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router