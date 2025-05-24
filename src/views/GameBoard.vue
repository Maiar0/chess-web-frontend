<template>
  <div class="gameboard">
    <div class="right-gameboard">
      <CapturedPieces class="captures captures--white" side="white" :pieces="capturedWhite" />
      <GameStatus :gameId="gameId" :activeColor="activeColor" :fullMove="fullMove" :halfMove="halfMove"
        :inCheck="inCheck" />
      <CapturedPieces class="captures captures--black" side="black" :pieces="capturedBlack" />
    </div>
    <div class="board-area">
      <Chessboard class="board" v-if="fen" :fen="fen" @move="onMove" />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import Chessboard from '../components/Chessboard.vue';
import CapturedPieces from '../components/CapturedPieces.vue';
import GameStatus from '../components/GameStatus.vue';
import ChessApi from '../api/ChessApi';

const route = useRoute();
const api = new ChessApi('http://localhost:5000');

const fen = ref('');
const captured = ref('');
// Computed: all the white‐captured letters
const capturedWhite = computed(() => {
  const raw = captured.value || ''
  return raw
    .split('')
    .filter(c => /[A-Z]/.test(c))
})

// Computed: all the black‐captured letters
const capturedBlack = computed(() => {
  const raw = captured.value || ''
  return raw
    .split('')
    .filter(c => /[a-z]/.test(c))
})
const gameId = ref('');
const activeColor = ref('')
const fullMove = ref('');
const halfMove = ref('');
const inCheck = ref('');
//Handles preload call
onMounted(async () => {
  try {
    console.log('Game ID:', route.params.gameId);
    const result = await api.getInfo(route.params.gameId);
    console.log('Game data:', result.data);
    updateValues(result);
  } catch (error) {
    console.error('Error fetching game data:', error);
  }
});
// Handle moves from the Chessboard component
async function onMove({ from, to }) {
  console.log('Move from:', from, 'to:', to);
  try {
    const result = await api.movePiece(gameId.value, from, to);
    console.log('Move result:', result.data);
    if (result.status === 'ok') {
      // Update the board and captured pieces
      updateValues(result);
    } else {
      console.error('Move failed:', result.data.message);
    }
  } catch (error) {
    console.error('Error making move:', error);
  }
}
//Updates props for components
function updateValues(result) {
  gameId.value = result.data.gameId;
  fen.value = result.data.fen;
  captured.value = result.data.capturedPieces;
  activeColor.value = result.data.activeColor;
  inCheck.value = result.data.inCheck;
  fullMove.value = fen.value.split(' ')[4];
  halfMove.value = fen.value.split(' ')[5];
}
</script>
<style scoped>
.gameboard {
  position: relative;
  padding: 2rem;
  width: 97%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: #222;
}

.game-status {
  position: center;
  top: 1rem;
  right: 1rem;
}

.right-gameboard {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.board-area {
  position: relative;
  width: 400px;
  margin: 2rem auto;
}

.captures {
  position: center;
  display: flex;
  gap: 0.5rem;
}

.chessboard {
  width: 100%;
}
</style>