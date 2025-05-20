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
import ChessApi from '../api/ChessApi'

const gameId = ref('')
const router = useRouter()
const api = new ChessApi('http://localhost:5000')

async function onNewGame() {
  try{
    const result =  await api.newGame();
    console.log(result);
    gameId.value = result.data.gameId;
    console.log('New game created with ID:', gameId.value);
    router.push(`/game/${gameId.value}`);
  }catch (error) {
    console.error('Error creating new game:', error);
  }
}

function onResumeGame() {
  if (gameId.value.trim()) {
    router.push(`/game/${gameId.value.trim()}`);
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
