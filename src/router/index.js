import { createRouter, createWebHistory } from 'vue-router'
import Home       from '../views/Home.vue'
import Chess      from '../views/Chess.vue'
import GameBoard  from '../views/GameBoard.vue'
import About      from '../views/About.vue'
import BrokenLink from '../views/BrokenLink.vue'

const routes = [
  { path: '/broken-link',   component: BrokenLink },
  { path: '/',              component: Home },
  { path: '/Chess',         component: Chess },
  { path: '/about',         component: About },
  { path: '/game/:gameId',  component: GameBoard, props: true },
  { path: '/tictactoe',  component: BrokenLink}
]

export default createRouter({
  history: createWebHistory(),
  routes
})
