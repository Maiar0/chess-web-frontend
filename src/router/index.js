import { createRouter, createWebHistory } from 'vue-router'
import Home      from '../views/Home.vue'
import GameBoard from '../views/GameBoard.vue'
import About     from '../views/About.vue'

const routes = [
  { path: '/',              component: Home },
  { path: '/home',          component: Home },
  { path: '/about',         component: About },
  { path: '/game/:gameId',  component: GameBoard, props: true }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
