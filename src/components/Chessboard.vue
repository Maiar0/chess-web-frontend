<template>
  <div class="chessboard">
    <div 
      v-for="(rank, y) in board" 
      :key="y" 
      class="rank"
    >
      <div
        v-for="(cell, x) in rank"
        :key="x"
        class="square"
      >
        <span v-if="cell">{{ cell }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  fen: {
    type: String,
    required: true
  }
})
console.log('props.fen', props.fen)
const selected = ref(null);

/**
 * Parses FEN and returns a 2D array [rank][file] of single-character strings or null.
 */
function createBoard(fen) {
  const board = Array.from({ length: 8 }, () => Array(8).fill(null))
  if (!fen) {
    console.error('FEN string is empty or invalid')
    return board;
  }
  const rows = fen.split(' ')[0].split('/')
  console.log('rows', rows)
  // Iterate over ranks (0-7) from top to bottom
  
  for (let rankIndex = 0; rankIndex < 8; rankIndex++) {
    let file = 0
    const row = rows[rankIndex]
    for (const ch of row) {
      if (/\d/.test(ch)) {
        file += parseInt(ch, 10)
      } else {
        board[rankIndex][file] = ch
        file++
      }
    }
  }
  return board
}

const board = computed(() => createBoard(props.fen))
</script>

<style scoped>
.chessboard {
  /* make the board a grid with 8 columns */
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  /* optional fixed size or ratio */
  width: 400px;
  height: 400px;
  border: 2px solid #333;
}

.square {
  /* each square is a cell in that grid */
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  /* give a thin border so you can see the squares */
  border: 1px solid #999;
  font-size: 1.25rem;
  user-select: none;
  /* alternate light/dark background */
  background-color: #f0d9b5;
}

.square:nth-child(odd) {
  background-color: #b58863;
}
</style>

