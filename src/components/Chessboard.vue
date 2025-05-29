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
            <img v-if="cell" :src="pieceImageMap[cell]" class="chess-piece" :alt="cell" />
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
    <ChoicePopup v-if="showPopup" :message="'Promote to:'" :choices="['Queen', 'Rook', 'Bishop', 'Knight']"
      @select="handlePromotion" />
  </div>

</template>

<script setup>
import { defineProps, computed, ref } from 'vue'
import ChessUtil from '../utils/ChessUtil';
import ChoicePopup from '../components/ChoicePopup.vue';

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

const pieceImageMap = {
  K: '/chesssprites/wk.png',
  Q: '/chesssprites/wq.png',
  R: '/chesssprites/wr.png',
  B: '/chesssprites/wb.png',
  N: '/chesssprites/wn.png',
  P: '/chesssprites/wp.png',
  k: '/chesssprites/bk.png',
  q: '/chesssprites/bq.png',
  r: '/chesssprites/br.png',
  b: '/chesssprites/bb.png',
  n: '/chesssprites/bn.png',
  p: '/chesssprites/bp.png',
};



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

const board = computed(() => ChessUtil.parseFen(props.fen))

// helper to test if square is selected
function isSelected(x, y) {
  return selected.value?.x === x && selected.value?.y === y
}
//handle promotion
const showPopup = ref(false);
const promotionChoice = ref('');
function handlePromotion(choice) {
  promotionChoice.value = 'Q'
  showPopup.value = false

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
    if (ChessUtil.checkPromotion(y, board.value[from.y][from.x])) {
      console.log('Promotion needed!');
      showPopup.value = true;
      //TODO:: Re need to return execution to here.
    } else {
      emit('move', { from, to, promotionChoice })
      selected.value = null
    }
  }

}

function isUpperCase(char) {
  return char === char.toUpperCase() && char !== char.toLowerCase();
}

// need to define emits in <script setup>
const emit = defineEmits(['move'])
</script>

<style scoped>
.chess-piece {
  width: 90%;
  height: 90%;
  object-fit: contain;
  user-select: none;
  pointer-events: none;
}

.chessboard {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  width: 400px;
  height: 400px;
  transform: rotate(-90deg);
  border: 2px solid #333;
}

.square {
  transform: rotate(90deg);
  aspect-ratio: 1;
  transform: 90deg;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #999;
  font-size: 2.0rem;
  user-select: none;
  background-color: #f0d9b5;
}

.square.selected {
  outline: 3px solid yellow;
  outline-offset: -2px;
}

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
