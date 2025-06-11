<template>
  <div class="board-with-labels">

    <div class="ranks-files-row">
      <div class="ranks">
        <span v-for="r in ranks" :key="r">{{ r }}</span>
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
const ranks = [8, 7, 6, 5, 4, 3, 2, 1]
const props = defineProps({
  fen: {
    type: String,
    required: true
  }
})
const activeColor = computed(() => props.fen.split(' ')[1]);
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

const board = computed(() => ChessUtil.parseFen(props.fen))

// helper to test if square is selected
function isSelected(x, y) {
  return selected.value?.x === x && selected.value?.y === y
}

//handle promotion
const showPopup = ref(false);
const promotionChoice = ref('');
function handlePromotion(choice) {
  if (choice[0].toLowerCase() === 'k') choice = 'n';
  if (activeColor.value === 'w') {
    promotionChoice.value = choice[0].toUpperCase();
  } else {
    promotionChoice.value = choice[0].toLowerCase();
  }
  showPopup.value = false;
  if (!pendingFrom.value && !pendingTo.value) return;

  emit('move', {
    from: pendingFrom.value,
    to: pendingTo.value,
    promotionChoice
  });
  selected.value = null;
  pendingFrom.value = null;
  pendingTo.value = null;
}

const pendingFrom = ref(null);
const pendingTo = ref(null);
// when user clicks any square
function handleSquareClick(x, y) {
  const piece = board.value[y][x];
  if (selected.value === null) {
    // first click: only select if there is a piece
    if (piece && (isUpperCase(piece) === (activeColor.value === 'w'))) {
      selected.value = { x, y };
    }
    return;
  }
  // second click: emit move from to, then clear selection
  const from = { ...selected.value }
  const to = { x, y }
  console.log('from', from, 'to', to);
  //click same square
  if (from.x === to.x && from.y === to.y) {
    selected.value = null;
    return;
  }

  // handle promotion event
  if (ChessUtil.checkPromotion(y, board.value[from.y][from.x])) {
    showPopup.value = true;
    pendingFrom.value = from;
    pendingTo.value = to;

    return;
  }
  //emit move event
  emit('move', { from, to, promotionChoice })
  selected.value = null
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
  background-color: #7C8E76;
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
