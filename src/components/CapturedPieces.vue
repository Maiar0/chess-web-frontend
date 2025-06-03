<template>
  <div class="captured-pieces">
    <div v-for="(p, i) in pieces" :key="i" class="captured-square">
      <span>{{ p }}</span>
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

</script>
<style scoped>
.captured-pieces {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--board-light);
  border: 1px solid #666;
  border-radius: 0.25rem;
  /* optional: different background per side */
}

.captured-pieces[data-side="black"] {
  background: var(--board-dark);
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
</style>
