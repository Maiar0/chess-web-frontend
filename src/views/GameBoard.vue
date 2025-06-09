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
    <MessagePopup :message="errorMessage" :visible="showError" />
    <ChoicePopup v-if="showPopup" :message="message" :choices="['New Game', 'New AI Game']" @select="handleCheckMate" />
  </div>
</template>
<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Chessboard from '../components/Chessboard.vue';
import CapturedPieces from '../components/CapturedPieces.vue';
import GameStatus from '../components/GameStatus.vue';
import MessagePopup from '../components/MessagePopup.vue';
import ChessApi from '../api/ChessApi';
import socket from '../api/ChessSocket';
import ChoicePopup from '../components/ChoicePopup.vue';

const route = useRoute();
const api = new ChessApi();

const conected = ref(false);
const socketId = ref('');
let message = '';


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
const showPopup = ref(false);

const checkMate = computed(() => {
  const boardFen = fen.value.split(' ')[0] || 'kK';
  return !(boardFen.includes('k') && boardFen.includes('K'));
});
watch(
  checkMate,
  (isCheckMate) => {
    if (isCheckMate) {
      const pieces = fen.value.split(' ')[0];
      if (pieces.includes('k')) {
        message = 'CheckMate: Black wins!';
      } else if (pieces.contains('K')) {
        message = 'CheckMate: White wins!';
      } else {
        message = 'Draw!';
      }
      showPopup.value = true;
    }
  }
);

const router = useRouter()
async function handleCheckMate(choice) {
  console.log('Checkmate choice:', choice);
  if (choice === 'New Game') {
    console.log('NewGame clicked');
    const result = await api.newGame();
    router.push(`/game/${result.data.gameId}`);
  } else if (choice === 'New AI Game') {
    console.log('NewAiGame clicked');
    const result = await api.newGame(true);
    router.push(`/game/${result.data.gameId}`);
  } else {
    console.error('Unknown choice:', choice);
  }
  showPopup.value = false;
}



//Handles preload call
async function initGame(gameId) {
  socket.emit('registerPlayer', localStorage.getItem('chess-player-uuid'));
  socket.emit('joinGame', route.params.gameId);

  socket.on('gameState', (state) => {
    console.log('Game state received:', state);
    //gameId?
    fen.value = state.fen;
    captured.value = state.capturedPieces;
    activeColor.value = state.activeColor;
    inCheck.value = state.inCheck;
    fullMove.value = fen.value.split(' ')[4];
    halfMove.value = fen.value.split(' ')[5];
  });

  try {
    const result = await api.getInfo(route.params.gameId);
    //console.log('Game data:', result.data);
    updateValues(result);
  } catch (error) {
    console.error('Error fetching game data:', error);
  }
}

// Handle moves from the Chessboard component
async function onMove({ from, to, promotionChoice }) {
  console.log('from', from, 'to', to);

  try {
    console.log('Promotion Char:', promotionChoice);
    const result = await api.movePiece(gameId.value, from, to, promotionChoice.value);
    console.log('Move result:', result.data);
    if (result.status === 'ok') {
      // Update the board and captured pieces
      updateValues(result);
    }
  } catch (error) {
    console.error(`Code: ${error.code}, Message: ${error.message}`);
    showErrorPopup(`${error.code}: ${error.message}`);
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
//handles error messages
let errorMessage = ref('');
let showError = ref(false);
function showErrorPopup(msg) {
  errorMessage.value = msg;
  showError.value = true;
  setTimeout(() => showError.value = false, 3000); // Hide after 3s
}

onMounted(() => initGame(gameId.value));
watch(
  () => route.params.gameId,
  newId => {
    gameId.value = newId;
    initGame(newId);
  }
);

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
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.chessboard {
  width: 100%;
}
</style>