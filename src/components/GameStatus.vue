<template>
  <div class="game-status">
    <p><strong>Game ID:</strong> {{ gameId }}</p>
    <p><strong>Turn:</strong> {{ activeColor === 'w' ? 'White' : 'Black' }}</p>
    <p><strong>Move Counter:</strong> {{ fullMove }}</p>
    <p><strong>Half-Move Counter:</strong> {{ halfMove }}</p>
    <p><strong>In Check:</strong> {{ inCheck }}</p>
    <p><strong>Time Elapsed:</strong> {{ formattedTime }}</p>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted, onBeforeUnmount, computed } from 'vue'
const props = defineProps({
  gameId: { type: String, required: true },
  activeColor: { type: String, required: true }, // 'w' or 'b'
  fullMove: { type: String, required: true },
  halfMove: { type: String, required: true },
  inCheck: { type: Boolean, required: true }
})
//TODO:: Timer needs WORK
const timeElapsed = ref(0);
let timer = null;
onMounted(() => {
  timer = setInterval(() => {
    timeElapsed.value += 1;
  }, 1000);
});

onBeforeUnmount(() => {
  clearInterval(timer);
});

const formattedTime = computed(() => {
  const minutes = String(Math.floor(timeElapsed.value / 60)).padStart(2, '0');
  const seconds = String(timeElapsed.value % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
});
</script>

<style scoped>
.game-status {
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #b58863;
  padding: 0.75rem;
  width: 220px;
  font-family: Arial, sans-serif;
  font-size: 0.9rem;
}

.game-status p {
  margin: 0.25rem 0;
  line-height: 1.4;
}
</style>