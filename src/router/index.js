import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChooseCharacter from '@/views/ChooseCharacter.vue'
import GameComponent from '@/components/GameComponent.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
  },{
    path: '/chooseCharacter',
    name:'chooseCharacter',
    component: ChooseCharacter
  },{
    path: '/game',
    name:'game',
    component: GameComponent
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router