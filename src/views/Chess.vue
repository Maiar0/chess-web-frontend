<template>
  <div class="bg-layer"></div>
  <div class="content">
    <div class="chess-container">
      <h1>Play Chess</h1>
      <h1>Choose an option below:</h1>
      <button @click="onNewGame">Play a Friend</button>
      <input v-model="gameId" placeholder="Enter Game ID" />
      <button @click="onResumeGame">Resume Your Game</button>
      <button @click="onNewAiGame">Play against AI</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'vue-router'
import ChessApi from '../api/ChessApi'

onMounted(() => {
  const playerKey = 'chess-player-uuid'
  let playerId = localStorage.getItem(playerKey)

  if (!playerId) {
    playerId = uuidv4()
    localStorage.setItem(playerKey, playerId)
    console.log('New player UUID generated:', playerId)
  } else {
    console.log('Existing player UUID found:', playerId)
  }
})

const gameId = ref('')
const router = useRouter()
const api = new ChessApi()

async function onNewGame() {
  try {
    const result = await api.newGame();
    gameId.value = result.data.gameId;
    console.log('New game created with ID:', gameId.value);
    router.push(`/game/${gameId.value}`);
  } catch (error) {
    console.error('Error creating new game:', error);
  }
}
async function onNewAiGame() {
  try {
    const result = await api.newGame(true);
    gameId.value = result.data.gameId;
    console.log('New game created with ID:', gameId.value);
    router.push(`/game/${gameId.value}`);
  } catch (error) {
    console.error('Error creating new game:', error);
  }
}

function onResumeGame() {
  if (!gameId.value) {
    alert('Please enter a Game ID to resume.');
    return;
  }
  if (gameId.value.trim()) {
    router.push(`/game/${gameId.value.trim()}`);
  }
}
</script>

<style scoped>
.bg-layer {
  position: absolute;
  top: -2rem;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("/chesssprites/chessboard.png") center/cover no-repeat;
  background-size: 600px 600px;
  z-index: 0;
}

.content {
  color: black;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 1rem;
  box-sizing: border-box;
}

.chess-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

input {
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid white;
}
</style>
