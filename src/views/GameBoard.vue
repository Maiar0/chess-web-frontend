<template>
  <GameStatus :gameId="gameId" :activeColor="activeColor" :fullMove="fullMove" :halfMove="halfMove" :inCheck="inCheck"
    :buttons="buttons" />
  <div class="game-container">
    <div class="board-area">
      <CapturedPieces class="captures captures--white" side="white" :pieces="capturedWhite" />
      <Chessboard class="board" v-if="fen" :fen="fen" @move="onMove" />
      <CapturedPieces class="captures captures--black" side="black" :pieces="capturedBlack" />
    </div>
    <MessagePopup :message="errorMessage" :visible="showError" />
    <ChoicePopup v-if="popup.visible" :message="popup.message" :choices="popup.choices" @select="onPopupSelect" />
  </div>
</template>
<script setup>
import { ref, onMounted, computed, watch, reactive } from 'vue';
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

const props = defineProps({
  gameId: {
    type: String,
    required: true
  }
});
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
const status = ref('');
const popup = reactive({
  visible: false,
  message: '',
  choices: /** @type {string[]} */ ([]),
  handler: /** @type {(choice:string)=>void} */ (() => { })
});
function onPopupSelect(choice) {
  popup.visible = false
  popup.handler(choice)
}

const checkMate = computed(() => {
  const boardFen = fen.value.split(' ')[0] || 'kK';
  return !(boardFen.includes('k') && boardFen.includes('K'));
});
watch(
  checkMate,
  (isCheckMate) => {
    if (isCheckMate) {
      popup.choices = ['New Game', 'New AI Game'];
      const pieces = fen.value.split(' ')[0];
      if (pieces.includes('k')) {
        popup.message = 'CheckMate: Black wins!';
      } else if (pieces.includes('K')) {
        popup.message = 'CheckMate: White wins!';
      } else {
        popup.message = 'Draw!';
      }
      popup.handler = handleGameOver;
      popup.visible = true;
    }
  }
);

const router = useRouter()
async function handleGameOver(choice) {
  console.log('End Game choice:', choice);
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
  popup.visible = false;
}

async function handleColorChoice(choice) {
  try {
    const result = await api.chooseColor(route.params.gameId, choice.toLowerCase());
    showErrorPopup(result.data.message || 'Color choice made successfully');
    console.log('Color choice result:', result.data);
  } catch (err) {
    showErrorPopup(err.message);
  }

}



//Handles preload call
async function initGame(gameId) {
  socket.emit('registerPlayer', localStorage.getItem('chess-player-uuid'));
  socket.emit('joinGame', route.params.gameId);

  socket.on('gameState', (state) => {
    console.log('Game state received:', state);
    fen.value = state.fen;
    captured.value = state.capturedPieces;
    activeColor.value = state.activeColor;
    inCheck.value = state.inCheck;
    halfMove.value = fen.value.split(' ')[4];
    fullMove.value = fen.value.split(' ')[5];
  });
  //if someone requests a draw, show a popup
  socket.on('drawOffered', (data) => {
    console.log('Draw offer received:', data);
    popup.message = `${data.by} has offered a draw. Do you accept?`;
    popup.choices = ['Accept', 'Decline'];
    popup.handler = respondDraw;
    popup.visible = true;
  });

  socket.on('drawResult', (data) => {
    console.log('Draw result:', data);
    console.log('popupvalue', popup);
    if (data.white && data.black) {
      popup.visible = true,
        popup.message = 'Draw Accepted',
        popup.choices = ['New Game', 'New AI Game'],
        popup.handler = handleGameOver
    } else {
      popup.visible = false;
      const color = data.by;
      showErrorPopup(`Draw Declined by ${color}`);
    }
  });

  socket.on('resignation', (data) => {
    console.log('Resignation received:', data);
    popup.visible = true;
    popup.message = `${data.by} has resigned`;
    popup.choices = ['New Game', 'New AI Game'];
    popup.handler = handleGameOver;
  });

  socket.on('drawClaimed', (data) => {
    console.log('Draw claimed:', data);
    popup.visible = true;
    popup.message = `${data.by} has claimed a draw`;
    popup.choices = ['New Game', 'New AI Game'];
    popup.handler = handleGameOver;
  });

  try {
    const result = await api.getInfo(route.params.gameId);
    //console.log('Game data:', result.data);
    updateValues(result);
    popup.message = 'Choose your color:';
    popup.choices = ['Black', 'White'];
    popup.handler = handleColorChoice;
    console.log('Initial FEN:', result.data.fen);
    const initFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    if (initFen === result.data.fen) {
      popup.visible = true;
    }
  } catch (error) {
    console.error('Error fetching game data:', error);
  }
}

async function respondDraw(choice) {
  try {
    const result = await api.respondDraw(gameId.value, choice);
    console.log('Draw response:', result.data);
  } catch (error) {
    console.error('Error responding to draw:', error);
    showErrorPopup(error.message);
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
  status.value = result.data.status;
  halfMove.value = fen.value.split(' ')[4];
  fullMove.value = fen.value.split(' ')[5];
}
//handles error messages
let errorMessage = ref('');
let showError = ref(false);
function showErrorPopup(msg) {
  errorMessage.value = msg;
  showError.value = true;
  setTimeout(() => showError.value = false, 3000); // Hide after 3s
}

const buttons = ref([]);
function initButtons(status) {
  buttons.value = [
    { label: 'Resign', action: resign },
    { label: 'Offer Draw', action: () => socket.emit('offerDraw', { gameId: gameId.value, playerId: localStorage.getItem('chess-player-uuid') }) }];
  if (parseInt(fen.value.split(' ')[4], 10) >= 50) {
    buttons.value.push({ label: 'Claim Draw', action: drawClaimed });
  }
}
async function drawClaimed() {
  try {
    const result = await api.claimDraw(gameId.value);
    console.log('Draw claimed:', result.data);
    updateValues(result);
  } catch (error) {
    console.error('Error claiming draw:', error);
    showErrorPopup(error.message);
  }
}
async function resign() {
  try {
    const result = await api.resign(gameId.value);
    console.log('Resignation result:', result.data);
    popup.visible = true;
    popup.message = `${result.data.by} has resigned.`;
    popup.choices = ['New Game', 'New AI Game'];
    popup.handler = handleGameOver;
  } catch (error) {
    console.error('Error resigning:', error);
    showErrorPopup(error.message);
  }
}
watch(status, (newStatus) => {
  initButtons(newStatus)
})

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
.game-container {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
}

.board-area {
  flex: 1 1 320px;
  display: flex;
  justify-content: center;
}

/* GameStatus spans full width on row-1 */
.game-status {
  grid-row: 1;
  grid-column: 1;
  width: 100%;
}

/* mobile reflow */
@media (max-width: 600px) {
  .game-container {
    flex-direction: column;
    align-items: center;
  }

  .board-area,
  .game-status {
    width: 100%;
  }
}
</style>