<template>
  <div class="board-with-labels">
    <div class="files files--top">
      <span v-for="f in files" :key="f">{{ f }}</span>
    </div>

    <div class="ranks-files-row">
      <div class="ranks">
        <span v-for="r in ranks.slice().reverse()" :key="r">{{ r }}</span>
      </div>
      <!--- board --->
      <div class="chessboard">
        <div v-for="(rank, y) in board" :key="y" class="rank">
          <div v-for="(cell, x) in rank" :key="x" class="square" :class="{
            dark: (x + y) % 2 === 0,
            selected: isSelected(x, y)
          }" @click="handleSquareClick(x, y)">
            <span v-if="cell">{{ cell }}</span>
          </div>
        </div>
      </div>
      <div class="ranks">
        <span v-for="r in ranks" :key="r">{{ r }}</span>
      </div>
    </div>

    <div class="files files--bottom">
      <span v-for="f in files" :key="f">{{ f }}</span>
    </div>
  </div>

</template>

<script setup>
import { defineProps, computed, ref } from 'vue'
const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const ranks = [1, 2, 3, 4, 5, 6, 7, 8]
const props = defineProps({
  fen: {
    type: String,
    required: true
  }
})
console.log('props.fen', props.fen)
const selected = ref(null);// selected square coordinates

function createBoard(fen) {
  const board = Array.from({ length: 8 }, () => Array(8).fill(null))
  const rows = fen.split(' ')[0].split('/')
  for (let i = 0; i < 8; i++) {
    let file = 0
    for (const ch of rows[i]) {
      if (/\d/.test(ch)) {
        file += +ch
      } else {
        const y = 7 - i   // rank i → y
        board[y][file++] = ch
      }
    }
  }
  return board
}

const board = computed(() => createBoard(props.fen))

// helper to test if square is selected
function isSelected(x, y) {
  return selected.value?.x === x && selected.value?.y === y
}

// when user clicks any square
function handleSquareClick(x, y) {
  const piece = board.value[y][x]
  if (selected.value === null) {
    // first click: only select if there is a piece
    if (piece) selected.value = { x, y }
  } else {
    // second click: emit move from→to, then clear selection
    const from = { ...selected.value }
    const to = { x, y }
    // emit `move` event to parent
    emit('move', { from, to })
    selected.value = null
  }
}

// need to define emits in <script setup>
const emit = defineEmits(['move'])
</script>

<style scoped>
.chessboard {
  /* make the board a grid with 8 columns */
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  /* optional fixed size or ratio */
  width: 400px;
  height: 400px;
  transform: rotate(-90deg);
  border: 2px solid #333;
}

.square {
  transform: rotate(90deg);
  /* each square is a cell in that grid */
  aspect-ratio: 1;
  transform: 90deg;
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

/* optional highlight on selection */
.square.selected {
  outline: 3px solid yellow;
  outline-offset: -2px;
}

/* dark coloring for (x+y)%2===0 */
.square.dark {
  background-color: #b58863;
}

.board-with-labels {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.files {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  width: 100%;
  text-align: center;
  font-weight: bold;
}

.files--top {
  margin-bottom: 0.25rem;
}

.files--bottom {
  margin-top: 0.25rem;
}

.ranks-files-row {
  display: flex;
}

.ranks {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 0.5rem;
  font-weight: bold;
}
</style>
