<template>
  <div class="captured-pieces" :data-side="side">
    <div v-for="(p, i) in pieces" :key="i" class="captured-square">
      <img v-if="pieceImageMap[p]" :src="pieceImageMap[p]" :alt="p" />
      <span v-else>{{ p }}</span>
    </div>
  </div>
</template>
<script setup>
import { defineProps, watch } from 'vue'

const props = defineProps({
  side: {
    type: String,
    required: true
  },
  pieces: {
    type: Array,
    required: true
  }
})
watch(
  () => props.pieces,
  newVal => {
    //console.log(`[CapturedPieces:${props.side}] pieces changed:`, newVal)
  },
  { immediate: true }   // also fire once immediately
)
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

</script>
<style scoped>
.captures {
  flex: 0 0 auto;
  max-width: 80px;
}

.captured-pieces {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--board-light);
  border: 1px solid #666;
  border-radius: 0.25rem;
  /* optional: different background per side */
}


.captured-square {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #b58863;
  border: 1px solid #999;
  font-size: 1.25rem;
  user-select: none;
  border-radius: 0.125rem;
}

@media (max-width: 600px) {
  .captures {
    order: 2;
    /* will flow beneath the board in mobile */
  }
}
</style>
