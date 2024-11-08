import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChooseCharacter from '@/views/ChooseCharacter.vue'
import GameComponent from '@/components/GameComponent.vue'
import AboutView from '@/views/AboutView.vue'
import RegisterComponent from '@/components/RegisterComponent.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },{
    path: '/chooseCharacter',
    name:'chooseCharacter',
    component: ChooseCharacter
  },{
    path: '/game',
    name:'game',
    component: GameComponent
  },{
    path:'/register',
    name:'register',
    component:RegisterComponent
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
