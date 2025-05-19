<template>
  <div class="home">
    <h1>Welcome to the Game</h1>
    <p>Choose an option below:</p>
  </div>
  <div class="home-container">
    <button @click="onNewGame">New Game</button>
    <input v-model="gameId" placeholder="Enter Game ID" />
    <button @click="onResumeGame">Resume Game</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const gameId = ref('')
const router = useRouter()

function onNewGame() {
  // TODO: replace 'NEW_ID' with real ID from backend
  router.push('/game/NEW_ID')
}

function onResumeGame() {
  if (gameId.value.trim()) {
    router.push(`/game/${gameId.value.trim()}`)
  }
}
</script>

<style scoped>
input {
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid white;
}
</style>
