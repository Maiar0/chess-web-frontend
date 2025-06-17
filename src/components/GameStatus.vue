<template>
  <div class="game-status">
    <div>
      <p><strong>Game ID:</strong> {{ gameId }}</p>
      <p><strong>Turn:</strong> {{ activeColor === 'w' ? 'White' : 'Black' }}</p>
    </div>
    <div>
      <p><strong>Move Counter:</strong> {{ fullMove }}</p>
      <p><strong>Half-Move Counter:</strong> {{ halfMove }}</p>
    </div>
    <div>
      <p><strong>In Check:</strong> {{ inCheck }}</p>
    </div>
  </div>
  <div class="actions"><button v-for="(btn, i) in buttons" :key="i" @click="btn.action()">
      {{ btn.label }}
    </button></div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  gameId: { type: String, required: true },
  activeColor: { type: String, required: true }, // 'w' or 'b'
  fullMove: { type: String, required: true },
  halfMove: { type: String, required: true },
  inCheck: { type: Boolean, required: true },
  buttons: { type: Array, required: true }
})

</script>

<style scoped>
.game-status {
  display: flex;
  justify-content: space-evenly;
  /* spread them out */
  align-items: flex-start;
  gap: 1rem;
  /* space between columns */
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #b58863;
  padding: 0.75rem;
  /* remove fixed width so it can flex in its parent */
}

.game-status>div {
  flex: 1;
  /* each column takes equal space */
  min-width: 0;
  max-width: fit-content;
  /* allow contents to shrink if needed */
}

.game-status p {
  margin: 0.25rem 0;
  line-height: 1.4;
}

/* on small screens, appear below everything */
@media (max-width: 600px) {
  .game-status {
    order: 4;
    margin-left: 0;
  }
}
</style>