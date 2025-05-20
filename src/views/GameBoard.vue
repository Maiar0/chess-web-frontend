<template>
  <div class="gameboard">
    <!-- Captures for White -->
    <CapturedPieces
      class="captures"
      side="white"
      :pieces="captured"
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
      :pieces="captured"
    />
  </div>
</template>
<script setup> 
import {ref, onMounted} from 'vue';
import { useRoute } from 'vue-router';
import Chessboard from '../components/Chessboard.vue';
import CapturedPieces from '../components/CapturedPieces.vue';
import ChessApi from '../api/ChessApi';

const route = useRoute();
const api = new ChessApi('http://localhost:5000');

const fen = ref('');
const captured = ref([]);
const gameId = ref('');


onMounted(async () => {
  try {
    console.log('Game ID:', route.params.gameId);
    const result = await api.getInfo(route.params.gameId);
    console.log('Game data:', result.data);
    gameId.value = result.data.gameId;
    fen.value = result.data.fen;
    captured.value = result.data.captured;
  }catch(error) {
    console.error('Error fetching game data:', error);
  }
});

// Handle moves from the Chessboard component
async function onMove({ from, to }) {
  
} 


</script>