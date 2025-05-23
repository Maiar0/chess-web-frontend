<template>
  <div class="gameboard">
    <!-- Captures for White -->
    <CapturedPieces
      class="captures"
      side="white"
      :pieces="capturedWhite"
    />

    <!-- Main Chessboard -->
    <Chessboard
      class="board"
      v-if="fen"
      :fen="fen"
      @move="onMove"
    />

    <!-- Captures for Black -->
    <CapturedPieces
      class="captures"
      side="black"
      :pieces="capturedBlack"
    />
  </div>
</template>
<script setup> 
import {ref, onMounted, computed} from 'vue';
import { useRoute } from 'vue-router';
import Chessboard from '../components/Chessboard.vue';
import CapturedPieces from '../components/CapturedPieces.vue';
import ChessApi from '../api/ChessApi';

const route = useRoute();
const api = new ChessApi('http://localhost:5000');

const fen = ref('');
const captured = ref('');

// Computed: all the white‐captured letters
const capturedWhite = computed(() => {
  // split into chars, keep only [A–Z]
  return captured.value
    .split('')
    .filter(c => /[A-Z]/.test(c))
})

// Computed: all the black‐captured letters
const capturedBlack = computed(() => {
  // split into chars, keep only [a–z]
  return captured.value
    .split('')
    .filter(c => /[a-z]/.test(c))
})
const gameId = ref('');


onMounted(async () => {
  try {
    console.log('Game ID:', route.params.gameId);
    const result = await api.getInfo(route.params.gameId);
    console.log('Game data:', result.data);
    gameId.value = result.data.gameId;
    fen.value = result.data.fen;
    captured.value = String(result.data.captured || '');
  }catch(error) {
    console.error('Error fetching game data:', error);
  }
});

// Handle moves from the Chessboard component
async function onMove({ from, to }) {
  console.log('Move from:', from, 'to:', to);
  try{
    const result = await api.movePiece(gameId.value, from, to);
    console.log('Move result:', result.data);
    if (result.status === 'ok') {
      // Update the board and captured pieces
      fen.value = result.data.fen;
      captured.value = result.data.captured;
    } else {
      console.error('Move failed:', result.data.message);
    }
  }catch (error) {
    console.error('Error making move:', error);
  }
} 



</script>